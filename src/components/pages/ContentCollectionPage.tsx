'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EmptyState } from '@/components/ui/EmptyState'

export type CollectionCardItem = {
  title: string
  category: string
  date?: string
  meta?: string
  summary: string
  href: string
  tags?: string[]
  image_url?: string
}

type ContentCollectionPageProps = {
  path: string
  eyebrow: string
  title: string
  description: string
  items: CollectionCardItem[]
  emptyText?: string
}

export function ContentCollectionPage({ path, eyebrow, title, description, items, emptyText }: ContentCollectionPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map((item) => item.category)))
  
  // Extract years from dates
  const years = Array.from(
    new Set(
      items
        .map((item) => {
          if (!item.date) return null
          const match = item.date.match(/\b(202\d)\b/)
          return match ? match[1] : null
        })
        .filter((y): y is string => y !== null)
    )
  ).sort((a, b) => b.localeCompare(a))

  // Filter items dynamically
  const filteredItems = items.filter((item) => {
    // 1. Search Query filter (matches Title, Summary, Author/Meta, and Tags)
    const query = searchQuery.toLowerCase()
     const matchesSearch = 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      !!(item.meta && item.meta.toLowerCase().includes(query)) ||
      !!(item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))

    // 2. Category filter
    const matchesCategory = !selectedCategory || item.category === selectedCategory

    // 3. Academic Program / Class filter (e.g. Sespimti, Sespimmen, Sespimma)
    let matchesProgram = true
    if (selectedProgram) {
      const prog = selectedProgram.toLowerCase()
      matchesProgram = 
        item.title.toLowerCase().includes(prog) ||
        item.summary.toLowerCase().includes(prog) ||
        !!(item.meta && item.meta.toLowerCase().includes(prog)) ||
        !!(item.tags && item.tags.some(tag => tag.toLowerCase().includes(prog)))
    }

    // 4. Year filter
    let matchesYear = true
    if (selectedYear) {
      matchesYear = !!item.date && item.date.includes(selectedYear)
    }

    return matchesSearch && matchesCategory && matchesProgram && matchesYear
  })

  const featured = filteredItems[0]

  const getMediaUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('/')) return url
    return `http://localhost:5001${url}`
  }

  return (
    <main className="bg-neutral-50 min-h-screen">
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={title} />
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
            
            {/* Left Content Area */}
            <div className="min-w-0 space-y-6">
              
              {/* Search & Advanced Filters Panel */}
              <div className="rounded-xl border border-polri-gold/15 bg-white p-6 shadow-soft space-y-5">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari judul, penulis, kata kunci, atau tag..."
                      className="w-full rounded-lg border border-neutral-200 pl-10 pr-4 py-3 text-sm focus:border-polri-gold focus:outline-none"
                    />
                    <svg className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                    </svg>
                  </div>

                  {/* Program Selector */}
                  <select 
                    value={selectedProgram || ''}
                    onChange={(e) => setSelectedProgram(e.target.value || null)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-bold text-polri-brownDark focus:border-polri-gold focus:outline-none bg-white min-w-[150px]"
                  >
                    <option value="">Semua Angkatan</option>
                    <option value="Sespimti">Sespimti</option>
                    <option value="Sespimmen">Sespimmen</option>
                    <option value="Sespimma">Sespimma</option>
                    <option value="SPPK">SPPK</option>
                  </select>

                  {/* Year Selector */}
                  {years.length > 0 && (
                    <select 
                      value={selectedYear || ''}
                      onChange={(e) => setSelectedYear(e.target.value || null)}
                      className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-bold text-polri-brownDark focus:border-polri-gold focus:outline-none bg-white min-w-[130px]"
                    >
                      <option value="">Semua Tahun</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Category Chips */}
                {categories.length > 1 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                        selectedCategory === null 
                          ? 'bg-polri-maroon text-white shadow-sm' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/60'
                      }`}
                    >
                      Semua
                    </button>
                    {categories.map((category) => (
                      <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-lg px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                          selectedCategory === category 
                            ? 'bg-polri-maroon text-white shadow-sm' 
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/60'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  Menampilkan {filteredItems.length} dari {items.length} karya publikasi
                </p>
                
                {(searchQuery || selectedCategory || selectedProgram || selectedYear) && (
                  <button 
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                      setSelectedProgram(null)
                      setSelectedYear(null)
                    }}
                    className="text-xs font-black text-polri-maroon hover:underline"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Document Lists Grid */}
              <div className="grid gap-5">
                {filteredItems.length ? (
                  filteredItems.map((item) => (
                    <Link key={item.href} href={item.href} className="group block min-w-0 rounded-xl border border-polri-gold/25 bg-white p-6 shadow-soft transition hover:border-polri-gold hover:shadow-gold">
                      <article className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Book/Document Cover Preview */}
                        <div className="relative w-32 h-44 shrink-0 rounded-lg overflow-hidden border border-polri-gold/20 bg-neutral-900 shadow flex items-center justify-center text-center p-3 select-none flex-col justify-between">
                          {item.image_url ? (
                            <img src={getMediaUrl(item.image_url)} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full absolute inset-0 flex flex-col justify-between p-2.5 text-white bg-gradient-to-b ${
                              item.category === 'Jurnal Ilmiah' ? 'from-slate-900 to-slate-950 border-t-4 border-polri-gold' :
                              item.category === 'Policy Brief' ? 'from-red-950 to-neutral-950 border-t-4 border-polri-gold' :
                              item.category === 'Karya Peserta Didik' ? 'from-emerald-950 to-neutral-950 border-t-4 border-polri-gold' :
                              item.category === 'Kajian Strategis' ? 'from-amber-950 to-neutral-950 border-t-4 border-polri-gold' :
                              'from-neutral-900 to-neutral-950 border-t-4 border-polri-gold'
                            }`}>
                              <div className="space-y-1 text-left">
                                <span className="text-[6px] font-black uppercase tracking-widest text-polri-goldSoft">SESPIM POLRI</span>
                                <p className="text-[8px] font-black leading-snug line-clamp-4 text-neutral-100">{item.title}</p>
                              </div>
                              <div className="text-left border-t border-white/10 pt-1 mt-auto">
                                <p className="text-[6px] text-neutral-400 font-bold uppercase tracking-wider truncate">{item.meta || 'Dewan Redaksi'}</p>
                                <span className="text-[5px] text-polri-goldSoft font-bold block mt-0.5">{item.category}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                              {item.category}
                            </span>
                            {item.date && (
                              <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                                {item.date}
                              </span>
                            )}
                            {item.meta && (
                              <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                                {item.meta}
                              </span>
                            )}
                          </div>
                          <h2 className="mt-4 text-lg font-black text-polri-brownDark group-hover:text-polri-maroon sm:text-xl leading-snug">{item.title}</h2>
                          <p className="mt-3 text-sm leading-relaxed text-neutral-600 font-medium">{item.summary}</p>
                          {item.tags?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2.5">
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-xs font-bold text-neutral-400 hover:text-polri-maroon transition">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Karya Tidak Ditemukan"
                    description={emptyText ?? 'Tidak ada karya tulis ilmiah yang cocok dengan filter pencarian Anda.'}
                  />
                )}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <aside className="space-y-5 lg:sticky lg:top-5">
              <div className="rounded-xl bg-polri-brownDark p-6 text-white shadow-soft">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Tracer Study & Jurnal</p>
                <h3 className="mt-3 text-xl font-black">Repositori Karya</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">
                  Repositori digital ini mendata seluruh karya ilmiah, kajian strategis, policy brief, serta naskah akademik yang disusun oleh serdik Sespim Lemdiklat Polri.
                </p>
              </div>

              {featured && (
                <Link href={featured.href} className="block rounded-xl border border-polri-gold/25 bg-polri-cream p-6 hover:border-polri-gold hover:bg-white shadow-soft transition">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-polri-maroon">Sorotan Utama</p>
                  <h3 className="mt-3 font-black text-polri-brownDark text-sm sm:text-base leading-snug">{featured.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 font-semibold truncate-3-lines">{featured.summary}</p>
                </Link>
              )}

              <div className="rounded-xl border border-polri-gold/25 bg-polri-cream p-6 shadow-soft">
                <h3 className="font-black text-polri-brownDark text-sm">Ketentuan Akses</h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600 font-semibold">
                  Akses dokumen lengkap dibatasi khusus untuk internal Civitas Academica Sespim Polri. Gunakan akun SIAP SESPIM yang terdaftar untuk mengunduh naskah lengkap.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
