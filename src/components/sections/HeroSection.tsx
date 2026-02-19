import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useLenis } from "@/motion/LenisProvider";

function NeuralCanvas() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-full w-full"
      role="img"
      aria-label="Abstract neural network inspired system diagram"
    >
      <defs>
        <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(7 108 100 / 0.75)" />
          <stop offset="100%" stopColor="rgb(10 19 38 / 0.95)" />
        </linearGradient>
      </defs>

      {[
        "M50 62 L170 98 L282 74 L422 116",
        "M50 126 L176 152 L302 132 L442 168",
        "M46 194 L166 214 L290 196 L430 232",
        "M62 252 L190 248 L304 258 L432 270",
      ].map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="url(#hero-line)"
          strokeOpacity="0.85"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {[50, 170, 282, 422].map((x) =>
        [62, 126, 194, 252].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="5.5"
            fill="white"
            stroke="rgb(7 108 100 / 0.7)"
            strokeWidth="2"
          />
        ))
      )}
    </svg>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();

  function scrollToSection(id: string) {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -84 });
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
      className="hero-accessible section-shell relative overflow-hidden px-6 pb-20 pt-10 md:pt-14"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(7_108_100_/_0.13),transparent_45%),radial-gradient(circle_at_15%_25%,rgb(15_23_42_/_0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_96%,rgb(184_201_214_/_0.26)_100%),linear-gradient(90deg,transparent_96%,rgb(184_201_214_/_0.2)_100%)] bg-[size:38px_38px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="type-kicker">AI Systems Engineer · Beirut</p>
          <h1 id="hero-title" className="type-h1 mt-5 max-w-4xl">
            I build production AI systems that hold up under real constraints.
          </h1>
          <p className="type-body mt-6 max-w-2xl">
            Layth Ayache designs and ships AI infrastructure, computer vision
            pipelines, and workflow automation across telecom, finance, and
            healthcare teams.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              data-magnetic
              data-cursor-label="View Work"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              View Work
              <ArrowRight size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              data-magnetic
              data-cursor-label="Contact"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Start a Conversation
              <MessageCircle size={16} aria-hidden />
            </button>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              AI consulting and architecture
            </li>
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              Computer vision systems
            </li>
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              Resilient infrastructure automation
            </li>
          </ul>
        </motion.div>

        <motion.aside
          initial={reduced ? undefined : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: reduced ? 0 : 0.08,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="rounded-2xl border border-border-strong bg-surface-raised/95 p-6 shadow-[0_18px_40px_rgb(10_19_38_/_0.12)]"
          aria-label="AI systems approach summary"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-accent">
            <Sparkles size={14} aria-hidden />
            Blueprint mindset
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface p-2">
            <div className="aspect-[16/10] w-full">
              <NeuralCanvas />
            </div>
          </div>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">
            From data collection to deployment, every decision is optimized for
            reliability, accessibility, and measurable user impact.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
