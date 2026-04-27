//Tryb jasny-ciemny

const toggle = document.getElementById("theme-toggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}


//Licznik 

const eventDate = new Date("2026-04-17T09:00:00").getTime();

const daysEl = document.getElementById("cd-days");
const hoursEl = document.getElementById("cd-hours");
const minutesEl = document.getElementById("cd-minutes");
const secondsEl = document.getElementById("cd-seconds");

function updateCountdown() {
  const now = Date.now();
  const diff = eventDate - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const menuToggle = document.getElementById("menu-toggle");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});

const pages = document.querySelectorAll(".page-section");


function showPage(pageName) {
  pages.forEach(section => {
    section.classList.toggle(
      "active",
      section.dataset.page === pageName
    );
  });
  if (typeof gtag === "function") {
    gtag('event', 'page_view', {
      page_path: '/' + pageName
    });
  }
}

const allLinks = document.querySelectorAll('[data-target]');

allLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = link.dataset.target;

  if (target !== "kontakt") {
  window.location.hash = target;
  }

    if (target === "kontakt") {
      showPage("home");
      setTimeout(() => {
        document
          .getElementById("kontakt")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      showPage(target);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    document.body.classList.remove("menu-open");
  });
});

function loadFromHash() {
  const page = window.location.hash.replace("#", "") || "home";
  showPage(page);
}

window.addEventListener("hashchange", loadFromHash);

loadFromHash();




// ====================================================================
// GALERIA ZDJĘĆ — dodaj zdjęcia do tablicy poniżej
// Format: { src: 'galeria/foto01.jpg', alt: 'opis' }
// ====================================================================
const galleryPhotos = [
  { src: 'foto01.jpg', alt: 'Zdjęcie z konferencji 1' },
  { src: 'foto02.jpg', alt: 'Zdjęcie z konferencji 2' },
  { src: 'foto03.jpg', alt: 'Zdjęcie z konferencji 3' },
  { src: 'foto04.jpg', alt: 'Zdjęcie z konferencji 4' },
  { src: 'foto05.jpg', alt: 'Zdjęcie z konferencji 5' },
  { src: 'foto06.jpg', alt: 'Zdjęcie z konferencji 6' },
  { src: 'foto07.jpg', alt: 'Zdjęcie z konferencji 7' },
  { src: 'foto08.jpeg', alt: 'Zdjęcie z konferencji 8' },
  { src: 'foto09.jpeg', alt: 'Zdjęcie z konferencji 9' },
  { src: 'foto10.jpeg', alt: 'Zdjęcie z konferencji 10' },
  { src: 'foto11.jpeg', alt: 'Zdjęcie z konferencji 11' },
  { src: 'foto12.jpeg', alt: 'Zdjęcie z konferencji 12' },
  { src: 'foto13.png', alt: 'Zdjęcie z konferencji 13' },
  { src: 'foto14.jpeg', alt: 'Zdjęcie z konferencji 14' },
  { src: 'foto15.jpg', alt: 'Zdjęcie z konferencji 15' },
  { src: 'foto16.jpg', alt: 'Zdjęcie z konferencji 16' },
  { src: 'foto17.jpg', alt: 'Zdjęcie z konferencji 17' },
  { src: 'foto18.jpg', alt: 'Zdjęcie z konferencji 18' },
  { src: 'foto19.jpg', alt: 'Zdjęcie z konferencji 19' },
  { src: 'foto20.jpg', alt: 'Zdjęcie z konferencji 20' },
  { src: 'foto21.jpg', alt: 'Zdjęcie z konferencji 21' },
];

