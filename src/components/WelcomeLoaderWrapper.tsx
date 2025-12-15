"use client";

import { useEffect, useState } from "react";
import WelcomeLoader from "./WelcomeLoader";
import { useExperience } from "@/contexts/ExperienceContext";

export default function WelcomeLoaderWrapper() {
  const { phase, replayToken, setPhase } = useExperience();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // When replay starts, reset loader state
    if (phase === "loader" || phase === "boot") {
      setShowLoader(true);
      document.body.classList.remove("loader-complete");
    }
  }, [replayToken, phase]);

  useEffect(() => {
    // Check if loader has been seen before (only on initial mount, not on replay)
    if (phase === "boot") {
      const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
      if (hasSeenLoader) {
        setShowLoader(false);
        setPhase("ready");
        // Trigger reveals immediately if loader was skipped
        setTimeout(() => {
          document.body.classList.add("loader-complete");
        }, 100);
      } else {
        setPhase("loader");
      }
    }
  }, []); // Only run on mount

  const handleLoaderComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
    // Mark body as ready for reveals
    document.body.classList.add("loader-complete");
    // Transition to typing phase
    setPhase("typing");
    // Keep loader visible during settle, then hide
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  };


  // Show loader during loader phase
  if (!showLoader || (phase !== "loader" && phase !== "boot")) {
    return null;
  }

  return <WelcomeLoader onComplete={handleLoaderComplete} replayToken={replayToken} />;
}

