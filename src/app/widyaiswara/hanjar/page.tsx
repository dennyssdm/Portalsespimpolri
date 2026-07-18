import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/widyaiswara/hanjar"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database for HANJAR (w-8)
  let dbContent = null
  try {
    const res = await serverFetch('/api/widyaiswara-content/w-8', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic HANJAR from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    
    // Parse the text content into resource list
    if (dbContent.content) {
      const lines = dbContent.content.split(/\r?\n/)
      const resourcesList: any[] = []
      let currentItem: any = null
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'NAMA') {
          currentItem = {
            title: val,
            description: '',
            fileName: '',
            href: '',
            format: 'PDF',
            category: 'SESPIMTI'
          }
          resourcesList.push(currentItem)
          continue
        }
        
        if (currentItem) {
          if (key === 'DESKRIPSI') {
            currentItem.description = val
          } else if (key === 'FILE') {
            currentItem.fileName = val
          } else if (key === 'URL') {
            currentItem.href = val
          } else if (key === 'FORMAT') {
            currentItem.format = val
          } else if (key === 'KATEGORI') {
            currentItem.category = val
          }
        }
      }
      
      if (resourcesList.length > 0) {
        dynamicContent.resources = resourcesList
      }
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
