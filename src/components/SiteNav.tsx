'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sections } from '@/lib/sections'

export default function SiteNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {sections.map((section) => {
          const isActive = pathname === section.href
          return (
            <Link
              key={section.key}
              href={section.href}
              className={`text-sm font-medium transition-colors relative ${
                isActive
                  ? 'text-[#2b2e34]'
                  : 'text-[#6b7280] hover:text-[#2b2e34]'
              }`}
            >
              {section.navLabel}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#2b2e34]" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        <button
          onClick={toggleMobileMenu}
          className="text-sm font-medium text-[#2b2e34] focus:outline-none focus:ring-2 focus:ring-[#2b2e34] focus:ring-offset-2 focus:ring-offset-[#ede7dd] rounded px-2 py-1"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full right-0 mt-2 bg-[#ede7dd] border border-[#d1d5db] rounded-lg shadow-sm min-w-[160px] z-50"
          >
            <div className="flex flex-col px-4 py-3 gap-3">
              {sections.map((section) => {
                const isActive = pathname === section.href
                return (
                  <Link
                    key={section.key}
                    href={section.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#2b2e34]'
                        : 'text-[#6b7280] hover:text-[#2b2e34]'
                    }`}
                  >
                    {section.navLabel}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

