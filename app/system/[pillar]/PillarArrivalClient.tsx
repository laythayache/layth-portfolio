"use client";

import { useEffect, useState, useRef } from "react";
import { PillarDefinition } from "../../(landing)/_3d/pillars";
import ArrivalOverlay from "./ArrivalOverlay";

interface ArrivalMetadata {
  pillarId: string;
  tint: string;
  ts: number;
  ruptureCenter: { x: number; y: number };
  mode: string;
}

interface ArrivalConfig {
  duration: number;
  easing: string;
  revealStyle: "scan" | "impact" | "reassembly" | "handshake" | "sink";
  hudCopy: {
    initial: string;
    final: string;
  };
}

const ARRIVAL_CONFIGS: Record<string, ArrivalConfig> = {
  perception: {
    duration: 750,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    revealStyle: "scan",
    hudCopy: {
      initial: "CALIBRATING INPUT",
      final: "SIGNAL LOCKED",
    },
  },
  execution: {
    duration: 600,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    revealStyle: "impact",
    hudCopy: {
      initial: "ARMING",
      final: "READY TO ACT",
    },
  },
  representation: {
    duration: 900,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    revealStyle: "reassembly",
    hudCopy: {
      initial: "RESOLVING STRUCTURE",
      final: "MODEL COHERENT",
    },
  },
  coordination: {
    duration: 800,
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    revealStyle: "handshake",
    hudCopy: {
      initial: "NEGOTIATING LINKS",
      final: "CONSENSUS ACHIEVED",
    },
  },
  failure: {
    duration: 900,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    revealStyle: "sink",
    hudCopy: {
      initial: "ENTROPY PRESENT",
      final: "ACCEPTED",
    },
  },
};

export default function PillarArrivalClient({
  pillarId,
  pillarData,
}: {
  pillarId: string;
  pillarData: PillarDefinition;
}) {
  const [arrivalActive, setArrivalActive] = useState(false);
  const [arrivalProgress, setArrivalProgress] = useState(0);
  const [arrivalMetadata, setArrivalMetadata] = useState<ArrivalMetadata | null>(null);
  const [hudText, setHudText] = useState<string>("");
  const [contentOpacity, setContentOpacity] = useState(0);
  const [contentBlur, setContentBlur] = useState(10);
  const arrivalStartTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasClearedStorageRef = useRef(false);

  const config = ARRIVAL_CONFIGS[pillarId] || ARRIVAL_CONFIGS.perception;

  // Read arrival metadata on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = sessionStorage.getItem("rr_arrival");
      if (stored) {
        const data: ArrivalMetadata = JSON.parse(stored);
        // Validate it matches current pillar
        if (data.pillarId === pillarId && data.mode === "portal") {
          setArrivalMetadata(data);
          setArrivalActive(true);
          arrivalStartTimeRef.current = Date.now();
          setHudText(config.hudCopy.initial);
          
          // Clear storage after a short delay (once animation starts)
          setTimeout(() => {
            if (!hasClearedStorageRef.current) {
              sessionStorage.removeItem("rr_arrival");
              hasClearedStorageRef.current = true;
            }
          }, 100);
        } else {
          // Mismatch or invalid, clear it
          sessionStorage.removeItem("rr_arrival");
        }
      }
    } catch (e) {
      // Fail silently
    }
  }, [pillarId, config]);

  // Animate arrival
  useEffect(() => {
    if (!arrivalActive || arrivalStartTimeRef.current === null) {
      // No arrival, show content immediately
      setContentOpacity(1);
      setContentBlur(0);
      return;
    }

    const animate = () => {
      const elapsed = Date.now() - arrivalStartTimeRef.current!;
      const progress = Math.min(elapsed / config.duration, 1);

      setArrivalProgress(progress);

      // Content reveal
      if (progress > 0.3) {
        const revealProgress = (progress - 0.3) / 0.7;
        setContentOpacity(revealProgress);
        setContentBlur(10 - revealProgress * 10);
      }

      // HUD text transition
      if (progress > 0.6) {
        setHudText(config.hudCopy.final);
      }

      // Complete
      if (progress >= 1) {
        setArrivalActive(false);
        setContentOpacity(1);
        setContentBlur(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [arrivalActive, config]);

  const ruptureCenter = arrivalMetadata?.ruptureCenter || { x: 0, y: 0 };
  const tint = arrivalMetadata?.tint || pillarData.primaryColor;

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Arrival Overlay */}
      {arrivalActive && (
        <ArrivalOverlay
          active={arrivalActive}
          progress={arrivalProgress}
          tint={tint}
          ruptureCenter={ruptureCenter}
          style={config.revealStyle}
          duration={config.duration}
        />
      )}

      {/* Content Container */}
      <div
        style={{
          opacity: contentOpacity,
          filter: `blur(${contentBlur}px)`,
          transition: arrivalActive
            ? `opacity ${config.duration * 0.7}ms ${config.easing}, filter ${config.duration * 0.7}ms ${config.easing}`
            : "none",
        }}
      >
        {/* Placeholder Content */}
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto">
            {/* Primary Name */}
            <h1
              className="text-4xl uppercase mb-1 font-mono tracking-widest"
              style={{
                color: pillarData.primaryColor,
                letterSpacing: "0.2em",
                fontWeight: 500,
              }}
            >
              {pillarData.primaryName}
            </h1>
            {/* Subtitle */}
            <div
              className="text-lg uppercase mb-4 font-mono text-gray-400"
              style={{
                letterSpacing: "0.25em",
              }}
            >
              {pillarData.subtitle}
            </div>
            <p
              className="text-sm text-gray-400 mb-8 font-mono"
              style={{ letterSpacing: "0.1em" }}
            >
              {pillarData.description}
            </p>
            <div className="text-gray-300 font-mono">
              <p className="mb-4">
                This pillar is under construction.
              </p>
              <p className="text-xs text-gray-500">
                System content will be integrated here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Micro-HUD */}
      {!arrivalActive && (
        <div
          className="fixed top-8 left-8 z-50 pointer-events-none"
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            lineHeight: "1.6",
          }}
        >
          {/* Primary Name */}
          <div
            className="uppercase font-bold mb-0.5 tracking-widest"
            style={{
              color: pillarData.primaryColor,
              letterSpacing: "0.2em",
              fontWeight: 500,
            }}
          >
            {pillarData.primaryName}
          </div>
          {/* Subtitle */}
          <div
            className="text-xs uppercase text-gray-400 mb-1"
            style={{
              letterSpacing: "0.25em",
            }}
          >
            {pillarData.subtitle}
          </div>
          <div
            className="text-xs text-gray-400 mb-1"
            style={{ letterSpacing: "0.1em" }}
          >
            {pillarData.description}
          </div>
          <div
            className="text-xs text-gray-500"
            style={{ letterSpacing: "0.1em" }}
          >
            {pillarId === "perception" ? "CALIBRATED" :
             pillarId === "execution" ? "ARMED" :
             pillarId === "representation" ? "COHERENT" :
             pillarId === "coordination" ? "SYNCED" :
             "ACCEPTED"}
          </div>
        </div>
      )}

      {/* Arrival HUD (during animation) */}
      {arrivalActive && hudText && (
        <div
          className="fixed top-8 left-8 z-[10000] pointer-events-none"
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            color: tint,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 1 - arrivalProgress * 0.5,
          }}
        >
          {hudText}
        </div>
      )}
    </div>
  );
}
