import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { downloadItems, findDownloadItem } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return downloadItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let item = findDownloadItem(slug)

  if (!item) {
    try {
      const res = await serverFetch(`/api/galeri-unduhan-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          item = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Unduhan',
            updatedAt: r.date ? new Date(r.date).toLocaleDateString('id-ID') : '10 Juli 2026',
            format: 'PDF',
            size: '1.5 MB',
            version: 'v1.0.0',
            summary: `Dokumen resmi mengenai ${r.title}.`,
            body: [],
            tags: [r.category || 'unduhan'],
            href: `/unduhan/${r.id}`
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  return {
    title: item ? `${item.title} | Unduhan Sespim` : 'Unduhan Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  let localItem = findDownloadItem(slug)
  let itemToRender = localItem

  if (!itemToRender) {
    try {
      const res = await serverFetch(`/api/galeri-unduhan-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          const matchingLocal = downloadItems.find(
            (d) => d.title.toLowerCase() === r.title.toLowerCase()
          )

          const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '10 Juli 2026'

          itemToRender = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Dokumen',
            updatedAt: dateVal,
            format: matchingLocal?.format || 'PDF',
            size: matchingLocal?.size || '1.8 MB',
            version: matchingLocal?.version || 'v1.0',
            summary: matchingLocal?.summary || `Berkas dokumen resmi mengenai ${r.title} yang diterbitkan oleh Sespim Lemdiklat Polri untuk diunduh.`,
            body: r.content
              ? r.content.split('\n').filter((p: string) => p.trim())
              : (matchingLocal?.body || [
                  `Dokumen panduan/peraturan resmi: ${r.title}.`,
                  "File unduhan digital lengkap sedang disinkronisasikan ke dalam penyimpanan cloud Sespim Lemdiklat Polri.",
                  "Silakan menghubungi administrator untuk meminta salinan dokumen secara langsung jika diperlukan segera."
                ]),
            tags: matchingLocal?.tags || [r.category?.toLowerCase() || 'unduhan', 'pedoman', 'sespim'],
            href: `/unduhan/${r.id}`
          }
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch download detail for slug/ID: ${slug} from API:`, err)
    }
  }

  if (!itemToRender) {
    notFound()
  }

  const related = downloadItems
    .filter((download) => download.slug !== itemToRender?.slug)
    .slice(0, 2)
    .map((download) => ({
      title: download.title,
      href: download.href,
      summary: download.summary
    }))

  return (
    <ContentDetailPage
      path={itemToRender.href}
      eyebrow={itemToRender.category}
      title={itemToRender.title}
      description={itemToRender.summary}
      body={itemToRender.body}
      meta={[
        { label: 'Kategori', value: itemToRender.category },
        { label: 'Diperbarui', value: itemToRender.updatedAt },
        { label: 'Format', value: itemToRender.format },
        { label: 'Ukuran', value: itemToRender.size },
        { label: 'Versi', value: itemToRender.version }
      ]}
      tags={itemToRender.tags}
      backHref="/unduhan"
      backLabel="Kembali ke Daftar Unduhan"
      related={related}
      action={{ label: 'Unduh File Resmi', disabled: false }}
    />
  )
}
