'use client'

import { useState, useEffect, useRef } from 'react'

interface SpinningLogoProps {
  src: string
  alt: string
  className?: string
}

export default function SpinningLogo({ src, alt, className }: SpinningLogoProps) {
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

        // Speed increases from 60deg/s to 720deg/s over 9 seconds
        const minSpeed = 60 // degrees per second
        const maxSpeed = 720 // degrees per second
        const accelerationTime = 9000 // 9 seconds to reach max speed
        
        const progress = Math.min(hoverDuration / accelerationTime, 1)
        const currentSpeed = minSpeed + (maxSpeed - minSpeed) * progress
        
        setRotation(prev => prev + (currentSpeed * deltaTime) / 1000)
        
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
