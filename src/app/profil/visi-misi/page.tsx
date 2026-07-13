import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch, getMediaUrl } from '@/lib/api'

export default async function Page() {
  const path = "/profil/visi-misi"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-2', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic visi-misi from DB, using fallback:', err)
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
          alt: dbContent.title || 'Foto Visi Misi Sespim',
          caption: 'Foto Kampus Sespim Lemdiklat Polri'
        }
      }
    }
    if (dbContent.content) {
      const lines = dbContent.content.split(/\r?\n/)
      const sectionsList: any[] = []
      let currentSection: any = null
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        
        // Check if line looks like a header (ALL CAPS and reasonably short)
        const isHeader = 
          trimmed.toUpperCase() === trimmed && 
          trimmed.length < 100 && 
          !trimmed.match(/^[0-9.-]+$/) && 
          !/^\d+\./.test(trimmed)
          
        if (isHeader) {
          currentSection = {
            title: trimmed,
            body: '',
            items: []
          }
          sectionsList.push(currentSection)
        } else {
          if (!currentSection) {
            currentSection = {
              title: dbContent.title || 'Visi & Misi',
              body: '',
              items: []
            }
            sectionsList.push(currentSection)
          }
          
          if (trimmed.startsWith('-') || /^\d+\./.test(trimmed)) {
            currentSection.items.push(trimmed)
          } else {
            currentSection.body = currentSection.body 
              ? currentSection.body + '\n\n' + trimmed 
              : trimmed
          }
        }
      }
      
      if (sectionsList.length > 0) {
        dynamicContent.sections = sectionsList
      }
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
