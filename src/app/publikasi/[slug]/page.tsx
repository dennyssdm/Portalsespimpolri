import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { findPublicationItem, publicationItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return publicationItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let item = findPublicationItem(slug)

  if (!item) {
    try {
      const res = await serverFetch(`/api/publikasi-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          item = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Publikasi',
            date: r.date ? new Date(r.date).toLocaleDateString('id-ID') : '10 Juli 2026',
            author: r.author || 'Admin',
            summary: `Publikasi ilmiah mengenai ${r.title}.`,
            body: [],
            tags: [r.category || 'publikasi'],
            href: `/publikasi/${r.id}`
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  return {
    title: item ? `${item.title} | Publikasi Sespim` : 'Publikasi Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  let localItem = findPublicationItem(slug)
  let itemToRender = localItem

  if (!itemToRender) {
    try {
      const res = await serverFetch(`/api/publikasi-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          const matchingLocal = publicationItems.find(
            (p) => p.title.toLowerCase() === r.title.toLowerCase()
          )

          const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '10 Juli 2026'

          itemToRender = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Publikasi',
            date: dateVal,
            author: r.author || 'Admin',
            summary: matchingLocal?.summary || `Karya publikasi ilmiah resmi mengenai ${r.title} yang dipublikasikan oleh Sespim Lemdiklat Polri.`,
            body: r.content
              ? r.content.split('\n').filter((p: string) => p.trim())
              : (matchingLocal?.body || [
                  `Dokumen kajian/publikasi ilmiah mengenai: ${r.title}.`,
                  "Naskah lengkap, sinopsis, dan metadata publikasi sedang diproses untuk diunggah oleh Bidang Jianbang Sespim Lemdiklat Polri.",
                  "Silakan kembali beberapa saat lagi untuk mengunduh naskah lengkap atau hubungi eLibrary Sespim."
                ]),
            tags: matchingLocal?.tags || [r.category?.toLowerCase() || 'publikasi', 'jianbang', 'sespim'],
            href: `/publikasi/${r.id}`
          }
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch publication detail for slug/ID: ${slug} from API:`, err)
    }
  }

  if (!itemToRender) {
    notFound()
  }

  const related = publicationItems
    .filter((publication) => publication.slug !== itemToRender?.slug)
    .slice(0, 2)
    .map((publication) => ({
      title: publication.title,
      href: publication.href,
      summary: publication.summary
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    'headline': itemToRender.title,
    'description': itemToRender.summary,
    'datePublished': itemToRender.date,
    'author': {
      '@type': 'Person',
      'name': itemToRender.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Sespim Lemdiklat Polri',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sespim.lemdiklat.polri.go.id/images/logo-sespim.png'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentDetailPage
        path={itemToRender.href}
        eyebrow={itemToRender.category}
        title={itemToRender.title}
        description={itemToRender.summary}
        body={itemToRender.body}
        meta={[
          { label: 'Kategori', value: itemToRender.category },
          { label: 'Tanggal', value: itemToRender.date },
          { label: 'Penulis', value: itemToRender.author }
        ]}
        tags={itemToRender.tags}
        backHref="/publikasi"
        backLabel="Kembali ke Daftar Publikasi"
        related={related}
        action={{ label: 'Lihat Kategori Publikasi', href: '/publikasi' }}
      />
    </>
  )
}
