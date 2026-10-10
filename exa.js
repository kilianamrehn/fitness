window.EXA=window.EXA||{};
(function(E){
const FL=4; // Bodenhoehe relativ zum Knoechel-Anker [0,0]
// Goblet-Kniebeuge
E.goblet={view:'side',floor:FL,hl:['thigh'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'v'}],
 frames:[
  {a:{torso:-88,head:-90,uarm:80,farm:-78,thigh:92,shin:90,foot:0},d:1300,hold:300},
  {a:{torso:-62,head:-75,uarm:72,farm:-68,thigh:8,shin:112,foot:0},d:1100,hold:250},
 ]};
// Klimmzug
E.klimmzug={view:'side',hl:['uarm','torso'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'bar',x1:-40,x2:40,y:0,frame:true}],
 frames:[
  {a:{torso:-90,head:-90,uarm:-90,farm:-90,thigh:78,shin:140,foot:100},d:1100,hold:300},
  {a:{torso:-96,head:-86,uarm:62,farm:-96,thigh:70,shin:138,foot:100},d:1500,hold:300},
 ]};
// Liegestuetz
E.liegestuetz={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'ha1',at:[0,FL-4]},pin:{j:'to1',y:FL-1},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:{torso:-12,head:-14,thigh:168,shin:168,foot:78,uarm:90,farm:90},d:1200,hold:250},
  {a:{torso:-12,head:-12,thigh:168,shin:168,foot:78,uarm:-158,s_uarm:0.55,farm:88},d:1000,hold:200},
 ]};
// Dead Bug
E.deadbug={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:60,y:FL-3}],
 frames:[
  {a:{torso:180,head:180,uarm:-90,farm:-90,thigh:-90,shin:0,foot:-40},d:1300,hold:200},
  {a:{torso:180,head:180,uarm1:-90,farm1:-90,uarm2:-172,farm2:-176,thigh1:-90,shin1:0,foot1:-40,thigh2:-8,shin2:-5,foot2:-50},d:1300,hold:300},
  {a:{torso:180,head:180,uarm:-90,farm:-90,thigh:-90,shin:0,foot:-40},d:1300,hold:200},
  {a:{torso:180,head:180,uarm2:-90,farm2:-90,uarm1:-172,farm1:-176,thigh2:-90,shin2:0,foot2:-40,thigh1:-8,shin1:-5,foot1:-50},d:1300,hold:300},
 ]};
// Unterarmstuetz-Test (Plank)
E.plank={view:'side',floor:FL,hl:['torso'],anchor:{j:'el1',at:[0,FL-4]},pin:{j:'to1',y:FL-1},
 props:[{t:'floor',y:FL}],
 frames:[{a:{torso:-6,head:-8,thigh:174,shin:174,foot:84,uarm:92,farm:4},d:1500,hold:500},{a:{torso:-6,head:-4,thigh:174,shin:174,foot:84,uarm:92,farm:4},d:1500,hold:500}]};
