import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, HelpCircle, CheckCircle } from "lucide-react";
import { MOTION } from "@/motion/tokens";
import PortraitHero from "@/components/PortraitHero";
import SystemCard from "@/components/SystemCard";
import SystemsSnapshot from "@/components/SystemsSnapshot";
import TechStackVisualization from "@/components/TechStackVisualization";
import ScaleMetrics from "@/components/ScaleMetrics";
import DecisionMatrix from "@/components/DecisionMatrix";
import GrainOverlay from "@/components/GrainOverlay";
import { projects, getProjectBySlug } from "@/content/projects";

/** Scroll distance (px) over which the emblem transitions to the navbar. */
const SCROLL_END = 400;

/** Navbar dimensions matching Navbar.tsx layout. */
const NAV_H = 64;
const LOGO_H = 32; // h-8
const LOGO_W = Math.round(LOGO_H * (1248 / 832)); // ~48px, preserves SVG aspect
const NAV_Y = (NAV_H - LOGO_H) / 2; // 16px — vertically centered in navbar

// Get selected systems: flagship + OmniSign
const selectedSystems = [
  getProjectBySlug("public-information-infrastructure"),
  getProjectBySlug("omnisign"),
].filter((p) => p !== undefined) as typeof projects;

const principles = [
  {
    title: "Reliability under uncertainty",
    description: "Systems fail. Plan for degradation, graceful fallbacks.",
  },
  {
    title: "Clear interfaces",
    description: "Boundaries between humans and systems explicit and obvious.",
  },
  {
    title: "Auditability by design",
    description: "Every state change traceable: what, when, why, who.",
  },
  {
    title: "Performance as constraint",
    description: "Latency and throughput are architecture decisions.",
  },
  {
    title: "Security as architecture",
    description: "Vulnerabilities fixed structurally, not patched.",
  },
];

const collaborations = [
  {
    title: "Public Information Infrastructure",
    description:
      "Technical Architect & Lead Engineer. Building distributed scraping framework, change detection architecture, normalization pipeline, API layer for media tracking.",
  },
  {
    title: "OmniSign",
    description:
      "Federated Learning Architect (team of 6). Designed privacy-first sign language translation system: 89% alphabet accuracy, on-device inference, federated learning across distributed nodes.",
  },
];

export default function Home() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const { hysteresis } = MOTION;
  const [showExplainer, setShowExplainer] = useState(false);

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
      <GrainOverlay />

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
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden -translate-x-[clamp(16rem,38vw,42rem)] -translate-y-[clamp(5rem,14vh,10rem)] md:block">
          <motion.p
            style={{ x: laythX, opacity: nameOpacity }}
            className="font-display text-4xl uppercase tracking-tight text-[#1A1A1A] lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            LAYTH
          </motion.p>
        </div>

        {/* AYACHE — desktop/tablet: right of portrait, slightly below center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden translate-x-[clamp(8rem,20vw,24rem)] translate-y-[clamp(2rem,6vh,5rem)] md:block">
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

      {/* ── Role Statement ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="mb-16 flex flex-col gap-6 border-b border-[#1A1A1A]/10 pb-8">
          <div>
            <h1 className="font-sans text-4xl font-semibold text-[#1A1A1A] mb-4">
              I architect serious systems.
            </h1>
            <p className="text-xl leading-relaxed text-[#1A1A1A]/80 max-w-2xl mb-2">
              Production-grade infrastructure that turns unstable environments into rational operating structures.
            </p>
            <p className="text-base text-[#1A1A1A]/60 max-w-2xl mb-4">
              Data, infrastructure, and automation — built to survive messy reality. Proof over hype. Clarity over noise.
            </p>

            {/* Inline explainer */}
            <button
              onClick={() => setShowExplainer(!showExplainer)}
              className="inline-flex items-center gap-1 text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60 transition-colors"
            >
              <HelpCircle size={14} />
              What does this mean?
            </button>
            {showExplainer && (
              <div className="mt-3 text-sm bg-[#EBE5DE] border-l-2 border-[#1A1A1A]/20 p-3 max-w-2xl">
                <p className="text-[#1A1A1A]/70">
                  Systems that track what news outlets publish and when content changes. Infrastructure
                  for change detection, data normalization, and structured API access to information
                  that matters. Built for reliability under real-world constraints.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/systems"
              className="inline-flex items-center gap-2 rounded border border-[#1A1A1A] bg-[#1A1A1A] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#F2EDE8] transition-colors hover:bg-[#1A1A1A]/80"
            >
              Explore Systems
              <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded border border-[#1A1A1A]/20 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/70 transition-colors hover:border-[#1A1A1A]/40 hover:text-[#1A1A1A]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── Proof Strip ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[
            "Shipped production systems",
            "Security + reliability hardening",
            "Data pipelines + analytics",
            "Distributed systems architecture",
            "Real-world constraints",
          ].map((chip) => (
            <div
              key={chip}
              className="flex items-center gap-2 rounded-full border border-[#1A1A1A]/10 bg-[#F2EDE8] px-4 py-2"
            >
              <CheckCircle size={14} className="text-[#1A1A1A]/40 shrink-0" />
              <span className="font-mono text-xs text-[#1A1A1A]/60 whitespace-nowrap">
                {chip}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scale & Metrics ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          Scale & Impact
        </h2>
        <ScaleMetrics />
      </section>

      {/* ── Selected Systems ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          Selected Systems
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {selectedSystems.map((project) => (
            <SystemCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── Architecture Snapshot ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          How Systems Connect
        </h2>
        <div className="border border-[#1A1A1A]/10 p-8 bg-[#FEFDFB] rounded">
          <SystemsSnapshot />
        </div>
        <p className="mt-4 text-xs text-[#1A1A1A]/50 font-mono">
          Data flows left-to-right: from collection through processing to access layers. Each system emphasizes reliability, change tracking, and auditability.
        </p>
      </section>

      {/* ── Technical Stack ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          Technical Foundation
        </h2>
        <TechStackVisualization />
      </section>

      {/* ── Operating Principles ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          What I Optimize
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="flex flex-col gap-2">
              <h3 className="font-sans text-sm font-semibold text-[#1A1A1A]">
                {principle.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Decision Rationale ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          How I Think About Trade-offs
        </h2>
        <DecisionMatrix />
      </section>

      {/* ── Collaborations ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
          Collaborations
        </h2>
        <div className="grid gap-6 md:grid-cols-1">
          {collaborations.map((collab) => (
            <div
              key={collab.title}
              className="border border-[#1A1A1A]/10 p-6"
            >
              <h3 className="font-sans text-lg font-semibold text-[#1A1A1A] mb-2">
                {collab.title}
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                {collab.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
