import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export type DetailMeta = {
  label: string
  value: string
}

export type RelatedDetailItem = {
  title: string
  href: string
  summary: string
}

type ContentDetailPageProps = {
  path: string
  eyebrow: string
  title: string
  description: string
  body: string[]
  meta: DetailMeta[]
  tags?: string[]
  backHref: string
  backLabel: string
  related?: RelatedDetailItem[]
  action?: {
    label: string
    href?: string
    disabled?: boolean
  }
  photoUrl?: string
}

export function ContentDetailPage({
  path,
  eyebrow,
  title,
  description,
  body,
  meta,
  tags,
  backHref,
  backLabel,
  related,
  action,
  photoUrl
}: ContentDetailPageProps) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={title} />
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="min-w-0 rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {photoUrl && (
                  <div className="relative w-32 h-40 shrink-0 border border-polri-gold/30 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center shadow-inner">
                    {photoUrl.startsWith('http') || photoUrl.startsWith('/') ? (
                      <img src={photoUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200">
                        <svg className="w-12 h-12 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2">
                    {meta.slice(0, 3).map((item) => (
                      <span key={`${item.label}-${item.value}`} className="rounded-lg bg-polri-cream px-3 py-2 text-xs font-bold text-polri-brownDark">
                        {item.label}: {item.value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-5">
                    {body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-neutral-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {tags?.length ? (
                <div className="mt-8 border-t border-polri-gold/20 pt-5">
                  <p className="text-sm font-black text-polri-brownDark">Tag</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-polri-cream px-3 py-2 text-xs font-bold text-neutral-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="space-y-5">
              <div className="rounded-lg bg-polri-brownDark p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Metadata</p>
                <div className="mt-4 grid gap-3">
                  {meta.map((item) => (
                    <div key={`${item.label}-${item.value}`} className="rounded-lg bg-white/8 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-polri-goldSoft">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white/86">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {action?.disabled ? (
                <div aria-disabled="true" className="rounded-lg border border-polri-gold/25 bg-polri-cream px-5 py-4 text-center font-black text-polri-brownDark">
                  {action.label}
                </div>
              ) : action?.href ? (
                <Link href={action.href} className="block rounded-lg bg-polri-maroon px-5 py-4 text-center font-black text-white hover:bg-polri-brownDark">
                  {action.label}
                </Link>
              ) : null}

              <Link href={backHref} className="block rounded-lg border border-polri-gold/25 bg-polri-cream p-5 font-black text-polri-brownDark hover:border-polri-gold hover:bg-white">
                {backLabel}
              </Link>

              {related?.length ? (
                <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                  <h2 className="font-black text-polri-brownDark">Konten Terkait</h2>
                  <div className="mt-4 grid gap-3">
                    {related.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-lg bg-white p-4 hover:text-polri-maroon">
                        <p className="font-black text-polri-brownDark">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-neutral-700">{item.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
