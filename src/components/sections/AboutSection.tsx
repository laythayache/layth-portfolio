import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION } from "@/motion/tokens";

/* ── data ─────────────────────────────────────────────────────── */

/** The single epigraph — strongest of the prior rotating set.
 *  Editorial restraint: pick one line and commit. */
const EPIGRAPH =
  "I come from a country where nothing works automatically — so I learned to make things work automatically.";

const CONTENT_BLOCKS = [
  {
    label: "I.  Process",
    text: "I spec before I build, prototype before I commit, and test against failure before I test for success. I'd rather ship something simple that survives reality than something ambitious that doesn't.",
  },
  {
    label: "II. Working with me",
    text: "I ask a lot of questions at the start so I don't build the wrong thing. I over-communicate during the build so there are no surprises. I document after the ship so the next person isn't guessing. That's the loop.",
  },
  {
    label: "III. The long game",
    text: "I don't want to build the next app. I want to build the thing the next app runs on. Infrastructure that outlasts the team that built it.",
  },
] as const;

/* ── dual-layer reveal — kept but simplified ───────────────────── */

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

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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
        (front.style as React.CSSProperties & Record<string, string>).webkitMaskComposite = "source-in";
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
    <figure>
      <div
        ref={containerRef}
        className={cn(
          "about-reveal-container relative w-full overflow-hidden border border-border-strong/60",
          "aspect-[16/10]",
          isTouch && !reduced && "about-reveal-auto-sweep",
        )}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          src="/images/about/about-process.png"
          alt="Process — late nights, effort, failed attempts"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <img
          ref={frontRef}
          src="/images/about/about-result.png"
          alt="Result — composed, finished work"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        {!isTouch && (
          <span className="pointer-events-none absolute bottom-3 right-3 border border-border-strong/60 bg-surface/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-text-muted backdrop-blur-sm opacity-60">
            hover to reveal
          </span>
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        <span>process &nbsp;/&nbsp; result</span>
        <span className="text-border-strong">plate · ii</span>
      </figcaption>
    </figure>
  );
}

/* ── main section ─────────────────────────────────────────────── */

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-shell px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        {/* Editorial chapter header */}
        <motion.div variants={SECTION.fadeUp} className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            <span className="text-leather">—</span> no. 01 / about
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary">
            From a country where nothing works automatically.
          </h2>
          <div aria-hidden="true" className="mt-4 h-[2px] w-14 bg-leather" />
        </motion.div>

        {/* Static epigraph — replaces 10 rotating quotes */}
        <motion.blockquote
          variants={SECTION.fadeUp}
          className="my-12 border-l-2 border-leather/60 pl-6 font-serif text-[clamp(1.25rem,2.2vw,1.75rem)] italic leading-[1.4] text-text-primary"
        >
          &ldquo;{EPIGRAPH}&rdquo;
        </motion.blockquote>

        {/* Diptych */}
        <motion.div variants={SECTION.fadeUp} className="my-14">
          <DualLayerReveal />
        </motion.div>

        {/* Three sequential journal-entry blocks — left-aligned, numbered roman */}
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-10">
          {CONTENT_BLOCKS.map((block) => (
            <motion.article key={block.label} variants={SECTION.fadeUp}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-leather">
                {block.label}
              </h3>
              <div aria-hidden="true" className="mt-2 h-px w-8 bg-border-strong" />
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-text-secondary">
                {block.text}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
