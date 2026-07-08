'use client'

import { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FooterVisitorWidget } from '@/components/layout/FooterVisitorWidget'
import { internalLoginLink, navigation, socialLinks } from '@/data/navigation'
import { externalLinkProps } from '@/lib/links'
import type { SocialLink } from '@/types'
import { SearchBar } from '@/components/ui/SearchBar'


function SocialIcon({ platform }: { platform: SocialLink['platform'] }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.5" cy="7.7" r="1" fill="currentColor" />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M13.7 20v-7h2.4l.4-2.8h-2.8V8.5c0-.8.2-1.4 1.4-1.4h1.5V4.6c-.7-.1-1.4-.2-2.2-.2-2.3 0-3.9 1.4-3.9 4v1.8H8v2.8h2.5v7h3.2Z" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="m6 5 12 14M18 5 6 19" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      )
    case 'threads':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M16.8 10.8c-.4-3.1-2.1-4.8-5-4.8-3.4 0-5.7 2.5-5.7 6s2.3 6 5.9 6c2.8 0 5.1-1.6 5.1-4 0-2-1.5-3.3-4.6-3.3-2.2 0-3.5 1-3.5 2.5 0 1.3 1 2.2 2.5 2.2 1.7 0 2.9-1 2.9-2.5 0-2.3-2.4-3.4-5.7-2.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <rect x="4" y="6.5" width="16" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path fill="currentColor" d="m11 9.4 4.2 2.6L11 14.6V9.4Z" />
        </svg>
      )
  }
}

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<{
    name: string
    role: string
    roleLabel: string
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
      // If not logged in, convert 'Sarana Prasarana' top-level menu directly into 'Klinik Pratama' without children
      if (!showRestricted && item.href === '/sarana-prasarana') {
        return {
          label: 'Klinik Pratama',
          href: '/sarana-prasarana/klinik-pratama',
          description: 'Layanan Kesehatan Klinik Pratama Sespim Lemdiklat Polri.'
        }
      }
      return item
    })

  return (
    <footer className="bg-polri-brownDark text-white">
      <div className="border-t border-polri-gold/30">
        <Container className="py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                  <Image
                    src="/images/logo-sespim.png"
                    alt="Logo Sespim Polri"
                    width={306}
                    height={323}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wide">Sespim Polri</p>
                  <p className="text-sm text-polri-goldSoft">Lemdiklat Polri</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
                Portal resmi informasi kelembagaan, pendidikan, widyaiswara, publikasi, berita, dan layanan pendukung Sespim Lemdiklat Polri.
              </p>
              <div className="mt-6 max-w-xs">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-polri-goldSoft mb-2">Cari Konten Portal</p>
                <SearchBar />
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-polri-goldSoft">Media Sosial</p>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Media sosial Sespim Polri">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka ${social.label} Sespim Polri`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-polri-gold/40 bg-white/5 text-polri-goldSoft transition hover:border-polri-gold hover:bg-polri-gold hover:text-polri-brownDark"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={internalLoginLink.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-polri-gold/40 bg-white/5 px-4 py-2 text-sm font-black text-polri-goldSoft transition hover:border-polri-gold hover:bg-polri-gold hover:text-polri-brownDark"
                >
                  <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
                  {internalLoginLink.label}
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNavigation.slice(1, 7).map((item) => (
                <div key={item.href}>
                  <Link href={item.href} {...externalLinkProps(item.href)} className="font-bold text-polri-goldSoft hover:text-white">{item.label}</Link>
                  {item.children?.length ? (
                    <div className="mt-3 grid gap-2">
                      {item.children.slice(0, 4).map((child) => (
                        <Link key={child.href} href={child.href} {...externalLinkProps(child.href)} className="text-sm text-white/64 hover:text-polri-goldSoft">{child.label}</Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <FooterVisitorWidget />
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
            © 2026 Portal Resmi Sespim Lemdiklat Polri - Developed by Labinov Bagjianbang
          </div>
        </Container>
      </div>
    </footer>
  )
}
