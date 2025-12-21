import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About · Building, breaking, documenting',
  description:
    'A visual about page: learning in public, documenting failures and revisions, and inviting critique to build a long-term community.',
  alternates: { canonical: '/about' },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Layth Ayache',
  url: 'https://laythayache.com',
  description:
    'Learning in public through projects, documenting failures and revisions, and inviting critique to build a long-term community.',
  sameAs: [
    'https://github.com/laythayache',
    'https://www.linkedin.com/in/laythayache',
  ],
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen pt-24 md:pt-32 px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12" style={{ color: '#2b2e34' }}>
            About
          </h1>
          <AboutContent />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
