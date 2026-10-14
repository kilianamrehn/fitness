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
// Klimmzug: Ellbogen ziehen seitlich nach unten (Oberarm in der Seitenansicht verkuerzt), Koerper bleibt unter der Stange
const KZ={head:-90,thigh:78,shin:140,foot:100};
E.klimmzug={view:'side',hl:['uarm','torso'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'bar',x1:-40,x2:40,y:0,frame:true}],
 frames:[
  {a:Object.assign({},KZ,{torso:-90,uarm:-90,farm:-90}),d:450,hold:300},
  {a:Object.assign({},KZ,{torso:-91,head:-89,uarm:-58,s_uarm:0.55,farm:-91}),d:450},
  {a:Object.assign({},KZ,{torso:-93,head:-88,uarm:22,s_uarm:0.42,farm:-92,thigh:75}),d:500},
  {a:Object.assign({},KZ,{torso:-96,head:-86,uarm:62,s_uarm:0.85,farm:-96,thigh:70,shin:138}),d:600,hold:300},
  {a:Object.assign({},KZ,{torso:-93,head:-88,uarm:22,s_uarm:0.42,farm:-92,thigh:75}),d:600},
  {a:Object.assign({},KZ,{torso:-91,head:-89,uarm:-58,s_uarm:0.55,farm:-91}),d:600},
 ]};
// Liegestuetz: Zehen fix, Haende fix (unter den Schultern oben), Koerper starr, Unterarm senkrecht ueber der Hand
const PU=(()=>{const R=Math.PI/180,d=a=>[Math.cos(a*R),Math.sin(a*R)],r=v=>Math.round(v*10)/10;
 const T=[0,FL-1];
 const sh=t=>{const lg=d(t+180),ft=d(t+90),td=d(t);const pel=[T[0]-ft[0]*14-lg[0]*88,T[1]-ft[1]*14-lg[1]*88];return [pel[0]+td[0]*46,pel[1]+td[1]*46];};
 const tFor=y=>{let b=0,e=1e9;for(let t=-40;t<=10;t+=0.05){const q=Math.abs(sh(t)[1]-y);if(q<e){e=q;b=t;}}return b;};
 const H=[sh(tFor(FL-4-55))[0],FL-4];
 const pose=y=>{const t=tFor(y),S=sh(t),E=[H[0],H[1]-26],v=[E[0]-S[0],E[1]-S[1]],L=Math.hypot(v[0],v[1]);
  return {torso:r(t),head:r(t-2),thigh:r(t+180),shin:r(t+180),foot:r(t+90),uarm:r(Math.atan2(v[1],v[0])/R),s_uarm:Math.round(L/29*100)/100,farm:90};};
 return {T,pose};})();
E.liegestuetz={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'to1',at:PU.T},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:PU.pose(FL-4-55),d:600,hold:250},
  {a:PU.pose(-38),d:600},
  {a:PU.pose(-17),d:500,hold:200},
  {a:PU.pose(-38),d:500},
 ]};
// Dead Bug (kontralateral: Arm 2 + Bein 1, dann Arm 1 + Bein 2; Lendenwirbelsaeule bleibt am Boden)
const DBt={torso:180,head:180,uarm:-90,farm:-90,thigh:-90,shin:0,foot:-40};
E.deadbug={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:60,y:FL-3}],
 frames:[
  {a:Object.assign({},DBt),d:1300,hold:250},
  {a:Object.assign({},DBt,{uarm2:-160,farm2:-160,thigh1:-6,shin1:-3,foot1:-50}),d:1300,hold:350},
  {a:Object.assign({},DBt),d:1300,hold:250},
  {a:Object.assign({},DBt,{uarm1:-160,farm1:-160,thigh2:-6,shin2:-3,foot2:-50}),d:1300,hold:350},
 ]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
