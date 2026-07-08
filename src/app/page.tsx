import { HeroSection } from '@/components/home/HeroSection'
import { EducationProgramCards, KasespimGreeting, LatestNewsGrid, QuickLinks } from '@/components/home/HomeSections'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <KasespimGreeting />
      <EducationProgramCards />
      <LatestNewsGrid />
      <QuickLinks />
    </main>
  )
}
