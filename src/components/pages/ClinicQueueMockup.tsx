'use client'

import { useEffect, useMemo, useState } from 'react'

type QueueSessionKey = 'pagi' | 'sore'

const queueSessions: Record<
  QueueSessionKey,
  {
    label: string
    time: string
    prefix: string
    current: number
    waiting: number
    averageMinutes: number
    doctor: string
  }
> = {
  pagi: {
    label: 'Pelayanan Pagi',
    time: '08.00 - 11.00 WIB',
    prefix: 'P',
    current: 12,
    waiting: 8,
    averageMinutes: 7,
    doctor: 'Poli Umum / Pendaftaran Pagi'
  },
  sore: {
    label: 'Pelayanan Sore',
    time: '16.00 - 19.00 WIB',
    prefix: 'S',
    current: 4,
    waiting: 5,
    averageMinutes: 8,
    doctor: 'Poli Umum / Pendaftaran Sore'
  }
}

function formatQueueNumber(prefix: string, value: number) {
  return `${prefix}-${String(value).padStart(3, '0')}`
}

export function ClinicQueueMockup() {
  const [selectedSession, setSelectedSession] = useState<QueueSessionKey>('pagi')
  const [lastUpdate, setLastUpdate] = useState('Memuat...')
  const [additions, setAdditions] = useState<Record<QueueSessionKey, number>>({ pagi: 0, sore: 0 })
  const [registeredQueue, setRegisteredQueue] = useState<{ session: QueueSessionKey; number: string } | null>(null)

  useEffect(() => {
    function updateClock() {
      setLastUpdate(new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()))
    }

    updateClock()
    const timer = window.setInterval(updateClock, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const activeSession = queueSessions[selectedSession]
  const waitingCount = activeSession.waiting + additions[selectedSession]
  const nextNumber = activeSession.current + waitingCount + 1
  const estimatedMinutes = useMemo(() => waitingCount * activeSession.averageMinutes, [activeSession.averageMinutes, waitingCount])

  function handleTakeQueue() {
    const number = formatQueueNumber(activeSession.prefix, nextNumber)
    setRegisteredQueue({ session: selectedSession, number })
    setAdditions((current) => ({
      ...current,
      [selectedSession]: current[selectedSession] + 1
    }))
  }

  return (
    <section className="rounded-lg border border-polri-gold/35 bg-polri-cream p-5 shadow-gold sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-polri-maroon">Antrian Realtime</p>
          <h2 className="mt-3 text-2xl font-black text-polri-brownDark sm:text-3xl">Pendaftaran pasien tanpa menunggu lama di klinik</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
            Mockup ini menampilkan konsep antrian online untuk pelayanan pagi dan sore. Pasien dapat mengambil nomor dari portal, melihat estimasi waktu tunggu, lalu datang mendekati giliran.
          </p>
        </div>
        <div className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-polri-brownDark shadow-soft">
          Update terakhir: <span className="text-polri-maroon">{lastUpdate}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(Object.keys(queueSessions) as QueueSessionKey[]).map((key) => {
          const session = queueSessions[key]
          const active = selectedSession === key

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedSession(key)}
              className={`rounded-lg border px-5 py-4 text-left transition ${
                active
                  ? 'border-polri-maroon bg-polri-brownDark text-white shadow-gold'
                  : 'border-polri-gold/30 bg-white text-polri-brownDark hover:border-polri-gold'
              }`}
            >
              <span className={active ? 'text-sm font-black uppercase tracking-[0.18em] text-polri-goldSoft' : 'text-sm font-black uppercase tracking-[0.18em] text-polri-maroon'}>
                {session.label}
              </span>
              <span className="mt-2 block text-lg font-black">{session.time}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Sedang Dilayani</p>
            <p className="mt-3 text-3xl font-black text-polri-brownDark">{formatQueueNumber(activeSession.prefix, activeSession.current)}</p>
            <p className="mt-2 text-sm font-semibold text-neutral-600">{activeSession.doctor}</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Nomor Berikutnya</p>
            <p className="mt-3 text-3xl font-black text-polri-brownDark">{formatQueueNumber(activeSession.prefix, activeSession.current + 1)}</p>
            <p className="mt-2 text-sm font-semibold text-neutral-600">Siapkan identitas pasien.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Menunggu</p>
            <p className="mt-3 text-3xl font-black text-polri-brownDark">{waitingCount}</p>
            <p className="mt-2 text-sm font-semibold text-neutral-600">Pasien dalam antrean.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-polri-maroon">Estimasi</p>
            <p className="mt-3 text-3xl font-black text-polri-brownDark">{estimatedMinutes} mnt</p>
            <p className="mt-2 text-sm font-semibold text-neutral-600">Perkiraan waktu tunggu.</p>
          </div>
        </div>

        <aside className="rounded-lg bg-polri-brownDark p-5 text-white shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-polri-goldSoft">Pendaftaran Online</p>
          {registeredQueue ? (
            <div className="mt-5 rounded-lg bg-white p-5 text-polri-brownDark">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-polri-maroon">Nomor Anda</p>
              <p className="mt-2 text-4xl font-black">{registeredQueue.number}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-neutral-700">
                Datang ke klinik sekitar 15 menit sebelum estimasi giliran.
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-white/72">
              Pilih jadwal pelayanan, ambil nomor antrian, lalu pantau estimasi waktu sebelum datang ke klinik.
            </p>
          )}
          <button
            type="button"
            onClick={handleTakeQueue}
            className="mt-5 w-full rounded-lg bg-polri-gold px-5 py-4 text-sm font-black text-polri-brownDark transition hover:bg-polri-goldSoft"
          >
            Ambil Nomor Antrian
          </button>
          <a
            href="https://app.klinik-sespimpolri.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-polri-gold/60 px-5 py-4 text-center text-sm font-black text-polri-goldSoft transition hover:bg-white/10"
          >
            Buka Sistem Antrian Resmi
          </a>
        </aside>
      </div>
    </section>
  )
}
