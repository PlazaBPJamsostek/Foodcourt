# Foodcourt Lantai 8 — Plaza BPJAMSOSTEK

Website informasi & promosi untuk Foodcourt Lantai 8, Plaza BPJAMSOSTEK.
Bilingual (Indonesia/English), full responsive, tanpa framework/library
berat — murni HTML + CSS + JavaScript supaya tetap ringan dan cepat
dibuka dari HP.

## Struktur folder

```
index.html              Halaman utama (satu halaman, semua section)
css/
  style.css              Semua styling (design tokens, layout, responsive)
js/
  data.js                 Data tenant, retail, fasilitas, news — EDIT DI SINI
  translations.js         Teks ID/EN untuk semua bagian statis (nav, hero, dst)
  main.js                  Logic: render konten, nav, ganti bahasa, denah zoom, dll
  tenant.js                Logic KHUSUS halaman detail tenant (lihat bagian
                             "Halaman detail tenant" di bawah)
tenants/
  <slug>/index.html        Satu halaman detail per tenant, contoh:
                             tenants/soto-khas-bogor/index.html
assets/
  floorplan-lantai-8.jpg   Gambar denah resmi Lantai 8
  favicon.svg / *.png      Logo/brand mark (badge hijau, angka "8")
  og-image.jpg             Gambar preview saat link dibagikan (WhatsApp/Instagram/dll)
  tower-teaser.mp4         Cuplikan video gedung (diputar hanya saat tombol play ditekan)
  tower-poster.jpg         Gambar preview untuk video di atas
  tenants/<slug>/           Tempat menaruh logo.png & stand.jpg tiap tenant
                             (lihat README.txt di dalam masing-masing folder)
```

## Cara menjalankan / preview

1. Extract folder ini kalau masih dalam bentuk ZIP.
2. Buka `index.html` langsung di browser — semua sudah jalan tanpa server/build tool.
3. Untuk deploy: upload seluruh isi folder ini (index.html + css/ + js/ + assets/)
   ke GitHub Pages, Netlify, Vercel, atau hosting statis lain. Tidak perlu
   `npm install` atau proses build apa pun.

## Cara mengedit data (tenant, retail, fasilitas, news)

Semua ada di **`js/data.js`**, ditulis sebagai array yang mudah dibaca.
Tidak perlu menyentuh HTML atau CSS sama sekali.

**Ubah status/nama tenant yang sudah ada** — cari stand-nya, lalu edit:
```js
{
  stand: "FC No.8",
  name: { id: "Tersedia", en: "Available" },
  status: "interested",
  badge: { id: "2 PEMINAT", en: "2 INTERESTED" },
  note: { id: "Saat ini ada 2 pihak yang berminat.", en: "Currently 2 parties have shown interest." }
}
```
- `status` menentukan **warna** badge. Pilihan: `open`, `available`,
  `opening-soon`, `coming-soon`, `outdoor`, `ending`, `interested`.
- `badge` adalah **teks** pill status — bebas kamu tulis sendiri.
- `name` dan `note` boleh string biasa (kalau sama di ID/EN, misalnya nama
  brand tenant) atau object `{ id: "...", en: "..." }` kalau perlu beda.

**Menambah tenant baru** — copy salah satu object di array `tenants`,
paste di bawahnya, lalu ubah isinya. Urutan array = urutan tampil di web.

**Menambah/mengubah News & Promo** — edit array `news` dengan pola yang sama
(`date`, `title`, `desc`). Tambahkan object baru untuk menambah kartu berita.

**Retail** ada di array terpisah (`retail`) supaya tidak tercampur dengan
stand Foodcourt, sesuai permintaan.

## Cara mengubah teks statis (bukan data tenant)

Teks seperti judul section, tombol, navbar, footer, dll ada di
**`js/translations.js`**, dengan struktur:
```js
translations.id.hero.title = "Foodcourt Lantai 8"
translations.en.hero.title = "Foodcourt Level 8"
```
Cari key yang mau diubah di kedua object `id` dan `en` supaya kedua bahasa
tetap konsisten.

