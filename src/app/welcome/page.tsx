import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selamat Datang | Portal Resmi Sespim',
  description: 'Welcome page Portal Web Resmi Sespim Lemdiklat Polri.'
}

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-polri-brownDark text-white">
      <section className="relative isolate flex min-h-[calc(100vh-76px)] items-center overflow-hidden py-16">
        <Image
          src="/images/sespim-campus-hero.png"
          alt="Gedung Sespim Lemdiklat Polri"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark via-polri-brownDark/82 to-polri-maroon/44" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-polri-gold to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-polri-gold/40 bg-white/10 p-2 backdrop-blur">
                <Image
                  src="/images/logo-sespim.png"
                  alt="Logo Sespim"
                  width={306}
                  height={323}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-polri-goldSoft">Portal Resmi</p>
                <p className="mt-1 text-base font-bold uppercase tracking-[0.12em] text-white/80">Sespim Lemdiklat Polri</p>
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Selamat Datang di Portal Web Resmi Sespim Lemdiklat Polri
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              Portal terpadu untuk informasi kelembagaan, pendidikan kepemimpinan, Widyaiswara, publikasi, berita kegiatan, galeri, unduhan, dan layanan pendukung akademik Sespim Polri.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex justify-center rounded-lg bg-polri-gold px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-polri-brownDark transition hover:bg-polri-goldSoft"
              >
                Masuk Portal
              </Link>
              <Link
                href="/profil"
                className="inline-flex justify-center rounded-lg border border-polri-gold/50 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-polri-gold hover:bg-white/16"
              >
                Lihat Profil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
