export type PageHighlight = {
  label: string
  summary: string
  stats: {
    value: string
    label: string
  }[]
  priorities: string[]
  spotlight: {
    title: string
    description: string
    href?: string
  }[]
  sideNotes: {
    title: string
    body: string
  }[]
  cta?: {
    label: string
    href: string
  }
}

export const pageHighlights: Record<string, PageHighlight> = {
  '/profil': {
    label: 'Kelembagaan',
    summary: 'Pintu masuk informasi identitas, arah strategis, struktur, pejabat, fasilitas, dan kontak kelembagaan Sespim.',
    stats: [
      { value: '7', label: 'Subhalaman profil' },
      { value: '4', label: 'Area informasi inti' },
      { value: '1', label: 'Alur kelembagaan' }
    ],
    priorities: [],
    spotlight: [
      {
        title: 'Arah kelembagaan',
        description: 'Visi, misi, tugas, dan fungsi disiapkan sebagai bagian utama untuk menjelaskan mandat institusi.',
        href: '/profil/visi-misi'
      },
      {
        title: 'Struktur dan pejabat',
        description: 'Pengguna dapat bergerak cepat menuju struktur organisasi dan unsur pimpinan Sespim.',
        href: '/profil/struktur-organisasi'
      },
      {
        title: 'Fasilitas pendidikan',
        description: 'Informasi fasilitas menjadi jembatan menuju gambaran lingkungan pendidikan dan layanan pendukung.',
        href: '/profil/fasilitas'
      }
    ],
    sideNotes: [
      {
        title: 'Konten resmi',
        body: 'Naskah profil dapat diganti dengan konten final setelah approval redaksi kelembagaan.'
      },
      {
        title: 'Kesiapan CMS',
        body: 'Struktur section sudah siap menerima blok teks, kartu pejabat, dan galeri fasilitas.'
      }
    ],
    cta: { label: 'Lihat Struktur Organisasi', href: '/profil/struktur-organisasi' }
  },
  '/profil/sejarah': {
    label: 'Sejarah Kelembagaan',
    summary: 'Perjalanan Sespim sejak 24 September 1964, peresmian pada 19 Maret 1965, perubahan nomenklatur, dan pengembangan kerja sama pendidikan.',
    stats: [
      { value: '1964', label: 'Awal sejarah' },
      { value: '1965', label: 'Peresmian Sespim' },
      { value: '113', label: 'Alumni mancanegara' }
    ],
    priorities: [],
    spotlight: [],
    sideNotes: [],
    cta: { label: 'Lihat Struktur Organisasi', href: '/profil/struktur-organisasi' }
  },
  '/profil/visi-misi': {
    label: 'Arah Strategis',
    summary: 'Visi dan misi Sespim Lemdiklat Polri menegaskan peran pendidikan pengembangan tinggi untuk calon pimpinan Polri yang profesional, strategis, dan berintegritas.',
    stats: [
      { value: '1', label: 'Visi kelembagaan' },
      { value: '4', label: 'Misi utama' },
      { value: '3', label: 'Nilai kepemimpinan' }
    ],
    priorities: [],
    spotlight: [],
    sideNotes: [],
    cta: { label: 'Lihat Tugas dan Fungsi', href: '/profil/tugas-fungsi' }
  },
  '/profil/tugas-fungsi': {
    label: 'Mandat Pendidikan',
    summary: 'Sespim Polri menyelenggarakan pendidikan manajemen berjenjang, pengkajian dan pengembangan kebijakan, serta pengelolaan komponen pendidikan.',
    stats: [
      { value: '3', label: 'Jenjang kepemimpinan' },
      { value: '4', label: 'Fungsi utama' },
      { value: '3', label: 'Komponen dibina' }
    ],
    priorities: [],
    spotlight: [],
    sideNotes: [],
    cta: { label: 'Lihat Struktur Organisasi', href: '/profil/struktur-organisasi' }
  },
  '/profil/pejabat': {
    label: 'Pejabat Utama',
    summary: 'Daftar Pejabat Utama Sespim disiapkan dalam format kartu pas foto 3x4 dengan keterangan Nama, Pangkat, dan Jabatan.',
    stats: [
      { value: '21', label: 'Jabatan utama' },
      { value: '3x4', label: 'Rasio pas foto' },
      { value: '3', label: 'Keterangan inti' }
    ],
    priorities: [
      'Menampilkan daftar pejabat utama dalam kartu yang mudah dipindai.',
      'Menjaga format foto tetap konsisten dengan rasio 3x4.',
      'Menyiapkan field nama, pangkat, dan jabatan agar data resmi dapat dimasukkan bertahap.'
    ],
    spotlight: [
      {
        title: 'Format pas foto',
        description: 'Setiap kartu pejabat menggunakan area foto rasio 3x4 agar tampilan seragam.'
      },
      {
        title: 'Keterangan pejabat',
        description: 'Informasi utama yang disiapkan adalah Nama, Pangkat, dan Jabatan.'
      },
      {
        title: 'Siap dilengkapi',
        description: 'Placeholder nama, pangkat, dan foto dapat diganti saat data resmi pejabat tersedia.'
      }
    ],
    sideNotes: [],
    cta: { label: 'Lihat Struktur Organisasi', href: '/profil/struktur-organisasi' }
  },
  '/program-pendidikan': {
    label: 'Akademik',
    summary: 'Ruang informasi akademik untuk kalender, kurikulum, pedoman, evaluasi, peserta didik, dan program pendidikan utama.',
    stats: [
      { value: '9', label: 'Subhalaman akademik' },
      { value: '4', label: 'Program utama' },
      { value: '3', label: 'Dokumen akademik' }
    ],
    priorities: [
      'Mengarahkan pengguna ke kalender pendidikan, kurikulum, pedoman, dan evaluasi.',
      'Menonjolkan SESPIMMA, SESPIMMEN, SPPK, dan SESPIMTI sebagai pintu program utama.',
      'Membuat informasi akademik mudah dipindai dari mobile sampai desktop.'
    ],
    spotlight: [
      {
        title: 'Kalender dan kurikulum',
        description: 'Dua area awal untuk memahami tahapan pendidikan dan susunan pembelajaran.',
        href: '/program-pendidikan/kalender-pendidikan'
      },
      {
        title: 'Evaluasi pendidikan',
        description: 'Ruang untuk evaluasi pendidikan, penilaian, tata tertib, dan rujukan peserta didik.',
        href: '/program-pendidikan/evaluasi-pendidikan'
      },
      {
        title: 'Program kepemimpinan',
        description: 'Kartu program mengarahkan pengguna menuju SESPIMMA, SESPIMMEN, SPPK, dan SESPIMTI.',
        href: '/program-pendidikan/sespimmen'
      }
    ],
    sideNotes: [
      {
        title: 'Prioritas pengguna',
        body: 'Peserta didik, calon peserta, dan pengelola akademik mendapat jalur akses yang jelas.'
      },
      {
        title: 'Konten lanjutan',
        body: 'Detail kurikulum dan evaluasi dapat dihubungkan dengan data backend pada fase berikutnya.'
      }
    ],
    cta: { label: 'Buka Kalender Pendidikan', href: '/program-pendidikan/kalender-pendidikan' }
  },
  '/program-pendidikan/peserta-didik': {
    label: 'Peserta Didik',
    summary: 'Ruang Informasi Peserta Didik kini menampung akses KKLN, KKDN, PKB JUANG, Leader Expo, Leadership Camp, dan Dashboard Intelijen.',
    stats: [
      { value: '6', label: 'Submenu peserta' },
      { value: '4', label: 'Ruang kegiatan' },
      { value: '1', label: 'Dashboard' }
    ],
    priorities: [
      'Menyediakan pintu akses cepat ke KKLN, KKDN, dan PKB JUANG.',
      'Menyiapkan ruang publikasi Leader Expo dan Leadership Camp untuk agenda, karya, pembinaan, dan dokumentasi peserta didik.',
      'Menyiapkan halaman Dashboard Intelijen sebagai ruang akses informasi sesuai ketentuan pengelola.'
    ],
    spotlight: [
      {
        title: 'KKLN',
        description: 'Ruang informasi kegiatan KKLN, jadwal, peserta, dan dokumen pendukung.',
        href: '/program-pendidikan/peserta-didik/kkln'
      },
      {
        title: 'KKDN',
        description: 'Ruang informasi kegiatan KKDN, jadwal, peserta, dan dokumen pendukung.',
        href: '/program-pendidikan/peserta-didik/kkdn'
      },
      {
        title: 'Leader Expo',
        description: 'Ruang publikasi agenda, karya, presentasi, dan dokumentasi peserta didik.',
        href: '/program-pendidikan/peserta-didik/leader-expo'
      },
      {
        title: 'Leadership Camp',
        description: 'Ruang pembinaan kepemimpinan, karakter, kolaborasi, dan disiplin peserta didik.',
        href: '/program-pendidikan/peserta-didik/leadership-camp'
      }
    ],
    sideNotes: [
      {
        title: 'Konten bertahap',
        body: 'Setiap submenu dapat dilengkapi deskripsi kegiatan, jadwal, dokumen pendukung, dan tautan layanan resmi.'
      },
      {
        title: 'Akses terbatas',
        body: 'Dashboard Intelijen dapat diberi ketentuan akses khusus jika layanan bersifat internal.'
      }
    ],
    cta: { label: 'Buka KKLN', href: '/program-pendidikan/peserta-didik/kkln' }
  },
  '/kelembagaan-internal': {
    label: 'Unit Internal',
    summary: 'Peta unit operasional dan fungsional yang mendukung tata kelola pendidikan dan pengembangan Sespim.',
    stats: [
      { value: '4', label: 'Subhalaman unit' },
      { value: '3', label: 'Fungsi operasional' },
      { value: '1', label: 'Jaringan alumni' }
    ],
    priorities: [
      'Memperjelas fungsi SETLEM, JIANBANG, BIDANG, serta IKAS Alumni sebagai dukungan tracer study JIANBANG.',
      'Menyiapkan layout yang dapat diisi profil unit, layanan, dan kontak internal.',
      'Menjaga navigasi antarunit tetap singkat dan mudah dipahami.'
    ],
    spotlight: [
      {
        title: 'SETLEM',
        description: 'Sekretariat Lembaga untuk rencana program, anggaran, SDM, logistik, pelayanan umum, dan pengamanan markas.',
        href: '/kelembagaan-internal/setlem'
      },
      {
        title: 'JIANBANG',
        description: 'Bagian pengkajian dan pengembangan sistem, manajemen penegakan hukum, kamtibmas, lingkungan strategi, dan pendidikan kepemimpinan.',
        href: '/kelembagaan-internal/jianbang'
      },
      {
        title: 'BIDANG',
        description: 'Bidang strategi, manajemen, hukum, pengetahuan sosial, profesi teknologi, dan pembinaan tenaga pendidik.',
        href: '/kelembagaan-internal/bidang'
      },
      {
        title: 'IKAS Alumni / Tracer Study',
        description: 'Kanal jejaring alumni untuk tracer study, pemetaan alumni, dan dukungan pengembangan kepemimpinan Polri.',
        href: 'https://sespimlemdiklatpolri.id/'
      }
    ],
    sideNotes: [
      {
        title: 'Skalabilitas',
        body: 'Struktur halaman dapat diperluas untuk profil unit, pejabat unit, dan layanan internal.'
      },
      {
        title: 'Konsistensi',
        body: 'Setiap unit memakai pola konten yang sama agar pengguna tidak perlu belajar ulang.'
      }
    ],
    cta: { label: 'Lihat Unit Internal', href: '/kelembagaan-internal/setlem' }
  },
  '/kelembagaan-internal/setlem': {
    label: 'Sekretariat Lembaga',
    summary: 'Setlem mendukung tata kelola Sespim melalui perencanaan program dan anggaran, pembinaan SDM dan logistik, pelayanan umum, serta pengamanan markas.',
    stats: [
      { value: '4', label: 'Area tugas' },
      { value: '2', label: 'Komponen pembinaan' },
      { value: '1', label: 'Dukungan markas' }
    ],
    priorities: [
      'Menjelaskan tugas Setlem dalam penyusunan rencana program dan anggaran.',
      'Menampilkan peran pembinaan SDM dan logistik sebagai dukungan operasional lembaga.',
      'Menegaskan fungsi pelayanan umum dan pengamanan markas untuk kelancaran aktivitas Sespim.'
    ],
    spotlight: [
      {
        title: 'Program dan anggaran',
        description: 'Setlem menyiapkan dukungan perencanaan program serta kebutuhan anggaran kelembagaan.'
      },
      {
        title: 'SDM dan logistik',
        description: 'Pembinaan sumber daya manusia dan logistik menjadi bagian penting dukungan operasional.'
      },
      {
        title: 'Pelayanan markas',
        description: 'Pelayanan umum dan pengamanan markas menjaga lingkungan kerja dan pendidikan tetap tertib.'
      }
    ],
    sideNotes: [
      {
        title: 'Fungsi administratif',
        body: 'Setlem menjadi simpul dukungan administrasi dan operasional agar kegiatan lembaga berjalan tertata.'
      },
      {
        title: 'Dukungan pendidikan',
        body: 'Perencanaan, SDM, logistik, pelayanan umum, dan pengamanan markas mendukung kelancaran pendidikan Sespim.'
      }
    ],
    cta: { label: 'Lihat JIANBANG', href: '/kelembagaan-internal/jianbang' }
  },
  '/kelembagaan-internal/jianbang': {
    label: 'Pengkajian dan Pengembangan',
    summary: 'Bagjianbang melaksanakan pengkajian dan pengembangan sistem dan manajemen penegakan hukum, kamtibmas, lingkungan strategi, keamanan dalam negeri, serta pendidikan kepemimpinan dan manajemen Polri.',
    stats: [
      { value: '5', label: 'Ruang kajian' },
      { value: '2', label: 'Area pengembangan' },
      { value: '1', label: 'Tracer alumni' }
    ],
    priorities: [
      'Menjelaskan tugas Bagjianbang dalam pengkajian dan pengembangan sistem serta manajemen penegakan hukum.',
      'Menampilkan ruang kajian kamtibmas, lingkungan strategi, kepolisian, dan keamanan dalam negeri.',
      'Menegaskan dukungan Bagjianbang terhadap pendidikan kepemimpinan, manajemen, dan tracer study alumni.'
    ],
    spotlight: [
      {
        title: 'Penegakan hukum',
        description: 'Kajian sistem dan manajemen penegakan hukum menjadi dasar dukungan pengembangan kebijakan.'
      },
      {
        title: 'Kamtibmas dan strategi',
        description: 'Bagjianbang mengkaji keamanan dan ketertiban masyarakat serta lingkungan strategi.'
      },
      {
        title: 'Pendidikan kepemimpinan',
        description: 'Hasil kajian mendukung pengembangan pendidikan kepemimpinan dan manajemen Polri.'
      },
      {
        title: 'IKAS Alumni / Tracer Study',
        description: 'Jejaring alumni mendukung pemetaan lulusan, umpan balik kurikulum, dan kajian dampak pendidikan.',
        href: 'https://sespimlemdiklatpolri.id/'
      }
    ],
    sideNotes: [
      {
        title: 'Ruang kajian',
        body: 'Bagjianbang menjadi simpul pengkajian untuk isu penegakan hukum, kamtibmas, strategi, dan keamanan dalam negeri.'
      },
      {
        title: 'Dukungan akademik',
        body: 'Pengembangan kajian membantu menjaga pendidikan kepemimpinan dan manajemen tetap relevan dengan kebutuhan organisasi Polri.'
      }
    ],
    cta: { label: 'Lihat IKAS Alumni', href: 'https://sespimlemdiklatpolri.id/' }
  },
  '/kelembagaan-internal/bidang': {
    label: 'Bidang Pembelajaran',
    summary: 'BIDANG mencakup Bidstra, Bidjemen, Bidkumdang, Bidpengsos, Bidproftek, dan Bidbingadik sebagai unsur perencanaan, penyiapan, pengkajian, penilaian, serta pengembangan pembelajaran.',
    stats: [
      { value: '6', label: 'Sub-bidang' },
      { value: '5', label: 'Bidang studi' },
      { value: '1', label: 'Pembinaan gadik' }
    ],
    priorities: [
      'Menjelaskan peran setiap bidang dalam penyiapan silabus, hanjar, alins, alongins, dan waktu pembelajaran.',
      'Menampilkan fungsi penelitian, pengkajian, penilaian, dan pengembangan sesuai kemajuan ilmu pengetahuan.',
      'Menegaskan dukungan pembinaan Tenaga Pendidik untuk tugas pengajaran dan pelatihan.'
    ],
    spotlight: [
      {
        title: 'Strategi dan manajemen',
        description: 'Bidstra dan Bidjemen menyiapkan perangkat pembelajaran bidang strategi kepolisian serta manajemen.'
      },
      {
        title: 'Hukum dan sosial',
        description: 'Bidkumdang dan Bidpengsos mengembangkan pembelajaran hukum, perundang-undangan, dan pengetahuan sosial.'
      },
      {
        title: 'Profesi, teknologi, dan gadik',
        description: 'Bidproftek dan Bidbingadik mendukung pembelajaran profesi teknologi kepolisian serta pembinaan Tenaga Pendidik.'
      }
    ],
    sideNotes: [
      {
        title: 'Perangkat pembelajaran',
        body: 'Setiap bidang bertanggung jawab pada penyiapan silabus, hanjar, alins, alongins, dan waktu pembelajaran sesuai bidangnya.'
      },
      {
        title: 'Pengembangan keilmuan',
        body: 'Riset, kajian, penilaian, dan pengembangan dilakukan agar materi tetap mengikuti kemajuan ilmu pengetahuan.'
      }
    ],
    cta: { label: 'Lihat IKAS Alumni', href: 'https://sespimlemdiklatpolri.id/' }
  },
  '/widyaiswara': {
    label: 'Tenaga Pendidik',
    summary: 'Widyaiswara Polri adalah pejabat fungsional atau perwira tinggi kepolisian yang bertugas sebagai guru, dosen, pelatih, atau instruktur utama di lembaga pendidikan Polri.',
    stats: [
      { value: '7', label: 'Subhalaman widyaiswara' },
      { value: '3', label: 'Fungsi utama' },
      { value: '4', label: 'Jenjang jabatan' }
    ],
    priorities: [
      'Menjelaskan peran Widyaiswara sebagai pendidik, pengajar, pelatih, dan instruktur utama.',
      'Menampilkan tugas mendidik dan melatih, pengembangan modul, serta penjaminan mutu.',
      'Menyiapkan ruang informasi jenjang jabatan Widyaiswara dari Ahli Pertama sampai Ahli Utama.'
    ],
    spotlight: [
      {
        title: 'Mendidik dan melatih',
        description: 'Widyaiswara memberi pengajaran, pelatihan, dan pembekalan kepada calon pimpinan Polri dan perwira lainnya.',
        href: '/widyaiswara/profil'
      },
      {
        title: 'Pengembangan modul',
        description: 'Widyaiswara menyusun kurikulum dan materi pembelajaran yang digunakan dalam pelatihan.',
        href: '/widyaiswara/materi-terbuka'
      },
      {
        title: 'Penjamin mutu',
        description: 'Widyaiswara memastikan kualitas pelatihan atau pendidikan di lingkungan Polri berjalan sesuai standar.',
        href: '/widyaiswara/lsp-bnsp'
      }
    ],
    sideNotes: [
      {
        title: 'Jenjang jabatan',
        body: 'Jenjang Widyaiswara meliputi Ahli Utama, Ahli Madya, Ahli Muda, dan Ahli Pertama.'
      },
      {
        title: 'Lingkup pendidikan',
        body: 'Peran Widyaiswara mendukung pendidikan peserta didik di lembaga pendidikan Polri seperti Sespim dan Lemdiklat Polri.'
      }
    ],
    cta: { label: 'Buka Profil Widyaiswara', href: '/widyaiswara/profil' }
  },
  '/widyaiswara/materi-terbuka': {
    label: 'Materi Terbuka',
    summary: 'Ruang materi pelatihan dasar Widyaiswara yang disiapkan untuk menampung 8 file bahan ajar dan rujukan pembelajaran.',
    stats: [
      { value: '8', label: 'Materi terdata' },
      { value: '8', label: 'Target file' },
      { value: 'PDF', label: 'Format awal' }
    ],
    priorities: [
      'Menampilkan materi pelatihan dasar Widyaiswara sebagai kartu file yang mudah dipindai.',
      'Menyiapkan tautan file publik agar dokumen dapat dibuka setelah PDF resmi dimasukkan.',
      'Membuat struktur yang dapat dilanjutkan bertahap sampai 8 file materi lengkap.'
    ],
    spotlight: [
      {
        title: 'Rencana pembelajaran',
        description: 'Materi pertama memuat rancang bangun pembelajaran mata pelatihan dan rencana pembelajaran.',
        href: '/files/widyaiswara/1.%20RENCANA%20PEMBELAJARAN%20WIDYAISWARA.pdf'
      },
      {
        title: 'Praktik microteaching',
        description: 'Materi kedua memuat mata pelatihan praktik mengajar atau micro teaching.',
        href: '/files/widyaiswara/2.%20PRAKTIK%20MICROTEACHING.pdf'
      },
      {
        title: 'Media pembelajaran',
        description: 'Materi ketiga memuat panduan penyusunan media pembelajaran.',
        href: '/files/widyaiswara/3.%20PANDUAN%20PENYUSUNAN%20MEDIA%20PEMBELAJARAN.pdf'
      },
      {
        title: 'Pembelajaran orang dewasa',
        description: 'Materi keempat memuat mata pelatihan pembelajaran orang dewasa.',
        href: '/files/widyaiswara/4.%20PEMBELAJARAN%20ORANG%20DEWASA.pdf'
      }
    ],
    sideNotes: [
      {
        title: 'Lokasi file',
        body: 'Simpan PDF resmi di public/files/widyaiswara agar tombol Buka File dapat langsung membuka dokumen.'
      },
      {
        title: 'Status lengkap',
        body: 'Delapan materi pelatihan dasar Widyaiswara sudah terdata sesuai target awal.'
      }
    ],
    cta: { label: 'Buka Pembimbingan Naskap', href: '/widyaiswara/pembimbingan-naskap' }
  },
  '/widyaiswara/pembimbingan-naskap': {
    label: 'Pembimbingan Naskap',
    summary: 'Ruang pedoman pembimbingan dan penulisan akademik untuk mendukung proses penyusunan NASKAP, karya akhir, dan kajian peserta didik.',
    stats: [
      { value: '4', label: 'Pedoman terdata' },
      { value: '4', label: 'Target pedoman' },
      { value: 'PDF', label: 'Format dokumen' }
    ],
    priorities: [
      'Menampilkan pedoman pembimbingan sebagai kartu file yang mudah dipindai.',
      'Menyiapkan tautan file publik agar dokumen dapat dibuka langsung dari halaman.',
      'Membuat struktur yang dapat dilanjutkan bertahap sesuai dokumen resmi yang tersedia.'
    ],
    spotlight: [
      {
        title: 'PPKT Sespimma TA 2026',
        description: 'Pedoman pertama berisi Panduan Penilaian Akademik Sespimma.',
        href: '/files/widyaiswara/9.%20PPKT%20Sespimma%20TA%202026.pdf'
      },
      {
        title: 'PPKT SESPIMMEN 66',
        description: 'Pedoman kedua berisi Panduan Penilaian Akademik Sespimmen dan SPPK.',
        href: '/files/widyaiswara/10.%20PPKT%20SESPIMMEN%2066.pdf'
      },
      {
        title: 'PPKT SESPIMTI FULL HALAMAN FIX',
        description: 'Pedoman ketiga berisi Panduan Penilaian Akademik Sespimti.',
        href: '/files/widyaiswara/PPKT%20SESPIMTI%20FULL%20HALAMAN%20FIX.pdf'
      },
      {
        title: 'PPKT SPPK ANGKATAN KE 2 FIX',
        description: 'Pedoman keempat berisi Panduan Penilaian Akademik SPPK.',
        href: '/files/widyaiswara/PPKT%20SPPK%20ANGKATAN%20KE%202%20FIX.pdf'
      }
    ],
    sideNotes: [
      {
        title: 'Lokasi file',
        body: 'Simpan pedoman resmi di public/files/widyaiswara agar tombol Buka File dapat langsung membuka dokumen.'
      },
      {
        title: 'Status data',
        body: 'Empat pedoman pembimbingan sudah terdata dan dapat diperbarui kembali jika ada dokumen resmi tambahan.'
      }
    ],
    cta: { label: 'Buka Inpassing', href: '/widyaiswara/inpassing' }
  },
  '/publikasi': {
    label: 'Literasi',
    summary: 'Pusat pengetahuan yang menata artikel, policy brief, kajian strategis, naskah akademik, jurnal, resensi, dan karya peserta didik.',
    stats: [
      { value: '7', label: 'Kategori publikasi' },
      { value: '3', label: 'Format strategis' },
      { value: '1', label: 'Ruang karya peserta' }
    ],
    priorities: [
      'Membuat kategori literasi mudah dipindai dan dicari.',
      'Menyiapkan alur listing dan detail untuk fase content berikutnya.',
      'Menjaga gaya akademik yang formal, bersih, dan kredibel.'
    ],
    spotlight: [
      {
        title: 'Policy brief',
        description: 'Ringkasan kebijakan untuk topik kepemimpinan dan keamanan publik.',
        href: '/publikasi/policy-brief'
      },
      {
        title: 'Kajian strategis',
        description: 'Ruang kajian yang dapat menampung isu strategis dan rekomendasi kelembagaan.',
        href: '/publikasi/kajian-strategis'
      },
      {
        title: 'Karya peserta didik',
        description: 'Kanal apresiasi karya akademik peserta didik Sespim.',
        href: '/publikasi/karya-peserta-didik'
      }
    ],
    sideNotes: [
      {
        title: 'Fase berikutnya',
        body: 'Listing, detail, filter, dan pencarian publikasi masuk ke Phase 5.'
      },
      {
        title: 'Kebutuhan metadata',
        body: 'Setiap publikasi idealnya punya penulis, tanggal, kategori, abstrak, dan berkas unduhan.'
      }
    ],
    cta: { label: 'Jelajahi Kajian Strategis', href: '/publikasi/kajian-strategis' }
  },
  '/berita': {
    label: 'Informasi Publik',
    summary: 'Kanal berita, kegiatan, agenda pendidikan, dan informasi publik yang menjaga dinamika kampus tetap terbaca.',
    stats: [
      { value: '3', label: 'Subkanal informasi' },
      { value: '2', label: 'Prioritas publik' },
      { value: '1', label: 'Alur agenda' }
    ],
    priorities: [
      'Memisahkan berita kegiatan, agenda pendidikan, dan informasi publik.',
      'Menyiapkan pola listing untuk update berkala dari redaksi.',
      'Membantu pengguna menemukan informasi terbaru tanpa menelusuri menu panjang.'
    ],
    spotlight: [
      {
        title: 'Berita dan kegiatan',
        description: 'Ruang publikasi aktivitas institusi, kuliah umum, dan kegiatan pendidikan.',
        href: '/berita/kegiatan'
      },
      {
        title: 'Agenda pendidikan',
        description: 'Kanal jadwal dan agenda penting yang berkaitan dengan pelaksanaan pendidikan.',
        href: '/berita/agenda'
      },
      {
        title: 'Informasi publik',
        description: 'Ruang transparansi informasi yang relevan untuk masyarakat dan pemangku kepentingan.',
        href: '/berita/informasi-publik'
      }
    ],
    sideNotes: [
      {
        title: 'Ritme redaksi',
        body: 'Kanal ini siap untuk pola update berkala dari CMS atau dashboard admin.'
      },
      {
        title: 'Akses cepat',
        body: 'Agenda dan informasi publik dibuat sejajar agar tidak tenggelam di bawah berita kegiatan.'
      }
    ],
    cta: { label: 'Lihat Agenda Pendidikan', href: '/berita/agenda' }
  },
  '/berita/kegiatan': {
    label: 'Monitoring Berita',
    summary: 'Kanal berita dan kegiatan diperluas menjadi ruang pantauan media nasional, kanal sosial resmi, video, dan hashtag terkait Sespim Polri.',
    stats: [
      { value: '6+', label: 'Portal berita' },
      { value: '6', label: 'Hashtag Sespim' },
      { value: '5+', label: 'Kanal sosial' }
    ],
    priorities: [
      'Mengumpulkan pintasan pantauan berita eksternal dari sumber nasional dan aggregator berita.',
      'Menjaga publikasi eksternal tetap mengarah ke sumber asli untuk atribusi dan hak cipta.',
      'Memudahkan redaksi mengikuti percakapan publik melalui media sosial dan hashtag Sespim.'
    ],
    spotlight: [
      {
        title: 'Feed berita terbaru',
        description: 'Pantauan Google News berbasis kata kunci Sespim Polri dan Sespim Lemdiklat Polri.'
      },
      {
        title: 'Portal berita nasional',
        description: 'Pintasan menuju pencarian ANTARA, Detik, Kompas, Tempo, CNN Indonesia, dan Google News.'
      },
      {
        title: 'Media sosial dan hashtag',
        description: 'Kanal resmi dan hashtag Sespim disiapkan sebagai titik pantau percakapan publik.'
      }
    ],
    sideNotes: [
      {
        title: 'Redaksi internal',
        body: 'Berita resmi Sespim tetap perlu melewati validasi redaksi sebelum diterbitkan di portal.'
      },
      {
        title: 'Integrasi lanjutan',
        body: 'Feed otomatis dapat diperkuat dengan API resmi, RSS, atau dashboard CMS pada tahap backend.'
      }
    ],
    cta: { label: 'Lihat Informasi Publik', href: '/berita/informasi-publik' }
  },
  '/berita/susunan-redaksi': {
    label: 'Redaksi Portal',
    summary: 'Struktur peran redaksi untuk memastikan konten berita, informasi publik, dokumentasi, dan publikasi resmi melewati pengelolaan yang jelas.',
    stats: [
      { value: '7', label: 'Peran redaksi' },
      { value: '3', label: 'Lapisan verifikasi' },
      { value: '1', label: 'Admin teknis' }
    ],
    priorities: [
      'Menjelaskan siapa yang bertanggung jawab, mengarahkan, memimpin, memverifikasi, dan menerbitkan konten.',
      'Membedakan peran editor, reviewer, admin teknis, dan kontributor agar alur publikasi tertib.',
      'Menyiapkan baseline tata kelola redaksi sebelum integrasi CMS atau dashboard admin.'
    ],
    spotlight: [
      {
        title: 'Penanggung jawab dan pengarah',
        description: 'Kasespim atau pejabat yang ditunjuk serta pejabat utama Sespim/Lemdiklat mengawal arah publikasi.'
      },
      {
        title: 'Pemimpin redaksi dan editor',
        description: 'Pejabat informasi/publikasi bersama tim editor mengelola prioritas, bahasa, substansi, dan dokumentasi.'
      },
      {
        title: 'Reviewer dan admin teknis',
        description: 'Reviewer memastikan kelayakan konten, sementara admin teknis menjaga website, hosting, keamanan, dan backup.'
      }
    ],
    sideNotes: [
      {
        title: 'Nama pejabat',
        body: 'Nama personel dapat ditambahkan setelah penetapan resmi struktur redaksi.'
      },
      {
        title: 'Kesiapan CMS',
        body: 'Struktur ini dapat menjadi dasar role pengelola konten saat dashboard admin diintegrasikan.'
      }
    ],
    cta: { label: 'Buka Berita & Kegiatan', href: '/berita/kegiatan' }
  },
  '/berita/contact': {
    label: 'Contact',
    summary: 'Kanal kontak publik untuk alamat resmi, nomor kontak, email, peta lokasi, media sosial resmi, dan formulir pesan.',
    stats: [
      { value: '6', label: 'Elemen kontak' },
      { value: '3', label: 'Media sosial resmi' },
      { value: '1', label: 'Form kontak' }
    ],
    priorities: [
      'Menempatkan alamat, nomor kontak, dan email resmi dalam struktur yang mudah dipindai.',
      'Menyiapkan area peta lokasi dan kanal media sosial resmi agar pengguna cepat menemukan akses publik.',
      'Menyediakan baseline formulir kontak yang siap dihubungkan ke backend atau dashboard admin.'
    ],
    spotlight: [
      {
        title: 'Alamat dan peta',
        description: 'Ruang untuk alamat resmi dan embed peta lokasi Sespim Lemdiklat Polri.'
      },
      {
        title: 'Nomor dan email',
        description: 'Kanal komunikasi utama yang dapat diisi setelah data resmi dikonfirmasi.'
      },
      {
        title: 'Formulir kontak',
        description: 'Form pesan publik untuk kebutuhan komunikasi awal dengan pengelola portal.'
      }
    ],
    sideNotes: [],
    cta: { label: 'Lihat Informasi Publik', href: '/berita/informasi-publik' }
  },
  '/galeri': {
    label: 'Dokumentasi',
    summary: 'Ruang dokumentasi foto, video, dan jembatan menuju pusat unduhan dokumen resmi.',
    stats: [
      { value: '2', label: 'Format galeri' },
      { value: '4', label: 'Kategori unduhan' },
      { value: '1', label: 'Pusat dokumentasi' }
    ],
    priorities: [
      'Mengarahkan pengguna ke galeri foto dan video kegiatan.',
      'Menghubungkan dokumentasi visual dengan pusat unduhan dokumen.',
      'Menyiapkan grid visual yang dapat diisi aset resmi pada fase konten.'
    ],
    spotlight: [
      {
        title: 'Galeri foto',
        description: 'Area dokumentasi visual kegiatan pendidikan, seremoni, dan aktivitas kampus.',
        href: '/galeri/foto'
      },
      {
        title: 'Galeri video',
        description: 'Ruang konten video untuk dokumentasi kegiatan dan materi publik.',
        href: '/galeri/video'
      },
      {
        title: 'Pusat unduhan',
        description: 'Akses cepat menuju pedoman, template, dan formulir resmi.',
        href: '/unduhan/pedoman-akademik'
      }
    ],
    sideNotes: [
      {
        title: 'Aset visual',
        body: 'Grid sudah siap menerima foto dan video resmi setelah aset disediakan.'
      },
      {
        title: 'Dokumen terkait',
        body: 'Unduhan tetap terhubung dari area ini sesuai struktur navigasi yang tersedia.'
      }
    ],
    cta: { label: 'Buka Galeri Foto', href: '/galeri/foto' }
  },
  '/kontak': {
    label: 'Layanan Publik',
    summary: 'Halaman kontak untuk alamat resmi, peta lokasi, kanal komunikasi, dan arahan awal ke layanan informasi.',
    stats: [
      { value: '3', label: 'Kanal komunikasi' },
      { value: '1', label: 'Alamat utama' },
      { value: '1', label: 'Form kontak siap' }
    ],
    priorities: [
      'Menampilkan alamat, telepon, email, dan peta lokasi secara ringkas.',
      'Menyiapkan area form kontak untuk integrasi backend.',
      'Memberi jalur cepat ke informasi profil dan layanan publik.'
    ],
    spotlight: [
      {
        title: 'Alamat resmi',
        description: 'Ruang informasi lokasi Sespim dan petunjuk kontak awal.'
      },
      {
        title: 'Form kontak',
        description: 'Komponen UI sudah disiapkan sebagai baseline sebelum integrasi pengiriman pesan.'
      },
      {
        title: 'Kanal layanan',
        description: 'Area ini dapat diperluas untuk media sosial, peta, dan kontak unit terkait.'
      }
    ],
    sideNotes: [],
    cta: { label: 'Lihat Profil Sespim', href: '/profil' }
  },
  '/sarana-prasarana': {
    label: 'Layanan Pendukung',
    summary: 'Akses pendukung kegiatan akademik dan kesejahteraan melalui eLibrary, Perpusnas, Ejurnal, LMS SIAPSESPIM, Cek Plagiarisme, Simulasi, Dashboard, Offcampus, dan Klinik Pratama.',
    stats: [
      { value: '9', label: 'Portal pendukung' },
      { value: '8', label: 'Layanan akademik' },
      { value: '1', label: 'Layanan kesehatan' }
    ],
    priorities: [
      'Menghubungkan pengguna ke layanan literasi, pembelajaran, mutu akademik, monitoring, akses jarak jauh, dan kesehatan.',
      'Menjelaskan fungsi tiap layanan secara singkat sebelum masuk ke subhalaman.',
      'Menyiapkan pola kartu layanan yang mudah diperluas.'
    ],
    spotlight: [
      {
        title: 'eLibrary',
        description: 'Kanal literasi dan sumber belajar digital untuk kebutuhan akademik.',
        href: '/sarana-prasarana/elibrary'
      },
      {
        title: 'Perpusnas',
        description: 'Akses pendukung ke layanan Perpustakaan Nasional untuk penelusuran literatur dan referensi ilmiah.',
        href: '/sarana-prasarana/perpusnas'
      },
      {
        title: 'Ejurnal',
        description: 'Akses pendukung jurnal dan artikel ilmiah untuk kebutuhan riset dan penulisan akademik.',
        href: '/sarana-prasarana/ejurnal'
      },
      {
        title: 'LMS SIAPSESPIM',
        description: 'Gerbang pembelajaran digital dan pengelolaan aktivitas akademik melalui portal resmi SIAPSESPIM.',
        href: '/sarana-prasarana/lms-siapsespim'
      },
      {
        title: 'Cek Plagiarisme',
        description: 'Layanan pendukung pemeriksaan kemiripan naskah akademik dan dokumen pembelajaran.',
        href: '/sarana-prasarana/cek-plagiarisme'
      },
      {
        title: 'Simulasi',
        description: 'Layanan pendukung latihan, pembelajaran berbasis skenario, dan penguatan kompetensi.',
        href: '/sarana-prasarana/simulasi'
      },
      {
        title: 'Dashboard',
        description: 'Ruang pemantauan informasi akademik, layanan digital, dan kebutuhan monitoring.',
        href: '/sarana-prasarana/dashboard'
      },
      {
        title: 'Offcampus',
        description: 'Media blended learning untuk kelas daring, Google Meet, LMS, penugasan, dan referensi digital offcampus.',
        href: '/sarana-prasarana/offcampus'
      },
      {
        title: 'Klinik Pratama',
        description: 'Informasi layanan kesehatan pendukung kesejahteraan peserta didik dan personel.',
        href: '/sarana-prasarana/klinik-pratama'
      }
    ],
    sideNotes: [
      {
        title: 'Portal eksternal',
        body: 'LMS SIAPSESPIM telah terhubung ke portal resmi https://siapsespimpolri.id/.'
      },
      {
        title: 'Kebutuhan akses',
        body: 'Beberapa layanan dapat membutuhkan autentikasi pada fase integrasi.'
      }
    ],
    cta: { label: 'Buka LMS SIAPSESPIM', href: '/sarana-prasarana/lms-siapsespim' }
  }
}

