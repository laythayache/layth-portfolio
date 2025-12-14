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
