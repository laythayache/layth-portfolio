'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [authorVisible, setAuthorVisible] = useState(false)

  // Ensure we have at least one item
  const validItems = items.filter((item) => item.quote && item.author && !item.quote.includes('TODO'))
  const displayItems = validItems.length > 0 ? validItems : items
  const currentItem = displayItems[activeIndex % displayItems.length]

  // Show author after delay on mount and after each transition
  useEffect(() => {
    if (!currentItem) return
    setAuthorVisible(false)
    const authorTimer = setTimeout(() => {
      setAuthorVisible(true)
    }, 1000)
    return () => clearTimeout(authorTimer)
  }, [activeIndex, currentItem])

  // Rotate quotes every 5 seconds
  useEffect(() => {
    if (displayItems.length <= 1) return // No rotation needed for single quote

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      setAuthorVisible(false)
      
      // After fade out completes, change quote and fade in
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % displayItems.length)
        setIsVisible(true)
        
        // Show author after quote appears
        setTimeout(() => {
          setAuthorVisible(true)
        }, 1000)
      }, 600) // Wait for fade out to complete
    }, 5000) // Total cycle: 5 seconds

    return () => clearInterval(interval)
  }, [displayItems.length])

  if (!currentItem) {
    return null
  }

  return (
    <div
      className={cn('relative w-full flex flex-col items-center justify-center px-4', className)}
      style={{ minHeight: '200px' }}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center transition-all duration-600 ease-in-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        )}
      >
        <blockquote
          className={cn(
            'quote-text text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 text-center max-w-3xl',
            quoteClassName
          )}
          style={{ color: '#2b2e34' }}
        >
          "{currentItem.quote}"
        </blockquote>
        <p
          className={cn(
            'author-text text-xs md:text-sm transition-opacity duration-700 ease-in-out',
            authorVisible ? 'opacity-70' : 'opacity-0',
            authorClassName
          )}
          style={{ color: '#6b7280' }}
        >
          — {currentItem.author}
        </p>
      </div>
    </div>
  )
}

export default QuoteLoader
