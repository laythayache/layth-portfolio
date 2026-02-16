import { motion, useReducedMotion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function Manifesto() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-[680px]"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fade}
      >
        <h2 className="font-serif text-2xl font-semibold text-text-primary md:text-3xl">
          What I&rsquo;m Building
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
          <p>
            Building AI systems that survive unstable environments.
          </p>
          <p>
            Optimizing for clarity, leverage, and infrastructure that
            compounds&mdash;not features that decay.
          </p>
          <p>
            Multilingual intelligence. Arabic-first where it matters.
          </p>
          <p>
            Long-term decision architecture over short-term demonstration.
          </p>
          <p className="text-text-muted">
            The systems I build are designed to outlast the conditions they were
            built in.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
