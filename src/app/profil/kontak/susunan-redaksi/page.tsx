import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export default async function Page() {
  const path = '/profil/kontak/susunan-redaksi'
  const content = pages['/berita/susunan-redaksi']

  if (!content) {
    notFound()
  }

  // Fetch dynamic content from database for redaksi and contact
  let dbRedaksi = null
  let dbContact = null
  try {
    const [resRedaksi, resContact] = await Promise.all([
      serverFetch('/api/profil-content/p-8', { cache: 'no-store' }),
      serverFetch('/api/profil-content/p-7', { cache: 'no-store' })
    ])
    if (resRedaksi.ok) {
      const json = await resRedaksi.json()
      if (json.status === 'success' && json.data?.record) {
        dbRedaksi = json.data.record
      }
    }
    if (resContact.ok) {
      const json = await resContact.json()
      if (json.status === 'success' && json.data?.record) {
        dbContact = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic redaksi from DB, using fallback:', err)
  }

  // Map to structured content
  const dynamicContent: any = { ...content }
  if (dbRedaksi) {
    if (dbRedaksi.title) {
      dynamicContent.title = dbRedaksi.title
    }
    if (dbRedaksi.content) {
      const lines = dbRedaksi.content.split(/\r?\n/)
      const items: string[] = []
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed) {
          items.push(trimmed)
        }
      }

      // Parse contact/chatbot info
      let chatbotName = 'Agen Wira'
      let chatbotUrl = 'https://wa.me/628123456789?text=Halo%20Agen%20Wira'
      let alamatResmi = 'Jl. Maribaya No.53, Kayuambon, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391, Indonesia'
      let noKontakResmi = '+62 22 2786 110'
      let emailResmi = 'info@sespim-polri.id'

      if (dbContact && dbContact.content) {
        const cLines = dbContact.content.split(/\r?\n/)
        for (const line of cLines) {
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
      }

      dynamicContent.chatbot = {
        name: chatbotName,
        url: chatbotUrl
      }

      const contactItemsList = [
        `Nama: Sespim Lemdiklat Polri`,
        `Alamat: ${alamatResmi}`,
        `No HP: ${noKontakResmi}`,
        `Email: ${emailResmi}`,
        `Asisten Chatbot Interaktif: ${chatbotName}`
      ]

      dynamicContent.sections = [
        {
          title: 'Struktur Pengelola Redaksi',
          body: 'Susunan redaksi ini menjadi acuan pembagian peran dalam pengelolaan berita, informasi publik, dokumentasi, dan publikasi resmi pada Portal Resmi Sespim Lemdiklat Polri.',
          items: items
        },
        {
          title: 'Kontak Pengelola Redaksi',
          body: 'Hubungi pengelola redaksi melalui kontak resmi di bawah ini atau mulailah komunikasi interaktif dengan asisten virtual kami.',
          items: contactItemsList
        }
      ]
    }
  }

  return <ContentPage content={dynamicContent} path={path} />
}
