import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/sarana-prasarana/cek-plagiarisme"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/sarana-prasarana-content/s-5', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic cek-plagiarisme from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    if (dbContent.content) {
      // Parse description and sources
      const lines = dbContent.content.split(/\r?\n/)
      const sourcesList: any[] = []
      let currentSource: any = null
      let descriptionText = ''
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) {
          if (sourcesList.length === 0) {
            descriptionText += (descriptionText ? '\n' : '') + trimmed
          }
          continue
        }
        
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'DESKRIPSI') {
          descriptionText = val
          continue
        }
        
        if (key === 'SUMBER') {
          currentSource = {
            domain: val,
            percentage: 0,
            matchCount: 0
          }
          sourcesList.push(currentSource)
          continue
        }
        
        if (currentSource) {
          if (key === 'PERSENTASE') {
            currentSource.percentage = parseInt(val, 10) || 0
          } else if (key === 'TEMUAN') {
            currentSource.matchCount = parseInt(val, 10) || 0
          }
        }
      }
      
      dynamicContent.description = descriptionText || dbContent.content
      if (sourcesList.length > 0) {
        dynamicContent.plagiarismSources = sourcesList
      }
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
