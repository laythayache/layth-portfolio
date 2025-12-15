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
          const heroLockup = (window as any).__heroLockupRef as HTMLElement | undefined;
          const markElement = container?.querySelector('.welcome-loader__mark') as HTMLElement;

          if (container && heroLockup) {
            // Measure source (loader lockup) and target (hero lockup) rectangles
            const sourceRect = container.getBoundingClientRect();
            const targetRect = heroLockup.getBoundingClientRect();

            // Calculate translation delta
            const dx = targetRect.left - sourceRect.left;
            const dy = targetRect.top - sourceRect.top;

            // Calculate scale factors
            const scaleX = targetRect.width / sourceRect.width;
            const scaleY = targetRect.height / sourceRect.height;
            // Use uniform scale (min to ensure it fits)
            const scale = Math.min(scaleX, scaleY);

            // Lock dimensions to prevent reflow during settle
            // Set explicit pixel dimensions from measured source rect
            // Use fixed positioning to prevent layout shifts
            const containerParent = container.parentElement;
            if (containerParent) {
              containerParent.style.position = "fixed";
              containerParent.style.top = "0";
              containerParent.style.left = "0";
              containerParent.style.width = "100%";
              containerParent.style.height = "100%";
            }
            
            container.style.position = "fixed";
            container.style.width = `${sourceRect.width}px`;
            container.style.height = `${sourceRect.height}px`;
            container.style.left = `${sourceRect.left}px`;
            container.style.top = `${sourceRect.top}px`;
            container.style.margin = "0";
            container.style.transformOrigin = "center center";

            // Add settling class to trigger deceleration animation
            if (markElement) {
              markElement.classList.add('settling');
            }

            // Set transform-origin to center for proper scaling
            container.style.transformOrigin = "center center";
            
            // Apply transform - translate then scale
            // CSS transforms are applied right-to-left, so to translate then scale visually,
            // we write: scale(...) translate(...)
            // Adjust translation by scale factor for precise alignment
            const adjustedDx = dx / scale;
            const adjustedDy = dy / scale;
            
            container.style.transition = "transform 1.1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-out 0.5s";
            container.style.transform = `scale(${scale}) translate(${adjustedDx}px, ${adjustedDy}px)`;

            // Hide text during settle (it will be replaced by hero name)
            const textElements = container.querySelectorAll('.welcome-loader__text');
            textElements.forEach((el) => {
              (el as HTMLElement).style.opacity = '0';
            });

            // Crossfade handoff: fade hero lockup in during last 300ms of settle
            setTimeout(() => {
              if (heroLockup) {
                heroLockup.style.transition = "opacity 0.3s ease-out";
                heroLockup.style.opacity = "1";
              }
            }, 800); // Start fade-in at 800ms (300ms before settle completes)

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
                // Clean up fixed positioning
                if (container) {
                  container.style.position = "";
                  container.style.width = "";
                  container.style.height = "";
                  container.style.left = "";
                  container.style.top = "";
                  container.style.margin = "";
                }
                const containerParent = container?.parentElement;
                if (containerParent) {
                  containerParent.style.position = "";
                  containerParent.style.top = "";
                  containerParent.style.left = "";
                  containerParent.style.width = "";
                  containerParent.style.height = "";
                }
              }, 300);
            }, 1100);
          } else {
            // Fallback if hero not found - just fade out
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
  }, [phase, onComplete]);

  if (shouldUnmount) {
    return null;
  }

  return (
    <div
      className={`welcome-loader ${phase === "settling" ? "settling" : ""} ${phase === "complete" ? "fade-out" : ""}`}
      aria-label="Loading"
      role="status"
      aria-live="polite"
      style={{
        opacity: phase === "settling" ? 1 : phase === "complete" ? 0 : 1,
        transition: phase === "settling" ? "opacity 0.6s ease-out 0.5s" : phase === "complete" ? "opacity 0.3s ease-out" : "none"
      }}
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
