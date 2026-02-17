import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
  const [pointerTracking, setPointerTracking] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.45 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Combined scroll + pointer parallax for the backdrop.
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgPointerX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const bgPointerY = useTransform(smoothY, [-1, 1], [-28, 28]);
  const bgY = useTransform([bgScrollY, bgPointerY], ([scrollY, driftY]) => scrollY + driftY);

  // Content depth response.
  const contentX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const contentY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const contentRotateX = useTransform(smoothY, [-1, 1], [4.5, -4.5]);
  const contentRotateY = useTransform(smoothX, [-1, 1], [-5.5, 5.5]);
  const outerRingRotate = useTransform(smoothX, [-1, 1], [-12, 12]);
  const innerRingX = useTransform(smoothX, [-1, 1], [10, -10]);
  const innerRingY = useTransform(smoothY, [-1, 1], [8, -8]);
  const innerRingRotate = useTransform(smoothY, [-1, 1], [8, -8]);
  const portraitRotateX = useTransform(smoothY, [-1, 1], [9, -9]);
  const portraitRotateY = useTransform(smoothX, [-1, 1], [-9, 9]);
  const portraitX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const portraitY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Spotlight follows pointer for cinematic lighting.
  const lightX = useTransform(smoothX, [-1, 1], [26, 74]);
  const lightY = useTransform(smoothY, [-1, 1], [18, 78]);
  const spotlight = useMotionTemplate`radial-gradient(40rem circle at ${lightX}% ${lightY}%, rgb(var(--accent) / 0.22), transparent 62%)`;
  const secondaryGlow = useMotionTemplate`radial-gradient(32rem circle at ${lightY}% ${lightX}%, rgb(15 23 42 / 0.18), transparent 60%)`;

  useEffect(() => {
    if (reduced) {
      setPointerTracking(false);
      pointerX.set(0);
      pointerY.set(0);
      setPointerInside(false);
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateTracking = () => {
      setPointerTracking(mediaQuery.matches);
    };

    updateTracking();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTracking);
      return () => mediaQuery.removeEventListener("change", updateTracking);
    }

    mediaQuery.addListener(updateTracking);
    return () => mediaQuery.removeListener(updateTracking);
  }, [pointerX, pointerY, reduced]);

  function clampUnit(value: number) {
    return Math.max(-1, Math.min(1, value));
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!pointerTracking || reduced || !sectionRef.current) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(clampUnit(x));
    pointerY.set(clampUnit(y));
    setPointerInside(true);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
    setPointerInside(false);
  }

  function handleScrollToProjects() {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="hero-cinematic relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 pt-16"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* --- Cinematic scene layers --- */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { x: bgPointerX, y: bgY }}
        aria-hidden
      >
        <div
          className="hero-cinematic-grid h-full w-full opacity-[0.58]"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 20% 18%, rgb(2 132 199 / 0.2), transparent 36%)",
              "radial-gradient(circle at 78% 74%, rgb(30 64 175 / 0.15), transparent 42%)",
              "radial-gradient(circle, rgb(var(--border) / 0.85) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "auto, auto, 28px 28px",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { backgroundImage: spotlight }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { backgroundImage: secondaryGlow }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60"
        style={
          reduced
            ? undefined
            : {
                x: contentX,
                y: contentY,
                rotate: outerRingRotate,
              }
        }
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-strong/70"
        style={
          reduced
            ? undefined
            : {
                x: innerRingX,
                y: innerRingY,
                rotate: innerRingRotate,
              }
        }
        aria-hidden
      />

      <div className="hero-cinematic-grain pointer-events-none absolute inset-0" aria-hidden />

      {/* --- Content --- */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center [transform-style:preserve-3d]"
        style={
          reduced || !pointerTracking
            ? undefined
            : {
                x: contentX,
                y: contentY,
                rotateX: contentRotateX,
                rotateY: contentRotateY,
              }
        }
      >
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
            "border-2 border-border bg-surface-overlay shadow-[0_0_0_1px_rgb(255_255_255_/_0.8),0_18px_40px_rgb(15_23_42_/_0.14)]"
          )}
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.7}
          variants={fade}
          style={
            reduced || !pointerTracking
              ? undefined
              : {
                  rotateX: portraitRotateX,
                  rotateY: portraitRotateY,
                  x: portraitX,
                  y: portraitY,
                }
          }
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
              "transition-colors hover:bg-accent hover:text-white",
              "shadow-[0_12px_30px_rgb(37_99_235_/_0.14)]"
            )}
          >
            See My Work
            <ArrowDown size={14} />
          </button>
        </motion.div>
      </motion.div>

      {pointerTracking && !reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 border border-accent/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: pointerInside ? 0.48 : 0.22 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0.2, 1] }}
          aria-hidden
        />
      )}

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
