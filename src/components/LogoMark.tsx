"use client";

import { useEffect, useState, useRef } from "react";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export default function LogoMark({ className = "", size = 100 }: LogoMarkProps) {
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const hoverStartTime = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering) {
      const updateSpeed = () => {
        if (hoverStartTime.current) {
          const hoverDuration = Date.now() - hoverStartTime.current;
          // Accelerate from 2s to 0.3s over 3 seconds of hover
          const maxDuration = 3000; // 3 seconds
          const minSpeed = 2; // 2 seconds per rotation (slow)
          const maxSpeed = 0.3; // 0.3 seconds per rotation (fast)
          
          const progress = Math.min(hoverDuration / maxDuration, 1);
          const speed = minSpeed - (minSpeed - maxSpeed) * progress;
          
          setRotationSpeed(speed);
          animationFrameRef.current = requestAnimationFrame(updateSpeed);
        }
      };
      
      hoverStartTime.current = Date.now();
      updateSpeed();

      // Set timeout to refresh page after 3 seconds
      refreshTimeoutRef.current = setTimeout(() => {
        // Clear sessionStorage to restart the loader
        sessionStorage.removeItem("hasSeenLoader");
        window.location.reload();
      }, 3000);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
      setRotationSpeed(0);
      hoverStartTime.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Layth Ayache mark"
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      style={{ 
        color: "var(--accent)",
        animation: rotationSpeed > 0 ? `logo-spin ${rotationSpeed}s linear infinite` : "none",
        transformOrigin: "center center",
        cursor: "pointer",
        transition: "animation 0.1s ease-out"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="butt">
        <path d="M 72.98 69.28 A 30 30 0 0 1 23.52 34.61" />
        <path d="M 26.72 31.12 A 30 30 0 0 1 76.23 64.54" />
      </g>
    </svg>
  );
}
