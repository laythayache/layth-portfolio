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
      const wordDelay = 0.3
      const wordDuration = 0.8

      words.forEach((_, index) => {
        const startTime = index * (wordDuration + wordDelay)

        tl.fromTo(
          `.word-${index} .char`,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          },
          startTime
        )

        tl.to(
          `.word-${index} .char`,
          {
            opacity: 0,
            y: -5,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.in',
          },
          startTime + 0.5
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
              `word-${index} absolute text-xl tracking-wider font-bold flex gap-x-1`,
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

