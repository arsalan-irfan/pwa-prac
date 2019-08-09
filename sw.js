const staticCacheName = 'site-static'
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
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
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
})
self.addEventListener('fetch', evt => {
    //console.log('Fetch Event',evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes || fetch(evt.request);
        })
    )
})