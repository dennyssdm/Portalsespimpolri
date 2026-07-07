import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'

export default function Page() {
  const path = '/profil/kontak/contact'
  const content = pages['/berita/contact']

  if (!content) {
    notFound()
  }

  return <ContentPage content={content} path={path} />
}
