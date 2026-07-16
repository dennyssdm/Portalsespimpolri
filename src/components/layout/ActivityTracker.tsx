'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { apiFetch } from '@/lib/api'

export function ActivityTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    const timer = setTimeout(() => {
      let user = null
      try {
        const userJson = sessionStorage.getItem('sespim_user')
        if (userJson) {
          user = JSON.parse(userJson)
        }
      } catch (err) {
        console.warn('Failed to parse sespim_user from sessionStorage:', err)
      }

      // Ignore logging administrative dashboard operations inside activity to avoid log flooding
      if (pathname.startsWith('/admin')) {
        return
      }

      const payload = {
        userId: user?.id || null,
        name: user?.name || null,
        nrp_nip: user?.nrp_nip || null,
        role: user?.role || null,
        action: user 
          ? `Mengakses halaman ${pathname}` 
          : `Mengakses halaman publik ${pathname}`
      }

      apiFetch('/api/activity/log', {
        method: 'POST',
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.warn('Failed to log page visit activity:', err)
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
