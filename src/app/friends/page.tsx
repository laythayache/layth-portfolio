import type { Metadata } from 'next'
import { getSectionByKey } from '@/lib/sections'

export const metadata: Metadata = {
  title: 'Friends\' Projects | Layth Ayache',
  description: 'Projects from friends seeking funding, help, or collaboration.',
}

// Placeholder data - replace with actual data later
const placeholderItems: Array<{ title: string; description: string }> = []

export default function FriendsPage() {
  const section = getSectionByKey('friends')

  return (
    <main className="min-h-screen pt-24 md:pt-32 px-4 md:px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: '#2b2e34' }}>
          {section?.title || 'Friends'}
        </h1>
        <p className="text-lg md:text-xl mb-12" style={{ color: '#6b7280' }}>
          {section?.intro}
        </p>

        {placeholderItems.length === 0 ? (
          <div className="border border-[#d1d5db] rounded-lg p-8 text-center">
            <p className="text-base" style={{ color: '#6b7280' }}>
              No friend projects listed at the moment. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {placeholderItems.map((item, index) => (
              <article
                key={index}
                className="border border-[#d1d5db] rounded-lg p-6 hover:border-[#9ca3af] transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2" style={{ color: '#2b2e34' }}>
                  {item.title}
                </h2>
                <p className="text-base" style={{ color: '#6b7280' }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

