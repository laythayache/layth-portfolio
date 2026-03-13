import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bot, Mic, Users } from "lucide-react";
import { speakingEntries } from "@/content/speaking";

const EXPERIENCE_CROSS_IDS = new Set(["ai-club"]);

function getEntryIcon(id: string) {
  if (id.includes("robotics")) return Bot;
  if (id.includes("ambassador")) return Users;
  return Mic;
}

export default function SpeakingSection() {
  const reduced = useReducedMotion();

  return (
    <section id="speaking" className="section-glass section-shell px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
        }}
      >
        <motion.h2
          className="type-h2 text-center"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Speaking and Community
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Talks and initiatives focused on practical AI systems, engineering
          education, and community-first technology.
        </motion.p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {speakingEntries.map((entry) => {
            const Icon = getEntryIcon(entry.id);
            return (
              <motion.article
                key={entry.id}
                className="card-lift rounded-xl border border-border bg-surface-raised p-6"
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-surface-overlay p-2 text-accent">
                    <Icon size={17} aria-hidden />
                  </span>
                  <p className="type-caption">{entry.organization}</p>
                </div>
                <h3 className="type-h3 mt-4">{entry.title}</h3>
                <p className="mt-2 text-sm font-medium text-text-primary">
                  {entry.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {entry.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                      aria-label={`${entry.ctaLabel} (opens in a new tab)`}
                      title="Opens in a new tab"
                    >
                      {entry.ctaLabel}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                  {EXPERIENCE_CROSS_IDS.has(entry.id) && (
                    <a
                      href="#experience"
                      className="inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors hover:text-accent"
                    >
                      See in Experience Timeline
                      <ArrowRight size={11} aria-hidden />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
