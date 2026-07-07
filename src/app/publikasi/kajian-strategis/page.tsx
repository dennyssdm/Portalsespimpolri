import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'

export default function Page() {
  const path = "/publikasi/kajian-strategis"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  return <ContentPage content={content} path={path} />
}
