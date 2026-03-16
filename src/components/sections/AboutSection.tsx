import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION } from "@/motion/tokens";

/* ── data ─────────────────────────────────────────────────────── */

const LANGUAGES = [
  "Arabic (Native)",
  "French (B2 DELF)",
  "English (Professional)",
] as const;

const BEYOND = [
  "7 yrs pianist — Lebanese Conservatory",
  "EMT volunteer — Civil Defense",
  "Jarrah Scouts member",
  "AI Club President",
  "Zaka AI Student Ambassador",
] as const;

/* ── animation variants ───────────────────────────────────────── */

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
        src="/about-process.png"
        alt="The process — late nights, coffee, books, and failed attempts"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Front image — "The Result" (cool/teal, default visible) */}
      <img
        ref={frontRef}
        src="/about-result.png"
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

        {/* ── Pull quote ── */}
        <motion.blockquote
          className="mx-auto mt-12 max-w-3xl text-center font-serif text-2xl font-semibold leading-snug text-text-primary italic md:text-3xl lg:text-4xl"
          variants={SECTION.fadeUp}
        >
          &ldquo;I build systems that work under real constraints, not demos
          for ideal conditions.&rdquo;
        </motion.blockquote>

        {/* ── Supporting content — 3 columns ── */}
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Bio */}
          <motion.div variants={SECTION.fadeUp}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Who I Am
            </h3>
            <p className="text-base leading-relaxed text-text-secondary">
              AI Systems Architect. B.E. in Computer &amp; Communication
              Engineering. I architect internal software systems, build
              automated workflows, and deploy production AI solutions across
              telecom, finance, and enterprise platforms.
            </p>
          </motion.div>

          {/* Languages */}
          <motion.div variants={SECTION.fadeUp}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((language, index) => (
                <motion.span
                  key={language}
                  className={cn(
                    "rounded-full border border-border-strong px-3 py-1",
                    "font-mono text-xs text-text-secondary",
                  )}
                  variants={badgePop}
                  custom={index}
                >
                  {language}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Beyond Engineering */}
          <motion.div variants={SECTION.fadeUp}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
              Beyond Engineering
            </h3>
            <ul className="space-y-1.5">
              {BEYOND.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm leading-relaxed text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
