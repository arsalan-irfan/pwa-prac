const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
]
//Install service worker
self.addEventListener('install', evt => {
    //console.log('Service worker has been installed')
    evt.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('caching shell assets')
                cache.addAll(assets)
            })
    )
})
//Activate events
self.addEventListener('activate', evt => {
    //console.log('Service worker has been activated')
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})
self.addEventListener('fetch', evt => {
    //console.log('Fetch Event',evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes=>{
                return caches.open(dynamicCacheName).then(cache=>{
                    cache.put(evt.request.url,fetchRes.clone());
                    return fetchRes
                })
            });
        }).catch(()=>caches.match('/pages/fallback.html'))
    )
})