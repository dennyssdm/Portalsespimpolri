export type ProgramDetail = {
  slug: string
  title: string
  eyebrow: string
  href: string
  summary: string
  audience: string
  duration: string
  level: string
  focusTitle?: string
  outcomesTitle?: string
  stagesTitle?: string
  statusTitle?: string
  statusDescription?: string
  overview: string[]
  focusAreas: string[]
  outcomes: string[]
  stages: {
    title: string
    description: string
  }[]
  documents: {
    title: string
    href: string
  }[]
}

export const programDetails: Record<string, ProgramDetail> = {
  sespimma: {
    slug: 'sespimma',
    title: 'SESPIMMA',
    eyebrow: 'Program Pendidikan',
    href: '/program-pendidikan/sespimma',
    summary: 'Sekolah Staf dan Pimpinan Pertama Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.',
    audience: 'Perwira siswa Sespimma',
    duration: 'Menyesuaikan kalender pendidikan',
    level: 'Kepemimpinan tingkat pertama',
    focusTitle: 'Tugas Sespimma',
    outcomesTitle: 'Ruang Tanggung Jawab',
    stagesTitle: 'Fungsi Sespimma',
    statusTitle: 'Unsur Pelaksana Utama',
    statusDescription: 'Sespimma Sespim Lemdiklat Polri berkedudukan langsung di bawah Kasespim Polri dan menyelenggarakan pendidikan tingkat pertama.',
    overview: [
      'Sekolah Staf dan Pimpinan Pertama Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau Sespimma Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.',
      'Sespimma Sespim Lemdiklat Polri dipimpin oleh seorang Kepala Sespimma berpangkat bintang satu atau Brigadir Jenderal Polisi Victor Togi Tambunan, S.H., S.I.K.',
      'Sespimma menyelenggarakan pendidikan, pengajaran, pelatihan, bimbingan, dan pemeliharaan disiplin perwira siswa di lingkungan Sespimma.'
    ],
    focusAreas: ['Menyelenggarakan pendidikan', 'Menyusun program pendidikan', 'Merumuskan program pengajaran dan pelatihan', 'Melaksanakan bimbingan perwira siswa', 'Memelihara disiplin perwira siswa'],
    outcomes: ['Program pendidikan tersusun dan terlaksana', 'Kegiatan pengajaran dan pelatihan terkendali', 'Penilaian Widyaiswara, dosen, dan pembina terkoordinasi', 'Administrasi pendidikan dan evaluasi hasil pendidikan terdokumentasi'],
    stages: [
      { title: 'Rencana pendidikan', description: 'Menyusun rencana pendidikan, mengawasi, dan mengendalikan pelaksanaannya.' },
      { title: 'Perangkat kendali pendidikan', description: 'Melaksanakan koordinasi penyusunan perangkat kendali pendidikan Sespimma.' },
      { title: 'Pengajaran dan pelatihan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan pada Sespimma.' },
      { title: 'Penilaian pendidikan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan penilaian yang dilakukan oleh Widyaiswara, dosen, dan pembina.' },
      { title: 'Administrasi pendidikan', description: 'Melaksanakan administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.' },
      { title: 'Evaluasi hasil pendidikan', description: 'Melakukan perencanaan dan evaluasi terhadap tujuan materi pendidikan serta membuat laporan mengenai hasil pendidikan.' }
    ],
    documents: [
      { title: 'Kalender Pendidikan', href: '/program-pendidikan/kalender-pendidikan' },
      { title: 'Kurikulum Umum', href: '/program-pendidikan/kurikulum' }
    ]
  },
  sespimmen: {
    slug: 'sespimmen',
    title: 'SESPIMMEN',
    eyebrow: 'Program Pendidikan',
    href: '/program-pendidikan/sespimmen',
    summary: 'Sekolah Staf dan Pimpinan Menengah Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.',
    audience: 'Perwira siswa Sespimmen',
    duration: 'Menyesuaikan kalender pendidikan',
    level: 'Kepemimpinan tingkat menengah',
    focusTitle: 'Tugas Sespimmen',
    outcomesTitle: 'Ruang Tanggung Jawab',
    stagesTitle: 'Fungsi Sespimmen',
    statusTitle: 'Unsur Pelaksana Utama',
    statusDescription: 'Sespimmen Sespim Lemdiklat Polri berkedudukan langsung di bawah Kasespim Polri dan menyelenggarakan pendidikan tingkat menengah.',
    overview: [
      'Sekolah Staf dan Pimpinan Menengah Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau Sespimmen Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.',
      'Sespimmen Sespim Lemdiklat Polri dipimpin oleh seorang Kepala Sespimmen berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigadir Jenderal Polisi Rachmat Pamudji, S.I.K.',
      'Sespimmen menyelenggarakan pendidikan, pengajaran, pelatihan, bimbingan, dan pemeliharaan disiplin perwira siswa di lingkungan Sespimmen.'
    ],
    focusAreas: ['Menyelenggarakan pendidikan', 'Menyusun program pendidikan', 'Merumuskan program pengajaran dan pelatihan', 'Melaksanakan bimbingan perwira siswa', 'Memelihara disiplin perwira siswa'],
    outcomes: ['Program pendidikan tersusun dan terlaksana', 'Kegiatan pengajaran dan pelatihan terkendali', 'Penilaian Widyaiswara, dosen, dan pembina terkoordinasi', 'Administrasi pendidikan dan evaluasi hasil pendidikan terdokumentasi'],
    stages: [
      { title: 'Rencana pendidikan', description: 'Menyusun rencana pendidikan, mengawasi, dan mengendalikan pelaksanaannya.' },
      { title: 'Perangkat kendali pendidikan', description: 'Melaksanakan koordinasi penyusunan perangkat kendali pendidikan Sespimmen.' },
      { title: 'Pengajaran dan pelatihan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan pada Sespimmen.' },
      { title: 'Penilaian pendidikan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan penilaian yang dilakukan oleh Widyaiswara, dosen, dan pembina.' },
      { title: 'Administrasi pendidikan', description: 'Melaksanakan administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.' },
      { title: 'Evaluasi hasil pendidikan', description: 'Melakukan perencanaan dan evaluasi terhadap tujuan materi pendidikan serta membuat laporan mengenai hasil pendidikan.' }
    ],
    documents: [
      { title: 'Kurikulum Umum', href: '/program-pendidikan/kurikulum' },
      { title: 'Evaluasi Pendidikan', href: '/program-pendidikan/evaluasi-pendidikan' }
    ]
  },
  sppk: {
    slug: 'sppk',
    title: 'SPPK',
    eyebrow: 'Program Pendidikan',
    href: '/program-pendidikan/sppk',
    summary: 'Sekolah Pengembangan Profesi Kepolisian Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.',
    audience: 'Perwira siswa SPPK',
    duration: 'Menyesuaikan kalender pendidikan',
    level: 'Pengembangan profesi kepolisian',
    focusTitle: 'Tugas SPPK',
    outcomesTitle: 'Ruang Tanggung Jawab',
    stagesTitle: 'Fungsi SPPK',
    statusTitle: 'Unsur Pelaksana Utama',
    statusDescription: 'SPPK Sespim Lemdiklat Polri berkedudukan langsung di bawah Kasespim Polri dan menyelenggarakan pendidikan pengembangan profesi kepolisian.',
    overview: [
      'Sekolah Pengembangan Profesi Kepolisian, Sekolah Staf dan Pimpinan Lembaga Pendidikan dan Pelatihan Kepolisian Negara Republik Indonesia atau SPPK Sespim Lemdiklat Polri adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.',
      'SPPK Sespim Lemdiklat Polri dipimpin oleh seorang Kepala SPPK berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigjen Pol. Dr. H. Nurholis, S.I.K., M.Si.',
      'SPPK menyelenggarakan pendidikan, pengajaran, pelatihan, bimbingan, dan pemeliharaan disiplin perwira siswa di lingkungan SPPK.'
    ],
    focusAreas: ['Menyelenggarakan pendidikan', 'Menyusun program pendidikan', 'Merumuskan program pengajaran dan pelatihan', 'Melaksanakan bimbingan perwira siswa', 'Memelihara disiplin perwira siswa'],
    outcomes: ['Program pendidikan tersusun dan terlaksana', 'Kegiatan pengajaran dan pelatihan terkendali', 'Penilaian Widyaiswara, dosen, dan pembina terkoordinasi', 'Administrasi pendidikan dan evaluasi hasil pendidikan terdokumentasi'],
    stages: [
      { title: 'Rencana pendidikan', description: 'Menyusun rencana pendidikan, mengawasi, dan mengendalikan pelaksanaannya.' },
      { title: 'Perangkat kendali pendidikan', description: 'Melaksanakan koordinasi penyusunan perangkat kendali pendidikan SPPK.' },
      { title: 'Pengajaran dan pelatihan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan pada SPPK.' },
      { title: 'Penilaian pendidikan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan penilaian yang dilakukan oleh Widyaiswara, dosen, dan pembina.' },
      { title: 'Administrasi pendidikan', description: 'Melaksanakan administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.' },
      { title: 'Evaluasi hasil pendidikan', description: 'Melakukan perencanaan dan evaluasi terhadap tujuan materi pendidikan serta membuat laporan mengenai hasil pendidikan.' }
    ],
    documents: [
      { title: 'Informasi Peserta Didik', href: '/program-pendidikan/peserta-didik' },
      { title: 'Template NASKAP', href: '/unduhan/template-naskap' }
    ]
  },
  sespimti: {
    slug: 'sespimti',
    title: 'SESPIMTI',
    eyebrow: 'Program Pendidikan',
    href: '/program-pendidikan/sespimti',
    summary: 'Sekolah Staf dan Pimpinan Tinggi Sespim Lemdiklat Polri adalah unsur pelaksana utama yang berkedudukan langsung di bawah Kasespim Polri.',
    audience: 'Peserta Sespimti',
    duration: 'Menyesuaikan kalender pendidikan',
    level: 'Kepemimpinan tingkat tinggi',
    focusTitle: 'Tugas Sespimti',
    outcomesTitle: 'Ruang Tanggung Jawab',
    stagesTitle: 'Fungsi Sespimti',
    statusTitle: 'Unsur Pelaksana Utama',
    statusDescription: 'Sespimti Sespim Lemdiklat Polri berkedudukan langsung di bawah Kasespim Polri dan menyelenggarakan pendidikan kepemimpinan tingkat tinggi.',
    overview: [
      'Sekolah Staf dan Pimpinan Tinggi Sespim Lemdiklat Polri atau Sespimti Sespim Lemdiklat Polri, dahulu bernama Sekolah Staf Perwira Tinggi atau Sespati, adalah unsur pelaksana utama Sespim Lemdiklat Polri yang berkedudukan langsung di bawah Kasespim Polri.',
      'Sespimti Sespim Lemdiklat Polri dipimpin oleh seorang Kepala Sespimti berpangkat bintang satu atau Brigadir Jenderal Polisi dan saat ini dijabat oleh Brigadir Jenderal Polisi Eko Suprihanto, S.H., S.I.K., M.H.',
      'Sespimti menyelenggarakan pendidikan, pengajaran, pelatihan, bimbingan, dan pemeliharaan disiplin peserta di lingkungan Sespimti.',
      '<br/><h3 class="text-lg font-black text-polri-brownDark mt-2 border-b border-polri-gold/25 pb-2">Kurikulum Sespimti Polri 2026, Mencetak Pemimpin Masa Depan</h3>',
      '<strong>Visi dan Tema Pendidikan</strong> Menghadapi dinamika global dan tantangan keamanan nasional yang semakin kompleks, Sekolah Staf dan Pimpinan Tinggi (Sespimti) Polri Tahun Ajaran 2026 hadir dengan paradigma baru. Kurikulum tahun ini mengusung tema mulia: <strong>"Mewujudkan pimpinan tingkat tinggi Polri, kementerian, dan lembaga yang membangun keutamaan pendidikan berbasis moral dan literasi"</strong>. Program ini secara strategis dirancang untuk mendukung penuh program nasional dalam mencapai kedaulatan Pangan, Energi, dan Ekonomi yang produktif serta inklusif.',
      '<strong>Profil Lulusan: Pemimpin Transformatif & Kolaboratif</strong> Sespimti Polri bukan sekadar lembaga pendidikan, melainkan kawah candradimuka bagi para calon petinggi negara. Lulusan Sespimti diproyeksikan untuk menjadi:<br/><ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Pemimpin Strategis</strong> yang profesional, cerdas, bermoral, modern, transformatif, dan kolaboratif.</li><li><strong>Manajer Organisasi Tingkat Tinggi</strong> yang mampu mengambil keputusan di bawah tekanan, berintegritas, dan berorientasi pada pelayanan publik.</li></ul>',
      'Untuk mencapai profil tersebut, peserta didik dibekali dengan tiga pilar kompetensi utama: <strong>Kompetensi Manajerial</strong> (integritas, orientasi hasil, mengelola perubahan), <strong>Kompetensi Sosial Kultural</strong> (sebagai perekat persatuan bangsa yang anti-diskriminatif dan anti-KKN), serta <strong>Kompetensi Teknis</strong> (penguasaan manajemen strategis dan operasional institusi).',
      '<strong>Fokus Pembelajaran: Berbasis Praktik dan Pemecahan Masalah</strong> Pendidikan dilaksanakan secara intensif selama 5 bulan (1.000 Jam Pelajaran), dengan struktur yang sangat aplikatif, yaitu <strong>75% praktik dan 25% teori</strong>. Peserta didik akan mendalami materi-materi mutakhir yang dibagi ke dalam beberapa kelompok utama:<br/><ol class="list-decimal pl-5 mt-2 space-y-2"><li><strong>Penguatan Karakter Kebangsaan:</strong> Memperdalam sejarah, nilai-nilai Pancasila, etika kepemimpinan, dan wawasan nusantara untuk menjaga stabilitas dan persatuan nasional.</li><li><strong>Manajemen Strategis dan Kepemimpinan Organisasi:</strong> Mengembangkan kapasitas kepemimpinan di tingkat puncak, termasuk perumusan visi organisasi, manajemen perubahan, tata kelola sumber daya, serta koordinasi strategis lintas sektoral.</li><li><strong>Analisis Lingkungan Strategis (Geopolitik & Keamanan):</strong> Mengkaji secara komprehensif ancaman keamanan global, dinamika regional, geopolitik nasional, serta strategi penanganan isu kontemporer demi menjaga stabilitas kamtibmas.</li><li><strong>Teknologi dan Kepemimpinan Digital Berbasis Data:</strong> Membekali perwira tinggi dengan kemampuan adaptasi teknologi, tata kelola keamanan siber, dan pemanfaatan <em>big data</em> untuk pengambilan keputusan taktis dan strategis.</li><li><strong>Aplikasi Metodologi & Riset Strategis:</strong> Melatih penyusunan kajian ilmiah tingkat tinggi, termasuk Policy Brief, Naskah Akademik (NASTRAP), studi komparasi (KKLN/KKDN), serta pemecahan masalah (Problem-Based Learning) riil di lapangan.</li></ol>'
    ],
    focusAreas: ['Menyelenggarakan pendidikan', 'Menyusun program pendidikan', 'Merumuskan program pengajaran dan pelatihan', 'Melaksanakan bimbingan peserta', 'Memelihara disiplin peserta'],
    outcomes: ['Program pendidikan tersusun dan terlaksana', 'Kegiatan pengajaran dan pelatihan terkendali', 'Penilaian Widyaiswara, dosen, dan pembina terkoordinasi', 'Administrasi pendidikan dan evaluasi hasil pendidikan terdokumentasi'],
    stages: [
      { title: 'Rencana pendidikan dan pembinaan peserta', description: 'Menyusun rencana pendidikan, mengawasi, dan mengendalikan pelaksanaannya serta melaksanakan fungsi pembinaan peserta didik.' },
      { title: 'Perangkat kendali pendidikan', description: 'Melaksanakan koordinasi penyusunan perangkat kendali pendidikan Sespimti.' },
      { title: 'Pengajaran dan pelatihan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan kegiatan pengajaran dan pelatihan pada Sespimti.' },
      { title: 'Penilaian pendidikan', description: 'Melaksanakan koordinasi, pengendalian, dan pengawasan penilaian yang dilakukan oleh Widyaiswara, dosen, dan pembina.' },
      { title: 'Administrasi pendidikan', description: 'Melaksanakan administrasi pendidikan termasuk alins, alongins, instruktur, dan pembina.' },
      { title: 'Evaluasi hasil pendidikan', description: 'Melakukan perencanaan dan evaluasi terhadap tujuan materi pendidikan serta membuat laporan mengenai hasil pendidikan.' }
    ],
    documents: [
      { title: 'Kajian Strategis', href: '/publikasi/kajian-strategis' },
      { title: 'Policy Brief', href: '/publikasi/policy-brief' }
    ]
  }
}

export function findProgramDetail(slug: string) {
  return programDetails[slug]
}
