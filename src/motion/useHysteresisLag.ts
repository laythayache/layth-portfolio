import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { MOTION } from "./tokens";

/**
 * Accepts a boolean trigger and returns a lagged `active` state.
 * The lag (default 120 ms) mirrors the hysteresis concept —
 * the system responds after the input, not with it.
 */
export function useHysteresisLag(trigger: boolean): boolean {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (reduced) {
      setActive(false);
      return;
    }

    if (trigger) {
      timeoutRef.current = setTimeout(
        () => setActive(true),
        MOTION.hysteresis.lagMs,
      );
    } else {
      setActive(false);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [trigger, reduced]);

  return active;
}
