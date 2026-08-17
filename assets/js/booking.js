/* =========================================================
   Apartman Nikolić — booking page logic
   Room selection, calendar, live price calculation, EmailJS send.
   ========================================================= */

let bookingCalendar = null;
let selectedRoomId = null;
let selectedGuests = BOOKING_BASE_GUESTS;
let selectedRange = { start: null, end: null };
const formLoadedAt = Date.now();

function formatDateDisplay(date) {
  if (!date) return null;
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return d + "." + m + "." + date.getFullYear() + ".";
}

function nightsBetween(start, end) {
  if (!start || !end) return 0;
  return Math.round((end - start) / 86400000);
}

function populateRoomSelect() {
  const select = document.getElementById("roomSelect");
  if (!select) return;
  const lang = getLang();
  const prevValue = select.value;
  select.innerHTML = '<option value="" data-i18n="bookingPage.form.roomPlaceholder">' + t("bookingPage.form.roomPlaceholder", lang) + "</option>";
  ROOMS.forEach(function (room) {
    const text = t("rooms." + room.id, lang);
    const opt = document.createElement("option");
    opt.value = room.id;
    opt.textContent = room.id + " — " + text.name + " (" + t("common.from", lang) + " " + formatPrice(room.price) + " " + t("common.perNight", lang) + ")";
    select.appendChild(opt);
  });
  if (prevValue) select.value = prevValue;
}

function populateGuestsSelect() {
  const select = document.getElementById("guestsSelect");
  if (!select) return;
  const lang = getLang();
  const room = selectedRoomId ? getRoomById(selectedRoomId) : null;
  const maxGuests = room ? room.maxGuests : Math.max.apply(null, ROOMS.map(function (r) { return r.maxGuests; }));
  const prevValue = select.value;
  select.innerHTML = "";
  for (let g = 1; g <= maxGuests; g++) {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = formatGuests(g, lang);
    select.appendChild(opt);
  }
  if (prevValue && Number(prevValue) <= maxGuests) select.value = prevValue;
  else select.value = String(Math.min(BOOKING_BASE_GUESTS, maxGuests));
  selectedGuests = Number(select.value);
}

function renderStayStrip() {
  const arrivalEl = document.getElementById("stripArrival");
  const departureEl = document.getElementById("stripDeparture");
  const nightsEl = document.getElementById("stripNights");
  const rulerEl = document.getElementById("stripRuler");
  const lang = getLang();
  const placeholder = t("bookingPage.stayStrip.placeholder", lang);

  if (arrivalEl) arrivalEl.textContent = selectedRange.start ? formatDateDisplay(selectedRange.start) : placeholder;
  if (departureEl) departureEl.textContent = selectedRange.end ? formatDateDisplay(selectedRange.end) : placeholder;

  const nights = nightsBetween(selectedRange.start, selectedRange.end);
  if (nightsEl) nightsEl.textContent = nights > 0 ? nights : placeholder;

  if (rulerEl) {
    rulerEl.innerHTML = "";
    const count = Math.min(nights, 40);
    for (let i = 0; i < count; i++) {
      const tick = document.createElement("span");
      tick.className = "stay-strip__tick";
      rulerEl.appendChild(tick);
    }
  }
}

function renderSummary() {
  const lang = getLang();
  const roomNameEl = document.getElementById("summaryRoom");
  const guestsEl = document.getElementById("summaryGuests");
  const arrivalEl = document.getElementById("summaryArrival");
  const departureEl = document.getElementById("summaryDeparture");
  const nightsEl = document.getElementById("summaryNights");
  const totalEl = document.getElementById("summaryTotal");
  const submitBtn = document.getElementById("bookingSubmitBtn");

  const empty = t("bookingPage.summary.emptyValue", lang);
  const room = selectedRoomId ? getRoomById(selectedRoomId) : null;
  const roomText = selectedRoomId ? t("rooms." + selectedRoomId, lang) : null;

  if (roomNameEl) roomNameEl.textContent = roomText ? (selectedRoomId + " — " + roomText.name) : t("bookingPage.summary.emptyRoom", lang);
  if (guestsEl) guestsEl.textContent = room ? formatGuests(selectedGuests, lang) : empty;
  if (arrivalEl) arrivalEl.textContent = selectedRange.start ? formatDateDisplay(selectedRange.start) : empty;
  if (departureEl) departureEl.textContent = selectedRange.end ? formatDateDisplay(selectedRange.end) : empty;

  const nights = nightsBetween(selectedRange.start, selectedRange.end);
  if (nightsEl) nightsEl.textContent = nights > 0 ? formatNights(nights, lang) : empty;

  const total = room && nights > 0 ? getRoomPricePerNight(room, selectedGuests) * nights : 0;
  if (totalEl) totalEl.textContent = total > 0 ? formatPrice(total) : empty;

  const ready = !!(room && nights > 0);
  if (submitBtn) submitBtn.disabled = !ready;
}

function initCalendar() {
  const container = document.getElementById("calendarContainer");
  if (!container) return;
  bookingCalendar = new RangeCalendar({
    container: container,
    onChange: function (range) {
      selectedRange = range;
      renderStayStrip();
      renderSummary();
    }
  });
  renderStayStrip();
  renderSummary();
}

function initRoomSelect() {
  const select = document.getElementById("roomSelect");
  const guestsSelect = document.getElementById("guestsSelect");
  if (!select) return;

  const params = new URLSearchParams(window.location.search);
  const preselect = params.get("room");

  populateRoomSelect();
  if (preselect && ["I", "II", "III"].includes(preselect)) {
    select.value = preselect;
    selectedRoomId = preselect;
  }
  populateGuestsSelect();
  initCalendar();

  select.addEventListener("change", function () {
    selectedRoomId = select.value || null;
    populateGuestsSelect();
    renderSummary();
  });

  if (guestsSelect) {
    guestsSelect.addEventListener("change", function () {
      selectedGuests = Number(guestsSelect.value);
      renderSummary();
    });
  }
}

