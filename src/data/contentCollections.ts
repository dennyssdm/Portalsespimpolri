export type ArticleItem = {
  slug: string
  title: string
  category: string
  date: string
  author: string
  summary: string
  body: string[]
  tags: string[]
  href: string
}

export type EducatorProfile = {
  slug: string
  name: string
  rank: string
  position: string
  subjects?: string[]
  generalEducation?: string[]
  serviceEducation?: string[]
  developmentEducation?: string[]
  expertise: string[]
  summary: string
  bio: string[]
  publications: string[]
  indexedPublications?: string[]
  professionalCertifications?: string[]
  href: string
}

export type DownloadItem = {
  slug: string
  title: string
  category: string
  updatedAt: string
  format: string
  size: string
  version: string
  summary: string
  body: string[]
  tags: string[]
  href: string
}

export const newsItems: ArticleItem[] = [
  {
    slug: 'kuliah-umum-kepemimpinan-strategis-polri',
    title: 'Kuliah Umum Kepemimpinan Strategis Polri',
    category: 'Kegiatan',
    date: '25 Juni 2026',
    author: 'Humas Sespim',
    summary: 'Sespim menyelenggarakan kuliah umum untuk memperkuat wawasan kepemimpinan strategis peserta didik.',
    body: [
      'Kegiatan kuliah umum disiapkan sebagai ruang penguatan wawasan kepemimpinan, manajemen organisasi, dan pengambilan keputusan strategis di lingkungan Polri.',
      'Peserta didik diarahkan untuk memahami dinamika keamanan publik, tata kelola institusi, serta kebutuhan adaptasi kepemimpinan pada era transformasi digital.',
      'Konten ini masih berupa baseline redaksional untuk menguji struktur detail berita sebelum integrasi CMS dilakukan.'
    ],
    tags: ['Kepemimpinan', 'Kuliah Umum', 'Pendidikan'],
    href: '/berita/kuliah-umum-kepemimpinan-strategis-polri'
  },
  {
    slug: 'agenda-evaluasi-peserta-didik',
    title: 'Agenda Pendidikan dan Evaluasi Peserta Didik',
    category: 'Agenda',
    date: '24 Juni 2026',
    author: 'Bidang Akademik',
    summary: 'Agenda evaluasi pendidikan disiapkan untuk memastikan capaian pembelajaran peserta didik berjalan terukur.',
    body: [
      'Evaluasi peserta didik menjadi bagian penting dalam menjaga mutu pendidikan kepemimpinan yang diselenggarakan Sespim.',
      'Rangkaian agenda meliputi penilaian capaian pembelajaran, monitoring kedisiplinan akademik, dan pembimbingan lanjutan sesuai kebutuhan program.',
      'Detail jadwal dan dokumen pendukung akan dapat ditautkan setelah data resmi dari bidang akademik tersedia.'
    ],
    tags: ['Agenda', 'Evaluasi', 'Peserta Didik'],
    href: '/berita/agenda-evaluasi-peserta-didik'
  },
  {
    slug: 'informasi-publik-layanan-akademik',
    title: 'Informasi Publik Layanan Akademik',
    category: 'Informasi Publik',
    date: '22 Juni 2026',
    author: 'Layanan Informasi',
    summary: 'Kanal informasi publik disiapkan untuk menyampaikan layanan akademik dan informasi kelembagaan secara terbuka.',
    body: [
      'Informasi publik membantu pengguna memperoleh rujukan awal mengenai layanan akademik, kontak kelembagaan, dan dokumen yang dapat diakses.',
      'Struktur detail berita ini menyiapkan kebutuhan heading, metadata, tag, dan tautan terkait agar mudah dikembangkan pada fase CMS.',
      'Setiap informasi publik perlu melalui validasi pemilik informasi sebelum diterbitkan sebagai konten resmi.'
    ],
    tags: ['Informasi Publik', 'Layanan', 'Akademik'],
    href: '/berita/informasi-publik-layanan-akademik'
  }
]

export const publicationItems: ArticleItem[] = [
  {
    slug: 'policy-brief-kepemimpinan-presisi',
    title: 'Policy Brief Kepemimpinan Presisi',
    category: 'Policy Brief',
    date: '20 Juni 2026',
    author: 'Tim Kajian Sespim',
    summary: 'Ringkasan kebijakan mengenai penguatan kepemimpinan presisi dalam tata kelola organisasi Polri.',
    body: [
      'Policy brief ini disiapkan sebagai contoh struktur publikasi singkat yang berisi isu, analisis, dan rekomendasi kebijakan.',
      'Fokus narasi diarahkan pada penguatan kapasitas kepemimpinan, koordinasi lintas fungsi, dan akuntabilitas pengambilan keputusan.',
      'Pada fase integrasi, publikasi dapat dilengkapi abstrak, berkas PDF, penulis, kata kunci, dan daftar referensi.'
    ],
    tags: ['Policy Brief', 'Presisi', 'Kebijakan'],
    href: '/publikasi/policy-brief-kepemimpinan-presisi'
  },
  {
    slug: 'kajian-strategis-transformasi-digital-polri',
    title: 'Kajian Strategis Transformasi Digital Polri',
    category: 'Kajian Strategis',
    date: '18 Juni 2026',
    author: 'Widyaiswara Sespim',
    summary: 'Kajian awal mengenai peluang dan tantangan transformasi digital dalam penguatan pelayanan publik Polri.',
    body: [
      'Transformasi digital memerlukan kesiapan kepemimpinan, perubahan proses kerja, dan tata kelola data yang dapat dipertanggungjawabkan.',
      'Kajian strategis ini menjadi contoh halaman detail publikasi dengan ruang untuk analisis, rekomendasi, dan metadata akademik.',
      'Struktur ini akan memudahkan pengembangan filter, pencarian, dan arsip publikasi pada tahap berikutnya.'
    ],
    tags: ['Kajian Strategis', 'Transformasi Digital', 'Pelayanan Publik'],
    href: '/publikasi/kajian-strategis-transformasi-digital-polri'
  },
  {
    slug: 'resensi-buku-kepemimpinan-pelayanan-publik',
    title: 'Resensi Buku Kepemimpinan Pelayanan Publik',
    category: 'Resensi Buku',
    date: '16 Juni 2026',
    author: 'Pusat Literasi Sespim',
    summary: 'Resensi buku yang menyoroti hubungan kepemimpinan, etika pelayanan, dan kepercayaan publik.',
    body: [
      'Resensi buku menjadi kanal literasi untuk memperkaya bahan bacaan peserta didik dan tenaga pendidik.',
      'Format detail dapat memuat identitas buku, inti gagasan, catatan kritis, serta relevansi terhadap pendidikan kepemimpinan Polri.',
      'Konten final dapat disesuaikan dengan kurasi redaksi dan rekomendasi bacaan resmi.'
    ],
    tags: ['Resensi', 'Literasi', 'Pelayanan Publik'],
    href: '/publikasi/resensi-buku-kepemimpinan-pelayanan-publik'
  }
]

