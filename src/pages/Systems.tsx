import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { listSystems } from "@/content/projects";

export default function Systems() {
  const systems = listSystems();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-semibold text-text-primary">
          Systems
        </h1>
        <p className="text-sm text-text-secondary">
          The domains these projects operate in.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {systems.map(({ system, count }) => (
          <Link
            key={system}
            to={`/systems/${system}`}
            className="group flex items-center justify-between border border-border p-4 transition-colors hover:border-border-strong hover:bg-surface-raised"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-text-primary">
                {system}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {count} project{count !== 1 ? "s" : ""}
              </span>
            </div>
            <ArrowRight
              size={14}
              className="text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-text-secondary"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
