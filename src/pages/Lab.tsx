import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import ExploreCard from "@/components/ExploreCard";
import SystemsMap from "@/components/SystemsMap";
import GrainOverlay from "@/components/GrainOverlay";
import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, labPageJsonLd } from "@/content/siteSeo";

const tabs: { label: string; value: ProjectStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Production", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "paused" },
];

export default function Lab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reduced = useReducedMotion();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const [activeTab, setActiveTab] = useState<ProjectStatus | "">(
    (searchParams.get("status") as ProjectStatus) || ""
  );

  const filtered = useMemo(
    () =>
      activeTab
        ? projects.filter((p) => p.status === activeTab)
        : projects,
    [activeTab]
  );

  function handleTabChange(value: ProjectStatus | "") {
    setActiveTab(value);
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    setSearchParams(params, { replace: true });
  }

  return (
    <>
    <SEO
      title="The Lab | Layth Ayache"
      description="Projects, failures, iterations. Each entry documents what was tried and what I learned."
      canonical="https://laythayache.com/lab"
      keywords={DEFAULT_KEYWORDS}
      modifiedTime="2026-02-16"
      jsonLd={labPageJsonLd(filtered)}
    />
    <div className="relative -mt-16 flex min-h-screen flex-col overflow-x-hidden bg-surface">
      <GrainOverlay />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 pb-24">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            The Lab
          </h1>
          <p className="text-sm text-text-muted">
            Projects, failures, iterations. Each entry documents what was tried and what I learned.
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "relative pb-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  activeTab === tab.value
                    ? "text-text-primary"
                    : "text-text-muted hover:text-accent"
                )}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="lab-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="View mode">
            <button
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className={cn(
                "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors",
                viewMode === "list"
                  ? "bg-accent text-surface"
                  : "bg-surface-raised text-text-muted hover:text-accent"
              )}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("map")}
              aria-pressed={viewMode === "map"}
              className={cn(
                "px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors",
                viewMode === "map"
                  ? "bg-accent text-surface"
                  : "bg-surface-raised text-text-muted hover:text-accent"
              )}
            >
              Map
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                transition={{ duration: reduced ? 0.1 : 0.25, ease: [0, 0, 0.2, 1] }}
                className="mt-10 columns-1 gap-5 md:columns-2"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : i * 0.06,
                      duration: reduced ? 0.1 : 0.4,
                      ease: [0, 0, 0.2, 1],
                    }}
                    className="mb-5 break-inside-avoid"
                  >
                    <ExploreCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="mt-16 text-center font-mono text-sm text-text-muted">
                No projects in this category yet.
              </p>
            )}
          </>
        ) : (
          <div className="mt-10">
            <SystemsMap />
            <p className="mt-4 text-xs text-text-muted font-mono">
              Click on a project node to view details. Gray dots are components and technologies.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
