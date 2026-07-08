import type { NavItem, SocialLink } from '@/types'

export const navigation: NavItem[] = [
  {
    label: 'Beranda',
    href: '/',
    description: 'Wajah utama Portal Resmi Sespim Lemdiklat Polri.'
  },
  {
    label: 'Profil',
    href: '/profil',
    description: 'Informasi dasar kelembagaan Sespim Polri.',
    children: [
      { label: 'Sejarah Sespim', href: '/profil/sejarah' },
      { label: 'Visi dan Misi', href: '/profil/visi-misi' },
      { label: 'Tugas dan Fungsi', href: '/profil/tugas-fungsi' },
      { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
      { label: 'Pejabat Sespim', href: '/profil/pejabat' },
      { label: 'Fasilitas', href: '/profil/fasilitas' },
      {
        label: 'Kontak Profil',
        href: '/profil/kontak',
        children: [
          { label: 'Contact', href: '/profil/kontak/contact' },
          { label: 'Susunan Redaksi', href: '/profil/kontak/susunan-redaksi' }
        ]
      }
    ]
  },
  {
    label: 'Program Pendidikan',
    href: '/program-pendidikan',
    description: 'Informasi akademik dan unit pendidikan Sespim.',
    children: [
      { label: 'Kalender Pendidikan', href: '/program-pendidikan/kalender-pendidikan' },
      { label: 'Kurikulum Umum', href: '/program-pendidikan/kurikulum' },
      { label: 'Pedoman Akademik', href: '/program-pendidikan/pedoman-akademik' },
      { label: 'Evaluasi Pendidikan', href: '/program-pendidikan/evaluasi-pendidikan' },
      {
        label: 'Informasi Peserta Didik',
        href: '/program-pendidikan/peserta-didik',
        children: [
          { label: 'KKLN', href: '/program-pendidikan/peserta-didik/kkln' },
          { label: 'KKDN', href: '/program-pendidikan/peserta-didik/kkdn' },
          { label: 'PKB JUANG', href: '/program-pendidikan/peserta-didik/pkb-juang' },
          { label: 'Leader Expo', href: '/program-pendidikan/peserta-didik/leader-expo' },
          { label: 'Leadership Camp', href: '/program-pendidikan/peserta-didik/leadership-camp' },
          { label: 'Dashboard Intelijen', href: '/program-pendidikan/peserta-didik/dashboard-intelijen' }
        ]
      },
      { label: 'SESPIMMA', href: '/program-pendidikan/sespimma' },
      { label: 'SESPIMMEN', href: '/program-pendidikan/sespimmen' },
      { label: 'SPPK', href: '/program-pendidikan/sppk' },
      { label: 'SESPIMTI', href: '/program-pendidikan/sespimti' }
    ]
  },
  {
    label: 'Kelembagaan Internal',
    href: '/kelembagaan-internal',
    description: 'Penjabaran unit operasional dan fungsional Sespim.',
    children: [
      { label: 'SETLEM', href: '/kelembagaan-internal/setlem' },
      {
        label: 'JIANBANG',
        href: '/kelembagaan-internal/jianbang',
        children: [
          { label: 'IKAS Alumni / Tracer Study', href: '/kelembagaan-internal/jianbang/ikas-alumni' }
        ]
      },
      { label: 'BIDANG', href: '/kelembagaan-internal/bidang' }
    ]
  },
  {
    label: 'Widyaiswara',
    href: '/widyaiswara',
    description: 'Profil dan kapasitas akademik tenaga pendidik.',
    children: [
      { label: 'Profil Widyaiswara', href: '/widyaiswara/profil' },
      { label: 'Bidang Keahlian', href: '/widyaiswara/bidang-keahlian' },
      { label: 'Publikasi Widyaiswara', href: '/widyaiswara/publikasi' },
      { label: 'Materi Terbuka', href: '/widyaiswara/materi-terbuka' },
      { label: 'Pembimbingan Naskap', href: '/widyaiswara/pembimbingan-naskap' },
      { label: 'Inpassing', href: '/widyaiswara/inpassing' },
      { label: 'LSP / BNSP', href: 'https://lsppolri.id/' }
    ]
  },
  {
    label: 'Publikasi',
    href: '/publikasi',
    description: 'Pusat pengetahuan kepemimpinan Polri.',
    children: [
      { label: 'Artikel', href: '/publikasi/artikel' },
      { label: 'Policy Brief', href: '/publikasi/policy-brief' },
      { label: 'Kajian Strategis', href: '/publikasi/kajian-strategis' },
      { label: 'Naskah Akademik', href: '/publikasi/naskah-akademik' },
      { label: 'Jurnal Ilmiah', href: '/publikasi/jurnal-ilmiah' },
      { label: 'Resensi Buku', href: '/publikasi/resensi-buku' },
      { label: 'Karya Peserta Didik', href: '/publikasi/karya-peserta-didik' }
    ]
  },
  {
    label: 'Berita & Informasi Publik',
    href: '/berita',
    description: 'Pusat transparansi dan dinamika kampus.',
    children: [
      {
        label: 'Berita & Kegiatan',
        href: '/berita/kegiatan',
        children: [
          { label: 'Berita Internal Sespim', href: '/berita/kegiatan/berita-internal' },
          { label: 'Feed Up To Date', href: '/berita/kegiatan/feed-up-to-date' },
          { label: 'Portal Berita Nasional', href: '/berita/kegiatan/portal-berita' },
          { label: 'Media Sosial & Hashtag', href: '/berita/kegiatan/media-sosial-hashtag' }
        ]
      },
      { label: 'Agenda Pendidikan', href: '/berita/agenda' },
      { label: 'Informasi Publik', href: '/berita/informasi-publik' }
    ]
  },
  {
    label: 'Galeri & Unduhan',
    href: '/galeri',
    description: 'Dokumentasi kegiatan dan pusat dokumen.',
    children: [
      { label: 'Galeri Foto', href: '/galeri/foto' },
      { label: 'Galeri Video', href: '/galeri/video' },
      { label: 'Unduhan', href: '/unduhan' },
      { label: 'Pedoman Akademik', href: '/unduhan/pedoman-akademik' },
      { label: 'Template NASKAP', href: '/unduhan/template-naskap' },
      { label: 'Template Policy Brief', href: '/unduhan/template-policy-brief' },
      { label: 'Formulir Umum', href: '/unduhan/formulir' }
    ]
  },
  {
    label: 'Kontak',
    href: '/kontak',
    description: 'Alamat resmi, peta lokasi, media sosial, dan form kontak.'
  },
  {
    label: 'Sarana Prasarana',
    href: '/sarana-prasarana',
    description: 'Link pendukung kegiatan akademik dan kesejahteraan.',
    children: [
      { label: 'eLibrary', href: '/sarana-prasarana/elibrary' },
      { label: 'Perpusnas', href: 'https://satudata.perpusnas.go.id/' },
      { label: 'Ejurnal', href: '/sarana-prasarana/ejurnal' },
      { label: 'LMS SIAPSESPIM', href: '/sarana-prasarana/lms-siapsespim' },
      { label: 'Cek Plagiarisme', href: '/sarana-prasarana/cek-plagiarisme' },
      { label: 'Simulasi', href: '/sarana-prasarana/simulasi' },
      { label: 'Dashboard', href: '/sarana-prasarana/dashboard' },
      { label: 'Offcampus', href: '/sarana-prasarana/offcampus' },
      { label: 'Klinik Pratama', href: '/sarana-prasarana/klinik-pratama' }
    ]
  }
]

export const internalLoginLink: NavItem = {
  label: 'Login Internal',
  href: '/login',
  description: 'Akses masuk untuk personel, pengelola konten, dan layanan internal Sespim.'
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sespimlemdiklatpolri/?hl=en',
    platform: 'instagram'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sespimlemdiklatpolri/',
    platform: 'facebook'
  },
  {
    label: 'X',
    href: 'https://x.com/',
    platform: 'x'
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/',
    platform: 'threads'
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sespimlemdiklatpolri',
    platform: 'youtube'
  }
]
