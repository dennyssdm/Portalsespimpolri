import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/program-pendidikan/pedoman-akademik"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/program-pendidikan-content/e-3', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic content:', err)
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
