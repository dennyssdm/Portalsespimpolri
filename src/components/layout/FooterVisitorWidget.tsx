'use client'

import { CursorArrowRaysIcon, ServerIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const counterStorageKey = 'sespim-footer-counter'

export function FooterVisitorWidget() {
  const [count, setCount] = useState(0)
  const [ipAddress, setIpAddress] = useState('Memuat...')

  useEffect(() => {
    const storedCount = window.localStorage.getItem(counterStorageKey)

    if (storedCount) {
      setCount(Number(storedCount) || 0)
    }

    fetch('/api/client-ip', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: { ip?: string }) => setIpAddress(data.ip || 'Tidak tersedia'))
      .catch(() => setIpAddress('Tidak tersedia'))
  }, [])

  function handleCounterClick() {
    setCount((currentCount) => {
      const nextCount = currentCount + 1
      window.localStorage.setItem(counterStorageKey, String(nextCount))
      return nextCount
    })
  }

  return (
    <div className="grid gap-2 rounded-lg border border-polri-gold/30 bg-white/5 p-2 sm:grid-cols-[minmax(180px,0.6fr)_minmax(0,1.4fr)]">
      <button
        type="button"
        onClick={handleCounterClick}
        className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-polri-gold/40 bg-polri-gold px-4 py-2 text-left text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
      >
        <span className="inline-flex items-center gap-2">
          <CursorArrowRaysIcon className="h-5 w-5" aria-hidden="true" />
          Counter
        </span>
        <span className="rounded-lg bg-polri-brownDark px-3 py-1 text-white">{count}</span>
      </button>
      <div className="flex min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-polri-brownDark/60 px-4 py-2 text-sm text-white/78">
        <ServerIcon className="h-5 w-5 shrink-0 text-polri-goldSoft" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="shrink-0 font-bold text-polri-goldSoft">Alamat IP Pengguna</p>
          <p className="min-w-0 break-all font-mono text-xs text-white/82 sm:text-right">{ipAddress}</p>
        </div>
      </div>
    </div>
  )
}
