'use client'

import { useState } from 'react'

interface Video {
  title: string
  description: string
  category: string
  url: string
  cover: string
  date: string
}

function getEmbedUrl(url: string) {
  if (!url) return ''
  if (url.includes('youtube.com/embed/')) return url
  if (url.includes('youtube.com/watch')) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
  }
  if (url.includes('youtu.be/')) {
    const parts = url.split('/')
    const id = parts[parts.length - 1]
    if (id) {
      return `https://www.youtube.com/embed/${id.split('?')[0]}`
    }
  }
  return url
}

export function VideoGalleryClient({ initialVideos }: { initialVideos: Video[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [activePlayVideo, setActivePlayVideo] = useState<Video | null>(null)

  // Get unique categories list
  const categories = ['Semua', ...Array.from(new Set(initialVideos.map((v) => v.category)))]

  // Filtered videos list
  const filteredVideos = activeCategory === 'Semua' 
    ? initialVideos 
    : initialVideos.filter((v) => v.category === activeCategory)

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

      {/* Grid of Video Cards */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-sm">Tidak ada video dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              onClick={() => setActivePlayVideo(video)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-900 shadow-xl transition-all duration-300 hover:border-polri-gold/40 hover:-translate-y-1 cursor-pointer"
            >
              {/* Cover/Thumbnail Image Container */}
              <div className="aspect-video overflow-hidden relative bg-neutral-900">
                <img
                  src={video.cover || '/images/sespim-campus-hero.png'}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Visual Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                  <div className="bg-polri-maroon text-white hover:bg-red-700 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg flex items-center justify-center">
                    <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta Padding */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-polri-goldSoft mb-2 bg-polri-maroon/20 px-2.5 py-0.5 rounded border border-polri-gold/10">
                    {video.category}
                  </span>
                  <h3 className="text-sm font-black text-white group-hover:text-polri-goldSoft transition-colors duration-200 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="text-[9px] text-neutral-500 mt-4 flex items-center justify-between border-t border-neutral-900 pt-2.5">
                  <span>Humas Sespim</span>
                  <span>{video.date || 'Juli 2026'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Player Lightbox Modal */}
      {activePlayVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePlayVideo(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePlayVideo(null)}
            className="absolute top-4 right-4 text-white hover:text-polri-gold text-xl font-bold bg-neutral-900/60 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-neutral-850"
          >
            ✕
          </button>

          {/* Modal content */}
          <div
            className="relative w-full max-w-4xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Aspect ratio container for video iframe */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-900 shadow-2xl bg-neutral-950">
              <iframe
                src={getEmbedUrl(activePlayVideo.url)}
                title={activePlayVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Caption Section */}
            <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl w-full text-center mt-5 shadow-2xl">
              <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-polri-goldSoft mb-2 bg-polri-maroon/20 px-2 py-0.5 rounded border border-polri-gold/10">
                {activePlayVideo.category}
              </span>
              <h4 className="text-base font-black text-white">{activePlayVideo.title}</h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {activePlayVideo.description}
              </p>
              <p className="text-[9px] text-neutral-600 mt-3 font-semibold uppercase tracking-wider">
                Dokumentasi Tanggal: {activePlayVideo.date || 'Juli 2026'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
