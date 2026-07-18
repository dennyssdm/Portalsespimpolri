import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = '/berita/susunan-redaksi'
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database for redaksi only
  let dbRedaksi = null
  try {
    const resRedaksi = await serverFetch('/api/profil-content/p-8', { cache: 'no-store' })
    if (resRedaksi.ok) {
      const json = await resRedaksi.json()
      if (json.status === 'success' && json.data?.record) {
        dbRedaksi = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic redaksi from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbRedaksi) {
    if (dbRedaksi.title) {
      dynamicContent.title = dbRedaksi.title
    }
    if (dbRedaksi.content) {
      const lines = dbRedaksi.content.split(/\r?\n/)
      const items: string[] = []
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed) {
          items.push(trimmed)
        }
      }

      dynamicContent.sections = [
        {
          title: 'Struktur Pengelola Redaksi',
          body: 'Susunan redaksi ini menjadi acuan pembagian peran dalam pengelolaan berita, informasi publik, dokumentasi, dan publikasi resmi pada Portal Resmi Sespim Lemdiklat Polri.',
          items: items
        }
      ]
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
