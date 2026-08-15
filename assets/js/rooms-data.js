/* Non-text room data (language independent).
   Text content (names, descriptions, amenities) lives in i18n.js under I18N[lang].rooms[id] */
const ROOMS = [
  {
    id: "I",
    slug: "more",
    price: 75,
    heroImage: "assets/img/rooms/more/more-9.jpg",
    images: [
      "assets/img/rooms/more/more-9.jpg",
      "assets/img/rooms/more/more-3.png",
      "assets/img/rooms/more/more-4.png",
      "assets/img/rooms/more/more-5.png",
      "assets/img/rooms/more/more-6.png",
      "assets/img/rooms/more/more-7.png",
      "assets/img/rooms/more/more-8.png",
      "assets/img/rooms/more/more-1.png",
      "assets/img/rooms/more/more-2.png"
    ]
  },
  {
    id: "II",
    slug: "maslina",
    price: 65,
    heroImage: "assets/img/rooms/maslina/maslina-5.png",
    images: [
      "assets/img/rooms/maslina/maslina-5.png",
      "assets/img/rooms/maslina/maslina-6.png",
      "assets/img/rooms/maslina/maslina-1.png",
      "assets/img/rooms/maslina/maslina-2.png",
      "assets/img/rooms/maslina/maslina-3.png",
      "assets/img/rooms/maslina/maslina-4.png",
      "assets/img/rooms/maslina/maslina-7.png",
      "assets/img/rooms/maslina/maslina-8.png"
    ]
  },
  {
    id: "III",
    slug: "kamen",
    price: 70,
    heroImage: "assets/img/rooms/kamen/kamen-1.png",
    images: [
      "assets/img/rooms/kamen/kamen-1.png",
      "assets/img/rooms/kamen/kamen-2.png",
      "assets/img/rooms/kamen/kamen-3.png",
      "assets/img/rooms/kamen/kamen-4.png",
      "assets/img/rooms/kamen/kamen-5.png",
      "assets/img/rooms/kamen/kamen-6.png",
      "assets/img/rooms/kamen/kamen-7.png",
      "assets/img/rooms/kamen/kamen-8.png",
      "assets/img/rooms/kamen/kamen-9.png",
      "assets/img/rooms/kamen/kamen-10.png",
      "assets/img/rooms/kamen/kamen-11.png"
    ]
  }
];

function getRoomById(id) {
  return ROOMS.find(function (r) { return r.id === id; });
}

