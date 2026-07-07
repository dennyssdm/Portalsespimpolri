import Link from 'next/link'
import { AcademicCapIcon, ArrowRightIcon, ChartBarIcon, RectangleGroupIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { EducatorProfile } from '@/data/contentCollections'

type EducatorExpertiseDashboardPageProps = {
  items: EducatorProfile[]
}

type CountItem = {
  label: string
  count: number
  percent: number
}

const unknownLabel = 'Belum tersedia'

function countBy(items: EducatorProfile[], getLabel: (item: EducatorProfile) => string): CountItem[] {
  const counts = new Map<string, number>()

  items.forEach((item) => {
    const label = getLabel(item)
    counts.set(label, (counts.get(label) ?? 0) + 1)
  })

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      label,
      count,
      percent: items.length ? Math.round((count / items.length) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

function classifyEducatorType(position: string) {
  const normalized = position.toUpperCase()

  if (normalized.includes('GADIK')) return 'Gadik'
  if (normalized.includes('UTAMA')) return 'Widyaiswara Utama'
  if (normalized.includes('MADYA')) return 'Widyaiswara Madya'
  if (normalized.includes('MUDA')) return 'Widyaiswara Muda'

  return 'Lainnya'
}

function normalizeDevelopmentEducation(value: string | undefined) {
  const normalized = (value ?? '').trim().toUpperCase()

  if (!normalized) return unknownLabel
  if (normalized.includes('SESPIMTI')) return 'SESPIMTI'
  if (normalized.includes('SESPIMMEN')) return 'SESPIMMEN'
  if (normalized.includes('SESPIMMA')) return 'SESPIMMA'
  if (normalized.includes('LEMHANNAS')) return 'LEMHANNAS'
  if (normalized.includes('PKN') && normalized.includes('I')) return 'PKN Tk. I'
  if (normalized.includes('PKN')) return 'PKN'
  if (normalized.includes('SECAPA')) return 'SECAPA'
  if (normalized.includes('PTIK')) return 'PTIK'

  return normalized.replace(/\s+\d{4}$/u, '')
}

function firstDevelopmentEducation(item: EducatorProfile) {
  return item.developmentEducation?.[0]
}

function StatCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof UserGroupIcon }) {
  return (
    <article className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">{label}</p>
          <p className="mt-3 text-3xl font-black text-polri-brownDark">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-polri-cream text-polri-maroon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-neutral-600">{note}</p>
    </article>
  )
}

function HorizontalBar({ item, max }: { item: CountItem; max: number }) {
  const width = max ? Math.max(8, Math.round((item.count / max) * 100)) : 0

  return (
    <div className="grid gap-2">
      <div className="flex items-start justify-between gap-4 text-sm">
        <p className="font-black text-polri-brownDark">{item.label}</p>
        <p className="shrink-0 font-black text-polri-maroon">{item.count}</p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-polri-cream">
        <div className="h-full rounded-full bg-polri-gold" style={{ width: `${width}%` }} />
      </div>
      <p className="text-xs font-semibold text-neutral-500">{item.percent}% dari total data</p>
    </div>
  )
}

export function EducatorExpertiseDashboardPage({ items }: EducatorExpertiseDashboardPageProps) {
  const typeCounts = countBy(items, (item) => classifyEducatorType(item.position))
  const developmentCounts = countBy(items, (item) => normalizeDevelopmentEducation(firstDevelopmentEducation(item)))
  const positionCounts = countBy(items, (item) => item.position || unknownLabel)
  const maxDevelopmentCount = Math.max(...developmentCounts.map((item) => item.count), 0)
  const maxPositionCount = Math.max(...positionCounts.map((item) => item.count), 0)
  const withDevelopmentEducation = items.filter((item) => firstDevelopmentEducation(item)).length
  const topDevelopmentColumns = developmentCounts.slice(0, 6).map((item) => item.label)

  const matrixRows = typeCounts.map((type) => {
    const rowItems = items.filter((item) => classifyEducatorType(item.position) === type.label)
    const rowCounts = countBy(rowItems, (item) => normalizeDevelopmentEducation(firstDevelopmentEducation(item)))

    return {
      ...type,
      values: topDevelopmentColumns.map((label) => rowCounts.find((item) => item.label === label)?.count ?? 0)
    }
  })

  return (
    <main>
      <PageHero
        eyebrow="Widyaiswara"
        title="Dashboard Bidang Keahlian"
        description="Rekap data Widyaiswara berdasarkan pendidikan pengembangan dan jenis jabatan untuk membaca komposisi akademik secara cepat."
      />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path="/widyaiswara/bidang-keahlian" currentLabel="Dashboard Bidang Keahlian" />
        </Container>
      </section>

      <section className="bg-polri-brownDark py-10 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Rekap Akademik</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Komposisi Widyaiswara berdasarkan Dikbang dan jenis jabatan</h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                Dashboard ini membaca data dari direktori profil sehingga rekap dapat digunakan sebagai pemetaan awal kapasitas tenaga pendidik.
              </p>
            </div>
            <Link
              href="/widyaiswara/profil"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-polri-gold px-5 py-3 text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
            >
              <span>Buka Direktori Profil</span>
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Data" value={String(items.length)} note="Profil Widyaiswara dan Gadik yang terdata." icon={UserGroupIcon} />
            <StatCard label="Jenis Jabatan" value={String(typeCounts.length)} note={`${typeCounts[0]?.label ?? unknownLabel} menjadi komposisi terbesar.`} icon={RectangleGroupIcon} />
            <StatCard label="Dikbang Terdata" value={String(withDevelopmentEducation)} note={`${items.length - withDevelopmentEducation} profil belum memiliki data Dikbang.`} icon={AcademicCapIcon} />
            <StatCard label="Kategori Dikbang" value={String(developmentCounts.length)} note={`${developmentCounts[0]?.label ?? unknownLabel} menjadi kategori terbanyak.`} icon={ChartBarIcon} />
          </div>
        </Container>
      </section>

      <section className="bg-polri-cream py-12">
        <Container>
          <SectionTitle
            eyebrow="Jenis Widyaiswara"
            title="Komposisi berdasarkan jenis jabatan"
            description="Pengelompokan ini diturunkan dari nama jabatan pada data profil, seperti Utama, Madya, Muda, dan Gadik."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {typeCounts.map((item) => (
              <article key={item.label} className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
                <p className="text-sm font-black text-polri-brownDark">{item.label}</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="text-3xl font-black text-polri-maroon">{item.count}</p>
                  <p className="rounded-lg bg-polri-cream px-3 py-2 text-xs font-black text-polri-brownDark">{item.percent}%</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft">
              <SectionTitle
                eyebrow="Dikbang"
                title="Rekap pendidikan pengembangan"
                description="Kategori Dikbang dinormalisasi dari data pendidikan pengembangan pada direktori profil."
              />
              <div className="mt-8 grid gap-5">
                {developmentCounts.map((item) => (
                  <HorizontalBar key={item.label} item={item} max={maxDevelopmentCount} />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-polri-gold/25 bg-polri-brownDark p-6 text-white shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-polri-goldSoft">Rangkuman Cepat</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-lg bg-white/8 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-polri-goldSoft">Dikbang dominan</p>
                  <p className="mt-2 text-2xl font-black">{developmentCounts[0]?.label ?? unknownLabel}</p>
                  <p className="mt-1 text-sm font-semibold text-white/72">{developmentCounts[0]?.count ?? 0} profil</p>
                </div>
                <div className="rounded-lg bg-white/8 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-polri-goldSoft">Jenis terbesar</p>
                  <p className="mt-2 text-2xl font-black">{typeCounts[0]?.label ?? unknownLabel}</p>
                  <p className="mt-1 text-sm font-semibold text-white/72">{typeCounts[0]?.count ?? 0} profil</p>
                </div>
                <div className="rounded-lg bg-white/8 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-polri-goldSoft">Jabatan unik</p>
                  <p className="mt-2 text-2xl font-black">{positionCounts.length}</p>
                  <p className="mt-1 text-sm font-semibold text-white/72">Ruang jabatan berbeda dalam data.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-polri-cream py-12">
        <Container>
          <SectionTitle
            eyebrow="Matriks"
            title="Persilangan jenis jabatan dan Dikbang"
            description="Tabel ini menampilkan 6 kategori Dikbang terbanyak agar komposisi per jenis jabatan mudah dibandingkan."
          />

          <div className="mt-8 overflow-x-auto rounded-lg border border-polri-gold/25 bg-white shadow-soft">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-polri-brownDark text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Jenis Jabatan</th>
                  {topDevelopmentColumns.map((label) => (
                    <th key={label} className="px-4 py-3 font-black">{label}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr key={row.label} className="border-t border-polri-gold/15">
                    <th className="px-4 py-3 font-black text-polri-brownDark">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${topDevelopmentColumns[index]}`} className="px-4 py-3 font-semibold text-neutral-700">{value}</td>
                    ))}
                    <td className="px-4 py-3 text-right font-black text-polri-maroon">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <SectionTitle
            eyebrow="Jabatan Detail"
            title="Ruang jabatan teratas"
            description="Daftar ini mempertahankan nama jabatan lengkap dari data sumber untuk membantu pengecekan administratif."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {positionCounts.slice(0, 10).map((item) => (
              <article key={item.label} className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-black leading-7 text-polri-brownDark">{item.label}</p>
                  <p className="shrink-0 rounded-lg bg-polri-cream px-3 py-2 text-sm font-black text-polri-maroon">{item.count}</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-polri-cream">
                  <div className="h-full rounded-full bg-polri-maroon" style={{ width: `${maxPositionCount ? Math.max(8, Math.round((item.count / maxPositionCount) * 100)) : 0}%` }} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
