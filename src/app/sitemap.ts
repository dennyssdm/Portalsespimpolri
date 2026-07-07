import type { MetadataRoute } from 'next'
import type { NavItem } from '@/types'
import { downloadItems, educatorProfiles, newsItems, publicationItems } from '@/data/contentCollections'
import { internalLoginLink, navigation } from '@/data/navigation'
import { isInternalHref } from '@/lib/links'

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])])
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sespim.polri.go.id'
  const routes = [
    ...flattenNavItems(navigation),
    internalLoginLink,
    { label: 'Welcome Page', href: '/welcome' },
    { label: 'Pencarian', href: '/pencarian' }
  ].filter((route) => isInternalHref(route.href))
  const detailRoutes = [
    ...newsItems.map((item) => item.href),
    ...publicationItems.map((item) => item.href),
    ...educatorProfiles.map((item) => item.href),
    ...downloadItems.map((item) => item.href)
  ]

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route.href === '/' ? 1 : 0.7
    })),
    ...detailRoutes.map((href) => ({
      url: `${baseUrl}${href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }))
  ]
}
