import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { findPublicationItem, publicationItems } from '@/data/contentCollections'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return publicationItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findPublicationItem(slug)

  return {
    title: item ? `${item.title} | Publikasi Sespim` : 'Publikasi Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = findPublicationItem(slug)

  if (!item) {
    notFound()
  }

  const related = publicationItems
    .filter((publication) => publication.slug !== item.slug)
    .slice(0, 2)
    .map((publication) => ({
      title: publication.title,
      href: publication.href,
      summary: publication.summary
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
      backHref="/publikasi"
      backLabel="Kembali ke Daftar Publikasi"
      related={related}
      action={{ label: 'Lihat Kategori Publikasi', href: '/publikasi/kajian-strategis' }}
    />
  )
}