// Seitlicher Ausfallschritt (Front)
E.seitausfall={view:'front',floor:FL,hl:['thigh'],anchor:{j:'an2',at:[30,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'v'},{t:'db',j:'ha2',o:'v'}],
 frames:[
  {a:{torso:-90,head:-90,uarm:92,farm:90,thigh1:98,shin1:96,thigh2:82,shin2:84,foot1:180,foot2:0},anchor:{j:'an2',at:[30,0]},d:1200,hold:250},
  {a:{torso:-78,head:-84,uarm1:95,farm1:92,uarm2:88,farm2:90,thigh1:135,shin1:120,foot1:180,thigh2:28,shin2:88,foot2:0},anchor:{j:'an2',at:[30,0]},d:1200,hold:250},
 ]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
// Batch A: Beine/Hüfte/Sprunggelenk. Winkel teils per IK vorberechnet (Fuesse/Haende treffen Boden, Stuhl, Huefte).
E.bulgarian={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"bench","x":-92,"y":-41,"w":42,"h":45},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-86,"head":-88,"uarm":91,"farm":90,"thigh1":82,"shin1":94,"foot1":0,"thigh2":113.2,"shin2":178.5,"foot2":176},"d":1700,"hold":300},{"a":{"torso":-76,"head":-82,"uarm":91,"farm":90,"thigh1":14,"shin1":102,"foot1":0,"thigh2":98.5,"shin2":-121.8,"foot2":176},"d":1100,"hold":250}]};
E.rueckausfall={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-90,"head":-90,"uarm":91,"farm":90,"thigh":90,"shin":90,"foot":0},"d":450,"hold":250},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh1":72,"shin1":95,"foot1":0,"thigh2":108,"shin2":140,"foot2":40},"d":650,"hold":0},{"a":{"torso":-84,"head":-86,"uarm":91,"farm":90,"thigh1":12,"shin1":98,"foot1":0,"thigh2":107.2,"shin2":-179.4,"foot2":48},"d":800,"hold":250},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh1":72,"shin1":95,"foot1":0,"thigh2":108,"shin2":140,"foot2":40},"d":550,"hold":0},{"a":{"torso":-90,"head":-90,"uarm":91,"farm":90,"thigh":90,"shin":90,"foot":0},"d":450,"hold":250,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh2":72,"shin2":95,"foot2":0,"thigh1":108,"shin1":140,"foot1":40},"d":650,"hold":0,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-84,"head":-86,"uarm":91,"farm":90,"thigh2":12,"shin2":98,"foot2":0,"thigh1":107.2,"shin1":-179.4,"foot1":48},"d":800,"hold":250,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh2":72,"shin2":95,"foot2":0,"thigh1":108,"shin1":140,"foot1":40},"d":550,"hold":0,"anchor":{"j":"an2","at":[0,0]}}]};
E.sprungkniebeuge={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-89,"head":-90,"uarm":92,"farm":88,"thigh":90,"shin":90,"foot":0},"d":650,"hold":350},{"a":{"torso":-58,"head":-72,"uarm":128,"farm":118,"thigh":30,"shin":114,"foot":0},"d":280,"hold":60},{"a":{"torso":-88,"head":-88,"uarm":-55,"farm":-62,"thigh":88,"shin":91,"foot":62},"d":300,"hold":60,"anchor":{"j":"pelvis","at":[-1,-112]}},{"a":{"torso":-62,"head":-74,"uarm":40,"farm":5,"thigh":35,"shin":112,"foot":0},"d":700,"hold":300}]};
E.rdl={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-88,"head":-89,"uarm":92,"farm":91,"thigh":88,"shin":92,"foot":0},"d":1700,"hold":300},{"a":{"torso":-22,"head":-12,"uarm":102.6,"farm":102.6,"thigh":68,"shin":95,"foot":0},"d":1100,"hold":300}]};
E.slrdl={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-88,"head":-89,"uarm":91,"farm":90,"thigh1":88,"shin1":92,"foot1":0,"thigh2":100,"shin2":118,"foot2":35},"d":1800,"hold":300},{"a":{"torso":-8,"head":-6,"uarm1":96,"farm1":92,"uarm2":92,"farm2":90,"thigh1":74,"shin1":95,"foot1":0,"thigh2":174,"shin2":174,"foot2":92},"d":1200,"hold":300}]};
E.slthrust={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"chest","at":[-80,-46]},"props":[{"t":"floor","y":4},{"t":"bench","x":-135,"y":-34,"w":58,"h":38}],"frames":[{"a":{"torso":-140,"head":-140,"uarm":114.9,"s_uarm":0.573,"farm":180,"s_farm":0.75,"thigh1":-23.3,"shin1":74.0,"foot1":0,"thigh2":-50,"shin2":45,"foot2":-35},"d":900,"hold":250},{"a":{"torso":180,"head":192,"uarm":131.2,"s_uarm":0.367,"farm":180,"s_farm":0.75,"thigh1":3.8,"shin1":89.9,"foot1":0,"thigh2":270,"shin2":365,"foot2":285},"d":1500,"hold":400}]};
E.swing={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"end","s":1.15}],"frames":[{"a":{"torso":-24,"head":-34,"uarm":140,"farm":146,"thigh":62,"shin":100,"foot":0},"d":520,"hold":60},{"a":{"torso":-92,"head":-90,"uarm":-4,"farm":-8,"thigh":90,"shin":90,"foot":0},"d":700,"hold":140}]};
E.bridge={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"neck","at":[-62,-8.5]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-90,"x2":70,"y":1},{"t":"db","j":"ha1","o":"end"}],"frames":[{"a":{"torso":179,"head":180,"uarm":11.1,"farm":-48.3,"thigh":-43.3,"shin":69.2,"foot":-10},"d":900,"hold":250},{"a":{"torso":156,"head":180,"uarm":-11.9,"farm":-71.3,"thigh":-17.0,"shin":77.5,"foot":-10},"d":1400,"hold":500}]};
E.cossack={"view":"front","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[-55,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-90,"head":-90,"s_torso":1.0,"thigh1":132.7,"shin1":111.8,"s_thigh1":1.0,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":47.3,"shin2":68.2,"s_thigh2":1.0,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":250},{"a":{"torso":-90,"head":-90,"s_torso":0.9,"thigh1":175.6,"shin1":63.0,"s_thigh1":0.78,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":15.1,"shin2":37.6,"s_thigh2":1.0,"foot2":-62,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":350},{"a":{"torso":-90,"head":-90,"s_torso":1.0,"thigh1":132.7,"shin1":111.8,"s_thigh1":1.0,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":47.3,"shin2":68.2,"s_thigh2":1.0,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":250},{"a":{"torso":-90,"head":-90,"s_torso":0.9,"thigh1":164.9,"shin1":142.4,"s_thigh1":1.0,"foot1":-118,"uarm1":105.5,"farm1":-17.8,"thigh2":4.4,"shin2":117.0,"s_thigh2":0.78,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":350,"anchor":{"j":"an1","at":[-55,-3]}}]};
E.stepup={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,-45]},"props":[{"t":"floor","y":4},{"t":"bench","x":-17,"y":-41,"w":48,"h":45},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-78,"head":-84,"uarm":91,"farm":90,"thigh1":6.7,"shin1":128.4,"foot1":0,"thigh2":95.5,"shin2":114.2,"foot2":0},"d":700,"hold":250},{"a":{"torso":-84,"head":-87,"uarm":91,"farm":90,"thigh1":47.2,"shin1":123.2,"foot1":0,"thigh2":76.1,"shin2":157.7,"foot2":35},"d":450,"hold":0},{"a":{"torso":-89,"head":-90,"uarm":91,"farm":90,"thigh1":76.2,"shin1":100.4,"foot1":0,"thigh2":82.7,"shin2":105.8,"foot2":0},"d":700,"hold":250},{"a":{"torso":-84,"head":-87,"uarm":91,"farm":90,"thigh1":47.2,"shin1":123.2,"foot1":0,"thigh2":76.1,"shin2":157.7,"foot2":35},"d":650,"hold":0}]};
E.wallsit={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"wall","x":-66,"y1":-150,"y2":4}],"frames":[{"a":{"torso":-90,"head":-90,"uarm":76,"farm":-122,"thigh":0,"shin":90,"foot":0},"d":1600,"hold":900},{"a":{"torso":-89,"head":-87,"uarm":76,"farm":-122,"thigh":0,"shin":90,"foot":0,"s_torso":1.015},"d":1600,"hold":900}]};
E.nordic={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-30,"x2":110,"y":1},{"t":"box","x":-112,"y":-46,"w":72,"h":36},{"t":"post","x":-104,"y1":-12,"y2":4},{"t":"post","x":-48,"y1":-12,"y2":4}],"frames":[{"a":{"torso":-90,"head":-86,"thigh":90,"shin":178,"foot":186,"uarm":78,"farm":-70},"d":1500,"hold":400},{"a":{"torso":-52,"head":-48,"thigh":128,"shin":178,"foot":186,"uarm":116,"farm":-32},"d":1700,"hold":0},{"a":{"torso":-28,"head":-24,"thigh":152,"shin":178,"foot":186,"uarm":140,"farm":-8},"d":380,"hold":0},{"a":{"torso":-18,"head":-14,"thigh":162,"shin":178,"foot":186,"uarm":126.2,"farm":15.0},"d":1300,"hold":350}]};
E.revnordic={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-70,"x2":40,"y":1}],"frames":[{"a":{"torso":-90,"head":-87,"thigh":90,"shin":178,"foot":180,"uarm":74,"farm":-122},"d":2000,"hold":400},{"a":{"torso":-132,"head":-129,"thigh":48,"shin":178,"foot":180,"uarm":32,"farm":-164},"d":1300,"hold":350}]};
E.calf={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"to1","at":[0,-17]},"props":[{"t":"floor","y":4},{"t":"step","x":-7,"y":-22,"w":50,"h":26}],"frames":[{"a":{"torso":-90,"head":-90,"uarm":92,"farm":90,"thigh":90,"shin":90,"foot":-30},"d":800,"hold":350},{"a":{"torso":-90,"head":-90,"uarm":92,"farm":90,"thigh":90,"shin":90,"foot":52},"d":2800,"hold":300}]};
E.tibialis={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"he1","at":[-4,0]},"props":[{"t":"floor","y":4},{"t":"wall","x":-34,"y1":-160,"y2":4}],"frames":[{"a":{"torso":-86,"head":-88,"uarm":94,"farm":92,"thigh":80,"shin":80,"foot":0},"d":600,"hold":250},{"a":{"torso":-86,"head":-88,"uarm":94,"farm":92,"thigh":80,"shin":80,"foot":-34},"d":1000,"hold":300}]};
E.pogo={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"to1","at":[14,1]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-89,"head":-89,"uarm":96,"farm":62,"thigh":86,"shin":95,"foot":22},"d":190,"hold":30},{"a":{"torso":-90,"head":-90,"uarm":94,"farm":58,"thigh":90,"shin":90,"foot":46},"d":190,"hold":30,"anchor":{"j":"to1","at":[13,-9]}}]};
E.monster={"view":"front","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[-21,0]},"props":[{"t":"floor","y":4},{"t":"loop","a":"kn1","b":"kn2"}],"frames":[{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":133.2,"shin1":76.1,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":46.8,"shin2":103.9,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":134.6,"shin1":79.5,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":24.7,"shin2":101.8,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":136.3,"shin1":89.2,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":43.7,"shin2":88.1,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":152.5,"shin1":70.9,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":44.7,"shin2":98.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":133.2,"shin1":76.1,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":46.8,"shin2":103.9,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":154.5,"shin1":75.8,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":44.7,"shin2":98.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":136.3,"shin1":89.2,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":43.7,"shin2":88.1,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":135.3,"shin1":81.8,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":25.5,"shin2":104.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an1","at":[-21,0]}}]};
E.hipflexor={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-60,"x2":80,"y":1}],"frames":[{"a":{"torso":-89,"head":-90,"thigh1":90,"shin1":178,"foot1":180,"thigh2":6.4,"shin2":77.5,"foot2":0,"uarm2":60,"farm2":20,"uarm1":92,"farm1":90},"d":1600,"hold":500},{"a":{"torso":-93,"head":-92,"thigh1":112,"shin1":178,"foot1":180,"thigh2":1.8,"shin2":100.5,"foot2":0,"uarm2":60,"farm2":20,"uarm1":-84,"farm1":-86},"d":1600,"hold":1800}]};
E.deepsquat={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-58,"head":-60,"s_torso":1,"thigh":-14,"shin":122,"foot":0,"uarm":59.6,"farm":-62},"d":1800,"hold":800},{"a":{"torso":-61,"head":-58,"s_torso":1.02,"thigh":-14,"shin":122,"foot":0,"uarm":59.1,"farm":-62},"d":1800,"hold":800}]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
const R=Math.PI/180;
// 2-Gelenk-IK: Vektor proximal->distal (dx,dy), Laengen L1/L2, s=+1/-1 Beugerichtung
function ik(dx,dy,L1,L2,s){const d=Math.max(Math.abs(L1-L2)+0.5,Math.min(Math.hypot(dx,dy),L1+L2-0.05));const b=Math.atan2(dy,dx);
 const al=Math.acos(Math.max(-1,Math.min(1,(L1*L1+d*d-L2*L2)/(2*L1*d))));const a1=b+s*al;const ex=L1*Math.cos(a1),ey=L1*Math.sin(a1);
 return [Math.round(a1/R*10)/10,Math.round(Math.atan2(dy-ey,dx-ex)/R*10)/10];}
