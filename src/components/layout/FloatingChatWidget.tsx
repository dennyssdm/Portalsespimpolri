'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChatBubbleLeftEllipsisIcon, 
  XMarkIcon, 
  PaperAirplaneIcon, 
  TrashIcon
} from '@heroicons/react/24/outline'
import { API_BASE_URL } from '@/lib/api'

type Message = {
  id: string
  sender: 'user' | 'model'
  text: string
  timestamp: Date
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with a welcome message from Agen Wira
  useEffect(() => {
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

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Listen to external window events to open chatbot (e.g. from Contact Page card click)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-wira-chat', handleOpen)
    return () => window.removeEventListener('open-wira-chat', handleOpen)
  }, [])

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
        role: m.sender,
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
          history: history
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
        text: 'Mohon maaf, terjadi gangguan koneksi ke server. Mohon coba beberapa saat lagi.',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Hapus semua riwayat percakapan?')) {
      setMessages([
        {
          id: 'welcome',
          sender: 'model',
          text: 'Siap! Riwayat percakapan telah dibersihkan. Ada yang bisa saya bantu kembali?',
          timestamp: new Date()
        }
      ])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-polri-gold/25 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-polri-brownDark to-polri-maroon p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white overflow-hidden shadow-md border border-polri-gold/30">
                <img src="/images/wira-avatar.png" alt="Agen Wira" className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-wide uppercase">Agen Wira</h4>
                <p className="text-[10px] text-polri-goldSoft font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • AI Assistant
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={handleClearChat}
                title="Bersihkan percakapan"
                className="rounded-lg p-1.5 hover:bg-white/10 transition text-white/80 hover:text-white"
              >
                <TrashIcon className="h-4.5 w-4.5" />
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
                  {/* Avatar */}
                  {msg.sender === 'model' && (
                    <div className="h-7 w-7 rounded-full bg-white border border-polri-gold/25 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
                      <img src="/images/wira-avatar.png" alt="Wira" className="h-full w-full object-cover" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-polri-gold to-polri-gold/90 text-polri-brownDark font-semibold rounded-tr-none' 
                      : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-tl-none font-medium'
                  }`}>
                    {/* Render simple markdown bold syntax */}
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

          {/* Quick Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200/50">
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5 pl-0.5">Pertanyaan Populer</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] sm:text-xs font-bold text-left px-2.5 py-1.5 rounded-lg bg-white border border-polri-gold/20 text-polri-brownDark hover:bg-polri-cream hover:border-polri-gold/50 transition duration-200 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

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
              placeholder="Tulis pertanyaan Anda di sini..."
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
            {/* Pulsing Outer Border Ring */}
            <span className="absolute -inset-0.5 rounded-full border-2 border-polri-gold/45 animate-ping opacity-60" />
          </>
        )}
      </button>
    </div>
  )
}
