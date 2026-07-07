import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { InpassingModuleWorkspace } from '@/components/pages/InpassingModuleWorkspace'
import { inpassingModules } from '@/data/inpassingModules'

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Widyaiswara"
        title="Inpassing Widyaiswara"
        description="Ruang belajar mandiri untuk calon Widyaiswara melalui video, materi PDF, checklist modul, dan klaim sertifikat penyelesaian."
      />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path="/widyaiswara/inpassing" currentLabel="Inpassing Widyaiswara" />
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <SectionTitle
            eyebrow="Belajar Mandiri"
            title="8 Modul Inpassing Widyaiswara"
            description="Setiap modul disiapkan untuk menampung video pembelajaran, materi PDF, dan checklist penyelesaian peserta."
          />

          <div className="mt-8">
            <InpassingModuleWorkspace modules={inpassingModules} />
          </div>
        </Container>
      </section>
    </main>
  )
}
