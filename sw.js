self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('pass-gen').then((cache) => cache.addAll([
        'index.html',
        'index.js',
        'index.css',
        'images/copy.svg',
        'images/favicon.ico',
        'images/favicon.png',
        'fonts/inter-v12-latin-300.woff',
        'fonts/inter-v12-latin-400.woff',
        'fonts/inter-v12-latin-600.woff',
        'fonts/inter-v12-latin-800.woff',
      ])),
    );
});
  
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});