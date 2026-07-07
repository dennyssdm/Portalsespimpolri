import type { Metadata } from 'next'
import { ArrowRightIcon, KeyIcon, LockClosedIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Login Internal | Portal Resmi Sespim Lemdiklat Polri',
  description: 'Akses internal untuk personel, pengelola konten, dan layanan pendukung Portal Resmi Sespim Lemdiklat Polri.'
}

const accessScopes = [
  {
    title: 'Personel Sespim',
    description: 'Akses layanan operasional, referensi internal, dan informasi pendukung kedinasan.',
    icon: UserGroupIcon
  },
  {
    title: 'Pengelola Konten',
    description: 'Pintu masuk untuk pembaruan berita, publikasi, agenda, dan dokumen resmi setelah integrasi CMS.',
    icon: KeyIcon
  },
  {
    title: 'Akses Terproteksi',
    description: 'Disiapkan untuk autentikasi resmi, audit akses, dan kontrol hak pengguna.',
    icon: ShieldCheckIcon
  }
]

export default function LoginInternalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Akses Internal"
        title="Login Internal Sespim Polri"
        description="Pintu masuk internal disiapkan untuk personel, pengelola konten, dan layanan pendukung setelah endpoint autentikasi resmi diintegrasikan."
      />

      <section className="bg-polri-cream py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="rounded-lg border border-polri-gold/30 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-polri-brownDark text-polri-goldSoft">
                <LockClosedIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Status Integrasi</p>
              <h2 className="mt-3 text-2xl font-black text-polri-brownDark">Gateway internal siap disambungkan</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Menu login sudah tersedia di header, mobile drawer, footer, pencarian, dan sitemap. Form autentikasi aktif perlu menunggu konfigurasi SSO, direktori pengguna, atau endpoint backend resmi.
              </p>

              <div className="mt-6 border-l-4 border-polri-gold pl-4">
                <p className="text-sm font-bold text-polri-brownDark">Kebutuhan sebelum login aktif</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-neutral-700">
                  <li>Endpoint autentikasi resmi.</li>
                  <li>Aturan role personel dan pengelola konten.</li>
                  <li>Prosedur reset akses dan audit login.</li>
                </ul>
              </div>

              <Link
                href="/kontak"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-polri-gold px-5 py-3 text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
              >
                Hubungi Admin Portal
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {accessScopes.map((item) => {
                const Icon = item.icon

                return (
                  <article key={item.title} className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-polri-maroon text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-polri-brownDark">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-700">{item.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
