"use client";

import Link from "next/link";
import { setReducedMotion, getReducedMotion } from "./landingPrefs";
import { useState, useEffect } from "react";

const PILLAR_COLORS: Record<string, string> = {
  perception: "#35FFB8",
  execution: "#FFB020",
  representation: "#7A5CFF",
  coordination: "#2DA8FF",
  failure: "#FF2D2D",
};

const PILLAR_LABELS: Record<string, string> = {
  perception: "PERCEPTION",
  execution: "EXECUTION",
  representation: "REPRESENTATION",
  coordination: "COORDINATION",
  failure: "FAILURE",
};

const PILLARS = ["perception", "execution", "representation", "coordination", "failure"] as const;

export default function ReducedMotionLanding() {
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState<boolean>(false);

  useEffect(() => {
    setReducedMotionEnabled(getReducedMotion());
  }, []);

  const handleToggle = () => {
    const newValue = !reducedMotionEnabled;
    setReducedMotion(newValue);
    setReducedMotionEnabled(newValue);
    // Reload to switch back to full landing
    if (!newValue) {
      window.location.reload();
    }
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
          {PILLARS.map((pillarId) => {
            const color = PILLAR_COLORS[pillarId];
            const label = PILLAR_LABELS[pillarId];

            return (
              <Link
                key={pillarId}
                href={`/system/${pillarId}`}
                className="block border-2 border-white p-6 hover:border-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <h2 className="text-lg uppercase font-bold">{label}</h2>
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
