"use client";

import { useEffect, useState } from "react";
import WelcomeLoader from "./WelcomeLoader";

export default function WelcomeLoaderWrapper() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check if loader has been seen before
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setShowLoader(false);
      // Trigger reveals immediately if loader was skipped
      setTimeout(() => {
        document.body.classList.add("loader-complete");
      }, 100);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
    // Mark body as ready for reveals
    document.body.classList.add("loader-complete");
    // Keep loader visible during settle, then hide
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  };

  if (!showLoader) {
    return null;
  }

  return <WelcomeLoader onComplete={handleLoaderComplete} />;
}

