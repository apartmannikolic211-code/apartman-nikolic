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
    heroImage: "https://picsum.photos/seed/apartman-nikolic-kamen-hero/1200/900",
    images: [
      "https://picsum.photos/seed/apartman-nikolic-kamen-1/1200/900",
      "https://picsum.photos/seed/apartman-nikolic-kamen-2/1200/900",
      "https://picsum.photos/seed/apartman-nikolic-kamen-3/1200/900",
      "https://picsum.photos/seed/apartman-nikolic-kamen-4/1200/900"
    ]
  }
];

function getRoomById(id) {
  return ROOMS.find(function (r) { return r.id === id; });
}