**Menambah bahasa baru di masa depan:** tambahkan object baru, misalnya
`translations.zh = { ... }`, salin semua key dari `translations.id`, lalu
tambahkan `"zh"` ke array `SUPPORTED_LANGS` di bagian atas `js/main.js` dan
tombol bahasa baru di navbar (`<button class="langBtn" data-lang="zh">中文</button>`).

## Cara mengganti gambar denah

Ganti file `assets/floorplan-lantai-8.jpg` dengan file baru **tanpa
mengubah nama file** — otomatis dipakai di hero, section "Jelajahi Lantai 8",
dan di viewer zoom/fullscreen (satu file dipakai di tiga tempat, jadi
browser hanya perlu download sekali).

## Cara mengganti nomor WhatsApp / Instagram

Edit object `contact` di paling bawah `js/data.js`:
```js
const contact = {
  whatsappNumber: "6285810656334",   // format internasional, tanpa "+"
  whatsappDisplay: "0858 1065 6334", // yang tampil ke pengunjung
  instagramHandle: "@plazabpjamsostekfoodcourt"
};
```
Semua tombol/link WhatsApp di seluruh halaman (floating button, CTA order,
kartu kontak) otomatis ikut berubah dari satu tempat ini.

## Halaman detail tenant (klik tenant → halaman sendiri)

Setiap tenant yang punya nama asli (bukan stand "Tersedia/Available") sekarang
punya halaman sendiri di `tenants/<slug>/`, contoh:

```
tenants/soto-khas-bogor/index.html   ->  dibuka lewat kartu "Soto Khas Bogor"
```

Klik kartu tenant di homepage (section `#tenants`) atau baris tenant di
samping denah Lantai 8 akan membuka halaman ini. Halaman ini berisi: foto
stand, logo, kategori & status, "Tentang Tenant", Menu, tombol Order via
WhatsApp, Promo & Berita, kontak Foodcourt Management (untuk komplain —
nomornya SELALU nomor Foodcourt di atas, bukan nomor tenant), dan
"Tenant Lainnya". Kalau ada slug yang salah ketik/dihapus dari `data.js`,
halaman otomatis menampilkan "Tenant tidak ditemukan" — tidak pernah blank.

**PENTING: hampir semua konten di halaman ini diambil dari `js/data.js`,
BUKAN dari isi file HTML di folder `tenants/`.** Jadi untuk tenant yang
sudah ada, kamu HANYA perlu edit `js/data.js` — tidak perlu sentuh apa pun
di dalam folder `tenants/`. Yang bisa diedit per tenant di `js/data.js`:

- `logo` & `standImage` — isi dengan path foto setelah kamu upload filenya
  ke folder `assets/tenants/<slug>/` (lihat `README.txt` di tiap folder).
  Selama masih `null`, otomatis tampil placeholder yang rapi (bukan gambar
  rusak).
- `whatsapp` — nomor WhatsApp PRIBADI tenant (format internasional tanpa
  "+"). Selama masih `null`, tombol "Pesan via WhatsApp" otomatis diganti
  info jujur + tombol ke Foodcourt Management, TIDAK PERNAH mengarang nomor.
- `menuCategories` — daftar kategori menu (bukan harga rinci — harga tetap
  disampaikan lewat WhatsApp sesuai instruksi untuk tidak mengarang harga).
- `category`, `description` — teks kategori & "Tentang Tenant".
- `instagram` — handle Instagram tenant kalau ada.
- Promo/berita tenant memakai array `news` yang sama seperti homepage;
  tambahkan `tenantSlug: "slug-tenant"` di object berita yang relevan supaya
  muncul di section "Promo & Berita" halaman tenant tersebut.

**Menambah tenant baru yang butuh halaman detail:**
1. Tambah object baru di array `tenants` pada `js/data.js` (isi semua
   field, termasuk `slug` — huruf kecil, pakai tanda "-", tanpa spasi).
2. Copy salah satu folder di `tenants/` (misal `tenants/r-coffee/`), lalu
   rename folder hasil copy jadi nama slug baru.
