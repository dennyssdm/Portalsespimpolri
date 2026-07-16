'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { apiFetch } from '@/lib/api'

export function ActivityTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Dispatch saved visitor number on mount if exists
    const cachedNum = sessionStorage.getItem('sespim_visitor_num')
    if (cachedNum) {
      window.dispatchEvent(new CustomEvent('sespim_visitor_number', { detail: Number(cachedNum) }))
    }

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
      })
      .then(res => res.json())
      .then((json: { visitorNumber?: number }) => {
        if (json.visitorNumber) {
          sessionStorage.setItem('sespim_visitor_num', String(json.visitorNumber))
          window.dispatchEvent(new CustomEvent('sespim_visitor_number', { detail: json.visitorNumber }))
        }
      })
      .catch((err) => {
        console.warn('Failed to log page visit activity:', err)
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
