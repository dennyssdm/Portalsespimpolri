import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'
import { GalleryClient } from './GalleryClient'

export const dynamic = 'force-dynamic'

function parseGalleryPhotos(contentStr: string) {
  const list: any[] = []
  if (!contentStr) return list
  
  const rawEntries = contentStr.split(/\n\s*\n/)
  for (const rawEntry of rawEntries) {
    if (!rawEntry.trim()) continue
    const lines = rawEntry.split('\n')
    let item: any = { title: '', description: '', category: 'Pendidikan', image_url: '', date: '' }
    let hasName = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'JUDUL' || key === 'NAMA') {
        item.title = val
        hasName = true
      } else if (key === 'DESKRIPSI') {
        item.description = val
      } else if (key === 'KATEGORI') {
        item.category = val
      } else if (key === 'GAMBAR' || key === 'COVER') {
        item.image_url = val
      } else if (key === 'TANGGAL' || key === 'DATE') {
        item.date = val
      }
    }
    
    if (hasName) {
      list.push(item)
    }
  }
  return list
}

export default async function Page() {
  const path = "/galeri/foto"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/galeri-unduhan-content/g-1', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic gallery photos:', err)
  }

  let photosList: any[] = []
  let pageTitle = content.title
  let pageDescription = content.description

  if (dbContent) {
    pageTitle = dbContent.title || pageTitle
    if (dbContent.content) {
      // The content field contains the structured list of photos
      photosList = parseGalleryPhotos(dbContent.content)
      // Fallback description if parser list is empty
      if (photosList.length === 0) {
        pageDescription = dbContent.content
      } else {
        pageDescription = "Koleksi foto dokumentasi kegiatan operasional, kunjungan dinas, dan upacara Lemdiklat Sespim Lemdiklat Polri."
      }
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-8 xl:px-12 mt-14">
      {/* Header section with Gold accent */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-3">
        <span className="text-[10px] md:text-xs font-black tracking-widest text-polri-goldSoft uppercase">
          {content.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          {pageTitle}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-polri-gold via-yellow-500 to-transparent mx-auto mt-2 rounded"></div>
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-neutral-400 leading-relaxed pt-2">
          {pageDescription}
        </p>
      </div>

      {/* Render the Interactive Photo Gallery grid */}
      <div className="max-w-7xl mx-auto">
        <GalleryClient initialPhotos={photosList} />
      </div>
    </div>
  )
}
