import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch, getMediaUrl } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/profil/pejabat"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-5', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic pejabat from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    
    // Parse the text content into officials
    if (dbContent.content) {
      const lines = dbContent.content.split(/\r?\n/)
      const officialsList: any[] = []
      let currentOfficial: any = null
      let currentGroup: string = 'Pejabat Utama'
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        
        if (trimmed.toUpperCase().startsWith('NAMA:')) {
          currentOfficial = {
            group: currentGroup,
            name: trimmed.substring(5).trim(),
            rank: '',
            position: '',
            photoSrc: ''
          }
          officialsList.push(currentOfficial)
          continue
        }
        
        if (currentOfficial) {
          if (trimmed.toUpperCase().startsWith('PANGKAT:')) {
            currentOfficial.rank = trimmed.substring(8).trim()
          } else if (trimmed.toUpperCase().startsWith('JABATAN:')) {
            currentOfficial.position = trimmed.substring(8).trim()
          } else if (trimmed.toUpperCase().startsWith('FOTO:')) {
            currentOfficial.photoSrc = getMediaUrl(trimmed.substring(5).trim())
          }
        }
      }
      
      if (officialsList.length > 0) {
        dynamicContent.officials = officialsList
      }
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
