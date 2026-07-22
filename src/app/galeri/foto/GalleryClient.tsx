'use client'

import { useState } from 'react'

interface Photo {
  title: string
  description: string
  category: string
  image_url: string
  date: string
}

export function GalleryClient({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // Get unique categories list
  const categories = ['Semua', ...Array.from(new Set(initialPhotos.map((p) => p.category)))]

  // Filtered photos list
  const filteredPhotos = activeCategory === 'Semua' 
    ? initialPhotos 
    : initialPhotos.filter((p) => p.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 justify-center border-b border-neutral-900">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-polri-gold text-neutral-950 shadow-lg shadow-polri-gold/10 scale-105'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Photo Cards */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-sm">Tidak ada foto dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-900 shadow-xl transition-all duration-300 hover:border-polri-gold/40 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image Container with Zoom effect */}
              <div className="aspect-video overflow-hidden relative bg-neutral-900">
                <img
                  src={photo.image_url || '/images/sespim-campus-hero.png'}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-polri-gold text-neutral-950 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    {/* Enlargement Icon */}
                    <svg className="w-5 h-5 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta Padding */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-polri-goldSoft mb-2 bg-polri-maroon/20 px-2.5 py-0.5 rounded border border-polri-gold/10">
                    {photo.category}
                  </span>
                  <h3 className="text-sm font-black text-white group-hover:text-polri-goldSoft transition-colors duration-200 line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="text-[9px] text-neutral-500 mt-4 flex items-center justify-between border-t border-neutral-900 pt-2.5">
                  <span>Humas Sespim</span>
                  <span>{photo.date || 'Juli 2026'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-polri-gold text-xl font-bold bg-neutral-900/60 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-neutral-850"
          >
            ✕
          </button>

          {/* Modal content */}
          <div
            className="relative max-h-[85vh] max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image_url || '/images/sespim-campus-hero.png'}
              alt={selectedPhoto.title}
              className="max-h-[70vh] max-w-[90vw] object-contain rounded-xl border border-neutral-900 shadow-2xl"
            />

            {/* Caption Section */}
            <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl max-w-xl text-center mt-5 shadow-2xl">
              <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-polri-goldSoft mb-2 bg-polri-maroon/20 px-2 py-0.5 rounded border border-polri-gold/10">
                {selectedPhoto.category}
              </span>
              <h4 className="text-base font-black text-white">{selectedPhoto.title}</h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {selectedPhoto.description}
              </p>
              <p className="text-[9px] text-neutral-600 mt-3 font-semibold uppercase tracking-wider">
                Dokumentasi Tanggal: {selectedPhoto.date || 'Juli 2026'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
