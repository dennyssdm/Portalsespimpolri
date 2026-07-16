# Dokumentasi Sistem Pemasangan & Penjadwalan Pembimbingan Naskap
## Portal Resmi Sespim Lemdiklat Polri

Dokumen ini menjelaskan arsitektur, struktur data, alur kerja (workflow), serta mekanisme otorisasi yang mengatur bagaimana Administrator Sekolah / Superadmin memasangkan Peserta Didik (Serdik) dengan Dosen Pembimbing (Widyaiswara) beserta jadwal asistensinya.

---

## 1. Struktur Data (Schema)

Penyimpanan data pasangan bimbingan menggunakan database JSON lokal yang berlokasi di:
`src/data/naskap_db.json`

Setiap entitas bimbingan naskap direpresentasikan oleh objek JSON dengan struktur sebagai berikut:

```json
{
  "id": "s-4",
  "name": "AKBP Deny Haryanto, S.I.K., M.Si.",
  "rank": "Ajun Komisaris Besar Polisi",
  "classGroup": "Sespimti Polri Dikreg Ke-35",
  "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "status": "Bimbingan Draf",
  "activeTitle": "Kebijakan Pengamanan Perbatasan Berbasis Kemitraan Komunitas...",
  "currentChapter": "Bab II: Kajian Pustaka & Analisis Teori",
  "comments": [
    {
      "sender": "Serdik",
      "text": "Mohon petunjuk Kombes Pol Hendra Gunawan...",
      "date": "16 Jul 2026, 19:15"
    }
  ],
  "email": "deny.haryanto@sespim.polri.go.id",
  "phone": "6281973001974",
  "meetingUrl": "https://meet.google.com/dny-hdgw-tnt",
  "serdikNrpNip": "84081234",
  "widyaiswaraName": "KOMBES POL HENDRA GUNAWAN, S.I.K., M.T.",
  "widyaiswaraNip": "80061174",
  "scheduleText": "Setiap Hari Kamis, Pukul 19:00 WIB"
}
```

### Penjelasan Kolom Kunci Pemasangan:
* **`serdikNrpNip`**: NRP atau NIP unik milik Serdik. Digunakan oleh sistem untuk menyaring dan mencocokkan data saat Serdik bersangkutan login.
* **`widyaiswaraNip`**: NIP unik dari Widyaiswara yang ditunjuk sebagai pembimbing. Digunakan oleh sistem untuk menyaring daftar perwira siswa yang dibimbing oleh Widyaiswara bersangkutan saat ia login.
* **`widyaiswaraName`**: Nama lengkap beserta gelar Widyaiswara pembimbing untuk ditampilkan di antarmuka halaman asistensi Serdik.
* **`scheduleText`**: Teks jadwal asistensi berkala yang diatur oleh admin sekolah (misal: *"Setiap Hari Kamis, Pukul 19:00 WIB"*).

---

## 2. Alur Kerja & Arsitektur Sistem (Workflow)

Sistem ini terbagi menjadi 4 fase utama yang saling terintegrasi:

```
[ Fase 1: Admin / Superadmin ]
      │
      ├─► Atur Pasangan (Serdik & WI) & Input Jadwal di Dashboard CMS
      ├─► Simpan data via API POST `/api/naskap` ke `naskap_db.json`
      │
[ Fase 2: Autentikasi Pengguna ]
      │
      ├─► Serdik/WI Login via `/login`
      ├─► Menyimpan objek identitas ke `sessionStorage` (`sespim_user`)
      │   (Mengandung key `nrpNip` & `role`)
      │
[ Fase 3: Route Guard & Akses Kontrol ]
      │
      ├─► Pengguna mengakses `/widyaiswara/pembimbingan-naskap`
      ├─► `layout.tsx` memeriksa peran (Akses diberikan jika role = 'serdik' atau 'widyaiswara')
      │
[ Fase 4: Filtrasi & Tampilan Personal ]
      │
      ├─► Halaman membaca `currentUser.nrpNip`
      ├─► Data bimbingan disaring (WI hanya melihat WI-NIP miliknya; Serdik hanya melihat Serdik-NIP miliknya)
      └─► Menampilkan lembar asistensi interaktif & Banner Jadwal Bimbingan
```

### Penjelasan Detail Fase Kerja:

### Fase 1: Pendaftaran & Pemasangan oleh Admin Sekolah
1. Admin Sekolah login ke Dashboard CMS `/admin/dashboard` dan membuka tab **"Pembimbingan Naskap"**.
2. Admin mengklik tombol **"Tambah Pasangan Bimbingan"** atau **"Edit"** pada Serdik yang sudah ada.
3. Form input mengumpulkan informasi Serdik, NRP/NIP, Dosen Pembimbing (Widyaiswara), NIP Widyaiswara, dan Jadwal Mingguan.
4. Payload dikirim melalui API request:
   * **Endpoint**: `/api/naskap` (HTTP POST)
   * **Payload Create**: `{ action: "create", name, rank, serdikNrpNip, widyaiswaraName, widyaiswaraNip, scheduleText, ... }`
   * **Payload Update**: `{ action: "update", id, serdikNrpNip, widyaiswaraName, widyaiswaraNip, scheduleText, ... }`
