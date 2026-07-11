import { ContentCollectionPage } from '@/components/pages/ContentCollectionPage'
import { downloadItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

export default async function Page() {
  let displayItems = downloadItems.map((item) => ({
    title: item.title,
    category: item.category,
    date: item.updatedAt,
    meta: `${item.format} • ${item.size}`,
    summary: item.summary,
    href: item.href,
    tags: item.tags
  }))

  try {
    const res = await serverFetch('/api/galeri-unduhan-content')
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.records) {
        const records = json.data.records
        const publishedRecords = records.filter((r: any) => r.status === 'Published')
        
        if (publishedRecords.length > 0) {
          displayItems = publishedRecords.map((r: any) => {
            const localMatch = downloadItems.find(
              (d) => d.title.toLowerCase() === r.title.toLowerCase()
            )

            const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) : '10 Juli 2026'

            return {
              title: r.title,
              category: r.category || 'Dokumen',
              date: dateVal,
              meta: localMatch ? `${localMatch.format} • ${localMatch.size}` : 'PDF • 1.2 MB',
              summary: localMatch?.summary || `Berkas dokumen resmi mengenai ${r.title} yang diterbitkan oleh Sespim Lemdiklat Polri untuk diunduh.`,
              href: localMatch ? localMatch.href : `/unduhan/${r.id}`,
              tags: localMatch?.tags || [r.category?.toLowerCase() || 'unduhan']
            }
          })
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch downloads from API, using local mock data:', err)
  }

  return (
    <ContentCollectionPage
      path="/unduhan"
      eyebrow="Unduhan"
      title="Daftar Dokumen dan Template"
      description="Listing unduhan secara dinamis terintegrasi dengan database Sespim untuk pedoman, template, formulir, metadata file, dan halaman detail dokumen."
      items={displayItems}
    />
  )
}
