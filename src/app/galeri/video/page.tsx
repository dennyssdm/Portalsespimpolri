import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'
import { VideoGalleryClient } from './VideoGalleryClient'

export const dynamic = 'force-dynamic'

function parseGalleryVideos(contentStr: string) {
  const list: any[] = []
  if (!contentStr) return list
  
  const rawEntries = contentStr.split(/\n\s*\n/)
  for (const rawEntry of rawEntries) {
    if (!rawEntry.trim()) continue
    const lines = rawEntry.split('\n')
    let item: any = { title: '', description: '', category: 'Pendidikan', url: '', cover: '', date: '' }
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
      } else if (key === 'URL') {
        item.url = val
      } else if (key === 'COVER' || key === 'GAMBAR') {
        item.cover = val
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
  const path = "/galeri/video"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/galeri-unduhan-content/g-2', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic gallery videos:', err)
  }

  let videosList: any[] = []
  let pageTitle = content.title
  let pageDescription = content.description

  if (dbContent) {
    pageTitle = dbContent.title || pageTitle
    if (dbContent.content) {
      videosList = parseGalleryVideos(dbContent.content)
      if (videosList.length === 0) {
        pageDescription = dbContent.content
      } else {
        pageDescription = "Koleksi video profil, dokumentasi upacara, materi perkuliahan, dan siaran pers resmi Lemdiklat Sespim Polri."
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

      {/* Render the Interactive Video Gallery grid */}
      <div className="max-w-7xl mx-auto">
        <VideoGalleryClient initialVideos={videosList} />
      </div>
    </div>
  )
}
