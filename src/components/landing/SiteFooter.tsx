import { motion, useReducedMotion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function SiteFooter() {
  const reduced = useReducedMotion();

  return (
    <footer className="bg-surface px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fade}
      >
        <div className="flex items-center justify-center gap-8">
          <a
            href="mailto:hello@laythayache.com"
            className="font-mono text-xs tracking-wide text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/laythayache"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wide text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/laythayache"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wide text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
