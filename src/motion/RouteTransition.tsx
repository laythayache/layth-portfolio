import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MOTION } from "./tokens";

export default function RouteTransition() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const { route } = MOTION;

  const variants = {
    initial: {
      opacity: 0,
      y: reduced ? 0 : route.yEnter,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.15 : route.duration,
        ease: route.easeOut,
      },
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : route.yExit,
      transition: {
        duration: reduced ? 0.15 : route.duration,
        ease: route.easeIn,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        id="main-content"
        className="min-h-screen pt-[var(--nav-height)]"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense
          fallback={(
            <div className="flex items-center justify-center py-12">
              <div className="text-sm text-text-muted">Loading...</div>
            </div>
          )}
        >
          <Outlet />
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}
