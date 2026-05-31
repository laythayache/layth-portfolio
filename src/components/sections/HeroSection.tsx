import { useCallback, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { useLenis } from "@/motion/LenisProvider";
import { SECTION, HERO } from "@/motion/tokens";
import TextReveal from "@/components/TextReveal";
import HeroBackdrop from "@/components/sections/HeroBackdrop";
import HeroIntro, { shouldPlayHeroIntro } from "@/components/sections/HeroIntro";

const MANIFESTO = [
  "Architecture before automation.",
  "Reliability is not a feature. It is the system.",
  "If the network fails, the system should degrade — not disappear.",
];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const [introPlaying, setIntroPlaying] = useState(() =>
    reduced ? false : shouldPlayHeroIntro()
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -36]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 0.8, 0.2]
  );

  const scrollToSection = useCallback(
    (id: string) => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -84 });
        return;
      }
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    },
    [lenis]
  );

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: introPlaying ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: HERO.ease },
        };

  return (
    <>
      {introPlaying && (
        <HeroIntro onComplete={() => setIntroPlaying(false)} />
      )}
      <section
        ref={sectionRef}
        id="hero"
        className="hero-accessible hero-cinematic relative flex min-h-screen flex-col overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgb(var(--accent)/0.05),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="system-grid-bg pointer-events-none absolute inset-0 opacity-[0.14]"
        />
        <HeroBackdrop />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgb(var(--surface)/0.85)]"
        />

        <motion.div
          className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6"
          {...fade(HERO.stagger.periphery)}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-muted">
            LA <span className="mx-2 text-border-strong">/</span> Beirut{" "}
            <span className="mx-2 text-border-strong">—</span> 26
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/laythayache"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted transition-colors hover:text-text-primary"
              data-magnetic
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://github.com/laythayache"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted transition-colors hover:text-text-primary"
              data-magnetic
            >
              <Github size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-stretch justify-center gap-10 px-6 py-12 md:flex-row md:items-center md:gap-12 md:py-16 lg:gap-16"
        >
          <div className="md:w-7/12">
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted"
              {...fade(HERO.stagger.periphery + 0.05)}
            >
              <span className="text-leather">—</span> no. 04 / engineer&apos;s log
            </motion.p>

            {!introPlaying && (
              <TextReveal
                text="Layth Ayache."
                as="h1"
                className="mt-3 font-serif text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary"
                delay={HERO.stagger.name}
              />
            )}

            <motion.div
              aria-hidden="true"
              className="mt-4 h-[2px] w-14 bg-leather"
              initial={reduced ? undefined : { scaleX: 0, transformOrigin: "left" }}
              animate={introPlaying ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.6, delay: HERO.stagger.name + 0.2, ease: HERO.ease }}
            />

            <motion.p
              className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-text-secondary sm:text-[13px]"
              {...fade(HERO.stagger.title)}
            >
              AI Systems Engineer <span className="mx-2 text-border-strong">·</span> Technical Consultant
            </motion.p>

            <motion.p
              id="hero-title"
              className="mt-8 max-w-2xl font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em] text-text-primary"
              {...fade(HERO.stagger.title + 0.05)}
            >
              I build AI systems that survive reality.
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-text-secondary"
              {...fade(HERO.stagger.title + 0.1)}
            >
              Computer vision, data pipelines, and infrastructure designed for
              messy data, intermittent networks, and constraints that don&rsquo;t
              appear in lab demos.
            </motion.p>

            <motion.ul
              className="mt-8 space-y-2"
              initial="hidden"
              animate={introPlaying ? "hidden" : "visible"}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: HERO.stagger.title + 0.18 },
                },
              }}
            >
              {MANIFESTO.map((line) => (
                <motion.li
                  key={line}
                  variants={{
                    hidden: reduced ? {} : { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: HERO.ease } },
                  }}
                  className="flex gap-3 font-mono text-[12px] uppercase tracking-[0.1em] text-text-muted sm:text-[13px]"
                >
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-leather/70" />
                  <span className="leading-snug">{line}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              {...fade(HERO.stagger.cta)}
            >
              <motion.button
                type="button"
                onClick={() => scrollToSection("projects")}
                whileHover={reduced ? undefined : SECTION.buttonHover}
                whileTap={reduced ? undefined : SECTION.buttonTap}
                data-magnetic
                data-cursor-label="Case studies"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-surface-raised transition-colors hover:bg-accent-hover"
              >
                View case studies
                <span aria-hidden="true">→</span>
              </motion.button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                data-magnetic
                data-cursor-label="Discuss a system"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-primary transition-colors hover:text-leather"
              >
                <span aria-hidden="true" className="h-px w-5 bg-text-primary transition-colors group-hover:bg-leather" />
                Discuss a system
              </button>
            </motion.div>
          </div>

          <motion.div
            style={{ y: portraitY }}
            className="relative mx-auto w-full max-w-[280px] md:mx-0 md:w-5/12 md:max-w-none"
          >
            <motion.figure
              className="relative"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={introPlaying ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: HERO.stagger.name + 0.1, ease: HERO.ease }}
            >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border-strong/60 bg-surface-overlay/40">
              <img
                src="/images/brand/landing-page-portrait.png"
                alt="Layth Ayache — AI Systems Engineer & Technical Consultant"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/30 mix-blend-multiply"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              <span>Layth · 03</span>
              <span className="text-border-strong">portrait / beirut</span>
            </figcaption>
            </motion.figure>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToSection("about")}
          initial={reduced ? undefined : { opacity: 0 }}
          animate={introPlaying ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: HERO.stagger.scroll, duration: 0.5 }}
          className="scroll-indicator relative z-10 mx-auto mb-6 flex flex-col items-center gap-1 text-text-muted"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
            Continue
          </span>
          <ChevronDown size={13} aria-hidden />
        </motion.button>
      </section>
    </>
  );
}
