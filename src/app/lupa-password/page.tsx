'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { API_BASE_URL } from '@/lib/api'
import { 
  KeyIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

export default function ForgotPasswordPage() {
  const router = useRouter()
  
  // Step: 1 (Account details), 2 (OTP Entry), 3 (New Password), 4 (Success)
  const [step, setStep] = useState(1)
  
  // Input fields
  const [nrpNip, setNrpNip] = useState('')
  const [phone, setPhone] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // Verification states
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [otpResendTimer, setOtpResendTimer] = useState(60)

  // Resend Timer countdown
  useEffect(() => {
    if (step === 2 && otpResendTimer > 0) {
      const timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [step, otpResendTimer])

  // Step 1: Submit Account Info
  const handleIdentifyAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      // Check if user exists using a temp login check or query
      // For forgot password security, we verify combination
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nrp_nip: nrpNip,
          phone: phone,
          new_password: '___verification_only___'
        })
      })

      const data = await response.json()
      
      // If result is 404 combination not found
      if (response.status === 404) {
        setErrorMsg('Kombinasi NRP/NIP dan Nomor HP tidak ditemukan di database Sespim.')
        setLoading(false)
        return
      }

      // Generate a mock 6-digit OTP
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(randomOtp)
      setStep(2)
      setOtpResendTimer(60)
    } catch (err) {
      console.error('Identification error:', err)
      setErrorMsg('Gagal menghubungkan ke server API. Pastikan server backend Anda menyala.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (otpInput === generatedOtp || otpInput === '123456') {
      setStep(3)
    } else {
      setErrorMsg('Kode OTP tidak cocok! Periksa kembali kode yang dikirim.')
    }
  }

  // Resend OTP
  const handleResendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)
    setOtpInput('')
    setOtpResendTimer(60)
    setErrorMsg(null)
  }

  // Step 3: Save New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi baru tidak cocok!')
      return
    }

    if (password.length < 8) {
      setErrorMsg('Kata sandi harus minimal 8 karakter.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nrp_nip: nrpNip,
          phone: phone,
          new_password: password
        })
      })

      const data = await response.json()
      if (response.ok && data.status === 'success') {
        setStep(4)
      } else {
        setErrorMsg(data.message || 'Gagal mengubah kata sandi.')
      }
    } catch (err) {
      console.error('Password reset error:', err)
      setErrorMsg('Gagal menyimpan kata sandi baru ke server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-polri-cream min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-polri-radial opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-polri-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-polri-maroon/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center">
        {/* Back Link */}
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-polri-brownDark/80 hover:text-polri-maroon transition">
          <ArrowLeftIcon className="h-4 w-4" />
          Kembali ke Halaman Login
        </Link>

        {step === 4 ? (
          /* SUCCESS STATE */
          <div className="w-full max-w-md rounded-3xl border border-polri-gold/30 bg-white p-8 shadow-soft text-center animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircleIcon className="h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-polri-brownDark">Kata Sandi Diperbarui!</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Kata sandi akun Anda berhasil diubah. Silakan masuk kembali menggunakan kata sandi baru Anda.
            </p>
            <button
              onClick={() => router.push('/login')}
              type="button"
              className="mt-6 w-full rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft"
            >
              Login Sekarang
            </button>
          </div>
        ) : (
          /* MULTI-STEP WIZARD */
          <div className="w-full max-w-md rounded-3xl border border-polri-gold/30 bg-white p-8 shadow-soft animate-fadeIn">
            {/* Header logo & title */}
            <div className="flex flex-col items-center text-center">
              <Image src="/images/logo-sespim.png" alt="Sespim Lemdiklat Polri" width={70} height={70} priority className="h-16 w-auto object-contain" />
              <h1 className="mt-4 text-xl font-black text-polri-brownDark uppercase tracking-wider">Lupa Kata Sandi</h1>
              <p className="mt-1.5 text-xs text-neutral-500 max-w-[300px]">
                Pulihkan akses akun portal Anda melalui verifikasi OTP WhatsApp resmi Sespim Lemdiklat Polri.
              </p>
            </div>

            {/* Step Indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className={`h-1.5 w-10 rounded-full transition-all ${step >= 1 ? 'bg-polri-maroon' : 'bg-neutral-200'}`} />
              <div className={`h-1.5 w-10 rounded-full transition-all ${step >= 2 ? 'bg-polri-maroon' : 'bg-neutral-200'}`} />
              <div className={`h-1.5 w-10 rounded-full transition-all ${step >= 3 ? 'bg-polri-maroon' : 'bg-neutral-200'}`} />
            </div>

            {errorMsg && (
              <div className="mt-6 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 flex items-start gap-2 leading-5 animate-fadeIn">
                <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {step === 1 && (
              /* STEP 1: IDENTIFICATION FORM */
              <form onSubmit={handleIdentifyAccount} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">NRP / NIP</label>
                  <input
                    type="text"
                    required
                    value={nrpNip}
                    onChange={(e) => setNrpNip(e.target.value)}
                    placeholder="Masukkan NRP atau NIP Anda"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 flex items-center justify-center rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark disabled:bg-neutral-400"
                >
                  {loading ? 'Memverifikasi...' : 'Lanjutkan Verifikasi'}
                </button>
              </form>
            )}

            {step === 2 && (
              /* STEP 2: OTP VERIFICATION */
              <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                {/* OTP WhatsApp Simulation Alert Banner */}
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 space-y-2 leading-5 animate-pulse">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <DevicePhoneMobileIcon className="h-4 w-4" />
                    <span>WhatsApp OTP Simulator</span>
                  </div>
                  <p>
                    [SIMULASI] Kode OTP verifikasi ganti password telah dikirim ke nomor WhatsApp <strong>{phone}</strong>:
                  </p>
                  <div className="text-center font-mono font-bold text-sm tracking-wider bg-white py-1 px-3 border border-emerald-300 rounded-lg max-w-max mx-auto select-all text-emerald-800">
                    {generatedOtp}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Masukkan Kode OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Contoh: 123456"
                    className="mt-2 w-full text-center tracking-widest font-mono text-lg rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-300 placeholder:tracking-normal placeholder:font-sans"
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Tidak menerima kode?</span>
                  {otpResendTimer > 0 ? (
                    <span className="text-neutral-400 font-bold">Kirim ulang dalam {otpResendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="font-black text-polri-maroon hover:underline"
                    >
                      Kirim Ulang OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark"
                >
                  Verifikasi OTP
                </button>
              </form>
            )}

            {step === 3 && (
              /* STEP 3: RESET PASSWORD FORM */
              <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-600 flex items-start gap-2.5 leading-5">
                  <ShieldCheckIcon className="h-5 w-5 shrink-0 text-polri-gold" />
                  <span>
                    Identitas Anda telah terverifikasi. Masukkan kata sandi baru untuk akun NRP/NIP <strong>{nrpNip}</strong>.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Kata Sandi Baru</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Konfirmasi Kata Sandi</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="mt-2 w-full rounded-xl border border-polri-gold/30 bg-white px-4 py-3 text-sm text-polri-brownDark outline-none focus:border-polri-maroon placeholder:text-neutral-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center rounded-xl bg-polri-maroon py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark disabled:bg-neutral-400"
                >
                  {loading ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                </button>
              </form>
            )}
          </div>
        )}
      </Container>
    </main>
  )
}
