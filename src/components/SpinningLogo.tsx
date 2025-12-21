'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'

interface SpinningLogoProps {
  src: string
  alt: string
  className?: string
}

const SpinningLogo = forwardRef<HTMLImageElement, SpinningLogoProps>(
  function SpinningLogo({ src, alt, className }, ref) {
  const [rotation, setRotation] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const hoverStartTime = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTime = useRef<number | null>(null)

  useEffect(() => {
    if (isHovering) {
      const animate = (currentTime: number) => {
        if (hoverStartTime.current === null) {
          hoverStartTime.current = currentTime
          lastFrameTime.current = currentTime
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }

        if (lastFrameTime.current === null) {
          lastFrameTime.current = currentTime
        }

        const hoverDuration = currentTime - hoverStartTime.current
        const deltaTime = currentTime - lastFrameTime.current
        lastFrameTime.current = currentTime

        // Speed starts at 60 degrees/sec and increases by 360 degrees/sec each second
        // Formula: degreesPerSecond = 60 + (360 * secondsElapsed)
        const secondsElapsed = hoverDuration / 1000
        const degreesPerSecond = 60 + (360 * secondsElapsed)
        
        setRotation(prev => prev + (degreesPerSecond * deltaTime) / 1000)
        
        animationFrameRef.current = requestAnimationFrame(animate)
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      hoverStartTime.current = null
      lastFrameTime.current = null
      // Smoothly return to 0 rotation
      setRotation(0)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovering])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isHovering ? 'none' : 'transform 0.3s ease-out',
        }}
      />
    )
  }
)

export default SpinningLogo
