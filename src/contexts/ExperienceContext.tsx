"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ExperiencePhase = "boot" | "loader" | "typing" | "reveal" | "ready";

interface ExperienceContextType {
  phase: ExperiencePhase;
  replayToken: number;
  startReplay: () => void;
  setPhase: (phase: ExperiencePhase) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<ExperiencePhase>("boot");
  const [replayToken, setReplayToken] = useState(0);

  const startReplay = useCallback(() => {
    // Clear session storage to force loader replay
    sessionStorage.removeItem("hasSeenLoader");
    // Reset phase to boot/loader
    setPhase("loader");
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

