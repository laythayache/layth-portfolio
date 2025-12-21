"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import EmblemMark from "./EmblemMark";
import Wordmark from "./Wordmark";
import { sizes } from "@/brand/tokens";
import { useBrandSequence } from "./BrandSequenceProvider";

interface BrandLockupProps {
  variant?: "header" | "hero";
  showWordmark?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export default function BrandLockup({
  variant = "header",
  showWordmark = true,
  interactive = true,
  onClick,
}: BrandLockupProps) {
  const { state } = useBrandSequence();
  const prefersReducedMotion = useReducedMotion();
  const isIdle = state === "idle";
  const isVisible = isIdle || state === "reveal";
  const isInteractive = interactive && isIdle && !prefersReducedMotion;

  const emblemSize =
    variant === "header"
      ? { base: sizes.emblem.mobile, md: sizes.emblem.desktop }
      : { base: sizes.emblem.tablet, md: sizes.emblem.desktop };

  const handleClick = () => {
    if (isIdle && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`flex items-center gap-3 md:gap-4 ${
        variant === "header" ? "flex-row" : "flex-col"
      }`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
    >
      <motion.div
        className="flex-shrink-0 cursor-pointer"
        onClick={handleClick}
        whileHover={isInteractive ? { scale: 1.05 } : undefined}
        whileTap={isIdle ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.2 }}
      >
        <EmblemMark
          size={emblemSize}
          className="block"
          animate={isInteractive}
          initialRotation={20}
        />
      </motion.div>
      {showWordmark && (
        <Wordmark
          variant={variant === "header" ? "inline" : "stacked"}
          showSurname={variant === "header" ? false : true}
          className="text-brand-ink"
        />
      )}
    </motion.div>
  );
}
