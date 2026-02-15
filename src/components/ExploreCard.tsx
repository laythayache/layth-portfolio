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
    color: "#2dd4bf",
    text: "text-teal-400",
    textMuted: "text-teal-400/60",
    bg: "bg-teal-400/10",
  },
  amber: {
    color: "#fbbf24",
    text: "text-amber-400",
    textMuted: "text-amber-400/60",
    bg: "bg-amber-400/10",
  },
  emerald: {
    color: "#34d399",
    text: "text-emerald-400",
    textMuted: "text-emerald-400/60",
    bg: "bg-emerald-400/10",
  },
  sky: {
    color: "#38bdf8",
    text: "text-sky-400",
    textMuted: "text-sky-400/60",
    bg: "bg-sky-400/10",
  },
  blue: {
    color: "#60a5fa",
    text: "text-blue-400",
    textMuted: "text-blue-400/60",
    bg: "bg-blue-400/10",
  },
  violet: {
    color: "#a78bfa",
    text: "text-violet-400",
    textMuted: "text-violet-400/60",
    bg: "bg-violet-400/10",
  },
  stone: {
    color: "#a8a29e",
    text: "text-stone-400",
    textMuted: "text-stone-400/60",
    bg: "bg-stone-400/10",
  },
};

const statusDot: Record<string, string> = {
  completed: "bg-emerald-400",
  ongoing: "bg-amber-400",
  paused: "bg-text-primary/30",
  idea: "bg-sky-400",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[status] ?? "bg-text-primary/30"}`}
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {status}
      </span>
    </span>
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      size={14}
      className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary"
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
      className="flex flex-col gap-4 border border-border border-l-4 p-6 transition-colors hover:bg-surface-raised"
      style={{ borderLeftColor: accent.color }}
    >
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
        >
          {project.system}
        </span>
        <span className="text-text-muted/40">&middot;</span>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <h3 className="font-sans text-xl font-semibold text-text-primary">
          {project.title}
        </h3>
        {card.tagline && (
          <p className={`mt-1 font-mono text-xs tracking-wide ${accent.textMuted}`}>
            {card.tagline}
          </p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-text-secondary">
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
        <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
          with a friend
        </span>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
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
      className="flex flex-col gap-3 border border-border border-t-2 p-6 transition-colors hover:bg-surface-raised"
      style={{ borderTopColor: accent.color }}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
      >
        {project.system}
      </span>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
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

      <p className="text-sm leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      {card.highlight && (
        <p className={`font-mono text-[10px] ${accent.textMuted}`}>
          {card.highlight}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
        <StatusBadge status={project.status} />
        <span className="text-text-muted/40">&middot;</span>
        <span className="font-mono text-[10px] text-text-muted">
          {project.kind}
        </span>
        {project.friend_project && (
          <>
            <span className="text-text-muted/40">&middot;</span>
            <span className="font-mono text-[10px] text-sky-400">friend</span>
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
      className="flex flex-col gap-4 border border-border p-6 transition-colors hover:bg-surface-raised"
    >
      {card.highlight && (
        <blockquote className="font-sans text-lg font-medium leading-snug text-text-secondary">
          &ldquo;{card.highlight}&rdquo;
        </blockquote>
      )}

      <div className="h-px bg-border" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent.text}`}
            >
              {project.system}
            </span>
            <span className="text-text-muted/40">&middot;</span>
            <StatusBadge status={project.status} />
            {project.friend_project && (
              <>
                <span className="text-text-muted/40">&middot;</span>
                <span className="font-mono text-[10px] text-sky-400">
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
      className="flex items-center justify-between border border-border p-4 opacity-60 transition-all hover:bg-surface-raised"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm font-semibold text-text-primary">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[10px] uppercase tracking-wider ${accent.text}`}
          >
            {project.system}
          </span>
          <span className="text-text-muted/30">&middot;</span>
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
      className="flex flex-col gap-3 border border-dashed p-6 transition-colors hover:bg-surface-raised"
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

      <h3 className="font-sans text-base font-semibold text-text-primary">
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed text-text-muted">
        {project.summary}
      </p>

      {card.highlight && (
        <p className={`font-mono text-[10px] italic ${accent.textMuted}`}>
          {card.highlight}
        </p>
      )}

      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
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
