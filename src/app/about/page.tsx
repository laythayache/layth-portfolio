import type { Metadata } from 'next'
import AboutContent from './AboutContent'
import QuoteLoader from '@/components/ui/quote-loader'

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
  const quoteItems = [
    {
      quote: 'We shape our tools, and thereafter our tools shape us.',
      author: 'John M. Culkin',
    },
    {
      quote: 'TODO: Add another governing quote.',
      author: '—',
    },
  ]

  return (
    <>
      <main className="min-h-screen">
        {/* Quote Section - Above the fold */}
        <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 md:px-6 pt-24 md:pt-32">
          <div className="max-w-4xl w-full">
            <div className="border border-[#d1d5db] rounded-lg p-8 md:p-12">
              <QuoteLoader items={quoteItems} />
            </div>
          </div>
        </section>

        {/* Content Section - Below the fold */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12" style={{ color: '#2b2e34' }}>
            About
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Doctrine, Contact, Skills */}
            <div className="space-y-8">
              {/* Doctrine Paragraph */}
              <div className="border border-[#d1d5db] rounded-lg p-6">
                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                  This site is a record of building in public: what I tried, what broke, and what changed my thinking. The goal is a serious community—local and international—that learns by doing and improves through critique.
                </p>
              </div>

              {/* Contact Card */}
              <div className="border border-[#d1d5db] rounded-lg p-6">
                {/* TODO: Replace with UIverse/21dev 'fascinating code' contact component. */}
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#2b2e34' }}>
                  Contact
                </h2>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
                  I explain process and critique systems. If you want a second set of eyes, you can reach me—no pressure, high-signal only.
                </p>
                <div className="space-y-2">
                  <div>
                    <a
                      href="mailto:laythayache5@gmail.com"
                      className="text-sm hover:underline transition-colors"
                      style={{ color: '#2b2e34' }}
                    >
                      laythayache5@gmail.com
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/laythayache"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline transition-colors"
                      style={{ color: '#2b2e34' }}
                    >
                      LinkedIn: laythayache
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://github.com/laythayache"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline transition-colors"
                      style={{ color: '#2b2e34' }}
                    >
                      GitHub: laythayache
                    </a>
                  </div>
                </div>
              </div>

              {/* Skills Placeholder */}
              <div className="border border-[#d1d5db] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2" style={{ color: '#2b2e34' }}>
                  Skills
                </h2>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  TODO: Build a fascinating skills UI (UIverse/21dev).
                </p>
              </div>
            </div>

            {/* Right Column: Achievements */}
            <AboutContent />
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