// Batch A: Beine/Hüfte/Sprunggelenk. Winkel teils per IK vorberechnet (Fuesse/Haende treffen Boden, Stuhl, Huefte).
E.bulgarian={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"bench","x":-92,"y":-41,"w":42,"h":45},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-86,"head":-88,"uarm":91,"farm":90,"thigh1":82,"shin1":94,"foot1":0,"thigh2":113.2,"shin2":178.5,"foot2":176},"d":1700,"hold":300},{"a":{"torso":-76,"head":-82,"uarm":91,"farm":90,"thigh1":14,"shin1":102,"foot1":0,"thigh2":98.5,"shin2":-121.8,"foot2":176},"d":1100,"hold":250}]};
E.rueckausfall={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-90,"head":-90,"uarm":91,"farm":90,"thigh":90,"shin":90,"foot":0},"d":450,"hold":250},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh1":72,"shin1":95,"foot1":0,"thigh2":108,"shin2":140,"foot2":40},"d":650,"hold":0},{"a":{"torso":-84,"head":-86,"uarm":91,"farm":90,"thigh1":12,"shin1":98,"foot1":0,"thigh2":107.2,"shin2":-179.4,"foot2":48},"d":800,"hold":250},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh1":72,"shin1":95,"foot1":0,"thigh2":108,"shin2":140,"foot2":40},"d":550,"hold":0},{"a":{"torso":-90,"head":-90,"uarm":91,"farm":90,"thigh":90,"shin":90,"foot":0},"d":450,"hold":250,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh2":72,"shin2":95,"foot2":0,"thigh1":108,"shin1":140,"foot1":40},"d":650,"hold":0,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-84,"head":-86,"uarm":91,"farm":90,"thigh2":12,"shin2":98,"foot2":0,"thigh1":107.2,"shin1":-179.4,"foot1":48},"d":800,"hold":250,"anchor":{"j":"an2","at":[0,0]}},{"a":{"torso":-87,"head":-88,"uarm":91,"farm":90,"thigh2":72,"shin2":95,"foot2":0,"thigh1":108,"shin1":140,"foot1":40},"d":550,"hold":0,"anchor":{"j":"an2","at":[0,0]}}]};
E.sprungkniebeuge={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-89,"head":-90,"uarm":92,"farm":88,"thigh":90,"shin":90,"foot":0},"d":650,"hold":350},{"a":{"torso":-58,"head":-72,"uarm":128,"farm":118,"thigh":30,"shin":114,"foot":0},"d":280,"hold":60},{"a":{"torso":-88,"head":-88,"uarm":-55,"farm":-62,"thigh":88,"shin":91,"foot":62},"d":300,"hold":60,"anchor":{"j":"pelvis","at":[-1,-112]}},{"a":{"torso":-62,"head":-74,"uarm":40,"farm":5,"thigh":35,"shin":112,"foot":0},"d":700,"hold":300}]};
E.rdl={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-88,"head":-89,"uarm":92,"farm":91,"thigh":88,"shin":92,"foot":0},"d":1700,"hold":300},{"a":{"torso":-22,"head":-12,"uarm":105.5,"farm":105.5,"thigh":68,"shin":95,"foot":0},"d":1100,"hold":300}]};
E.slrdl={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-88,"head":-89,"uarm":91,"farm":90,"thigh1":88,"shin1":92,"foot1":0,"thigh2":100,"shin2":118,"foot2":35},"d":1800,"hold":300},{"a":{"torso":-8,"head":-6,"uarm1":96,"farm1":92,"uarm2":92,"farm2":90,"thigh1":74,"shin1":95,"foot1":0,"thigh2":174,"shin2":174,"foot2":92},"d":1200,"hold":300}]};
E.slthrust={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"chest","at":[-80,-46]},"props":[{"t":"floor","y":4},{"t":"bench","x":-135,"y":-34,"w":58,"h":38}],"frames":[{"a":{"torso":-140,"head":-140,"uarm":114.9,"s_uarm":0.573,"farm":180,"s_farm":0.75,"thigh1":-23.3,"shin1":74.0,"foot1":0,"thigh2":-50,"shin2":45,"foot2":-35},"d":900,"hold":250},{"a":{"torso":180,"head":192,"uarm":131.2,"s_uarm":0.367,"farm":180,"s_farm":0.75,"thigh1":3.8,"shin1":89.9,"foot1":0,"thigh2":270,"shin2":365,"foot2":285},"d":1500,"hold":400}]};
E.swing={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"armBehind":true,"props":[{"t":"floor","y":4},{"t":"db","j":"ha1","o":"farm1","s":1.1}],"frames":[{"a":{"torso":-35,"head":-38,"uarm":120,"farm":120,"thigh":65,"shin":92,"foot":0},"d":380,"hold":80},{"a":{"torso":-68,"head":-70,"uarm":72,"farm":72,"thigh":80,"shin":91,"foot":0},"d":300,"hold":0},{"a":{"torso":-90,"head":-90,"uarm":14,"farm":14,"thigh":90,"shin":90,"foot":0},"d":380,"hold":150},{"a":{"torso":-86,"head":-87,"uarm":84,"farm":84,"thigh":88,"shin":91,"foot":0},"d":320,"hold":0}]};
E.bridge={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"neck","at":[-62,-8.5]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-90,"x2":70,"y":1},{"t":"db","j":"ha1","o":"end"}],"frames":[{"a":{"torso":179,"head":180,"uarm":11.1,"farm":-48.3,"thigh":-43.3,"shin":69.2,"foot":0},"d":900,"hold":250},{"a":{"torso":156,"head":180,"uarm":-11.9,"farm":-71.3,"thigh":-17.0,"shin":77.5,"foot":0},"d":1400,"hold":500}]};
E.cossack={"view":"front","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[-55,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-90,"head":-90,"s_torso":1.0,"thigh1":132.7,"shin1":111.8,"s_thigh1":1.0,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":47.3,"shin2":68.2,"s_thigh2":1.0,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":250},{"a":{"torso":-90,"head":-90,"s_torso":0.9,"thigh1":175.6,"shin1":63.0,"s_thigh1":0.78,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":15.1,"shin2":37.6,"s_thigh2":1.0,"foot2":-62,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":350},{"a":{"torso":-90,"head":-90,"s_torso":1.0,"thigh1":132.7,"shin1":111.8,"s_thigh1":1.0,"foot1":180,"uarm1":105.5,"farm1":-17.8,"thigh2":47.3,"shin2":68.2,"s_thigh2":1.0,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":250},{"a":{"torso":-90,"head":-90,"s_torso":0.9,"thigh1":164.9,"shin1":142.4,"s_thigh1":1.0,"foot1":-118,"uarm1":105.5,"farm1":-17.8,"thigh2":4.4,"shin2":117.0,"s_thigh2":0.78,"foot2":0,"uarm2":74.5,"farm2":-162.2},"d":1300,"hold":350,"anchor":{"j":"an1","at":[-55,-3]}}]};
E.stepup={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,-45]},"props":[{"t":"floor","y":4},{"t":"bench","x":-17,"y":-41,"w":48,"h":45},{"t":"db","j":"ha1","o":"end"},{"t":"db","j":"ha2","o":"end"}],"frames":[{"a":{"torso":-78,"head":-84,"uarm":91,"farm":90,"thigh1":6.7,"shin1":128.4,"foot1":0,"thigh2":95.5,"shin2":114.2,"foot2":0},"d":700,"hold":250},{"a":{"torso":-84,"head":-87,"uarm":91,"farm":90,"thigh1":47.2,"shin1":123.2,"foot1":0,"thigh2":76.1,"shin2":157.7,"foot2":35},"d":450,"hold":0},{"a":{"torso":-89,"head":-90,"uarm":91,"farm":90,"thigh1":76.2,"shin1":100.4,"foot1":0,"thigh2":82.7,"shin2":105.8,"foot2":0},"d":700,"hold":250},{"a":{"torso":-84,"head":-87,"uarm":91,"farm":90,"thigh1":47.2,"shin1":123.2,"foot1":0,"thigh2":76.1,"shin2":157.7,"foot2":35},"d":650,"hold":0}]};
E.wallsit={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4},{"t":"wall","x":-66,"y1":-150,"y2":4}],"frames":[{"a":{"torso":-90,"head":-90,"uarm":76,"farm":-122,"thigh":0,"shin":90,"foot":0},"d":1600,"hold":900},{"a":{"torso":-89,"head":-87,"uarm":76,"farm":-122,"thigh":0,"shin":90,"foot":0,"s_torso":1.015},"d":1600,"hold":900}]};
E.nordic={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-30,"x2":110,"y":1},{"t":"box","x":-112,"y":-46,"w":72,"h":36},{"t":"post","x":-104,"y1":-12,"y2":4},{"t":"post","x":-48,"y1":-12,"y2":4}],"frames":[{"a":{"torso":-90,"head":-86,"thigh":90,"shin":178,"foot":186,"uarm":78,"farm":-70},"d":1500,"hold":400},{"a":{"torso":-52,"head":-48,"thigh":128,"shin":178,"foot":186,"uarm":116,"farm":-32},"d":1700,"hold":0},{"a":{"torso":-28,"head":-24,"thigh":152,"shin":178,"foot":186,"uarm":140,"farm":-8},"d":380,"hold":0},{"a":{"torso":-18,"head":-14,"thigh":162,"shin":178,"foot":186,"uarm":126.2,"farm":15.0},"d":1300,"hold":350}]};
E.revnordic={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-70,"x2":40,"y":1}],"frames":[{"a":{"torso":-90,"head":-87,"thigh":90,"shin":178,"foot":180,"uarm":74,"farm":-122},"d":2000,"hold":400},{"a":{"torso":-132,"head":-129,"thigh":48,"shin":178,"foot":180,"uarm":32,"farm":-164},"d":1300,"hold":350}]};
E.calf={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"to1","at":[12,-33.92820323027551]},"props":[{"t":"floor","y":4},{"t":"step","x":0,"y":-24,"w":30,"h":28},{"t":"bench","x":0,"y":-24,"w":30,"h":7},{"t":"step","x":30,"y":-48,"w":30,"h":52},{"t":"bench","x":30,"y":-48,"w":30,"h":7},{"t":"step","x":60,"y":-72,"w":40,"h":76},{"t":"bench","x":60,"y":-72,"w":40,"h":7}],"frames":[{"a":{"torso":-86,"head":-88,"uarm":94,"farm":92,"thigh":94,"shin":94,"s_foot":1.6,"foot":-30},"d":900,"hold":400,"anchor":{"j":"to1","at":[12,-33.92820323027551]}},{"a":{"torso":-86,"head":-88,"uarm":94,"farm":92,"thigh":94,"shin":94,"s_foot":1.6,"foot":46},"d":3000,"hold":300,"anchor":{"j":"to1","at":[12,-27]}}]};
E.tibialis={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"he1","at":[-4,0]},"props":[{"t":"floor","y":4},{"t":"wall","x":-39,"y1":-160,"y2":4}],"frames":[{"a":{"torso":-95,"head":-92,"uarm":94,"farm":92,"thigh":80,"shin":80,"foot":0},"d":600,"hold":250},{"a":{"torso":-95,"head":-92,"uarm":94,"farm":92,"thigh":80,"shin":80,"foot":-34},"d":1000,"hold":300}]};
E.pogo={"view":"side","floor":4,"hl":["shin"],"anchor":{"j":"to1","at":[14,1]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-89,"head":-89,"uarm":96,"farm":62,"thigh":86,"shin":95,"foot":22},"d":190,"hold":30},{"a":{"torso":-90,"head":-90,"uarm":94,"farm":58,"thigh":90,"shin":90,"foot":46},"d":190,"hold":30,"anchor":{"j":"to1","at":[13,-9]}}]};
E.monster={"view":"front","floor":4,"hl":["thigh"],"anchor":{"j":"an1","at":[-21,0]},"props":[{"t":"floor","y":4},{"t":"loop","a":"kn1","b":"kn2"}],"frames":[{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":133.2,"shin1":76.1,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":46.8,"shin2":103.9,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":134.6,"shin1":79.5,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":24.7,"shin2":101.8,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":136.3,"shin1":89.2,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":43.7,"shin2":88.1,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":152.5,"shin1":70.9,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":44.7,"shin2":98.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":133.2,"shin1":76.1,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":46.8,"shin2":103.9,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":154.5,"shin1":75.8,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":44.7,"shin2":98.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an2","at":[45,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":136.3,"shin1":89.2,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":43.7,"shin2":88.1,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":120,"anchor":{"j":"an1","at":[-21,0]}},{"a":{"torso":-90,"head":-90,"s_torso":0.93,"s_foot":0.75,"foot1":170,"foot2":10,"thigh1":135.3,"shin1":81.8,"s_thigh1":0.74,"uarm1":130.5,"farm1":28.6,"thigh2":25.5,"shin2":104.2,"s_thigh2":0.74,"uarm2":49.5,"farm2":151.4},"d":300,"hold":0,"anchor":{"j":"an1","at":[-21,0]}}]};
E.hipflexor={"view":"side","floor":4,"hl":["thigh"],"anchor":{"j":"kn1","at":[0,-2]},"props":[{"t":"floor","y":4},{"t":"mat","x1":-60,"x2":80,"y":1}],"frames":[{"a":{"torso":-89,"head":-90,"thigh1":90,"shin1":178,"foot1":180,"thigh2":6.4,"shin2":77.5,"foot2":0,"uarm2":47.4,"farm2":45.5,"uarm1":92,"farm1":90},"d":1600,"hold":500},{"a":{"torso":-93,"head":-92,"thigh1":112,"shin1":178,"foot1":180,"thigh2":1.8,"shin2":100.5,"foot2":0,"uarm2":42.7,"farm2":40.7,"uarm1":-84,"farm1":-86},"d":1600,"hold":1800}]};
E.deepsquat={"view":"side","floor":4,"hl":["thigh"],"armBehind":true,"anchor":{"j":"an1","at":[0,0]},"props":[{"t":"floor","y":4}],"frames":[{"a":{"torso":-58,"head":-60,"s_torso":1,"thigh":-14,"shin":122,"foot":0,"uarm":59.6,"farm":-62},"d":1800,"hold":800},{"a":{"torso":-61,"head":-58,"s_torso":1.02,"thigh":-14,"shin":122,"foot":0,"uarm":59.1,"farm":-62},"d":1800,"hold":800}]};
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
const r1=v=>Math.round(v*10)/10, r2=v=>Math.round(v*100)/100;
const A_=(v)=>r1(Math.atan2(v[1],v[0])/R), Ln=v=>Math.hypot(v[0],v[1]);
// Segment aus Vektor: Winkel + Laengenskalierung (Verkuerzung, wenn das Glied zur Kamera/weg zeigt)
function seg(k,v,L0){const o={};o[k]=A_(v);o['s_'+k.replace(/[12]$/,'')+(k.match(/[12]$/)||[''])[0]]=r2(Ln(v)/L0);return o;}
// Arm mit senkrechtem Unterarm (Hantel ueber/unter dem Ellbogen): Ellbogen relativ zur Schulter
function vArm(e,up,side){const sd=side||'';return M(seg('uarm'+sd,e,29),{['farm'+sd]:up===false?90:-90});}
// Schnittpunkt zweier Kreise (oberer/unterer)
function circ(c1,r1_,c2,r2_,upper){const dx=c2[0]-c1[0],dy=c2[1]-c1[1],d=Math.hypot(dx,dy);const a=(r1_*r1_-r2_*r2_+d*d)/(2*d),h=Math.sqrt(Math.max(0,r1_*r1_-a*a));
 const u=[dx/d,dy/d],p=[u[1],-u[0]];const sg=upper?1:-1;const m=[c1[0]+u[0]*a,c1[1]+u[1]*a];const q1=[m[0]+p[0]*h,m[1]+p[1]*h],q2=[m[0]-p[0]*h,m[1]-p[1]*h];
 return (q1[1]<q2[1])===upper?q1:q2;}
const lerp2=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];

// ---------- Klimmzug-Familie ----------
const hangLeg={thigh:80,shin:138,foot:100};
const chinTop=M({torso:-93,head:-84},arm(14,-3,1),hangLeg); // Kinn ueber der Stange, Kopf vor/neben der Stange, Ellbogen vorne-unten
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
// Reverse Fly: Hueftbeuge ~55 Grad, Knie nur weich, Arme leicht gebeugt seitlich bis Schulterhoehe
// Frontansicht (Seitenansicht getestet: Armweg dort nicht lesbar): Rumpf zeigt zur Kamera -> verkuerzt, Kopf vor der Brust, Beine schmal und fast gestreckt
E.revfly={view:'front',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[-9,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:0.8},{t:'db',j:'ha2',o:'end',s:0.8}],
 frames:[
  {a:{torso:-90,s_torso:0.5,head:90,s_head:0.2,uarm1:96,farm1:84,uarm2:84,farm2:96,thigh1:91,shin1:90,thigh2:89,shin2:90,foot1:180,foot2:0,s_foot:0.6},d:1200,hold:250},
  {a:{torso:-90,s_torso:0.5,head:90,s_head:0.2,uarm1:180,farm1:168,uarm2:0,farm2:12,thigh1:91,shin1:90,thigh2:89,shin2:90,foot1:180,foot2:0,s_foot:0.6},d:1600,hold:350},
 ]};
