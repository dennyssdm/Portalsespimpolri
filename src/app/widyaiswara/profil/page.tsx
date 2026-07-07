import { EducatorDirectoryPage } from '@/components/pages/EducatorDirectoryPage'
import { educatorProfiles } from '@/data/contentCollections'

export default function Page() {
  return <EducatorDirectoryPage items={educatorProfiles} />
}
