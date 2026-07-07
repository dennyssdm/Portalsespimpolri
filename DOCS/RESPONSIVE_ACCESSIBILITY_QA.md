# Responsive & Accessibility QA
## Portal Resmi Sespim Lemdiklat Polri

**Tanggal:** 2026-07-03  
**Phase:** Phase 6 — Responsive & Accessibility QA  
**Status:** Done

---

## Ruang Lingkup

QA Phase 6 mencakup:

- Mobile 360px
- Tablet 768px
- Desktop 1280px
- Navigasi desktop dan mobile
- Fokus keyboard
- Skip link
- Kontras warna utama
- Readability teks
- Pencegahan overflow horizontal
- Kesiapan halaman listing dan detail Phase 5
- Akses Login Internal pada desktop, mobile, footer, pencarian, dan sitemap

---

## Perbaikan yang Diterapkan

- Skip link ditambahkan untuk melompat langsung ke konten utama.
- Target konten utama ditambahkan di layout global.
- Focus state global ditambahkan dengan outline kuning Polri.
- Preferensi `prefers-reduced-motion` dihormati untuk pengguna yang mengurangi animasi.
- `overflow-x` global dicegah dan teks panjang diberi wrapping.
- Mobile drawer diberi batas tinggi viewport dan scroll internal.
- Active route di header diberi `aria-current`.
- Search bar dibuat lebih adaptif di mobile dan desktop.
- Listing, detail konten, detail program, dan panel fitur diberi perlindungan `min-w-0`.
- CTA unduhan dummy dibuat nonaktif dengan `aria-disabled` sampai file resmi tersedia.
- Logo resmi Sespim dipasang di header, footer, dan metadata icon.
- Gambar kampus Sespim dipasang sebagai background hero beranda dengan overlay kontras.
- Foto Kasespim resmi dipasang di blok sambutan melalui `public/images/kasespim.png`, dengan fallback jika aset belum tersedia.
- Naskah sambutan Kasespim resmi dipasang di beranda dengan format pembuka, isi, penutup, dan tanda tangan.
- Link media sosial Instagram, Facebook, X, Threads, dan YouTube dipasang di footer dengan label aksesibel.
- Menu Login Internal dipasang sebagai CTA desktop, item mobile drawer, link footer, rute pencarian, sitemap, dan halaman baseline `/login-internal`.

---

## Checklist Viewport

| Area | 360px Mobile | 768px Tablet | 1280px Desktop | Catatan |
|---|---:|---:|---:|---|
| Header & mobile drawer | Pass | Pass | Pass | Drawer scrollable, active state terbaca |
| Homepage | Pass | Pass | Pass | Grid turun bertahap |
| Main pages | Pass | Pass | Pass | Sidebar turun di mobile |
| Listing konten | Pass | Pass | Pass | Kartu listing tidak memaksa overflow |
| Detail konten | Pass | Pass | Pass | Metadata dan related content turun rapi |
| Detail program | Pass | Pass | Pass | Tahapan dan dokumen terkait tetap terbaca |
| Login Internal | Pass | Pass | Pass | CTA desktop, mobile drawer, footer, dan halaman baseline tersedia |

---

## Kontras Warna Utama

| Kombinasi | Rasio | Status |
|---|---:|---|
| `polri.brownDark` / putih | 17.95 | Pass |
| `polri.brown` / `polri.goldSoft` | 8.81 | Pass |
| `polri.maroon` / putih | 11.32 | Pass |
| `polri.brownDark` / `polri.gold` | 7.42 | Pass |
| `polri.black` / `polri.cream` | 16.92 | Pass |

---

## Catatan QA

- Optimasi image final tetap perlu dicek ulang jika ada penggantian foto hero, logo, atau galeri resmi.
- Form kontak masih baseline UI dan belum memiliki validasi/integrasi backend.
- Listing/filter masih data lokal; pagination dan filter dinamis masuk tahap integrasi CMS/API.
- Browser screenshot lintas device tetap direkomendasikan setiap ada penggantian aset resmi atau integrasi backend/SSO.
