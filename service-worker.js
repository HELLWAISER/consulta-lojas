const CACHE_NAME = "consulta-lojas-v1"; // SEMPRE Q ALTERAR MUDAR VERSÃO
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/cadastro.html",
  "/manifest.json",
  "/assets/css/style.css",
  "/assets/css/glass.css",
  "/assets/css/theme.css",
  "/assets/css/animations.css",
  "/assets/js/busca.js",
  "/assets/js/cadastro.js",
  "/assets/js/db.js",
  "/assets/js/firebase.js",
  "/assets/js/sync.js",
  "/assets/image/icon-192.png",
  "/assets/image/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

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

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
