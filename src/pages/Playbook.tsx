import SEO from "@/components/SEO";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { DEFAULT_KEYWORDS, playbookPageJsonLd } from "@/content/siteSeo";

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-8 border-b border-border pb-8 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="font-sans text-lg font-semibold text-text-primary">
          {title}
        </h2>
        <ChevronDown
          size={20}
          className={`shrink-0 text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-4 text-base leading-relaxed text-text-secondary">{children}</div>}
    </section>
  );
}

export default function Playbook() {
  return (
    <>
      <SEO
        title="Playbook | Layth Ayache"
        description="Operating principles, decision frameworks, and checklists for building production systems."
        canonical="https://laythayache.com/playbook"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-15"
        jsonLd={playbookPageJsonLd()}
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 font-sans text-2xl font-semibold text-text-primary">
          Playbook
        </h1>
        <p className="mb-10 text-base text-text-secondary">
          How I think about systems, decisions, and constraints.
        </p>

        {/* Operating Principles */}
        <CollapsibleSection title="Operating Principles" defaultOpen>
          <div className="space-y-3">
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Reliability under uncertainty
              </h3>
              <p className="text-text-secondary">
                Systems fail. Plan for degradation, not perfection. Graceful
                fallbacks, circuit breakers, and clear failure modes matter more
                than uptime claims.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Clear interfaces between humans and systems
              </h3>
              <p className="text-text-secondary">
                The system's boundaries should be obvious. What can you do?
                What can't you? Why? No hidden state, no surprising behavior.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Auditability by design
              </h3>
              <p className="text-text-secondary">
                Every significant state change must be traceable. What happened?
                When? Why? Who requested it? This isn't optional compliance—it's
                structural clarity.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Performance as a first-class constraint
              </h3>
              <p className="text-text-secondary">
                Slow systems are broken systems. Latency, throughput, and
                resource usage are architecture decisions, not afterthoughts.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Security as architecture, not patching
              </h3>
              <p className="text-text-secondary">
                Security vulnerabilities come from structural decisions. No
                amount of input validation fixes a fundamentally insecure
                architecture.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Decision Frameworks */}
        <CollapsibleSection title="Decision Frameworks">
          <div className="space-y-4">
            <div>
              <h3 className="font-sans font-semibold text-text-primary mb-2">
                Centralized vs Decentralized
              </h3>
              <p className="text-text-secondary mb-2">
                Choose centralized when:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>You need strong consistency guarantees</li>
                <li>Cross-component state dependencies are complex</li>
                <li>Debugging and auditing need single point of truth</li>
                <li>Operational burden is acceptable</li>
              </ul>
              <p className="text-text-secondary mt-3 mb-2">
                Choose decentralized when:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>You need to scale independent components</li>
                <li>Components can tolerate eventual consistency</li>
                <li>Regional constraints require local autonomy</li>
                <li>Operational overhead of coordination is too high</li>
              </ul>
            </div>

            <div className="pt-2">
              <h3 className="font-sans font-semibold text-text-primary mb-2">
                Performance vs Complexity
              </h3>
              <p className="text-text-secondary">
                Before optimizing: establish the current bottleneck. Measure,
                don't guess. The slowest thing usually isn't what you think it
                is.
              </p>
              <p className="text-text-secondary mt-2">
                If optimization requires significant complexity, ask: will this
                matter in 12 months? Does the benefit justify the maintenance
                cost? Can we scale horizontally instead?
              </p>
            </div>

            <div className="pt-2">
              <h3 className="font-sans font-semibold text-text-primary mb-2">
                Build vs Buy
              </h3>
              <p className="text-text-secondary">
                Core competency = build. Commodity = buy. Your unique value
                comes from decisions only you can make. Outsource everything
                else.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Checklists */}
        <CollapsibleSection title="Checklists">
          <div className="space-y-4">
            <details className="border border-border p-4">
              <summary className="cursor-pointer font-sans font-semibold text-text-primary hover:text-text-secondary">
                Pre-Production Readiness
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>☐ Monitoring and alerting configured for key metrics</li>
                <li>☐ Graceful degradation tested (what happens when dependencies fail?)</li>
                <li>☐ Failure modes documented (circuit breakers, retries, timeouts)</li>
                <li>☐ Rollback procedure defined and tested</li>
                <li>☐ Security audit completed (authentication, authorization, encryption)</li>
                <li>☐ Data retention policy defined</li>
                <li>☐ Backup and recovery procedure tested</li>
                <li>☐ Performance baseline established (latency, throughput, resource usage)</li>
              </ul>
            </details>

            <details className="border border-border p-4">
              <summary className="cursor-pointer font-sans font-semibold text-text-primary hover:text-text-secondary">
                Code Review Checklist
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>☐ Does this change introduce new failure modes?</li>
                <li>☐ Are error messages actionable?</li>
                <li>☐ Are there untested code paths?</li>
                <li>☐ Is state management explicit and auditable?</li>
                <li>☐ Does this scale to 10x the current load?</li>
                <li>☐ Can this be rolled back without data loss?</li>
                <li>☐ Are there any unprotected secrets in logs or config?</li>
              </ul>
            </details>

            <details className="border border-border p-4">
              <summary className="cursor-pointer font-sans font-semibold text-text-primary hover:text-text-secondary">
                Architectural Review Checklist
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>☐ Is the system's interface clear?</li>
                <li>☐ Can it fail safely?</li>
                <li>☐ Is every state change auditable?</li>
                <li>☐ Are the trade-offs documented?</li>
                <li>☐ Are operational constraints (quota, rate limits) enforced?</li>
                <li>☐ Is monitoring comprehensive enough to debug issues?</li>
              </ul>
            </details>
          </div>
        </CollapsibleSection>

        {/* Experience Timeline */}
        <CollapsibleSection title="Experience Timeline">
          <div className="space-y-4">
            <div className="border-l-2 border-border pl-4">
              <p className="font-mono text-xs uppercase text-text-muted mb-1">
                2025 - Present
              </p>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Public Information Infrastructure
              </h3>
              <p className="text-sm text-text-secondary">
                Technical architect leading production infrastructure for media
                tracking. Distributed scraping, change detection, API design,
                infrastructure at scale.
              </p>
            </div>

            <div className="border-l-2 border-border pl-4">
              <p className="font-mono text-xs uppercase text-text-muted mb-1">
                2024 - 2025
              </p>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                OmniSign Federated Learning
              </h3>
              <p className="text-sm text-text-secondary">
                Architected privacy-first federated learning system for sign
                language translation. Team coordination across 6 contributors
                (CV, web, mobile, linguistics). On-device ML inference,
                real-time latency constraints.
              </p>
            </div>

            <div className="border-l-2 border-border pl-4">
              <p className="font-mono text-xs uppercase text-text-muted mb-1">
                2023 - 2025
              </p>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Data Pipelines & RAG Systems
              </h3>
              <p className="text-sm text-text-secondary">
                Production pipeline engineering. Automated ETL workflows,
                retrieval-augmented generation for information extraction, OCR
                integration. Multi-source data normalization.
              </p>
            </div>

            <div className="border-l-2 border-border pl-4">
              <p className="font-mono text-xs uppercase text-text-muted mb-1">
                2022 - 2024
              </p>
              <h3 className="font-sans font-semibold text-text-primary mb-1">
                Production Deployment & CI/CD
              </h3>
              <p className="text-sm text-text-secondary">
                Built deployment automation, monitoring infrastructure, error
                handling at scale. Docker, Kubernetes, monitoring stack
                hardening.
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </>
  );
}
