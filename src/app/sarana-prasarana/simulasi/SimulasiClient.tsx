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
    text: "SKENARIO 1 (Crowd Control): Massa buruh sebanyak 5.000 orang berkumpul di depan Gedung DPRD. Situasi mulai memanas karena perwakilan mereka ditolak masuk. Beberapa provokator mulai melempar botol plastik ke arah barikade awal Polwan. Sebagai Kapolres, apa tindakan taktis pertama Anda?",
    options: [
      { text: "Turunkan Tim Negosiasi (Polwan) ke depan, gunakan pengeras suara untuk menenangkan massa secara humanis.", kpi: { trust: 15, riot: "Mulai Tenang" }, next: "stage2_disaster" },
      { text: "Perintahkan pasukan Sabhara bersiap dengan tameng, dorong massa mundur 50 meter ke belakang.", kpi: { trust: -10, riot: "Tegang" }, next: "stage2_disaster" },
      { text: "Tembakkan Gas Air Mata segera untuk membubarkan kerumunan sebelum semakin anarkis.", kpi: { trust: -30, riot: "Kacau / Rusuh" }, next: "stage2_disaster" }
    ]
  },
  stage2_disaster: {
    text: "SKENARIO 2 (Disaster Response): Terjadi banjir bandang di wilayah lereng gunung. Warga desa adat menolak dievakuasi dari zona merah rawan longsor susulan karena alasan spiritual dan adat leluhur. Bagaimana langkah kepemimpinan Anda?",
    options: [
      { text: "Lakukan dialog kultural melalui tokoh adat setempat, janjikan evakuasi barang pusaka desa secara terhormat.", kpi: { trust: 15, riot: "Kondusif" }, next: "stage3_integrity" },
      { text: "Kerahkan truk Dalmas untuk mengevakuasi paksa seluruh warga demi menyelamatkan jiwa mereka secara instan.", kpi: { trust: -5, riot: "Tegang" }, next: "stage3_integrity" },
      { text: "Tunda evakuasi, fokus menyalurkan logistik medis dan makanan di posko batas luar sambil menunggu arahan BPBD.", kpi: { trust: -15, riot: "Mulai Tenang" }, next: "stage3_integrity" }
    ]
  },
  stage3_integrity: {
    text: "SKENARIO 3 (Integrity & Conflict): Ditemukan aktivitas tambang emas ilegal skala besar yang menghidupi ratusan kepala keluarga lokal. Penyelidikan intelijen menunjukkan tambang tersebut dibekingi oleh oknum Perwira polisi di jajaran Polres Anda. Apa tindakan Anda?",
    options: [
      { text: "Lakukan tindakan hukum tegas menutup tambang secara transparan, serta proses etik oknum perwira beking tanpa pandang bulu.", kpi: { trust: 25, riot: "Tegang" }, next: "stage4_cyber" },
      { text: "Ganden Pemda untuk merancang program peralihan mata pencaharian warga terlebih dahulu sebelum melakukan penertiban hukum bertahap.", kpi: { trust: 15, riot: "Mulai Tenang" }, next: "stage4_cyber" },
      { text: "Tutup mata sementara waktu demi menjaga mata pencaharian warga lokal serta menghindari potensi bentrokan massal.", kpi: { trust: -25, riot: "Kondusif" }, next: "stage4_cyber" }
    ]
  },
  stage4_cyber: {
    text: "SKENARIO 4 (Cyber Security): Database Polres diretas oleh ransomware. Hacker meminta tebusan tebusan $50.000 dalam bitcoin dan mengancam akan membocorkan data pribadi pelapor kasus sensitif (pelecehan seksual) ke publik jika tidak dibayar dalam 6 jam. Apa respons Anda?",
    options: [
      { text: "Tolak membayar tebusan, umumkan insiden secara transparan kepada publik, dan undang Bareskrim Siber untuk pelacakan.", kpi: { trust: 20, riot: "Kondusif" }, next: "stage5_hoax" },
      { text: "Bayar uang tebusan secara diam-diam menggunakan dana darurat demi melindungi keamanan data pelapor dan reputasi institusi.", kpi: { trust: -20, riot: "Kondusif" }, next: "stage5_hoax" },
      { text: "Sembunyikan insiden dari pers dan publik, klaim bahwa sistem sedang mengalami pemeliharaan (maintenance) rutin.", kpi: { trust: -35, riot: "Tegang" }, next: "stage5_hoax" }
    ]
  },
  stage5_hoax: {
    text: "SKENARIO 5 (Panic Control): Video hoaks kasus penculikan anak viral di wilayah Anda. Ratusan warga yang panik mengepung dan memukuli seorang pedagang keliling asing yang dituduh sebagai penculik. Bagaimana perintah taktis Anda?",
    options: [
      { text: "Kerahkan tim patroli segera untuk menyelamatkan korban, amankan pelaku provokasi, dan rilis video klarifikasi fakta di media sosial.", kpi: { trust: 25, riot: "Kondusif" }, next: "evaluation" },
      { text: "Bubarkan kerumunan massa secara represif menggunakan tembakan gas air mata tanpa melakukan imbauan/klarifikasi terlebih dahulu.", kpi: { trust: -10, riot: "Kacau / Rusuh" }, next: "evaluation" },
      { text: "Keluarkan imbauan tertulis di media sosial agar warga tidak terprovokasi, tanpa mengirimkan tim evakuasi fisik secara cepat.", kpi: { trust: -20, riot: "Tegang" }, next: "evaluation" }
    ]
  },
  // Ending Screens
  ending_good: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN STRATEGIS & HUMANIS.\n\nSelamat! Anda berhasil meredakan seluruh krisis makro dengan mengedepankan hak asasi manusia, dialog kultural, dan transparansi informasi publik. Keputusan Anda mencerminkan doktrin kepemimpinan Presisi Polri yang modern dan dicintai masyarakat.",
    badge: "The Strategic Diplomat",
    isEnd: true
  },
  ending_neutral: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN PROSEDURAL & TAKTIS.\n\nAnda berhasil mengamankan wilayah dari kerusuhan fisik, namun beberapa kebijakan Anda dinilai kurang transparan dan kurang memperhatikan dampak sosial. Perlu peningkatan pada aspek media handling dan kepekaan sosial krisis.",
    badge: "Tactical Officer",
    isEnd: true
  },
  ending_bad: {
    text: "SIMULASI SELESAI: KEPEMIMPINAN GAGAL & REPRESIF.\n\nKeputusan Anda memicu gelombang kerusuhan (Riot) di lapangan, pelanggaran hak warga, dan jatuhnya kepercayaan publik ke titik terendah. Perlu evaluasi total dan pelatihan intensif manajemen krisis di Sespim.",
    badge: "Repressive Commander (Evaluasi Total)",
    isEnd: true
  }
}

