import { motion, useReducedMotion } from "framer-motion";

const experiments = [
  "Arabic-first RAG pipeline for multilingual retrieval",
  "Change detection benchmarks across Lebanese media sources",
  "Edge inference optimization for real-time gesture classification",
  "Structured extraction from unstructured government documents",
];

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function Experiments() {
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
        <p className="mt-4 text-base text-text-secondary">
          I document what I&rsquo;m still building.
        </p>

        <ul className="mt-8 space-y-4">
          {experiments.map((item) => (
            <li
              key={item}
              className="border-l-2 border-border pl-4 text-sm leading-relaxed text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
