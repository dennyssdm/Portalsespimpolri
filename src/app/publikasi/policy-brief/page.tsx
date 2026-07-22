import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { publicationItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

function parseGroupedPublications(records: any[]) {
  const items: any[] = []
  for (const record of records) {
    if (!record.content) continue
    
    // Split entries by double newlines or empty lines
    const rawEntries = record.content.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = {
        id: '',
        title: '',
        category: '',
        date: record.date ? new Date(record.date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) : '10 Juli 2026',
        author: 'Admin',
        content: '',
        school_field: record.category || '', // Group category is the school (SESPIMTI, etc.)
        cohort: '',
        year: '',
        image_url: '',
        url: '',
        href: ''
      }

      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()

        if (key === 'NAMA') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.content = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'PENULIS') {
          item.author = val
        } else if (key === 'ANGKATAN') {
          item.cohort = val
        } else if (key === 'TAHUN') {
          item.year = val
        } else if (key === 'COVER') {
          item.image_url = val
        } else if (key === 'URL') {
          item.url = val
          item.href = val
          const parts = val.split('/')
          item.id = parts[parts.length - 1] || ''
        }
      }

      if (hasName) {
        // Fallback href if not defined
        if (!item.href) {
          item.href = "/publikasi/" + item.id
        }
        items.push(item)
      }
    }
  }
  return items
}


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
    const res = await serverFetch('/api/publikasi-content/pub-policy-brief', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.record) {
        const parsed = parseGroupedPublications([json.data.record])
        if (parsed.length > 0) {
          displayItems = parsed.map((r: any) => {
            const localMatch = publicationItems.find(
              (p) => p.title.toLowerCase() === r.title.toLowerCase()
            )
            
            const extraTags = []
            if (r.school_field) extraTags.push(r.school_field)
            if (r.cohort) extraTags.push(r.cohort)
            if (r.year) extraTags.push(String(r.year))

            return {
              title: r.title,
              category: r.category || categoryName,
              date: r.date,
              meta: r.author || 'Admin',
              summary: localMatch?.summary || r.content || ("Karya publikasi ilmiah resmi mengenai " + r.title + " yang dipublikasikan oleh Sespim Lemdiklat Polri."),
              href: localMatch ? localMatch.href : r.href,
              tags: [...(localMatch?.tags || [r.category?.toLowerCase() || 'publikasi']), ...extraTags],
              image_url: r.image_url
            }
          })
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch Policy Brief from API, using fallback:", err)
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
