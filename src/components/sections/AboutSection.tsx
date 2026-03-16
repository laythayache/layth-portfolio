import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION, HERO } from "@/motion/tokens";

/* ── data ─────────────────────────────────────────────────────── */

const PULL_QUOTES = [
  "I don't build things that work — I build things that keep working.",
  "I optimize for the person who inherits my code at 2am.",
  "If it can't survive a bad network, a tired operator, and a Tuesday deploy — it's not ready.",
  "When the power cuts three times a day, you learn what fault-tolerant really looks like.",
  "Clever code impresses engineers. Boring code serves users.",
  "I come from a country where nothing works automatically — so I learned to make things work automatically.",
  "Unreliable infrastructure taught me what reliable engineering actually means.",
  "The trash can is always fuller than the desk.",
  "Every system I've shipped has a graveyard of versions that didn't make it.",
  "I don't trust systems that haven't failed yet.",
] as const;

const QUOTE_INTERVAL = 5000;

const CONTENT_BLOCKS = [
  {
    label: "My Process",
    text: "I spec before I build, prototype before I commit, and test against failure before I test for success. I'd rather ship something simple that survives reality than something ambitious that doesn't.",
  },
  {
    label: "Working With Me",
    text: "I ask a lot of questions at the start so I don't build the wrong thing. I over-communicate during the build so there are no surprises. I document after the ship so the next person isn't guessing. That's the loop.",
  },
  {
    label: "The Long Game",
    text: "I don't want to build the next app. I want to build the thing the next app runs on. Infrastructure that outlasts the team that built it.",
  },
] as const;

/* ── reveal image component ───────────────────────────────────── */

/** Each blob is an elliptical hole that oscillates around the cursor. */
const BLOBS = [
  { rx: 195, ry: 150, phase: 0, speed: 0.9, amp: 32 },
  { rx: 160, ry: 185, phase: 1.6, speed: 1.25, amp: 38 },
  { rx: 178, ry: 162, phase: 3.1, speed: 0.75, amp: 28 },
  { rx: 150, ry: 178, phase: 4.4, speed: 1.05, amp: 34 },
];

function DualLayerReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const reduced = useReducedMotion();

  /* detect touch device once */
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* morphing animation loop — runs while cursor is over image */
  useEffect(() => {
    if (isTouch || reduced) return;
    const front = frontRef.current;
    if (!front) return;

    let running = true;

    function animate() {
      if (!running) return;
      const pos = mousePos.current;
      if (pos && front) {
        const t = performance.now() / 1000;
        const gradients = BLOBS.map((b) => {
          const dx = Math.sin(t * b.speed + b.phase) * b.amp;
          const dy = Math.cos(t * b.speed * 0.7 + b.phase + 0.5) * b.amp;
          return `radial-gradient(ellipse ${b.rx}px ${b.ry}px at ${pos.x + dx}px ${pos.y + dy}px, transparent 0%, transparent 40%, black 68%)`;
        });
        const mask = gradients.join(", ");
        front.style.maskImage = mask;
        front.style.webkitMaskImage = mask;
        front.style.maskComposite = "intersect";
        (front.style as any).webkitMaskComposite = "source-in";
      }
      rafId.current = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouch, reduced]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [isTouch],
  );

  const handleLeave = useCallback(() => {
    mousePos.current = null;
    const front = frontRef.current;
    if (front) {
      front.style.maskImage = "";
      front.style.webkitMaskImage = "";
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "about-reveal-container relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl",
        "shadow-[0_16px_48px_rgb(15_23_42_/_0.10)] border border-border",
        "aspect-[4/3] sm:aspect-[16/10]",
        isTouch && !reduced && "about-reveal-auto-sweep",
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Back image — "The Process" (warm, revealed through mask) */}
      <img
        src="/images/about/about-process.png"
        alt="The process — late nights, effort, and failed attempts"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Front image — "The Result" (cool/teal, default visible) */}
      <img
        ref={frontRef}
        src="/images/about/about-result.png"
        alt="The result — composed, confident, finished work"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Subtle hint label */}
      {!isTouch && (
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-md border border-border-strong/60 bg-surface/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted backdrop-blur-sm select-none opacity-60">
          hover to reveal
        </span>
      )}
    </div>
  );
}

/* ── rotating pull quote ──────────────────────────────────────── */

function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PULL_QUOTES.length);
    }, QUOTE_INTERVAL);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="mx-auto flex min-h-[10rem] max-w-3xl items-center justify-center text-center sm:min-h-[8rem] lg:min-h-[7rem]">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          className="font-serif text-2xl font-semibold leading-snug text-text-primary italic md:text-3xl lg:text-4xl"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -12 }}
          transition={{
            duration: HERO.hookTransition,
            ease: SECTION.ease,
          }}
        >
          &ldquo;{PULL_QUOTES[index]}&rdquo;
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}

/* ── main section ─────────────────────────────────────────────── */

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        {/* ── Dual-layer reveal image ── */}
        <motion.div variants={SECTION.fadeUp}>
          <DualLayerReveal />
        </motion.div>

        {/* ── Rotating pull quote ── */}
        <motion.div className="mt-12" variants={SECTION.fadeUp}>
          <RotatingQuote />
        </motion.div>

        {/* ── Content blocks — 3 columns ── */}
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {CONTENT_BLOCKS.map((block) => (
            <motion.div key={block.label} variants={SECTION.fadeUp}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
                {block.label}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {block.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
