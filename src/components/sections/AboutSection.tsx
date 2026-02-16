import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  "Arabic (Native)",
  "French (B2 DELF)",
  "English (Professional)",
] as const;

// -- animation variants --

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// -- component --

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="bg-surface-overlay px-6 py-24 sm:py-32">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* Section heading */}
        <motion.h2
          className="font-serif text-3xl font-bold text-text-primary"
          variants={fadeUp}
        >
          About Me
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="mt-6 text-base leading-relaxed text-text-secondary"
          variants={fadeUp}
        >
          Computer and Communication Engineer with 2+ years of experience in AI,
          Computer Vision, Network Engineering, and Data Analytics. I design,
          deploy, and optimize AI-driven systems across telecom, finance,
          embedded systems, and healthcare domains.
        </motion.p>

        {/* Philosophy callout */}
        <motion.blockquote
          className={cn(
            "mt-8 border-l-4 border-accent bg-surface-raised p-6",
            "text-sm leading-relaxed text-text-primary italic"
          )}
          variants={fadeUp}
        >
          I believe in building systems that work under real constraints — not
          demos for ideal conditions.
        </motion.blockquote>

        {/* Languages */}
        <motion.div className="mt-10" variants={fadeUp}>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <span
                key={lang}
                className={cn(
                  "rounded-full border border-border-strong px-3 py-1",
                  "font-mono text-xs text-text-secondary"
                )}
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interdisciplinary callout */}
        <motion.div className="mt-10" variants={fadeUp}>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Beyond Engineering
          </h3>
          <p className="font-mono text-sm leading-relaxed text-text-muted">
            7 years pianist (Lebanese Conservatory) &middot; EMT volunteer
            &middot; Jarrah Scouts member
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
