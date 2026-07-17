import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { educatorProfiles, findEducatorProfile } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return educatorProfiles.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findEducatorProfile(slug)

  return {
    title: item ? `${item.name} | Widyaiswara Sespim` : 'Profil Widyaiswara Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = findEducatorProfile(slug)

  if (!item) {
    notFound()
  }

  // Fetch claimed certificates and database profile updates on the server
  let matchingClaim: any = null
  let dbWidyaiswaras: any[] = []
  try {
    const claimsRes = await serverFetch('/api/inpassing-claims')
    if (claimsRes.ok) {
      const json = await claimsRes.json()
      const claims = json.data.claims || []
      const norm = (s: string) => s.toLowerCase().replace(/(irjen pol|akbp|kompol|ipda|drs\.|s\.i\.k\.|m\.si\.|s\.h\.|s\.t\.|s\.st\.mk\.)/g, '').replace(/[^a-z]/g, '').trim()
      const targetNorm = norm(item.name)
      matchingClaim = claims.find((c: any) => norm(c.name) === targetNorm || norm(c.name).includes(targetNorm) || targetNorm.includes(norm(c.name)))
    }

    const listRes = await serverFetch('/api/users/public-list')
    if (listRes.ok) {
      const json = await listRes.json()
      dbWidyaiswaras = json.data.widyaiswaras || []
    }
  } catch (err) {
    console.warn('Failed to fetch claims/profile details for Widyaiswara page:', err)
  }

  const norm = (s: string) => s.toLowerCase().replace(/(irjen pol|akbp|kompol|ipda|drs\.|s\.i\.k\.|m\.si\.|s\.h\.|s\.t\.|s\.st\.mk\.|dr\.|s\.sos\.|m\.hum\.)/g, '').replace(/[^a-z]/g, '').trim()
  const targetNorm = norm(item.name)
  const dbUser = dbWidyaiswaras.find((u: any) => norm(u.name) === targetNorm)
  const activePhotoUrl = dbUser?.foto || item.photoUrl
  const activeRank = dbUser?.pangkat || item.rank

  const activeExpertise = matchingClaim 
    ? [...(item.expertise || []), 'Inpassing Widyaiswara'] 
    : item.expertise
  const activeCertifications = matchingClaim 
    ? [...(item.professionalCertifications || []), 'Sertifikat Inpassing Widyaiswara'] 
    : item.professionalCertifications

  const joinValues = (values?: string[]) => (values?.length ? values.join(', ') : 'Belum tersedia')
  const indexedPublications = item.indexedPublications ?? item.publications

  const body = [
    ...item.bio,
    `Pangkat: ${activeRank || item.rank}.`,
    `Jabatan: ${item.position}.`,
    `Pendidikan umum: ${joinValues(item.generalEducation)}.`,
    `Pendidikan kedinasan: ${joinValues(item.serviceEducation)}.`,
    `Pendidikan pengembangan: ${joinValues(item.developmentEducation)}.`,
    `Kompetensi yang dimiliki: ${joinValues(activeExpertise)}.`,
    `Sertifikasi Profesi Widyaiswara: ${joinValues(activeCertifications)}.`,
    `Mata pelajaran yang diampu: ${joinValues(item.subjects)}.`,
    `Publikasi terkait: ${joinValues(item.publications)}.`,
    `Publikasi Jurnal Sinta/Scopus: ${joinValues(indexedPublications)}.`
  ]

  if (matchingClaim) {
    body.push(`Kode Sertifikat Kelulusan Inpassing: ${matchingClaim.certificate_code}.`)
  }

  const related = educatorProfiles
    .filter((educator) => educator.slug !== item.slug)
    .slice(0, 2)
    .map((educator) => ({
      title: educator.name,
      href: educator.href,
      summary: educator.summary
    }))

  const meta = [
    { label: 'Pangkat', value: activeRank || item.rank },
    { label: 'Jabatan', value: item.position },
    { label: 'Kompetensi Utama', value: activeExpertise[0] ?? 'Belum tersedia' },
    { label: 'Sertifikasi Profesi', value: activeCertifications?.length ? `${activeCertifications.length} sertifikasi` : 'Belum tersedia' },
    { label: 'Publikasi Sinta/Scopus', value: indexedPublications.length ? `${indexedPublications.length} karya` : 'Belum tersedia' }
  ]

  if (matchingClaim) {
    meta.push({ label: 'Kode Sertifikat', value: matchingClaim.certificate_code })
  }

  const displayName = matchingClaim 
    ? `${item.name} (${matchingClaim.certificate_code})`
    : item.name

  return (
    <ContentDetailPage
      path={item.href}
      eyebrow={activeRank || item.rank}
      title={displayName}
      description={item.summary}
      body={body}
      meta={meta}
      tags={activeExpertise}
      backHref="/widyaiswara/profil"
      backLabel="Kembali ke Daftar Widyaiswara"
      related={related}
      action={{ label: 'Lihat Publikasi Widyaiswara', href: '/widyaiswara/publikasi' }}
      photoUrl={activePhotoUrl || 'placeholder'}
    />
  )
}
