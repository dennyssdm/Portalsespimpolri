import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { newsItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

export default async function Page() {
  let displayItems = newsItems.map((item) => ({
    title: item.title,
    category: item.category,
    date: item.date,
    meta: item.author,
    summary: item.summary,
    href: item.href,
    tags: item.tags
  }))

  try {
    const res = await serverFetch('/api/berita-informasi-content')
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.records) {
        const records = json.data.records
        const publishedRecords = records.filter((r: any) => r.status === 'Published')
        
        if (publishedRecords.length > 0) {
          displayItems = publishedRecords.map((r: any) => {
            const localMatch = newsItems.find(
              (n) => n.title.toLowerCase() === r.title.toLowerCase()
            )
            
            const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) : '10 Juli 2026'

            return {
              title: r.title,
              category: r.category || 'Berita',
              date: dateVal,
              meta: r.author || 'Admin',
              summary: localMatch?.summary || `Informasi resmi mengenai ${r.title} yang diterbitkan oleh Humas Sespim Lemdiklat Polri.`,
              href: localMatch ? localMatch.href : `/berita/${r.id}`,
              tags: localMatch?.tags || [r.category?.toLowerCase() || 'berita']
            }
          })
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch news from API, using local mock data:', err)
  }

  return (
    <ContentCollectionPage
      path="/berita"
      eyebrow="Berita & Informasi Publik"
      title="Daftar Berita dan Informasi Publik"
      description="Listing berita, agenda, dan informasi publik secara dinamis terintegrasi dengan database Sespim."
      items={displayItems}
    />
  )
}
