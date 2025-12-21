"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { timings } from "@/brand/tokens";

type BrandState = "boot" | "loading" | "reveal" | "idle" | "restarting";

interface BrandSequenceContextType {
  state: BrandState;
  start: () => void;
  restart: () => void;
}

const BrandSequenceContext = createContext<BrandSequenceContextType | undefined>(undefined);

export function BrandSequenceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BrandState>("boot");
  const [hasStarted, setHasStarted] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const adjustedTimings = {
    boot: prefersReducedMotion ? 50 : timings.bootMs,
    loading: prefersReducedMotion ? 200 : timings.loadingMs,
    reveal: prefersReducedMotion ? 100 : timings.revealMs,
  };

  const start = useCallback(() => {
    setState("boot");
    setHasStarted(true);

    const t1 = setTimeout(() => setState("loading"), adjustedTimings.boot);
    const t2 = setTimeout(
      () => setState("reveal"),
      adjustedTimings.boot + adjustedTimings.loading
    );
    const t3 = setTimeout(
      () => setState("idle"),
      adjustedTimings.boot + adjustedTimings.loading + adjustedTimings.reveal
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [adjustedTimings]);

  const restart = useCallback(() => {
    if (state !== "idle") return;

    setState("restarting");
    
    // Navigate to home first
    router.push("/");
    
    // Then start the sequence after a brief delay
    const timeoutId = setTimeout(() => {
      setState("boot");
      const t1 = setTimeout(() => setState("loading"), adjustedTimings.boot);
      const t2 = setTimeout(
        () => setState("reveal"),
        adjustedTimings.boot + adjustedTimings.loading
      );
      const t3 = setTimeout(
        () => setState("idle"),
        adjustedTimings.boot + adjustedTimings.loading + adjustedTimings.reveal
      );

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, timings.restartDelay);

    return () => clearTimeout(timeoutId);
  }, [state, router, adjustedTimings]);

  useEffect(() => {
    if (!hasStarted) {
      start();
    }
  }, [hasStarted, start]);

  return (
    <BrandSequenceContext.Provider value={{ state, start, restart }}>
      {children}
    </BrandSequenceContext.Provider>
  );
}

export function useBrandSequence() {
  const context = useContext(BrandSequenceContext);
  if (context === undefined) {
    throw new Error("useBrandSequence must be used within a BrandSequenceProvider");
  }
  return context;
}
