import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Camera, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = [
  "AI Systems",
  "Computer Vision",
  "Network Engineering",
  "Automation",
  "Consulting",
] as const;

const HEADLINE_LINE_1 = ["AI", "Systems", "Engineer", "&"];
const HEADLINE_LINE_2 = ["Technical", "Consultant"];

// -- animation variants --

const wordReveal = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0, 0, 0.2, 1] },
  }),
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      delay: 0.9 + i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const bounce = {
  y: [0, 6, 0],
  transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
};

// -- component --

export default function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // parallax offset for the dot grid background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const allWords = [...HEADLINE_LINE_1, ...HEADLINE_LINE_2];

  function handleScrollToProjects() {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 pt-16"
    >
      {/* --- Dot grid background --- */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: bgY }}
        aria-hidden
      >
        <div
          className="h-full w-full opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      {/* --- Content --- */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo + name row */}
        <motion.div
          className="flex items-center gap-3"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0}
          variants={fade}
        >
          <img
            src="/logo-mark.svg"
            alt=""
            className="h-8 w-auto opacity-50 sm:h-10"
          />
          <p className="font-serif text-sm tracking-widest text-text-muted sm:text-base">
            LAYTH AYACHE
          </p>
        </motion.div>

        {/* Headline with word-reveal */}
        <h1 className="mt-8 max-w-2xl font-serif text-4xl font-bold leading-tight text-text-primary sm:text-5xl md:text-6xl">
          {/* Line 1 */}
          <span className="flex flex-wrap justify-center gap-x-[0.3em]">
            {HEADLINE_LINE_1.map((word, i) => (
              <span key={word + i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reduced ? undefined : "hidden"}
                  animate="visible"
                  custom={i}
                  variants={wordReveal}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>

          {/* Line 2 */}
          <span className="flex flex-wrap justify-center gap-x-[0.3em]">
            {HEADLINE_LINE_2.map((word, j) => {
              const globalIndex = HEADLINE_LINE_1.length + j;
              return (
                <span key={word + j} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block text-text-secondary"
                    initial={reduced ? undefined : "hidden"}
                    animate="visible"
                    custom={globalIndex}
                    variants={wordReveal}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.6}
          variants={fade}
        >
          Building AI infrastructure, automating workflows, and consulting for
          companies across telecom, finance, and healthcare. Based in Beirut.
        </motion.p>

        {/* Portrait placeholder */}
        <motion.div
          className={cn(
            "mt-8 flex h-40 w-40 items-center justify-center rounded-full",
            "border-2 border-border bg-surface-overlay"
          )}
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.7}
          variants={fade}
        >
          <Camera size={36} className="text-text-muted" />
        </motion.div>

        {/* Skill badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className={cn(
                "rounded-full border border-border-strong px-3 py-1",
                "font-mono text-xs text-text-secondary"
              )}
              initial={reduced ? undefined : "hidden"}
              animate="visible"
              custom={i}
              variants={badgePop}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={1.3}
          variants={fade}
        >
          <button
            type="button"
            onClick={handleScrollToProjects}
            className={cn(
              "inline-flex items-center gap-2 border border-accent px-6 py-3",
              "font-mono text-sm uppercase tracking-wider text-accent",
              "transition-colors hover:bg-accent hover:text-white"
            )}
          >
            See My Work
            <ArrowDown size={14} />
          </button>
        </motion.div>
      </div>

      {/* --- Scroll indicator --- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <motion.div animate={reduced ? undefined : bounce}>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
