/* Training v5 */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------------- Speicher ---------------- */
const LSK='training:';
function sget(k,d){try{const r=localStorage.getItem(LSK+k);return r?JSON.parse(r):d;}catch(e){return d;}}
function sset(k,v){try{localStorage.setItem(LSK+k,JSON.stringify(v));}catch(e){}}

/* ---------------- Datum ---------------- */
const DAY=864e5;
function isoWeek(d){
  d=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const day=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-day+3);
  const ft=new Date(Date.UTC(d.getUTCFullYear(),0,4));
  const fd=(ft.getUTCDay()+6)%7;ft.setUTCDate(ft.getUTCDate()-fd+3);
  return {year:d.getUTCFullYear(),week:1+Math.round((d-ft)/(7*DAY))};
}
const wkKey=d=>{const w=isoWeek(d);return `${w.year}-W${String(w.week).padStart(2,'0')}`;};
const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parseYmd=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c);};
const monday=d=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x;};
const fmtD=s=>{const[a,b,c]=s.split('-');return `${c}.${b}.${a.slice(2)}`;};
const NOW=()=>new Date();
let TODAY=ymd(NOW()), WK=wkKey(NOW());

/* ---------------- Zustand ---------------- */
let HISTORY,LOG,S;
const DEFSET={mode:'zirkel',rounds:3,sets:'auto',warm:true,sound:true,weights:[0,5,10,15]};
function loadLocal(){
  HISTORY=sget('history',{});LOG=sget('log',{});S=sget('v5',null);
  if(!S){S={epoch:ymd(monday(NOW())),plan:null,week:null,rate:{},done:{},sessions:[],flags:{},settings:{}};}
  S.settings=Object.assign({},DEFSET,S.settings||{});S.flags=S.flags||{};S.rate=S.rate||{};S.done=S.done||{};S.sessions=S.sessions||[];
}
loadLocal();
let pushT=null;
const save=()=>{sset('v5',S);sset('history',HISTORY);sset('log',LOG);sset('stamp',Date.now());
  if(window.CLOUD&&CLOUD.user){clearTimeout(pushT);pushT=setTimeout(cloudPush,1200);}};
function snapshot(){return {v5:JSON.stringify(S),history:JSON.stringify(HISTORY),log:JSON.stringify(LOG),stamp:sget('stamp',0)};}
async function cloudPush(){try{await CLOUD.push(snapshot());}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&window.CLOUD&&CLOUD.user){clearTimeout(pushT);cloudPush();}});

/* ---------------- Profil ---------------- */
const DEFPROF={eq:{chair:true,table:false,stairs:false,db:[],kb:[],bb:0,bench:false,loop:false,band:false,bar:false,dips:false,trx:false,rope:false},freq:3,dur:15,cardio:'run',cardioN:1,level:'fort'};
const KILIANPROF={eq:{chair:true,table:true,stairs:true,db:[5,10,15],kb:[],bb:0,bench:false,loop:true,band:false,bar:true,dips:true,trx:false,rope:false},freq:3,dur:15,cardio:'run',cardioN:1,level:'fort'};
const prof=()=>S.profile||DEFPROF;
function has(k){const e=prof().eq;if(k==='db'||k==='kb')return (e[k]||[]).length>0;if(k==='bb')return (e.bb||0)>0;return !!e[k];}
function allowed(id){if(!EX[id])return false;const r=(window.REQ||{})[id];if(r&&r.rq&&!r.rq.some(g=>g.every(has)))return false;
  return true;}
function loadSrc(id){const r=(window.REQ||{})[id];if(!r||!r.load)return null;return r.load.find(has)||null;}
function cfgOf(p){const m={10:{stations:4,rounds:2,warm:false},15:{stations:4,rounds:3,warm:true},20:{stations:5,rounds:3,warm:true},30:{stations:6,rounds:3,warm:true},45:{stations:8,rounds:4,warm:true,rest:30,rrest:90},60:{stations:10,rounds:4,warm:true,rest:30,rrest:90}}[p.dur]||{stations:4,rounds:3,warm:true};
  const c={...m};if(p.level==='ein'&&p.dur<=20)c.rounds=Math.max(2,c.rounds-1);
  c.auto=c.rounds;const o=typeof S!=='undefined'&&S&&S.settings&&S.settings.sets;if(o&&o!=='auto')c.rounds=+o;return c;}
/* geschätzte Dauer, wenn die Satzzahl von der Automatik abweicht */
function estMin(p){p=p||prof();const c=cfgOf(p);return Math.max(5,Math.round(p.dur*c.rounds/c.auto));}
let SESS=[];
function sessList(){const p=prof(),c=cfgOf(p);const seen={};
  const out=(WEEK_T[p.freq]||WEEK_T[3]).map(k=>{const t=SESS_T.find(x=>x.id===k)||SPLIT_T[k];seen[k]=(seen[k]||0)+1;
    const id=seen[k]>1?k+String.fromCharCode(96+seen[k]):k;
    return {...t,id,name:t.name+(seen[k]>1?' ('+seen[k]+'.)':''),st:t.st.slice(0,c.stations)};});
  if(p.cardio&&p.cardio!=='none'){for(let i=0;i<(p.cardioN||1);i++)out.push({id:i?'RUN2':'RUN',name:CARDIO[p.cardio].label+(i?' 2':''),run:true,ctype:p.cardio});}
  return out;}
const isRun=sid=>/^RUN/.test(sid);
const runIdOf=sid=>sid==='RUN2'?S.week.run2:S.week.run;
function goalOf(){const n=SESS.length;return n>=3?n-1:n;}

function weeksSinceEpoch(d){return Math.floor((monday(d)-parseYmd(S.epoch))/(7*DAY)+0.01);}
function curBlock(){return Math.max(0,Math.floor(weeksSinceEpoch(NOW())/4));}
function weekInBlock(){return (Math.max(0,weeksSinceEpoch(NOW()))%4)+1;}

/* ---------------- Zufall ---------------- */
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function wpick(ids,ws,r){const tot=ws.reduce((a,b)=>a+b,0);if(tot<=0)return ids[Math.floor(r()*ids.length)];let x=r()*tot;for(let i=0;i<ids.length;i++){x-=ws[i];if(x<=0)return ids[i];}return ids[ids.length-1];}

/* ---------------- Bewertung ---------------- */
const rateOf=id=>(S.rate[id]&&S.rate[id].v)||0;
function setRate(id,v,why){
  if(v===0){delete S.rate[id];}
  else S.rate[id]={v,d:TODAY,wk:WK,why:why||null};
  save();
}

/* ---------------- Plan ---------------- */
function weight(id,slot,prev,prev2){
  if(rateOf(id)===-1)return 0;
  let w=(BASEW[id]||1);
  if(rateOf(id)===1)w*=3;
  // vorhandene Ausrüstung nutzen: Übungen mit Zusatzlast oder Gerät bevorzugen
  const rq=(window.REQ||{})[id];
  if(loadSrc(id))w*=4;else if(rq&&rq.rq&&rq.rq.some(g=>g.every(has)&&g.some(k=>k!=='chair')))w*=1.6;
  if(prof().level==='ein'&&(window.ADVANCED||[]).includes(id))w*=0.05;
  if(prev&&prev[slot]===id){w*=rateOf(id)===1?1:0.3; if(prev2&&prev2[slot]===id)w*=0.05;}
  return w;
}
const fbOf=(k,pool)=>(window.POOL_FB&&POOL_FB[pool])||STATION_FALLBACK[k]||STATION_FALLBACK[(k||'').replace(/\d+$/,'')]||STATION_FALLBACK.x;
function poolIds(pool,stKey){let ids=(POOLS[pool]||[]).filter(allowed);
  if(!ids.length&&stKey)for(const fp of fbOf(stKey,pool)){ids=(POOLS[fp]||[]).filter(allowed);if(ids.length)break;}
  return ids;}
/* used: schon im Plan (wird gemieden), in derselben Einheit nie doppelt */
function pickFor(slot,pool,used,seed,prev,prev2,sel){
  const [sid,stKey]=slot.split('.');
  const inSess=new Set(Object.entries(sel||(S.plan&&S.plan.sel)||{}).filter(([k,v])=>k.split('.')[0]===sid&&k!==slot&&v).map(([,v])=>v));
  const ok=id=>!inSess.has(id);
  let ids=poolIds(pool,stKey).filter(id=>ok(id)&&!used.has(id));
  if(!ids.length)for(const fp of fbOf(stKey,pool)){ids=(POOLS[fp]||[]).filter(id=>allowed(id)&&ok(id)&&!used.has(id));if(ids.length)break;}
  if(!ids.length)ids=poolIds(pool,stKey).filter(ok);
  if(!ids.length)for(const fp of fbOf(stKey,pool)){ids=(POOLS[fp]||[]).filter(id=>allowed(id)&&ok(id));if(ids.length)break;}
  if(!ids.length)return null;
  let ws=ids.map(id=>weight(id,slot,prev,prev2));
  if(ws.every(w=>w===0))ws=ids.map(()=>1);
  return wpick(ids,ws,rng(hash(seed+slot)));
}
function slotsAll(){const out=[];for(const s of SESS){if(s.run)continue;for(const [k,pool,label] of s.st)out.push({slot:s.id+'.'+k,pool,label,sid:s.id});}return out;}
function newPlan(b){
  const old=S.plan;const prev=old?old.sel:null, prev2=old?old.prev:null;
  const used=new Set(), sel={};
  for(const sl of slotsAll()){const id=pickFor(sl.slot,sl.pool,used,'b'+b+S.epoch,prev,prev2,sel);sel[sl.slot]=id;if(id)used.add(id);}
  S.plan={block:b,sel,prev,user:{},checkedWk:WK};
}
function ensurePlan(){
  const b=curBlock();
  if(!S.plan||S.plan.block!==b)newPlan(b);
  if(S.plan.checkedWk!==WK){
    // abgewählte Übungen fliegen ab der neuen Woche raus
    const used=new Set(Object.values(S.plan.sel));
    for(const sl of slotsAll()){
      const id=S.plan.sel[sl.slot];const r=S.rate[id];
      if(r&&r.v===-1&&r.wk!==WK){used.delete(id);const n=pickFor(sl.slot,sl.pool,used,'w'+WK,S.plan.prev,null);S.plan.sel[sl.slot]=n;used.add(n);}
    }
    S.plan.checkedWk=WK;
  }
  { // fehlende oder mit der Ausrüstung nicht mehr machbare Slots neu füllen
    const used=new Set(Object.values(S.plan.sel));
    for(const sl of slotsAll()){const id=S.plan.sel[sl.slot];if(!id||!allowed(id)){used.delete(id);const n=pickFor(sl.slot,sl.pool,used,'f'+WK,S.plan.prev,null);S.plan.sel[sl.slot]=n;if(n)used.add(n);}}
  }
  const ctype=prof().cardio;
  if(S.week&&S.week.wk===WK&&ctype&&ctype!=='none'&&S.week.ctype!==ctype)S.week=null;
  if(S.week&&S.week.wk===WK&&S.week.bonus&&SESS.filter(s=>!s.run).some(s=>!S.week.bonus[s.id]||!allowed(S.week.bonus[s.id].id)))S.week=null;
  if(!S.week||S.week.wk!==WK){
    const r=rng(hash('wk'+WK)), bonus={};
    SESS.filter(s=>!s.run).forEach((s,i)=>{
      const wn=weeksSinceEpoch(NOW());const th=BONUS_THEMES[(i+wn)%BONUS_THEMES.length];
      let ids=POOLS[th[0]].filter(allowed);if(!ids.length)ids=POOLS.mob.filter(allowed);const ws=ids.map(id=>rateOf(id)===-1?0:(rateOf(id)===1?3:1));
      bonus[s.id]={id:wpick(ids,ws.every(w=>!w)?ids.map(()=>1):ws,r),theme:th[1]};
    });
    const ct=(ctype&&ctype!=='none')?ctype:'run';const rids=POOLS[CARDIO[ct].pool];const rws=rids.map(id=>rateOf(id)===-1?0:(rateOf(id)===1?3:1)*(id==='dauerlauf'?0.6:1));
    const run=wpick(rids,rws.every(w=>!w)?rids.map(()=>1):rws,r);
    S.week={wk:WK,bonus,ctype:ct,run,run2:ct==='run'?(run==='dauerlauf'?'int33':'dauerlauf'):run};
  }
  save();
}
function sessEx(sid){const s=SESS.find(x=>x.id===sid);return s.st.map(([k,pool,label])=>({slot:sid+'.'+k,pool,label,id:S.plan.sel[sid+'.'+k]})).filter(e=>e.id);}
function slotOfId(id){for(const k in S.plan.sel)if(S.plan.sel[k]===id)return k;return null;}
function slotLabel(slot){const [sid,k]=slot.split('.');const s=SESS.find(x=>x.id===sid);if(!s)return '';const st=s.st.find(x=>x[0]===k);return st?`${s.name} · ${st[2]}`:s.name;}
function swapSlot(slot,id){S.plan.sel[slot]=id;S.plan.user[slot]=true;save();}

