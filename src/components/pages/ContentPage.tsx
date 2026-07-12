'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { InfoCard } from '@/components/ui/InfoCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PageFeaturePanel } from '@/components/pages/PageFeaturePanel'
import { ClinicQueueMockup } from '@/components/pages/ClinicQueueMockup'
import { NewsMonitoringPanel } from '@/components/pages/NewsMonitoringPanel'
import type { PageContent } from '@/types'
import { navigation, socialLinks } from '@/data/navigation'
import { pageHighlights } from '@/data/pageHighlights'
import { pageFeaturePanels } from '@/data/pageFeaturePanels'
import { externalLinkProps } from '@/lib/links'
import { cn } from '@/lib/cn'

type ContentPageProps = {
  content: PageContent
  path: string
}

export function ContentPage({ content, path }: ContentPageProps) {
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const officialAddress = 'Jl. Maribaya No.53, Kayuambon, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391, Indonesia'
  const officialMapHref = 'https://maps.app.goo.gl/k7YqKzsiNCdpKcqY7'
  const officialMapPreviewSrc = `https://www.google.com/maps?q=${encodeURIComponent(officialAddress)}&output=embed`
  const currentSection = navigation.find((item) => item.href === path)
  const parentSection = navigation.find((item) => item.children?.some((child) => child.href === path))
  const childSections = navigation.flatMap((item) => item.children ?? [])
  const currentChildSection = childSections.find((item) => item.href === path)
  const nestedParentSection = childSections.find((item) => item.children?.some((child) => child.href === path))
  const activeSection = currentSection ?? currentChildSection ?? nestedParentSection ?? parentSection
  const siblingLinks = (
    currentSection?.children?.length
      ? currentSection.children
      : currentChildSection?.children?.length
        ? currentChildSection.children
        : nestedParentSection?.children?.length
          ? nestedParentSection.children
          : parentSection?.children ?? []
  )
    .filter((item) => item.href !== path)
  const featuredLinks = (path === '/profil' || path === '/profil/sejarah' || path === '/profil/visi-misi' || path === '/profil/tugas-fungsi' || path === '/profil/struktur-organisasi' || path === '/profil/pejabat' || path === '/profil/fasilitas' || path === '/profil/kontak/contact' || path === '/profil/kontak/susunan-redaksi') ? [] : siblingLinks.slice(0, 8)
  const related = Array.from(
    new Map(
      [
        ...siblingLinks,
        ...navigation.filter((item) => item.href !== '/' && item.href !== activeSection?.href)
      ].map((item) => [item.href, item])
    ).values()
  )
    .filter((item) => item.href !== path)
    .slice(0, 6)
  const highlight = pageHighlights[path]
  const featurePanel = pageFeaturePanels[path]
  const stats =
    highlight?.stats ?? [
      { value: String(featuredLinks.length || content.sections.length), label: 'Area terkait' },
      { value: String(content.sections.length), label: 'Section konten' },
      { value: '3', label: 'Breakpoint UI' }
    ]
  const renderContactDashboard = () => {
    const phone = content.noKontakResmi || '+62 22 2786 110'
    const email = content.emailResmi || 'info@sespim-polri.id'
    const wa = '+62 812 3456 789'
    const chatbotName = content.chatbot?.name || 'Agen Wira'
    const chatbotUrl = content.chatbot?.url || 'https://wa.me/628123456789?text=Halo%20Agen%20Wira'
    const address = content.alamatResmi || officialAddress

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      const errors: Record<string, string> = {}
      if (!formName.trim()) {
        errors.name = 'Nama lengkap wajib diisi'
      }
      if (!formEmail.trim()) {
        errors.email = 'Alamat email wajib diisi'
      } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
        errors.email = 'Format email tidak valid'
      }
      if (!formSubject.trim()) {
        errors.subject = 'Subjek pesan wajib diisi'
      }
      if (!formMessage.trim()) {
        errors.message = 'Isi pesan wajib diisi'
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
      }

      setFormErrors({})
      setFormStatus('submitting')

      setTimeout(() => {
        setFormStatus('success')
        setFormName('')
        setFormEmail('')
        setFormSubject('')
        setFormMessage('')
      }, 1500)
    }

    return (
      <div className="space-y-8 mt-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-xl border border-polri-gold/25 bg-polri-cream p-5 shadow-soft hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-polri-brownDark text-polri-goldSoft mb-4">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-polri-brownDark">Telepon Resmi</h3>
              <p className="mt-1 text-xs text-neutral-500">Hubungi hotline resmi</p>
              <p className="mt-2 text-sm font-black text-polri-brownDark">{phone}</p>
            </div>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="mt-4 block w-full rounded-lg bg-polri-brownDark py-2 text-center text-xs font-black text-white hover:bg-polri-maroon transition"
            >
              Hubungi Sekarang
            </a>
          </div>

          <div className="group rounded-xl border border-emerald-500/25 bg-emerald-50/30 p-5 shadow-soft hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white mb-4">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.008 14.07 1.01 11.533 1.01 6.096 1.01 1.674 5.378 1.671 10.81c-.001 1.64.43 3.238 1.25 4.647l-.988 3.612 3.712-.973zm12.135-7.073c-.33-.165-1.951-.963-2.251-1.073-.3-.109-.518-.165-.736.165-.218.33-.845 1.073-1.036 1.291-.19.218-.381.245-.71.082-.33-.165-1.393-.513-2.653-1.638-.98-.874-1.64-1.953-1.832-2.282-.19-.33-.02-.508.145-.671.148-.147.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.082-.165-.736-1.774-1.009-2.434-.266-.64-.537-.552-.736-.562-.19-.01-.409-.012-.627-.012-.218 0-.573.082-.873.412-.3.33-1.145 1.117-1.145 2.723 0 1.605 1.172 3.155 1.336 3.374.164.218 2.307 3.52 5.589 4.939.78.337 1.39.539 1.866.69.783.248 1.496.213 2.06.128.629-.094 1.952-.797 2.224-1.528.273-.73 2.73-3.23 2.73-3.23zm-.218-.165z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-emerald-800">WhatsApp Chat</h3>
              <p className="mt-1 text-xs text-neutral-500">Hubungi langsung via WA</p>
              <p className="mt-2 text-sm font-black text-emerald-950">{wa}</p>
            </div>
            <a
              href={`https://wa.me/${wa.replace(/[^0-9]/g, '')}?text=Halo%20Sespim%20Lemdiklat%20Polri`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-lg bg-emerald-600 py-2 text-center text-xs font-black text-white hover:bg-emerald-700 transition"
            >
              Mulai Chat WA
            </a>
          </div>

          <div className="group rounded-xl border border-polri-maroon/25 bg-red-50/30 p-5 shadow-soft hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-polri-maroon text-white mb-4">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-polri-maroon">Email Gateway</h3>
              <p className="mt-1 text-xs text-neutral-500">Kirim surat elektronik</p>
              <p className="mt-2 text-sm font-black text-polri-maroon break-all">{email}</p>
            </div>
            <a
              href={`mailto:${email}`}
              className="mt-4 block w-full rounded-lg bg-polri-maroon py-2 text-center text-xs font-black text-white hover:bg-red-800 transition"
            >
              Kirim Email
            </a>
          </div>

          <div className="group rounded-xl border border-emerald-500/25 bg-emerald-50/50 p-5 shadow-soft hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white mb-4">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-emerald-800">Virtual Assistant</h3>
              <p className="mt-1 text-xs text-neutral-500">Asisten virtual {chatbotName}</p>
              <p className="mt-2 text-sm font-black text-emerald-950">Komunikasi Interaktif 24/7</p>
            </div>
            <a
              href={chatbotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-black text-white hover:bg-emerald-600 transition"
            >
              Tanya {chatbotName}
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-polri-gold/25 bg-white p-6 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-polri-maroon">Formulir Kontak</p>
          <h3 className="mt-2 text-xl font-black text-polri-brownDark">Kirimkan pesan Anda</h3>
          <p className="mt-2 text-sm text-neutral-500 leading-6">
            Formulir kontak disiapkan sebagai baseline front-end untuk menerima pesan publik. Pengiriman pesan dapat dihubungkan ke API, email gateway, atau dashboard admin pada fase integrasi backend.
          </p>

          {formStatus === 'success' && (
            <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800 flex items-start gap-3 animate-fadeIn">
              <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold">Pesan Berhasil Dikirim!</p>
                <p className="mt-1 text-xs text-emerald-700/80 font-normal">
                  Terima kasih atas pesan Anda. Status pengiriman: Berhasil terkirim ke baseline front-end.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="mt-3 text-xs font-black text-emerald-800 underline hover:text-emerald-950 transition"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            </div>
          )}

          {formStatus !== 'success' && (
            <form onSubmit={handleFormSubmit} className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500">Nama Lengkap</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={`rounded-lg border bg-white px-4 py-3 text-sm text-polri-brownDark outline-none transition ${
                    formErrors.name ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-polri-maroon'
                  }`}
                  placeholder="Contoh: John Doe"
                />
                {formErrors.name && <span className="text-[10px] text-red-500 font-semibold">{formErrors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500">Alamat Email</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className={`rounded-lg border bg-white px-4 py-3 text-sm text-polri-brownDark outline-none transition ${
                    formErrors.email ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-polri-maroon'
                  }`}
                  placeholder="Contoh: john@example.com"
                />
                {formErrors.email && <span className="text-[10px] text-red-500 font-semibold">{formErrors.email}</span>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-neutral-500">Subjek Pesan</label>
                <input
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className={`rounded-lg border bg-white px-4 py-3 text-sm text-polri-brownDark outline-none transition ${
                    formErrors.subject ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-polri-maroon'
                  }`}
                  placeholder="Contoh: Pertanyaan Layanan Informasi Akademik"
                />
                {formErrors.subject && <span className="text-[10px] text-red-500 font-semibold">{formErrors.subject}</span>}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-neutral-500">Isi Pesan</label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className={`min-h-28 rounded-lg border bg-white px-4 py-3 text-sm text-polri-brownDark outline-none transition ${
                    formErrors.message ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-polri-maroon'
                  }`}
                  placeholder="Ketik pesan atau pertanyaan Anda di sini..."
                />
                {formErrors.message && <span className="text-[10px] text-red-500 font-semibold">{formErrors.message}</span>}
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full rounded-lg bg-polri-maroon px-5 py-4 text-sm font-black text-white transition hover:bg-polri-brownDark disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Mengirim Pesan...
                    </>
                  ) : (
                    'Kirim Pesan'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_800px]">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-black text-polri-brownDark uppercase tracking-wider">Alamat Kantor Redaksi</h4>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{address}</p>
              <div className="mt-4 pt-4 border-t border-neutral-200/60 space-y-2">
                <p className="text-xs text-neutral-500 font-semibold flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-polri-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Telepon: <span className="font-bold text-polri-brownDark">{phone}</span></span>
                </p>
                <p className="text-xs text-neutral-500 font-semibold flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-polri-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: <span className="font-bold text-polri-brownDark">{email}</span></span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href={officialMapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-polri-maroon px-4 py-3 text-xs font-black text-white hover:bg-polri-brownDark transition"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Buka di Google Maps
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-soft h-[600px] relative">
            <iframe
              src={officialMapPreviewSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Kantor Redaksi Sespim Lemdiklat Polri"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    )
  }
  const moveDiscoverySectionsBelow =
    path === '/widyaiswara' ||
    path === '/kelembagaan-internal/setlem' ||
    path === '/kelembagaan-internal/jianbang' ||
    path === '/kelembagaan-internal/bidang'
  const promoteSpotlight = path === '/widyaiswara/pembimbingan-naskap'
  const isContactPage = path === '/kontak' || path === '/berita/contact' || path === '/profil/kontak' || path === '/profil/kontak/contact'
  const isEditorialBoardPage = path === '/berita/susunan-redaksi' || path === '/profil/kontak/susunan-redaksi'
  const moveSupportSectionsBelow = isContactPage || isEditorialBoardPage
  const movePrioritySectionBelow = moveDiscoverySectionsBelow || moveSupportSectionsBelow
  const isPlagiarismCheckPage = path === '/sarana-prasarana/cek-plagiarisme'
  const isOffcampusPage = path === '/sarana-prasarana/offcampus'
  const isClinicPage = path === '/sarana-prasarana/klinik-pratama'
  const isElibraryPage = path === '/sarana-prasarana/elibrary'
  const showNewsMonitoringPanel = [
    '/berita/kegiatan',
    '/berita/kegiatan/feed-up-to-date',
    '/berita/kegiatan/portal-berita',
    '/berita/kegiatan/media-sosial-hashtag'
  ].includes(path)
  const moveResourcesAbove = path === '/widyaiswara/materi-terbuka'
  const turnitinHref = 'https://www.turnitin.com/'
  const googleMeetHref = 'https://meet.google.com/'
  const clinicWebsiteHref = 'https://klinik-sespimpolri.com/'
  const clinicQueueHref = 'https://app.klinik-sespimpolri.com/'
  const clinicServices = ['Pendaftaran pasien', 'Pelayanan rawat jalan', 'Pelayanan rawat inap', 'UGD 24 jam']
  const plagiarismReferenceLinks = [
    {
      label: 'eLibrary Sespim',
      href: '/sarana-prasarana/elibrary',
      description: 'Rujukan koleksi digital dan sumber belajar internal Sespim.'
    },
    {
      label: 'Perpusnas',
      href: 'https://satudata.perpusnas.go.id/',
      description: 'Akses literatur nasional untuk penelusuran referensi akademik.'
    },
    {
      label: 'Ejurnal',
      href: '/sarana-prasarana/ejurnal',
      description: 'Ruang rujukan jurnal dan artikel ilmiah pendukung penulisan.'
    },
    {
      label: 'Offcampus',
      href: '/sarana-prasarana/offcampus',
      description: 'Akses referensi digital dari luar lingkungan kampus.'
    }
  ]
  const officialSocialLinks = socialLinks.filter((link) => !['https://x.com/', 'https://www.threads.net/'].includes(link.href))
  const spotlightSection = null
  const discoverySections = (
    <>
      {featurePanel && path !== '/profil/kontak/susunan-redaksi' && path !== '/profil/kontak/contact' ? (
        <>
          <PageFeaturePanel panel={featurePanel} />
          {path === '/kelembagaan-internal' && (
            <section className="bg-white pb-14">
              <Container>
                <div className="overflow-hidden rounded-xl border border-polri-gold/20 shadow-lg relative group h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-polri-brownDark via-transparent/40 to-transparent opacity-95 z-10" aria-hidden="true" />
                  <img 
                    src="/images/sespim_kegiatan_pendidikan.png" 
                    alt="Ilustrasi Kegiatan Pendidikan Sespim Lemdiklat Polri" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Ilustrasi Kegiatan</p>
                    <h4 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-white">Pendidikan & Pelatihan Reguler Sespim Lemdiklat Polri</h4>
                    <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
                      Widyaiswara dan Tenaga Kependidikan (Gadikan) bersinergi menyelenggarakan pengajaran tatap muka, diskusi panel, simulasi operasional, dan pembimbingan akademik guna mencetak pemimpin Polri yang unggul dan presisi.
                    </p>
                  </div>
                </div>
              </Container>
            </section>
          )}
          {path === '/widyaiswara' && (
            <section className="bg-white pb-14">
              <Container>
                <div className="overflow-hidden rounded-xl border border-polri-gold/20 shadow-lg relative group h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-polri-brownDark via-transparent/40 to-transparent opacity-95 z-10" aria-hidden="true" />
                  <img 
                    src="/images/sespim_smart_class.png" 
                    alt="Ilustrasi Smart Class Sespim Lemdiklat Polri" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Smart Class Sespim Polri</p>
                    <h4 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-white">Metode Pembelajaran Digital & Kolaboratif Widyaiswara</h4>
                    <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
                      Widyaiswara Sespim Lemdiklat Polri memanfaatkan fasilitas ruang kelas pintar (Smart Classroom) yang dilengkapi teknologi hybrid dan layar sentuh interaktif untuk mendukung proses belajar mengajar secara modern.
                    </p>
                  </div>
                </div>
              </Container>
            </section>
          )}
        </>
      ) : null}

      {featuredLinks.length && path !== '/kelembagaan-internal' ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Navigasi Area"
              title={currentSection || currentChildSection ? 'Akses cepat ke subhalaman utama' : 'Halaman lain dalam kategori ini'}
              description="Daftar ini disusun dari struktur navigasi resmi sehingga pengguna bisa menelusuri area terkait tanpa kehilangan konteks."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-polri-maroon">{content.eyebrow}</p>
                  <h3 className="mt-3 text-lg font-black text-polri-brownDark">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.description ?? 'Akses langsung ke halaman informasi yang sesuai dengan kategori ini.'}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {!promoteSpotlight ? spotlightSection : null}
    </>
  )
  const prioritySection = null
  const resourcesSection = content.resources?.length ? (
    <section className="bg-white py-14">
      <Container>
        <SectionTitle
          eyebrow="Materi Unduhan"
          title="Daftar materi tersedia"
          description="Materi ditata sebagai kartu file agar pengguna dapat melihat judul, deskripsi, format, dan nama file sebelum membuka dokumen."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.resources.map((resource) => (
            <div
              key={resource.href}
              className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-polri-maroon px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  {resource.format}
                </span>
                {resource.category ? (
                  <span className="rounded-lg bg-polri-cream px-3 py-1 text-xs font-bold text-polri-brownDark">
                    {resource.category}
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 text-lg font-black text-polri-brownDark sm:text-xl">
                {resource.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">{resource.description}</p>
              <p className="mt-4 rounded-lg bg-polri-cream px-4 py-3 text-xs font-bold text-polri-brownDark">
                {resource.fileName}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-polri-gold px-4 py-2.5 text-xs font-black text-polri-brownDark hover:bg-polri-goldSoft transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Buka File
                </a>
                <a
                  href={resource.href}
                  download={resource.fileName}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-polri-maroon px-4 py-2.5 text-xs font-black text-white hover:bg-polri-brownDark transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Unduh File
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  ) : null

  return (
    <main>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />

      <section className="border-b border-polri-gold/20 bg-polri-cream py-4">
        <Container>
          <Breadcrumb path={path} currentLabel={content.title} />
        </Container>
      </section>

      {moveResourcesAbove ? resourcesSection : null}

      {path !== '/profil/struktur-organisasi' && path !== '/profil/fasilitas' && path !== '/profil/pejabat' && path !== '/profil' && path !== '/sarana-prasarana/klinik-pratama' && !path.startsWith('/kelembagaan-internal') && !path.startsWith('/widyaiswara') && !path.startsWith('/program-pendidikan') && !path.includes('kontak') && !path.includes('contact') && !path.includes('redaksi') && (
        <section className="bg-polri-brownDark py-10 text-white">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-center">
              <div className="min-w-0 max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">
                  {highlight?.label ?? content.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  {highlight ? `Fokus Halaman ${content.title}` : 'Struktur Informasi Halaman'}
                </h2>
                <p className="mt-4 text-base leading-8 text-white/76">
                  {highlight?.summary ?? 'Halaman ini mengikuti struktur navigasi and data konten awal yang sudah ditetapkan dalam SOT front-end.'}
                </p>
              </div>
              <div className="grid overflow-hidden rounded-lg border border-polri-gold/30 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="border-b border-polri-gold/20 bg-white/8 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                    <p className="text-3xl font-black text-polri-goldSoft">{stat.value}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/76">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {showNewsMonitoringPanel ? <NewsMonitoringPanel /> : null}

      {isElibraryPage ? (
        <section className="bg-white py-14">
          <Container>
            <div className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
              <div className="relative isolate min-h-[520px]">
                <Image
                  src="/images/elibrary-library-hero.png"
                  alt="Perpustakaan Sespim Polri"
                  fill
                  sizes="(min-width: 1280px) 1184px, calc(100vw - 32px)"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark via-polri-brownDark/86 to-polri-maroon/50" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
                <div className="relative z-10 grid min-h-[520px] gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
                  <div className="max-w-3xl">
                    <p className="text-sm font-black uppercase tracking-[0.26em] text-polri-goldSoft">Perpustakaan Sespim Polri</p>
                    <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                      Pusat referensi dan karya akademik peserta didik Sespim
                    </h2>
                    <p className="mt-5 text-base leading-8 text-white/82 sm:text-lg">
                      Perpustakaan Sespim Polri menyediakan buku referensi, naskah karya serdik terdahulu, dan dokumen akademik seperti NKP, Policy Brief, NASKAP, TASKAP, serta NASTRAP. Koleksi disiapkan dalam bentuk hardcopy maupun akses online untuk mendukung riset, pembelajaran, dan penyusunan karya peserta didik.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Buku Referensi', 'NKP', 'Policy Brief', 'NASKAP', 'TASKAP', 'NASTRAP'].map((item) => (
                        <span key={item} className="rounded-lg border border-polri-gold/40 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-polri-goldSoft">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        title: 'Koleksi Hardcopy',
                        body: 'Buku referensi dan naskah akademik tersedia sebagai koleksi fisik untuk dibaca, ditelusuri, dan dijadikan rujukan di lingkungan perpustakaan.'
                      },
                      {
                        title: 'Akses Online',
                        body: 'Katalog dan koleksi digital dapat dikembangkan melalui eLibrary/SLIMS agar peserta didik dan tenaga pendidik dapat menelusuri referensi secara lebih cepat.'
                      },
                      {
                        title: 'Karya Serdik Terdahulu',
                        body: 'Naskah karya peserta didik terdahulu menjadi sumber pembelajaran, pembanding, dan inspirasi akademik untuk penyusunan karya berikutnya.'
                      }
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-polri-gold/30 bg-white/12 p-5 backdrop-blur">
                        <h3 className="text-lg font-black text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/76">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isPlagiarismCheckPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Pengecekan Dokumen"
              title="Hasil plagiarisme ditampilkan paling atas"
              description="Area ini disiapkan untuk alur pemeriksaan dokumen akademik melalui Turnitin, unggah dokumen, rujukan referensi, dan ringkasan hasil similarity."
            />

            <div className="mt-8 overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Hasil Plagiarisme</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">--%</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Similarity Index</p>
                    </div>
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">0</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Dokumen Dicek</p>
                    </div>
                    <div className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                      <p className="text-3xl font-black text-polri-goldSoft">Ready</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/72">Status Layanan</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-polri-gold/25 bg-white p-5 text-polri-brownDark">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Dokumen</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Belum ada file</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Similarity</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Menunggu hasil</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Sumber Dominan</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Belum tersedia</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-polri-maroon">Status</p>
                        <p className="mt-2 text-sm font-bold text-neutral-700">Siap upload</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Hasil resmi dapat ditampilkan setelah dokumen diproses melalui akun atau integrasi layanan Turnitin yang ditetapkan pengelola.
                  </p>
                </div>

                <div className="border-t border-polri-gold/25 bg-polri-cream p-6 text-polri-brownDark lg:border-l lg:border-t-0 sm:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Aksi Dokumen</p>
                  <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-polri-gold/60 bg-white px-5 py-8 text-center transition hover:border-polri-maroon hover:bg-polri-cream">
                    <span className="text-base font-black text-polri-brownDark">Upload Dokumen</span>
                    <span className="mt-2 text-sm leading-6 text-neutral-700">PDF, DOC, atau DOCX untuk pemeriksaan awal.</span>
                    <input type="file" className="sr-only" accept=".pdf,.doc,.docx" aria-label="Upload dokumen untuk cek plagiarisme" />
                  </label>
                  <a
                    href={turnitinHref}
                    {...externalLinkProps(turnitinHref)}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-polri-maroon px-5 py-4 text-center text-sm font-black text-white transition hover:bg-polri-brownDark"
                  >
                    Buka Turnitin
                  </a>
                  <p className="mt-4 text-xs font-semibold leading-6 text-neutral-600">
                    Tombol upload saat ini menyiapkan alur front-end. Integrasi otomatis dengan Turnitin membutuhkan akun, API, atau prosedur resmi pengelola.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Link Referensi</p>
                  <h2 className="mt-3 text-2xl font-black text-polri-brownDark">Rujukan pendukung pengecekan dokumen</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {plagiarismReferenceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-polri-gold hover:shadow-gold"
                  >
                    <p className="text-lg font-black text-polri-brownDark">{link.label}</p>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isOffcampusPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Blended Learning"
              title="Preview kelas Offcampus berbasis Google Meet"
              description="Ruang ini disiapkan sebagai media pembelajaran campuran antara kegiatan tatap muka, pembelajaran daring, diskusi terjadwal, dan akses materi dari luar kampus."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
              <article className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-polri-gold/25 bg-polri-maroon px-6 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Live Class Preview</p>
                  <span className="rounded-lg bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/80">Google Meet Ready</span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="rounded-lg border border-polri-gold/30 bg-white/8 p-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {['Instruktur', 'Peserta Didik', 'Moderator'].map((role) => (
                        <div key={role} className="flex min-h-32 flex-col justify-between rounded-lg bg-polri-brownDark/70 p-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-polri-gold text-lg font-black text-polri-brownDark">
                            {role.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white">{role}</p>
                            <p className="mt-1 text-xs font-semibold text-white/60">Video siap</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-lg bg-black/20 p-4">
                      <p className="text-sm font-bold text-polri-goldSoft">Sesi Berjalan</p>
                      <h2 className="mt-2 text-2xl font-black">Kelas Blended Learning Offcampus</h2>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        Preview ini menggambarkan ruang kelas daring untuk briefing, diskusi kelompok, paparan materi, dan koordinasi pembelajaran jarak jauh.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href={googleMeetHref}
                      {...externalLinkProps(googleMeetHref)}
                      className="inline-flex items-center justify-center rounded-lg bg-polri-gold px-5 py-4 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
                    >
                      Masuk Google Meet
                    </a>
                    <Link
                      href="/sarana-prasarana/lms-siapsespim"
                      className="inline-flex items-center justify-center rounded-lg border border-polri-gold/60 px-5 py-4 text-center text-sm font-black text-polri-goldSoft transition hover:bg-white/10"
                    >
                      Buka LMS SIAPSESPIM
                    </Link>
                  </div>
                </div>
              </article>

              <div className="grid gap-5">
                <article className="rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Jadwal Sesi</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ['08.00 - 08.30', 'Apel virtual dan briefing instruktur'],
                      ['08.30 - 10.00', 'Paparan materi dan diskusi kelas'],
                      ['10.15 - 11.30', 'Breakout group / penugasan mandiri'],
                      ['13.00 - 14.00', 'Review hasil belajar dan umpan balik']
                    ].map(([time, activity]) => (
                      <div key={time} className="rounded-lg bg-white p-4">
                        <p className="text-sm font-black text-polri-brownDark">{time}</p>
                        <p className="mt-1 text-sm leading-6 text-neutral-700">{activity}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-lg border border-polri-gold/30 bg-white p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Mode Pembelajaran</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      'Tatap muka terbatas untuk penguatan arahan dan evaluasi.',
                      'Google Meet untuk sinkron daring dan diskusi real-time.',
                      'LMS SIAPSESPIM untuk materi, tugas, dan arsip pembelajaran.',
                      'Referensi digital melalui eLibrary, Perpusnas, Ejurnal, dan Offcampus.'
                    ].map((item) => (
                      <div key={item} className="rounded-lg bg-polri-cream px-4 py-3 text-sm font-semibold leading-6 text-polri-brownDark">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {isClinicPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Klinik Pratama"
              title="Layanan kesehatan Sespim Polri"
              description="Informasi ini dirangkum dari website resmi Klinik Pratama Sespim Polri sebagai pintu akses layanan kesehatan, kontak, lokasi, dan antrian pasien."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <article className="overflow-hidden rounded-lg border border-polri-gold/35 bg-polri-brownDark text-white shadow-gold">
                <div className="bg-polri-maroon px-6 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-goldSoft">Sahabat Menuju Sehat</p>
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="text-3xl font-black leading-tight">Klinik Pratama Sespim Polri</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74">
                    Klinik Pratama Sespim Polri menyediakan layanan kesehatan bagi lingkungan Sespim Polri, termasuk pendaftaran pasien, rawat jalan, rawat inap, dan dukungan UGD 24 jam.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {clinicServices.map((service) => (
                      <div key={service} className="rounded-lg border border-polri-gold/25 bg-white/10 p-5">
                        <p className="text-lg font-black text-polri-goldSoft">{service}</p>
                        <p className="mt-2 text-sm leading-6 text-white/64">Tersedia sebagai layanan utama klinik.</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <a
                      href={clinicWebsiteHref}
                      {...externalLinkProps(clinicWebsiteHref)}
                      className="inline-flex items-center justify-center rounded-lg bg-polri-gold px-5 py-4 text-center text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
                    >
                      Buka Website Klinik
                    </a>
                    <a
                      href={clinicQueueHref}
                      {...externalLinkProps(clinicQueueHref)}
                      className="inline-flex items-center justify-center rounded-lg border border-polri-gold/60 px-5 py-4 text-center text-sm font-black text-polri-goldSoft transition hover:bg-white/10"
                    >
                      Buka Antrian Pasien
                    </a>
                  </div>
                </div>
              </article>

              <aside className="grid gap-5">
                <article className="rounded-lg border border-polri-gold/30 bg-polri-cream p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Jam Layanan</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm font-black text-polri-brownDark">Pelayanan Pagi</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-700">08.00 - 11.00 WIB</p>
                    </div>
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm font-black text-polri-brownDark">Pelayanan Sore</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-700">16.00 - 19.00 WIB</p>
                    </div>
                    <div className="rounded-lg bg-polri-brownDark p-4 text-white">
                      <p className="text-sm font-black text-polri-goldSoft">UGD</p>
                      <p className="mt-1 text-sm font-semibold text-white/76">24 jam</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-lg border border-polri-gold/30 bg-white p-6 shadow-soft">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Kontak dan Lokasi</p>
                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700">
                    <li><span className="font-black text-polri-brownDark">Telepon:</span> (022) 2785594</li>
                    <li><span className="font-black text-polri-brownDark">WhatsApp:</span> 0823-2134-9036</li>
                    <li><span className="font-black text-polri-brownDark">Alamat:</span> Jalan Maribaya No.53, Kayuambon, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391</li>
                  </ul>
                </article>
              </aside>
            </div>

            <div className="mt-8">
              <ClinicQueueMockup />
            </div>
          </Container>
        </section>
      ) : null}

      {!movePrioritySectionBelow ? prioritySection : null}

      {promoteSpotlight ? spotlightSection : null}

      {!moveSupportSectionsBelow && !moveDiscoverySectionsBelow ? discoverySections : null}

      {isContactPage ? (
        <section className="bg-white py-14">
          <Container>
            <SectionTitle
              eyebrow="Contact Center"
              title="Hubungi Kami"
              description="Kanal saran, masukan, dan bantuan asisten virtual resmi Sespim Lemdiklat Polri."
            />
            {renderContactDashboard()}
          </Container>
        </section>
      ) : null}

      {content.media ? (
        <section className="bg-white py-14">
          <Container>
            <div className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
              <div className="relative aspect-[942/562] w-full bg-polri-cream">
                <Image
                  src={content.media.src}
                  alt={content.media.alt}
                  fill
                  sizes="(min-width: 1280px) 1184px, calc(100vw - 32px)"
                  className="object-contain"
                />
              </div>
              {content.media.caption ? (
                <p className="border-t border-polri-gold/20 bg-polri-cream px-5 py-3 text-sm font-semibold text-polri-brownDark">
                  {content.media.caption}
                </p>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {!moveResourcesAbove ? resourcesSection : null}

      {content.officials?.length ? (
        <section className="bg-polri-cream py-14">
          <Container>
            <SectionTitle
              eyebrow="Pejabat Utama"
              title={content.title || "Daftar Pejabat Utama Sespim"}
              description="Daftar pejabat struktural di lingkungan Sespim Lemdiklat Polri."
            />
            {(() => {
              // Group officials by group
              const groups: { [key: string]: any[] } = {}
              let hasGroups = false
              
              content.officials.forEach((official) => {
                if (official.group) {
                  hasGroups = true
                  const g = official.group
                  if (!groups[g]) {
                    groups[g] = []
                  }
                  groups[g].push(official)
                }
              })
              
              if (!hasGroups) {
                // Flat layout fallback if no groups are specified
                return (
                  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {content.officials.map((official) => {
                      const displayName = official.name ?? 'Nama belum tersedia'
                      const displayRank = official.rank ?? 'Pangkat belum tersedia'
                      const photoAlt = official.photoAlt ?? `Pas foto ${displayName}`
                      return (
                        <article key={`${official.position}-${displayName}`} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
                          <div className="bg-polri-brownDark p-4">
                            <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-lg border border-polri-gold/30 bg-polri-cream">
                              {official.photoSrc ? (
                                <Image
                                  src={official.photoSrc}
                                  alt={photoAlt}
                                  fill
                                  sizes="180px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-polri-brownDark">
                                  <span className="text-3xl font-black text-polri-maroon">3x4</span>
                                  <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-polri-brownDark/70">Pas Foto</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="grid gap-3 p-5">
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Nama</p>
                              <p className="mt-1 text-base font-black leading-6 text-polri-brownDark">{displayName}</p>
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Pangkat</p>
                              <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{displayRank}</p>
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Jabatan</p>
                              <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{official.position}</p>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )
              }
              
              // Grouped layout rendering
              return (
                <div className="space-y-12 mt-8">
                  {Object.entries(groups).map(([groupName, list]) => {
                    const groupSlug = groupName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    return (
                      <div key={groupName} className="space-y-6 scroll-mt-24" id={groupSlug}>
                        <div className="border-b border-polri-gold/30 pb-2">
                          <h3 className="text-lg font-black text-polri-brownDark uppercase tracking-wider">
                            {groupName}
                          </h3>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {list.map((official) => {
                            const displayName = official.name || 'Nama belum tersedia'
                            const displayRank = official.rank || 'Pangkat belum tersedia'
                            const photoAlt = `Pas foto ${displayName}`
                            
                            return (
                              <article key={`${official.position}-${displayName}`} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
                                <div className="bg-polri-brownDark p-4">
                                  <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-lg border border-polri-gold/30 bg-polri-cream">
                                    {official.photoSrc ? (
                                      <Image
                                        src={official.photoSrc}
                                        alt={photoAlt}
                                        fill
                                        sizes="180px"
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-polri-brownDark">
                                        <span className="text-3xl font-black text-polri-maroon">3x4</span>
                                        <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-polri-brownDark/70">Pas Foto</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="grid gap-3 p-5">
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Nama</p>
                                    <p className="mt-1 text-base font-black leading-6 text-polri-brownDark">{displayName}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Pangkat</p>
                                    <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{displayRank}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Jabatan</p>
                                    <p className="mt-1 text-sm font-bold leading-6 text-neutral-700">{official.position}</p>
                                  </div>
                                </div>
                              </article>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </Container>
        </section>
      ) : null}

      {content.facilities?.length ? (
        <section className="bg-polri-cream py-14 border-t border-polri-gold/20">
          <Container>
            <SectionTitle
              eyebrow="Fasilitas Kampus"
              title={content.title || "Fasilitas Sespim Lemdiklat Polri"}
              description="Sarana dan prasarana pendukung kegiatan belajar mengajar dan latihan peserta didik."
            />
            {(() => {
              // Group facilities by group
              const groups: { [key: string]: any[] } = {}
              let hasGroups = false
              
              content.facilities.forEach((facility) => {
                if (facility.group) {
                  hasGroups = true
                  const g = facility.group
                  if (!groups[g]) {
                    groups[g] = []
                  }
                  groups[g].push(facility)
                }
              })
              
              if (!hasGroups) {
                // Flat layout fallback if no groups are specified
                return (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {content.facilities.map((facility) => (
                      <article key={facility.title} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-gold animate-fadeIn">
                        <div className="relative aspect-[16/10] w-full bg-polri-brownDark">
                          {facility.photoSrc ? (
                            <Image
                              src={facility.photoSrc}
                              alt={`Foto ${facility.title}`}
                              fill
                              sizes="(min-width: 1024px) 360px, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-white/50">
                              <span className="text-4xl">🏢</span>
                              <span className="mt-2 text-xs font-bold uppercase tracking-widest text-polri-goldSoft">Fasilitas</span>
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-black text-polri-brownDark">{facility.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-neutral-600">{facility.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )
              }
              
              // Grouped layout rendering
              return (
                <div className="mt-10 space-y-12 animate-fadeIn">
                  {Object.entries(groups).map(([groupName, list]) => {
                    const groupSlug = groupName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    return (
                      <div key={groupName} id={groupSlug} className="scroll-mt-24 space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-black uppercase tracking-wider text-polri-brownDark">{groupName}</h3>
                          <div className="h-[2px] flex-1 bg-gradient-to-r from-polri-gold/50 to-transparent" />
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {list.map((facility) => (
                            <article key={facility.title} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-gold">
                              <div className="relative aspect-[16/10] w-full bg-polri-brownDark">
                                {facility.photoSrc ? (
                                  <Image
                                    src={facility.photoSrc}
                                    alt={`Foto ${facility.title}`}
                                    fill
                                    sizes="(min-width: 1024px) 360px, 100vw"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full flex-col items-center justify-center text-white/50">
                                    <span className="text-4xl">🏢</span>
                                    <span className="mt-2 text-xs font-bold uppercase tracking-widest text-polri-goldSoft">Fasilitas</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-5">
                                <h4 className="text-lg font-black text-polri-brownDark">{facility.title}</h4>
                                <p className="mt-2 text-sm leading-6 text-neutral-600">{facility.description}</p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </Container>
        </section>
      ) : null}

      <section className="bg-white py-14">
        <Container>
          <div className={cn(
            "grid gap-8",
            isEditorialBoardPage 
              ? "grid-cols-1" 
              : "lg:grid-cols-[minmax(0,1fr)_340px]"
          )}>
            <div className="min-w-0 space-y-6">
              {content.sections.map((section) => {
                const isEducatorRankSection = path === '/widyaiswara' && section.title === 'Jenjang Jabatan'
                const usesStructuredCards = isEducatorRankSection

                return (
                  <article key={section.title} className="min-w-0 rounded-lg border border-polri-gold/25 bg-white p-6 shadow-soft">
                    <h2 className="text-xl font-black text-polri-brownDark sm:text-2xl">{section.title}</h2>
                    <p className="mt-4 text-base leading-8 text-neutral-700">{section.body}</p>
                    {section.items?.length ? (
                      isEditorialBoardPage && section.title.includes('Struktur') ? (
                        <div className="mt-5 overflow-x-auto rounded-lg border border-neutral-200">
                          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-polri-brownDark text-xs font-black uppercase tracking-wider text-white">
                                <th className="px-5 py-4 text-center w-16">No</th>
                                <th className="px-5 py-4">Jabatan</th>
                                <th className="px-5 py-4">Nama</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 bg-white">
                              {section.items.map((item, index) => {
                                const splitIndex = item.indexOf(':')
                                const role = splitIndex !== -1 ? item.substring(0, splitIndex).trim() : '-'
                                const name = splitIndex !== -1 ? item.substring(splitIndex + 1).trim() : item
                                return (
                                  <tr key={item} className="hover:bg-neutral-50 transition">
                                    <td className="px-5 py-4 text-center font-bold text-neutral-500">{index + 1}</td>
                                    <td className="px-5 py-4 font-bold text-polri-maroon">{role}</td>
                                    <td className="px-5 py-4 font-black text-polri-brownDark">{name || '-'}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : isEditorialBoardPage && section.title.includes('Kontak') ? (
                        renderContactDashboard()
                      ) : (
                        <ul className={
                          isEditorialBoardPage
                            ? 'mt-6 space-y-3'
                            : usesStructuredCards
                              ? 'mt-5 grid gap-4'
                              : 'mt-5 grid gap-3 sm:grid-cols-2'
                        }>
                          {section.items.map((item, index) => (
                            <li
                              key={item}
                              className={cn(
                                isEditorialBoardPage
                                  ? cn(
                                      'group flex flex-col justify-center border-l-4 pl-5 py-4 transition rounded-r-lg bg-neutral-50 hover:bg-neutral-100/60',
                                      section.title.includes('Kontak') ? 'border-polri-gold' : 'border-polri-maroon'
                                    )
                                  : 'rounded-lg bg-polri-cream px-4 py-3 text-sm font-semibold text-polri-brownDark',
                              usesStructuredCards && 'border border-polri-gold/30 bg-white p-0 shadow-soft'
                            )}
                          >
                            {isEditorialBoardPage ? (
                              <div className="min-w-0">
                                {item.includes(':') ? (
                                  <>
                                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-neutral-400 group-hover:text-polri-maroon transition">
                                      {item.split(':')[0]}
                                    </span>
                                    <span className="mt-1.5 block text-base font-black text-polri-brownDark">
                                      {item.split(':').slice(1).join(':').trim()}
                                    </span>
                                  </>
                                ) : (
                                  <span className="block text-base font-black text-polri-brownDark">
                                    {item}
                                  </span>
                                )}
                                {item.includes('Chatbot') && content.chatbot?.url ? (
                                  <a
                                    href={content.chatbot.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 rounded bg-emerald-600 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-700 transition"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.008 14.07 1.01 11.533 1.01 6.096 1.01 1.674 5.378 1.671 10.81c-.001 1.64.43 3.238 1.25 4.647l-.988 3.612 3.712-.973zm12.135-7.073c-.33-.165-1.951-.963-2.251-1.073-.3-.109-.518-.165-.736.165-.218.33-.845 1.073-1.036 1.291-.19.218-.381.245-.71.082-.33-.165-1.393-.513-2.653-1.638-.98-.874-1.64-1.953-1.832-2.282-.19-.33-.02-.508.145-.671.148-.147.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.082-.165-.736-1.774-1.009-2.434-.266-.64-.537-.552-.736-.562-.19-.01-.409-.012-.627-.012-.218 0-.573.082-.873.412-.3.33-1.145 1.117-1.145 2.723 0 1.605 1.172 3.155 1.336 3.374.164.218 2.307 3.52 5.589 4.939.78.337 1.39.539 1.866.69.783.248 1.496.213 2.06.128.629-.094 1.952-.797 2.224-1.528.273-.73 2.73-3.23 2.73-3.23zm-.218-.165z" />
                                    </svg>
                                    Hubungi {content.chatbot.name} (WA)
                                  </a>
                                ) : null}
                              </div>
                            ) : usesStructuredCards ? (
                              <span className="flex items-stretch overflow-hidden rounded-lg">
                                <span className="flex w-14 shrink-0 items-center justify-center bg-polri-maroon text-base font-black text-white">
                                  {index + 1}
                                </span>
                                <span className="min-w-0 flex-1 px-5 py-4">
                                  <span className="block text-base font-black text-polri-brownDark">
                                    {item.includes(':') ? item.split(':')[0] : item}
                                  </span>
                                  {item.includes(':') ? (
                                    <span className="mt-2 block text-sm font-semibold leading-7 text-neutral-700">
                                      {item.split(':').slice(1).join(':').trim()}
                                    </span>
                                  ) : null}
                                </span>
                              </span>
                            ) : (
                              item
                            )}
                          </li>
                        ))}
                      </ul>
                    )) : null}
                  </article>
                )
              })}
            </div>

            {!isEditorialBoardPage && (
              <aside className="space-y-5">
                {/* Status Konten has been removed */}
                {path !== '/profil/kontak/susunan-redaksi' && path !== '/kelembagaan-internal' && highlight?.sideNotes.map((note) => (
                  <div key={note.title} className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                    <h3 className="font-black text-polri-brownDark">{note.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">{note.body}</p>
                  </div>
                ))}
                {content.externalLink ? (
                  <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                    <h3 className="font-black text-polri-brownDark">Akses Layanan</h3>
                    {content.externalLink.description ? (
                      <p className="mt-3 text-sm leading-7 text-neutral-700">{content.externalLink.description}</p>
                    ) : null}
                    <a
                      href={content.externalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-polri-gold px-4 py-3 text-center text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
                    >
                      {content.externalLink.label}
                    </a>
                  </div>
                ) : null}
                {path !== '/profil/pejabat' && path !== '/profil/fasilitas' && path !== '/profil/kontak/contact' && path !== '/profil/kontak/susunan-redaksi' && path !== '/profil/struktur-organisasi' && path !== '/kontak' && path !== '/kelembagaan-internal' && (
                  <div className="rounded-lg border border-polri-gold/25 bg-polri-cream p-6">
                    <h3 className="font-black text-polri-brownDark">Tautan Terkait</h3>
                    <div className="mt-4 grid gap-2">
                      {related.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          {...externalLinkProps(item.href)}
                          className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark hover:text-polri-maroon"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            )}
          </div>
        </Container>
      </section>
      {movePrioritySectionBelow ? prioritySection : null}
      {moveDiscoverySectionsBelow || moveSupportSectionsBelow ? discoverySections : null}
      {path !== '/profil/sejarah' && path !== '/profil/visi-misi' && path !== '/profil/tugas-fungsi' && path !== '/profil/struktur-organisasi' && path !== '/profil/pejabat' && path !== '/profil/fasilitas' && path !== '/profil/kontak/contact' && path !== '/profil/kontak/susunan-redaksi' && path !== '/kontak' && path !== '/kelembagaan-internal' && (
        <section className="bg-polri-cream py-14">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-gold">Langkah Lanjutan</p>
                <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">
                  {content.externalLink ? 'Buka layanan resmi' : highlight?.cta ? 'Lanjutkan penelusuran informasi' : 'Halaman siap untuk pengayaan konten'}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-700">
                  {content.externalLink
                    ? 'Gunakan tautan resmi yang sudah disiapkan untuk mengakses layanan pendukung terkait.'
                    : 'UI halaman sudah disiapkan dengan komponen reusable, struktur responsive, dan tautan terkait yang mengikuti data navigasi.'}
                </p>
              </div>
              {content.externalLink ? (
                <a
                  href={content.externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-polri-maroon px-5 py-3 text-center font-black text-white hover:bg-polri-brownDark"
                >
                  {content.externalLink.label}
                </a>
              ) : highlight?.cta ? (
                <Link
                  href={highlight.cta.href}
                  {...externalLinkProps(highlight.cta.href)}
                  className="rounded-lg bg-polri-maroon px-5 py-3 text-center font-black text-white hover:bg-polri-brownDark"
                >
                  {highlight.cta.label}
                </Link>
              ) : null}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}

