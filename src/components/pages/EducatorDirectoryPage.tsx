'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { AcademicCapIcon, ArrowRightIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { EducatorProfile } from '@/data/contentCollections'
import { API_BASE_URL } from '@/lib/api'

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

const EDUCATOR_NRP_MAP: Record<string, string> = {
  'chuzainipatoppoi': '68120455',
  'jawari': '69060168',
  'abiososenoaji': '70100287',
  'mohamadagungbudijono': '70020178',
  'musaikipsonmanaekmuaratampubolon': '69080351',
  'barizasulfi': '69080579',
  'agusdjakasantoso': '68080358',
  'nurworodanang': '69070429',
  'muktijuharsa': '71110421',
  'ryosephwihastonoyogapranoto': '69030316',
  'ytonysuryaputra': '73010679',
  'msabilulalif': '75060699',
  'rakhmadsetyadi': '72100371',
  'toniariadiefendi': '71010437',
  'romahutajulu': '72070511',
  'faizalramadhani': '74100557',
  'jokosetiono': '75060701',
  'muhammadtaslimchairuddin': '70110332',
  'bahtiarujangpurnama': '72050480'
}

function findMatchingClaim(educatorName: string, claims: { name: string; certificate_code: string }[]) {
  const norm = (s: string) => {
    if (!s) return ''
    return s.toLowerCase()
      .replace(/(irjen pol|irjen\s+pol|brigjen pol|brigjen\s+pol|kombes pol|kombes\s+pol|akbp|kompol|ipda|drs\.|dr\.|prof\.)/g, '')
      .replace(/(s\.h\.|s\.i\.k\.|m\.si\.|m\.h\.|m\.m\.|s\.st\.mk\.|s\.sos\.|m\.hum\.|m\.p\.a\.|ph\.d\.)/g, '')
      .replace(/[^a-z]/g, '')
      .trim()
  }
  const targetNorm = norm(educatorName)
  return claims.find(c => norm(c.name) === targetNorm || norm(c.name).includes(targetNorm) || targetNorm.includes(norm(c.name)))
}

export function EducatorDirectoryPage({ items }: EducatorDirectoryPageProps) {
  const [claims, setClaims] = useState<{ name: string; certificate_code: string }[]>([])
  const [dbWidyaiswaras, setDbWidyaiswaras] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/inpassing-claims`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setClaims(data.data.claims || [])
        }
      })
      .catch(err => console.warn('Failed to fetch claims for profiles:', err))

    fetch(`${API_BASE_URL}/api/users/public-list`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setDbWidyaiswaras(data.data.widyaiswaras || [])
        }
      })
      .catch(err => console.warn('Failed to fetch public widyaiswaras list:', err))
  }, [])

  // Group Widyaiswaras dynamically by position (kelompok)
  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof items> = {}
    items.forEach((item) => {
      const pos = item.position 
        ? item.position.replace(/\s+SESPIM(TI|MEN|MA)?$/gi, '').trim() 
        : 'Lainnya'
      if (!groups[pos]) {
        groups[pos] = []
      }
      groups[pos].push(item)
    })
    return groups
  }, [items])

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


      <section className="bg-white py-14">
        <Container>
          <SectionTitle
            eyebrow="Direktori Profil"
            title="Daftar Widyaiswara"
            description="Kartu profil menampilkan data kedinasan, kompetensi yang dimiliki, sertifikasi profesi Widyaiswara, dan mata pelajaran yang diampu."
          />

          <div className="mt-8 space-y-12">
            {Object.entries(groupedItems).map(([groupName, groupItems]) => (
              <div key={groupName} className="space-y-6">
                {/* Kelompok Header */}
                <div className="flex items-center gap-3 pl-1 py-1.5 bg-polri-cream/15 rounded-xl border border-polri-gold/10">
                  <div className="h-12 w-6 bg-polri-gold rounded-lg shadow-md shrink-0 border border-white" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-polri-brownDark tracking-wider leading-none">{groupName}</h3>
                    <p className="text-[11px] font-bold text-neutral-500 mt-1.5">{groupItems.length} Personel Terdata</p>
                  </div>
                </div>

                {/* Grid of Cards inside Group */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {groupItems.map((item) => {
                    const matchingClaim = findMatchingClaim(item.name, claims)

                    const normName = (s: string) => {
                      if (!s) return ''
                      return s.toLowerCase()
                        .replace(/(irjen pol|irjen\s+pol|brigjen pol|brigjen\s+pol|kombes pol|kombes\s+pol|akbp|kompol|ipda|drs\.|dr\.|prof\.)/g, '')
                        .replace(/(s\.h\.|s\.i\.|s\.i\.k\.|m\.si\.|m\.h\.|m\.m\.|s\.st\.mk\.|s\.sos\.|m\.hum\.|m\.p\.a\.|ph\.d\.)/g, '')
                        .replace(/[^a-z]/g, '')
                        .trim()
                    }
                    const targetNorm = normName(item.name)
                    const nrpNip = EDUCATOR_NRP_MAP[targetNorm] || ''

                    // Match database user override for dynamic photo, pangkat, etc.
                    const dbUser = dbWidyaiswaras.find(u => normName(u.name) === targetNorm)
                    const activePhotoUrl = dbUser?.foto || item.photoUrl
                    const activeRank = dbUser?.pangkat || item.rank

                    // Dynamic enrichment based on certificate claims
                    const activeExpertise = matchingClaim 
                      ? [...(item.expertise || []), 'Inpassing Widyaiswara'] 
                      : item.expertise

                    const generalEducation = compactList(item.generalEducation, 'Belum tersedia')
                    const serviceEducation = compactList(item.serviceEducation, 'Belum tersedia')
                    const developmentEducation = compactList(item.developmentEducation, 'Belum tersedia')
                    const expertise = compactList(activeExpertise, 'Belum tersedia')
                    const lspCertifications = compactList(item.professionalCertifications, 'Belum tersedia')
                    const inpassingStatus = matchingClaim 
                      ? 'Sertifikat Inpassing Widyaiswara' 
                      : 'Belum Inpassing'
                    const subjects = compactList(item.subjects, 'Belum tersedia')

                    return (
                      <article
                        key={item.href}
                        className="group flex h-full flex-col overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-polri-gold/60 hover:shadow-lg"
                      >
                        <div className="h-1 bg-polri-gold" aria-hidden="true" />
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-start gap-4">
                            {/* Photo Profile Box (Portrait Passphoto style) */}
                            <div className="relative w-16 h-20 shrink-0 border border-polri-gold/30 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center shadow-inner group-hover:border-polri-gold/60 transition">
                              {activePhotoUrl ? (
                                <img src={activePhotoUrl} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200">
                                  <svg className="w-8 h-8 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">{activeRank || 'Pangkat belum tersedia'}</p>
                              <h2 className="text-base font-black leading-tight text-polri-brownDark mt-0.5">{item.name}</h2>
                              {nrpNip && (
                                <p className="text-[11px] font-bold text-neutral-500 mt-0.5">NRP/NIP: {nrpNip}</p>
                              )}
                              {matchingClaim && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                    </svg>
                                    Inpassing: {matchingClaim.certificate_code}
                                  </span>
                                </div>
                              )}
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
                            <ProfileLine label="Sertifikasi LSP/BNSP" value={lspCertifications} />
                            <ProfileLine label="Sertifikasi Inpassing" value={inpassingStatus} />
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
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
