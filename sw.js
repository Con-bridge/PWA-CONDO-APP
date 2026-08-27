// Definiamo nuovo nome per la nostra cache (BUMP v24)
const CACHE_NAME = 'condo-app-pwa-cache-v24';

// Elenco dei file fondamentali da salvare per il funzionamento offline
const URLS_TO_CACHE = [
  './',
  './index.html',
  './icons.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Quando il service worker viene installato, apriamo la cache e salviamo i file
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta e file salvati per uso offline');
        return Promise.allSettled(
          URLS_TO_CACHE.map(url => cache.add(url).catch(err => console.warn('SW Cache skip:', url, err)))
        );
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminazione vecchia cache SW:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia Network-First per navigazione e index.html per mostrare subito le modifiche
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || event.request.url.includes('index.html')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// ============================================================================
// GESTIONE NOTIFICHE PUSH WEB (FUNZIONA ANCHE A BROWSER / PWA CHIUSA)
// ============================================================================
self.addEventListener('push', event => {
  let title = "Con-bridge Notifica";
  let body = "Hai una nuova notifica condominiale.";
  let icon = "/PWA-CONDO-APP/icons/icon-192x192.png";
  let badge = "/PWA-CONDO-APP/icons/icon-192x192.png";
  let targetPage = "dashboard";

  if (event.data) {
    try {
      const payload = event.data.json();
      
      if (payload.notification) {
        title = payload.notification.title || title;
        body = payload.notification.body || body;
      }
      
      if (payload.data) {
        targetPage = payload.data.page || targetPage;
        if (payload.data.title) title = payload.data.title;
        if (payload.data.body) body = payload.data.body;
      }
    } catch (e) {
      body = event.data.text();
    }
  }

  const options = {
    body: body,
    icon: icon,
    badge: badge,
    vibrate: [100, 50, 100],
    data: {
      url: `/PWA-CONDO-APP/#${targetPage}`
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ============================================================================
// CLICK SULLA NOTIFICA (Apertura PWA sulla pagina richiesta)
// ============================================================================
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const targetUrl = event.notification.data && event.notification.data.url 
    ? event.notification.data.url 
    : '/PWA-CONDO-APP/#dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
