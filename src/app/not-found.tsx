import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { HomeIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <main className="bg-polri-cream py-20 min-h-[80vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-soft border border-polri-gold/20 md:p-12">
          {/* Logo Sespim */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <Image
              src="/images/logo-sespim.png"
              alt="Logo Sespim Polri"
              width={306}
              height={323}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-maroon">Halaman Tidak Ditemukan</p>
          <h1 className="mt-3 text-4xl font-black text-polri-brownDark">404</h1>
          <p className="mt-4 text-neutral-700 leading-7">
            Maaf, halaman yang Anda tuju tidak ditemukan atau belum tersedia pada baseline front-end saat ini.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-polri-brownDark px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-maroon hover:shadow-soft"
            >
              <HomeIcon className="h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

