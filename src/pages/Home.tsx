import { useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MOTION } from "@/motion/tokens";
import PortraitHero from "@/components/PortraitHero";

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
    return -t * dims.vw * 0.5;
  });
  const ayacheX = useTransform(scrollY, (s) => {
    const t = Math.min(s / NAME_EXIT, 1);
    return t * dims.vw * 0.5;
  });

  return (
    <div className="relative -mt-16 flex min-h-[200vh] flex-col overflow-x-hidden bg-[#F2EDE8]">
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden -translate-x-[clamp(12rem,35vw,32rem)] -translate-y-[clamp(2rem,6vh,5rem)] md:block">
          <motion.p
            style={{ x: laythX, opacity: nameOpacity }}
            className="font-sans text-4xl font-bold uppercase tracking-tight text-[#1A1A1A] lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            LAYTH
          </motion.p>
        </div>

        {/* AYACHE — desktop/tablet: right of portrait, slightly below center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden translate-x-[clamp(4rem,12vw,11rem)] translate-y-[clamp(2rem,6vh,5rem)] md:block">
          <motion.p
            style={{ x: ayacheX, opacity: nameOpacity }}
            className="font-sans text-4xl font-bold uppercase tracking-tight text-[#1A1A1A] lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            AYACHE
          </motion.p>
        </div>

        {/* Mobile (< md): stacked names */}
        <div className="absolute inset-x-0 top-6 z-50 px-6 md:hidden">
          <motion.p
            style={{ x: laythX, opacity: nameOpacity }}
            className="text-left font-sans text-4xl font-bold uppercase tracking-tight text-[#1A1A1A] sm:text-5xl"
          >
            LAYTH
          </motion.p>
        </div>
        <div className="absolute inset-x-0 bottom-6 z-50 px-6 md:hidden">
          <motion.p
            style={{ x: ayacheX, opacity: nameOpacity }}
            className="text-right font-sans text-4xl font-bold uppercase tracking-tight text-[#1A1A1A] sm:text-5xl"
          >
            AYACHE
          </motion.p>
        </div>
      </div>
    </div>
  );
}
