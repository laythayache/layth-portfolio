import { Mail, Github, Linkedin } from "lucide-react";
import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, aboutPageJsonLd } from "@/content/siteSeo";

export default function About() {
  return (
    <>
      <SEO
        title="About | Layth Ayache"
        description="AI infrastructure engineer documenting the process of building serious systems from unstable ground."
        canonical="https://laythayache.com/about"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
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
              AI infrastructure — data pipelines, retrieval systems, structured
              extraction, and production tooling. I focus on systems that work
              reliably under real-world constraints, not demos that look good in
              ideal conditions.
            </p>
          </section>

          {/* Strengths */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Strengths
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-text-primary">Infrastructure from scratch.</strong>{" "}
                Building production systems in environments where nothing exists
                yet — no templates, no established patterns, no team to inherit
                from.
              </p>
              <p>
                <strong className="text-text-primary">Honest documentation.</strong>{" "}
                Every project documents what worked and what didn't. No vanity
                metrics, no selective storytelling.
              </p>
              <p>
                <strong className="text-text-primary">Iterative building under constraint.</strong>{" "}
                Shipping and improving under real limitations — unreliable
                infrastructure, limited resources, unstable environments.
              </p>
            </div>
          </section>

          {/* Areas actively improving */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Areas actively improving
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-text-primary">Math depth.</strong>{" "}
                Strengthening foundations in linear algebra, probability, and
                optimization theory to build better ML systems.
              </p>
              <p>
                <strong className="text-text-primary">Research depth.</strong>{" "}
                Moving from applied usage of papers to deeper understanding of
                methodology and experimental design.
              </p>
              <p>
                <strong className="text-text-primary">Systems at scale.</strong>{" "}
                Learning patterns for distributed systems that handle
                significantly higher throughput and concurrency.
              </p>
            </div>
          </section>

          {/* Current focus */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Current focus
            </h2>
            <p>
              Building AI infrastructure for multilingual retrieval, structured
              data extraction, and real-time inference. Documenting the entire
              process — what works, what breaks, what I'm learning.
            </p>
          </section>

          {/* Background */}
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Background
            </h2>
            <p>
              Layth Ayache. Based in Lebanon. Software engineer with experience
              in data pipelines, production deployment, RAG systems, and OCR
              integration. Work focuses on systems that serve real needs —
              accessibility, information infrastructure, and structured data
              access.
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

          {/* Contact */}
          <section className="border-t border-border pt-10">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
              Contact
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@laythayache.com"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <Mail size={14} />
                hello@laythayache.com
              </a>
              <a
                href="https://www.linkedin.com/in/laythayache"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href="https://github.com/laythayache"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
