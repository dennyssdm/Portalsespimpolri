'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalized = query.trim()
    if (!normalized) return

    router.push(`/pencarian?q=${encodeURIComponent(normalized)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full min-w-0 items-center gap-2 rounded-lg border border-polri-gold/35 bg-white/10 px-3 py-2 backdrop-blur sm:w-56">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        type="search"
        placeholder="Cari konten"
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60"
        aria-label="Cari konten, halaman, nama, dan dokumen"
      />
      <button type="submit" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-polri-gold text-polri-brownDark hover:bg-polri-goldSoft" aria-label="Cari">
        <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  )
}
