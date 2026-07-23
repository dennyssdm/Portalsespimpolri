import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { SimulasiClient } from './SimulasiClient'
import Image from 'next/image'

export default function Page() {
  const path = "/sarana-prasarana/simulasi"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Full Width Hero */}
      <div className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-900">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,160,89,0.08),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(141,31,43,0.05),transparent_50%)] pointer-events-none" />
        
        {/* Grid patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-polri-gold/30 bg-polri-gold/10 px-3.5 py-1 text-xs font-black text-polri-goldSoft uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-polri-gold animate-ping"></span>
              AI Decision-Making Engine Active
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.1]">
              SIMULASI <br />
              <span className="bg-gradient-to-r from-polri-gold via-yellow-500 to-white bg-clip-text text-transparent">
                KEPEMIMPINAN AI
              </span>
            </h1>
            <p className="text-sm md:text-base text-neutral-455 leading-relaxed max-w-xl">
              Hadapi krisis makro secara virtual dengan sistem V-PCLS (*Virtual Police Leadership Simulator*). Analisis situasi taktis di lapangan dengan pemodelan kecerdasan buatan, pertahankan kepercayaan publik (*Public Trust*), dan amankan stabilitas wilayah secara humanis dan presisi.
            </p>
            
            {/* Live AI Status Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md border-t border-neutral-900">
              <div className="space-y-1.5">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">AI Engine Status</p>
                <p className="text-xs font-black text-emerald-500 font-mono flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  ONLINE
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Database Skenario</p>
                <p className="text-xs font-black text-white font-mono">5 DOKTRIN</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Metode Evaluasi</p>
                <p className="text-xs font-black text-polri-goldSoft font-mono">STANDAR SESPIM</p>
              </div>
            </div>
          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-polri-gold/40 to-polri-maroon/30 opacity-40 blur-2xl animate-pulse" />
            <div className="relative rounded-2xl border-2 border-polri-gold/25 bg-black overflow-hidden shadow-2xl">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/police_ai_simulator.png"
                  alt="Police AI Technology Simulator"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 500px"
                />
                
                {/* HUD decorative corners */}
                <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-polri-goldSoft/60"></div>
                <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-polri-goldSoft/60"></div>
                <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-polri-goldSoft/60"></div>
                <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-polri-goldSoft/60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 py-12">
        <SimulasiClient />
      </div>
    </div>
  )
}
