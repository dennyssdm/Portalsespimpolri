import { notFound } from 'next/navigation'
import { ContentPage } from '@/components/pages/ContentPage'
import { pages } from '@/data/pages'

export default function Page() {
  const path = "/widyaiswara/lsp-bnsp"
  const content = pages[path]

  if (!content) {
    notFound()
  }

  return <ContentPage content={content} path={path} />
}
