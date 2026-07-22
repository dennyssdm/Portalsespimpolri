'use client'

import { useState } from 'react'

interface StoryOption {
  text: string
  kpi: { trust: number; riot: string }
  next: string
}

interface StoryStep {
  text: string
  options?: StoryOption[]
  badge?: string
  isEnd?: boolean
}

const storyData: Record<string, StoryStep> = {
  start: {
    text: "LAPORAN UTAMA: Massa buruh sebanyak 5.000 orang berkumpul di depan Gedung DPRD. Situasi mulai memanas karena perwakilan mereka ditolak masuk. Beberapa provokator mulai melempar botol plastik ke arah barikade awal Polwan. Sebagai Kapolres, apa tindakan taktis pertama Anda?",
    options: [
      { text: "Turunkan Tim Negosiasi (Polwan) ke depan, gunakan pengeras suara untuk menenangkan massa secara humanis.", kpi: { trust: 15, riot: "Mulai Tenang" }, next: "step_humanis" },
      { text: "Perintahkan pasukan Sabhara bersiap dengan tameng, dorong massa mundur 50 meter ke belakang.", kpi: { trust: -10, riot: "Tegang" }, next: "step_tegas" },
      { text: "Tembakkan Gas Air Mata segera untuk membubarkan kerumunan sebelum semakin anarkis.", kpi: { trust: -30, riot: "Kacau / Rusuh" }, next: "step_represif" }
    ]
  },
  step_humanis: {
    text: "KONDISI: Imbauan humanis berhasil meredam emosi mayoritas massa. Namun, media sosial menyebarkan hoaks bahwa Polisi bersikap lemah dan membiarkan penutupan jalan fasilitas publik. Wartawan mencegat Anda untuk wawancara dadakan secara live (Media Handling). Apa respons Anda?",
    options: [
      { text: "Tegaskan di kamera: 'Kami mengutamakan dialog demi keselamatan warga. Jalan dibuka bertahap lewat kesepakatan.'", kpi: { trust: 25, riot: "Kondusif" }, next: "ending_good" },
      { text: "Menolak berkomentar, langsung berjalan cepat menghindari kerumunan wartawan menuju mobil dinas.", kpi: { trust: -15, riot: "Mulai Tenang" }, next: "ending_neutral" }
    ]
  },
  step_tegas: {
    text: "KONDISI: Aksi saling dorong terjadi. Gas air mata belum ditembakkan, tetapi 2 personel Sabhara terluka terkena lemparan batu. Massa menuntut rekan mereka yang ditangkap segera dibebaskan dalam waktu 10 menit atau mereka akan membakar pos polisi terdekat. Bagaimana keputusan Anda?",
    options: [
      { text: "Lakukan mediasi cepat, janjikan pembebasan bersyarat setelah korlap menjamin massa bubar dengan tertib.", kpi: { trust: 10, riot: "Kondusif" }, next: "ending_good" },
      { text: "Abaikan tuntutan, perintahkan Water Cannon maju dan bersiap lakukan penangkapan massal pada provokator.", kpi: { trust: -15, riot: "Kacau / Rusuh" }, next: "ending_bad" }
    ]
  },
  step_represif: {
    text: "KONDISI: Keputusan represif Anda memicu kepanikan massal. Kerusuhan pecah di 3 titik sekitar gedung DPRD. Netizen di X (Twitter) menaikkan tagar kecaman terhadap tindakan kepolisian. Kapolda menelepon Anda dan meminta pertanggungjawaban instan. Apa langkah darurat Anda?",
    options: [
      { text: "Akui kesalahan prosedur di media, tarik pasukan represif, dan ganti dengan pendekatan dialog wilayah.", kpi: { trust: 5, riot: "Tegang" }, next: "ending_neutral" },
      { text: "Bertahan pada keputusan, lakukan sweeping total untuk membersihkan area terlepas dari kecaman publik.", kpi: { trust: -25, riot: "Darurat" }, next: "ending_bad" }
    ]
  },
  ending_good: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN SUKSES DIIPLOMATIS.\n\nAnda berhasil meredakan krisis makro tanpa ada korban luka serius. Penilaian AI menunjukkan Anda mengedepankan prinsip 'Salus Populi Suprema Lex Esto' (Keselamatan Rakyat adalah Hukum Tertinggi).",
    badge: "The Strategic Diplomat",
    isEnd: true
  },
  ending_neutral: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN PROSEDURAL.\n\nSituasi berhasil dikendalikan, namun komunikasi publik Anda dinilai kurang transparan sehingga menyisakan sentimen negatif di masyarakat. Perlu latihan lebih lanjut pada sektor Media Handling.",
    badge: "Tactical Officer",
    isEnd: true
  },
  ending_bad: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN GAGAL.\n\nKeputusan Anda memicu eskalasi kekerasan yang meluas (Riot). Tingkat kepercayaan publik jatuh ke titik nadir dan berisiko memicu sidang etik internal akibat kegagalan manajemen krisis.",
    badge: "Repressive Commander (Evaluasi Total)",
    isEnd: true
  }
}

