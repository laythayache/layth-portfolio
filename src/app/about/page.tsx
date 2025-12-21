import type { Metadata } from 'next'
import { getSectionByKey } from '@/lib/sections'

export const metadata: Metadata = {
  title: 'About | Layth Ayache',
  description: 'Vision, mission, and approach to building software and learning in public.',
}

export default function AboutPage() {
  const section = getSectionByKey('about')

  // Name is used in layout.tsx metadata, so it's safe to include
  // TODO: Add url if site URL is confirmed/used elsewhere in repo
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Layth Ayache',
    sameAs: [],
  }

  return (
    <main className="min-h-screen pt-24 md:pt-32 px-4 md:px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: '#2b2e34' }}>
          {section?.title || 'About'}
        </h1>
        <p className="text-lg md:text-xl mb-12" style={{ color: '#6b7280' }}>
          {section?.intro}
        </p>

        <section className="prose prose-lg max-w-none">
          <div className="border border-[#d1d5db] rounded-lg p-8">
            <p className="text-base leading-relaxed mb-4" style={{ color: '#2b2e34' }}>
              This platform reflects a commitment to student/public learning, embracing failures, documenting process, and playing the community long game.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
              More content coming soon.
            </p>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </main>
  )
}

