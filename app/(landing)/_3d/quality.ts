// Adaptive Quality Manager
// Detects low-power conditions and provides quality profile for 3D rendering

export type QualityProfile = "full" | "safe";

interface QualityDetection {
  reducedMotion: boolean;
  lowMemory: boolean;
  lowConcurrency: boolean;
  lowFramerate: boolean;
}

let qualityProfileCache: QualityProfile | null = null;
let detectionComplete = false;

/**
 * Detects quality profile based on device capabilities and user preferences.
 * Only runs once per session (cached after first call).
 */
export function getQualityProfile(): QualityProfile {
  if (qualityProfileCache !== null) {
    return qualityProfileCache;
  }

  if (typeof window === "undefined") {
    return "full"; // SSR fallback
  }

  const detection: QualityDetection = {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    lowMemory: false,
    lowConcurrency: false,
    lowFramerate: false,
  };

  // Check device memory (if available)
  const nav = window.navigator as any;
  if (nav.deviceMemory !== undefined) {
    detection.lowMemory = nav.deviceMemory < 4; // Less than 4GB
  }

  // Check hardware concurrency
  if (navigator.hardwareConcurrency !== undefined) {
    detection.lowConcurrency = navigator.hardwareConcurrency < 4; // Less than 4 cores
  }

  // Low-power if ANY condition is true
  const isLowPower = detection.reducedMotion || detection.lowMemory || detection.lowConcurrency;

  qualityProfileCache = isLowPower ? "safe" : "full";
  detectionComplete = true;

  return qualityProfileCache;
}

/**
 * Returns Canvas DPR (device pixel ratio) based on quality profile.
 * Safe mode clamps to 1.0 for performance.
 */
export function getCanvasDpr(profile: QualityProfile): number {
  if (typeof window === "undefined") {
    return 1;
  }
  if (profile === "safe") {
    return 1.0;
  }
  return Math.min(window.devicePixelRatio || 1, 2.0); // Cap at 2x for performance
}

/**
 * Applies quality profile to RuptureOverlay shader uniforms.
 * Returns modified uniform values for reduced quality.
 */
export function applyQualityToRuptureUniforms(
  profile: QualityProfile,
  baseUniforms: {
    uProgress: number;
    uTime: number;
    uCenter: [number, number];
    uTint: [number, number, number] | number[];
    uAspect: number;
  }
): {
  uProgress: number;
  uTime: number;
  uCenter: [number, number];
  uTint: [number, number, number];
  uAspect: number;
  // Quality multipliers
  uGrainAmount: number;
  uChromaAmount: number;
  uVignetteAmount: number;
} {
  const qualityMultiplier = profile === "safe" ? 0.3 : 1.0;
  
  // Ensure uTint is a tuple
  const tint: [number, number, number] = Array.isArray(baseUniforms.uTint) && baseUniforms.uTint.length === 3
    ? [baseUniforms.uTint[0], baseUniforms.uTint[1], baseUniforms.uTint[2]]
    : [0, 0, 0];

  return {
    uProgress: baseUniforms.uProgress,
    uTime: baseUniforms.uTime,
    uCenter: baseUniforms.uCenter,
    uTint: tint,
    uAspect: baseUniforms.uAspect,
    uGrainAmount: 0.08 * qualityMultiplier,
    uChromaAmount: 0.02 * qualityMultiplier,
    uVignetteAmount: 1.2 * qualityMultiplier,
  };
}

/**
 * Resets quality profile cache (for testing only).
 * In production, quality is determined once per session.
 */
export function resetQualityCache(): void {
  qualityProfileCache = null;
  detectionComplete = false;
}

/**
 * Dynamic Resolution Scaling (DRS)
 * Adapts DPR based on runtime frame time performance.
 */
interface DRSState {
  currentDpr: number;
  frameTimeHistory: number[];
  lastAdjustmentTime: number;
  consecutiveGoodFrames: number;
  consecutiveBadFrames: number;
}

let drsState: DRSState | null = null;

const DRS_FRAME_HISTORY_SIZE = 60; // 1 second at 60fps
const DRS_TARGET_FRAME_TIME = 16.67; // 60fps
const DRS_BAD_THRESHOLD = 20; // ms (50fps)
const DRS_GOOD_THRESHOLD = 14; // ms (71fps)
const DRS_ADJUSTMENT_COOLDOWN = 1000; // ms (wait 1s between adjustments)
const DRS_CONSECUTIVE_FRAMES_REQUIRED = 30; // frames

/**
 * Updates DRS state with current frame time and returns adaptive DPR.
 * Call this from useFrame or similar animation loop.
 */
export function updateDRS(frameTime: number): number {
  if (typeof window === "undefined") {
    return 1.0;
  }

  if (!drsState) {
    const baseProfile = getQualityProfile();
    const baseDpr = getCanvasDpr(baseProfile);
    drsState = {
      currentDpr: baseDpr,
      frameTimeHistory: [],
      lastAdjustmentTime: performance.now(),
      consecutiveGoodFrames: 0,
      consecutiveBadFrames: 0,
    };
  }

  const now = performance.now();
  const state = drsState;

  // Add frame time to history
  state.frameTimeHistory.push(frameTime);
  if (state.frameTimeHistory.length > DRS_FRAME_HISTORY_SIZE) {
    state.frameTimeHistory.shift();
  }

  // Calculate average frame time
  const avgFrameTime =
    state.frameTimeHistory.reduce((a, b) => a + b, 0) / state.frameTimeHistory.length;

  // Check if we should adjust (only if history is full and cooldown passed)
  if (
    state.frameTimeHistory.length === DRS_FRAME_HISTORY_SIZE &&
    now - state.lastAdjustmentTime > DRS_ADJUSTMENT_COOLDOWN
  ) {
    if (avgFrameTime > DRS_BAD_THRESHOLD) {
      state.consecutiveBadFrames++;
      state.consecutiveGoodFrames = 0;

      // Lower DPR if consistently bad
      if (state.consecutiveBadFrames >= DRS_CONSECUTIVE_FRAMES_REQUIRED) {
        state.currentDpr = Math.max(1.0, state.currentDpr - 0.25);
        state.lastAdjustmentTime = now;
        state.consecutiveBadFrames = 0;
      }
    } else if (avgFrameTime < DRS_GOOD_THRESHOLD) {
      state.consecutiveGoodFrames++;
      state.consecutiveBadFrames = 0;

      // Raise DPR if consistently good (but cap at base profile max)
      if (state.consecutiveGoodFrames >= DRS_CONSECUTIVE_FRAMES_REQUIRED) {
        const baseProfile = getQualityProfile();
        const maxDpr = baseProfile === "safe" ? 1.0 : Math.min(window.devicePixelRatio || 1, 2.0);
        state.currentDpr = Math.min(maxDpr, state.currentDpr + 0.25);
        state.lastAdjustmentTime = now;
        state.consecutiveGoodFrames = 0;
      }
    } else {
      // Reset counters if in acceptable range
      state.consecutiveGoodFrames = 0;
      state.consecutiveBadFrames = 0;
    }
  }

  return state.currentDpr;
}

/**
 * Resets DRS state (for testing only).
 */
export function resetDRS(): void {
  drsState = null;
}