// Archer Push-up, Draufsicht (Kopf oben, Bauch zum Boden): Haende sehr breit auf Schulterhoehe fix, Fuesse fix.
// Koerper wandert seitlich zur beugenden Hand (Ellbogen zeigt nach hinten/aussen), anderer Arm bleibt gestreckt.
const AH=[[-48,-40],[48,-40]],AA=[[-7,86],[7,86]];
function archerPose(t){ // t: -1 = links (Seite 1) gebeugt, 0 = Mitte, +1 = rechts gebeugt
 const k=Math.abs(t),sg=Math.sign(t);
 const neck=[sg*k*26,-50+2*k],pel=[sg*k*8,0]; // Nacken wandert 26 (Schulter ueber die Hand), Becken 8 zur Arbeitsseite
 const tv=[neck[0]-pel[0],neck[1]-pel[1]],tl=Ln(tv),u=[tv[0]/tl,tv[1]/tl],pp=[-u[1],u[0]];
 const sb=[neck[0]-u[0]*4,neck[1]-u[1]*4];
 const a={torso:A_(tv),head:A_(tv),s_torso:r2(tl/50),s_head:0.9};
 for(const s of [1,2]){
  const g=s===1?-1:1,sh=[sb[0]+pp[0]*19*g,sb[1]+pp[1]*19*g],h=AH[s-1];
  const bend=(s===1&&t<0)||(s===2&&t>0)?k:0;
  const mid=lerp2(sh,h,0.53),el=lerp2(mid,[h[0]+g*11,h[1]+15],bend);
  Object.assign(a,seg('uarm'+s,[el[0]-sh[0],el[1]-sh[1]],29),seg('farm'+s,[h[0]-el[0],h[1]-el[1]],26));
  const hi=[pel[0]+pp[0]*8.5*g,pel[1]+pp[1]*8.5*g],lv=[AA[s-1][0]-hi[0],AA[s-1][1]-hi[1]];
  Object.assign(a,seg('thigh'+s,lv,88),seg('shin'+s,lv,88),{['foot'+s]:90,['s_foot'+s]:0.4});
 }
 return {a,anchor:{j:'pelvis',at:pel}};}
const ap=(t,d,hold)=>Object.assign(archerPose(t),{d,hold});
E.archer={view:'front',hl:['uarm','torso'],anchor:{j:'pelvis',at:[0,0]},
 props:[{t:'box',x:-68,y:-74,w:136,h:176}],
 frames:[ap(0,600,250),ap(-0.5,650),ap(-1,700,250),ap(-0.5,650),ap(0,600,250),ap(0.5,650),ap(1,700,250),ap(0.5,650)]};
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
// Floor Press: Rueckenlage, Kopf links, Knie gebeugt. Unten: Oberarm liegt seitlich ~45 Grad am Boden
// (Seitenansicht: kurze, fast waagerechte Projektion), Ellbogen am Boden, Unterarm senkrecht, Hantel ueber dem Ellbogen.
// Druecken: Hantel gerade nach oben bis der Arm senkrecht ueber der Schulter steht.
const fpLeg={thigh:-48,shin:84,foot:0};
const fpP=k=>{const e=lerp2([14,6],[0.5,-29],k);return M({torso:180,head:180},fpLeg,vArm(e,true,1),vArm([e[0]+3*(1-k),e[1]],true,2));};
E.floorpress={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'pelvis',at:[0,FL-13]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-85,x2:60,y:FL-3},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:fpP(0),d:550,hold:350},
  {a:fpP(0.5),d:550},
  {a:fpP(1),d:800,hold:250},
  {a:fpP(0.5),d:800},
 ]};
// Dips: Haende fix auf dem Holm, unten Ellbogen nach hinten, Oberarm ~parallel zum Boden,
// leichte Vorlage, Beine gebeugt hinter dem Koerper (Beinwinkel bleiben fix -> kein 'Schritt')
const dipLeg={thigh:100,shin:162,foot:118};
E.dips={view:'side',hl:['uarm','torso'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'dips',x:0,y:4,h:110,w:26}],
 frames:[
  {a:M({torso:-80,head:-82},arm(-3,54.5,1),dipLeg),d:1600,hold:250},
  {a:M({torso:-62,head:-66,uarm:183,farm:84},dipLeg),d:1100,hold:250},
 ]};

// ---------- Druecken ----------
const stF={thigh1:93,shin1:91,thigh2:87,shin2:89,foot1:180,foot2:0};
E.ohp={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[-10,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'h'},{t:'db',j:'ha2',o:'h'}],
 frames:[
  {a:M({torso:-90,head:-90,uarm1:118,farm1:-90,uarm2:62,farm2:-90},stF),d:1300,hold:250},
  {a:M({torso:-90,head:-90,uarm1:-98,farm1:-90,uarm2:-82,farm2:-90},stF),d:1100,hold:250},
 ]};
// Push Press: Hanteln auf Schulterhoehe, Unterarme senkrecht, Ellbogen seitlich (Seitenansicht verkuerzt);
// kurzer Dip (Rumpf senkrecht), Beine strecken explosiv, dann Arme ueber die Schulter. Hantel laeuft senkrecht.
const ppL={torso:-90,head:-90,thigh:90,shin:90,foot:0},ppA=y=>vArm([5,y],true);
E.pushpress={view:'side',floor:FL,hl:['uarm','thigh'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:M(ppL,ppA(20)),d:420,hold:300},
  {a:M(ppL,{thigh:66,shin:114},ppA(20)),d:260,hold:60},
  {a:M(ppL,ppA(4)),d:200},
  {a:M(ppL,ppA(-12)),d:250},
  {a:M(ppL,ppA(-28.5)),d:650,hold:400},
  {a:M(ppL,ppA(-12)),d:450},
  {a:M(ppL,ppA(4)),d:450},
 ]};
E.arnold={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[-10,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'h'},{t:'db',j:'ha2',o:'h'}],
 frames:[
  {a:M({torso:-90,head:-90,uarm1:84,s_uarm:0.55,farm1:-90,uarm2:96,farm2:-90},stF),d:650,hold:300},
  {a:M({torso:-90,head:-90,uarm1:150,s_uarm:0.95,farm1:-90,uarm2:30,farm2:-90},stF),d:650,hold:0},
  {a:M({torso:-90,head:-90,uarm1:-98,s_uarm:1,farm1:-90,uarm2:-82,farm2:-90},stF),d:800,hold:250},
  {a:M({torso:-90,head:-90,uarm1:150,s_uarm:0.95,farm1:-90,uarm2:30,farm2:-90},stF),d:700,hold:0},
 ]};
// Pike Push-up: Haende und Fuesse fix, Huefte bleibt der hoechste Punkt, Kopf senkt sich vor/zwischen
// die Haende Richtung Boden, Ellbogen zeigen nach hinten.
const PKA=[-78,-6];
function pikeP(k){const S=lerp2([-31,-45],[-1,-31],k);const H=circ(S,46,PKA,87.4,true);
 const tv=[S[0]-H[0],S[1]-H[1]],t=A_(tv);
 const El=lerp2(lerp2(S,[0,0],0.53),[-15,-21],k); // Ellbogen nach hinten, unten leicht seitlich (Oberarm verkuerzt)
 const o=M({torso:t,head:r1(t+6)},seg('uarm',[El[0]-S[0],El[1]-S[1]],29),seg('farm',[-El[0],-El[1]],26),{foot:32});
 const lg=ik(PKA[0]-H[0],PKA[1]-H[1],45,43,-1);o.thigh=lg[0];o.shin=lg[1];return o;}
E.pike={view:'side',floor:FL,hl:['uarm'],anchor:{j:'ha1',at:[0,0]},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:pikeP(0),d:650,hold:250},
  {a:pikeP(0.5),d:650},
  {a:pikeP(1),d:550,hold:250},
  {a:pikeP(0.5),d:550},
 ]};

// ---------- Zug / Schulter ----------
E.curl={view:'side',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:{torso:-90,head:-90,uarm:92,farm:90,thigh:90,shin:90,foot:0},d:1100,hold:250},
  {a:{torso:-90,head:-90,uarm:98,farm:-62,thigh:90,shin:90,foot:0},d:1500,hold:300},
 ]};
