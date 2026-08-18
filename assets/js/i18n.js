/* =========================================================
   Apartman Nikolić — i18n dictionary (FR / HR / DE / EN)
   Client-side only translation system: HTML carries data-i18n
   keys, this file supplies the strings, applyI18n() paints them.
   ========================================================= */

const SUPPORTED_LANGS = ["hr", "en", "de"];
const DEFAULT_LANG = "hr";
const LANG_STORAGE_KEY = "apk_lang";

const LANG_META = {
  hr: { label: "Hrvatski" },
  en: { label: "English" },
  de: { label: "Deutsch" }
};

const I18N = {
  en: {
    common: {
      bookNow: "Book now", viewDetails: "View details & photos", close: "Close",
      perNight: "/ night", from: "from", send: "Send", sending: "Sending…",
      requiredField: "This field is required.", invalidEmail: "Please enter a valid email.",
      nightsSingular: "night", nightsPlural: "nights", loading: "Loading…",
      guestsSingular: "guest", guestsPlural: "guests",
      skipToContent: "Skip to content", whatsappLabel: "Chat on WhatsApp",
      chooseLanguage: "Choose language", menu: "Menu", viewFullscreen: "View fullscreen"
    },
    nav: { home: "Home", rooms: "Our Rooms", gallery: "Gallery", booking: "Booking", about: "About", reviews: "Reviews", faq: "FAQ", contact: "Contact" },
    meta: {
      home: { title: "Apartman Nikolić — Apartments with Private Pool in Funtana", desc: "Three independent apartments with private pool, in a stone house facing the Adriatic. Calculate your price and book online." },
      rooms: { title: "Our Rooms — Apartman Nikolić", desc: "Discover the three independent apartments at Apartman Nikolić, with private pool: photos, amenities and rates." },
      gallery: { title: "Gallery — Apartman Nikolić", desc: "Photos of the house, the rooms and the surroundings of Apartman Nikolić." },
      booking: { title: "Booking — Apartman Nikolić", desc: "Choose your room and dates, calculate the price and send your booking request." },
      about: { title: "About — Apartman Nikolić", desc: "The story of Apartman Nikolić, a stone house carefully restored on the Adriatic coast." },
      reviews: { title: "Reviews — Apartman Nikolić", desc: "Read what our guests say after staying at Apartman Nikolić." },
      faq: { title: "FAQ — Apartman Nikolić", desc: "Check-in, cancellation, payment, pets: all the answers to your questions." },
      contact: { title: "Contact — Apartman Nikolić", desc: "Contact Apartman Nikolić by phone, email, WhatsApp or the online form." }
    },
    footer: {
      tagline: "A three-room guesthouse in the heart of the Adriatic coast.",
      pagesTitle: "Navigation", contactTitle: "Contact", followTitle: "Follow us",
      rights: "All rights reserved.",
      privacyNote: "Data submitted through this site is sent only by email and is not stored on any server or database."
    },
    home: {
      hero: { eyebrow: "GUESTHOUSE · ADRIATIC COAST", title: "Apartman Nikolić", subtitle: "Three independent apartments with private pool, in a stone house facing the Adriatic. Book your stay in a few clicks.", ctaBook: "Book my stay", ctaRooms: "Discover the rooms" },
      intro: {
        eyebrow: "WELCOME", title: "A house in the heart of Funtana",
        text: "Just steps from the coastline, Apartman Nikolić offers three independent apartments with a private pool, designed for travelers seeking calm and authenticity. Its prime location lets you make the most of the Istrian coastline: natural materials, morning light and amenities within walking distance make for a stay that's both restful and practical.",
        highlights: ["Beaches 1 km on foot", "Shops 2 min on foot", "Dinopark Funtana 1 km away", "Aquacolors Aquapark 3 km away", "Funtana & Vrsar marinas nearby", "Lim Channel 7 km away"]
      },
      roomsSection: { eyebrow: "OUR ROOMS", title: "Three apartments, three moods", text: "Each apartment is named after an element of the Adriatic landscape and offers two bedrooms, a living room and a fully equipped kitchen, with access to the private pool and the residence's shared amenities.", cta: "See all rooms" },
      whySection: {
        eyebrow: "WHY CHOOSE US", title: "Hospitality on a human scale",
        items: [
          { title: "Simple booking", text: "Select your dates, get the price instantly and send your request in one click." },
          { title: "Steps from the sea", text: "The house is a few minutes' walk from the coastline and the old town." },
          { title: "Private pool", text: "Every apartment includes access to the residence's private pool and barbecue area." },
          { title: "Fast replies", text: "Got a question? Reach us directly on WhatsApp — we reply within 24 hours." }
        ]
      },
      testimonialsSection: { eyebrow: "GUEST REVIEWS", title: "What our guests say" },
      ctaBanner: { title: "Ready to book your stay?", text: "Choose your room, your dates, and get your summary instantly.", button: "Start my booking" },
      locationSection: { eyebrow: "FIND US", title: "An address in the heart of Funtana", text: "In Funtana, just steps from the Istrian coastline, Apartman Nikolić is easy to find. Click the map to get directions to the house.", cta: "Get directions on Google Maps" }
    },
    roomsPage: { hero: { eyebrow: "OUR ROOMS", title: "Three independent apartments", text: "A perfect setup to stay together while keeping your independence: each apartment has two bedrooms, a living room, a fully equipped kitchen and a bathroom, with its own decor and view. Click on an apartment to discover the full gallery and amenities." } },
    rooms: {
      I: { name: "Apartment 1", tagline: "Steps from the beach", short: "An independent apartment just steps from the Adriatic coastline: two bedrooms, a living room and a fully equipped kitchen, with bright, modern interiors to unwind in after a day at the beach.", long: "Set on the upper floor, Apartment 1 opens onto a private balcony. Its two bedrooms, living room and fully equipped kitchen let you stay together while keeping your independence. Light wood furniture, adriatic-blue tones and linen textiles create a calming atmosphere, rounded out by access to the residence's private pool and barbecue area, just a few minutes' walk from the sea.", amenities: ["2 bedrooms", "Living room", "Fully equipped kitchen", "Bathroom", "Close to the beach", "Private balcony", "Air conditioning", "Free wifi", "Private pool", "Barbecue area", "Private parking", "PS5 console"] },
      II: { name: "Apartment 2", tagline: "Olive garden", short: "An independent ground-floor apartment facing the property's century-old olive garden: two bedrooms, a living room and a fully equipped kitchen.", long: "Apartment 2 looks directly onto the garden planted with century-old olive trees. Its two bedrooms and living room, with exposed wooden beams and warm olive-and-brass tones, give it a rustic, welcoming charm, while the fully equipped kitchen lets you cook and host freely. Private pool, barbecue area and residence parking included.", amenities: ["2 bedrooms", "Living room", "Fully equipped kitchen", "Bathroom", "Olive garden view", "Desk area", "Air conditioning", "Free wifi", "Private pool", "Barbecue area", "Private parking", "PS5 console"] },
      III: { name: "Apartment 3", tagline: "Stone courtyard", short: "An independent apartment with a mineral character, opening onto the house's stone inner courtyard: two bedrooms, a living room and a fully equipped kitchen.", long: "Tucked at the heart of the property, Apartment 3 opens onto the exposed stone walls that surround it. Its two bedrooms and living room open onto a private inner courtyard in refined terracotta tones, with a fully equipped kitchen and a walk-in shower. A discreet retreat rounded out by access to the private pool and barbecue area.", amenities: ["2 bedrooms", "Living room", "Fully equipped kitchen", "Bathroom", "Courtyard view", "Walk-in shower", "Air conditioning", "Free wifi", "Private pool", "Barbecue area", "Private parking", "PS5 console"] }
    },
    roomModal: { amenitiesTitle: "Amenities", bookBtn: "Book this room" },
    galleryPage: {
      hero: { eyebrow: "GALLERY", title: "The house in pictures", text: "Exteriors and rooms — a glimpse of the atmosphere at Apartman Nikolić." },
      filters: { all: "All", exterior: "Exterior", rooms: "Rooms" }
    },
    bookingPage: {
      hero: { eyebrow: "BOOKING", title: "Book your stay", text: "Choose a room, select your dates in the calendar, then send your request. The owner confirms actual availability by email within 24 to 48 hours." },
      form: {
        roomLabel: "Room", roomPlaceholder: "Choose a room",
        guestsLabel: "Number of guests", guestsHint: "+€30 / night per guest beyond 4",
        arrivalLabel: "Arrival", departureLabel: "Departure",
        nameLabel: "Full name", phoneLabel: "Phone", emailLabel: "Email",
        messageLabel: "Message (optional)", messagePlaceholder: "Estimated arrival time, special requests…",
        submitBtn: "Send booking request", submitting: "Sending…",
        successMsg: "Your request has been sent! The owner will reply within 24 to 48 hours to confirm availability.",
        errorMsg: "Something went wrong while sending. Please try again or contact us directly on WhatsApp.",
        mailFallbackMsg: "Your email app will open with your request details pre-filled. Please check and send the email to finalize your booking.",
        privacyNote: "Information submitted through this form is used only to process your booking request and is not stored on any server.",
        selectDatesFirst: "Please select a room and dates before sending your request.",
        captchaNote: "This form is protected against bots (anti-spam)."
      },
      calendar: {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        legendAvailable: "Available", legendSelected: "Selected",
        selectArrivalPrompt: "Select arrival date", selectDeparturePrompt: "Select departure date",
        prevMonth: "Previous month", nextMonth: "Next month"
      },
      stayStrip: { arrivalLabel: "ARRIVAL", departureLabel: "DEPARTURE", nightsLabel: "NIGHTS", placeholder: "—" },
      summary: { title: "Booking summary", roomLabel: "Room", guestsLabel: "Guests", arrivalLabel: "Arrival", departureLabel: "Departure", nightsLabel: "Number of nights", totalLabel: "Total stay", emptyRoom: "Not selected", emptyValue: "—", stampText: "Request sent" }
    },
    aboutPage: {
      hero: { eyebrow: "ABOUT", title: "The story of Apartman Nikolić", text: "Three independent apartments with a private pool, born from the restoration of a family stone house passed down through generations, just steps from the Istrian coastline." },
      story: ["Apartman Nikolić began with the restoration of a family stone house in Funtana, just steps from the Istrian coastline. Rather than turning it into a simple seasonal rental, the family chose to create three independent, identical apartments — each with two bedrooms, a living room and a fully equipped kitchen — designed to welcome every group warmly while preserving everyone's privacy.", "Here, the private pool and barbecue area become the gathering place, while each apartment remains its own independent retreat for resting. The original materials — stone, wood, lime plaster — have been carefully preserved to bring the comfort of a modern stay. And because hospitality here is above all a family affair, it's the family itself who answers your messages and prepares your arrival, from the first message to your departure."],
      values: [
        { title: "Authenticity", text: "A stone house restored with respect for its original architecture." },
        { title: "Personal welcome", text: "Direct contact with the family, from your first message to your departure." },
        { title: "Local roots", text: "Garden produce, trusted addresses and tips for exploring the surroundings." }
      ],
      amenitiesSection: {
        eyebrow: "INCLUDED AMENITIES", title: "Amenities designed for your comfort",
        items: [
          { title: "Private pool", text: "Cool off and enjoy the sun in complete peace and quiet." },
          { title: "Barbecue area", text: "A dedicated spot for grilling and sharing meals outdoors." },
          { title: "Private parking", text: "Safe, easy parking right on the property." },
          { title: "High-speed Wi-Fi", text: "Internet access included throughout the property." },
          { title: "PS5 console", text: "For video game lovers of all ages to enjoy." }
        ]
      },
      highlightsSection: {
        eyebrow: "HIGHLIGHTS", title: "What Makes This Place Special",
        items: [
          { title: "Independence and togetherness", text: "Enjoy shared moments by the pool or at the barbecue, while keeping your own private space in your own apartment." },
          { title: "Fully equipped comfort", text: "Ideal for a relaxing getaway or a lively stay, with modern amenities for all ages." }
        ]
      },
      hostTitle: "At your service", hostText: "Feel free to reach out before, during or after your stay: we're reachable by WhatsApp, phone or email."
    },
    reviewsPage: {
      hero: { eyebrow: "REVIEWS", title: "What our guests say", text: "A selection of reviews left by travelers after their stay." },
      ratingSummary: { score: "4.9", basedOn: "Based on 128 online reviews" },
      list: [
        { author: "Sophie D.", origin: "France", stars: 5, date: "July 2026", quote: "A warm welcome and a spotless apartment just steps from the beach. The private pool will stay one of the best memories of our holiday." },
        { author: "Thomas M.", origin: "Germany", stars: 5, date: "June 2026", quote: "Quiet location, beautiful inner courtyard, and very responsive hosts. We'll definitely be back!" },
        { author: "Ivana K.", origin: "Croatia", stars: 5, date: "May 2026", quote: "A beautiful stone house — Apartment 3 is a real gem. Everything was clean, quiet and very authentic." },
        { author: "James H.", origin: "Serbia", stars: 4, date: "August 2026", quote: "Lovely rooms and a great location close to the old town. Booking by email felt a bit unusual at first, but the owner replied within hours." },
        { author: "Laura B.", origin: "France", stars: 5, date: "July 2026", quote: "The olive garden outside Apartment 2 is simply dreamy. Perfect for relaxing after a day at the beach." },
        { author: "Noah V.", origin: "Germany", stars: 5, date: "September 2026", quote: "Everything was exactly as described, from the stone architecture to the private pool. Highly recommended for a peaceful stay." }
      ]
    },
    faqPage: {
      hero: { eyebrow: "FAQ", title: "Frequently asked questions", text: "Everything you need to know before booking your stay." },
      list: [
        { q: "What time are check-in and check-out?", a: "Check-in is between 3:00 PM and 8:00 PM, and check-out is before 11:00 AM. For arrivals outside these hours, please let us know in advance via WhatsApp." },
        { q: "What is your cancellation policy?", a: "Free cancellation is available up to 7 days before your arrival date. After that, the first night remains payable. These conditions will be confirmed by email when your booking is validated." },
        { q: "What payment methods do you accept?", a: "Payment is made on site, in cash or by bank transfer. No online payment is required at the time of booking." },
        { q: "Are pets allowed?", a: "Pets are welcome upon prior request. Please let us know when you make your booking." },
        { q: "Is breakfast included?", a: "No, each apartment has a fully equipped kitchen so you can prepare your own meals whenever you like. A grocery store and several bakeries are nearby for your morning shopping." },
        { q: "Is parking available?", a: "Yes, each apartment has its own private parking space on the residence." },
        { q: "How is my booking confirmed?", a: "After you send your request, the owner checks the real availability of the rooms and replies by email within 24 to 48 hours to confirm your stay." },
        { q: "Is the house suitable for children?", a: "Yes, families are welcome. Feel free to mention your children's ages in your booking message so we can best advise you." }
      ]
    },
    contactPage: {
      hero: { eyebrow: "CONTACT", title: "Let's talk about your stay", text: "A question or special request? Write to us, we reply within 24 hours." },
      info: { addressTitle: "Address", phoneTitle: "Phone", emailTitle: "Email", hoursTitle: "Response hours", hoursValue: "Every day, 8am–8pm", addressNote: "" },
      form: { subjectLabel: "Subject", subjectPlaceholder: "Information request, group booking…", nameLabel: "Full name", emailLabel: "Email", messageLabel: "Message", submitBtn: "Send message", submitting: "Sending…", successMsg: "Your message has been sent, thank you! We'll reply within 24 hours.", errorMsg: "Something went wrong while sending. Please try again or contact us on WhatsApp." },
      mapNote: "Click the map to open directions in Google Maps.",
      mapLinkLabel: "View on Google Maps"
    }
  },

  de: {
    common: {
      bookNow: "Jetzt buchen", viewDetails: "Details & Fotos ansehen", close: "Schließen",
      perNight: "/ Nacht", from: "ab", send: "Senden", sending: "Wird gesendet…",
      requiredField: "Dieses Feld ist erforderlich.", invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      nightsSingular: "Nacht", nightsPlural: "Nächte", loading: "Wird geladen…",
      guestsSingular: "Gast", guestsPlural: "Gäste",
      skipToContent: "Zum Inhalt springen", whatsappLabel: "Auf WhatsApp chatten",
      chooseLanguage: "Sprache wählen", menu: "Menü", viewFullscreen: "Vollbild anzeigen"
    },
    nav: { home: "Startseite", rooms: "Unsere Zimmer", gallery: "Galerie", booking: "Buchung", about: "Über uns", reviews: "Bewertungen", faq: "FAQ", contact: "Kontakt" },
    meta: {
      home: { title: "Apartman Nikolić — Apartments mit privatem Pool in Funtana", desc: "Drei unabhängige Apartments mit privatem Pool, in einem Steinhaus mit Blick auf die Adria. Preis berechnen und online buchen." },
      rooms: { title: "Unsere Zimmer — Apartman Nikolić", desc: "Entdecken Sie die drei unabhängigen Apartments von Apartman Nikolić mit privatem Pool: Fotos, Ausstattung und Preise." },
      gallery: { title: "Galerie — Apartman Nikolić", desc: "Fotos des Hauses, der Zimmer und der Umgebung von Apartman Nikolić." },
      booking: { title: "Buchung — Apartman Nikolić", desc: "Wählen Sie Zimmer und Daten, berechnen Sie den Preis und senden Sie Ihre Buchungsanfrage." },
      about: { title: "Über uns — Apartman Nikolić", desc: "Die Geschichte von Apartman Nikolić, einem sorgfältig restaurierten Steinhaus an der Adriaküste." },
      reviews: { title: "Bewertungen — Apartman Nikolić", desc: "Lesen Sie, was unsere Gäste nach ihrem Aufenthalt bei Apartman Nikolić sagen." },
      faq: { title: "FAQ — Apartman Nikolić", desc: "Check-in, Stornierung, Zahlung, Haustiere: alle Antworten auf Ihre Fragen." },
      contact: { title: "Kontakt — Apartman Nikolić", desc: "Kontaktieren Sie Apartman Nikolić per Telefon, E-Mail, WhatsApp oder über das Online-Formular." }
    },
    footer: {
      tagline: "Ein Gästehaus mit drei Zimmern im Herzen der Adriaküste.",
      pagesTitle: "Navigation", contactTitle: "Kontakt", followTitle: "Folgen Sie uns",
      rights: "Alle Rechte vorbehalten.",
      privacyNote: "Über diese Website übermittelte Daten werden ausschließlich per E-Mail gesendet und weder auf einem Server noch in einer Datenbank gespeichert."
    },
    home: {
      hero: { eyebrow: "GÄSTEHAUS · ADRIAKÜSTE", title: "Apartman Nikolić", subtitle: "Drei unabhängige Apartments mit privatem Pool, in einem Steinhaus mit Blick auf die Adria. Buchen Sie Ihren Aufenthalt in wenigen Klicks.", ctaBook: "Aufenthalt buchen", ctaRooms: "Zimmer entdecken" },
      intro: {
        eyebrow: "WILLKOMMEN", title: "Ein Haus im Herzen von Funtana",
        text: "Nur wenige Schritte von der Küste entfernt bietet Apartman Nikolić drei unabhängige Apartments mit privatem Pool für Reisende, die Ruhe und Authentizität suchen. Die ideale Lage lässt Sie die istrische Küste in vollen Zügen genießen: natürliche Materialien, Morgenlicht und fußläufig erreichbare Geschäfte sorgen für einen erholsamen und zugleich praktischen Aufenthalt.",
        highlights: ["Strände 1 km zu Fuß", "Geschäfte 2 Gehminuten", "Dinopark Funtana 1 km entfernt", "Aquapark Aquacolors 3 km entfernt", "Marinas Funtana & Vrsar in der Nähe", "Limkanal 7 km entfernt"]
      },
      roomsSection: { eyebrow: "UNSERE ZIMMER", title: "Drei Apartments, drei Stimmungen", text: "Jedes Apartment trägt den Namen eines Elements der adriatischen Landschaft und bietet zwei Schlafzimmer, ein Wohnzimmer und eine voll ausgestattete Küche, mit Zugang zum privaten Pool und den gemeinschaftlichen Einrichtungen der Anlage.", cta: "Alle Zimmer ansehen" },
      whySection: {
        eyebrow: "WARUM WIR", title: "Gastfreundschaft im kleinen Rahmen",
        items: [
          { title: "Einfache Buchung", text: "Wählen Sie Ihre Daten, sehen Sie den Preis sofort und senden Sie Ihre Anfrage mit einem Klick." },
          { title: "Nah am Meer", text: "Das Haus liegt nur wenige Gehminuten von der Küste und der Altstadt entfernt." },
          { title: "Privater Pool", text: "Jedes Apartment bietet Zugang zum privaten Pool und zum Grillbereich der Anlage." },
          { title: "Schnelle Antwort", text: "Eine Frage? Schreiben Sie uns direkt über WhatsApp — wir antworten innerhalb von 24 Stunden." }
        ]
      },
      testimonialsSection: { eyebrow: "GÄSTEBEWERTUNGEN", title: "Was unsere Gäste sagen" },
      ctaBanner: { title: "Bereit, Ihren Aufenthalt zu buchen?", text: "Wählen Sie Ihr Zimmer, Ihre Daten, und erhalten Sie sofort Ihre Zusammenfassung.", button: "Jetzt buchen" },
      locationSection: { eyebrow: "SO FINDEN SIE UNS", title: "Eine Adresse im Herzen von Funtana", text: "In Funtana, nur wenige Schritte von der istrischen Küste entfernt, ist das Apartman Nikolić leicht zu finden. Klicken Sie auf die Karte, um die Route zum Haus zu erhalten.", cta: "Route auf Google Maps" }
    },
    roomsPage: { hero: { eyebrow: "UNSERE ZIMMER", title: "Drei unabhängige Apartments", text: "Die perfekte Lösung, um gemeinsam zu verreisen und trotzdem unabhängig zu bleiben: Jedes Apartment verfügt über zwei Schlafzimmer, ein Wohnzimmer, eine voll ausgestattete Küche und ein Bad, mit eigener Einrichtung und Aussicht. Klicken Sie auf ein Apartment, um die vollständige Galerie und Ausstattung zu entdecken." } },
    rooms: {
      I: { name: "Apartment 1", tagline: "Nah am Strand", short: "Ein unabhängiges Apartment nur wenige Schritte von der Adriaküste entfernt: zwei Schlafzimmer, ein Wohnzimmer und eine voll ausgestattete Küche, mit hellem, modernem Interieur zum Entspannen nach einem Strandtag.", long: "Apartment 1 liegt im Obergeschoss und öffnet sich zu einem privaten Balkon. Seine zwei Schlafzimmer, das Wohnzimmer und die voll ausgestattete Küche ermöglichen es, gemeinsam zu verreisen und dabei unabhängig zu bleiben. Helles Holzmobiliar, adriablaue Töne und Leinentextilien schaffen eine ruhige Atmosphäre, abgerundet durch Zugang zum privaten Pool und zum Grillbereich der Anlage, nur wenige Gehminuten vom Meer entfernt.", amenities: ["2 Schlafzimmer", "Wohnzimmer", "Voll ausgestattete Küche", "Bad", "Nah am Strand", "Privater Balkon", "Klimaanlage", "Kostenloses WLAN", "Privater Pool", "Grillbereich", "Privater Parkplatz", "PS5-Konsole"] },
      II: { name: "Apartment 2", tagline: "Olivengarten", short: "Ein unabhängiges Apartment im Erdgeschoss mit Blick auf den jahrhundertealten Olivengarten des Anwesens: zwei Schlafzimmer, ein Wohnzimmer und eine voll ausgestattete Küche.", long: "Apartment 2 blickt direkt auf den mit jahrhundertealten Olivenbäumen bepflanzten Garten. Seine zwei Schlafzimmer und das Wohnzimmer mit freiliegenden Holzbalken und warmen Oliv- und Messingtönen verleihen ihm einen rustikalen, einladenden Charme, während die voll ausgestattete Küche freies Kochen und Empfangen ermöglicht. Privater Pool, Grillbereich und Parkplatz der Anlage inklusive.", amenities: ["2 Schlafzimmer", "Wohnzimmer", "Voll ausgestattete Küche", "Bad", "Blick auf den Olivengarten", "Schreibtischbereich", "Klimaanlage", "Kostenloses WLAN", "Privater Pool", "Grillbereich", "Privater Parkplatz", "PS5-Konsole"] },
      III: { name: "Apartment 3", tagline: "Steinhof", short: "Ein unabhängiges Apartment mit mineralischem Charakter, das sich zum steinernen Innenhof öffnet: zwei Schlafzimmer, ein Wohnzimmer und eine voll ausgestattete Küche.", long: "Im Herzen des Anwesens gelegen, öffnet sich Apartment 3 zu den freiliegenden Steinmauern, die es umgeben. Seine zwei Schlafzimmer und das Wohnzimmer öffnen sich zu einem privaten Innenhof in edlen Terrakotta-Tönen, mit voll ausgestatteter Küche und bodenebener Dusche. Ein diskreter Rückzugsort, abgerundet durch Zugang zum privaten Pool und Grillbereich.", amenities: ["2 Schlafzimmer", "Wohnzimmer", "Voll ausgestattete Küche", "Bad", "Blick auf den Innenhof", "Bodenebene Dusche", "Klimaanlage", "Kostenloses WLAN", "Privater Pool", "Grillbereich", "Privater Parkplatz", "PS5-Konsole"] }
    },
    roomModal: { amenitiesTitle: "Ausstattung", bookBtn: "Dieses Zimmer buchen" },
    galleryPage: {
      hero: { eyebrow: "GALERIE", title: "Das Haus in Bildern", text: "Außenbereiche und Zimmer — ein Einblick in die Atmosphäre von Apartman Nikolić." },
      filters: { all: "Alle", exterior: "Außenbereich", rooms: "Zimmer" }
    },
    bookingPage: {
      hero: { eyebrow: "BUCHUNG", title: "Buchen Sie Ihren Aufenthalt", text: "Wählen Sie ein Zimmer, wählen Sie Ihre Daten im Kalender und senden Sie Ihre Anfrage. Der Gastgeber bestätigt die tatsächliche Verfügbarkeit per E-Mail innerhalb von 24 bis 48 Stunden." },
      form: {
        roomLabel: "Zimmer", roomPlaceholder: "Zimmer wählen",
        guestsLabel: "Anzahl der Gäste", guestsHint: "+30 € / Nacht pro Gast über 4 hinaus",
        arrivalLabel: "Anreise", departureLabel: "Abreise",
        nameLabel: "Vollständiger Name", phoneLabel: "Telefon", emailLabel: "E-Mail",
        messageLabel: "Nachricht (optional)", messagePlaceholder: "Voraussichtliche Ankunftszeit, besondere Wünsche…",
        submitBtn: "Buchungsanfrage senden", submitting: "Wird gesendet…",
        successMsg: "Ihre Anfrage wurde gesendet! Der Gastgeber antwortet innerhalb von 24 bis 48 Stunden, um die Verfügbarkeit zu bestätigen.",
        errorMsg: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt über WhatsApp.",
        mailFallbackMsg: "Ihr E-Mail-Programm öffnet sich mit den vorausgefüllten Angaben Ihrer Anfrage. Bitte prüfen Sie die Angaben und senden Sie die E-Mail, um Ihre Buchung abzuschließen.",
        privacyNote: "Die über dieses Formular übermittelten Informationen werden ausschließlich zur Bearbeitung Ihrer Buchungsanfrage verwendet und auf keinem Server gespeichert.",
        selectDatesFirst: "Bitte wählen Sie ein Zimmer und Daten aus, bevor Sie Ihre Anfrage senden.",
        captchaNote: "Dieses Formular ist gegen Bots geschützt (Anti-Spam)."
      },
      calendar: {
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        legendAvailable: "Verfügbar", legendSelected: "Ausgewählt",
        selectArrivalPrompt: "Anreisedatum wählen", selectDeparturePrompt: "Abreisedatum wählen",
        prevMonth: "Vorheriger Monat", nextMonth: "Nächster Monat"
      },
      stayStrip: { arrivalLabel: "ANREISE", departureLabel: "ABREISE", nightsLabel: "NÄCHTE", placeholder: "—" },
      summary: { title: "Buchungsübersicht", roomLabel: "Zimmer", guestsLabel: "Gäste", arrivalLabel: "Anreise", departureLabel: "Abreise", nightsLabel: "Anzahl Nächte", totalLabel: "Gesamtpreis", emptyRoom: "Nicht ausgewählt", emptyValue: "—", stampText: "Anfrage gesendet" }
    },
    aboutPage: {
      hero: { eyebrow: "ÜBER UNS", title: "Die Geschichte von Apartman Nikolić", text: "Drei unabhängige Apartments mit privatem Pool, entstanden aus der Restaurierung eines seit Generationen in Familienbesitz befindlichen Steinhauses, nur wenige Schritte von der istrischen Küste entfernt." },
      story: ["Das Apartman Nikolić entstand aus der Restaurierung eines Familiensteinhauses in Funtana, nur wenige Schritte von der istrischen Küste entfernt. Anstatt daraus eine einfache Ferienunterkunft zu machen, entschied sich die Familie, drei unabhängige, identische Apartments zu schaffen — jedes mit zwei Schlafzimmern, einem Wohnzimmer und einer voll ausgestatteten Küche — konzipiert, um jede Gruppe herzlich willkommen zu heißen und dabei die Privatsphäre aller zu wahren.", "Hier werden der private Pool und der Grillbereich zum Treffpunkt, während jedes Apartment ein eigenständiger Rückzugsort zum Ausruhen bleibt. Die ursprünglichen Materialien — Stein, Holz, Kalk — wurden bewahrt, um den Komfort eines modernen Aufenthalts zu bieten. Und weil Gastfreundschaft hier vor allem Familiensache ist, ist es die Familie selbst, die auf Ihre Nachrichten antwortet und Ihre Ankunft vorbereitet, von der ersten Nachricht bis zu Ihrer Abreise."],
      values: [
        { title: "Authentizität", text: "Ein Steinhaus, restauriert unter Wahrung seiner ursprünglichen Architektur." },
        { title: "Persönlicher Empfang", text: "Direkter Kontakt mit der Familie, von Ihrer ersten Nachricht bis zur Abreise." },
        { title: "Lokale Verwurzelung", text: "Erzeugnisse aus dem Garten, vertrauenswürdige Adressen und Tipps zur Umgebung." }
      ],
      amenitiesSection: {
        eyebrow: "INKLUSIVE AUSSTATTUNG", title: "Ausstattung für Ihren Komfort",
        items: [
          { title: "Privater Pool", text: "Erfrischen Sie sich und genießen Sie die Sonne in aller Ruhe." },
          { title: "Grillbereich", text: "Eine eigene Ecke zum Grillen und für gemeinsame Mahlzeiten im Freien." },
          { title: "Privater Parkplatz", text: "Sicheres und bequemes Parken direkt auf dem Grundstück." },
          { title: "Highspeed-WLAN", text: "Internetzugang im gesamten Anwesen inbegriffen." },
          { title: "PS5-Konsole", text: "Zur Freude kleiner und großer Videospiel-Fans." }
        ]
      },
      highlightsSection: {
        eyebrow: "VORTEILE", title: "Was diese Unterkunft besonders macht",
        items: [
          { title: "Unabhängigkeit und Geselligkeit", text: "Genießen Sie gemeinsame Momente am Pool oder beim Grillen, während Sie Ihren eigenen privaten Bereich in Ihrem Apartment behalten." },
          { title: "Rundum ausgestatteter Komfort", text: "Ideal sowohl für einen erholsamen Urlaub als auch für einen aktiven Aufenthalt, mit moderner Ausstattung für jedes Alter." }
        ]
      },
      hostTitle: "Für Sie da", hostText: "Kontaktieren Sie uns gerne vor, während oder nach Ihrem Aufenthalt: Wir sind per WhatsApp, Telefon oder E-Mail erreichbar."
    },
    reviewsPage: {
      hero: { eyebrow: "BEWERTUNGEN", title: "Was unsere Gäste sagen", text: "Eine Auswahl an Bewertungen, die Reisende nach ihrem Aufenthalt hinterlassen haben." },
      ratingSummary: { score: "4.9", basedOn: "Basierend auf 128 Online-Bewertungen" },
      list: [
        { author: "Sophie D.", origin: "Frankreich", stars: 5, date: "Juli 2026", quote: "Ein herzlicher Empfang und ein makelloses Apartment nur wenige Schritte vom Strand entfernt. Der private Pool bleibt eine der schönsten Erinnerungen unseres Urlaubs." },
        { author: "Thomas M.", origin: "Deutschland", stars: 5, date: "Juni 2026", quote: "Ruhige Lage, wunderschöner Innenhof und sehr reaktionsschnelle Gastgeber. Wir kommen definitiv wieder!" },
        { author: "Ivana K.", origin: "Kroatien", stars: 5, date: "Mai 2026", quote: "Ein wunderschönes Steinhaus – Apartment 3 ist ein echtes Juwel. Alles war sauber, ruhig und sehr authentisch." },
        { author: "James H.", origin: "Serbien", stars: 4, date: "August 2026", quote: "Schöne Zimmer und eine tolle Lage nahe der Altstadt. Die Buchung per E-Mail war anfangs etwas ungewohnt, aber der Gastgeber antwortete innerhalb weniger Stunden." },
        { author: "Laura B.", origin: "Frankreich", stars: 5, date: "Juli 2026", quote: "Der Olivengarten vor Apartment 2 ist einfach traumhaft. Perfekt zum Entspannen nach einem Tag am Strand." },
        { author: "Noah V.", origin: "Deutschland", stars: 5, date: "September 2026", quote: "Alles war genau wie beschrieben, von der Steinarchitektur bis zum privaten Pool. Sehr empfehlenswert für einen ruhigen Aufenthalt." }
      ]
    },
    faqPage: {
      hero: { eyebrow: "FAQ", title: "Häufig gestellte Fragen", text: "Alles, was Sie vor der Buchung Ihres Aufenthalts wissen müssen." },
      list: [
        { q: "Wann sind Check-in und Check-out?", a: "Der Check-in ist zwischen 15:00 und 20:00 Uhr, der Check-out vor 11:00 Uhr. Bei Ankunft außerhalb dieser Zeiten informieren Sie uns bitte im Voraus per WhatsApp." },
        { q: "Wie lautet die Stornierungsbedingung?", a: "Eine kostenlose Stornierung ist bis 7 Tage vor Anreise möglich. Danach bleibt die erste Nacht zahlungspflichtig. Diese Bedingungen werden Ihnen per E-Mail bei Bestätigung Ihrer Buchung mitgeteilt." },
        { q: "Welche Zahlungsmethoden akzeptieren Sie?", a: "Die Zahlung erfolgt vor Ort, in bar oder per Überweisung. Bei der Buchung ist keine Online-Zahlung erforderlich." },
        { q: "Sind Haustiere erlaubt?", a: "Haustiere sind nach vorheriger Anfrage willkommen. Bitte teilen Sie uns dies bei der Buchung mit." },
        { q: "Ist das Frühstück inbegriffen?", a: "Nein, jedes Apartment verfügt über eine voll ausgestattete Küche, in der Sie Ihre Mahlzeiten ganz nach Belieben zubereiten können. Ein Supermarkt und mehrere Bäckereien befinden sich in der Nähe für Ihre morgendlichen Einkäufe." },
        { q: "Gibt es einen Parkplatz?", a: "Ja, jedes Apartment verfügt über einen eigenen privaten Parkplatz auf dem Grundstück." },
        { q: "Wie wird meine Buchung bestätigt?", a: "Nach Absenden Ihrer Anfrage prüft der Gastgeber die tatsächliche Verfügbarkeit der Zimmer und antwortet Ihnen innerhalb von 24 bis 48 Stunden per E-Mail, um Ihren Aufenthalt zu bestätigen." },
        { q: "Ist das Haus für Kinder geeignet?", a: "Ja, Familien sind willkommen. Teilen Sie uns gerne das Alter Ihrer Kinder in Ihrer Buchungsnachricht mit, damit wir Sie bestmöglich beraten können." }
      ]
    },
    contactPage: {
      hero: { eyebrow: "KONTAKT", title: "Sprechen wir über Ihren Aufenthalt", text: "Eine Frage oder ein besonderer Wunsch? Schreiben Sie uns, wir antworten innerhalb von 24 Stunden." },
      info: { addressTitle: "Adresse", phoneTitle: "Telefon", emailTitle: "E-Mail", hoursTitle: "Antwortzeiten", hoursValue: "Täglich, 8–20 Uhr", addressNote: "" },
      form: { subjectLabel: "Betreff", subjectPlaceholder: "Informationsanfrage, Gruppenbuchung…", nameLabel: "Vollständiger Name", emailLabel: "E-Mail", messageLabel: "Nachricht", submitBtn: "Nachricht senden", submitting: "Wird gesendet…", successMsg: "Ihre Nachricht wurde gesendet, vielen Dank! Wir antworten innerhalb von 24 Stunden.", errorMsg: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns über WhatsApp." },
      mapNote: "Klicken Sie auf die Karte, um die Route in Google Maps zu öffnen.",
      mapLinkLabel: "Auf Google Maps ansehen"
    }
  },

  hr: {
    common: {
      bookNow: "Rezerviraj", viewDetails: "Detalji i fotografije", close: "Zatvori",
      perNight: "/ noćenju", from: "od", send: "Pošalji", sending: "Slanje…",
      requiredField: "Ovo polje je obavezno.", invalidEmail: "Unesite valjanu e-mail adresu.",
      nightsSingular: "noć", nightsFew: "noći", nightsMany: "noćenja", loading: "Učitavanje…",
      guestsSingular: "osoba", guestsFew: "osobe", guestsMany: "osoba",
      skipToContent: "Preskoči na sadržaj", whatsappLabel: "Chat na WhatsAppu",
      chooseLanguage: "Odaberi jezik", menu: "Izbornik", viewFullscreen: "Prikaz preko cijelog zaslona"
    },
    nav: { home: "Početna", rooms: "Naše sobe", gallery: "Galerija", booking: "Rezervacija", about: "O nama", reviews: "Recenzije", faq: "Česta pitanja", contact: "Kontakt" },
    meta: {
      home: { title: "Apartman Nikolić — Apartmani s privatnim bazenom u Funtani", desc: "Tri samostalna apartmana s privatnim bazenom, u kamenoj kući okrenutoj Jadranu. Izračunajte cijenu i rezervirajte online." },
      rooms: { title: "Naše sobe — Apartman Nikolić", desc: "Otkrijte tri samostalna apartmana Apartmana Nikolić s privatnim bazenom: fotografije, opremu i cijene." },
      gallery: { title: "Galerija — Apartman Nikolić", desc: "Fotografije kuće, soba i okolice Apartmana Nikolić." },
      booking: { title: "Rezervacija — Apartman Nikolić", desc: "Odaberite sobu i datume, izračunajte cijenu i pošaljite upit za rezervaciju." },
      about: { title: "O nama — Apartman Nikolić", desc: "Priča Apartmana Nikolić, pažljivo obnovljene kamene kuće na jadranskoj obali." },
      reviews: { title: "Recenzije — Apartman Nikolić", desc: "Pročitajte što naši gosti kažu nakon boravka u Apartmanu Nikolić." },
      faq: { title: "Česta pitanja — Apartman Nikolić", desc: "Dolazak, otkazivanje, plaćanje, kućni ljubimci: svi odgovori na vaša pitanja." },
      contact: { title: "Kontakt — Apartman Nikolić", desc: "Kontaktirajte Apartman Nikolić putem telefona, e-maila, WhatsAppa ili online obrasca." }
    },
    footer: {
      tagline: "Kuća za goste s tri sobe u srcu jadranske obale.",
      pagesTitle: "Navigacija", contactTitle: "Kontakt", followTitle: "Pratite nas",
      rights: "Sva prava pridržana.",
      privacyNote: "Podaci poslani putem ove stranice šalju se isključivo e-mailom i ne pohranjuju se ni na jednom poslužitelju ni u bazi podataka."
    },
    home: {
      hero: { eyebrow: "KUĆA ZA GOSTE · JADRANSKA OBALA", title: "Apartman Nikolić", subtitle: "Tri samostalna apartmana s privatnim bazenom, u kamenoj kući okrenutoj Jadranu. Rezervirajte boravak u nekoliko klikova.", ctaBook: "Rezerviraj boravak", ctaRooms: "Otkrij sobe" },
      intro: {
        eyebrow: "DOBRODOŠLI", title: "Kuća u srcu Funtane",
        text: "Samo nekoliko koraka od obale, Apartman Nikolić nudi tri samostalna apartmana s privatnim bazenom, osmišljena za putnike koji traže mir i autentičnost. Izvrstan položaj omogućuje potpuni užitak u istarskoj obali: prirodni materijali, jutarnje svjetlo i trgovine nadohvat ruke čine boravak jednako opuštajućim koliko i praktičnim.",
        highlights: ["Plaže na 1 km hoda", "Trgovine na 2 minute hoda", "Dinopark Funtana na 1 km", "Aquapark Aquacolors na 3 km", "Marine Funtana i Vrsar u blizini", "Limski kanal na 7 km"]
      },
      roomsSection: { eyebrow: "NAŠE SOBE", title: "Tri apartmana, tri ugođaja", text: "Svaki apartman nosi ime po elementu jadranskog krajolika i nudi dvije spavaće sobe, dnevni boravak i potpuno opremljenu kuhinju, uz pristup privatnom bazenu i zajedničkoj opremi kompleksa.", cta: "Pogledaj sve sobe" },
      whySection: {
        eyebrow: "ZAŠTO ODABRATI NAS", title: "Dobrodošlica u malom, obiteljskom okruženju",
        items: [
          { title: "Jednostavna rezervacija", text: "Odaberite datume, odmah dobijte cijenu i pošaljite upit jednim klikom." },
          { title: "Blizina mora", text: "Kuća se nalazi nekoliko minuta hoda od obale i starog grada." },
          { title: "Privatni bazen", text: "Svaki apartman uključuje pristup privatnom bazenu i prostoru za roštilj kompleksa." },
          { title: "Brz odgovor", text: "Imate pitanje? Javite nam se izravno putem WhatsAppa — odgovaramo unutar 24 sata." }
        ]
      },
      testimonialsSection: { eyebrow: "RECENZIJE GOSTIJU", title: "Što kažu naši gosti" },
      ctaBanner: { title: "Spremni rezervirati boravak?", text: "Odaberite sobu, datume i odmah dobijte sažetak rezervacije.", button: "Započni rezervaciju" },
      locationSection: { eyebrow: "GDJE SMO", title: "Adresa u srcu Funtane", text: "U Funtani, samo nekoliko koraka od istarske obale, Apartman Nikolić lako je pronaći. Kliknite na kartu za navigaciju do kuće.", cta: "Navigacija na Google Mapsu" }
    },
    roomsPage: { hero: { eyebrow: "NAŠE SOBE", title: "Tri samostalna apartmana", text: "Savršeno rješenje za boravak zajedno uz zadržavanje samostalnosti: svaki apartman ima dvije spavaće sobe, dnevni boravak, potpuno opremljenu kuhinju i kupaonicu, s vlastitim uređenjem i pogledom. Kliknite na apartman kako biste otkrili cijelu galeriju i opremu." } },
    rooms: {
      I: { name: "Apartman 1", tagline: "Blizina plaže", short: "Samostalan apartman samo nekoliko koraka od jadranske obale: dvije spavaće sobe, dnevni boravak i potpuno opremljena kuhinja, sa svijetlim i modernim interijerom za opuštanje nakon dana na plaži.", long: "Apartman 1 smješten je na katu i otvara se prema privatnom balkonu. Dvije spavaće sobe, dnevni boravak i potpuno opremljena kuhinja omogućuju boravak zajedno uz zadržavanje samostalnosti. Svijetli drveni namještaj, tonovi jadranskog plavetnila i lanene tkanine stvaraju smirujući ugođaj, upotpunjen pristupom privatnom bazenu i prostoru za roštilj kompleksa, samo nekoliko minuta hoda od mora.", amenities: ["2 spavaće sobe", "Dnevni boravak", "Potpuno opremljena kuhinja", "Kupaonica", "Blizina plaže", "Privatni balkon", "Klima uređaj", "Besplatan Wi-Fi", "Privatni bazen", "Prostor za roštilj", "Privatni parking", "PS5 konzola"] },
      II: { name: "Apartman 2", tagline: "Maslinik", short: "Samostalan apartman u prizemlju, okrenut prema stoljetnom maslinovom vrtu imanja: dvije spavaće sobe, dnevni boravak i potpuno opremljena kuhinja.", long: "Apartman 2 gleda izravno na vrt zasađen stoljetnim maslinama. Dvije spavaće sobe i dnevni boravak s vidljivim drvenim gredama te tonovima masline i mjedi daju mu rustikalni, topli šarm, dok potpuno opremljena kuhinja omogućuje slobodno kuhanje i ugošćavanje. Privatni bazen, prostor za roštilj i parking kompleksa uključeni.", amenities: ["2 spavaće sobe", "Dnevni boravak", "Potpuno opremljena kuhinja", "Kupaonica", "Pogled na maslinik", "Radni kutak", "Klima uređaj", "Besplatan Wi-Fi", "Privatni bazen", "Prostor za roštilj", "Privatni parking", "PS5 konzola"] },
      III: { name: "Apartman 3", tagline: "Kameno dvorište", short: "Samostalan apartman mineralnog karaktera, otvoren prema kamenom unutarnjem dvorištu: dvije spavaće sobe, dnevni boravak i potpuno opremljena kuhinja.", long: "Smješten u srcu imanja, apartman 3 otvara se prema kamenim zidovima koji ga okružuju. Dvije spavaće sobe i dnevni boravak otvaraju se prema privatnom unutarnjem dvorištu u profinjenim tonovima terakote, s potpuno opremljenom kuhinjom i tuš kabinom bez pregrade. Diskretno utočište upotpunjeno pristupom privatnom bazenu i prostoru za roštilj.", amenities: ["2 spavaće sobe", "Dnevni boravak", "Potpuno opremljena kuhinja", "Kupaonica", "Pogled na dvorište", "Tuš kabina bez pregrade", "Klima uređaj", "Besplatan Wi-Fi", "Privatni bazen", "Prostor za roštilj", "Privatni parking", "PS5 konzola"] }
    },
    roomModal: { amenitiesTitle: "Oprema", bookBtn: "Rezerviraj ovu sobu" },
    galleryPage: {
      hero: { eyebrow: "GALERIJA", title: "Kuća u slikama", text: "Eksterijeri i sobe — uvid u atmosferu Apartmana Nikolić." },
      filters: { all: "Sve", exterior: "Eksterijeri", rooms: "Sobe" }
    },
    bookingPage: {
      hero: { eyebrow: "REZERVACIJA", title: "Rezervirajte boravak", text: "Odaberite sobu, odaberite datume u kalendaru, a zatim pošaljite upit. Vlasnik potvrđuje stvarnu dostupnost e-mailom unutar 24 do 48 sati." },
      form: {
        roomLabel: "Soba", roomPlaceholder: "Odaberite sobu",
        guestsLabel: "Broj osoba", guestsHint: "+30 € / noćenju po osobi iznad 4",
        arrivalLabel: "Dolazak", departureLabel: "Odlazak",
        nameLabel: "Ime i prezime", phoneLabel: "Telefon", emailLabel: "E-mail",
        messageLabel: "Poruka (neobavezno)", messagePlaceholder: "Okvirno vrijeme dolaska, posebni zahtjevi…",
        submitBtn: "Pošalji upit za rezervaciju", submitting: "Slanje…",
        successMsg: "Vaš upit je uspješno poslan! Vlasnik će vam odgovoriti unutar 24 do 48 sati kako bi potvrdio dostupnost.",
        errorMsg: "Došlo je do pogreške prilikom slanja. Pokušajte ponovno ili nas kontaktirajte izravno putem WhatsAppa.",
        mailFallbackMsg: "Vaš program za e-poštu otvorit će se s unaprijed popunjenim podacima vašeg upita. Molimo provjerite i pošaljite e-poruku kako biste dovršili rezervaciju.",
        privacyNote: "Podaci poslani putem ovog obrasca koriste se isključivo za obradu vašeg upita za rezervaciju i ne pohranjuju se ni na jednom poslužitelju.",
        selectDatesFirst: "Molimo odaberite sobu i datume prije slanja upita.",
        captchaNote: "Ovaj obrazac zaštićen je od robota (anti-spam)."
      },
      calendar: {
        months: ["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"],
        weekdays: ["pon", "uto", "sri", "čet", "pet", "sub", "ned"],
        legendAvailable: "Dostupno", legendSelected: "Odabrano",
        selectArrivalPrompt: "Odaberite datum dolaska", selectDeparturePrompt: "Odaberite datum odlaska",
        prevMonth: "Prethodni mjesec", nextMonth: "Sljedeći mjesec"
      },
      stayStrip: { arrivalLabel: "DOLAZAK", departureLabel: "ODLAZAK", nightsLabel: "NOĆENJA", placeholder: "—" },
      summary: { title: "Sažetak rezervacije", roomLabel: "Soba", guestsLabel: "Osobe", arrivalLabel: "Dolazak", departureLabel: "Odlazak", nightsLabel: "Broj noćenja", totalLabel: "Ukupna cijena", emptyRoom: "Nije odabrano", emptyValue: "—", stampText: "Upit poslan" }
    },
    aboutPage: {
      hero: { eyebrow: "O NAMA", title: "Priča Apartmana Nikolić", text: "Tri samostalna apartmana s privatnim bazenom, nastala obnovom obiteljske kamene kuće koja se prenosi s koljena na koljeno, samo nekoliko koraka od istarske obale." },
      story: ["Apartman Nikolić nastao je obnovom obiteljske kamene kuće u Funtani, samo nekoliko koraka od istarske obale. Umjesto da je pretvori u obični sezonski smještaj, obitelj je odlučila stvoriti tri samostalna, identična apartmana — svaki s dvije spavaće sobe, dnevnim boravkom i potpuno opremljenom kuhinjom — osmišljena da toplo dočekaju svaku skupinu, uz očuvanje privatnosti svakoga.", "Ovdje privatni bazen i prostor za roštilj postaju mjesto druženja, dok svaki apartman ostaje samostalno utočište za odmor. Izvorni materijali — kamen, drvo, vapno — pažljivo su očuvani kako bi pružili udobnost modernog boravka. A budući da je gostoprimstvo ovdje prije svega obiteljska stvar, upravo obitelj odgovara na vaše poruke i priprema vaš dolazak, od prve poruke do vašeg odlaska."],
      values: [
        { title: "Autentičnost", text: "Kamena kuća obnovljena uz poštovanje izvorne arhitekture." },
        { title: "Osobna dobrodošlica", text: "Izravan kontakt s obitelji, od prve poruke do vašeg odlaska." },
        { title: "Lokalna povezanost", text: "Proizvodi iz vrta, provjerene preporuke i savjeti za istraživanje okolice." }
      ],
      amenitiesSection: {
        eyebrow: "UKLJUČENA OPREMA", title: "Oprema osmišljena za vašu udobnost",
        items: [
          { title: "Privatni bazen", text: "Osvježite se i uživajte na suncu u potpunom miru." },
          { title: "Prostor za roštilj", text: "Poseban kutak za roštiljanje i obroke na otvorenom." },
          { title: "Privatni parking", text: "Sigurno i jednostavno parkiranje izravno na imanju." },
          { title: "Brzi Wi-Fi", text: "Internetska veza uključena na cijelom imanju." },
          { title: "PS5 konzola", text: "Za užitak malih i velikih ljubitelja videoigara." }
        ]
      },
      highlightsSection: {
        eyebrow: "PREDNOSTI", title: "Što ovaj smještaj čini posebnim",
        items: [
          { title: "Samostalnost i druženje", text: "Uživajte u zajedničkim trenucima uz bazen ili roštilj, uz zadržavanje vlastitog privatnog prostora u svom apartmanu." },
          { title: "Udobnost s potpunom opremom", text: "Idealno kako za opuštajući odmor tako i za aktivan boravak, uz modernu opremu za sve uzraste." }
        ]
      },
      hostTitle: "Na raspolaganju", hostText: "Slobodno nas kontaktirajte prije, tijekom ili nakon boravka: dostupni smo putem WhatsAppa, telefona ili e-maila."
    },
    reviewsPage: {
      hero: { eyebrow: "RECENZIJE", title: "Što kažu naši gosti", text: "Izbor recenzija koje su putnici ostavili nakon svog boravka." },
      ratingSummary: { score: "4.9", basedOn: "Na temelju 128 online recenzija" },
      list: [
        { author: "Sophie D.", origin: "Francuska", stars: 5, date: "srpanj 2026.", quote: "Topla dobrodošlica i besprijekoran apartman samo nekoliko koraka od plaže. Privatni bazen ostat će jedna od najljepših uspomena s odmora." },
        { author: "Thomas M.", origin: "Njemačka", stars: 5, date: "lipanj 2026.", quote: "Mirna lokacija, prekrasno unutarnje dvorište i vrlo brzi domaćini. Sigurno ćemo se vratiti!" },
        { author: "Ivana K.", origin: "Hrvatska", stars: 5, date: "svibanj 2026.", quote: "Prekrasna kamena kuća, Apartman 3 je pravi biser. Sve je bilo čisto, tiho i vrlo autentično." },
        { author: "James H.", origin: "Srbija", stars: 4, date: "kolovoz 2026.", quote: "Lijepe sobe i odlična lokacija blizu starog grada. Rezervacija putem e-maila isprva je djelovala neobično, ali vlasnik je odgovorio unutar nekoliko sati." },
        { author: "Laura B.", origin: "Francuska", stars: 5, date: "srpanj 2026.", quote: "Maslinik ispred Apartmana 2 jednostavno je predivan. Savršen za opuštanje nakon dana provedenog na plaži." },
        { author: "Noah V.", origin: "Njemačka", stars: 5, date: "rujan 2026.", quote: "Sve je bilo točno onako kako je opisano, od kamene arhitekture do privatnog bazena. Toplo preporučujem za miran odmor." }
      ]
    },
    faqPage: {
      hero: { eyebrow: "ČESTA PITANJA", title: "Često postavljana pitanja", text: "Sve što trebate znati prije rezervacije boravka." },
      list: [
        { q: "U koje vrijeme su check-in i check-out?", a: "Dolazak (check-in) je moguć između 15:00 i 20:00 sati, a odjava (check-out) do 11:00 sati. Za dolazak izvan ovih termina, molimo javite nam se unaprijed putem WhatsAppa." },
        { q: "Kakvi su uvjeti otkazivanja?", a: "Besplatno otkazivanje moguće je do 7 dana prije dolaska. Nakon tog roka, prva noć ostaje naplativa. Ovi uvjeti bit će vam potvrđeni e-mailom prilikom potvrde rezervacije." },
        { q: "Koje načine plaćanja prihvaćate?", a: "Plaćanje se obavlja na licu mjesta, gotovinom ili bankovnim transferom. Online plaćanje se ne traži prilikom rezervacije." },
        { q: "Jesu li kućni ljubimci dopušteni?", a: "Kućni ljubimci su dobrodošli uz prethodni upit. Molimo javite nam prilikom rezervacije." },
        { q: "Je li doručak uključen?", a: "Ne, svaki apartman ima potpuno opremljenu kuhinju u kojoj možete pripremati obroke kad god poželite. U blizini se nalaze trgovina i nekoliko pekarnica za jutarnju kupovinu." },
        { q: "Postoji li parking?", a: "Da, svaki apartman ima vlastito privatno parkirno mjesto na imanju." },
        { q: "Kako se potvrđuje moja rezervacija?", a: "Nakon što pošaljete upit, vlasnik provjerava stvarnu dostupnost soba i odgovara e-mailom u roku od 24 do 48 sati kako bi potvrdio vaš boravak." },
        { q: "Je li kuća prikladna za djecu?", a: "Da, obitelji su dobrodošle. Slobodno nam u poruci navedite dob svoje djece kako bismo vam mogli najbolje savjetovati." }
      ]
    },
    contactPage: {
      hero: { eyebrow: "KONTAKT", title: "Razgovarajmo o vašem boravku", text: "Imate pitanje ili poseban zahtjev? Pišite nam, odgovaramo unutar 24 sata." },
      info: { addressTitle: "Adresa", phoneTitle: "Telefon", emailTitle: "E-mail", hoursTitle: "Vrijeme odgovora", hoursValue: "Svaki dan, 8–20 h", addressNote: "" },
      form: { subjectLabel: "Predmet", subjectPlaceholder: "Upit za informacije, grupna rezervacija…", nameLabel: "Ime i prezime", emailLabel: "E-mail", messageLabel: "Poruka", submitBtn: "Pošalji poruku", submitting: "Slanje…", successMsg: "Vaša poruka je uspješno poslana, hvala! Odgovorit ćemo vam unutar 24 sata.", errorMsg: "Došlo je do pogreške prilikom slanja. Pokušajte ponovno ili nas kontaktirajte putem WhatsAppa." },
      mapNote: "Kliknite na kartu da otvorite navigaciju u Google Mapsu.",
      mapLinkLabel: "Pogledajte na Google Mapsu"
    }
  }
};

/* ---------- Engine ---------- */

function getLang() {
  let stored = null;
  try { stored = localStorage.getItem(LANG_STORAGE_KEY); } catch (e) { /* storage disabled (e.g. file:// or private mode) */ }
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(nav)) return nav;
  return DEFAULT_LANG;
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* storage disabled (e.g. file:// or private mode) */ }
  applyI18n(lang);
  document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
}

function t(key, lang) {
  lang = lang || getLang();
  const path = key.split(".");
  let node = I18N[lang];
  for (const p of path) {
    if (node == null) break;
    node = node[p];
  }
  if (node === undefined) {
    // fallback to default lang, then to key itself
    node = I18N[DEFAULT_LANG];
    for (const p of path) { if (node == null) break; node = node[p]; }
  }
  return node !== undefined ? node : key;
}

function formatNights(n, lang) {
  lang = lang || getLang();
  const c = I18N[lang].common;
  if (lang === "hr") {
    const mod100 = n % 100;
    const mod10 = n % 10;
    if (mod10 === 1 && mod100 !== 11) return n + " " + c.nightsSingular;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return n + " " + c.nightsFew;
    return n + " " + c.nightsMany;
  }
  if (n === 1) return n + " " + c.nightsSingular;
  return n + " " + c.nightsPlural;
}

function formatGuests(n, lang) {
  lang = lang || getLang();
  const c = I18N[lang].common;
  if (lang === "hr") {
    const mod100 = n % 100;
    const mod10 = n % 10;
    if (mod10 === 1 && mod100 !== 11) return n + " " + c.guestsSingular;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return n + " " + c.guestsFew;
    return n + " " + c.guestsMany;
  }
  if (n === 1) return n + " " + c.guestsSingular;
  return n + " " + c.guestsPlural;
}

function applyI18n(lang) {
  lang = lang || getLang();
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const val = t(el.getAttribute("data-i18n"), lang);
    if (typeof val === "string") el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label"), lang));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title"), lang));
  });

  const metaKey = document.body.getAttribute("data-page");
  if (metaKey) {
    const meta = t("meta." + metaKey, lang);
    if (meta && meta.title) document.title = meta.title;
    if (meta && meta.desc) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", meta.desc);
    }
  }

  document.querySelectorAll(".lang-switch__option").forEach(function (opt) {
    opt.setAttribute("aria-current", opt.getAttribute("data-lang") === lang ? "true" : "false");
  });
  const currentLabel = document.querySelector("[data-lang-current-label]");
  if (currentLabel) currentLabel.textContent = lang.toUpperCase();
}

document.addEventListener("DOMContentLoaded", function () {
  applyI18n(getLang());
});
