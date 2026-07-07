import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { searchPortal } from '@/lib/searchIndex'
import { externalLinkProps } from '@/lib/links'
import { EmptyState } from '@/components/ui/EmptyState'

export const metadata: Metadata = {
  title: 'Pencarian Portal | Sespim',
  description: 'Pencarian konten, halaman, nama, dokumen, berita, publikasi, dan profil Widyaiswara pada Portal Resmi Sespim.'
}

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

export default async function Page({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = getQueryValue(params.q).trim()
  const results = searchPortal(query)

  return (
    <main>
      <PageHero
        eyebrow="Pencarian Portal"
        title="Cari konten, nama, dokumen, dan halaman"
        description="Gunakan pencarian ini untuk menemukan halaman profil, materi unduhan, pejabat, Widyaiswara, berita, publikasi, dan layanan pendukung di Portal Resmi Sespim."
      />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-5">
        <Container>
          <form action="/pencarian" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Contoh: Widyaiswara, PPKT, Midi Siswoko, Sespimti, Turnitin"
              className="min-h-12 rounded-lg border border-polri-gold/35 bg-white px-4 text-base font-semibold text-polri-brownDark outline-none transition placeholder:text-neutral-500 focus:border-polri-maroon"
              aria-label="Masukkan kata kunci pencarian"
            />
            <button type="submit" className="rounded-lg bg-polri-maroon px-6 py-3 text-sm font-black text-white transition hover:bg-polri-brownDark">
              Cari Portal
            </button>
          </form>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-gold">Hasil Pencarian</p>
              <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">
                {query ? `${results.length} hasil untuk "${query}"` : 'Masukkan kata kunci untuk mulai mencari'}
              </h2>
            </div>
            {query ? (
              <p className="rounded-lg bg-polri-cream px-4 py-3 text-sm font-bold text-polri-brownDark">
                Konten, nama, dokumen, dan metadata
              </p>
            ) : null}
          </div>

          {query && results.length ? (
            <div className="mt-8 grid gap-4">
              {results.map((result) => (
                <Link
                  key={`${result.href}-${result.title}`}
                  href={result.href}
                  {...externalLinkProps(result.href)}
                  className="group rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                      {result.category}
                    </span>
                    {result.matchedText ? (
                      <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                        {result.matchedText}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-xl font-black text-polri-brownDark group-hover:text-polri-maroon">
                    {result.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{result.description}</p>
                </Link>
              ))}
            </div>
          ) : null}

          {query && !results.length ? (
            <div className="mt-8">
              <EmptyState
                title="Hasil tidak ditemukan"
                description={`Kami tidak menemukan hasil pencarian untuk "${query}". Silakan coba kata kunci lain seperti nama personel, jabatan, program pendidikan, judul materi, atau layanan pendukung.`}
                action={{
                  label: 'Reset Pencarian',
                  href: '/pencarian'
                }}
              />
            </div>
          ) : null}

          {!query ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Nama Widyaiswara', 'Materi unduhan', 'Program pendidikan'].map((item) => (
                <div key={item} className="rounded-lg border border-polri-gold/25 bg-polri-cream p-5">
                  <p className="font-black text-polri-brownDark">{item}</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    Pencarian akan membaca judul, deskripsi, isi ringkas, metadata, dan kata kunci terkait.
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </main>
  )
}
