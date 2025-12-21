'use client'

import QuoteLoader from '@/components/ui/quote-loader'

export interface QuoteItem {
  quote: string
  author: string
}

export default function AboutQuoteSection({ items }: { items: QuoteItem[] }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <QuoteLoader items={items} svgElement={null} />
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
        <p className="text-xs opacity-40" style={{ color: '#6b7280' }}>
          Scroll ↓
        </p>
      </div>
    </section>
  )
}

