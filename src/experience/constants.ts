/**
 * Timeline constants for experience orchestration
 * Refined for smooth, pixel-accurate animations
 */

export const TIMELINE = {
  // Choreography phases - optimized for smooth motion
  CHOREO_1_OUT: 1200,   // Reduced for snappier initial movement
  CHOREO_1_IN: 400,     // Quick fade
  CHOREO_2_OUT_SWAP: 1200,
  CHOREO_2_IN: 400,
  CHOREO_3_OUT: 1000,   // Shorter final phase
  
  // Settle animation - FLIP transition
  SETTLE: 900,          // Faster, punchier settle
  SETTLE_CROSSFADE: 200, // Last 200ms for crossfade
  SETTLE_SPIN_STOP: 800, // Stop spin at 800ms
  
  // Typewriter (45ms per char, "grow to love and love to grow" = 30 chars = ~1.35s)
  TYPEWRITER_CHAR_DELAY: 45,
  
  // Reveal steps - staggered cascade
  REVEAL_HEADER: 150,
  REVEAL_GLOBAL: 200,
  REVEAL_CTAS: 250,
  REVEAL_CONTENT: 400,
} as const;

