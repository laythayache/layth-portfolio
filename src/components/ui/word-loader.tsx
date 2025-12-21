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
      const wordDelay = 0.5
      const wordDuration = 2.0 // Increased from 0.8 for calmer pacing
      const fadeInDuration = 0.5
      const fadeOutDuration = 0.4
      const holdDuration = wordDuration - fadeInDuration - fadeOutDuration

      // Set initial state: all words invisible and reset transforms
      words.forEach((_, index) => {
        gsap.set(`.word-${index} .char`, { 
          opacity: 0, 
          y: 10,
          clearProps: 'all'
        })
        gsap.set(`.word-${index}`, { 
          opacity: 1,
          filter: 'none',
          clearProps: 'filter'
        })
      })

      const tl = gsap.timeline({ 
        repeat: -1,
        onRepeat: () => {
          // Reset all words to invisible state and clear all transforms/filters
          words.forEach((_, index) => {
            gsap.set(`.word-${index} .char`, { 
              opacity: 0, 
              y: 10,
              clearProps: 'all'
            })
            gsap.set(`.word-${index}`, {
              filter: 'none',
              clearProps: 'filter'
            })
          })
        }
      })

      words.forEach((_, index) => {
        const startTime = index * (wordDuration + wordDelay)

        // Fade in
        tl.to(
          `.word-${index} .char`,
          {
            opacity: 1,
            y: 0,
            duration: fadeInDuration,
            stagger: 0.04,
            ease: 'power2.out',
            clearProps: 'filter'
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
            clearProps: 'filter'
          },
          startTime + fadeInDuration + holdDuration
        )
      })

      return () => {
        // Cleanup: kill timeline and reset all
        tl.kill()
        words.forEach((_, index) => {
          gsap.set(`.word-${index} .char`, { clearProps: 'all' })
          gsap.set(`.word-${index}`, { clearProps: 'all' })
        })
      }
    },
    { scope: containerRef, dependencies: [words] }
  )

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-y-6 w-full', className)}>
      <div className="relative h-12 flex items-center justify-center w-full">
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              `word-${index} absolute left-1/2 -translate-x-1/2 tracking-wide font-normal text-center`,
              textClassName
            )}
            style={{ 
              whiteSpace: 'nowrap', 
              display: 'inline-block',
              lineHeight: '1.2',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            {word.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                className="char" 
                style={{ 
                  display: 'inline',
                  whiteSpace: 'pre'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

export default WordLoader

