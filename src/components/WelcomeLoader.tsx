"use client";

import { useEffect, useState, useRef } from "react";
import Lockup from "./Lockup";

interface WelcomeLoaderProps {
  onComplete?: () => void;
  replayToken?: number;
}

export default function WelcomeLoader({ onComplete, replayToken = 0 }: WelcomeLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "settling" | "complete">("loading");
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [spinClass, setSpinClass] = useState<"isSpinning" | "stopSpin">("isSpinning");
  const containerRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const hasCalledComplete = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Reset on replay
  useEffect(() => {
    // Reset all state when replayToken changes
    setPhase("loading");
    setShouldUnmount(false);
    setSpinClass("isSpinning");
    hasCalledComplete.current = false;
    
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset container styles
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.position = "";
      container.style.width = "";
      container.style.height = "";
      container.style.left = "";
      container.style.top = "";
      container.style.margin = "";
      container.style.transform = "";
      container.style.transformOrigin = "";
    }

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
    timeoutsRef.current.push(settleTimeout);

    // Max timeout fallback (10s)
    const maxTimeout = setTimeout(() => {
      setPhase("settling");
    }, 10000);
    timeoutsRef.current.push(maxTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [replayToken]);

  useEffect(() => {
    if (phase === "settling") {
      // Keep spinning during settle transition
      setSpinClass("isSpinning");
      
      // Wait for fonts and next frame to ensure hero is rendered
      const measureAndAnimate = async () => {
        await document.fonts.ready;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const container = containerRef.current;
            const loaderLockup = lockupRef.current;
            const heroLockup = (window as any).__heroLockupRef as HTMLElement | undefined;

            if (!container || !loaderLockup) {
              // Fallback if loader lockup not found
              const errorTimeout = setTimeout(() => {
                setPhase("complete");
                setSpinClass("stopSpin");
                if (onComplete && !hasCalledComplete.current) {
                  hasCalledComplete.current = true;
                  onComplete();
                }
                const errorUnmountTimeout = setTimeout(() => {
                  setShouldUnmount(true);
                }, 300);
                timeoutsRef.current.push(errorUnmountTimeout);
              }, 500);
              timeoutsRef.current.push(errorTimeout);
              return;
            }

            if (heroLockup) {
              // Measure source (loader container) and target (hero lockup) rectangles
              const sourceRect = container.getBoundingClientRect();
              const targetRect = heroLockup.getBoundingClientRect();

              // Calculate translation delta
              const dx = targetRect.left - sourceRect.left;
              const dy = targetRect.top - sourceRect.top;

              // Calculate uniform scale
              const scaleX = targetRect.width / sourceRect.width;
              const scaleY = targetRect.height / sourceRect.height;
              const scale = Math.min(scaleX, scaleY);

              // Freeze loader container dimensions and set fixed positioning
              container.style.position = "fixed";
              container.style.top = `${sourceRect.top}px`;
              container.style.left = `${sourceRect.left}px`;
              container.style.width = `${sourceRect.width}px`;
              container.style.height = `${sourceRect.height}px`;
              container.style.transformOrigin = "top left";
              container.style.margin = "0";

              // Hide text during settle (it will be replaced by hero name)
              const textElements = loaderLockup.querySelectorAll('.lockup__text');
              textElements.forEach((el) => {
                (el as HTMLElement).style.opacity = '0';
              });

              // Apply transform - translate then scale
              const adjustedDx = dx / scale;
              const adjustedDy = dy / scale;
              
              container.style.transition = "transform 900ms cubic-bezier(0.12, 0.9, 0.2, 1), opacity 0.6s ease-out 0.65s";
              container.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

              // Crossfade handoff: fade hero lockup in during last 250ms of settle
              const crossfadeTimeout = setTimeout(() => {
                if (heroLockup) {
                  heroLockup.style.transition = "opacity 0.25s ease-out";
                  heroLockup.style.opacity = "1";
                }
              }, 650); // Start fade-in at 650ms (250ms before settle completes)
              timeoutsRef.current.push(crossfadeTimeout);

              // After settle animation completes, switch to stopSpin
              const stopSpinTimeout = setTimeout(() => {
                // Capture current rotation before switching animations
                const markElement = loaderLockup.querySelector('.lockup__mark') as HTMLElement;
                if (markElement) {
                  const computedStyle = window.getComputedStyle(markElement);
                  const matrix = computedStyle.transform || computedStyle.webkitTransform;
                  if (matrix && matrix !== 'none') {
                    const values = matrix.split('(')[1].split(')')[0].split(',');
                    const a = parseFloat(values[0]);
                    const b = parseFloat(values[1]);
                    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    // Set the starting rotation for stopSpin
                    markElement.style.setProperty('--spin-start', `${angle}deg`);
                    markElement.style.setProperty('--spin-end', `${angle + 360}deg`);
                  }
                }
                setSpinClass("stopSpin");
                
                // Wait for stopSpin animation to complete, then fade out overlay
                const completeTimeout = setTimeout(() => {
                  setPhase("complete");
                  if (onComplete && !hasCalledComplete.current) {
                    hasCalledComplete.current = true;
                    onComplete();
                  }
                  const unmountTimeout = setTimeout(() => {
                    setShouldUnmount(true);
                    // Clean up fixed positioning
                    container.style.position = "";
                    container.style.width = "";
                    container.style.height = "";
                    container.style.left = "";
                    container.style.top = "";
                    container.style.margin = "";
                    container.style.transform = "";
                    container.style.transformOrigin = "";
                  }, 300);
                  timeoutsRef.current.push(unmountTimeout);
                }, 900); // Wait for stopSpin animation (900ms)
                timeoutsRef.current.push(completeTimeout);
              }, 900); // After settle completes (900ms)
              timeoutsRef.current.push(stopSpinTimeout);
            } else {
              // Fallback if hero lockup not found - just fade out
              setSpinClass("stopSpin");
              setTimeout(() => {
                setPhase("complete");
                if (onComplete && !hasCalledComplete.current) {
                  hasCalledComplete.current = true;
                  onComplete();
                }
                setTimeout(() => {
                  setShouldUnmount(true);
                }, 300);
              }, 900);
            }
          });
        });
      };

      measureAndAnimate();
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
        transition: phase === "settling" ? "opacity 0.6s ease-out 0.65s" : phase === "complete" ? "opacity 0.3s ease-out" : "none"
      }}
    >
      <div ref={containerRef} className="welcome-loader__container">
        <Lockup
          ref={lockupRef}
          emblemSize={200}
          showText={true}
          emblemClassName={spinClass}
        />
      </div>
    </div>
  );
}