3. Di dalam `index.html` hasil copy, ganti dua hal saja di bagian `<head>`:
   isi `<title>` & `<meta name="description">`, dan atribut
   `data-tenant-slug="..."` di tag `<body>` — samakan dengan slug baru.

Tidak perlu install apa pun atau menjalankan build tool untuk langkah di
atas — cukup salin folder, edit teks di editor biasa, dan simpan.

## Ringkasan perubahan utama dari versi sebelumnya

- Desain & branding baru: brand mark "8" custom, palet hijau + amber yang
  konsisten, tipografi Manrope/DM Sans.
- Bilingual penuh ID/EN dengan sistem `translations.js` + atribut
  `data-i18n` — bukan Google Translate widget.
- Struktur kode dipisah: `index.html`, `css/style.css`, `js/data.js`,
  `js/translations.js`, `js/main.js` (sebelumnya satu file HTML saja).
- Navbar sticky + hamburger menu mobile yang benar-benar berfungsi
  (sebelumnya tombolnya statis/tidak ada logic-nya).
- Semua data tenant/retail/fasilitas/news dipindah ke array JS yang
  mudah diedit, bukan hard-code di HTML.
- Denah Lantai 8 sekarang punya **viewer zoom + pan + fullscreen** (pinch,
  scroll wheel, drag, double-tap) — bukan cuma gambar statis.
- Section baru: **Work While You Dine / Makan Sambil Tetap Produktif**.
- Floating WhatsApp button + tombol "kembali ke atas".
- SEO: title/meta description sesuai spek, Open Graph + Twitter Card image,
  semantic HTML, satu H1, alt text di semua gambar.
- Aksesibilitas: skip link, focus state yang terlihat, aria-label pada
  semua tombol ikon, kontras warna dicek, keyboard-friendly (Escape untuk
  menutup menu/viewer).
- Performa: tanpa library/framework berat, font hanya weight yang dipakai,
  gambar pakai `loading="lazy"` di luar hero, video tower **tidak pernah
  ter-download otomatis** — baru dimuat kalau pengunjung menekan tombol
  play, jadi nol beban tambahan di HP.
- Animasi ringan (fade-up saat scroll, hover, transisi navbar) yang
  menghormati pengaturan "Reduce Motion" di perangkat pengunjung.
- **Baru:** setiap tenant (kecuali stand "Tersedia/Available") sekarang
  punya halaman detail sendiri di `tenants/<slug>/` — foto stand, logo,
  "Tentang Tenant", Menu, Order via WhatsApp, Promo & Berita, kontak
  Foodcourt Management, dan "Tenant Lainnya". Kartu tenant di homepage dan
  daftar tenant di samping denah sekarang bisa diklik menuju halaman ini.
  Semua kontennya diedit lewat `js/data.js` — lihat bagian "Halaman detail
  tenant" di atas.
- Tidak ada penambahan fasilitas/tenant fiktif — semua data sesuai yang
  diberikan (retail tetap terpisah dari Foodcourt, Instagram tetap
  "Coming Soon", FC No.10 tetap ditandai outdoor).

## Catatan

- Denah yang ditampilkan adalah gambar teknis resmi apa adanya, **tidak**
  digambar ulang atau ditambahi elemen yang tidak ada (kolam, taman,
  jogging track, dll) — sesuai instruksi.
- Instagram masih ditampilkan sebagai "Coming Soon" karena akun belum
  tersedia; update `instagramHandle` di `data.js` begitu akun aktif, lalu
  hapus/ubah baris "Segera hadir" di `translations.js` (`contact.instagramStatus`).
- Nomor WhatsApp PRIBADI tiap tenant di halaman detail sengaja masih
  kosong (`whatsapp: null` di `data.js`) karena belum ada datanya — bukan
  bug. Begitu juga `menuCategories` hanya berisi KATEGORI menu (bukan
  harga/menu rinci), sesuai instruksi untuk tidak mengarang harga. Isi
  kedua data ini kapan saja lewat `js/data.js` tanpa perlu mengubah kode
  lain.