function showFormFeedback(type, message) {
  const el = document.getElementById("bookingFeedback");
  if (!el) return;
  el.className = "form-feedback is-" + type;
  el.textContent = message;
}

function clearFieldErrors(form) {
  form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
  form.querySelectorAll(".field-error").forEach(function (e) { e.textContent = ""; });
}

function setFieldError(form, name, message) {
  const field = form.querySelector('[data-field="' + name + '"]');
  if (!field) return;
  field.classList.add("has-error");
  const err = field.querySelector(".field-error");
  if (err) err.textContent = message;
}

function isEmailjsConfigured() {
  const cfg = SITE_CONFIG.emailjs;
  return cfg.publicKey && !cfg.publicKey.startsWith("YOUR_") &&
    cfg.serviceId && !cfg.serviceId.startsWith("YOUR_") &&
    cfg.bookingTemplateId && !cfg.bookingTemplateId.startsWith("YOUR_");
}

function buildBookingMailtoUrl(templateParams, lang) {
  const summaryLabels = t("bookingPage.summary", lang);
  const formLabels = t("bookingPage.form", lang);
  const subject = formLabels.submitBtn + " — " + templateParams.room_name;
  const body = [
    summaryLabels.roomLabel + ": " + templateParams.room_name,
    summaryLabels.guestsLabel + ": " + templateParams.guests,
    summaryLabels.arrivalLabel + ": " + templateParams.arrival_date,
    summaryLabels.departureLabel + ": " + templateParams.departure_date,
    summaryLabels.nightsLabel + ": " + templateParams.nights,
    summaryLabels.totalLabel + ": " + templateParams.total_price,
    "",
    formLabels.nameLabel + ": " + templateParams.guest_name,
    formLabels.phoneLabel + ": " + templateParams.guest_phone,
    formLabels.emailLabel + ": " + templateParams.guest_email,
    formLabels.messageLabel + ": " + templateParams.guest_message
  ].join("\n");
  return "mailto:" + SITE_CONFIG.contactEmail +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const lang = getLang();
    clearFieldErrors(form);
    showFormFeedback("", "");
    document.getElementById("bookingFeedback").className = "form-feedback";

    // Honeypot + minimum fill time anti-spam checks (silently drop likely bots)
    const honeypot = form.querySelector('input[name="company"]');
    if (honeypot && honeypot.value) return;
    if (Date.now() - formLoadedAt < SITE_CONFIG.minFormFillTimeMs) return;

    const name = form.elements["name"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hasError = false;
    if (!name) { setFieldError(form, "name", t("common.requiredField", lang)); hasError = true; }
    if (!phone) { setFieldError(form, "phone", t("common.requiredField", lang)); hasError = true; }
    if (!email) { setFieldError(form, "email", t("common.requiredField", lang)); hasError = true; }
    else if (!emailPattern.test(email)) { setFieldError(form, "email", t("common.invalidEmail", lang)); hasError = true; }

    const nights = nightsBetween(selectedRange.start, selectedRange.end);
    if (!selectedRoomId || nights <= 0) {
      showFormFeedback("error", t("bookingPage.form.selectDatesFirst", lang));
      hasError = true;
    }
    if (hasError) return;

    const room = getRoomById(selectedRoomId);
    const roomText = t("rooms." + selectedRoomId, lang);
    const total = getRoomPricePerNight(room, selectedGuests) * nights;

    const templateParams = {
      room_name: selectedRoomId + " — " + roomText.name,
      guests: formatGuests(selectedGuests, lang),
      arrival_date: formatDateDisplay(selectedRange.start),
      departure_date: formatDateDisplay(selectedRange.end),
      nights: nights,
      total_price: formatPrice(total),
      guest_name: name,
      guest_phone: phone,
      guest_email: email,
      guest_message: message || "—",
      to_email: SITE_CONFIG.contactEmail
    };

    const submitBtn = document.getElementById("bookingSubmitBtn");
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t("bookingPage.form.submitting", lang);

    if (!isEmailjsConfigured() || typeof emailjs === "undefined") {
      console.info("EmailJS n'est pas configuré : la demande de réservation part par mailto: vers " + SITE_CONFIG.contactEmail + ". Voir assets/js/config.js et le README pour activer EmailJS.");
      window.location.href = buildBookingMailtoUrl(templateParams, lang);
      window.setTimeout(function () {
        showFormFeedback("success", t("bookingPage.form.mailFallbackMsg", lang));
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 400);
      return;
    }

    emailjs.send(SITE_CONFIG.emailjs.serviceId, SITE_CONFIG.emailjs.bookingTemplateId, templateParams)
      .then(function () {
        showFormFeedback("success", t("bookingPage.form.successMsg", lang));
        const stamp = document.getElementById("bookingStamp");
        if (stamp) stamp.classList.add("is-visible");
        form.reset();
        selectedRange = { start: null, end: null };
        if (bookingCalendar) bookingCalendar.reset();
        renderStayStrip();
        renderSummary();
      })
      .catch(function (err) {
        console.error("EmailJS error:", err);
        showFormFeedback("error", t("bookingPage.form.errorMsg", lang));
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initRoomSelect();
  initBookingForm();
});

document.addEventListener("i18n:changed", function () {
  populateRoomSelect();
  if (selectedRoomId) document.getElementById("roomSelect").value = selectedRoomId;
  populateGuestsSelect();
  renderStayStrip();
  renderSummary();
});
