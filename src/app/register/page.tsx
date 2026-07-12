'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { API_BASE_URL } from '@/lib/api'
import { 
  KeyIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

type RegisterRole = 'serdik' | 'widyaiswara' | 'admin'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial role from search params or default to serdik
  const initialRole = searchParams.get('role') as RegisterRole
  const [role, setRole] = useState<RegisterRole>(
    ['serdik', 'widyaiswara', 'admin'].includes(initialRole) ? initialRole : 'serdik'
  )

  // Fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nrpNip, setNrpNip] = useState('') // NRP or NIP
  
  // Serdik Specific
  const [program, setProgram] = useState('sespimti')
  const [angkatan, setAngkatan] = useState('Dikreg-35')
  const [pangkat, setPangkat] = useState('AKBP')
  const [noSerdik, setNoSerdik] = useState('')
  const [instansiPolri, setInstansiPolri] = useState('')
  const [kementerianLembaga, setKementerianLembaga] = useState('')
  const [negaraAsal, setNegaraAsal] = useState('Indonesia')

  // Widyaiswara Specific
  const [keahlian, setKeahlian] = useState('')
  const [sertifikasi, setSertifikasi] = useState('LSP Lemdiklat Polri')

  // Admin Specific
  const [inviteCode, setInviteCode] = useState('')
  const [inviteCodeValid, setInviteCodeValid] = useState<boolean | null>(null)

  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'Weak' | 'Medium' | 'Strong'>('Weak')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength('Weak')
      return
    }
    let score = 0
    if (password.length >= 8) score++
    if (/[0-9]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[!@#$%^&*]/.test(password)) score++

    if (score <= 1) setPasswordStrength('Weak')
    else if (score === 2 || score === 3) setPasswordStrength('Medium')
    else setPasswordStrength('Strong')
  }, [password])

  // Mock Invitation Code validation for Staf
  useEffect(() => {
    if (!inviteCode) {
      setInviteCodeValid(null)
      return
    }
    // Mock code check
    if (inviteCode.toUpperCase() === 'SESPIM-ADMIN-2026') {
      setInviteCodeValid(true)
    } else {
      setInviteCodeValid(false)
    }
  }, [inviteCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok!')
      return
    }
    if (role === 'admin' && inviteCodeValid !== true) {
      setErrorMsg('Kode undangan admin tidak valid!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          nrp_nip: nrpNip,
          phone,
          password,
          role,
          role_label: getRoleLabel(role),
          keahlian: role === 'widyaiswara' ? keahlian : undefined,
          sertifikasi: role === 'widyaiswara' ? sertifikasi : undefined,
          program: role === 'serdik' ? program : undefined,
          angkatan: role === 'serdik' ? angkatan : undefined,
          pangkat: role === 'serdik' ? pangkat : undefined,
          no_serdik: role === 'serdik' ? noSerdik : undefined,
          instansi_polri: role === 'serdik' ? instansiPolri : undefined,
          kementerian_lembaga: role === 'serdik' ? kementerianLembaga : undefined,
          negara_asal: role === 'serdik' ? negaraAsal : undefined
        })
      })

      const data = await response.json()
      if (response.ok && data.status === 'success') {
        setRegistered(true)
      } else {
        setErrorMsg(data.message || 'Pendaftaran gagal. Silakan coba lagi.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setErrorMsg('Gagal terhubung ke server API. Pastikan server backend Anda menyala.')
    } finally {
      setLoading(false)
    }
  }

  const getRoleLabel = (r: RegisterRole) => {
    switch (r) {
      case 'serdik': return 'User Serdik (Peserta Didik)'
      case 'widyaiswara': return 'User Widyaiswara (Tenaga Pendidik)'
      case 'admin': return 'Admin (Staf)'
    }
  }

  return (
    <main className="bg-polri-cream min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-polri-radial opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-polri-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-polri-maroon/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center">
        {/* Back link */}
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-polri-brownDark/80 hover:text-polri-maroon transition">
          <ArrowLeftIcon className="h-4 w-4" />
          Kembali ke Halaman Login
        </Link>

        {registered ? (
          /* SUCCESS STATE */
          <div className="w-full max-w-lg rounded-3xl border border-polri-gold/30 bg-white p-8 shadow-soft text-center animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircleIcon className="h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-polri-brownDark">Pendaftaran Berhasil!</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Akun Anda telah berhasil terdaftar sebagai <strong>{getRoleLabel(role)}</strong> dengan nama <strong>{name}</strong>.
            </p>
            {role === 'admin' ? (
              <p className="mt-2 text-xs text-neutral-500 rounded-lg bg-polri-cream/60 p-3 leading-5 border border-polri-gold/20">
                Sebagai akun staf admin, registrasi Anda telah diverifikasi oleh sistem melalui kode undangan strategis. Anda dapat langsung menggunakan akun ini.
              </p>
            ) : (
              <p className="mt-2 text-xs text-neutral-500 rounded-lg bg-polri-cream/60 p-3 leading-5 border border-polri-gold/20">
                Pendaftaran Anda akan ditinjau oleh operator data Sespim Polri. Anda dapat mencoba login sekarang menggunakan kredensial yang didaftarkan.
              </p>
            )}

            <button
              onClick={() => router.push('/login')}
              type="button"
              className="mt-6 w-full rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft"
            >
              Masuk Sekarang
            </button>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="w-full max-w-xl rounded-3xl border border-polri-gold/30 bg-white p-6 shadow-soft md:p-8 animate-fadeIn">
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
              <h2 className="mt-4 text-2xl font-black text-polri-brownDark">Daftar Akun Baru</h2>
              <p className="mt-1 text-sm text-neutral-500">Buat akun akses portal resmi Sespim</p>
            </div>

            {/* Role Tab Selector */}
            <div className="mt-6 grid grid-cols-3 gap-2 p-1 bg-polri-cream/60 rounded-2xl">
              {[
                { key: 'serdik', label: 'Serdik', icon: AcademicCapIcon },
                { key: 'widyaiswara', label: 'Widyaiswara', icon: UserGroupIcon },
                { key: 'admin', label: 'Staf Admin', icon: KeyIcon }
              ].map((item) => {
                const Icon = item.icon
                const active = role === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key as any)}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black transition ${
                      active 
                        ? 'bg-white text-polri-maroon shadow-sm border border-polri-gold/25' 
                        : 'text-neutral-600 hover:bg-white/40'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              {errorMsg && (
                <div className="col-span-1 sm:col-span-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 flex items-start gap-2 leading-5 animate-fadeIn">
                  <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {/* Common Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: AKBP Budi Utomo"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>
                 <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Nomor HP / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Dynamic Fields: Serdik */}
              {role === 'serdik' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">NRP / NIP Serdik</label>
                    <input
                      type="text"
                      required
                      value={nrpNip}
                      onChange={(e) => setNrpNip(e.target.value)}
                      placeholder="Contoh: 84081234"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Program Pendidikan</label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon"
                    >
                      <option value="sespimti">SESPIMTI POLRI</option>
                      <option value="sespimmen">SESPIMMEN POLRI</option>
                      <option value="sespimma">SESPIMMA POLRI</option>
                      <option value="sppk">SPPK POLRI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Angkatan</label>
                    <input
                      type="text"
                      required
                      value={angkatan}
                      onChange={(e) => setAngkatan(e.target.value)}
                      placeholder="Contoh: Dikreg-35"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Pangkat Saat Ini</label>
                    <input
                      type="text"
                      required
                      value={pangkat}
                      onChange={(e) => setPangkat(e.target.value)}
                      placeholder="Contoh: AKBP"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">No Serdik</label>
                    <input
                      type="text"
                      required
                      value={noSerdik}
                      onChange={(e) => setNoSerdik(e.target.value)}
                      placeholder="Contoh: 2026-X-045"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Instansi Polri (Satker/Polda)</label>
                    <input
                      type="text"
                      value={instansiPolri}
                      onChange={(e) => setInstansiPolri(e.target.value)}
                      placeholder="Contoh: Polda Metro Jaya / Bareskrim"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Kementerian / Lembaga (Jika Non-Polri)</label>
                    <input
                      type="text"
                      value={kementerianLembaga}
                      onChange={(e) => setKementerianLembaga(e.target.value)}
                      placeholder="Contoh: Kemenkumham / BIN"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Negara Asal</label>
                    <input
                      type="text"
                      required
                      value={negaraAsal}
                      onChange={(e) => setNegaraAsal(e.target.value)}
                      placeholder="Contoh: Indonesia"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Fields: Widyaiswara */}
              {role === 'widyaiswara' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">NIP / NIDN Tenaga Pendidik</label>
                    <input
                      type="text"
                      required
                      value={nrpNip}
                      onChange={(e) => setNrpNip(e.target.value)}
                      placeholder="Contoh: 197008121995031002"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Bidang Keahlian Utama</label>
                    <input
                      type="text"
                      required
                      value={keahlian}
                      onChange={(e) => setKeahlian(e.target.value)}
                      placeholder="Contoh: Kepemimpinan Strategis"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Sertifikasi Utama</label>
                    <input
                      type="text"
                      required
                      value={sertifikasi}
                      onChange={(e) => setSertifikasi(e.target.value)}
                      placeholder="Contoh: LSP Lemdiklat Polri / BNSP Kepolisian"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Fields: Admin */}
              {role === 'admin' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">NRP / NIP / STAF ID</label>
                    <input
                      type="text"
                      required
                      value={nrpNip}
                      onChange={(e) => setNrpNip(e.target.value)}
                      placeholder="Contoh: 200108242022031001"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Kode Undangan Staf</label>
                      {inviteCodeValid === true && <span className="text-[10px] font-black text-emerald-600">VALID</span>}
                      {inviteCodeValid === false && <span className="text-[10px] font-black text-polri-red">TIDAK VALID</span>}
                    </div>
                    <input
                      type="text"
                      required
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="Masukkan kode rahasia"
                      className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                    />
                  </div>
                  <div className="col-span-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex items-start gap-2 leading-5">
                    <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-amber-600" />
                    <span>
                      Registrasi akun staf admin membutuhkan kode undangan resmi untuk verifikasi keamanan (Gunakan kode demo: <strong>SESPIM-ADMIN-2026</strong>).
                    </span>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Kata Sandi</label>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      passwordStrength === 'Strong' ? 'text-emerald-600' :
                      passwordStrength === 'Medium' ? 'text-amber-500' : 'text-neutral-400'
                    }`}>
                      {passwordStrength}
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                  {/* Visual Strength Bar */}
                  {password && (
                    <div className="mt-2 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${
                        passwordStrength === 'Strong' ? 'w-full bg-emerald-500' :
                        passwordStrength === 'Medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-polri-red'
                      }`} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Ulangi Kata Sandi</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft disabled:bg-neutral-400"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Membuat Akun...
                  </div>
                ) : (
                  'Daftar Akun Baru'
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-neutral-100 pt-4 text-center">
              <p className="text-xs text-neutral-500">
                Sudah memiliki akun?{' '}
                <Link href="/login" className="font-bold text-polri-maroon hover:underline">
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}
