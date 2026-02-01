import { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { MOTION } from "@/motion/tokens";

interface HysteresisMarkProps {
  className?: string;
  tone?: "light" | "dark";
  active?: boolean;
}

export default function HysteresisMark({
  className = "",
  tone = "light",
  active = false,
}: HysteresisMarkProps) {
  const reduced = useReducedMotion();
  const controls = useAnimation();
  const entered = useRef(false);
  const { hysteresis } = MOTION;

  const baseOpacity =
    tone === "dark" ? hysteresis.opacityDark : hysteresis.opacityLight;

  // ── Entrance: fade + lift with a deliberate delay ──
  useEffect(() => {
    controls
      .start({
        opacity: baseOpacity,
        y: 0,
        transition: {
          delay: reduced ? 0 : hysteresis.delay,
          duration: reduced ? 0.15 : hysteresis.duration,
        },
      })
      .then(() => {
        entered.current = true;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Hover / focus lag interaction ──
  useEffect(() => {
    if (!entered.current || reduced) return;

    controls.start({
      opacity: active
        ? baseOpacity + hysteresis.opacityBump
        : baseOpacity,
      x: active ? hysteresis.nudgePx : 0,
      rotate: active ? hysteresis.rotateDeg : 0,
      transition: { duration: 0.3 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className={className}>
      <motion.img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none h-full w-full select-none mix-blend-multiply"
        initial={{ opacity: 0, y: reduced ? 0 : 6 }}
        animate={controls}
      />
    </div>
  );
}
