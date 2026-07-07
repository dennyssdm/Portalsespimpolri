import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { educatorProfiles, findEducatorProfile } from '@/data/contentCollections'

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

  const joinValues = (values?: string[]) => (values?.length ? values.join(', ') : 'Belum tersedia')
  const indexedPublications = item.indexedPublications ?? item.publications

  const body = [
    ...item.bio,
    `Pangkat: ${item.rank}.`,
    `Jabatan: ${item.position}.`,
    `Pendidikan umum: ${joinValues(item.generalEducation)}.`,
    `Pendidikan kedinasan: ${joinValues(item.serviceEducation)}.`,
    `Pendidikan pengembangan: ${joinValues(item.developmentEducation)}.`,
    `Kompetensi yang dimiliki: ${joinValues(item.expertise)}.`,
    `Sertifikasi Profesi Widyaiswara: ${joinValues(item.professionalCertifications)}.`,
    `Mata pelajaran yang diampu: ${joinValues(item.subjects)}.`,
    `Publikasi terkait: ${joinValues(item.publications)}.`,
    `Publikasi Jurnal Sinta/Scopus: ${joinValues(indexedPublications)}.`
  ]
  const related = educatorProfiles
    .filter((educator) => educator.slug !== item.slug)
    .slice(0, 2)
    .map((educator) => ({
      title: educator.name,
      href: educator.href,
      summary: educator.summary
    }))

  return (
    <ContentDetailPage
      path={item.href}
      eyebrow={item.rank}
      title={item.name}
      description={item.summary}
      body={body}
      meta={[
        { label: 'Pangkat', value: item.rank },
        { label: 'Jabatan', value: item.position },
        { label: 'Kompetensi Utama', value: item.expertise[0] ?? 'Belum tersedia' },
        { label: 'Sertifikasi Profesi', value: item.professionalCertifications?.length ? `${item.professionalCertifications.length} sertifikasi` : 'Belum tersedia' },
        { label: 'Publikasi Sinta/Scopus', value: indexedPublications.length ? `${indexedPublications.length} karya` : 'Belum tersedia' }
      ]}
      tags={item.expertise}
      backHref="/widyaiswara/profil"
      backLabel="Kembali ke Daftar Widyaiswara"
      related={related}
      action={{ label: 'Lihat Publikasi Widyaiswara', href: '/widyaiswara/publikasi' }}
    />
  )
}
