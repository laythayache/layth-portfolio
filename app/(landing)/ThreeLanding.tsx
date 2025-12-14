"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PILLARS, PillarDefinition } from "./_3d/pillars";
import { useDescentState, DescentPhase } from "./_3d/useDescentState";

function LabelWithJitter({ pillar, phase }: { pillar: PillarDefinition; phase: DescentPhase }) {
  const showClassification = phase === "idle" || phase === "hover";
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
        {/* Classification line (only during idle/hover) */}
        {showClassification && (
          <div
            className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1"
            style={{
              color: "#666666",
              letterSpacing: "0.3em",
            }}
          >
            CLASS: SYSTEM PILLAR
          </div>
        )}
        {/* Axiom line */}
        <div
          className="font-mono text-xs"
          style={{
            letterSpacing: "0.1em",
            color: isSubdued ? "#555555" : "#999999",
            marginTop: showClassification ? "0" : "0.25rem",
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
  
  // Keyboard focus state
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const focusedIndexRef = useRef<number>(-1);
  
  // Touch double-tap guard
  const lastTouchedIdRef = useRef<string | null>(null);
  const lastTouchTsRef = useRef<number>(0);
  const TOUCH_COMMIT_WINDOW = 2000; // 2 seconds

  const hoveredPillar = hoveredId ? PILLARS.find((p) => p.id === hoveredId) : null;
  const selectedPillar = selectedId ? PILLARS.find((p) => p.id === selectedId) : null;
  const focusedPillar = focusedId ? PILLARS.find((p) => p.id === focusedId) : null;

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc: return to idle (only if idle or hover)
      if (e.key === "Escape" && (phase === "idle" || phase === "hover")) {
        setHovered(null);
        setFocusedId(null);
        focusedIndexRef.current = -1;
        return;
      }

      // Tab: cycle through pillars
      if (e.key === "Tab" && (phase === "idle" || phase === "hover")) {
        e.preventDefault();
        const currentIndex = focusedIndexRef.current;
        const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % PILLARS.length;
        focusedIndexRef.current = nextIndex;
        const nextPillar = PILLARS[nextIndex];
        setFocusedId(nextPillar.id);
        // Trigger hover with 250ms delay (match hover discipline)
        setTimeout(() => {
          setHovered(nextPillar.id as any);
        }, 250);
        return;
      }

      // Enter: commit to focused pillar
      if (e.key === "Enter" && focusedId && (phase === "idle" || phase === "hover")) {
        e.preventDefault();
        const pillar = PILLARS.find((p) => p.id === focusedId);
        if (pillar) {
          commitTo(focusedId as any, { x: 0, y: 0 }); // Center NDC for keyboard
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, focusedId, setHovered, commitTo]);

  // Screen reader live region
  const [announcement, setAnnouncement] = useState<string>("");
  
  useEffect(() => {
    if (hoveredId || focusedId) {
      const pillar = PILLARS.find((p) => p.id === (hoveredId || focusedId));
      if (pillar) {
        setAnnouncement(`${pillar.primaryName}, ${pillar.subtitle}. ${pillar.description}`);
      }
    } else if (phase === "commit") {
      setAnnouncement("Locked. Descending.");
    } else if (phase === "dive") {
      setAnnouncement("Transiting.");
    } else {
      setAnnouncement("");
    }
  }, [hoveredId, focusedId, phase]);

  const handlePillarClick = (id: string, center: { x: number; y: number } | null) => {
    // Only allow commit when idle or hover, and only if not already selected
    if ((phase === "idle" || phase === "hover") && selectedId !== id) {
      commitTo(id as any, center);
    }
  };

  // Touch double-tap handler
  const handlePillarTouch = (id: string, center: { x: number; y: number } | null) => {
    if (phase === "dive" || phase === "hold" || phase === "commit") {
      return; // Ignore during descent
    }

    const now = Date.now();
    const isSamePillar = lastTouchedIdRef.current === id;
    const withinWindow = now - lastTouchTsRef.current < TOUCH_COMMIT_WINDOW;

    if (isSamePillar && withinWindow) {
      // Second tap = commit
      commitTo(id as any, center);
      lastTouchedIdRef.current = null;
      lastTouchTsRef.current = 0;
    } else {
      // First tap = hover/focus
      lastTouchedIdRef.current = id;
      lastTouchTsRef.current = now;
      setHovered(id as any);
      setFocusedId(id);
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

      {/* Screen reader live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        {announcement}
      </div>

      {/* Hover/Selection Label - Center Top */}
      {(hoveredPillar || selectedPillar || focusedPillar) && (
        <LabelWithJitter
          pillar={selectedPillar || hoveredPillar || focusedPillar!}
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
          hoveredPillarId={hoveredId || focusedId}
          selectedPillarId={selectedId}
          ruptureCenter={ruptureCenter}
          onPillarHover={handlePillarHover}
          onPillarClick={handlePillarClick}
          onPillarTouch={handlePillarTouch}
          getDiveProgress={descentState.getDiveProgress}
          getHoldProgress={descentState.getHoldProgress}
        />
      </Suspense>
    </div>
  );
}