pageHighlights['/profil/kontak/contact'] = pageHighlights['/berita/contact']
pageHighlights['/profil/kontak/susunan-redaksi'] = pageHighlights['/berita/susunan-redaksi']
pageHighlights['/sarana-prasarana/klinik-pratama'] = {
  label: 'Klinik Pratama',
  summary: 'Layanan kesehatan Sespim Polri dengan informasi pendaftaran pasien, rawat jalan, rawat inap, UGD 24 jam, jam layanan, kontak, lokasi, dan antrian.',
  stats: [
    { value: '4', label: 'Layanan utama' },
    { value: '24 jam', label: 'UGD' },
    { value: '2', label: 'Kanal kontak' }
  ],
  priorities: [
    'Menghubungkan pengguna ke website resmi Klinik Pratama Sespim Polri.',
    'Menampilkan layanan utama, jam layanan, kontak, lokasi, dan akses antrian pasien.',
    'Menjadikan halaman klinik sebagai pintu layanan kesehatan pada area Sarana Prasarana.'
  ],
  spotlight: [
    {
      title: 'Website klinik',
      description: 'Akses resmi untuk profil, fasilitas, kegiatan, pelayanan, informasi, kontak, dan antrian.',
      href: 'https://klinik-sespimpolri.com/'
    },
    {
      title: 'Antrian pasien',
      description: 'Tautan menuju aplikasi antrian pasien Klinik Pratama Sespim Polri.',
      href: 'https://app.klinik-sespimpolri.com/'
    },
    {
      title: 'Kontak layanan',
      description: 'Telepon dan WhatsApp klinik ditampilkan untuk kebutuhan informasi layanan kesehatan.'
    }
  ],
  sideNotes: [
    {
      title: 'Sumber resmi',
      body: 'Konten diringkas dari website Klinik Pratama Sespim Polri.'
    },
    {
      title: 'Pemutakhiran data',
      body: 'Jam layanan, kontak, dan layanan klinik perlu diperbarui jika ada perubahan pada website resmi.'
    }
  ],
  cta: { label: 'Buka Website Klinik', href: 'https://klinik-sespimpolri.com/' }
}
