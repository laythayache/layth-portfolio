import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import ExploreCard from "@/components/ExploreCard";

const tabs: { label: string; value: ProjectStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Paused", value: "paused" },
  { label: "Ideas", value: "idea" },
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reduced = useReducedMotion();

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
    <div className="relative -mt-16 flex min-h-screen flex-col overflow-x-hidden bg-[#F2EDE8]">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 pb-24">
        {/* Tab bar */}
        <div className="flex items-center gap-6 border-b border-[#1A1A1A]/10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                "relative pb-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                activeTab === tab.value
                  ? "text-[#1A1A1A]"
                  : "text-[#1A1A1A]/35 hover:text-[#1A1A1A]/60"
              )}
            >
              {tab.label}
              {activeTab === tab.value && (
                <motion.div
                  layoutId="explore-tab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#1A1A1A]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
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
          <p className="mt-16 text-center font-mono text-sm text-[#1A1A1A]/40">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
