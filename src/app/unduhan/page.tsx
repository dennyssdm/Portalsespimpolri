import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { downloadItems } from '@/data/contentCollections'

export default function Page() {
  return (
    <ContentCollectionPage
      path="/unduhan"
      eyebrow="Unduhan"
      title="Daftar Dokumen dan Template"
      description="Listing unduhan sebagai baseline untuk pedoman, template, formulir, metadata file, dan halaman detail dokumen."
      items={downloadItems.map((item) => ({
        title: item.title,
        category: item.category,
        date: item.updatedAt,
        meta: `${item.format} • ${item.size}`,
        summary: item.summary,
        href: item.href,
        tags: item.tags
      }))}
    />
  )
}
