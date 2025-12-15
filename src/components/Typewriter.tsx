"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
  className?: string;
}

export default function Typewriter({ 
  text, 
  onComplete, 
  speed = 45,
  className = "" 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      // Add natural variance to typing speed
      const variance = Math.random() * 20 - 10; // -10 to +10ms
      const delay = speed + variance;

      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      // Blink caret for 400ms then hide
      setTimeout(() => {
        setShowCaret(false);
        if (onComplete) {
          onComplete();
        }
      }, 400);
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If reduced motion, show text instantly
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      setShowCaret(false);
      if (onComplete) {
        setTimeout(() => onComplete(), 100);
      }
    }
  }, [prefersReducedMotion, text, onComplete]);

  return (
    <span className={`typewriter-text ${className}`} style={{ color: "var(--text)" }}>
      {prefersReducedMotion ? text : displayedText}
      {showCaret && !prefersReducedMotion && (
        <span className="typewriter-caret" aria-hidden="true">|</span>
      )}
    </span>
  );
}

