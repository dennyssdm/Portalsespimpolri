'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChatBubbleLeftEllipsisIcon, 
  XMarkIcon, 
  PaperAirplaneIcon, 
  TrashIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { API_BASE_URL } from '@/lib/api'

type Message = {
  id: string
  sender: 'user' | 'model' | 'operator'
  text: string
  timestamp: Date
  operatorName?: string
}

const QUICK_PROMPTS = [
  'Apa saja program pendidikan di Sespim?',
  'Di mana alamat Sespim Lemdiklat Polri?',
  'Bagaimana cara klaim Sertifikat Inpassing?',
  'Siapa pimpinan Sespim saat ini?'
]

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [isOperatorRequested, setIsOperatorRequested] = useState(false)
  const [operatorActive, setOperatorActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize Session ID and Welcome Message
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let existingSession = localStorage.getItem('wira_session_id')
      if (!existingSession) {
        existingSession = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
        localStorage.setItem('wira_session_id', existingSession)
      }
      setSessionId(existingSession)
    }

    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'model',
          text: 'Siap! Selamat datang di Portal Resmi Sespim Lemdiklat Polri. Saya **Agen Wira**, Virtual Assistant Anda. Ada yang bisa saya bantu terkait program pendidikan, inpassing Widyaiswara, atau informasi umum lainnya?',
          timestamp: new Date()
        }
      ])
    }
  }, [messages.length])

  // External event trigger (e.g. from Contact Page button)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-wira-chat', handleOpen)
    return () => window.removeEventListener('open-wira-chat', handleOpen)
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Poll for Operator Replies when Chat is Open
  useEffect(() => {
    if (!isOpen || !sessionId) return

    const pollMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/chatbot/messages/${sessionId}`)
        if (res.ok) {
          const json = await res.json()
          if (json.status === 'success' && Array.isArray(json.data?.messages)) {
            const dbLogs = json.data.messages
            
            // Check if operator replied
            const opLogs = dbLogs.filter((log: any) => log.sender === 'operator')
            if (opLogs.length > 0) {
              setOperatorActive(true)
            }

            // Sync messages if new entries from operator exist
            setMessages((prev) => {
              const prevIds = new Set(prev.map(m => m.id))
              const newItems: Message[] = []
              
              opLogs.forEach((log: any) => {
                const logId = `op_${log.id}`
                if (!prevIds.has(logId)) {
                  newItems.push({
                    id: logId,
                    sender: 'operator',
                    text: log.message,
                    timestamp: new Date(log.created_at),
                    operatorName: log.operator_name || 'Operator Sespim'
                  })
                }
              })

              if (newItems.length > 0) {
                return [...prev, ...newItems]
              }
              return prev
            })
          }
        }
      } catch (err) {
        // Silent catch for polling
      }
    }

    pollMessages()
    const interval = setInterval(pollMessages, 4000)
    return () => clearInterval(interval)
  }, [isOpen, sessionId])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Build chat history for Gemini API
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: m.sender === 'operator' ? 'model' : m.sender,
        parts: [{ text: m.text }]
      }))

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: history,
          sessionId: sessionId,
          visitorName: 'Pengunjung Portal'
        })
      })

      if (!response.ok) {
        throw new Error('API returned an error')
      }

      const json = await response.json()
      if (json.status === 'success') {
        const botMessage: Message = {
          id: Math.random().toString(),
          sender: 'model',
          text: json.data.reply,
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        throw new Error(json.message || 'Unknown error')
      }
    } catch (err) {
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: 'model',
        text: 'Mohon maaf, terjadi gangguan koneksi ke server. Anda dapat menekan tombol **"Hubungkan ke Operator Sespim"** untuk disambungkan langsung dengan petugas piket Sespim.',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestOperator = async () => {
    if (isOperatorRequested) return

    setIsOperatorRequested(true)
    const requestMessage: Message = {
      id: Math.random().toString(),
      sender: 'model',
      text: '🔔 **Permintaan bantuan operator telah terkirim.**\n\nPetugas operator piket Sespim Lemdiklat Polri telah menerima notifikasi obrolan Anda di Dashboard Utama Admin. Mohon menunggu sejenak, balasan operator akan langsung tampil di sini.',
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, requestMessage])

    try {
      await fetch(`${API_BASE_URL}/api/chatbot/request-operator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, visitorName: 'Pengunjung Portal' })
      })
    } catch (err) {
      console.warn('Failed to send operator request:', err)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Hapus semua riwayat percakapan?')) {
      const newSess = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
      if (typeof window !== 'undefined') {
        localStorage.setItem('wira_session_id', newSess)
      }
      setSessionId(newSess)
      setIsOperatorRequested(false)
      setOperatorActive(false)
      setMessages([
        {
          id: 'welcome',
          sender: 'model',
          text: 'Siap! Riwayat percakapan telah dibersihkan. Sesi obrolan baru telah dibuat. Ada yang bisa saya bantu kembali?',
          timestamp: new Date()
        }
      ])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 flex h-[520px] w-[365px] sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-polri-gold/25 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-polri-brownDark via-polri-brown to-polri-maroon p-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white overflow-hidden shadow-md border border-polri-gold/30 shrink-0">
                <img src="/images/wira-avatar.png" alt="Agen Wira" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black tracking-wide uppercase">Agen Wira</h4>
                  {operatorActive && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-emerald-500 text-white rounded-full">
                      Live Operator
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-polri-goldSoft font-bold flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${operatorActive ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`} />
                  {operatorActive ? 'Operator Human Aktif' : 'Online • AI Assistant'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={handleClearChat}
                title="Bersihkan percakapan & buat sesi baru"
                className="rounded-lg p-1.5 hover:bg-white/10 transition text-white/80 hover:text-white"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/10 transition text-white/80 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Bot Avatar */}
                  {msg.sender === 'model' && (
                    <div className="h-7 w-7 rounded-full bg-white border border-polri-gold/25 shadow-sm shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
                      <img src="/images/wira-avatar.png" alt="Wira" className="h-full w-full object-cover" />
                    </div>
                  )}

                  {/* Human Operator Avatar */}
                  {msg.sender === 'operator' && (
                    <div className="h-7 w-7 rounded-full bg-emerald-600 border border-emerald-300 text-white shadow-sm shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-polri-gold to-polri-gold/90 text-polri-brownDark font-semibold rounded-tr-none' 
                      : msg.sender === 'operator'
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-tl-none font-medium'
                      : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-tl-none font-medium'
                  }`}>
                    {msg.sender === 'operator' && (
                      <p className="text-[10px] font-black uppercase text-emerald-700 tracking-wider mb-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {msg.operatorName || 'Operator Sespim'}
                      </p>
                    )}
                    <div 
                      className="whitespace-pre-line text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: msg.text
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="h-7 w-7 rounded-full bg-white border border-polri-gold/25 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
                    <img src="/images/wira-avatar.png" alt="Wira" className="h-full w-full object-cover" />
                  </div>
                  <div className="bg-white border border-neutral-200/80 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts & Operator Handover Action */}
          <div className="px-3 py-2.5 bg-neutral-50 border-t border-neutral-200/50 space-y-2">
            {messages.length === 1 && !isLoading && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1 pl-0.5">Pertanyaan Populer</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[10px] font-bold text-left px-2.5 py-1 rounded-lg bg-white border border-polri-gold/20 text-polri-brownDark hover:bg-polri-cream hover:border-polri-gold/50 transition duration-200 shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Request Human Operator Action Button */}
            <button
              type="button"
              onClick={handleRequestOperator}
              disabled={isOperatorRequested || operatorActive}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              <UserGroupIcon className="h-4 w-4 text-emerald-600" />
              {operatorActive 
                ? 'Operator Sespim Sedang Terhubung' 
                : isOperatorRequested 
                ? 'Menunggu Tanggapan Operator...' 
                : 'Hubungkan ke Operator Sespim (Human)'}
            </button>
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(inputText)
            }}
            className="flex items-center gap-2 border-t border-neutral-200 bg-white p-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={operatorActive ? "Ketik pesan ke Operator Sespim..." : "Tulis pertanyaan Anda di sini..."}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs sm:text-sm focus:border-polri-gold/50 focus:bg-white focus:outline-none transition duration-200 disabled:opacity-50 text-neutral-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-polri-gold to-polri-gold/90 text-polri-brownDark hover:brightness-105 transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-polri-gold to-polri-gold/90 text-polri-brownDark shadow-2xl hover:-translate-y-0.5 transition duration-200 group relative border border-white/20"
        title="Hubungi Agen Wira (Virtual Assistant)"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-polri-brownDark font-bold" />
        ) : (
          <>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-polri-brownDark" />
            <span className="absolute -inset-0.5 rounded-full border-2 border-polri-gold/45 animate-ping opacity-60" />
            {isOperatorRequested && !operatorActive && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] text-white font-bold items-center justify-center">!</span>
              </span>
            )}
          </>
        )}
      </button>
    </div>
  )
}
