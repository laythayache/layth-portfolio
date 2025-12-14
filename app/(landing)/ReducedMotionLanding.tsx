"use client";

import Link from "next/link";
import { setReducedMotion } from "./landingPrefs";
import { PILLARS, getPillarNaming } from "./_3d/pillars";

const PILLAR_COLORS: Record<string, string> = {
  perception: "#35FFB8",
  execution: "#FFB020",
  representation: "#7A5CFF",
  coordination: "#2DA8FF",
  failure: "#FF2D2D",
};

export default function ReducedMotionLanding() {
  // If this component is rendered, reduced motion is active
  const reducedMotionEnabled = true;

  const handleToggle = () => {
    // Disable reduced motion and reload to show full landing
    setReducedMotion(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl uppercase mb-2">Reality Resilience</h1>
          <p className="text-sm text-gray-400">System Interface — Reduced Motion Mode</p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PILLARS.map((pillar) => {
            const color = PILLAR_COLORS[pillar.id];
            const naming = getPillarNaming(pillar.id);

            return (
              <Link
                key={pillar.id}
                href={`/system/${pillar.id}`}
                className="block border-2 border-white p-6 hover:border-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex flex-col">
                    {/* Primary Name */}
                    <h2
                      className="text-lg uppercase font-mono tracking-widest"
                      style={{
                        color: color,
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                      }}
                    >
                      {naming.primaryName}
                    </h2>
                    {/* Subtitle */}
                    <div
                      className="text-xs uppercase font-mono text-gray-400"
                      style={{
                        letterSpacing: "0.2em",
                      }}
                    >
                      {naming.subtitle}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">View subsystem →</div>
              </Link>
            );
          })}
        </div>

        {/* Toggle Control */}
        <div className="border-t border-gray-800 pt-6">
          <button
            onClick={handleToggle}
            className="text-sm uppercase border-2 border-white px-4 py-2 bg-black hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Toggle reduced motion mode"
            aria-pressed={reducedMotionEnabled}
          >
            Reduced Motion: {reducedMotionEnabled ? "ON" : "OFF"}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {reducedMotionEnabled
              ? "Disable to return to full interface"
              : "Enable for simplified, low-motion interface"}
          </p>
        </div>
      </div>
    </div>
  );
}
