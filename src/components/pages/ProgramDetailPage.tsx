import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import type { ProgramDetail } from '@/data/programDetails'

type ProgramDetailPageProps = {
  program: ProgramDetail
}

export function ProgramDetailPage({ program }: ProgramDetailPageProps) {
  const focusTitle = program.focusTitle ?? 'Fokus Pembelajaran'
  const outcomesTitle = program.outcomesTitle ?? 'Capaian Program'
  const stagesTitle = program.stagesTitle ?? 'Tahapan Pendidikan'
  const statusTitle = program.statusTitle ?? 'Detail Baseline'
  const statusDescription = program.statusDescription ?? 'Detail program sudah memiliki struktur awal untuk kebutuhan konten akademik resmi.'

  return (
    <main>
      <PageHero eyebrow={program.eyebrow} title={program.title} description={program.summary} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={program.href} currentLabel={program.title} />
        </Container>
      </section>

      <section className="bg-polri-brownDark py-10 text-white">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Sasaran Peserta', value: program.audience },
              { label: 'Durasi', value: program.duration },
              { label: 'Level', value: program.level }
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-polri-gold/30 bg-white/8 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-polri-goldSoft">{item.label}</p>
                <p className="mt-2 text-lg font-black">{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-6">
              <article className="min-w-0 rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft sm:p-8">
                <h2 className="text-xl font-black text-polri-brownDark sm:text-2xl">Gambaran Program</h2>
                <div className="mt-5 space-y-5">
                  {program.overview.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-neutral-700"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </article>

              <div className="grid gap-5 md:grid-cols-2">
                <section className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                  <h2 className="text-xl font-black text-polri-brownDark">{focusTitle}</h2>
                  <ul className="mt-4 grid gap-3">
                    {program.focusAreas.map((item) => (
                      <li key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                  <h2 className="text-xl font-black text-polri-brownDark">{outcomesTitle}</h2>
                  <ul className="mt-4 grid gap-3">
                    {program.outcomes.map((item) => (
                      <li key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft sm:p-8">
                <h2 className="text-xl font-black text-polri-brownDark sm:text-2xl">{stagesTitle}</h2>
                <div className="mt-6 grid gap-4">
                  {program.stages.map((stage, index) => (
                    <div key={stage.title} className="grid gap-4 rounded-lg border border-polri-gold/20 bg-polri-cream p-5 sm:grid-cols-[56px_1fr]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-polri-maroon text-lg font-black text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-black text-polri-brownDark">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-neutral-700">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              {program.slug === 'sespimti' && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft text-center">
                  <div className="relative h-72 w-72">
                    <Image
                      src="/images/logo-sespimti.png"
                      alt="Logo Sespimti"
                      fill
                      sizes="288px"
                      priority
                      className="object-contain"
                    />
                  </div>
                  <h3 className="-mt-2 font-black text-polri-brownDark">Logo Sespimti</h3>
                  <p className="mt-1 text-xs text-neutral-500">Sekolah Staf dan Pimpinan Tinggi</p>
                </div>
              )}

              <div className="rounded-lg bg-polri-brownDark p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Status Program</p>
                <h2 className="mt-3 text-xl font-black">{statusTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {statusDescription}
                </p>
              </div>

              <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                <h2 className="font-black text-polri-brownDark">Dokumen Terkait</h2>
                <div className="mt-4 grid gap-3">
                  {program.documents.map((document) => (
                    <Link key={document.href} href={document.href} className="rounded-lg bg-white px-4 py-3 text-sm font-black text-polri-brownDark hover:text-polri-maroon">
                      {document.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/program-pendidikan" className="block rounded-lg border border-polri-gold/25 bg-white p-5 text-center font-black text-polri-brownDark hover:border-polri-gold hover:bg-polri-cream">
                Kembali ke Program Pendidikan
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
