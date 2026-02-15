import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project, CardConfig } from "@/content/types";

const statusDot: Record<string, string> = {
  completed: "bg-accent",
  ongoing: "bg-accent/60",
  paused: "bg-text-muted/30",
  idea: "bg-accent/30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[status] ?? "bg-text-muted/30"}`}
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
      className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
    />
  );
}

/* ── FEATURED ── large card with bronze left border ── */
function Featured({
  project,
  card,
}: {
  project: Project;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-4 border border-border border-l-4 border-l-accent p-6 transition-colors hover:bg-surface-raised"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
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
          <p className="mt-1 font-mono text-xs tracking-wide text-accent/60">
            {card.tagline}
          </p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      {card.highlight && (
        <div className="bg-accent/5 px-4 py-3">
          <p className="font-mono text-xs leading-relaxed text-accent">
            {card.highlight}
          </p>
        </div>
      )}

      {project.friend_project && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-accent/60">
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

/* ── STANDARD ── medium card with bronze top border ── */
function Standard({
  project,
  card,
}: {
  project: Project;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-3 border border-border border-t-2 border-t-accent p-6 transition-colors hover:bg-surface-raised"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
        {project.system}
      </span>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
            {project.title}
          </h3>
          {card.tagline && (
            <p className="mt-0.5 font-mono text-[10px] tracking-wide text-accent/60">
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
        <p className="font-mono text-[10px] text-accent/60">
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
            <span className="font-mono text-[10px] text-accent/60">friend</span>
          </>
        )}
      </div>
    </motion.article>
  );
}

/* ── HIGHLIGHT ── centered quote/stat hero, then metadata below ── */
function Highlight({
  project,
  card,
}: {
  project: Project;
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

      <div className="h-px bg-accent/20" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold text-text-primary">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {project.system}
            </span>
            <span className="text-text-muted/40">&middot;</span>
            <StatusBadge status={project.status} />
            {project.friend_project && (
              <>
                <span className="text-text-muted/40">&middot;</span>
                <span className="font-mono text-[10px] text-accent/60">
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
}: {
  project: Project;
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
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
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
  card,
}: {
  project: Project;
  card: CardConfig;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="flex flex-col gap-3 border border-dashed border-accent/30 p-6 transition-colors hover:bg-surface-raised"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
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
        <p className="font-mono text-[10px] italic text-accent/60">
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
  const c: CardConfig = card ?? {
    accent: "stone",
    size: "md",
    variant: "standard",
  };

  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      {variant === "featured" && (
        <Featured project={project} card={c} />
      )}
      {variant === "standard" && (
        <Standard project={project} card={c} />
      )}
      {variant === "highlight" && (
        <Highlight project={project} card={c} />
      )}
      {variant === "minimal" && (
        <Minimal project={project} />
      )}
      {variant === "conceptual" && (
        <Conceptual project={project} card={c} />
      )}
    </Link>
  );
}