function arm(dx,dy,s,side){const r=ik(dx,dy,29,26,s);const o={};o['uarm'+(side||'')]=r[0];o['farm'+(side||'')]=r[1];return o;}
// Frontansicht Liegestuetz (von vorne): Weltpositionen -> Winkel
function frontPush(neck,pel,h1,h2,ft){
 const tx=neck[0]-pel[0],ty=neck[1]-pel[1],tl=Math.hypot(tx,ty),ta=Math.atan2(ty,tx)/R;
 const u=[tx/tl,ty/tl],p=[-u[1],u[0]];
 const sb=[neck[0]-u[0]*4,neck[1]-u[1]*4];
 const s1=[sb[0]-p[0]*19,sb[1]-p[1]*19],s2=[sb[0]+p[0]*19,sb[1]+p[1]*19];
 const a=Object.assign({torso:ta,head:ta,s_torso:tl/50},arm(h1[0]-s1[0],h1[1]-s1[1],1,1),arm(h2[0]-s2[0],h2[1]-s2[1],-1,2));
 Object.assign(a,{thigh:-90,shin:-90,foot:-90,s_thigh:0.15,s_shin:0.15,s_foot:0.1});
 return a;}
const M=(...o)=>Object.assign({},...o);

// ---------- Klimmzug-Familie ----------
const hangLeg={thigh:80,shin:138,foot:100};
const chinTop=M({torso:-93,head:-84},arm(8,-3,1),hangLeg);
const chinBot=M({torso:-89,head:-90,uarm:-88,farm:-90},hangLeg);
const barP=[{t:'bar',x1:-40,x2:40,y:0,frame:true}];
E.chinup={view:'side',hl:['uarm','farm','torso'],anchor:{j:'ha1',at:[0,0]},props:barP,
 frames:[{a:chinBot,d:1100,hold:300},{a:chinTop,d:1500,hold:300}]};
E.negativ={view:'side',hl:['uarm','farm','torso'],anchor:{j:'ha1',at:[0,0]},props:barP,
 frames:[{a:chinTop,d:4000,hold:400},{a:chinBot,d:700,hold:250}]};
E.skapula={view:'side',hl:['torso'],anchor:{j:'ha1',at:[0,0]},props:barP,
 frames:[{a:M({torso:-90,head:-92,uarm:-90,farm:-90,s_uarm:1.04},hangLeg),d:900,hold:300},
         {a:M({torso:-96,head:-86,uarm:-92,farm:-90,s_uarm:0.78},hangLeg),d:900,hold:500}]};
