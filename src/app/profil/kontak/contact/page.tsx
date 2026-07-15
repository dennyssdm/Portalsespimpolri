import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = '/profil/kontak/contact'
  const content = pages['/berita/contact']

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database
  let dbContent = null
  try {
    const res = await serverFetch('/api/profil-content/p-7', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic contact from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbContent) {
    if (dbContent.title) {
      dynamicContent.title = dbContent.title
    }
    if (dbContent.content) {
      const lines = dbContent.content.split(/\r?\n/)
      let chatbotName = 'Agen Wira'
      let chatbotUrl = 'https://wa.me/628123456789?text=Halo%20Agen%20Wira'
      let alamatResmi = 'Jl. Maribaya No.53, Kayuambon, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391, Indonesia'
      let noKontakResmi = '+62 22 2786 110'
      let emailResmi = 'info@sespim-polri.id'

      for (const line of lines) {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0].trim().toLowerCase()
          const val = parts.slice(1).join(':').trim()
          if (key === 'nama agen chatbot') {
            chatbotName = val
          } else if (key === 'whatsapp chatbot url') {
            chatbotUrl = val
          } else if (key === 'alamat resmi') {
            alamatResmi = val
          } else if (key === 'nomor kontak resmi') {
            noKontakResmi = val
          } else if (key === 'email resmi') {
            emailResmi = val
          }
        }
      }

      dynamicContent.chatbot = {
        name: chatbotName,
        url: chatbotUrl
      }
      dynamicContent.alamatResmi = alamatResmi
      dynamicContent.noKontakResmi = noKontakResmi
      dynamicContent.emailResmi = emailResmi
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
