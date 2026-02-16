import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { speakingEntries } from "@/content/speaking";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SpeakingSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="speaking" className="bg-surface py-24 px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={prefersReduced ? {} : containerVariants}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          variants={prefersReduced ? {} : itemVariants}
        >
          Speaking &amp; Community
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-center text-sm text-text-secondary"
          variants={prefersReduced ? {} : itemVariants}
        >
          Available for speaking engagements on AI systems, automation, and
          building technology in emerging markets.
        </motion.p>

        <div
          className={cn(
            "mt-12 grid gap-6",
            "grid-cols-1 md:grid-cols-3"
          )}
        >
          {speakingEntries.map((entry) => (
            <motion.div
              key={entry.id}
              className="rounded-lg border border-border bg-surface-raised p-6"
              variants={prefersReduced ? {} : itemVariants}
            >
              <h3 className="font-semibold text-text-primary">{entry.title}</h3>
              <p className="mt-1 font-mono text-xs text-accent">
                {entry.role} &middot; {entry.organization}
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
