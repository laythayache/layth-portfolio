import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface CharacterScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const CharacterScramble = ({ text, className = "", delay = 0 }: CharacterScrambleProps) => {
  const [displayText, setDisplayText] = useState(text);
  const prefersReducedMotion = useReducedMotion();

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const timeout = setTimeout(() => {
      let iterations = 0;
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }

        iterations += 1 / 3; // Smooth progression
      }, 20);

      // Store interval ID for cleanup
      return () => {
        clearInterval(interval);
      };
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, prefersReducedMotion]);

  return <span className={className}>{displayText}</span>;
};

export default CharacterScramble;

