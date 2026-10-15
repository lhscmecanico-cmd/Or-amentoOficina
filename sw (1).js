self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      var existente = list.find(function (c) { return 'focus' in c; });
      if (existente) return existente.focus();
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
