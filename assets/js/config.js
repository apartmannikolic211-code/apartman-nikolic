/* =========================================================
   Apartman Nikolić — site configuration
   Edit the values below with the real business details.
   See README.md → "Configuration à faire avant mise en ligne".
   ========================================================= */
const SITE_CONFIG = {
  // WhatsApp number in international format, digits only (no "+", no spaces)
  whatsappNumber: "385991234567",

  // Display values
  contactPhoneDisplay: "+385 99 123 4567",
  contactEmail: "info@apartman-nikolic.hr",
  address: "Dalmatinska ul. 18, 52452 Funtana, Hrvatska",

  // Google Maps
  mapEmbedSrc: "https://www.google.com/maps?q=45.1743317,13.6082821&z=16&output=embed",
  mapLink: "https://maps.app.goo.gl/fqBxyCDf4i9m1ng46",

  // EmailJS — create a free account at https://www.emailjs.com
  // 1) Add an email service (e.g. Gmail) → copy its Service ID
  // 2) Create two templates (booking request / contact message) → copy their Template IDs
  // 3) Account → General → copy the Public Key, then restrict it to this site's domain
  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    bookingTemplateId: "YOUR_EMAILJS_BOOKING_TEMPLATE_ID",
    contactTemplateId: "YOUR_EMAILJS_CONTACT_TEMPLATE_ID"
  },

  // Minimum time (ms) a visitor must spend on a form before submitting.
  // A very fast submit almost always means a bot — used as lightweight anti-spam
  // alongside the honeypot field, pending a real reCAPTCHA/hCaptcha site key.
  minFormFillTimeMs: 3000
};
