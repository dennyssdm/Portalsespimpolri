import { EducatorExpertiseDashboardPage } from '@/components/pages/EducatorExpertiseDashboardPage'
import { educatorProfiles } from '@/data/contentCollections'

export default function Page() {
  return <EducatorExpertiseDashboardPage items={educatorProfiles} />
}
