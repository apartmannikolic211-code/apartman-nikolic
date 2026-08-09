/* =========================================================
   Apartman Nikolić — room prices + shared room detail modal
   Used on index.html (teaser cards) and rooms.html (full grid + modal).
   ========================================================= */

function formatPrice(n) { return n + " €"; }

function paintRoomPrices() {
  document.querySelectorAll("[data-room-price]").forEach(function (el) {
    const room = getRoomById(el.getAttribute("data-room-price"));
    if (room) el.textContent = formatPrice(room.price);
  });
}

let _currentModalRoomId = null;
let _roomLightboxImages = [];
let _roomLightboxIndex = 0;

function fillRoomModal(id) {
  const room = getRoomById(id);
  if (!room) return;
  const lang = getLang();
  const text = t("rooms." + id, lang);
  _currentModalRoomId = id;
  _roomLightboxImages = room.images;
  _roomLightboxIndex = 0;

  const numeral = document.getElementById("roomModalNumeral");
  const nameEl = document.getElementById("roomModalName");
  const taglineEl = document.getElementById("roomModalTagline");
  const descEl = document.getElementById("roomModalDesc");
  const amenitiesEl = document.getElementById("roomModalAmenities");
  const priceEl = document.getElementById("roomModalPrice");
  const mainImg = document.getElementById("roomModalMainImg");
  const thumbs = document.getElementById("roomModalThumbs");
  const bookBtn = document.getElementById("roomModalBookBtn");

  if (numeral) numeral.textContent = id;
  if (nameEl) nameEl.textContent = text.name;
  if (taglineEl) taglineEl.textContent = text.tagline;
  if (descEl) descEl.textContent = text.long;
  if (priceEl) priceEl.textContent = formatPrice(room.price);
  if (bookBtn) bookBtn.setAttribute("href", "booking.html?room=" + id);

  if (amenitiesEl) {
    amenitiesEl.innerHTML = "";
    text.amenities.forEach(function (label) {
      const li = document.createElement("li");
      li.innerHTML = "<span aria-hidden=\"true\">&#10003;</span> " + label;
      amenitiesEl.appendChild(li);
    });
  }

  if (mainImg) mainImg.src = room.images[0];
  if (mainImg) mainImg.alt = text.name;
  if (thumbs) {
    thumbs.innerHTML = "";
    room.images.forEach(function (src, i) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = text.name + " " + (i + 1);
      if (i === 0) img.classList.add("is-active");
      img.addEventListener("click", function () {
        mainImg.src = src;
        _roomLightboxIndex = i;
        thumbs.querySelectorAll("img").forEach(function (t) { t.classList.remove("is-active"); });
        img.classList.add("is-active");
      });
      thumbs.appendChild(img);
    });
  }
}

function openRoomLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg || !_roomLightboxImages.length) return;
  _roomLightboxIndex = ((index % _roomLightboxImages.length) + _roomLightboxImages.length) % _roomLightboxImages.length;
  lightboxImg.src = _roomLightboxImages[_roomLightboxIndex];
  lightbox.classList.add("is-open");
}

function closeRoomLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
}

function showRoomLightboxDelta(delta) {
  if (!_roomLightboxImages.length) return;
  openRoomLightbox(_roomLightboxIndex + delta);
}

function initRoomLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const galleryMain = document.getElementById("roomModalGalleryMain");
  const expandBtn = document.getElementById("roomModalExpandBtn");
  if (galleryMain) galleryMain.addEventListener("click", function () { openRoomLightbox(_roomLightboxIndex); });
  if (expandBtn) expandBtn.addEventListener("click", function (e) { e.stopPropagation(); openRoomLightbox(_roomLightboxIndex); });

  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (closeBtn) closeBtn.addEventListener("click", closeRoomLightbox);
  if (prevBtn) prevBtn.addEventListener("click", function () { showRoomLightboxDelta(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { showRoomLightboxDelta(1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeRoomLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeRoomLightbox();
    if (e.key === "ArrowLeft") showRoomLightboxDelta(-1);
    if (e.key === "ArrowRight") showRoomLightboxDelta(1);
  });
}

function openRoomModal(id) {
  const overlay = document.getElementById("roomModalOverlay");
  if (!overlay) return;
  fillRoomModal(id);
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeRoomModal() {
  const overlay = document.getElementById("roomModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initRoomModal() {
  const overlay = document.getElementById("roomModalOverlay");
  if (!overlay) return;

  document.querySelectorAll("[data-room-modal-trigger]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openRoomModal(el.getAttribute("data-room-modal-trigger"));
    });
  });

  const closeBtn = document.getElementById("roomModalClose");
  if (closeBtn) closeBtn.addEventListener("click", closeRoomModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeRoomModal();
  });
  document.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeRoomModal();
  });

  const hash = window.location.hash.replace("#", "");
  if (["I", "II", "III"].includes(hash)) openRoomModal(hash);
}

document.addEventListener("DOMContentLoaded", function () {
  paintRoomPrices();
  initRoomModal();
  initRoomLightbox();
});

document.addEventListener("i18n:changed", function () {
  paintRoomPrices();
  if (_currentModalRoomId) fillRoomModal(_currentModalRoomId);
});
