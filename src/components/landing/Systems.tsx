import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getProjectBySlug } from "@/content/projects";

const selectedSystems = [
  getProjectBySlug("public-information-infrastructure"),
  getProjectBySlug("omnisign"),
].filter(Boolean);

const theses: Record<string, string> = {
  "public-information-infrastructure":
    "Production-grade infrastructure for collecting, normalizing, and serving public media data. Tracking changes at scale with provenance and auditability.",
  omnisign:
    "Privacy-first sign language translation for Lebanese Sign Language. Real-time on-device CV pipeline with federated learning architecture.",
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function Systems() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-2xl font-semibold text-text-primary md:text-3xl"
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fade}
        >
          Selected Systems
        </motion.h2>

        <div className="mt-12 space-y-16 md:space-y-20">
          {selectedSystems.map((project) => {
            if (!project) return null;
            return (
              <motion.div
                key={project.slug}
                className="border-t border-border pt-8"
                initial={reduced ? undefined : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fade}
              >
                <h3 className="font-serif text-xl font-semibold text-text-primary md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {theses[project.slug] ?? project.summary}
                </p>
                <p className="mt-4 font-mono text-xs tracking-wide text-text-muted">
                  {project.stack}
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-4 inline-block font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
                >
                  Read more &rarr;
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