5. Handler backend memperbarui data di `naskap_db.json`.

### Fase 2: Autentikasi Pengguna
1. Ketika user (Serdik atau Widyaiswara) login melalui `/login`, kredensial diverifikasi.
2. Jika berhasil, sistem menyimpan payload user ke dalam browser session:
   * **Key**: `'sespim_user'`
   * **Format data**:
     ```json
     {
       "id": "u-serdik-deny",
       "name": "AKBP Deny Haryanto, S.I.K., M.Si.",
       "nrpNip": "84081234",
       "role": "serdik"
     }
     ```

### Fase 3: Kontrol Hak Akses Route (Route Guard)
1. Route pembimbingan terletak di folder `/widyaiswara/pembimbingan-naskap`.
2. File pengontrol utama [src/app/widyaiswara/layout.tsx](file:///Users/masboy/Desktop/DATA/Artificial%20Inteligence/PORTALRESMISESPIM/src/app/widyaiswara/layout.tsx) membaca sesi login:
   * Jika tidak ada sesi login, dilempar ke `/login?message=unauthorized`.
   * Pengecekan array role dilakukan:
     ```typescript
     if (['admin', 'super_admin', 'widyaiswara', 'stakeholder', 'serdik'].includes(user.role)) {
       setAuthorized(true); // Akses diizinkan
     } else {
       router.push('/login?message=forbidden'); // Mental ke halaman login
     }
     ```

### Fase 4: Filtrasi & Tampilan Personal (Asistensi & Banner)
1. Setelah lolos otorisasi layout, halaman [src/app/widyaiswara/pembimbingan-naskap/page.tsx](file:///Users/masboy/Desktop/DATA/Artificial%20Inteligence/PORTALRESMISESPIM/src/app/widyaiswara/pembimbingan-naskap/page.tsx) memanggil data bimbingan dari API GET `/api/naskap`.
2. Halaman memfilter list secara cerdas sesuai role pengguna aktif:
   ```typescript
   const displayedSerdikList = serdikList.filter(s => {
     if (!currentUser) return true;
     // Admin, Super Admin, dan Stakeholder bisa melihat seluruh pasangan bimbingan
     if (['super_admin', 'admin', 'stakeholder'].includes(currentUser.role)) return true;
     
     const userNrpNip = currentUser.nrpNip || currentUser.nrp_nip;
     
     // Widyaiswara hanya melihat Serdik yang ditugaskan dibimbing olehnya
     if (currentUser.role === 'widyaiswara') {
       return s.widyaiswaraNip === userNrpNip;
     }
     // Serdik hanya bisa melihat data bimbingan miliknya sendiri
     if (currentUser.role === 'serdik') {
       return s.serdikNrpNip === userNrpNip;
     }
     return true;
   });
   ```
3. Jika data bimbingan ditemukan, antarmuka memunculkan banner status jadwal bimbingan di bagian atas workspace.
4. Jika tidak ada pasangan bimbingan yang cocok di database, layar akan menampilkan pesan pemberitahuan:
   > **Jadwal Pembimbingan Tidak Ditemukan**
   > Akun Anda belum memiliki pasangan pembimbingan atau jadwal asistensi aktif yang terdaftar di database. Silakan hubungi Administrator Sekolah untuk mengatur jadwal bimbingan Anda.

---

## 3. Panduan Pemeliharaan (Maintenance)

### A. Troubleshooting: Data Bimbingan Serdik Kosong / Tidak Ditemukan
Jika perwira siswa (misal: Deny Haryanto) login tetapi mendapatkan pesan *"Jadwal Pembimbingan Tidak Ditemukan"*:
1. Buka file database `src/data/naskap_db.json`.
2. Temukan data bimbingan atas nama Deny Haryanto.
3. Periksa apakah nilai `serdikNrpNip` pada baris data tersebut sama persis dengan `nrpNip` akun yang digunakan untuk login (tidak boleh ada spasi tambahan atau perbedaan digit).
4. Pastikan di form input admin, NRP/NIP perwira siswa diisi dengan benar.

### B. Menambahkan Role Baru yang Diizinkan Mengakses
Jika di masa mendatang terdapat role baru (misal: `'dosen_luar'`) yang diperbolehkan melihat halaman asistensi ini:
1. Buka file `/Users/masboy/Desktop/DATA/Artificial%20Inteligence/PORTALRESMISESPIM/src/app/widyaiswara/layout.tsx`.
2. Tambahkan role baru tersebut ke dalam array pengecekan:
   ```typescript
   if (['admin', 'super_admin', 'widyaiswara', 'stakeholder', 'serdik', 'dosen_luar'].includes(user.role))
   ```
3. Sesuaikan kondisi filtrasi di `src/app/widyaiswara/pembimbingan-naskap/page.tsx` bila role tersebut memerlukan hak filtrasi spesifik.
