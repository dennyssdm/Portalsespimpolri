import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EmptyState } from '@/components/ui/EmptyState'

export type CollectionCardItem = {
  title: string
  category: string
  date?: string
  meta?: string
  summary: string
  href: string
  tags?: string[]
}

type ContentCollectionPageProps = {
  path: string
  eyebrow: string
  title: string
  description: string
  items: CollectionCardItem[]
  emptyText?: string
}

export function ContentCollectionPage({ path, eyebrow, title, description, items, emptyText }: ContentCollectionPageProps) {
  const categories = Array.from(new Set(items.map((item) => item.category)))
  const featured = items[0]

  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={title} />
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <SectionTitle
                eyebrow="Listing Konten"
                title="Daftar konten terbaru"
                description="Konten contoh ini menjadi baseline front-end untuk listing, detail, metadata, dan tautan terkait sebelum integrasi CMS."
              />

              {categories.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-lg border border-polri-gold/30 bg-polri-cream px-3 py-2 text-sm font-bold text-polri-brownDark">
                      {category}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 grid gap-5">
                {items.length ? (
                  items.map((item) => (
                    <Link key={item.href} href={item.href} className="group block min-w-0 rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:border-polri-gold hover:shadow-gold">
                      <article>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                            {item.category}
                          </span>
                          {item.date ? (
                            <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                              {item.date}
                            </span>
                          ) : null}
                          {item.meta ? (
                            <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                              {item.meta}
                            </span>
                          ) : null}
                        </div>
                        <h2 className="mt-4 text-lg font-black text-polri-brownDark group-hover:text-polri-maroon sm:text-xl">{item.title}</h2>
                        <p className="mt-3 text-sm leading-7 text-neutral-700">{item.summary}</p>
                        {item.tags?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-xs font-bold text-neutral-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Konten Belum Tersedia"
                    description={emptyText ?? 'Maaf, koleksi konten ini sedang dalam proses penyusunan oleh redaksi Sespim.'}
                  />
                )}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-lg bg-polri-brownDark p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Status Listing</p>
                <h3 className="mt-3 text-xl font-black">Baseline Phase 5</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Listing ini memakai data lokal sebagai fondasi sebelum terhubung dengan CMS, API, atau dashboard admin.
                </p>
              </div>

              {featured ? (
                <Link href={featured.href} className="block rounded-lg border border-polri-gold/25 bg-polri-cream p-6 hover:border-polri-gold hover:bg-white">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-polri-maroon">Sorotan</p>
                  <h3 className="mt-3 font-black text-polri-brownDark">{featured.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{featured.summary}</p>
                </Link>
              ) : null}

              <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                <h3 className="font-black text-polri-brownDark">Kesiapan Integrasi</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
                  <li>Metadata kategori, tanggal, tag, dan ringkasan sudah tersedia.</li>
                  <li>Setiap kartu mengarah ke route detail berbasis slug.</li>
                  <li>Struktur siap diperluas dengan pagination dan filter dinamis.</li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
