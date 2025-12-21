import type { Metadata } from 'next'
import './globals.css'
import { BrandSequenceProvider } from '@/components/brand/BrandSequenceProvider'

export const metadata: Metadata = {
  title: 'Layth Ayache',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <BrandSequenceProvider>
          {children}
        </BrandSequenceProvider>
      </body>
    </html>
  )
}

