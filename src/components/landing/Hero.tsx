import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-surface px-6">
      {/* Top signal */}
      <motion.p
        className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-text-muted"
        initial={reduced ? undefined : "hidden"}
        animate="visible"
        custom={0}
        variants={fade}
      >
        Beirut &middot; AI Infrastructure
      </motion.p>

      {/* Center composition */}
      <div className="flex flex-col items-center">
        {/* Editorial name + emblem layout */}
        <div className="relative flex items-center justify-center">
          {/* LAYTH — top-left of emblem */}
          <motion.p
            className="absolute font-serif text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              top: "-2.5rem",
              left: "-1rem",
            }}
            initial={reduced ? undefined : "hidden"}
            animate="visible"
            custom={0.1}
            variants={fade}
          >
            <span className="md:hidden">LAYTH</span>
            <span className="hidden md:inline">LAYTH</span>
          </motion.p>

          {/* Emblem */}
          <motion.img
            src="/logo-mark.svg"
            alt="Layth Ayache"
            className="h-40 w-auto sm:h-48 md:h-56 lg:h-64"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />

          {/* AYACHE — bottom-right of emblem */}
          <motion.p
            className="absolute font-serif text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              bottom: "-2.5rem",
              right: "-1rem",
            }}
            initial={reduced ? undefined : "hidden"}
            animate="visible"
            custom={0.15}
            variants={fade}
          >
            AYACHE
          </motion.p>
        </div>

        {/* Statement */}
        <motion.div
          className="mt-24 text-center"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.3}
          variants={fade}
        >
          <h1 className="font-serif text-2xl font-bold text-text-primary md:text-3xl">
            AI Infrastructure Engineer
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Building systems that shape decisions.
          </p>
        </motion.div>

        {/* Link */}
        <motion.div
          className="mt-10"
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          custom={0.45}
          variants={fade}
        >
          <Link
            to="/systems"
            className="font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            View Selected Systems &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
