'use client'

import { useState } from 'react'

interface Karya {
  title: string
  description: string
  fileName: string
  href: string
  format: string
  category: string
  author: string
  year: string
}

export function KaryaAkademisClient({ initialKarya }: { initialKarya: Karya[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(initialKarya.map((k) => k.category)))]

  // Filter and search
  const filtered = initialKarya.filter((k) => {
    const matchesSearch = 
      k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (k.author && k.author.toLowerCase().includes(searchQuery.toLowerCase()))
      
    const matchesCat = activeCategory === 'Semua' || k.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-950 p-5 rounded-2xl border border-neutral-900 shadow-xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-polri-gold text-neutral-950 shadow-md scale-105'
                  : 'bg-neutral-900 text-neutral-450 hover:text-white border border-neutral-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari karya akademis / penulis..."
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 py-2.5 pl-9 pr-4 text-xs text-white outline-none focus:border-polri-gold transition-colors placeholder:text-neutral-500"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Karya Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-neutral-950 rounded-2xl border border-neutral-900 text-neutral-500">
          <p className="text-xs">Tidak ada produk/karya akademis yang cocok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div 
              key={index}
              className="group bg-neutral-950 rounded-2xl border border-neutral-900 p-6 flex flex-col justify-between hover:border-polri-gold/40 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              {/* Gold border accent hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-polri-gold via-yellow-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="space-y-4">
                {/* Header badges */}
                <div className="flex justify-between items-start gap-4">
                  <span className="inline-block bg-polri-maroon/20 text-polri-goldSoft text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-polri-gold/10">
                    {item.category}
                  </span>
                  <span className="inline-block bg-neutral-900 text-neutral-400 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-neutral-800">
                    {item.format}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:text-polri-goldSoft transition-colors duration-200">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[9px] text-neutral-400 mt-2 font-medium">
                    <span className="truncate">{item.author || 'Civitas Akademika'}</span>
                    <span className="text-neutral-600">•</span>
                    <span>{item.year || '2026'}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Action row */}
              <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                <span className="text-[9px] text-neutral-500 truncate max-w-[150px]">
                  {item.fileName}
                </span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-polri-maroon text-white text-[9px] font-bold uppercase hover:bg-polri-brownDark transition-colors shadow-md group-hover:scale-105 duration-200 cursor-pointer"
                >
                  Unduh Berkas
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
