/*
  TRANSLATIONS — Foodcourt Lantai 8
  ----------------------------------
  Kamus teks statis (bukan data tenant/news — itu ada di data.js).
  Struktur: translations[lang].path.to.key

  Menambah bahasa baru di masa depan = tinggal tambah object baru,
  misalnya translations.zh = { ... }, lalu daftarkan kodenya di
  SUPPORTED_LANGS pada js/main.js.
*/

const translations = {
  id: {
    meta: {
      title: "Foodcourt Lantai 8 | Plaza BPJAMSOSTEK",
      description: "Temukan pilihan makanan, coffee, retail, dan ruang nyaman untuk makan maupun bekerja di Foodcourt Lantai 8, Plaza BPJAMSOSTEK."
    },
    skipLink: "Langsung ke konten",
    nav: {
      home: "Beranda",
      tenants: "Tenant",
      facilities: "Fasilitas",
      floorGuide: "Denah Lantai",
      news: "News",
      contact: "Pesan / Kontak",
      openMenu: "Buka menu navigasi",
      closeMenu: "Tutup menu navigasi"
    },
    hero: {
      eyebrow: "Foodcourt · Plaza BPJAMSOSTEK · Lantai 8",
      title: "Foodcourt Lantai 8",
      tagline: "Makan. Kerja. Ketemu.",
      lead: "Temukan pilihan makanan, coffee, retail, dan ruang nyaman untuk makan maupun bekerja di Lantai 8.",
      ctaPrimary: "Jelajahi Foodcourt",
      ctaSecondary: "Lihat Denah Lantai 8",
      imageAlt: "Denah Foodcourt Lantai 8, Plaza BPJAMSOSTEK",
      imageBadgeTitle: "LANTAI 08",
      imageBadgeSub: "Area Foodcourt & Retail",
      towerLabel: "Gedung Plaza BPJAMSOSTEK",
      towerPlay: "Putar video"
    },
    tenant: {
      tag: "Foodcourt",
      title: "Temukan Pilihan Tenant Kami",
      desc: "Posisi stand mengikuti denah Lantai 8. Status tenant diperbarui secara berkala."
    },
    retail: {
      tag: "Retail",
      title: "Retail & Kebutuhan Sehari-hari",
      desc: "Area retail terpisah dari stand Foodcourt, untuk kebutuhan praktis pengunjung."
    },
    facilities: {
      tag: "Fasilitas",
      title: "Fasilitas untuk Kenyamanan Anda",
      desc: "Bukan hanya tempat makan — Lantai 8 dirancang agar pengunjung bisa berhenti sejenak, bekerja, dan bertemu dengan nyaman."
    },
    work: {
      tag: "Work Friendly",
      title: "Makan Sambil Tetap Produktif",
      desc: "Lantai 8 cocok untuk pengunjung yang ingin makan sambil bekerja — mulai dari charging perangkat, meeting ringan, hingga menikmati coffee di sela kesibukan."
    },
    floor: {
      tag: "Panduan Lantai",
      title: "Jelajahi Lantai 8",
      desc: "Gunakan denah ini untuk menemukan posisi stand Foodcourt dan area pendukung. Perbesar gambar untuk melihat detail lebih jelas.",
      zoom: "Perbesar Denah",
      fullscreen: "Layar Penuh",
      close: "Tutup",
      reset: "Reset",
      zoomIn: "Perbesar",
      zoomOut: "Perkecil",
      hint: "Cubit atau scroll untuk zoom, geser untuk melihat detail",
      note: "Denah mengikuti gambar teknis resmi Lantai 8."
    },
    news: {
      tag: "Update",
      title: "Berita & Promo",
      desc: "Info promo tenant, menu baru, tenant opening, event, dan perubahan jam operasional Foodcourt.",
      mainBadge: "Segera Hadir",
      mainTitle: "Update Foodcourt Lantai 8",
      mainDesc: "Promo tenant, menu baru, event, info opening, dan update fasilitas akan tampil di sini.",
      mainCta: "Tanyakan Info"
    },
    order: {
      tag: "Online Order & Catering",
      title: "Butuh Pesanan untuk Kantor?",
      desc: "Hubungi Foodcourt untuk pesanan online, catering, promo tenant, atau info ketersediaan stand.",
      items: [
        "Pesanan makanan untuk kantor",
        "Catering / pesanan jumlah banyak",
        "Info tenant dan menu",
        "Pertanyaan atau masukan"
      ],
      cta: "Chat via WhatsApp",
      cardTitle: "Hubungi Foodcourt"
    },
    contact: {
      title: "Ada pertanyaan atau masukan?",
      desc: "Butuh info pesanan, catering, tenant, atau fasilitas? Hubungi kami.",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      instagramStatus: "Segera hadir",
      location: "Lokasi",
      locationValue: "Foodcourt Lantai 8, Plaza BPJAMSOSTEK"
    },
    whatsappFloat: {
      label: "Chat dengan kami"
    },
    footer: {
      tagline: "Eat. Work. Meet.",
      rights: "Hak cipta dilindungi.",
      backToTop: "Kembali ke atas"
    },
    common: {
      langSwitch: "Ganti bahasa"
    }
  },

  en: {
    meta: {
      title: "Foodcourt Lantai 8 | Plaza BPJAMSOSTEK",
      description: "Discover a variety of food, coffee, retail, and comfortable spaces to eat, work, and unwind on Level 8, Plaza BPJAMSOSTEK."
    },
    skipLink: "Skip to content",
    nav: {
      home: "Home",
      tenants: "Tenants",
      facilities: "Facilities",
      floorGuide: "Floor Guide",
      news: "News",
      contact: "Order / Contact",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu"
    },
    hero: {
      eyebrow: "Foodcourt · Plaza BPJAMSOSTEK · Level 8",
      title: "Foodcourt Level 8",
      tagline: "Eat. Work. Meet.",
      lead: "Discover a variety of food, coffee, retail, and comfortable spaces to eat, work, and unwind on Level 8.",
      ctaPrimary: "Explore Foodcourt",
      ctaSecondary: "View Floor Guide",
      imageAlt: "Floor plan of the Level 8 Foodcourt, Plaza BPJAMSOSTEK",
      imageBadgeTitle: "LEVEL 08",
      imageBadgeSub: "Foodcourt & Retail Area",
      towerLabel: "Plaza BPJAMSOSTEK Tower",
      towerPlay: "Play video"
    },
    tenant: {
      tag: "Foodcourt",
      title: "Explore Our Tenants",
      desc: "Stand positions follow the Level 8 floor plan. Tenant status is updated regularly."
    },
    retail: {
      tag: "Retail",
      title: "Retail & Convenience",
      desc: "A retail area separate from the Foodcourt stands, for visitors' everyday needs."
    },
    facilities: {
      tag: "Facilities",
      title: "Everything You Need",
      desc: "More than just a place to eat — Level 8 is designed for visitors to pause, work, and meet in comfort."
    },
    work: {
      tag: "Work Friendly",
      title: "Work While You Dine",
      desc: "Level 8 is built for visitors who want to eat and work at once — from charging your devices to a casual meeting, or coffee between tasks."
    },
    floor: {
      tag: "Floor Guide",
      title: "Explore Level 8",
      desc: "Use this floor plan to find Foodcourt stands and supporting areas. Zoom in for a clearer view.",
      zoom: "Zoom Floor Plan",
      fullscreen: "Fullscreen",
      close: "Close",
      reset: "Reset",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      hint: "Pinch or scroll to zoom, drag to look around",
      note: "This plan follows the official technical drawing of Level 8."
    },
    news: {
      tag: "Updates",
      title: "News & Promo",
      desc: "Tenant promos, new menus, tenant openings, events, and updates to Foodcourt hours.",
      mainBadge: "Coming Soon",
      mainTitle: "Foodcourt Level 8 Updates",
      mainDesc: "Tenant promos, new menus, events, opening info, and facility updates will appear here.",
      mainCta: "Ask for Info"
    },
    order: {
      tag: "Online Order & Catering",
      title: "Planning a Meal for Your Team?",
      desc: "Contact the Foodcourt for online orders, catering, tenant promos, or stand availability.",
      items: [
        "Office food orders",
        "Catering / bulk orders",
        "Tenant and menu info",
        "Questions or feedback"
      ],
      cta: "Chat on WhatsApp",
      cardTitle: "Contact the Foodcourt"
    },
    contact: {
      title: "Have a question or feedback?",
      desc: "Need information about orders, catering, tenants or facilities? Contact us.",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      instagramStatus: "Coming soon",
      location: "Location",
      locationValue: "Foodcourt Level 8, Plaza BPJAMSOSTEK"
    },
    whatsappFloat: {
      label: "Chat with us"
    },
    footer: {
      tagline: "Eat. Work. Meet.",
      rights: "All rights reserved.",
      backToTop: "Back to top"
    },
    common: {
      langSwitch: "Switch language"
    }
  }
};
