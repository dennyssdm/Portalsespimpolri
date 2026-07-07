import Link from 'next/link'
import type { PageFeaturePanel as PageFeaturePanelData } from '@/data/pageFeaturePanels'
import { externalLinkProps } from '@/lib/links'

type PageFeaturePanelProps = {
  panel: PageFeaturePanelData
}

export function PageFeaturePanel({ panel }: PageFeaturePanelProps) {
  return (
    <section className="border-y border-polri-gold/15 bg-white py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-gold">{panel.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-polri-brownDark sm:text-3xl">
            {panel.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-700">{panel.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {panel.items.map((item) => {
            const card = (
              <article className="h-full min-w-0 rounded-lg border border-polri-gold/25 bg-polri-cream p-5 transition hover:border-polri-gold hover:bg-white hover:shadow-gold">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-polri-maroon">{item.meta}</p>
                <h3 className="mt-3 text-lg font-black text-polri-brownDark">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{item.description}</p>
              </article>
            )

            if (item.href) {
              return (
                <Link key={`${item.meta}-${item.title}`} href={item.href} {...externalLinkProps(item.href)} className="block">
                  {card}
                </Link>
              )
            }

            return <div key={`${item.meta}-${item.title}`}>{card}</div>
          })}
        </div>
      </div>
    </section>
  )
}
