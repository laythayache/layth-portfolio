/**
 * Timeline constants for experience orchestration
 */

export const TIMELINE = {
  // Choreography phases (total ~6-8s)
  CHOREO_1_OUT: 1400,
  CHOREO_1_IN: 900,
  CHOREO_2_OUT_SWAP: 1400,
  CHOREO_2_IN: 900,
  CHOREO_3_OUT: 1400,
  
  // Settle animation
  SETTLE: 1100,
  
  // Typewriter (35-55ms per char, "grow to love and love to grow" = 30 chars)
  TYPEWRITER_CHAR_DELAY: 45,
  
  // Reveal steps
  REVEAL_HEADER: 200,
  REVEAL_GLOBAL: 250,
  REVEAL_CTAS: 300,
  REVEAL_CONTENT: 450,
} as const;

