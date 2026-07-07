export type EducatorPublicationCategory = 'Buku' | 'Jurnal' | 'Pemikiran' | 'Kajian'

export type EducatorPublication = {
  slug: string
  title: string
  category: EducatorPublicationCategory
  author: string
  year: string
  summary: string
  keywords: string[]
  href?: string
  fileName?: string
  format?: string
}

export const educatorPublicationCategories: EducatorPublicationCategory[] = ['Buku', 'Jurnal', 'Pemikiran', 'Kajian']

export const educatorPublications: EducatorPublication[] = [
  {
    slug: 'repository-buku-widyaiswara',
    title: 'Repository Buku Widyaiswara',
    category: 'Buku',
    author: 'Widyaiswara Sespim',
    year: '2026',
    summary: 'Ruang kurasi karya buku Widyaiswara yang dapat digunakan sebagai referensi kepemimpinan, manajemen, dan pendidikan Polri.',
    keywords: ['Buku', 'Referensi', 'Kepemimpinan'],
    format: 'PDF'
  },
  {
    slug: 'repository-jurnal-widyaiswara',
    title: 'Repository Jurnal Widyaiswara',
    category: 'Jurnal',
    author: 'Widyaiswara Sespim',
    year: '2026',
    summary: 'Ruang kurasi artikel jurnal Widyaiswara, termasuk publikasi ilmiah yang dapat ditautkan ke dokumen unggahan atau kanal jurnal resmi.',
    keywords: ['Jurnal', 'Artikel Ilmiah', 'Sinta/Scopus'],
    format: 'PDF/Link'
  },
  {
    slug: 'repository-pemikiran-widyaiswara',
    title: 'Repository Pemikiran Widyaiswara',
    category: 'Pemikiran',
    author: 'Widyaiswara Sespim',
    year: '2026',
    summary: 'Ruang kurasi pemikiran, opini akademik, dan catatan strategis Widyaiswara yang relevan sebagai rujukan peserta didik.',
    keywords: ['Pemikiran', 'Opini Akademik', 'Strategi'],
    format: 'PDF/Link'
  },
  {
    slug: 'repository-kajian-widyaiswara',
    title: 'Repository Kajian Widyaiswara',
    category: 'Kajian',
    author: 'Widyaiswara Sespim',
    year: '2026',
    summary: 'Ruang kurasi kajian Widyaiswara terkait kepolisian, keamanan, manajemen, dan lingkungan strategis.',
    keywords: ['Kajian', 'Policy Brief', 'Manajemen Kepolisian'],
    format: 'PDF'
  }
]
