import Link from "next/link";
import LiveFocusPanel from "./LiveFocusPanel";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20">
      <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
              I study why systems fail under pressure.
            </h1>
            <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              AI, security, and digital infrastructure — focused on government, healthcare, and public services in constrained environments.
            </p>
            <p className="text-sm text-[var(--text-secondary)]/80">
              Writing openly while becoming useful at national scale.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/critique"
              className="px-6 py-3 bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--text-primary)] hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
            >
              Read system critiques
            </Link>
            <Link
              href="/architectures"
              className="px-6 py-3 border border-[var(--accent)]/20 text-[var(--text-primary)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
            >
              View architectures
            </Link>
            <Link
              href="/notes"
              className="px-6 py-3 border border-[var(--accent)]/20 text-[var(--text-primary)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
            >
              Field notes
            </Link>
          </div>
        </div>

        {/* Right Panel - Live Focus Panel */}
        <div className="lg:sticky lg:top-20">
          <LiveFocusPanel />
        </div>
      </div>
    </section>
  );
}
