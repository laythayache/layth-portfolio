export const MOTION = {
  route: {
    duration: 0.28,
    easeOut: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    easeIn: [0.4, 0.0, 1, 1] as [number, number, number, number],
    yEnter: 8,
    yExit: -6,
  },
  portrait: {
    duration: 0.28,
    y: 10,
  },
  hysteresis: {
    delay: 0.12,
    duration: 0.32,
    lagMs: 120,
    opacityLight: 0.18,
    opacityDark: 0.1,
    nudgePx: 4,
    rotateDeg: 1.2,
    opacityBump: 0.02,
  },
};
