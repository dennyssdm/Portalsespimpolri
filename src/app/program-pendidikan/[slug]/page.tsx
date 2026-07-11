import { notFound } from 'next/navigation'
import { ProgramDetailPage } from '@/components/pages/ProgramDetailPage'
import { findProgramDetail } from '@/data/programDetails'
import { serverFetch } from '@/lib/api'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  // Try to load dynamically from DB first
  let dbProgram = null
  try {
    const res = await serverFetch(`/api/program-pendidikan-content/prog-${slug}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record?.content) {
        dbProgram = JSON.parse(json.data.record.content)
      }
    }
  } catch (err) {
    console.warn(`Failed to fetch dynamic program details for ${slug} from DB, using fallback:`, err)
  }

  // Fallback to static config
  const staticProgram = findProgramDetail(slug)
  const program = dbProgram || staticProgram

  if (!program) {
    notFound()
  }

  return <ProgramDetailPage program={program} />
}
