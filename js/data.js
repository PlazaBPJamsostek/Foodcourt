/*
  DATA FOODCOURT LANTAI 8
  ------------------------
  File ini berisi semua konten yang sering berubah: tenant, retail,
  fasilitas, dan news/promo. Setiap teks yang tampil ke pengunjung
  ditulis dalam dua bahasa: { id: "...", en: "..." }.

  Untuk teks yang sama di kedua bahasa (nama brand tenant, misalnya
  "African Organics"), cukup tulis sebagai string biasa tanpa { id, en }.

  CARA EDIT TENANT
  -----------------
  - status menentukan WARNA badge. Pilihan yang didukung:
      "open" | "available" | "opening-soon" | "coming-soon" |
      "outdoor" | "ending" | "interested"
  - badge adalah TEKS yang tampil di pill status (bebas kamu tulis).
  - note adalah deskripsi singkat di bawah nama tenant.

  Menambah tenant baru = tinggal copy salah satu object di bawah,
  ubah stand/name/status/badge/note-nya.
*/

const tenants = [
  {
    stand: "FC No.1",
    name: { id: "Tersedia", en: "Available" },
    status: "available",
    badge: { id: "TERSEDIA", en: "AVAILABLE" },
    note: { id: "Ruang usaha siap untuk tenant berikutnya.", en: "Ready for the next tenant." }
  },
  {
    stand: "FC No.2",
    name: "African Organics",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Pilihan kuliner sehat di Foodcourt.", en: "A healthy dining option at the Foodcourt." }
  },
  {
    stand: "FC No.3",
    name: "Pawon Stories",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Menu rumahan dengan cita rasa autentik.", en: "Home-style dishes with authentic flavor." }
  },
  {
    stand: "FC No.4",
    name: "Masakan Medan Kesya",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Masakan khas Medan untuk pengunjung.", en: "Authentic Medan cuisine for visitors." }
  },
  {
    stand: "FC No.5",
    name: "Warung JJ",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Menu harian favorit di Foodcourt.", en: "A popular daily menu at the Foodcourt." }
  },
  {
    stand: "FC No.5A",
    name: "Mie Ayam Serut",
    status: "ending",
    badge: { id: "BUKA S.D. OKT 2026", en: "OPEN UNTIL OCT 2026" },
    note: { id: "Buka hingga akhir Oktober 2026.", en: "Open until the end of October 2026." }
  },
  {
    stand: "FC No.5B",
    name: "Padang Chaniago",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Pilihan masakan Padang.", en: "A Padang cuisine favorite." }
  },
  {
    stand: "FC No.6",
    name: "Soto Khas Bogor",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Soto dan masakan khas Bogor.", en: "Soto and traditional Bogor dishes." }
  },
  {
    stand: "FC No.7",
    name: "Before Coffee",
    status: "opening-soon",
    badge: { id: "BUKA 14 SEP 2026", en: "OPENING 14 SEP 2026" },
    note: { id: "Coffee shop baru di Lantai 8.", en: "A new coffee shop on Level 8." }
  },
  {
    stand: "FC No.8",
    name: { id: "Tersedia", en: "Available" },
    status: "interested",
    badge: { id: "2 PEMINAT", en: "2 INTERESTED" },
    note: { id: "Saat ini ada 2 pihak yang berminat.", en: "Currently 2 parties have shown interest." }
  },
  {
    stand: "FC No.9",
    name: "Nasi Goreng Den Bagus",
    status: "coming-soon",
    badge: { id: "SEGERA HADIR", en: "COMING SOON" },
    note: { id: "Tanggal opening akan diinformasikan.", en: "Opening date to be announced." }
  },
  {
    stand: "FC No.10",
    name: "R Coffe",
    status: "outdoor",
    badge: { id: "OUTDOOR", en: "OUTDOOR" },
    note: { id: "Coffee spot di area outdoor Lantai 8.", en: "A coffee spot in the Level 8 outdoor area." }
  }
];

const retail = [
  {
    stand: "Retail 01",
    name: { id: "Tersedia", en: "Available" },
    status: "available",
    badge: { id: "TERSEDIA", en: "AVAILABLE" },
    note: { id: "Ruang retail tersedia untuk calon tenant.", en: "Retail space available for prospective tenants." }
  },
  {
    stand: "Retail 02",
    name: "Indomaret Point",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Kebutuhan harian dan convenience dalam satu tempat.", en: "Daily essentials and convenience in one place." }
  }
];

