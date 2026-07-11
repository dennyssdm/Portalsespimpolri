'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircleIcon, DocumentArrowDownIcon, LockClosedIcon, PlayCircleIcon, TrophyIcon } from '@heroicons/react/24/outline'
import type { InpassingModule } from '@/data/inpassingModules'

type InpassingModuleWorkspaceProps = {
  modules: InpassingModule[]
}

const progressStorageKey = 'sespim-inpassing-progress-v1'
const certificateNameStorageKey = 'sespim-inpassing-certificate-name-v1'

function sanitizePdfText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

function certificateFileName(name: string) {
  const slug = name
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `sertifikat-inpassing-${slug || 'peserta'}.pdf`
}

function textCommand(text: string, x: number, y: number, size: number, font = 'F1') {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${sanitizePdfText(text)}) Tj ET`
}

function centeredTextCommand(text: string, y: number, size: number, font = 'F1') {
  const estimatedWidth = text.length * size * 0.48
  const x = Math.max(54, Math.round((842 - estimatedWidth) / 2))

  return textCommand(text, x, y, size, font)
}

function createCertificatePdf(name: string, moduleCount: number) {
  const issuedAt = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const content = [
    'q 1.8 w 42 42 758 511 re S Q',
    'q 0.8 w 56 56 730 483 re S Q',
    centeredTextCommand('SESPIM LEMDIKLAT POLRI', 500, 14, 'F2'),
    centeredTextCommand('SERTIFIKAT CALON WIDYAISWARA', 438, 28, 'F2'),
    centeredTextCommand('Keterangan telah mengikuti Pelatihan Calon Widyaiswara Inpassing', 404, 13, 'F2'),
    centeredTextCommand('Sespim Lemdiklat Polri', 384, 13, 'F2'),
    centeredTextCommand('Diberikan Kepada:', 330, 11),
    centeredTextCommand(name.trim().toUpperCase(), 280, 24, 'F2'),
    centeredTextCommand(`Telah menyelesaikan seluruh dari ${moduleCount} Modul Pembelajaran Mandiri Inpassing`, 220, 12),
    centeredTextCommand('Widyaiswara Sespim Lemdiklat Polri dengan hasil baik.', 200, 12),
    centeredTextCommand(`Tanggal Terbit: ${issuedAt}`, 150, 11),
    textCommand('KEPALA SESPIM LEMDIKLAT POLRI', 520, 100, 11, 'F2'),
    textCommand('Irjen Pol. Dr. Chryshnanda Dwilaksana, M.Si.', 520, 68, 10)
  ].join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  ]

  const header = '%PDF-1.4\n'
  let body = ''
  const offsets: number[] = []

  objects.forEach((object, index) => {
    offsets.push(header.length + body.length)
    body += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = header.length + body.length
  const xref = [
    `xref\n0 ${objects.length + 1}`,
    '0000000000 65535 f ',
    ...offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n `),
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    `startxref\n${xrefOffset}`,
    '%%EOF'
  ].join('\n')

  return `${header}${body}${xref}`
}

