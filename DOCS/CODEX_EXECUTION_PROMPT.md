# CODEX EXECUTION PROMPT

Anda bertindak sebagai senior front-end developer untuk Portal Resmi Sespim Lemdiklat Polri.

## Tujuan

Lanjutkan implementasi project Next.js + Tailwind CSS ini berdasarkan SOT yang sudah tersedia.

## Sumber Kebenaran

Gunakan file berikut sebagai rujukan utama:

1. `SOT_FRONTEND.md`
2. `IMPLEMENTATION_STATUS.md`
3. `src/data/navigation.ts`
4. `src/data/pages.ts`
5. `src/data/implementationStatus.ts`

## Instruksi Utama

1. Pertahankan identitas visual Polri: coklat tua, gold, maroon, hitam, kuning, putih, merah.
2. Fokus pada front-end terlebih dahulu.
3. Gunakan reusable components.
4. Pastikan seluruh halaman mobile responsive.
5. Jangan ubah sitemap utama tanpa approval.
6. Jangan hapus route yang sudah ada.
7. Tambahkan detail UI secara bertahap per fase.
8. Perbarui status implementasi setiap fase selesai.

## Urutan Eksekusi yang Disarankan

### Step 1 — Validasi Project

- Jalankan `npm install`
- Jalankan `npm run dev`
- Cek apakah homepage tampil
- Jalankan `npm run typecheck`

### Step 2 — Perkuat Foundation

- Review `tailwind.config.ts`
- Review `globals.css`
- Review layout global
- Pastikan token warna dipakai konsisten

### Step 3 — Selesaikan Navigation System

- Finalisasi desktop header
- Finalisasi mobile drawer
- Tambahkan active state route
- Tambahkan akses search sederhana

### Step 4 — Selesaikan Homepage

- Perkuat hero section
- Tambahkan section sambutan Kasespim
- Tambahkan program pendidikan cards
- Tambahkan berita, agenda, publikasi
- Tambahkan quick links

### Step 5 — Selesaikan Main Pages

- Profil
- Program Pendidikan
- Kelembagaan Internal
- Widyaiswara
- Publikasi
- Berita
- Galeri
- Unduhan
- Kontak
- Sarana Prasarana

### Step 6 — QA

- Cek mobile 360px
- Cek tablet 768px
- Cek desktop 1280px
- Cek navigasi
- Cek spacing
- Cek kontras warna
- Cek TypeScript

## Format Update Status

Setiap menyelesaikan fase, update:

- `IMPLEMENTATION_STATUS.md`
- `src/data/implementationStatus.ts`

Gunakan status:

- Draft
- Need Review
- Approved
- In Progress
- Revision
- Ready for QA
- Done
- Hold

## Definition of Done

Satu fase dianggap selesai jika:

1. UI tampil tanpa error.
2. Tidak ada TypeScript error.
3. Responsive mobile, tablet, desktop.
4. Komponen reusable.
5. Status implementasi diperbarui.
6. Catatan perubahan ditambahkan ke `IMPLEMENTATION_STATUS.md`.
