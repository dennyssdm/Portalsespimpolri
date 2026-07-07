import { HeroSection } from '@/components/home/HeroSection'
import { EducationProgramCards, ImplementationStatusPreview, KasespimGreeting, LatestNewsGrid, QuickLinks } from '@/components/home/HomeSections'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <KasespimGreeting />
      <EducationProgramCards />
      <LatestNewsGrid />
      <QuickLinks />
      <ImplementationStatusPreview />
    </main>
  )
}
