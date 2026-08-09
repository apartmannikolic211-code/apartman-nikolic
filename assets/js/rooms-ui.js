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

function fillRoomModal(id) {
  const room = getRoomById(id);
  if (!room) return;
  const lang = getLang();
  const text = t("rooms." + id, lang);
  _currentModalRoomId = id;

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
        thumbs.querySelectorAll("img").forEach(function (t) { t.classList.remove("is-active"); });
        img.classList.add("is-active");
      });
      thumbs.appendChild(img);
    });
  }
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
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeRoomModal();
  });

  const hash = window.location.hash.replace("#", "");
  if (["I", "II", "III"].includes(hash)) openRoomModal(hash);
}

document.addEventListener("DOMContentLoaded", function () {
  paintRoomPrices();
  initRoomModal();
});

document.addEventListener("i18n:changed", function () {
  paintRoomPrices();
  if (_currentModalRoomId) fillRoomModal(_currentModalRoomId);
});
