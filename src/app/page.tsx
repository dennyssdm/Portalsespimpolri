import { HeroSection } from '@/components/home/HeroSection'
import { EducationProgramCards, KasespimGreeting, LatestNewsGrid } from '@/components/home/HomeSections'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <KasespimGreeting />
      <EducationProgramCards />
      <LatestNewsGrid />
    </main>
  )
}