export function SimulasiClient() {
  const [publicTrust, setPublicTrust] = useState(50)
  const [riotLevel, setRiotLevel] = useState("Kondusif")
  const [currentStep, setCurrentStep] = useState("start")

  const handleOptionClick = (option: StoryOption) => {
    setPublicTrust((prev) => Math.max(0, Math.min(100, prev + option.kpi.trust)))
    setRiotLevel(option.kpi.riot)
    setCurrentStep(option.next)
  }

  const handleRestart = () => {
    setPublicTrust(50)
    setRiotLevel("Kondusif")
    setCurrentStep("start")
  }

  const currentStory = storyData[currentStep] || storyData.start
  const isKondusif = riotLevel === "Kondusif" || riotLevel === "Mulai Tenang"
  const rank = isKondusif ? "AKBP (Promosi)" : "AKP"

  return (
    <div className="max-w-3xl mx-auto bg-neutral-950 border border-polri-gold/30 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-neutral-900 pb-5 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-black text-polri-goldSoft uppercase tracking-wider">
            V-PCLS: Leadership Simulator
          </h2>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
            AI Decision-Making Engine v1.0 • Lemdiklat Polri
          </p>
        </div>
        <span className="px-3 py-1 bg-polri-maroon/20 border border-polri-gold/20 text-polri-goldSoft text-[9px] font-black rounded-full uppercase tracking-wider shrink-0">
          Ujian Kompetensi Simulasi
        </span>
      </div>

      {/* KPI Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-neutral-900">
        {/* Rank */}
        <div className="flex flex-col items-center justify-center py-2 border-b md:border-b-0 md:border-r border-neutral-900">
          <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Pangkat Anda</span>
          <span className="text-sm font-black text-white mt-1 uppercase tracking-wider">{rank}</span>
        </div>

        {/* Public Trust */}
        <div className="flex flex-col items-center justify-center py-2 border-b md:border-b-0 md:border-r border-neutral-900 px-4">
          <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Kepercayaan Publik</span>
          <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-neutral-800 relative">
            <div 
              className={`h-full transition-all duration-500 ${
                publicTrust >= 60 ? 'bg-emerald-500' : publicTrust >= 35 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${publicTrust}%` }}
            ></div>
          </div>
          <span className="text-xs font-black text-white mt-1.5">{publicTrust}%</span>
        </div>

        {/* Riot Level */}
        <div className="flex flex-col items-center justify-center py-2">
          <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Kondisi Lapangan</span>
          <span className={`text-sm font-black mt-1 uppercase tracking-wider ${isKondusif ? 'text-emerald-450' : 'text-red-500 animate-pulse'}`}>
            {riotLevel}
          </span>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="min-h-[280px] flex flex-col justify-between bg-black/60 rounded-xl p-5 md:p-6 border border-neutral-900">
        {/* Narrative Text */}
        <div className="border-l-4 border-polri-gold pl-4 py-1.5 text-neutral-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
          {currentStory.text}
        </div>

        {/* Action Options or Restart */}
        <div className="mt-8">
          {currentStory.isEnd ? (
            <div className="space-y-6 text-center">
              <div className="inline-flex flex-col items-center p-4 bg-polri-maroon/10 border border-polri-gold/20 rounded-xl">
                <span className="text-[8px] uppercase tracking-widest text-polri-goldSoft font-bold">Lencana Kompetensi</span>
                <span className="text-base font-black text-white mt-2 uppercase tracking-wide">
                  🎖️ {currentStory.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRestart}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-polri-gold hover:bg-yellow-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition duration-200 shadow-lg cursor-pointer"
              >
                Mulai Ulang Simulasi
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-black mb-1">Pilih Tindakan Taktis:</span>
              {currentStory.options?.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionClick(opt)}
                  className="w-full text-left px-5 py-4 bg-neutral-950 border border-neutral-850 hover:border-polri-gold/40 hover:bg-polri-maroon/10 rounded-xl text-xs md:text-sm text-neutral-350 hover:text-white transition duration-300 flex items-start gap-4 group cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-900 group-hover:bg-polri-gold/20 flex items-center justify-center font-bold text-[10px] text-neutral-500 group-hover:text-polri-goldSoft border border-neutral-800 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{opt.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