E.hang={view:'side',hl:['torso','farm'],anchor:{j:'ha1',at:[0,0]},props:barP,
 frames:[{a:M({torso:-92,head:-88,uarm:-90,farm:-90,s_uarm:0.86},hangLeg),d:1600,hold:600},
         {a:M({torso:-93,head:-87,uarm:-90,farm:-90,s_uarm:0.83,thigh:82,shin:140,foot:100}),d:1600,hold:600}]};

// ---------- Rudern ----------
E.rudern1={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'bench',x:-55,y:-38,w:105,h:42},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:{torso:-8,head:-6,uarm1:92,farm1:92,uarm2:106,farm2:110,thigh1:96,shin1:84,foot1:0,thigh2:92,shin2:180,foot2:170},d:1100,hold:250},
  {a:{torso:-8,head:-6,uarm1:-152,farm1:100,uarm2:106,farm2:110,thigh1:96,shin1:84,foot1:0,thigh2:92,shin2:180,foot2:170},d:1400,hold:300},
 ]};
E.rudern2={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:{torso:-40,head:-30,uarm:88,farm:90,thigh:68,shin:102,foot:0},d:1100,hold:250},
  {a:{torso:-40,head:-30,uarm:-172,farm:100,thigh:68,shin:102,foot:0},d:1400,hold:300},
 ]};
// Renegade Row
const plk={torso:-12,head:-12,thigh:168,shin:168,foot:78,uarm:90,farm:90};
const HY=FL-11;
E.renegade={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'ha2',at:[0,HY]},pin:{j:'to1',y:FL-1},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'h',s:0.8},{t:'db',j:'ha1',o:'h',s:0.8}],
 frames:[
  {a:plk,d:900,hold:150,anchor:{j:'ha2',at:[0,HY]}},
  {a:M(plk,{uarm1:-142,farm1:95}),d:900,hold:250,anchor:{j:'ha2',at:[0,HY]}},
  {a:plk,d:900,hold:150,anchor:{j:'ha1',at:[0,HY]}},
  {a:M(plk,{uarm2:-142,farm2:95}),d:900,hold:250,anchor:{j:'ha1',at:[0,HY]}},
 ]};
// Reverse Fly (Front, vorgebeugt)
E.revfly={view:'front',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[-12,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:0.85},{t:'db',j:'ha2',o:'end',s:0.85}],
 frames:[
  {a:{torso:-90,s_torso:0.5,head:90,uarm1:96,farm1:92,uarm2:84,farm2:88,thigh1:104,shin1:80,thigh2:76,shin2:100,foot1:180,foot2:0},d:1200,hold:250},
  {a:{torso:-90,s_torso:0.5,head:90,uarm1:176,farm1:170,uarm2:4,farm2:10,thigh1:104,shin1:80,thigh2:76,shin2:100,foot1:180,foot2:0},d:1500,hold:350},
 ]};
// Archer Push-up (Front)
const AH1=[-52,0],AH2=[52,0];
E.archer={view:'front',floor:FL,hl:['uarm','torso'],anchor:{j:'ha1',at:AH1},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:frontPush([0,-47],[0,-28],AH1,AH2,9),d:1300,hold:200},
  {a:frontPush([-22,-22],[-22,-13],AH1,AH2,9),d:1000,hold:200},
  {a:frontPush([0,-47],[0,-28],AH1,AH2,9),d:1300,hold:200},
  {a:frontPush([22,-22],[22,-13],AH1,AH2,9),d:1000,hold:200},
 ]};
// Push-up Plus
const puTop={torso:-12,head:-14,thigh:168,shin:168,foot:78,uarm:90,farm:90};
E.pushplus={view:'side',floor:FL,hl:['torso','uarm'],anchor:{j:'ha1',at:[0,FL-4]},pin:{j:'to1',y:FL-1},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:puTop,d:1100,hold:150},
  {a:{torso:-12,head:-12,thigh:168,shin:168,foot:78,uarm:-158,s_uarm:0.55,farm:88},d:900,hold:150},
  {a:puTop,d:600,hold:100},
  {a:M(puTop,{s_uarm:1.24,torso:-14,head:-17}),d:600,hold:350},
 ]};
// Floor Press (Rueckenlage, Kopf links)
const fpLeg={thigh:-48,shin:66,foot:0};
E.floorpress={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:60,y:FL-3},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:M({torso:180,head:180,uarm:90,s_uarm:0.38,farm:-90},fpLeg),d:1200,hold:300},
  {a:M({torso:180,head:180,uarm:-90,farm:-90},fpLeg),d:1500,hold:200},
 ]};
// Dips
const dipLeg={thigh:98,shin:150,foot:110};
E.dips={view:'side',hl:['uarm','torso'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'dips',x:0,y:4,h:110,w:26}],
 frames:[
  {a:M({torso:-80,head:-84},arm(-3,54.5,1),dipLeg),d:1600,hold:250},
  {a:M({torso:-66,head:-72},arm(-12,24,1),dipLeg),d:1100,hold:250},
 ]};

// ---------- Druecken ----------
const stF={thigh1:93,shin1:91,thigh2:87,shin2:89,foot1:180,foot2:0};
E.ohp={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[-10,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'h'},{t:'db',j:'ha2',o:'h'}],
 frames:[
  {a:M({torso:-90,head:-90,uarm1:118,farm1:-92,uarm2:62,farm2:-88},stF),d:1300,hold:250},
  {a:M({torso:-90,head:-90,uarm1:-100,farm1:-88,uarm2:-80,farm2:-92},stF),d:1100,hold:250},
 ]};
E.pushpress={view:'side',floor:FL,hl:['uarm','thigh'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:{torso:-90,head:-90,uarm:72,farm:-108,thigh:90,shin:90,foot:0},d:450,hold:300},
  {a:{torso:-88,head:-90,uarm:72,farm:-108,thigh:62,shin:118,foot:0},d:380,hold:60},
  {a:{torso:-92,head:-90,uarm:-86,farm:-90,thigh:90,shin:90,foot:0},d:1300,hold:400},
 ]};
E.arnold={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[-10,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'h'},{t:'db',j:'ha2',o:'h'}],
 frames:[
  {a:M({torso:-90,head:-90,uarm1:84,s_uarm:0.55,farm1:-86,uarm2:96,farm2:-94},stF),d:650,hold:300},
  {a:M({torso:-90,head:-90,uarm1:150,s_uarm:0.95,farm1:-96,uarm2:30,farm2:-84},stF),d:650,hold:0},
  {a:M({torso:-90,head:-90,uarm1:-100,s_uarm:1,farm1:-88,uarm2:-80,farm2:-92},stF),d:800,hold:250},
  {a:M({torso:-90,head:-90,uarm1:150,s_uarm:0.95,farm1:-96,uarm2:30,farm2:-84},stF),d:700,hold:0},
 ]};
