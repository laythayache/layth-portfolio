import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

const labSections = [
  { key: "intervention", label: "What I tried" },
  { key: "problem", label: "Why it mattered" },
  { key: "didnt", label: "What failed" },
  { key: "worked", label: "What worked" },
] as const;

export default function LabPreview() {
  const reduced = useReducedMotion();
  const latest = projects.slice(0, 2);

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fade}
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary md:text-3xl">
            The Lab
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            Each entry documents what was tried, what failed, and what I learned.
          </p>
        </motion.div>

        <div className="mt-12 space-y-16">
          {latest.map((project) => (
            <motion.article
              key={project.slug}
              className="border-t border-border pt-8"
              initial={reduced ? undefined : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fade}
            >
              <h3 className="font-serif text-xl font-semibold text-text-primary">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-text-muted">
                {project.stack} &middot; {project.status}
              </p>

              <div className="mt-6 space-y-4">
                {labSections.map(({ key, label }) => {
                  const content =
                    project.sections[key as keyof typeof project.sections];
                  if (!content) return null;
                  const preview =
                    content.length > 150
                      ? content.slice(0, 150).trim() + "\u2026"
                      : content;
                  return (
                    <div key={key}>
                      <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                        {label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {preview}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="mt-4 inline-block font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
              >
                Full entry &rarr;
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/lab"
            className="font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            View all lab entries &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
