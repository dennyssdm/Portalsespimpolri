import Link from 'next/link'
import { navigation } from '@/data/navigation'
import { cn } from '@/lib/cn'

type BreadcrumbProps = {
  path: string
  currentLabel: string
  className?: string
}

type BreadcrumbItem = {
  label: string
  href: string
  current?: boolean
}

function getBreadcrumbItems(path: string, currentLabel: string): BreadcrumbItem[] {
  const currentTopLevel = navigation.find((item) => item.href === path)
  const parent = navigation.find((item) => item.children?.some((child) => child.href === path))
  const currentChild = parent?.children?.find((child) => child.href === path)
  const dynamicParent = navigation
    .flatMap((item) => [item, ...(item.children ?? [])])
    .filter((item) => item.href !== '/' && path.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]
  const dynamicTopLevel = dynamicParent
    ? navigation.find((item) => item.href === dynamicParent.href || item.children?.some((child) => child.href === dynamicParent.href))
    : undefined

  if (path === '/') {
    return [{ label: 'Beranda', href: '/', current: true }]
  }

  const items: BreadcrumbItem[] = [{ label: 'Beranda', href: '/' }]

  if (dynamicParent) {
    if (dynamicTopLevel && dynamicTopLevel.href !== dynamicParent.href) {
      items.push({ label: dynamicTopLevel.label, href: dynamicTopLevel.href })
    }
    items.push({ label: dynamicParent.label, href: dynamicParent.href })
    items.push({ label: currentLabel, href: path, current: true })
    return items
  }

  if (parent) {
    items.push({ label: parent.label, href: parent.href })
    items.push({ label: currentChild?.label ?? currentLabel, href: path, current: true })
    return items
  }

  items.push({ label: currentTopLevel?.label ?? currentLabel, href: path, current: true })
  return items
}

export function Breadcrumb({ path, currentLabel, className }: BreadcrumbProps) {
  const items = getBreadcrumbItems(path, currentLabel)

  return (
    <nav className={cn('text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span className="text-polri-gold" aria-hidden="true">/</span> : null}
            {item.current ? (
              <span className="font-bold text-polri-brownDark" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="font-semibold text-neutral-600 hover:text-polri-maroon">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
