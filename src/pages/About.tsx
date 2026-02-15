import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, aboutPageJsonLd } from "@/content/siteSeo";

export default function About() {
  return (
    <>
      <SEO
        title="About | Layth Ayache"
        description="Technical architect specializing in public information infrastructure, data pipelines, and production systems engineering."
        canonical="https://laythayache.com/about"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-15"
        jsonLd={aboutPageJsonLd()}
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 font-sans text-2xl font-semibold text-text-primary">
          About
        </h1>

        <div className="flex flex-col gap-10 text-base leading-relaxed text-text-secondary">
          {/* What I build */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              What I build
            </h2>
            <p>
              Production-grade public information infrastructure. Systems that
              collect, normalize, and serve structured data at scale. Infrastructure
              designed for reliability, change tracking, and accountability.
            </p>
            <p className="mt-4">
              Focus areas: distributed data pipelines, API design, change detection
              systems, and deployment automation. Work spans accessibility technology,
              public data infrastructure, and information flow architecture.
            </p>
          </section>

          {/* What I optimize for */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              What I optimize for
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Clarity over noise.</strong> Systems that expose structure,
                not obscure it.
              </p>
              <p>
                <strong>Durability.</strong> Production systems that survive reality,
                not proof-of-concept demos.
              </p>
              <p>
                <strong>Structural accountability.</strong> Versioning, provenance,
                auditability by design.
              </p>
              <p>
                <strong>Honest engineering.</strong> No hype metrics. Transparent
                about constraints and trade-offs.
              </p>
            </div>
          </section>

          {/* Current focus */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Current focus
            </h2>
            <p>
              Building public information infrastructure: scraping pipelines, data
              normalization, change detection, and API services for media tracking.
              Designing for scale and reliability from the ground up.
            </p>
          </section>

          {/* Background */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Background
            </h2>
            <p>
              Layth Ayache. Based in Lebanon. Software engineer and technical
              architect with experience in data pipelines, production deployment, RAG
              systems, and OCR integration. Work focuses on systems that serve public
              needs — accessibility, information infrastructure, and structured data
              access.
            </p>
          </section>

          {/* Approach */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Approach
            </h2>
            <p>
              Every system is documented with transparent methodology. Project pages
              show not just outcomes, but architecture decisions, reliability
              considerations, limitations, and unsolved problems. This isn't portfolio
              curation — it's engineering accountability.
            </p>
          </section>

          {/* Stack */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Stack
            </h2>
            <p className="font-mono text-sm text-text-muted">
              TypeScript · React · Python · Node.js · PostgreSQL · Redis · Docker ·
              CI/CD · REST APIs · TensorFlow · MediaPipe
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
