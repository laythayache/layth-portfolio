import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project, CardConfig, CardAccent } from "@/content/types";

interface AccentStyle {
  color: string;
  text: string;
  textMuted: string;
  bg: string;
}

const accentStyles: Record<CardAccent, AccentStyle> = {
  teal: {
    color: "#0d9488",
    text: "text-teal-700",
    textMuted: "text-teal-700/60",
    bg: "bg-teal-600/10",
  },
  amber: {
    color: "#d97706",
    text: "text-amber-700",
    textMuted: "text-amber-700/60",
    bg: "bg-amber-600/10",
  },
  emerald: {
    color: "#059669",
    text: "text-emerald-700",
    textMuted: "text-emerald-700/60",
    bg: "bg-emerald-600/10",
  },
  sky: {
    color: "#0ea5e9",
    text: "text-sky-600",
    textMuted: "text-sky-600/60",
    bg: "bg-sky-500/10",
  },
  blue: {
    color: "#2563eb",
    text: "text-blue-700",
    textMuted: "text-blue-700/60",
    bg: "bg-blue-600/10",
  },
  violet: {
    color: "#7c3aed",
    text: "text-violet-600",
    textMuted: "text-violet-600/60",
    bg: "bg-violet-600/10",
  },
  stone: {
    color: "#a8a29e",
    text: "text-stone-500",
    textMuted: "text-stone-500/60",
    bg: "bg-stone-400/10",
  },
};

const statusDot: Record<string, string> = {
  completed: "bg-emerald-600",
  ongoing: "bg-amber-600",
  paused: "bg-[#1A1A1A]/30",
  idea: "bg-sky-600",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[status] ?? "bg-[#1A1A1A]/30"}`}
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#1A1A1A]/40">
        {status}
      </span>
    </span>
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      size={14}
      className="shrink-0 text-[#1A1A1A]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1A1A1A]/60"
    />
  );
}

/* ── FEATURED ── large card with accent left border, prominent layout ── */
function Featured({
  project,
  accent,
  card,
}: {
  project: Project;
  accent: AccentStyle;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-4 border border-[#1A1A1A]/10 border-l-4 p-6 transition-colors hover:bg-[#EBE5DE]"
      style={{ borderLeftColor: accent.color }}
    >
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
        >
          {project.system}
        </span>
        <span className="text-[#1A1A1A]/20">&middot;</span>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <h3 className="font-sans text-xl font-semibold text-[#1A1A1A]">
          {project.title}
        </h3>
        {card.tagline && (
          <p className={`mt-1 font-mono text-xs tracking-wide ${accent.textMuted}`}>
            {card.tagline}
          </p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
        {project.summary}
      </p>

      {card.highlight && (
        <div className={`${accent.bg} px-4 py-3`}>
          <p className={`font-mono text-xs leading-relaxed ${accent.text}`}>
            {card.highlight}
          </p>
        </div>
      )}

      {project.friend_project && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-sky-600">
          with a friend
        </span>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#1A1A1A]/30">
          {project.kind}
        </span>
        <Arrow />
      </div>
    </motion.article>
  );
}

/* ── STANDARD ── medium card with accent top border ── */
function Standard({
  project,
  accent,
  card,
}: {
  project: Project;
  accent: AccentStyle;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-3 border border-[#1A1A1A]/10 border-t-2 p-5 transition-colors hover:bg-[#EBE5DE]"
      style={{ borderTopColor: accent.color }}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
      >
        {project.system}
      </span>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-[#1A1A1A]">
            {project.title}
          </h3>
          {card.tagline && (
            <p className={`mt-0.5 font-mono text-[10px] tracking-wide ${accent.textMuted}`}>
              {card.tagline}
            </p>
          )}
        </div>
        <Arrow />
      </div>

      <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
        {project.summary}
      </p>

      {card.highlight && (
        <p className={`font-mono text-[10px] ${accent.textMuted}`}>
          {card.highlight}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
        <StatusBadge status={project.status} />
        <span className="text-[#1A1A1A]/20">&middot;</span>
        <span className="font-mono text-[10px] text-[#1A1A1A]/30">
          {project.kind}
        </span>
        {project.friend_project && (
          <>
            <span className="text-[#1A1A1A]/20">&middot;</span>
            <span className="font-mono text-[10px] text-sky-600">friend</span>
          </>
        )}
      </div>
    </motion.article>
  );
}

/* ── HIGHLIGHT ── centered quote/stat hero, then metadata below ── */
function Highlight({
  project,
  accent,
  card,
}: {
  project: Project;
  accent: AccentStyle;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-4 border border-[#1A1A1A]/10 p-6 transition-colors hover:bg-[#EBE5DE]"
    >
      {card.highlight && (
        <blockquote className="font-sans text-lg font-medium leading-snug text-[#1A1A1A]/80">
          &ldquo;{card.highlight}&rdquo;
        </blockquote>
      )}

      <div className="h-px bg-[#1A1A1A]/10" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-[#1A1A1A]">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
            >
              {project.system}
            </span>
            <span className="text-[#1A1A1A]/20">&middot;</span>
            <StatusBadge status={project.status} />
            {project.friend_project && (
              <>
                <span className="text-[#1A1A1A]/20">&middot;</span>
                <span className="font-mono text-[10px] text-sky-600">
                  with a friend
                </span>
              </>
            )}
          </div>
        </div>
        <Arrow />
      </div>
    </motion.article>
  );
}

/* ── MINIMAL ── compact, subdued, for paused/background projects ── */
function Minimal({
  project,
  accent,
}: {
  project: Project;
  accent: AccentStyle;
}) {
  return (
    <motion.article
      whileHover={{ y: -1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="flex items-center justify-between border border-[#1A1A1A]/10 p-4 opacity-60 transition-all hover:bg-[#EBE5DE]"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm font-semibold text-[#1A1A1A]">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[10px] uppercase tracking-wider ${accent.text}`}
          >
            {project.system}
          </span>
          <span className="text-[#1A1A1A]/15">&middot;</span>
          <StatusBadge status={project.status} />
        </div>
      </div>
      <Arrow />
    </motion.article>
  );
}

