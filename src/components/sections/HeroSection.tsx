import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/motion/LenisProvider";

const WALL_PATHS = [
  "M 18 52 L 62 34 L 94 60 L 132 38 L 182 72",
  "M 22 118 L 66 96 L 104 124 L 144 104 L 196 136",
  "M 20 184 L 64 162 L 108 194 L 150 170 L 202 206",
  "M 24 250 L 70 232 L 112 262 L 156 236 L 206 274",
  "M 16 316 L 58 292 L 98 326 L 142 304 L 192 338",
] as const;

function NeuralWall({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 360"
      className={cn(
        "h-full w-full",
        mirrored ? "-scale-x-100" : ""
      )}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {WALL_PATHS.map((path, index) => (
        <path
          key={`wall-path-${index}`}
          d={path}
          className="hero-wall-stroke"
        />
      ))}
      {[24, 64, 98, 136, 182, 206].map((x, index) => (
        <circle
          key={`wall-node-${index}`}
          cx={x}
          cy={52 + index * 52}
          r="2.5"
          className="hero-wall-node"
        />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();

  function scrollToSection(id: string) {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -64 });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="hero"
      className="hero-accessible section-shell relative overflow-hidden px-6"
      aria-labelledby="hero-title"
    >
      <div className="hero-blueprint-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgb(148_163_184_/_0.24),transparent_60%)]" />

      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[56vh] w-[min(24vw,280px)] -translate-y-1/2 md:block">
        <NeuralWall />
      </div>
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[56vh] w-[min(24vw,280px)] -translate-y-1/2 md:block">
        <NeuralWall mirrored />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.22em] text-accent">
            AI Systems Engineer
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl"
          >
            Layth Ayache
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Technical consultant designing production AI systems, automation
            workflows, and resilient infrastructure for telecom, finance, and
            healthcare teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              data-magnetic
              data-cursor-label="Enter Portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 font-mono text-sm uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
            >
              Enter Portfolio
              <ArrowDownRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              data-magnetic
              data-cursor-label="Contact"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-6 py-3 font-mono text-sm uppercase tracking-wider text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Start a Conversation
              <Mail size={15} />
            </button>
          </div>

          <p className="mt-6 text-base text-text-secondary">
            Based in Beirut, collaborating globally.
          </p>
        </motion.div>

        <motion.aside
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: reduced ? 0 : 0.08,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="hero-emblem-card rounded-2xl border border-border-strong bg-surface-raised/90 p-8 shadow-[0_16px_40px_rgb(15_23_42_/_0.1)]"
          aria-label="Profile summary"
        >
          <img
            src="/logo-mark.svg"
            alt="Layth Ayache emblem"
            width={1248}
            height={832}
            loading="eager"
            decoding="async"
            className="h-24 w-auto opacity-85 sm:h-28"
          />

          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Building systems that remain dependable under real constraints:
            unstable networks, limited datasets, and strict privacy boundaries.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-text-primary">
            <li className="rounded-md border border-border bg-surface px-3 py-2">
              Production AI pipelines and observability
            </li>
            <li className="rounded-md border border-border bg-surface px-3 py-2">
              Computer vision and multimodal inference
            </li>
            <li className="rounded-md border border-border bg-surface px-3 py-2">
              Infrastructure automation and consulting
            </li>
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
