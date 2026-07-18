import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { publicationItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const categoryName = "Policy Brief"
  const path = "/publikasi/policy-brief"
  const eyebrow = "Publikasi"
  const title = "Policy Brief"
  const description = "Rekomendasi kebijakan strategis yang disusun secara ringkas, berbasis riset, guna penyelesaian masalah kamtibmas."

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
      tags: item.tags,
      image_url: item.image_url
    }))

  try {
    const res = await serverFetch('/api/publikasi-content?limit=1000', { cache: 'no-store' })
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

            let schoolField = r.school_field || ''
            let cohort = r.cohort || ''
            let year = r.year ? String(r.year) : ''
            let cleanContent = r.content || ''

            if (r.content) {
              const lines = r.content.split('\n')
              for (const line of lines) {
                const trimmed = line.trim()
                if (trimmed.startsWith('SEKOLAH:')) schoolField = trimmed.substring(8).trim()
                if (trimmed.startsWith('ANGKATAN:')) cohort = trimmed.substring(9).trim()
                if (trimmed.startsWith('TAHUN:')) year = trimmed.substring(6).trim()
              }
              cleanContent = cleanContent
                .replace(/^SEKOLAH:[^\n]*\n?/mi, '')
                .replace(/^ANGKATAN:[^\n]*\n?/mi, '')
                .replace(/^TAHUN:[^\n]*\n?/mi, '')
                .trim()
            }

            const extraTags = []
            if (schoolField) extraTags.push(schoolField)
            if (cohort) extraTags.push(cohort)
            if (year) extraTags.push(year)

            return {
              title: r.title,
              category: r.category || categoryName,
              date: dateVal,
              meta: r.author || 'Admin',
              summary: localMatch?.summary || cleanContent || `Karya publikasi ilmiah resmi mengenai ${r.title} yang dipublikasikan oleh Sespim Lemdiklat Polri.`,
              href: localMatch ? localMatch.href : `/publikasi/${r.id}`,
              tags: [...(localMatch?.tags || [r.category?.toLowerCase() || 'publikasi']), ...extraTags],
              image_url: r.image_url
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