/* icon merujuk ke key di ICONS (lihat js/main.js) */
const facilities = [
  {
    icon: "toiletWomen",
    title: { id: "Toilet Wanita", en: "Women's Toilet" },
    desc: { id: "Fasilitas toilet wanita yang bersih dan mudah diakses.", en: "A clean, easily accessible women's toilet." }
  },
  {
    icon: "toiletMen",
    title: { id: "Toilet Pria", en: "Men's Toilet" },
    desc: { id: "Fasilitas toilet pria untuk kebutuhan pengunjung.", en: "A men's toilet for visitors' needs." }
  },
  {
    icon: "toilet",
    title: { id: "Toilet di Fable", en: "Toilet at Fable" },
    desc: { id: "Fasilitas toilet tambahan di area Fable.", en: "An additional toilet facility in the Fable area." }
  },
  {
    icon: "smokingIndoor",
    title: { id: "Smoking Area Indoor", en: "Indoor Smoking Area" },
    desc: { id: "Ber-AC dan nyaman, dirancang khusus untuk smoking area.", en: "Air-conditioned and comfortable, a dedicated smoking area." }
  },
  {
    icon: "smokingOutdoor",
    title: { id: "Smoking Area Outdoor", en: "Outdoor Smoking Area" },
    desc: { id: "Area terbuka bagi pengunjung yang memilih ruang luar.", en: "An open-air space for visitors who prefer being outdoors." }
  },
  {
    icon: "plug",
    title: { id: "Charging Spot", en: "Charging Spot" },
    desc: { id: "Titik charging untuk laptop dan smartphone.", en: "Charging points for laptops and smartphones." }
  }
];

const news = [
  {
    date: { id: "14 September 2026", en: "14 September 2026" },
    title: "Before Coffee — Opening",
    desc: { id: "Stand FC No.7 dijadwalkan opening.", en: "Stand FC No.7 is scheduled to open." }
  },
  {
    date: { id: "Update tenant", en: "Tenant update" },
    title: "Mie Ayam Serut",
    desc: { id: "Stand FC No.5A beroperasi hingga akhir Oktober 2026.", en: "Stand FC No.5A operates until the end of October 2026." }
  },
  {
    date: { id: "Segera hadir", en: "Coming soon" },
    title: "Nasi Goreng Den Bagus",
    desc: { id: "Tanggal opening akan diinformasikan kemudian.", en: "Opening date will be announced soon." }
  }
];

const highlights = [
  { icon: "utensils", label: { id: "10 Tenant Kuliner", en: "10 Food Tenants" } },
  { icon: "bag", label: { id: "2 Ruang Retail", en: "2 Retail Spaces" } },
  { icon: "laptop", label: { id: "Area Ramah Bekerja", en: "Work-Friendly Area" } },
  { icon: "smoke", label: { id: "Smoking Indoor & Outdoor", en: "Indoor & Outdoor Smoking" } },
  { icon: "plug", label: { id: "Charging Spot", en: "Charging Spots" } }
];

const workPerks = [
  { icon: "laptop", label: { id: "Tempat duduk ramah laptop", en: "Laptop-friendly seating" } },
  { icon: "plug", label: { id: "Charging spot di beberapa titik", en: "Charging spots at several points" } },
  { icon: "users", label: { id: "Cocok untuk meeting ringan", en: "Great for casual meetings" } },
  { icon: "coffee", label: { id: "Suasana nyaman ditemani coffee", en: "A relaxed mood with good coffee" } }
];

const floorLegend = [
  { icon: "utensils", label: { id: "Foodcourt", en: "Foodcourt" } },
  { icon: "bag", label: { id: "Retail", en: "Retail" } },
  { icon: "sparkle", label: { id: "Ruang tersedia", en: "Available spaces" } },
  { icon: "smoke", label: { id: "Smoking area", en: "Smoking area" } },
  { icon: "toilet", label: { id: "Toilet", en: "Toilet" } },
  { icon: "plug", label: { id: "Charging area", en: "Charging area" } }
];

const contact = {
  whatsappNumber: "6285810656334",
  whatsappDisplay: "0858 1065 6334",
  instagramHandle: "@plazabpjamsostekfoodcourt"
};