/* ---------------- Woche ---------------- */
const doneWk=()=>S.done[WK]||(S.done[WK]={});
function markDone(sid){doneWk()[sid]=TODAY;HISTORY[WK]=Object.keys(doneWk()).length;save();}
function lastStrengthDate(){let best=null;for(const wk in S.done)for(const sid in S.done[wk]){if(isRun(sid))continue;const d=S.done[wk][sid];if(!best||d>best)best=d;}return best;}
function suggestion(){
  const dn=doneWk();const yest=ymd(new Date(NOW().getTime()-DAY));
  const doneToday=Object.entries(dn).filter(([,d])=>d===TODAY).map(([s])=>s);
  const openS=SESS.filter(s=>!s.run&&!dn[s.id]).map(s=>s.id);
  const openR=SESS.filter(s=>s.run&&!dn[s.id]).map(s=>s.id);
  const runOpen=openR.length>0;
  if(!openS.length&&!runOpen)return {kind:'complete'};
  if(doneToday.length){
    let nx=openS[0]||openR[0]||null;
    return {kind:'today',done:doneToday,next:nx};
  }
  // 48 h je Muskelregion: was wurde gestern belastet?
  const regOf=sid=>{const x=SESS.find(z=>z.id===sid);return x?(x.reg||'full'):'full';};
  const clash=(a,b)=>a!=='light'&&b!=='light'&&(a==='full'||b==='full'||a===b);
  const yReg=[];for(const wk in S.done)for(const sid in S.done[wk])if(!isRun(sid)&&S.done[wk][sid]===yest)yReg.push(regOf(sid));
  if(yReg.length){
    const free=openS.find(sid=>!yReg.some(r=>clash(r,regOf(sid))));
    if(free)return {kind:'go',sid:free,note:free!==openS[0]?'Die eigentlich nächste Einheit trifft die Muskeln von gestern, deshalb heute diese.':null};
    if(runOpen)return {kind:'go',sid:openR[0],note:'Gestern war Krafttag für dieselben Muskeln. Heute Ausdauer oder Pause.'};
    return {kind:'go',sid:openS[0],note:'Gestern waren dieselben Muskeln dran. Wenn möglich heute Pause.'};
  }
  if(openS.length)return {kind:'go',sid:openS[0]};
  return {kind:'go',sid:openR[0]};
}

/* ---------------- Figuren ---------------- */
function figEx(id,opt){
  const ALIAS={int33:'int44',dauerlauf:'int44',gehen:'farmer'};
  if(!(window.EXA&&EXA[id])&&ALIAS[id]){if(id==='gehen')opt=Object.assign({},opt,{nodb:true});id=ALIAS[id];}
  let ex=window.EXA&&EXA[id];
  if(!ex)return null;
  if(opt&&opt.nodb){ex=Object.assign({},ex,{props:(ex.props||[]).filter(p=>p.t!=='db')});}
  else if(EX[id]&&!(opt&&opt.raw)){const src=loadSrc(id);const r=(window.REQ||{})[id];
    if(src==='kb')ex=Object.assign({},ex,{props:(ex.props||[]).map(p=>p.t==='db'?{t:'kb',j:p.j,s:p.s}:p)});
    else if(src==='bb')ex=Object.assign({},ex,{props:(ex.props||[]).filter(p=>!(p.t==='db'&&p.j==='ha2')).map(p=>p.t==='db'?{t:'bb',j:p.j}:p)});
    else if(r&&r.load&&!src&&!(r.rq||[]).length)ex=Object.assign({},ex,{props:(ex.props||[]).filter(p=>p.t!=='db')});}
  return ex;
}
function mountFig(el,id,opt){
  if(!el)return;const ex=figEx(id,opt);
  if(!ex){el.innerHTML=`<div style="display:grid;place-items:center;height:100%;color:var(--ink3);font-size:11px">${esc((EX[id]||{}).n||id)}</div>`;return;}
  FIG.mount(el,ex,{aspect:(opt&&opt.aspect)||1.2,still:opt&&opt.still});
}
function mountAll(root){$$('[data-fig]',root||document).forEach(el=>mountFig(el,el.dataset.fig,{aspect:+(el.dataset.aspect||1.15),still:el.dataset.still!==undefined?+el.dataset.still:undefined,nodb:el.dataset.nodb==='1'}));}

/* ---------------- Icons ---------------- */
const I={
 up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H4V10h3zM7 10l4-8c1.7 0 2.8 1.2 2.4 3L13 9h6.2c1.3 0 2.2 1.2 1.9 2.4l-2 8A2 2 0 0 1 17.2 21H7"/></svg>',
 down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14V3H4v11h3zM7 14l4 8c1.7 0 2.8-1.2 2.4-3L13 15h6.2c1.3 0 2.2-1.2 1.9-2.4l-2-8A2 2 0 0 0 17.2 3H7"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>',
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 swap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
 info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
 video:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm13 4l4-2.5v9L17 14z"/></svg>',
 fig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="4.5" r="2"/><path d="M12 7v7M12 14l-4 7M12 14l4 7M7 10h10"/></svg>',
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r="1.4" fill="currentColor"/><circle cx="4" cy="12" r="1.4" fill="currentColor"/><circle cx="4" cy="18" r="1.4" fill="currentColor"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M6 16l4-5 3 3 5-7"/></svg>',
 book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5"/></svg>',
 skip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l8 7-8 7zM17 5v14"/></svg>',
 plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
};

/* ---------------- Ton, Display wach ---------------- */
let AC=null;
function audio(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){}}
function beep(f,dur,vol){if(!S.settings.sound||!AC)return;try{const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=f||880;o.type='sine';const t=AC.currentTime;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.3,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.15));o.start(t);o.stop(t+(dur||0.15)+0.02);}catch(e){}}
const tick=()=>beep(660,0.08,0.18);
const ding=()=>{beep(880,0.16);setTimeout(()=>beep(1175,0.22),170);if(navigator.vibrate)navigator.vibrate([90,60,90]);};
let WL=null;
async function wake(on){try{if(on&&'wakeLock' in navigator){WL=await navigator.wakeLock.request('screen');}else if(!on&&WL){await WL.release();WL=null;}}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&P.on)wake(true);});

function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2400);}

/* ---------------- Sheet ---------------- */
function openSheet(html,onMount){const sh=$('#sheet');sh.innerHTML='<div class="grab"></div><button class="sheet-x" aria-label="Schließen">'+I.x+'</button>'+html;$('.sheet-x',sh).onclick=closeSheet;$('#sheetbg').classList.add('on');sh.classList.add('on');sh.scrollTop=0;if(onMount)onMount(sh);mountAll(sh);}
function closeSheet(){vidStop();const sh=$('#sheet');$$('[data-fig]',sh).forEach(el=>FIG.unmount(el));sh.classList.remove('on');$('#sheetbg').classList.remove('on');setTimeout(()=>{if(!sh.classList.contains('on'))sh.innerHTML='';},300);}

/* ---------------- Video ----------------
   Eingebettet, nie heruntergeladen. Startpunkt pro Video lokal einstellbar ("Clip ab hier"). */
let YTP=null;const YTQ=[];
function ytApi(cb){if(window.YT&&YT.Player)return cb();YTQ.push(cb);if(YTP)return;YTP=1;const t=document.createElement('script');t.src='https://www.youtube.com/iframe_api';document.head.appendChild(t);
  window.onYouTubeIframeAPIReady=()=>{while(YTQ.length)YTQ.shift()();};}
function clipOf(vid){const c=(S.clip||{})[vid]||{};return {s:c.s||0,e:c.e||0};}
let VP=null,VPT=null;
function vidBox(vid){return `<div class="vwrap"><div class="vbox"><div id="ytp"></div></div><div class="vctl"><button data-clip="s">Clip ab hier</button><button data-clip="e">Ende hier</button><button data-clip="r">Zurücksetzen</button></div></div>`;}
function vidMount(root,vid){
  clearInterval(VPT);try{VP&&VP.destroy&&VP.destroy();}catch(e){}VP=null;
  const host=$('#ytp',root);if(!host)return;
  const show=()=>{const c=clipOf(vid);const ctl=$('.vctl',root);if(ctl)ctl.dataset.info=c.s||c.e?`Clip ${c.s}s${c.e?' bis '+c.e+'s':''}`:'';};
  ytApi(()=>{if(!document.body.contains(host))return;const c=clipOf(vid);
    VP=new YT.Player(host,{videoId:vid,width:'100%',height:'100%',playerVars:{autoplay:1,mute:1,playsinline:1,controls:0,rel:0,modestbranding:1,iv_load_policy:3,start:c.s,disablekb:1},
      events:{onReady:e=>{e.target.mute();e.target.seekTo(clipOf(vid).s,true);e.target.playVideo();},
              onStateChange:e=>{if(e.data===0){e.target.seekTo(clipOf(vid).s,true);e.target.playVideo();}}}});
    VPT=setInterval(()=>{try{const c=clipOf(vid);if(VP&&VP.getCurrentTime&&c.e&&VP.getCurrentTime()>=c.e)VP.seekTo(c.s,true);}catch(e){}},250);
  });
  $$('[data-clip]',root).forEach(b=>b.onclick=e=>{e.stopPropagation();S.clip=S.clip||{};const cur=S.clip[vid]||{};let t=0;try{t=Math.floor(VP.getCurrentTime());}catch(err){}
    if(b.dataset.clip==='s'){cur.s=t;if(cur.e&&cur.e<=t)delete cur.e;toast('Clip startet jetzt bei '+t+' s');}
    else if(b.dataset.clip==='e'){if(t>(cur.s||0)){cur.e=t;toast('Clip endet bei '+t+' s');VP.seekTo(cur.s||0,true);}}
    else{delete S.clip[vid];toast('Clip zurückgesetzt');try{VP.seekTo(0,true);}catch(err){}}
    if(b.dataset.clip!=='r')S.clip[vid]=cur;save();show();});
  show();
}
function vidStop(){clearInterval(VPT);try{VP&&VP.destroy&&VP.destroy();}catch(e){}VP=null;}

/* ---------------- Übungsdetail ---------------- */
function doseChips(id){
  const x=EX[id];const ch=[];
  ch.push(x.tgt+(x.type==='time'?'':' Wdh')+(x.side?' pro Seite':''));
  const src=loadSrc(id);if(x.kg&&src){const k=fitKg(x.kg,id);if(k)ch.push((x.n2&&src!=='bb'?'2 × ':'')+k+' kg');}
  if(x.type!=='run'&&['beine','zug','druck'].includes(x.cat))ch.push('1–2 Wdh in Reserve');
  return ch;
}
function rateBar(id,ctx){
  const r=rateOf(id);const why=S.rate[id]&&S.rate[id].why;
  return `<div class="ratebar"><span>${r===1?'Gefällt dir, kommt öfter':r===-1?'Abgewählt, fliegt ab nächster Woche raus':'Wie findest du die Übung?'}</span>
   <div class="thumbs"><button class="th up ${r===1?'on':''}" data-rate="1" data-id="${id}" aria-label="Daumen hoch">${I.up}</button><button class="th down ${r===-1?'on':''}" data-rate="-1" data-id="${id}" aria-label="Daumen runter">${I.down}</button></div></div>
   ${r===-1?`<div class="reasons">${['Schmerz','Langweilig','Aufbau nervt','Zu leicht'].map(w=>`<button data-why="${w}" data-id="${id}" class="${why===w?'on':''}">${w}</button>`).join('')}</div>`:''}`;
}
function bindRate(root,after){
  $$('[data-rate]',root).forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.id,v=+b.dataset.rate;const cur=rateOf(id);setRate(id,cur===v?0:v);if(cur!==v&&v===-1)toast('Abgewählt. Ab nächster Woche ersetzt.');if(cur!==v&&v===1)toast('Gemerkt, kommt öfter.');after&&after();});
  $$('[data-why]',root).forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.id,w=b.dataset.why;
    if(w==='Zu leicht'){setRate(id,0);S.flags[id]={hard:true,d:TODAY};save();toast('Bleibt drin. Nächstes Mal schwerer: '+EX[id].p);}
    else{S.rate[id]={...S.rate[id],why:w};save();}
    after&&after();});
}
function exDetail(id){
  const x=EX[id];const v=window.VID&&VID[id];const slot=S.plan&&slotOfId(id);
  const render=()=>{
    openSheet(`<div class="pat">${esc(x.pat)}</div><h3>${esc(x.n)}</h3>
      <div class="media" id="dmedia"><div class="fig" data-fig="${id}" data-aspect="1.25"></div></div>
      ${v?`<div class="mtoggle"><button class="on" data-m="fig">${I.fig} Animation</button><button data-m="v">${I.video} Video</button>${v.alt?'<button data-m="alt">Alternative</button>':''}</div>`:''}
      <div class="dose">${doseChips(id).map(c=>`<span>${esc(c)}</span>`).join('')}</div>
      <ul class="cues">${x.c.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
      <div class="kv"><b>Häufigster Fehler:</b> ${esc(x.e)}</div>
      <div class="kv"><b>Schwerer:</b> ${esc(x.p)}</div>
      <div class="kv"><b>Leichter:</b> ${esc(x.r)}</div>
      <div class="kv"><b>Muskeln:</b> ${esc(x.m)} · <b>Evidenz</b> ${esc(x.g)}</div>
      ${slot?`<div class="small" style="margin-top:6px">Aktuell in ${esc(slotLabel(slot))}</div>`:''}
      ${x.type!=='run'?rateBar(id):''}
      ${v?`<div class="small" style="margin-top:12px">Video: ${esc(v.c)} · <a href="https://www.youtube.com/watch?v=${v.v}" target="_blank" rel="noopener" style="color:var(--ink3)">auf YouTube öffnen</a></div>`:''}`,
    sh=>{
      bindRate(sh,render);
      $$('.mtoggle button',sh).forEach(b=>b.onclick=()=>{
        $$('.mtoggle button',sh).forEach(o=>o.classList.toggle('on',o===b));
        const m=$('#dmedia',sh);const f=m.querySelector('.fig');if(f)FIG.unmount(f);
        vidStop();if(b.dataset.m==='fig'){m.innerHTML=`<div class="fig" data-fig="${id}" data-aspect="1.25"></div>`;mountAll(m);}
        else{const vid=b.dataset.m==='alt'?v.alt:v.v;m.innerHTML=vidBox(vid);vidMount(m,vid);}
      });
    });
  };
  render();
}

