import Link from 'next/link'
import { AcademicCapIcon, ArrowRightIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { EducatorProfile } from '@/data/contentCollections'

type EducatorDirectoryPageProps = {
  items: EducatorProfile[]
}

function compactList(items: string[] | undefined, emptyText = 'Belum tersedia') {
  if (!items?.length) {
    return emptyText
  }

  if (items.length <= 2) {
    return items.join(', ')
  }

  return `${items.slice(0, 2).join(', ')} +${items.length - 2}`
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-t border-polri-gold/15 pt-2.5 text-sm leading-6">
      <dt className="font-black uppercase tracking-[0.12em] text-polri-maroon">{label}</dt>
      <dd className="min-w-0 font-semibold text-neutral-700">{value}</dd>
    </div>
  )
}

export function EducatorDirectoryPage({ items }: EducatorDirectoryPageProps) {
  return (
    <main>
      <PageHero
        eyebrow="Widyaiswara"
        title="Direktori Profil Widyaiswara"
        description="Direktori profil tenaga pendidik berbasis data kedinasan yang memuat nama, pangkat, jabatan, pendidikan, kompetensi, sertifikasi profesi Widyaiswara, dan mata pelajaran yang diampu."
      />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path="/widyaiswara/profil" currentLabel="Direktori Profil Widyaiswara" />
        </Container>
      </section>

      <section className="bg-polri-brownDark py-10 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Direktori Akademik</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Profil Widyaiswara dalam format data kedinasan</h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                Setiap kartu disiapkan untuk menampung data resmi Widyaiswara dan dapat diperbarui bertahap saat riwayat pendidikan dan jabatan final tersedia.
              </p>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-polri-gold/30 sm:grid-cols-3">
              <div className="border-b border-polri-gold/20 bg-white/8 p-5 sm:border-b-0 sm:border-r">
                <p className="text-3xl font-black text-polri-goldSoft">{items.length}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">Profil terdata</p>
              </div>
              <div className="border-b border-polri-gold/20 bg-white/8 p-5 sm:border-b-0 sm:border-r">
                <p className="text-3xl font-black text-polri-goldSoft">3</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">Data identitas</p>
              </div>
              <div className="bg-white/8 p-5">
                <p className="text-3xl font-black text-polri-goldSoft">6</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/76">Field profil</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <SectionTitle
            eyebrow="Direktori Profil"
            title="Daftar Widyaiswara"
            description="Kartu profil menampilkan data kedinasan, kompetensi yang dimiliki, sertifikasi profesi Widyaiswara, dan mata pelajaran yang diampu."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const generalEducation = compactList(item.generalEducation, 'Belum tersedia')
              const serviceEducation = compactList(item.serviceEducation, 'Belum tersedia')
              const developmentEducation = compactList(item.developmentEducation, 'Belum tersedia')
              const expertise = compactList(item.expertise, 'Belum tersedia')
              const certifications = compactList(item.professionalCertifications, 'Belum tersedia')
              const subjects = compactList(item.subjects, 'Belum tersedia')

              return (
                <article
                  key={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-polri-gold/60 hover:shadow-lg"
                >
                  <div className="h-1 bg-polri-gold" aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-polri-cream text-polri-maroon">
                        <AcademicCapIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">{item.rank || 'Pangkat belum tersedia'}</p>
                        <h2 className="mt-1 text-lg font-black leading-6 text-polri-brownDark">{item.name}</h2>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 text-sm font-semibold leading-6 text-neutral-700">
                      <BriefcaseIcon className="mt-0.5 h-5 w-5 shrink-0 text-polri-gold" aria-hidden="true" />
                      <p>{item.position || 'Jabatan belum tersedia'}</p>
                    </div>

                    <dl className="mt-4 grid gap-2">
                      <ProfileLine label="Dikum" value={generalEducation} />
                      <ProfileLine label="Dikpol" value={serviceEducation} />
                      <ProfileLine label="Dikbang" value={developmentEducation} />
                      <ProfileLine label="Kompetensi" value={expertise} />
                      <ProfileLine label="Sertifikasi" value={certifications} />
                      <ProfileLine label="Mapel" value={subjects} />
                    </dl>

                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center justify-between gap-3 rounded-lg bg-polri-brownDark px-4 py-3 text-sm font-black text-white transition hover:bg-polri-maroon"
                    >
                      <span>Detail profil</span>
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </Link>
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
