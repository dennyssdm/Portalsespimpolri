import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { publicationItems } from '@/data/contentCollections'

export default function Page() {
  return (
    <ContentCollectionPage
      path="/publikasi"
      eyebrow="Publikasi"
      title="Daftar Publikasi, Literasi, dan Karya"
      description="Listing publikasi sebagai baseline untuk artikel, policy brief, kajian strategis, resensi, dan karya akademik."
      items={publicationItems.map((item) => ({
        title: item.title,
        category: item.category,
        date: item.date,
        meta: item.author,
        summary: item.summary,
        href: item.href,
        tags: item.tags
      }))}
    />
  )
}
