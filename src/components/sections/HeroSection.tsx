import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Mic, Github, Linkedin, Mail } from "lucide-react";
import { useLenis } from "@/motion/LenisProvider";
import { SECTION, HERO } from "@/motion/tokens";
import { useChat } from "@/context/ChatContext";
import TextReveal from "@/components/TextReveal";

const HOOKS = [
  "What if your systems just worked?",
  "What does reliable actually look like?",
  "Ever wonder why systems fail?",
  "What if infrastructure was invisible?",
];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const { openVoiceChat } = useChat();
  const [hookIndex, setHookIndex] = useState(0);

  // Rotate question hooks
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setHookIndex((prev) => (prev + 1) % HOOKS.length);
    }, HERO.hookInterval);
    return () => clearInterval(interval);
  }, [reduced]);

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
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: HERO.ease },
        };

  return (
    <section
      id="hero"
      className="hero-accessible relative flex min-h-screen flex-col"
      aria-labelledby="hero-title"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(7_108_100_/_0.06),transparent_50%)]" />

      {/* Top bar: social icons left, contact right */}
      <motion.div
        className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6"
        {...fade(HERO.stagger.periphery)}
      >
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/laythayache"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-accent"
            data-magnetic
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/laythayache"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-accent"
            data-magnetic
          >
            <Github size={20} />
          </a>
        </div>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
          data-magnetic
          data-cursor-label="Contact"
        >
          <Mail size={16} aria-hidden />
          Get in Touch
        </a>
      </motion.div>

      {/* Main centered content */}
      <div className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-center px-6 py-2">
        {/* Layered photo + logo composition */}
        <motion.div
          className="relative flex h-[200px] w-[200px] items-center justify-center overflow-visible sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px]"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: HERO.entranceDuration, ease: HERO.ease }}
        >
          {/* Logo backdrop — inlined SVG, centered on the S content */}
          <svg
            viewBox="300 115 591 580"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-[2] h-auto w-[350px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] sm:w-[425px] md:w-[500px]"
          >
            <path transform="translate(819,147)" d="m0 0h9l-4 3-19 10-19 12-14 10-14 11-12 11-10 10-11 14-11 15-11 19-11 22-12 33-5 18-8 39-6 39-6 25-8 24-11 25-10 18-15 22-11 13-7 8-11 12-16 15-17 14-17 12-17 11-27 14-20 9-24 9-31 9-39 8-4-1 21-12 16-10 16-12 13-10 16-15 8-7 13-15 11-14 11-16 12-21 9-20 9-24 5-17 6-31 4-35 3-38 5-30 5-19 5-15 11-24 12-19 13-16 11-12 10-9 16-13 21-13 23-12 27-11 28-9 25-6 25-4 24-3z" fill="#6b7280"/>
            <path transform="translate(813,135)" d="m0 0h32l23 1 3 1v2l-20 10-22 12-14 8-20 13-11 8-20 16-17 17-9 11-10 14-8 13-9 16-8 19-7 19-7 23-6 28-5 30-5 27-6 23-10 28-12 25-9 15-8 12-14 18-12 13-7 8-9 9-8 7-11 10-11 8-15 11-18 11-16 9-17 9-27 11-34 11-36 8-29 4-21 2h-23l4-4 21-10 23-13 20-12 16-11 17-13 10-9 8-7 19-19 11-14 13-18 10-17 8-16 9-23 7-23 6-30 3-25 3-40 3-26 5-24 6-20 9-22 9-17 12-18 12-14 9-10 8-8 11-9 13-10 25-15 16-8 18-8 28-10 22-6 23-5 29-4zm6 12-22 2-37 5-22 5-24 7-17 6-22 9-20 10-19 12-11 8-13 11-15 14-9 11-9 12-12 20-11 25-7 24-5 27-3 30-3 36-5 32-5 21-8 24-11 26-12 22-8 12-12 16-12 14-9 10-12 11-10 9-16 12-20 14-25 14-3 3 9-1 34-7 31-9 19-7 23-10 24-12 21-13 16-12 14-11 24-22 14-15 11-14 8-11 12-19 9-17 10-25 7-21 6-27 7-45 7-32 5-16 11-31 14-28 12-19 12-15 9-11 15-15 14-11 15-11 16-10 17-10 12-6v-1z" fill="#6b7280"/>
          </svg>

          {/* Pulsating rings — 4 rings radiating outward */}
          <div className="animate-hero-pulse absolute z-[3] h-[220px] w-[220px] rounded-full border-2 border-accent/35 sm:h-[250px] sm:w-[250px] md:h-[280px] md:w-[280px]" />
          <div className="animate-hero-pulse-delayed absolute z-[3] h-[270px] w-[270px] rounded-full border-[1.5px] border-accent/25 sm:h-[310px] sm:w-[310px] md:h-[350px] md:w-[350px]" />
          <div className="animate-hero-pulse-third absolute z-[3] h-[320px] w-[320px] rounded-full border border-accent/15 sm:h-[370px] sm:w-[370px] md:h-[420px] md:w-[420px]" />
          <div className="animate-hero-pulse-fourth absolute z-[3] h-[370px] w-[370px] rounded-full border border-accent/10 sm:h-[430px] sm:w-[430px] md:h-[490px] md:w-[490px]" />

          {/* Circular photo — object-position lower to show full face */}
          <img
            src="/landing-page-portrait.png"
            alt="Layth Ayache — Technical Architect"
            className="relative z-10 h-[150px] w-[150px] rounded-full border-[3px] border-accent/40 object-cover object-top shadow-[0_8px_30px_rgb(7_108_100_/_0.2),0_18px_40px_rgb(15_23_42_/_0.12)] sm:h-[175px] sm:w-[175px] md:h-[200px] md:w-[200px]"
            loading="eager"
          />

          {/* Mic button — on the inner ring edge, bottom-right */}
          <motion.button
            type="button"
            onClick={openVoiceChat}
            aria-label="Start voice conversation"
            data-magnetic
            data-cursor-label="Talk to me"
            className="absolute bottom-[-2%] right-[2%] z-20 flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-surface-raised text-accent shadow-md transition-colors hover:bg-accent hover:text-white sm:h-10 sm:w-10"
            whileHover={reduced ? undefined : { scale: 1.1 }}
            whileTap={reduced ? undefined : { scale: 0.95 }}
            initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: HERO.stagger.periphery,
              duration: 0.4,
              ease: HERO.ease,
            }}
          >
            <Mic size={16} />
          </motion.button>
        </motion.div>

        {/* Name — extra bottom padding to prevent descender clipping */}
        <TextReveal
          text="Layth Ayache"
          as="h1"
          className="mt-4 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl"
          delay={HERO.stagger.name}
        />

        {/* Title — letter-spaced */}
        <motion.p
          className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-text-muted sm:text-sm"
          {...fade(HERO.stagger.title)}
        >
          AI Systems Architect
        </motion.p>

        {/* Rotating question hooks */}
        <div className="mt-2.5 h-8 sm:h-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={hookIndex}
              className="text-center font-serif text-lg font-medium text-text-secondary sm:text-xl md:text-2xl"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{
                duration: HERO.hookTransition,
                ease: HERO.ease,
              }}
              id="hero-title"
            >
              {HOOKS[hookIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={() => scrollToSection("projects")}
          whileHover={reduced ? undefined : SECTION.buttonHover}
          whileTap={reduced ? undefined : SECTION.buttonTap}
          data-magnetic
          data-cursor-label="Explore"
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:px-8 sm:py-3 sm:text-base"
          {...fade(HERO.stagger.cta)}
        >
          Explore My Work
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("about")}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO.stagger.scroll, duration: 0.5 }}
        className="scroll-indicator relative z-10 mx-auto mb-2 flex flex-col items-center gap-0.5 text-text-muted"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={14} aria-hidden />
      </motion.button>
    </section>
  );
}
