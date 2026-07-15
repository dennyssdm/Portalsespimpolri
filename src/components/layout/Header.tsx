'use client'

import { useEffect } from 'react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { navigation } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { externalLinkProps, isExternalHref } from '@/lib/links'

function isActiveHref(pathname: string, href: string) {
  if (isExternalHref(href)) {
    return false
  }

  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const pathname = usePathname()
  
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<{
    name: string
    role: string
    roleLabel: string
    foto?: string
  } | null>(null)

  useEffect(() => {
    setMounted(true)
    const handleStorageChange = () => {
      const userJson = sessionStorage.getItem('sespim_user')
      if (userJson) {
        setUser(JSON.parse(userJson))
      } else {
        setUser(null)
      }
    }

    handleStorageChange()

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('sespim_auth_change', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('sespim_auth_change', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('sespim_user')
    setUser(null)
    window.dispatchEvent(new Event('sespim_auth_change'))
    router.push('/login')
  }

  // Filter navigation: hide restricted menus (Widyaiswara, Publikasi, Galeri, Unduhan) if not logged in
  const showRestricted = mounted && user !== null

  const filteredNavigation = navigation
    .filter((item) => {
      if (!showRestricted) {
        const isRestricted = ['/widyaiswara', '/publikasi', '/galeri', '/unduhan'].includes(item.href)
        return !isRestricted
      }
      return true
    })
    .map((item) => {
      // If not logged in, convert 'Sarana Prasarana' top-level menu directly into 'Produk / Karya Akademis' link, but preserve Klinik Pratama & Produk Karya submenus
      if (!showRestricted && item.href === '/sarana-prasarana') {
        return {
          ...item,
          href: '/sarana-prasarana/produk-karya',
          children: item.children?.filter(child => 
            child.href === '/sarana-prasarana/klinik-pratama' || 
            child.href === '/sarana-prasarana/produk-karya'
          )
        }
      }
      return item
    })

  const desktopItems = filteredNavigation.slice(0, 7)
  const desktopMoreItems = filteredNavigation.slice(7).filter((item) => item.href !== '/kontak')

  return (
    <header className="sticky top-0 z-50 border-b border-polri-gold/30 bg-polri-brownDark/95 text-white shadow-lg backdrop-blur">
      {/* E-Jurnal Sespim Lemdiklat Polri Top Banner */}
      <a 
        href="https://ejurnal-copus.sespimpolri.id/"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-polri-gold via-yellow-400 to-polri-gold text-polri-brownDark text-center py-2 px-4 text-xs font-black hover:opacity-95 transition relative overflow-hidden group select-none border-b border-polri-gold/20"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-out" />
        <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] sm:text-xs">
          <span className="bg-polri-maroon text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md animate-pulse">BARU</span>
          <span className="tracking-wide">
            📖 <strong>E-Jurnal Sespim Lemdiklat Polri</strong>: Akses Portal Publikasi Ilmiah & Kajian Kepolisian Terakreditasi
          </span>
          <span className="underline decoration-polri-maroon group-hover:text-polri-maroon transition-colors font-bold">
            ejurnal-copus.sespimpolri.id &rarr;
          </span>
        </div>
      </a>

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

        <div className="hidden shrink-0 xl:flex xl:items-center xl:gap-3">
          
          {user ? (
            <div className="relative">
              {/* Trigger */}
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition rounded-xl px-3 py-1.5 border border-polri-gold/20 text-left outline-none cursor-pointer"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-polri-gold text-polri-brownDark font-black text-xs uppercase overflow-hidden">
                  {user.foto ? (
                    <img src={user.foto} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="text-left text-[10px] leading-tight pr-1">
                  <p className="font-black text-white max-w-[100px] truncate" title={user.name}>{user.name}</p>
                  <p className="text-polri-goldSoft font-bold capitalize mt-0.5">{user.role.replace('_', ' ')}</p>
                </div>
                <svg className="h-3 w-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <>
                  {/* Click outside backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />
                  
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-neutral-900 border border-neutral-850 shadow-xl py-2 z-50 animate-scaleUp">
                    {/* Header info */}
                    <div className="px-4 py-2 border-b border-neutral-800">
                      <p className="text-xs font-black text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-polri-goldSoft font-bold capitalize mt-0.5">{user.role.replace('_', ' ')}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={`/admin/dashboard?role=${user.role}&module=Profil Saya`}
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex w-full items-center px-4 py-2.5 text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                      >
                        <svg className="h-4 w-4 mr-2.5 text-polri-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profil Saya
                      </Link>

                      {['super_admin', 'admin', 'stakeholder'].includes(user.role) && (
                        <Link
                          href={`/admin/dashboard?role=${user.role}&module=Beranda`}
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex w-full items-center px-4 py-2.5 text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                        >
                          <svg className="h-4 w-4 mr-2.5 text-polri-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Dasbor CMS
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-neutral-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          handleLogout()
                        }}
                        className="flex w-full items-center px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/20 transition text-left cursor-pointer"
                      >
                        <svg className="h-4 w-4 mr-2.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar Akun
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-polri-gold px-4 text-xs font-bold text-polri-brownDark transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              Login
            </Link>
          )}
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
            {user ? (
              <div className="flex items-center justify-between rounded-lg bg-white/10 p-3 border border-polri-gold/20">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-polri-gold text-polri-brownDark font-black text-sm uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left text-xs leading-tight">
                    <p className="font-black text-white">{user.name}</p>
                    <p className="text-polri-goldSoft font-bold capitalize mt-0.5">{user.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/dashboard?role=${user.role}&module=Profil Saya`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-polri-maroon text-white px-3 py-1.5 text-xs font-bold transition hover:bg-polri-brownDark border border-polri-gold/20"
                  >
                    Profil
                  </Link>
                  {['super_admin', 'admin', 'stakeholder'].includes(user.role) && (
                    <Link
                      href={`/admin/dashboard?role=${user.role}&module=Beranda`}
                      onClick={() => setOpen(false)}
                      className="rounded-lg bg-polri-gold text-polri-brownDark px-3 py-1.5 text-xs font-bold transition hover:bg-polri-gold/90 border border-polri-gold/20"
                    >
                      CMS
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-neutral-800 text-neutral-400 px-3 py-1.5 text-xs font-bold transition hover:text-white border border-neutral-750"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-center rounded-lg bg-polri-gold text-polri-brownDark py-2.5 text-sm font-bold shadow-soft transition hover:bg-polri-gold/90"
              >
                Login Akun Internal
              </Link>
            )}

            {filteredNavigation.map((item) => {
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
