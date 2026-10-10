/* Konten und Sync über Firebase (Auth + Firestore). Lädt nur, wenn config.js eine Konfiguration enthält. */
const V='10.12.2';
const cfg=window.CLOUD_CONFIG;
if(cfg&&cfg.apiKey){
  (async()=>{
    try{
      const [{initializeApp},A,F]=await Promise.all([
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)]);
      const app=initializeApp(cfg),auth=A.getAuth(app),db=F.getFirestore(app);auth.languageCode='de';
      const mail=n=>n.includes('@')?n.trim().toLowerCase():n.trim().toLowerCase().replace(/[^a-z0-9._-]/g,c=>({'ä':'ae','ö':'oe','ü':'ue','ß':'ss'}[c]||'_'))+'@training.kilianamrehn.github.io';
      const C={enabled:true,user:null,name:null,
        onAuth(cb){A.onAuthStateChanged(auth,u=>{C.user=u;C.name=u?(u.displayName||u.email.split('@')[0]):null;cb(u);});},
        async signIn(n,pw){await A.signInWithEmailAndPassword(auth,mail(n),pw);},
        async signUp(n,em,pw){const r=await A.createUserWithEmailAndPassword(auth,em.trim().toLowerCase(),pw);await A.updateProfile(r.user,{displayName:n.trim()});C.name=n.trim();},
        async reset(em){await A.sendPasswordResetEmail(auth,em.trim().toLowerCase());},
        async signOut(){await A.signOut(auth);},
        async pull(){if(!C.user)return null;const s=await F.getDoc(F.doc(db,'users',C.user.uid));return s.exists()?s.data():null;},
        async push(d){if(!C.user)return;await F.setDoc(F.doc(db,'users',C.user.uid),{...d,name:C.name||'',updated:F.serverTimestamp()});},
        err(e){const c=(e&&e.code)||'';return ({'auth/email-already-in-use':'Mit dieser E-Mail gibt es schon ein Konto.','auth/missing-email':'Bitte E-Mail eingeben.','auth/invalid-credential':'E-Mail oder Passwort falsch.','auth/wrong-password':'E-Mail oder Passwort falsch.','auth/user-not-found':'E-Mail oder Passwort falsch.','auth/invalid-email':'Ungültige E-Mail.','auth/weak-password':'Passwort zu schwach (mind. 6 Zeichen).','auth/network-request-failed':'Keine Verbindung.','auth/too-many-requests':'Zu viele Versuche, bitte kurz warten.'})[c]||('Fehler: '+(c||e.message||e));}
      };
      window.CLOUD=C;
    }catch(e){window.CLOUD={enabled:false,error:String(e)};}
    window.dispatchEvent(new Event('cloud-ready'));
  })();
}
