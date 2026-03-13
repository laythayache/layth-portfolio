import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
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
import { Link } from "react-router-dom";
import { projects } from "@/content/projects";
import { cn, statusColor } from "@/lib/utils";

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

/** Stock placeholder thumbnails for projects without images */
const PLACEHOLDER_THUMBS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80",
];

/** Show the top 3 featured projects on the landing page */
const TOP_COUNT = 3;

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const topProjects = useMemo(
    () => projects.filter((p) => p.featured).slice(0, TOP_COUNT),
    []
  );

  return (
    <section id="projects" className="section-glass-alt section-shell px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="type-h2 text-center"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Highlights from production systems and research projects. Each card
          links to a full case study with scope, architecture, and outcomes.
        </motion.p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topProjects.map((project, index) => {
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
                  duration: 0.35,
                  delay: reduced ? 0 : index * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                {/* Thumbnail */}
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

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="type-h3 text-[1.05rem] sm:text-[1.15rem]">
                      {project.title}
                    </h3>
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
                        .slice(0, 5)
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
                      Open Case Study
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

        <motion.div
          className="mt-8 flex justify-center"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            View all projects
            <ArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
