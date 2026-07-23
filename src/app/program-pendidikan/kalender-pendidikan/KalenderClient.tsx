'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ArrowDownTrayIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'

type KalenderItem = {
  category: string
  title: string
  description: string
  imageUrl: string
  file: string
  url: string
}

type Props = {
  initialItems: KalenderItem[]
  title: string
  description: string
}

export default function KalenderClient({ initialItems, title, description }: Props) {
  const [activeTab, setActiveTab] = useState<'SESPIMTI' | 'SESPIMMEN' | 'SPPK' | 'SESPIMMA'>('SESPIMTI')
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const tabs = ['SESPIMTI', 'SESPIMMEN', 'SPPK', 'SESPIMMA'] as const

  const activeItem = initialItems.find(
    (item) => item.category.toUpperCase() === activeTab
  ) || initialItems[0]

  const getMediaUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('/')) return url
    return "http://localhost:5001" + url
  }

  return (
    <main className="bg-neutral-50 min-h-screen pb-20">
      <PageHero eyebrow="Program Pendidikan" title={title} description={description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path="/program-pendidikan/kalender-pendidikan" currentLabel="Kalender Pendidikan" />
        </Container>
      </section>

      <Container className="mt-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-neutral-200 pb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-polri-brownDark text-white border-polri-brownDark shadow-md scale-105'
                    : 'bg-white text-neutral-600 border-neutral-250 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Content Workspace */}
        {activeItem ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Landscape Preview & Zoom */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative group rounded-2xl border border-polri-gold/20 overflow-hidden bg-neutral-950 shadow-lg aspect-[16/10] flex items-center justify-center">
                {activeItem.imageUrl ? (
                  activeItem.imageUrl.includes('drive.google.com') ? (
                    <iframe
                      src={activeItem.imageUrl.replace(/\/view.*/, '/preview')}
                      className="w-full h-full border-0 rounded-2xl bg-neutral-900"
                      allow="autoplay"
                    />
                  ) : (
                    <>
                      <img
                        src={getMediaUrl(activeItem.imageUrl)}
                        alt={activeItem.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button
                          onClick={() => setZoomImage(getMediaUrl(activeItem.imageUrl))}
                          className="p-3 rounded-full bg-white text-polri-brownDark hover:bg-polri-gold hover:text-neutral-950 transition duration-300 shadow-lg"
                          title="Perbesar Kalender"
                        >
                          <EyeIcon className="h-6 w-6" />
                        </button>
                        {activeItem.url && activeItem.url !== '#' && (
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white text-polri-brownDark hover:bg-polri-gold hover:text-neutral-950 transition duration-300 shadow-lg"
                            title="Unduh PDF"
                          >
                            <ArrowDownTrayIcon className="h-6 w-6" />
                          </a>
                        )}
                      </div>
                    </>
                  )
                ) : (
                  <div className="text-center p-8">
                    <p className="text-sm font-bold text-neutral-400">Berkas gambar kalender belum diunggah.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Meta Info & Downloads */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-polri-gold/15 shadow-soft space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="inline-block bg-polri-gold/10 text-polri-goldSoft text-[10px] font-black tracking-widest px-2.5 py-1 rounded-lg border border-polri-gold/20 uppercase">
                  {activeItem.category}
                </span>
                <h3 className="mt-3 text-lg font-black text-polri-brownDark leading-snug">
                  {activeItem.title || `Kalender Pendidikan ${activeItem.category}`}
                </h3>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {activeItem.description || 'Rincian jadwal kegiatan dan kalender akademik pendidikan.'}
              </p>

              <div className="pt-4 border-t border-neutral-100 space-y-3">
                {activeItem.url && activeItem.url !== '#' ? (
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-polri-gold via-polri-goldSoft to-polri-gold px-5 py-3.5 text-xs font-black uppercase text-polri-brownDark hover:from-polri-goldSoft hover:to-polri-gold transition duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.2)]"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Unduh Kalender PDF
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-200 px-5 py-3.5 text-xs font-black uppercase text-neutral-400 cursor-not-allowed"
                  >
                    Dokumen Belum Tersedia
                  </button>
                )}

                {activeItem.file && (
                  <p className="text-[9px] text-center text-neutral-400 font-semibold truncate">
                    Nama File: {activeItem.file}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-neutral-350 p-12 text-center bg-white shadow-soft">
            <p className="text-sm font-semibold text-neutral-400">Kalender pendidikan untuk kategori ini sedang disiapkan.</p>
          </div>
        )}
      </Container>

      {/* Lightbox / Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-4 right-4 text-white hover:text-polri-gold transition p-2"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <div className="max-w-5xl w-full max-h-[85vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl relative">
            <img src={zoomImage} alt="Perbesar Gambar" className="w-full h-full object-contain mx-auto" />
          </div>
        </div>
      )}
    </main>
  )
}
