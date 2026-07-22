import { notFound } from 'next/navigation'
import { pages } from '@/data/pages'
import { SimulasiClient } from './SimulasiClient'

export default function Page() {
  const path = "/sarana-prasarana/simulasi"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-8 xl:px-12 mt-14">
      {/* Title Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-3">
        <span className="text-[10px] md:text-xs font-black tracking-widest text-polri-goldSoft uppercase">
          {content.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          {content.title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-polri-gold via-yellow-500 to-transparent mx-auto mt-2 rounded"></div>
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-neutral-450 leading-relaxed pt-2">
          {content.description}
        </p>
      </div>

      {/* Simulator Component */}
      <div className="max-w-7xl mx-auto">
        <SimulasiClient />
      </div>
    </div>
  )
}
