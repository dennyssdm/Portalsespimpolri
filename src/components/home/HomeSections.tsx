import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { InfoCard } from '@/components/ui/InfoCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { educationPrograms, kasespimGreeting, latestNews, quickLinks } from '@/data/homepage'
import { KasespimPhoto } from '@/components/home/KasespimPhoto'

export function KasespimGreeting() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid gap-8 rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft lg:grid-cols-[.8fr_1.2fr] lg:p-10">
          <KasespimPhoto />
          <article className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-maroon">{kasespimGreeting.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">{kasespimGreeting.title}</h2>
            <div className="mt-5 space-y-1 text-base font-semibold leading-7 text-polri-brownDark">
              {kasespimGreeting.openingLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">
              {kasespimGreeting.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 border-l-4 border-polri-gold pl-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-polri-maroon">{kasespimGreeting.signatureRole}</p>
              <p className="mt-2 text-lg font-black text-polri-brownDark">{kasespimGreeting.signatureName}</p>
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

export function EducationProgramCards() {
  return (
    <section className="bg-polri-cream py-16">
      <Container>
        <SectionTitle eyebrow="Program Pendidikan" title="Sekolah dan Program Kepemimpinan" description="Empat pintu utama informasi akademik yang perlu tampil jelas sejak halaman beranda." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {educationPrograms.map((program) => (
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
