import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Brain, Cpu, ShieldCheck, Stethoscope, Globe, Cloud, Database, Workflow, type LucideIcon } from "lucide-react";
import SEO from "@/components/SEO";
import { projects } from "@/content/projects";
import { DEFAULT_KEYWORDS } from "@/content/siteSeo";
import "@/components/sections/Work.css";

const TAG_ICON_MAP: Record<string, LucideIcon> = {
  Medical: Stethoscope, Embedded: Cpu, IoT: Cpu, Security: ShieldCheck,
  "Web Development": Globe, Cloud: Cloud, "Data Pipelines": Database,
  Automation: Workflow, "E-Commerce": Globe, Hardware: Cpu, Electronics: Cpu,
};
function getProjectIcon(tags: string[] | undefined): LucideIcon {
  for (const tag of tags ?? []) if (TAG_ICON_MAP[tag]) return TAG_ICON_MAP[tag];
  return Brain;
}

function buildFilters(items: typeof projects) {
  const counts = new Map<string, number>();
  for (const p of items) for (const tag of p.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
}

export default function ProjectsIndex() {
  const reduced = useReducedMotion();
  const allProjects = useMemo(() => projects.filter((p) => p.featured), []);
  const tags = useMemo(() => buildFilters(allProjects), [allProjects]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? allProjects.filter((p) => (p.tags ?? []).includes(activeTag)) : allProjects),
    [activeTag, allProjects]
  );

  return (
    <div className="work-page">
      <SEO
        title="Work | Layth Ayache"
        description="Selected work by Layth Ayache — production AI systems, computer vision pipelines, NLP engines, automations, and engineering case studies with architecture deep dives."
        canonical="https://laythayache.com/projects"
        keywords={[...DEFAULT_KEYWORDS, "work", "projects", "case studies", "portfolio"]}
      />

      <div className="wk-inner">
        <Link to="/" className="wk-back">
          <ArrowLeft size={14} aria-hidden="true" /> Back home
        </Link>

        <h1 className="wk-h1">Work</h1>
        <div className="wk-rule" aria-hidden="true" />
        <p className="wk-sub">
          Production systems, prototypes, and engineering case studies. Filter by domain, or open any for the full write-up.
        </p>

        <div className="wk-filters">
          <button type="button" onClick={() => setActiveTag(null)} aria-pressed={activeTag === null} className={`wk-filter${activeTag === null ? " is-active" : ""}`}>
            All
          </button>
          {tags.map((tag) => (
            <button key={tag} type="button" onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} className={`wk-filter${activeTag === tag ? " is-active" : ""}`}>
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="wk-empty">No work matches this filter.</p>
        ) : (
          <div className="wk-grid">
            {filtered.map((project, i) => {
              const Icon = getProjectIcon(project.tags);
              const thumb = project.thumbnail;
              return (
                <motion.article
                  key={project.slug}
                  className="wk-card"
                  initial={reduced ? undefined : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: reduced ? 0 : (i % 6) * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="wk-thumb">
                    {thumb ? (
                      <img src={thumb} alt={`${project.title} thumbnail`} loading="lazy" />
                    ) : (
                      <div className="wk-thumb-fallback"><Icon size={42} strokeWidth={1.5} aria-hidden="true" /></div>
                    )}
                  </div>
                  <div className="wk-body">
                    <div className="wk-card-head">
                      <h2 className="wk-title">{project.title}</h2>
                      <span className="wk-status"><span className="wk-dot" aria-hidden="true" />{project.status}</span>
                    </div>
                    <p className="wk-summary">{project.summary}</p>
                    {project.stack && (
                      <div className="wk-stack">
                        {project.stack.split(", ").slice(0, 4).map((tech) => (
                          <span key={`${project.slug}-${tech}`}>{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="wk-actions">
                      <Link to={`/projects/${project.slug}`} className="wk-cta">
                        Case study <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {project.links?.repo && (
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="wk-code">
                          <Github size={13} aria-hidden="true" /> Code <ArrowUpRight size={11} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
