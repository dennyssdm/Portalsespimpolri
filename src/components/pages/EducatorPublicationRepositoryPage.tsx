import { BookOpenIcon, DocumentTextIcon, LightBulbIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { educatorPublicationCategories, type EducatorPublication, type EducatorPublicationCategory } from '@/data/educatorPublications'

type EducatorPublicationRepositoryPageProps = {
  items: EducatorPublication[]
}

const categoryIcons: Record<EducatorPublicationCategory, typeof BookOpenIcon> = {
  Buku: BookOpenIcon,
  Jurnal: DocumentTextIcon,
  Pemikiran: LightBulbIcon,
  Kajian: MagnifyingGlassIcon
}

const categoryDescriptions: Record<EducatorPublicationCategory, string> = {
  Buku: 'Karya buku dan bahan bacaan panjang dari Widyaiswara.',
  Jurnal: 'Artikel ilmiah dan publikasi jurnal yang dapat dijadikan rujukan akademik.',
  Pemikiran: 'Opini akademik, gagasan strategis, dan catatan pembelajaran.',
  Kajian: 'Kajian, policy brief, dan telaah isu kepolisian atau manajemen.'
}

function countByCategory(items: EducatorPublication[], category: EducatorPublicationCategory) {
  return items.filter((item) => item.category === category).length
}

export function EducatorPublicationRepositoryPage({ items }: EducatorPublicationRepositoryPageProps) {
  const uploadedCount = items.filter((item) => item.href).length

  return (
    <main>
      <PageHero
        eyebrow="Widyaiswara"
        title="Publikasi Widyaiswara"
        description="Repository karya buku, jurnal, pemikiran, dan kajian Widyaiswara yang telah diunggah agar dapat digunakan sebagai referensi akademik."
      />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path="/widyaiswara/publikasi" currentLabel="Publikasi Widyaiswara" />
        </Container>
      </section>

      <section className="bg-polri-brownDark py-10 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Repository Referensi</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Katalog karya Widyaiswara sebagai rujukan pembelajaran</h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                Setiap karya dapat ditautkan ke PDF, jurnal, atau sumber resmi setelah dokumen final diunggah ke portal.
              </p>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-polri-gold/30 sm:grid-cols-3">
              <div className="border-b border-polri-gold/20 bg-white/8 p-5 sm:border-b-0 sm:border-r">
                <p className="text-3xl font-black text-polri-goldSoft">{items.length}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">Karya terdata</p>
              </div>
              <div className="border-b border-polri-gold/20 bg-white/8 p-5 sm:border-b-0 sm:border-r">
                <p className="text-3xl font-black text-polri-goldSoft">{uploadedCount}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">File tertaut</p>
              </div>
              <div className="bg-white/8 p-5">
                <p className="text-3xl font-black text-polri-goldSoft">{educatorPublicationCategories.length}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">Kategori</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <SectionTitle
            eyebrow="Kategori Referensi"
            title="Buku, jurnal, pemikiran, dan kajian"
            description="Empat kategori ini disiapkan untuk membantu peserta didik menemukan rujukan Widyaiswara sesuai kebutuhan akademik."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {educatorPublicationCategories.map((category) => {
              const Icon = categoryIcons[category]

              return (
                <article key={category} className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-polri-brownDark">{category}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{categoryDescriptions[category]}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-polri-cream text-polri-maroon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-black text-polri-maroon">{countByCategory(items, category)}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-polri-cream py-12">
        <Container>
          <SectionTitle
            eyebrow="Daftar Karya"
            title="Katalog publikasi yang siap menjadi referensi"
            description="Kartu ini dapat dihubungkan ke file PDF atau tautan publikasi resmi setelah dokumen karya diunggah."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {items.map((item) => {
              const Icon = categoryIcons[item.category]

              return (
                <article key={item.slug} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
                  <div className="flex items-start justify-between gap-4 border-b border-polri-gold/20 bg-white p-5">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">{item.category}</p>
                      <h2 className="mt-2 text-xl font-black leading-7 text-polri-brownDark">{item.title}</h2>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-polri-cream text-polri-maroon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="grid gap-4 p-5">
                    <p className="text-sm font-semibold leading-7 text-neutral-700">{item.summary}</p>
                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      <p className="rounded-lg bg-polri-cream px-4 py-3 font-bold text-polri-brownDark">Penulis: {item.author}</p>
                      <p className="rounded-lg bg-polri-cream px-4 py-3 font-bold text-polri-brownDark">Tahun: {item.year}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.keywords.map((keyword) => (
                        <span key={keyword} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-neutral-700 ring-1 ring-polri-gold/25">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    {item.fileName ? (
                      <p className="rounded-lg bg-polri-cream px-4 py-3 text-xs font-bold text-polri-brownDark">{item.fileName}</p>
                    ) : null}
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center rounded-lg bg-polri-gold px-4 py-3 text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
                      >
                        Buka Referensi
                      </a>
                    ) : (
                      <div className="rounded-lg border border-dashed border-polri-gold/45 bg-polri-cream px-4 py-3 text-center text-sm font-black text-polri-brownDark">
                        File referensi belum diunggah
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>
    </main>
  )
}
