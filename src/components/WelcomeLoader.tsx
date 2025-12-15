"use client";

import { useEffect, useState, useRef } from "react";
import LogoMark from "./LogoMark";

interface WelcomeLoaderProps {
  onComplete?: () => void;
}

export default function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "settling" | "complete">("loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    // Check if fonts are ready and wait for next paint
    const checkReady = async () => {
      try {
        await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
      } catch (error) {
        // Fallback
      }
    };

    checkReady();

    // Start settle phase after animation completes (~5.5s)
    const settleTimeout = setTimeout(() => {
      setPhase("settling");
    }, 5500);

    // Max timeout fallback (10s)
    const maxTimeout = setTimeout(() => {
      setPhase("settling");
    }, 10000);

    return () => {
      clearTimeout(settleTimeout);
      clearTimeout(maxTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === "settling") {
      // Wait for next frame to ensure hero is rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          const heroEmblem = document.querySelector('[data-hero-emblem]') as HTMLElement;
          const markElement = container?.querySelector('.welcome-loader__mark') as HTMLElement;

          if (container && heroEmblem) {
            const heroEmblemRect = heroEmblem.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Calculate target position (center of hero emblem)
            const targetX = heroEmblemRect.left + heroEmblemRect.width / 2 - containerRect.width / 2;
            const targetY = heroEmblemRect.top + heroEmblemRect.height / 2 - containerRect.height / 2;

            // Calculate scale (hero emblem is 120px, loader emblem is 200px)
            const scale = 120 / 200;

            // Get current rotation from computed style to continue from where it stopped
            if (markElement) {
              const computedStyle = window.getComputedStyle(markElement);
              const matrix = computedStyle.transform;
              if (matrix && matrix !== 'none') {
                const values = matrix.split('(')[1].split(')')[0].split(',');
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
              }
              // Add settling class to trigger deceleration animation
              markElement.classList.add('settling');
            }

            // Apply transform
            container.style.transition = "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-out 0.6s";
            container.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;

            // Hide text during settle (it will be replaced by hero name)
            const textElements = container.querySelectorAll('.welcome-loader__text');
            textElements.forEach((el) => {
              (el as HTMLElement).style.opacity = '0';
            });

            // After settle animation, fade out overlay and mark complete
            setTimeout(() => {
              setPhase("complete");
              // Call onComplete callback when loader fully finishes
              if (onComplete && !hasCalledComplete.current) {
                hasCalledComplete.current = true;
                onComplete();
              }
              setTimeout(() => {
                setShouldUnmount(true);
              }, 300);
            }, 1800);
          } else {
            // Fallback if hero not found
            setTimeout(() => {
              setPhase("complete");
              if (onComplete && !hasCalledComplete.current) {
                hasCalledComplete.current = true;
                onComplete();
              }
              setTimeout(() => {
                setShouldUnmount(true);
              }, 300);
            }, 500);
          }
        });
      });
    }
  }, [phase]);

  if (shouldUnmount) {
    return null;
  }

  return (
    <div
      className={`welcome-loader ${phase === "complete" ? "fade-out" : ""}`}
      aria-label="Loading"
      role="status"
      aria-live="polite"
    >
      <div ref={containerRef} className="welcome-loader__container">
        {/* Text container (behind the mark) */}
        <div className="welcome-loader__text-wrapper">
          <div className="welcome-loader__text welcome-loader__text--layth">
            LAYTH
          </div>
          <div className="welcome-loader__text welcome-loader__text--ayache">
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
