"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PILLARS, PillarDefinition } from "./_3d/pillars";
import { useDescentState, DescentPhase } from "./_3d/useDescentState";

function LabelWithJitter({ pillar, phase }: { pillar: PillarDefinition; phase: DescentPhase }) {
  const [jitter, setJitter] = useState(0);
  const jitterTimeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      jitterTimeRef.current += 0.016; // ~60fps
      setJitter(Math.sin(jitterTimeRef.current * 0.3) * 1); // ≤1px, slow
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (phase) {
      case "commit":
        return "COMMITTING…";
      case "dive":
        return "DESCENT…";
      case "hold":
        return "AWAITING TRANSIT";
      default:
        return null;
    }
  };

  const statusText = getStatusText();
  const isSubdued = phase === "dive" || phase === "hold";
  const isDiving = phase === "dive" || phase === "hold" || phase === "commit";

  return (
    <div
      className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
      style={{ transform: `translate(-50%, ${jitter}px)` }}
    >
      <div className="text-center">
        {/* Primary Name (Phoenician) */}
        <div
          className="font-mono text-base uppercase tracking-widest mb-0.5 transition-opacity duration-300"
          style={{
            color: pillar.primaryColor,
            fontWeight: 500,
            letterSpacing: "0.2em",
            opacity: isDiving ? 0.9 : 1,
          }}
        >
          {pillar.primaryName}
        </div>
        {/* Subtitle (Modern function) */}
        <div
          className="font-mono text-xs uppercase tracking-[0.25em] mb-1 transition-opacity duration-200"
          style={{
            color: isSubdued ? "#666666" : "#cccccc",
            letterSpacing: "0.25em",
            opacity: isDiving ? 0.4 : 0.8,
          }}
        >
          {pillar.subtitle}
        </div>
        {/* Axiom line */}
        <div
          className="font-mono text-xs"
          style={{
            letterSpacing: "0.1em",
            color: isSubdued ? "#555555" : "#999999",
          }}
        >
          {pillar.description}
        </div>
        <div
          className="font-mono text-xs text-gray-500 mt-2"
          style={{ letterSpacing: "0.1em" }}
        >
          LOCKED
        </div>
        {statusText && (
          <div
            className="font-mono text-xs text-gray-600 mt-1"
            style={{ letterSpacing: "0.1em" }}
          >
            {statusText}
          </div>
        )}
      </div>
    </div>
  );
}

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
  const router = useRouter();
  const descentState = useDescentState();
  const { phase, hoveredId, selectedId, setHovered, commitTo, ruptureCenter } = descentState;
  const hasNavigatedRef = useRef(false);

  const hoveredPillar = hoveredId ? PILLARS.find((p) => p.id === hoveredId) : null;
  const selectedPillar = selectedId ? PILLARS.find((p) => p.id === selectedId) : null;

  // Navigation trigger at progress >= 0.85
  useEffect(() => {
    if (phase === "dive" && selectedId && !hasNavigatedRef.current) {
      const progress = descentState.getDiveProgress();
      if (progress >= 0.85) {
        hasNavigatedRef.current = true;
        
        // Write arrival metadata to sessionStorage
        const selectedPillar = PILLARS.find((p) => p.id === selectedId);
        if (selectedPillar) {
          try {
            const arrivalData = {
              pillarId: selectedId,
              tint: selectedPillar.primaryColor,
              ts: Date.now(),
              ruptureCenter: ruptureCenter || { x: 0, y: 0 },
              mode: "portal",
            };
            sessionStorage.setItem("rr_arrival", JSON.stringify(arrivalData));
          } catch (e) {
            // Fail silently if sessionStorage unavailable
          }
        }
        
        router.push(`/system/${selectedId}`);
      }
    }
  }, [phase, selectedId, descentState, router, ruptureCenter]);

  // Reset navigation flag when phase changes away from dive
  useEffect(() => {
    if (phase !== "dive" && phase !== "hold") {
      hasNavigatedRef.current = false;
    }
  }, [phase]);

  const handlePillarClick = (id: string, center: { x: number; y: number } | null) => {
    // Only allow commit when idle or hover, and only if not already selected
    if ((phase === "idle" || phase === "hover") && selectedId !== id) {
      commitTo(id as any, center);
    }
  };

  const handlePillarHover = (id: string | null) => {
    // During dive or hold, ignore hover updates
    if (phase === "dive" || phase === "hold") {
      return;
    }
    setHovered(id as any);
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
        <LabelWithJitter
          pillar={selectedPillar || hoveredPillar!}
          phase={phase}
        />
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
          phase={phase}
          hoveredPillarId={hoveredId}
          selectedPillarId={selectedId}
          ruptureCenter={ruptureCenter}
          onPillarHover={handlePillarHover}
          onPillarClick={handlePillarClick}
          getDiveProgress={descentState.getDiveProgress}
          getHoldProgress={descentState.getHoldProgress}
        />
      </Suspense>
    </div>
  );
}
