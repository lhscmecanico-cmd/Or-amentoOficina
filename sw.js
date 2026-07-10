// Service Worker do sistema — necessário para que a Calculadora de Tempo
// consiga exibir/atualizar notificações na barra do Android mesmo com o
// app em segundo plano. Não faz cache nem interfere em nenhuma outra
// funcionalidade do sistema.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Ao tocar na notificação (fora do botão de ação), foca a aba do sistema
// já aberta ou abre uma nova. O alarme (som/vibração) só é interrompido
// quando o usuário toca no ícone do relógio dentro do app.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
