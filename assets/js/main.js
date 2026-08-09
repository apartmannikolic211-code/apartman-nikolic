/* =========================================================
   Apartman Nikolić — shared UI behaviour
   Mobile nav, language switcher, WhatsApp button, config injection.
   ========================================================= */

function applyConfig() {
  document.querySelectorAll("[data-config]").forEach(function (el) {
    const key = el.getAttribute("data-config");
    if (SITE_CONFIG[key] !== undefined) el.textContent = SITE_CONFIG[key];
  });
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    const key = el.getAttribute("data-config-href");
    if (key === "whatsapp") {
      el.setAttribute("href", "https://wa.me/" + SITE_CONFIG.whatsappNumber);
    } else if (key === "tel") {
      el.setAttribute("href", "tel:" + SITE_CONFIG.contactPhoneDisplay.replace(/\s+/g, ""));
    } else if (key === "email") {
      el.setAttribute("href", "mailto:" + SITE_CONFIG.contactEmail);
    } else if (key === "map") {
      el.setAttribute("href", SITE_CONFIG.mapLink);
    }
  });
  document.querySelectorAll("[data-config-src]").forEach(function (el) {
    const key = el.getAttribute("data-config-src");
    if (SITE_CONFIG[key]) el.setAttribute("src", SITE_CONFIG[key]);
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initLangSwitch() {
  const switcher = document.querySelector(".lang-switch");
  if (!switcher) return;
  const btn = switcher.querySelector(".lang-switch__btn");
  const menu = switcher.querySelector(".lang-switch__menu");

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    switcher.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", switcher.classList.contains("is-open") ? "true" : "false");
  });

  menu.querySelectorAll("[data-lang]").forEach(function (opt) {
    opt.addEventListener("click", function () {
      setLang(opt.getAttribute("data-lang"));
      switcher.classList.remove("is-open");
      renderLangOptionLabels();
    });
  });

  document.addEventListener("click", function () {
    switcher.classList.remove("is-open");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") switcher.classList.remove("is-open");
  });
}

function renderLangOptionLabels() {
  document.querySelectorAll(".lang-switch__option").forEach(function (opt) {
    const lang = opt.getAttribute("data-lang");
    opt.setAttribute("aria-current", lang === getLang() ? "true" : "false");
  });
  const currentLabel = document.querySelector("[data-lang-current-label]");
  if (currentLabel) currentLabel.textContent = getLang().toUpperCase();
}

function markActiveNavLink() {
  const page = document.body.getAttribute("data-page");
  if (!page) return;
  document.querySelectorAll(".main-nav a[data-nav-page]").forEach(function (a) {
    if (a.getAttribute("data-nav-page") === page) a.setAttribute("aria-current", "page");
  });
}

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initEmailJS() {
  if (typeof emailjs === "undefined") return;
  const key = SITE_CONFIG.emailjs.publicKey;
  if (key && !key.startsWith("YOUR_")) emailjs.init(key);
}

document.addEventListener("DOMContentLoaded", function () {
  applyConfig();
  initMobileNav();
  initLangSwitch();
  renderLangOptionLabels();
  markActiveNavLink();
  setFooterYear();
  initEmailJS();
});

document.addEventListener("i18n:changed", renderLangOptionLabels);
