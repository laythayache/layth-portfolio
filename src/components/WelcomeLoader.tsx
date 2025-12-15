"use client";

import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

export default function WelcomeLoader() {
  const [isReady, setIsReady] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    // Check if fonts are ready and wait for next paint
    const checkReady = async () => {
      try {
        await document.fonts.ready;
        // Wait for next paint
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        setIsReady(true);
      } catch (error) {
        // Fallback: mark as ready after a short delay
        setTimeout(() => setIsReady(true), 500);
      }
    };

    checkReady();

    // Max timeout fallback (2.2s as specified)
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      // Start fade out
      const fadeTimeout = setTimeout(() => {
        setShouldUnmount(true);
      }, 300); // Fade duration

      return () => clearTimeout(fadeTimeout);
    }
  }, [isReady]);

  if (shouldUnmount) {
    return null;
  }

  return (
    <div
      className={`welcome-loader ${isReady ? "fade-out" : ""}`}
      aria-label="Loading"
      role="status"
      aria-live="polite"
    >
      <div className="welcome-loader__container">
        {/* Text container (behind the mark) */}
        <div className="welcome-loader__text-wrapper">
          <div className="welcome-loader__text welcome-loader__text--left">
            LAYTH
          </div>
          <div className="welcome-loader__text welcome-loader__text--right">
            AYACHE
          </div>
        </div>

        {/* Mark (in front, acts as mask/occluder) */}
        <div className="welcome-loader__mark-wrapper">
          <LogoMark className="welcome-loader__mark" size={200} />
        </div>
      </div>
    </div>
  );
}
