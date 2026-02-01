import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterProjects } from "@/content/projects";
import type { ProjectStatus, ProjectKind } from "@/content/types";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState<ProjectStatus | "">(
    (searchParams.get("status") as ProjectStatus) || ""
  );
  const [kind, setKind] = useState<ProjectKind | "">(
    (searchParams.get("kind") as ProjectKind) || ""
  );
  const [system, setSystem] = useState(searchParams.get("system") || "");
  const [friendOnly, setFriendOnly] = useState(
    searchParams.get("friends") === "true"
  );
  const [search, setSearch] = useState(searchParams.get("q") || "");

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    setSearchParams(params, { replace: true });
  }

  const filtered = useMemo(
    () =>
      filterProjects({
        status: status || undefined,
        kind: kind || undefined,
        system: system || undefined,
        friendOnly: friendOnly || undefined,
        search: search || undefined,
      }),
    [status, kind, system, friendOnly, search]
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-semibold text-text-primary">
          Explore
        </h1>
        <p className="text-sm text-text-secondary">
          All projects, filtered by what matters.
        </p>
      </div>

      <FilterBar
        status={status}
        kind={kind}
        system={system}
        friendOnly={friendOnly}
        search={search}
        onStatusChange={(v) => {
          setStatus(v);
          updateParams({ status: v });
        }}
        onKindChange={(v) => {
          setKind(v);
          updateParams({ kind: v });
        }}
        onSystemChange={(v) => {
          setSystem(v);
          updateParams({ system: v });
        }}
        onFriendToggle={() => {
          const next = !friendOnly;
          setFriendOnly(next);
          updateParams({ friends: next ? "true" : "" });
        }}
        onSearchChange={(v) => {
          setSearch(v);
          updateParams({ q: v });
        }}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center font-mono text-sm text-text-muted">
          No projects match these filters.
        </p>
      )}
    </div>
  );
}
