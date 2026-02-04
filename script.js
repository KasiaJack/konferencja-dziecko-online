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
const navLinks = document.querySelectorAll("nav a[data-target]");

function showPage(pageName) {
  pages.forEach(section => {
    section.classList.toggle(
      "active",
      section.dataset.page === pageName
    );
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.dataset.target;

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

// strona startowa
showPage("home");

// Formularz 

const form = document.querySelector("form");
const msg = document.getElementById("form-msg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      msg.textContent = "Rejestracja przebiegła pomyślnie ✅";
      msg.style.color = "green";
      form.reset();
    } else {
      msg.textContent = "Coś poszło nie tak. Spróbuj ponownie.";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "Błąd sieci. Spróbuj później.";
    msg.style.color = "red";
  }
});