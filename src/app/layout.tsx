import type { Metadata } from 'next'
import './globals.css'
import SpinningLogo from '@/components/SpinningLogo'

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
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#ede7dd] px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-0">
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
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