/* ---------------- Heute ---------------- */
function ringSvg(frac,col){const r=23,c=2*Math.PI*r;return `<svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="27" cy="27" r="${r}" fill="none" stroke="${col||'var(--accent)'}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(c*frac).toFixed(1)} ${c.toFixed(1)}"/></svg>`;}
function streak(){const g=goalOf();let n=0;const d=monday(NOW());d.setDate(d.getDate()-7);for(let i=0;i<200;i++){const k=wkKey(d);if((HISTORY[k]||0)>=g){n++;d.setDate(d.getDate()-7);}else break;}if((HISTORY[WK]||0)>=g)n++;return n;}
function sessCard(sid,sug){
  const s=SESS.find(x=>x.id===sid);
  if(s.run){const rid=runIdOf(sid);const x=EX[rid];const cd=CARDIO[s.ctype]||CARDIO.run;
    return `<div class="next runcard"><div class="lbl">${sug&&sug.note?'Vorschlag':'Als Nächstes'}</div><div class="ttl">${esc(x.n)}</div><div class="sub">${esc(x.tgt)} · ${esc(x.c[0])}</div>
      ${sug&&sug.note?`<div class="note">${esc(sug.note)}</div>`:''}
      <div class="stgrid" style="grid-template-columns:1fr 2fr"><div class="stc"><div class="fig" data-fig="${cd.fig}" data-aspect="1" ${cd.nodb?'data-nodb="1"':''}></div></div><div style="font-size:13px;color:#d9d2c6;align-self:center">Timer mit Signalton pro Phase. Oder einfach mit der Uhr machen und hier abhaken.</div></div>
      <div class="btnrow"><button class="btn pri" data-start="${sid}">${I.play} Timer starten</button><button class="btn sec" data-markrun="${sid}">Erledigt</button></div></div>`;}
  const ex=sessEx(sid);
  return `<div class="next"><div class="lbl">${sug&&sug.note?'Vorschlag':'Als Nächstes'}</div><div class="ttl">${esc(s.name)}</div><div class="sub">${esc(s.sub)}</div>
    ${sug&&sug.note?`<div class="note">${esc(sug.note)}</div>`:''}
    <div class="stgrid">${ex.map(e=>`<button class="stc" data-ex="${e.id}"><div class="fig" data-fig="${e.id}" data-aspect="1"></div><div class="nm">${esc(EX[e.id].n)}</div></button>`).join('')}</div>
    <div class="btnrow"><button class="btn pri" data-start="${sid}">${I.play} Start · ≈${estMin()} Min</button><button class="btn sec" data-short="${sid}">Express</button></div>
    <div class="hint">Express: nur 1 Runde, etwa ${Math.max(4,Math.round(cfgOf(prof()).stations*1.2))} Minuten. Zählt trotzdem für die Woche.</div></div>`;
}
function renderHome(){
  ensurePlan();
  const d=NOW();const dn=doneWk();const cnt=SESS.filter(s=>dn[s.id]).length;const tot=SESS.length,goal=goalOf();
  const dateStr=d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});
  const sug=suggestion();
  let main='';
  if(sug.kind==='complete'){main=`<div class="next donecard"><div class="lbl" style="color:#d8ecd0">Woche komplett</div><div class="ttl">Alles erledigt.</div><div class="sub" style="color:#d8ecd0">Nächste Woche geht es weiter. Wer mag, macht eine Einheit nochmal.</div></div>`;}
  else if(sug.kind==='today'){
    main=`<div class="next donecard"><div class="lbl" style="color:#d8ecd0">Heute erledigt</div><div class="ttl">${sug.done.map(s=>esc(SESS.find(x=>x.id===s).name)).join(' + ')} ${I.check.replace('<svg','<svg style="width:26px;height:26px;vertical-align:-3px"')}</div><div class="sub" style="color:#d8ecd0">${sug.next?'Als Nächstes: '+esc(SESS.find(x=>x.id===sug.next).name)+', am besten morgen.':'Woche fast geschafft.'}</div></div>`;
  }else main=sessCard(sug.sid,sug);
  const b=curBlock()+1, wib=weekInBlock();
  $('#v-home').innerHTML=`
   <div class="top"><div><div class="date">${esc(dateStr)}</div><h1>Heute</h1></div><button class="iconbtn" id="gear" aria-label="Einstellungen">${I.gear}</button></div>
   <div class="weekbar"><div class="ring">${ringSvg(Math.min(1,cnt/tot),cnt>=goal?'var(--good)':'var(--accent)')}<b>${cnt}/${tot}</b></div>
     <div style="flex:1"><div class="wkpills">${SESS.map(s=>`<span class="pill ${dn[s.id]?'done':''}">${dn[s.id]?I.check:''}${s.run?esc(s.name):s.name.replace('Ganzkörper ','')}</span>`).join('')}</div>
     <div class="wkmeta"><span>Ziel: ${goal} von ${tot}</span><span>${streak()} ${streak()===1?'Woche':'Wochen'} in Folge</span></div></div></div>
   ${main}
   <h2>Diese Woche</h2>
   <div class="slist">${SESS.map(s=>{const done=dn[s.id];
     if(s.run){const x=EX[runIdOf(s.id)];const cd=CARDIO[s.ctype]||CARDIO.run;return `<button class="srow ${done?'done':''}" data-sess="${s.id}"><div class="minis"><div class="mini" data-fig="${cd.fig}" ${cd.nodb?'data-nodb="1"':''} data-aspect="1" data-still="0.3"></div></div><div class="t"><b>${esc(s.name)}</b><span>${esc(x.n)} · ${esc(x.tgt)}</span></div><div class="ok">${I.check}</div></button>`;}
     const ex=sessEx(s.id);return `<button class="srow ${done?'done':''}" data-sess="${s.id}"><div class="minis">${ex.map(e=>`<div class="mini" data-fig="${e.id}" data-aspect="1" data-still="0.35"></div>`).join('')}</div><div class="t"><b>${esc(s.name)}</b><span>${done?'Erledigt '+fmtD(done):esc(ex.map(e=>EX[e.id].n).join(', '))}</span></div><div class="ok">${I.check}</div></button>`;}).join('')}</div>
   <div class="blockinfo">Block ${b} · Woche ${wib} von 4. ${wib<4?`Neue Übungsauswahl in ${5-wib} ${5-wib===1?'Woche':'Wochen'}.`:'Nächste Woche neue Übungsauswahl.'} Daumen runter wirkt ab nächster Woche, Tauschen sofort.</div>`;
  mountAll($('#v-home'));
  $('#gear').onclick=openSettings;
  $$('#v-home [data-start]').forEach(b=>b.onclick=()=>{audio();isRun(b.dataset.start)?startRun(b.dataset.start):startSession(b.dataset.start,false);});
  $$('#v-home [data-short]').forEach(b=>b.onclick=()=>{audio();startSession(b.dataset.short,true);});
  $$('#v-home [data-markrun]').forEach(b=>b.onclick=()=>{const sid=b.dataset.markrun;markDone(sid);S.sessions.push({d:TODAY,sid,ex:runIdOf(sid),manual:true});save();toast('Abgehakt.');renderAll();});
  $$('#v-home [data-ex]').forEach(b=>b.onclick=()=>exDetail(b.dataset.ex));
  $$('#v-home [data-sess]').forEach(b=>b.onclick=()=>sessSheet(b.dataset.sess));
}
function sessSheet(sid){
  const s=SESS.find(x=>x.id===sid);const done=doneWk()[sid];
  if(s.run){const rid=runIdOf(sid);const cd=CARDIO[s.ctype]||CARDIO.run;const key=sid==='RUN2'?'run2':'run';
    openSheet(`<div class="pat">${esc(s.name)}</div><h3>${esc(EX[rid].n)}</h3><div class="media"><div class="fig" data-fig="${cd.fig}" ${cd.nodb?'data-nodb="1"':''} data-aspect="1.4"></div></div>
     <ul class="cues">${EX[rid].c.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
     ${POOLS[cd.pool].length>1?`<h2 style="margin-top:14px">Diese Woche</h2>`:''}
     <div class="altlist">${(POOLS[cd.pool].length>1?POOLS[cd.pool]:[]).map(id=>`<button class="excard ${id===rid?'':''}" data-run="${id}"><div class="t"><b>${esc(EX[id].n)} ${id===rid?'<span class="tag rot">gewählt</span>':''}</b><span>${esc(EX[id].tgt)} · ${esc(EX[id].c[0])}</span></div><div class="thumbs"><button class="th up ${rateOf(id)===1?'on':''}" data-rate="1" data-id="${id}">${I.up}</button><button class="th down ${rateOf(id)===-1?'on':''}" data-rate="-1" data-id="${id}">${I.down}</button></div></button>`).join('')}</div>
     <div class="btnrow" style="margin-top:14px"><button class="btn pri" id="go">${I.play} Timer starten</button><button class="btn ghost" id="mk" style="flex:0 0 auto;padding:0 16px">${done?'Erledigt ✓':'Abhaken'}</button></div>`,
    sh=>{bindRate(sh,()=>sessSheet(sid));$$('[data-run]',sh).forEach(b=>b.onclick=e=>{if(e.target.closest('.th'))return;S.week[key]=b.dataset.run;save();sessSheet(sid);renderHome();});
      $('#go',sh).onclick=()=>{audio();closeSheet();startRun(sid);};$('#mk',sh).onclick=()=>{if(!done){markDone(sid);S.sessions.push({d:TODAY,sid,ex:runIdOf(sid),manual:true});save();toast('Abgehakt.');}closeSheet();renderAll();};});
    return;}
  const ex=sessEx(sid);const bonus=S.week.bonus[sid]||{id:null,theme:''};
  openSheet(`<div class="pat">${esc(s.sub)}</div><h3>${esc(s.name)}</h3>${done?`<div class="small" style="margin-top:4px">Erledigt am ${fmtD(done)}</div>`:''}
   <h2 style="margin-top:16px">Stationen</h2>
   ${ex.map((e,i)=>`<div class="excard" data-exd="${e.id}"><div class="fig" data-fig="${e.id}" data-aspect="1"></div><div class="t"><b>${i+1}. ${esc(EX[e.id].n)}</b><span>${esc(e.label)} · ${esc(doseChips(e.id).slice(0,2).join(' · '))}</span>
     <div style="display:flex;gap:6px;margin-top:6px"><button class="chip" data-swap="${e.slot}" style="padding:5px 10px;font-size:12px">${I.swap.replace('<svg','<svg style="width:13px;height:13px;vertical-align:-2px"')} Tauschen</button></div></div>
     <div class="thumbs" style="flex-direction:column"><button class="th up ${rateOf(e.id)===1?'on':''}" data-rate="1" data-id="${e.id}">${I.up}</button><button class="th down ${rateOf(e.id)===-1?'on':''}" data-rate="-1" data-id="${e.id}">${I.down}</button></div></div>`).join('')}
   ${bonus.id?`<h2>Bonus · optional · ${esc(bonus.theme)}</h2>
   <div class="excard" data-exd="${bonus.id}"><div class="fig" data-fig="${bonus.id}" data-aspect="1"></div><div class="t"><b>${esc(EX[bonus.id].n)}</b><span>2 Runden am Ende, wenn du Lust hast</span></div></div>`:''}
   <div class="btnrow" style="margin-top:16px"><button class="btn pri" id="go">${I.play} ${done?'Nochmal':'Start'}</button><button class="btn ghost" id="gos" style="flex:0 0 auto;padding:0 16px">Express</button></div>
   <div class="small" style="margin-top:8px">Express: nur 1 Runde, etwa ${Math.max(4,Math.round(cfgOf(prof()).stations*1.2))} Minuten, ohne Aufwärmen. Zählt trotzdem für die Woche.</div>`,
  sh=>{bindRate(sh,()=>{sessSheet(sid);renderHome();});
    $$('[data-exd]',sh).forEach(c=>c.onclick=e=>{if(e.target.closest('button'))return;exDetail(c.dataset.exd);});
    $$('[data-swap]',sh).forEach(b=>b.onclick=e=>{e.stopPropagation();swapSheet(b.dataset.swap,()=>{sessSheet(sid);renderHome();});});
    $('#go',sh).onclick=()=>{audio();closeSheet();startSession(sid,false);};
    $('#gos',sh).onclick=()=>{audio();closeSheet();startSession(sid,true);};});
}
function swapSheet(slot,after){
  const pool=slotsAll().find(s=>s.slot===slot).pool;const cur=S.plan.sel[slot];
  const others=new Set(Object.entries(S.plan.sel).filter(([k])=>k!==slot).map(([,v])=>v));
  const ids=poolIds(pool,slot.split('.')[1]).filter(id=>id!==cur);
  ids.sort((a,b)=>(rateOf(b)-rateOf(a))||((others.has(a)?1:0)-(others.has(b)?1:0)));
  openSheet(`<div class="pat">Tauschen · ${esc(slotLabel(slot))}</div><h3>Statt ${esc(EX[cur].n)}</h3><div class="small" style="margin:6px 0 14px">Gilt für den Rest des Blocks. Gleiches Bewegungsmuster, damit nichts fehlt.</div>
   <div class="altlist">${ids.map(id=>`<button class="excard ${rateOf(id)===-1?'dis':''}" data-pick="${id}"><div class="fig" data-fig="${id}" data-aspect="1"></div><div class="t"><b>${esc(EX[id].n)}</b><span>${esc(doseChips(id).slice(0,2).join(' · '))}</span>${rateOf(id)===1?'<span class="tag up">gemocht</span>':''}${rateOf(id)===-1?'<span class="tag down">abgewählt</span>':''}${others.has(id)?'<span class="tag">schon in anderer Einheit</span>':''}</div></button>`).join('')}</div>`,
  sh=>{$$('[data-pick]',sh).forEach(b=>b.onclick=()=>{swapSlot(slot,b.dataset.pick);toast('Getauscht: '+EX[b.dataset.pick].n);closeSheet();setTimeout(()=>after&&after(),320);});});
}