// Pike Push-up
E.pike={view:'side',floor:FL,hl:['uarm'],anchor:{j:'ha1',at:[0,FL-4]},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:{torso:59.5,head:63,uarm:72,farm:46,thigh:110.8,shin:120.8,foot:40},d:1300,hold:250},
  {a:{torso:62,head:66,uarm:132.7,farm:24.5,thigh:131.2,shin:134.9,foot:40},d:1100,hold:250},
 ]};

// ---------- Zug / Schulter ----------
E.curl={view:'side',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:{torso:-90,head:-90,uarm:92,farm:90,thigh:90,shin:90,foot:0},d:1100,hold:250},
  {a:{torso:-90,head:-90,uarm:98,farm:-62,thigh:90,shin:90,foot:0},d:1500,hold:300},
 ]};
E.facepull={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'post',x:95,y1:-170,y2:FL},{t:'band',from:'ha2',to:[95,-148]},{t:'band',from:'ha1',to:[95,-148]}],
 frames:[
  {a:{torso:-92,head:-90,uarm:-6,farm:-8,thigh:90,shin:90,foot:0},d:1300,hold:250},
  {a:{torso:-93,head:-90,uarm:-178,s_uarm:0.45,farm:-40,thigh:90,shin:90,foot:0},d:1000,hold:350},
 ]};
// Y-T-W (Draufsicht, Bauchlage)
const ytwB={torso:-90,head:-90,thigh1:92,shin1:91,thigh2:88,shin2:89,foot:90};
E.ytw={view:'front',hl:['uarm','torso'],anchor:{j:'pelvis',at:[0,0]},
 props:[{t:'box',x:-62,y:-100,w:124,h:200}],
 frames:[
  {a:M(ytwB,{uarm1:-122,farm1:-124,uarm2:-58,farm2:-56}),d:1000,hold:500},
  {a:M(ytwB,{uarm1:180,farm1:180,uarm2:0,farm2:0}),d:1000,hold:500},
  {a:M(ytwB,{uarm1:148,farm1:-128,uarm2:32,farm2:-52}),d:1100,hold:500},
 ]};
// Serratus Wall Slide
E.serratus={view:'side',floor:FL,hl:['torso','uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'wall',x:33,y1:-210,y2:FL}],
 frames:[
  {a:{torso:-86,head:-88,uarm:30,farm:-90,thigh:92,shin:90,foot:0},d:1500,hold:250},
  {a:{torso:-80,head:-84,uarm:-48,farm:-92,thigh:94,shin:90,foot:0},d:1300,hold:300},
 ]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
// ---------- helpers (pure math, mirrors the engine's skeleton) ----------
const RD=Math.PI/180, dr=a=>[Math.cos(a*RD),Math.sin(a*RD)], r1=v=>Math.round(v*10)/10;
function roots(P,t,front,st){st=st||1;const td=dr(t),pp=dr(t+90),k=50*st-4;
 const nb=[P[0]+td[0]*k,P[1]+td[1]*k],sw=front?19:0,hw=front?8.5:0;
 return {sh1:[nb[0]-pp[0]*sw,nb[1]-pp[1]*sw],sh2:[nb[0]+pp[0]*sw,nb[1]+pp[1]*sw],
  hi1:[P[0]-pp[0]*hw,P[1]-pp[1]*hw],hi2:[P[0]+pp[0]*hw,P[1]+pp[1]*hw]};}
// two-link IK: root r -> target t, lengths a,b; bend +1/-1 picks the elbow/knee side
function ik(r,t,a,b,bend){const dx=t[0]-r[0],dy=t[1]-r[1];let D=Math.hypot(dx,dy);D=Math.max(Math.abs(a-b)+0.01,Math.min(D,a+b-0.01));
 const ph=Math.atan2(dy,dx),al=Math.acos(Math.max(-1,Math.min(1,(a*a+D*D-b*b)/(2*a*D))));
 const a1=ph+bend*al,e=[r[0]+a*Math.cos(a1),r[1]+a*Math.sin(a1)];
 return [r1(a1/RD),r1(Math.atan2(t[1]-e[1],t[0]-e[0])/RD)];}
// build a frame: o={P,t,f(front),st,a:{}, h1/h2:[x,y,bend] hand targets, k1/k2:[x,y,bend] ankle targets, d,hold}
function B(o){const a=Object.assign({torso:o.t},o.a||{});if(o.st)a.s_torso=o.st;
 const r=roots(o.P,o.t,o.f,o.st),g=(k,s)=>a['s_'+k+s]!==undefined?a['s_'+k+s]:(a['s_'+k]!==undefined?a['s_'+k]:1);
 for(const s of [1,2]){
  const h=o['h'+s];if(h){const v=ik(r['sh'+s],h,29*g('uarm',s),26*g('farm',s),h[2]||1);a['uarm'+s]=v[0];a['farm'+s]=v[1];}
  const k=o['k'+s];if(k){const v=ik(r['hi'+s],k,45*g('thigh',s),43*g('shin',s),k[2]||-1);a['thigh'+s]=v[0];a['shin'+s]=v[1];}
 }
 return {a,anchor:{j:'pelvis',at:o.P},d:o.d||800,hold:o.hold||0};}
const T=(f,d,hold)=>Object.assign({},f,{d,hold:hold||0});

// ---------- Haengendes Knieheben ----------
E.kneeraise={view:'side',hl:['torso','thigh'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'bar',x1:-40,x2:40,y:0,frame:true}],
 frames:[
  {a:{torso:-90,head:-90,uarm:-90,farm:-90,thigh:96,shin:102,foot:70},d:1200,hold:300},
  {a:{torso:-104,head:-96,uarm:-95,farm:-93,thigh:-22,shin:72,foot:40},d:1600,hold:350},
 ]};

// ---------- Hoher Stuetz mit Schultertippen ----------
const PL={torso:-12,head:-14,thigh:168,shin:168,foot:78,uarm:90,farm:90};
E.plank={view:'side',floor:FL,hl:['torso'],anchor:{j:'ha1',at:[0,FL-4]},pin:{j:'to1',y:FL-1},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:Object.assign({},PL),d:700,hold:250},
  {a:Object.assign({},PL,{uarm2:106,farm2:-74}),d:700,hold:250},
  {a:Object.assign({},PL),anchor:{j:'ha2',at:[0,FL-4]},d:700,hold:250},
  {a:Object.assign({},PL,{uarm1:106,farm1:-74}),anchor:{j:'ha2',at:[0,FL-4]},d:700,hold:250},
 ]};

