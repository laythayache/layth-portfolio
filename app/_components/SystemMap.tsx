"use client";

import { useState } from "react";
import PillarNode from "./PillarNode";
import { SystemPillar, PillarType } from "../_data/system.schema";

interface SystemMapProps {
  pillars: SystemPillar[];
  activePillar: PillarType | null;
  isInspectionMode: boolean;
  onPillarClick: (id: PillarType) => void;
}

export default function SystemMap({ pillars, activePillar, isInspectionMode, onPillarClick }: SystemMapProps) {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* System header - instrumentation style */}
      <div className="absolute top-4 left-4 z-10">
        <div className="text-white font-mono">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">
            System
          </div>
          <div className="text-sm font-bold mb-1">Reality Resilience</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-gray-500 uppercase">Operational</span>
          </div>
        </div>
      </div>

      {/* Inspection Mode HUD */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black border-2 border-yellow-500 px-3 py-1">
          <div className="text-yellow-500 font-mono text-xs uppercase">
            INSPECTION: {isInspectionMode ? "ON" : "OFF"}
          </div>
        </div>
      </div>

      {/* System diagram container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl max-h-4xl">
          {/* Blueprint boundary frame */}
          <div className="absolute inset-0 border border-gray-800/50 pointer-events-none">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-700" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-700" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-700" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-700" />
          </div>

          {/* Orthogonal grid background (subtle) */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Pillar nodes (including Failure) */}
          {pillars.map((pillar) => (
            <PillarNode
              key={pillar.id}
              pillar={pillar}
              isActive={activePillar === pillar.id}
              isHovered={hoveredPillar === pillar.id}
              isInspectionMode={isInspectionMode}
              onHover={setHoveredPillar}
              onClick={onPillarClick}
            />
          ))}

          {/* Connection lines (appear on hover or inspection mode) */}
          {(hoveredPillar || isInspectionMode) && (
            <svg
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{ zIndex: 1 }}
            >
              {isInspectionMode ? (
                // Inspection mode: show unique pairs only, label only Perception↔Execution
                (() => {
                  const nonFailurePillars = pillars.filter((p) => p.id !== "failure");
                  const connections = new Set<string>();
                  const pairs: Array<{ source: SystemPillar; target: SystemPillar }> = [];

                  nonFailurePillars.forEach((source) => {
                    nonFailurePillars.forEach((target) => {
                      if (source.id !== target.id) {
                        const pairKey = [source.id, target.id].sort().join("-");
                        if (!connections.has(pairKey)) {
                          connections.add(pairKey);
                          pairs.push({ source, target });
                        }
                      }
                    });
                  });

                  return pairs.map(({ source, target }) => {
                    const isDominantConnection =
                      (source.id === "perception" && target.id === "execution") ||
                      (source.id === "execution" && target.id === "perception");

                    return (
                      <g key={`${source.id}-${target.id}`}>
                        <line
                          x1={`${source.position.x}%`}
                          y1={`${source.position.y}%`}
                          x2={`${target.position.x}%`}
                          y2={`${target.position.y}%`}
                          stroke="currentColor"
                          strokeWidth={isDominantConnection ? "2" : "1"}
                          strokeDasharray="4 4"
                          className="text-gray-600"
                        />
                        {isDominantConnection && (
                          <text
                            x={`${(source.position.x + target.position.x) / 2}%`}
                            y={`${(source.position.y + target.position.y) / 2}%`}
                            className="text-gray-500 text-xs font-mono fill-current"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {source.id === "perception" ? "perception↔execution" : "execution↔perception"}
                          </text>
                        )}
                      </g>
                    );
                  });
                })()
              ) : (
                // Hover mode: show connections from hovered pillar
                pillars
                  .filter((p) => p.id !== hoveredPillar && p.id !== "failure")
                  .map((target) => {
                    const source = pillars.find((p) => p.id === hoveredPillar);
                    if (!source) return null;

                    const isDominantConnection =
                      (source.id === "perception" || source.id === "execution") &&
                      (target.id === "perception" || target.id === "execution");

                    return (
                      <line
                        key={`${hoveredPillar}-${target.id}`}
                        x1={`${source.position.x}%`}
                        y1={`${source.position.y}%`}
                        x2={`${target.position.x}%`}
                        y2={`${target.position.y}%`}
                        stroke="currentColor"
                        strokeWidth={isDominantConnection ? "2" : "1"}
                        strokeDasharray="4 4"
                        className="text-gray-600"
                      />
                    );
                  })
              )}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

