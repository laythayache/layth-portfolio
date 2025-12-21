import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
