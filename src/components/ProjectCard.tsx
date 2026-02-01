import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";

interface ProjectCardProps {
  project: Project;
}

const statusColor: Record<string, string> = {
  completed: "text-emerald-400",
  ongoing: "text-amber-400",
  paused: "text-text-muted",
  idea: "text-sky-400",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`}>
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="group flex flex-col gap-3 border border-border p-5 transition-colors hover:border-border-strong hover:bg-surface-raised"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-sans text-base font-semibold text-text-primary">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary"
          />
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">
          {project.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span
            className={`font-mono text-xs uppercase tracking-wider ${statusColor[project.status] ?? "text-text-muted"}`}
          >
            {project.status}
          </span>
          <span className="text-text-muted">&middot;</span>
          <span className="font-mono text-xs text-text-muted">
            {project.system}
          </span>
          <span className="text-text-muted">&middot;</span>
          <span className="font-mono text-xs text-text-muted">
            {project.kind}
          </span>
          {project.friend_project && (
            <>
              <span className="text-text-muted">&middot;</span>
              <span className="font-mono text-xs text-sky-400">friend</span>
            </>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
