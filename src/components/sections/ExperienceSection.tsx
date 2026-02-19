import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { experience, type ExperienceEntry } from "@/content/experience";
import { useMediaQuery } from "@/motion/useMediaQuery";

function ExperienceCard({
  entry,
  mobileTuned,
}: {
  entry: ExperienceEntry;
  mobileTuned: boolean;
}) {
  return (
    <article
      className={cn(
        "timeline-card-surface rounded-xl border border-border bg-surface-raised p-6 shadow-sm",
        mobileTuned ? "p-5" : "p-7"
      )}
    >
      <h3 className="text-lg font-semibold text-text-primary">{entry.company}</h3>
      <p className="mt-1 text-base text-text-secondary">{entry.role}</p>
      <p className="mt-2 font-mono text-sm text-text-muted">
        {entry.dateStart} - {entry.dateEnd} / {entry.location}
      </p>
      <span className="mt-3 inline-block rounded border border-border-strong bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-text-muted">
        {entry.type}
      </span>

      <ul className="mt-4 list-disc space-y-2 pl-5">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="text-base leading-relaxed text-text-secondary">
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {entry.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;

  return (
    <section id="experience" className="section-glass section-shell px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary md:text-4xl"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Experience
        </motion.h2>

        <div className="relative mt-14">
          <div
            className="absolute bottom-0 left-[13px] top-0 w-px bg-border-strong md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-10 md:space-y-14">
            {experience.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={entry.id}
                  className="relative grid grid-cols-[28px_1fr] gap-4 md:grid-cols-[1fr_44px_1fr] md:gap-8"
                >
                  <div className={cn("hidden md:block", isLeft ? "" : "invisible")} aria-hidden={!isLeft}>
                    <motion.div
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <ExperienceCard entry={entry} mobileTuned={mobileTuned} />
                    </motion.div>
                  </div>

                  <div className="relative flex items-start justify-center">
                    <span className="z-10 mt-3 h-3.5 w-3.5 rounded-full border-2 border-surface-raised bg-accent shadow-[0_0_0_4px_rgb(37_99_235_/_0.14)]" />
                  </div>

                  <div className={cn("hidden md:block", isLeft ? "invisible" : "")} aria-hidden={isLeft}>
                    <motion.div
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <ExperienceCard entry={entry} mobileTuned={mobileTuned} />
                    </motion.div>
                  </div>

                  <div className="md:hidden">
                    <motion.div
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <ExperienceCard entry={entry} mobileTuned={mobileTuned} />
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