export function SimulasiClient() {
  const [publicTrust, setPublicTrust] = useState(50)
  const [riotLevel, setRiotLevel] = useState("Kondusif")
  const [currentStep, setCurrentStep] = useState("start")

  const handleOptionClick = (option: StoryOption) => {
    const nextTrust = Math.max(0, Math.min(100, publicTrust + option.kpi.trust))
    const nextRiot = option.kpi.riot

    setPublicTrust(nextTrust)
    setRiotLevel(nextRiot)

    if (option.next === 'evaluation') {
      if (nextTrust >= 75) {
        setCurrentStep('ending_good')
      } else if (nextTrust >= 45) {
        setCurrentStep('ending_neutral')
      } else {
        setCurrentStep('ending_bad')
      }
    } else {
      setCurrentStep(option.next)
    }
  }

  const handleRestart = () => {
    setPublicTrust(50)
    setRiotLevel("Kondusif")
    setCurrentStep("start")
  }

  const currentStory = storyData[currentStep] || storyData.start
  const isKondusif = riotLevel === "Kondusif" || riotLevel === "Mulai Tenang"
  const rank = isKondusif ? "AKBP (Promosi)" : "AKP"

  // Helper to determine stage number
  const getStageNumber = () => {
    if (currentStep === 'start') return 1
    if (currentStep === 'stage2_disaster') return 2
    if (currentStep === 'stage3_integrity') return 3
    if (currentStep === 'stage4_cyber') return 4
    if (currentStep === 'stage5_hoax') return 5
    return 5
  }

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
        <div className="flex items-center gap-2">
          {!currentStory.isEnd && (
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-black rounded-lg">
              SKENARIO {getStageNumber()} / 5
            </span>
          )}
          <span className="px-3 py-1 bg-polri-maroon/20 border border-polri-gold/20 text-polri-goldSoft text-[9px] font-black rounded-full uppercase tracking-wider shrink-0">
            Ujian Kompetensi Simulasi
          </span>
        </div>
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
                publicTrust >= 75 ? 'bg-emerald-500' : publicTrust >= 45 ? 'bg-yellow-500' : 'bg-red-500'
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
