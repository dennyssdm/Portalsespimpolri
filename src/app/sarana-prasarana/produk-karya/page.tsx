import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'
import { KaryaAkademisClient } from './KaryaAkademisClient'

export const dynamic = 'force-dynamic'

function parseKaryaAkademis(contentStr: string) {
  const list: any[] = []
  if (!contentStr) return list
  
  const rawEntries = contentStr.split(/\n\s*\n/)
  for (const rawEntry of rawEntries) {
    if (!rawEntry.trim()) continue
    const lines = rawEntry.split('\n')
    let item: any = { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Kajian', author: '', year: '2026' }
    let hasName = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'NAMA' || key === 'JUDUL') {
        item.title = val
        hasName = true
      } else if (key === 'DESKRIPSI') {
        item.description = val
      } else if (key === 'FILE') {
        item.fileName = val
      } else if (key === 'URL') {
        item.href = val
      } else if (key === 'FORMAT') {
        item.format = val
      } else if (key === 'KATEGORI') {
        item.category = val
      } else if (key === 'PENULIS' || key === 'AUTHOR') {
        item.author = val
      } else if (key === 'TAHUN' || key === 'YEAR') {
        item.year = val
      }
    }
    
    if (hasName) {
      list.push(item)
    }
  }
  return list
}

export default async function Page() {
  const path = "/sarana-prasarana/produk-karya"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/sarana-prasarana-content/s-7', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic karya content:', err)
  }

  let karyaList: any[] = []
  let pageTitle = content.title
  let pageDescription = content.description

  if (dbContent) {
    pageTitle = dbContent.title || pageTitle
    if (dbContent.content) {
      karyaList = parseKaryaAkademis(dbContent.content)
      if (karyaList.length === 0) {
        pageDescription = dbContent.content
      } else {
        pageDescription = 'Daftar kajian strategis, policy brief, buku saku, dan naskap orisinal karya peserta didik serta Widyaiswara Sespim Lemdiklat Polri.'
      }
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-8 xl:px-12 mt-14">
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

      <div className="max-w-7xl mx-auto">
        {karyaList.length > 0 ? (
          <KaryaAkademisClient initialKarya={karyaList} />
        ) : (
          <div className="space-y-12">
            {content.sections?.map((section, idx) => (
              <div key={idx} className="bg-neutral-950 p-8 rounded-3xl border border-neutral-900 shadow-xl space-y-6">
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase border-b border-neutral-900 pb-4">
                  {section.title}
                </h2>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                  {section.body}
                </p>
                {section.items && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <span className="text-polri-gold shrink-0 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
