'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { googleNewsMonitoringHref, newsPortalMonitoringLinks, sespimHashtagLinks, socialMonitoringLinks } from '@/data/newsMonitoring'
import { externalLinkProps } from '@/lib/links'

type MonitoringFeedItem = {
  title: string
  href: string
  source: string
  publishedAt: string
}

type MonitoringResponse = {
  source: string
  updatedAt: string
  items: MonitoringFeedItem[]
  error?: string
}

function formatDate(value: string) {
  if (!value) return 'Tanggal belum tersedia'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

export function NewsMonitoringPanel() {
  const [feed, setFeed] = useState<MonitoringResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadFeed() {
      try {
        const response = await fetch('/api/news-monitoring', { cache: 'no-store' })
        const data = await response.json() as MonitoringResponse

        if (active) {
          setFeed(data)
        }
      } catch {
        if (active) {
          setFeed({
            source: 'Google News',
            updatedAt: new Date().toISOString(),
            items: [],
            error: 'Feed berita eksternal belum dapat dimuat.'
          })
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadFeed()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="bg-white py-14">
      <Container>
        <SectionTitle
          eyebrow="Monitoring Berita"
          title="Berita eksternal, media sosial, dan hashtag Sespim"
          description="Pantauan ini mengarah ke sumber asli agar redaksi dapat mengikuti pemberitaan dan percakapan publik terbaru tentang Sespim Polri."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <article className="overflow-hidden rounded-lg border border-polri-gold/30 bg-polri-brownDark text-white shadow-gold">
            <div className="flex flex-col gap-3 border-b border-polri-gold/25 bg-polri-maroon px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Feed Up To Date</p>
                <h2 className="mt-2 text-2xl font-black">Pantauan Google News</h2>
              </div>
              <a
                href={googleNewsMonitoringHref}
                {...externalLinkProps(googleNewsMonitoringHref)}
                className="inline-flex rounded-lg bg-polri-gold px-4 py-3 text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
              >
                Buka Google News
              </a>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-lg border border-polri-gold/15 bg-white/5 p-5"
                    >
                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded bg-white/10"></div>
                        <div className="h-6 w-32 rounded bg-white/10"></div>
                      </div>
                      <div className="mt-4 h-6 w-11/12 rounded bg-white/15"></div>
                      <div className="mt-2 h-4 w-2/3 rounded bg-white/10"></div>
                    </div>
                  ))}
                </div>
              ) : feed?.items.length ? (
                <div className="grid gap-3">
                  {feed.items.map((item) => (
                    <a
                      key={`${item.href}-${item.title}`}
                      href={item.href}
                      {...externalLinkProps(item.href)}
                      className="rounded-lg border border-polri-gold/20 bg-white p-5 text-polri-brownDark transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                          {item.source}
                        </span>
                        <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-black leading-7 text-polri-brownDark">{item.title}</h3>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-polri-gold/25 bg-white/8 p-5">
                  <p className="text-base font-black text-white">Feed otomatis belum tersedia.</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">
                    Pantauan tetap dapat dibuka melalui tombol Google News dan daftar portal berita di samping.
                  </p>
                </div>
              )}

              {feed?.updatedAt ? (
                <p className="mt-4 text-xs font-semibold text-white/60">
                  Pembaruan feed: {formatDate(feed.updatedAt)}
                </p>
              ) : null}
            </div>
          </article>

          <aside className="space-y-5">
            <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-5 shadow-soft">
              <h2 className="text-lg font-black text-polri-brownDark">Portal Berita Terkenal</h2>
              <div className="mt-4 grid gap-3">
                {newsPortalMonitoringLinks.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    {...externalLinkProps(source.href)}
                    className="rounded-lg bg-white p-4 transition hover:text-polri-maroon hover:shadow-soft"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">{source.meta}</p>
                    <p className="mt-2 font-black text-polri-brownDark">{source.title}</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">{source.description}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
              <h2 className="text-lg font-black text-polri-brownDark">Media Sosial dan Hashtag</h2>
              <div className="mt-4 grid gap-3">
                {socialMonitoringLinks.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    {...externalLinkProps(source.href)}
                    className="rounded-lg border border-polri-gold/20 bg-polri-cream p-4 transition hover:border-polri-gold hover:bg-white"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">{source.meta}</p>
                    <p className="mt-2 font-black text-polri-brownDark">{source.title}</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">{source.description}</p>
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {sespimHashtagLinks.map((hashtag) => (
                  <a
                    key={hashtag.href}
                    href={hashtag.href}
                    {...externalLinkProps(hashtag.href)}
                    className="rounded-lg bg-polri-maroon px-3 py-2 text-xs font-black text-white hover:bg-polri-brownDark"
                  >
                    {hashtag.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
