import Link from 'next/link'
import { externalLinkProps } from '@/lib/links'

export type InfoCardProps = {
  title: string
  description: string
  href?: string
  meta?: string
}

export function InfoCard({ title, description, href, meta }: InfoCardProps) {
  const content = (
    <article className="group h-full min-w-0 rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold">
      {meta ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-polri-maroon">{meta}</p> : null}
      <h3 className="mt-3 text-xl font-black text-polri-brownDark group-hover:text-polri-maroon">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-neutral-700">{description}</p>
    </article>
  )

  if (href) {
    return <Link href={href} {...externalLinkProps(href)}>{content}</Link>
  }

  return content
}