// Face Pull: Band auf Kopfhoehe; Haende ziehen gerade zum Gesicht, Ellbogen hoch und seitlich nach hinten
// (Seitenansicht verkuerzt), Ende: Haende neben den Ohren, Unterarme fast senkrecht (Aussenrotation).
const fpl={torso:-92,head:-90,thigh:90,shin:90,foot:0};
const fpk=(e,h)=>M(fpl,seg('uarm',e,29),{farm:A_([h[0]-e[0],h[1]-e[1]])});
E.facepull={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'post',x:105,y1:-175,y2:FL},{t:'band',from:'ha2',to:[105,-150]},{t:'band',from:'ha1',to:[105,-150]}],
 frames:[
  {a:fpk([28.7,-4],[54,-9]),d:400,hold:250},
  {a:fpk([14,-3],[38,-11]),d:300},
  {a:fpk([2,-2],[20,-17]),d:300},
  {a:fpk([-13,-1],[-3,-25]),d:600,hold:400},
  {a:fpk([2,-2],[20,-17]),d:450},
  {a:fpk([14,-3],[38,-11]),d:450},
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
// Serratus Wall Slide: Unterarme senkrecht an der Wand, Ellbogen gleiten senkrecht an der Wand nach oben
// (Ellbogen leicht seitlich -> Oberarm verkuerzt), Rumpf bleibt ruhig.
const swl={torso:-88,head:-90,thigh:90,shin:90,foot:0},swk=y=>M(swl,vArm([16,y],true));
E.serratus={view:'side',floor:FL,hl:['torso','uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'wall',x:22.2,y1:-215,y2:FL}],
 frames:[
  {a:swk(22),d:380,hold:250},{a:swk(11),d:380},{a:swk(0),d:380},{a:swk(-12),d:380},
  {a:swk(-24),d:330,hold:350},{a:swk(-12),d:330},{a:swk(0),d:330},{a:swk(11),d:330},
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
// Zehen und Stuetzhand fix, Koerper starr; tippende Hand geht vom Boden direkt zur Gegenschulter (Ellbogen seitlich -> Oberarm verkuerzt)
const PLk=(()=>{const T=[0,FL-1];
 const geo=t=>{const lg=dr(t+180),ft=dr(t+90),td=dr(t);const P=[T[0]-ft[0]*14-lg[0]*88,T[1]-ft[1]*14-lg[1]*88];return {P,S:[P[0]+td[0]*46,P[1]+td[1]*46]};};
 let t=0,e=1e9;for(let x=-30;x<=0;x+=0.05){const q=Math.abs(geo(x).S[1]-(FL-4-55));if(q<e){e=q;t=x;}}
 t=r1(t);const g=geo(t),H=[g.S[0],FL-4];
 const base=()=>({torso:t,head:t-2,thigh:t+180,shin:t+180,foot:r1(t+90)});
 const fr=tap=>{const o={P:g.P,t,a:base(),h1:[H[0],H[1],1],h2:[H[0],H[1],1]};
  if(tap){o.a['s_uarm'+tap]=0.72;o['h'+tap]=[g.S[0]+3,g.S[1]+7,1];}
  return B(o);};
 return {P:g.P,fr};})();
E.plank={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:PLk.P},
 props:[{t:'floor',y:FL}],
 frames:[T(PLk.fr(0),600,250),T(PLk.fr(2),600,300),T(PLk.fr(0),600,250),T(PLk.fr(1),600,300)]};

// ---------- McGill Curl-up ----------
// Kopf und Nacken bleiben neutral zum Rumpf (kein Kinn-zur-Brust), nur Kopf+Schultern heben minimal ab
const MG={torso:180,head:180,uarm:12,s_uarm:0.8,farm:8,s_farm:0.45,thigh1:-52,thigh2:0,shin2:0,foot2:-80,foot1:0};
{const r=roots([0,FL-11],180,false);const k=ik(r.hi1,[38,FL-4],45,43,-1);MG.thigh1=k[0];MG.shin1=k[1];}
E.mcgill={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-80,x2:100,y:FL-3}],
 frames:[
  {a:Object.assign({},MG),d:1100,hold:600},
  {a:Object.assign({},MG,{torso:189,head:191,uarm:10,farm:6}),d:1300,hold:1800},
 ]};

// ---------- Bird Dog ----------
// kontralateral: Arm 1 + Bein 2, neutraler Vierfuesslerstand, dann Arm 2 + Bein 1; Arm und Bein enden in Verlaengerung des Rumpfs
const BDP=[0,FL-51],BDt=r1(-Math.asin(8/46)/RD);
const bd=(ext)=>{const r=roots(BDP,BDt,false);const f=B({P:BDP,t:BDt,h1:[r.sh1[0],FL-4,1],h2:[r.sh2[0],FL-4,1],
  a:{head:BDt-4,thigh:90,shin:180,foot:176}});
 const arm=s=>{f.a['uarm'+s]=BDt-2;f.a['farm'+s]=BDt-2;}, leg=(s,m)=>{f.a['thigh'+s]=m?132:BDt+180;f.a['shin'+s]=m?178:BDt+180;f.a['foot'+s]=m?150:BDt+130;};
 if(ext===1){arm(1);leg(2);} if(ext===2){arm(2);leg(1);}
 return f;};
E.birddog={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:BDP},
 props:[{t:'floor',y:FL},{t:'mat',x1:-70,x2:80,y:FL-3}],
 frames:[T(bd(0),1000,300),T(bd(1),1000,800),T(bd(0),1000,300),T(bd(2),1000,800)]};

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
// Hantel-Arm (1) immer senkrecht. Kontakte bleiben fix: Fuss 1 (AF), Stuetzhand 2 (H), Ellbogen 2 (EL) beim Rollen,
// Ferse 2 (HE) bei der Bruecke; Bein 2 schwingt knapp ueber dem Boden unter den Koerper zum Knien, dann Ausfallschritt hoch.
const DB={uarm1:-90,farm1:-90};
const AF=[40,FL-4], H=[-30,FL-4], EL=[-40,FL-6], HE=[87,FL-7];
const vec=(a,b,L)=>{const dx=b[0]-a[0],dy=b[1]-a[1];return [r1(Math.atan2(dy,dx)/RD),Math.round(Math.hypot(dx,dy)/L*100)/100];};
const arm2=(f,P,t,elb)=>{const S=roots(P,t,false).sh2;
 if(elb){const u=vec(S,EL,29),w=vec(EL,H,26);Object.assign(f.a,{uarm2:u[0],s_uarm2:u[1],farm2:w[0],s_farm2:w[1]});}
 else{const u=vec(S,H,55);Object.assign(f.a,{uarm2:u[0],farm2:u[0],s_uarm2:u[1],s_farm2:u[1]});}return f;};
const leg2heel=(f,P,ang)=>{ // gestrecktes Bein 2, Ferse auf HE
 const fo=ang-80,an=[HE[0]+4*Math.cos(fo*RD),HE[1]+4*Math.sin(fo*RD)],v=vec(P,an,88);
 Object.assign(f.a,{thigh2:v[0],shin2:v[0],s_thigh2:v[1],s_shin2:v[1],foot2:r1(v[0]-80)});return f;};
const tgB=(P,t,hd,x)=>B({P,t,k1:[AF[0],AF[1],-1],a:Object.assign({head:hd,foot1:0},DB,x||{})});
const P0=[0,FL-11];
const tg0=leg2heel(arm2(tgB(P0,180,180),P0,180,true),P0,0);
const tg1=leg2heel(arm2(tgB(P0,206,196),P0,206,true),P0,0);
const tg2=leg2heel(arm2(tgB(P0,238,222),P0,238,false),P0,0);
const P3=[5,-33], tg3=leg2heel(arm2(tgB(P3,200,190),P3,200,false),P3,0);
const PH=[3,-21], tg2b=leg2heel(arm2(tgB(PH,218,204),PH,218,false),PH,0);
// Durchschwingen: Knoechel knapp ueber dem Boden, Fuss gestreckt (Fussruecken gleitet)
const sw=(ax,ay,bend,sc,fo)=>{const f=arm2(tgB(P3,200,190),P3,200,false),s=sc||1,v=ik(P3,[ax,ay],45*s,43*s,bend);
 Object.assign(f.a,{thigh2:v[0],shin2:v[1],s_thigh2:s,s_shin2:s,foot2:fo});return f;};
const tg3a=sw(58,FL-12,-1,1,-10), tg3b=sw(14,FL-12,-1,1,30), tg3c=sw(-30,FL-13,1,0.75,170);
const P4=[8,-30], th4=r1(180-Math.asin((FL-8-P4[1])/45)/RD);
const tg4=arm2(tgB(P4,204,192,{thigh2:th4,shin2:180,foot2:182}),P4,204,false);
// aufrecht knien (Zehen aufgestellt), Ausfallschritt hoch, Zwischenschritt, Stand
const P5=[-6,-47];
const tg4b=tgB([0,-40],-120,-130,{uarm2:100,farm2:96,thigh2:122,shin2:194,foot2:96});
const tg5=tgB(P5,-90,-108,{uarm2:96,farm2:92,thigh2:106,shin2:194,foot2:96});
const tg5b=tgB([16,-70],-88,-104,{uarm2:94,farm2:90,foot2:40});
{const v=ik([16,-70],[-14,FL-12],45,43,-1);Object.assign(tg5b.a,{thigh2:v[0],shin2:v[1]});}
const tg5c=tgB([30,-82],-89,-104,{uarm2:92,farm2:90,foot2:10});
{const v=ik([30,-82],[14,FL-16],45,43,-1);Object.assign(tg5c.a,{thigh2:v[0],shin2:v[1]});}
const tg6=B({P:[40,-88],t:-90,a:Object.assign({head:-104,uarm2:90,farm2:90,thigh:90,shin:90,foot:0},DB)});
E.tgu={view:'side',floor:FL,hl:['torso','uarm'],anchor:{j:'pelvis',at:P0},
 props:[{t:'floor',y:FL},{t:'mat',x1:-70,x2:110,y:FL-3},{t:'db',j:'ha1',o:'end'}],
 frames:[T(tg0,900,500),T(tg1,800,250),T(tg2,500,0),T(tg2b,500,0),T(tg3,500,300),T(tg3a,300,0),T(tg3b,300,0),T(tg3c,300,0),T(tg4,800,250),T(tg4b,500,0),T(tg5,700,250),T(tg5b,500,0),T(tg5c,500,0),T(tg6,900,600),
   T(tg5c,500,0),T(tg5b,500,0),T(tg5,700,250),T(tg4b,500,0),T(tg4,500,250),T(tg3c,300,0),T(tg3b,300,0),T(tg3a,300,0),T(tg3,500,300),T(tg2b,500,0),T(tg2,800,250),T(tg1,800,250)]};

// ---------- Seitstuetz Unterarm (Front) ----------
const SP={torso:198,head:194,uarm1:90,farm1:20,s_farm1:0.25,uarm2:-90,farm2:-90,thigh:18,shin:18,foot:60,s_foot:0.35};
E.sideplank={view:'front',floor:FL,hl:['torso'],anchor:{j:'el1',at:[0,FL-5]},pin:{j:'an1',y:FL-6},
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
 a['uarm'+f]=94;a['uarm'+b]=86;return {a,anchor:{j:'pelvis',at:[0,-84]}};};
const FWp=(n)=>{const s=n===1?1:2,w=n===1?2:1;const a={torso:-90,head:-90,uarm:90,farm:90};
 a['thigh'+s]=90;a['shin'+s]=90;a['foot'+s]=0;a['thigh'+w]=78;a['shin'+w]=122;a['foot'+w]=40;
 return {a,anchor:{j:'pelvis',at:[0,-88]}};};
