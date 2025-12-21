"use client";

import { motion } from "framer-motion";
import { brandColors, emblem } from "@/brand/tokens";

interface EmblemMarkProps {
  size?: number | string | { base?: number | string; md?: number | string };
  className?: string;
  animate?: boolean;
  initialRotation?: number;
}

export default function EmblemMark({
  size = 44,
  className = "",
  animate = false,
  initialRotation = emblem.rotateDeg,
}: EmblemMarkProps) {
  const MotionSvg = motion.svg;
  
  // Handle responsive size object - use Tailwind classes for responsive sizing
  let sizeClasses = "";
  let widthAttr: number | string = 44;
  let heightAttr: number | string = 44;
  
  if (typeof size === "object") {
    const baseSize = size.base || 28;
    const mdSize = size.md || 44;
    widthAttr = baseSize;
    heightAttr = baseSize;
    sizeClasses = `w-[${baseSize}px] h-[${baseSize}px] md:w-[${mdSize}px] md:h-[${mdSize}px]`;
  } else {
    widthAttr = size;
    heightAttr = size;
  }

  return (
    <MotionSvg
      viewBox="0 0 100 100"
      width={widthAttr}
      height={heightAttr}
      className={`${sizeClasses} ${className}`}
      role="img"
      aria-label="Layth Ayache Emblem"
      initial={animate ? { rotate: initialRotation } : undefined}
      whileHover={animate ? { rotate: initialRotation + 360 } : undefined}
      transition={
        animate
          ? {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }
          : undefined
      }
      style={{ display: "block" }}
    >
      <circle
        cx="50"
        cy="50"
        r={emblem.radius}
        fill="none"
        stroke={brandColors.slate}
        strokeWidth={emblem.strokeWidth}
        strokeDasharray={emblem.dasharray}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
        transform={`rotate(${emblem.rotateDeg} 50 50)`}
      />
    </MotionSvg>
  );
}
