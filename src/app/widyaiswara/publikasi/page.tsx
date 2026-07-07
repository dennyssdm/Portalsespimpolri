import { EducatorPublicationRepositoryPage } from '@/components/pages/EducatorPublicationRepositoryPage'
import { educatorPublications } from '@/data/educatorPublications'

export default function Page() {
  return <EducatorPublicationRepositoryPage items={educatorPublications} />
}