/* ── CONCEPTUAL ── dashed border, idea-stage feel ── */
function Conceptual({
  project,
  accent,
  card,
}: {
  project: Project;
  accent: AccentStyle;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-3 border border-dashed p-5 transition-colors hover:bg-[#EBE5DE]"
      style={{ borderColor: `${accent.color}40` }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
        >
          concept
        </span>
        <Arrow />
      </div>

      <h3 className="font-sans text-base font-semibold text-[#1A1A1A]">
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed text-[#1A1A1A]/50">
        {project.summary}
      </p>

      {card.highlight && (
        <p className={`font-mono text-[10px] italic ${accent.textMuted}`}>
          {card.highlight}
        </p>
      )}

      <span className="font-mono text-[10px] uppercase tracking-wider text-[#1A1A1A]/30">
        {project.system}
      </span>
    </motion.article>
  );
}

/* ── MAIN EXPORT ── */
export default function ExploreCard({ project }: { project: Project }) {
  const card = project.card;
  const variant = card?.variant ?? "standard";
  const accent = accentStyles[card?.accent ?? "stone"];
  const c: CardConfig = card ?? {
    accent: "stone",
    size: "md",
    variant: "standard",
  };

  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      {variant === "featured" && (
        <Featured project={project} accent={accent} card={c} />
      )}
      {variant === "standard" && (
        <Standard project={project} accent={accent} card={c} />
      )}
      {variant === "highlight" && (
        <Highlight project={project} accent={accent} card={c} />
      )}
      {variant === "minimal" && (
        <Minimal project={project} accent={accent} />
      )}
      {variant === "conceptual" && (
        <Conceptual project={project} accent={accent} card={c} />
      )}
    </Link>
  );
}