// ---------- McGill Curl-up ----------
const MG={torso:180,head:180,uarm:12,s_uarm:0.8,farm:8,s_farm:0.45,thigh1:-52,thigh2:0,shin2:0,foot2:-80,foot1:0};
{const r=roots([0,FL-11],180,false);const k=ik(r.hi1,[38,FL-4],45,43,-1);MG.thigh1=k[0];MG.shin1=k[1];}
E.mcgill={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:100,y:FL-3}],
 frames:[
  {a:Object.assign({},MG),d:1100,hold:600},
  {a:Object.assign({},MG,{torso:185,head:-158}),d:1300,hold:1800},
 ]};

// ---------- Bird Dog ----------
const BDP=[0,FL-51],BDt=-10;
const bd=(ext)=>{const r=roots(BDP,BDt,false);const f=B({P:BDP,t:BDt,h1:[r.sh1[0],FL-4,1],h2:[r.sh2[0],FL-4,1],
  a:{head:-12,thigh:90,shin:180,foot:176}});
 if(ext===1)Object.assign(f.a,{uarm1:-12,farm1:-12,thigh2:183,shin2:183,foot2:96,head:-16});
 if(ext===2)Object.assign(f.a,{uarm2:-12,farm2:-12,thigh1:183,shin1:183,foot1:96,head:-16});
 return f;};
E.birddog={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:BDP},
 props:[{t:'floor',y:FL},{t:'mat',x1:-70,x2:80,y:FL-3}],
 frames:[T(bd(0),1100,200),T(bd(1),1100,700),T(bd(0),1100,200),T(bd(2),1100,700)]};

// ---------- Pallof Press (Front) ----------
const PP=[0,-88];
const pal=(out)=>B({P:PP,t:-90,f:true,a:Object.assign({head:-90,thigh1:94,shin1:92,thigh2:86,shin2:88,foot1:180,foot2:0,s_foot:0.7},
   out?{s_uarm:0.45,s_farm:0.38}:{s_uarm:0.95,s_farm:0.62}),
  h1:out?[-2,-124,1]:[-4,-108,1],h2:out?[2,-124,-1]:[4,-108,-1]});
E.pallof={view:'front',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:PP},
 props:[{t:'floor',y:FL},{t:'post',x:-78,y1:-150,y2:FL},{t:'band',from:'ha1',to:[-78,-118]}],
 frames:[T(pal(0),900,300),T(pal(1),1200,1200)]};

// ---------- Baerenkriechen ----------
const BCy=FL-55,BCt=-5,HO=46,FO=-38;
function bcF(X,hA,fA,hB,fB,lift){ // lift: 'A'|'B' which group swings
 const hl=(x,g)=>[x,lift===g?FL-13:FL-4,1], fl=(x,g)=>[x,lift===g?FL-22:FL-15,-1];
 const f=B({P:[X,BCy],t:BCt,h1:hl(hA,'A'),k2:fl(fA,'A'),h2:hl(hB,'B'),k1:fl(fB,'B'),a:{head:-8}});
 const ft=s=>{const an=f.a; return 0;};
 f.a.foot1=lift==='B'?50:78; f.a.foot2=lift==='A'?50:78; return f;}
// groups: A = hand1+foot2, B = hand2+foot1 (opposite limbs)
const bcSeq=[
 [0, HO,FO, HO,FO],
 [5, HO+10,FO+10, HO,FO,'A'],
 [10,HO+20,FO+20, HO,FO],
 [15,HO+20,FO+20, HO+10,FO+10,'B'],
 [20,HO+20,FO+20, HO+20,FO+20],
 [25,HO+30,FO+30, HO+20,FO+20,'A'],
 [30,HO+40,FO+40, HO+20,FO+20],
];
const bcFr=[];
bcSeq.forEach(s=>bcFr.push(T(bcF(...s),260,s[5]?0:80)));
for(let i=bcSeq.length-2;i>0;i--){const s=bcSeq[i];bcFr.push(T(bcF(...s),260,s[5]?0:80));}
bcFr[0].hold=400;bcFr[6].hold=400;
E.bearcrawl={view:'side',floor:FL,hl:['torso','thigh'],anchor:{j:'pelvis',at:[0,BCy]},
 props:[{t:'floor',y:FL}],frames:bcFr};

// ---------- Turkish Get-up ----------
const DB={uarm1:-90,farm1:-90};
const HND=[-38,FL-4], AF=[40,FL-4];
const tg0=B({P:[0,FL-11],t:180,k1:[AF[0],AF[1],-1],a:Object.assign({head:180,uarm2:14,s_uarm2:0.85,farm2:4,thigh2:0,shin2:0,foot2:-80,foot1:0},DB)});
const tg1=B({P:[0,FL-11],t:206,k1:[AF[0],AF[1],-1],a:Object.assign({head:194,uarm2:66,farm2:2,thigh2:0,shin2:0,foot2:-80,foot1:0},DB)});
const tg2=B({P:[0,FL-11],t:238,k1:[AF[0],AF[1],-1],h2:[HND[0],HND[1],1],a:Object.assign({head:222,thigh2:0,shin2:0,foot2:-80,foot1:0},DB)});
const tg3=(()=>{const P=[5,-33];const r=roots(P,200);const th=Math.asin((FL-4-P[1])/88)/RD;
 return B({P,t:200,k1:[AF[0],AF[1],-1],h2:[HND[0],HND[1],1],a:Object.assign({head:186,thigh2:r1(th),shin2:r1(th),foot2:th-85,foot1:0},DB)});})();
const tg3s=x=>{const f=JSON.parse(JSON.stringify(tg3));const v=ik([5,-33],[x,FL-4],45,43,-1);Object.assign(f.a,{thigh2:v[0],shin2:v[1],foot2:-60+(86-x)});return f;};
const tg3a0=tg3s(64),tg3a=tg3s(34);
const tg3ab=(()=>{const f=JSON.parse(JSON.stringify(tg3));const v=ik([5,-33],[6,FL-6],45*0.62,43*0.7,-1);Object.assign(f.a,{thigh2:v[0],shin2:v[1],s_thigh2:0.62,s_shin2:0.7,foot2:-170});return f;})();
const tg3b=(()=>{const f=JSON.parse(JSON.stringify(tg3));Object.assign(f.a,{thigh2:95,s_thigh2:0.45,shin2:178,s_shin2:0.6,foot2:180});return f;})();
const tg4=(()=>{const P=[8,-30];const th2=180-Math.asin((FL-6-P[1])/45)/RD;
 return B({P,t:204,k1:[AF[0],AF[1],-1],h2:[HND[0],HND[1],1],a:Object.assign({head:190,thigh2:r1(th2),shin2:178,foot2:182,foot1:0},DB)});})();
