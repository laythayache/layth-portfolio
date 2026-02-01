import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/motion/tokens";
import HysteresisMark from "./HysteresisMark";

interface PortraitHeroProps {
  src?: string;
  alt?: string;
  tone?: "light" | "dark";
  active?: boolean;
}

export default function PortraitHero({
  src = "/portrait.png",
  alt = "Layth Ayache",
  tone = "light",
  active = false,
}: PortraitHeroProps) {
  const reduced = useReducedMotion();
  const { portrait, route } = MOTION;

  return (
    <div className="relative">
      {/* Hysteresis emblem — behind portrait, flipped, offset, faded.
          "The person moves forward. The system lags behind.
           State depends on history." */}
      <HysteresisMark
        tone={tone}
        active={active}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[280%] max-w-none -translate-x-1/2 -translate-y-1/2"
      />

      {/* Portrait */}
      <motion.img
        src={src}
        alt={alt}
        className="relative z-10 w-72 sm:w-80 md:w-96 lg:w-[28rem]"
        draggable={false}
        initial={{ opacity: 0, y: reduced ? 0 : portrait.y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: portrait.duration,
          ease: route.easeOut,
        }}
      />

      {/* TODO: "Stick then release" scroll behavior
          When implemented: portrait area sticks for ~70vh, then as scroll
          passes fold: scale 1→0.93, x 0→-18, opacity 1→0.92.
          Transforms must be capped and subtle.
          Respect prefers-reduced-motion (disable scroll transforms). */}
    </div>
  );
}
