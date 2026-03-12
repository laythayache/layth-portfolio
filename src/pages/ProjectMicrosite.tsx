import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getProjectBySlug } from "@/content/projects";
import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, projectPageJsonLd } from "@/content/siteSeo";
import VideoEmbed from "@/components/VideoEmbed";
import {
  DesktopTOC,
  MobileTOC,
} from "@/components/microsite/TableOfContents";
import { buildTocItems } from "@/lib/microsite-sections";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

/* ── Animation helpers ── */
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

function useSectionAnim() {
  const reduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: reduced ? 0.15 : 0.55, ease: EASE_OUT },
  };
}

/* ── Reusable narrative section ── */
function NarrativeSection({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  const anim = useSectionAnim();
  return (
    <motion.section id={id} className="scroll-mt-24 py-10" {...anim}>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <h2 className="mb-4 font-sans text-xl font-semibold text-text-primary sm:text-2xl">
        {heading}
      </h2>
      <div className="text-base leading-relaxed text-text-secondary">
        {children}
      </div>
    </motion.section>
  );
}

/* ── Status dot color ── */
function statusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-emerald-500";
    case "ongoing":
      return "bg-amber-500";
    case "paused":
      return "bg-slate-400";
    default:
      return "bg-slate-300";
  }
}

/* ── Main component ── */
export default function ProjectMicrosite() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [expandedDiagram, setExpandedDiagram] = useState<string | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Focus trap for diagram modal
  useEffect(() => {
    if (!expandedDiagram) {
      if (focusedElementRef.current) {
        focusedElementRef.current.focus();
        focusedElementRef.current = null;
      }
      return;
    }
    focusedElementRef.current = document.activeElement as HTMLElement;
    setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedDiagram(null);
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll("button, [href], img");
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedDiagram]);

  if (!project) return <NotFound />;

  const tocItems = buildTocItems(project);
  const showToc = tocItems.length >= 3;
  const sectionAnim = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: 0.55, ease: EASE_OUT },
  };

  return (
    <>
      <SEO
        title={`${project.title} | Layth Ayache`}
        description={project.summary}
        canonical={`https://laythayache.com/projects/${project.slug}`}
        keywords={[...DEFAULT_KEYWORDS, project.title, project.system, project.kind]}
        modifiedTime={project.updated_at}
        jsonLd={projectPageJsonLd(project)}
      />

      {/* Architecture diagram modal */}
      {expandedDiagram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setExpandedDiagram(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Architecture diagram viewer"
        >
          <div
            ref={modalRef}
            className="relative max-h-[90vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={() => setExpandedDiagram(null)}
              aria-label="Close diagram"
              className="absolute -top-8 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded"
            >
              <X size={24} />
            </button>
            <img
              src={expandedDiagram}
              alt={`${project.title} architecture diagram`}
              loading="eager"
              decoding="async"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <article className="relative px-6 py-12">
        {/* Desktop TOC — fixed right sidebar */}
        {showToc && (
          <div className="fixed right-8 top-28 z-30 hidden w-48 lg:block">
            <DesktopTOC items={tocItems} />
          </div>
        )}

        <div className={cn("mx-auto max-w-4xl", showToc && "lg:mr-64")}>
          {/* Back link */}
          <Link
            to="/#projects"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>

          {/* ── Hero ── */}
          <motion.header id="hero" className="mb-10" {...sectionAnim}>
            <h1 className="mb-4 font-sans text-3xl font-bold text-text-primary sm:text-4xl">
              {project.title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {project.summary}
            </p>

            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted">
                <span className={cn("h-2 w-2 rounded-full", statusColor(project.status))} />
                {project.status}
              </span>
              <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted">
                {project.kind}
              </span>
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Role + Timeframe */}
            {(project.role || project.timeframe) && (
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-text-secondary">
                {project.role && (
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      Role
                    </span>
                    <p className="mt-0.5">{project.role}</p>
                  </div>
                )}
                {project.timeframe && (
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      Timeframe
                    </span>
                    <p className="mt-0.5">{project.timeframe}</p>
                  </div>
                )}
              </div>
            )}

            {/* Mobile TOC */}
            {showToc && <div className="mt-6"><MobileTOC items={tocItems} /></div>}
          </motion.header>

          {/* ── Demo Video ── */}
          {project.demoVideoUrl && (
            <motion.div className="mb-12" {...sectionAnim}>
              <VideoEmbed
                src={project.demoVideoUrl}
                poster={project.thumbnail}
                title={`${project.title} demo video`}
              />
            </motion.div>
          )}

          {/* ── Quick Info Bar ── */}
          <motion.div
            className="mb-12 rounded-xl border border-border bg-surface-raised p-6"
            {...sectionAnim}
          >
            {project.outcome && (
              <div className="mb-5 rounded-lg border-l-4 border-accent bg-surface-overlay px-4 py-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-1">
                  Outcome
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {project.outcome}
                </p>
              </div>
            )}

            {project.stack && (
              <div className="mb-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.split(/[,·]/).map((tech) => (
                    <span
                      key={tech.trim()}
                      className="rounded-full bg-surface-overlay px-3 py-1 font-mono text-xs text-text-secondary"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.links && (
              <div className="flex flex-wrap gap-4">
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    GitHub <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    Demo <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
                {project.links.video && (
                  <a
                    href={project.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    Video <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Divider between info and narrative ── */}
          <hr className="border-border mb-4" />

          {/* ── Narrative Sections ── */}
          {project.sections.problem && (
            <NarrativeSection id="problem" label="01 — Problem" heading="The Problem">
              {project.sections.problem}
            </NarrativeSection>
          )}

          {project.sections.systemReality && (
            <NarrativeSection id="context" label="02 — Context" heading="System Reality">
              {project.sections.systemReality}
            </NarrativeSection>
          )}

          {project.sections.intervention && (
            <NarrativeSection id="approach" label="03 — Approach" heading="The Intervention">
              {project.sections.intervention}
            </NarrativeSection>
          )}

          {project.sections.architecture && (
            <NarrativeSection id="architecture" label="04 — Architecture" heading="Architecture">
              <div className="space-y-4">
                {project.architectureDiagram && (
                  <button
                    onClick={() => setExpandedDiagram(project.architectureDiagram!)}
                    className="group relative w-full text-left"
                    aria-label="View full-size architecture diagram"
                  >
                    <img
                      src={project.architectureDiagram}
                      alt={`${project.title} architecture diagram`}
                      loading="lazy"
                      decoding="async"
                      className="w-full cursor-pointer hover:opacity-80 transition-opacity rounded-lg border border-border"
                    />
                    <span className="absolute bottom-2 right-2 rounded bg-text-primary/70 px-2 py-1 font-mono text-[10px] text-surface opacity-0 transition-opacity group-hover:opacity-100">
                      Click to expand
                    </span>
                  </button>
                )}
                <p>{project.sections.architecture}</p>
              </div>
            </NarrativeSection>
          )}

          {project.sections.tradeoffs && (
            <NarrativeSection id="decisions" label="05 — Decisions" heading="Key Decisions & Tradeoffs">
              {project.sections.tradeoffs}
            </NarrativeSection>
          )}

          {(project.sections.worked || project.sections.didnt) && (
            <NarrativeSection id="results" label="06 — Results" heading="Results">
              <div className="space-y-6">
                {project.sections.worked && (
                  <div>
                    <h3 className="mb-2 font-sans text-base font-semibold text-text-primary">
                      What Worked
                    </h3>
                    <p className="text-text-secondary">{project.sections.worked}</p>
                  </div>
                )}
                {project.sections.didnt && (
                  <div>
                    <h3 className="mb-2 font-sans text-base font-semibold text-text-primary">
                      What Didn&rsquo;t
                    </h3>
                    <p className="text-text-secondary">{project.sections.didnt}</p>
                  </div>
                )}
              </div>
            </NarrativeSection>
          )}

          {project.sections.reliability && (
            <NarrativeSection id="reliability" label="07 — Reliability" heading="Reliability & Operations">
              {project.sections.reliability}
            </NarrativeSection>
          )}

          {project.sections.challenges && (
            <NarrativeSection id="challenges" label="08 — Challenges" heading="Challenges">
              {project.sections.challenges}
            </NarrativeSection>
          )}

          {project.sections.unsolved && (
            <NarrativeSection id="open-questions" label="09 — Open Questions" heading="What I'd Improve Next">
              {project.sections.unsolved}
            </NarrativeSection>
          )}

          {/* ── CTA Section ── */}
          <motion.section
            id="contact"
            className="scroll-mt-24 border-t border-border py-16 text-center"
            {...sectionAnim}
          >
            <h2 className="mb-3 font-sans text-xl font-semibold text-text-primary">
              Interested in this project?
            </h2>
            <p className="mb-6 text-sm text-text-secondary">
              If you&rsquo;d like to discuss this work, have feedback, or want something similar built — reach out.
            </p>
            <a
              href="mailto:laythayache5@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-6 py-3 font-mono text-sm text-white transition-colors hover:bg-accent-hover"
            >
              laythayache5@gmail.com
              <ArrowUpRight size={14} />
            </a>
          </motion.section>

          {/* Back to projects */}
          <div className="pb-8 text-center">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to all projects
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
