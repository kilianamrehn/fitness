/* Minimaler Service Worker: macht die Seite auf Android installierbar. Kein Caching, damit immer die neueste Version lädt. */
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
