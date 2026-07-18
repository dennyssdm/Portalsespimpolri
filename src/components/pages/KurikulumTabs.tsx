'use client'

import { useState } from 'react'
import { AcademicCapIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

type SchoolCurriculum = {
  title: string
  overview: string
  subjects: string[]
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

  const tabs = [
    { id: 'sespimti', label: 'SESPIMTI', title: 'Sekolah Staf & Pimpinan Tinggi' },
    { id: 'sespimmen', label: 'SESPIMMEN', title: 'Sekolah Staf & Pimpinan Menengah' },
    { id: 'sppk', label: 'SPPK', title: 'Sekolah Pengembangan Profesi Kepolisian' },
    { id: 'sespimma', label: 'SESPIMMA', title: 'Sekolah Staf & Pimpinan Pertama' }
  ] as const

  const current = data[activeTab] || { title: '', overview: '', subjects: [] }

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
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-polri-gold/20 p-2.5 text-polri-goldDark shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-polri-goldDark" />
              </div>
              <h2 className="text-2xl font-black text-polri-brownDark sm:text-3xl leading-snug">
                {current.title}
              </h2>
            </div>
            <p className="text-base leading-8 text-neutral-700">
              {current.overview}
            </p>
          </div>

          <div className="rounded-2xl bg-polri-cream/30 p-6 border border-polri-gold/10 shadow-inner">
            <h3 className="text-sm font-black uppercase tracking-wider text-polri-brownDark border-b border-polri-gold/20 pb-3 mb-4">
              Mata Kuliah & Bidang Studi Utama
            </h3>
            {current.subjects && current.subjects.length > 0 ? (
              <ul className="space-y-3.5">
                {current.subjects.map((sub, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-polri-gold shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-neutral-800 leading-6">{sub}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs font-bold text-neutral-500 italic">Belum ada mata kuliah yang diinput.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
