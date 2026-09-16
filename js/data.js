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
  - note adalah deskripsi singkat di bawah nama tenant (dipakai di kartu
    Foodcourt & sebagai fallback deskripsi di halaman detail).

  Menambah tenant baru = tinggal copy salah satu object di bawah,
  ubah stand/name/status/badge/note-nya.

  HALAMAN DETAIL TENANT (/tenants/<slug>/)
  ------------------------------------------
  Field tambahan di bawah ini HANYA dipakai oleh halaman detail tenant
  (folder tenants/<slug>/, dirender oleh js/tenant.js). Tenant tanpa
  `slug` (contoh: stand "Tersedia/Available") TIDAK mendapat halaman
  detail dan kartunya tidak bisa diklik — sesuai instruksi bahwa stand
  kosong tidak dianggap tenant aktif.

  - slug            : dipakai untuk URL tenants/<slug>/. Harus sama
                        persis dengan nama folder di /tenants/.
  - category        : kategori singkat tenant, tampil di bawah nama.
  - description     : paragraf "Tentang Tenant". Kalau dikosongkan,
                        otomatis pakai isi `note`.
  - menuCategories  : daftar kategori menu (BUKAN harga/menu rinci —
                        harga & menu lengkap tetap lewat WhatsApp,
                        sesuai instruksi untuk tidak mengarang harga).
  - logo            : path logo tenant, contoh:
                        "assets/tenants/african-organics/logo.png".
                        Kosongkan (null) kalau logo belum ada — akan
                        otomatis tampil placeholder yang rapi.
  - standImage      : path foto stand tenant (ukuran besar). Sama
                        seperti logo, kosongkan (null) kalau belum ada.
  - whatsapp        : nomor WhatsApp PRIBADI tenant, format
                        internasional tanpa "+", contoh "62812xxxxxxx".
                        Kosongkan (null) selama belum kamu dapatkan —
                        tombol "Pesan via WhatsApp" otomatis
                        digantikan info "hubungi Foodcourt Management"
                        selama field ini kosong. Nomor ini terpisah
                        total dari nomor komplain di `contact` paling
                        bawah file ini.
  - instagram       : handle Instagram tenant (contoh "@tenant"),
                        kosongkan (null) kalau belum ada.

  Untuk menambah tenant BARU yang perlu halaman detail:
  1. Tambah object baru di array `tenants` di bawah (isi semua field,
     termasuk `slug`).
  2. Copy salah satu folder di /tenants/ (misal /tenants/r-coffee/),
     rename foldernya jadi slug baru, lalu di dalam index.html hasil
     copy, ganti nilai atribut `data-tenant-slug="..."` dan tag
     <title>/<meta description> di bagian <head> sesuai tenant baru.
     Tidak perlu install apa pun atau menjalankan build tool.
*/

