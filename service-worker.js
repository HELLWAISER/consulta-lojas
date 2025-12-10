const CACHE_NAME = "consulta-lojas-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/cadastro.html",
  "/manifest.json",

  "/assets/css/style.css",

  "/assets/js/db.js",
  "/assets/js/busca.js",
  "/assets/js/cadastro.js",
  "/assets/js/firebase.js",
  "/assets/js/sync.js"
];

// Instala o cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Busca offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
