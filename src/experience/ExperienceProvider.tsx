"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ExperiencePhase =
  | "BOOT"
  | "CHOREO_1_OUT"
  | "CHOREO_1_IN"
  | "CHOREO_2_OUT_SWAP"
  | "CHOREO_2_IN"
  | "CHOREO_3_OUT"
  | "SETTLE"
  | "TYPE"
  | "REVEAL"
  | "READY";

interface ExperienceContextType {
  phase: ExperiencePhase;
  replayToken: number;
  startReplay: () => void;
  setPhase: (phase: ExperiencePhase) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<ExperiencePhase>("BOOT");
  const [replayToken, setReplayToken] = useState(0);

  const startReplay = useCallback(() => {
    // Reset phase to BOOT
    setPhase("BOOT");
    // Increment replay token to trigger re-renders
    setReplayToken((prev) => prev + 1);
  }, []);

  return (
    <ExperienceContext.Provider value={{ phase, replayToken, startReplay, setPhase }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
}

