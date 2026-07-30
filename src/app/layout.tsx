import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ActivityTracker } from '@/components/layout/ActivityTracker'
import { FloatingChatWidget } from '@/components/layout/FloatingChatWidget'

export const metadata: Metadata = {
  title: 'Portal Resmi Sespim Lemdiklat Polri',
  description: 'Portal Resmi Sespim Lemdiklat Polri - Lembaga pendidikan kepemimpinan kepolisian untuk mewujudkan pimpinan Polri yang profesional, berintegritas, dan strategis.',
  icons: {
    icon: '/images/logo-sespim.png',
    apple: '/images/logo-sespim.png'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <ActivityTracker />
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <FloatingChatWidget />
        <Footer />
      </body>
    </html>
  )
}
