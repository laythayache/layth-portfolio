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
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      setShowCaret(false);
      if (onComplete) {
        // Small delay before calling onComplete
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  return (
    <span className={`typewriter-text ${className}`} style={{ color: "var(--text)" }}>
      {displayedText}
      {showCaret && <span className="typewriter-caret">|</span>}
    </span>
  );
}
