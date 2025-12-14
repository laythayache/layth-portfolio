"use client";

import { useState, useEffect } from "react";
import { getReducedMotion, setReducedMotion as setPref } from "./landingPrefs";

export function useReducedMotionGate() {
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Check media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaMatches = mediaQuery.matches;

    // Check localStorage
    const storageValue = getReducedMotion();

    // Reduced motion if EITHER is true
    const shouldReduce = mediaMatches || storageValue;

    setReducedMotionState(shouldReduce);
    setReady(true);

    // Listen for changes to media query
    const handleChange = (e: MediaQueryListEvent) => {
      const newValue = e.matches || getReducedMotion();
      setReducedMotionState(newValue);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const setReducedMotion = (value: boolean) => {
    setPref(value);
    // Recompute: media query OR new localStorage value
    if (typeof window !== "undefined") {
      const mediaMatches = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReducedMotionState(mediaMatches || value);
    }
  };

  return {
    reducedMotion,
    setReducedMotion,
    ready,
  };
}
