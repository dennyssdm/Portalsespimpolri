import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { publicationItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const categoryName = "Naskah Akademik"
  const path = "/publikasi/naskah-akademik"
  const eyebrow = "Publikasi"
  const title = "Naskah Akademik"
  const description = "Naskah rancangan regulasi, draf undang-undang, serta pedoman formal pendukung kebijakan kepolisian."

  // Start with fallback items filtered by category
  let displayItems = publicationItems
    .filter((item) => item.category.toLowerCase() === categoryName.toLowerCase())
    .map((item) => ({
      title: item.title,
      category: item.category,
      date: item.date,
      meta: item.author,
      summary: item.summary,
      href: item.href,
      tags: item.tags
    }))

  try {
    const res = await serverFetch('/api/publikasi-content', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.records) {
        const records = json.data.records
        const filteredRecords = records.filter(
          (r: any) => r.status === 'Published' && r.category?.toLowerCase() === categoryName.toLowerCase()
        )
        
        if (filteredRecords.length > 0) {
          displayItems = filteredRecords.map((r: any) => {
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
              category: r.category || categoryName,
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
    console.warn(`Failed to fetch publications for category ${categoryName} from API, using fallback:`, err)
  }

  return (
    <ContentCollectionPage
      path={path}
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={displayItems}
    />
  )
}
