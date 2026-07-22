import type { PageContent } from '@/types'

export const pages: Record<string, PageContent> = {
  '/profil': {
    title: "Peta Profil",
    eyebrow: "Kelembagaan",
    description: "Informasi kelembagaan disusun dari mandat sampai layanan kontak",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Informasi kelembagaan disusun dari mandat sampai layanan kontak.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/profil/sejarah': {
    title: "Sejarah Sespim",
    eyebrow: "Profil",
    description: "Sejarah Sespim Lemdiklat Polri sebagai lembaga pendidikan kepemimpinan dan manajemen yang berkembang sejak 24 September 1964.",
    sections: [
      {
        title: 'Awal Berdirinya Sespim',
        body: "Sejarah Sespim berawal pada tanggal 24 September 1964. Sespim Lemdiklat Polri sebagai lembaga pendidikan kepemimpinan dan manajemen berdiri dan diresmikan oleh Presiden Republik Indonesia Ir. Soekarno di Istana Bogor pada tanggal 19 Maret 1965.",
        items: [
          '24 September 1964 menjadi awal sejarah Sespim.',
          '19 Maret 1965 Sespim diresmikan oleh Presiden Republik Indonesia Ir. Soekarno.',
          'Angkatan pertama dibuka dengan sebutan Sekolah Staf dan Komando Angkatan Kepolisian (SESKOAK).'
        ]
      },
      {
        title: 'Perubahan Nomenklatur dan Kedudukan',
        body: 'Dalam perjalanannya, Sespim Polri mengalami beberapa perubahan nomenklatur dan kedudukan organisasi sesuai perkembangan kelembagaan Polri.',
        items: [
          '1 Juli 1969: SESKOAK menjadi Sekolah Staf dan Komando Angkatan Kepolisian (SESKOPOL).',
          'Tahun 1974: SESKOPOL berubah menjadi Sesko ABRI Bagian Kepolisian.',
          '30 Oktober 1984: Sesko ABRI Bagian Kepolisian berubah menjadi Sespim Polri.',
          '25 Mei 2001: Sespim Polri berada di bawah Dediklat Kapolri.',
          '17 Oktober 2002: Sespim Polri kembali langsung berada di bawah Kapolri.',
          '14 September 2010: seluruh lembaga pendidikan Polri berada di bawah Lemdikpol.'
        ]
      },
      {
        title: 'Lemdiklat Polri dan Kerja Sama Pendidikan',
        body: 'Selanjutnya nomenklatur Lemdikpol berubah menjadi Lembaga Pendidikan dan Latihan Polri yang disingkat Lemdiklat Polri, berdasarkan Peraturan Presiden Republik Indonesia Nomor 5 Tahun 2017 tentang Perubahan atas Peraturan Presiden Nomor 52 Tahun 2010 tentang Susunan Organisasi dan Tata Kerja Kepolisian Negara Republik Indonesia. Sespim Polri juga mengembangkan kerja sama dengan menerima peserta dari instansi lain seperti TNI Angkatan Darat, Angkatan Laut, Angkatan Udara, unsur Criminal Justice System, serta peserta didik dari mancanegara.',
        items: [
          'Peserta didik berasal dari Polri, TNI, unsur Criminal Justice System, dan negara sahabat.',
          'Alumni mancanegara berjumlah 113 orang dari 14 negara.',
          'Negara asal alumni meliputi Arab Saudi, Malaysia, Nigeria, Papua New Guinea, Madagaskar, Brunei Darussalam, Filipina, Thailand, Singapura, Timor Leste, Kamboja, Rumania, Mozambik, dan Fiji.'
        ]
      },
      {
        title: 'Tujuan Pendidikan Sespim Polri',
        body: 'Dari uraian tentang tugas, fungsi, dan tujuan lembaga pendidikan, Sespim Polri diarahkan untuk menghasilkan Perwira Polri yang profesional, modern, dan terpercaya, serta mampu melaksanakan tugas sebagai manajer pada tingkat pertama, menengah, dan tinggi sesuai jenjang pendidikan peserta didik.',
        items: [
          'Menghasilkan pemimpin yang siap memimpin organisasi Polri maupun instansi lainnya.',
          'Membentuk kemampuan manajerial sesuai tingkat pendidikan peserta didik.',
          'Memperkuat profesionalisme, modernitas, dan kepercayaan dalam pelaksanaan tugas.'
        ]
      }
    ]
  },
  '/profil/visi-misi': {
    title: "Visi dan Misi",
    eyebrow: "Profil",
    description: "Visi dan misi Sespim Lemdiklat Polri sebagai lembaga pendidikan pengembangan tinggi Polri yang menyiapkan calon pimpinan profesional, strategis, dan berintegritas.",
    sections: [
      {
        title: 'Visi Sespim Lemdiklat Polri',
        body: "Visi Sespim Lemdiklat Polri adalah menjadi lembaga pendidikan pengembangan tinggi Polri yang berkualitas dalam mendidik calon pimpinan Polri yang memiliki profesionalisme, wawasan kepemimpinan strategi, dan komitmen kuat terhadap integritas moral sebagai pelindung, pengayom, dan pelayan masyarakat.",
        items: [
          'Menjadi lembaga pendidikan pengembangan tinggi Polri yang berkualitas.',
          'Mendidik calon pimpinan Polri yang profesional.',
          'Membangun wawasan kepemimpinan strategi.',
          'Memperkuat integritas moral sebagai pelindung, pengayom, dan pelayan masyarakat.'
        ]
      },
      {
        title: 'Misi Sespim Lemdiklat Polri',
        body: 'Misi Sespim Lemdiklat Polri diarahkan untuk menyelenggarakan pendidikan calon pemimpin, pengkajian dan pengembangan kebijakan, pelayanan informasi hasil kajian, konsultasi manajemen kepolisian, serta pendidikan lainnya di bidang manajemen keamanan dan ketertiban masyarakat.',
        items: [
          'Menyelenggarakan pendidikan calon pemimpin untuk tingkat pertama, tingkat menengah, dan tingkat tinggi Polri serta penegak hukum lainnya.',
          'Menyelenggarakan pengkajian dan pengembangan kebijakan serta strategi kepolisian, peradilan pidana, keamanan, dan ketertiban masyarakat.',
          'Menyelenggarakan pelayanan informasi hasil pengkajian dan pengembangan, konsultasi manajemen kepolisian, keamanan, dan ketertiban masyarakat.',
          'Menyelenggarakan pendidikan lainnya di bidang manajemen keamanan dan ketertiban masyarakat.'
        ]
      }
    ]
  },
  '/profil/tugas-fungsi': {
    title: "Tugas dan Fungsi",
    eyebrow: "Profil",
    description: "Tugas dan fungsi Sespim Polri dalam pendidikan manajemen berjenjang, pengkajian kebijakan, pengembangan kebijakan, serta pengelolaan komponen pendidikan di lingkungan Polri.",
    sections: [
      {
        title: 'Tugas Pokok',
        body: "Sespim Polri bertugas menyelenggarakan pendidikan manajemen tingkat tinggi, tingkat menengah, dan tingkat pertama; pengkajian dan pengembangan kebijakan; serta mengelola komponen pendidikan di lingkungan Polri.",
        items: [
          'Pendidikan manajemen tingkat tinggi.',
          'Pendidikan manajemen tingkat menengah.',
          'Pendidikan manajemen tingkat pertama.',
          'Pengkajian dan pengembangan kebijakan.',
          'Pengelolaan komponen pendidikan di lingkungan Polri.'
        ]
      },
      {
        title: 'Fungsi Pendidikan dan Pelatihan',
        body: 'Dalam menjalankan tugasnya, Sespim Polri menyelenggarakan pendidikan dan pelatihan staf serta kepemimpinan tingkat tinggi, tingkat menengah, dan tingkat pertama bagi perwira Polri maupun penegak hukum lainnya.',
        items: [
          'Pendidikan dan pelatihan staf tingkat tinggi.',
          'Pendidikan dan pelatihan kepemimpinan tingkat menengah.',
          'Pendidikan dan pelatihan kepemimpinan tingkat pertama.',
          'Peserta berasal dari perwira Polri maupun penegak hukum lainnya.'
        ]
      },
      {
        title: 'Fungsi Manajemen dan Pembinaan Komponen',
        body: 'Sespim Polri menyelenggarakan pendidikan dan pelatihan manajemen bagi perwira Polri maupun non-Polri, serta melaksanakan pembinaan sumber daya manusia, logistik, dan keuangan di lingkungan Sespim Polri.',
        items: [
          'Pendidikan dan pelatihan manajemen bagi perwira Polri.',
          'Pendidikan dan pelatihan manajemen bagi peserta non-Polri.',
          'Pembinaan sumber daya manusia.',
          'Pembinaan logistik dan keuangan di lingkungan Sespim Polri.'
        ]
      },
      {
        title: 'Fungsi Pengkajian dan Pengembangan',
        body: 'Sespim Polri melaksanakan pengkajian dan pengembangan manajemen, kebijakan, serta lingkungan strategis di jajaran Polri sebagai dukungan terhadap peningkatan kualitas organisasi dan pendidikan kepemimpinan.',
        items: [
          'Pengkajian manajemen di jajaran Polri.',
          'Pengembangan kebijakan organisasi.',
          'Analisis lingkungan strategis.',
          'Dukungan kajian bagi peningkatan kualitas pendidikan dan manajemen Polri.'
        ]
      }
    ]
  },
  '/profil/struktur-organisasi': {
    title: "Struktur Organisasi",
    eyebrow: "Profil",
    description: "Struktur organisasi dan tata kerja Sespim Polri dalam mendukung tata kelola kelembagaan.",
    media: {
      src: '/images/struktur-sespim.png',
      alt: 'Bagan struktur organisasi Sespim Lemdiklat Polri',
      caption: 'Struktur organisasi Sespim Lemdiklat Polri.'
    },
    sections: []
  },
  '/profil/pejabat': {
    title: "Pejabat Sespim",
    eyebrow: "Profil",
    description: "Daftar pejabat struktural dan unsur pimpinan di lingkungan Sespim Lemdiklat Polri.",
    officials: [
      {
        group: 'UNSUR PIMPINAN',
        name: 'MIDI SISWOKO, S.I.K.',
        rank: 'IRJEN POL.',
        position: 'Kasespim',
        photoSrc: '/images/kasespim.png'
      },
      {
        group: 'SETLEM',
        name: 'AGUS SETIYAWAN, S.I.K',
        rank: 'KOMBES POL',
        position: 'Seslem',
        photoSrc: ''
      },
      {
        group: 'SETLEM',
        name: 'H. MAX ALFRADIANTO, S.TP., S.H., M.H.',
        rank: 'AKBP',
        position: 'Kasubbag Ren',
        photoSrc: ''
      },
      {
        group: 'SETLEM',
        name: 'WIDI SETIAWAN, S.I.K., M.I.K.',
        rank: 'AKBP',
        position: 'Kasubbag Log',
        photoSrc: ''
      },
      {
        group: 'SETLEM',
        name: 'AKBP AWAN SURYAWANA',
        rank: 'Kompol',
        position: 'Kasubbag Um',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'UTORO SAPUTRO, S.H., S.S.T.M.K.',
        rank: 'Kombes Pol',
        position: 'Kabag Jianbang',
        photoSrc: '/uploads/image-1784091163854-431788198.png'
      },
      {
        group: 'JIANBANG',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbag SLS',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbag Analis',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'SUBAGIO,S.T., M.M.',
        rank: 'AKBP',
        position: 'Kasubbag SMK',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'BAMBANG KAYUN BAGUS PANJI SUGIHARTO, S.I.K., M.H.',
        rank: 'AKBP',
        position: 'Kasubbag SKK',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'Drs. ZUBAIR RASYID',
        rank: 'Kombes Pol',
        position: 'Analis Utama Bagjianbang',
        photoSrc: ''
      },
      {
        group: 'JIANBANG',
        name: 'ADI AFFANDI, S.I.K.',
        rank: 'Kombes Pol',
        position: 'Analis Utama Bagjianbang',
        photoSrc: ''
      },
      {
        group: 'BIDANG STRATEGI',
        name: 'LEONARDUS ERIC BHISMO, S.I.K., S.H., M.H.',
        rank: 'Kombes Pol',
        position: 'Kabid Strategi',
        photoSrc: ''
      },
      {
        group: 'BIDANG STRATEGI',
        name: 'DEWI KANIA SUMPENA, S.E., M.M.',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti Bidstrategi',
        photoSrc: ''
      },
      {
        group: 'BIDANG MANAJEMEN',
        name: 'RIVAI SINAMBELA, S.H.',
        rank: 'Kombes Pol',
        position: 'Kabid Jemen Sespim',
        photoSrc: ''
      },
      {
        group: 'BIDANG MANAJEMEN',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti Bidjemen',
        photoSrc: ''
      },
      {
        group: 'BIDANG MANAJEMEN',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimmen Bidjemen',
        photoSrc: ''
      },
      {
        group: 'BIDANG MANAJEMEN',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimma Bidjemen',
        photoSrc: ''
      },
      {
        group: 'BIDANG HUKUM & PERUNDANG-UNDANGAN (KUMDANG)',
        name: 'DENNY YONO PUTRO, S.I.K., M.Si.',
        rank: 'Kombes Pol',
        position: 'Kabid Kumdang',
        photoSrc: ''
      },
      {
        group: 'BIDANG HUKUM & PERUNDANG-UNDANGAN (KUMDANG)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti Bidkumdang',
        photoSrc: ''
      },
      {
        group: 'BIDANG HUKUM & PERUNDANG-UNDANGAN (KUMDANG)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimmen Bidkumdang',
        photoSrc: ''
      },
      {
        group: 'BIDANG HUKUM & PERUNDANG-UNDANGAN (KUMDANG)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimma Bidkumdang',
        photoSrc: ''
      },
      {
        group: 'BIDANG PENGETAHUAN SOCIAL (PENGSOS)',
        name: 'SUGENG HARIYANTO, S.I.K., M.Hum.',
        rank: 'Kombes Pol',
        position: 'Kabid Pengsos',
        photoSrc: ''
      },
      {
        group: 'BIDANG PENGETAHUAN SOCIAL (PENGSOS)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti Bidpengsos',
        photoSrc: ''
      },
      {
        group: 'BIDANG PENGETAHUAN SOCIAL (PENGSOS)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimmen Bidpengsos',
        photoSrc: ''
      },
      {
        group: 'BIDANG PENGETAHUAN SOCIAL (PENGSOS)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimma Bidpengsos',
        photoSrc: ''
      },
      {
        group: 'BIDANG PROFESI DAN TEKNOLOGI (PROFTEK)',
        name: 'Dr. ASWIN AZHAR SIREGAR, S.I.K., M.Si., M.Sc.(Eng)., Ph.D.',
        rank: 'Kombes Pol',
        position: 'Kabid Proftek',
        photoSrc: ''
      },
      {
        group: 'BIDANG PROFESI DAN TEKNOLOGI (PROFTEK)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti BidProftek',
        photoSrc: ''
      },
      {
        group: 'BIDANG PROFESI DAN TEKNOLOGI (PROFTEK)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimmen BidProftek',
        photoSrc: ''
      },
      {
        group: 'BIDANG PROFESI DAN TEKNOLOGI (PROFTEK)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimma BidProftek',
        photoSrc: ''
      },
      {
        group: 'BIDANG PEMBINAAN TENAGA PENDIDIK (BIDBINGADIK)',
        name: 'Kombes Pol Drs. H. Solihin',
        rank: 'Kombes Pol',
        position: 'Kabid Bidbingadik',
        photoSrc: ''
      },
      {
        group: 'BIDANG PEMBINAAN TENAGA PENDIDIK (BIDBINGADIK)',
        name: 'BHIRAWA BRAJA PAKSA, S.I.K.',
        rank: 'AKBP',
        position: 'Kasubbid Sespimti Bidbingadik',
        photoSrc: ''
      },
      {
        group: 'BIDANG PEMBINAAN TENAGA PENDIDIK (BIDBINGADIK)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimmen Bidbingadik',
        photoSrc: ''
      },
      {
        group: 'BIDANG PEMBINAAN TENAGA PENDIDIK (BIDBINGADIK)',
        name: 'Kosong',
        rank: 'AKBP',
        position: 'Kasubbid Sespimma Bidbingadik',
        photoSrc: ''
      },
      {
        group: 'PARA KEPALA SEKOLAH',
        name: 'Dr. EKO SUPRIHANTO, S.H., S.I.K., M.H.',
        rank: 'Brigjen Pol',
        position: 'Kepala Sekolah Staf dan Pimpinan Tinggi Polri (Kasespimti)',
        photoSrc: ''
      },
      {
        group: 'PARA KEPALA SEKOLAH',
        name: 'RACHMAT PAMUDJI, S.I.K.',
        rank: 'Brigjen Pol',
        position: 'Kepala Sekolah Staf dan Pimpinan Menengah Polri (Kasespimmen)',
        photoSrc: ''
      },
      {
        group: 'PARA KEPALA SEKOLAH',
        name: 'PRIYO WASESO, S.Si., M.P.P.',
        rank: 'Brigjen Pol',
        position: 'Kepala Sekolah Pengembangan Profesi Kepolisian (Ka SPPK)',
        photoSrc: ''
      },
      {
        group: 'PARA KEPALA SEKOLAH',
        name: 'Victor Togi Tambunan, S.H., S.I.K',
        rank: 'Brigjen Pol',
        position: 'Kepala Sekolah Staf dan Pimpinan Pertama (Kasespimma)',
        photoSrc: ''
      },
      {
        group: 'SETLEM',
        name: 'LIDO RATRI ANTORO, S.H., S.I.K., M.M.',
        rank: 'AKBP',
        position: 'Kasubbag SDM',
        photoSrc: ''
      }
    ],
    sections: []
  },
  '/profil/fasilitas': {
    title: "Fasilitas",
    eyebrow: "Profil",
    description: "Informasi fasilitas pendidikan, ruang kelas, asrama, pendukung akademik, dan fasilitas umum.",
    sections: []
  },
  '/profil/kontak': {
    title: "Kontak Profil",
    eyebrow: "Profil",
    description: "Informasi kontak internal yang berkaitan dengan profil kelembagaan Sespim Polri.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Informasi kontak internal yang berkaitan dengan profil kelembagaan Sespim Polri.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/program-pendidikan': {
    title: "Program Pendidikan",
    eyebrow: "Akademik",
    description: "Informasi umum akademik serta penjabaran struktur masing-masing unit pendidikan di Sespim.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Informasi umum akademik serta penjabaran struktur masing-masing unit pendidikan di Sespim.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/program-pendidikan/kalender-pendidikan': {
    title: "Kalender Pendidikan",
    eyebrow: "Akademik",
    description: "Jadwal kegiatan akademik, agenda pendidikan, dan tahapan pelaksanaan pendidikan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Jadwal kegiatan akademik, agenda pendidikan, dan tahapan pelaksanaan pendidikan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/program-pendidikan/kurikulum': {
    title: "Kurikulum Umum",
    eyebrow: "Akademik",
    description: "Informasi kurikulum umum, capaian pembelajaran, dan struktur pembelajaran.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Informasi kurikulum umum, capaian pembelajaran, dan struktur pembelajaran.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/program-pendidikan/evaluasi-pendidikan': {
    title: "Evaluasi Pendidikan",
    eyebrow: "Akademik",
    description: "Mekanisme evaluasi pendidikan, penilaian, dan monitoring pembelajaran.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Mekanisme evaluasi pendidikan, penilaian, dan monitoring pembelajaran.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/program-pendidikan/peserta-didik': {
    title: "Informasi Peserta Didik",
    eyebrow: "Akademik",
    description: "Informasi umum peserta didik, layanan akademik, kegiatan pendukung, dan kebutuhan pendidikan.",
    sections: [
      {
        title: 'Layanan dan Kegiatan Peserta Didik',
        body: "Halaman ini menampung informasi peserta didik dan pintu akses menuju KKLN, KKDN, PKB JUANG, Leader Expo, Leadership Camp, serta Dashboard Intelijen.",
        items: [
          'KKLN',
          'KKDN',
          'PKB JUANG',
          'Leader Expo',
          'Leadership Camp',
          'Dashboard Intelijen'
        ]
      },
      {
        title: 'Kebutuhan Pengayaan',
        body: 'Setiap subhalaman dapat dilengkapi dengan deskripsi kegiatan, jadwal, peserta, dokumen pendukung, tautan layanan, dan dokumentasi resmi.',
        items: [
          'Detail kegiatan dan jadwal.',
          'Dokumen atau tautan pendukung.',
          'Informasi kontak atau admin pengelola.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/kkln': {
    title: "KKLN",
    eyebrow: "Informasi Peserta Didik",
    description: "Informasi KKLN sebagai bagian dari kegiatan pendukung peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi KKLN',
        body: "Halaman ini disiapkan sebagai ruang informasi KKLN untuk peserta didik, termasuk kebutuhan kegiatan, jadwal, dokumen, dan tautan pendukung jika tersedia.",
        items: [
          'Ruang informasi kegiatan KKLN.',
          'Dapat memuat jadwal dan daftar peserta.',
          'Dapat dilengkapi dokumen resmi atau tautan layanan.'
        ]
      },
      {
        title: 'Status Data',
        body: 'Konten detail KKLN dapat diperbarui setelah data resmi kegiatan diberikan oleh pengelola.',
        items: [
          'Deskripsi kegiatan.',
          'Jadwal pelaksanaan.',
          'Dokumen pendukung.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/kkdn': {
    title: "KKDN",
    eyebrow: "Informasi Peserta Didik",
    description: "Informasi KKDN sebagai bagian dari kegiatan pendukung peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi KKDN',
        body: "Halaman ini disiapkan sebagai ruang informasi KKDN untuk peserta didik, termasuk kebutuhan kegiatan, jadwal, dokumen, dan tautan pendukung jika tersedia.",
        items: [
          'Ruang informasi kegiatan KKDN.',
          'Dapat memuat jadwal dan daftar peserta.',
          'Dapat dilengkapi dokumen resmi atau tautan layanan.'
        ]
      },
      {
        title: 'Status Data',
        body: 'Konten detail KKDN dapat diperbarui setelah data resmi kegiatan diberikan oleh pengelola.',
        items: [
          'Deskripsi kegiatan.',
          'Jadwal pelaksanaan.',
          'Dokumen pendukung.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/pkb-juang': {
    title: "PKB JUANG",
    eyebrow: "Informasi Peserta Didik",
    description: "Informasi PKB JUANG sebagai bagian dari kegiatan pendukung peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi PKB JUANG',
        body: "Halaman ini disiapkan sebagai ruang informasi PKB JUANG untuk peserta didik, termasuk agenda kegiatan, peserta, dokumen, dan tautan pendukung jika tersedia.",
        items: [
          'Ruang informasi PKB JUANG.',
          'Dapat memuat agenda dan kebutuhan kegiatan.',
          'Dapat dilengkapi dokumen resmi atau tautan layanan.'
        ]
      },
      {
        title: 'Status Data',
        body: 'Konten detail PKB JUANG dapat diperbarui setelah data resmi kegiatan diberikan oleh pengelola.',
        items: [
          'Deskripsi kegiatan.',
          'Agenda pelaksanaan.',
          'Dokumen pendukung.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/leader-expo': {
    title: "Leader Expo",
    eyebrow: "Informasi Peserta Didik",
    description: "Informasi Leader Expo sebagai ruang publikasi dan agenda peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi Leader Expo',
        body: "Halaman ini disiapkan sebagai ruang informasi Leader Expo untuk menampilkan agenda, karya, presentasi, atau dokumentasi kegiatan peserta didik.",
        items: [
          'Ruang informasi Leader Expo.',
          'Dapat memuat agenda, karya, dan dokumentasi.',
          'Dapat dilengkapi tautan publikasi atau galeri kegiatan.'
        ]
      },
      {
        title: 'Status Data',
        body: 'Konten detail Leader Expo dapat diperbarui setelah data resmi kegiatan diberikan oleh pengelola.',
        items: [
          'Agenda kegiatan.',
          'Daftar karya atau presentasi.',
          'Dokumentasi pendukung.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/leadership-camp': {
    title: "Leadership Camp",
    eyebrow: "Informasi Peserta Didik",
    description: "Informasi Leadership Camp sebagai ruang pembinaan kepemimpinan, karakter, kolaborasi, dan disiplin peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi Leadership Camp',
        body: "Halaman ini disiapkan sebagai ruang informasi Leadership Camp untuk menampilkan agenda pembinaan kepemimpinan, kegiatan lapangan, kolaborasi tim, dan dokumentasi peserta didik.",
        items: [
          'Ruang informasi Leadership Camp.',
          'Dapat memuat agenda pembinaan, kegiatan lapangan, dan daftar peserta.',
          'Dapat dilengkapi dokumentasi, tautan publikasi, atau dokumen pendukung.'
        ]
      },
      {
        title: 'Status Data',
        body: 'Konten detail Leadership Camp dapat diperbarui setelah data resmi kegiatan diberikan oleh pengelola.',
        items: [
          'Agenda dan rangkaian kegiatan.',
          'Lokasi, waktu, dan daftar peserta.',
          'Dokumentasi dan dokumen pendukung.'
        ]
      }
    ]
  },
  '/program-pendidikan/peserta-didik/dashboard-intelijen': {
    title: "Dashboard Intelijen",
    eyebrow: "Informasi Peserta Didik",
    description: "Ruang akses informasi Dashboard Intelijen sebagai layanan pendukung peserta didik Sespim Polri.",
    sections: [
      {
        title: 'Informasi Dashboard Intelijen',
        body: "Halaman ini disiapkan sebagai ruang akses informasi Dashboard Intelijen untuk kebutuhan peserta didik dan pengelola sesuai ketentuan akses yang berlaku.",
        items: [
          'Ruang akses informasi Dashboard Intelijen.',
          'Dapat diarahkan ke dashboard resmi jika tautan tersedia.',
          'Dapat dilengkapi panduan akses dan ketentuan pengguna.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Jika Dashboard Intelijen bersifat terbatas, tautan, hak akses, dan ketentuan pengguna dapat ditambahkan sesuai kebijakan pengelola layanan.',
        items: [
          'Gunakan akun resmi jika diperlukan.',
          'Ikuti ketentuan akses internal.',
          'Hubungi admin pengelola apabila mengalami kendala.'
        ]
      }
    ]
  },
  '/program-pendidikan/sespimma': {
    title: "SESPIMMA",
    eyebrow: "Program Pendidikan",
    description: "Sekolah Staf dan Pimpinan Pertama Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.",
    sections: [
      {
        title: 'Sespimma Sespim Lemdiklat Polri',
        body: "Sekolah Staf dan Pimpinan Pertama Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau Sespimma Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.",
        items: [
          'Unsur pelaksana utama Sespim Lemdiklat Polri.',
          'Berkedudukan langsung di bawah Kasespim Polri.',
          'Dipimpin oleh Kepala Sespimma berpangkat bintang satu atau Brigadir Jenderal Polisi Victor Togi Tambunan, S.H., S.I.K.'
        ]
      },
      {
        title: 'Tugas Sespimma',
        body: 'Sespimma bertugas menyelenggarakan, menyusun, dan merumuskan program pendidikan, pengajaran, pelatihan, bimbingan, serta pemeliharaan disiplin perwira siswa di lingkungan Sespimma.',
        items: [
          'Menyelenggarakan program pendidikan.',
          'Menyusun dan merumuskan program pengajaran dan pelatihan.',
          'Melaksanakan bimbingan dan pemeliharaan disiplin perwira siswa.'
        ]
      },
      {
        title: 'Fungsi Sespimma',
        body: 'Dalam menjalankan tugas, Sespimma melaksanakan fungsi perencanaan pendidikan, koordinasi perangkat kendali, pengawasan pengajaran dan penilaian, administrasi pendidikan, serta evaluasi hasil pendidikan.',
        items: [
          'Penyusunan rencana pendidikan, pengawasan, dan pengendalian pelaksanaannya.',
          'Koordinasi penyusunan perangkat kendali pendidikan Sespimma.',
          'Koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan.',
          'Koordinasi, pengendalian, dan pengawasan penilaian oleh Widyaiswara, dosen, dan pembina.',
          'Administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.',
          'Perencanaan dan evaluasi tujuan materi pendidikan serta pelaporan hasil pendidikan.'
        ]
      }
    ]
  },
  '/program-pendidikan/sespimmen': {
    title: "SESPIMMEN",
    eyebrow: "Program Pendidikan",
    description: "Sekolah Staf dan Pimpinan Menengah Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.",
    sections: [
      {
        title: 'Sespimmen Sespim Lemdiklat Polri',
        body: "Sekolah Staf dan Pimpinan Menengah Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau Sespimmen Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.",
        items: [
          'Unsur pelaksana utama Sespim Lemdiklat Polri.',
          'Berkedudukan langsung di bawah Kasespim Polri.',
          'Dipimpin oleh Kepala Sespimmen berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigadir Jenderal Polisi Rachmat Pamudji, S.I.K.'
        ]
      },
      {
        title: 'Tugas Sespimmen',
        body: 'Sespimmen bertugas menyelenggarakan, menyusun, dan merumuskan program pendidikan, pengajaran, pelatihan, bimbingan, serta pemeliharaan disiplin perwira siswa di lingkungan Sespimmen.',
        items: [
          'Menyelenggarakan program pendidikan.',
          'Menyusun dan merumuskan program pengajaran dan pelatihan.',
          'Melaksanakan bimbingan dan pemeliharaan disiplin perwira siswa.'
        ]
      },
      {
        title: 'Fungsi Sespimmen',
        body: 'Dalam menjalankan tugas, Sespimmen melaksanakan fungsi perencanaan pendidikan, koordinasi perangkat kendali, pengawasan pengajaran dan penilaian, administrasi pendidikan, serta evaluasi hasil pendidikan.',
        items: [
          'Penyusunan rencana pendidikan, pengawasan, dan pengendalian pelaksanaannya.',
          'Koordinasi penyusunan perangkat kendali pendidikan Sespimmen.',
          'Koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan.',
          'Koordinasi, pengendalian, dan pengawasan penilaian oleh Widyaiswara, dosen, dan pembina.',
          'Administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.',
          'Perencanaan dan evaluasi tujuan materi pendidikan serta pelaporan hasil pendidikan.'
        ]
      }
    ]
  },
  '/program-pendidikan/sppk': {
    title: "SPPK",
    eyebrow: "Program Pendidikan",
    description: "Sekolah Pengembangan Profesi Kepolisian Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.",
    sections: [
      {
        title: 'SPPK Sespim Lemdiklat Polri',
        body: "Sekolah Pengembangan Profesi Kepolisian, Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau SPPK Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.",
        items: [
          'Unsur pelaksana utama Sespim Lemdiklat Polri.',
          'Berkedudukan langsung di bawah Kasespim Polri.',
          'Dipimpin oleh Kepala SPPK berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigjen Pol. Dr. H. Nurholis, S.I.K., M.Si.'
        ]
      },
      {
        title: 'Tugas SPPK',
        body: 'SPPK bertugas menyelenggarakan, menyusun, dan merumuskan program pendidikan, pengajaran, pelatihan, bimbingan, serta pemeliharaan disiplin perwira siswa di lingkungan SPPK.',
        items: [
          'Menyelenggarakan program pendidikan.',
          'Menyusun dan merumuskan program pengajaran dan pelatihan.',
          'Melaksanakan bimbingan dan pemeliharaan disiplin perwira siswa.'
        ]
      },
      {
        title: 'Fungsi SPPK',
        body: 'Dalam menjalankan tugas, SPPK melaksanakan fungsi perencanaan pendidikan, koordinasi perangkat kendali, pengawasan pengajaran dan penilaian, administrasi pendidikan, serta evaluasi hasil pendidikan.',
        items: [
          'Penyusunan rencana pendidikan, pengawasan, dan pengendalian pelaksanaannya.',
          'Koordinasi penyusunan perangkat kendali pendidikan SPPK.',
          'Koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan.',
          'Koordinasi, pengendalian, dan pengawasan penilaian oleh Widyaiswara, dosen, dan pembina.',
          'Administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.',
          'Perencanaan dan evaluasi tujuan materi pendidikan serta pelaporan hasil pendidikan.'
        ]
      }
    ]
  },
  '/program-pendidikan/sespimti': {
    title: "SESPIMTI",
    eyebrow: "Program Pendidikan",
    description: "Sekolah Staf dan Pimpinan Tinggi Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.",
    sections: [
      {
        title: 'Sespimti Sespim Lemdiklat Polri',
        body: "Sekolah Staf dan Pimpinan Tinggi Sespim Lemdiklat Polri atau Sespimti Sespim Lemdiklat Polri, dahulu bernama Sekolah Staf Perwira Tinggi atau Sespati, adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.",
        items: [
          'Unsur pelaksana utama Sespim Lemdiklat Polri.',
          'Dahulu bernama Sekolah Staf Perwira Tinggi atau Sespati.',
          'Dipimpin oleh Kepala Sespimti berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigadir Jenderal Polisi Eko Suprihanto, S.H., S.I.K., M.H.'
        ]
      },
      {
        title: 'Tugas Sespimti',
        body: 'Sespimti bertugas menyelenggarakan, menyusun, dan merumuskan program pendidikan, pengajaran, pelatihan, bimbingan, serta pemeliharaan disiplin peserta di lingkungan Sespimti.',
        items: [
          'Menyelenggarakan program pendidikan.',
          'Menyusun dan merumuskan program pengajaran dan pelatihan.',
          'Melaksanakan bimbingan dan pemeliharaan disiplin peserta.'
        ]
      },
      {
        title: 'Fungsi Sespimti',
        body: 'Dalam menjalankan tugas, Sespimti melaksanakan fungsi perencanaan pendidikan dan pembinaan peserta didik, koordinasi perangkat kendali, pengawasan pengajaran dan penilaian, administrasi pendidikan, serta evaluasi hasil pendidikan.',
        items: [
          'Penyusunan rencana pendidikan, pengawasan, pengendalian pelaksanaan, serta pembinaan peserta didik.',
          'Koordinasi penyusunan perangkat kendali pendidikan Sespimti.',
          'Koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan.',
          'Koordinasi, pengendalian, dan pengawasan penilaian oleh Widyaiswara, dosen, dan pembina.',
          'Administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.',
          'Perencanaan dan evaluasi tujuan materi pendidikan serta pelaporan hasil pendidikan.'
        ]
      }
    ]
  },
  '/kelembagaan-internal': {
    title: "Kelembagaan Internal",
    eyebrow: "Unit Internal",
    description: "Penjabaran unit operasional dan fungsional di lingkungan Sespim Polri.",
    sections: []
  },
  '/kelembagaan-internal/setlem': {
    title: "Sekretariat Lembaga (SETLEM)",
    eyebrow: "Unit Internal",
    description: "Sekretariat Lembaga bertugas menyusun rencana program dan anggaran, membina SDM dan logistik, serta melaksanakan pelayanan umum dan pengamanan markas.",
    sections: [
      {
        title: 'Tugas Sekretariat Lembaga',
        body: "Sekretariat Lembaga atau Setlem bertugas melaksanakan penyusunan rencana program dan anggaran, melaksanakan pembinaan sumber daya manusia, logistik, serta pelayanan umum dan pengamanan markas.",
        items: [
          'Penyusunan rencana program dan anggaran.',
          'Pembinaan sumber daya manusia.',
          'Pembinaan logistik.',
          'Pelayanan umum dan pengamanan markas.'
        ]
      },
      {
        title: 'Perencanaan Program dan Anggaran',
        body: 'Setlem mendukung tata kelola kelembagaan melalui penyusunan rencana program dan anggaran agar kebutuhan operasional, administrasi, dan dukungan pendidikan dapat berjalan tertib serta terukur.',
        items: [
          'Menyiapkan rencana kebutuhan program.',
          'Mendukung penyusunan alokasi anggaran.',
          'Mengawal keterpaduan dukungan administrasi lembaga.'
        ]
      },
      {
        title: 'Pembinaan SDM',
        body: 'Setlem melaksanakan pembinaan sumber daya manusia di lingkungan Sespim Polri sebagai dukungan terhadap keberlangsungan kegiatan pendidikan, pelayanan administrasi, dan kebutuhan operasional lembaga.',
        items: [
          'Pembinaan administrasi sumber daya manusia.',
          'Pengelolaan data, kebutuhan, dan penataan personel.',
          'Koordinasi pembinaan personel untuk mendukung tugas kelembagaan.'
        ]
      },
      {
        title: 'Pembinaan Logistik',
        body: 'Setlem melaksanakan pembinaan logistik untuk memastikan kebutuhan sarana pendukung, perlengkapan, dan dukungan operasional lembaga tersedia secara tertib dan terkoordinasi.',
        items: [
          'Pengelolaan dukungan logistik kelembagaan.',
          'Koordinasi kebutuhan sarana dan perlengkapan pendukung.',
          'Pemantauan kesiapan dukungan operasional dan pelayanan lembaga.'
        ]
      },
      {
        title: 'Pelayanan Umum dan Pengamanan Markas',
        body: 'Setlem juga menjalankan pelayanan umum dan pengamanan markas untuk memastikan lingkungan kerja dan pendidikan Sespim Polri tetap tertib, aman, dan siap mendukung aktivitas kelembagaan.',
        items: [
          'Pelayanan umum bagi unit dan personel.',
          'Dukungan tata usaha dan kebutuhan markas.',
          'Pengamanan markas dan lingkungan lembaga.'
        ]
      }
    ]
  },
  '/kelembagaan-internal/jianbang': {
    title: "Bagian Pengkajian dan Pengembangan (Bagjianbang)",
    eyebrow: "Unit Internal",
    description: "Bagjianbang bertugas melaksanakan pengkajian dan pengembangan sistem, manajemen, kebijakan, lingkungan strategis, keamanan dalam negeri, serta pendidikan kepemimpinan dan manajemen di lingkungan Polri.",
    sections: [
      {
        title: 'Tugas Bagjianbang',
        body: "Bagian Pengkajian dan Pengembangan atau Bagjianbang bertugas melaksanakan pengkajian dan pengembangan sistem dan manajemen penegakan hukum, keamanan dan ketertiban masyarakat, lingkungan strategi, pengkajian kepolisian dan sistem penyelenggaraan keamanan dalam negeri, serta pendidikan kepemimpinan dan manajemen di lingkungan Polri.",
        items: [
          'Pengkajian dan pengembangan sistem dan manajemen penegakan hukum.',
          'Pengkajian keamanan dan ketertiban masyarakat.',
          'Pengkajian lingkungan strategi.',
          'Pengkajian kepolisian dan sistem penyelenggaraan keamanan dalam negeri.',
          'Pengembangan pendidikan kepemimpinan dan manajemen di lingkungan Polri.'
        ]
      },
      {
        title: 'Pengkajian Penegakan Hukum dan Kamtibmas',
        body: 'Bagjianbang mendukung kebutuhan kelembagaan melalui pengkajian sistem dan manajemen penegakan hukum serta keamanan dan ketertiban masyarakat sebagai bahan pengembangan kebijakan dan pembelajaran.',
        items: [
          'Sistem penegakan hukum.',
          'Manajemen penegakan hukum.',
          'Keamanan dan ketertiban masyarakat.',
          'Bahan pengembangan kebijakan kepolisian.'
        ]
      },
      {
        title: 'Lingkungan Strategi dan Keamanan Dalam Negeri',
        body: 'Bagjianbang melaksanakan pengkajian lingkungan strategi, pengkajian kepolisian, serta sistem penyelenggaraan keamanan dalam negeri untuk mendukung pemahaman peserta didik terhadap dinamika tugas Polri.',
        items: [
          'Analisis lingkungan strategi.',
          'Pengkajian kepolisian.',
          'Sistem penyelenggaraan keamanan dalam negeri.',
          'Dukungan terhadap pemetaan isu strategis Polri.'
        ]
      },
      {
        title: 'Pengembangan Pendidikan Kepemimpinan',
        body: 'Dalam lingkup pendidikan, Bagjianbang berperan mendukung pengembangan pendidikan kepemimpinan dan manajemen di lingkungan Polri agar materi, kajian, dan arah pembelajaran tetap relevan dengan kebutuhan organisasi.',
        items: [
          'Pengembangan pendidikan kepemimpinan.',
          'Pengembangan pendidikan manajemen.',
          'Dukungan kajian untuk peningkatan mutu pembelajaran.',
          'Penguatan relevansi pendidikan dengan kebutuhan organisasi Polri.'
        ]
      }
    ]
  },
  '/kelembagaan-internal/bidang': {
    title: "BIDANG",
    eyebrow: "Unit Internal",
    description: "BIDANG mencakup Bidang Strategi, Manajemen, Hukum dan Perundang-undangan, Pengetahuan Sosial, Profesi dan Teknologi, serta Pembinaan Tenaga Pendidik.",
    sections: [
      {
        title: 'Bidang Strategi (Bidstra)',
        body: 'Bidstra bertugas merencanakan dan menyiapkan perangkat pembelajaran bidang studi strategi kepolisian pada Sespimmen dan Sespimti, serta memastikan pengembangannya selaras dengan kemajuan ilmu pengetahuan terkait.',
        items: [
          'Merencanakan dan menyiapkan silabus bidang studi strategi kepolisian.',
          'Menyiapkan hanjar, alins, alongins, dan waktu pembelajaran pada Sespimmen dan Sespimti.',
          'Memantau, meneliti, mengkaji, dan melaksanakan penilaian serta pengembangan agar selaras dengan kemajuan ilmu pengetahuan terkait.'
        ]
      },
      {
        title: 'Bidang Manajemen (Bidjemen)',
        body: 'Bidjemen bertugas merencanakan dan menyiapkan perangkat pembelajaran bidang studi manajemen serta melakukan penelitian, pengkajian, penilaian, dan pengembangan bidang manajemen.',
        items: [
          'Merencanakan dan menyiapkan silabus bidang studi manajemen.',
          'Menyiapkan hanjar, alins, alongins, dan waktu pembelajaran bidang studi manajemen.',
          'Meneliti, mengkaji, dan melaksanakan penilaian serta pengembangan agar selaras dengan kemajuan ilmu pengetahuan bidang manajemen.'
        ]
      },
      {
        title: 'Bidang Hukum dan Perundang-undangan (Bidkumdang)',
        body: 'Bidkumdang bertugas merencanakan dan menyiapkan perangkat pembelajaran bidang hukum dan perundang-undangan serta mengembangkan materi agar tetap sesuai dengan kemajuan ilmu pengetahuan bidang hukum.',
        items: [
          'Merencanakan dan menyiapkan silabus bidang hukum dan perundang-undangan.',
          'Menyiapkan hanjar, alins, alongins, dan waktu pembelajaran bidang hukum dan perundang-undangan.',
          'Meneliti, mengkaji, dan melaksanakan penilaian serta pengembangan agar selaras dengan kemajuan ilmu pengetahuan bidang hukum dan perundang-undangan.'
        ]
      },
      {
        title: 'Bidang Pengetahuan Sosial (Bidpengsos)',
        body: 'Bidpengsos bertugas merencanakan dan menyiapkan perangkat pembelajaran pengetahuan sosial serta melakukan pengkajian dan pengembangan agar selaras dengan kemajuan ilmu pengetahuan sosial.',
        items: [
          'Merencanakan dan menyiapkan silabus pengetahuan sosial.',
          'Menyiapkan hanjar, alins, alongins, dan waktu pembelajaran pengetahuan sosial.',
          'Meneliti, mengkaji, dan melaksanakan penilaian serta pengembangan agar selaras dengan kemajuan ilmu pengetahuan sosial.'
        ]
      },
      {
        title: 'Bidang Profesi dan Teknologi (Bidproftek)',
        body: 'Bidproftek bertugas merencanakan dan menyiapkan perangkat pembelajaran profesi dan teknologi kepolisian serta mengembangkan materi sesuai kemajuan ilmu pengetahuan bidang profesi dan teknologi kepolisian.',
        items: [
          'Merencanakan dan menyiapkan silabus profesi dan teknologi kepolisian.',
          'Menyiapkan hanjar, alins, alongins, dan waktu pembelajaran profesi dan teknologi kepolisian.',
          'Meneliti, mengkaji, dan melaksanakan penilaian serta pengembangan agar selaras dengan kemajuan ilmu pengetahuan bidang profesi dan teknologi kepolisian.'
        ]
      },
      {
        title: 'Bidang Pembinaan Tenaga Pendidik (Bidbingadik)',
        body: 'Bidbingadik bertugas menyelenggarakan kegiatan perencanaan dalam rangka penyiapan dan pembinaan Tenaga Pendidik yang akan melaksanakan tugas pengajaran dan pelatihan sesuai bidang ilmu dan keahlian masing-masing.',
        items: [
          'Menyelenggarakan perencanaan penyiapan Tenaga Pendidik.',
          'Melaksanakan pembinaan Tenaga Pendidik.',
          'Mendukung kesiapan tugas pengajaran dan pelatihan sesuai bidang ilmu dan keahlian masing-masing.'
        ]
      }
    ]
  },
  '/kelembagaan-internal/ikas': {
    title: "IKAS Alumni / Tracer Study",
    eyebrow: "Alumni",
    description: "Ikatan Keluarga Alumni Sespim sebagai ruang jejaring alumni dan tracer study untuk mendukung pengkajian serta pengembangan kelembagaan.",
    sections: [
      {
        title: 'IKAS Alumni dalam JIANBANG',
        body: "IKAS Alumni ditempatkan sebagai dukungan JIANBANG untuk kebutuhan tracer study, pemetaan alumni, pengumpulan umpan balik, serta penguatan jejaring kepemimpinan lulusan Sespim.",
        items: [
          'Menjadi basis pendataan alumni Sespim.',
          'Mendukung tracer study untuk melihat sebaran, kiprah, dan kontribusi alumni.',
          'Menjadi masukan bagi pengkajian dan pengembangan pendidikan kepemimpinan.'
        ]
      },
      {
        title: 'Data Tracer Study',
        body: 'Data tracer study dapat memuat identitas angkatan, jabatan terkini, wilayah penugasan, bidang tugas, kontribusi kelembagaan, kebutuhan pengembangan kompetensi, serta umpan balik alumni terhadap kurikulum dan layanan pendidikan.',
        items: [
          'Sebaran alumni berdasarkan angkatan, wilayah, dan satuan kerja.',
          'Riwayat jabatan serta bidang penugasan setelah pendidikan.',
          'Umpan balik alumni untuk evaluasi kurikulum, pembelajaran, dan pengembangan Sespim.'
        ]
      },
      {
        title: 'Pemanfaatan Kajian',
        body: 'Hasil tracer study dapat dimanfaatkan JIANBANG sebagai bahan kajian kebijakan, pengembangan kurikulum, penguatan jejaring alumni, dan penyusunan rekomendasi peningkatan mutu pendidikan.',
        items: [
          'Bahan evaluasi dampak pendidikan Sespim.',
          'Dasar pengembangan materi dan metode pembelajaran.',
          'Rujukan penguatan jejaring alumni dan kontribusi strategis lulusan.'
        ]
      }
    ]
  },
  '/kelembagaan-internal/jianbang/ikas-alumni': {
    title: "IKAS Alumni / Tracer Study",
    eyebrow: "JIANBANG",
    description: "Ikatan Keluarga Alumni Sespim sebagai ruang jejaring alumni dan tracer study di bawah JIANBANG untuk mendukung pengkajian serta pengembangan kelembagaan.",
    sections: [
      {
        title: 'IKAS Alumni dalam JIANBANG',
        body: "IKAS Alumni ditempatkan sebagai dukungan JIANBANG untuk kebutuhan tracer study, pemetaan alumni, pengumpulan umpan balik, serta penguatan jejaring kepemimpinan lulusan Sespim.",
        items: [
          'Menjadi basis pendataan alumni Sespim.',
          'Mendukung tracer study untuk melihat sebaran, kiprah, dan kontribusi alumni.',
          'Menjadi masukan bagi pengkajian dan pengembangan pendidikan kepemimpinan.'
        ]
      },
      {
        title: 'Data Tracer Study',
        body: 'Data tracer study dapat memuat identitas angkatan, jabatan terkini, wilayah penugasan, bidang tugas, kontribusi kelembagaan, kebutuhan pengembangan kompetensi, serta umpan balik alumni terhadap kurikulum dan layanan pendidikan.',
        items: [
          'Sebaran alumni berdasarkan angkatan, wilayah, dan satuan kerja.',
          'Riwayat jabatan serta bidang penugasan setelah pendidikan.',
          'Umpan balik alumni untuk evaluasi kurikulum, pembelajaran, dan pengembangan Sespim.'
        ]
      },
      {
        title: 'Pemanfaatan Kajian',
        body: 'Hasil tracer study dapat dimanfaatkan JIANBANG sebagai bahan kajian kebijakan, pengembangan kurikulum, penguatan jejaring alumni, dan penyusunan rekomendasi peningkatan mutu pendidikan.',
        items: [
          'Bahan evaluasi dampak pendidikan Sespim.',
          'Dasar pengembangan materi dan metode pembelajaran.',
          'Rujukan penguatan jejaring alumni dan kontribusi strategis lulusan.'
        ]
      }
    ]
  },
  '/widyaiswara': {
    title: "WIDYAISWARA",
    eyebrow: "Tenaga Pendidik",
    description: "Widyaiswara Polri adalah pejabat fungsional atau perwira tinggi kepolisian yang bertugas sebagai guru, dosen, pelatih, atau instruktur utama di lingkungan pendidikan Polri.",
    sections: [
      {
        title: 'Widyaiswara Polri',
        body: "Widyaiswara Polri adalah pejabat fungsional atau perwira tinggi kepolisian yang bertugas sebagai guru, dosen, pelatih, atau instruktur utama. Mereka bertanggung jawab penuh untuk mendidik, mengajar, dan melatih para siswa atau peserta didik di lingkungan lembaga pendidikan Polri seperti Sespim atau Lemdiklat Polri.",
        items: [
          'Pejabat fungsional atau perwira tinggi kepolisian.',
          'Bertugas sebagai guru, dosen, pelatih, atau instruktur utama.',
          'Mendidik, mengajar, dan melatih peserta didik di lingkungan pendidikan Polri.'
        ]
      },
      {
        title: 'Tugas dan Fungsi Utama',
        body: 'Widyaiswara menjalankan fungsi pendidikan, pengembangan modul, dan penjaminan mutu agar proses pendidikan dan pelatihan di lingkungan Polri berjalan sesuai standar.',
        items: [
          'Mendidik dan melatih: memberikan pengajaran, pelatihan, dan pembekalan kepada calon pimpinan Polri dan perwira lainnya agar memiliki kompetensi, strategi, dan moralitas tinggi.',
          'Pengembangan modul: menyusun kurikulum dan materi pembelajaran yang akan digunakan dalam pelatihan.',
          'Penjamin mutu: memastikan kualitas pelatihan atau pendidikan di lingkungan Polri berjalan sesuai standar.'
        ]
      },
      {
        title: 'Jenjang Jabatan',
        body: 'Merujuk pada ketentuan Permenpan RB Nomor 42 Tahun 2021, tingkatan Widyaiswara dari jenjang terendah hingga tertinggi meliputi Widyaiswara Ahli Pertama, Ahli Muda, Ahli Madya, dan Ahli Utama.',
        items: [
          'Widyaiswara Ahli Pertama (Assistant Trainer): Jenjang awal yang berfokus pada pelaksanaan penyiapan administrasi tatap muka dan membantu proses pembelajaran dasar.',
          'Widyaiswara Ahli Muda (Junior Trainer): Bertanggung jawab melaksanakan pembelajaran mandiri pada diklat tingkat dasar dan teknis, serta menyusun bahan ajar sederhana.',
          'Widyaiswara Ahli Madya (Senior Trainer): Fokus pada analisis kebutuhan diklat, penjaminan mutu, pembelajaran tingkat menengah, serta pengembangan kurikulum materi khusus kepolisian.',
          'Widyaiswara Ahli Utama (Master Trainer): Jenjang tertinggi yang mendesain arah strategis kediklatan, mengevaluasi sistem makro diklat, serta mengajar diklat kepemimpinan tingkat tinggi seperti Sekolah Staf dan Pimpinan Tinggi/Sespimti Polri. Pada rumpun anggota Polri, posisi Widyaiswara Utama umumnya diisi oleh perwira tinggi berpangkat Inspektur Jenderal Polisi atau Bintang Dua.'
        ]
      }
    ]
  },
  '/widyaiswara/profil': {
    title: "Profil Widyaiswara",
    eyebrow: "Tenaga Pendidik",
    description: "Profil tenaga pendidik, riwayat pendidikan, pengalaman jabatan, dan keahlian.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Profil tenaga pendidik, riwayat pendidikan, pengalaman jabatan, dan keahlian.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/widyaiswara/bidang-keahlian': {
    title: "Bidang Keahlian",
    eyebrow: "Tenaga Pendidik",
    description: "Pemetaan bidang keahlian widyaiswara dalam mendukung pembelajaran kepemimpinan Polri.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Pemetaan bidang keahlian widyaiswara dalam mendukung pembelajaran kepemimpinan Polri.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/widyaiswara/publikasi': {
    title: "Publikasi Widyaiswara",
    eyebrow: "Tenaga Pendidik",
    description: "Karya buku, jurnal, pemikiran, dan kajian Widyaiswara yang telah diunggah sebagai referensi akademik.",
    sections: [
      {
        title: 'Repository Referensi',
        body: "Halaman Publikasi Widyaiswara menyiapkan katalog karya buku, jurnal, pemikiran, dan kajian yang dapat ditautkan ke dokumen unggahan atau sumber resmi.",
        items: ['Karya buku Widyaiswara.', 'Jurnal dan artikel ilmiah.', 'Pemikiran dan kajian strategis.']
      },
      {
        title: 'Kebutuhan Pengayaan',
        body: 'Setiap item publikasi dapat dilengkapi metadata penulis, tahun, kategori, kata kunci, file PDF, atau tautan sumber resmi.',
        items: ['Metadata publikasi.', 'Tautan PDF atau jurnal.', 'Kata kunci referensi.']
      }
    ]
  },
  '/widyaiswara/materi-terbuka': {
    title: "Materi Terbuka",
    eyebrow: "Tenaga Pendidik",
    description: "Kumpulan materi pelatihan dasar Widyaiswara yang dapat diakses sebagai bahan ajar dan rujukan pembelajaran.",
    resources: [
      {
        title: 'FOLDER UTAMA HANJAR WIDYAISWARA (GOOGLE DRIVE)',
        description: 'Akses folder cloud resmi penyimpanan seluruh dokumen Hanjar (Bahan Ajar) Widyaiswara Sespim Lemdiklat Polri.',
        fileName: 'FOLDER HANJAR (GOOGLE DRIVE)',
        href: 'https://drive.google.com/drive/folders/1ON9kgJW6RZQEOr-zoCJITInoLFeGC_WU',
        format: 'DRIVE',
        category: 'Akses Cloud'
      },
      {
        title: 'RENCANA PEMBELAJARAN WIDYAISWARA.pdf',
        description: 'RANCANG BANGUN PEMBELAJARAN MATA PELATIHAN dan RENCANA PEMBELAJARAN.',
        fileName: '1. RENCANA PEMBELAJARAN WIDYAISWARA.pdf',
        href: '/files/widyaiswara/1.%20RENCANA%20PEMBELAJARAN%20WIDYAISWARA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'PRAKTIK MICROTEACHING',
        description: 'MATA PELATIHAN PRAKTIK MENGAJAR (MICRO TEACHING).',
        fileName: '2. PRAKTIK MICROTEACHING.pdf',
        href: '/files/widyaiswara/2.%20PRAKTIK%20MICROTEACHING.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'PANDUAN PENYUSUNAN MEDIA PEMBELAJARAN.pdf',
        description: 'MATA PELATIHAN PENYUSUNAN MEDIA PEMBELAJARAN.',
        fileName: '3. PANDUAN PENYUSUNAN MEDIA PEMBELAJARAN.pdf',
        href: '/files/widyaiswara/3.%20PANDUAN%20PENYUSUNAN%20MEDIA%20PEMBELAJARAN.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'PEMBELAJARAN ORANG DEWASA.pdf',
        description: 'MATA PELATIHAN PEMBELAJARAN ORANG DEWASA.',
        fileName: '4. PEMBELAJARAN ORANG DEWASA.pdf',
        href: '/files/widyaiswara/4.%20PEMBELAJARAN%20ORANG%20DEWASA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'METODE PEMBELAJARAN WIDYAISWARA',
        description: 'METODE PEMBELAJARAN.',
        fileName: '5. METODE PEMBELAJARAN WIDYAISWARA.pdf',
        href: '/files/widyaiswara/5.%20METODE%20PEMBELAJARAN%20WIDYAISWARA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'PELATIHAN KOMUNIKASI WIDYAISWARA',
        description: 'TEKNIK KOMUNIKASI DAN PRESENTASI YANG EFEKTIF.',
        fileName: '6. PELATIHAN KOMUNIKASI WIDYAISWARA.pdf',
        href: '/files/widyaiswara/6.%20PELATIHAN%20KOMUNIKASI%20WIDYAISWARA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'KEBIJAKAN PEMBINAAN WIDYAISWARA',
        description: 'KEBIJAKAN PEMBINAAN WIDYAISWARA DAN ANGKA KREDITNYA.',
        fileName: '7. KEBIJAKAN PEMBINAAN WIDYAISWARA.pdf',
        href: '/files/widyaiswara/7.%20KEBIJAKAN%20PEMBINAAN%20WIDYAISWARA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      },
      {
        title: 'ETIKA WIDYAISWARA',
        description: 'ETIKA WIDYAISWARA.',
        fileName: '8. ETIKA WIDYAISWARA.pdf',
        href: '/files/widyaiswara/8.%20ETIKA%20WIDYAISWARA.pdf',
        format: 'PDF',
        category: 'Pelatihan Dasar'
      }
    ],
    sections: [
      {
        title: "Bahan Rujukan Belajar Terbuka",
        body: "Materi terbuka disediakan untuk memberikan transparansi bahan ajar dan mendukung peningkatan kualitas pengajaran yang diselenggarakan oleh para Widyaiswara Sespim Polri."
      }
    ]
  },
  '/widyaiswara/hanjar': {
    title: "Bahan Ajar (HANJAR)",
    eyebrow: "Tenaga Pendidik",
    description: "Kumpulan Bahan Ajar (Hanjar) lengkap untuk program pendidikan SESPIMTI, SESPIMMEN, SPPK, dan SESPIMMA Sespim Lemdiklat Polri.",
    resources: [
      {
        title: 'Kurikulum Manajemen Strategis Sespimti',
        description: 'Panduan pembelajaran mata kuliah Manajemen Strategis untuk perwira tinggi Sespimti.',
        fileName: 'hanjar_manajemen_strategis_sespimti.pdf',
        href: '/files/widyaiswara/hanjar_manajemen_strategis_sespimti.pdf',
        format: 'PDF',
        category: 'SESPIMTI'
      },
      {
        title: 'Kepemimpinan Publik Sespimmen',
        description: 'Bahan ajar kepemimpinan publik dan pelayanan prima untuk perwira menengah Sespimmen.',
        fileName: 'hanjar_kepemimpinan_publik_sespimmen.pdf',
        href: '/files/widyaiswara/hanjar_kepemimpinan_publik_sespimmen.pdf',
        format: 'PDF',
        category: 'SESPIMMEN'
      },
      {
        title: 'Pengembangan Profesi Kepolisian SPPK',
        description: 'Modul kompetensi profesi dan etika penegakan hukum untuk peserta didik SPPK.',
        fileName: 'hanjar_pengembangan_profesi_sppk.pdf',
        href: '/files/widyaiswara/hanjar_pengembangan_profesi_sppk.pdf',
        format: 'PDF',
        category: 'SPPK'
      },
      {
        title: 'Administrasi Dasar Kepolisian Sespimma',
        description: 'Hanjar pembimbingan administrasi dan kepemimpinan dasar perwira pertama Sespimma.',
        fileName: 'hanjar_administrasi_dasar_sespimma.pdf',
        href: '/files/widyaiswara/hanjar_administrasi_dasar_sespimma.pdf',
        format: 'PDF',
        category: 'SESPIMMA'
      }
    ],
    sections: [
      {
        title: 'Materi Pelatihan Dasar Widyaiswara',
        body: "Halaman ini disiapkan untuk menampung 8 file pelatihan dasar Widyaiswara sebagai bahan ajar, modul terbuka, dan rujukan pembelajaran.",
        items: [
          '8 dari 8 file pelatihan dasar sudah terdata.',
          'Seluruh materi pelatihan dasar berformat PDF.',
          'Daftar materi sudah lengkap sesuai target awal.'
        ]
      },
      {
        title: 'Penempatan File',
        body: 'Tautan file disiapkan menuju folder publik agar dokumen dapat dibuka langsung setelah file PDF resmi dimasukkan ke project.',
        items: [
          'Folder target: public/files/widyaiswara.',
          'Nama file: 1. RENCANA PEMBELAJARAN WIDYAISWARA.pdf.',
          'Nama file: 2. PRAKTIK MICROTEACHING.pdf.',
          'Nama file: 3. PANDUAN PENYUSUNAN MEDIA PEMBELAJARAN.pdf.',
          'Nama file: 4. PEMBELAJARAN ORANG DEWASA.pdf.',
          'Nama file: 5. METODE PEMBELAJARAN WIDYAISWARA.pdf.',
          'Nama file: 6. PELATIHAN KOMUNIKASI WIDYAISWARA.pdf.',
          'Nama file: 7. KEBIJAKAN PEMBINAAN WIDYAISWARA.pdf.',
          'Nama file: 8. ETIKA WIDYAISWARA.pdf.'
        ]
      }
    ]
  },
  '/widyaiswara/pembimbingan-naskap': {
    title: "Pembimbingan Naskap",
    eyebrow: "Tenaga Pendidik",
    description: "Informasi pembimbingan NASKAP, karya akhir, kajian peserta didik, dan pedoman penulisan akademik.",
    resources: [
      {
        title: 'PPKT Sespimma TA 2026.pdf',
        description: 'Panduan Penilaian Akademik Sespimma.',
        fileName: '9. PPKT Sespimma TA 2026.pdf',
        href: '/files/widyaiswara/9.%20PPKT%20Sespimma%20TA%202026.pdf',
        format: 'PDF',
        category: 'Pedoman Pembimbingan'
      },
      {
        title: 'PPKT SESPIMMEN 66',
        description: 'Panduan Penilaian Akademik Sespimmen dan SPPK.',
        fileName: '10. PPKT SESPIMMEN 66.pdf',
        href: '/files/widyaiswara/10.%20PPKT%20SESPIMMEN%2066.pdf',
        format: 'PDF',
        category: 'Pedoman Pembimbingan'
      },
      {
        title: 'PPKT SESPIMTI FULL HALAMAN FIX',
        description: 'Panduan Penilaian Akademik Sespimti.',
        fileName: 'PPKT SESPIMTI FULL HALAMAN FIX.pdf',
        href: '/files/widyaiswara/PPKT%20SESPIMTI%20FULL%20HALAMAN%20FIX.pdf',
        format: 'PDF',
        category: 'Pedoman Pembimbingan'
      },
      {
        title: 'PPKT SPPK ANGKATAN KE 2 FIX.pdf',
        description: 'Panduan Penilaian Akademik SPPK.',
        fileName: 'PPKT SPPK ANGKATAN KE 2 FIX.pdf',
        href: '/files/widyaiswara/PPKT%20SPPK%20ANGKATAN%20KE%202%20FIX.pdf',
        format: 'PDF',
        category: 'Pedoman Pembimbingan'
      }
    ],
    sections: [
      {
        title: 'Pedoman Pembimbingan',
        body: "Halaman ini disiapkan untuk menampung pedoman pembimbingan dan penulisan akademik sebagai rujukan peserta didik serta Widyaiswara pembimbing.",
        items: [
          '4 pedoman sudah terdata.',
          'Seluruh pedoman pembimbingan berformat PDF.',
          'Daftar pedoman dapat diperbarui kembali jika ada file resmi tambahan.'
        ]
      },
      {
        title: 'Penempatan File',
        body: 'Tautan file disiapkan menuju folder publik agar dokumen dapat dibuka langsung dari halaman Pembimbingan Naskap.',
        items: [
          'Folder target: public/files/widyaiswara.',
          'Nama file: 9. PPKT Sespimma TA 2026.pdf.',
          'Nama file: 10. PPKT SESPIMMEN 66.pdf.',
          'Nama file: PPKT SESPIMTI FULL HALAMAN FIX.pdf.',
          'Nama file: PPKT SPPK ANGKATAN KE 2 FIX.pdf.'
        ]
      }
    ]
  },
  '/widyaiswara/inpassing': {
    title: "Inpassing",
    eyebrow: "Tenaga Pendidik",
    description: "Informasi inpassing Widyaiswara dan pembinaan jabatan fungsional tenaga pendidik.",
    sections: [
      {
        title: 'Informasi Inpassing',
        body: "Halaman Inpassing menyiapkan ruang informasi terkait proses penyesuaian jabatan fungsional Widyaiswara dan pembinaan tenaga pendidik di lingkungan Sespim Polri.",
        items: [
          'Informasi jabatan fungsional Widyaiswara.',
          'Ruang pembinaan dan pengembangan tenaga pendidik.',
          'Kebutuhan administrasi inpassing dapat dilengkapi setelah data resmi tersedia.'
        ]
      },
      {
        title: 'Ruang Informasi',
        body: 'Konten inpassing dapat dikembangkan untuk memuat persyaratan, alur proses, jadwal, dokumen pendukung, dan kontak pengelola.',
        items: [
          'Persyaratan dan ketentuan inpassing.',
          'Alur pengajuan dan verifikasi.',
          'Dokumen dan tautan pendukung.'
        ]
      }
    ]
  },
  '/widyaiswara/belajar-ai': {
    title: "Belajar AI & Pemanfaatan LLM",
    eyebrow: "Tenaga Pendidik",
    description: "Ruang pembelajaran pemanfaatan teknologi Artificial Intelligence (AI) seperti ChatGPT, Gemini, Claude, Grok, dan NotebookLM untuk mendukung inovasi pendidikan dan kepemimpinan taktis.",
    sections: [
      {
        title: "Pemanfaatan Teknologi AI",
        body: "Integrasi sistem Kecerdasan Buatan (AI) di era modern membantu civitas akademika Sespim Polri memetakan bahan pengajaran, simulasi interaktif penanganan kamtibmas, serta asisten riset dokumen kepolisian.",
        items: [
          "NotebookLM untuk asisten riset regulasi bebas halusinasi.",
          "ChatGPT untuk simulasi interaktif skenario kamtibmas.",
          "Gemini & Claude untuk penyusunan laporan taktis komparatif.",
          "Grok untuk monitoring sentimen media sosial secara real-time."
        ]
      }
    ]
  },
  '/widyaiswara/lsp-bnsp': {
    title: "LSP / BNSP",
    eyebrow: "Tenaga Pendidik",
    description: "Informasi LSP dan BNSP untuk dukungan sertifikasi, kompetensi, dan penjaminan mutu tenaga pendidik.",
    externalLink: {
      label: 'Buka LSP Polri',
      href: 'https://lsppolri.id/',
      description: 'Akses resmi Lembaga Sertifikasi Profesi Polri untuk informasi sertifikasi profesi dan kompetensi.'
    },
    sections: [
      {
        title: 'LSP dan BNSP',
        body: "Halaman LSP / BNSP menyiapkan ruang informasi terkait sertifikasi, standar kompetensi, dan penjaminan mutu tenaga pendidik yang terhubung dengan kebutuhan pendidikan Polri.",
        items: [
          'Alamat resmi: https://lsppolri.id/',
          'Informasi Lembaga Sertifikasi Profesi.',
          'Informasi Badan Nasional Sertifikasi Profesi.',
          'Dukungan sertifikasi kompetensi tenaga pendidik.'
        ]
      },
      {
        title: 'Ruang Sertifikasi dan Mutu',
        body: 'Konten LSP / BNSP dapat dikembangkan untuk memuat skema sertifikasi, asesor, jadwal uji kompetensi, dokumen, dan hasil sertifikasi.',
        items: [
          'Skema sertifikasi kompetensi.',
          'Jadwal dan proses uji kompetensi.',
          'Dokumen pendukung sertifikasi dan penjaminan mutu.'
        ]
      }
    ]
  },
  '/publikasi': {
    title: "Publikasi, Literasi, dan Karya",
    eyebrow: "Pusat Pengetahuan",
    description: "Pusat pengetahuan kepemimpinan Polri yang memuat publikasi widyaiswara dan karya peserta didik.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Pusat pengetahuan kepemimpinan Polri yang memuat publikasi widyaiswara dan karya peserta didik.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/artikel': {
    title: "Artikel",
    eyebrow: "Publikasi",
    description: "Artikel kepemimpinan, pendidikan, dan isu strategis Polri.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Artikel kepemimpinan, pendidikan, dan isu strategis Polri.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/policy-brief': {
    title: "Policy Brief",
    eyebrow: "Publikasi",
    description: "Ringkasan kebijakan berbasis kajian strategis dan rekomendasi implementatif.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Ringkasan kebijakan berbasis kajian strategis dan rekomendasi implementatif.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/kajian-strategis': {
    title: "Kajian Strategis",
    eyebrow: "Publikasi",
    description: "Kajian strategis dalam bidang kepemimpinan, keamanan, manajemen, dan kebijakan Polri.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Kajian strategis dalam bidang kepemimpinan, keamanan, manajemen, dan kebijakan Polri.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/naskah-akademik': {
    title: "Naskah Akademik",
    eyebrow: "Publikasi",
    description: "Naskah akademik dan dokumen konseptual yang mendukung pengembangan kebijakan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Naskah akademik dan dokumen konseptual yang mendukung pengembangan kebijakan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/jurnal-ilmiah': {
    title: "Jurnal Ilmiah",
    eyebrow: "Publikasi",
    description: "Publikasi ilmiah dan artikel penelitian terkait kepemimpinan dan keamanan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Publikasi ilmiah dan artikel penelitian terkait kepemimpinan dan keamanan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/resensi-buku': {
    title: "Resensi Buku",
    eyebrow: "Publikasi",
    description: "Resensi buku kepemimpinan, strategi, manajemen, dan kepolisian.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Resensi buku kepemimpinan, strategi, manajemen, dan kepolisian.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/publikasi/karya-peserta-didik': {
    title: "Karya Peserta Didik",
    eyebrow: "Publikasi",
    description: "Karya terkurasi peserta didik berupa NASKAP, policy paper, karya akhir, dan proyek perubahan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Karya terkurasi peserta didik berupa NASKAP, policy paper, karya akhir, dan proyek perubahan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/berita': {
    title: "Berita & Informasi Publik",
    eyebrow: "Informasi",
    description: "Pusat berita, kegiatan, agenda, dan informasi publik terintegrasi.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Pusat berita, kegiatan, agenda, dan informasi publik terintegrasi.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/berita/kegiatan': {
    title: "Berita & Kegiatan",
    eyebrow: "Informasi",
    description: "Kanal berita internal, pantauan media nasional, media sosial, dan hashtag terkait Sespim Polri secara up to date.",
    sections: [
      {
        title: 'Kanal Berita dan Kegiatan',
        body: "Halaman ini menampung berita internal Sespim seperti pembukaan dan penutupan pendidikan, kuliah umum, seminar, FGD, kunjungan kerja, serta pantauan pemberitaan eksternal dari portal berita dan media sosial.",
        items: [
          'Berita internal tetap disusun oleh redaksi Sespim.',
          'Berita eksternal ditautkan ke sumber asli agar hak cipta dan atribusi tetap terjaga.',
          'Pantauan media sosial dan hashtag membantu redaksi mengikuti percakapan publik tentang Sespim.'
        ]
      },
      {
        title: 'Sumber Monitoring',
        body: 'Monitoring disiapkan melalui Google News, portal berita nasional, kanal media sosial resmi, pencarian video, dan hashtag terkait Sespim Polri.',
        items: [
          'Google News untuk pantauan lintas media.',
          'ANTARA, Detik, Kompas, Tempo, dan CNN Indonesia sebagai pintasan portal berita.',
          'Instagram, YouTube, Facebook, X, TikTok, dan hashtag Sespim sebagai kanal pantauan sosial.'
        ]
      }
    ]
  },
  '/berita/kegiatan/berita-internal': {
    title: "Berita Internal Sespim",
    eyebrow: "Berita & Kegiatan",
    description: "Ruang berita resmi kegiatan Sespim yang disusun, diverifikasi, dan diterbitkan oleh redaksi internal.",
    sections: [
      {
        title: 'Berita Resmi Internal',
        body: "Submenu ini disiapkan untuk menampilkan berita resmi Sespim seperti pembukaan dan penutupan pendidikan, kuliah umum, seminar, FGD, kunjungan kerja, kegiatan peserta didik, serta aktivitas kelembagaan.",
        items: [
          'Konten berita bersumber dari redaksi internal Sespim.',
          'Setiap berita dapat dilengkapi foto, tanggal, penulis, kategori, dan tag kegiatan.',
          'Publikasi tetap melalui proses verifikasi substansi dan dokumentasi.'
        ]
      },
      {
        title: 'Alur Publikasi',
        body: 'Berita internal idealnya mengikuti alur pengumpulan bahan, verifikasi, penyuntingan, persetujuan, lalu publikasi pada portal resmi.',
        items: [
          'Kontributor menyiapkan bahan berita dan dokumentasi.',
          'Editor memeriksa bahasa dan kelengkapan informasi.',
          'Reviewer memastikan konten layak dipublikasikan.'
        ]
      }
    ]
  },
  '/berita/kegiatan/feed-up-to-date': {
    title: "Feed Up To Date",
    eyebrow: "Berita & Kegiatan",
    description: "Pantauan berita terbaru terkait Sespim Polri melalui Google News RSS dan kata kunci publik yang relevan.",
    externalLink: {
      label: 'Buka Google News',
      href: 'https://news.google.com/search?q=Sespim%20Polri%20OR%20Sespim%20Lemdiklat%20Polri%20OR%20sespimlemdiklatpolri&hl=id&gl=ID&ceid=ID:id',
      description: 'Pantauan lintas media berbasis kata kunci Sespim Polri dan Sespim Lemdiklat Polri.'
    },
    sections: [
      {
        title: 'Feed Berita Eksternal',
        body: 'Submenu ini menampilkan pantauan berita terbaru dari aggregator berita. Konten diarahkan ke sumber asli agar atribusi dan hak cipta tetap terjaga.',
        items: [
          'Menggunakan kata kunci Sespim Polri, Sespim Lemdiklat Polri, dan sespimlemdiklatpolri.',
          'Hasil feed dapat berubah sesuai update sumber eksternal.',
          'Berita eksternal perlu diverifikasi redaksi sebelum dijadikan rujukan resmi.'
        ]
      },
      {
        title: 'Integrasi Lanjutan',
        body: 'Pada fase backend, feed dapat dihubungkan ke dashboard admin, filter kategori, penyimpanan arsip, dan kurasi manual redaksi.',
        items: [
          'Dukungan API/RSS resmi.',
          'Kurasi dan penandaan berita oleh admin.',
          'Arsip monitoring berdasarkan tanggal dan sumber.'
        ]
      }
    ]
  },
  '/berita/kegiatan/portal-berita': {
    title: "Portal Berita Nasional",
    eyebrow: "Berita & Kegiatan",
    description: "Pintasan monitoring ke portal berita nasional dan aggregator untuk mencari pemberitaan terkait Sespim Polri.",
    externalLink: {
      label: 'Buka Google News',
      href: 'https://news.google.com/search?q=Sespim%20Polri%20OR%20Sespim%20Lemdiklat%20Polri%20OR%20sespimlemdiklatpolri&hl=id&gl=ID&ceid=ID:id',
      description: 'Aggregator berita untuk pantauan lintas media nasional.'
    },
    sections: [
      {
        title: 'Sumber Portal Berita',
        body: 'Submenu ini menjadi pintasan monitoring pemberitaan dari portal nasional tanpa menyalin isi berita penuh ke dalam portal Sespim.',
        items: [
          'Google News untuk pantauan lintas media.',
          'ANTARA News sebagai sumber kantor berita nasional.',
          'Detik, Kompas, Tempo, dan CNN Indonesia sebagai pintasan portal berita populer.'
        ]
      },
      {
        title: 'Prinsip Kurasi',
        body: 'Berita dari portal eksternal digunakan sebagai bahan pantauan dan harus diarahkan ke sumber asli.',
        items: [
          'Tidak menyalin artikel penuh dari media lain.',
          'Gunakan tautan sumber asli untuk menjaga atribusi.',
          'Redaksi dapat memilih berita yang relevan untuk tindak lanjut internal.'
        ]
      }
    ]
  },
  '/berita/kegiatan/media-sosial-hashtag': {
    title: "Media Sosial & Hashtag",
    eyebrow: "Berita & Kegiatan",
    description: "Pantauan kanal media sosial resmi, pencarian video, dan hashtag terkait Sespim Polri.",
    externalLink: {
      label: 'Buka Instagram Resmi',
      href: 'https://www.instagram.com/sespimlemdiklatpolri/?hl=en',
      description: 'Kanal Instagram resmi Sespim Lemdiklat Polri.'
    },
    sections: [
      {
        title: 'Kanal Media Sosial',
        body: 'Submenu ini menyiapkan pintasan ke kanal media sosial resmi dan pencarian sosial yang relevan dengan aktivitas Sespim.',
        items: [
          'Instagram, YouTube, dan Facebook resmi Sespim Lemdiklat Polri.',
          'Pencarian video melalui YouTube dan TikTok.',
          'Pantauan percakapan publik melalui X Live Search.'
        ]
      },
      {
        title: 'Hashtag Sespim',
        body: 'Hashtag digunakan untuk membantu redaksi menemukan dokumentasi, percakapan, dan unggahan publik yang berkaitan dengan Sespim.',
        items: [
          '#SespimPolri.',
          '#SespimLemdiklatPolri.',
          '#Sespim, #Sespimmen, #Sespimti, dan #Sespimma.'
        ]
      }
    ]
  },
  '/berita/agenda': {
    title: "Agenda Pendidikan",
    eyebrow: "Informasi",
    description: "Agenda pendidikan, jadwal kegiatan institusi, dan agenda akademik.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Agenda pendidikan, jadwal kegiatan institusi, dan agenda akademik.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/berita/informasi-publik': {
    title: "Informasi Publik",
    eyebrow: "PPID",
    description: "Informasi serta merta, informasi setiap saat, informasi berkala, informasi dikecualikan, serta UU dan peraturan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Informasi serta merta, informasi setiap saat, informasi berkala, informasi dikecualikan, serta UU dan peraturan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/berita/susunan-redaksi': {
    title: "Susunan Redaksi",
    eyebrow: "Kontak Profil",
    description: "Struktur redaksi Portal Resmi Sespim Lemdiklat Polri untuk pengelolaan berita, informasi publik, dokumentasi, dan publikasi resmi.",
    sections: [
      {
        title: 'Struktur Pengelola Redaksi',
        body: 'Susunan redaksi ini menjadi acuan pembagian peran dalam pengelolaan berita, informasi publik, dokumentasi, dan publikasi resmi pada Portal Resmi Sespim Lemdiklat Polri.',
        items: [
          'Penanggung Jawab: Kasespim atau pejabat yang ditunjuk',
          'Pengarah: pejabat utama Sespim/Lemdiklat',
          'Pemimpin Redaksi: pejabat yang membidangi informasi/publikasi',
          'Editor: tim verifikasi bahasa, substansi, dan dokumentasi',
          'Admin Teknis: pengelola website, hosting, keamanan, backup',
          'Kontributor: Sespimma, Sespimmen, Sespimti, Widyaiswara, bagian akademik',
          'Reviewer: pejabat yang memastikan konten layak dipublikasikan'
        ]
      },
      {
        title: 'Alur Tanggung Jawab Konten',
        body: 'Setiap konten publikasi perlu melewati proses kontribusi bahan, penyuntingan, pemeriksaan kelayakan, persetujuan, penerbitan, dan pemeliharaan teknis agar informasi yang tampil akurat serta layak menjadi rujukan publik.',
        items: [
          'Kontributor menyiapkan bahan berita, dokumentasi, atau publikasi',
          'Editor memeriksa bahasa, substansi, dan kelengkapan dokumentasi',
          'Reviewer memastikan konten layak dipublikasikan',
          'Pemimpin Redaksi mengoordinasikan prioritas dan jadwal publikasi',
          'Admin Teknis menjaga website, hosting, keamanan, dan backup'
        ]
      }
    ]
  },
  '/berita/contact': {
    title: "Contact",
    eyebrow: "Kontak Profil",
    description: "Kanal kontak resmi untuk alamat, nomor kontak, email, peta lokasi, media sosial, dan formulir kontak Sespim Lemdiklat Polri.",
    sections: []
  },
  '/galeri': {
    title: "Galeri",
    eyebrow: "Dokumentasi",
    description: "Dokumentasi foto dan video kegiatan pendidikan, seminar, upacara, dan kegiatan kampus.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Dokumentasi foto dan video kegiatan pendidikan, seminar, upacara, dan kegiatan kampus.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/galeri/foto': {
    title: "Galeri Foto",
    eyebrow: "Publikasi",
    description: "Kumpulan foto kegiatan pendidikan, seminar, upacara, dan dokumentasi institusi.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Kumpulan foto kegiatan pendidikan, seminar, upacara, dan dokumentasi institusi.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/galeri/video': {
    title: "Galeri Video",
    eyebrow: "Publikasi",
    description: "Kumpulan video dokumentasi kegiatan, pembelajaran, seminar, dan informasi publik.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Kumpulan video dokumentasi kegiatan, pembelajaran, seminar, dan informasi publik.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/kontak': {
    title: "Kontak",
    eyebrow: "Layanan",
    description: "Alamat resmi, nomor telepon, email, peta lokasi, media sosial, dan form kontak.",
    sections: []
  },
  '/sarana-prasarana': {
    title: "Sarana dan Prasarana Kependidikan",
    eyebrow: "Portal Pendukung",
    description: "Kumpulan link portal pendukung kegiatan akademik dan kesejahteraan.",
    sections: [
      {
        title: 'Ringkasan Halaman',
        body: "Kumpulan link portal pendukung kegiatan akademik dan kesejahteraan.",
        items: ['Konten awal mengikuti sitemap Sespim Polri.', 'Layout disiapkan sebagai baseline front-end.', 'Detail konten dapat diperbarui setelah approval.']
      },
      {
        title: 'Kebutuhan UI',
        body: 'Halaman ini membutuhkan struktur hero, breadcrumb, konten utama, kartu informasi, dan CTA menuju halaman terkait.',
        items: ['Hero halaman', 'Section konten utama', 'Kartu informasi', 'CTA dan tautan terkait']
      }
    ]
  },
  '/sarana-prasarana/elibrary': {
    title: "eLibrary Perpustakaan Sespim",
    eyebrow: "Portal Pendukung",
    description: "Pusat referensi dan karya akademik peserta didik Sespim",
    externalLink: {
      label: 'Buka eLibrary Sespim (SLiMS)',
      href: 'https://e-library.siapsespimpolri.id/index.php',
      description: 'Akses sistem OPAC (Online Public Access Catalog) Perpustakaan Sespim Lemdiklat Polri.'
    },
    sections: [
      {
        title: 'Mengenal Sistem SLiMS Perpustakaan',
        body: "eLibrary Sespim menggunakan SLiMS (Senayan Library Management System), yaitu perangkat lunak manajemen perpustakaan sumber terbuka (open source) berbasis web yang handal. Aplikasi ini awalnya dikembangkan oleh tim dari Kementerian Pendidikan Nasional Republik Indonesia dengan menggunakan PHP dan MySQL untuk mendukung digitalisasi katalog dan administrasi perpustakaan modern.",
        items: [
          'Katalog Publik Online (OPAC) untuk pencarian koleksi buku secara instan.',
          'Manajemen keanggotaan dan sirkulasi peminjaman digital.',
          'Sistem pencatatan terkomputerisasi yang cepat dan efisien.'
        ]
      },
      {
        title: 'Cara Menjadi Anggota eLibrary Sespim Lemdiklat Polri',
        body: 'Seluruh Peserta Didik (Serdik), Widyaiswara, dan Staf personel di lingkungan Sespim Lemdiklat Polri wajib mendaftarkan diri sebagai anggota untuk dapat memanfaatkan fasilitas peminjaman buku referensi dan akses dokumen digital.',
        items: [
          'Kunjungi Layanan Perpustakaan: Silakan datang langsung ke gedung Perpustakaan Sespim Lemdiklat Polri.',
          'Bawa Identitas Diri: Tunjukkan KTA Polri atau Kartu Tanda Peserta Didik yang aktif kepada petugas.',
          'Pencatatan Data Anggota: Petugas akan mendaftarkan profil Anda ke database keanggotaan SLiMS.',
          'Akses Akun Digital: Setelah terdaftar, Anda akan mendapatkan kartu anggota digital dan kredensial login untuk memesan koleksi secara online.'
        ]
      },
      {
        title: 'Koleksi Dokumen & Karya Akademik',
        body: 'Melalui eLibrary Sespim, Anda juga dapat menelusuri naskah karya akademik peserta didik angkatan terdahulu guna mendukung riset dan penulisan karya mandiri.',
        items: [
          'NKP (Naskah Karya Perorangan) & NASKAP (Naskah Akademik).',
          'Policy Brief sebagai rekomendasi strategis kebijakan kepolisian.',
          'TASKAP & NASTRAP sebagai materi rujukan penulisan kepemimpinan.'
        ]
      }
    ]
  },
  '/sarana-prasarana/perpusnas': {
    title: "Perpusnas",
    eyebrow: "Portal Pendukung",
    description: "Pusat referensi dan karya akademik peserta didik Sespim",
    externalLink: {
      label: 'Buka Portal Perpusnas',
      href: 'https://perpusnas.go.id/',
      description: 'Akses resmi portal Perpustakaan Nasional RI untuk mendukung penelusuran data, literatur, dan referensi nasional.'
    },
    sections: [
      {
        title: 'Layanan Perpustakaan Nasional RI',
        body: "Perpustakaan Nasional Republik Indonesia menyediakan jutaan koleksi literatur, buku digital, jurnal ilmiah internasional, dan manuskrip sejarah. Anggota Sespim Lemdiklat Polri dapat memanfaatkan akses ini secara luas untuk penulisan karya perorangan (NKP) dan kajian strategis.",
        items: [
          'E-Resources Perpusnas: Akses gratis ke berbagai jurnal ilmiah internasional terkemuka.',
          'Satu Data Perpusnas: Portal data terintegrasi perpustakaan se-Indonesia.',
          'IPUSNAS: Aplikasi perpustakaan digital berbasis sosial untuk membaca buku di perangkat mobile.'
        ]
      },
      {
        title: 'Cara Menjadi Anggota Perpusnas',
        body: 'Untuk menikmati seluruh layanan e-resources dan mengunduh jurnal ilmiah internasional secara gratis, Anda harus terdaftar sebagai anggota resmi Perpustakaan Nasional RI.',
        items: [
          'Registrasi Online: Buka website resmi pendaftaran anggota Perpusnas di https://keanggotaan.perpusnas.go.id/.',
          'Isi Data Diri: Masukkan data diri lengkap beserta nomor identitas (KTP/KTA).',
          'Autentikasi Akun: Setelah sukses, Anda akan menerima Nomor Anggota resmi.',
          'Gunakan Akses E-Resources: Login ke portal https://e-resources.perpusnas.go.id/ menggunakan Nomor Anggota dan password Anda.'
        ]
      }
    ]
  },
  '/sarana-prasarana/ejurnal': {
    title: "Ejurnal",
    eyebrow: "",
    description: "Akses resmi portal E-Jurnal Sespim Lemdiklat Polri untuk pencarian artikel ilmiah dan jurnal akademik.",
    externalLink: {
      label: 'Buka E-Jurnal Sespim Lemdiklat Polri',
      href: 'https://ejurnal-copus.sespimpolri.id/',
      description: 'Portal resmi E-Jurnal Sespim Lemdiklat Polri'
    },
    sections: [
      {
        title: 'Akses Ejurnal',
        body: "Halaman ini disiapkan sebagai ruang akses informasi Ejurnal untuk mendukung penelusuran artikel ilmiah, publikasi akademik, dan bahan rujukan pendidikan.",
        items: [
          'Mendukung pencarian artikel ilmiah dan jurnal akademik.',
          'Menjadi rujukan awal untuk pengayaan kajian dan penulisan akademik.',
          'Dapat dilengkapi tautan portal dan panduan akses resmi.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Jika eJurnal menggunakan akun institusi atau akses terbatas, informasi autentikasi dapat ditambahkan pada tahap integrasi.',
        items: [
          'Pastikan topik pencarian sesuai kebutuhan akademik.',
          'Gunakan akses resmi yang diberikan oleh pengelola layanan.',
          'Catat sumber referensi sesuai ketentuan penulisan akademik.'
        ]
      }
    ]
  },
  '/sarana-prasarana/lms-siapsespim': {
    title: "LMS SIAPSESPIM",
    eyebrow: "Portal Pendukung",
    description: "Akses resmi LMS SIAPSESPIM untuk mendukung pembelajaran digital, blended learning, dan pengelolaan aktivitas akademik Sespim Polri.",
    externalLink: {
      label: 'Buka LMS SIAPSESPIM',
      href: 'https://siapsespimpolri.id/',
      description: 'Portal resmi LMS SIAPSESPIM'
    },
    sections: [
      {
        title: 'Akses LMS SIAPSESPIM',
        body: "LMS SIAPSESPIM merupakan portal pembelajaran digital yang digunakan untuk mendukung proses pendidikan, pembelajaran jarak jauh, blended learning, dan pengelolaan aktivitas akademik di lingkungan Sespim Polri.",
        items: [
          'Alamat resmi: https://siapsespimpolri.id/',
          'Mendukung pembelajaran digital dan blended learning.',
          'Menjadi pintu akses aktivitas akademik berbasis sistem.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Pengguna diarahkan membuka portal LMS melalui tautan resmi. Jika layanan membutuhkan autentikasi, peserta didik, tenaga pendidik, atau personel terkait dapat menggunakan akun yang telah ditetapkan oleh pengelola SIAPSESPIM.',
        items: [
          'Gunakan akun resmi yang diberikan oleh pengelola layanan.',
          'Pastikan akses dilakukan melalui alamat portal resmi.',
          'Hubungi admin internal apabila mengalami kendala autentikasi.'
        ]
      }
    ]
  },
  '/sarana-prasarana/cek-plagiarisme': {
    title: "Cek Plagiarisme",
    eyebrow: "Portal Pendukung",
    description: "Layanan pendukung pemeriksaan kemiripan naskah akademik, karya tulis, dan dokumen pembelajaran dengan alur pengecekan dokumen melalui Turnitin.",
    externalLink: {
      label: 'Buka Portal Turnitin',
      href: 'https://www.turnitin.com/',
      description: 'Layanan resmi pemeriksaan kemiripan karya tulis akademik via Turnitin.'
    },
    plagiarismSources: [
      { domain: 'jurnal.polri.go.id', percentage: 6, matchCount: 12 },
      { domain: 'perpusnas.go.id', percentage: 4, matchCount: 8 },
      { domain: 'sespim.polri.go.id', percentage: 3, matchCount: 4 }
    ],
    sections: [
      {
        title: 'Layanan Cek Plagiarisme',
        body: "Halaman ini disiapkan sebagai ruang akses informasi layanan cek plagiarisme untuk mendukung mutu penulisan akademik, karya akhir, kajian strategis, dan dokumen pembelajaran. Layanan pengecekan diarahkan menggunakan Turnitin melalui tautan https://www.turnitin.com/ sesuai akun atau prosedur resmi pengelola.",
        items: [
          'Mendukung pemeriksaan kemiripan naskah akademik melalui Turnitin.',
          'Menyediakan tombol upload dokumen untuk alur front-end pengecekan.',
          'Menampilkan ringkasan hasil similarity pada posisi paling atas halaman.'
        ]
      },
      {
        title: 'Referensi Pendukung',
        body: 'Sebelum dan sesudah pemeriksaan similarity, pengguna dapat menelusuri referensi melalui eLibrary Sespim, Perpusnas, Ejurnal, Offcampus, dan sumber akademik relevan lainnya untuk memperkuat sitasi serta daftar pustaka.',
        items: [
          'Gunakan dokumen akademik final atau draf yang siap diperiksa.',
          'Pastikan file mengikuti format yang ditentukan oleh pengelola layanan.',
          'Gunakan referensi resmi untuk memperbaiki sitasi dan mengurangi kemiripan tidak wajar.'
        ]
      }
    ]
  },
  '/sarana-prasarana/simulasi': {
    title: "Simulasi",
    eyebrow: "Portal Pendukung",
    description: "Layanan simulasi pendukung kegiatan akademik, latihan, dan pembelajaran berbasis skenario di lingkungan Sespim Polri.",
    sections: [
      {
        title: 'Layanan Simulasi',
        body: "Halaman ini disiapkan sebagai ruang akses informasi simulasi untuk mendukung latihan, pembelajaran berbasis skenario, dan penguatan kompetensi peserta didik.",
        items: [
          'Mendukung kegiatan latihan dan pembelajaran berbasis skenario.',
          'Dapat digunakan sebagai penghubung menuju sistem simulasi resmi.',
          'Ruang ini dapat dilengkapi panduan teknis dan jadwal penggunaan.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Jika simulasi menggunakan sistem khusus, informasi akun, perangkat, jadwal, dan alur penggunaan dapat ditambahkan setelah data layanan tersedia.',
        items: [
          'Pastikan perangkat memenuhi kebutuhan layanan simulasi.',
          'Gunakan akun resmi jika layanan membutuhkan autentikasi.',
          'Ikuti arahan pengelola atau instruktur pada saat pelaksanaan.'
        ]
      }
    ]
  },
  '/sarana-prasarana/dashboard': {
    title: "Dashboard",
    eyebrow: "Portal Pendukung",
    description: "Ruang akses dashboard pendukung pemantauan informasi akademik dan layanan digital Sespim Polri.",
    sections: [
      {
        title: 'Akses Dashboard',
        body: "Halaman ini disiapkan sebagai ruang akses informasi dashboard untuk mendukung pemantauan layanan, data akademik, dan kebutuhan operasional digital.",
        items: [
          'Mendukung pemantauan informasi akademik dan layanan digital.',
          'Dapat diarahkan ke dashboard resmi setelah tautan tersedia.',
          'Menjadi titik akses awal untuk kebutuhan pelaporan atau monitoring.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Jika dashboard bersifat internal, ketentuan akses dan hak pengguna dapat ditambahkan sesuai kebijakan pengelola layanan.',
        items: [
          'Gunakan akun resmi dan hak akses yang sesuai.',
          'Jaga kerahasiaan data yang ditampilkan pada dashboard.',
          'Hubungi admin internal jika membutuhkan perubahan hak akses.'
        ]
      }
    ]
  },
  '/sarana-prasarana/offcampus': {
    title: "Offcampus",
    eyebrow: "Portal Pendukung",
    description: "Media blended learning untuk pembelajaran offcampus, kelas daring Google Meet, akses materi, penugasan, dan referensi digital dari luar lingkungan kampus.",
    sections: [
      {
        title: 'Media Blended Learning Offcampus',
        body: "Halaman ini disiapkan sebagai media blended learning untuk mendukung pembelajaran offcampus melalui kombinasi tatap muka, Google Meet, LMS SIAPSESPIM, penugasan mandiri, dan referensi digital.",
        items: [
          'Mendukung kelas daring sinkron menggunakan Google Meet.',
          'Menghubungkan peserta ke LMS SIAPSESPIM untuk materi dan penugasan.',
          'Menjadi ruang preview alur pembelajaran campuran kampus dan offcampus.'
        ]
      },
      {
        title: 'Kebutuhan Akses',
        body: 'Jika layanan Offcampus memerlukan akun Google Meet, LMS, VPN, atau autentikasi khusus, detail teknis dapat ditambahkan setelah informasi resmi tersedia.',
        items: [
          'Gunakan jaringan dan perangkat yang aman untuk mengikuti kelas daring.',
          'Pastikan akun yang digunakan memiliki izin akses Google Meet dan LMS.',
          'Hubungi admin internal jika mengalami kendala autentikasi atau tautan kelas.'
        ]
      }
    ]
  },
  '/sarana-prasarana/klinik-pratama': {
    title: "Klinik Pratama",
    eyebrow: "Portal Pendukung",
    description: "Informasi layanan kesehatan, jam layanan, kontak, lokasi, website resmi, dan mockup antrian realtime Klinik Pratama Sespim Polri.",
    externalLink: {
      label: 'Buka Website Klinik Pratama',
      href: 'https://klinik-sespimpolri.com/',
      description: 'Website resmi Klinik Pratama Sespim Polri untuk informasi layanan kesehatan dan akses antrian pasien.'
    },
    sections: [
      {
        title: 'Profil Klinik Pratama',
        body: "Klinik Pratama Sespim Polri merupakan layanan kesehatan di lingkungan Sespim Polri dengan slogan Sahabat Menuju Sehat. Halaman ini menautkan pengguna ke website resmi klinik serta merangkum layanan utama dan konsep antrian online yang tersedia.",
        items: ['Website resmi: https://klinik-sespimpolri.com/', 'Antrian pasien: https://app.klinik-sespimpolri.com/', 'Lokasi: Jalan Maribaya No.53, Kayuambon, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391']
      },
      {
        title: 'Layanan Utama',
        body: 'Layanan yang ditampilkan pada website resmi Klinik Pratama Sespim Polri mencakup pendaftaran pasien, pelayanan rawat jalan, pelayanan rawat inap, serta UGD 24 jam.',
        items: ['Pendaftaran pasien', 'Pelayanan rawat jalan', 'Pelayanan rawat inap', 'UGD 24 jam']
      },
      {
        title: 'Jam Layanan, Kontak, dan Antrian',
        body: 'Website resmi klinik menampilkan jam layanan pagi dan sore, serta kontak telepon dan WhatsApp yang dapat digunakan untuk kebutuhan informasi layanan kesehatan. Mockup antrian realtime disiapkan agar pasien dapat mengambil nomor secara online dan datang mendekati giliran.',
        items: ['Pelayanan pagi: 08.00 - 11.00 WIB', 'Pelayanan sore: 16.00 - 19.00 WIB', 'Telepon: (022) 2785594', 'WhatsApp: 0823-2134-9036', 'Antrian realtime: pelayanan pagi dan sore']
      }
    ]
  },
}
