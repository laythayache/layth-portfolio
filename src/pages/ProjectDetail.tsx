import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjectBySlug } from "@/content/projects";
import ProjectShell from "@/layouts/ProjectShell";
import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, projectPageJsonLd } from "@/content/siteSeo";
import NotFound from "./NotFound";

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
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-accent" : "text-text-muted"
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-base leading-relaxed text-text-secondary prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [expandedDiagram, setExpandedDiagram] = useState<string | null>(null);

  // Close diagram modal on Escape
  useEffect(() => {
    if (!expandedDiagram) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedDiagram(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expandedDiagram]);

  if (!project) return <NotFound />;

  const projectJsonLd = projectPageJsonLd(project);

  return (
    <>
    <SEO
      title={`${project.title} | Layth Ayache`}
      description={project.summary}
      canonical={`https://laythayache.com/projects/${project.slug}`}
      keywords={[
        ...DEFAULT_KEYWORDS,
        project.title,
        project.system,
        project.kind,
      ]}
      modifiedTime={project.updated_at}
      jsonLd={projectJsonLd}
    />
    <div className="px-6 py-12">
      <ProjectShell project={project}>
        {/* Back link */}
        <Link
          to="/systems"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          Back to systems
        </Link>

        {/* Expanded diagram modal */}
        {expandedDiagram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setExpandedDiagram(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedDiagram(null)}
                aria-label="Close diagram"
                className="absolute -top-8 right-0 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <img
                src={expandedDiagram}
                alt="Architecture diagram"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Two-column layout: main content + sticky TL;DR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content (wider on desktop) */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-12 flex flex-col gap-4">
              <h1 className="font-sans text-3xl font-semibold text-text-primary">
                {project.title}
              </h1>
              <p className="text-base leading-relaxed text-text-secondary">
                {project.summary}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {project.status}
                </span>
                <span className="text-text-muted">&middot;</span>
                <span className="font-mono text-xs text-text-muted">
                  {project.kind}
                </span>
                <span className="text-text-muted">&middot;</span>
                <Link
                  to={`/systems/${project.system}`}
                  className="font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                >
                  {project.system}
                </Link>
                <span className="text-text-muted">&middot;</span>
                <span className="font-mono text-xs text-text-muted">
                  {project.ui_mode}
                </span>
                {project.friend_project && (
                  <>
                    <span className="text-text-muted">&middot;</span>
                    <span className="font-mono text-xs text-accent/60">
                      friend project
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Collapsible sections */}
            <CollapsibleSection title="Problem" defaultOpen>
              {project.sections.problem}
            </CollapsibleSection>

            <CollapsibleSection title="System Reality">
              {project.sections.systemReality}
            </CollapsibleSection>

            <CollapsibleSection title="Intervention">
              {project.sections.intervention}
            </CollapsibleSection>

            {project.sections.architecture && (
              <CollapsibleSection title="Architecture" defaultOpen>
                <div className="space-y-4">
                  {project.architectureDiagram && (
                    <button
                      onClick={() => setExpandedDiagram(project.architectureDiagram!)}
                      className="group relative w-full text-left"
                      aria-label="View full-size architecture diagram"
                    >
                      <img
                        src={project.architectureDiagram}
                        alt={`${project.title} architecture`}
                        loading="lazy"
                        className="w-full cursor-pointer hover:opacity-80 transition-opacity rounded border border-border"
                      />
                      <span className="absolute bottom-2 right-2 rounded bg-text-primary/70 px-2 py-1 font-mono text-[10px] text-surface opacity-0 transition-opacity group-hover:opacity-100">
                        Click to expand
                      </span>
                    </button>
                  )}
                  <p>{project.sections.architecture}</p>
                </div>
              </CollapsibleSection>
            )}

            {project.sections.tradeoffs && (
              <CollapsibleSection title="Key Decisions & Tradeoffs">
                {project.sections.tradeoffs}
              </CollapsibleSection>
            )}

            {project.sections.reliability && (
              <CollapsibleSection title="Reliability & Security">
                {project.sections.reliability}
              </CollapsibleSection>
            )}

            <CollapsibleSection title="Results">
              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-base font-semibold text-text-primary mb-2">
                    Worked
                  </h4>
                  <p className="text-text-secondary">{project.sections.worked}</p>
                </div>
                <div>
                  <h4 className="font-sans text-base font-semibold text-text-primary mb-2">
                    Didn't Work
                  </h4>
                  <p className="text-text-secondary">{project.sections.didnt}</p>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="What I'd Improve Next">
              {project.sections.unsolved}
            </CollapsibleSection>

            {project.sections.challenges && (
              <CollapsibleSection title="Open Questions">
                {project.sections.challenges}
              </CollapsibleSection>
            )}

            {/* Challenge CTA */}
            <div className="mt-12 border-t border-border pt-8">
              {project.challenge_url ? (
                <Link
                  to={project.challenge_url}
                  className="inline-flex items-center gap-2 border border-accent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-surface"
                >
                  Challenge this project
                  <ArrowUpRight size={14} />
                </Link>
              ) : (
                <p className="font-mono text-xs text-text-muted">
                  Challenge URL not set for this project. Reach out via{" "}
                  <Link
                    to="/contact"
                    className="underline underline-offset-2 hover:text-text-secondary"
                  >
                    /contact
                  </Link>{" "}
                  to challenge or critique this work.
                </p>
              )}
            </div>
          </div>

          {/* Sticky TL;DR Card (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 border border-border p-6 bg-surface-raised rounded">
              <h3 className="font-sans text-sm font-semibold text-text-primary mb-4">
                TL;DR
              </h3>
              <dl className="space-y-4 text-sm">
                {project.role && (
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                      Role
                    </dt>
                    <dd className="text-text-primary">{project.role}</dd>
                  </div>
                )}

                {project.timeframe && (
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                      Timeframe
                    </dt>
                    <dd className="text-text-primary">{project.timeframe}</dd>
                  </div>
                )}

                {project.stack && (
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                      Stack
                    </dt>
                    <dd className="text-text-primary text-xs">{project.stack}</dd>
                  </div>
                )}

                {project.outcome && (
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                      Outcome
                    </dt>
                    <dd className="text-text-primary text-sm">{project.outcome}</dd>
                  </div>
                )}
              </dl>

              {/* Links */}
              {project.links && (
                <div className="mt-6 flex flex-col gap-2">
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      GitHub <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      Demo <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      Video <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Mobile TL;DR (shown at top on mobile) */}
        <div className="lg:hidden mb-8 border border-border p-4 bg-surface-raised rounded">
          <h3 className="font-sans text-sm font-semibold text-text-primary mb-3">
            TL;DR
          </h3>
          <dl className="space-y-3 text-sm">
            {project.role && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                  Role
                </dt>
                <dd className="text-text-primary">{project.role}</dd>
              </div>
            )}

            {project.timeframe && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                  Timeframe
                </dt>
                <dd className="text-text-primary">{project.timeframe}</dd>
              </div>
            )}

            {project.stack && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                  Stack
                </dt>
                <dd className="text-text-primary text-xs">{project.stack}</dd>
              </div>
            )}

            {project.outcome && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                  Outcome
                </dt>
                <dd className="text-text-primary text-sm">{project.outcome}</dd>
              </div>
            )}
          </dl>

          {project.links && (
            <div className="mt-3 flex flex-wrap gap-4">
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary"
                >
                  GitHub <ArrowUpRight size={10} />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary"
                >
                  Demo <ArrowUpRight size={10} />
                </a>
              )}
              {project.links.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary"
                >
                  Video <ArrowUpRight size={10} />
                </a>
              )}
            </div>
          )}
        </div>
      </ProjectShell>
    </div>
    </>
  );
}
