import { MOTION } from "@/motion/tokens";
import { motion, useReducedMotion } from "framer-motion";

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
      className="relative z-50 w-[36.5rem] max-h-[85vh] object-contain sm:w-[40.625rem] md:w-[48.75rem] lg:w-[56.875rem]"
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
