import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  RadioTower,
} from "lucide-react";
import { experience, type ExperienceEntry } from "@/content/experience";

const SPEAKING_CROSS_IDS = new Set(["rhu"]);

function getYear(value: string) {
  const match = value.match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : 0;
}

function getRoleIcon(entry: ExperienceEntry) {
  if (entry.role.toLowerCase().includes("network")) return RadioTower;
  return BriefcaseBusiness;
}

interface TimelineItem {
  type: "year";
  year: number;
  count: number;
}

interface TimelineEntry {
  type: "entry";
  entry: ExperienceEntry;
  side: "left" | "right";
  globalIndex: number;
}

type TimelineNode = TimelineItem | TimelineEntry;

export default function ExperienceSection() {
  const reduced = useReducedMotion();

  const { nodes, totalEntries, coveredYears, domains } = useMemo(() => {
    const bucket = new Map<number, ExperienceEntry[]>();
    for (const item of experience) {
      const year = getYear(item.dateStart);
      const list = bucket.get(year) ?? [];
      list.push(item);
      bucket.set(year, list);
    }
    const groups = Array.from(bucket.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, entries]) => ({ year, entries }));

    const result: TimelineNode[] = [];
    let gi = 0;
    for (const group of groups) {
      result.push({ type: "year", year: group.year, count: group.entries.length });
      for (const entry of group.entries) {
        result.push({
          type: "entry",
          entry,
          side: gi % 2 === 0 ? "left" : "right",
          globalIndex: gi,
        });
        gi++;
      }
    }

    return {
      nodes: result,
      totalEntries: experience.length,
      coveredYears: groups.length,
      domains: new Set(experience.map((item) => item.type)).size,
    };
  }, []);

  return (
    <section id="experience" className="section-glass section-shell px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
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
          transition={{
            duration: 0.35,
            delay: 0.05,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          Built across AI engineering, data science, telecom infrastructure,
          and technical consulting.
        </motion.p>

        {/* Stats */}
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

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Center vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent lg:left-1/2 lg:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {nodes.map((node, i) => {
              if (node.type === "year") {
                return (
                  <YearMarker
                    key={`year-${node.year}`}
                    year={node.year}
                    count={node.count}
                    reduced={reduced}
                    index={i}
                  />
                );
              }

              return (
                <TimelineCard
                  key={node.entry.id}
                  entry={node.entry}
                  side={node.side}
                  reduced={reduced}
                  index={node.globalIndex}
                />
              );
            })}
          </div>

          {/* End cap */}
          <div className="relative flex justify-start lg:justify-center" aria-hidden="true">
            <div className="ml-[13px] h-3 w-3 rounded-full border-2 border-accent/40 bg-surface lg:ml-0" />
          </div>
        </div>

        {/* Beyond Tech link */}
        <div className="mt-10 text-center">
          <Link
            to="/beyond-tech"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-raised px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Beyond Tech — Community & Volunteer Roles
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Year marker on the timeline ── */
function YearMarker({
  year,
  count,
  reduced,
  index,
}: {
  year: number;
  count: number;
  reduced: boolean | null;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex items-center py-6"
      initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: reduced ? 0 : index * 0.02,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {/* Mobile: left-aligned badge */}
      <div className="relative z-10 flex items-center gap-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-surface shadow-[0_0_12px_rgba(var(--color-accent-rgb,7,108,100),0.25)] lg:h-10 lg:w-10">
          <span className="text-xs font-bold text-accent lg:text-sm">
            {String(year).slice(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 lg:absolute lg:left-full lg:ml-4 lg:whitespace-nowrap">
          <span className="text-lg font-bold text-text-primary lg:text-xl">
            {year}
          </span>
          <span className="rounded-full border border-border-strong bg-surface-raised px-2.5 py-0.5 text-xs text-text-muted">
            {count} {count === 1 ? "role" : "roles"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Experience card on the timeline ── */
function TimelineCard({
  entry,
  side,
  reduced,
  index,
}: {
  entry: ExperienceEntry;
  side: "left" | "right";
  reduced: boolean | null;
  index: number;
}) {
  const Icon = getRoleIcon(entry);
  const isLeft = side === "left";

  return (
    <div
      className={`relative grid grid-cols-[32px_1fr] gap-4 py-3 lg:grid-cols-[1fr_32px_1fr] lg:gap-6 ${
        isLeft ? "" : ""
      }`}
    >
      {/* Desktop left card or spacer */}
      <div className={`hidden lg:block ${isLeft ? "" : ""}`}>
        {isLeft ? (
          <CardContent
            entry={entry}
            Icon={Icon}
            side="left"
            reduced={reduced}
            index={index}
          />
        ) : (
          <div />
        )}
      </div>

      {/* Center dot */}
      <div className="relative flex justify-center" aria-hidden="true">
        <motion.div
          className="mt-5 h-3 w-3 rounded-full border-2 border-accent bg-surface shadow-[0_0_8px_rgba(var(--color-accent-rgb,7,108,100),0.2)]"
          initial={reduced ? undefined : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{
            duration: 0.3,
            delay: reduced ? 0 : 0.1,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </div>

      {/* Desktop right card or spacer + mobile card */}
      <div>
        {/* Mobile: always show here */}
        <div className="lg:hidden">
          <CardContent
            entry={entry}
            Icon={Icon}
            side="right"
            reduced={reduced}
            index={index}
          />
        </div>
        {/* Desktop right */}
        <div className="hidden lg:block">
          {!isLeft ? (
            <CardContent
              entry={entry}
              Icon={Icon}
              side="right"
              reduced={reduced}
              index={index}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── The actual card content ── */
function CardContent({
  entry,
  Icon,
  side,
  reduced,
  index,
}: {
  entry: ExperienceEntry;
  Icon: typeof BriefcaseBusiness;
  side: "left" | "right";
  reduced: boolean | null;
  index: number;
}) {
  const slideX = side === "left" ? 40 : -40;

  return (
    <motion.article
      className="group relative rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-accent/40"
      initial={reduced ? undefined : { opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : index * 0.03,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {/* Connector arrow pointing toward center line */}
      <div
        className={`absolute top-6 hidden h-px w-6 bg-border group-hover:bg-accent/40 transition-colors lg:block ${
          side === "left" ? "-right-6" : "-left-6"
        }`}
        aria-hidden="true"
      />

      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-accent/12 p-2 text-accent">
          <Icon size={16} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="type-h3 text-[1.1rem] leading-snug">{entry.role}</h3>
          <p className="mt-1 text-sm font-medium text-text-primary">
            {entry.company}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {entry.dateStart} - {entry.dateEnd} · {entry.location}
          </p>
        </div>
      </div>

      <ul className="mt-4 list-disc space-y-1.5 pl-5">
        {entry.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-sm leading-relaxed text-text-secondary"
          >
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {entry.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent"
          >
            {skill}
          </span>
        ))}
      </div>

      {SPEAKING_CROSS_IDS.has(entry.id) && (
        <a
          href="#speaking"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors hover:text-accent"
        >
          Also in Speaking & Community
          <ArrowRight size={11} aria-hidden />
        </a>
      )}
    </motion.article>
  );
}
