const CACHE="nagriksetu-site-v1";
const CORE=["./","./index.html","./styles.css","./app.js","./config.js","./firebase-config.js","./manifest.webmanifest","./assets/heritage-catalog.json","./assets/favicon.svg"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET")return;
 const url=new URL(req.url);
 if(url.origin!==location.origin)return;
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(response=>{
  if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy))}
  return response;
 }).catch(()=>caches.match("./index.html"))));
});
