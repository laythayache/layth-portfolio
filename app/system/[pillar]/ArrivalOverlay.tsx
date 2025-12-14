"use client";

import { useEffect, useRef, useState } from "react";

interface ArrivalOverlayProps {
  active: boolean;
  progress: number; // 0..1
  tint: string;
  ruptureCenter: { x: number; y: number };
  style: "scan" | "impact" | "reassembly" | "handshake" | "sink";
  duration: number;
}

export default function ArrivalOverlay({
  active,
  progress,
  tint,
  ruptureCenter,
  style,
  duration,
}: ArrivalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 16);
    return () => clearInterval(interval);
  }, [active]);

  if (!active || progress <= 0) return null;

  // Convert NDC to screen space (0..1)
  const centerX = (ruptureCenter.x + 1) / 2;
  const centerY = (1 - ruptureCenter.y) / 2; // Flip Y

  // Base styles
  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 9999,
    backgroundColor: "#000000",
  };

  // Vignette (calmer for sink style)
  const vignetteStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: style === "sink"
      ? `radial-gradient(circle at ${centerX * 100}% ${centerY * 100}%, transparent 0%, rgba(0,0,0,${0.6 * progress}) 50%, rgba(0,0,0,${0.4 * progress}) 100%)`
      : `radial-gradient(circle at ${centerX * 100}% ${centerY * 100}%, transparent 0%, rgba(0,0,0,${0.8 * progress}) 70%)`,
    opacity: style === "sink" ? 1 - progress * 0.2 : 1 - progress * 0.5,
  };

  // Grain (reduced for sink style)
  const grainStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
    opacity: style === "sink" ? progress * 0.1 : progress * 0.3,
    mixBlendMode: "overlay",
  };

  // Style-specific overlays
  const renderStyleOverlay = () => {
    switch (style) {
      case "scan": {
        // Horizontal scan line
        const scanY = (time / duration) * 100;
        return (
          <div
            style={{
              position: "absolute",
              top: `${scanY}%`,
              left: 0,
              width: "100%",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${tint}, transparent)`,
              opacity: 1 - progress,
              boxShadow: `0 0 20px ${tint}`,
            }}
          />
        );
      }
      case "impact": {
        // Compression rings
        const ringScale = 1 - progress * 0.3;
        return (
          <div
            style={{
              position: "absolute",
              top: `${centerY * 100}%`,
              left: `${centerX * 100}%`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              width: "200px",
              height: "200px",
              border: `2px solid ${tint}`,
              borderRadius: "50%",
              opacity: 1 - progress,
              boxShadow: `0 0 40px ${tint}`,
            }}
          />
        );
      }
      case "reassembly": {
        // Grid tiles
        const tileSize = 50;
        const tiles = [];
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 20; x++) {
            const delay = (x + y) * 0.02;
            const tileProgress = Math.max(0, Math.min(1, (progress - delay) / 0.3));
            tiles.push(
              <div
                key={`${x}-${y}`}
                style={{
                  position: "absolute",
                  top: `${y * tileSize}px`,
                  left: `${x * tileSize}px`,
                  width: `${tileSize}px`,
                  height: `${tileSize}px`,
                  border: `1px solid ${tint}`,
                  opacity: 1 - tileProgress,
                  backgroundColor: `rgba(${parseInt(tint.slice(1, 3), 16)}, ${parseInt(tint.slice(3, 5), 16)}, ${parseInt(tint.slice(5, 7), 16)}, 0.1)`,
                }}
              />
            );
          }
        }
        return <>{tiles}</>;
      }
      case "handshake": {
        // Concentric rings that sync and flatten
        const rings = [];
        for (let i = 0; i < 5; i++) {
          const ringProgress = Math.max(0, 1 - progress - i * 0.15);
          const baseScale = 0.5 + i * 0.2;
          const pulsePhase = (time / 200) % (Math.PI * 2);
          const pulseScale = 1 + Math.sin(pulsePhase) * 0.1 * (1 - progress);
          rings.push(
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${centerY * 100}%`,
                left: `${centerX * 100}%`,
                transform: `translate(-50%, -50%) scale(${baseScale * pulseScale})`,
                width: "100px",
                height: "100px",
                border: `1px solid ${tint}`,
                borderRadius: "50%",
                opacity: ringProgress,
              }}
            />
          );
        }
        return <>{rings}</>;
      }
      case "sink": {
        // Slow darkening vignette - calm, no flashy effects
        // Just a subtle radial darkening that lifts slightly
        return (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at ${centerX * 100}% ${centerY * 100}%, transparent 0%, rgba(0,0,0,${0.95 * progress}) 60%, rgba(0,0,0,${0.7 * progress}) 100%)`,
              opacity: 1 - progress * 0.3, // Lifts slightly as it completes
            }}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <div ref={overlayRef} style={baseStyle}>
      {/* Vignette */}
      <div style={vignetteStyle} />
      
      {/* Grain */}
      <div style={grainStyle} />
      
      {/* Style-specific overlay */}
      {renderStyleOverlay()}
      
      {/* Center rupture residue (not for sink style) */}
      {style !== "sink" && (
        <div
          style={{
            position: "absolute",
            top: `${centerY * 100}%`,
            left: `${centerX * 100}%`,
            transform: "translate(-50%, -50%)",
            width: `${200 * (1 - progress)}px`,
            height: `${200 * (1 - progress)}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${tint}40 0%, transparent 70%)`,
            opacity: 1 - progress,
          }}
        />
      )}
      
      {/* System handoff label (not for sink style) */}
      {style !== "sink" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "monospace",
            fontSize: "10px",
            color: tint,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: Math.max(0, 1 - progress * 2),
          }}
        >
          SYSTEM HANDOFF
        </div>
      )}
    </div>
  );
}
