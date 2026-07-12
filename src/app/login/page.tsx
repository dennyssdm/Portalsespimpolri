'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { dummyAccounts } from '@/data/dummyAccounts'
import { API_BASE_URL } from '@/lib/api'
import { 
  KeyIcon, 
  LockClosedIcon, 
  ShieldCheckIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  CircleStackIcon,
  EyeIcon,
  InboxArrowDownIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

type RoleType = 'super_admin' | 'stakeholder' | 'admin' | 'serdik' | 'widyaiswara'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [role, setRole] = useState<RoleType>('serdik')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    name: string
    roleName: string
    roleKey: RoleType
    identifier: string
  } | null>(null)

  // SIAP SESPIM SSO States
  const [ssoModalOpen, setSsoModalOpen] = useState(false)
  const [ssoIdentifier, setSsoIdentifier] = useState('')
  const [ssoPassword, setSsoPassword] = useState('')
  const [ssoLoading, setSsoLoading] = useState(false)
  const [ssoError, setSsoError] = useState<string | null>(null)

  const handleSSOSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSsoLoading(true)
    setSsoError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: ssoIdentifier,
          password: ssoPassword
        })
      })

      const data = await response.json()
      if (response.ok && data.status === 'success') {
        const apiUser = data.data.user
        const token = data.token
        const sessionUser = {
          id: apiUser.id,
          name: apiUser.name,
          nrpNip: apiUser.nrp_nip,
          phone: apiUser.phone,
          role: apiUser.role,
          roleLabel: apiUser.role_label,
          gelar: apiUser.gelar || '',
          pangkat: apiUser.pangkat || '',
          email: apiUser.email || '',
          foto: apiUser.foto || '',
          no_serdik: apiUser.no_serdik || '',
          instansi_polri: apiUser.instansi_polri || '',
          kementerian_lembaga: apiUser.kementerian_lembaga || '',
          negara_asal: apiUser.negara_asal || '',
          details: apiUser.details || {}
        }

        sessionStorage.setItem('sespim_token', token)
        sessionStorage.setItem('sespim_user', JSON.stringify(sessionUser))
        window.dispatchEvent(new Event('sespim_auth_change'))

        setAuthenticatedUser({
          name: sessionUser.name,
          roleName: sessionUser.roleLabel,
          roleKey: sessionUser.role as RoleType,
          identifier: sessionUser.nrpNip
        })

        setSsoLoading(false)
        setSsoModalOpen(false)

        // Redirect
        if (sessionUser.role === 'super_admin' || sessionUser.role === 'admin' || sessionUser.role === 'stakeholder') {
          router.push(`/admin/dashboard?role=${sessionUser.role}`)
        } else {
          const redirectUrl = searchParams.get('redirect')
          router.push(redirectUrl || '/')
        }
        return
      }
    } catch (err) {
      console.warn('API SSO login failed, falling back to dummy accounts:', err)
    }

    setTimeout(() => {
      const found = dummyAccounts.find(
        (acc) => 
          acc.nrpNip === ssoIdentifier && 
          acc.password === ssoPassword
      )

      if (!found) {
        setSsoError('NRP/NIP SIAP SESPIM tidak ditemukan atau kata sandi salah!')
        setSsoLoading(false)
        return
      }

      setRole(found.role)
      setIsReadOnly(false)

      const mockSsoUser = {
        id: 2,
        name: found.name,
        nrpNip: found.nrpNip,
        phone: found.phone,
        role: found.role,
        roleLabel: found.roleLabel,
        gelar: found.details?.Pangkat || '',
        pangkat: found.details?.Pangkat || '',
        email: '',
        foto: '',
        no_serdik: found.details?.NRP || '',
        instansi_polri: '',
        kementerian_lembaga: '',
        negara_asal: 'Indonesia',
        details: found.details || {}
      }
      sessionStorage.setItem('sespim_user', JSON.stringify(mockSsoUser))
      sessionStorage.setItem('sespim_token', 'mock_sso_siap_token')
      window.dispatchEvent(new Event('sespim_auth_change'))

      setAuthenticatedUser({
        name: found.name,
        roleName: found.roleLabel,
        roleKey: found.role,
        identifier: found.nrpNip
      })

      setSsoLoading(false)
      setSsoModalOpen(false)

      // Redirect
      if (found.role === 'super_admin' || found.role === 'admin' || found.role === 'stakeholder') {
        router.push(`/admin/dashboard?role=${found.role}`)
      } else {
        const redirectUrl = searchParams.get('redirect')
        router.push(redirectUrl || '/')
      }
    }, 1200)
  }

  const handleFastSSO = (nrp: string) => {
    setSsoLoading(true)
    setSsoError(null)

    setTimeout(() => {
      const found = dummyAccounts.find(acc => acc.nrpNip === nrp)
      if (found) {
        setRole(found.role)
        setIsReadOnly(false)
        const mockSsoUser = {
          id: 2,
          name: found.name,
          nrpNip: found.nrpNip,
          phone: found.phone,
          role: found.role,
          roleLabel: found.roleLabel,
          gelar: found.details?.Pangkat || '',
          pangkat: found.details?.Pangkat || '',
          email: '',
          foto: '',
          no_serdik: found.details?.NRP || '',
          instansi_polri: '',
          kementerian_lembaga: '',
          negara_asal: 'Indonesia',
          details: found.details || {}
        }
        sessionStorage.setItem('sespim_user', JSON.stringify(mockSsoUser))
        sessionStorage.setItem('sespim_token', 'mock_sso_siap_token')
        window.dispatchEvent(new Event('sespim_auth_change'))
        setAuthenticatedUser({
          name: found.name,
          roleName: found.roleLabel,
          roleKey: found.role,
          identifier: found.nrpNip
        })
        setSsoLoading(false)
        setSsoModalOpen(false)
        const redirectUrl = searchParams.get('redirect')
        router.push(redirectUrl || '/')
      }
    }, 1000)
  }
  const [loginError, setLoginError] = useState<string | null>(null)

  // Handle Role tab change
  const selectRole = (selected: 'serdik' | 'widyaiswara' | 'admin' | 'super_admin') => {
    if (selected === 'super_admin') {
      if (isReadOnly) {
        setRole('stakeholder')
      } else {
        setRole('super_admin')
      }
    } else {
      setRole(selected)
    }
  }

  const handleReadOnlyToggle = (checked: boolean) => {
    setIsReadOnly(checked)
    if (role === 'super_admin' && checked) {
      setRole('stakeholder')
    } else if (role === 'stakeholder' && !checked) {
      setRole('super_admin')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError(null)

    try {
      // 1. Try to login with the real API backend
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          password
        })
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        const apiUser = data.data.user
        const token = data.token

        const sessionUser = {
          id: apiUser.id,
          name: apiUser.name,
          nrpNip: apiUser.nrp_nip,
          phone: apiUser.phone,
          role: apiUser.role,
          roleLabel: apiUser.role_label,
          gelar: apiUser.gelar || '',
          pangkat: apiUser.pangkat || '',
          email: apiUser.email || '',
          foto: apiUser.foto || '',
          no_serdik: apiUser.no_serdik || '',
          instansi_polri: apiUser.instansi_polri || '',
          kementerian_lembaga: apiUser.kementerian_lembaga || '',
          negara_asal: apiUser.negara_asal || '',
          details: apiUser.details || {}
        }

        // Set session storage
        sessionStorage.setItem('sespim_token', token)
        sessionStorage.setItem('sespim_user', JSON.stringify(sessionUser))
        window.dispatchEvent(new Event('sespim_auth_change'))

        setAuthenticatedUser({
          name: sessionUser.name,
          roleName: sessionUser.roleLabel,
          roleKey: sessionUser.role as RoleType,
          identifier: sessionUser.nrpNip
        })

        setLoading(false)

        // Redirect
        if (sessionUser.role === 'super_admin' || sessionUser.role === 'admin' || sessionUser.role === 'stakeholder') {
          router.push(`/admin/dashboard?role=${sessionUser.role}`)
        } else {
          const redirectUrl = searchParams.get('redirect')
          router.push(redirectUrl || '/')
        }
        return
      } else {
        console.warn('API login failed:', data.message || response.statusText)
      }
    } catch (err) {
      console.warn('Backend API connection failed, falling back to dummyAccounts:', err)
    }

    // 2. Fallback to Local Dummy Accounts
    setTimeout(() => {
      setLoading(false)
      const found = dummyAccounts.find(
        (acc) => 
          (acc.nrpNip === identifier || acc.phone === identifier) && 
          acc.password === password
      )

      if (!found) {
        setLoginError('NRP/NIP/No Whatsapp atau Kata Sandi salah!')
        return
      }

      // Auto-configure roles for UI consistency
      setRole(found.role)
      if (found.role === 'stakeholder') {
        setIsReadOnly(true)
      } else {
        setIsReadOnly(false)
      }

      const mockSessionUser = {
        id: 2,
        name: found.name,
        nrpNip: found.nrpNip,
        phone: found.phone,
        role: found.role,
        roleLabel: found.roleLabel,
        gelar: found.details?.Pangkat || '',
        pangkat: found.details?.Pangkat || '',
        email: '',
        foto: '',
        no_serdik: found.details?.NRP || '',
        instansi_polri: '',
        kementerian_lembaga: '',
        negara_asal: 'Indonesia',
        details: found.details || {}
      }
      sessionStorage.setItem('sespim_user', JSON.stringify(mockSessionUser))
      sessionStorage.setItem('sespim_token', 'mock_fallback_token')
      window.dispatchEvent(new Event('sespim_auth_change'))

      setAuthenticatedUser({
        name: found.name,
        roleName: found.roleLabel,
        roleKey: found.role,
        identifier: found.nrpNip
      })

      // Redirect super_admin, admin, and stakeholder to admin dashboard, others stay on public portal
      if (found.role === 'super_admin' || found.role === 'admin' || found.role === 'stakeholder') {
        router.push(`/admin/dashboard?role=${found.role}`)
      } else {
        const redirectUrl = searchParams.get('redirect')
        router.push(redirectUrl || '/')
      }
    }, 1000)
  }

  const getRoleLabel = (r: RoleType) => {
    switch (r) {
      case 'super_admin': return 'Super Admin (All Action)'
      case 'stakeholder': return 'Super Admin Read Only (Stakeholder)'
      case 'admin': return 'Admin (Staf)'
      case 'serdik': return 'User Serdik (Peserta Didik)'
      case 'widyaiswara': return 'User Widyaiswara (Tenaga Pendidik)'
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('sespim_user')
    window.dispatchEvent(new Event('sespim_auth_change'))
    setAuthenticatedUser(null)
    setIdentifier('')
    setPassword('')
  }

  return (
    <main className="bg-polri-cream min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-polri-radial opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-polri-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-polri-maroon/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center">
        {/* Back Link to Portal */}
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-polri-brownDark/80 hover:text-polri-maroon transition">
          <ArrowLeftIcon className="h-4 w-4" />
          Kembali ke Portal Utama
        </Link>

        {authenticatedUser ? (
          /* MOCK DASHBOARD SIMULATION */
          <div className="w-full max-w-4xl rounded-3xl border border-polri-gold/30 bg-white p-6 shadow-soft md:p-10 animate-fadeIn">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-neutral-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-polri-gold bg-polri-cream p-1 shrink-0">
                  <Image
                    src="/images/logo-sespim.png"
                    alt="Logo Sespim"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-polri-brownDark md:text-2xl">{authenticatedUser.name}</h2>
                  <p className="mt-1 text-sm font-bold text-polri-maroon uppercase tracking-wider">{authenticatedUser.roleName}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-1">ID/Identifier: {authenticatedUser.identifier}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-bold text-neutral-600 hover:bg-neutral-50 hover:text-polri-maroon transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Keluar Akun
              </button>
            </div>

            {/* DASHBOARD BODY BASED ON ROLES */}
            <div className="mt-8">
              <h3 className="text-lg font-black text-polri-brownDark">Panel Simulasi Fungsionalitas Role</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Sebagai simulasi front-end baseline, berikut adalah widget dan aksi prioritas yang terproteksi khusus untuk role Anda.
              </p>

              {/* ROLE: SUPER ADMIN */}
              {authenticatedUser.roleKey === 'super_admin' && (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5 col-span-2">
                    <h4 className="font-black text-polri-brownDark">Aktivitas Sistem Terbaru (Semua Akses)</h4>
                    <div className="mt-4 space-y-3 font-mono text-xs text-neutral-600">
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span>[07/07 17:21] Backup database selesai</span>
                        <span className="text-emerald-600">SUKSES</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span>[07/07 17:15] Update modul inpassing oleh Widyaiswara</span>
                        <span className="text-blue-600">INFO</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span>[07/07 16:42] User admin baru Bripda Bagus dibuat</span>
                        <span className="text-emerald-600">SUKSES</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Kontrol Sistem</h4>
                    <div className="mt-4 grid gap-2.5">
                      <button type="button" className="w-full rounded-xl bg-polri-maroon py-2 text-xs font-bold text-white hover:bg-polri-brownDark transition">
                        Kelola Pengguna
                      </button>
                      <button type="button" className="w-full rounded-xl bg-polri-brownDark py-2 text-xs font-bold text-white hover:bg-polri-maroon transition">
                        Ekspor Audit Log
                      </button>
                      <button type="button" className="w-full rounded-xl border border-polri-gold py-2 text-xs font-bold text-polri-brownDark hover:bg-polri-cream transition">
                        Sinkronisasi Database
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ROLE: STAKEHOLDER (SUPER ADMIN READ-ONLY) */}
              {authenticatedUser.roleKey === 'stakeholder' && (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5 col-span-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-polri-brownDark">Analitik Kinerja & Audit Sistem (Read-Only)</h4>
                      <span className="rounded-full bg-polri-gold/20 px-2.5 py-0.5 text-xs font-black text-polri-brown">READ ONLY</span>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white p-4 shadow-sm">
                        <p className="text-xs text-neutral-500">Total Kunjungan Portal</p>
                        <p className="text-2xl font-black text-polri-brownDark mt-1">12,482</p>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-sm">
                        <p className="text-xs text-neutral-500">Pemberitaan Aktif</p>
                        <p className="text-2xl font-black text-polri-brownDark mt-1">1,053</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 opacity-75 relative">
                    <h4 className="font-black text-neutral-400">Kontrol Sistem (Dinonaktifkan)</h4>
                    <div className="mt-4 grid gap-2.5">
                      <button disabled type="button" className="w-full rounded-xl bg-neutral-200 py-2 text-xs font-bold text-neutral-400 cursor-not-allowed">
                        Kelola Pengguna
                      </button>
                      <button disabled type="button" className="w-full rounded-xl bg-neutral-200 py-2 text-xs font-bold text-neutral-400 cursor-not-allowed">
                        Ekspor Audit Log
                      </button>
                    </div>
                    <p className="text-[10px] text-polri-red font-semibold mt-4 text-center">
                      Akses Anda adalah stakeholder (read-only), modifikasi sistem dibatasi.
                    </p>
                  </div>
                </div>
              )}

              {/* ROLE: ADMIN (STAF) */}
              {authenticatedUser.roleKey === 'admin' && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Persetujuan Publikasi Berita</h4>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm text-xs">
                        <div>
                          <p className="font-black text-polri-brownDark">Kunjungan Kerja Kasespim ke Polda Jabar</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">Penulis: Bripka Ari</p>
                        </div>
                        <button type="button" className="rounded-lg bg-polri-maroon px-3 py-1.5 font-bold text-white hover:bg-polri-brownDark transition">
                          Setujui
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Menu Staf Admin</h4>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                      <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-polri-gold shrink-0" /> Kelola agenda kegiatan pendidikan harian</li>
                      <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-polri-gold shrink-0" /> Unggah dokumen template akademik baru</li>
                      <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-polri-gold shrink-0" /> Verifikasi data pendaftaran Serdik baru</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ROLE: USER WIDYAISWARA */}
              {authenticatedUser.roleKey === 'widyaiswara' && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Dasbor Tenaga Pendidik</h4>
                    <div className="mt-4 space-y-3">
                      <div className="bg-white p-4 rounded-xl shadow-sm text-sm">
                        <p className="font-black text-polri-brownDark">Mata Pelajaran: Kepemimpinan Strategis</p>
                        <p className="text-xs text-neutral-500 mt-1">Kelas Aktif: Sespimti Dikreg-35</p>
                        <div className="mt-3 flex gap-2">
                          <button type="button" className="rounded-lg bg-polri-maroon px-3 py-1.5 text-xs font-bold text-white hover:bg-polri-brownDark transition">
                            Input Nilai
                          </button>
                          <button type="button" className="rounded-lg border border-polri-gold px-3 py-1.5 text-xs font-bold text-polri-brownDark hover:bg-polri-cream transition">
                            Unggah Materi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Layanan Akademik WI</h4>
                    <div className="mt-4 grid gap-2">
                      <Link href="/widyaiswara/inpassing" className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-polri-gold/15 text-sm hover:border-polri-gold transition">
                        <span>Workspace Inpassing WI</span>
                        <span className="text-xs font-bold text-polri-maroon">Masuk &rarr;</span>
                      </Link>
                      <Link href="/widyaiswara/pembimbingan-naskap" className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-polri-gold/15 text-sm hover:border-polri-gold transition">
                        <span>Pembimbingan Naskap/NASTRAP</span>
                        <span className="text-xs font-bold text-polri-maroon">Masuk &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ROLE: USER SERDIK */}
              {authenticatedUser.roleKey === 'serdik' && (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5 col-span-2">
                    <h4 className="font-black text-polri-brownDark">Progres Akademik Serdik</h4>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
                        <span>Kurikulum Sespimti &bull; Semester 1</span>
                        <span>40% Selesai</span>
                      </div>
                      <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                        <div className="h-full bg-polri-gold" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <p className="text-neutral-500">Materi Terbaca</p>
                        <p className="text-lg font-black text-polri-brownDark mt-1">12 / 30 File</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <p className="text-neutral-500">Kehadiran Kelas</p>
                        <p className="text-lg font-black text-polri-brownDark mt-1">98%</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-polri-gold/20 bg-polri-cream/30 p-5">
                    <h4 className="font-black text-polri-brownDark">Layanan Cepat Serdik</h4>
                    <div className="mt-4 grid gap-2">
                      <Link href="/sarana-prasarana/cek-plagiarisme" className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg text-xs hover:text-polri-maroon shadow-sm">
                        <span>Cek Plagiarisme Turnitin</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link href="/sarana-prasarana/lms-siapsespim" className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg text-xs hover:text-polri-maroon shadow-sm">
                        <span>LMS SIAPSESPIM</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link href="/unduhan" className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg text-xs hover:text-polri-maroon shadow-sm">
                        <span>Unduhan Template NASTRAP</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LOGIN FORM PANEL */
          <div className="w-full max-w-lg rounded-3xl border border-polri-gold/30 bg-white p-6 shadow-soft md:p-8 animate-fadeIn">
            {/* Header Form */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center">
                <Image
                  src="/images/logo-sespim.png"
                  alt="Logo Sespim"
                  width={306}
                  height={323}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="mt-4 text-2xl font-black text-polri-brownDark">Login Portal Sespim</h2>
              <p className="mt-1 text-sm text-neutral-500">Silakan masukkan kredensial Anda untuk masuk ke sistem</p>
            </div>

            {loginError && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-polri-red leading-5">
                {loginError}
              </div>
            )}

            {message === 'unauthorized' && (
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs font-semibold text-amber-800 leading-5">
                Silakan login terlebih dahulu untuk mengakses menu yang dilindungi.
              </div>
            )}

            {message === 'forbidden' && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-polri-red leading-5">
                Akun Anda tidak memiliki izin akses ke menu tersebut. Silakan gunakan kredensial yang sesuai.
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">NRP / NIP / No WhatsApp</label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Contoh: 197411152009121001 atau 081234567890"
                    className="w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Kata Sandi</label>
                  <Link href="/lupa-password" className="text-xs font-bold text-polri-maroon hover:underline transition">
                    Lupa Kata Sandi?
                  </Link>
                </div>
                <div className="relative mt-2">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Memproses...
                  </div>
                ) : (
                  'Masuk ke Portal'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] font-black uppercase tracking-wider text-neutral-400">Atau</span>
            </div>

            {/* SSO Button */}
            <button
              type="button"
              onClick={() => setSsoModalOpen(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-polri-gold/50 bg-polri-cream hover:bg-white px-4 py-3 text-sm font-bold text-polri-brownDark hover:border-polri-maroon hover:shadow-soft transition"
            >
              <KeyIcon className="h-5 w-5 text-polri-gold shrink-0" />
              <span>Masuk dengan SIAP SESPIM (SSO)</span>
            </button>

            {/* Bottom Actions */}
            <div className="mt-6 border-t border-neutral-100 pt-4 text-center">
              <p className="text-xs text-neutral-500">
                Belum memiliki akun?{' '}
                <Link href="/register" className="font-bold text-polri-maroon hover:underline">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        )}


      </Container>

      {/* SSO MODAL OVERLAY */}
      {ssoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-polri-gold/30 bg-white p-6 shadow-2xl relative animate-scaleUp">
            
            {/* Close button */}
            <button 
              onClick={() => setSsoModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition"
              aria-label="Tutup SSO"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-polri-cream rounded-full border border-polri-gold/30">
                <ShieldCheckIcon className="h-6 w-6 text-polri-maroon" />
              </div>
              <h3 className="mt-3 text-lg font-black text-polri-brownDark">SIAP SESPIM SSO</h3>
              <p className="mt-1 text-xs text-neutral-500 font-semibold leading-relaxed">
                Autentikasi terintegrasi menggunakan akun resmi Lembaga Pendidikan Sespim Lemdiklat Polri.
              </p>
            </div>

            {ssoError && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-polri-red leading-5">
                {ssoError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSSOSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">NRP / NIP SIAP SESPIM</label>
                <input 
                  type="text"
                  required
                  value={ssoIdentifier}
                  onChange={(e) => setSsoIdentifier(e.target.value)}
                  placeholder="Masukkan NRP (contoh: 84081234)"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Kata Sandi SIAP</label>
                <input 
                  type="password"
                  required
                  value={ssoPassword}
                  onChange={(e) => setSsoPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                disabled={ssoLoading}
                className="w-full mt-4 flex items-center justify-center rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 font-bold text-white transition disabled:bg-neutral-400"
              >
                {ssoLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Menghubungkan...
                  </div>
                ) : (
                  'Otorisasi & Masuk'
                )}
              </button>
            </form>

            {/* Fast Demo Shortcuts */}
            <div className="mt-5 border-t border-neutral-100 pt-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 text-center mb-2">Akses Cepat Demo SSO</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFastSSO('84081234')}
                  disabled={ssoLoading}
                  className="text-[11px] font-bold bg-neutral-50 hover:bg-polri-cream hover:text-polri-maroon p-2 rounded-lg border border-neutral-100 transition text-center text-polri-brownDark"
                >
                  Akun Serdik (AKBP Deny)
                </button>
                <button
                  type="button"
                  onClick={() => handleFastSSO('197008121995031002')}
                  disabled={ssoLoading}
                  className="text-[11px] font-bold bg-neutral-50 hover:bg-polri-cream hover:text-polri-maroon p-2 rounded-lg border border-neutral-100 transition text-center text-polri-brownDark"
                >
                  Akun WI (Kombes Midi)
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-polri-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-polri-gold border-t-transparent"></div>
          <p className="text-xs font-bold text-polri-brownDark">Memuat Halaman Login...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