/* ---------------- Übungen ---------------- */
let LIBF='alle';
function renderLib(){
  ensurePlan();
  const inRot=new Set(Object.values(S.plan.sel));
  const pools=new Set(Object.values(POOLS).flat());
  const flt=id=>LIBF==='alle'||(LIBF==='aktuell'&&inRot.has(id))||(LIBF==='up'&&rateOf(id)===1)||(LIBF==='down'&&rateOf(id)===-1);
  let h=`<div class="top"><div><div class="date">${Object.keys(EX).length} Übungen</div><h1>Übungen</h1></div></div>
   <div class="chips">${[['alle','Alle'],['aktuell','Aktueller Block'],['up','Gemocht'],['down','Abgewählt']].map(([k,l])=>`<button class="chip ${LIBF===k?'on':''}" data-f="${k}">${l}</button>`).join('')}</div>`;
  let any=false;
  for(const [cat,label] of CATS){
    const ids=Object.keys(EX).filter(id=>EX[id].cat===cat&&flt(id));if(!ids.length)continue;any=true;
    h+=`<h2>${esc(label)}</h2>`;
    h+=ids.map(id=>{const x=EX[id],r=rateOf(id);
      return `<button class="excard ${r===-1?'dis':''}" data-exd="${id}"><div class="fig" data-fig="${id==='int33'||id==='dauerlauf'?'int44':id}" data-aspect="1"></div><div class="t"><b>${esc(x.n)}</b><span>${esc(x.pat)}</span>
        ${inRot.has(id)?'<span class="tag rot">im Block</span>':''}${r===1?'<span class="tag up">gemocht</span>':''}${r===-1?'<span class="tag down">abgewählt</span>':''}${!pools.has(id)?'<span class="tag">nur Bibliothek</span>':''}${!allowed(id)?'<span class="tag">andere Ausrüstung</span>':''}</div>
        ${x.type!=='run'?`<div class="thumbs"><span class="th up ${r===1?'on':''}" data-rate="1" data-id="${id}" role="button">${I.up}</span><span class="th down ${r===-1?'on':''}" data-rate="-1" data-id="${id}" role="button">${I.down}</span></div>`:''}</button>`;}).join('');
  }
  if(!any)h+=`<div class="empty" style="margin-top:12px">Hier ist noch nichts.</div>`;
  $('#v-lib').innerHTML=h;mountAll($('#v-lib'));
  $$('#v-lib [data-f]').forEach(b=>b.onclick=()=>{LIBF=b.dataset.f;renderLib();});
  bindRate($('#v-lib'),renderLib);
  $$('#v-lib [data-exd]').forEach(c=>c.onclick=e=>{if(e.target.closest('.th'))return;exDetail(c.dataset.exd);});
}

/* ---------------- Fortschritt ---------------- */
function entryBest(e){if(e.sets&&e.sets.length)return Math.max(...e.sets);const n=(String(e.v||'').match(/\d+/g)||[]).map(Number).filter(x=>x<200);return n.length?Math.max(...n):null;}
function spark(vals){const v=vals.filter(x=>x!=null);if(v.length<2)return '';const mn=Math.min(...v),mx=Math.max(...v),w=96,h=36,p=4;const pts=v.map((y,i)=>[p+i*(w-2*p)/(v.length-1),h-p-(mx===mn?0.5:(y-mn)/(mx-mn))*(h-2*p)]);
  return `<svg class="spark" viewBox="0 0 ${w} ${h}"><polyline points="${pts.map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${pts[pts.length-1][0].toFixed(1)}" cy="${pts[pts.length-1][1].toFixed(1)}" r="3" fill="var(--accent)"/></svg>`;}
function renderProg(){
  const total=Object.values(HISTORY).reduce((a,b)=>a+b,0);
  const keys=[];const d=monday(NOW());d.setDate(d.getDate()-7*11);for(let i=0;i<12;i++){keys.push(wkKey(d));d.setDate(d.getDate()+7);}
  const ids=Object.keys(LOG).filter(k=>(LOG[k]||[]).length&&EX[k]).sort((a,b)=>{const la=LOG[a][LOG[a].length-1].d,lb=LOG[b][LOG[b].length-1].d;return lb.localeCompare(la);});
  let h=`<div class="top"><div><div class="date">Seit Beginn</div><h1>Fortschritt</h1></div></div>
   <div class="stats3"><div><b>${total}</b><span>Einheiten</span></div><div><b>${Object.values(HISTORY).filter(v=>v>=3).length}</b><span>Wochen ≥ 3</span></div><div><b>${streak()}</b><span>Serie</span></div></div>
   <h2>Letzte 12 Wochen</h2>
   <div class="weeks">${keys.map(k=>{const v=HISTORY[k]||0;return `<div class="wk"><div class="col" style="height:${6+v/4*48}px;background:${v>=3?'var(--good)':v>0?'var(--accent)':'var(--line)'}"></div><div class="wl">${k.split('-W')[1]}</div></div>`;}).join('')}</div>
   <h2>Übungen</h2>`;
  if(!ids.length)h+=`<div class="empty">Noch keine Einträge. Alles, was du im Training einträgst, landet hier mit Datum.</div>`;
  for(const id of ids){
    const es=LOG[id];const last=es[es.length-1];const bests=es.map(entryBest);const best=Math.max(...bests.filter(x=>x!=null),0);
    const unit=EX[id].type==='time'?' s':'';
    h+=`<div class="prog"><div class="h"><div class="fig" data-fig="${id}" data-aspect="1" data-still="0.3"></div><div class="t"><b>${esc(EX[id].n)}</b><span>Zuletzt ${fmtD(last.d)}: ${esc(last.v)}${best?` · Bestwert ${best}${unit}`:''}</span></div>${spark(bests.slice(-10))}</div>
      <details><summary>Verlauf (${es.length})</summary><table>${[...es].reverse().map(e=>`<tr><td class="d">${fmtD(e.d)}</td><td>${esc(e.v)}</td></tr>`).join('')}</table></details></div>`;
  }
  $('#v-prog').innerHTML=h;mountAll($('#v-prog'));
}

/* ---------------- Wissen ---------------- */
const FACTS=[
 ["Wochenvolumen zählt, nicht der Plan-Typ","B","Bei gleicher Satzzahl pro Woche ist es fast egal, ob du sie auf zwei oder sechs Tage verteilst. Der Ertrag pro Einheit flacht nach zwei, drei harten Sätzen pro Muskel ab, also lohnt das Verteilen. Bis 3× pro Woche ist Ganzkörper am effizientesten. Ab 4× wechseln Ober- und Unterkörper, damit jede Region 48 Stunden Pause hat."],
 ["Was dir Spaß macht, darf bleiben","B","Selbst gewählte Übungen steigern Motivation und Dabeibleiben bei gleichen Kraftzuwächsen. Wie sich Training währenddessen anfühlt, sagt das Weitermachen am besten vorher. Daumen runter ist deshalb kein Luxus, sondern Teil der Methode. Das Bewegungsmuster bleibt immer besetzt, damit nichts Wichtiges rausfällt."],
 ["Vier Wochen pro Auswahl","C","Jede Übung kommt ein- bis zweimal pro Woche. Erst nach drei, vier Einheiten ist Fortschritt sichtbar, die erste geht fürs Einpendeln drauf. Deshalb wechselt die Auswahl alle vier Wochen. Tauschen geht jederzeit."],
 ["Morgens keine Rumpfbeugung unter Last","B","Die Bandscheiben sind nach dem Aufstehen prall gefüllt, die Biegebelastung liegt in der ersten Stunde deutlich höher. Wer früh Beugung vermeidet, hat in Studien weniger Rückenschmerz. Darum: keine Sit-ups, kein Jefferson Curl morgens, Hüftbeuge nie als erste Station, erste Runde mit etwa 70 %."],
 ["Zirkel kostet nichts","B","Gepaarte Sätze sparen gut ein Drittel Zeit ohne Verlust an Kraft oder Muskel. Zwischen zwei Sätzen derselben Übung liegen sowieso drei andere Stationen. Es fühlt sich nur anstrengender an."],
 ["Leichte Gewichte reichen länger als gedacht","A","Leichte Last baut Muskel, solange du nah an die Grenze gehst. Wird ein Gewicht zu leicht, helfen erst einbeinige Varianten, langsames Tempo und kurze Pausen. Danach ist das nächstschwerere Gewicht der größte einzelne Hebel."],
 ["Das Hohlkreuz ist nicht die Ursache","B","Menschen mit Rückenschmerz haben altersbereinigt eher weniger Lordose, nicht mehr. Ziel ist Belastbarkeit, nicht Haltungskorrektur. Kein Übungstyp ist dabei zuverlässig überlegen."],
 ["Laufen hilft dem Rücken doppelt","B","Ein einfaches Gehprogramm senkte Rückfälle um 28 % und verdoppelte fast die schmerzfreie Zeit. Eine Laufeinheit pro Woche erhält die Ausdauer, steigert sie aber kaum. Wer VO2max wirklich heben will, braucht eine zweite."],
 ["Nah an die Grenze, nicht drüber","B","Training bis 1 bis 2 Wiederholungen vor dem Versagen bringt praktisch dasselbe wie echtes Versagen. Kein Pressen, keine Quälerei."],
 ["Marker sind keine Hebel","B","Griffkraft und Co. sagen Lebenserwartung vorher, aber gezieltes Training der Zahl ist nicht als Ursache belegt. Krafttraining insgesamt ist es, mit einem Optimum bei etwa 30 bis 60 Minuten pro Woche. Genau da liegst du."],
 ["Wann Training pausiert","!","Taubheit im Reithosenbereich, Blasen- oder Darmprobleme, zunehmende Lähmung, Fieber mit Rückenschmerz, ungewollter Gewichtsverlust, starker Nachtschmerz. Dann ärztlich abklären statt trainieren."],
];
function renderKnow(){
  $('#v-know').innerHTML=`<div class="top"><div><div class="date">Warum der Plan so ist</div><h1>Wissen</h1></div></div>
   ${FACTS.map(([h,g,p])=>`<div class="fact"><h4>${esc(h)}<i>${g==='!'?'Wichtig':'Evidenz '+g}</i></h4><p>${esc(p)}</p></div>`).join('')}
   <div class="small" style="margin:14px 2px">Evidenz A: mehrere Studien oder Metaanalysen. B: einzelne Studien oder konsistente Kohorten. C: plausibel, wenig direkte Daten.</div>`;
}

