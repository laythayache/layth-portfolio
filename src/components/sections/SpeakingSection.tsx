import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { speakingEntries } from "@/content/speaking";
import { SECTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

export default function SpeakingSection() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;

  const cardHover =
    reduced || mobileTuned ? undefined : SECTION.cardHover;

  return (
    <section id="speaking" className="section-glass px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          variants={SECTION.fadeUp}
        >
          Speaking &amp; Community
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-center text-sm text-text-secondary"
          variants={SECTION.fadeUp}
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
              className="rounded-lg border border-border bg-surface-raised p-6 transition-colors"
              variants={SECTION.fadeUp}
              whileHover={cardHover}
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
