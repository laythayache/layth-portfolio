import type { Metadata } from 'next'
import './globals.css'

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
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

