import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/motion/tokens";

interface PortraitHeroProps {
  src?: string;
  alt?: string;
}

export default function PortraitHero({
  src = "/portrait.png",
  alt = "Layth Ayache",
}: PortraitHeroProps) {
  const reduced = useReducedMotion();
  const { portrait, route } = MOTION;

  return (
    <motion.img
      src={src}
      alt={alt}
      className="relative z-50 w-72 sm:w-80 md:w-96 lg:w-[28rem]"
      draggable={false}
      initial={{ opacity: 0, y: reduced ? 0 : portrait.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: portrait.duration,
        ease: route.easeOut,
      }}
    />
  );
}
