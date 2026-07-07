# SOT FRONT-END DEVELOPMENT
## Portal Resmi Sespim Lemdiklat Polri

**Tech Stack:** Next.js + Tailwind CSS  
**Output:** Website portal resmi, mobile responsive, modern, formal, informatif, dan berkarakter Polri.

---

## 1. Tujuan Front-End

Portal Resmi Sespim Lemdiklat Polri dikembangkan sebagai pusat informasi digital yang menampilkan:

- Profil kelembagaan
- Program pendidikan
- Kelembagaan internal
- Widyaiswara
- Publikasi, literasi, dan karya
- Berita, kegiatan, dan informasi publik
- Galeri, unduhan, dan kontak
- Sarana dan prasarana kependidikan

Pendekatan pengembangan memakai **frontend-first development** agar struktur UI, navigasi, layout, komponen, dan responsivitas selesai terlebih dahulu sebelum integrasi backend/CMS.

---

## 2. Karakter Visual

Website harus terasa:

- Formal
- Institusional
- Modern
- Berwibawa
- Akademik
- Mudah dibaca
- Tidak terlalu ramai
- Relevan dengan identitas Polri

---

## 3. Palet Warna

| Token | Hex | Fungsi |
|---|---:|---|
| `polri.brown` | `#3A2416` | Header, footer, section formal |
| `polri.brownDark` | `#21140C` | Background gelap utama |
| `polri.gold` | `#C9A227` | Aksen premium, border, highlight |
| `polri.goldSoft` | `#E6C766` | Aksen lembut |
| `polri.maroon` | `#6B1F2A` | CTA penting, section strategis |
| `polri.black` | `#111111` | Teks utama |
| `polri.yellow` | `#F5C542` | Badge agenda/status |
| `polri.red` | `#B91C1C` | Alert/informasi penting |
| `polri.white` | `#FFFFFF` | Background konten |
| `polri.cream` | `#F7F2E8` | Background lembut |

---

## 4. Struktur Navigasi Utama

1. Beranda
2. Profil
3. Program Pendidikan
4. Kelembagaan Internal
5. Widyaiswara
6. Publikasi, Literasi, dan Karya
7. Berita & Informasi Publik
8. Galeri, Unduhan, dan Kontak
9. Sarana dan Prasarana Kependidikan

Desktop menggunakan **mega menu**.  
Mobile menggunakan **drawer + accordion**.

---

## 5. Route Strategy Next.js

Gunakan Next.js App Router dengan struktur:

```txt
src/app/
├── page.tsx
├── profil/
├── program-pendidikan/
├── kelembagaan-internal/
├── widyaiswara/
├── publikasi/
├── berita/
├── galeri/
├── unduhan/
├── kontak/
└── sarana-prasarana/
```

Setiap route utama memiliki `page.tsx` dan dapat diperluas menjadi halaman detail.

---

## 6. Komponen Utama

### Layout

- `Header`
- `Footer`
- `MobileDrawer`
- `MegaMenu`
- `Breadcrumb`
- `PageHero`
- `Container`

### Homepage

- `HeroSection`
- `KasespimGreeting`
- `EducationProgramCards`
- `LatestNewsGrid`
- `AgendaPreview`
- `PublicationPreview`
- `QuickLinks`
- `InstitutionStats`

### Content

- `NewsCard`
- `PublicationCard`
- `AgendaCard`
- `ProfileCard`
- `DownloadCard`
- `GalleryGrid`
- `InfoPublicCard`
- `SearchBar`
- `FilterTabs`

---

## 7. Implementation Phases

### Phase 1 — Foundation Setup

**Deliverable:**

- Next.js setup
- Tailwind setup
- Design token warna Polri
- Folder structure
- Layout global
- Data navigation awal

**Status:** Done

### Phase 2 — Navigation System

**Deliverable:**

- Header desktop
- Mega menu
- Mobile drawer
- Login Internal CTA
- Breadcrumb
- Footer

**Status:** Done

### Phase 3 — Homepage UI

**Deliverable:**

- Hero section
- Sambutan Kasespim
- Highlight program pendidikan
- Berita terbaru
- Agenda pendidikan
- Publikasi terbaru
- Quick links

**Status:** Done

### Phase 4 — Main Pages UI

**Deliverable:**

- Profil
- Program Pendidikan
- Kelembagaan Internal
- Widyaiswara
- Publikasi
- Berita & Informasi Publik
- Galeri
- Unduhan
- Kontak
- Sarana dan Prasarana

**Status:** Done

### Phase 5 — Content Listing & Detail Pages

**Deliverable:**

- List berita
- Detail berita
- List publikasi
- Detail publikasi
- List widyaiswara
- Detail widyaiswara
- List unduhan
- Detail program pendidikan

**Status:** Done

### Phase 6 — Responsive & Accessibility QA

**Deliverable:**

- Mobile testing
- Tablet testing
- Desktop testing
- Contrast check
- Font readability
- Navbar usability
- Image optimization
- Login Internal baseline

**Status:** Done

### Phase 7 — Final UI Polish

**Deliverable:**

- Micro interaction
- Hover state
- Loading skeleton
- Empty state
- Error state
- Spacing consistency
- Final documentation

**Status:** Belum Dimulai

---

## 8. Acceptance Criteria

Front-end dianggap siap apabila:

1. Semua route utama dapat diakses.
2. Navbar desktop dan mobile berjalan baik.
3. Semua halaman utama responsive.
4. Warna dan gaya visual konsisten dengan tema Polri.
5. Komponen dapat digunakan ulang.
6. Beranda menampilkan konten prioritas.
7. Struktur halaman sesuai sitemap.
8. Tidak ada layout pecah di mobile.
9. Design system terdokumentasi.
10. Status implementasi setiap fase tercatat.

---

## 9. Rule untuk Codex

Codex harus:

1. Mengikuti `src/data/navigation.ts` sebagai sumber struktur menu.
2. Mengikuti `src/data/implementationStatus.ts` untuk update status kerja.
3. Tidak mengubah palet warna inti tanpa persetujuan.
4. Tidak menghapus route yang sudah dibuat.
5. Membuat komponen reusable, bukan hard-code berulang.
6. Memastikan setiap halaman mobile responsive.
7. Menjalankan `npm run typecheck` sebelum menyatakan fase selesai.
8. Memperbarui `DOCS/IMPLEMENTATION_STATUS.md` setiap selesai fase.
