import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="flex flex-col items-center text-center">
        {/* Name + emblem — compact unit */}
        <motion.div
          className="flex items-center gap-4"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0}
          variants={fade}
        >
          <img
            src="/logo-mark.svg"
            alt=""
            className="h-10 w-auto opacity-50 sm:h-12"
          />
          <p className="font-serif text-lg font-semibold tracking-wide text-text-muted sm:text-xl">
            LAYTH AYACHE
          </p>
        </motion.div>

        {/* Headline — the dominant element */}
        <motion.h1
          className="mt-8 max-w-xl font-serif text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.1}
          variants={fade}
        >
          Building AI infrastructure.
          <br />
          <span className="text-text-secondary">Documenting the process.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.25}
          variants={fade}
        >
          I am building toward institutional-level AI systems. This site
          documents the evolution&mdash;projects, failures, iterations,
          thinking.
        </motion.p>

        {/* CTA — proper button */}
        <motion.div
          className="mt-10"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.4}
          variants={fade}
        >
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 border border-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            Enter the Lab
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
