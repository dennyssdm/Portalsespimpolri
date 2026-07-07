import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Portal Resmi Sespim Lemdiklat Polri',
  description: 'SOT-driven front-end portal Sespim Lemdiklat Polri dengan Next.js dan Tailwind CSS.',
  icons: {
    icon: '/images/logo-sespim.png',
    apple: '/images/logo-sespim.png'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