/* ---------------- Einstellungen ---------------- */
function openSettings(){
  const st=S.settings;
  const seg=(k,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button data-set="${k}" data-val="${v}" class="${String(st[k])===String(v)?'on':''}">${l}</button>`).join('')}</div>`;
  const p=prof();const eqn=EQUIP.flatMap(g=>g[1]).filter(([k])=>has(k)).map(([,l])=>l);
  openSheet(`<h3>Einstellungen</h3><div style="height:14px"></div>
   <div class="setrow"><div><b>Ausrüstung und Plan</b><span>${p.freq}× Kraft à ${p.dur} Min${p.cardio!=='none'?' · '+p.cardioN+'× '+CARDIO[p.cardio].label:''} · ${esc(eqn.length?eqn.join(', '):'nur Körpergewicht')}</span></div><button class="chip" id="plan">Ändern</button></div>
   <div class="setrow"><div><b>Sätze pro Übung</b><span>Auto = passend zur Dauer (${cfgOf(p).auto}). Eine Einheit dauert so ≈${estMin(p)} Min.</span></div>${seg('sets',[['auto','Auto'],[2,'2'],[3,'3'],[4,'4']])}</div>
   <div class="setrow"><div><b>Ausführung</b><span>Zirkel ist schneller, Sätze ruhiger</span></div>${seg('mode',[['zirkel','Zirkel'],['saetze','Sätze']])}</div>
   <div class="setrow"><div><b>Aufwärmen</b><span>An: vor jedem Training 2 Minuten lockere Bewegung, damit Gelenke und Puls bereit sind. Aus: direkt mit der ersten Übung starten. Überspringen geht auch im Training.</span></div>${seg('warm',[[true,'An'],[false,'Aus']])}</div>
   <div class="setrow"><div><b>Töne</b><span>Signal bei Timer-Ende</span></div>${seg('sound',[[true,'An'],[false,'Aus']])}</div>
   <div class="setrow"><div><b>Neue Übungsauswahl</b><span>Mischt alle Einheiten sofort neu</span></div><button class="chip" id="newblock">Neu mischen</button></div>
   <div class="setrow"><div><b>Daten</b><span>Sichern und auf anderem Gerät laden</span></div><div style="display:flex;gap:6px"><button class="chip" id="exp">Sichern</button><button class="chip" id="imp">Laden</button></div></div>
   <input type="file" id="impf" accept="application/json,.json" style="display:none">
   ${window.CLOUD&&CLOUD.enabled?(CLOUD.user?`<div class="setrow"><div><b>Konto: ${esc(CLOUD.name||'')}</b><span>Daten werden synchronisiert</span></div><button class="chip" id="logout">Abmelden</button></div>`:`<div class="setrow"><div><b>Kein Konto</b><span>Daten nur auf diesem Gerät</span></div><button class="chip" id="login">Anmelden</button></div>`):''}
   <div class="small" style="margin-top:10px">Version 5.3</div>`,
  sh=>{
    $$('[data-set]',sh).forEach(b=>b.onclick=()=>{let v=b.dataset.val;if(v==='true')v=true;else if(v==='false')v=false;else if(!isNaN(+v))v=+v;S.settings[b.dataset.set]=v;save();openSettings();renderHome();});
    $('#plan',sh).onclick=()=>{closeSheet();showWizard(true);};
    const lo=$('#logout',sh);if(lo)lo.onclick=async()=>{await cloudPush();await CLOUD.signOut();localStorage.clear();location.reload();};
    const li=$('#login',sh);if(li)li.onclick=()=>{closeSheet();showLogin(true);};
    $('#newblock',sh).onclick=()=>{const prevSel=S.plan&&S.plan.sel;S.epoch=ymd(monday(NOW()));S.plan=prevSel?{block:-1,sel:prevSel,prev:null}:null;newPlan(0);save();toast('Neue Auswahl erstellt.');closeSheet();renderAll();};
    $('#exp',sh).onclick=()=>{const dump={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith(LSK))dump[k]=localStorage.getItem(k);}const blob=new Blob([JSON.stringify({v:5,exported:new Date().toISOString(),data:dump},null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='training-backup-'+TODAY+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);};
    $('#imp',sh).onclick=()=>$('#impf',sh).click();
    $('#impf',sh).onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const d=JSON.parse(rd.result);
      if(d.data){for(const k in d.data)localStorage.setItem(k,d.data[k]);}
      else{ if(d.history)sset('history',d.history); if(d.log)sset('log',d.log); if(d.weeks)for(const k in d.weeks)sset('wk:'+k,d.weeks[k]); }
      location.reload();}catch(err){toast('Datei konnte nicht gelesen werden.');}};rd.readAsText(f);};
  });
}

/* ---------------- Player ---------------- */
const P={on:false};
function lastEntry(id){const es=LOG[id]||[];for(let i=es.length-1;i>=0;i--)if(es[i].d!==TODAY||!P.on)return es[i];return es[es.length-1]||null;}
function startSession(sid,short){
  ensurePlan();
  const s=SESS.find(x=>x.id===sid);const ex=sessEx(sid);
  const C=cfgOf(prof());const R=short?1:C.rounds;const mode=short?'zirkel':S.settings.mode;
  const steps=[];
  if(S.settings.warm&&C.warm&&!short)WARMUP.forEach((w,i)=>steps.push({k:'warm',i,w}));
  if(mode==='zirkel'){
    for(let r=1;r<=R;r++)ex.forEach((e,i)=>{steps.push({k:'ex',id:e.id,slot:e.slot,st:i,r,R,n:ex.length});
      const lastSt=i===ex.length-1;if(!(lastSt&&r===R))steps.push({k:'rest',t:lastSt?(short?45:C.rrest||45):(short?15:C.rest||15),round:lastSt});});
  }else{
    ex.forEach((e,i)=>{for(let r=1;r<=R;r++){steps.push({k:'ex',id:e.id,slot:e.slot,st:i,r,R,n:ex.length});if(!(i===ex.length-1&&r===R))steps.push({k:'rest',t:r===R?60:75});}});
  }
  if(!short&&S.week.bonus[sid]&&S.week.bonus[sid].id&&!ex.some(e=>e.id===S.week.bonus[sid].id))steps.push({k:'bonus',id:S.week.bonus[sid].id,theme:S.week.bonus[sid].theme});
  steps.push({k:'end'});
  Object.assign(P,{on:true,sid,short,steps,i:0,t0:Date.now(),buf:{},exIds:ex.map(e=>e.id),bonusDone:false,timer:null,media:'fig'});
  $('#player').classList.add('on');document.body.style.overflow='hidden';wake(true);
  renderStep();
}
function stopTimer(){if(P.timer){clearInterval(P.timer);P.timer=null;}}
function closePlayer(){stopTimer();P.on=false;$$('#player [data-fig]').forEach(el=>FIG.unmount(el));$('#player').classList.remove('on');$('#player').innerHTML='';document.body.style.overflow='';wake(false);renderAll();}
function progBar(){if(P.run||!P.steps||!P.steps.length)return '<div class="pl-prog"></div>';const ex=P.steps.filter(s=>s.k==='ex'||s.k==='warm');const idx=P.steps.slice(0,P.i+1).filter(s=>s.k==='ex'||s.k==='warm').length;return `<div class="pl-prog">${ex.map((s,j)=>`<i class="${j<idx-1?'d':j===idx-1&&(P.steps[P.i].k==='ex'||P.steps[P.i].k==='warm')?'c':j<idx?'d':''}"></i>`).join('')}</div>`;}
function shell(body,bottom){
  vidStop();$$('#player [data-fig]').forEach(el=>FIG.unmount(el));
  $('#player').innerHTML=`<div class="pl-top">${progBar()}<button class="pl-x" id="plx" aria-label="Beenden">${I.x}</button></div><div class="pl-body">${body}</div>${bottom?`<div class="pl-bottom">${bottom}</div>`:''}`;
  mountAll($('#player'));
  $('#plx').onclick=quitAsk;
}
function next(){stopTimer();P.i++;if(P.i>=P.steps.length){closePlayer();return;}renderStep();}
function dropEx(id){
  stopTimer();const cur=P.steps[P.i];
  const keep=P.steps.filter((s,j)=>j<P.i||!(s.k==='ex'&&s.id===id));
  const out=[];for(const s of keep){if(s.k==='rest'&&(!out.length||out[out.length-1].k==='rest'||out[out.length-1].k==='warm'))continue;out.push(s);}
  for(let j=out.length-2;j>=0;j--)if(out[j].k==='rest'&&(out[j+1].k==='bonus'||out[j+1].k==='end'))out.splice(j,1);
  P.steps=out;if(!P.buf[id])P.exIds=P.exIds.filter(e=>e!==id);
  if(P.i>=P.steps.length)P.i=P.steps.length-1;
  while(P.steps[P.i]&&P.steps[P.i].k==='rest')P.i++;
  toast((EX[id]?EX[id].n:'Übung')+' heute weggelassen');renderStep();
}
function skipAsk(id){
  openSheet(`<h3>${esc(EX[id].n)}</h3><div class="small" style="margin:6px 0 16px">Was möchtest du überspringen?</div>
    <div class="col"><button class="btn pri" id="k1">Übung heute ganz weglassen</button><button class="btn ghost" id="k2">Nur diesen Satz</button><button class="btn ghost" id="k3">Doch machen</button></div>`,sh=>{
    $('#k1',sh).onclick=()=>{closeSheet();dropEx(id);};$('#k2',sh).onclick=()=>{closeSheet();next();};$('#k3',sh).onclick=closeSheet;});
}
function quitAsk(){
  const doneCount=Object.values(P.buf).reduce((a,b)=>a+b.sets.length,0);
  const cur=P.steps[P.i];const onEx=cur&&cur.k==='ex';
  openSheet(`<h3>Pause oder Ende?</h3><div class="small" style="margin:6px 0 16px">${doneCount} Sätze eingetragen.</div>
    <div class="col">
    <button class="btn pri" id="q3">Weitermachen</button>
    ${onEx?`<button class="btn ghost" id="q4">${esc(EX[cur.id].n)} heute weglassen</button>`:''}
    <button class="btn ghost" id="q1">${doneCount?'Training speichern und beenden':'Training beenden'}</button>
    ${doneCount?'<button class="btn ghost" id="q2">Verwerfen</button>':''}</div>`,sh=>{
    $('#q1',sh).onclick=()=>{closeSheet();if(doneCount){P.i=P.steps.length-1;renderStep();}else closePlayer();};
    const q2=$('#q2',sh);if(q2)q2.onclick=()=>{closeSheet();closePlayer();};
    $('#q3',sh).onclick=closeSheet;
    const q4=$('#q4',sh);if(q4)q4.onclick=()=>{closeSheet();dropEx(cur.id);};});
}
function countdown(sec,onTick,onEnd){
  stopTimer();let left=sec;const end=Date.now()+sec*1000;onTick(left);
  P.timer=setInterval(()=>{const l=Math.max(0,Math.ceil((end-Date.now())/1000));if(l!==left){left=l;if(l<=3&&l>0)tick();onTick(l);}if(l<=0){stopTimer();ding();onEnd();}},200);
}
function ringT(frac){const r=42,c=2*Math.PI*r;return `<svg viewBox="0 0 96 96"><circle cx="48" cy="48" r="${r}" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="48" cy="48" r="${r}" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(c*frac).toFixed(1)} ${c.toFixed(1)}"/></svg>`;}
const mmss=s=>s>=60?`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`:String(s);

