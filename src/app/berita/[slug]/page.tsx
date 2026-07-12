import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentDetailPage } from '@/components/pages/ContentDetailPage'
import { findNewsItem, newsItems } from '@/data/contentCollections'
import { serverFetch } from '@/lib/api'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let item = findNewsItem(slug)
  
  if (!item) {
    try {
      const res = await serverFetch(`/api/berita-informasi-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          item = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Berita',
            date: r.date ? new Date(r.date).toLocaleDateString('id-ID') : '10 Juli 2026',
            author: r.author || 'Admin',
            summary: `Informasi resmi mengenai ${r.title}.`,
            body: [],
            tags: [r.category || 'berita'],
            href: `/berita/${r.id}`
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  return {
    title: item ? `${item.title} | Berita Sespim` : 'Berita Sespim',
    description: item?.summary
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  let localItem = findNewsItem(slug)
  let itemToRender = localItem

  if (!itemToRender) {
    try {
      const res = await serverFetch(`/api/berita-informasi-content/${slug}`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.record) {
          const r = json.data.record
          const matchingLocal = newsItems.find(
            (n) => n.title.toLowerCase() === r.title.toLowerCase()
          )

          const dateVal = r.date ? new Date(r.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '10 Juli 2026'

          itemToRender = {
            slug: r.id,
            title: r.title,
            category: r.category || 'Berita',
            date: dateVal,
            author: r.author || 'Admin',
            summary: matchingLocal?.summary || `Informasi resmi mengenai ${r.title} yang diterbitkan oleh Humas Sespim Lemdiklat Polri.`,
            body: r.content
              ? r.content.split('\n').filter((p: string) => p.trim())
              : (matchingLocal?.body || [
                  `Laporan resmi mengenai: ${r.title}.`,
                  "Konten lengkap dan dokumen pelengkap sedang diunggah oleh administrator sistem Sespim Lemdiklat Polri.",
                  "Silakan kembali beberapa saat lagi atau hubungi Sekretariat Humas Sespim untuk konfirmasi informasi resmi lebih lanjut."
                ]),
            tags: matchingLocal?.tags || [r.category?.toLowerCase() || 'berita', 'sespim', 'polri'],
            href: `/berita/${r.id}`
          }
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch news detail for slug/ID: ${slug} from API:`, err)
    }
  }

  if (!itemToRender) {
    notFound()
  }

  const related = newsItems
    .filter((news) => news.slug !== itemToRender?.slug)
    .slice(0, 2)
    .map((news) => ({
      title: news.title,
      href: news.href,
      summary: news.summary
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
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
        backHref="/berita"
        backLabel="Kembali ke Daftar Berita"
        related={related}
      />
    </>
  )
}
