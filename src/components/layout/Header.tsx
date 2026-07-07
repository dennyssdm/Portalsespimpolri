'use client'

import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navigation } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { externalLinkProps, isExternalHref } from '@/lib/links'
import { SearchBar } from '@/components/ui/SearchBar'

const desktopItems = navigation.slice(0, 7)
const desktopMoreItems = navigation.slice(7).filter((item) => item.href !== '/kontak')

function isActiveHref(pathname: string, href: string) {
  if (isExternalHref(href)) {
    return false
  }

  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-polri-gold/30 bg-polri-brownDark/95 text-white shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/welcome" className="flex shrink-0 items-center gap-3" aria-label="Buka welcome page Sespim Lemdiklat Polri">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
            <Image
              src="/images/logo-sespim.png"
              alt="Logo Sespim Polri"
              width={306}
              height={323}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-[118px]">
            <p className="text-[25px] font-black uppercase leading-none tracking-[0.02em] text-white">SESPIM</p>
            <p className="mt-1 text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-polri-goldSoft">LEMDIKLAT POLRI</p>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Navigasi utama">
          {desktopItems.map((item, index) => {
            const active = isActiveHref(pathname, item.href)
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-2 py-2 text-left text-xs font-semibold leading-5 text-white/88 transition hover:bg-white/10 hover:text-polri-goldSoft 2xl:px-2.5 2xl:text-[13px]',
                    active && 'bg-polri-gold text-polri-brownDark hover:bg-polri-gold hover:text-polri-brownDark'
                  )}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div
                    className={cn(
                      'invisible absolute top-full mt-3 max-h-[calc(100vh-120px)] w-80 translate-y-2 overflow-y-auto rounded-lg border border-polri-gold/30 bg-white p-2 text-left text-polri-brownDark opacity-0 shadow-2xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 before:absolute before:inset-x-0 before:-top-3 before:h-3',
                      index > 4 ? 'right-0' : 'left-0'
                    )}
                  >
                    <div className="grid gap-1">
                      {item.children.map((child) => {
                        const childActive = isActiveHref(pathname, child.href) || Boolean(child.children?.some((grandChild) => isActiveHref(pathname, grandChild.href)))

                        return child.children?.length ? (
                          <div key={child.href} className="rounded-lg bg-polri-cream/70 p-2">
                            <Link
                              href={child.href}
                              {...externalLinkProps(child.href)}
                              aria-current={childActive ? 'page' : undefined}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-left text-sm font-black leading-5 text-polri-brownDark hover:bg-white hover:text-polri-maroon',
                                childActive && 'text-polri-maroon'
                              )}
                            >
                              {child.label}
                            </Link>
                            <div className="ml-3 mt-1 grid gap-1 border-l border-polri-gold/30 pl-3">
                              {child.children.map((grandChild) => (
                                <Link
                                  key={grandChild.href}
                                  href={grandChild.href}
                                  {...externalLinkProps(grandChild.href)}
                                  aria-current={isActiveHref(pathname, grandChild.href) ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-lg bg-white px-3 py-2 text-left text-sm font-semibold leading-5 hover:text-polri-maroon',
                                    isActiveHref(pathname, grandChild.href) && 'text-polri-maroon'
                                  )}
                                >
                                  {grandChild.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            {...externalLinkProps(child.href)}
                            aria-current={isActiveHref(pathname, child.href) ? 'page' : undefined}
                            className={cn(
                              'block rounded-lg px-3 py-2 text-left text-sm font-semibold leading-5 hover:bg-polri-cream hover:text-polri-maroon',
                              isActiveHref(pathname, child.href) && 'bg-polri-cream text-polri-maroon'
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
          {desktopMoreItems.length ? (
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-label="Buka menu lainnya"
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg px-2 py-2 text-left text-xs font-semibold leading-5 text-white/88 transition hover:bg-white/10 hover:text-polri-goldSoft 2xl:px-2.5 2xl:text-[13px]',
                  desktopMoreItems.some((item) => isActiveHref(pathname, item.href)) &&
                    'bg-polri-gold text-polri-brownDark hover:bg-polri-gold hover:text-polri-brownDark'
                )}
              >
                Lainnya
                <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="invisible absolute right-0 top-full mt-3 max-h-[calc(100vh-120px)] w-80 translate-y-2 overflow-y-auto rounded-lg border border-polri-gold/30 bg-white p-2 text-left text-polri-brownDark opacity-0 shadow-2xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 before:absolute before:inset-x-0 before:-top-3 before:h-3">
                <div className="grid gap-2">
                  {desktopMoreItems.map((item) => (
                    <div key={item.href} className="rounded-lg bg-polri-cream/70 p-2">
                      <Link
                        href={item.href}
                        {...externalLinkProps(item.href)}
                        aria-current={isActiveHref(pathname, item.href) ? 'page' : undefined}
                        className={cn(
                          'block rounded-lg px-3 py-2 text-left text-sm font-black leading-5 text-polri-brownDark hover:bg-white hover:text-polri-maroon',
                          isActiveHref(pathname, item.href) && 'text-polri-maroon'
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.description ? <p className="px-3 pb-2 text-left text-xs leading-5 text-neutral-600">{item.description}</p> : null}
                      {item.children?.length ? (
                        <div className="ml-3 mt-1 grid gap-1 border-l border-polri-gold/30 pl-3">
                          {item.children.map((child) => {
                            const childActive = isActiveHref(pathname, child.href) || Boolean(child.children?.some((grandChild) => isActiveHref(pathname, grandChild.href)))

                            return child.children?.length ? (
                              <div key={child.href} className="rounded-lg bg-white p-2">
                                <Link
                                  href={child.href}
                                  {...externalLinkProps(child.href)}
                                  aria-current={childActive ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-lg px-3 py-2 text-left text-sm font-black leading-5 text-polri-brownDark hover:bg-polri-cream hover:text-polri-maroon',
                                    childActive && 'text-polri-maroon'
                                  )}
                                >
                                  {child.label}
                                </Link>
                                <div className="ml-3 mt-1 grid gap-1 border-l border-polri-gold/30 pl-3">
                                  {child.children.map((grandChild) => (
                                    <Link
                                      key={grandChild.href}
                                      href={grandChild.href}
                                      {...externalLinkProps(grandChild.href)}
                                      aria-current={isActiveHref(pathname, grandChild.href) ? 'page' : undefined}
                                      className={cn(
                                        'block rounded-lg bg-polri-cream px-3 py-2 text-left text-sm font-semibold leading-5 hover:text-polri-maroon',
                                        isActiveHref(pathname, grandChild.href) && 'text-polri-maroon'
                                      )}
                                    >
                                      {grandChild.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                key={child.href}
                                href={child.href}
                                {...externalLinkProps(child.href)}
                                aria-current={isActiveHref(pathname, child.href) ? 'page' : undefined}
                                className={cn(
                                  'block rounded-lg bg-white px-3 py-2 text-left text-sm font-semibold leading-5 hover:text-polri-maroon',
                                  childActive && 'text-polri-maroon'
                                )}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </nav>

        <div className="hidden shrink-0 xl:block">
          <SearchBar />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-polri-gold/40 text-polri-gold xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        >
          {open ? <XMarkIcon className="h-5 w-5" aria-hidden="true" /> : <Bars3Icon className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-polri-gold/30 bg-polri-brown xl:hidden">
          <div className="mx-auto max-h-[calc(100dvh-73px)] max-w-7xl space-y-2 overflow-y-auto px-4 py-4">
            <div className="rounded-lg bg-white/10 p-3">
              <SearchBar />
            </div>
            {navigation.map((item) => {
              const active = isActiveHref(pathname, item.href)
              const hasChildren = Boolean(item.children?.length)
              const expanded = hasChildren && (expandedMenu === item.href || (expandedMenu === null && active))

              return (
                <div key={item.href} className="rounded-lg bg-white/5 p-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      {...externalLinkProps(item.href)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'block flex-1 rounded-lg px-3 py-2 text-left text-sm font-bold text-white hover:bg-white/10',
                        active && 'bg-white/10 text-polri-goldSoft'
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setExpandedMenu(expanded ? '' : item.href)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-polri-goldSoft"
                        aria-expanded={expanded}
                        aria-label={expanded ? `Tutup submenu ${item.label}` : `Buka submenu ${item.label}`}
                      >
                        <ChevronDownIcon className={cn('h-4 w-4 transition', expanded && 'rotate-180')} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                  {hasChildren && expanded ? (
                    <div className="mt-2 grid gap-1 border-l border-polri-gold/30 pl-3">
                      {item.children?.map((child) => {
                        const childActive = isActiveHref(pathname, child.href) || Boolean(child.children?.some((grandChild) => isActiveHref(pathname, grandChild.href)))

                        return child.children?.length ? (
                          <div key={child.href} className="rounded-lg">
                            <Link
                              href={child.href}
                              {...externalLinkProps(child.href)}
                              onClick={() => setOpen(false)}
                              aria-current={childActive ? 'page' : undefined}
                              className={cn(
                                'block rounded-lg px-3 py-2 text-left text-sm font-bold text-white/86 hover:bg-white/10 hover:text-polri-goldSoft',
                                childActive && 'bg-white/10 text-polri-goldSoft'
                              )}
                            >
                              {child.label}
                            </Link>
                            <div className="ml-3 mt-1 grid gap-1 border-l border-polri-gold/20 pl-3">
                              {child.children.map((grandChild) => (
                                <Link
                                  key={grandChild.href}
                                  href={grandChild.href}
                                  {...externalLinkProps(grandChild.href)}
                                  onClick={() => setOpen(false)}
                                  aria-current={isActiveHref(pathname, grandChild.href) ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-lg px-3 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-polri-goldSoft',
                                    isActiveHref(pathname, grandChild.href) && 'bg-white/10 text-polri-goldSoft'
                                  )}
                                >
                                  {grandChild.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            {...externalLinkProps(child.href)}
                            onClick={() => setOpen(false)}
                            aria-current={childActive ? 'page' : undefined}
                            className={cn(
                              'block rounded-lg px-3 py-2 text-left text-sm text-white/78 hover:bg-white/10 hover:text-polri-goldSoft',
                              childActive && 'bg-white/10 text-polri-goldSoft'
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
