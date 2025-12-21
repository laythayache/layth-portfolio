'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'

interface LetterData {
  element: HTMLSpanElement
  baseX: number
  baseY: number
  currentX: number
  currentY: number
}

interface MagneticLettersProps {
  text: string
  svgElement: HTMLElement | null
  radius?: number
  baseRepelStrength?: number
  maxPush?: number
  returnLerp?: number
  velocityRef?: number
  glowMax?: number
  className?: string
  style?: React.CSSProperties
}

export default function MagneticLetters({
  text,
  svgElement,
  radius = 240,
  baseRepelStrength = 170,
  maxPush = 280,
  returnLerp = 0.13,
  velocityRef = 7,
  glowMax = 1,
  className = '',
  style,
}: MagneticLettersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<LetterData[]>([])
  const rafRef = useRef<number | null>(null)
  const lastAngleRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const omegaEmaRef = useRef<number>(0)
  const glowValueRef = useRef<number>(0)
  const svgCenterRef = useRef<{ x: number; y: number } | null>(null)

  const [glowIntensity, setGlowIntensity] = useState(0)

  // Parse text into characters, preserving spaces and grouping by words
  const words = text.split(/(\s+)/)
  const chars: Array<{ char: string; key: string; isSpace: boolean; wordIndex: number }> = []
  words.forEach((word, wordIdx) => {
    const isSpace = /^\s+$/.test(word)
    word.split('').forEach((char, charIdx) => {
      chars.push({
        char: isSpace ? '\u00A0' : char,
        key: `${wordIdx}-${charIdx}-${char}`,
        isSpace,
        wordIndex: wordIdx,
      })
    })
  })

  // Measure home positions and SVG center
  useEffect(() => {
    if (!containerRef.current || !svgElement) return

    const measurePositions = () => {
      const container = containerRef.current!
      const letterElements = container.querySelectorAll<HTMLSpanElement>('.magnetic-letter')
      
      // Wait for letters to be rendered
      if (letterElements.length === 0) return
      
      const svgRect = svgElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      const svgCenterX = svgRect.left + svgRect.width / 2 - containerRect.left
      const svgCenterY = svgRect.top + svgRect.height / 2 - containerRect.top
      svgCenterRef.current = { x: svgCenterX, y: svgCenterY }

      lettersRef.current = []
      
      letterElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const baseX = rect.left + rect.width / 2 - containerRect.left
        const baseY = rect.top + rect.height / 2 - containerRect.top
        
        lettersRef.current.push({
          element: el,
          baseX,
          baseY,
          currentX: 0,
          currentY: 0,
        })
      })
    }

    // Measure with retry to ensure DOM is ready
    let retries = 0
    const maxRetries = 5
    const tryMeasure = () => {
      measurePositions()
      if (lettersRef.current.length === 0 && retries < maxRetries) {
        retries++
        setTimeout(tryMeasure, 100)
      }
    }
    
    const timeout = setTimeout(tryMeasure, 150)
    window.addEventListener('resize', measurePositions)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', measurePositions)
    }
  }, [text, svgElement])

  // Animation loop
  useEffect(() => {
    if (!containerRef.current || !svgElement || lettersRef.current.length === 0 || !svgCenterRef.current) return

    const animate = (currentTime: number) => {
      const container = containerRef.current!
      const svgCenter = svgCenterRef.current

      if (!svgCenter) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      // Get current SVG rotation angle from transform matrix
      const computedStyle = window.getComputedStyle(svgElement)
      const transform = computedStyle.transform
      let currentAngle = 0

      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform)
        currentAngle = Math.atan2(matrix.b, matrix.a) // radians
      }

      // Calculate angular velocity (rad/s)
      let omega = 0
      if (lastAngleRef.current !== null && lastTimeRef.current !== null) {
        const deltaTime = (currentTime - lastTimeRef.current) / 1000 // seconds
        if (deltaTime > 0 && deltaTime < 0.1) {
          let angleDiff = currentAngle - lastAngleRef.current
          // Normalize to [-PI, PI]
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
          while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI
          omega = Math.abs(angleDiff) / deltaTime
        }
      }

      // EMA smoothing for omega
      const alpha = 0.15
      omegaEmaRef.current = omegaEmaRef.current * (1 - alpha) + omega * alpha

      // Map to speed01 [0..1]
      const speed01 = Math.min(omegaEmaRef.current / velocityRef, 1)

      // Update glow intensity
      const glowTarget = speed01 * glowMax
      glowValueRef.current += (glowTarget - glowValueRef.current) * 0.1
      setGlowIntensity(glowValueRef.current)

      // Update CSS variable for glow on SVG
      if (svgElement instanceof HTMLElement) {
        const glowBlur = 8 * glowValueRef.current
        const glowOpacity = 0.3 * glowValueRef.current
        const glowBlur2 = 16 * glowValueRef.current
        const glowOpacity2 = 0.2 * glowValueRef.current
        svgElement.style.filter = `drop-shadow(0 0 ${glowBlur}px rgba(107, 114, 128, ${glowOpacity})) drop-shadow(0 0 ${glowBlur2}px rgba(107, 114, 128, ${glowOpacity2}))`
      }

      // Recalculate SVG center position (in case layout changed)
      const svgRect = svgElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const currentSvgCenterX = svgRect.left + svgRect.width / 2 - containerRect.left
      const currentSvgCenterY = svgRect.top + svgRect.height / 2 - containerRect.top
      svgCenterRef.current = { x: currentSvgCenterX, y: currentSvgCenterY }

      // Update each letter
      lettersRef.current.forEach((letter) => {
        const dx = letter.baseX - currentSvgCenterX
        const dy = letter.baseY - currentSvgCenterY
        const dist = Math.hypot(dx, dy)

        if (dist < radius) {
          // Within radius: apply repulsion
          const u = Math.max(0, 1 - dist / radius)
          const falloff = u * u // Quadratic falloff
          const push = Math.min(baseRepelStrength * falloff * speed01, maxPush)

          // Direction away from SVG center
          const angle = Math.atan2(dy, dx)
          const targetX = Math.cos(angle) * push
          const targetY = Math.sin(angle) * push

          // Smooth interpolation
          letter.currentX += (targetX - letter.currentX) * 0.2
          letter.currentY += (targetY - letter.currentY) * 0.2
        } else {
          // Outside radius: return home
          letter.currentX += (0 - letter.currentX) * returnLerp
          letter.currentY += (0 - letter.currentY) * returnLerp
        }

        // Apply transform
        letter.element.style.transform = `translate3d(${letter.currentX}px, ${letter.currentY}px, 0)`
      })

      lastAngleRef.current = currentAngle
      lastTimeRef.current = currentTime
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [text, svgElement, radius, baseRepelStrength, maxPush, returnLerp, velocityRef, glowMax])

  return (
    <div ref={containerRef} className={className} style={{ ...style, display: 'inline-block', position: 'relative' }} aria-label={text}>
      {words.map((word, wordIdx) => {
        const isSpace = /^\s+$/.test(word)
        return (
          <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: isSpace ? 'pre' : 'nowrap' }}>
            {word.split('').map((char, charIdx) => (
              <span
                key={`${wordIdx}-${charIdx}`}
                className="magnetic-letter inline-block will-change-transform"
                aria-hidden={isSpace && charIdx > 0}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            ))}
          </span>
        )
      })}
    </div>
  )
}

