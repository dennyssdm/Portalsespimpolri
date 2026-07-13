import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch, getMediaUrl } from '@/lib/api'

export default async function Page() {
  const path = "/profil/struktur-organisasi"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-4', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic struktur-organisasi from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    // Keep title column/content, fallback if empty
    dynamicContent.title = dbContent.title || 'Struktur Organisasi Sespim Lemdiklat Polri'

    // Keep image column/content, fallback to default bagan if empty
    dynamicContent.media = {
      src: getMediaUrl(dbContent.image_url) || '/images/struktur-sespim.png',
      alt: dbContent.title || 'Bagan Struktur Organisasi',
      caption: 'Bagan Struktur Organisasi Sespim Lemdiklat Polri'
    }

    // Keep news column/content empty to hide Explanation
    dynamicContent.sections = []
  }

  return <ContentPage content={dynamicContent} path={path} />
}
