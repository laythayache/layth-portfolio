"use client";

import { useEffect, useState, useRef } from "react";
import { useExperience } from "@/experience/ExperienceProvider";
import LogoMark from "./LogoMark";

export default function EmblemBloom() {
  const { phase } = useExperience();
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const bloomRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Calculate position from hero mark center
  const updatePosition = () => {
    // Wait for hero lockup to be visible
    requestAnimationFrame(() => {
      const heroMarkWrapper = document.querySelector(
        ".lockup--hero .lockup__mark-wrapper"
      ) as HTMLElement;
      
      if (heroMarkWrapper) {
        const rect = heroMarkWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setPosition({ x: centerX, y: centerY });
      }
    });
  };

  // Start bloom animation
  useEffect(() => {
    if (phase === "READY") {
      // Small delay to ensure hero lockup is visible and measured
      const timeout = setTimeout(() => {
        setIsVisible(true);
        updatePosition();
      }, 100);

      if (prefersReducedMotion) {
        // Option B: disable bloom entirely for reduced motion
        clearTimeout(timeout);
        setIsVisible(false);
        return;
      }

      // Start animation after position is set
      const startAnimation = () => {
        const startScale = 1;
        const endScale = 3.2; // Slightly above 3 for feel
        const duration = 12000; // 12 seconds - slow and smooth

        startTimeRef.current = Date.now();

        const animate = () => {
          if (!startTimeRef.current) return;

          const elapsed = Date.now() - startTimeRef.current;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out easing (cubic ease-out)
          const eased = 1 - Math.pow(1 - progress, 3);

          const currentScale = startScale + (endScale - startScale) * eased;
          setScale(currentScale);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      // Start animation after a brief delay to ensure position is set
      const animationTimeout = setTimeout(() => {
        startAnimation();
      }, 150);

      return () => {
        clearTimeout(timeout);
        clearTimeout(animationTimeout);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    } else {
      // Reset on phase change away from READY
      setIsVisible(false);
      setScale(1);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      startTimeRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [phase, prefersReducedMotion]);

  // Update position on window resize (throttled)
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updatePosition();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  if (!isVisible || prefersReducedMotion) {
    return null;
  }

  // Get hero mark size for initial scale reference
  const heroMarkSize = typeof window !== "undefined"
    ? (() => {
        const heroMarkWrapper = document.querySelector(
          ".lockup--hero .lockup__mark-wrapper"
        ) as HTMLElement;
        if (heroMarkWrapper) {
          return heroMarkWrapper.getBoundingClientRect().width;
        }
        // Fallback: parse CSS variable
        const cssValue = getComputedStyle(document.documentElement)
          .getPropertyValue("--mark-hero");
        const match = cssValue.match(/(\d+(?:\.\d+)?)px/);
        return match ? parseFloat(match[1]) : 96;
      })()
    : 96;

  return (
    <div
      ref={bloomRef}
      className="emblem-bloom"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${heroMarkSize}px`,
        height: `${heroMarkSize}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        zIndex: 1000, // Above hero lockup but below header/overlays
        pointerEvents: "none",
        opacity: 0.35, // Low opacity to maintain text legibility
        transition: "opacity 0.3s ease-out",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoMark size={0} className="emblem-bloom__mark" />
      </div>
    </div>
  );
}

