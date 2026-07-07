'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="bg-polri-cream py-20 min-h-[80vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-soft border border-polri-red/20 md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-polri-red/10 text-polri-red shadow-inner">
            <ExclamationTriangleIcon className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-polri-red">Error Terjadi</p>
          <h1 className="mt-3 text-3xl font-black text-polri-brownDark">Terjadi kesalahan pada sistem</h1>
          <p className="mt-4 text-neutral-700 leading-7">
            Maaf, terjadi kendala saat memuat halaman ini. Silakan coba memuat ulang atau kembali ke halaman beranda.
          </p>
          {error.message ? (
            <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-left">
              <p className="font-mono text-xs text-neutral-500 break-all select-all">
                Detail: {error.message}
              </p>
            </div>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 justify-center sm:flex-row">
            <button
              onClick={() => reset()}
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-polri-maroon px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft"
            >
              Coba Lagi
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-polri-gold px-5 py-3 font-bold text-polri-brownDark transition hover:-translate-y-0.5 hover:bg-polri-cream hover:shadow-soft"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
