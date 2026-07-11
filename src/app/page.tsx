import { HeroSection } from '@/components/home/HeroSection'
import { EducationProgramCards, KasespimGreeting, LatestNewsGrid } from '@/components/home/HomeSections'

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
