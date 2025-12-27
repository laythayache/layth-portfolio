import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: 1 | -1;
}

const PageTransition = ({ children, direction = 1 }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
      }}
      className="page-container"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
