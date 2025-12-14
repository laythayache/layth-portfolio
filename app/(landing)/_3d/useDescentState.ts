"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PillarId } from "./pillars";

export type DescentPhase = "idle" | "hover" | "commit" | "dive" | "hold";

export interface RuptureCenter {
  x: number; // NDC [-1..1]
  y: number; // NDC [-1..1]
}

interface DescentState {
  phase: DescentPhase;
  hoveredId: PillarId | null;
  selectedId: PillarId | null;
  ruptureCenter: RuptureCenter | null;
}

const COMMIT_DURATION = 140; // 140ms (snappy lock)
const DIVE_DURATION = 780; // 780ms (decisive pull)
const HOLD_FOV_SETTLE = 160; // 160ms (quick settle)

export function useDescentState() {
  const [state, setState] = useState<DescentState>({
    phase: "idle",
    hoveredId: null,
    selectedId: null,
    ruptureCenter: null,
  });

  const commitStartTimeRef = useRef<number | null>(null);
  const diveStartTimeRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  // Auto-advance from commit -> dive -> hold
  // Guards: Only transition if still in correct phase (prevents race conditions)
  useEffect(() => {
    if (state.phase === "commit" && commitStartTimeRef.current !== null) {
      const timer = setTimeout(() => {
        setState((prev) => {
          // Guard: Only transition if still in commit phase (prevents stale transitions)
          if (prev.phase === "commit" && commitStartTimeRef.current !== null) {
            diveStartTimeRef.current = Date.now();
            return { ...prev, phase: "dive" };
          }
          return prev;
        });
      }, COMMIT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [state.phase]);

  useEffect(() => {
    if (state.phase === "dive" && diveStartTimeRef.current !== null) {
      const timer = setTimeout(() => {
        setState((prev) => {
          // Guard: Only transition if still in dive phase (prevents stale transitions)
          if (prev.phase === "dive" && diveStartTimeRef.current !== null) {
            holdStartTimeRef.current = Date.now();
            return { ...prev, phase: "hold" };
          }
          return prev;
        });
      }, DIVE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [state.phase]);

  const setHovered = useCallback((id: PillarId | null) => {
    setState((prev) => {
      // During dive or hold, hoveredId must equal selectedId
      if (prev.phase === "dive" || prev.phase === "hold") {
        return { ...prev, hoveredId: prev.selectedId };
      }
      // During commit, lock hover to selected
      if (prev.phase === "commit") {
        return { ...prev, hoveredId: prev.selectedId };
      }
      return { ...prev, hoveredId: id, phase: id ? "hover" : "idle" };
    });
  }, []);

  const commitTo = useCallback((id: PillarId, center: RuptureCenter | null = null) => {
    setState((prev) => {
      // Only allow commit when idle or hover
      if (prev.phase !== "idle" && prev.phase !== "hover") {
        return prev;
      }
      commitStartTimeRef.current = Date.now();
      return {
        phase: "commit",
        hoveredId: id,
        selectedId: id,
        ruptureCenter: center,
      };
    });
  }, []);

  const reset = useCallback(() => {
    commitStartTimeRef.current = null;
    diveStartTimeRef.current = null;
    holdStartTimeRef.current = null;
    setState({
      phase: "idle",
      hoveredId: null,
      selectedId: null,
      ruptureCenter: null,
    });
  }, []);

  const getDiveProgress = useCallback((): number => {
    if (diveStartTimeRef.current === null) return 0;
    const elapsed = Date.now() - diveStartTimeRef.current;
    return Math.min(elapsed / DIVE_DURATION, 1);
  }, []);

  const getHoldProgress = useCallback((): number => {
    if (holdStartTimeRef.current === null) return 0;
    const elapsed = Date.now() - holdStartTimeRef.current;
    return Math.min(elapsed / HOLD_FOV_SETTLE, 1);
  }, []);

  return {
    phase: state.phase,
    hoveredId: state.hoveredId,
    selectedId: state.selectedId,
    ruptureCenter: state.ruptureCenter,
    setHovered,
    commitTo,
    reset,
    getDiveProgress,
    getHoldProgress,
  };
}
