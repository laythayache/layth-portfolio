import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <motion.div
      className="scroll-indicator flex flex-col items-center gap-2 text-muted-foreground"
      style={{ opacity }}
    >
      <span className="text-xs font-mono uppercase tracking-widest">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={20} className="animate-pulse-soft" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
