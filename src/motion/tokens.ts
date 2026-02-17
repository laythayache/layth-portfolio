/**
 * Shared section-level motion patterns.
 * All sections import these for consistent choreography.
 */
export const SECTION = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  viewport: { once: true, margin: "-60px" } as const,
  container: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  cardHover: {
    y: -3,
    boxShadow: "0 14px 28px rgb(15 23 42 / 0.1)",
    borderColor: "rgb(var(--accent) / 0.22)",
  },
};

export const MOTION = {
  route: {
    duration: 0.4,
    easeOut: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    easeIn: [0.4, 0.0, 1, 1] as [number, number, number, number],
    yEnter: 8,
    yExit: -6,
  },
  portrait: {
    duration: 0.5,
    y: 10,
  },
  hysteresis: {
    delay: 0.12,
    duration: 0.32,
    lagMs: 120,
    opacityLight: 0.12,
    opacityDark: 0.1,
    nudgePx: 4,
    rotateDeg: 1.2,
    opacityBump: 0.02,
  },
  homepage: {
    hero: {
      headlineY: -36,
      headlineScale: 0.965,
      clusterY: -14,
      backgroundScrollDrift: 22,
      ringScrollDrift: 18,
      transitionEase: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    timeline: {
      revealBaseDelay: 0.06,
      revealStagger: 0.07,
      lineSpring: {
        stiffness: 135,
        damping: 28,
        mass: 0.42,
      },
      cardHoverY: -4,
      cardTapScale: 0.975,
    },
    projects: {
      featuredHoverY: -5,
      cardHoverY: -4,
      cardTapScale: 0.975,
      arrowNudge: 5,
      transitionEase: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};
