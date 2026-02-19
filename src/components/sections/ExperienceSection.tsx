import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronDown,
  HeartPulse,
  RadioTower,
  Users,
} from "lucide-react";
import { experience, type ExperienceEntry } from "@/content/experience";

function getYear(value: string) {
  const match = value.match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : 0;
}

function getRoleIcon(entry: ExperienceEntry) {
  if (entry.role.toLowerCase().includes("medical")) return HeartPulse;
  if (entry.role.toLowerCase().includes("network")) return RadioTower;
  if (entry.role.toLowerCase().includes("ambassador")) return Users;
  return BriefcaseBusiness;
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();
  const grouped = useMemo(() => {
    const bucket = new Map<number, ExperienceEntry[]>();
    for (const item of experience) {
      const year = getYear(item.dateStart);
      const list = bucket.get(year) ?? [];
      list.push(item);
      bucket.set(year, list);
    }
    return Array.from(bucket.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, entries]) => ({ year, entries }));
  }, []);

  const [openYears, setOpenYears] = useState<string[]>(
    grouped[0] ? [String(grouped[0].year)] : []
  );

  function toggleYear(year: number) {
    const id = String(year);
    setOpenYears((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const totalEntries = experience.length;
  const coveredYears = grouped.length;
  const domains = new Set(experience.map((item) => item.type)).size;

  return (
    <section id="experience" className="section-glass section-shell px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="type-h2 text-center"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Experience Timeline
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Built across consulting, data science, telecom infrastructure, and
          community leadership. Expand a year to explore the details.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface-raised p-4">
            <p className="type-caption">Roles</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {totalEntries}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-4">
            <p className="type-caption">Years Covered</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {coveredYears}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-4">
            <p className="type-caption">Engagement Types</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {domains}
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {grouped.map((group, groupIndex) => {
            const isOpen = openYears.includes(String(group.year));
            return (
              <motion.section
                key={group.year}
                className="rounded-2xl border border-border bg-surface-raised"
                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.35,
                  delay: reduced ? 0 : groupIndex * 0.04,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => toggleYear(group.year)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-year-${group.year}`}
                >
                  <div>
                    <p className="type-caption">Year</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">
                      {group.year}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-border-strong bg-surface px-3 py-1 text-sm text-text-secondary">
                      {group.entries.length} roles
                    </span>
                    <ChevronDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      size={18}
                      aria-hidden
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`experience-year-${group.year}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4 border-t border-border p-5 md:grid-cols-2">
                        {group.entries.map((entry) => {
                          const Icon = getRoleIcon(entry);
                          return (
                            <article
                              key={entry.id}
                              className="timeline-card-surface rounded-xl border border-border bg-surface p-5"
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5 rounded-lg bg-accent/12 p-2 text-accent">
                                  <Icon size={16} aria-hidden />
                                </span>
                                <div>
                                  <h3 className="type-h3 text-[1.25rem]">
                                    {entry.role}
                                  </h3>
                                  <p className="mt-1 text-base font-medium text-text-primary">
                                    {entry.company}
                                  </p>
                                  <p className="mt-1 text-sm text-text-secondary">
                                    {entry.dateStart} - {entry.dateEnd} ·{" "}
                                    {entry.location}
                                  </p>
                                </div>
                              </div>

                              <ul className="mt-4 list-disc space-y-2 pl-5">
                                {entry.bullets.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className="text-base leading-relaxed text-text-secondary"
                                  >
                                    {bullet}
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-4 flex flex-wrap gap-2">
                                {entry.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
