# Portal Resmi Sespim Lemdiklat Polri — SOT-Driven Front-End Scaffold

Repository ini adalah paket awal **SOT-driven front-end development** untuk Portal Resmi Sespim Lemdiklat Polri.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based architecture
- Mobile responsive first

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Perintah Penting

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # production server
npm run typecheck  # TypeScript checking
```

## File Penting untuk Codex

- `SOT_FRONTEND.md` — Source of Truth utama
- `CODEX_EXECUTION_PROMPT.md` — instruksi langsung untuk Codex
- `IMPLEMENTATION_STATUS.md` — status fase implementasi
- `src/data/navigation.ts` — struktur menu portal
- `src/data/pages.ts` — data konten awal setiap halaman
- `src/data/implementationStatus.ts` — status implementasi berbasis data

## Prinsip Implementasi

1. Jangan mengubah sitemap inti tanpa approval.
2. Jangan mengubah token warna utama tanpa approval.
3. Semua komponen harus mobile responsive.
4. Prioritaskan reusable components.
5. Setiap fase harus memperbarui status implementasi.
6. Gunakan bahasa Indonesia formal untuk konten institusi.

## Baseline Menu

- Beranda
- Profil
- Program Pendidikan
- Kelembagaan Internal
- Widyaiswara
- Publikasi, Literasi, dan Karya
- Berita & Informasi Publik
- Galeri, Unduhan, dan Kontak
- Sarana dan Prasarana Kependidikan
