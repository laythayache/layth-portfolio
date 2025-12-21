'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

export interface QuoteItem {
  quote: string
  author: string
}

interface QuoteLoaderProps {
  items: QuoteItem[]
  className?: string
  quoteClassName?: string
  authorClassName?: string
}

const QuoteLoader: React.FC<QuoteLoaderProps> = ({
  items,
  className,
  quoteClassName,
  authorClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 })
      const fadeInDuration = 0.6
      const holdDuration = 2.5
      const fadeOutDuration = 0.5
      const totalDuration = fadeInDuration + holdDuration + fadeOutDuration

      items.forEach((_, index) => {
        const startTime = index * totalDuration

        // Fade in with slight y movement
        tl.fromTo(
          `.quote-item-${index}`,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: fadeInDuration,
            ease: 'power2.out',
          },
          startTime
        )

        // Hold
        // (no animation needed, just wait)

        // Fade out with slight y movement
        tl.to(
          `.quote-item-${index}`,
          {
            opacity: 0,
            y: -4,
            duration: fadeOutDuration,
            ease: 'power2.in',
          },
          startTime + fadeInDuration + holdDuration
        )
      })
    },
    { scope: containerRef, dependencies: [items] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ minHeight: '200px' }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`quote-item-${index} absolute inset-0 flex flex-col items-center justify-center px-4`}
          style={{ opacity: 0 }}
        >
          <blockquote
            className={cn(
              'text-lg md:text-xl lg:text-2xl leading-relaxed mb-3 text-center max-w-3xl',
              quoteClassName
            )}
            style={{ color: '#2b2e34' }}
          >
            "{item.quote}"
          </blockquote>
          <p
            className={cn('text-sm md:text-base', authorClassName)}
            style={{ color: '#6b7280' }}
          >
            — {item.author}
          </p>
        </div>
      ))}
    </div>
  )
}

export default QuoteLoader

