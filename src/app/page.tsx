import SpinningLogo from '@/components/SpinningLogo'
import WordLoader from '@/components/ui/word-loader'
import Link from 'next/link'
// Home page uses global metadata from layout.tsx (no override needed)

export default function Page() {
  return (
    <main>
      {/* Hero Section - Full viewport */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          <div className="mb-6 flex justify-center">
            <SpinningLogo
              src="/logo-mark.svg"
              alt="Logo"
              className="block h-64 w-auto md:h-80"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight" style={{ color: '#2b2e34' }}>
            Layth Ayache
          </h1>
          <div className="mt-8 md:mt-10 flex justify-center" style={{ color: '#6b7280' }}>
            <WordLoader
              words={['building', 'breaking', 'failing', 'documenting', 'revising', 'understanding', 'learning', 'sharing', 'repeat']}
              textClassName="text-sm md:text-base"
            />
          </div>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-12 md:mt-16 opacity-60" style={{ color: '#6b7280' }}>
            I'm a student building in public—documenting decisions, failures, and what changed my mind. Some work here is finished with demos; some is ongoing and open to critique. The long game is a serious community that learns and builds together.
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
          <p className="text-xs opacity-40" style={{ color: '#6b7280' }}>
            Scroll ↓
          </p>
        </div>
      </section>

      {/* Content Sections - Below the fold */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="space-y-12">
          <section className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#2b2e34' }}>
              Completed Projects
            </h2>
            <p className="text-base mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
              Finished builds with demos and clear postmortems. I keep the outcomes, but I focus on the reasoning: what worked, what didn't, and why.
            </p>
            <Link
              href="/completed"
              className="text-sm font-medium hover:underline transition-colors inline-block"
              style={{ color: '#2b2e34' }}
            >
              View completed projects →
            </Link>
          </section>

          <section className="max-w-2xl mx-auto border-t border-[#d1d5db] pt-12">
            <h2 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#2b2e34' }}>
              Ongoing Work
            </h2>
            <p className="text-base mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
              Active experiments where the questions matter more than the polish. These are open threads: assumptions, constraints, dead ends, and next steps—open to critique.
            </p>
            <Link
              href="/ongoing"
              className="text-sm font-medium hover:underline transition-colors inline-block"
              style={{ color: '#2b2e34' }}
            >
              See ongoing work →
            </Link>
          </section>

          <section className="max-w-2xl mx-auto border-t border-[#d1d5db] pt-12">
            <h2 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#2b2e34' }}>
              Friends' Projects
            </h2>
            <p className="text-base mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
              Projects from people I trust who need help, feedback, collaborators, or funding. The goal is to connect serious builders without turning this into noise.
            </p>
            <Link
              href="/friends"
              className="text-sm font-medium hover:underline transition-colors inline-block"
              style={{ color: '#2b2e34' }}
            >
              Browse friends' projects →
            </Link>
          </section>

          <section className="max-w-2xl mx-auto border-t border-[#d1d5db] pt-12">
            <h2 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#2b2e34' }}>
              Ideas
            </h2>
            <p className="text-base mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
              A reservoir of early thoughts: incomplete by design. Some ideas become projects, most don't—but the point is to think in public and pressure-test concepts.
            </p>
            <Link
              href="/ideas"
              className="text-sm font-medium hover:underline transition-colors inline-block"
              style={{ color: '#2b2e34' }}
            >
              Explore ideas →
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}