E.farmer={view:'side',floor:FL,hl:['farm','torso'],anchor:{j:'pelvis',at:[0,-88]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end'},{t:'db',j:'ha2',o:'end'}],
 frames:[T(FWc(1),380),T(FWp(1),380),T(FWc(2),380),T(FWp(2),380)]};

// ---------- Copenhagen Plank kurzer Hebel (Front) ----------
// Unterarm fix am Boden, oberes Knie fix auf der Bank. Oben: Schulter-Huefte-Knie eine Linie.
// Absenken: Rumpf bleibt gerade und kippt um Schulter/Unterarm, Huefte sinkt Richtung Boden, Knie bleibt auf der Bank.
const CE=[0,FL-5];
const cpG=(u,t)=>{const S=[CE[0]-29*Math.cos(u*RD),CE[1]-29*Math.sin(u*RD)],pp=dr(t+90),td=dr(t);
 const sb=[S[0]+pp[0]*19,S[1]+pp[1]*19],nk=[sb[0]+td[0]*4,sb[1]+td[1]*4],P=[nk[0]-td[0]*50,nk[1]-td[1]*50];
 return {S,P,h2:[P[0]+pp[0]*8.5,P[1]+pp[1]*8.5]};};
const CPu=184, CPg=cpG(90,CPu), CK=[CPg.h2[0]+45*Math.cos((CPu-180)*RD),CPg.h2[1]+45*Math.sin((CPu-180)*RD)];
const CF=[r1(CK[0]+16),FL-6]; // unterer Fuss bleibt am Boden, Knie zeigt nach vorn (verkuerzt)
const CP=(al)=>{const t=CPu+al,g=cpG(90,t),s={u:90},pp=dr(t+90),th2=Math.atan2(CK[1]-g.h2[1],CK[0]-g.h2[0])/RD,ts=Math.round(Math.hypot(CK[0]-g.h2[0],CK[1]-g.h2[1])/45*100)/100;
 const h1=[g.P[0]-pp[0]*8.5,g.P[1]-pp[1]*8.5],lv=[CF[0]-h1[0],CF[1]-h1[1]],la=r1(Math.atan2(lv[1],lv[0])/RD),ls=Math.round(Math.hypot(lv[0],lv[1])/88*100)/100;
 return B({P:g.P,t:r1(t),f:true,h2:[g.h2[0]+pp[0]*3-3,g.h2[1]+pp[1]*3,-1],a:{head:r1(t+2),uarm1:r1(s.u),farm1:20,s_farm1:0.15,
   thigh2:r1(th2),s_thigh2:ts,shin2:0,foot2:-90,s_foot:0.5,thigh1:la,shin1:la,s_thigh1:ls,s_shin1:ls,foot1:0}});};
E.copen={view:'front',floor:FL,hl:['thigh','torso'],anchor:{j:'pelvis',at:CPg.P},
 props:[{t:'floor',y:FL},{t:'bench',x:r1(CK[0]-10),y:r1(CK[1]+6),w:62,h:r1(FL-CK[1]-6)}],
 frames:[T(CP(0),800,900),T(CP(9),800),T(CP(18),900,300),T(CP(9),900)]};

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
 frames:[{a:Object.assign({},CC),d:1400,hold:500},{a:Object.assign({},CC,{head:191,s_head:0.96}),d:1400,hold:1600}]};

// ---------- McKenzie Press-up ----------
// Haende bleiben neben den Schultern fix am Boden, Becken bleibt liegen, Arme strecken den Oberkoerper hoch (Ellbogen zeigen nach hinten)
const MKH=[54,FL-4];
const mkF=(t,su,hd)=>B({P:[0,FL-11],t,h1:[MKH[0],MKH[1],-1],h2:[MKH[0],MKH[1],-1],a:{head:hd,s_uarm:su,thigh:180,shin:180,foot:172}});
E.mckenzie={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-11]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-100,x2:80,y:FL-3}],
 frames:[T(mkF(-3,0.62,6),800,400),T(mkF(-24,0.8,-14),800),T(mkF(-46,1,-30),1000,900),T(mkF(-24,0.8,-14),900)]};

// ---------- Laufen auf der Stelle ----------
// gegengleicher Armschwung (Ellbogen ~90 Grad), Landung unter dem Knie statt weit vor dem Koerper, leichte Vorlage aus dem Sprunggelenk
const RA=(n)=>{const f=n,b=3-n;const a={torso:-84,head:-88};
 a['thigh'+f]=60;a['shin'+f]=100;a['foot'+f]=2;a['thigh'+b]=122;a['shin'+b]=150;a['foot'+b]=78;
 a['uarm'+b]=60;a['farm'+b]=-28;a['uarm'+f]=122;a['farm'+f]=36;return {a,anchor:{j:'pelvis',at:[0,-93]}};};
const RB=(n)=>{const s=n,w=3-n;const a={torso:-84,head:-88};
 a['thigh'+s]=88;a['shin'+s]=96;a['foot'+s]=2;a['thigh'+w]=72;a['shin'+w]=150;a['foot'+w]=100;
 a['uarm'+s]=92;a['farm'+s]=4;a['uarm'+w]=88;a['farm'+w]=0;return {a,anchor:{j:'pelvis',at:[0,-87]}};};
E.int44={view:'side',floor:FL,hl:['thigh','shin'],anchor:{j:'pelvis',at:[0,-90]},
 props:[{t:'floor',y:FL}],
 frames:[T(RA(1),220),T(RB(1),220),T(RA(2),220),T(RB(2),220)]};

// ---------- Seitlicher Ausfallschritt (Front, neu) ----------
// Fuesse bleiben fix, Becken schiebt nach hinten-seitlich ueber das beugende Bein, anderes Bein gestreckt, Rumpf aufrecht (leichte Vorlage = verkuerzt)
const SA1=[-52,0],SA2=[52,0],SA0=[0,-r1(Math.sqrt(88*88-43.5*43.5))];
const sa=(side,f)=>{const a={head:-90,uarm:90,farm:90,foot1:180,foot2:0,s_foot:0.75};
 if(!side||!f)return B({P:SA0,t:-90,f:true,k1:[SA1[0],SA1[1],1],k2:[SA2[0],SA2[1],-1],a});
 const bx=side===1?-1:1, P=[r1(bx*12*f),r1(SA0[1]+(-68-SA0[1])*f)];
 const o={P,t:-90,f:true,st:Math.round((1-0.14*f)*100)/100,a:Object.assign(a,{uarm:90+bx*4*f,farm:90+bx*4*f})};
 o.k1=[SA1[0],SA1[1],1]; o.k2=[SA2[0],SA2[1],-1];
 return B(o);};
E.seitausfall={view:'front',floor:FL,hl:['thigh'],anchor:{j:'pelvis',at:SA0},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end'},{t:'db',j:'ha2',o:'end'}],
 frames:[T(sa(0,0),600,200),T(sa(1,.5),550),T(sa(1,1),500,350),T(sa(1,.5),500),
         T(sa(0,0),600,200),T(sa(2,.5),550),T(sa(2,1),500,350),T(sa(2,.5),500)]};

})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
const R=Math.PI/180,dr=a=>[Math.cos(a*R),Math.sin(a*R)],r1=v=>Math.round(v*10)/10;
function ik(r,t,a,b,bend){const dx=t[0]-r[0],dy=t[1]-r[1];let D=Math.hypot(dx,dy);D=Math.max(Math.abs(a-b)+0.01,Math.min(D,a+b-0.01));
 const ph=Math.atan2(dy,dx),al=Math.acos(Math.max(-1,Math.min(1,(a*a+D*D-b*b)/(2*a*D))));
 const a1=ph+bend*al,e=[r[0]+a*Math.cos(a1),r[1]+a*Math.sin(a1)];
 return [r1(a1/R),r1(Math.atan2(t[1]-e[1],t[0]-e[0])/R)];}
// Seitheben: Ellbogen fuehren, Hand nie hoeher als der Ellbogen, Arme bis knapp Schulterhoehe
E.seitheben={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:.8},{t:'db',j:'ha2',o:'end',s:.8}],
 frames:[
  {a:{torso:-90,head:-90,uarm1:100,farm1:96,uarm2:80,farm2:84,thigh1:92,shin1:90,foot1:172,s_foot:0.7,thigh2:88,shin2:90,foot2:8},d:1100,hold:250},
  {a:{torso:-90,head:-90,uarm1:178,farm1:174,s_farm:0.95,uarm2:2,farm2:6,thigh1:92,shin1:90,foot1:172,s_foot:0.7,thigh2:88,shin2:90,foot2:8},d:1700,hold:350},
 ]};
// Shrugs: Schultern gerade nach oben Richtung Ohren (s_torso hebt Schulterguertel, s_head haelt den Kopf am Platz), Arme bleiben gestreckt
const SH={torso:-90,head:-90,uarm1:96,farm1:94,uarm2:84,farm2:86,thigh1:92,shin1:90,foot1:172,s_foot:0.7,thigh2:88,shin2:90,foot2:8};
E.shrug={view:'front',floor:FL,hl:['torso'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL},{t:'db',j:'ha1',o:'end',s:.9},{t:'db',j:'ha2',o:'end',s:.9}],
 frames:[
  {a:Object.assign({},SH,{s_torso:0.94,s_head:1.2}),d:800,hold:250},
  {a:Object.assign({},SH,{s_torso:1.2,s_head:0.33}),d:1400,hold:900},
 ]};
// Beinbeuger-Curl mit Slidern: Rueckenlage, Kopf links, Schulterblaetter am Boden, Huefte bleibt oben, Fersen gleiten raus und zurueck
const SLN=[0,FL-9];
const sl=(hipY,heelX,foot)=>{const t=180-Math.asin((hipY-SLN[1])/-50)/R*-1; // torso pelvis->neck
 const tt=180+Math.asin((SLN[1]-hipY)/50)/R*-1;
 const ang=180-Math.asin((SLN[1]-hipY)/50)/R; // dir pelvis->neck, neck lower-left of pelvis
 const pel=[SLN[0]-50*Math.cos(ang*R),SLN[1]-50*Math.sin(ang*R)];
 const heel=[heelX,FL-6],an=[heel[0]+4*Math.cos(foot*R),heel[1]+4*Math.sin(foot*R)];
 const k=ik(pel,an,45,43,-1);
 return {torso:r1(ang),head:184,uarm:6,farm:0,thigh:k[0],shin:k[1],foot};};
