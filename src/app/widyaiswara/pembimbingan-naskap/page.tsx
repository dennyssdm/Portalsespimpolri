'use client'

import React, { useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  ChatBubbleLeftRightIcon, 
  VideoCameraIcon, 
  EnvelopeIcon, 
  CheckCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowUpTrayIcon,
  PaperClipIcon,
  DocumentTextIcon,
  ChevronDoubleRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Serdik {
  id: string
  name: string
  rank: string
  classGroup: string
  avatar: string
  status: 'Pengajuan Judul' | 'Bimbingan Draf' | 'Selesai'
  proposedTitles?: string[]
  activeTitle?: string
  currentChapter?: string
  comments: { sender: 'Widyaiswara' | 'Serdik'; text: string; date: string }[]
  email: string
  phone: string
  meetingUrl: string
  serdikNrpNip?: string
  widyaiswaraName?: string
  widyaiswaraNip?: string
  scheduleText?: string
}

export default function Page() {
  const [serdikList, setSerdikList] = useState<Serdik[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedId, setSelectedId] = useState<string>('')
  const [commentInput, setCommentInput] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'workspace' | 'communications'>('workspace')
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    try {
      const userJson = sessionStorage.getItem('sespim_user')
      if (userJson) {
        setCurrentUser(JSON.parse(userJson))
      }
    } catch (e) {
      console.warn('Failed to parse user session:', e)
    }

    fetch('/api/naskap')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSerdikList(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load naskap data:', err)
        setLoading(false)
      })
  }, [])

  // Filter serdikList based on role
  const displayedSerdikList = serdikList.filter(s => {
    if (!currentUser) return true // Show all if guest or admin/super_admin is viewing
    if (['super_admin', 'admin', 'stakeholder'].includes(currentUser.role)) return true
    const userNrpNip = currentUser.nrpNip || currentUser.nrp_nip
    if (currentUser.role === 'widyaiswara') {
      return s.widyaiswaraNip === userNrpNip
    }
    if (currentUser.role === 'serdik') {
      return s.serdikNrpNip === userNrpNip
    }
    return true
  })

  // Auto select first Serdik on load
  useEffect(() => {
    if (displayedSerdikList.length > 0) {
      if (!selectedId || !displayedSerdikList.some(s => s.id === selectedId)) {
        setSelectedId(displayedSerdikList[0].id)
      }
    }
  }, [displayedSerdikList, selectedId])

  const currentSerdik = displayedSerdikList.find(s => s.id === selectedId)

  const handleSelectTitle = async (title: string) => {
    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'select-title', id: selectedId, title })
      })
      if (res.ok) {
        const json = await res.json()
        setSerdikList(prev => prev.map(s => s.id === selectedId ? json.data : s))
      }
    } catch (err) {
      console.error('Failed to select title:', err)
    }
  }

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return

    const commentText = commentInput
    setCommentInput('')

    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add-comment', id: selectedId, comment: commentText })
      })
      if (res.ok) {
        const json = await res.json()
        setSerdikList(prev => prev.map(s => s.id === selectedId ? json.data : s))
      }
    } catch (err) {
      console.error('Failed to send comment:', err)
    }
  }

  const handleApprove = async () => {
    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', id: selectedId })
      })
      if (res.ok) {
        const json = await res.json()
        setSerdikList(prev => prev.map(s => s.id === selectedId ? json.data : s))
      }
    } catch (err) {
      console.error('Failed to approve chapter:', err)
    }
  }

  if (loading) {
    return (
      <main className="bg-neutral-50 min-h-screen py-14 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-polri-gold border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-semibold text-neutral-500">Memuat lembar asistensi...</p>
        </div>
      </main>
    )
  }

  if (!currentSerdik) {
    return (
      <main className="bg-neutral-50 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AcademicCapIcon className="h-12 w-12 text-polri-gold mx-auto mb-4" />
          <h2 className="text-lg font-black text-polri-brownDark">Jadwal Pembimbingan Tidak Ditemukan</h2>
          <p className="mt-2 text-xs text-neutral-500 font-semibold leading-relaxed">
            Akun Anda belum memiliki pasangan pembimbingan atau jadwal asistensi aktif yang terdaftar di database.
          </p>
          <p className="mt-2 text-xs text-polri-maroon font-bold">
            Silakan hubungi Administrator Sekolah untuk mengatur jadwal bimbingan Anda.
          </p>
          <Link href="/" className="mt-6 inline-flex items-center justify-center px-4 py-2 text-xs font-black bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-neutral-50 min-h-screen">
      {/* Smart Class Hero Banner */}
      <section className="bg-white pt-6 pb-2">
        <Container>
          <div className="overflow-hidden rounded-xl border border-polri-gold/20 shadow-lg relative group h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark/90 via-polri-brownDark/70 to-transparent z-10" />
            <img 
              src="/images/sespim_smart_class.png" 
              alt="Mentoring Smart Class Sespim" 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 sm:px-12 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-polri-gold/20 text-polri-goldSoft border border-polri-gold/30 w-fit">
                <SparklesIcon className="h-4 w-4 text-polri-gold" />
                SISTEM INFORMASI AKADEMIK
              </span>
              <h1 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight">Ruang Bimbingan Naskah Akademik (Naskap)</h1>
              <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl">
                Layanan asistensi interaktif antara Widyaiswara dan Peserta Didik (Serdik) dalam perumusan judul, bimbingan draf, koreksi bab, dan koordinasi online.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Workspace Section */}
      <section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Serdik List (4 Cols) */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-polri-gold/15 p-5 shadow-soft">
              <h2 className="text-lg font-black text-polri-brownDark border-b border-neutral-100 pb-3 flex items-center justify-between">
                <span>Daftar Serdik Bimbingan</span>
                <span className="bg-polri-maroon text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {displayedSerdikList.length} Serdik
                </span>
              </h2>
              
              <div className="mt-4 space-y-3">
                {displayedSerdikList.map(serdik => {
                  const isSelected = serdik.id === selectedId
                  return (
                    <button
                      key={serdik.id}
                      onClick={() => setSelectedId(serdik.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-4 ${
                        isSelected 
                          ? 'bg-polri-cream/20 border-polri-gold shadow-sm' 
                          : 'border-neutral-100 bg-white hover:bg-neutral-50/50'
                      }`}
                    >
                      <img 
                        src={serdik.avatar} 
                        alt={serdik.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-polri-gold/30 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-neutral-400 leading-none">{serdik.classGroup}</p>
                        <h3 className="font-black text-sm text-polri-brownDark mt-1 truncate">{serdik.name}</h3>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            serdik.status === 'Pengajuan Judul' 
                              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                              : serdik.status === 'Bimbingan Draf'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {serdik.status}
                          </span>
                          
                          {serdik.currentChapter && (
                            <span className="text-[10px] font-semibold text-neutral-500 truncate max-w-[120px]">
                              {serdik.currentChapter.split(':')[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRightIcon className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-polri-gold' : 'text-neutral-400'}`} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Middle & Right Column: Interactive Workspace (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Header Info Panel */}
              <div className="bg-white rounded-xl border border-polri-gold/15 p-6 shadow-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={currentSerdik.avatar} 
                    alt={currentSerdik.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-polri-gold/30 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-black uppercase text-polri-maroon tracking-wider">{currentSerdik.rank}</p>
                    <h2 className="text-lg font-black text-polri-brownDark mt-0.5">{currentSerdik.name}</h2>
                    <p className="text-xs text-neutral-500 font-semibold">{currentSerdik.classGroup}</p>
                  </div>
                </div>
                
                {/* Switcher Tab */}
                <div className="flex bg-neutral-100 p-1 rounded-lg self-start sm:self-center shrink-0">
                  <button 
                    onClick={() => setActiveTab('workspace')}
                    className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'workspace' ? 'bg-white text-polri-brownDark shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                  >
                    Workspace
                  </button>
                  <button 
                    onClick={() => setActiveTab('communications')}
                    className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'communications' ? 'bg-white text-polri-brownDark shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                  >
                    Hubungi Serdik
                  </button>
                </div>
              </div>

              {/* Informasi Pembimbing & Jadwal Asistensi (Ditentukan oleh Admin Sekolah) */}
              <div className="bg-polri-cream/10 border border-polri-gold/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase text-polri-gold tracking-wider">Dosen Pembimbing (Widyaiswara)</p>
                  <p className="text-sm font-black text-polri-brownDark mt-0.5">{currentSerdik.widyaiswaraName || 'Belum ditentukan oleh Admin'}</p>
                  {currentSerdik.widyaiswaraNip && (
                    <p className="text-[10px] text-neutral-500 font-mono">NIP: {currentSerdik.widyaiswaraNip}</p>
                  )}
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-black uppercase text-polri-gold tracking-wider">Jadwal Bimbingan Mingguan</p>
                  <div className="flex items-center gap-1.5 text-xs font-black text-polri-brownDark mt-0.5 sm:justify-end">
                    <ClockIcon className="h-4 w-4 text-polri-maroon shrink-0" />
                    <span>{currentSerdik.scheduleText || 'Belum dijadwalkan'}</span>
                  </div>
                </div>
              </div>

              {activeTab === 'workspace' ? (
                <>
                  {/* WORKSPACE STAGE 1: Proposed Titles Selection */}
                  {currentSerdik.status === 'Pengajuan Judul' && currentSerdik.proposedTitles && (
                    <div className="bg-white rounded-xl border border-polri-gold/15 p-6 shadow-soft">
                      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <DocumentTextIcon className="h-5 w-5 text-polri-gold" />
                        <h3 className="font-black text-polri-brownDark">Tahap 1: Evaluasi & Pemilihan Judul Naskah</h3>
                      </div>
                      <p className="text-xs text-neutral-500 mt-2 font-medium">
                        Serdik telah mengajukan 3 judul naskah berikut. Pilih salah satu judul untuk disetujui guna memulai penulisan draf naskah akademik.
                      </p>
                      
                      <div className="mt-4 space-y-3">
                        {currentSerdik.proposedTitles.map((title, idx) => (
                          <div key={title} className="p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-neutral-50/80 transition relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-polri-gold/20 text-polri-brownDark text-xs font-black">
                                {idx + 1}
                              </span>
                              <p className="mt-2 text-sm font-black text-polri-brownDark leading-relaxed">{title}</p>
                            </div>
                            
                            <button
                              onClick={() => handleSelectTitle(title)}
                              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black bg-polri-maroon text-white rounded-lg hover:bg-polri-brownDark transition"
                            >
                              <span>Pilih Judul ini</span>
                              <ChevronDoubleRightIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WORKSPACE STAGE 2: Interactive Mentoring Chat & Files */}
                  {currentSerdik.status !== 'Pengajuan Judul' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Chat stream & Feedback (7 Cols) */}
                      <div className="md:col-span-7 bg-white rounded-xl border border-polri-gold/15 p-6 shadow-soft flex flex-col h-[520px]">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div className="flex items-center gap-2">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-polri-gold" />
                            <h3 className="font-black text-polri-brownDark text-sm">Lembar Asistensi Interaktif</h3>
                          </div>
                          
                          <span className="text-[10px] font-bold text-neutral-400">
                            Status: Bimbingan Aktif
                          </span>
                        </div>
                        
                        {/* Messages Stream */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 scrollbar-thin">
                          {currentSerdik.comments.map((comment, index) => {
                            const isWidyaiswara = comment.sender === 'Widyaiswara'
                            return (
                              <div key={index} className={`flex flex-col ${isWidyaiswara ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-xl p-3.5 text-sm ${
                                  isWidyaiswara 
                                    ? 'bg-polri-brownDark text-white rounded-tr-none' 
                                    : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
                                }`}>
                                  <p className="font-bold text-[10px] uppercase opacity-75 mb-1">
                                    {isWidyaiswara ? 'Widyaiswara' : 'Serdik'}
                                  </p>
                                  <p className="leading-relaxed">{comment.text}</p>
                                </div>
                                <span className="text-[9px] text-neutral-400 mt-1 px-1 font-semibold">{comment.date}</span>
                              </div>
                            )
                          })}
                        </div>
                        
                        {/* Send Form */}
                        {currentSerdik.status !== 'Selesai' ? (
                          <form onSubmit={handleSendComment} className="border-t border-neutral-100 pt-3 flex gap-2">
                            <input 
                              type="text" 
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder="Ketik bimbingan / koreksi di sini..."
                              className="flex-1 rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm focus:border-polri-gold focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="bg-polri-maroon text-white text-sm font-black px-4 py-2.5 rounded-lg hover:bg-polri-brownDark transition shrink-0"
                            >
                              Kirim
                            </button>
                          </form>
                        ) : (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                            <p className="text-xs font-black text-emerald-800">
                              Naskah telah selesai dan disetujui. Kolom koreksi ditutup.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right: Draf Files & Submissions (5 Cols) */}
                      <div className="md:col-span-5 flex flex-col gap-6">
                        {/* Active Title Card */}
                        <div className="bg-white rounded-xl border border-polri-gold/15 p-5 shadow-soft">
                          <h4 className="text-xs font-black uppercase text-polri-gold tracking-wider">Judul Naskah Terpilih</h4>
                          <p className="mt-2 text-sm font-black text-polri-brownDark leading-relaxed">
                            "{currentSerdik.activeTitle}"
                          </p>
                        </div>

                        {/* Files Checklist */}
                        <div className="bg-white rounded-xl border border-polri-gold/15 p-5 shadow-soft">
                          <h4 className="text-xs font-black uppercase text-neutral-400 tracking-wider mb-3">Draf Bab Terunggah</h4>
                          
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg border border-neutral-100 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <DocumentTextIcon className="h-5 w-5 text-polri-maroon shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-black text-polri-brownDark truncate">DRAF_BAB_1_V2.pdf</p>
                                  <p className="text-[9px] font-bold text-emerald-600">Disetujui Widyaiswara</p>
                                </div>
                              </div>
                              <span className="shrink-0 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">ACC</span>
                            </div>

                            <div className="p-3 rounded-lg border border-neutral-100 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <DocumentTextIcon className="h-5 w-5 text-polri-maroon shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-black text-polri-brownDark truncate">DRAF_BAB_2_V1.pdf</p>
                                  <p className="text-[9px] font-bold text-blue-600">Menunggu Koreksi</p>
                                </div>
                              </div>
                              
                              {currentSerdik.status !== 'Selesai' && (
                                <button 
                                  onClick={handleApprove}
                                  className="shrink-0 text-[10px] font-black bg-polri-maroon hover:bg-polri-brownDark text-white px-2 py-1 rounded transition"
                                >
                                  ACC Bab
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </>
              ) : (
                /* TAB COMMUNICATIONS */
                <div className="bg-white rounded-xl border border-polri-gold/15 p-6 shadow-soft">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-polri-gold" />
                    <h3 className="font-black text-polri-brownDark">Tahap 3: Hubungi & Jadwalkan Pertemuan</h3>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Google Meet */}
                    <div className="p-5 rounded-xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                        <VideoCameraIcon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-4 font-black text-sm text-polri-brownDark">Google Meet</h4>
                      <p className="mt-1 text-xs text-neutral-500 font-semibold leading-relaxed">
                        Lakukan bimbingan lisan interaktif dan presentasi draf secara tatap muka online.
                      </p>
                      <a 
                        href={currentSerdik.meetingUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center w-full py-2.5 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                      >
                        Mulai Google Meet
                      </a>
                    </div>

                    {/* WhatsApp Chat */}
                    <div className="p-5 rounded-xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                        <ChatBubbleLeftRightIcon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-4 font-black text-sm text-polri-brownDark">WhatsApp Chat</h4>
                      <p className="mt-1 text-xs text-neutral-500 font-semibold leading-relaxed">
                        Kirim pesan instan atau bagikan dokumen cepat untuk koordinasi asistensi.
                      </p>
                      <a 
                        href={`https://wa.me/${currentSerdik.phone}?text=Halo%20Serdik%20${currentSerdik.name},%20ada%20beberapa%20hal%20terkait%20naskah%20akademik%20Anda%20yang%20perlu%20dibahas.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center w-full py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                      >
                        Hubungi via WA
                      </a>
                    </div>

                    {/* Email formal */}
                    <div className="p-5 rounded-xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center border border-neutral-200">
                        <EnvelopeIcon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-4 font-black text-sm text-polri-brownDark">Kirim Email</h4>
                      <p className="mt-1 text-xs text-neutral-500 font-semibold leading-relaxed">
                        Kirim catatan koreksi formal beserta lampiran draf bab yang sudah ditandai.
                      </p>
                      <a 
                        href={`mailto:${currentSerdik.email}?subject=Bimbingan%20Naskah%20Akademik%20Sespim&body=Halo%20${currentSerdik.name},%20berikut%20adalah%20beberapa%20koreksi%20untuk%20naskah%20Anda:`}
                        className="mt-4 inline-flex items-center justify-center w-full py-2.5 text-xs font-black bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg transition"
                      >
                        Kirim Email Resmi
                      </a>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>
        </Container>
      </section>
    </main>
  )
}
