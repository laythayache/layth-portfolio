import type { Metadata } from 'next'
import './globals.css'
import SpinningLogo from '@/components/SpinningLogo'
import SiteNav from '@/components/SiteNav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://laythayache.com'),
  title: {
    default: 'Layth Ayache',
    template: '%s · Layth Ayache',
  },
  description: 'I\'m a student building in public—documenting decisions, failures, and what changed my mind. Projects include completed work, ongoing experiments, friends\' collaborations, and ideas shared for the long term.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Layth Ayache',
    description: 'I\'m a student building in public—documenting decisions, failures, and what changed my mind. Projects include completed work, ongoing experiments, friends\' collaborations, and ideas shared for the long term.',
    url: 'https://laythayache.com',
    siteName: 'Layth Ayache',
    type: 'website',
    // TODO: Add og.png to /public if you want Open Graph image
    // images: [{ url: '/og.png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Layth Ayache',
  url: 'https://laythayache.com',
  description: 'Learning in public through projects, failures, and revisions.',
  inLanguage: 'en',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#ede7dd] px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
            <Link href="/" className="flex items-center gap-0 flex-shrink-0">
              <SpinningLogo
                src="/logo-mark.svg"
                alt="Logo"
                className="block h-12 w-auto md:h-[6.09rem]"
              />
              <div className="flex flex-col leading-tight -ml-3 md:-ml-8">
                <span className="text-lg font-semibold tracking-tight md:text-[1.4775rem]" style={{ color: '#2b2e34' }}>
                  LAYTH
                </span>
                <span className="text-base font-semibold tracking-tight md:text-[1.23125rem]" style={{ color: '#2b2e34' }}>
                  AYACHE
                </span>
              </div>
            </Link>
            <SiteNav />
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  )
}
