const newsQuery = 'Sespim Polri OR Sespim Lemdiklat Polri OR sespimlemdiklatpolri'
const encodedNewsQuery = encodeURIComponent(newsQuery)

export const googleNewsMonitoringHref = `https://news.google.com/search?q=${encodedNewsQuery}&hl=id&gl=ID&ceid=ID:id`

export const newsPortalMonitoringLinks = [
  {
    title: 'Google News',
    description: 'Pantauan lintas media untuk kata kunci Sespim Polri dan Sespim Lemdiklat Polri.',
    href: googleNewsMonitoringHref,
    meta: 'Aggregator'
  },
  {
    title: 'ANTARA News',
    description: 'Pencarian berita nasional dari kantor berita Indonesia.',
    href: 'https://www.antaranews.com/search?q=Sespim%20Polri',
    meta: 'Kantor Berita'
  },
  {
    title: 'Detik',
    description: 'Pencarian berita populer dan update harian terkait Sespim.',
    href: 'https://www.detik.com/search/searchall?query=Sespim%20Polri',
    meta: 'Portal Berita'
  },
  {
    title: 'Kompas',
    description: 'Pencarian berita dan artikel dari Kompas.',
    href: 'https://search.kompas.com/search/?q=Sespim%20Polri',
    meta: 'Portal Berita'
  },
  {
    title: 'Tempo',
    description: 'Pencarian berita dan laporan dari Tempo.',
    href: 'https://www.tempo.co/search?q=Sespim%20Polri',
    meta: 'Portal Berita'
  },
  {
    title: 'CNN Indonesia',
    description: 'Pencarian berita nasional dan kanal publik terkait Sespim.',
    href: 'https://www.cnnindonesia.com/search/?query=Sespim%20Polri',
    meta: 'Portal Berita'
  }
]

export const socialMonitoringLinks = [
  {
    title: 'Instagram Resmi',
    description: 'Kanal Instagram resmi Sespim Lemdiklat Polri.',
    href: 'https://www.instagram.com/sespimlemdiklatpolri/?hl=en',
    meta: 'Media Sosial'
  },
  {
    title: 'YouTube Resmi',
    description: 'Video kegiatan, publikasi, dan dokumentasi Sespim.',
    href: 'https://www.youtube.com/@sespimlemdiklatpolri',
    meta: 'Video'
  },
  {
    title: 'Facebook Resmi',
    description: 'Kanal Facebook resmi Sespim Lemdiklat Polri.',
    href: 'https://www.facebook.com/sespimlemdiklatpolri/',
    meta: 'Media Sosial'
  },
  {
    title: 'YouTube Search',
    description: 'Pencarian video publik terkait Sespim Polri.',
    href: 'https://www.youtube.com/results?search_query=sespim+lemdiklat+polri',
    meta: 'Pencarian'
  },
  {
    title: 'X Live Search',
    description: 'Pantauan percakapan publik dan hashtag terkait Sespim.',
    href: 'https://x.com/search?q=%22Sespim%20Polri%22%20OR%20%23SespimPolri&src=typed_query&f=live',
    meta: 'Hashtag'
  },
  {
    title: 'TikTok Search',
    description: 'Pencarian konten video pendek terkait Sespim Polri.',
    href: 'https://www.tiktok.com/search?q=sespim%20polri',
    meta: 'Video Sosial'
  }
]

export const sespimHashtagLinks = [
  {
    label: '#SespimPolri',
    href: 'https://www.instagram.com/explore/tags/sespimpolri/'
  },
  {
    label: '#SespimLemdiklatPolri',
    href: 'https://www.instagram.com/explore/tags/sespimlemdiklatpolri/'
  },
  {
    label: '#Sespim',
    href: 'https://www.instagram.com/explore/tags/sespim/'
  },
  {
    label: '#Sespimmen',
    href: 'https://www.instagram.com/explore/tags/sespimmen/'
  },
  {
    label: '#Sespimti',
    href: 'https://www.instagram.com/explore/tags/sespimti/'
  },
  {
    label: '#Sespimma',
    href: 'https://www.instagram.com/explore/tags/sespimma/'
  }
]
