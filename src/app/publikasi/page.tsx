import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { publicationItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

export default async function Page() {
  let displayItems = publicationItems.map((item) => ({
    title: item.title,
    category: item.category,
    date: item.date,
    meta: item.author,
    summary: item.summary,
    href: item.href,
    tags: item.tags
  }))

  try {
    const res = await serverFetch('/api/publikasi-content')
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.records) {
        const records = json.data.records
        const publishedRecords = records.filter((r: any) => r.status === 'Published')
        
        if (publishedRecords.length > 0) {
          displayItems = publishedRecords.map((r: any) => {
            const localMatch = publicationItems.find(
              (p) => p.title.toLowerCase() === r.title.toLowerCase()
            )
            
            const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) : '10 Juli 2026'

            const extraTags = []
            if (r.school_field) extraTags.push(r.school_field)
            if (r.cohort) extraTags.push(r.cohort)
            if (r.year) extraTags.push(String(r.year))

            return {
              title: r.title,
              category: r.category || 'Publikasi',
              date: dateVal,
              meta: r.author || 'Admin',
              summary: localMatch?.summary || `Karya publikasi ilmiah resmi mengenai ${r.title} yang dipublikasikan oleh Sespim Lemdiklat Polri.`,
              href: localMatch ? localMatch.href : `/publikasi/${r.id}`,
              tags: [...(localMatch?.tags || [r.category?.toLowerCase() || 'publikasi']), ...extraTags]
            }
          })
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch publications from API, using local mock data:', err)
  }

  return (
    <ContentCollectionPage
      path="/publikasi"
      eyebrow="Publikasi"
      title="Daftar Publikasi, Literasi, dan Karya"
      description="Listing publikasi secara dinamis terintegrasi dengan database Sespim untuk artikel, policy brief, kajian strategis, resensi, dan karya akademik."
      items={displayItems}
    />
  )
}