(function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const empty = document.querySelector('.gallery-empty');
  if (!grid || !empty) return;

  if (galleryPhotos.length === 0) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  galleryPhotos.forEach((p, i) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item';
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', 'Powiększ zdjęcie: ' + (p.alt || 'zdjęcie ' + (i + 1)));
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.alt || '';
    img.loading = 'lazy';
    fig.appendChild(img);
    const open = () => openLightbox(i);
    fig.addEventListener('click', open);
    fig.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    grid.appendChild(fig);
  });

  function openLightbox(startIndex) {
    let current = startIndex;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Podgląd zdjęcia');
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Zamknij">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Poprzednie zdjęcie">&#10094;</button>' +
      '<button class="lightbox-next" aria-label="Następne zdjęcie">&#10095;</button>' +
      '<img class="lightbox-img" alt="">';

    const imgEl = overlay.querySelector('.lightbox-img');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function show(i) {
      current = (i + galleryPhotos.length) % galleryPhotos.length;
      const photo = galleryPhotos[current];
      imgEl.src = photo.src;
      imgEl.alt = photo.alt || '';
    }

    function close() {
      overlay.remove();
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'ArrowLeft') show(current - 1);
    }

    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
    document.addEventListener('keydown', onKey);

    show(current);
    document.body.classList.add('lightbox-open');
    document.body.appendChild(overlay);
  }
})();


// ====================================================================
// COOKIE BANNER (zgoda RODO + Google Analytics Consent Mode)
// ====================================================================
(function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const settingsBtn = document.getElementById('cookie-settings-btn');
  if (!banner || !acceptBtn || !rejectBtn) return;

  const consent = localStorage.getItem('cookieConsent');
  if (!consent) showBanner();
  if (settingsBtn) settingsBtn.addEventListener('click', showBanner);

  function showBanner() {
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('is-visible'));
  }

  function hideBanner() {
    banner.classList.remove('is-visible');
    setTimeout(() => { banner.hidden = true; }, 300);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
      if (typeof loadGA === 'function') loadGA();
    }
    hideBanner();
  });

  rejectBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    hideBanner();
  });
})();


// ====================================================================
// BACK TO TOP — przycisk przewijania do góry
// ====================================================================
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let visible = false;
  const onScroll = () => {
    const should = window.scrollY > 400;
    if (should !== visible) {
      visible = should;
      if (should) {
        btn.hidden = false;
        requestAnimationFrame(() => btn.classList.add('is-visible'));
      } else {
        btn.classList.remove('is-visible');
        setTimeout(() => { if (!visible) btn.hidden = true; }, 250);
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


// ====================================================================
// SOCIAL SHARE — przyciski udostępniania
// ====================================================================
(function initSocialShare() {
  const shareUrl = encodeURIComponent(window.location.origin + window.location.pathname);
  const shareTitle = encodeURIComponent('III Konferencja „Dziecko Online: Wspólna Odpowiedzialność"');
  const fb = document.querySelector('[data-share="facebook"]');
  const li = document.querySelector('[data-share="linkedin"]');
  const tw = document.querySelector('[data-share="twitter"]');
  const em = document.querySelector('[data-share="email"]');
  const cp = document.querySelector('[data-share="copy"]');

  if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
  if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl;
  if (tw) tw.href = 'https://twitter.com/intent/tweet?text=' + shareTitle + '&url=' + shareUrl;
  if (em) em.href = 'mailto:?subject=' + shareTitle + '&body=' + shareUrl;
  if (cp) {
    cp.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(decodeURIComponent(shareUrl));
        const orig = cp.getAttribute('aria-label');
        cp.setAttribute('aria-label', 'Skopiowano!');
        cp.classList.add('is-copied');
        setTimeout(() => {
          cp.setAttribute('aria-label', orig);
          cp.classList.remove('is-copied');
        }, 1800);
      } catch (err) { /* ignore */ }
    });
  }
})();


// ====================================================================
// NEWSLETTER — zapis przez Google Forms (ukryta ramka)
// ====================================================================
(function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');
  if (!form || !success) return;

  // Formularz wysyła się natywnie przez target="hidden-iframe"
  // (Google Forms nie zwraca CORS, więc nie używamy fetch).
  form.addEventListener('submit', () => {
    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
    }, 600);
  });
})();
