import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { experiments, type ExperimentStatus } from "@/content/experiments";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

const statusColor: Record<ExperimentStatus, string> = {
  active: "text-accent",
  researching: "text-text-secondary",
  paused: "text-text-muted/60",
};

export default function ExperimentsPreview() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fade}
      >
        <h2 className="font-serif text-2xl font-semibold text-text-primary md:text-3xl">
          Ongoing Experiments
        </h2>
        <p className="mt-3 text-sm text-text-secondary">
          Active research and technical exploration. Status tracked honestly.
        </p>

        <ul className="mt-8 space-y-4">
          {experiments.map((exp) => (
            <li
              key={exp.id}
              className="flex items-start justify-between gap-4 border-l-2 border-border pl-4"
            >
              <p className="text-sm leading-relaxed text-text-secondary">
                {exp.title}
              </p>
              <span
                className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${statusColor[exp.status]}`}
              >
                {exp.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/experiments"
            className="font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            All experiments &rarr;
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
