import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";

export default function SystemCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 border border-[#1A1A1A]/10 p-6 transition-colors hover:border-[#1A1A1A]/25 hover:bg-[#EBE5DE]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-sans text-xl font-semibold text-[#1A1A1A] mb-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/40">
            {project.system}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-[#1A1A1A]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1A1A1A]/60"
        />
      </div>

      <p className="text-base leading-relaxed text-[#1A1A1A]/70">
        {project.summary}
      </p>

      {project.card?.highlight && (
        <div className="border-l-2 border-[#1A1A1A]/20 pl-4">
          <p className="font-mono text-xs text-[#1A1A1A]/50">
            {project.card.highlight}
          </p>
        </div>
      )}

      <div className="mt-auto pt-2 flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/30">
          {project.kind}
        </span>
        <span className="text-[#1A1A1A]/20">&middot;</span>
        <span className="font-mono text-xs text-[#1A1A1A]/30">
          {project.status}
        </span>
      </div>
    </Link>
  );
}
