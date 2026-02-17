import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { experience, type ExperienceEntry } from "@/content/experience";
import { MOTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

type CardSide = "left" | "right" | "mobile";
type CardRevealCustom = {
  index: number;
  side: CardSide;
  reduced: boolean;
  compact: boolean;
};

const timelineMotion = MOTION.homepage.timeline;

const cardVariants = {
  hidden: ({ side, reduced, compact }: CardRevealCustom) => {
    const xOffset =
      reduced || compact
        ? side === "mobile"
          ? 10
          : 0
        : side === "left"
          ? -42
          : side === "right"
            ? 42
            : 20;
    return {
      opacity: 0,
      x: xOffset,
      y: reduced ? 0 : compact ? 8 : 14,
      scale: reduced ? 1 : compact ? 0.994 : 0.985,
      filter: reduced || compact ? "blur(0px)" : "blur(2px)",
    };
  },
  visible: ({ index, compact }: CardRevealCustom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: compact ? 0.44 : 0.54,
      delay:
        timelineMotion.revealBaseDelay +
        index * (compact ? timelineMotion.revealStagger * 0.72 : timelineMotion.revealStagger),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: ({ index, compact }: { index: number; compact: boolean }) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: compact ? 0.24 : 0.32,
      delay:
        timelineMotion.revealBaseDelay +
        index * (compact ? timelineMotion.revealStagger * 0.7 : timelineMotion.revealStagger) +
        (compact ? 0.02 : 0.05),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function TimelineCard({
  entry,
  index,
  mobileTuned,
}: {
  entry: ExperienceEntry;
  index: number;
  mobileTuned: boolean;
}) {
  const reduced = useReducedMotion();
  const isLeft = index % 2 === 0;
  const desktopHover =
    reduced || mobileTuned
      ? undefined
      : {
          y: timelineMotion.cardHoverY,
          boxShadow: "0 18px 36px rgb(15 23 42 / 0.12)",
          borderColor: "rgb(var(--accent) / 0.28)",
        };
  const desktopTap = reduced
    ? undefined
    : mobileTuned
      ? undefined
      : { scale: timelineMotion.cardTapScale };

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
            className="timeline-card-surface rounded-lg border border-border bg-surface-raised p-6 shadow-sm transition-colors"
            initial={reduced ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            custom={{ index, side: "left", reduced, compact: mobileTuned }}
            whileHover={desktopHover}
            whileTap={desktopTap}
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
          custom={{ index, compact: mobileTuned }}
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
            className="timeline-card-surface rounded-lg border border-border bg-surface-raised p-6 shadow-sm transition-colors"
            initial={reduced ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            custom={{ index, side: "right", reduced, compact: mobileTuned }}
            whileHover={desktopHover}
            whileTap={desktopTap}
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
          custom={{ index, compact: mobileTuned }}
        />
      </div>

      <div className="md:hidden">
        <motion.div
          className="timeline-card-surface rounded-lg border border-border bg-surface-raised p-6 shadow-sm transition-colors"
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardVariants}
          custom={{ index, side: "mobile", reduced, compact: mobileTuned }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 35%"],
  });

  const progressRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressScaleY = useSpring(progressRaw, {
    ...timelineMotion.lineSpring,
    stiffness: mobileTuned ? 100 : timelineMotion.lineSpring.stiffness,
    damping: mobileTuned ? 30 : timelineMotion.lineSpring.damping,
  });

  return (
    <section ref={sectionRef} id="experience" className="section-glass px-6 py-24 md:py-32">
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
          {/* Vertical timeline line on desktop center and mobile left */}
          <div className="absolute left-[11px] top-0 h-full w-0.5 bg-border-strong md:left-1/2 md:-translate-x-1/2" />

          {!reduced && (
            <motion.div
              className="timeline-progress-line absolute left-[11px] top-0 h-full w-0.5 origin-top bg-accent md:left-1/2 md:-translate-x-1/2"
              style={{ scaleY: progressScaleY }}
              aria-hidden
            />
          )}

          <div className="space-y-10">
            {experience.map((entry, index) => (
              <TimelineCard
                key={entry.id}
                entry={entry}
                index={index}
                mobileTuned={mobileTuned}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
