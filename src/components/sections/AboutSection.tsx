import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION } from "@/motion/tokens";

const LANGUAGES = [
  "Arabic (Native)",
  "French (B2 DELF)",
  "English (Professional)",
] as const;

const badgePop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.04 + index * 0.06,
      ease: SECTION.ease,
    },
  }),
};

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2
          className="font-serif text-3xl font-bold text-text-primary md:text-4xl"
          variants={SECTION.fadeUp}
        >
          About Me
        </motion.h2>

        <motion.p
          className="mt-6 text-lg leading-relaxed text-text-secondary"
          variants={SECTION.fadeUp}
        >
          Computer and Communication Engineer with 2+ years of experience in AI,
          computer vision, network engineering, and data analytics. I design,
          deploy, and optimize AI-driven systems across telecom, finance,
          embedded systems, and healthcare domains.
        </motion.p>

        <motion.blockquote
          className={cn(
            "mt-8 border-l-4 border-accent bg-surface-raised p-6",
            "text-base leading-relaxed text-text-primary italic"
          )}
          variants={SECTION.fadeUp}
        >
          I build systems that work under real constraints, not demos for ideal
          conditions.
        </motion.blockquote>

        <motion.div className="mt-10" variants={SECTION.fadeUp}>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((language, index) => (
              <motion.span
                key={language}
                className={cn(
                  "rounded-full border border-border-strong px-3 py-1",
                  "font-mono text-xs text-text-secondary"
                )}
                variants={badgePop}
                custom={index}
              >
                {language}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-10" variants={SECTION.fadeUp}>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Beyond Engineering
          </h3>
          <p className="font-mono text-base leading-relaxed text-text-muted">
            7 years pianist (Lebanese Conservatory) / EMT volunteer / Jarrah
            Scouts member
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
