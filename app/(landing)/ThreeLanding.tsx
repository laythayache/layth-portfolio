"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { PILLARS } from "./_3d/pillars";

// Dynamically import Scene with SSR disabled to avoid window issues
const Scene = dynamic(() => import("./_3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white font-mono text-xs uppercase">LOADING…</div>
    </div>
  ),
});

export default function ThreeLanding() {
  const [hoveredPillarId, setHoveredPillarId] = useState<string | null>(null);
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);

  const hoveredPillar = hoveredPillarId ? PILLARS.find((p) => p.id === hoveredPillarId) : null;
  const selectedPillar = selectedPillarId ? PILLARS.find((p) => p.id === selectedPillarId) : null;

  const handlePillarClick = (id: string) => {
    setSelectedPillarId(id === selectedPillarId ? null : id);
  };

  return (
    <div className="relative w-full h-screen">
      {/* DOM Overlay Label - Top Left */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <div className="text-white font-mono text-xs uppercase text-gray-400">
          REALITY RESILIENCE // DESCENT INTERFACE
        </div>
      </div>

      {/* Hover/Selection Label - Center Top */}
      {(hoveredPillar || selectedPillar) && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
          <div className="text-center">
            <div
              className="font-mono text-sm uppercase font-bold mb-1"
              style={{ color: (selectedPillar || hoveredPillar)?.primaryColor }}
            >
              {(selectedPillar || hoveredPillar)?.label}
            </div>
            <div className="font-mono text-xs text-gray-400">
              {(selectedPillar || hoveredPillar)?.description}
            </div>
            {selectedPillar && (
              <div className="font-mono text-xs text-gray-500 mt-2">LOCKED</div>
            )}
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-white font-mono text-xs uppercase">INITIALIZING…</div>
          </div>
        }
      >
        <Scene
          hoveredPillarId={hoveredPillarId}
          selectedPillarId={selectedPillarId}
          onPillarHover={setHoveredPillarId}
          onPillarClick={handlePillarClick}
        />
      </Suspense>
    </div>
  );
}