const tg5=(()=>{const P=[-6,-47];
 return B({P,t:-90,k1:[AF[0],AF[1],-1],a:Object.assign({head:-108,uarm2:96,farm2:92,thigh2:106,shin2:179,foot2:182,foot1:0},DB)});})();
const tg5b=B({P:[16,-70],t:-88,k1:[AF[0],AF[1],-1],k2:[-14,FL-12,-1],a:Object.assign({head:-104,uarm2:94,farm2:90,foot2:40,foot1:0},DB)});
const tg6=B({P:[40,-88],t:-90,a:Object.assign({head:-104,uarm2:90,farm2:90,thigh:90,shin:90,foot:0},DB)});
E.tgu={view:'side',floor:FL,hl:['torso','uarm'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-70,x2:110,y:FL-3},{t:'db',j:'ha1',o:'end'}],
 frames:[T(tg0,900,500),T(tg1,800,250),T(tg2,800,250),T(tg3,300,300),T(tg3a0,300,0),T(tg3a,250,0),T(tg3ab,250,0),T(tg3b,300,0),T(tg4,800,250),T(tg5,700,200),T(tg5b,600,0),T(tg6,900,600),
   T(tg5b,600,0),T(tg5,800,200),T(tg4,400,250),T(tg3b,300,0),T(tg3ab,250,0),T(tg3a,250,0),T(tg3a0,300,0),T(tg3,800,250),T(tg2,800,250),T(tg1,800,250)]};

// ---------- Seitstuetz Unterarm (Front) ----------
const SP={torso:198,head:194,uarm1:90,farm1:20,s_farm1:0.25,uarm2:-90,farm2:-90,thigh:18,shin:18,foot:108,s_foot:0.5};
E.sideplank={view:'front',floor:FL,hl:['torso'],anchor:{j:'el1',at:[0,FL-5]},pin:{j:'an1',y:FL-5},
 props:[{t:'floor',y:FL}],
 frames:[{a:Object.assign({},SP),d:1600,hold:600},{a:Object.assign({},SP,{head:192,uarm2:-88}),d:1600,hold:600}]};

// ---------- Koffertragen (Front) ----------
const SC=(lift,bob)=>{const a={torso:-90,head:-90,uarm1:90,farm1:90,uarm2:82,farm2:86,thigh:90,shin:90,foot1:180,foot2:0,s_foot:0.7};
 if(lift)Object.assign(a,{['s_thigh'+lift]:0.45,['thigh'+lift]:lift===1?94:86,['shin'+lift]:90,['foot'+lift]:lift===1?160:20});
 return {a,anchor:{j:'pelvis',at:[0,-88+bob]}};};
E.suitcase={view:'front',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,-88]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end'}],
 frames:[T(SC(0,0),450,80),T(SC(1,0),450,80),T(SC(0,0),450,80),T(SC(2,0),450,80)]};

// ---------- Farmer's Walk ----------
const FWc=(n)=>{const f=n===1?1:2,b=n===1?2:1;const a={torso:-90,head:-90,uarm:90,farm:90};
 a['thigh'+f]=66;a['shin'+f]=82;a['foot'+f]=-12;a['thigh'+b]=111;a['shin'+b]=122;a['foot'+b]=36;
 a['uarm'+f]=86;a['uarm'+b]=94;return {a,anchor:{j:'pelvis',at:[0,-84]}};};
const FWp=(n)=>{const s=n===1?1:2,w=n===1?2:1;const a={torso:-90,head:-90,uarm:90,farm:90};
 a['thigh'+s]=90;a['shin'+s]=90;a['foot'+s]=0;a['thigh'+w]=78;a['shin'+w]=122;a['foot'+w]=40;
 return {a,anchor:{j:'pelvis',at:[0,-88]}};};
E.farmer={view:'side',floor:FL,hl:['farm','torso'],anchor:{j:'pelvis',at:[0,-88]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end'},{t:'db',j:'ha2',o:'end'}],
 frames:[T(FWc(1),380),T(FWp(2),380),T(FWc(2),380),T(FWp(1),380)]};

// ---------- Copenhagen Plank kurzer Hebel (Front) ----------
const cpP=t=>{const pp=dr(t+90),td=dr(t),sh1=[0,FL-5-29],nb=[sh1[0]+pp[0]*19,sh1[1]+pp[1]*19];return [nb[0]-td[0]*46,nb[1]-td[1]*46];};
const cpH2=t=>{const P=cpP(t),pp=dr(t+90);return [P[0]+pp[0]*8.5,P[1]+pp[1]*8.5];};
const CPu=184, CK=(()=>{const h=cpH2(CPu),d=dr(CPu-180);return [h[0]+45*d[0],h[1]+45*d[1]];})();
const CPd=(()=>{let best=CPu,err=1e9;for(let t=CPu;t<240;t+=0.1){const h=cpH2(t),e=Math.abs(Math.hypot(CK[0]-h[0],CK[1]-h[1])-45);if(t>CPu+8&&e<err){err=e;best=t;}}return best;})();
const CP=(up)=>{const t=up?CPu:CPd,P=cpP(t),h2=cpH2(t),th2=Math.atan2(CK[1]-h2[1],CK[0]-h2[0])/RD,pp=dr(t+90);
 return B({P,t:r1(t),f:true,h2:[h2[0]+pp[0]*2-4,h2[1]+pp[1]*2,-1],a:{head:r1(t+2),uarm1:90,farm1:90,s_farm1:0.25,thigh2:r1(th2),shin2:0,foot2:-90,s_foot:0.5,
   thigh1:r1(th2+(up?12:28)),shin1:r1(th2+(up?12:30)),foot1:90}});};
E.copen={view:'front',floor:FL,hl:['thigh','torso'],anchor:{j:'pelvis',at:cpP(CPu)},
 props:[{t:'floor',y:FL},{t:'bench',x:r1(CK[0]-10),y:r1(CK[1]+6),w:62,h:r1(FL-CK[1]-6)}],
 frames:[T(CP(0),1300,300),T(CP(1),1300,900)]};

// ---------- Nacken-Isometrie (Front) ----------
const NP=[0,-88];
const nk=(m)=>{const o={P:NP,t:-90,f:true,a:{head:-90,thigh1:93,shin1:91,thigh2:87,shin2:89,foot1:180,foot2:0,s_foot:0.7,uarm:90,farm:90}};
 if(m==='front'){o.a.s_uarm1=0.62;o.h1=[1,-156,1];}
 if(m==='left'){o.h1=[-13,-152,-1];}
 if(m==='right'){o.h2=[13,-152,1];}
 if(m==='back'){o.h1=[-4,-160,-1];o.h2=[4,-160,1];}
 return B(o);};
E.neckiso={view:'front',floor:FL,hl:[],anchor:{j:'pelvis',at:NP},
 props:[{t:'floor',y:FL}],
 frames:[T(nk('front'),700,1400),T(nk('left'),700,1400),T(nk('right'),700,1400),T(nk('back'),700,1400)]};

// ---------- Kraniozervikale Flexion ----------
const CC={torso:180,head:180,uarm:4,farm:2,foot:0};
{const r=roots([0,FL-11],180,false);const k=ik(r.hi1,[36,FL-4],45,43,-1);CC.thigh=k[0];CC.shin=k[1];}
E.ccf={view:'side',floor:FL,hl:[],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:60,y:FL-3}],
 frames:[{a:Object.assign({},CC),d:1400,hold:500},{a:Object.assign({},CC,{head:188}),d:1400,hold:1600}]};

