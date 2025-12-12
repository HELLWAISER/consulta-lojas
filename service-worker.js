const CACHE_NAME = 'consulta-lojas-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/cadastro.html',
  '/manifest.json',

  // CSS
  '/assets/css/style.css',

  // JS
  '/assets/js/busca.js',
  '/assets/js/cadastro.js',
  '/assets/js/db.js',
  '/assets/js/firebase.js',
  '/assets/js/sync.js',

  // Ícones
  '/assets/image/icon-192.png',
  '/assets/image/icon-512.png'
];

// Instalação
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação (limpa caches antigos)
self.addEventListener('activate', event => {
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

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
