import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MOTION } from "@/motion/tokens";
import PortraitHero from "@/components/PortraitHero";
import { projects } from "@/content/projects";

const statusDot: Record<string, string> = {
  completed: "bg-emerald-600",
  ongoing: "bg-amber-600",
  paused: "bg-[#1A1A1A]/30",
  idea: "bg-sky-600",
};

/** Scroll distance (px) over which the emblem transitions to the navbar. */
const SCROLL_END = 400;

/** Navbar dimensions matching Navbar.tsx layout. */
const NAV_H = 64;
const LOGO_H = 32; // h-8
const LOGO_W = Math.round(LOGO_H * (1248 / 832)); // ~48px, preserves SVG aspect
const NAV_Y = (NAV_H - LOGO_H) / 2; // 16px — vertically centered in navbar

export default function Home() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const { hysteresis } = MOTION;

  // Viewport + computed positions, recomputed on resize.
  const [dims, setDims] = useState(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight : 768;
    const containerW = Math.min(vw, 1024); // max-w-5xl
    const containerLeft = (vw - containerW) / 2;
    const initialW = Math.min(vw * 1.02, 1080);

    return {
      vw,
      vh,
      containerW,
      startScale: initialW / LOGO_W,
      navLeft: containerLeft + 24, // px-6
    };
  });

  useLayoutEffect(() => {
    function compute() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const containerW = Math.min(vw, 1024);
      const containerLeft = (vw - containerW) / 2;
      const initialW = Math.min(vw * 1.02, 1080);

      setDims({
        vw,
        vh,
        containerW,
        startScale: initialW / LOGO_W,
        navLeft: containerLeft + 24,
      });
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Scroll-driven transforms. Y includes scroll compensation so the emblem
  // appears viewport-fixed even though it's absolutely positioned in the page.
  const emblemX = useTransform(scrollY, (s) => {
    const t = Math.min(s / SCROLL_END, 1);
    const startX = dims.vw / 2 - LOGO_W / 2;
    return startX + (dims.navLeft - startX) * t;
  });

  const emblemY = useTransform(scrollY, (s) => {
    const t = Math.min(s / SCROLL_END, 1);
    const startVY = dims.vh / 2 - LOGO_H / 2;
    const viewportY = startVY + (NAV_Y - startVY) * t;
    return viewportY + s; // counter-scroll to stay viewport-fixed
  });

  const emblemScale = useTransform(scrollY, (s) => {
    const t = Math.min(s / SCROLL_END, 1);
    return dims.startScale + (1 - dims.startScale) * t;
  });

  const emblemOpacity = useTransform(scrollY, (s) => {
    const t = Math.min(s / SCROLL_END, 1);
    return hysteresis.opacityLight + (0.7 - hysteresis.opacityLight) * t;
  });

  // Name scroll-out: fade + slide off-screen over first 250px of scroll.
  const NAME_EXIT = 250;
  const nameOpacity = useTransform(scrollY, [0, NAME_EXIT], [1, 0]);
  const laythX = useTransform(scrollY, (s) => {
    const t = Math.min(s / NAME_EXIT, 1);
    // Use the bounded container width (max 1024) and clamp the maximum
    // horizontal shift so resizing doesn't fling the text unpredictably.
    const maxShift = Math.min(dims.containerW * 0.5, 480);
    return -t * maxShift;
  });
  const ayacheX = useTransform(scrollY, (s) => {
    const t = Math.min(s / NAME_EXIT, 1);
    const maxShift = Math.min(dims.containerW * 0.5, 480);
    return t * maxShift;
  });

  return (
    <div className="relative -mt-16 flex min-h-screen flex-col overflow-x-hidden bg-[#F2EDE8]">
      {/* Layer 1: static grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
      />

      {/* Hysteresis emblem — z-[5], behind portrait (z-10), above background.
          Starts huge & centered behind face, scroll-drives to navbar logo slot.
          Wrapper handles entrance fade; img handles scroll-driven transforms. */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: hysteresis.delay,
            duration: hysteresis.duration,
          }}
        >
          <motion.img
            src="/logo-mark.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-0 top-0"
            style={{
              width: LOGO_W,
              height: LOGO_H,
              x: emblemX,
              y: emblemY,
              scale: emblemScale,
              opacity: emblemOpacity,
              transformOrigin: "center center",
            }}
          />
        </motion.div>
      )}

      {/* Navbar clearance */}
      <div className="h-16 shrink-0" aria-hidden="true" />

      {/* ── Centered composition (first viewport) ── */}
      <div className="relative flex h-[calc(100vh-4rem)] items-center justify-center px-6">
        {/* Portrait (centered anchor) */}
        <PortraitHero />

        {/* LAYTH — desktop/tablet: left of portrait, slightly above center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden -translate-x-[clamp(10rem,35vw,42rem)] -translate-y-[clamp(5rem,14vh,10rem)] md:block">
          <motion.p
            style={{ x: laythX, opacity: nameOpacity }}
            className="font-display text-4xl uppercase tracking-tight text-[#1A1A1A] lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            LAYTH
          </motion.p>
        </div>

        {/* AYACHE — desktop/tablet: right of portrait, slightly below center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden translate-x-[clamp(3rem,11vw,9rem)] translate-y-[clamp(2rem,6vh,5rem)] md:block">
          <motion.p
            style={{ x: ayacheX, opacity: nameOpacity }}
            className="font-display text-4xl uppercase tracking-tight text-[#1A1A1A] lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            AYACHE
          </motion.p>
        </div>

        {/* Mobile (< md): stacked names */}
        <div className="absolute inset-x-0 top-6 z-50 px-6 md:hidden">
          <motion.p
            style={{ x: laythX, opacity: nameOpacity }}
            className="text-left font-display text-4xl uppercase tracking-tight text-[#1A1A1A] sm:text-5xl"
          >
            LAYTH
          </motion.p>
        </div>
        <div className="absolute inset-x-0 bottom-6 z-50 px-6 md:hidden">
          <motion.p
            style={{ x: ayacheX, opacity: nameOpacity }}
            className="text-right font-display text-4xl uppercase tracking-tight text-[#1A1A1A] sm:text-5xl"
          >
            AYACHE
          </motion.p>
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/50">
              Vision
            </h2>
            <div className="flex flex-col gap-4 font-sans text-lg leading-relaxed text-[#1A1A1A]/80 md:text-xl">
              <p>I want to build in public.</p>
              <p>
                Not to perform expertise, but to expose how systems actually
                behave when you touch them.
              </p>
              <p>
                Most things look coherent from the outside. They break only
                when you try to use them.
              </p>
              <p>
                My vision is a public space where work is shown before it's
                clean, where assumptions are questioned early, and where
                failure is documented instead of hidden. A place that treats
                complexity seriously and doesn't confuse confidence with
                correctness.
              </p>
              <p>
                Over time, this should grow into something larger than me: a
                shared surface where people who care about systems —
                technical, social, institutional — can think together without
                pretending the answers are easy.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/50">
              Mission
            </h2>
            <div className="flex flex-col gap-4 font-sans text-lg leading-relaxed text-[#1A1A1A]/80 md:text-xl">
              <p>
                My work is to understand broken systems by engaging with them
                directly.
              </p>
              <p>
                I don't start with opinions. I start with constraints. I try
                things, I document what happens, I say what worked, what
                didn't, and what I still don't understand.
              </p>
              <p>This site exists to:</p>
              <ul className="flex flex-col gap-1 pl-5">
                <li className="list-disc">make my thinking legible</li>
                <li className="list-disc">
                  invite challenge rather than agreement
                </li>
                <li className="list-disc">
                  leave traces that others can build on or argue against
                </li>
              </ul>
              <p>
                I'm not here to convince. I'm here to work honestly, in
                public, and accept the consequences of being wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-24 md:pb-32">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-sans text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
            Projects
          </h2>
          <Link
            to="/explore"
            className="group flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 transition-colors hover:text-[#1A1A1A]"
          >
            View all
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group flex flex-col gap-3 border border-[#1A1A1A]/10 bg-[#F2EDE8] p-5 transition-colors hover:border-[#1A1A1A]/25 hover:bg-[#EBE5DE]"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-sans text-base font-semibold text-[#1A1A1A]">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-[#1A1A1A]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1A1A1A]/60"
                />
              </div>
              <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
                {project.summary}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[project.status] ?? "bg-[#1A1A1A]/30"}`}
                  />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/40">
                    {project.status}
                  </span>
                </span>
                <span className="text-[#1A1A1A]/20">&middot;</span>
                <span className="font-mono text-xs text-[#1A1A1A]/40">
                  {project.system}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
