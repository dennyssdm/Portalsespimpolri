import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch, getMediaUrl } from '@/lib/api'

export default async function Page() {
  const path = "/profil/sejarah"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-1', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic history from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    if (dbContent.image_url !== undefined && dbContent.image_url !== null) {
      if (dbContent.image_url === '') {
        delete dynamicContent.media
      } else {
        dynamicContent.media = {
          src: getMediaUrl(dbContent.image_url),
          alt: dbContent.title || 'Foto Sejarah Sespim',
          caption: 'Foto Sejarah Kelembagaan Sespim Lemdiklat Polri'
        }
      }
    }
    if (dbContent.content) {
      dynamicContent.sections = [
        {
          title: dbContent.title || 'Sejarah Sespim',
          body: dbContent.content,
          items: []
        }
      ]
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
