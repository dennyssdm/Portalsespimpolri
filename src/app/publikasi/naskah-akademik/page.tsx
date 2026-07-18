import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { serverFetch } from '@/lib/api'

function parseGroupedPublications(records: any[]) {
  const items: any[] = []
  for (const record of records) {
    if (!record.content) continue
    
    // Split entries by double newlines or empty lines
    const rawEntries = record.content.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = {
        id: '',
        title: '',
        category: '',
        date: record.date ? new Date(record.date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) : '10 Juli 2026',
        author: 'Admin',
        content: '',
        school_field: record.category || '', // Group category is the school (SESPIMTI, etc.)
        cohort: '',
        year: '',
        image_url: ''
      }

      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()

        if (key === 'NAMA') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.content = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'PENULIS') {
          item.author = val
        } else if (key === 'ANGKATAN') {
          item.cohort = val
        } else if (key === 'TAHUN') {
          item.year = val
        } else if (key === 'COVER') {
          item.image_url = val
        } else if (key === 'URL') {
          const parts = val.split('/')
          item.id = parts[parts.length - 1] || ''
        }
      }

      if (hasName) {
        items.push(item)
      }
    }
  }
  return items
}


export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/publikasi/naskah-akademik"
  const eyebrow = "Publikasi"
  const title = "Naskah Akademik Terbaik"
  const description = "Koleksi Karya Tulis Utama Peserta Didik (Serdik) berupa Nastrap (SESPIMTI), Naskap (SESPIMMEN), dan Taskap (SESPIMMA) 3 Terbaik."

  let allRecords: any[] = []

  try {
    const res = await serverFetch('/api/publikasi-content?limit=1000', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data && json.data.records) {
        allRecords = parseGroupedPublications(json.data.records).filter(
          (r: any) => r.category === 'Naskah Akademik'
        )
      }
    }
  } catch (err) {
    console.warn("Failed to fetch naskah akademik from API:", err)
  }

  // Group and take top 3
  const nastrapItems = allRecords
    .filter((r: any) => r.title.toLowerCase().includes('nastrap') || r.school_field === 'SESPIMTI')
    .slice(0, 3)

  const naskapItems = allRecords
    .filter((r: any) => r.title.toLowerCase().includes('naskap') || r.school_field === 'SESPIMMEN')
    .slice(0, 3)

  const taskapItems = allRecords
    .filter((r: any) => r.title.toLowerCase().includes('taskap') || r.school_field === 'SESPIMMA')
    .slice(0, 3)

  const sections = [
    {
      title: "Nastrap SESPIMTI (3 Terbaik)",
      description: "Naskah Strategis Perorangan yang disusun oleh Perwira Menengah/Tinggi peserta didik SESPIMTI.",
      items: nastrapItems,
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    },
    {
      title: "Naskap SESPIMMEN (3 Terbaik)",
      description: "Naskah Karya Perorangan yang disusun oleh Perwira Menengah peserta didik SESPIMMEN.",
      items: naskapItems,
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      title: "Taskap SESPIMMA (3 Terbaik)",
      description: "Kertas Karya Perorangan yang disusun oleh Perwira Pertama peserta didik SESPIMMA.",
      items: taskapItems,
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  ]

  const getMediaUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('/')) return url
    return "http://localhost:5001" + url
  }

  return (
    <main className="bg-neutral-50 min-h-screen pb-20">
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={title} />
        </Container>
      </section>

      <Container className="mt-12 space-y-16">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <div className="border-b border-neutral-200 pb-4">
              <h2 className="text-xl md:text-2xl font-black text-polri-brownDark flex items-center gap-3">
                <span className="h-6 w-1 bg-polri-gold rounded-full"></span>
                {section.title}
              </h2>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{section.description}</p>
            </div>

            {section.items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center bg-white shadow-soft">
                <p className="text-sm text-neutral-400">Belum ada naskah akademik yang dipublikasikan pada kategori ini.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col justify-between rounded-2xl border border-polri-gold/20 bg-white p-6 shadow-soft hover:shadow-hover hover:border-polri-gold/50 transition duration-300"
                    >
                      <div className="space-y-4">
                        {/* Book/Document Cover Preview */}
                        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-polri-gold/20 bg-neutral-900 shadow flex items-center justify-center text-center p-3 select-none flex-col justify-between">
                          {item.image_url ? (
                            <img src={getMediaUrl(item.image_url)} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className={"w-full h-full absolute inset-0 flex flex-col justify-between p-2.5 text-white bg-gradient-to-b " + (
                              item.title.toLowerCase().includes('nastrap') ? 'from-amber-950 to-neutral-950 border-t-4 border-polri-gold' :
                              item.title.toLowerCase().includes('naskap') ? 'from-emerald-950 to-neutral-950 border-t-4 border-polri-gold' :
                              'from-blue-950 to-neutral-950 border-t-4 border-polri-gold'
                            )}>
                              <div className="space-y-1 text-left">
                                <span className="text-[6px] font-black uppercase tracking-widest text-polri-goldSoft">SESPIM POLRI</span>
                                <p className="text-[8px] font-black leading-snug line-clamp-4 text-neutral-100">{item.title}</p>
                              </div>
                              <div className="text-left border-t border-white/10 pt-1 mt-auto">
                                <p className="text-[6px] text-neutral-400 font-bold uppercase tracking-wider truncate">{item.author || 'Serdik'}</p>
                                <span className="text-[5px] text-polri-goldSoft font-bold block mt-0.5">{item.school_field || 'Naskah Terbaik'}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className={"inline-block rounded-lg border px-2 py-0.5 text-[10px] font-bold " + section.badgeColor}>
                            {item.school_field || 'SESPIM'}
                          </span>
                          {item.cohort && (
                            <span className="inline-block rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                              {item.cohort}
                            </span>
                          )}
                          {item.year && (
                            <span className="inline-block rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                              TA {item.year}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-black leading-snug text-neutral-900 group-hover:text-polri-maroon transition duration-300 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-bold text-polri-brownDark">
                            Penulis / Serdik: {item.author || 'Admin'}
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            Dipublikasi: {item.date}
                          </p>
                        </div>

                        <p className="text-xs leading-relaxed text-neutral-500 line-clamp-3">
                          {item.content || "Karya tulis ilmiah resmi naskah akademik yang dipublikasikan oleh Sespim Lemdiklat Polri."}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Naskah Terbaik</span>
                        <Link
                          href={"/publikasi/" + item.id}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-polri-maroon hover:text-polri-brownDark transition"
                        >
                          Baca Naskah
                          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </Container>
    </main>
  )
}