E.slidecurl={view:'side',floor:FL,hl:['thigh'],anchor:{j:'neck',at:SLN},
 props:[{t:'floor',y:FL},{t:'mat',x1:-30,x2:150,y:FL-3}],
 frames:[
  {a:sl(-33,76,-55),d:1000,hold:200},
  {a:sl(-27,105,-65),d:900},
  {a:sl(-21,133,-75),d:700,hold:200},
  {a:sl(-27,105,-65),d:700},
 ]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
// ---------- helpers (pure math, mirrors the engine skeleton, side view) ----------
const R=Math.PI/180, dr=a=>[Math.cos(a*R),Math.sin(a*R)], r1=v=>Math.round(v*10)/10, r2=v=>Math.round(v*100)/100;
const M=(...o)=>Object.assign({},...o);
const add=(p,v,s)=>[p[0]+v[0]*s,p[1]+v[1]*s], sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const A_=v=>r1(Math.atan2(v[1],v[0])/R), Ln=v=>Math.hypot(v[0],v[1]);
const lerp=(a,b,t)=>a+(b-a)*t, lerp2=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t)];
// 2-link IK root->target, lengths a,b; bend +1/-1 chooses the elbow/knee side. Returns [angle1, angle2]
function ik(r,t,a,b,bend){const dx=t[0]-r[0],dy=t[1]-r[1];let D=Math.hypot(dx,dy);D=Math.max(Math.abs(a-b)+0.01,Math.min(D,a+b-0.01));
 const ph=Math.atan2(dy,dx),al=Math.acos(Math.max(-1,Math.min(1,(a*a+D*D-b*b)/(2*a*D))));
 const a1=ph+bend*al,e=[r[0]+a*Math.cos(a1),r[1]+a*Math.sin(a1)];
 return [r1(a1/R),r1(Math.atan2(t[1]-e[1],t[0]-e[0])/R)];}
// circle-circle intersection (pick the one with the smaller y if upper, else larger y)
function circ(c1,ra,c2,rb,upper){const dx=c2[0]-c1[0],dy=c2[1]-c1[1],d=Math.hypot(dx,dy);const a=(ra*ra-rb*rb+d*d)/(2*d),h=Math.sqrt(Math.max(0,ra*ra-a*a));
 const u=[dx/d,dy/d],p=[u[1],-u[0]];const m=[c1[0]+u[0]*a,c1[1]+u[1]*a];const q1=[m[0]+p[0]*h,m[1]+p[1]*h],q2=[m[0]-p[0]*h,m[1]-p[1]*h];
 return (q1[1]<q2[1])===upper?q1:q2;}
function seg(k,v,L0){const o={};o[k]=A_(v);o['s_'+k.replace(/[12]$/,'')+(k.match(/[12]$/)||[''])[0]]=r2(Ln(v)/L0);return o;}
function vArm(e,side){const sd=side||'';return M(seg('uarm'+sd,e,29),{['farm'+sd]:-90});}
const shOf=(P,t)=>add(P,dr(t),46); // side view: shoulder = neck - 4 along torso

// ---------- Kniebeuge (Koerpergewicht) ----------
// Fuesse fix, Fersen bleiben am Boden. Huefte nach hinten-unten, Knie nach vorne ueber die Zehen,
// Oberschenkel unten knapp unter parallel, Rumpf ~40 Grad vorgeneigt, Ruecken gerade.
// Arme heben sich beim Absenken nach vorne bis auf Schulterhoehe (Gegengewicht), beim Aufstehen wieder runter.
const KB0={torso:-89,head:-90,uarm:90,farm:90,thigh:90,shin:90,foot:0};
const KBm={torso:-70,head:-78,uarm:42,farm:38,thigh:42,shin:104,foot:0};
const KB1={torso:-52,head:-66,uarm:-4,farm:-6,thigh:-8,shin:116,foot:0};
E.kniebeuge={view:'side',floor:FL,hl:['thigh'],anchor:{j:'an1',at:[0,0]},
 props:[{t:'floor',y:FL}],
 frames:[
  {a:KB0,d:900,hold:300},
  {a:KBm,d:800},
  {a:KB1,d:700,hold:250},
  {a:KBm,d:600},
 ]};

// ---------- Tischrudern (Rudern unter dem Tisch) ----------
// Rueckenlage unter dem Tisch, Kopf links. Haende greifen die Tischkante, Fersen am Boden (Drehpunkt),
// Koerper gerade von Ferse bis Kopf. Unten: Arme gestreckt, ungefaehr senkrecht zum Koerper.
// Oben: Brust (unteres Brustbein) an der Tischkante, Ellbogen zeigen zum Boden/nach hinten an den Rumpf vorbei.
const TR=(()=>{
 const HE=[70,FL-3.6];
 const body=al=>{ // al = Koerperwinkel ueber dem Boden (Grad), Kopf links
  const f=al-90, an=add(HE,dr(f),4), kn=add(an,dr(al),-43), P=add(kn,dr(al),-45), t=al-180;
  return {P,t,S:shOf(P,t),C:add(P,dr(t),35)};};
 const TY=-74;                       // Tischplatte oben
 // Oberste Position: Brustoberflaeche an der Plattenunterseite (TY+6), Hand ueber der Brust an der Kante
 let a1=0;for(let a=0;a<60;a+=0.05){const b=body(a),hd=add(add(b.P,dr(b.t),50),dr(b.t-6),15);if(b.C[1]-12.5<=TY+6+0.5||hd[1]-10.5<=TY+6+1){a1=a;break;}}
 const top=body(a1), H=[r1(top.C[0]-3),TY+3];
 // Unterste Position: Arm gestreckt (Abstand Schulter-Hand 54)
 let a0=0;for(let a=a1;a>0;a-=0.05){const b=body(a);if(Ln(sub(H,b.S))>=54){a0=a;break;}}
 const pose=k=>{const al=lerp(a0,a1,k),b=body(al);
  const a={torso:r1(b.t),head:r1(b.t-6),thigh:r1(al),shin:r1(al),foot:r1(al-90)};
  const s=lerp(1,0.62,k);a.s_uarm=r2(s);
  const v=ik(b.S,H,29*s,26,1);a.uarm=v[0];a.farm=v[1];
  return a;};
 return {HE,H,TY,pose,a0,a1};})();
E.tischrudern={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'he1',at:TR.HE},
 props:[{t:'floor',y:FL},{t:'table',x:TR.H[0]-110,y:TR.TY,w:114,h:TR.TY*-1+FL}],
 frames:[
  {a:TR.pose(0),d:400,hold:250},
  {a:TR.pose(0.33),d:350},
  {a:TR.pose(0.67),d:350},
  {a:TR.pose(1),d:550,hold:300},
  {a:TR.pose(0.67),d:550},
  {a:TR.pose(0.33),d:550},
 ]};

// ---------- Tuer-Rudern mit Handtuch ----------
// Offene Tuer von der Seite (Kante), Handtuch um den Tuergriff, beide Enden in den Haenden.
// Fersen nah an der Tuer (Drehpunkt), Koerper gerade, nach hinten gelehnt. Unten: Arme gestreckt in Zugrichtung.
// Rudern: Brust zur Tuer, Ellbogen nach hinten am Rumpf vorbei, Koerper richtet sich dabei um die Fersen auf.
const TU=(()=>{
 const HE=[0,FL-3.6], DX=26, K=[DX-6,-88];
 const body=b=>{ // b = Neigung nach hinten (Grad von der Senkrechten)
  const sh_=90-b, f=20-b, an=add(HE,dr(f),4), kn=add(an,dr(sh_),-43), P=add(kn,dr(sh_),-45), t=-90-b;
  return {P,t,S:shOf(P,t),C:add(P,dr(t),33),f,sh_};};
 const B0=50, b0=body(B0), d0=Ln(sub(K,b0.S)), LT=d0-54;   // Handtuchlaenge
 const handTop=b=>{const q=body(b);return add(q.C,dr(-b),11);};
 let B1=B0;for(let b=B0;b>0;b-=0.05){if(Ln(sub(K,handTop(b)))<=LT){B1=b;break;}}
 const pose=k=>{const b=lerp(B0,B1,k),q=body(b);
  let h;if(k===0)h=add(q.S,sub(K,q.S),54/Ln(sub(K,q.S)));
  else if(k===1)h=handTop(b);
  else{const ht=handTop(B1),dt=Ln(sub(ht,body(B1).S));h=circ(K,LT,q.S,lerp(54,dt,k),false);}
  const a={torso:r1(q.t),head:r1(q.t+6),thigh:r1(q.sh_),shin:r1(q.sh_),foot:r1(q.f)};
  const v=ik(q.S,h,29,26,1);a.uarm=v[0];a.farm=v[1];
  return a;};
 return {HE,DX,K,pose};})();
E.tuerrudern={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'he1',at:TU.HE},
 props:[{t:'floor',y:FL},{t:'door',x:TU.DX,y1:-205,y2:FL,knob:TU.K[1],side:-1},{t:'towel',from:'ha1',to:TU.K}],
 frames:[
  {a:TU.pose(0),d:400,hold:250},
  {a:TU.pose(0.33),d:350},
  {a:TU.pose(0.67),d:350},
  {a:TU.pose(1),d:600,hold:300},
  {a:TU.pose(0.67),d:600},
  {a:TU.pose(0.33),d:600},
 ]};

// ---------- Superman (Rueckenstrecken in Bauchlage, sanft) ----------
// Bauchlage, Kopf rechts, Arme nach vorne gestreckt. Becken/Bauch bleibt am Boden,
// Brust + Arme und gestreckte Beine heben nur leicht ab, Nacken neutral (Blick zum Boden), halten.
const SM0={torso:-2,head:-1,uarm:5,farm:6,thigh:176,shin:178,foot:160};
const SM1={torso:-10,head:-10,uarm:-11,farm:-11,thigh:-172,shin:-173,foot:168};
const SM2=M(SM1,{torso:-9,head:-9,uarm:-10,farm:-10});
E.superman={view:'side',floor:FL,hl:['torso'],anchor:{j:'pelvis',at:[0,FL-10.5]},
 props:[{t:'floor',y:FL},{t:'mat',x1:-110,x2:120,y:FL-3}],
 frames:[
  {a:SM0,d:1000,hold:600},
  {a:SM1,d:900,hold:900},
  {a:SM2,d:900,hold:900},
 ]};

