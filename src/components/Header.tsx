'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import SpinningLogo from '@/components/SpinningLogo'
import MagneticLetters from '@/components/MagneticLetters'
import SiteNav from '@/components/SiteNav'

export default function Header() {
  const logoRef = useRef<HTMLImageElement>(null)
  const [logoElement, setLogoElement] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (logoRef.current) {
      setLogoElement(logoRef.current)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ede7dd] px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
        <Link href="/" className="flex items-center gap-0 flex-shrink-0">
          <SpinningLogo
            ref={logoRef}
            src="/logo-mark.svg"
            alt="Logo"
            className="block h-12 w-auto md:h-[6.09rem]"
          />
          <div className="flex flex-col leading-tight -ml-3 md:-ml-8 relative">
            {logoElement ? (
              <div className="flex flex-col">
                <MagneticLetters
                  text="LAYTH"
                  svgElement={logoElement}
                  radius={120}
                  baseRepelStrength={40}
                  maxPush={60}
                  returnLerp={0.15}
                  velocityRef={7}
                  glowMax={1}
                  className="text-lg font-semibold tracking-tight md:text-[1.4775rem]"
                  style={{ color: '#2b2e34' }}
                />
                <MagneticLetters
                  text="AYACHE"
                  svgElement={logoElement}
                  radius={120}
                  baseRepelStrength={40}
                  maxPush={60}
                  returnLerp={0.15}
                  velocityRef={7}
                  glowMax={1}
                  className="text-base font-semibold tracking-tight md:text-[1.23125rem]"
                  style={{ color: '#2b2e34' }}
                />
              </div>
            ) : (
              <>
                <span className="text-lg font-semibold tracking-tight md:text-[1.4775rem]" style={{ color: '#2b2e34' }}>
                  LAYTH
                </span>
                <span className="text-base font-semibold tracking-tight md:text-[1.23125rem]" style={{ color: '#2b2e34' }}>
                  AYACHE
                </span>
              </>
            )}
          </div>
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}

