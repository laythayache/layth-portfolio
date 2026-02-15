import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";

export default function SystemCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 border border-border border-l-2 border-l-accent/40 p-6 transition-colors hover:border-accent/60"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-xl font-semibold text-text-primary mb-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {project.system}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>

      <p className="text-base leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      {project.outcome && (
        <div className="border-l-2 border-accent/40 pl-4">
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
            Outcome
          </p>
          <p className="text-sm text-text-secondary font-semibold">
            {project.outcome}
          </p>
        </div>
      )}

      {project.card?.highlight && (
        <div className="border-l-2 border-accent/40 pl-4">
          <p className="font-mono text-xs text-text-muted">
            {project.card.highlight}
          </p>
        </div>
      )}

      <div className="mt-auto pt-2 flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {project.kind}
        </span>
        <span className="text-text-muted/40">&middot;</span>
        <span className="font-mono text-xs text-text-muted">
          {project.status}
        </span>
      </div>
    </Link>
  );
}
