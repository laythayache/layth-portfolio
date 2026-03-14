import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  trigger?: "animate" | "whileInView";
}

export default function TextReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.04,
  trigger = "animate",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: SECTION.ease },
    },
  };

  const motionProps =
    trigger === "whileInView"
      ? {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: SECTION.viewport,
        }
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
        };

  return (
    <motion.div
      variants={containerVariants}
      {...motionProps}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          aria-hidden
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}
