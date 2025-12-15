"use client";

import { useEffect, useState } from "react";
import { useExperience } from "@/experience/ExperienceProvider";

interface DebugInfo {
  phase: string;
  replayToken: number;
  prefersReducedMotion: boolean;
  fontsReady: boolean;
  settleInfo: {
    sourceRect: { x: number; y: number; width: number; height: number } | null;
    targetRect: { x: number; y: number; width: number; height: number } | null;
    dx: number | null;
    dy: number | null;
    scale: number | null;
  };
  emblemState: "spinning" | "decelerating" | "stopped";
}

export default function DebugOverlay() {
  const { phase, replayToken } = useExperience();
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    phase,
    replayToken,
    prefersReducedMotion: false,
    fontsReady: false,
    settleInfo: {
      sourceRect: null,
      targetRect: null,
      dx: null,
      dy: null,
      scale: null,
    },
    emblemState: "spinning",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if debug mode is enabled
    const checkDebug = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const debugParam = urlParams.get("debug") === "1";
      const debugStorage = localStorage.getItem("DEBUG_EXPERIENCE") === "1";
      return debugParam || debugStorage;
    };

    if (process.env.NODE_ENV === "production") {
      return; // Never show in production
    }

    setIsVisible(checkDebug());

    // Check for reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Check for fonts ready
    const checkFonts = async () => {
      await document.fonts.ready;
      setDebugInfo((prev) => ({ ...prev, fontsReady: true }));
    };
    checkFonts();

    setDebugInfo((prev) => ({
      ...prev,
      phase,
      replayToken,
      prefersReducedMotion: reducedMotion,
    }));

    // Monitor emblem state
    const checkEmblemState = () => {
      const loaderEmblem = document.querySelector('.lockup--loader .logo-mark') as HTMLElement;
      if (loaderEmblem) {
        const computedStyle = window.getComputedStyle(loaderEmblem);
        const animation = computedStyle.animation;
        if (animation.includes('spinDecel') || animation.includes('stopSpin')) {
          setDebugInfo((prev) => ({ ...prev, emblemState: "decelerating" }));
        } else if (animation.includes('spin') && animation.includes('infinite')) {
          setDebugInfo((prev) => ({ ...prev, emblemState: "spinning" }));
        } else {
          setDebugInfo((prev) => ({ ...prev, emblemState: "stopped" }));
        }
      }
    };

    // Monitor settle info (from window.__settleInfo if available)
    const updateSettleInfo = () => {
      if (phase === "SETTLE" || (window as any).__settleInfo) {
        const settleInfo = (window as any).__settleInfo;
        if (settleInfo) {
          setDebugInfo((prev) => ({
            ...prev,
            settleInfo: {
              sourceRect: settleInfo.sourceRect,
              targetRect: settleInfo.targetRect,
              dx: settleInfo.dx,
              dy: settleInfo.dy,
              scale: settleInfo.scale,
            },
          }));
        } else {
          // Fallback: measure directly
          const loaderMeasureGroup = document.querySelector('.lockup--loader .lockup__measure-group') as HTMLElement;
          const heroMeasureGroup = document.querySelector('.lockup--hero .lockup__measure-group') as HTMLElement;
          
          if (loaderMeasureGroup && heroMeasureGroup) {
            const sourceRect = loaderMeasureGroup.getBoundingClientRect();
            const targetRect = heroMeasureGroup.getBoundingClientRect();
            const dx = targetRect.left - sourceRect.left;
            const dy = targetRect.top - sourceRect.top;
            const scaleX = targetRect.width / sourceRect.width;
            const scaleY = targetRect.height / sourceRect.height;
            const scale = Math.min(scaleX, scaleY);

            setDebugInfo((prev) => ({
              ...prev,
              settleInfo: {
                sourceRect,
                targetRect,
                dx,
                dy,
                scale,
              },
            }));
          }
        }
      }
    };

    const interval = setInterval(() => {
      checkEmblemState();
      updateSettleInfo();
    }, 100);

    return () => clearInterval(interval);
  }, [phase, replayToken]);

  if (!isVisible || process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 10000,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        maxWidth: "400px",
        maxHeight: "80vh",
        overflow: "auto",
        border: "2px solid #6b7280",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem", borderBottom: "1px solid #6b7280", paddingBottom: "0.5rem" }}>
        🐛 Spec Verification Mode
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div>
          <strong>Phase:</strong> {debugInfo.phase}
        </div>
        <div>
          <strong>Replay Token:</strong> {debugInfo.replayToken}
        </div>
        <div>
          <strong>Reduced Motion:</strong> {debugInfo.prefersReducedMotion ? "Yes" : "No"}
        </div>
        <div>
          <strong>Fonts Ready:</strong> {debugInfo.fontsReady ? "Yes" : "No"}
        </div>
        <div>
          <strong>Emblem State:</strong> {debugInfo.emblemState}
        </div>
        {(debugInfo.settleInfo.sourceRect || (phase === "SETTLE" && debugInfo.settleInfo.dx !== null)) && (
          <div style={{ marginTop: "0.5rem", borderTop: "1px solid #6b7280", paddingTop: "0.5rem" }}>
            <div><strong>Settle Info:</strong></div>
            <div style={{ marginLeft: "1rem", fontSize: "11px" }}>
              {debugInfo.settleInfo.sourceRect ? (
                <>
                  <div>Source: x={debugInfo.settleInfo.sourceRect.x.toFixed(1)}, y={debugInfo.settleInfo.sourceRect.y.toFixed(1)}, w={debugInfo.settleInfo.sourceRect.width.toFixed(1)}, h={debugInfo.settleInfo.sourceRect.height.toFixed(1)}</div>
                  <div>Target: x={debugInfo.settleInfo.targetRect!.x.toFixed(1)}, y={debugInfo.settleInfo.targetRect!.y.toFixed(1)}, w={debugInfo.settleInfo.targetRect!.width.toFixed(1)}, h={debugInfo.settleInfo.targetRect!.height.toFixed(1)}</div>
                  <div>Transform: dx={debugInfo.settleInfo.dx!.toFixed(1)}, dy={debugInfo.settleInfo.dy!.toFixed(1)}, scale={debugInfo.settleInfo.scale!.toFixed(3)}</div>
                </>
              ) : (
                <div>Measuring...</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