// ---------- McKenzie Press-up ----------
const MKH=[56,FL-4];
const mk0={a:{torso:-2,head:4,uarm:-80,s_uarm:0.65,farm:75,thigh:180,shin:180,foot:172},anchor:{j:'pelvis',at:[0,FL-11]}};
const mk1=B({P:[0,FL-11],t:-46,h1:[MKH[0],MKH[1],1],h2:[MKH[0],MKH[1],1],a:{head:-28,thigh:180,shin:180,foot:172}});
E.mckenzie={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-100,x2:80,y:FL-3}],
 frames:[T(mk0,1400,400),T(mk1,1600,900)]};

// ---------- Laufen auf der Stelle ----------
const RA=(n)=>{const f=n,b=3-n;const a={torso:-84,head:-88};
 a['thigh'+f]=52;a['shin'+f]=98;a['foot'+f]=4;a['thigh'+b]=124;a['shin'+b]=166;a['foot'+b]=72;
 a['uarm'+b]=60;a['farm'+b]=-28;a['uarm'+f]=122;a['farm'+f]=36;return {a,anchor:{j:'pelvis',at:[0,-93]}};};
const RB=(n)=>{const s=n,w=3-n;const a={torso:-84,head:-88};
 a['thigh'+s]=88;a['shin'+s]=96;a['foot'+s]=2;a['thigh'+w]=72;a['shin'+w]=150;a['foot'+w]=100;
 a['uarm'+s]=92;a['farm'+s]=4;a['uarm'+w]=88;a['farm'+w]=0;return {a,anchor:{j:'pelvis',at:[0,-87]}};};
E.int44={view:'side',floor:FL,hl:['thigh','shin'],anchor:{j:'pelvis',at:[0,-90]},
 props:[{t:'floor',y:FL}],
 frames:[T(RA(1),220),T(RB(2),220),T(RA(2),220),T(RB(1),220)]};

// ---------- Seitlicher Ausfallschritt (Front, neu) ----------
const SA1=[-52,0],SA2=[52,0];
const sa=(side)=>{const a={head:-90,uarm:90,farm:90,foot1:180,foot2:0,s_foot:0.75};
 if(!side){const P=[0,-r1(Math.sqrt(88*88-43.5*43.5))];return B({P,t:-90,f:true,k1:[SA1[0],SA1[1],1],k2:[SA2[0],SA2[1],-1],a});}
 const bx=side===1?-1:1, P=[bx*9,-72], t=-90+bx*-3;
 const o={P,t,f:true,st:0.86,a:Object.assign(a,{head:-90+bx*-4,uarm:90+bx*-3,farm:90+bx*-3})};
 o.k1=[SA1[0],SA1[1],1]; o.k2=[SA2[0],SA2[1],-1];
 return B(o);};
E.seitausfall={view:'front',floor:FL,hl:['thigh'],anchor:{j:'pelvis',at:[0,-76]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end'},{t:'db',j:'ha2',o:'end'}],
 frames:[T(sa(0),1100,200),T(sa(1),1100,350),T(sa(0),1100,200),T(sa(2),1100,350)]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
E.seitheben={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:.8},{t:'db',j:'ha2',o:'end',s:.8}],
 frames:[
  {a:{torso:-90,head:-90,uarm1:100,farm1:96,uarm2:80,farm2:84,thigh1:92,shin1:90,foot1:150,thigh2:88,shin2:90,foot2:30},d:1100,hold:250},
  {a:{torso:-90,head:-90,uarm1:178,farm1:185,uarm2:2,farm2:-5,thigh1:92,shin1:90,foot1:150,thigh2:88,shin2:90,foot2:30},d:1600,hold:350},
 ]};
E.shrug={view:'front',floor:FL,hl:[],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:.9},{t:'db',j:'ha2',o:'end',s:.9}],
 frames:[
  {a:{torso:-90,head:-90,uarm1:98,farm1:92,uarm2:82,farm2:88,thigh1:92,shin1:90,foot1:150,thigh2:88,shin2:90,foot2:30},d:900,hold:200},
  {a:{torso:-90,head:-90,s_torso:1.14,s_head:0.55,uarm1:98,farm1:92,uarm2:82,farm2:88,thigh1:92,shin1:90,foot1:150,thigh2:88,shin2:90,foot2:30},d:1500,hold:700},
 ]};
E.slidecurl={view:'side',floor:FL,hl:['thigh'],anchor:{j:'neck',at:[0,FL-9]},pin:{j:'he1',y:FL-3},
 props:[{t:'floor',y:FL},{t:'mat',x1:-30,x2:150,y:FL-3}],
 frames:[
  {a:{torso:148,head:172,uarm:-4,farm:-2,thigh:-30,shin:78,foot:-10},d:1700,hold:200},
  {a:{torso:160,head:176,uarm:-2,farm:0,thigh:8,shin:12,foot:-70},d:1300,hold:200},
 ]};
})(window.EXA);