export function InpassingModuleWorkspace({ modules }: InpassingModuleWorkspaceProps) {
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(progressStorageKey)
      if (stored) {
        try { return JSON.parse(stored) as string[] } catch {}
      }
    }
    return []
  })

  const [certificateName, setCertificateName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(certificateNameStorageKey) || ''
    }
    return ''
  })

  const [openedVideos, setOpenedVideos] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('sespim-inpassing-videos-v1')
      if (stored) {
        try { return JSON.parse(stored) as string[] } catch {}
      }
    }
    return []
  })

  const [openedPdfs, setOpenedPdfs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('sespim-inpassing-pdfs-v1')
      if (stored) {
        try { return JSON.parse(stored) as string[] } catch {}
      }
    }
    return []
  })

  useEffect(() => {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(completedModuleIds))
  }, [completedModuleIds])

  useEffect(() => {
    window.localStorage.setItem(certificateNameStorageKey, certificateName)
  }, [certificateName])

  useEffect(() => {
    window.localStorage.setItem('sespim-inpassing-videos-v1', JSON.stringify(openedVideos))
  }, [openedVideos])

  useEffect(() => {
    window.localStorage.setItem('sespim-inpassing-pdfs-v1', JSON.stringify(openedPdfs))
  }, [openedPdfs])

  const moduleIdSet = useMemo(() => new Set(modules.map((module) => module.id)), [modules])
  const completedSet = useMemo(() => new Set(completedModuleIds.filter((moduleId) => moduleIdSet.has(moduleId))), [completedModuleIds, moduleIdSet])
  const completedCount = completedSet.size
  const completionPercent = modules.length ? Math.round((completedCount / modules.length) * 100) : 0
  const certificateReady = completedCount === modules.length && certificateName.trim().length >= 3

  function toggleModule(moduleId: string) {
    setCompletedModuleIds((current) => {
      if (current.includes(moduleId)) {
        return current.filter((id) => id !== moduleId)
      }

      return [...current, moduleId]
    })
  }

  function resetProgress() {
    setCompletedModuleIds([])
    setOpenedVideos([])
    setOpenedPdfs([])
  }

  function downloadCertificate() {
    if (!certificateReady) return

    const pdf = createCertificatePdf(certificateName, modules.length)
    const blob = new Blob([pdf], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = certificateFileName(certificateName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Progress</p>
          <p className="mt-3 text-3xl font-black text-polri-brownDark">{completionPercent}%</p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-polri-cream">
            <div className="h-full rounded-full bg-polri-gold" style={{ width: `${completionPercent}%` }} />
          </div>
        </article>
        <article className="rounded-lg border border-polri-gold/25 bg-white p-5 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Modul Selesai</p>
          <p className="mt-3 text-3xl font-black text-polri-brownDark">{completedCount}/{modules.length}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-neutral-600">Checklist tersimpan pada browser peserta.</p>
        </article>
        <article className="rounded-lg border border-polri-gold/25 bg-polri-brownDark p-5 text-white shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-goldSoft">Status Sertifikat</p>
          <p className="mt-3 text-2xl font-black">{completedCount === modules.length ? 'Siap diklaim' : 'Belum lengkap'}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{modules.length - completedCount} modul tersisa.</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {modules.map((module) => {
          const completed = completedSet.has(module.id)
          const hasVideo = !!module.videoHref
          const hasPdf = !!module.pdfHref
          const videoWatched = !hasVideo || openedVideos.includes(module.id)
          const pdfOpened = !hasPdf || openedPdfs.includes(module.id)
          const isEligible = videoWatched && pdfOpened

          return (
            <article key={module.id} className="overflow-hidden rounded-lg border border-polri-gold/25 bg-white shadow-soft">
              <div className="flex items-start justify-between gap-4 border-b border-polri-gold/20 bg-polri-cream p-5">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Modul {module.order}</p>
                  <h2 className="mt-2 text-xl font-black leading-7 text-polri-brownDark">{module.title}</h2>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-polri-maroon">
                  {completed ? <CheckCircleIcon className="h-6 w-6 text-green-700" aria-hidden="true" /> : <PlayCircleIcon className="h-6 w-6" aria-hidden="true" />}
                </span>
              </div>

              <div className="grid gap-4 p-5">
                <p className="text-sm font-semibold leading-7 text-neutral-700">{module.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {module.videoHref ? (
                    <a
                      href={module.videoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (!openedVideos.includes(module.id)) {
                          setOpenedVideos([...openedVideos, module.id])
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-polri-brownDark px-4 py-3 text-sm font-black text-white hover:bg-polri-maroon"
                    >
                      <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
                      Tonton Video
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 text-sm font-black text-neutral-500">
                      <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                      Video menyusul
                    </div>
                  )}

                  {module.pdfHref ? (
                    <a
                      href={module.pdfHref}
                      download={module.pdfFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (!openedPdfs.includes(module.id)) {
                          setOpenedPdfs([...openedPdfs, module.id])
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-polri-gold px-4 py-3 text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                      Unduh PDF
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 text-sm font-black text-neutral-500">
                      <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                      PDF menyusul
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label 
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-black transition ${
                      isEligible 
                        ? 'cursor-pointer border-polri-gold/25 bg-white text-polri-brownDark hover:bg-polri-cream' 
                        : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completed}
                      disabled={!isEligible}
                      onChange={() => toggleModule(module.id)}
                      className="h-5 w-5 rounded border-polri-gold text-polri-maroon disabled:opacity-50"
                    />
                    Sudah dipelajari
                  </label>
                  {!isEligible && (
                    <p className="text-[11px] font-bold text-polri-maroon flex items-start gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      Harap tonton video pembelajaran dan baca PDF terlebih dahulu untuk mengaktifkan checklist.
                    </p>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="rounded-lg border border-polri-gold/25 bg-polri-brownDark p-6 text-white shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-goldSoft">Klaim Sertifikat</p>
            <h2 className="mt-3 text-2xl font-black">Sertifikat Penyelesaian 8 Modul</h2>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Sertifikat dapat diunduh setelah seluruh modul selesai dipelajari.
            </p>
          </div>
          <div className="grid gap-3">
            <label className="grid gap-2">
              <span className="text-sm font-black text-polri-goldSoft">Nama peserta</span>
              <input
                value={certificateName}
                onChange={(event) => setCertificateName(event.target.value)}
                type="text"
                placeholder="Masukkan nama lengkap"
                className="rounded-lg border border-polri-gold/40 bg-white px-4 py-3 text-sm font-bold text-polri-brownDark outline-none focus:border-polri-gold"
              />
            </label>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={downloadCertificate}
                disabled={!certificateReady}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-polri-gold px-5 py-3 text-sm font-black text-polri-brownDark hover:bg-polri-goldSoft disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
              >
                <TrophyIcon className="h-5 w-5" aria-hidden="true" />
                Download Sertifikat PDF
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-lg border border-white/20 px-4 py-3 text-sm font-black text-white/82 hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
