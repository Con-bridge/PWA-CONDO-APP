// Definiamo nuovo nome per la cache
const CACHE_NAME = 'condo-app-pwa-cache-v2';

// Elenco dei file fondamentali da salvare per il funzionamento offline
const URLS_TO_CACHE = [
  '/PWA-CONDO-APP/',
  '/PWA-CONDO-APP/index.html',
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
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Quando l'app richiede un file, intercettiamo la richiesta
self.addEventListener('fetch', event => {
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
