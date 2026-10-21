const V="iac-v3",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const html=r.mode==="navigate"||r.destination==="document";
if(html){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n})))});
