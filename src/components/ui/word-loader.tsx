'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

interface WordLoaderProps {
  words?: string[]
  className?: string
  textClassName?: string
}

const WordLoader: React.FC<WordLoaderProps> = ({
  words = [
    'branding',
    'design',
    'development',
    'ecommerce',
    'mobile apps',
    'packaging',
  ],
  className,
  textClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 })
      const wordDelay = 0.5
      const wordDuration = 2.0 // Increased from 0.8 for calmer pacing
      const fadeInDuration = 0.5
      const fadeOutDuration = 0.4
      const holdDuration = wordDuration - fadeInDuration - fadeOutDuration

      words.forEach((_, index) => {
        const startTime = index * (wordDuration + wordDelay)

        // Fade in
        tl.fromTo(
          `.word-${index} .char`,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: fadeInDuration,
            stagger: 0.04,
            ease: 'power2.out',
          },
          startTime
        )

        // Hold (word stays visible)
        // No animation, just wait

        // Fade out
        tl.to(
          `.word-${index} .char`,
          {
            opacity: 0,
            y: -5,
            duration: fadeOutDuration,
            stagger: 0.04,
            ease: 'power2.in',
          },
          startTime + fadeInDuration + holdDuration
        )
      })
    },
    { scope: containerRef, dependencies: [words] }
  )

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-y-6 w-full', className)}>
      <div className="relative h-12 flex items-center justify-center">
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              `word-${index} absolute tracking-wide font-normal flex gap-x-1 opacity-70`,
              textClassName
            )}
          >
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className="char">
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

export default WordLoader