function renderStep(){
  const st=P.steps[P.i];
  if(st.k==='warm')return stepWarm(st);
  if(st.k==='ex')return stepEx(st);
  if(st.k==='rest')return stepRest(st);
  if(st.k==='bonus')return stepBonus(st);
  if(st.k==='end')return stepEnd();
}
function nextExStep(){for(let j=P.i+1;j<P.steps.length;j++)if(P.steps[j].k==='ex')return P.steps[j];return null;}
function stepWarm(st){
  const w=st.w;
  shell(`<div class="pl-meta"><span class="st">Aufwärmen ${st.i+1}/${WARMUP.length}</span><span>${P.short?'':'2 Min'}</span></div>
    <div class="pl-media"><div class="fig" data-fig="${w.src}" data-aspect="1.3" ${w.nodb?'data-nodb="1"':''}></div></div>
    <div class="pl-name">${esc(w.n)}</div><div class="pl-cues"><div>Locker, Puls langsam hoch. Erste Runde danach mit etwa 70 %.</div></div>`,
   `<div class="timer"><div class="tring" id="tr">${ringT(1)}<b id="tv">${w.t}</b></div></div>
    <div class="restbtns"><button class="btn ghost" id="skipw">Aufwärmen überspringen</button><button class="btn pri" id="nx" style="flex:0 0 auto;padding:0 18px">Weiter</button></div>`);
  countdown(w.t,l=>{const tv=$('#tv');if(tv){tv.textContent=l;$('#tr').innerHTML=ringT(l/w.t)+`<b id="tv">${l}</b>`;}},next);
  $('#nx').onclick=next;
  $('#skipw').onclick=()=>{stopTimer();while(P.steps[P.i+1]&&P.steps[P.i+1].k==='warm')P.i++;next();};
}
/* Sätze eines Log-Eintrags als [{r,kg}] */
function setsOf(e){if(!e||!e.sets)return [];return e.sets.map((r,i)=>({r,kg:e.kgs?e.kgs[i]:(e.kg!=null?e.kg:null)}));}
function repRange(id){const m=String(EX[id].tgt||'').match(/^(\d+)\s*[–-]\s*(\d+)$/);return m?[+m[1],+m[2]]:null;}
/* Steigern: letztes Mal alle Sätze am oberen Ende mit demselben Gewicht -> nächstes Gewicht */
function progressOf(id){
  if(!loadSrc(id)||EX[id].type==='time')return null;const rr=repRange(id);const le=lastEntry(id);const ss=setsOf(le);
  if(!rr||ss.length<2)return null;const kg=ss[0].kg||0;
  if(!ss.every(x=>x.r>=rr[1]&&(x.kg||0)===kg))return null;
  const nx=weights(id).find(w=>w>kg);
  return nx!=null?{kg:nx,reps:rr[0],from:kg,top:rr[1]}:{kg:null,top:rr[1],from:kg};
}
function prefill(id,r){
  const x=EX[id],src=loadSrc(id),b=P.buf[id],le=lastEntry(id),ls=setsOf(le)[r-1],pr=progressOf(id);
  let val,kg=null;
  if(pr&&pr.kg!=null)val=pr.reps;else if(ls)val=ls.r;else if(b&&b.sets.length)val=b.sets[b.sets.length-1];else val=x.def;
  if(src){if(b&&b.kgs&&b.kgs.length)kg=b.kgs[b.kgs.length-1];else if(pr&&pr.kg!=null)kg=pr.kg;else if(ls&&ls.kg!=null)kg=fitKg(ls.kg,id);else kg=fitKg(x.kg,id);}
  return {val,kg};
}
function setGrid(id,st){
  const R=st.R,b=P.buf[id],le=lastEntry(id),ls=setsOf(le),pr=progressOf(id);
  const today=[];for(let i=0;i<R;i++){const d=b&&b.sets[i]!=null;today.push(d?`<td class="d">${cellTxt(id,b.sets[i],b.kgs?b.kgs[i]:b.kg)}</td>`:(i===(b?b.sets.length:0)?'<td class="now">jetzt</td>':'<td>·</td>'));}
  const last=[];for(let i=0;i<R;i++)last.push(ls[i]?`<td>${cellTxt(id,ls[i].r,ls[i].kg)}</td>`:'<td>·</td>');
  return `<table class="sgrid"><tr><th></th>${Array.from({length:R},(_,i)=>`<th>Satz ${i+1}</th>`).join('')}</tr>
    <tr><th>Heute</th>${today.join('')}</tr>${ls.length?`<tr class="lt"><th>${fmtD(le.d).slice(0,5)}</th>${last.join('')}</tr>`:''}</table>`;
}
function cellTxt(id,r,kg){const t=EX[id].type==='time';return t?r+' s':(kg?`${kg}<i>×</i>${r}`:String(r));}
function stepEx(st){
  const id=st.id,x=EX[id];const v=window.VID&&VID[id];const pf=prefill(id,st.r);
  P.val=pf.val;P.kg=pf.kg;
  const le=lastEntry(id);const flag=S.flags[id];
  const media=P.media==='v'&&v?vidBox(v.v):`<div class="fig" data-fig="${id}" data-aspect="1.3"></div>`;
  const time=x.type==='time';
  shell(`<div class="pl-meta"><span class="st">Station ${st.st+1}/${st.n}</span><span>Runde ${st.r}/${st.R}</span></div>
    <div class="pl-media" id="plm">${media}${v?`<button class="pl-vbtn" id="vt">${P.media==='v'?I.fig+' Animation':I.video+' Video'}</button>`:''}</div>
    <div class="pl-name">${esc(x.n)}</div>
    <div class="pl-sub">${doseChips(id).map(c=>`<span>${esc(c)}</span>`).join('')}${flag&&flag.hard?`<span class="g">Schwerer: ${esc(x.p)}</span>`:''}${(()=>{const pr=progressOf(id);if(!pr||(P.buf[id]&&P.buf[id].sets.length))return '';return pr.kg!=null?`<span class="up">${I.star} Steigern: ${pr.kg} kg</span>`:`<span class="up">${I.star} Steigern: ${esc(x.p)}</span>`;})()}</div>
    <div class="pl-cues">${x.c.slice(0,2).map(c=>`<div>· ${esc(c)}</div>`).join('')}</div>
    <div class="pl-tools"><button class="th up ${rateOf(id)===1?'on':''}" data-rate="1" data-id="${id}">${I.up}</button><button class="th down ${rateOf(id)===-1?'on':''}" data-rate="-1" data-id="${id}">${I.down}</button><button id="swp">${I.swap} Tauschen</button><button id="skp">${I.skip} Überspringen</button><button id="inf">${I.info}</button></div>`,
   (time?`<div class="timer"><button class="iconbtn" id="tm">−</button><div class="tring" id="tr">${ringT(1)}<b id="tv">${mmss(P.val)}</b></div><button class="iconbtn" id="tp">+</button>${x.side?'<div class="tside" id="tsd">Seite 1</div>':''}</div>`
         :`${loadSrc(id)?`<div class="kgrow" id="kgrow"><span class="kgl">${loadSrc(id)==='bb'?'kg gesamt':x.n2?'kg je Hantel':'kg'}</span><div class="kgch">${weights(id).map(w=>`<button data-kgw="${w}" class="${w===P.kg?'on':''}">${w===0?'ohne':w}</button>`).join('')}</div></div>`:''}
           <div class="logger"><div class="step"><button id="vm">−</button><div class="val"><b id="vv">${P.val}</b><span>Wdh${x.side?' / Seite':''}</span></div><button id="vp">+</button></div></div>`)+
    `${setGrid(id,st)}
     <button class="bigbtn" id="done">${time?I.play+' Start':I.check+' Satz fertig'}</button>`);
  if(P.media==='v'&&v)vidMount($('#plm'),v.v);
  // Werkzeuge
  bindRate($('#player'),()=>{$$('#player .pl-tools .th').forEach(b=>{const r=rateOf(id);b.classList.toggle('on',(+b.dataset.rate)===r);});});
  const vt=$('#vt');if(vt)vt.onclick=()=>{P.media=P.media==='v'?'fig':'v';const m=$('#plm');const f=m.querySelector('.fig');if(f)FIG.unmount(f);
    vidStop();m.innerHTML=(P.media==='v'?vidBox(v.v):`<div class="fig" data-fig="${id}" data-aspect="1.3"></div>`)+`<button class="pl-vbtn" id="vt">${P.media==='v'?I.fig+' Animation':I.video+' Video'}</button>`;mountAll(m);if(P.media==='v')vidMount(m,v.v);$('#vt').onclick=vt.onclick;};
  $('#inf').onclick=()=>exDetail(id);
  $('#skp').onclick=()=>skipAsk(id);
  $('#swp').onclick=()=>swapSheet(st.slot,()=>{const nid=S.plan.sel[st.slot];P.steps.forEach(s=>{if(s.k==='ex'&&s.slot===st.slot)s.id=nid;});P.exIds=P.exIds.map(e=>e===id?nid:e);renderStep();});
  if(!time){
    const upd=()=>{$('#vv').textContent=P.val;};
    $('#vm').onclick=()=>{P.val=Math.max(0,P.val-1);upd();};
    $('#vp').onclick=()=>{P.val=P.val+1;upd();};
    $$('[data-kgw]').forEach(bt=>bt.onclick=()=>{P.kg=+bt.dataset.kgw;$$('[data-kgw]').forEach(o=>o.classList.toggle('on',o===bt));});
    const on=$('.kgch .on');if(on)on.scrollIntoView({inline:'center',block:'nearest'});
    $('#done').onclick=()=>{logSet(id,P.val,P.kg);next();};
  }else{
    const total=()=>x.side?P.val*2:P.val;
    const upd=()=>{$('#tv').textContent=mmss(P.val);};
    $('#tm').onclick=()=>{P.val=Math.max(5,P.val-5);upd();};
    $('#tp').onclick=()=>{P.val+=5;upd();};
    $('#done').onclick=()=>{
      const per=P.val;let phase=1;
      $('#tm').style.visibility='hidden';$('#tp').style.visibility='hidden';
      $('#done').outerHTML=`<button class="bigbtn ink" id="stop">${I.check} Fertig</button>`;
      const run=()=>countdown(per,l=>{const tv=$('#tv');if(tv){$('#tr').innerHTML=ringT(l/per)+`<b id="tv">${mmss(l)}</b>`;}},()=>{
        if(x.side&&phase===1){phase=2;const sd=$('#tsd');if(sd)sd.textContent='Seite wechseln';setTimeout(()=>{const sd2=$('#tsd');if(sd2)sd2.textContent='Seite 2';run();},4000);}
        else{logSet(id,per,P.kg);setTimeout(next,700);}
      });
      run();
      $('#stop').onclick=()=>{stopTimer();logSet(id,per,P.kg);next();};
    };
  }
}
function weights(id){const src=id?loadSrc(id):'db';const e=prof().eq;let w=[0];
  if(src==='db')w=w.concat(e.db||[]);else if(src==='kb')w=w.concat(e.kb||[]);else if(src==='bb'){for(let k=20;k<=(e.bb||0);k+=5)w.push(k);}
  return [...new Set(w)].sort((a,b)=>a-b);}
function fitKg(kg,id){if(kg==null)return kg;const w=weights(id);let best=w[0];for(const x of w)if(x<=kg)best=x;if(best===0&&kg>0&&w.length>1)best=w[1];return best;}
function kgSheet(cb,id){
  const opts=weights(id);
  openSheet(`<h3>Gewicht</h3><div class="small" style="margin:4px 0 14px">Pro Hantel. Bei Klimmzug und Dips ist es Zusatzlast. Deine Gewichte stellst du in den Einstellungen ein.</div><div class="reasons">${opts.map(o=>`<button data-kgo="${o}" class="${P.kg===o?'on':''}" style="font-size:16px;padding:10px 14px">${o}</button>`).join('')}</div>`,
  sh=>$$('[data-kgo]',sh).forEach(b=>b.onclick=()=>{cb(+b.dataset.kgo);closeSheet();}));
}
function logSet(id,val,kg){const b=P.buf[id]||(P.buf[id]={sets:[],kgs:[],kg});if(!b.kgs)b.kgs=[];b.sets.push(val);b.kgs.push(kg);b.kg=Math.max(...b.kgs.map(k=>k||0))||kg;}
function stepRest(st){
  const nx=nextExStep();const x=nx&&EX[nx.id];
  shell(`<div class="rest"><div class="lbl">${st.round?'Rundenpause':'Wechsel'}</div><div class="big" id="rv">${st.t}</div>
     ${nx?`<div class="nxt"><div class="fig" data-fig="${nx.id}" data-aspect="1"></div><div><span>Als Nächstes${nx.r>1&&st.round?' · Runde '+nx.r:''}</span><b>${esc(x.n)}</b><span>${esc(doseChips(nx.id)[0])}</span></div></div>`:''}</div>`,
   `<div class="restbtns"><button class="btn ghost" id="add">+15 s</button><button class="btn pri" id="go">Weiter</button></div>`);
  let t=st.t;const run=()=>countdown(t,l=>{const rv=$('#rv');if(rv)rv.textContent=l;},next);run();
  $('#add').onclick=()=>{const rv=$('#rv');t=(+rv.textContent)+15;run();};
  $('#go').onclick=next;
}
function stepBonus(st){
  const x=EX[st.id];
  shell(`<div class="rest"><div class="lbl">Bonus · ${esc(st.theme)}</div><div style="font-size:30px;font-weight:700;letter-spacing:-.03em">Noch 2 Minuten?</div>
     <div class="nxt"><div class="fig" data-fig="${st.id}" data-aspect="1"></div><div><b>${esc(x.n)}</b><span>2 Runden · ${esc(doseChips(st.id)[0])}</span></div></div>
     <div class="small" style="margin-top:14px;max-width:300px">Optional. Zählt nicht für die Woche, tut aber dem ${st.theme.startsWith('Nacken')?'Nacken':st.theme.startsWith('Beine')?'Unterbau':'Körper'} gut.</div></div>`,
   `<div class="restbtns"><button class="btn ghost" id="sk">Fertig für heute</button><button class="btn pri" id="go">Bonus machen</button></div>`);
  $('#sk').onclick=next;
  $('#go').onclick=()=>{P.bonusDone=true;const ins=[{k:'ex',id:st.id,slot:null,st:0,r:1,R:2,n:1,bonus:true},{k:'rest',t:30},{k:'ex',id:st.id,slot:null,st:0,r:2,R:2,n:1,bonus:true}];P.steps.splice(P.i+1,0,...ins);if(!P.exIds.includes(st.id))P.exIds.push(st.id);next();};
}
function fmtSets(id,b){const x=EX[id];const u=x.type==='time'?' s':'';const k=(b.kgs||[]).filter(v=>v!=null);
  if(k.length&&new Set(k).size>1)return b.sets.map((r,i)=>`${b.kgs[i]||0}×${r}`).join(' · ')+' (kg×Wdh)';
  return b.sets.join(' · ')+u+(b.kg?` · ${b.kg} kg`:'');}
