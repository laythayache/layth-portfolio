import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Github,
  ShieldCheck,
  Stethoscope,
  Globe,
  Cloud,
  Database,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import SEO from "@/components/SEO";
import { projects } from "@/content/projects";
import { cn, statusColor } from "@/lib/utils";
import { DEFAULT_KEYWORDS } from "@/content/siteSeo";

const TAG_ICON_MAP: Record<string, LucideIcon> = {
  Medical: Stethoscope,
  Embedded: Cpu,
  IoT: Cpu,
  Security: ShieldCheck,
  "Web Development": Globe,
  Cloud: Cloud,
  "Data Pipelines": Database,
  Automation: Workflow,
  "E-Commerce": Globe,
  Hardware: Cpu,
  Electronics: Cpu,
};

function getProjectIcon(projectTags: string[] | undefined): LucideIcon {
  for (const tag of projectTags ?? []) {
    if (TAG_ICON_MAP[tag]) return TAG_ICON_MAP[tag];
  }
  return Brain;
}

const PLACEHOLDER_THUMBS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80",
];

function buildFilters(items: typeof projects) {
  const tagCounts = new Map<string, number>();
  for (const p of items) {
    for (const tag of p.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  return [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

export default function ProjectsIndex() {
  const reduced = useReducedMotion();
  const allProjects = useMemo(() => projects.filter((p) => p.featured), []);
  const tags = useMemo(() => buildFilters(allProjects), [allProjects]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeTag
        ? allProjects.filter((p) => (p.tags ?? []).includes(activeTag))
        : allProjects,
    [activeTag, allProjects]
  );

  return (
    <>
      <SEO
        title="Projects | Layth Ayache"
        description="Browse all projects — production systems, research prototypes, and engineering case studies."
        canonical="https://laythayache.com/projects"
        keywords={[...DEFAULT_KEYWORDS, "projects", "case studies", "portfolio"]}
      />

      <section className="section-shell px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to homepage
          </Link>

          <h1 className="type-h2 mt-5">All Projects</h1>
          <p className="type-body mt-4 max-w-3xl">
            Production systems, research prototypes, and engineering case
            studies. Filter by domain or browse the full list.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeTag === null
                  ? "border-accent bg-accent text-white"
                  : "border-border-strong bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeTag === tag
                    ? "border-accent bg-accent text-white"
                    : "border-border-strong bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-base text-text-secondary">
              No projects match this filter.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => {
                const Icon = getProjectIcon(project.tags);
                const thumb =
                  project.thumbnail ??
                  PLACEHOLDER_THUMBS[index % PLACEHOLDER_THUMBS.length];

                return (
                  <motion.article
                    key={project.slug}
                    className="card-lift overflow-hidden rounded-2xl border border-border bg-surface-raised"
                    initial={reduced ? undefined : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.3,
                      delay: reduced ? 0 : (index % 6) * 0.04,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-border bg-surface-overlay">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={`${project.title} project thumbnail`}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Icon
                            size={48}
                            className="text-text-muted"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-text-primary">
                          {project.title}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-text-muted">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              statusColor(project.status)
                            )}
                          />
                          {project.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-3">
                        {project.summary}
                      </p>

                      {project.stack && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack
                            .split(", ")
                            .slice(0, 4)
                            .map((tech) => (
                              <span
                                key={`${project.slug}-${tech}`}
                                className="rounded-full border border-border-strong bg-surface px-2.5 py-0.5 text-xs text-text-secondary"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-md border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                        >
                          Case Study
                          <ArrowRight size={14} aria-hidden />
                        </Link>
                        {project.links?.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
                          >
                            <Github size={14} aria-hidden />
                            Code
                            <ArrowUpRight size={12} aria-hidden />
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
      </section>
    </>
  );
}
