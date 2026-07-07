'use client'

import Image from 'next/image'
import { useState } from 'react'

export function KasespimPhoto() {
  const [loaded, setLoaded] = useState(true)

  if (!loaded) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-lg bg-polri-brownDark text-center text-white">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Foto Resmi</p>
          <p className="mt-3 text-2xl font-black">Kasespim</p>
          <p className="mt-2 text-sm text-white/64">Simpan file di public/images/kasespim.png</p>
        </div>
      </div>
    )
  }

  return (
    <figure className="relative min-h-80 overflow-hidden rounded-lg bg-polri-brownDark">
      <Image
        src="/images/kasespim.png"
        alt="Foto resmi Kasespim Lemdiklat Polri"
        fill
        sizes="(min-width: 1024px) 420px, 100vw"
        className="object-cover object-top"
        onError={() => setLoaded(false)}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-polri-brownDark via-polri-brownDark/82 to-transparent px-5 pb-5 pt-16 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-polri-goldSoft">Kasespim Lemdiklat Polri</p>
      </figcaption>
    </figure>
  )
}
