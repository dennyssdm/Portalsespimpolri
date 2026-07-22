import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

interface AITool {
  title: string
  description: string
  url: string
  category: string
}

function parseAITools(contentStr: string): AITool[] {
  const list: AITool[] = []
  if (!contentStr) return list
  
  const rawEntries = contentStr.split(/\n\s*\n/)
  for (const rawEntry of rawEntries) {
    if (!rawEntry.trim()) continue
    const lines = rawEntry.split('\n')
    let item: any = { title: '', description: '', url: '', category: 'General' }
    let hasName = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'JUDUL' || key === 'NAMA') {
        item.title = val
        hasName = true
      } else if (key === 'DESKRIPSI') {
        item.description = val
      } else if (key === 'URL') {
        item.url = val
      } else if (key === 'KATEGORI') {
        item.category = val
      }
    }
    
    if (hasName) {
      list.push(item)
    }
  }
  return list
}

export default async function Page() {
  const path = "/widyaiswara/belajar-ai"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/widyaiswara-content/w-9', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic AI learning content:', err)
  }

  let aiTools: AITool[] = []
  let pageTitle = content.title
  let pageDescription = content.description

  if (dbContent) {
    pageTitle = dbContent.title || pageTitle
    if (dbContent.content) {
      aiTools = parseAITools(dbContent.content)
      if (aiTools.length === 0) {
        pageDescription = dbContent.content
      } else {
        pageDescription = "Panduan taktis pemanfaatan Artificial Intelligence (AI) bagi Widyaiswara dan Peserta Didik (Serdik) di Sespim Lemdiklat Polri."
      }
    }
  }

  // Predefined prompts for police tasks
  const promptTemplates = [
    {
      title: "📝 Analisis & Telaah Regulasi Kepolisian (NotebookLM / Claude)",
      role: "Pemberian Dokumen Hanjar / Perkap",
      prompt: `Bertindaklah sebagai asisten riset kepolisian senior. Analisis dokumen regulasi yang saya unggah ini. Temukan jika terdapat tumpang tindih regulasi, inkonsistensi taktis, serta berikan rekomendasi perbaikan pasal dalam format draf naskah akademik yang formal.`
    },
    {
      title: "🛡️ Simulasi Penanganan Krisis Kamtibmas (ChatGPT / Gemini)",
      role: "Skenario Bermain Peran (Role-Play)",
      prompt: `Jadilah simulator taktis tak berpihak. Buatlah skenario interaktif simulasi penanganan unjuk rasa anarkis di daerah perkotaan. Ajukan pertanyaan/situasi eskalasi satu per satu dan tunggu respons taktis saya untuk menilai keputusan saya berdasarkan Perkap No. 1 Tahun 2009 tentang Penggunaan Kekuatan.`
    },
    {
      title: "📑 Penyusunan Outline Policy Brief Taktis (Claude / Gemini)",
      role: "Draf Pemecahan Masalah Kamtibmas",
      prompt: `Bantu saya menyusun outline Policy Brief mengenai strategi penanggulangan kejahatan siber lintas negara. Outline harus memuat: Executive Summary, Latar Belakang Masalah, Analisis Kebijakan Eksisting, Pilihan Alternatif Solusi, dan Rekomendasi Aksi Taktis.`
    }
  ]

  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-8 xl:px-12 mt-14">
      {/* Header section with Gold accent */}
      <div className="max-w-7xl mx-auto mb-16 text-center space-y-3">
        <span className="text-[10px] md:text-xs font-black tracking-widest text-polri-goldSoft uppercase">
          {content.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          {pageTitle}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-polri-gold via-yellow-500 to-transparent mx-auto mt-2 rounded"></div>
        <p className="max-w-3xl mx-auto text-xs md:text-sm text-neutral-400 leading-relaxed pt-2">
          {pageDescription}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Curated AI Tools Grid */}
        <div className="space-y-6">
          <div className="border-l-4 border-polri-gold pl-4">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Direktori Alat Bantu AI Utama</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Daftar teknologi AI yang direkomendasikan beserta kasus penggunaan kepolisian.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, idx) => (
              <div 
                key={idx}
                className="flex flex-col justify-between rounded-2xl bg-neutral-950 border border-neutral-900 p-6 hover:border-polri-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-polri-goldSoft bg-polri-maroon/20 px-2.5 py-0.5 rounded border border-polri-gold/10">
                      {tool.category}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-mono">Verifikasi Humas</span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-polri-goldSoft transition-colors duration-200">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex justify-between items-center">
                  <span className="text-[10px] text-neutral-500">Kecerdasan Buatan</span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[10px] font-black uppercase text-polri-goldSoft hover:bg-polri-gold hover:text-neutral-950 hover:border-polri-gold transition-all duration-300 cursor-pointer"
                  >
                    Buka Tools
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Engineering Guide */}
        <div className="space-y-6">
          <div className="border-l-4 border-polri-gold pl-4">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Kotak Prompt Taktis Kepolisian</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Salin template perintah (prompt) berikut untuk memandu AI agar memberikan hasil berkualitas tinggi.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {promptTemplates.map((p, idx) => (
              <div 
                key={idx}
                className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-black text-white">{p.title}</h3>
                  <span className="inline-block text-[8px] uppercase tracking-wider font-extrabold text-neutral-400 mt-2 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-850">
                    Skenario: {p.role}
                  </span>
                  <div className="mt-4 bg-black border border-neutral-900 rounded-xl p-3.5 text-[10px] font-mono text-neutral-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all cursor-pointer hover:border-polri-gold/20 transition-all">
                    {p.prompt}
                  </div>
                </div>
                <div className="mt-4 text-[8px] text-neutral-500 italic text-center">
                  💡 Klik dua kali teks di atas untuk menyalin prompt secara otomatis.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
