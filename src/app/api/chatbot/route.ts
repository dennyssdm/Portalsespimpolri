import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/lib/api'

export const dynamic = 'force-dynamic'

type HistoryItem = {
  role: 'user' | 'model'
  parts: { text: string }[]
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { message, history, sessionId, visitorName } = body as { 
      message?: string
      history?: HistoryItem[] 
      sessionId?: string
      visitorName?: string
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { status: 'error', message: 'Pesan wajib diisi.' },
        { status: 400 }
      )
    }

    // Try forwarding to Express backend API first for database logging & operator sync
    try {
      const expressRes = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, sessionId, visitorName })
      })

      if (expressRes.ok) {
        const json = await expressRes.json()
        return NextResponse.json(json)
      }
    } catch (err) {
      console.warn('Express API backend unavailable for chatbot logging, running standalone fallback:', err)
    }

    // If Express backend is offline, run standalone fallback response
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY

    if (apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
        
        const requestBody = {
          systemInstruction: {
            parts: [
              {
                text: "Anda adalah Agen Wira, Virtual Assistant resmi Sespim Lemdiklat Polri. Tugas Anda adalah membantu menjawab pertanyaan seputar Sespim Lemdiklat Polri, seperti program Sespimti, Sespimmen, Sespimma, profil pimpinan (Irjen Pol. Midi Siswoko, S.I.K.), Widyaiswara, materi terbuka, lokasi Kampus Lembang (Jl. Maribaya No.53, Kayuambon, Lembang, Bandung Barat), sejarah, serta klaim inpassing widyaiswara. Gunakan gaya bahasa kepolisian yang sopan, formal, profesional, dan gunakan istilah khas seperti 'Siap', 'Mohon izin', 'Terima kasih'."
              }
            ]
          },
          contents: [] as { role: string; parts: { text: string }[] }[]
        }

        if (Array.isArray(history) && history.length > 0) {
          requestBody.contents = history.map((item) => ({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.parts?.[0]?.text || '' }]
          })).filter(item => item.parts[0].text)
        }

        requestBody.contents.push({
          role: 'user',
          parts: [{ text: message }]
        })

        const aiResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })

        if (aiResponse.ok) {
          const json = await aiResponse.json()
          const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text
          if (replyText) {
            return NextResponse.json({
              status: 'success',
              data: {
                sessionId: sessionId || `sess_${Date.now()}`,
                reply: replyText,
                isSimulated: false,
                status: 'bot_replied'
              }
            })
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to simulated response:', err)
      }
    }

    const replyText = getSimulatedResponse(message)

    return NextResponse.json({
      status: 'success',
      data: {
        sessionId: sessionId || `sess_${Date.now()}`,
        reply: replyText,
        isSimulated: true,
        status: 'bot_replied'
      }
    })
  } catch (error: any) {
    console.error('Error in chatbot API route:', error)
    return NextResponse.json(
      {
        status: 'success',
        data: {
          reply: 'Siap! Mohon maaf saat ini lalu lintas jaringan sedang padat. Namun, informasi umum mengenai program pendidikan, fasilitas, dan kontak Sespim Lemdiklat Polri dapat Anda akses melalui menu navigasi portal resmi kami.',
          isSimulated: true,
          status: 'bot_replied'
        }
      },
      { status: 200 }
    )
  }
}

function getSimulatedResponse(message: string): string {
  const msg = message.toLowerCase()

  if (msg.includes('siapa kamu') || msg.includes('nama kamu') || msg.includes('wira') || msg.includes('siapa anda')) {
    return 'Siap! Saya adalah **Agen Wira**, Virtual Assistant resmi Sespim Lemdiklat Polri. Saya siap membantu Anda memberikan informasi mengenai program pendidikan, inpassing Widyaiswara, fasilitas, maupun profil kelembagaan Sespim Polri.'
  }

  if (msg.includes('sespimmen') || msg.includes('sespimti') || msg.includes('sespimma') || msg.includes('sppk') || msg.includes('program') || msg.includes('pendidikan')) {
    return 'Siap! Sespim Lemdiklat Polri menyelenggarakan program pendidikan kepemimpinan manajerial kepolisian:\n\n1. **Sespimti** (Sekolah Staf dan Pimpinan Tinggi): Untuk Perwira Tinggi / Menengah senior.\n2. **Sespimmen** (Sekolah Staf dan Pimpinan Menengah): Untuk Perwira Menengah (Serdik Sespimmen).\n3. **Sespimma** (Sekolah Staf dan Pimpinan Pertama): Untuk Perwira Pertama.\n4. **SPPK** (Sekolah Pengembangan Profesi Kepolisian): Penguatan profesi dan kepemimpinan taktis.'
  }

  if (msg.includes('inpassing') || msg.includes('sertifikat') || msg.includes('klaim') || msg.includes('widyaiswara')) {
    return 'Siap! Untuk klaim Sertifikat Inpassing Widyaiswara, silakan ikuti langkah berikut:\n\n1. Masuk ke **Dashboard Internal Sespim** melalui menu **Login Internal**.\n2. Pilih menu **Klaim Sertifikat Inpassing**.\n3. Masukkan nomor identitas/NIP/NRP dan klik **Klaim Sertifikat**.\n4. Setelah sukses diklaim, status sertifikat Inpassing Anda akan otomatis terintegrasi ke dalam direktori publik Widyaiswara Sespim.'
  }

  if (msg.includes('alamat') || msg.includes('lokasi') || msg.includes('di mana') || msg.includes('dimana') || msg.includes('lembang')) {
    return 'Siap! Kampus Sespim Lemdiklat Polri berlokasi di:\n\n📍 **Jl. Maribaya No.53, Kayuambon, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391**.'
  }

  if (msg.includes('pimpinan') || msg.includes('kasespim') || msg.includes('kepala') || msg.includes('komandan')) {
    return 'Siap! Kepala Sespim (Kasespim) Lemdiklat Polri saat ini dijabat oleh **Irjen Pol. Midi Siswoko, S.I.K.**'
  }

  if (msg.includes('kontak') || msg.includes('telepon') || msg.includes('email') || msg.includes('hubungi')) {
    return 'Siap! Anda dapat menghubungi Sespim Lemdiklat Polri melalui:\n\n📞 **Nomor Telepon**: +62 22 2786 110\n✉️ **Email Resmi**: info@sespim-polri.id\n📍 **Alamat**: Jl. Maribaya No.53, Lembang, Bandung Barat.'
  }

  if (msg.includes('terima kasih') || msg.includes('thanks') || msg.includes('makasih') || msg.includes('suwun')) {
    return 'Siap! Sama-sama. Senang bisa membantu Anda. Apabila ada hal lain yang ingin ditanyakan seputar Sespim Lemdiklat Polri, Agen Wira siap membantu.'
  }

  return `Siap! Terima kasih atas pertanyaan Anda mengenai "${message}".\n\nUntuk informasi lebih detil dan dokumen resmi terbaru, Anda dapat menjelajahi menu **Profil**, **Program Pendidikan**, **Widyaiswara**, atau **Informasi Publik** pada portal ini.`
}
