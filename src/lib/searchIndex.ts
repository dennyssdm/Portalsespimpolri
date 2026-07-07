import { downloadItems, educatorProfiles, newsItems, publicationItems } from '@/data/contentCollections'
import { kasespimGreeting } from '@/data/homepage'
import { internalLoginLink, navigation } from '@/data/navigation'
import { pages } from '@/data/pages'
import type { NavItem, PageContent } from '@/types'

export type SearchResult = {
  title: string
  href: string
  category: string
  description: string
  matchedText?: string
}

type SearchEntry = SearchResult & {
  keywords: string[]
}

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])])
}

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function compactText(values: Array<string | undefined | null>) {
  return values.filter(Boolean).join(' ')
}

function pageKeywords(content: PageContent) {
  return [
    content.eyebrow,
    content.description,
    content.externalLink?.label,
    content.externalLink?.description,
    content.media?.caption,
    ...content.sections.flatMap((section) => [section.title, section.body, ...(section.items ?? [])]),
    ...(content.resources?.flatMap((resource) => [
      resource.title,
      resource.description,
      resource.fileName,
      resource.format,
      resource.category
    ]) ?? []),
    ...(content.officials?.flatMap((official) => [
      official.name,
      official.rank,
      official.position,
      official.photoAlt
    ]) ?? [])
  ].filter(Boolean) as string[]
}

function buildSearchEntries(): SearchEntry[] {
  const navEntries = [...flattenNavItems(navigation), internalLoginLink].map((item) => ({
    title: item.label,
    href: item.href,
    category: 'Menu',
    description: item.description ?? 'Menu navigasi Portal Resmi Sespim.',
    keywords: [item.label, item.description ?? '']
  }))

  const pageEntries = Object.entries(pages).map(([href, content]) => ({
    title: content.title,
    href,
    category: 'Halaman',
    description: content.description,
    keywords: pageKeywords(content)
  }))

  const resourceEntries = Object.entries(pages).flatMap(([pageHref, content]) =>
    content.resources?.map((resource) => ({
      title: resource.title,
      href: resource.href,
      category: 'Materi Unduhan',
      description: resource.description,
      matchedText: `${content.title} - ${resource.fileName}`,
      keywords: [
        content.title,
        content.eyebrow,
        resource.title,
        resource.description,
        resource.fileName,
        resource.format,
        resource.category ?? '',
        pageHref
      ]
    })) ?? []
  )

  const officialEntries = Object.entries(pages).flatMap(([pageHref, content]) =>
    content.officials?.map((official) => ({
      title: official.name ?? official.position,
      href: pageHref,
      category: 'Pejabat',
      description: compactText([official.rank, official.position]) || 'Daftar Pejabat Utama Sespim.',
      keywords: [content.title, official.name ?? '', official.rank ?? '', official.position, official.photoAlt ?? '']
    })) ?? []
  )

  const educatorEntries = educatorProfiles.map((profile) => ({
    title: profile.name,
    href: profile.href,
    category: 'Profil Widyaiswara',
    description: profile.summary,
    matchedText: compactText([profile.rank, profile.position]),
    keywords: [
      profile.name,
      profile.rank,
      profile.position,
      profile.summary,
      ...profile.bio,
      ...(profile.subjects ?? []),
      ...(profile.generalEducation ?? []),
      ...(profile.serviceEducation ?? []),
      ...(profile.developmentEducation ?? []),
      ...profile.expertise,
      ...profile.publications,
      ...(profile.indexedPublications ?? []),
      ...(profile.professionalCertifications ?? [])
    ]
  }))

  const newsEntries = newsItems.map((item) => ({
    title: item.title,
    href: item.href,
    category: `Berita - ${item.category}`,
    description: item.summary,
    matchedText: `${item.date} - ${item.author}`,
    keywords: [item.title, item.category, item.author, item.summary, ...item.body, ...item.tags]
  }))

  const publicationEntries = publicationItems.map((item) => ({
    title: item.title,
    href: item.href,
    category: `Publikasi - ${item.category}`,
    description: item.summary,
    matchedText: `${item.date} - ${item.author}`,
    keywords: [item.title, item.category, item.author, item.summary, ...item.body, ...item.tags]
  }))

  const downloadEntries = downloadItems.map((item) => ({
    title: item.title,
    href: item.href,
    category: `Unduhan - ${item.category}`,
    description: item.summary,
    matchedText: `${item.format} - ${item.size} - ${item.version}`,
    keywords: [item.title, item.category, item.format, item.size, item.version, item.summary, ...item.body, ...item.tags]
  }))

  const homepageEntries: SearchEntry[] = [
    {
      title: 'Selamat Datang di Portal Web Resmi Sespim Lemdiklat Polri',
      href: '/welcome',
      category: 'Welcome Page',
      description: 'Halaman pembuka Portal Web Resmi Sespim Lemdiklat Polri dengan background gedung Sespim.',
      matchedText: 'Welcome page',
      keywords: [
        'welcome',
        'selamat datang',
        'portal web resmi',
        'Sespim Lemdiklat Polri',
        'gedung Sespim',
        'logo Sespim'
      ]
    },
    {
      title: kasespimGreeting.title,
      href: '/',
      category: 'Beranda',
      description: `${kasespimGreeting.signatureRole}: ${kasespimGreeting.signatureName}`,
      matchedText: kasespimGreeting.signatureName,
      keywords: [
        kasespimGreeting.eyebrow,
        kasespimGreeting.title,
        ...kasespimGreeting.openingLines,
        ...kasespimGreeting.paragraphs,
        kasespimGreeting.signatureRole,
        kasespimGreeting.signatureName
      ]
    }
  ]

  return [
    ...homepageEntries,
    ...navEntries,
    ...pageEntries,
    ...resourceEntries,
    ...officialEntries,
    ...educatorEntries,
    ...newsEntries,
    ...publicationEntries,
    ...downloadEntries
  ]
}

function scoreEntry(entry: SearchEntry, normalizedQuery: string, terms: string[]) {
  const normalizedTitle = normalizeSearchText(entry.title)
  const normalizedDescription = normalizeSearchText(entry.description)
  const normalizedKeywords = normalizeSearchText(entry.keywords.join(' '))
  const haystack = `${normalizedTitle} ${normalizedDescription} ${normalizedKeywords}`

  if (!terms.every((term) => haystack.includes(term))) {
    return 0
  }

  let score = 10

  if (normalizedTitle === normalizedQuery) score += 120
  if (normalizedTitle.startsWith(normalizedQuery)) score += 90
  if (normalizedTitle.includes(normalizedQuery)) score += 70
  if (normalizedDescription.includes(normalizedQuery)) score += 30
  if (normalizedKeywords.includes(normalizedQuery)) score += 25

  for (const term of terms) {
    if (normalizedTitle.includes(term)) score += 18
    if (normalizedDescription.includes(term)) score += 8
    if (normalizedKeywords.includes(term)) score += 5
  }

  if (entry.category.includes('Profil Widyaiswara')) score += 8
  if (entry.category.includes('Halaman')) score += 5

  return score
}

export function searchPortal(query: string, limit = 30): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query)
  const terms = normalizedQuery.split(' ').filter(Boolean)

  if (!terms.length) {
    return []
  }

  return buildSearchEntries()
    .map((entry) => ({ entry, score: scoreEntry(entry, normalizedQuery, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry }) => ({
      title: entry.title,
      href: entry.href,
      category: entry.category,
      description: entry.description,
      matchedText: entry.matchedText
    }))
}
