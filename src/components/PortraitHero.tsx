import { MOTION } from "@/motion/tokens";
import { motion, useReducedMotion } from "framer-motion";

interface PortraitHeroProps {
  alt?: string;
}

export default function PortraitHero({
  alt = "Layth Ayache",
}: PortraitHeroProps) {
  const reduced = useReducedMotion();
  const { portrait, route } = MOTION;

  return (
    <motion.picture
      className="relative z-50 w-[36.5rem] max-h-[85vh] sm:w-[40.625rem] md:w-[48.75rem] lg:w-[56.875rem]"
      initial={{ opacity: 0, y: reduced ? 0 : portrait.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: portrait.duration,
        ease: route.easeOut,
      }}
    >
      {/* AVIF format - best compression (95% reduction) */}
      <source srcSet="/portrait.avif" type="image/avif" />
      {/* WebP format - excellent compression (90% reduction) */}
      <source srcSet="/portrait.webp" type="image/webp" />
      {/* Fallback to original PNG */}
      <motion.img
        src="/portrait.png"
        alt={alt}
        className="object-contain"
        draggable={false}
      />
    </motion.picture>
  );
}
