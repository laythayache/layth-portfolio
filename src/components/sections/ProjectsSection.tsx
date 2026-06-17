import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Brain, Cpu, ShieldCheck, Stethoscope, Globe, Cloud, Database, Workflow, type LucideIcon } from "lucide-react";
import { SECTION } from "@/motion/tokens";
import { projects } from "@/content/projects";
import "./Work.css";

const TAG_ICON_MAP: Record<string, LucideIcon> = {
  Medical: Stethoscope, Embedded: Cpu, IoT: Cpu, Security: ShieldCheck,
  "Web Development": Globe, Cloud: Cloud, "Data Pipelines": Database,
  Automation: Workflow, "E-Commerce": Globe, Hardware: Cpu, Electronics: Cpu,
};
function getProjectIcon(tags: string[] | undefined): LucideIcon {
  for (const tag of tags ?? []) if (TAG_ICON_MAP[tag]) return TAG_ICON_MAP[tag];
  return Brain;
}
const PLACEHOLDER_THUMBS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80",
];
const TOP_COUNT = 3;

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const topProjects = useMemo(() => projects.filter((p) => p.featured).slice(0, TOP_COUNT), []);

  return (
    <section id="projects" className="work-band" aria-label="Work">
      <motion.div
        className="wk-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.p variants={SECTION.fadeUp} className="wk-kicker">
          <span className="wk-dash" aria-hidden="true" /> work
        </motion.p>
        <motion.h2 variants={SECTION.fadeUp} className="wk-lead">
          Work
        </motion.h2>
        <motion.div variants={SECTION.fadeUp} className="wk-rule" aria-hidden="true" />
        <motion.p variants={SECTION.fadeUp} className="wk-sub">
          A selection of systems I've built — open any for the full case study.
        </motion.p>

        <motion.div variants={SECTION.fadeUp} className="wk-grid">
          {topProjects.map((project, i) => {
            const Icon = getProjectIcon(project.tags);
            const thumb = project.thumbnail ?? PLACEHOLDER_THUMBS[i % PLACEHOLDER_THUMBS.length];
            return (
              <article key={project.slug} className="wk-card">
                <div className="wk-thumb">
                  {thumb ? (
                    <img src={thumb} alt={`${project.title} thumbnail`} loading="lazy" />
                  ) : (
                    <div className="wk-thumb-fallback"><Icon size={42} strokeWidth={1.5} aria-hidden="true" /></div>
                  )}
                </div>
                <div className="wk-body">
                  <div className="wk-card-head">
                    <h3 className="wk-title">{project.title}</h3>
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
              </article>
            );
          })}
        </motion.div>

        <motion.div variants={SECTION.fadeUp} className="wk-more">
          <Link to="/projects" className="wk-all">
            See all work <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
