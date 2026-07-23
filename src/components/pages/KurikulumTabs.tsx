'use client'

import { useState } from 'react'
import { AcademicCapIcon, CheckCircleIcon, ArrowDownTrayIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'

type SchoolCurriculum = {
  title: string
  overview: string
  subjects: string[]
  previewUrl?: string
  downloadUrl?: string
}

type KurikulumTabsProps = {
  data: {
    sespimti: SchoolCurriculum
    sespimmen: SchoolCurriculum
    sppk: SchoolCurriculum
    sespimma: SchoolCurriculum
  }
}

export function KurikulumTabs({ data }: KurikulumTabsProps) {
  const [activeTab, setActiveTab] = useState<'sespimti' | 'sespimmen' | 'sppk' | 'sespimma'>('sespimti')
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const tabs = [
    { id: 'sespimti', label: 'SESPIMTI', title: 'Sekolah Staf & Pimpinan Tinggi' },
    { id: 'sespimmen', label: 'SESPIMMEN', title: 'Sekolah Staf & Pimpinan Menengah' },
    { id: 'sppk', label: 'SPPK', title: 'Sekolah Pengembangan Profesi Kepolisian' },
    { id: 'sespimma', label: 'SESPIMMA', title: 'Sekolah Staf & Pimpinan Pertama' }
  ] as const

  const current = data[activeTab] || { title: '', overview: '', subjects: [], previewUrl: '', downloadUrl: '' }

  const getMediaUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('/')) return url
    return "http://localhost:5001" + url
  }

  return (
    <div className="space-y-10">
      {/* Tabs navigation */}
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-6 py-4 text-left transition-all duration-300 outline-none select-none min-w-[200px] flex-1 sm:flex-initial border border-transparent ${
                isActive
                  ? 'bg-polri-maroon text-white shadow-xl scale-105 border-b-4 border-b-polri-gold'
                  : 'bg-polri-cream/60 text-polri-brownDark hover:bg-polri-gold/20 border-polri-gold/15'
              }`}
            >
              <span className="block text-sm font-black tracking-wider uppercase">{tab.label}</span>
              <span className={`block text-[10px] font-bold mt-0.5 ${isActive ? 'text-polri-gold' : 'text-neutral-500'}`}>
                {tab.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab Panel */}
      <div className="rounded-3xl border border-polri-gold/25 bg-white p-6 shadow-soft md:p-10 transition-all duration-300">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column: Metadata & Overview */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-polri-gold/20 p-2.5 text-polri-goldDark shrink-0">
                  <AcademicCapIcon className="h-6 w-6 text-polri-goldDark" />
                </div>
                <h2 className="text-2xl font-black text-polri-brownDark sm:text-3xl leading-snug">
                  {current.title}
                </h2>
              </div>
              <p className="text-sm leading-8 text-neutral-700">
                {current.overview}
              </p>
            </div>

            <div className="rounded-2xl bg-polri-cream/30 p-6 border border-polri-gold/10 shadow-inner">
              <h3 className="text-xs font-black uppercase tracking-wider text-polri-brownDark border-b border-polri-gold/20 pb-3 mb-4">
                Mata Kuliah & Bidang Studi Utama
              </h3>
              {current.subjects && current.subjects.length > 0 ? (
                <ul className="grid sm:grid-cols-2 gap-4">
                  {current.subjects.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircleIcon className="h-4 w-4 text-polri-gold shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-neutral-800 leading-5">{sub}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-bold text-neutral-500 italic">Belum ada mata kuliah yang diinput.</p>
              )}
            </div>
          </div>

          {/* Right Column: Portrait Preview Framework */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-polri-gold/15 shadow-soft space-y-5">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-polri-goldSoft bg-polri-maroon/10 px-2.5 py-1 rounded-md border border-polri-maroon/20">
                Pratinjau Dokumen
              </span>
              <h3 className="text-sm font-black text-polri-brownDark mt-2">
                Brosur / Kurikulum Lengkap (Format Portrait)
              </h3>
            </div>

            <div className="relative group rounded-xl border border-neutral-200 overflow-hidden bg-neutral-950 shadow-md aspect-[1/1.41] flex items-center justify-center">
              {current.previewUrl ? (
                current.previewUrl.includes('drive.google.com') ? (
                  <iframe
                    src={current.previewUrl.replace(/\/view.*/, '/preview')}
                    className="w-full h-full border-0 rounded-xl bg-neutral-900"
                    allow="autoplay"
                  />
                ) : (
                  <>
                    <img
                      src={getMediaUrl(current.previewUrl)}
                      alt={current.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setZoomImage(getMediaUrl(current.previewUrl || ''))}
                        className="p-2.5 rounded-full bg-white text-polri-brownDark hover:bg-polri-gold hover:text-neutral-950 transition duration-300 shadow-md"
                        title="Perbesar Brosur"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      {current.downloadUrl && current.downloadUrl !== '#' && (
                        <a
                          href={current.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-white text-polri-brownDark hover:bg-polri-gold hover:text-neutral-950 transition duration-300 shadow-md"
                          title="Unduh Brosur PDF"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </>
                )
              ) : (
                <div className="text-center p-8">
                  <p className="text-xs font-bold text-neutral-400">Berkas brosur kurikulum belum diunggah.</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              {current.downloadUrl && current.downloadUrl !== '#' ? (
                <a
                  href={current.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-polri-gold via-polri-goldSoft to-polri-gold px-4 py-3.5 text-xs font-black uppercase text-polri-brownDark hover:from-polri-goldSoft hover:to-polri-gold transition duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.2)]"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Unduh Kurikulum PDF
                </a>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-200 px-4 py-3.5 text-xs font-black uppercase text-neutral-400 cursor-not-allowed"
                >
                  Dokumen Belum Tersedia
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-4 right-4 text-white hover:text-polri-gold transition p-2"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <div className="max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl relative">
            <img src={zoomImage} alt="Perbesar Brosur" className="w-full h-full object-contain mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}
