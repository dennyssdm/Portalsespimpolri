import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/berita/kegiatan/feed-up-to-date"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/berita-informasi-content/n-2', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic content for /berita/kegiatan/feed-up-to-date:', err)
  }

  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    if (dbContent.content) {
      dynamicContent.description = dbContent.content
    }
    if (dbContent.image_url) {
      if (!dynamicContent.externalLink) {
        dynamicContent.externalLink = {}
      }
      dynamicContent.externalLink.href = dbContent.image_url
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
