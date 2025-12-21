export const brandColors = {
  slate: "#6b7280",
  ink: "#2b2e34",
  bg: "#ede7dd",
} as const;

export const emblem = {
  strokeWidth: 10,
  dasharray: "70 24 70 24",
  rotateDeg: 20,
  radius: 34, // radius for circle (cx=50, cy=50, r=34 gives good visual balance)
} as const;

export const timings = {
  bootMs: 200,
  loadingMs: 1100,
  revealMs: 550,
  hoverEase: [0.4, 0, 0.2, 1] as [number, number, number, number],
  hoverDuration: 0.6,
  restartDelay: 100,
} as const;

export const sizes = {
  emblem: {
    mobile: 28,
    tablet: 36,
    desktop: 44,
  },
  wordmark: {
    mobile: {
      first: "text-2xl",
      last: "text-sm",
    },
    desktop: {
      first: "text-4xl",
      last: "text-lg",
    },
  },
} as const;
