import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { downloadItems, findDownloadItem } from '@/data/contentCollections'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return downloadItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findDownloadItem(slug)

  return {
    title: item ? `${item.title} | Unduhan Sespim` : 'Unduhan Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = findDownloadItem(slug)

  if (!item) {
    notFound()
  }

  const related = downloadItems
    .filter((download) => download.slug !== item.slug)
    .slice(0, 2)
    .map((download) => ({
      title: download.title,
      href: download.href,
      summary: download.summary
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
        { label: 'Diperbarui', value: item.updatedAt },
        { label: 'Format', value: item.format },
        { label: 'Ukuran', value: item.size },
        { label: 'Versi', value: item.version }
      ]}
      tags={item.tags}
      backHref="/unduhan"
      backLabel="Kembali ke Daftar Unduhan"
      related={related}
      action={{ label: 'File Resmi Menyusul', disabled: true }}
    />
  )
}
