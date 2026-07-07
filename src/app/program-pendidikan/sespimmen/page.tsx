import { notFound } from 'next/navigation'
import { ProgramDetailPage } from '@/components/pages/ProgramDetailPage'
import { findProgramDetail } from '@/data/programDetails'

export default function Page() {
  const program = findProgramDetail('sespimmen')

  if (!program) {
    notFound()
  }

  return <ProgramDetailPage program={program} />
}