const tenants = [
  {
    stand: "FC No.1",
    name: { id: "Tersedia", en: "Available" },
    status: "available",
    badge: { id: "TERSEDIA", en: "AVAILABLE" },
    note: { id: "Ruang usaha siap untuk tenant berikutnya.", en: "Ready for the next tenant." }
    /* Tidak ada slug -> stand kosong, tidak dianggap tenant aktif, kartu tidak bisa diklik. */
  },
  {
    stand: "FC No.2",
    name: "African Organics",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Pilihan kuliner sehat di Foodcourt.", en: "A healthy dining option at the Foodcourt." },
    slug: "african-organics",
    category: { id: "Menu Sehat & Jus", en: "Healthy Food & Juice" },
    description: {
      id: "African Organics menghadirkan pilihan menu sehat di Foodcourt Lantai 8, cocok untuk pengunjung yang ingin makan enak tanpa mengorbankan pola makan sehat.",
      en: "African Organics offers healthy dining choices at the Foodcourt on the 8th Floor, great for visitors who want a satisfying meal without compromising on healthy eating."
    },
    menuCategories: [
      { id: "Menu Sehat", en: "Healthy Menu" },
      { id: "Salad & Bowl", en: "Salad & Bowl" },
      { id: "Jus & Minuman", en: "Juice & Drinks" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.3",
    name: "Pawon Stories",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Menu rumahan dengan cita rasa autentik.", en: "Home-style dishes with authentic flavor." },
    slug: "pawon-stories",
    category: { id: "Masakan Rumahan", en: "Home-style Cooking" },
    description: {
      id: "Pawon Stories menyajikan menu rumahan dengan cita rasa autentik, menghadirkan kehangatan masakan rumah di tengah kesibukan Lantai 8.",
      en: "Pawon Stories serves home-style dishes with authentic flavor, bringing the warmth of home cooking to a busy day on the 8th Floor."
    },
    menuCategories: [
      { id: "Menu Rumahan", en: "Home-style Dishes" },
      { id: "Lauk & Sayur", en: "Side Dishes & Vegetables" },
      { id: "Nasi", en: "Rice" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.4",
    name: "Masakan Medan Kesya",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Masakan khas Medan untuk pengunjung.", en: "Authentic Medan cuisine for visitors." },
    slug: "masakan-medan-kesya",
    category: { id: "Masakan Medan", en: "Medan Cuisine" },
    description: {
      id: "Masakan Medan Kesya menghadirkan cita rasa khas Medan untuk pengunjung Foodcourt Lantai 8.",
      en: "Masakan Medan Kesya brings authentic Medan flavors to visitors of the Foodcourt on the 8th Floor."
    },
    menuCategories: [
      { id: "Masakan Medan", en: "Medan Dishes" },
      { id: "Nasi", en: "Rice" },
      { id: "Lauk Pauk", en: "Side Dishes" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.5",
    name: "Warung JJ",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Menu harian favorit di Foodcourt.", en: "A popular daily menu at the Foodcourt." },
    slug: "warung-jj",
    category: { id: "Menu Harian", en: "Daily Menu" },
    description: {
      id: "Warung JJ adalah menu harian favorit di Foodcourt Lantai 8, cocok untuk makan siang praktis sehari-hari.",
      en: "Warung JJ is a popular daily menu at the Foodcourt on the 8th Floor, great for a quick and practical everyday lunch."
    },
    menuCategories: [
      { id: "Menu Harian", en: "Daily Menu" },
      { id: "Nasi", en: "Rice" },
      { id: "Lauk", en: "Side Dishes" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.5A",
    name: "Mie Ayam Serut",
    status: "ending",
    badge: { id: "BUKA S.D. OKT 2026", en: "OPEN UNTIL OCT 2026" },
    note: { id: "Buka hingga akhir Oktober 2026.", en: "Open until the end of October 2026." },
    slug: "mie-ayam-serut",
    category: { id: "Mie Ayam & Rice Bowl", en: "Chicken Noodles & Rice Bowl" },
    description: {
      id: "Mie Ayam Serut menghadirkan mie ayam dan rice bowl di Foodcourt Lantai 8, beroperasi hingga akhir Oktober 2026.",
      en: "Mie Ayam Serut serves chicken noodles and rice bowls at the Foodcourt on the 8th Floor, operating until the end of October 2026."
    },
    menuCategories: [
      { id: "Mie Ayam", en: "Chicken Noodles" },
      { id: "Rice Bowl", en: "Rice Bowl" },
      { id: "Minuman", en: "Drinks" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.5B",
    name: "Padang Chaniago",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Pilihan masakan Padang.", en: "A Padang cuisine favorite." },
    slug: "padang-chaniago",
    category: { id: "Masakan Padang", en: "Padang Cuisine" },
    description: {
      id: "Padang Chaniago menyajikan pilihan masakan Padang untuk pengunjung Foodcourt Lantai 8.",
      en: "Padang Chaniago serves Padang cuisine favorites for visitors of the Foodcourt on the 8th Floor."
    },
    menuCategories: [
      { id: "Masakan Padang", en: "Padang Dishes" },
      { id: "Rendang & Lauk", en: "Rendang & Side Dishes" },
      { id: "Nasi", en: "Rice" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.6",
    name: "Soto Khas Bogor",
    status: "open",
    badge: { id: "BUKA", en: "OPEN" },
    note: { id: "Soto dan masakan khas Bogor.", en: "Soto and traditional Bogor dishes." },
    slug: "soto-khas-bogor",
    category: { id: "Soto & Masakan Bogor", en: "Soto & Bogor Cuisine" },
    description: {
      id: "Soto Khas Bogor menyajikan soto dan masakan khas Bogor untuk pengunjung Foodcourt Lantai 8.",
      en: "Soto Khas Bogor serves soto and traditional Bogor dishes for visitors of the Foodcourt on the 8th Floor."
    },
    menuCategories: ["Soto Bogor", { id: "Nasi", en: "Rice" }, { id: "Minuman", en: "Drinks" }],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.7",
    name: "Before Coffee",
    status: "opening-soon",
    badge: { id: "BUKA 14 SEP 2026", en: "OPENING 14 SEP 2026" },
    note: { id: "Coffee shop baru di Lantai 8.", en: "A new coffee shop on 8 Floor." },
    slug: "before-coffee",
    category: { id: "Coffee Shop", en: "Coffee Shop" },
    description: {
      id: "Before Coffee adalah coffee shop baru di Lantai 8, dijadwalkan buka pada 14 September 2026.",
      en: "Before Coffee is a new coffee shop on the 8th Floor, scheduled to open on 14 September 2026."
    },
    menuCategories: ["Coffee", { id: "Non-Coffee", en: "Non-Coffee" }, { id: "Snack Ringan", en: "Light Snacks" }],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.8",
    name: { id: "Tersedia", en: "Available" },
    status: "interested",
    badge: { id: "2 PEMINAT", en: "2 INTERESTED" },
    note: { id: "Saat ini ada 2 pihak yang berminat.", en: "Currently 2 parties have shown interest." }
    /* Tidak ada slug -> stand kosong, tidak dianggap tenant aktif, kartu tidak bisa diklik. */
  },
  {
    stand: "FC No.9",
    name: "Nasi Goreng Den Bagus",
    status: "coming-soon",
    badge: { id: "SEGERA HADIR", en: "COMING SOON" },
    note: { id: "Tanggal opening akan diinformasikan.", en: "Opening date to be announced." },
    slug: "nasi-goreng-den-bagus",
    category: { id: "Nasi Goreng", en: "Fried Rice" },
    description: {
      id: "Nasi Goreng Den Bagus akan menghadirkan menu nasi goreng di Foodcourt Lantai 8. Tanggal opening akan diinformasikan kemudian.",
      en: "Nasi Goreng Den Bagus will serve fried rice dishes at the Foodcourt on the 8th Floor. The opening date will be announced soon."
    },
    menuCategories: [
      { id: "Nasi Goreng", en: "Fried Rice" },
      { id: "Mie Goreng", en: "Fried Noodles" },
      { id: "Minuman", en: "Drinks" }
    ],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
  },
  {
    stand: "FC No.10",
    name: "R Coffe",
    status: "outdoor",
    badge: { id: "OUTDOOR", en: "OUTDOOR" },
    note: { id: "Coffee spot di area outdoor Lantai 8.", en: "A coffee spot in the 8 floor outdoor area." },
    slug: "r-coffee",
    category: { id: "Coffee (Outdoor)", en: "Coffee (Outdoor)" },
    description: {
      id: "R Coffee adalah coffee spot di area outdoor Lantai 8, cocok untuk bersantai sambil menikmati suasana luar ruangan.",
      en: "R Coffee is a coffee spot in the outdoor area of the 8th Floor, great for relaxing while enjoying the open-air atmosphere."
    },
    menuCategories: ["Coffee", { id: "Non-Coffee", en: "Non-Coffee" }, { id: "Snack", en: "Snacks" }],
    logo: null,
    standImage: null,
    gallery: [],
    whatsapp: null,
    instagram: null
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
    desc: { id: "Stand FC No.7 dijadwalkan opening.", en: "Stand FC No.7 is scheduled to open." },
    tenantSlug: "before-coffee" /* dipakai di section "Promo & Berita" halaman detail tenant */
  },
  {
    date: { id: "Update tenant", en: "Tenant update" },
    title: "Mie Ayam Serut",
    desc: { id: "Stand FC No.5A beroperasi hingga akhir Oktober 2026.", en: "Stand FC No.5A operates until the end of October 2026." },
    tenantSlug: "mie-ayam-serut"
  },
  {
    date: { id: "Segera hadir", en: "Coming soon" },
    title: "Nasi Goreng Den Bagus",
    desc: { id: "Tanggal opening akan diinformasikan kemudian.", en: "Opening date will be announced soon." },
    tenantSlug: "nasi-goreng-den-bagus"
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
