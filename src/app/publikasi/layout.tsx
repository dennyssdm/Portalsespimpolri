'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PublikasiLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const userJson = sessionStorage.getItem('sespim_user')
    if (!userJson) {
      router.push('/login?message=unauthorized&redirect=/publikasi')
    } else {
      const user = JSON.parse(userJson)
      // Publikasi is restricted to internal roles: admin, super_admin, widyaiswara, serdik, stakeholder
      if (['admin', 'super_admin', 'widyaiswara', 'serdik', 'stakeholder'].includes(user.role)) {
        setAuthorized(true)
      } else {
        router.push('/login?message=forbidden')
      }
    }
  }, [router])

  if (!authorized) {
    return (
      <div className="min-h-screen bg-polri-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-polri-maroon border-t-transparent"></div>
          <p className="text-xs font-bold text-polri-brownDark">Memeriksa Hak Akses Publikasi...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
