"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience, ExperiencePhase } from "@/experience/ExperienceProvider";
import { TIMELINE } from "@/experience/constants";
import Lockup from "./Lockup";
import LogoMark from "./LogoMark";

export default function ExperienceOverlay() {
  const { phase, replayToken, setPhase } = useExperience();
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const loaderMeasureGroupRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const [spinClass, setSpinClass] = useState<"isSpinning" | "stopSpin">("isSpinning");

  // Keep spinning during all choreography phases and settle
  // Start spinning immediately from BOOT
  useEffect(() => {
    if (phase === "BOOT" || phase.startsWith("CHOREO") || phase === "SETTLE") {
      setSpinClass("isSpinning");
    }
  }, [phase]);

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Timeline orchestrator
  const runTimeline = async (token: number) => {
    // Reset state
    setShouldUnmount(false);
    setSpinClass("isSpinning"); // Start spinning immediately
    clearAllTimeouts();

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      // Skip to READY quickly
      setPhase("READY");
      return;
    }

    // Wait for fonts and layout
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Choreography Phase 1: OUT (names slide out original positions)
    setPhase("CHOREO_1_OUT");
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, TIMELINE.CHOREO_1_OUT);
      timeoutsRef.current.push(timeout);
    });

    // Choreography Phase 1: IN (hide names)
    setPhase("CHOREO_1_IN");
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, TIMELINE.CHOREO_1_IN);
      timeoutsRef.current.push(timeout);
    });

    // Choreography Phase 2: OUT SWAP (names slide out swapped positions)
    setPhase("CHOREO_2_OUT_SWAP");
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, TIMELINE.CHOREO_2_OUT_SWAP);
      timeoutsRef.current.push(timeout);
    });

    // Choreography Phase 2: IN (hide names)
    setPhase("CHOREO_2_IN");
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, TIMELINE.CHOREO_2_IN);
      timeoutsRef.current.push(timeout);
    });

    // Choreography Phase 3: OUT (names slide out original positions, hold)
    setPhase("CHOREO_3_OUT");
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, TIMELINE.CHOREO_3_OUT);
      timeoutsRef.current.push(timeout);
    });

    // SETTLE phase - FLIP animation
    setPhase("SETTLE");
    await performFLIPSettle();

    // TYPE phase - typewriter
    setPhase("TYPE");
    // Typewriter will trigger REVEAL when complete

    // Cleanup overlay after settle completes
    setTimeout(() => {
      setShouldUnmount(true);
    }, TIMELINE.SETTLE + 300);
  };

  // FLIP settle animation with improved accuracy
  const performFLIPSettle = async (): Promise<void> => {
    return new Promise((resolve) => {
      // Use multiple RAF frames to ensure layout stability
      requestAnimationFrame(() => {
        requestAnimationFrame(async () => {
          // Wait for all fonts and layout to stabilize
          await document.fonts.ready;

          // Get measure groups
          const measureGroup = loaderMeasureGroupRef.current;
          const heroLockup = (window as any).__heroLockupRef as HTMLElement | undefined;
          const heroMeasureGroup = heroLockup?.querySelector('.lockup__measure-group') as HTMLElement | undefined;
          
          if (!measureGroup || !heroMeasureGroup) {
            // Fallback
            resolve();
            return;
          }

          // Force layout recalculation
          void measureGroup.offsetHeight;
          void heroMeasureGroup.offsetHeight;

          // Measure source (loader) and target (hero) rectangles with high precision
          const sourceRect = measureGroup.getBoundingClientRect();
          const targetRect = heroMeasureGroup.getBoundingClientRect();

          // Calculate translation with sub-pixel precision
          const dx = targetRect.left - sourceRect.left;
          const dy = targetRect.top - sourceRect.top;

          // Calculate scale - use average for uniform scaling
          const scaleX = targetRect.width / sourceRect.width;
          const scaleY = targetRect.height / sourceRect.height;
          // Use geometric mean for most natural scaling
          const scale = Math.sqrt(scaleX * scaleY);

          // Expose settle info for debug overlay (dev only)
          if (process.env.NODE_ENV !== "production") {
            (window as any).__settleInfo = {
              sourceRect: {
                x: sourceRect.x.toFixed(2),
                y: sourceRect.y.toFixed(2),
                width: sourceRect.width.toFixed(2),
                height: sourceRect.height.toFixed(2),
              },
              targetRect: {
                x: targetRect.x.toFixed(2),
                y: targetRect.y.toFixed(2),
                width: targetRect.width.toFixed(2),
                height: targetRect.height.toFixed(2),
              },
              dx: dx.toFixed(2),
              dy: dy.toFixed(2),
              scale: scale.toFixed(4),
            };
          }

          // Prepare measure group for fixed positioning
          measureGroup.style.willChange = "transform";
          measureGroup.style.position = "fixed";
          measureGroup.style.top = `${sourceRect.top}px`;
          measureGroup.style.left = `${sourceRect.left}px`;
          measureGroup.style.width = `${sourceRect.width}px`;
          measureGroup.style.height = `${sourceRect.height}px`;
          measureGroup.style.transformOrigin = "center center";
          measureGroup.style.margin = "0";
          measureGroup.style.padding = "0";

          // Hide loader names during settle
          const loaderNames = measureGroup.querySelectorAll('.lockup__name');
          loaderNames.forEach((el) => {
            (el as HTMLElement).style.transition = "opacity 200ms ease-out";
            (el as HTMLElement).style.opacity = "0";
          });

          // Stop spinner slightly before animation ends for natural feel
          setTimeout(() => {
            const markElement = measureGroup.querySelector('.logo-mark') as HTMLElement;
            if (markElement) {
              const computedStyle = window.getComputedStyle(markElement);
              const matrix = computedStyle.transform || computedStyle.webkitTransform;
              
              if (matrix && matrix !== 'none') {
                const values = matrix.split('(')[1].split(')')[0].split(',');
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                
                markElement.style.setProperty('--spin-start', `${angle}deg`);
                markElement.style.setProperty('--spin-end', `${angle + 360}deg`);
              }
              
              setSpinClass("stopSpin");
            }
          }, TIMELINE.SETTLE_SPIN_STOP);

          // Apply smooth transform with cubic-bezier easing
          // Using a custom easing for natural deceleration
          measureGroup.style.transition = `transform ${TIMELINE.SETTLE}ms cubic-bezier(0.16, 1, 0.3, 1)`;
          measureGroup.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

          // Crossfade: hero opacity transition during last portion
          const crossfadeStart = TIMELINE.SETTLE - TIMELINE.SETTLE_CROSSFADE;
          setTimeout(() => {
            if (heroLockup) {
              heroLockup.style.transition = `opacity ${TIMELINE.SETTLE_CROSSFADE}ms ease-out`;
              heroLockup.style.opacity = "1";
            }
          }, crossfadeStart);

          // Fade overlay background smoothly
          if (overlayRef.current) {
            overlayRef.current.style.transition = `opacity ${TIMELINE.SETTLE}ms ease-out`;
            overlayRef.current.style.opacity = "0";
            overlayRef.current.style.pointerEvents = "none";
          }

          // Cleanup and resolve after settle completes
          setTimeout(() => {
            if (measureGroup.parentElement) {
              measureGroup.style.willChange = "auto";
            }
            resolve();
          }, TIMELINE.SETTLE);
        });
      });
    });
  };

  // Run timeline on mount and when replayToken changes (replay)
  useEffect(() => {
    // Only run if phase is BOOT (initial or after replay)
    if (phase === "BOOT") {
      runTimeline(replayToken);
    }

    return () => {
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayToken]); // Run on initial mount (phase is BOOT) and when replayToken changes

  // Don't render if READY or should unmount
  if (phase === "READY" || shouldUnmount) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="experience-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
      }}
    >
      <div ref={lockupRef} className="experience-overlay__container">
        <Lockup
          ref={loaderMeasureGroupRef}
          mode="loader"
          nameLeft="LAYTH"
          nameRight="AYACHE"
          markSizeVar="--mark-loader"
          className={`lockup--spinning-${spinClass}`}
          data-phase={phase}
        />
      </div>
    </div>
  );
}

