/* =========================================================
   Apartman Nikolić — contact page form logic (EmailJS, no backend)
   ========================================================= */

const contactFormLoadedAt = Date.now();

function isEmailjsContactConfigured() {
  const cfg = SITE_CONFIG.emailjs;
  return cfg.publicKey && !cfg.publicKey.startsWith("YOUR_") &&
    cfg.serviceId && !cfg.serviceId.startsWith("YOUR_") &&
    cfg.contactTemplateId && !cfg.contactTemplateId.startsWith("YOUR_");
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const lang = getLang();
    form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
    form.querySelectorAll(".field-error").forEach(function (el) { el.textContent = ""; });
    const feedback = document.getElementById("contactFeedback");
    feedback.className = "form-feedback";
    feedback.textContent = "";

    const honeypot = form.querySelector('input[name="company"]');
    if (honeypot && honeypot.value) return;
    if (Date.now() - contactFormLoadedAt < SITE_CONFIG.minFormFillTimeMs) return;

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hasError = false;
    function setError(name, msg) {
      const field = form.querySelector('[data-field="' + name + '"]');
      if (!field) return;
      field.classList.add("has-error");
      const err = field.querySelector(".field-error");
      if (err) err.textContent = msg;
      hasError = true;
    }
    if (!name) setError("name", t("common.requiredField", lang));
    if (!email) setError("email", t("common.requiredField", lang));
    else if (!emailPattern.test(email)) setError("email", t("common.invalidEmail", lang));
    if (!message) setError("message", t("common.requiredField", lang));
    if (hasError) return;

    const templateParams = {
      sender_name: name,
      sender_email: email,
      subject: subject || "—",
      message: message,
      to_email: SITE_CONFIG.contactEmail
    };

    const submitBtn = document.getElementById("contactSubmitBtn");
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t("contactPage.form.submitting", lang);

    if (!isEmailjsContactConfigured() || typeof emailjs === "undefined") {
      console.warn("EmailJS n'est pas encore configuré : voir assets/js/config.js et le README.");
      window.setTimeout(function () {
        feedback.className = "form-feedback is-error";
        feedback.textContent = t("contactPage.form.errorMsg", lang) + " (EmailJS non configuré — voir README.md)";
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 400);
      return;
    }

    emailjs.send(SITE_CONFIG.emailjs.serviceId, SITE_CONFIG.emailjs.contactTemplateId, templateParams)
      .then(function () {
        feedback.className = "form-feedback is-success";
        feedback.textContent = t("contactPage.form.successMsg", lang);
        form.reset();
      })
      .catch(function (err) {
        console.error("EmailJS error:", err);
        feedback.className = "form-feedback is-error";
        feedback.textContent = t("contactPage.form.errorMsg", lang);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
