'use client'

import { useState } from 'react'

interface Resource {
  title: string
  description: string
  fileName: string
  href: string
  format: string
  category: string
}

export function DownloadsListClient({ initialResources }: { initialResources: Resource[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  // Get unique categories list
  const categories = ['Semua', ...Array.from(new Set(initialResources.map((r) => r.category)))]

  // Filter and search
  const filtered = initialResources.filter((res) => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCat = activeCategory === 'Semua' || res.category === activeCategory
    
    return matchesSearch && matchesCat
  })

  // Format Helper
  const getFormatBadge = (format: string) => {
    const fmt = format.toUpperCase()
    if (fmt === 'PDF') return 'bg-red-500/10 text-red-500 border-red-500/20'
    if (fmt === 'DOCX' || fmt === 'DOC') return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    if (fmt === 'XLSX' || fmt === 'XLS') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    return 'bg-neutral-500/10 text-neutral-400 border-neutral-850'
  }

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
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-polri-gold text-neutral-950 shadow-md scale-105'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berkas dokumen..."
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 py-2.5 pl-9 pr-4 text-xs text-white outline-none focus:border-polri-gold transition-colors placeholder:text-neutral-500"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Downloads Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-neutral-950 rounded-2xl border border-neutral-900 text-neutral-500">
          <p className="text-xs">Tidak ada dokumen unduhan yang cocok.</p>
        </div>
      ) : (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-900 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-900/30 text-[9px] uppercase tracking-widest text-neutral-450 font-black">
                  <th className="py-4 px-6">Nama Dokumen</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4 text-center">Format</th>
                  <th className="py-4 px-4">Nama Berkas</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60 text-xs text-white">
                {filtered.map((item, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-neutral-900/20 transition-colors group"
                  >
                    {/* Title and Description */}
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-extrabold group-hover:text-polri-goldSoft transition-colors duration-200">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-[9px] font-black tracking-wider uppercase text-neutral-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Format Badge */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`inline-block text-[8px] font-black border px-2 py-0.5 rounded uppercase tracking-wider ${getFormatBadge(item.format)}`}>
                        {item.format}
                      </span>
                    </td>

                    {/* Filename */}
                    <td className="py-4 px-4 max-w-xs truncate text-[10px] text-neutral-500 font-mono">
                      {item.fileName || 'document.pdf'}
                    </td>

                    {/* Action Download Button */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <a
                        href={item.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[10px] font-black uppercase text-polri-goldSoft hover:bg-polri-gold hover:text-neutral-950 hover:border-polri-gold transition-all duration-300 cursor-pointer shadow-md shadow-black/40"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