export const educatorProfiles: EducatorProfile[] = [
  {
    "slug": "chuzaini-patoppoi-s-st-mk-s-h",
    "name": "CHUZAINI PATOPPOI, S.St.Mk., S.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 2007"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan CHUZAINI PATOPPOI, S.St.Mk., S.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "CHUZAINI PATOPPOI, S.St.Mk., S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/chuzaini-patoppoi-s-st-mk-s-h"
  },
  {
    "slug": "drs-jawari-s-h-m-h",
    "name": "Drs. JAWARI, S.H., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2010"
    ],
    "serviceEducation": [
      "AKPOL 1990"
    ],
    "developmentEducation": [
      "LEMHANNAS 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Drs. JAWARI, S.H., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Drs. JAWARI, S.H., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/drs-jawari-s-h-m-h"
  },
  {
    "slug": "abioso-seno-aji-s-i-k-m-h",
    "name": "ABIOSO SENO AJI, S.I.K., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2022"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2015"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ABIOSO SENO AJI, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "ABIOSO SENO AJI, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/abioso-seno-aji-s-i-k-m-h"
  },
  {
    "slug": "mohamad-agung-budijono-s-i-k-m-si",
    "name": "MOHAMAD AGUNG BUDIJONO, S.I.K., M.Si.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2005"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MOHAMAD AGUNG BUDIJONO, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "MOHAMAD AGUNG BUDIJONO, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mohamad-agung-budijono-s-i-k-m-si"
  },
  {
    "slug": "musa-ikipson-manaek-muara-tampubolon-s-h-m-si",
    "name": "MUSA IKIPSON MANAEK MUARA TAMPUBOLON, S.H., M.Si.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2015"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUSA IKIPSON MANAEK MUARA TAMPUBOLON, S.H., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "MUSA IKIPSON MANAEK MUARA TAMPUBOLON, S.H., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/musa-ikipson-manaek-muara-tampubolon-s-h-m-si"
  },
  {
    "slug": "bariza-sulfi",
    "name": "BARIZA SULFI",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "SMA 1988"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BARIZA SULFI sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "BARIZA SULFI tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/bariza-sulfi"
  },
  {
    "slug": "drs-agus-djaka-santoso",
    "name": "Drs. AGUS DJAKA SANTOSO",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1990"
    ],
    "developmentEducation": [
      "LEMHANNAS 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Drs. AGUS DJAKA SANTOSO sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Drs. AGUS DJAKA SANTOSO tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/drs-agus-djaka-santoso"
  },
  {
    "slug": "nurworo-danang-s-i-k",
    "name": "NURWORO DANANG, S.I.K.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2002"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan NURWORO DANANG, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "NURWORO DANANG, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/nurworo-danang-s-i-k"
  },
  {
    "slug": "mukti-juharsa-s-i-k-m-h",
    "name": "MUKTI JUHARSA, S.I.K., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2022"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "PKN Tk. I 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUKTI JUHARSA, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "MUKTI JUHARSA, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mukti-juharsa-s-i-k-m-h"
  },
  {
    "slug": "r-yoseph-wihastono-yoga-pranoto-s-i-k-m-hum",
    "name": "R. YOSEPH WIHASTONO YOGA PRANOTO, S.I.K.,M.Hum.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2014"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan R. YOSEPH WIHASTONO YOGA PRANOTO, S.I.K.,M.Hum. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "R. YOSEPH WIHASTONO YOGA PRANOTO, S.I.K.,M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/r-yoseph-wihastono-yoga-pranoto-s-i-k-m-hum"
  },
  {
    "slug": "y-tony-surya-putra-s-i-k-m-h",
    "name": "Y. TONY SURYA PUTRA, S.I.K., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "PKN TK.I 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Y. TONY SURYA PUTRA, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Y. TONY SURYA PUTRA, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/y-tony-surya-putra-s-i-k-m-h"
  },
  {
    "slug": "dr-m-sabilul-alif-s-h-s-i-k-m-si",
    "name": "Dr. M. SABILUL ALIF S.H., S.I.K., M.Si.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2024"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "LEMHANNAS 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. M. SABILUL ALIF S.H., S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Dr. M. SABILUL ALIF S.H., S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-m-sabilul-alif-s-h-s-i-k-m-si"
  },
  {
    "slug": "dr-rakhmad-setyadi-s-i-k-s-h-m-h",
    "name": "Dr. RAKHMAD SETYADI, S.I.K., S.H., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2022"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. RAKHMAD SETYADI, S.I.K., S.H., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Dr. RAKHMAD SETYADI, S.I.K., S.H., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-rakhmad-setyadi-s-i-k-s-h-m-h"
  },
  {
    "slug": "dr-toni-ariadi-efendi-s-h-s-i-k-m-h-m-m",
    "name": "Dr. TONI ARIADI EFENDI, S.H., S.I.K., M.H., M.M.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. TONI ARIADI EFENDI, S.H., S.I.K., M.H., M.M. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Dr. TONI ARIADI EFENDI, S.H., S.I.K., M.H., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-toni-ariadi-efendi-s-h-s-i-k-m-h-m-m"
  },
  {
    "slug": "roma-hutajulu-s-i-k-m-si",
    "name": "ROMA HUTAJULU, S.I.K., M.Si.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2006"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESKO TNI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ROMA HUTAJULU, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "ROMA HUTAJULU, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/roma-hutajulu-s-i-k-m-si"
  },
  {
    "slug": "dr-faizal-ramadhani-s-sos-s-i-k-m-h",
    "name": "Dr. FAIZAL RAMADHANI, S.Sos., S.I.K., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2019"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. FAIZAL RAMADHANI, S.Sos., S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Dr. FAIZAL RAMADHANI, S.Sos., S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-faizal-ramadhani-s-sos-s-i-k-m-h"
  },
  {
    "slug": "dr-joko-setiono-s-h-s-i-k-m-hum",
    "name": "Dr. JOKO SETIONO, S.H., S.I.K., M.Hum.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2019"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "LEMHANNAS 2025"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. JOKO SETIONO, S.H., S.I.K., M.Hum. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "Dr. JOKO SETIONO, S.H., S.I.K., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-joko-setiono-s-h-s-i-k-m-hum"
  },
  {
    "slug": "muhammad-taslim-chairuddin-s-i-k-m-h",
    "name": "MUHAMMAD TASLIM CHAIRUDDIN, S.I.K., M.H.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD TASLIM CHAIRUDDIN, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "MUHAMMAD TASLIM CHAIRUDDIN, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-taslim-chairuddin-s-i-k-m-h"
  },
  {
    "slug": "bahtiar-ujang-purnama-s-i-k-m-si",
    "name": "BAHTIAR UJANG PURNAMA, S.I.K., M.Si.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BAHTIAR UJANG PURNAMA, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM di Sespim.",
    "bio": [
      "BAHTIAR UJANG PURNAMA, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. I SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/bahtiar-ujang-purnama-s-i-k-m-si"
  },
  {
    "slug": "drs-herman-sikumbang-m-m",
    "name": "Drs. HERMAN SIKUMBANG, M.M.",
    "rank": "IRJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2019"
    ],
    "serviceEducation": [
      "AKPOL 1990"
    ],
    "developmentEducation": [
      "SESKO TNI 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Drs. HERMAN SIKUMBANG, M.M. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "Drs. HERMAN SIKUMBANG, M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat IRJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/drs-herman-sikumbang-m-m"
  },
  {
    "slug": "slamet-hariyadi-s-i-k-m-h-m-m",
    "name": "SLAMET HARIYADI, S.I.K., M.H., M.M.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA MADYA SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2006"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SLAMET HARIYADI, S.I.K., M.H., M.M. sebagai WIDYAISWARA MADYA SESPIM di Sespim.",
    "bio": [
      "SLAMET HARIYADI, S.I.K., M.H., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA MADYA SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/slamet-hariyadi-s-i-k-m-h-m-m"
  },
  {
    "slug": "dr-susetio-cahyadi-c-fr-a-c-sa-s-i-k-m-m-m-h",
    "name": "DR. SUSETIO CAHYADI, C.FR.A, C.SA., S.I.K., M.M., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA MADYA SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2021"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DR. SUSETIO CAHYADI, C.FR.A, C.SA., S.I.K., M.M., M.H. sebagai WIDYAISWARA MADYA SESPIM di Sespim.",
    "bio": [
      "DR. SUSETIO CAHYADI, C.FR.A, C.SA., S.I.K., M.M., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA MADYA SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-susetio-cahyadi-c-fr-a-c-sa-s-i-k-m-m-m-h"
  },
  {
    "slug": "dicky-patria-negara-s-h-s-i-k-m-si",
    "name": "DICKY PATRIA NEGARA, S.H., S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA MADYA SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2005"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DICKY PATRIA NEGARA, S.H., S.I.K., M.Si. sebagai WIDYAISWARA MADYA SESPIM di Sespim.",
    "bio": [
      "DICKY PATRIA NEGARA, S.H., S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA MADYA SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dicky-patria-negara-s-h-s-i-k-m-si"
  },
  {
    "slug": "yustan-alpiani-s-i-k-s-h-m-hum",
    "name": "YUSTAN ALPIANI, S.I.K., S.H., M.Hum.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2010"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YUSTAN ALPIANI, S.I.K., S.H., M.Hum. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "YUSTAN ALPIANI, S.I.K., S.H., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yustan-alpiani-s-i-k-s-h-m-hum"
  },
  {
    "slug": "misbahul-munauwar-s-h",
    "name": "MISBAHUL MUNAUWAR, S.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 2015"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "PKN TK. I 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MISBAHUL MUNAUWAR, S.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "MISBAHUL MUNAUWAR, S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/misbahul-munauwar-s-h"
  },
  {
    "slug": "hero-hendrianto-bachtiar-s-i-k-m-si",
    "name": "HERO HENDRIANTO BACHTIAR, S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2006"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HERO HENDRIANTO BACHTIAR, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "HERO HENDRIANTO BACHTIAR, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hero-hendrianto-bachtiar-s-i-k-m-si"
  },
  {
    "slug": "muhammad-firman-s-i-k-m-si",
    "name": "MUHAMMAD FIRMAN, S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD FIRMAN, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "MUHAMMAD FIRMAN, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-firman-s-i-k-m-si"
  },
  {
    "slug": "mardiaz-kusin-dwihananto-s-i-k-m-hum",
    "name": "MARDIAZ KUSIN DWIHANANTO, S.I.K., M.Hum.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMTI 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MARDIAZ KUSIN DWIHANANTO, S.I.K., M.Hum. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "MARDIAZ KUSIN DWIHANANTO, S.I.K., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mardiaz-kusin-dwihananto-s-i-k-m-hum"
  },
  {
    "slug": "ratno-kuncoro-s-i-k-m-si",
    "name": "RATNO KUNCORO, S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan RATNO KUNCORO, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "RATNO KUNCORO, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ratno-kuncoro-s-i-k-m-si"
  },
  {
    "slug": "defrian-donimando-s-i-k-m-h",
    "name": "DEFRIAN DONIMANDO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2010"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DEFRIAN DONIMANDO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "DEFRIAN DONIMANDO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/defrian-donimando-s-i-k-m-h"
  },
  {
    "slug": "dani-kustoni-s-h-s-i-k-m-hum",
    "name": "DANI KUSTONI, S.H., S.I.K., M.Hum.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DANI KUSTONI, S.H., S.I.K., M.Hum. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "DANI KUSTONI, S.H., S.I.K., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dani-kustoni-s-h-s-i-k-m-hum"
  },
  {
    "slug": "enjang-hasan-kurnia-s-i-k",
    "name": "ENJANG HASAN KURNIA, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2003"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "LEMHANNAS 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ENJANG HASAN KURNIA, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "ENJANG HASAN KURNIA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/enjang-hasan-kurnia-s-i-k"
  },
  {
    "slug": "priyo-waseso-s-si-m-p-p",
    "name": "PRIYO WASESO, S.Si., M.P.P.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2006"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "LEMHANNAS 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan PRIYO WASESO, S.Si., M.P.P. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "PRIYO WASESO, S.Si., M.P.P. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/priyo-waseso-s-si-m-p-p"
  },
  {
    "slug": "nurcholis-s-i-k-m-si",
    "name": "NURCHOLIS, S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 1990"
    ],
    "developmentEducation": [
      "PKN TK. I 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan NURCHOLIS, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "NURCHOLIS, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/nurcholis-s-i-k-m-si"
  },
  {
    "slug": "r-ferry-indarmawan-s-h-s-i-k",
    "name": "R. FERRY INDARMAWAN, S.H., S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 1997"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "PKN TK. I 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan R. FERRY INDARMAWAN, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "R. FERRY INDARMAWAN, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/r-ferry-indarmawan-s-h-s-i-k"
  },
  {
    "slug": "oktavianus-marthin-s-i-k",
    "name": "OKTAVIANUS MARTHIN, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan OKTAVIANUS MARTHIN, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "OKTAVIANUS MARTHIN, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/oktavianus-marthin-s-i-k"
  },
  {
    "slug": "muhammad-arif-sugiarto-s-i-k-m-p-p",
    "name": "MUHAMMAD ARIF SUGIARTO, S.I.K., M.P.P.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2019"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "LEMHANNAS 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD ARIF SUGIARTO, S.I.K., M.P.P. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "MUHAMMAD ARIF SUGIARTO, S.I.K., M.P.P. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-arif-sugiarto-s-i-k-m-p-p"
  },
  {
    "slug": "hando-wibowo-s-i-k-m-si-m-han",
    "name": "HANDO WIBOWO, S.I.K., M,Si., M.Han.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2020"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "LEMHANNAS 2025"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HANDO WIBOWO, S.I.K., M,Si., M.Han. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "HANDO WIBOWO, S.I.K., M,Si., M.Han. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hando-wibowo-s-i-k-m-si-m-han"
  },
  {
    "slug": "sugeng-putut-wicaksono-s-i-k",
    "name": "SUGENG PUTUT WICAKSONO, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SUGENG PUTUT WICAKSONO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "SUGENG PUTUT WICAKSONO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/sugeng-putut-wicaksono-s-i-k"
  },
  {
    "slug": "juda-nusa-putra-s-i-k-m-m",
    "name": "JUDA NUSA PUTRA, S.I.K., M.M.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2020"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan JUDA NUSA PUTRA, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "JUDA NUSA PUTRA, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/juda-nusa-putra-s-i-k-m-m"
  },
  {
    "slug": "sangkan-bonaparte-silalahi-s-i-k",
    "name": "SANGKAN BONAPARTE SILALAHI, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "LEMHANNAS 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SANGKAN BONAPARTE SILALAHI, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "SANGKAN BONAPARTE SILALAHI, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/sangkan-bonaparte-silalahi-s-i-k"
  },
  {
    "slug": "dwi-subagio-s-i-k-m-h",
    "name": "DWI SUBAGIO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2020"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESKO TNI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DWI SUBAGIO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "DWI SUBAGIO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dwi-subagio-s-i-k-m-h"
  },
  {
    "slug": "yosef-sriyono-joko-handono-s-i-k-m-h",
    "name": "YOSEF SRIYONO JOKO HANDONO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2014"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YOSEF SRIYONO JOKO HANDONO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "YOSEF SRIYONO JOKO HANDONO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yosef-sriyono-joko-handono-s-i-k-m-h"
  },
  {
    "slug": "fajar-budiyanto-s-i-k-m-m",
    "name": "FAJAR BUDIYANTO, S.I.K., M.M.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2025"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "PKN TK. I 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan FAJAR BUDIYANTO, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "FAJAR BUDIYANTO, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/fajar-budiyanto-s-i-k-m-m"
  },
  {
    "slug": "irwan-anwar-s-i-k-m-m",
    "name": "IRWAN ANWAR, S.I.K., M.M.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2016"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan IRWAN ANWAR, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "IRWAN ANWAR, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/irwan-anwar-s-i-k-m-m"
  },
  {
    "slug": "jimmy-agustinus-anes-s-i-k",
    "name": "JIMMY AGUSTINUS ANES, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "LEMHANNAS 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan JIMMY AGUSTINUS ANES, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "JIMMY AGUSTINUS ANES, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/jimmy-agustinus-anes-s-i-k"
  },
  {
    "slug": "dr-harryo-sugihhartono-s-i-k-m-h",
    "name": "Dr. HARRYO SUGIHHARTONO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-3 2023"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. HARRYO SUGIHHARTONO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "Dr. HARRYO SUGIHHARTONO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-harryo-sugihhartono-s-i-k-m-h"
  },
  {
    "slug": "nicolas-ary-lilipalyn-s-i-k-m-h-m-si",
    "name": "NICOLAS ARY LILIPALYN S.I.K., M.H., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESKO TNI 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan NICOLAS ARY LILIPALYN S.I.K., M.H., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "NICOLAS ARY LILIPALYN S.I.K., M.H., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/nicolas-ary-lilipalyn-s-i-k-m-h-m-si"
  },
  {
    "slug": "hendra-kurniawan-s-i-k-m-m-m-h",
    "name": "HENDRA KURNIAWAN, S.I.K., M.M., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2024"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HENDRA KURNIAWAN, S.I.K., M.M., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "HENDRA KURNIAWAN, S.I.K., M.M., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hendra-kurniawan-s-i-k-m-m-m-h"
  },
  {
    "slug": "r-deden-garnada-s-i-k-m-han",
    "name": "R. DEDEN GARNADA, S.I.K., M.Han.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESKO TNI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan R. DEDEN GARNADA, S.I.K., M.Han. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "R. DEDEN GARNADA, S.I.K., M.Han. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/r-deden-garnada-s-i-k-m-han"
  },
  {
    "slug": "tri-bisono-soemiharso-s-i-k-m-h",
    "name": "TRI BISONO SOEMIHARSO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESKO TNI 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan TRI BISONO SOEMIHARSO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "TRI BISONO SOEMIHARSO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/tri-bisono-soemiharso-s-i-k-m-h"
  },
  {
    "slug": "kurniadi-s-i-k-s-h-m-si",
    "name": "KURNIADI, S.I.K., S.H., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan KURNIADI, S.I.K., S.H., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "KURNIADI, S.I.K., S.H., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/kurniadi-s-i-k-s-h-m-si"
  },
  {
    "slug": "i-ketut-gede-wijatmika-s-i-k",
    "name": "I KETUT GEDE WIJATMIKA, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan I KETUT GEDE WIJATMIKA, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "I KETUT GEDE WIJATMIKA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/i-ketut-gede-wijatmika-s-i-k"
  },
  {
    "slug": "denny-setia-nugraha-nasution-s-i-k-m-h",
    "name": "DENNY SETIA NUGRAHA NASUTION, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DENNY SETIA NUGRAHA NASUTION, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "DENNY SETIA NUGRAHA NASUTION, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/denny-setia-nugraha-nasution-s-i-k-m-h"
  },
  {
    "slug": "nurhandono-s-i-k-m-h",
    "name": "NURHANDONO, S.I.K., M.H.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan NURHANDONO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "NURHANDONO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/nurhandono-s-i-k-m-h"
  },
  {
    "slug": "hery-dian-dwiharto-s-i-k",
    "name": "HERY DIAN DWIHARTO, S.I.K.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HERY DIAN DWIHARTO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "HERY DIAN DWIHARTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hery-dian-dwiharto-s-i-k"
  },
  {
    "slug": "semmy-ronny-thabaa-s-e",
    "name": "SEMMY RONNY THABAA, S.E.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SEMMY RONNY THABAA, S.E. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "SEMMY RONNY THABAA, S.E. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/semmy-ronny-thabaa-s-e"
  },
  {
    "slug": "ivan-adhityas-nugraha-s-i-k-m-si",
    "name": "IVAN ADHITYAS NUGRAHA, S.I.K., M.Si.",
    "rank": "BRIGJEN POL",
    "position": "WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan IVAN ADHITYAS NUGRAHA, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM di Sespim.",
    "bio": [
      "IVAN ADHITYAS NUGRAHA, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat BRIGJEN POL dan jabatan WIDYAISWARA KEPOLISIAN UTAMA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ivan-adhityas-nugraha-s-i-k-m-si"
  },
  {
    "slug": "r-kasero-manggolo-s-sos-s-h-m-h-m-si",
    "name": "R. KASERO MANGGOLO, S.Sos., S.H., M.H., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MUDA SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMTI 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan R. KASERO MANGGOLO, S.Sos., S.H., M.H., M.Si. sebagai WIDYAISWARA MUDA SESPIMTI di Sespim.",
    "bio": [
      "R. KASERO MANGGOLO, S.Sos., S.H., M.H., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MUDA SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/r-kasero-manggolo-s-sos-s-h-m-h-m-si"
  },
  {
    "slug": "dr-teddy-john-sahala-marbun-s-h-m-hum",
    "name": "Dr. TEDDY JOHN SAHALA MARBUN, S.H., M.Hum.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-3 2017"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "PKN TK. I 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan Dr. TEDDY JOHN SAHALA MARBUN, S.H., M.Hum. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "Dr. TEDDY JOHN SAHALA MARBUN, S.H., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dr-teddy-john-sahala-marbun-s-h-m-hum"
  },
  {
    "slug": "muhammad-barly-ramadhany-s-i-k-s-h-m-h",
    "name": "MUHAMMAD BARLY RAMADHANY, S.I.K., S.H., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2022"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "LEMHANNAS 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD BARLY RAMADHANY, S.I.K., S.H., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "MUHAMMAD BARLY RAMADHANY, S.I.K., S.H., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-barly-ramadhany-s-i-k-s-h-m-h"
  },
  {
    "slug": "deni-hermana-s-i-k-m-si",
    "name": "DENI HERMANA, S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2007"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMTI 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DENI HERMANA, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "DENI HERMANA, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/deni-hermana-s-i-k-m-si"
  },
  {
    "slug": "dede-alamsyah-s-i-k",
    "name": "DEDE ALAMSYAH, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DEDE ALAMSYAH, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "DEDE ALAMSYAH, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dede-alamsyah-s-i-k"
  },
  {
    "slug": "agus-wibowo-s-i-k",
    "name": "AGUS WIBOWO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2006"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "SESPIMTI 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan AGUS WIBOWO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "AGUS WIBOWO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/agus-wibowo-s-i-k"
  },
  {
    "slug": "benedictus-anies-purnawan-s-i-k-m-si",
    "name": "BENEDICTUS ANIES PURNAWAN, S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2006"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "LEMHANNAS 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BENEDICTUS ANIES PURNAWAN, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "BENEDICTUS ANIES PURNAWAN, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/benedictus-anies-purnawan-s-i-k-m-si"
  },
  {
    "slug": "ilham-saparona-s-i-k-s-h",
    "name": "ILHAM SAPARONA, S.I.K., S.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1 2009"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "LEMHANNAS 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ILHAM SAPARONA, S.I.K., S.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "ILHAM SAPARONA, S.I.K., S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ilham-saparona-s-i-k-s-h"
  },
  {
    "slug": "sarif-rahman-s-i-k-m-m",
    "name": "SARIF RAHMAN, S.I.K., M.M.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "PKN TK. I 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SARIF RAHMAN, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "SARIF RAHMAN, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/sarif-rahman-s-i-k-m-m"
  },
  {
    "slug": "budi-satrijo-s-i-k-m-hum",
    "name": "BUDI SATRIJO, S.I.K., M.Hum.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2009"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "SESPIMTI 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BUDI SATRIJO, S.I.K., M.Hum. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "BUDI SATRIJO, S.I.K., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/budi-satrijo-s-i-k-m-hum"
  },
  {
    "slug": "waluya-s-i-k",
    "name": "WALUYA, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan WALUYA, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "WALUYA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/waluya-s-i-k"
  },
  {
    "slug": "muhammad-anwar-reksowidjojo-s-h-s-i-k",
    "name": "MUHAMMAD ANWAR REKSOWIDJOJO, S.H., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2015"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "LEMHANNAS 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD ANWAR REKSOWIDJOJO, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "MUHAMMAD ANWAR REKSOWIDJOJO, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-anwar-reksowidjojo-s-h-s-i-k"
  },
  {
    "slug": "hariadi-s-h-s-i-k-m-h",
    "name": "HARIADI, S.H., S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2021"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESKO TNI 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HARIADI, S.H., S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "HARIADI, S.H., S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hariadi-s-h-s-i-k-m-h"
  },
  {
    "slug": "satria-adhy-permana-s-i-k-m-hum",
    "name": "SATRIA ADHY PERMANA, S.I.K., M.Hum.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMTI 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SATRIA ADHY PERMANA, S.I.K., M.Hum. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "SATRIA ADHY PERMANA, S.I.K., M.Hum. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/satria-adhy-permana-s-i-k-m-hum"
  },
  {
    "slug": "danu-kusworo-s-i-k",
    "name": "DANU KUSWORO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "SESPIMTI 2023"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DANU KUSWORO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "DANU KUSWORO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/danu-kusworo-s-i-k"
  },
  {
    "slug": "ruminio-ardano-s-i-k",
    "name": "RUMINIO ARDANO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2005"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMTI 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan RUMINIO ARDANO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "RUMINIO ARDANO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ruminio-ardano-s-i-k"
  },
  {
    "slug": "dolifar-manurung-s-i-k",
    "name": "DOLIFAR MANURUNG, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2004"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DOLIFAR MANURUNG, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "DOLIFAR MANURUNG, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dolifar-manurung-s-i-k"
  },
  {
    "slug": "budi-purwatiningsih-s-e-m-h",
    "name": "BUDI PURWATININGSIH, S.E., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "SEPA PK 1998"
    ],
    "developmentEducation": [
      "PKN TK. I 2025"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BUDI PURWATININGSIH, S.E., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "BUDI PURWATININGSIH, S.E., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/budi-purwatiningsih-s-e-m-h"
  },
  {
    "slug": "kingkin-winisuda-s-h-s-i-k",
    "name": "KINGKIN WINISUDA, S.H., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan KINGKIN WINISUDA, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "KINGKIN WINISUDA, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/kingkin-winisuda-s-h-s-i-k"
  },
  {
    "slug": "mugi-sekar-jaya-s-sos-s-i-k",
    "name": "MUGI SEKAR JAYA, S.Sos., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI",
    "subjects": [],
    "generalEducation": [
      "S-1 2003"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUGI SEKAR JAYA, S.Sos., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI di Sespim.",
    "bio": [
      "MUGI SEKAR JAYA, S.Sos., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. I SESPIMTI.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mugi-sekar-jaya-s-sos-s-i-k"
  },
  {
    "slug": "omad-s-i-k-m-si",
    "name": "OMAD, S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2012"
    ],
    "serviceEducation": [
      "AKPOL 1991"
    ],
    "developmentEducation": [
      "SESPIM 2008"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan OMAD, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "OMAD, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/omad-s-i-k-m-si"
  },
  {
    "slug": "ulami-sudjaja-s-h",
    "name": "ULAMI SUDJAJA, S.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 2006"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIM 2008"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ULAMI SUDJAJA, S.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "ULAMI SUDJAJA, S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ulami-sudjaja-s-h"
  },
  {
    "slug": "sigit-kusmardjoko-s-h-m-h",
    "name": "SIGIT KUSMARDJOKO, S.H., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2025"
    ],
    "serviceEducation": [
      "AKPOL 1990"
    ],
    "developmentEducation": [
      "PKN TK. I 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SIGIT KUSMARDJOKO, S.H., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "SIGIT KUSMARDJOKO, S.H., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/sigit-kusmardjoko-s-h-m-h"
  },
  {
    "slug": "fauza-barito-s-h",
    "name": "FAUZA BARITO, S.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 2002"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "SESPIMMEN 2008"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan FAUZA BARITO, S.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "FAUZA BARITO, S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/fauza-barito-s-h"
  },
  {
    "slug": "pepen-supena-wijaya-s-i-k",
    "name": "PEPEN SUPENA WIJAYA, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan PEPEN SUPENA WIJAYA, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "PEPEN SUPENA WIJAYA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/pepen-supena-wijaya-s-i-k"
  },
  {
    "slug": "guntur-hindarsyah-s-i-k",
    "name": "GUNTUR HINDARSYAH,S.I.K",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIM 2008"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan GUNTUR HINDARSYAH,S.I.K sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "GUNTUR HINDARSYAH,S.I.K tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/guntur-hindarsyah-s-i-k"
  },
  {
    "slug": "taryadi-s-i-k",
    "name": "TARYADI, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMMEN 2011"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan TARYADI, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "TARYADI, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/taryadi-s-i-k"
  },
  {
    "slug": "benyamin-sapta-tranggono-s-i-k-m-si",
    "name": "BENYAMIN SAPTA TRANGGONO, S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 1992"
    ],
    "developmentEducation": [
      "PKN TK. I 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BENYAMIN SAPTA TRANGGONO, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "BENYAMIN SAPTA TRANGGONO, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/benyamin-sapta-tranggono-s-i-k-m-si"
  },
  {
    "slug": "bartholomeus-meison-sagala-s-h-s-i-k-m-h",
    "name": "BARTHOLOMEUS MEISON SAGALA, S.H., S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2005"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESKO TNI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BARTHOLOMEUS MEISON SAGALA, S.H., S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "BARTHOLOMEUS MEISON SAGALA, S.H., S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/bartholomeus-meison-sagala-s-h-s-i-k-m-h"
  },
  {
    "slug": "wandy-rustiwan-s-i-k-m-m-tr",
    "name": "WANDY RUSTIWAN, S.I.K., M.M.Tr.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIMTI 2022"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan WANDY RUSTIWAN, S.I.K., M.M.Tr. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "WANDY RUSTIWAN, S.I.K., M.M.Tr. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/wandy-rustiwan-s-i-k-m-m-tr"
  },
  {
    "slug": "halasan-roland-situmeang-s-i-k",
    "name": "HALASAN ROLAND SITUMEANG, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2009"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "LEMHANNAS 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HALASAN ROLAND SITUMEANG, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "HALASAN ROLAND SITUMEANG, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/halasan-roland-situmeang-s-i-k"
  },
  {
    "slug": "m-hari-mulyanto-s-i-k-m-m",
    "name": "M. HARI MULYANTO, S.I.K., M.M.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan M. HARI MULYANTO, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "M. HARI MULYANTO, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/m-hari-mulyanto-s-i-k-m-m"
  },
  {
    "slug": "asep-amar-permana-s-i-k-m-m",
    "name": "ASEP AMAR PERMANA, S.I.K., M.M.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2009"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMMEN 2011"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ASEP AMAR PERMANA, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "ASEP AMAR PERMANA, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/asep-amar-permana-s-i-k-m-m"
  },
  {
    "slug": "noffan-widyayoko-s-i-k-m-a",
    "name": "NOFFAN WIDYAYOKO, S.I.K. M.A.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "SESPIMMEN 2009"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan NOFFAN WIDYAYOKO, S.I.K. M.A. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "NOFFAN WIDYAYOKO, S.I.K. M.A. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/noffan-widyayoko-s-i-k-m-a"
  },
  {
    "slug": "eko-wahyudi-s-i-k-m-h",
    "name": "EKO WAHYUDI, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan EKO WAHYUDI, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "EKO WAHYUDI, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/eko-wahyudi-s-i-k-m-h"
  },
  {
    "slug": "i-made-kusuma-jaya-s-h-s-i-k",
    "name": "I MADE KUSUMA JAYA, S.H., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 2005"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMTI 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan I MADE KUSUMA JAYA, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "I MADE KUSUMA JAYA, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/i-made-kusuma-jaya-s-h-s-i-k"
  },
  {
    "slug": "muhammad-helmi-s-i-k",
    "name": "MUHAMMAD HELMI, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMTI 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MUHAMMAD HELMI, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "MUHAMMAD HELMI, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/muhammad-helmi-s-i-k"
  },
  {
    "slug": "yury-nurhidayat-s-i-k-m-h",
    "name": "YURY NURHIDAYAT, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2012"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YURY NURHIDAYAT, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "YURY NURHIDAYAT, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yury-nurhidayat-s-i-k-m-h"
  },
  {
    "slug": "ardi-sutriono-s-i-k",
    "name": "ARDI SUTRIONO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ARDI SUTRIONO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "ARDI SUTRIONO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ardi-sutriono-s-i-k"
  },
  {
    "slug": "yoga-prasetyo-s-i-k",
    "name": "YOGA PRASETYO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2019"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMTI 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YOGA PRASETYO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "YOGA PRASETYO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yoga-prasetyo-s-i-k"
  },
  {
    "slug": "dedi-agustono-s-i-k-m-h",
    "name": "DEDI AGUSTONO, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2018"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "LEMHANNAS 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DEDI AGUSTONO, S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "DEDI AGUSTONO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dedi-agustono-s-i-k-m-h"
  },
  {
    "slug": "didik-dwi-santoso-s-i-k",
    "name": "DIDIK DWI SANTOSO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2013"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DIDIK DWI SANTOSO, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "DIDIK DWI SANTOSO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/didik-dwi-santoso-s-i-k"
  },
  {
    "slug": "darmawan-affandy-s-i-k-m-m",
    "name": "DARMAWAN AFFANDY, S.I.K., M.M.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DARMAWAN AFFANDY, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN di Sespim.",
    "bio": [
      "DARMAWAN AFFANDY, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/darmawan-affandy-s-i-k-m-m"
  },
  {
    "slug": "hendra-gunawan-s-i-k-m-t",
    "name": "HENDRA GUNAWAN, S.I.K., M.T.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 2001"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HENDRA GUNAWAN, S.I.K., M.T. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIM di Sespim.",
    "bio": [
      "HENDRA GUNAWAN, S.I.K., M.T. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. II SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hendra-gunawan-s-i-k-m-t"
  },
  {
    "slug": "eka-djunaedi-s-sos-s-i-k",
    "name": "EKA DJUNAEDI, S.Sos., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MUDA SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 2002"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "SESPIM 2008"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan EKA DJUNAEDI, S.Sos., S.I.K. sebagai WIDYAISWARA MUDA SESPIMMEN di Sespim.",
    "bio": [
      "EKA DJUNAEDI, S.Sos., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MUDA SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/eka-djunaedi-s-sos-s-i-k"
  },
  {
    "slug": "purnama-s-i-k",
    "name": "PURNAMA, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MUDA SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 19994"
    ],
    "developmentEducation": [
      "SESPIMMEN 2011"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan PURNAMA, S.I.K. sebagai WIDYAISWARA MUDA SESPIMMEN di Sespim.",
    "bio": [
      "PURNAMA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MUDA SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/purnama-s-i-k"
  },
  {
    "slug": "mahyudi-nazriansyah-s-i-k",
    "name": "MAHYUDI NAZRIANSYAH, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MUDA SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1995"
    ],
    "developmentEducation": [
      "SESPIMMEN 2011"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MAHYUDI NAZRIANSYAH, S.I.K. sebagai WIDYAISWARA MUDA SESPIMMEN di Sespim.",
    "bio": [
      "MAHYUDI NAZRIANSYAH, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MUDA SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mahyudi-nazriansyah-s-i-k"
  },
  {
    "slug": "junoto-s-i-k-m-h",
    "name": "JUNOTO, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MUDA SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1999"
    ],
    "developmentEducation": [
      "SESPIMMEN 2013"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan JUNOTO, S.I.K., M.H. sebagai WIDYAISWARA MUDA SESPIMMEN di Sespim.",
    "bio": [
      "JUNOTO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MUDA SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/junoto-s-i-k-m-h"
  },
  {
    "slug": "asrial-kurniansyah-s-h",
    "name": "ASRIAL KURNIANSYAH, S.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "PKN TK. II 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ASRIAL KURNIANSYAH, S.H. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "ASRIAL KURNIANSYAH, S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/asrial-kurniansyah-s-h"
  },
  {
    "slug": "yoga-prastowo-s-i-k-m-t",
    "name": "YOGA PRASTOWO, S.I.K., M.T.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMMEN 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YOGA PRASTOWO, S.I.K., M.T. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "YOGA PRASTOWO, S.I.K., M.T. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yoga-prastowo-s-i-k-m-t"
  },
  {
    "slug": "barliansyah-s-i-k-m-h",
    "name": "BARLIANSYAH, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2018"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "SESPIMMEN 2015"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BARLIANSYAH, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "BARLIANSYAH, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/barliansyah-s-i-k-m-h"
  },
  {
    "slug": "indera-gunawan-s-i-k",
    "name": "INDERA GUNAWAN, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan INDERA GUNAWAN, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "INDERA GUNAWAN, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/indera-gunawan-s-i-k"
  },
  {
    "slug": "ari-lasta-irawan-s-i-k-m-s-m",
    "name": "ARI LASTA IRAWAN, S.I.K., M.S.M.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1999"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ARI LASTA IRAWAN, S.I.K., M.S.M. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "ARI LASTA IRAWAN, S.I.K., M.S.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ari-lasta-irawan-s-i-k-m-s-m"
  },
  {
    "slug": "fillol-praja-arthadira-s-h-s-i-k",
    "name": "FILLOL PRAJA ARTHADIRA, S.H., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 2005"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan FILLOL PRAJA ARTHADIRA, S.H., S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "FILLOL PRAJA ARTHADIRA, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/fillol-praja-arthadira-s-h-s-i-k"
  },
  {
    "slug": "m-arif-rifa-i-s-i-k",
    "name": "M. ARIF RIFA'I, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2011"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan M. ARIF RIFA'I, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "M. ARIF RIFA'I, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/m-arif-rifa-i-s-i-k"
  },
  {
    "slug": "deny-agung-andriana-s-i-k-m-h",
    "name": "DENY AGUNG ANDRIANA, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2014"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2015"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DENY AGUNG ANDRIANA, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "DENY AGUNG ANDRIANA, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/deny-agung-andriana-s-i-k-m-h"
  },
  {
    "slug": "eka-surahman-s-i-k",
    "name": "EKA SURAHMAN, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2006"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2015"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan EKA SURAHMAN, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "EKA SURAHMAN, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/eka-surahman-s-i-k"
  },
  {
    "slug": "andi-sophian-s-i-k",
    "name": "ANDI SOPHIAN, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2005"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMMEN 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ANDI SOPHIAN, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "ANDI SOPHIAN, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/andi-sophian-s-i-k"
  },
  {
    "slug": "tulus-juswantoro-s-i-k",
    "name": "TULUS JUSWANTORO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2002"
    ],
    "serviceEducation": [
      "AKPOL 1993"
    ],
    "developmentEducation": [
      "PKN TK. I 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan TULUS JUSWANTORO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "TULUS JUSWANTORO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/tulus-juswantoro-s-i-k"
  },
  {
    "slug": "andri-iskandar-s-i-k-m-si-m-h",
    "name": "ANDRI ISKANDAR, S.I.K., M.Si., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2015"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ANDRI ISKANDAR, S.I.K., M.Si., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "ANDRI ISKANDAR, S.I.K., M.Si., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/andri-iskandar-s-i-k-m-si-m-h"
  },
  {
    "slug": "ruli-andi-yunianto-s-i-k",
    "name": "RULI ANDI YUNIANTO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2005"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMMEN 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan RULI ANDI YUNIANTO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "RULI ANDI YUNIANTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ruli-andi-yunianto-s-i-k"
  },
  {
    "slug": "edwin-affandi-s-i-k-m-h-cphr",
    "name": "EDWIN AFFANDI, S.I.K., M.H., CPHR.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2017"
    ],
    "serviceEducation": [
      "AKPOL 2002"
    ],
    "developmentEducation": [
      "SESPIMMEN 2017"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan EDWIN AFFANDI, S.I.K., M.H., CPHR. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "EDWIN AFFANDI, S.I.K., M.H., CPHR. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/edwin-affandi-s-i-k-m-h-cphr"
  },
  {
    "slug": "heru-ekwanto-s-i-k",
    "name": "HERU EKWANTO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2007"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HERU EKWANTO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "HERU EKWANTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/heru-ekwanto-s-i-k"
  },
  {
    "slug": "hadi-syafriadin-s-i-k",
    "name": "HADI SYAFRIADIN, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2004"
    ],
    "serviceEducation": [
      "AKPOL 1994"
    ],
    "developmentEducation": [
      "PKN TK. II 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HADI SYAFRIADIN, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "HADI SYAFRIADIN, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hadi-syafriadin-s-i-k"
  },
  {
    "slug": "teja-lesmana-s-i-k",
    "name": "TEJA LESMANA, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2009"
    ],
    "serviceEducation": [
      "AKPOL 1997"
    ],
    "developmentEducation": [
      "SESPIMMEN 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan TEJA LESMANA, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "TEJA LESMANA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/teja-lesmana-s-i-k"
  },
  {
    "slug": "leo-hamonangan-siagian-s-i-k-m-sc",
    "name": "LEO HAMONANGAN SIAGIAN, S.I.K., M.Sc.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2008"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMMEN 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan LEO HAMONANGAN SIAGIAN, S.I.K., M.Sc. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "LEO HAMONANGAN SIAGIAN, S.I.K., M.Sc. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/leo-hamonangan-siagian-s-i-k-m-sc"
  },
  {
    "slug": "bima-aria-viyasa-s-i-k-m-h",
    "name": "BIMA ARIA VIYASA, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BIMA ARIA VIYASA, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "BIMA ARIA VIYASA, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/bima-aria-viyasa-s-i-k-m-h"
  },
  {
    "slug": "agus-bahari-parama-artha-s-i-k-s-h-m-si",
    "name": "AGUS BAHARI PARAMA ARTHA, S.I.K., S.H., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2014"
    ],
    "serviceEducation": [
      "AKPOL 2004"
    ],
    "developmentEducation": [
      "SESPIMMEN 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan AGUS BAHARI PARAMA ARTHA, S.I.K., S.H., M.Si. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "AGUS BAHARI PARAMA ARTHA, S.I.K., S.H., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/agus-bahari-parama-artha-s-i-k-s-h-m-si"
  },
  {
    "slug": "ichsan-nur-s-i-k",
    "name": "ICHSAN NUR, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ICHSAN NUR, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "ICHSAN NUR, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/ichsan-nur-s-i-k"
  },
  {
    "slug": "indra-novianto-s-i-k-m-h-m-si-cphr",
    "name": "INDRA NOVIANTO, S.I.K., M.H., M.Si., CPHR.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2 2023"
    ],
    "serviceEducation": [
      "AKPOL 2004"
    ],
    "developmentEducation": [
      "SESPIMMEN 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan INDRA NOVIANTO, S.I.K., M.H., M.Si., CPHR. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "INDRA NOVIANTO, S.I.K., M.H., M.Si., CPHR. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/indra-novianto-s-i-k-m-h-m-si-cphr"
  },
  {
    "slug": "galih-indragiri-s-i-k",
    "name": "GALIH INDRAGIRI, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2007"
    ],
    "serviceEducation": [
      "AKPOL 2001"
    ],
    "developmentEducation": [
      "SESPIMMEN 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan GALIH INDRAGIRI, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "GALIH INDRAGIRI, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/galih-indragiri-s-i-k"
  },
  {
    "slug": "yusfandi-usman-s-i-k-m-i-k",
    "name": "YUSFANDI USMAN, S.I.K., M.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 2003"
    ],
    "developmentEducation": [
      "SESPIMMEN 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan YUSFANDI USMAN, S.I.K., M.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "YUSFANDI USMAN, S.I.K., M.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/yusfandi-usman-s-i-k-m-i-k"
  },
  {
    "slug": "doni-prakoso-widamanto-s-i-k",
    "name": "DONI PRAKOSO WIDAMANTO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIMMEN",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DONI PRAKOSO WIDAMANTO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIMMEN di Sespim.",
    "bio": [
      "DONI PRAKOSO WIDAMANTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIMMEN.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/doni-prakoso-widamanto-s-i-k"
  },
  {
    "slug": "driharto-s-i-k",
    "name": "DRIHARTO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1999"
    ],
    "developmentEducation": [
      "SESPIMMEN 2014"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DRIHARTO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "DRIHARTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/driharto-s-i-k"
  },
  {
    "slug": "henry-posma-lubis-s-i-k-m-h",
    "name": "HENRY POSMA LUBIS, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 2013"
    ],
    "serviceEducation": [
      "AKPOL 1998"
    ],
    "developmentEducation": [
      "SESPIMMEN 2012"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HENRY POSMA LUBIS, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "HENRY POSMA LUBIS, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/henry-posma-lubis-s-i-k-m-h"
  },
  {
    "slug": "andri-siswan-ansyah-s-i-k-m-h",
    "name": "ANDRI SISWAN ANSYAH, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-2 2012"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ANDRI SISWAN ANSYAH, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "ANDRI SISWAN ANSYAH, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/andri-siswan-ansyah-s-i-k-m-h"
  },
  {
    "slug": "gatot-istanto-s-i-k",
    "name": "GATOT ISTANTO, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [
      "S-1 KIK 2008"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2020"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan GATOT ISTANTO, S.I.K. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "GATOT ISTANTO, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/gatot-istanto-s-i-k"
  },
  {
    "slug": "bronto-budiyono-s-i-k-m-h",
    "name": "BRONTO BUDIYONO, S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan BRONTO BUDIYONO, S.I.K., M.H. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "BRONTO BUDIYONO, S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/bronto-budiyono-s-i-k-m-h"
  },
  {
    "slug": "mochamad-nur-azis-s-h-s-i-k-m-si",
    "name": "MOCHAMAD NUR AZIS, S.H., S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA MADYA TK. III SESPIM",
    "subjects": [],
    "generalEducation": [],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan MOCHAMAD NUR AZIS, S.H., S.I.K., M.Si. sebagai WIDYAISWARA MADYA TK. III SESPIM di Sespim.",
    "bio": [
      "MOCHAMAD NUR AZIS, S.H., S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA MADYA TK. III SESPIM.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/mochamad-nur-azis-s-h-s-i-k-m-si"
  },
  {
    "slug": "grace-krisna-d-rahakbau-s-i-k-m-si",
    "name": "GRACE KRISNA D. RAHAKBAU, S.I.K., M.Si.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2 2013"
    ],
    "serviceEducation": [
      "SEBA 1996"
    ],
    "developmentEducation": [
      "SESPIMMEN 2016"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan GRACE KRISNA D. RAHAKBAU, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA di Sespim.",
    "bio": [
      "GRACE KRISNA D. RAHAKBAU, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/grace-krisna-d-rahakbau-s-i-k-m-si"
  },
  {
    "slug": "efrianza-s-i-k",
    "name": "EFRIANZA, S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2 2011"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2021"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan EFRIANZA, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA di Sespim.",
    "bio": [
      "EFRIANZA, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/efrianza-s-i-k"
  },
  {
    "slug": "hidayat-s-h-s-i-k",
    "name": "HIDAYAT, S.H., S.I.K.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 2000"
    ],
    "developmentEducation": [
      "SESPIMMEN 2018"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HIDAYAT, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA di Sespim.",
    "bio": [
      "HIDAYAT, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/hidayat-s-h-s-i-k"
  },
  {
    "slug": "didit-eko-herawanto-s-i-k-s-h",
    "name": "DIDIT EKO HERAWANTO, S.I.K., S.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "AKPOL 1996"
    ],
    "developmentEducation": [
      "PKN TK. II 2024"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DIDIT EKO HERAWANTO, S.I.K., S.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA di Sespim.",
    "bio": [
      "DIDIT EKO HERAWANTO, S.I.K., S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/didit-eko-herawanto-s-i-k-s-h"
  },
  {
    "slug": "dhani-gumilar-s-h-s-i-k-m-h",
    "name": "DHANI GUMILAR, S.H., S.I.K., M.H.",
    "rank": "KOMBES POL",
    "position": "WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "AKPOL 2001"
    ],
    "developmentEducation": [
      "SESPIMMEN 2019"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DHANI GUMILAR, S.H., S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA di Sespim.",
    "bio": [
      "DHANI GUMILAR, S.H., S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMBES POL dan jabatan WIDYAISWARA KEPOLISIAN MADYA TK. III SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dhani-gumilar-s-h-s-i-k-m-h"
  },
  {
    "slug": "asep-kamaludin-m-m",
    "name": "ASEP KAMALUDIN, M.M",
    "rank": "AKBP",
    "position": "GADIK MADYA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [
      "SEPA 1997"
    ],
    "developmentEducation": [
      "SESPIMMA 2014"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ASEP KAMALUDIN, M.M sebagai GADIK MADYA di Sespim.",
    "bio": [
      "ASEP KAMALUDIN, M.M tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan GADIK MADYA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/asep-kamaludin-m-m"
  },
  {
    "slug": "dewi-susilo-pangestuti-s-ak",
    "name": "DEWI SUSILO PANGESTUTI, S.Ak.",
    "rank": "AKBP",
    "position": "GADIK MADYA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [],
    "developmentEducation": [],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DEWI SUSILO PANGESTUTI, S.Ak. sebagai GADIK MADYA di Sespim.",
    "bio": [
      "DEWI SUSILO PANGESTUTI, S.Ak. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan GADIK MADYA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dewi-susilo-pangestuti-s-ak"
  },
  {
    "slug": "santhi-rianawati-s-h",
    "name": "SANTHI RIANAWATI, S.H.",
    "rank": "AKBP",
    "position": "GADIK MADYA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "PPSS 2000"
    ],
    "developmentEducation": [
      "PKN TK. II 2025"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan SANTHI RIANAWATI, S.H. sebagai GADIK MADYA di Sespim.",
    "bio": [
      "SANTHI RIANAWATI, S.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan GADIK MADYA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/santhi-rianawati-s-h"
  },
  {
    "slug": "heni-mardiyatmi-s-i-p-s-sos-m-sc",
    "name": "HENI MARDIYATMI, S.I.P., S.Sos., M.Sc.",
    "rank": "KOMPOL",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan HENI MARDIYATMI, S.I.P., S.Sos., M.Sc. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "HENI MARDIYATMI, S.I.P., S.Sos., M.Sc. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMPOL dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/heni-mardiyatmi-s-i-p-s-sos-m-sc"
  },
  {
    "slug": "anria-rosa-paliang-s-i-k",
    "name": "ANRIA ROSA PALIANG, S.I.K.",
    "rank": "AKBP",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan ANRIA ROSA PALIANG, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "ANRIA ROSA PALIANG, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/anria-rosa-paliang-s-i-k"
  },
  {
    "slug": "m-ichwan-nugraha-s-i-k-m-si",
    "name": "M. ICHWAN NUGRAHA, S.I.K., M.Si.",
    "rank": "KOMPOL",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan M. ICHWAN NUGRAHA, S.I.K., M.Si. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "M. ICHWAN NUGRAHA, S.I.K., M.Si. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMPOL dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/m-ichwan-nugraha-s-i-k-m-si"
  },
  {
    "slug": "lusy-juli-indriani-s-i-k",
    "name": "LUSY JULI INDRIANI, S.I.K.",
    "rank": "AKBP",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan LUSY JULI INDRIANI, S.I.K. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "LUSY JULI INDRIANI, S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/lusy-juli-indriani-s-i-k"
  },
  {
    "slug": "dina-novitasari-s-h-s-i-k-m-h",
    "name": "DINA NOVITASARI, S.H., S.I.K., M.H.",
    "rank": "AKBP",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan DINA NOVITASARI, S.H., S.I.K., M.H. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "DINA NOVITASARI, S.H., S.I.K., M.H. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/dina-novitasari-s-h-s-i-k-m-h"
  },
  {
    "slug": "rentha-uli-novita-pardede-s-h-s-i-k",
    "name": "RENTHA ULI NOVITA PARDEDE, S.H., S.I.K.",
    "rank": "KOMPOL",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan RENTHA ULI NOVITA PARDEDE, S.H., S.I.K. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "RENTHA ULI NOVITA PARDEDE, S.H., S.I.K. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMPOL dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/rentha-uli-novita-pardede-s-h-s-i-k"
  },
  {
    "slug": "rahmawaty-tumulo-s-i-k-m-m",
    "name": "RAHMAWATY TUMULO, S.I.K., M.M.",
    "rank": "AKBP",
    "position": "WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA",
    "subjects": [],
    "generalEducation": [
      "S-2"
    ],
    "serviceEducation": [],
    "developmentEducation": [
      "SESPIMMEN"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan RAHMAWATY TUMULO, S.I.K., M.M. sebagai WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA di Sespim.",
    "bio": [
      "RAHMAWATY TUMULO, S.I.K., M.M. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat AKBP dan jabatan WIDYAISWARA KEPOLISIAN MUDA TK. I SESPIMMA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/rahmawaty-tumulo-s-i-k-m-m"
  },
  {
    "slug": "toto-sugiarto-s-pd",
    "name": "TOTO SUGIARTO, S.Pd.",
    "rank": "KOMPOL",
    "position": "GADIK MUDA",
    "subjects": [],
    "generalEducation": [
      "S-1"
    ],
    "serviceEducation": [
      "SETA"
    ],
    "developmentEducation": [
      "SECAPA"
    ],
    "expertise": [],
    "professionalCertifications": [],
    "summary": "Profil kedinasan TOTO SUGIARTO, S.Pd. sebagai GADIK MUDA di Sespim.",
    "bio": [
      "TOTO SUGIARTO, S.Pd. tercatat dalam direktori profil Widyaiswara Sespim dengan pangkat KOMPOL dan jabatan GADIK MUDA.",
      "Data pendidikan umum, pendidikan kedinasan, dan pendidikan pengembangan ditampilkan sesuai data yang tersedia pada sumber resmi."
    ],
    "publications": [],
    "indexedPublications": [],
    "href": "/widyaiswara/profil/toto-sugiarto-s-pd"
  }
]

export const downloadItems: DownloadItem[] = [
  {
    slug: 'pedoman-akademik-sespim-2026',
    title: 'Pedoman Akademik Sespim 2026',
    category: 'Pedoman Akademik',
    updatedAt: '25 Juni 2026',
    format: 'PDF',
    size: '2.4 MB',
    version: 'v1.0',
    summary: 'Pedoman akademik baseline untuk tata kelola pendidikan, kedisiplinan, dan rujukan peserta didik.',
    body: [
      'Dokumen ini menjadi contoh detail unduhan yang memuat versi, format, ukuran, ringkasan, dan catatan penggunaan.',
      'Pada integrasi final, tombol unduh dapat diarahkan ke file resmi yang sudah divalidasi oleh pemilik dokumen.',
      'Metadata dokumen membantu pengguna memastikan dokumen yang dipakai adalah versi terbaru.'
    ],
    tags: ['Pedoman', 'Akademik', 'Peserta Didik'],
    href: '/unduhan/pedoman-akademik-sespim-2026'
  },
  {
    slug: 'template-naskap-peserta-didik',
    title: 'Template NASKAP Peserta Didik',
    category: 'Template NASKAP',
    updatedAt: '23 Juni 2026',
    format: 'DOCX',
    size: '680 KB',
    version: 'v1.0',
    summary: 'Template naskah akademik untuk mendukung penyusunan karya peserta didik.',
    body: [
      'Template NASKAP disiapkan agar peserta didik memiliki format penulisan yang konsisten.',
      'Detail unduhan dapat memuat instruksi singkat, versi dokumen, dan tautan pendukung terkait pembimbingan.',
      'File resmi dapat ditautkan setelah dokumen final tersedia dari unit akademik.'
    ],
    tags: ['Template', 'NASKAP', 'Akademik'],
    href: '/unduhan/template-naskap-peserta-didik'
  },
  {
    slug: 'formulir-layanan-akademik',
    title: 'Formulir Layanan Akademik',
    category: 'Formulir Umum',
    updatedAt: '21 Juni 2026',
    format: 'PDF',
    size: '520 KB',
    version: 'v1.0',
    summary: 'Formulir baseline untuk kebutuhan layanan akademik dan administrasi peserta didik.',
    body: [
      'Formulir layanan akademik menjadi contoh dokumen administratif yang dapat ditemukan melalui pusat unduhan.',
      'Struktur detail ini membantu pengguna melihat konteks dokumen sebelum mengunduhnya.',
      'Pada fase berikutnya, daftar formulir dapat difilter berdasarkan unit, kategori, atau kebutuhan layanan.'
    ],
    tags: ['Formulir', 'Layanan', 'Administrasi'],
    href: '/unduhan/formulir-layanan-akademik'
  }
]

export function findNewsItem(slug: string) {
  return newsItems.find((item) => item.slug === slug)
}

export function findPublicationItem(slug: string) {
  return publicationItems.find((item) => item.slug === slug)
}

export function findEducatorProfile(slug: string) {
  return educatorProfiles.find((item) => item.slug === slug)
}

export function findDownloadItem(slug: string) {
  return downloadItems.find((item) => item.slug === slug)
}
