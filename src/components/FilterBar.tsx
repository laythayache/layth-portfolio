import { cn } from "@/lib/utils";
import type { ProjectStatus, ProjectKind } from "@/content/types";
import { listSystems } from "@/content/projects";

interface FilterBarProps {
  status: ProjectStatus | "";
  kind: ProjectKind | "";
  system: string;
  friendOnly: boolean;
  search: string;
  onStatusChange: (v: ProjectStatus | "") => void;
  onKindChange: (v: ProjectKind | "") => void;
  onSystemChange: (v: string) => void;
  onFriendToggle: () => void;
  onSearchChange: (v: string) => void;
}

const statuses: (ProjectStatus | "")[] = [
  "",
  "completed",
  "ongoing",
  "paused",
  "idea",
];
const kinds: (ProjectKind | "")[] = [
  "",
  "mapping",
  "intervention",
  "analysis",
  "infrastructure",
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors",
        active
          ? "border-text-primary text-text-primary bg-surface-raised"
          : "border-border text-text-muted hover:text-text-secondary hover:border-border-strong"
      )}
    >
      {label}
    </button>
  );
}

export default function FilterBar({
  status,
  kind,
  system,
  friendOnly,
  search,
  onStatusChange,
  onKindChange,
  onSystemChange,
  onFriendToggle,
  onSearchChange,
}: FilterBarProps) {
  const systems = listSystems();

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full border border-border bg-transparent px-4 py-2 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-border-strong focus:outline-none"
      />

      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <Chip
            key={s || "all-status"}
            label={s || "All"}
            active={status === s}
            onClick={() => onStatusChange(s)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {kinds.map((k) => (
          <Chip
            key={k || "all-kind"}
            label={k || "All kinds"}
            active={kind === k}
            onClick={() => onKindChange(k)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip
          label="All systems"
          active={system === ""}
          onClick={() => onSystemChange("")}
        />
        {systems.map((s) => (
          <Chip
            key={s.system}
            label={`${s.system} (${s.count})`}
            active={system === s.system}
            onClick={() => onSystemChange(s.system)}
          />
        ))}
      </div>

      <div>
        <Chip
          label={friendOnly ? "Friends only ✓" : "Friends"}
          active={friendOnly}
          onClick={onFriendToggle}
        />
      </div>
    </div>
  );
}
