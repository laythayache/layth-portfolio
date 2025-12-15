"use client";

import { useEffect, useState } from "react";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Layth Ayache mark"
            className="welcome-loader__mark"
          >
            <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="butt">
              <path d="M 72.98 69.28 A 30 30 0 0 1 23.52 34.61" />
              <path d="M 26.72 31.12 A 30 30 0 0 1 76.23 64.54" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
