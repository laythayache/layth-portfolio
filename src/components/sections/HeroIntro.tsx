import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "hero-intro-seen-v1";
const EASE = [0.7, 0, 0.3, 1] as const;

type Phase = "opening" | "title" | "exiting";

interface HeroIntroProps {
  onComplete: () => void;
}

export default function HeroIntro({ onComplete }: HeroIntroProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("opening");
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setVisible(false);
    onComplete();
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — silently continue
    }
  }, [onComplete]);

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }

    const t1 = window.setTimeout(() => setPhase("title"), 180);
    const t2 = window.setTimeout(() => setPhase("exiting"), 680);
    const t3 = window.setTimeout(finish, 1000);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("keydown", handleKey);
    };
  }, [reduced, finish]);

  const barHeight =
    phase === "exiting" ? "0%" : phase === "title" ? "42%" : "50%";
  const barTransition = {
    duration: phase === "exiting" ? 0.3 : 0.4,
    ease: EASE,
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[70] pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 bg-ink"
            initial={{ height: "50%" }}
            animate={{ height: barHeight }}
            transition={barTransition}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-ink"
            initial={{ height: "50%" }}
            animate={{ height: barHeight }}
            transition={barTransition}
          />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              className="flex flex-col items-center gap-5 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase === "title" ? 1 : 0,
                y: phase === "title" ? 0 : 8,
              }}
              transition={{
                duration: phase === "exiting" ? 0.2 : 0.35,
                delay: phase === "title" ? 0.08 : 0,
                ease: EASE,
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-surface-overlay">
                <span className="text-[rgb(180,140,100)]">—</span>{" "}
                no. 04 / engineer&apos;s log
              </p>
              <p className="font-serif text-[clamp(1.4rem,4.2vw,2.8rem)] leading-[1.15] tracking-[-0.01em] text-surface">
                I build AI systems
                <br />
                that survive reality.
              </p>
              <div className="mt-1 h-px w-14 bg-[rgb(180,140,100)]" />
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            className="pointer-events-auto absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.28em] text-surface-overlay transition-colors hover:text-surface"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "title" ? 0.75 : 0 }}
            transition={{ duration: 0.4 }}
          >
            Skip <span aria-hidden>esc</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function shouldPlayHeroIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}
