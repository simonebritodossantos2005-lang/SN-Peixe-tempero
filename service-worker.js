const CACHE_NAME = "sn-peixe-v2";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./launchericon-48x48.png",
  "./launchericon-72x72.png",
  "./launchericon-96x96.png",
  "./launchericon-144x144.png",
  "./launchericon-192x192.png",
  "./launchericon-512x512.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARQUIVOS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys().then(chaves => {
      return Promise.all(
        chaves
          .filter(chave => chave !== CACHE_NAME)
          .map(chave => caches.delete(chave))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", evento => {
  evento.respondWith(
    caches.match(evento.request).then(resposta => {
      return resposta || fetch(evento.request);
    })
  );
});
