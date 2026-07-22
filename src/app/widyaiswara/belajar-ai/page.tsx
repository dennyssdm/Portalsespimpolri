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
      title: "📚 Penyusunan Rencana Pembelajaran (RPS)",
      role: "Widyaiswara / Perencanaan Ajar",
      prompt: `Bertindaklah sebagai desainer kurikulum pendidikan kepolisian senior. Bantu saya menyusun Rencana Pembelajaran Semester (RPS) untuk mata kuliah 'Manajemen Operasional Kamtibmas'. RPS harus mencakup: 1. Capaian Pembelajaran Lulusan (CPL), 2. Pokok Bahasan Mingguan (16 Pertemuan), 3. Metode Pembelajaran Orang Dewasa (Andragogi), dan 4. Kriteria Penilaian berbasis studi kasus taktis.`
    },
    {
      title: "📖 Penyusunan Bahan Ajar (Hanjar)",
      role: "Widyaiswara / Penulisan Hanjar",
      prompt: `Bertindaklah sebagai instruktur taktis Lemdiklat Polri. Kembangkan draf modul Bahan Ajar (Hanjar) untuk materi 'Kepemimpinan Presisi di Era Siber'. Rancang bab pendahuluan, definisi siber dari perspektif Polri, 3 pilar penindakan kejahatan siber, serta 5 studi kasus dilema etika pengambilan keputusan bagi Kapolres.`
    },
    {
      title: "📝 Pembuatan Soal Ujian & Evaluasi",
      role: "Evaluasi Pendidikan / Bank Soal",
      prompt: `Bertindaklah sebagai tim penguji akademik Sespim. Buatlah 5 soal ujian esai analitis tingkat tinggi (HOTS - Higher Order Thinking Skills) untuk peserta didik Sespimmen mengenai 'Manajemen Konflik Sosial dan Resolusi Konflik Polisi-Masyarakat'. Sertakan kunci jawaban penilaian (rubrik) untuk masing-masing soal.`
    },
    {
      title: "🎓 Penyusunan Kurikulum Presisi",
      role: "Reformasi Kurikulum Sespim",
      prompt: `Bertindaklah sebagai pakar sosiologi keamanan dan pendidikan tinggi militer/polisi. Berikan rancangan kurikulum modern terintegrasi teknologi AI untuk program pendidikan Sespimti. Kurikulum harus membagi kompetensi menjadi: Kepemimpinan Strategis, Pemodelan Data Presisi, Etika Publik, Keamanan Siber Nasional, dan Manajemen Krisis Kontemporer.`
    },
    {
      title: "📝 Analisis & Telaah Regulasi Kepolisian (NotebookLM / Claude)",
      role: "Pemberian Dokumen Hanjar / Perkap",
      prompt: `Bertindaklah sebagai asisten riset kepolisian senior. Analisis dokumen regulasi yang saya unggah ini. Temukan jika terdapat tumpang tertib regulasi, inkonsistensi taktis, serta berikan rekomendasi perbaikan pasal dalam format draf naskah akademik yang formal.`
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
    <div className="min-h-screen bg-black pt-16">
      {/* Premium Full-bleed Hero Section with Split Layout & Generated Image, sitting directly under the menu */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-900 py-16 lg:py-24">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-polri-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-polri-maroon/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Tech grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polri-maroon/20 border border-polri-gold/20">
              <span className="w-2 h-2 rounded-full bg-polri-goldSoft animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest text-polri-goldSoft uppercase">
                {content.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
              {pageTitle}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-polri-gold via-yellow-500 to-transparent rounded-full"></div>
            <p className="text-xs md:text-sm text-neutral-450 leading-relaxed max-w-xl">
              {pageDescription}
            </p>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
              <div>
                <span className="block text-xl font-black text-white">7+ Tools</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Teknologi AI</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">100%</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Studi Kasus Polri</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="block text-xl font-black text-white">Presisi</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Standar Pembelajaran</span>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="relative group max-w-md w-full aspect-square rounded-2xl overflow-hidden border border-polri-gold/20 shadow-2xl transition-all duration-500 hover:border-polri-gold/40">
              {/* Holographic light overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 z-10"></div>
              <img 
                src="/images/belajar_ai_hero.png" 
                alt="Belajar AI Sespim Lemdiklat"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Tech badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/80 backdrop-blur-md border border-neutral-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Media Visual</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">AI Training Center</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded border border-emerald-500/20 uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 py-16 space-y-16">
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
