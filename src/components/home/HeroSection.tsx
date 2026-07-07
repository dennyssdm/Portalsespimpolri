import Image from 'next/image'
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/ui/Container'
import { institutionStats } from '@/data/homepage'
import { internalLoginLink } from '@/data/navigation'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-polri-brownDark text-white">
      <Image
        src="/images/sespim-campus-hero.png"
        alt="Kampus Sespim Lemdiklat Polri"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark via-polri-brownDark/82 to-polri-maroon/52" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-polri-goldSoft">Portal Resmi Sespim Lemdiklat Polri</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Pusat Informasi Pendidikan Kepemimpinan Polri
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Portal terpadu untuk profil kelembagaan, program pendidikan, widyaiswara, publikasi, berita kegiatan, galeri, unduhan, dan layanan pendukung akademik.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/program-pendidikan" className="rounded-xl bg-polri-gold px-5 py-3 text-center font-black text-polri-brownDark transition hover:bg-polri-goldSoft">
                Lihat Program Pendidikan
              </Link>
              <Link href="/publikasi" className="rounded-xl border border-polri-gold/60 px-5 py-3 text-center font-black text-polri-goldSoft transition hover:bg-white/10">
                Jelajahi Publikasi
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-polri-gold/40 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <Link
              href={internalLoginLink.href}
              className="flex items-center justify-between gap-3 rounded-t-[1.5rem] border-b border-polri-gold/25 bg-polri-brownDark px-5 py-3 text-sm font-black text-polri-goldSoft transition hover:bg-polri-maroon hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
                {internalLoginLink.label}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Akses Personel</span>
            </Link>
            <div className="rounded-b-[1.5rem] bg-white p-6 text-polri-brownDark">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-maroon">Dashboard Ringkas</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {institutionStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-polri-cream p-4">
                    <p className="text-3xl font-black text-polri-brownDark">{stat.value}</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-700">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-polri-gold/30 bg-white p-4">
                <p className="text-sm leading-7 text-neutral-700">
                  Baseline front-end sudah disiapkan untuk implementasi bertahap berbasis approval fase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