// ---------- Stuhl-Dips ----------
// Haende auf der vorderen Sitzkante hinter dem Koerper (fix), Knie ~90 Grad, Fuesse flach am Boden (fix).
// Rumpf bleibt aufrecht und nah am Stuhl, Huefte sinkt senkrecht ab. Unten: Oberarm ~parallel zum Boden,
// Ellbogen zeigt nach hinten, Unterarm fast senkrecht. Oben: Arme gestreckt, Schultern ueber den Haenden.
const SD=(()=>{
 const H=[0,-47], A=[62,0];
 const pose=k=>{const S=lerp2([7,-100.5],[23,-72.5],k), t=lerp(-96,-90,k), P=add(S,dr(t),-46);
  const a={torso:r1(t),head:r1(lerp(-92,-88,k)),foot:0};
  const v=ik(S,H,29,26,1);a.uarm=v[0];a.farm=v[1];
  const l=ik(P,A,45,43,-1);a.thigh=l[0];a.shin=l[1];
  return a;};
 return {H,A,pose};})();
E.stuhldips={view:'side',floor:FL,hl:['uarm'],anchor:{j:'ha1',at:SD.H},
 props:[{t:'floor',y:FL},{t:'bench',x:-48,y:-44,w:51,h:48}],
 frames:[
  {a:SD.pose(0),d:700,hold:250},
  {a:SD.pose(0.5),d:700},
  {a:SD.pose(1),d:550,hold:250},
  {a:SD.pose(0.5),d:550},
 ]};

// ---------- Kurzhantel-Bankdruecken ----------
// Rueckenlage auf der Flachbank, Kopf links, Fuesse flach am Boden. Unten: Hanteln auf Brusthoehe seitlich der Brust,
// Oberarm ~45 Grad abgespreizt (Seitenansicht kurz, Ellbogen etwas unter Bankniveau), Unterarm senkrecht.
// Druecken: Hanteln nahezu senkrecht nach oben bis die Arme gestreckt ueber den Schultern stehen.
const BD=(()=>{
 const BY=-38, P=[0,BY-10.5], t=183.3, A=[48,0];
 const l=ik(P,A,45,43,-1);
 const leg={thigh:l[0],shin:l[1],foot:0};
 const pose=k=>{const e=lerp2([11,11],[0.5,-29],k);return M({torso:t,head:169},leg,vArm(e,1),vArm([e[0]+3*(1-k),e[1]],2));};
 return {BY,P,pose};})();
E.bankdruecken={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'pelvis',at:BD.P},
 props:[{t:'floor',y:FL},{t:'bench',x:-82,y:BD.BY,w:92,h:-BD.BY+FL},{t:'db',j:'ha2',o:'end'},{t:'db',j:'ha1',o:'end'}],
 frames:[
  {a:BD.pose(0),d:550,hold:300},
  {a:BD.pose(0.5),d:550},
  {a:BD.pose(1),d:900,hold:250},
  {a:BD.pose(0.5),d:900},
 ]};
})(window.EXA);
window.EXA=window.EXA||{};
(function(E){ const FL=4;
// Batch E: Band, Langhantel, Schlingentrainer, Kondition. Posen werden aus Zielpunkten (Hand, Fuss, Anker) berechnet.
const R=Math.PI/180;
const M=(...o)=>Object.assign({},...o);
const r1=v=>Math.round(v*10)/10, r2=v=>Math.round(v*100)/100;
const D=a=>[Math.cos(a*R),Math.sin(a*R)];
const add=(p,v,s)=>[p[0]+v[0]*(s===undefined?1:s),p[1]+v[1]*(s===undefined?1:s)];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const Ln=v=>Math.hypot(v[0],v[1]), A_=v=>r1(Math.atan2(v[1],v[0])/R);
const unit=v=>{const l=Ln(v)||1;return [v[0]/l,v[1]/l];};
const lerp=(a,b,t)=>a+(b-a)*t, lerp2=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t)];
const cl=v=>Math.max(-1,Math.min(1,v));
// Segment aus Vektor: Winkel + Laengenskalierung (Verkuerzung)
function seg(k,v,L0){const o={};const m=k.match(/[12]$/);const base=k.replace(/[12]$/,'');o[k]=A_(v);o['s_'+base+(m?m[0]:'')]=r2(Math.min(1,Ln(v)/L0));return o;}
// 2-Gelenk-IK p->q, pick(m0,m1)=true waehlt Loesung 0
function ik2(p,q,L1,L2,pick){const v=sub(q,p);const d=Math.max(Math.abs(L1-L2)+0.5,Math.min(Ln(v),L1+L2-0.05));const b=Math.atan2(v[1],v[0]);
 const al=Math.acos(cl((L1*L1+d*d-L2*L2)/(2*L1*d)));
 const S=[1,-1].map(s=>{const a1=b+s*al;const m=add(p,[Math.cos(a1),Math.sin(a1)],L1);return {m,a1:r1(a1/R),a2:A_(sub(q,m))};});
 return pick(S[0].m,S[1].m)?S[0]:S[1];}
const lower=(a,b)=>a[1]>b[1], fwd=(a,b)=>a[0]>b[0], back=(a,b)=>a[0]<b[0];
// Seitenansicht: Becken aus Knoechel + Beinwinkeln, Schulter aus Becken + Rumpf
const hipOf=(an,th,sh)=>add(add(an,D(sh),-43),D(th),-45);
const shOf=(pel,t)=>add(pel,D(t),46);
const armTo=(S,H,pick,sd)=>{const s=ik2(S,H,29,26,pick);const k=sd||'';return {['uarm'+k]:s.a1,['farm'+k]:s.a2};};

// ---------- Rudern mit Band (Tueranker auf Brusthoehe vorne) ----------
// Lockerer athletischer Stand, Rumpf leicht vorgeneigt und fix. Haende ziehen waagerecht entlang der Bandlinie
// zu den unteren Rippen, Ellbogen eng nach hinten.
{const L={thigh:78,shin:98,foot:0},T=-80;const P=hipOf([0,0],78,98),S=shOf(P,T);
 const ANC=[126,-121];const H0=add(S,unit(sub(ANC,S)),54.6),H1=add(add(P,D(T),27),D(T+90),13.5);
 const pose=k=>M(L,{torso:T,head:-82},armTo(S,lerp2(H0,H1,k),lower));
 E.bandrudern={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'door',x:130,y1:-200,y2:FL,knob:-96,side:1},{t:'band',from:'ha2',to:ANC},{t:'band',from:'ha1',to:ANC}],
  frames:[{a:pose(0),d:500,hold:250},{a:pose(0.5),d:500},{a:pose(1),d:700,hold:350},{a:pose(0.5),d:700}]};}

// ---------- Brustpresse mit Band (Tueranker hinten auf Brusthoehe) ----------
// Schrittstellung (nahes Bein vorn), Rumpf leicht vor, fix. Start: Haende neben der Brust, Ellbogen hinten-unten
// (~45 Grad abgespreizt -> Oberarm verkuerzt), Unterarm waagerecht. Haende druecken gerade nach vorn bis Arme gestreckt.
{const T=-82,P=hipOf([0,0],80,96),S=shOf(P,T);const lg=ik2(P,[-34,0],45,43,fwd);
 const L={thigh1:80,shin1:96,thigh2:lg.a1,shin2:lg.a2,foot:0};
 const E0=[-14,12],H0=[12,9],E1=add([0,0],D(6),29),H1=add([0,0],D(6),54.6);
 const pose=k=>{const h=lerp2(H0,H1,k);let e=lerp2(E0,E1,k);const f=sub(h,e);if(Ln(f)>26){e=sub(h,add([0,0],unit(f),26));}
  return M(L,{torso:T,head:-84},seg('uarm',e,29),seg('farm',sub(h,e),26));};
 const ANC=[-96,S[1]+12];
 E.banddruecken={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'door',x:-100,y1:-200,y2:FL,knob:-96,side:-1},{t:'band',from:'ha2',to:ANC},{t:'band',from:'ha1',to:ANC}],
  frames:[{a:pose(0),d:450,hold:250},{a:pose(0.5),d:450},{a:pose(1),d:700,hold:300},{a:pose(0.5),d:700}]};}

// ---------- Latzug mit Band, kniend (Anker oben an der Tuer, vorne) ----------
// Aufrechter Kniestand, Rumpf fix. Ellbogen ziehen seitlich nach unten (Seitenansicht: Oberarm verkuerzt),
// Unterarme senkrecht, Ende: Haende auf Schulterhoehe, Ellbogen unten an den Rippen.
{const L={thigh:90,shin:178,foot:180,torso:-97,head:-92};
 const top=M(L,{uarm:-78,farm:-78});
 const vA=e=>M(L,seg('uarm',e,29),{farm:-90});
 const ANC=[64,-190];
 E.bandlatzug={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'kn1',at:[0,-2]},
  props:[{t:'floor',y:FL},{t:'mat',x1:-60,x2:30,y:FL-3},{t:'post',x:68,y1:-196,y2:FL},{t:'door',x:68,y1:-196,y2:FL,knob:-92,side:1},{t:'band',from:'ha2',to:ANC},{t:'band',from:'ha1',to:ANC}],
  frames:[{a:top,d:450,hold:300},{a:vA([9,-20]),d:400},{a:vA([9,-4]),d:400},{a:vA([9,11]),d:400},{a:vA([9,22]),d:600,hold:350},
          {a:vA([9,11]),d:550},{a:vA([9,-4]),d:550},{a:vA([9,-20]),d:550}]};}

// ---------- Rumaenisches Kreuzheben mit Langhantel ----------
// Knie weich und fast fix, Huefte nach hinten, Ruecken neutral, Arme haengen, Stange senkrecht ueber dem Mittelfuss
// am Bein entlang bis knapp unter das Knie.
{const BX=10;const pose=k=>{const t=lerp(-87,-24,k),th=lerp(88,60,k),sh=lerp(92,97,k);const P=hipOf([0,0],th,sh),S=shOf(P,t);
  const dx=BX-S[0],dy=Math.sqrt(55*55-dx*dx);const a=A_([dx,dy]);return {torso:r1(t),head:r1(t+lerp(-2,9,k)),thigh:r1(th),shin:r1(sh),foot:0,uarm:a,farm:a,s_uarm:0.99,s_farm:0.99};};
 E.lhrdl={view:'side',floor:FL,hl:['thigh','torso'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'bb',j:'ha1'}],
  frames:[{a:pose(0),d:900,hold:300},{a:pose(0.5),d:900},{a:pose(1),d:600,hold:250},{a:pose(0.5),d:600}]};}

