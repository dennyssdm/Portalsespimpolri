import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { newsItems } from '@/data/contentCollections'

export default function Page() {
  return (
    <ContentCollectionPage
      path="/berita"
      eyebrow="Berita & Informasi Publik"
      title="Daftar Berita dan Informasi Publik"
      description="Listing berita, agenda, dan informasi publik sebagai baseline Phase 5 untuk konten dinamis Sespim."
      items={newsItems.map((item) => ({
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
