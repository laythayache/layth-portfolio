import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { experience, type ExperienceEntry } from "@/content/experience";

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

function TimelineCard({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const reduced = useReducedMotion();
  const isLeft = index % 2 === 0;

  return (
    <div
      className={cn(
        "relative grid grid-cols-[24px_1fr] gap-4 md:grid-cols-[1fr_24px_1fr] md:gap-6",
      )}
    >
      {/* Left card (desktop only) */}
      <div
        className={cn(
          "hidden md:block",
          isLeft ? "" : "pointer-events-none",
        )}
      >
        {isLeft && (
          <motion.div
            className="rounded-lg border border-border bg-surface-raised p-6 shadow-sm"
            initial={reduced ? undefined : "hiddenLeft"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
          >
            <CardContent entry={entry} />
          </motion.div>
        )}
      </div>

      {/* Center dot (desktop) */}
      <div className="relative hidden items-start justify-center md:flex">
        <motion.div
          className="z-10 mt-2 h-3 w-3 rounded-full border-2 border-surface-raised bg-accent"
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={dotVariants}
          transition={{ delay: index * 0.1 }}
        />
      </div>

      {/* Right card (desktop only) */}
      <div
        className={cn(
          "hidden md:block",
          !isLeft ? "" : "pointer-events-none",
        )}
      >
        {!isLeft && (
          <motion.div
            className="rounded-lg border border-border bg-surface-raised p-6 shadow-sm"
            initial={reduced ? undefined : "hiddenRight"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
          >
            <CardContent entry={entry} />
          </motion.div>
        )}
      </div>

      {/* Mobile layout: dot + card on right */}
      <div className="relative flex items-start justify-center md:hidden">
        <motion.div
          className="z-10 mt-2 h-3 w-3 rounded-full border-2 border-surface-raised bg-accent"
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={dotVariants}
          transition={{ delay: index * 0.1 }}
        />
      </div>

      <div className="md:hidden">
        <motion.div
          className="rounded-lg border border-border bg-surface-raised p-6 shadow-sm"
          initial={reduced ? undefined : "hiddenRight"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardVariants}
          transition={{ delay: index * 0.1 }}
        >
          <CardContent entry={entry} />
        </motion.div>
      </div>
    </div>
  );
}

function CardContent({ entry }: { entry: ExperienceEntry }) {
  return (
    <div>
      <p className="font-semibold text-text-primary">{entry.company}</p>
      <p className="text-sm text-text-secondary">{entry.role}</p>
      <p className="mt-1 font-mono text-xs text-text-muted">
        {entry.dateStart} &ndash; {entry.dateEnd} &middot; {entry.location}
      </p>
      <span className="mt-2 inline-block rounded border border-border-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {entry.type}
      </span>

      <ul className="mt-3 list-disc space-y-1 pl-4">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-text-secondary">
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {entry.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          Experience
        </motion.h2>

        <div className="relative mt-16">
          {/* Vertical timeline line — center on desktop, left on mobile */}
          <div className="absolute left-[11px] top-0 h-full w-0.5 bg-border-strong md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((entry, index) => (
              <TimelineCard key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
