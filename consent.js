// ====================================================================
// GOOGLE ANALYTICS CONSENT MODE v2 (RODO)
// Ten plik MUSI być załadowany w <head>, przed jakimkolwiek innym GA.
// Domyślnie blokuje wszystkie cookies analityczne dopóki użytkownik
// nie zaakceptuje ich w bannerze cookie. Obsługa kliknięć przycisków
// w bannerze znajduje się w script.js.
// ====================================================================

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

// Domyślnie: WSZYSTKO ODRZUCONE
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// Jeśli użytkownik wcześniej już wyraził zgodę - przywróć ją
if (localStorage.getItem('cookieConsent') === 'accepted') {
  gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
  loadGA();
}

// Ładuje GA dopiero po zaakceptowaniu cookies
function loadGA() {
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-9PDHSNGGMD';
  document.head.appendChild(s);
  gtag('config', 'G-9PDHSNGGMD');
}