function stepEnd(){
  stopTimer();
  const mins=Math.max(1,Math.round((Date.now()-P.t0)/60000));
  const ids=P.exIds.filter(id=>P.buf[id]);
  const prs=[];
  for(const id of ids){const b=P.buf[id];const best=Math.max(...b.sets);const kg=b.kg||0;
    const prev=(LOG[id]||[]).filter(e=>e.d!==TODAY);if(!prev.length)continue;
    let prevBest=0,prevKg=0;for(const e of prev){if(e.sets){const ek=e.kg||0;if(ek>prevKg){prevKg=ek;prevBest=Math.max(...e.sets);}else if(ek===prevKg)prevBest=Math.max(prevBest,...e.sets);}}
    if(kg>prevKg||(kg===prevKg&&best>prevBest&&prevBest>0))prs.push(`${EX[id].n}: ${best}${EX[id].type==='time'?' s':''}${kg?' mit '+kg+' kg':''}`);}
  const sets=Object.values(P.buf).reduce((a,b)=>a+b.sets.length,0);
  shell(`<div class="summary"><div class="pl-meta" style="margin-top:10px"><span class="st">Geschafft</span><span>${P.short?'Express':''}</span></div>
     <h3>${esc(SESS.find(s=>s.id===P.sid).name)} ✓</h3>
     <div class="sumstats"><div><b>${mins}</b><span>Minuten</span></div><div><b>${sets}</b><span>Sätze</span></div><div><b>${(HISTORY[WK]||0)+(doneWk()[P.sid]?0:1)}/${SESS.length}</b><span>Diese Woche</span></div></div>
     ${prs.map(p=>`<div class="pr">${I.star} Neuer Bestwert · ${esc(p)}</div>`).join('')}
     <h2>Wie war's?</h2><div class="small" style="margin:-6px 0 6px">Daumen runter fliegt ab nächster Woche raus. Daumen hoch kommt öfter.</div>
     ${P.exIds.map(id=>`<div class="rrow" data-rr="${id}"><div class="h"><div class="fig" data-fig="${id}" data-aspect="1" data-still="0.4"></div><div class="nm">${esc(EX[id].n)}<span>${P.buf[id]?esc(fmtSets(id,P.buf[id])):'nicht gemacht'}</span></div><div class="thumbs"><button class="th up ${rateOf(id)===1?'on':''}" data-rate="1" data-id="${id}">${I.up}</button><button class="th down ${rateOf(id)===-1?'on':''}" data-rate="-1" data-id="${id}">${I.down}</button></div></div>${rateOf(id)===-1?`<div class="reasons">${['Schmerz','Langweilig','Aufbau nervt','Zu leicht'].map(w=>`<button data-why="${w}" data-id="${id}" class="${S.rate[id]&&S.rate[id].why===w?'on':''}">${w}</button>`).join('')}</div>`:''}</div>`).join('')}
     </div>`,
   `<button class="bigbtn good" id="fin">${I.check} Speichern</button>`);
  $('#plx').onclick=()=>finish(mins);
  const rer=()=>{const sc=$('.pl-body').scrollTop;stepEnd();$('.pl-body').scrollTop=sc;};
  bindRate($('#player'),rer);
  $('#fin').onclick=()=>finish(mins);
}
function finish(mins){
  for(const id in P.buf){const b=P.buf[id];const arr=LOG[id]||(LOG[id]=[]);const ent={d:TODAY,v:fmtSets(id,b),sets:b.sets,kg:b.kg||null};if(b.kgs&&b.kgs.some(k=>k!=null))ent.kgs=b.kgs;
    const i=arr.findIndex(e=>e.d===TODAY);if(i>=0)arr[i]=ent;else arr.push(ent);LOG[id]=arr.slice(-60);}
  const exSteps=P.steps.filter(s=>s.k==='ex'&&!s.bonus).length;const doneSets=Object.entries(P.buf).filter(([id])=>!P.steps.find(s=>s.k==='ex'&&s.id===id&&s.bonus)).reduce((a,[,b])=>a+b.sets.length,0);
  if(doneSets>=Math.ceil(exSteps/2)||P.short){markDone(P.sid);}
  S.sessions.push({d:TODAY,sid:P.sid,min:mins,short:P.short,bonus:P.bonusDone});
  save();closePlayer();celebrate();
}
function celebrate(){const el=document.createElement('div');el.className='celebrate';el.innerHTML='<div class="c">'+I.check+'</div>';document.body.appendChild(el);setTimeout(()=>el.remove(),1000);if(navigator.vibrate)navigator.vibrate(60);}

/* ---------------- Lauf-Player ---------------- */
function startRun(sid){
  sid=sid||'RUN';ensurePlan();const id=runIdOf(sid);const x=EX[id];const ph=x.phases;const cd=CARDIO[(SESS.find(s=>s.id===sid)||{}).ctype]||CARDIO.run;
  Object.assign(P,{on:true,run:true,sid,runId:id,cfig:cd,pi:0,t0:Date.now(),paused:false,timer:null,steps:[],i:0});
  $('#player').classList.add('on');document.body.style.overflow='hidden';wake(true);
  const total=ph.reduce((a,p)=>a+p[1],0);
  const draw=(left)=>{
    const p=ph[P.pi];
    shell(`<div class="rest"><div class="runphase ${p[2]}">${esc(p[0])}</div><div class="big" id="rv">${mmss(left)}</div>
      <div class="small" style="margin-top:6px">${esc(x.n)} · Phase ${P.pi+1}/${ph.length}</div>
      <div class="phaselist">${ph.map((q,j)=>`<i class="${q[2]} ${j<P.pi?'past':''} ${j===P.pi?'now':''}" style="flex:${q[1]}"></i>`).join('')}</div>
      <div style="width:100%;max-width:220px;margin-top:22px"><div class="fig" data-fig="${P.cfig.fig}" ${P.cfig.nodb?'data-nodb="1"':''} data-aspect="1.2" style="height:150px"></div></div></div>`,
     `<div class="restbtns"><button class="btn ghost" id="pz">${P.paused?'Weiter':'Pause'}</button><button class="btn ghost" id="sk" style="flex:0 0 auto;padding:0 14px">Nächste Phase</button><button class="btn pri" id="end" style="flex:0 0 auto;padding:0 16px">Fertig</button></div>`);
    $('#pz').onclick=()=>{P.paused=!P.paused;if(P.paused){stopTimer();P.left=+($('#rv').dataset.s||left);}else go(P.left);$('#pz').textContent=P.paused?'Weiter':'Pause';};
    $('#sk').onclick=()=>{stopTimer();advance();};
    $('#end').onclick=()=>{stopTimer();runEnd();};
    $('#plx').onclick=()=>{stopTimer();runEnd();};
  };
  const go=(sec)=>{draw(sec);let left=sec;const end=Date.now()+sec*1000;P.left=sec;
    P.timer=setInterval(()=>{const l=Math.max(0,Math.ceil((end-Date.now())/1000));if(l!==left){left=l;P.left=l;const rv=$('#rv');if(rv){rv.textContent=mmss(l);rv.dataset.s=l;}if(l<=3&&l>0)tick();}if(l<=0){stopTimer();advance();}},250);};
  const advance=()=>{P.pi++;if(P.pi>=ph.length){ding();setTimeout(()=>ding(),400);runEnd();return;}const p=ph[P.pi];if(p[2]==='hard'){ding();setTimeout(ding,350);}else ding();go(p[1]);};
  go(ph[0][1]);
}
function runEnd(){
  const mins=Math.max(1,Math.round((Date.now()-P.t0)/60000));const id=P.runId;
  shell(`<div class="summary"><div class="pl-meta" style="margin-top:10px"><span class="st">Ausdauer</span></div><h3>${esc(EX[id].n)}</h3>
    <div class="sumstats"><div><b>${mins}</b><span>Minuten</span></div><div><b>${P.pi>=EX[id].phases.length?'komplett':P.pi+'/'+EX[id].phases.length}</b><span>Phasen</span></div></div>
    <h2>Wie war's?</h2><div class="rrow"><div class="h"><div class="nm">${esc(EX[id].n)}</div><div class="thumbs"><button class="th up ${rateOf(id)===1?'on':''}" data-rate="1" data-id="${id}">${I.up}</button><button class="th down ${rateOf(id)===-1?'on':''}" data-rate="-1" data-id="${id}">${I.down}</button></div></div></div></div>`,
   `<div class="restbtns"><button class="btn ghost" id="nos" style="flex:0 0 auto;padding:0 14px;white-space:nowrap">Nicht zählen</button><button class="bigbtn good" id="fin">${I.check} Speichern</button></div>`);
  bindRate($('#player'),runEnd);
  $('#plx').onclick=()=>{P.run=false;closePlayer();};
  $('#nos').onclick=()=>{P.run=false;closePlayer();};
  $('#fin').onclick=()=>{markDone(P.sid);S.sessions.push({d:TODAY,sid:P.sid,ex:id,min:mins});const arr=LOG[id]||(LOG[id]=[]);arr.push({d:TODAY,v:mins+' Min'+(P.pi>=EX[id].phases.length?'':' (abgebrochen)')});save();P.run=false;closePlayer();celebrate();};
}

/* ---------------- Navigation ---------------- */
let TAB='home';
function renderAll(){TODAY=ymd(NOW());WK=wkKey(NOW());
  if(TAB==='home')renderHome();else if(TAB==='lib')renderLib();else if(TAB==='prog')renderProg();else renderKnow();}
