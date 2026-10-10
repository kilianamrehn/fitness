/* Figur-Animations-Engine
   Konvention: Winkel in Grad, absolut, Bildschirmkoordinaten.
   0 = nach rechts, 90 = nach unten, -90 = nach oben, 180 = nach links.
   Seitenansicht: Figur schaut nach rechts. Seite 1 = nahe Seite (vorne gezeichnet), Seite 2 = ferne Seite.
   Frontansicht: Seite 1 = Bildschirm links, Seite 2 = Bildschirm rechts.
   Segmente: torso (Becken->Hals), head (Hals->Kopf), uarm, farm, thigh, shin, foot (Knoechel->Zehe).
   Schluessel ohne Ziffer gelten fuer beide Seiten, mit Ziffer (uarm1) ueberschreiben sie eine Seite. */
(function(G){
  const L={torso:50, head:15, uarm:29, farm:26, thigh:45, shin:43, foot:14};
  const RAD=Math.PI/180;
  const dir=a=>[Math.cos(a*RAD),Math.sin(a*RAD)];
  const add=(p,v,s)=>[p[0]+v[0]*s,p[1]+v[1]*s];
  const lerp=(a,b,u)=>a+(b-a)*u;
  const lerpAng=(a,b,u)=>{let d=((b-a)%360+540)%360-180;return a+d*u;};
  const ease=u=>0.5-0.5*Math.cos(Math.PI*u);
  const SEG=['uarm','farm','thigh','shin','foot'];

  function ang(a,k,s){ const v=a[k+s]; return v!==undefined?v:a[k]; }
  function len(a,k,s){ const v=a['s_'+k+s]; const w=v!==undefined?v:a['s_'+k]; return L[k]*(w!==undefined?w:1); }

  function solve(pose){
    const a=pose.a, front=pose.view==='front';
    const P={pelvis:[0,0]};
    const td=dir(a.torso);
    const TL=L.torso*(a.s_torso||1);P.neck=add(P.pelvis,td,TL);
    P.chest=add(P.pelvis,td,TL*0.7);
    P.head=add(P.neck,dir(a.head!==undefined?a.head:a.torso),L.head*(a.s_head||1));
    const perp=dir(a.torso+90);
    const sw=front?19:0, hw=front?8.5:0;
    const shBase=add(P.neck,td,-4);
    for(const s of [1,2]){
      const sg=s===1?-1:1; // Frontansicht: Seite 1 = Bildschirm links
      P['sh'+s]=add(shBase,perp,sg*sw);
      P['el'+s]=add(P['sh'+s],dir(ang(a,'uarm',s)),len(a,'uarm',s));
      P['ha'+s]=add(P['el'+s],dir(ang(a,'farm',s)),len(a,'farm',s));
      P['hi'+s]=add(P.pelvis,perp,sg*hw);
      P['kn'+s]=add(P['hi'+s],dir(ang(a,'thigh',s)),len(a,'thigh',s));
      P['an'+s]=add(P['kn'+s],dir(ang(a,'shin',s)),len(a,'shin',s));
      P['to'+s]=add(P['an'+s],dir(ang(a,'foot',s)),len(a,'foot',s));
      P['he'+s]=add(P['an'+s],dir(ang(a,'foot',s)),-4);
    }
    return P;
  }
  function place(P,anchor){
    const j=(anchor&&anchor.j)||'pelvis', at=(anchor&&anchor.at)||[0,0];
    const o=[at[0]-P[j][0],at[1]-P[j][1]];
    const Q={};for(const k in P)Q[k]=[P[k][0]+o[0],P[k][1]+o[1]];
    return Q;
  }
  function blendAngles(A,B,u){
    const out={};const keys=new Set([...Object.keys(A),...Object.keys(B)]);
    for(const k of keys){
      let va=A[k],vb=B[k];
      if(va===undefined){const base=k.replace(/[12]$/,'');va=A[base];}
      if(vb===undefined){const base=k.replace(/[12]$/,'');vb=B[base];}
      if(va===undefined)va=k.startsWith('s_')?1:vb; if(vb===undefined)vb=k.startsWith('s_')?1:va;
      out[k]=k.startsWith('s_')?lerp(va,vb,u):lerpAng(va,vb,u);
    }
    // ensure side keys exist when one frame uses base and other uses split
    return out;
  }
  function framePose(ex,t){
    const F=ex.frames; const total=F.reduce((s,f)=>s+(f.d||800)+(f.hold||0),0);
    let tt=((t%total)+total)%total;
    for(let i=0;i<F.length;i++){
      const f=F[i], n=F[(i+1)%F.length], h=f.hold||0, d=f.d||800;
      if(tt<h) return posed(ex,f,f,0);
      tt-=h;
      if(tt<d) return posed(ex,f,n,ease(tt/d));
      tt-=d;
    }
    return posed(ex,F[0],F[0],0);
  }
  function anchorOf(ex,f){return f.anchor||ex.anchor;}
  function posed(ex,A,B,u){
    const view=ex.view||'side';
    const a=blendAngles(A.a,B.a,u);
    const aA=anchorOf(ex,A), aB=anchorOf(ex,B);
    let P=solve({view,a});
    if((aA&&aA.j)===(aB&&aB.j)){
      const at=[lerp(aA.at[0],aB.at[0],u),lerp(aA.at[1],aB.at[1],u)];
      P=place(P,{j:aA.j,at});
    }else{
      const PA=place(solve({view,a:A.a}),aA), PB=place(solve({view,a:B.a}),aB);
      const pel=[lerp(PA.pelvis[0],PB.pelvis[0],u),lerp(PA.pelvis[1],PB.pelvis[1],u)];
      P=place(P,{j:'pelvis',at:pel});
    }
    const pin=A.pin||ex.pin;
    if(pin){
      const cj=(aA&&aA.j)||'pelvis', c=P[cj], q=P[pin.j];
      const dx=q[0]-c[0],dy=q[1]-c[1],R=Math.hypot(dx,dy),ph=Math.atan2(dy,dx);
      const t=Math.max(-1,Math.min(1,(pin.y-c[1])/R));
      let th1=Math.asin(t)-ph, th2=Math.PI-Math.asin(t)-ph;
      const nrm=x=>Math.atan2(Math.sin(x),Math.cos(x));th1=nrm(th1);th2=nrm(th2);
      const th=Math.abs(th1)<Math.abs(th2)?th1:th2, cs=Math.cos(th), sn=Math.sin(th);
      for(const k in P){const p=P[k];const x=p[0]-c[0],y=p[1]-c[1];P[k]=[c[0]+x*cs-y*sn,c[1]+x*sn+y*cs];}
      P._rot=th/RAD;
    }
    P._a=a;
    return P;
  }

  // ---------- Zeichnen ----------
  function capsule(p,q,r1,r2){
    const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy)||0.001;
    const nx=-dy/len,ny=dx/len;
    const f=n=>n.toFixed(1);
    return `M${f(p[0]+nx*r1)} ${f(p[1]+ny*r1)}L${f(q[0]+nx*r2)} ${f(q[1]+ny*r2)}`+
      `A${f(r2)} ${f(r2)} 0 0 0 ${f(q[0]-nx*r2)} ${f(q[1]-ny*r2)}`+
      `L${f(p[0]-nx*r1)} ${f(p[1]-ny*r1)}A${f(r1)} ${f(r1)} 0 0 0 ${f(p[0]+nx*r1)} ${f(p[1]+ny*r1)}Z`;
  }
  const OL=' stroke="#fffefb" stroke-width="1.6" stroke-linejoin="round"';
  const C={ink:'#2b2824',far:'#b3aa9d',hl:'#c8643f',hlFar:'#e3ad95',eq:'#3a3631',eq2:'#8f887d',line:'#d8d2c5',band:'#c8643f',shadow:'rgba(43,40,36,.07)'};

  function limb(P,s,hl,col){
    const c=k=>hl.includes(k)?(col===C.ink?C.hl:C.hlFar):col;
    let o='';
    o+=`<path d="${capsule(P['hi'+s],P['kn'+s],8.2,6.2)}" fill="${c('thigh')}"${OL}/>`;
    o+=`<path d="${capsule(P['kn'+s],P['an'+s],6,4.1)}" fill="${c('shin')}"${OL}/>`;
    o+=`<path d="${capsule(P['he'+s],P['to'+s],3.6,2.6)}" fill="${col}"${OL}/>`;
    return o;
  }
  function arm(P,s,hl,col){
    const c=k=>hl.includes(k)?(col===C.ink?C.hl:C.hlFar):col;
    let o='';
    o+=`<path d="${capsule(P['sh'+s],P['el'+s],5.6,4.4)}" fill="${c('uarm')}"${OL}/>`;
    o+=`<path d="${capsule(P['el'+s],P['ha'+s],4.4,3.4)}" fill="${c('farm')}"${OL}/>`;
    o+=`<circle cx="${P['ha'+s][0].toFixed(1)}" cy="${P['ha'+s][1].toFixed(1)}" r="4" fill="${col}"${OL}/>`;
    return o;
  }
  function torso(P,hl,front){
    const col=hl.includes('torso')?C.hl:C.ink;
    if(!front){
      return `<path d="${capsule(P.neck,P.head,4.2,4.2)}" fill="${C.ink}"/>`+
             `<path d="${capsule(P.pelvis,P.chest,10.5,12.5)}" fill="${col}"${OL}/>`+
             `<path d="${capsule(P.chest,P.neck,12.5,6.5)}" fill="${col}"/>`;
    }
    // Frontansicht: Schulter breit, Taille schmal, Becken
    const td=[P.neck[0]-P.pelvis[0],P.neck[1]-P.pelvis[1]];const tl=Math.hypot(td[0],td[1]);const u=[td[0]/tl,td[1]/tl];const n=[-u[1],u[0]];
    const at=(t,w)=>[P.pelvis[0]+u[0]*tl*t+n[0]*w,P.pelvis[1]+u[1]*tl*t+n[1]*w];
    const pts=[at(-0.08,-11),at(0.35,-10.5),at(0.78,-16),at(0.95,-12),at(0.95,12),at(0.78,16),at(0.35,10.5),at(-0.08,11)];
    const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')+'Z';
    return `<path d="${capsule(P.neck,P.head,4.4,4.4)}" fill="${C.ink}"/>`+
           `<path d="${d}" fill="${col}" stroke="${col}" stroke-width="6" stroke-linejoin="round"/>`;
  }
  function head(P,a,front){
    const h=P.head;let o=`<circle cx="${h[0].toFixed(1)}" cy="${h[1].toFixed(1)}" r="10.5" fill="${C.ink}"/>`;
    if(!front){
      const hd=(a.head!==undefined?a.head:a.torso)+(P._rot||0);
      const fwd=dir(hd+90); // Blickrichtung (fuer Kopf nach oben: rechts)
      const e=add(add(h,fwd,5.2),dir(hd),1.2);
      o+=`<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="1.5" fill="#f4f1ea"/>`;
    }
    return o;
  }
  function pt(P,x){return Array.isArray(x)?x:P[x];}
  function dumbbell(p,o,size){
    const s=size||1;
    if(o==='end'){
      return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${8*s}" fill="${C.eq}"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${3.2*s}" fill="${C.eq2}"/>`;
    }
    const an=o==='h'?0:o==='v'?90:o;
    const d=dir(an),n=dir(an+90),hl=9*s;
    const a=add(p,d,-hl),b=add(p,d,hl);
    const plate=(c)=>{const w=4.5*s,h=9*s;const p1=add(add(c,d,-w/2),n,-h),p2=add(add(c,d,w/2),n,-h),p3=add(add(c,d,w/2),n,h),p4=add(add(c,d,-w/2),n,h);
      return `<path d="M${p1.map(v=>v.toFixed(1)).join(' ')}L${p2.map(v=>v.toFixed(1)).join(' ')}L${p3.map(v=>v.toFixed(1)).join(' ')}L${p4.map(v=>v.toFixed(1)).join(' ')}Z" fill="${C.eq}" stroke="${C.eq}" stroke-width="2" stroke-linejoin="round"/>`;};
    return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${C.eq2}" stroke-width="3.2" stroke-linecap="round"/>`+plate(a)+plate(b);
  }
  function prop(pr,P,front){
    const f=v=>(+v).toFixed(1);
    switch(pr.t){
      case 'floor': return `<line x1="-400" y1="${f(pr.y)}" x2="800" y2="${f(pr.y)}" stroke="${C.line}" stroke-width="2"/>`;
      case 'mat': return `<rect x="${f(pr.x1)}" y="${f(pr.y)}" width="${f(pr.x2-pr.x1)}" height="4" rx="2" fill="#e6dfd2"/>`;
      case 'bar': return `<line x1="${f(pr.x1)}" y1="${f(pr.y)}" x2="${f(pr.x2)}" y2="${f(pr.y)}" stroke="${C.eq2}" stroke-width="5" stroke-linecap="round"/>`+
        (pr.frame?`<path d="M${f(pr.x1-6)} ${f(pr.y+60)}V${f(pr.y-14)}H${f(pr.x2+6)}V${f(pr.y+60)}" fill="none" stroke="${C.line}" stroke-width="6"/>`:'');
      case 'dips': {
        if(front){return [pr.x-pr.w,pr.x+pr.w].map(x=>`<line x1="${f(x)}" y1="${f(pr.y)}" x2="${f(x)}" y2="${f(pr.y+pr.h)}" stroke="${C.eq2}" stroke-width="4"/><line x1="${f(x-6)}" y1="${f(pr.y)}" x2="${f(x+6)}" y2="${f(pr.y)}" stroke="${C.eq2}" stroke-width="5" stroke-linecap="round"/>`).join('');}
        return `<line x1="${f(pr.x-26)}" y1="${f(pr.y)}" x2="${f(pr.x+26)}" y2="${f(pr.y)}" stroke="${C.eq2}" stroke-width="5" stroke-linecap="round"/><line x1="${f(pr.x-20)}" y1="${f(pr.y)}" x2="${f(pr.x-26)}" y2="${f(pr.y+pr.h)}" stroke="${C.line}" stroke-width="4"/><line x1="${f(pr.x+20)}" y1="${f(pr.y)}" x2="${f(pr.x+26)}" y2="${f(pr.y+pr.h)}" stroke="${C.line}" stroke-width="4"/>`;}
      case 'bench': return `<rect x="${f(pr.x)}" y="${f(pr.y)}" width="${f(pr.w)}" height="7" rx="3" fill="${C.eq2}"/>`+
        `<line x1="${f(pr.x+6)}" y1="${f(pr.y+7)}" x2="${f(pr.x+6)}" y2="${f(pr.y+pr.h)}" stroke="${C.line}" stroke-width="4"/><line x1="${f(pr.x+pr.w-6)}" y1="${f(pr.y+7)}" x2="${f(pr.x+pr.w-6)}" y2="${f(pr.y+pr.h)}" stroke="${C.line}" stroke-width="4"/>`;
      case 'box': return `<rect x="${f(pr.x)}" y="${f(pr.y)}" width="${f(pr.w)}" height="${f(pr.h)}" rx="3" fill="#e6dfd2" stroke="${C.line}" stroke-width="2"/>`;
      case 'wall': return `<rect x="${f(pr.x)}" y="${f(pr.y1)}" width="8" height="${f(pr.y2-pr.y1)}" fill="#e6dfd2"/>`;
      case 'post': return `<rect x="${f(pr.x-3)}" y="${f(pr.y1)}" width="6" height="${f(pr.y2-pr.y1)}" rx="2" fill="${C.line}"/>`;
      case 'band': {const a=pt(P,pr.from),b=pt(P,pr.to);return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${C.band}" stroke-width="3" stroke-linecap="round" opacity=".85"/>`;}
      case 'loop': {const a=pt(P,pr.a),b=pt(P,pr.b);return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${C.band}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`;}
      case 'db': return dumbbell(pt(P,pr.j),pr.o||'end',pr.s);
      case 'step': return `<rect x="${f(pr.x)}" y="${f(pr.y)}" width="${f(pr.w)}" height="${f(pr.h)}" rx="2" fill="#e6dfd2" stroke="${C.line}" stroke-width="2"/>`;
      case 'arrow': {const a=pr.from,b=pr.to;return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${C.hl}" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round" opacity=".6"/>`;}
    }
    return '';
  }

  function draw(ex,P){
    const front=(ex.view||'side')==='front';
    const hl=ex.hl||[];
    const props=ex.props||[];
    const back=props.filter(p=>!p.layer&&p.t!=='db'&&p.t!=='band'&&p.t!=='loop'||p.layer==='back');
    const by=j=>props.filter(p=>p.t==='db'&&(p.j||'').endsWith(j)&&p.layer!=='back'&&p.layer!=='front');
    const fronts=props.filter(p=>p.layer==='front'||((p.t==='band'||p.t==='loop')&&!p.layer));
    let o='';
    // Schatten
    if(ex.floor!==undefined){const xs=[P.an1[0],P.an2[0],P.pelvis[0]];const cx=(Math.min(...xs)+Math.max(...xs))/2;const w=Math.max(28,(Math.max(...xs)-Math.min(...xs))/2+18);o+=`<ellipse cx="${cx.toFixed(1)}" cy="${(ex.floor+1).toFixed(1)}" rx="${w.toFixed(1)}" ry="4" fill="${C.shadow}"/>`;}
    for(const p of back)o+=prop(p,P,front);
    if(!front){
      o+=arm(P,2,hl,C.far);
      for(const p of by('2'))o+=prop(p,P,front);
      o+=limb(P,2,hl,C.far);
      o+=torso(P,hl,false);
      o+=limb(P,1,hl,C.ink);
      o+=head(P,P._a,false);
      o+=arm(P,1,hl,C.ink);
      for(const p of by('1'))o+=prop(p,P,front);
    }else{
      o+=limb(P,1,hl,C.ink)+limb(P,2,hl,C.ink);
      o+=torso(P,hl,true);
      o+=head(P,P._a,true);
      o+=arm(P,1,hl,C.ink)+arm(P,2,hl,C.ink);
      for(const p of by('1'))o+=prop(p,P,front);
      for(const p of by('2'))o+=prop(p,P,front);
    }
    for(const p of fronts)o+=prop(p,P,front);
    return o;
  }

  function bbox(ex){
    let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
    const F=ex.frames;const total=F.reduce((s,f)=>s+(f.d||800)+(f.hold||0),0);
    for(let i=0;i<=40;i++){const P=framePose(ex,total*i/40);for(const k in P){if(k[0]==='_')continue;const p=P[k];x0=Math.min(x0,p[0]-12);y0=Math.min(y0,p[1]-12);x1=Math.max(x1,p[0]+12);y1=Math.max(y1,p[1]+12);}}
    for(const p of ex.props||[]){
      if(p.t==='bar'){x0=Math.min(x0,p.x1-8);x1=Math.max(x1,p.x2+8);y0=Math.min(y0,p.y-(p.frame?20:8));}
      if(p.t==='bench'||p.t==='box'||p.t==='step'){x0=Math.min(x0,p.x);x1=Math.max(x1,p.x+p.w);y0=Math.min(y0,p.y);}
      if(p.t==='dips'){x0=Math.min(x0,p.x-(p.w||26)-8);x1=Math.max(x1,p.x+(p.w||26)+8);}
      if(p.t==='wall'){x0=Math.min(x0,p.x);x1=Math.max(x1,p.x+8);}
      if(p.t==='post'){x0=Math.min(x0,p.x-4);x1=Math.max(x1,p.x+4);y0=Math.min(y0,p.y1);}
    }
    if(ex.floor!==undefined)y1=Math.max(y1,ex.floor+8);
    return [x0,y0,x1,y1];
  }
  function viewBox(ex,aspect){
    let [x0,y0,x1,y1]=bbox(ex);const pad=10;x0-=pad;y0-=pad;x1+=pad;y1+=pad;
    let w=x1-x0,h=y1-y0;const want=aspect||1.25;
    if(w/h<want){const nw=h*want;x0-=(nw-w)/2;w=nw;}else{const nh=w/want;y0-=(nh-h)*0.6;h=nh;}
    return [x0,y0,w,h];
  }
  function duration(ex){return ex.frames.reduce((s,f)=>s+(f.d||800)+(f.hold||0),0);}

  // ---------- Player ----------
  const live=new Set();let raf=null;
  function loop(now){
    for(const it of live){ if(!it.visible||it.paused)continue; it.svg.innerHTML=draw(it.ex,framePose(it.ex,(now-it.t0)*(it.speed||1))); }
    raf=live.size?requestAnimationFrame(loop):null;
  }
  const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>{for(const e of es){const it=e.target.__fig;if(it)it.visible=e.isIntersecting;}},{rootMargin:'80px'}):null;
  function mount(el,ex,opt){
    opt=opt||{};
    if(el.__fig){live.delete(el.__fig);if(io)io.unobserve(el);}
    const vb=viewBox(ex,opt.aspect);
    el.innerHTML=`<svg viewBox="${vb.map(v=>v.toFixed(1)).join(' ')}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block"></svg>`;
    const svg=el.firstChild;
    const it={ex,svg,t0:performance.now(),visible:!io,speed:opt.speed||1,paused:false};
    el.__fig=it;
    if(opt.still!==undefined){svg.innerHTML=draw(ex,framePose(ex,duration(ex)*opt.still));return it;}
    live.add(it);if(io)io.observe(el);
    svg.innerHTML=draw(ex,framePose(ex,0));
    if(!raf)raf=requestAnimationFrame(loop);
    return it;
  }
  function unmount(el){if(el.__fig){live.delete(el.__fig);if(io)io.unobserve(el);el.__fig=null;}}
  function renderAt(ex,t,aspect){const vb=viewBox(ex,aspect);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(v=>v.toFixed(1)).join(' ')}">${draw(ex,framePose(ex,t))}</svg>`;}

  G.FIG={mount,unmount,renderAt,duration,framePose,solve,draw,viewBox};
})(window);
