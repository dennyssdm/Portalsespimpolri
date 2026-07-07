import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { findNewsItem, newsItems } from '@/data/contentCollections'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findNewsItem(slug)

  return {
    title: item ? `${item.title} | Berita Sespim` : 'Berita Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = findNewsItem(slug)

  if (!item) {
    notFound()
  }

  const related = newsItems
    .filter((news) => news.slug !== item.slug)
    .slice(0, 2)
    .map((news) => ({
      title: news.title,
      href: news.href,
      summary: news.summary
    }))

  return (
    <ContentDetailPage
      path={item.href}
      eyebrow={item.category}
      title={item.title}
      description={item.summary}
      body={item.body}
      meta={[
        { label: 'Kategori', value: item.category },
        { label: 'Tanggal', value: item.date },
        { label: 'Penulis', value: item.author }
      ]}
      tags={item.tags}
      backHref="/berita"
      backLabel="Kembali ke Daftar Berita"
      related={related}
    />
  )
}
