import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { InfoCard } from '@/components/ui/InfoCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { educationPrograms, kasespimGreeting, latestNews, quickLinks } from '@/data/homepage'
import { KasespimPhoto } from '@/components/home/KasespimPhoto'
import { serverFetch } from '@/lib/api'

export async function KasespimGreeting() {
  let dbGreeting = null
  try {
    const res = await serverFetch('/api/beranda-content/h-2')
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbGreeting = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic greeting from DB, using fallback:', err)
  }

  // Parse fields dynamically
  const title = dbGreeting?.title || kasespimGreeting.title
  const photoUrl = dbGreeting && dbGreeting.image_url !== null ? dbGreeting.image_url : '/images/kasespim.png'
  const bodyText = dbGreeting?.content || ''

  let openingLines: string[] = kasespimGreeting.openingLines
  let paragraphs: string[] = kasespimGreeting.paragraphs
  let signatureRole = kasespimGreeting.signatureRole
  let signatureName = kasespimGreeting.signatureName

  if (bodyText) {
    // Split content by double newlines into blocks
    const blocks = bodyText.split(/\r?\n\r?\n/)
    if (blocks.length > 0) {
      // First block: opening greetings
      openingLines = blocks[0].split(/\r?\n/)
    }
    if (blocks.length > 2) {
      // Middle blocks: body paragraphs
      paragraphs = blocks.slice(1, blocks.length - 1)
      // Last block: signature
      const sigLines = blocks[blocks.length - 1].split(/\r?\n/)
      if (sigLines.length >= 2) {
        signatureRole = sigLines[0]
        signatureName = sigLines[1]
      } else if (sigLines.length === 1) {
        signatureName = sigLines[0]
      }
    } else if (blocks.length === 2) {
      paragraphs = [blocks[1]]
    }
  }

  return (
    <section className="bg-white py-16">
      <Container>
        <div className={`rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft md:p-10 ${
          photoUrl ? "grid gap-8 md:grid-cols-[0.8fr_1.2fr]" : ""
        }`}>
          {photoUrl ? <KasespimPhoto src={photoUrl} /> : null}
          <article className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-maroon">{kasespimGreeting.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">{title}</h2>
            <div className="mt-5 space-y-1 text-base font-semibold leading-7 text-polri-brownDark">
              {openingLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 border-l-4 border-polri-gold pl-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-polri-maroon">{signatureRole}</p>
              <p className="mt-2 text-lg font-black text-polri-brownDark">{signatureName}</p>
            </div>
            <Link href="/profil/pejabat" className="mt-6 inline-flex w-fit rounded-xl bg-polri-maroon px-5 py-3 font-bold text-white transition hover:bg-polri-brownDark">
              Lihat Profil Pejabat
            </Link>
          </article>
        </div>
      </Container>
    </section>
  )
}

export async function EducationProgramCards() {
  let dbPrograms: { title: string; description: string; href: string }[] = []
  try {
    const res = await serverFetch('/api/program-pendidikan-content?category=program-sekolah&limit=20', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.records) {
        dbPrograms = json.data.records.map((r: any) => {
          try {
            const parsed = JSON.parse(r.content)
            return {
              title: parsed.title || r.title,
              description: parsed.summary || parsed.description || r.content || '',
              href: parsed.href || `/program-pendidikan/${parsed.slug || r.title.toLowerCase()}`,
            }
          } catch (e) {
            return {
              title: r.title,
              description: r.content || '',
              href: `/program-pendidikan/${r.title.toLowerCase().replace(/\s+/g, '-')}`,
            }
          }
        })
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic programs for homepage cards:', err)
  }

  const programs = dbPrograms.length > 0 ? dbPrograms : educationPrograms

  const orderMap: Record<string, number> = {
    'sespimti': 1,
    'sespimmen': 2,
    'sppk': 3,
    'sespimma': 4
  }

  const sortedPrograms = [...programs].sort((a, b) => {
    const slugA = a.href.split('/').pop() || ''
    const slugB = b.href.split('/').pop() || ''
    const rankA = orderMap[slugA] ?? 999
    const rankB = orderMap[slugB] ?? 999
    return rankA - rankB
  })

  return (
    <section className="bg-polri-cream py-16">
      <Container>
        <SectionTitle eyebrow="Program Pendidikan" title="Sekolah dan Program Kepemimpinan" description="Pintu utama informasi akademik yang dinamis dan terintegrasi dari database Sespim Lemdiklat Polri." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {sortedPrograms.map((program) => (
            <InfoCard key={program.title} title={program.title} description={program.description} href={program.href} meta="Program" />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function LatestNewsGrid() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Informasi Terbaru" title="Berita, Agenda, dan Publikasi" description="Area ini menjadi feed awal untuk berita kegiatan, agenda pendidikan, dan publikasi terbaru." />
          <Link href="/berita" className="rounded-xl border border-polri-gold px-5 py-3 text-center font-bold text-polri-brownDark hover:bg-polri-cream">
            Lihat Semua
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {latestNews.map((news) => (
            <InfoCard key={news.title} title={news.title} description="Konten contoh untuk baseline UI. Detail berita akan dikembangkan pada fase content listing dan detail pages." href={news.href} meta={`${news.category} • ${news.date}`} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function QuickLinks() {
  return (
    <section className="bg-polri-brownDark py-14 text-white">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Akses Cepat</p>
            <h2 className="mt-3 text-3xl font-black">Tautan prioritas untuk pengguna portal</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-polri-gold/40 bg-white/5 px-4 py-4 text-center text-sm font-bold text-polri-goldSoft hover:bg-white/10">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
