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
      const key=n=>n.trim().toLowerCase();
      const C={enabled:true,user:null,name:null,
        onAuth(cb){A.onAuthStateChanged(auth,u=>{C.user=u;C.name=u?(u.displayName||u.email.split('@')[0]):null;cb(u);});},
        // Name -> E-Mail aufloesen (names/{name}); ohne Eintrag: interne Adresse aus dem Namen
        async resolve(n){n=n.trim();if(n.includes('@'))return n.toLowerCase();
          try{const d=await F.getDoc(F.doc(db,'names',key(n)));if(d.exists()&&d.data().email)return d.data().email;}catch(e){}
          return mail(n);},
        async signIn(n,pw){await A.signInWithEmailAndPassword(auth,await C.resolve(n),pw);},
        async signUp(n,em,pw){n=n.trim();em=(em||'').trim().toLowerCase();
          const ex=await F.getDoc(F.doc(db,'names',key(n)));if(ex.exists())throw {code:'name-taken'};
          let r;try{r=await A.createUserWithEmailAndPassword(auth,em||mail(n),pw);}
          catch(e){if(!em&&e&&e.code==='auth/email-already-in-use')throw {code:'name-taken'};throw e;}
          await A.updateProfile(r.user,{displayName:n});C.name=n;
          await F.setDoc(F.doc(db,'names',key(n)),{uid:r.user.uid,email:em||''});},
        async reset(n){const em=await C.resolve(n);if(em.endsWith('@training.kilianamrehn.github.io'))throw {code:'no-email'};
          await A.sendPasswordResetEmail(auth,em);},
        async signOut(){await A.signOut(auth);},
        async pull(){if(!C.user)return null;const s=await F.getDoc(F.doc(db,'users',C.user.uid));return s.exists()?s.data():null;},
        async push(d){if(!C.user)return;await F.setDoc(F.doc(db,'users',C.user.uid),{...d,name:C.name||'',updated:F.serverTimestamp()});},
        err(e){const c=(e&&e.code)||'';return ({'auth/email-already-in-use':'Mit dieser E-Mail gibt es schon ein Konto.','auth/missing-email':'Bitte E-Mail eingeben.','name-taken':'Dieser Name ist schon vergeben.','no-email':'Zu diesem Konto ist keine E-Mail hinterlegt. Frag Kilian.','auth/invalid-credential':'Name oder Passwort falsch.','auth/wrong-password':'Name oder Passwort falsch.','auth/user-not-found':'Name oder Passwort falsch.','auth/invalid-email':'Ungültige E-Mail.','auth/weak-password':'Passwort zu schwach (mind. 6 Zeichen).','auth/network-request-failed':'Keine Verbindung.','auth/too-many-requests':'Zu viele Versuche, bitte kurz warten.'})[c]||('Fehler: '+(c||e.message||e));}
      };
      window.CLOUD=C;
    }catch(e){window.CLOUD={enabled:false,error:String(e)};}
    window.dispatchEvent(new Event('cloud-ready'));
  })();
}
