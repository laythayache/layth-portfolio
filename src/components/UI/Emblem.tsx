import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface EmblemProps extends HTMLMotionProps<"div"> {
  className?: string;
  size?: "centered" | "navbar";
}

/**
 * Emblem Component
 * 
 * Displays the logo-mark.svg emblem with configurable sizing.
 */
const Emblem = ({ className, size = "centered", ...motionProps }: EmblemProps) => {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-center",
        size === "centered" ? "emblem-centered" : "emblem-navbar",
        className
      )}
      {...motionProps}
    >
      <img
        src="/logo-mark.svg"
        alt="Layth Ayache"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default Emblem;