function setTab(t){TAB=t;$$('.view').forEach(v=>{v.classList.toggle('on',v.id==='v-'+t);if(v.id!=='v-'+t){$$('[data-fig]',v).forEach(el=>FIG.unmount(el));v.innerHTML='';}});$$('.tab').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));window.scrollTo(0,0);renderAll();}
/* ---------------- Konto ---------------- */
const EYE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
function pwField(id,ph,ac){return `<div class="pw"><input id="${id}" type="password" autocomplete="${ac}" placeholder="${ph}" autocapitalize="none" spellcheck="false"><button type="button" class="eye" data-eye="${id}" aria-label="Passwort zeigen">${EYE}</button></div>`;}
function showLogin(fromSettings){
  let mode='in';
  const el=$('#login');el.classList.add('on');
  const T={in:['Anmelden','Mit deinem Namen (oder deiner E-Mail) und deinem Passwort.','Anmelden'],
    up:['Registrieren','Such dir einen Namen und ein Passwort aus. Deine Trainingsdaten liegen dann in deinem Konto und sind auf jedem Gerät da.','Konto erstellen'],
    fg:['Passwort vergessen','Gib deinen Namen oder deine E-Mail ein. Du bekommst eine Mail mit einem Link, über den du ein neues Passwort setzt.','Mail schicken']};
  const draw=(msg,keep,ok)=>{const v=id=>keep&&$('#'+id,el)?$('#'+id,el).value:'';const nv=v('lgn'),ev=v('lge');
    el.innerHTML=`<div class="lg"><div class="date">Training</div><h1>${T[mode][0]}</h1>
    <p class="small" style="margin:8px 0 18px">${T[mode][1]}</p>
    <input id="lgn" autocomplete="username" placeholder="${mode==='up'?'Name':'Name oder E-Mail'}" autocapitalize="none" spellcheck="false" value="${esc(nv)}">
    ${mode==='up'?`<input id="lge" type="email" inputmode="email" autocomplete="email" placeholder="E-Mail (optional)" autocapitalize="none" spellcheck="false" value="${esc(ev)}"><div class="eqhint" style="padding:0 4px 10px;margin-top:-4px">Nur für „Passwort vergessen“. Ohne E-Mail lässt sich ein vergessenes Passwort nicht zurücksetzen.</div>`:''}
    ${mode!=='fg'?pwField('lgp','Passwort (mind. 6 Zeichen)',mode==='in'?'current-password':'new-password'):''}
    ${mode==='up'?pwField('lgp2','Passwort wiederholen','new-password'):''}
    ${msg?`<div class="lgerr${ok?' ok':''}">${esc(msg)}</div>`:''}
    <button class="bigbtn" id="lgo">${T[mode][2]}</button>
    ${mode==='in'?'<button class="lglink" id="lgf">Passwort vergessen?</button>':''}
    <button class="lglink" id="lgs">${mode==='in'?'Neu hier? Registrieren':'Zurück zur Anmeldung'}</button>
    ${fromSettings?'<button class="lglink" id="lgx">Abbrechen</button>':''}</div>`;
    $$('[data-eye]',el).forEach(b=>b.onclick=()=>{const inp=$('#'+b.dataset.eye,el);const show=inp.type==='password';$$('.pw input',el).forEach(i=>i.type=show?'text':'password');$$('.eye',el).forEach(e=>e.classList.toggle('on',show));});
    $('#lgs',el).onclick=()=>{mode=mode==='in'?'up':'in';draw('',true);};
    const f=$('#lgf',el);if(f)f.onclick=()=>{mode='fg';draw('',true);};
    const x=$('#lgx',el);if(x)x.onclick=()=>el.classList.remove('on');
    const isMail=t=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t),isName=t=>/^[a-zA-Z0-9äöüÄÖÜß._ -]{2,24}$/.test(t);
    $('#lgo',el).onclick=async()=>{const n=$('#lgn',el).value.trim(),pw=mode!=='fg'?$('#lgp',el).value:'',em=mode==='up'?$('#lge',el).value.trim():'';
      if(mode==='up'){if(!isName(n))return draw('Name: 2 bis 24 Zeichen, Buchstaben, Zahlen, Leerzeichen, Punkt oder Strich.',true);
        if(em&&!isMail(em))return draw('Die E-Mail sieht nicht gültig aus.',true);}
      else if(!(isName(n)||isMail(n)))return draw('Bitte Name oder E-Mail eingeben.',true);
      if(mode!=='fg'&&pw.length<6)return draw('Passwort: mindestens 6 Zeichen.',true);
      if(mode==='up'&&pw!==$('#lgp2',el).value)return draw('Die beiden Passwörter stimmen nicht überein.',true);
      $('#lgo',el).disabled=true;$('#lgo',el).textContent='Moment …';
      try{if(mode==='in')await CLOUD.signIn(n,pw);
        else if(mode==='up')await CLOUD.signUp(n,em,pw);
        else{await CLOUD.reset(n);mode='in';draw('Mail ist unterwegs. Schau auch im Spam-Ordner nach. Danach hier mit dem neuen Passwort anmelden.',true,true);}}
      catch(e){draw(CLOUD.err(e),true);}};
  };
  draw();
}
async function afterAuth(user){
  const el=$('#login');
  if(!user){showLogin(false);return;}
  el.classList.remove('on');
  let remote=null;try{remote=await CLOUD.pull();}catch(e){toast('Sync gerade nicht erreichbar, lokal weiter.');}
  const owner=sget('owner',null);
  if(remote&&remote.v5){
    // Konto hat Daten: übernehmen, außer dieses Gerät hat neuere Daten desselben Kontos
    const localNewer=owner===user.uid&&sget('stamp',0)>(remote.stamp||0);
    if(!localNewer){localStorage.setItem(LSK+'v5',remote.v5);localStorage.setItem(LSK+'history',remote.history||'{}');localStorage.setItem(LSK+'log',remote.log||'{}');sset('stamp',remote.stamp||Date.now());}
  }else if(owner&&owner!==user.uid){
    // Gerät gehört einem anderen Konto: leer starten
    ['v5','history','log','stamp','mode'].forEach(k=>localStorage.removeItem(LSK+k));
  }
  sset('owner',user.uid);sset('localOnly',false);
  loadLocal();boot();
  if(!(remote&&remote.v5))cloudPush();
}
let BOOTED=false;
function boot(){
  if(!S.profile){showWizard(false);return;}
  SESS=sessList();
  if(BOOTED){renderAll();return;}BOOTED=true;
  ensurePlan();setTab('home');
}
/* ---------------- Einstieg / Plan einstellen ---------------- */
function showWizard(edit){
  const hadData=Object.keys(LOG||{}).length>0||Object.keys(HISTORY||{}).length>0;
  const W=JSON.parse(JSON.stringify(S.profile||(hadData?KILIANPROF:DEFPROF)));
  let step=edit?0:-1;const el=$('#login');el.classList.add('on');
  const opt=(k,v,label,cur)=>`<button class="opt ${cur===v?'on':''}" data-k="${k}" data-v="${v}">${label}</button>`;
  const draw=()=>{
    let h='';
    if(step===-1){h=`<div class="date">Willkommen${window.CLOUD&&CLOUD.name?', '+esc(CLOUD.name):''}</div><h1>Kurz einrichten</h1>
      <p class="lead">Drei Fragen, dann steht dein Plan: kurze Ganzkörper-Einheiten mit Übungen, die zu deiner Ausrüstung passen. Jede Übung ist animiert und hat ein Video. Was dir nicht gefällt, wählst du mit Daumen runter ab.</p>
      <button class="bigbtn" id="wn">Los geht's</button>`;}
    else if(step===0){h=`<div class="date">Schritt 1 von 3</div><h1>Was hast du zu Hause?</h1><p class="lead">Tippe alles an, was du nutzen kannst. Boden, Wand, Tür und ein Handtuch setzen wir voraus. Ohne alles geht es auch.</p>
      ${EQUIP.map(([g,items])=>`<h2>${esc(g)}</h2><div class="eqgrid">${items.map(([k,l,sub,ch])=>{const on=(k==='db'||k==='kb')?(W.eq[k]||[]).length>0:k==='bb'?(W.eq.bb||0)>0:!!W.eq[k];
        return `<div class="eq ${on?'on':''}"><button class="eqb" data-eq="${k}"><b>${esc(l)}</b>${sub?`<span>${esc(sub)}</span>`:''}<i>${I.check}</i></button>
        ${ch&&on?`<div class="eqch">${k==='bb'?ch.map(w=>`<button class="${W.eq.bb===w?'on':''}" data-bb="${w}">${w} kg</button>`).join(''):ch.map(w=>`<button class="${(W.eq[k]||[]).includes(w)?'on':''}" data-w="${k}:${w}">${w}</button>`).join('')}</div>${k!=='bb'?'<div class="eqhint">kg pro Stück. Verstellbare Hanteln: alle einstellbaren Gewichte antippen.</div>':''}`:''}</div>`;}).join('')}</div>`).join('')}
      <button class="bigbtn" id="wn">Weiter</button>`;}
    else if(step===1){h=`<div class="date">Schritt 2 von 3</div><h1>Wie willst du trainieren?</h1>
      <h2>Krafteinheiten pro Woche</h2><div class="opts g4">${[1,2,3,4,5,6,7].map(v=>opt('freq',v,v+'×',W.freq)).join('')}</div>
      <h2>Dauer pro Einheit</h2><div class="opts g3">${[10,15,20,30,45,60].map(v=>opt('dur',v,v+' Min',W.dur)).join('')}</div>
      <p class="small" style="margin-top:10px">${W.freq<=3?'Bis 3× pro Woche trainierst du jedes Mal den ganzen Körper.':'Ab 4× pro Woche wechseln sich Ober- und Unterkörper ab, so hat jede Muskelgruppe mindestens einen Tag Pause.'+(W.freq===5||W.freq===7?' Einer der Tage ist ein leichter Rumpf- und Mobilitätstag.':'')}</p>
      <h2>Ausdauer</h2><div class="opts g2">${[['run','Laufen'],['rope','Seilspringen'],['walk','Zügig gehen'],['none','Keine']].map(([v,l])=>opt('cardio',v,l,W.cardio)).join('')}</div>
      ${W.cardio!=='none'?`<h2>Ausdauer pro Woche</h2><div class="opts">${[1,2].map(v=>opt('cardioN',v,v+'×',W.cardioN)).join('')}</div>`:''}
      <h2>Erfahrung mit Krafttraining</h2><div class="opts">${[['ein','Einsteiger'],['fort','Fortgeschritten']].map(([v,l])=>opt('level',v,l,W.level)).join('')}</div>
      <button class="bigbtn" id="wn">Weiter</button><button class="lglink" id="wb">Zurück</button>`;}
    else{const c=cfgOf(W);const n=W.freq;h=`<div class="date">Schritt 3 von 3</div><h1>Dein Plan</h1>
      <div class="plansum"><div><b>${n}×</b><span>${n<=3?'Ganzkörper':'Einheiten'} pro Woche</span></div><div><b>${W.dur}</b><span>Minuten</span></div><div><b>${c.stations}×${c.rounds}</b><span>Übungen × Runden</span></div></div>
      <p class="lead">${W.cardio!=='none'?`Dazu ${W.cardioN}× ${CARDIO[W.cardio].label} pro Woche. `:''}${n<=3?'Jede Einheit trainiert Druck, Beine, Zug und Rumpf.':'Oberkörper- und Unterkörpertage wechseln sich ab, die Startseite schlägt nie zweimal hintereinander dieselben Muskeln vor.'} Die Übungen wechseln alle vier Wochen, tauschen kannst du jederzeit.</p>
      <p class="small">Ein Hinweis: Das hier ist eine Übungssammlung, kein persönliches Training. Bei Schmerzen oder Beschwerden lass dich von einer Fachperson beraten.</p>
      <button class="bigbtn" id="wn">${edit?'Speichern':'Plan erstellen'}</button><button class="lglink" id="wb">Zurück</button>${edit?'<button class="lglink" id="wx">Abbrechen</button>':''}`;}
    el.innerHTML=`<div class="lg wiz">${h}</div>`;el.scrollTop=0;
    const wn=$('#wn',el);if(wn)wn.onclick=()=>{if(step<2){step++;draw();}else finish();};
    const wb=$('#wb',el);if(wb)wb.onclick=()=>{step--;draw();};
    const wx=$('#wx',el);if(wx)wx.onclick=()=>el.classList.remove('on');
    $$('[data-eq]',el).forEach(b=>b.onclick=()=>{const k=b.dataset.eq;
      if(k==='db')W.eq.db=(W.eq.db||[]).length?[]:[5,10];else if(k==='kb')W.eq.kb=(W.eq.kb||[]).length?[]:[12];else if(k==='bb')W.eq.bb=W.eq.bb?0:60;else W.eq[k]=!W.eq[k];const y=el.scrollTop;draw();el.scrollTop=y;});
    $$('[data-w]',el).forEach(b=>b.onclick=()=>{const [k,w]=b.dataset.w.split(':');const v=+w;const a=W.eq[k]||[];W.eq[k]=a.includes(v)?a.filter(x=>x!==v):a.concat(v).sort((x,y)=>x-y);const y=el.scrollTop;draw();el.scrollTop=y;});
    $$('[data-bb]',el).forEach(b=>b.onclick=()=>{W.eq.bb=+b.dataset.bb;const y=el.scrollTop;draw();el.scrollTop=y;});
    $$('[data-k]',el).forEach(b=>b.onclick=()=>{const k=b.dataset.k;let v=b.dataset.v;if(!isNaN(+v))v=+v;W[k]=v;if(k==='cardio'&&v==='rope')W.eq.rope=true;draw();});
  };
  const finish=()=>{const first=!S.profile;S.profile=W;if(first){S.epoch=ymd(monday(NOW()));S.plan=null;}
    SESS=sessList();if(first)newPlan(curBlock());S.week=null;ensurePlan();save();el.classList.remove('on');
    if(!BOOTED){BOOTED=true;setTab('home');}else renderAll();toast(first?'Dein Plan steht.':'Plan angepasst.');};
  draw();
}
function init(){
  $('#tabs').innerHTML=`<div class="in">${[['home','Heute',I.home],['lib','Übungen',I.list],['prog','Fortschritt',I.chart],['know','Wissen',I.book]].map(([k,l,ic])=>`<button class="tab ${k===TAB?'on':''}" data-tab="${k}">${ic}${l}</button>`).join('')}</div>`;
  $$('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
  $('#sheetbg').onclick=closeSheet;
  const go=()=>{if(window.CLOUD&&CLOUD.enabled)CLOUD.onAuth(afterAuth);else boot();};
  if(window.CLOUD_CONFIG&&window.CLOUD_CONFIG.apiKey&&!window.CLOUD){
    let done=false;const fire=()=>{if(done)return;done=true;go();};
    window.addEventListener('cloud-ready',fire);setTimeout(()=>{if(!done){toast('Sync nicht erreichbar, lokal weiter.');fire();}},7000);
  }else go();
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&!P.on){const t=ymd(NOW());if(t!==TODAY)renderAll();}});
}
window.addEventListener('DOMContentLoaded',init);
window.__T={S:()=>S,P,LOG:()=>LOG,HISTORY:()=>HISTORY,startSession,startRun,setTab,ensurePlan,SESS:()=>SESS,cfgOf,prefill,suggestion,sessEx,setProfile:p=>{S.profile=p;SESS=sessList();S.plan=null;S.week=null;ensurePlan();},setDay:d=>{TODAY=d;}};
})();