// ---------- Langhantel-Kniebeuge (High Bar) ----------
// Stange auf dem oberen Trapez knapp hinter der Schulter, Haende greifen sie, Ellbogen zeigen nach unten.
// Knie und Huefte beugen gleichzeitig bis knapp unter parallel; Rumpfneigung so gewaehlt, dass die Stange
// immer senkrecht ueber dem Mittelfuss bleibt. Fersen bleiben am Boden.
{const barOf=(P,t)=>add(add(shOf(P,t),D(t),5),D(t-90),11);
 const pose=k=>{const th=lerp(90,-4,k),sh=lerp(90,119,k);const P=hipOf([0,0],th,sh);
  const BX=lerp(-3.5,2,k);const trueBar=(a)=>add(add(shOf(P,a),D(a),3),D(a-90),4);let t=-89;for(let a=-89;a<=-25;a+=0.2){t=a;if(trueBar(a)[0]>=BX)break;}
  const S=shOf(P,t);return M({torso:r1(t),head:r1(t+(-86-t)*0.55),thigh:r1(th),shin:r1(sh),foot:0},armTo(S,barOf(P,t),lower));};
 E.lhkniebeuge={view:'side',floor:FL,hl:['thigh'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'bb',j:'ha1',s:0.8}],
  frames:[{a:pose(0),d:900,hold:300},{a:pose(0.5),d:700},{a:pose(1),d:600,hold:250},{a:pose(0.5),d:600}]};}

// ---------- Langhantel-Rudern ----------
// Hueftbeuge ~45 Grad, Knie gebeugt, Rumpf bleibt fix. Stange haengt unter den Schultern und wird senkrecht
// zum Bauch/unteren Rippen gezogen, Ellbogen nach hinten-oben.
{const T=-42,L={thigh:62,shin:100,foot:0,torso:T,head:-36};const P=hipOf([0,0],62,100),S=shOf(P,T);
 const H0=add(S,[0,1],54.6),H1=add(add(P,D(T),24),D(T+90),12.5);
 const pose=k=>M(L,armTo(S,lerp2(H0,H1,k),back));
 E.lhrudern={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'bb',j:'ha1'}],
  frames:[{a:pose(0),d:450,hold:250},{a:pose(0.5),d:450},{a:pose(1),d:700,hold:300},{a:pose(0.5),d:700}]};}

// ---------- Langhantel-Schulterdruecken (Frontansicht) ----------
// Griff knapp schulterbreit+ (Hand-x bleibt), Front Rack an den Schluesselbeinen, Unterarme senkrecht.
// Stange senkrecht am Gesicht vorbei bis Lockout ueber dem Kopf. Kopf und Rumpf bleiben ruhig.
{const stF={thigh1:93,shin1:91,thigh2:87,shin2:89,foot1:180,foot2:0,torso:-90,head:-90};
 const pp=(h,e)=>{const o=M(stF);for(const s of [1,2]){const g=s===1?1:-1;const H=[h[0]*g,h[1]],El=[e[0]*g,e[1]];
   Object.assign(o,seg('uarm'+s,El,29),seg('farm'+s,sub(H,El),26));}return o;};
 const K=[pp([-6,-5],[-9,19]),pp([-7,-23],[-11,1]),pp([-7,-40],[-9,-15]),pp([-6,-54],[-3.2,-28.5])];
 E.lhpress={view:'front',floor:FL,hl:['uarm'],anchor:{j:'an1',at:[-10,0]},
  props:[{t:'floor',y:FL},{t:'bb',j:'ha1'}],
  frames:[{a:K[0],d:400,hold:300},{a:K[1],d:350},{a:K[2],d:400},{a:K[3],d:550,hold:300},{a:K[2],d:450},{a:K[1],d:450}]};}

// ---------- Schlingentrainer-Rudern ----------
// Koerper starr (Knoechel-Huefte-Schulter eine Linie), Drehpunkt Knoechel, Fuesse flach.
// Gurtlaenge konstant: Brust wird zu den Haenden gezogen, Ellbogen eng hinter den Rumpf.
{const A=[40,-198];const shB=b=>add([0,0],D(b),134),pelB=b=>add([0,0],D(b),88);
 const b0=-130;const H0=add(shB(b0),unit(sub(A,shB(b0))),54.6),Ls=Ln(sub(A,H0));
 const hEnd=b=>add(add(pelB(b),D(b),38),D(b+90),11);
 let b1=b0;{let best=1e9;for(let b=-130;b<=-70;b+=0.1){const q=Math.abs(Ln(sub(A,hEnd(b)))-Ls);if(q<best){best=q;b1=b;}}}
 const dEnd=Ln(sub(hEnd(b1),shB(b1)));
 const pose=k=>{const b=lerp(b0,b1,k),S=shB(b),d=lerp(54.6,dEnd,k);
  // Schnittpunkt Kreis(A,Ls) mit Kreis(S,d), Loesung naeher an der Linie S->A
  const v=sub(S,A),dd=Ln(v),aa=(Ls*Ls-d*d+dd*dd)/(2*dd),hh=Math.sqrt(Math.max(0,Ls*Ls-aa*aa)),u=unit(v),p=[-u[1],u[0]];
  const m=add(A,u,aa),q1=add(m,p,hh),q2=add(m,p,-hh);const H=Ln(sub(q1,hEnd(b)))<Ln(sub(q2,hEnd(b)))?q1:q2;
  const bk=D(b-90),pk=(m0,m1)=>((m0[0]-S[0])*bk[0]+(m0[1]-S[1])*bk[1])>((m1[0]-S[0])*bk[0]+(m1[1]-S[1])*bk[1]);
  return M({torso:r1(b),head:r1(b),thigh:r1(b+180),shin:r1(b+180),foot:0},armTo(S,H,pk));};
 E.trxrow={view:'side',floor:FL,hl:['uarm','torso'],anchor:{j:'an1',at:[0,0]},
  props:[{t:'floor',y:FL},{t:'post',x:44,y1:-205,y2:FL},{t:'door',x:44,y1:-205,y2:FL,knob:-96,side:1},{t:'band',from:'ha2',to:A},{t:'band',from:'ha1',to:A}],
  frames:[{a:pose(0),d:450,hold:250},{a:pose(0.5),d:450},{a:pose(1),d:700,hold:300},{a:pose(0.5),d:700}]};}

// ---------- Bergsteiger (kontrolliert) ----------
// Hoher Stuetz, Kopf rechts, Haende unter den Schultern fix. Knie abwechselnd Richtung Brust, Huefte bleibt tief,
// Zehe des Standbeins fix am Boden. Neutrale Stuetzposition zwischen den Seiten.
{const plk={torso:-12,head:-14,thigh:168,shin:168,foot:78,uarm:90,farm:90};
 // Bein-Weg: anheben (Knie beugt, Fuss hoch) -> unter der Huefte (Knie leicht seitlich, Projektion kuerzer) -> Knie zur Brust.
 // Standbein minimal gebeugt, Huefte hebt sich nur wenige Einheiten (kein Pike).
 const k1=(m,o)=>{const p=m===1?2:1;const q={};for(const k in o)q[k.replace('#',m).replace('$',p)]=o[k];return M(plk,q);};
 const LIFT={'thigh$':165,'shin$':166,'thigh#':150,'shin#':198,'foot#':125},
       UND={'thigh$':161,'shin$':164,'thigh#':96,'s_thigh#':0.84,'shin#':192,'foot#':175},
       DRV={'thigh$':162,'shin$':165,'thigh#':4,'shin#':148,'foot#':170};
 const side=(m)=>{const pin={j:'to'+(m===1?2:1),y:FL-1};return [
   {a:plk,d:200,hold:120,pin},{a:k1(m,LIFT),d:220,pin},{a:k1(m,UND),d:260,pin},{a:k1(m,DRV),d:300,hold:200,pin},
   {a:k1(m,UND),d:240,pin},{a:k1(m,LIFT),d:220,pin}];};
 E.bergsteiger={view:'side',floor:FL,hl:['thigh','torso'],anchor:{j:'ha1',at:[0,FL-4]},pin:{j:'to2',y:FL-1},
  props:[{t:'floor',y:FL}],
  frames:side(1).concat(side(2))};}

// ---------- Hampelmann (Frontansicht) ----------
// Geschlossen: Fuesse zusammen, Arme unten. Sprung: Beine nach aussen, Arme seitlich (Frontalebene) ueber den Kopf,
// weiche Landung. Flugphasen dazwischen.
{const leg=(th,sh,ft)=>({thigh1:th,shin1:sh,thigh2:180-th,shin2:180-sh,foot1:ft,foot2:180-ft,s_foot:0.6});
 const arm_=(u,f)=>({uarm1:u,farm1:f,uarm2:r1(180-u),farm2:r1(180-f)});
 const py=(th,sh)=>-(45*Math.sin(th*R)+43*Math.sin(sh*R));
 const fr=(th,sh,ft,u,f,lift,d,hold)=>({a:M({torso:-90,head:-90},leg(th,sh,ft),arm_(u,f)),anchor:{j:'pelvis',at:[0,r1(py(th,sh)-lift)]},d,hold});
 E.hampelmann={view:'front',floor:FL,hl:['thigh','uarm'],anchor:{j:'pelvis',at:[0,-88]},
  props:[{t:'floor',y:FL}],
  frames:[fr(92,90,180,98,96,0,230,80),fr(102,100,130,180,180,12,230,0),fr(113,110,180,-75,-80,0,230,80),fr(102,100,130,180,180,12,230,0)]};}

// ---------- Seilspringen (Frontansicht) ----------
// Ellbogen nah am Rumpf, Unterarme tief nach aussen, Haende auf Hueft-hoehe; kleine Spruenge auf den Fussballen,
// Beine fast gestreckt. Seil unter den Fuessen.
{const base={torso:-90,head:-90,thigh1:91,shin1:90,thigh2:89,shin2:90,uarm1:100,uarm2:80,s_uarm:0.92};
 const g=(lift,f,ft)=>({a:M(base,{farm1:f,farm2:180-f,foot1:ft,foot2:180-ft,s_foot:0.6}),anchor:{j:'pelvis',at:[0,-88-lift]}});
 E.seilspringen={view:'front',floor:FL,hl:['shin','farm'],anchor:{j:'pelvis',at:[0,-88]},
  props:[{t:'floor',y:FL},{t:'rope',y:FL-6}],
  frames:[M(g(0,140,180),{d:170,hold:40}),M(g(7,134,140),{d:170,hold:30})]};}
})(window.EXA);
