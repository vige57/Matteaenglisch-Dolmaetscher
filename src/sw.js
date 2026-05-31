/* Improved Service Worker
   - Reads version from manifest or URL parameter
   - Precaches app shell including offline.html
   - skipWaiting() / clients.claim()
*/

const APP_PREFIX = 'matte-dolmetscher-';
const VERSION = '1.7.15'; 
const PRECACHE_ASSETS = [
  './index.html',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/favicon.ico',
  './offline.html'
];

const RUNTIME_CACHE = 'runtime-cache';

const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', (event)=>{
  event.waitUntil((async ()=>{
    const cache = await caches.open(CACHE_NAME);
    try{
      await cache.addAll(PRECACHE_ASSETS);
    }catch(e){
      console.warn('Precache failed', e);
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event)=>{
  event.waitUntil((async ()=>{
    const keys = await caches.keys();
    // Delete all old caches that start with APP_PREFIX but aren't the current CACHE_NAME
    await Promise.all(keys.map(k=>{ 
        if(k.startsWith(APP_PREFIX) && k !== CACHE_NAME) {
            return caches.delete(k); 
        }
    }));
    await self.clients.claim();
    
    // Notify clients
    const allClients = await self.clients.matchAll();
    for(const c of allClients){
      try{ c.postMessage({type:'SW_ACTIVATED', version: VERSION}); }catch(e){}
    }
  })());
});

// NEU: Message Listener für Versions-Abfrage
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.action === 'GET_VERSION') {
    event.source.postMessage({
      type: 'VERSION_INFO',
      version: VERSION
    });
  }

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

function networkFetchWithTimeout(request, timeout=5000){
  return new Promise((resolve,reject)=>{
    let didTimeOut = false;
    const timer = setTimeout(()=>{ didTimeOut=true; reject(new Error('timeout')); }, timeout);
    fetch(request).then(res=>{
      if(didTimeOut) return; clearTimeout(timer); resolve(res);
    }, err=>{ if(didTimeOut) return; clearTimeout(timer); reject(err); });
  });
}

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  const url = new URL(req.url);

  if(req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))){
    event.respondWith((async ()=>{
      try{
        const netRes = await networkFetchWithTimeout(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, netRes.clone()).catch(()=>{});
        return netRes;
      }catch(e){
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match('./offline.html');
        return cached || Response.error();
      }
    })());
    return;
  }

  if(req.destination === 'script' || req.destination === 'style' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('manifest.json') || url.pathname.endsWith('.png')){
    event.respondWith((async ()=>{
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const networkPromise = fetch(req).then(res=>{ 
          if(res.ok) cache.put(req,res.clone()).catch(()=>{}); 
          return res; 
      }).catch(()=>{});
      return cached || networkPromise || fetch(req);
    })());
    return;
  }

  event.respondWith((async ()=>{
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if(cached) return cached;
    try{ return await fetch(req); }catch(e){ return Response.error(); }
  })());
});

