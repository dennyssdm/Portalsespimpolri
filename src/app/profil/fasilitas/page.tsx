import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/profil/fasilitas"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-6', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic fasilitas from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    
    // Parse the text content into facilities
    if (dbContent.content) {
      const lines = dbContent.content.split(/\r?\n/)
      const facilitiesList: any[] = []
      let currentFacility: any = null
      let currentGroup: string = 'Fasilitas Umum'
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        
        if (trimmed.toUpperCase().startsWith('NAMA:') || trimmed.toUpperCase().startsWith('JUDUL:')) {
          const prefixLen = trimmed.toUpperCase().startsWith('NAMA:') ? 5 : 6
          const titleVal = trimmed.substring(prefixLen).trim()
          currentFacility = {
            group: currentGroup,
            title: titleVal,
            description: '',
            photoSrc: ''
          }
          facilitiesList.push(currentFacility)
          continue
        }
        
        if (currentFacility) {
          if (trimmed.toUpperCase().startsWith('KETERANGAN:')) {
            currentFacility.description = trimmed.substring(11).trim()
          } else if (trimmed.toUpperCase().startsWith('FOTO:')) {
            currentFacility.photoSrc = trimmed.substring(5).trim()
          }
        }
      }
      
      if (facilitiesList.length > 0) {
        dynamicContent.facilities = facilitiesList
      }
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
