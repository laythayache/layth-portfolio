import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["inspire", "think", "build", "fail", "break"];
const INTERVAL = 2000;
const BREAK_HOLD = 1500;

const WordLoader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [showBreakthrough, setShowBreakthrough] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentWord = WORDS[currentIndex];
  const isBreakWord = currentWord === "break";

  const handleBreakSequence = useCallback(() => {
    // Pause interval
    setIsPaused(true);
    
    // After a brief moment, show the broken state
    setTimeout(() => {
      setIsBroken(true);
    }, 100);

    // Hold broken state, then show breakthrough
    setTimeout(() => {
      setIsBroken(false);
      setShowBreakthrough(true);
    }, 100 + BREAK_HOLD);

    // After breakthrough displays, reset to beginning
    setTimeout(() => {
      setShowBreakthrough(false);
      setCurrentIndex(0);
      setIsPaused(false);
    }, 100 + BREAK_HOLD + 2500);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= WORDS.length) {
          return prev; // Will be handled by break sequence
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isBreakWord && !isPaused && !showBreakthrough) {
      handleBreakSequence();
    }
  }, [isBreakWord, isPaused, showBreakthrough, handleBreakSequence]);

  return (
    <div className="relative flex items-center justify-center min-h-[80px]">
      <AnimatePresence mode="wait">
        {showBreakthrough ? (
          <motion.span
            key="breakthrough"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 120,
            }}
            className="word-sequence text-foreground"
          >
            breakthrough
          </motion.span>
        ) : isBreakWord && isBroken ? (
          <motion.div
            key="broken"
            className="relative word-sequence text-foreground"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Top half - stays in place */}
            <span className="word-broken-top inline-block">break</span>
            {/* Bottom half - falls and rotates */}
            <motion.span
              className="word-broken-bottom absolute inset-0"
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: 8, rotate: 4 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              break
            </motion.span>
          </motion.div>
        ) : (
          <motion.span
            key={currentWord}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="word-sequence text-foreground"
          >
            {currentWord}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordLoader;
