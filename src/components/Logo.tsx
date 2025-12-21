'use client'

import { useState, useEffect } from 'react'

export default function Logo() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect if device supports hover
    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsTouchDevice(mediaQuery.matches)
  }, [])

  const handleClick = () => {
    if (isTouchDevice) {
      setIsSpinning(true)
      setTimeout(() => setIsSpinning(false), 600)
    }
  }

  return (
    <img
      src="/logo-mark.svg"
      alt="Logo"
      className={`block h-12 w-auto md:h-[6.09rem] logo-hover cursor-pointer ${
        isSpinning ? 'logo-spin' : ''
      }`}
      onClick={handleClick}
    />
  )
}
