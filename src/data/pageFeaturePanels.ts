export type PageFeaturePanel = {
  eyebrow: string
  title: string
  description: string
  items: {
    title: string
    description: string
    meta: string
    href?: string
  }[]
}

export const pageFeaturePanels: Record<string, PageFeaturePanel> = {
  '/profil': {
    eyebrow: 'Peta Profil',
    title: 'Informasi kelembagaan disusun dari mandat sampai layanan kontak',
    description: 'Panel ini membantu pengguna memahami urutan informasi profil sebelum masuk ke subhalaman yang lebih rinci.',
    items: [
      {
        title: 'Sejarah dan mandat',
        description: 'Ringkasan latar kelembagaan dan peran Sespim dalam pendidikan kepemimpinan Polri.',
        meta: 'Identitas',
        href: '/profil/sejarah'
      },
      {
        title: 'Arah strategis',
        description: 'Visi, misi, tugas, dan fungsi menjadi dasar narasi institusi yang perlu tampil konsisten.',
        meta: 'Strategi',
        href: '/profil/visi-misi'
      },
      {
        title: 'Struktur dan pejabat',
        description: 'Kanal untuk memperkenalkan tata organisasi dan unsur pimpinan secara formal.',
        meta: 'Organisasi',
        href: '/profil/struktur-organisasi'
      },
      {
        title: 'Fasilitas dan kontak',
        description: 'Jembatan menuju fasilitas pendidikan serta kontak profil yang relevan untuk pengguna.',
        meta: 'Layanan',
        href: '/profil/fasilitas'
      }
    ]
  },
  '/program-pendidikan': {
    eyebrow: 'Peta Akademik',
    title: 'Alur akademik dibuat mudah dipindai dari jadwal sampai program utama',
    description: 'Struktur ini memisahkan informasi operasional pendidikan, rujukan akademik, dan pintu masuk program kepemimpinan.',
    items: [
      {
        title: 'Kalender dan kurikulum',
        description: 'Menampilkan tahapan pendidikan, kalender kegiatan, dan struktur pembelajaran umum.',
        meta: 'Perencanaan',
        href: '/program-pendidikan/kalender-pendidikan'
      },
      {
        title: 'Pedoman dan evaluasi',
        description: 'Ruang untuk aturan akademik, tata tertib, penilaian, dan mekanisme monitoring.',
        meta: 'Rujukan',
        href: '/program-pendidikan/pedoman-akademik'
      },
      {
        title: 'Peserta didik',
        description: 'Informasi layanan akademik dan kebutuhan peserta didik selama proses pendidikan.',
        meta: 'Layanan',
        href: '/program-pendidikan/peserta-didik'
      },
      {
        title: 'Program kepemimpinan',
        description: 'Akses menuju SESPIMMA, SESPIMMEN, SPPK, dan SESPIMTI sebagai program utama.',
        meta: 'Program',
        href: '/program-pendidikan/sespimma'
      }
    ]
  },
  '/program-pendidikan/peserta-didik': {
    eyebrow: 'Peta Peserta Didik',
    title: 'Informasi peserta didik dibagi ke kegiatan, expo, dan dashboard pendukung',
    description: 'Panel ini menjadi pintu cepat menuju KKLN, KKDN, PKB JUANG, Leader Expo, Leadership Camp, dan Dashboard Intelijen.',
    items: [
      {
        title: 'KKLN',
        description: 'Ruang informasi kegiatan KKLN, jadwal, peserta, dan dokumen pendukung.',
        meta: 'Kegiatan',
        href: '/program-pendidikan/peserta-didik/kkln'
      },
      {
        title: 'KKDN',
        description: 'Ruang informasi kegiatan KKDN, jadwal, peserta, dan dokumen pendukung.',
        meta: 'Kegiatan',
        href: '/program-pendidikan/peserta-didik/kkdn'
      },
      {
        title: 'PKB JUANG',
        description: 'Ruang informasi agenda PKB JUANG dan kebutuhan kegiatan peserta didik.',
        meta: 'Agenda',
        href: '/program-pendidikan/peserta-didik/pkb-juang'
      },
      {
        title: 'Leader Expo',
        description: 'Ruang publikasi agenda, karya, presentasi, dan dokumentasi peserta didik.',
        meta: 'Expo',
        href: '/program-pendidikan/peserta-didik/leader-expo'
      },
      {
        title: 'Leadership Camp',
        description: 'Ruang informasi pembinaan kepemimpinan, karakter, kolaborasi, dan disiplin peserta didik.',
        meta: 'Kepemimpinan',
        href: '/program-pendidikan/peserta-didik/leadership-camp'
      },
      {
        title: 'Dashboard Intelijen',
        description: 'Ruang akses informasi dashboard pendukung sesuai ketentuan pengelola.',
        meta: 'Dashboard',
        href: '/program-pendidikan/peserta-didik/dashboard-intelijen'
      }
    ]
  },
  '/kelembagaan-internal': {
    eyebrow: 'Peta Unit',
    title: 'Unit internal ditata sebagai dukungan operasional pendidikan',
    description: 'Panel ini memberi gambaran ringkas peran unit sebelum pengguna menelusuri halaman SETLEM, JIANBANG, BIDANG, serta IKAS Alumni sebagai dukungan tracer study JIANBANG.',
    items: [
      {
        title: 'SETLEM',
        description: 'Penyusunan rencana program dan anggaran, pembinaan SDM dan logistik, pelayanan umum, serta pengamanan markas.',
        meta: 'Administrasi',
        href: '/kelembagaan-internal/setlem'
      },
      {
        title: 'JIANBANG',
        description: 'Pengkajian dan pengembangan sistem, manajemen penegakan hukum, kamtibmas, lingkungan strategi, keamanan dalam negeri, serta pendidikan kepemimpinan.',
        meta: 'Kajian',
        href: '/kelembagaan-internal/jianbang'
      },
      {
        title: 'BIDANG',
        description: 'Bidang strategi, manajemen, hukum, pengetahuan sosial, profesi teknologi, dan pembinaan Tenaga Pendidik.',
        meta: 'Operasional',
        href: '/kelembagaan-internal/bidang'
      },
      {
        title: 'IKAS Alumni / Tracer Study',
        description: 'Jejaring alumni dan tracer study sebagai bahan pengkajian, pemetaan alumni, serta pengembangan pendidikan.',
        meta: 'JIANBANG',
        href: '/kelembagaan-internal/jianbang/ikas-alumni'
      }
    ]
  },
  '/widyaiswara': {
    eyebrow: 'Peta Akademisi',
    title: 'Widyaiswara menjadi penggerak pendidikan, pelatihan, dan mutu pembelajaran',
    description: 'Area ini menempatkan Widyaiswara sebagai guru, dosen, pelatih, instruktur utama, pengembang modul, dan penjamin mutu pendidikan Polri.',
    items: [
      {
        title: 'Profil Widyaiswara',
        description: 'Daftar pejabat fungsional atau perwira tinggi kepolisian yang bertugas sebagai tenaga pendidik.',
        meta: 'Profil',
        href: '/widyaiswara/profil'
      },
      {
        title: 'Bidang keahlian',
        description: 'Pemetaan kompetensi Widyaiswara untuk mendukung pengajaran, pelatihan, dan pembekalan peserta didik.',
        meta: 'Kompetensi',
        href: '/widyaiswara/bidang-keahlian'
      },
      {
        title: 'Publikasi Widyaiswara',
        description: 'Repository karya buku, jurnal, pemikiran, dan kajian Widyaiswara sebagai referensi akademik.',
        meta: 'Karya',
        href: '/widyaiswara/publikasi'
      },
      {
        title: 'Pembimbingan naskap',
        description: 'Informasi pendampingan naskah akademik dan penguatan mutu pendidikan peserta didik.',
        meta: 'Pembimbingan',
        href: '/widyaiswara/pembimbingan-naskap'
      },
      {
        title: 'Inpassing',
        description: 'Informasi penyesuaian jabatan fungsional dan pembinaan tenaga pendidik.',
        meta: 'Jabatan',
        href: '/widyaiswara/inpassing'
      },
      {
        title: 'LSP / BNSP',
        description: 'Ruang informasi sertifikasi, kompetensi, dan penjaminan mutu tenaga pendidik.',
        meta: 'Sertifikasi',
        href: 'https://lsppolri.id/'
      }
    ]
  },
  '/publikasi': {
    eyebrow: 'Peta Literasi',
    title: 'Kategori publikasi dipisahkan berdasarkan format dan kebutuhan pembaca',
    description: 'Panel ini menyiapkan orientasi sebelum Phase 5 menambahkan listing, detail, filter, dan metadata publikasi.',
    items: [
      {
        title: 'Artikel dan resensi',
        description: 'Format ringan untuk opini, telaah bacaan, dan pengayaan literasi kepemimpinan.',
        meta: 'Literasi',
        href: '/publikasi/artikel'
      },
      {
        title: 'Policy brief',
        description: 'Ringkasan rekomendasi kebijakan yang membutuhkan struktur tegas dan mudah dikutip.',
        meta: 'Kebijakan',
        href: '/publikasi/policy-brief'
      },
      {
        title: 'Kajian strategis',
        description: 'Ruang analisis mendalam untuk isu institusi, keamanan, dan kepemimpinan.',
        meta: 'Strategis',
        href: '/publikasi/kajian-strategis'
      },
      {
        title: 'Karya peserta didik',
        description: 'Kanal apresiasi karya akademik yang dapat dikembangkan menjadi repository internal.',
        meta: 'Akademik',
        href: '/publikasi/karya-peserta-didik'
      }
    ]
  },
  '/berita': {
    eyebrow: 'Peta Informasi',
    title: 'Informasi publik dipisahkan antara kegiatan, agenda, dan transparansi',
    description: 'Susunan ini membuat kanal berita siap menerima pembaruan redaksi tanpa mencampur kebutuhan pembaca yang berbeda.',
    items: [
      {
        title: 'Berita kegiatan',
        description: 'Kabar aktivitas kampus, kuliah umum, seremoni, dan dinamika pendidikan.',
        meta: 'Kegiatan',
        href: '/berita/kegiatan'
      },
      {
        title: 'Agenda pendidikan',
        description: 'Jadwal penting yang perlu terlihat cepat bagi peserta didik dan pengelola akademik.',
        meta: 'Agenda',
        href: '/berita/agenda'
      },
      {
        title: 'Informasi publik',
        description: 'Ruang transparansi informasi yang relevan untuk masyarakat dan pemangku kepentingan.',
        meta: 'Publik',
        href: '/berita/informasi-publik'
      }
    ]
  },
  '/berita/susunan-redaksi': {
    eyebrow: 'Peta Redaksi',
    title: 'Pengelolaan konten dibagi dari penanggung jawab sampai kontributor',
    description: 'Panel ini membuat susunan redaksi mudah dipahami sebagai tata kelola publikasi, bukan sekadar daftar jabatan.',
    items: [
      {
        title: 'Pimpinan redaksi',
        description: 'Penanggung jawab, pengarah, dan pemimpin redaksi mengawal arah serta prioritas publikasi.',
        meta: 'Pimpinan'
      },
      {
        title: 'Verifikasi konten',
        description: 'Editor dan reviewer memastikan bahasa, substansi, dokumentasi, dan kelayakan publikasi.',
        meta: 'Mutu'
      },
      {
        title: 'Teknis publikasi',
        description: 'Admin teknis mengelola website, hosting, keamanan, backup, dan kesiapan operasional portal.',
        meta: 'Teknis'
      },
      {
        title: 'Sumber kontribusi',
        description: 'Kontributor berasal dari Sespimma, Sespimmen, Sespimti, Widyaiswara, dan bagian akademik.',
        meta: 'Kontributor'
      }
    ]
  },
  '/berita/contact': {
    eyebrow: 'Peta Contact',
    title: 'Kanal komunikasi publik disusun dari lokasi sampai formulir pesan',
    description: 'Panel ini memastikan halaman Contact tidak hanya menjadi teks alamat, tetapi ruang layanan yang siap diintegrasikan.',
    items: [
      {
        title: 'Alamat dan peta lokasi',
        description: 'Area alamat resmi dan peta lokasi untuk membantu pengunjung menemukan Sespim Lemdiklat Polri.',
        meta: 'Lokasi'
      },
      {
        title: 'Nomor kontak dan email',
        description: 'Field komunikasi resmi disiapkan agar dapat langsung diisi setelah data final dikonfirmasi.',
        meta: 'Kontak'
      },
      {
        title: 'Media sosial resmi',
        description: 'Kanal Instagram, Facebook, dan YouTube yang sudah tersedia di footer juga ditampilkan pada halaman Contact.',
        meta: 'Sosial'
      },
      {
        title: 'Formulir kontak',
        description: 'Baseline form pesan publik yang siap terhubung ke backend atau dashboard admin.',
        meta: 'Form'
      }
    ]
  },
  '/galeri': {
    eyebrow: 'Peta Dokumentasi',
    title: 'Dokumentasi visual diarahkan ke foto, video, dan dokumen terkait',
    description: 'Panel ini menjaga galeri tetap menjadi ruang dokumentasi, bukan sekadar daftar album kosong.',
    items: [
      {
        title: 'Galeri foto',
        description: 'Grid visual untuk kegiatan pendidikan, seremoni, dan dokumentasi institusi.',
        meta: 'Foto',
        href: '/galeri/foto'
      },
      {
        title: 'Galeri video',
        description: 'Ruang video kegiatan, materi publik, atau dokumentasi yang membutuhkan pemutar media.',
        meta: 'Video',
        href: '/galeri/video'
      },
      {
        title: 'Dokumen pendukung',
        description: 'Jembatan menuju unduhan yang relevan dengan kegiatan atau kebutuhan akademik.',
        meta: 'Dokumen',
        href: '/unduhan'
      },
      {
        title: 'Kurasi aset',
        description: 'Aset resmi dapat diberi metadata album, tanggal, lokasi, dan kategori kegiatan.',
        meta: 'Kurasi'
      }
    ]
  },
  '/unduhan': {
    eyebrow: 'Peta Dokumen',
    title: 'Dokumen penting disusun berdasarkan kebutuhan akademik dan administrasi',
    description: 'Panel ini menjadi baseline UI untuk pusat unduhan sebelum file resmi dan metadata dokumen diintegrasikan.',
    items: [
      {
        title: 'Pedoman akademik',
        description: 'Dokumen rujukan utama untuk tata kelola pendidikan dan aturan akademik.',
        meta: 'Pedoman',
        href: '/unduhan/pedoman-akademik'
      },
      {
        title: 'Template NASKAP',
        description: 'Format naskah akademik untuk mendukung penyusunan karya peserta didik.',
        meta: 'Template',
        href: '/unduhan/template-naskap'
      },
      {
        title: 'Template policy brief',
        description: 'Format ringkas untuk publikasi rekomendasi kebijakan dan analisis strategis.',
        meta: 'Template',
        href: '/unduhan/template-policy-brief'
      },
      {
        title: 'Formulir umum',
        description: 'Kanal formulir administratif yang dapat diberi versi dan tanggal pembaruan.',
        meta: 'Formulir',
        href: '/unduhan/formulir'
      }
    ]
  },
  '/kontak': {
    eyebrow: 'Peta Kontak',
    title: 'Kanal komunikasi disiapkan untuk informasi lokasi dan layanan publik',
    description: 'Area kontak dibuat lebih operasional dengan pembagian kanal yang siap dihubungkan ke data resmi.',
    items: [
      {
        title: 'Alamat dan peta',
        description: 'Ruang untuk lokasi resmi, petunjuk akses, dan embed peta pada fase integrasi.',
        meta: 'Lokasi'
      },
      {
        title: 'Telepon dan email',
        description: 'Kanal komunikasi utama yang perlu diverifikasi sebelum publikasi final.',
        meta: 'Kontak'
      },
      {
        title: 'Form pesan',
        description: 'Baseline UI untuk pengiriman pesan yang nantinya dapat terhubung ke API.',
        meta: 'Form'
      },
      {
        title: 'Tautan profil',
        description: 'Pengguna tetap diberi jalur balik ke profil kelembagaan jika membutuhkan konteks institusi.',
        meta: 'Navigasi',
        href: '/profil'
      }
    ]
  },
  '/sarana-prasarana': {
    eyebrow: 'Peta Layanan',
    title: 'Portal pendukung untuk literasi, pembelajaran, mutu akademik, akses digital, dan kesehatan',
    description: 'Panel ini membuat halaman sarana prasarana terasa sebagai direktori layanan, bukan hanya daftar tautan.',
    items: [
      {
        title: 'eLibrary',
        description: 'Sumber belajar digital dan literasi akademik untuk peserta didik dan tenaga pendidik.',
        meta: 'Literasi',
        href: '/sarana-prasarana/elibrary'
      },
      {
        title: 'Perpusnas',
        description: 'Akses pendukung ke layanan Perpustakaan Nasional untuk penelusuran literatur dan referensi ilmiah.',
        meta: 'Literasi',
        href: 'https://satudata.perpusnas.go.id/'
      },
      {
        title: 'Ejurnal',
        description: 'Akses pendukung jurnal dan artikel ilmiah untuk kebutuhan riset dan penulisan akademik.',
        meta: 'Referensi',
        href: '/sarana-prasarana/ejurnal'
      },
      {
        title: 'LMS SIAPSESPIM',
        description: 'Gerbang pembelajaran digital, aktivitas kelas, dan pengelolaan materi pendidikan.',
        meta: 'Pembelajaran',
        href: '/sarana-prasarana/lms-siapsespim'
      },
      {
        title: 'Cek Plagiarisme',
        description: 'Layanan pendukung pemeriksaan kemiripan naskah akademik dan dokumen pembelajaran.',
        meta: 'Mutu Akademik',
        href: '/sarana-prasarana/cek-plagiarisme'
      },
      {
        title: 'Simulasi',
        description: 'Layanan pendukung latihan, pembelajaran berbasis skenario, dan penguatan kompetensi.',
        meta: 'Latihan',
        href: '/sarana-prasarana/simulasi'
      },
      {
        title: 'Dashboard',
        description: 'Ruang pemantauan informasi akademik, layanan digital, dan kebutuhan monitoring.',
        meta: 'Monitoring',
        href: '/sarana-prasarana/dashboard'
      },
      {
        title: 'Offcampus',
        description: 'Media blended learning untuk kelas Google Meet, LMS, penugasan, dan akses referensi dari luar kampus.',
        meta: 'Akses Jarak Jauh',
        href: '/sarana-prasarana/offcampus'
      },
      {
        title: 'Klinik Pratama',
        description: 'Informasi layanan kesehatan dan dukungan kesejahteraan lingkungan pendidikan.',
        meta: 'Kesehatan',
        href: '/sarana-prasarana/klinik-pratama'
      },
      {
        title: 'Kesiapan akses',
        description: 'Tautan eksternal, status akses, dan kebutuhan autentikasi dapat ditambahkan setelah approval.',
        meta: 'Integrasi'
      }
    ]
  }
}

pageFeaturePanels['/profil/kontak/contact'] = pageFeaturePanels['/berita/contact']
pageFeaturePanels['/profil/kontak/susunan-redaksi'] = pageFeaturePanels['/berita/susunan-redaksi']
