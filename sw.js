/* Improved Service Worker
   - Reads `manifest.json` for version (if present)
   - Precaches app shell including offline.html
   - skipWaiting() / clients.claim()
   - Differentiated runtime caching strategies
   - Messaging: supports `skipWaiting` via postMessage and notifies clients on activate
*/

const APP_PREFIX = 'matte-dolmetscher-';
const DEFAULT_VERSION = 'v1';
const PRECACHE_ASSETS = [
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html'
];

// runtime cache names
const RUNTIME_CACHE = 'runtime-cache';

async function getVersionFromManifest(){
  try{
    const res = await fetch('/manifest.json',{cache:'no-store'});
    if(!res.ok) return DEFAULT_VERSION;
    const j = await res.json();
    return j.version ? String(j.version) : DEFAULT_VERSION;
  }catch(e){return DEFAULT_VERSION;}
}

async function getCacheName(){
  if(self.__CACHE_NAME) return self.__CACHE_NAME;
  const v = await getVersionFromManifest();
  self.__CACHE_NAME = APP_PREFIX + v;
  return self.__CACHE_NAME;
}

self.addEventListener('install', (event)=>{
  event.waitUntil((async ()=>{
    const cacheName = await getCacheName();
    const cache = await caches.open(cacheName);
    try{
      await cache.addAll(PRECACHE_ASSETS);
    }catch(e){
      // best-effort precache; continue
      console.warn('Precache failed', e);
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event)=>{
  event.waitUntil((async ()=>{
    const current = await getCacheName();
    const keys = await caches.keys();
    await Promise.all(keys.map(k=>{ if(k!==current && k.startsWith(APP_PREFIX)) return caches.delete(k); }));
    await self.clients.claim();
    // notify clients that new SW active (include version)
    const version = current.replace(APP_PREFIX,'');
    const allClients = await self.clients.matchAll();
    for(const c of allClients){
      try{ c.postMessage({type:'SW_ACTIVATED', version}); }catch(e){}
    }
  })());
});

// Message handler for client -> SW commands (e.g. skipWaiting)
self.addEventListener('message', (event)=>{
  if(!event.data) return;
  if(event.data.action === 'skipWaiting'){
    self.skipWaiting();
  }
});

// Basic timeout helper for network-first
function networkFetchWithTimeout(request, timeout=4000){
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

  // navigation requests -> network-first with offline fallback
  if(req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))){
    event.respondWith((async ()=>{
      try{
        const netRes = await networkFetchWithTimeout(req,5000);
        // optionally update cache for navigation
        const cacheName = await getCacheName();
        const cache = await caches.open(cacheName);
        cache.put(req, netRes.clone()).catch(()=>{});
        return netRes;
      }catch(e){
        const cacheName = await getCacheName();
        const cache = await caches.open(cacheName);
        const cached = await cache.match('/offline.html');
        return cached || Response.error();
      }
    })());
    return;
  }

  // static assets (css/js/json/manifest/icons) -> stale-while-revalidate
  if(req.destination === 'script' || req.destination === 'style' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('manifest.json') || url.pathname.endsWith('.png')){
    event.respondWith((async ()=>{
      const cacheName = await getCacheName();
      const cache = await caches.open(cacheName);
      const cached = await cache.match(req);
      const networkPromise = fetch(req).then(res=>{ cache.put(req,res.clone()).catch(()=>{}); return res; }).catch(()=>{});
      return cached || (networkPromise || fetch(req));
    })());
    return;
  }

  // images/fonts -> cache-first (serve cached or fetch and cache)
  if(req.destination === 'image' || req.destination === 'font'){
    event.respondWith((async ()=>{
      const rCache = await caches.open(RUNTIME_CACHE);
      const cached = await rCache.match(req);
      if(cached) return cached;
      try{
        const net = await fetch(req);
        rCache.put(req, net.clone()).catch(()=>{});
        return net;
      }catch(e){ return Response.error(); }
    })());
    return;
  }

  // default: try cache, else network
  event.respondWith((async ()=>{
    const cacheName = await getCacheName();
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    if(cached) return cached;
    try{ return await fetch(req); }catch(e){ return Response.error(); }
  })());
});
