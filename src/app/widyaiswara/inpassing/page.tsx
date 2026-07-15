import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { InpassingModuleWorkspace } from '@/components/pages/InpassingModuleWorkspace'
import { inpassingModules } from '@/data/inpassingModules'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  // Fetch dynamic inpassing modules from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/widyaiswara-content/w-6', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic inpassing modules from DB, using fallback:', err)
  }

  // Parse structured content if available
  let modulesList = inpassingModules
  if (dbContent && dbContent.content) {
    const lines = dbContent.content.split(/\r?\n/)
    const parsedList: any[] = []
    let currentItem: any = null
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'MODUL') {
        const order = parseInt(val) || (parsedList.length + 1)
        currentItem = { id: `modul-${order}`, order, title: '', description: '', videoHref: '', pdfHref: '', pdfFileName: '' }
        parsedList.push(currentItem)
        continue
      }
      
      if (currentItem) {
        if (key === 'JUDUL') {
          currentItem.title = val
        } else if (key === 'DESKRIPSI') {
          currentItem.description = val
        } else if (key === 'VIDEO') {
          currentItem.videoHref = val
        } else if (key === 'URL') {
          currentItem.pdfHref = val
        } else if (key === 'FILE') {
          currentItem.pdfFileName = val
        }
      }
    }
    
    if (parsedList.length > 0) {
      modulesList = parsedList
    }
  }

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
            <InpassingModuleWorkspace modules={modulesList} />
          </div>
        </Container>
      </section>
    </main>
  )
}
