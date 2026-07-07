import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { InfoCard } from '@/components/ui/InfoCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PageFeaturePanel } from '@/components/pages/PageFeaturePanel'
import { ClinicQueueMockup } from '@/components/pages/ClinicQueueMockup'
import { NewsMonitoringPanel } from '@/components/pages/NewsMonitoringPanel'
import type { PageContent } from '@/types'
import { navigation, socialLinks } from '@/data/navigation'
import { pageHighlights } from '@/data/pageHighlights'
import { pageFeaturePanels } from '@/data/pageFeaturePanels'
import { externalLinkProps } from '@/lib/links'
import { cn } from '@/lib/cn'

type ContentPageProps = {
  content: PageContent
  path: string
}

export function ContentPage({ content, path }: ContentPageProps) {
  const currentSection = navigation.find((item) => item.href === path)
  const parentSection = navigation.find((item) => item.children?.some((child) => child.href === path))
  const childSections = navigation.flatMap((item) => item.children ?? [])
  const currentChildSection = childSections.find((item) => item.href === path)
  const nestedParentSection = childSections.find((item) => item.children?.some((child) => child.href === path))
  const activeSection = currentSection ?? currentChildSection ?? nestedParentSection ?? parentSection
  const siblingLinks = (
    currentSection?.children?.length
      ? currentSection.children
      : currentChildSection?.children?.length
        ? currentChildSection.children
        : nestedParentSection?.children?.length
          ? nestedParentSection.children
          : parentSection?.children ?? []
  )
    .filter((item) => item.href !== path)
  const featuredLinks = siblingLinks.slice(0, 8)
  const related = Array.from(
    new Map(
      [
        ...siblingLinks,
        ...navigation.filter((item) => item.href !== '/' && item.href !== activeSection?.href)
      ].map((item) => [item.href, item])
    ).values()
  )
    .filter((item) => item.href !== path)
    .slice(0, 6)
  const highlight = pageHighlights[path]
  const featurePanel = pageFeaturePanels[path]
  const stats =
    highlight?.stats ??
    [
      { value: String(featuredLinks.length || content.sections.length), label: 'Area terkait' },
      { value: String(content.sections.length), label: 'Section konten' },
      { value: '3', label: 'Breakpoint UI' }
    ]
  const moveDiscoverySectionsBelow =
    path === '/widyaiswara' ||
    path === '/kelembagaan-internal/setlem' ||
    path === '/kelembagaan-internal/jianbang' ||
    path === '/kelembagaan-internal/bidang'
  const promoteSpotlight = path === '/widyaiswara/pembimbingan-naskap'
  const isContactPage = path === '/kontak' || path === '/berita/contact' || path === '/profil/kontak/contact'
  const isEditorialBoardPage = path === '/berita/susunan-redaksi' || path === '/profil/kontak/susunan-redaksi'
  const moveSupportSectionsBelow = isContactPage || isEditorialBoardPage
  const movePrioritySectionBelow = moveDiscoverySectionsBelow || moveSupportSectionsBelow
  const isPlagiarismCheckPage = path === '/sarana-prasarana/cek-plagiarisme'
  const isOffcampusPage = path === '/sarana-prasarana/offcampus'
  const isClinicPage = path === '/sarana-prasarana/klinik-pratama'
  const isElibraryPage = path === '/sarana-prasarana/elibrary'
  const showNewsMonitoringPanel = [
    '/berita/kegiatan',
    '/berita/kegiatan/feed-up-to-date',
    '/berita/kegiatan/portal-berita',
    '/berita/kegiatan/media-sosial-hashtag'
  ].includes(path)
  const moveResourcesAbove = path === '/widyaiswara/materi-terbuka'
  const officialAddress = 'Jl. Maribaya No.53, Kayuambon, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391, Indonesia'
  const officialMapHref = 'https://maps.app.goo.gl/k7YqKzsiNCdpKcqY7'
  const officialMapPreviewSrc = `https://www.google.com/maps?q=${encodeURIComponent(officialAddress)}&output=embed`
  const turnitinHref = 'https://www.turnitin.com/'
  const googleMeetHref = 'https://meet.google.com/'
  const clinicWebsiteHref = 'https://klinik-sespimpolri.com/'
  const clinicQueueHref = 'https://app.klinik-sespimpolri.com/'
  const clinicServices = ['Pendaftaran pasien', 'Pelayanan rawat jalan', 'Pelayanan rawat inap', 'UGD 24 jam']
  const plagiarismReferenceLinks = [
    {
      label: 'eLibrary Sespim',
      href: '/sarana-prasarana/elibrary',
      description: 'Rujukan koleksi digital dan sumber belajar internal Sespim.'
    },
    {
      label: 'Perpusnas',
      href: 'https://satudata.perpusnas.go.id/',
      description: 'Akses literatur nasional untuk penelusuran referensi akademik.'
    },
    {
      label: 'Ejurnal',
      href: '/sarana-prasarana/ejurnal',
      description: 'Ruang rujukan jurnal dan artikel ilmiah pendukung penulisan.'
    },
    {
      label: 'Offcampus',
      href: '/sarana-prasarana/offcampus',
      description: 'Akses referensi digital dari luar lingkungan kampus.'
    }
  ]
  const officialSocialLinks = socialLinks.filter((link) => !['https://x.com/', 'https://www.threads.net/'].includes(link.href))
  const spotlightSection = highlight?.spotlight.length ? (
    <section className="bg-polri-cream py-14">
      <Container>
        <SectionTitle
          eyebrow="Sorotan"
          title="Konten prioritas halaman"
          description="Area ini memberi gambaran cepat tentang informasi yang paling perlu ditemukan pengguna pada halaman ini."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {highlight.spotlight.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} href={item.href} meta={highlight.label} />
          ))}
        </div>
      </Container>
    </section>
  ) : null
  const discoverySections = (
    <>
      {featurePanel ? <PageFeaturePanel panel={featurePanel} /> : null}

      {featuredLinks.length ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Navigasi Area"
              title={currentSection || currentChildSection ? 'Akses cepat ke subhalaman utama' : 'Halaman lain dalam kategori ini'}
              description="Daftar ini disusun dari struktur navigasi resmi sehingga pengguna bisa menelusuri area terkait tanpa kehilangan konteks."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-polri-maroon">{content.eyebrow}</p>
                  <h3 className="mt-3 text-lg font-black text-polri-brownDark">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.description ?? 'Akses langsung ke halaman informasi yang sesuai dengan kategori ini.'}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {!promoteSpotlight ? spotlightSection : null}
    </>
  )
  const prioritySection = highlight?.priorities.length ? (
    <section className="bg-polri-cream py-12">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {highlight.priorities.map((priority, index) => (
            <div key={priority} className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
              <p className="text-sm font-black text-polri-maroon">Prioritas {index + 1}</p>
              <p className="mt-3 text-sm leading-7 text-neutral-700">{priority}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  ) : null
  const resourcesSection = content.resources?.length ? (
    <section className="bg-white py-14">
      <Container>
        <SectionTitle
          eyebrow="Materi Unduhan"
          title="Daftar materi tersedia"
          description="Materi ditata sebagai kartu file agar pengguna dapat melihat judul, deskripsi, format, dan nama file sebelum membuka dokumen."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  {resource.format}
                </span>
                {resource.category ? (
                  <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                    {resource.category}
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 text-lg font-black text-polri-brownDark group-hover:text-polri-maroon sm:text-xl">
                {resource.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">{resource.description}</p>
              <p className="mt-4 rounded-lg bg-polri-cream px-4 py-3 text-xs font-bold text-polri-brownDark">
                {resource.fileName}
              </p>
              <span className="mt-4 inline-flex rounded-lg bg-polri-gold px-4 py-3 text-sm font-black text-polri-brownDark group-hover:bg-polri-goldSoft">
                Buka File
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  ) : null

  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={content.title} />
        </Container>
      </section>

      {moveResourcesAbove ? resourcesSection : null}

      <section className="bg-polri-brownDark py-10 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-center">
            <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">
                {highlight?.label ?? content.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                {highlight ? `Fokus Halaman ${content.title}` : 'Struktur Informasi Halaman'}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                {highlight?.summary ?? 'Halaman ini mengikuti struktur navigasi dan data konten awal yang sudah ditetapkan dalam SOT front-end.'}
              </p>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-polri-gold/30 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="border-b border-polri-gold/20 bg-white/8 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="text-3xl font-black text-polri-goldSoft">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/76">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {showNewsMonitoringPanel ? <NewsMonitoringPanel /> : null}

      {isElibraryPage ? (
        <section className="bg-white py-14">
          <Container>
            <div className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
              <div className="relative isolate min-h-[520px]">
                <Image
                  src="/images/elibrary-library-hero.png"
                  alt="Perpustakaan Sespim Polri"
                  fill
                  sizes="(min-width: 1280px) 1184px, calc(100vw - 32px)"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark via-polri-brownDark/86 to-polri-maroon/50" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
                <div className="relative z-10 grid min-h-[520px] gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
                  <div className="max-w-3xl">
                    <p className="text-sm font-black uppercase tracking-[0.26em] text-polri-goldSoft">Perpustakaan Sespim Polri</p>
                    <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                      Pusat referensi dan karya akademik peserta didik Sespim
                    </h2>
                    <p className="mt-5 text-base leading-8 text-white/82 sm:text-lg">
                      Perpustakaan Sespim Polri menyediakan buku referensi, naskah karya serdik terdahulu, dan dokumen akademik seperti NKP, Policy Brief, NASKAP, TASKAP, serta NASTRAP. Koleksi disiapkan dalam bentuk hardcopy maupun akses online untuk mendukung riset, pembelajaran, dan penyusunan karya peserta didik.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Buku Referensi', 'NKP', 'Policy Brief', 'NASKAP', 'TASKAP', 'NASTRAP'].map((item) => (
                        <span key={item} className="rounded-lg border border-polri-gold/40 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-polri-goldSoft">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        title: 'Koleksi Hardcopy',
                        body: 'Buku referensi dan naskah akademik tersedia sebagai koleksi fisik untuk dibaca, ditelusuri, dan dijadikan rujukan di lingkungan perpustakaan.'
                      },
                      {
                        title: 'Akses Online',
                        body: 'Katalog dan koleksi digital dapat dikembangkan melalui eLibrary/SLIMS agar peserta didik dan tenaga pendidik dapat menelusuri referensi secara lebih cepat.'
                      },
                      {
                        title: 'Karya Serdik Terdahulu',
                        body: 'Naskah karya peserta didik terdahulu menjadi sumber pembelajaran, pembanding, dan inspirasi akademik untuk penyusunan karya berikutnya.'
                      }
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-polri-gold/30 bg-white/12 p-5 backdrop-blur">
                        <h3 className="text-lg font-black text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/76">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isPlagiarismCheckPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Pengecekan Dokumen"
              title="Hasil plagiarisme ditampilkan paling atas"
              description="Area ini disiapkan untuk alur pemeriksaan dokumen akademik melalui Turnitin, unggah dokumen, rujukan referensi, dan ringkasan hasil similarity."
            />

            <div className="mt-8 overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Hasil Plagiarisme</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">--%</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Similarity Index</p>
                    </div>
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">0</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Dokumen Dicek</p>
                    </div>
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">Ready</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Status Layanan</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-polri-gold/25 bg-white p-5 text-polri-brownDark">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Dokumen</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Belum ada file</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Similarity</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Menunggu hasil</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Sumber Dominan</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Belum tersedia</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Status</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Siap upload</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Hasil resmi dapat ditampilkan setelah dokumen diproses melalui akun atau integrasi layanan Turnitin yang ditetapkan pengelola.
                  </p>
                </div>

                <div className="border-t border-polri-gold/25 bg-polri-cream p-6 text-polri-brownDark lg:border-l lg:border-t-0 sm:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Aksi Dokumen</p>
                  <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-polri-gold/60 bg-white px-5 py-8 text-center transition hover:border-polri-maroon hover:bg-polri-cream">
                    <span className="text-base font-black text-polri-brownDark">Upload Dokumen</span>
                    <span className="mt-2 text-sm leading-6 text-neutral-700">PDF, DOC, atau DOCX untuk pemeriksaan awal.</span>
                    <input type="file" className="sr-only" accept=".pdf,.doc,.docx" aria-label="Upload dokumen untuk cek plagiarisme" />
                  </label>
                  <a
                    href={turnitinHref}
                    {...externalLinkProps(turnitinHref)}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-polri-maroon px-5 py-4 text-center text-sm font-black text-white transition hover:bg-polri-brownDark"
                  >
                    Buka Turnitin
                  </a>
                  <p className="mt-4 text-xs font-semibold leading-6 text-neutral-600">
                    Tombol upload saat ini menyiapkan alur front-end. Integrasi otomatis dengan Turnitin membutuhkan akun, API, atau prosedur resmi pengelola.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Link Referensi</p>
                  <h2 className="mt-3 text-2xl font-black text-polri-brownDark">Rujukan pendukung pengecekan dokumen</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {plagiarismReferenceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                  >
                    <p className="text-lg font-black text-polri-brownDark">{link.label}</p>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isOffcampusPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Blended Learning"
              title="Preview kelas Offcampus berbasis Google Meet"
              description="Ruang ini disiapkan sebagai media pembelajaran campuran antara kegiatan tatap muka, pembelajaran daring, diskusi terjadwal, dan akses materi dari luar kampus."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
              <article className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-polri-gold/25 bg-polri-maroon px-6 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Live Class Preview</p>
                  <span className="rounded-lg bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/80">Google Meet Ready</span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="rounded-lg border border-polri-gold/30 bg-white/8 p-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {['Instruktur', 'Peserta Didik', 'Moderator'].map((role) => (
                        <div key={role} className="flex min-h-32 flex-col justify-between rounded-lg bg-polri-brownDark/70 p-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-polri-gold text-lg font-black text-polri-brownDark">
                            {role.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white">{role}</p>
                            <p className="mt-1 text-xs font-semibold text-white/60">Video siap</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-lg bg-black/20 p-4">
                      <p className="text-sm font-bold text-polri-goldSoft">Sesi Berjalan</p>
                      <h2 className="mt-2 text-2xl font-black">Kelas Blended Learning Offcampus</h2>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        Preview ini menggambarkan ruang kelas daring untuk briefing, diskusi kelompok, paparan materi, dan koordinasi pembelajaran jarak jauh.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href={googleMeetHref}
                      {...externalLinkProps(googleMeetHref)}
                      className="inline-flex items-center justify-center rounded-lg bg-polri-gold px-5 py-4 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
                    >
                      Masuk Google Meet
                    </a>
                    <Link
                      href="/sarana-prasarana/lms-siapsespim"
                      className="inline-flex items-center justify-center rounded-lg border border-polri-gold/60 px-5 py-4 text-center text-sm font-black text-polri-goldSoft transition hover:bg-white/10"
                    >
                      Buka LMS SIAPSESPIM
                    </Link>
                  </div>
                </div>
              </article>

              <div className="grid gap-5">
                <article className="rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Jadwal Sesi</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ['08.00 - 08.30', 'Apel virtual dan briefing instruktur'],
                      ['08.30 - 10.00', 'Paparan materi dan diskusi kelas'],
                      ['10.15 - 11.30', 'Breakout group / penugasan mandiri'],
                      ['13.00 - 14.00', 'Review hasil belajar dan umpan balik']
                    ].map(([time, activity]) => (
                      <div key={time} className="rounded-lg bg-white p-4">
                        <p className="text-sm font-black text-polri-brownDark">{time}</p>
                        <p className="mt-1 text-sm leading-6 text-neutral-700">{activity}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-lg border border-polri-gold/30 bg-white p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Mode Pembelajaran</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      'Tatap muka terbatas untuk penguatan arahan dan evaluasi.',
                      'Google Meet untuk sinkron daring dan diskusi real-time.',
                      'LMS SIAPSESPIM untuk materi, tugas, dan arsip pembelajaran.',
                      'Referensi digital melalui eLibrary, Perpusnas, Ejurnal, dan Offcampus.'
                    ].map((item) => (
                      <div key={item} className="rounded-lg bg-polri-cream px-4 py-3 text-sm font-semibold leading-6 text-polri-brownDark">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isClinicPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Klinik Pratama"
              title="Layanan kesehatan Sespim Polri"
              description="Informasi ini dirangkum dari website resmi Klinik Pratama Sespim Polri sebagai pintu akses layanan kesehatan, kontak, lokasi, dan antrian pasien."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <article className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
                <div className="bg-polri-maroon px-6 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Sahabat Menuju Sehat</p>
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="text-3xl font-black leading-tight">Klinik Pratama Sespim Polri</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74">
                    Klinik Pratama Sespim Polri menyediakan layanan kesehatan bagi lingkungan Sespim Polri, termasuk pendaftaran pasien, rawat jalan, rawat inap, dan dukungan UGD 24 jam.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {clinicServices.map((service) => (
                      <div key={service} className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                        <p className="text-lg font-black text-polri-goldSoft">{service}</p>
                        <p className="mt-2 text-sm leading-6 text-white/64">Tersedia sebagai layanan utama klinik.</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <a
                      href={clinicWebsiteHref}
                      {...externalLinkProps(clinicWebsiteHref)}
                      className="inline-flex items-center justify-center rounded-lg bg-polri-gold px-5 py-4 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
                    >
                      Buka Website Klinik
                    </a>
                    <a
                      href={clinicQueueHref}
                      {...externalLinkProps(clinicQueueHref)}
                      className="inline-flex items-center justify-center rounded-lg border border-polri-gold/60 px-5 py-4 text-center text-sm font-black text-polri-goldSoft transition hover:bg-white/10"
                    >
                      Buka Antrian Pasien
                    </a>
                  </div>
                </div>
              </article>

              <aside className="grid gap-5">
                <article className="rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Jam Layanan</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm font-black text-polri-brownDark">Pelayanan Pagi</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-700">08.00 - 11.00 WIB</p>
                    </div>
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm font-black text-polri-brownDark">Pelayanan Sore</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-700">16.00 - 19.00 WIB</p>
                    </div>
                    <div className="rounded-lg bg-polri-brownDark p-4 text-white">
                      <p className="text-sm font-black text-polri-goldSoft">UGD</p>
                      <p className="mt-1 text-sm font-semibold text-white/76">24 jam</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-lg border border-polri-gold/30 bg-white p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Kontak dan Lokasi</p>
                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700">
                    <li><span className="font-black text-polri-brownDark">Telepon:</span> (022) 2785594</li>
                    <li><span className="font-black text-polri-brownDark">WhatsApp:</span> 0823-2134-9036</li>
                    <li><span className="font-black text-polri-brownDark">Alamat:</span> Jalan Maribaya No.53, Kayuambon, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391</li>
                  </ul>
                </article>
              </aside>
            </div>

            <div className="mt-8">
              <ClinicQueueMockup />
            </div>
          </Container>
        </section>
      ) : null}

      {!movePrioritySectionBelow ? prioritySection : null}

      {promoteSpotlight ? spotlightSection : null}

      {!moveSupportSectionsBelow && !moveDiscoverySectionsBelow ? discoverySections : null}

      {isContactPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Contact Center"
              title="Peta lokasi dan formulir kontak utama"
              description="Dua akses utama ini dibuat menonjol agar pengunjung cepat menemukan lokasi Sespim Polri dan mengirim pesan kepada pengelola portal."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
              <article className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
                <div className="bg-polri-maroon px-6 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Peta Lokasi</p>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="overflow-hidden rounded-lg border border-polri-gold/35 bg-white shadow-soft">
                    <iframe
                      title="Preview lokasi Sespim Lemdiklat Polri"
                      src={officialMapPreviewSrc}
                      className="h-72 w-full border-0 sm:h-96"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="mt-5 grid gap-4 rounded-lg border border-polri-gold/25 bg-white/8 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-polri-goldSoft">Alamat Sespim Polri</p>
                      <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">Sespim Lemdiklat Polri</h2>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/76">
                        {officialAddress}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/64">
                        Preview peta tampil langsung di halaman. Tombol berikut tetap membuka tautan Google Maps resmi yang Bapak berikan.
                      </p>
                    </div>
                    <a
                      href={officialMapHref}
                      {...externalLinkProps(officialMapHref)}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-polri-gold px-5 py-4 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft sm:w-auto"
                    >
                      Buka Lokasi di Google Maps
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-lg border border-polri-gold/35 bg-polri-cream p-5 shadow-gold sm:p-6">
                <div className="rounded-lg bg-white p-5 shadow-soft sm:p-6">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Formulir Kontak</p>
                  <h2 className="mt-3 text-2xl font-black text-polri-brownDark">Kirim pesan kepada pengelola portal</h2>
                  <form className="mt-6 grid gap-3">
                    <input className="rounded-lg border border-polri-gold/35 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon" placeholder="Nama lengkap" aria-label="Nama lengkap" />
                    <input className="rounded-lg border border-polri-gold/35 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon" placeholder="Email" aria-label="Email" />
                    <input className="rounded-lg border border-polri-gold/35 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon" placeholder="Subjek pesan" aria-label="Subjek pesan" />
                    <textarea className="min-h-36 rounded-lg border border-polri-gold/35 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon" placeholder="Pesan" aria-label="Pesan" />
                    <button type="button" className="rounded-lg bg-polri-maroon px-5 py-4 text-sm font-black text-white transition hover:bg-polri-brownDark">
                      Kirim Pesan
                    </button>
                  </form>
                  <p className="mt-4 text-xs font-semibold leading-6 text-neutral-600">
                    Form ini siap dihubungkan ke API, email gateway, atau dashboard admin pada fase integrasi backend.
                  </p>
                </div>

                <div className="mt-5 rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft sm:p-6">
                  <h3 className="font-black text-polri-brownDark">Contact Resmi</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
                    <li><span className="font-bold text-polri-brownDark">Alamat resmi:</span> {officialAddress}</li>
                    <li><span className="font-bold text-polri-brownDark">Nomor kontak resmi:</span> Field siap isi nomor telepon atau hotline resmi.</li>
                    <li><span className="font-bold text-polri-brownDark">Email resmi:</span> Field siap isi email layanan publik resmi.</li>
                  </ul>

                  <div className="mt-5 rounded-lg border border-polri-gold/25 bg-polri-cream p-4">
                    <p className="text-sm font-black text-polri-brownDark">Kanal media sosial resmi</p>
                    <div className="mt-3 grid gap-2">
                      {officialSocialLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          {...externalLinkProps(link.href)}
                          className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark transition hover:text-polri-maroon"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href={officialMapHref}
                    {...externalLinkProps(officialMapHref)}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-polri-gold px-4 py-3 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
                  >
                    Buka Peta Lokasi
                  </a>
                </div>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      {content.media ? (
        <section className="bg-white py-14">
          <Container>
            <div className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
              <div className="relative aspect-[942/562] w-full bg-polri-cream">
                <Image
                  src={content.media.src}
                  alt={content.media.alt}
                  fill
                  sizes="(min-width: 1280px) 1184px, calc(100vw - 32px)"
                  className="object-contain"
                />
              </div>
              {content.media.caption ? (
                <p className="border-t border-polri-gold/20 bg-polri-cream px-5 py-3 text-sm font-semibold text-polri-brownDark">
                  {content.media.caption}
                </p>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {!moveResourcesAbove ? resourcesSection : null}

      {content.officials?.length ? (
        <section className="bg-polri-cream py-14">
          <Container>
            <SectionTitle
              eyebrow="Pejabat Utama"
              title="Daftar Pejabat Utama Sespim"
              description="Daftar ini disiapkan dalam format pas foto 3x4 dengan keterangan nama, pangkat, dan jabatan."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {content.officials.map((official) => {
                const displayName = official.name ?? 'Nama belum tersedia'
                const displayRank = official.rank ?? 'Pangkat belum tersedia'
                const photoAlt = official.photoAlt ?? `Pas foto ${displayName}`

                return (
                  <article key={`${official.position}-${displayName}`} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
                    <div className="bg-polri-brownDark p-4">
                      <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-lg border border-polri-gold/30 bg-polri-cream">
                        {official.photoSrc ? (
                          <Image
                            src={official.photoSrc}
                            alt={photoAlt}
                            fill
                            sizes="180px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-polri-brownDark">
                            <span className="text-3xl font-black text-polri-maroon">3x4</span>
                            <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-polri-brownDark/70">Pas Foto</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-3 p-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Nama</p>
                        <p className="mt-1 text-base font-black leading-6 text-polri-brownDark">{displayName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Pangkat</p>
                        <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{displayRank}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Jabatan</p>
                        <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{official.position}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-6">
              {content.sections.map((section) => {
                const isEducatorRankSection = path === '/widyaiswara' && section.title === 'Jenjang Jabatan'
                const usesStructuredCards = isEditorialBoardPage || isEducatorRankSection

                return (
                  <article key={section.title} className="min-w-0 rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft">
                    <h2 className="text-xl font-black text-polri-brownDark sm:text-2xl">{section.title}</h2>
                    <p className="mt-4 text-base leading-8 text-neutral-700">{section.body}</p>
                    {section.items?.length ? (
                      <ul className={usesStructuredCards ? 'mt-5 grid gap-4' : 'mt-5 grid gap-3 sm:grid-cols-2'}>
                        {section.items.map((item, index) => (
                          <li
                            key={item}
                            className={cn(
                              'rounded-lg bg-polri-cream px-4 py-3 text-sm font-semibold text-polri-brownDark',
                              usesStructuredCards && 'border border-polri-gold/30 bg-white p-0 shadow-soft'
                            )}
                          >
                            {usesStructuredCards ? (
                              <span className="flex items-stretch overflow-hidden rounded-lg">
                                <span className="flex w-14 shrink-0 items-center justify-center bg-polri-maroon text-base font-black text-white">
                                  {index + 1}
                                </span>
                                <span className="min-w-0 flex-1 px-5 py-4">
                                  <span className="block text-base font-black text-polri-brownDark">
                                    {item.includes(':') ? item.split(':')[0] : item}
                                  </span>
                                  {item.includes(':') ? (
                                    <span className="mt-2 block text-sm font-semibold leading-7 text-neutral-700">
                                      {item.split(':').slice(1).join(':').trim()}
                                    </span>
                                  ) : null}
                                </span>
                              </span>
                            ) : (
                              item
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                )
              })}
            </div>

            <aside className="space-y-5">
              <div className="rounded-lg bg-polri-brownDark p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Status Konten</p>
                <h3 className="mt-3 text-xl font-black">Ready for QA</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Struktur front-end halaman utama sudah diperkuat. Konten resmi dapat dimasukkan pada fase integrasi CMS/backend.
                </p>
              </div>
              {highlight?.sideNotes.map((note) => (
                <div key={note.title} className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                  <h3 className="font-black text-polri-brownDark">{note.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{note.body}</p>
                </div>
              ))}
              {content.externalLink ? (
                <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                  <h3 className="font-black text-polri-brownDark">Akses Layanan</h3>
                  {content.externalLink.description ? (
                    <p className="mt-3 text-sm leading-7 text-neutral-700">{content.externalLink.description}</p>
                  ) : null}
                  <a
                    href={content.externalLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-polri-gold px-4 py-3 text-center text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
                  >
                    {content.externalLink.label}
                  </a>
                </div>
              ) : null}
              <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                <h3 className="font-black text-polri-brownDark">Tautan Terkait</h3>
                <div className="mt-4 grid gap-2">
                  {related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...externalLinkProps(item.href)}
                      className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark hover:text-polri-maroon"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      {movePrioritySectionBelow ? prioritySection : null}
      {moveDiscoverySectionsBelow || moveSupportSectionsBelow ? discoverySections : null}
      <section className="bg-polri-cream py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-gold">Langkah Lanjutan</p>
              <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">
                {content.externalLink ? 'Buka layanan resmi' : highlight?.cta ? 'Lanjutkan penelusuran informasi' : 'Halaman siap untuk pengayaan konten'}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-700">
                {content.externalLink
                  ? 'Gunakan tautan resmi yang sudah disiapkan untuk mengakses layanan pendukung terkait.'
                  : 'UI halaman sudah disiapkan dengan komponen reusable, struktur responsive, dan tautan terkait yang mengikuti data navigasi.'}
              </p>
            </div>
            {content.externalLink ? (
              <a
                href={content.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-polri-maroon px-5 py-3 text-center font-black text-white hover:bg-polri-brownDark"
              >
                {content.externalLink.label}
              </a>
            ) : highlight?.cta ? (
              <Link
                href={highlight.cta.href}
                {...externalLinkProps(highlight.cta.href)}
                className="rounded-lg bg-polri-maroon px-5 py-3 text-center font-black text-white hover:bg-polri-brownDark"
              >
                {highlight.cta.label}
              </Link>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  )
}
