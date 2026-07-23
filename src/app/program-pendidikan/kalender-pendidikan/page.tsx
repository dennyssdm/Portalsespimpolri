import { notFound } from 'next/navigation'
import KalenderClient from './KalenderClient'
import { pages } from '@/data/pages'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const path = "/program-pendidikan/kalender-pendidikan"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  let dbContent = null
  try {
    const res = await serverFetch('/api/program-pendidikan-content/e-1', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record) {
        dbContent = json.data.record
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic content:', err)
  }

  let parsedItems: any[] = []
  if (dbContent && dbContent.content) {
    const lines = dbContent.content.split(/\r?\n/)
    let currentItem: any = null
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'KATEGORI') {
        currentItem = { category: val, title: '', description: '', imageUrl: '', file: '', url: '' }
        parsedItems.push(currentItem)
        continue
      }
      
      if (currentItem) {
        if (key === 'JUDUL') {
          currentItem.title = val
        } else if (key === 'DESKRIPSI') {
          currentItem.description = val
        } else if (key === 'GAMBAR') {
          currentItem.imageUrl = val
        } else if (key === 'FILE') {
          currentItem.file = val
        } else if (key === 'URL') {
          currentItem.url = val
        }
      }
    }
  }

  // Fallback if no database content parsed
  if (parsedItems.length === 0) {
    parsedItems = [
      { category: 'SESPIMTI', title: 'Kalender Pendidikan SESPIMTI TA 2026', description: 'Rencana jadwal perkuliahan, seminar nasional, kunjungan KKDN/KKLN, serta penyusunan Nastrap bagi perwira tinggi peserta didik SESPIMTI Lemdiklat Polri.', imageUrl: '/images/sespim-campus-hero.png', file: 'Kalender_SESPIMTI_TA2026.pdf', url: 'https://drive.google.com/file/d/1Bk8hy7Y9_1HYtZzmRhaAB6foaPpSGmWB/view?usp=sharing' },
      { category: 'SESPIMMEN', title: 'Kalender Pendidikan SESPIMMEN TA 2026', description: 'Jadwal tahapan perkuliahan on-campus dan off-campus, KKDN kewilayahan, serta bimbingan Naskap bagi perwira menengah SESPIMMEN.', imageUrl: '/images/sespim-smart-class.png', file: 'Kalender_SESPIMMEN_TA2026.pdf', url: 'https://drive.google.com/file/d/1Bk8hy7Y9_1HYtZzmRhaAB6foaPpSGmWB/view?usp=sharing' },
      { category: 'SPPK', title: 'Kalender Pendidikan SPPK TA 2026', description: 'Agenda pendidikan spesialisasi fungsi teknis kepolisian, sertifikasi profesi BNSP, serta penulisan karya ilmiah bagi peserta didik SPPK.', imageUrl: '/images/pejabat/kasespim.png', file: 'Kalender_SPPK_TA2026.pdf', url: 'https://drive.google.com/file/d/1Bk8hy7Y9_1HYtZzmRhaAB6foaPpSGmWB/view?usp=sharing' },
      { category: 'SESPIMMA', title: 'Kalender Pendidikan SESPIMMA TA 2026', description: 'Kalender akademik dasar manajerial, kepemimpinan lapangan tingkat polsek/polres, serta latihan penulisan Taskap bagi perwira pertama SESPIMMA.', imageUrl: '/images/struktur-sespim.png', file: 'Kalender_SESPIMMA_TA2026.pdf', url: 'https://drive.google.com/file/d/1Bk8hy7Y9_1HYtZzmRhaAB6foaPpSGmWB/view?usp=sharing' }
    ]
  }

  const title = dbContent?.title || content.title
  const description = dbContent?.content || content.description

  return (
    <KalenderClient
      initialItems={parsedItems}
      title={title}
      description={description}
    />
  )
}
