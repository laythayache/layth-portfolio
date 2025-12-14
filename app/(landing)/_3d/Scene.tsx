"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { Environment } from "@react-three/drei";
import { PILLARS } from "./pillars";
import PillarOrb from "./PillarOrb";
import CameraRig from "./CameraRig";
import RuptureOverlay from "./RuptureOverlay";

import { DescentPhase } from "./useDescentState";
import { getQualityProfile, getCanvasDpr, updateDRS } from "./quality";
import PerformanceMonitor from "./PerformanceMonitor";
import { usePageVisibility } from "./usePageVisibility";

interface SceneContentProps {
  phase: DescentPhase;
  hoveredPillarId: string | null;
  selectedPillarId: string | null;
  ruptureCenter: { x: number; y: number } | null;
  onPillarHover: (id: string | null) => void;
  onPillarClick: (id: string, center: { x: number; y: number } | null) => void;
  onPillarTouch?: (id: string, center: { x: number; y: number } | null) => void;
  getDiveProgress: () => number;
  getHoldProgress: () => number;
}

function FailureGravitySystem({ onGravityActive, isPageVisible }: { onGravityActive: (active: boolean) => void; isPageVisible: boolean }) {
  const timeRef = useRef(0);
  const lastTriggerRef = useRef(0);
  const durationRef = useRef(0);

  useFrame((state, delta) => {
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    timeRef.current += delta;
    lastTriggerRef.current += delta;
    durationRef.current -= delta;

    // Trigger every 12-20 seconds
    if (lastTriggerRef.current >= 15 && durationRef.current <= 0) {
      durationRef.current = 1.0; // Active for 1 second
      lastTriggerRef.current = 0;
      onGravityActive(true);
    }

    if (durationRef.current <= 0) {
      onGravityActive(false);
    }
  });

  return null;
}

function SceneContent({ phase, hoveredPillarId, selectedPillarId, ruptureCenter, onPillarHover, onPillarClick, onPillarTouch, getDiveProgress, getHoldProgress }: SceneContentProps) {
  const { camera, gl } = useThree();
  const [failureGravityActive, setFailureGravityActive] = useState(false);
  const isPageVisible = usePageVisibility();

  const selectedPillar = selectedPillarId ? PILLARS.find((p) => p.id === selectedPillarId) : null;

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  return (
    <>
      {/* HDRI Environment */}
      <Environment preset="warehouse" />

      {/* Premium lighting: key + rim + fill */}
      <directionalLight position={[6, 4, 8]} intensity={1.2} />
      <directionalLight position={[-6, -2, 6]} intensity={0.6} />
      <pointLight position={[0, 0, 4]} intensity={0.7} />
      
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.15} />

      {/* Mild fog for depth */}
      <fog attach="fog" args={["#000000", 10, 20]} />

      {/* Failure gravity system */}
      <FailureGravitySystem onGravityActive={setFailureGravityActive} isPageVisible={isPageVisible} />

      {/* Camera rig */}
      <CameraRig
        phase={phase}
        hoveredPillarId={hoveredPillarId as any}
        selectedPillarId={selectedPillarId as any}
        selectedPillarPosition={selectedPillar ? selectedPillar.position : null}
        pillars={PILLARS.map((p) => ({ id: p.id, position: p.position }))}
        getDiveProgress={getDiveProgress}
        getHoldProgress={getHoldProgress}
        isPageVisible={isPageVisible}
        reducedMotion={getQualityProfile() === "safe"}
      />

      {/* Render all pillar orbs */}
      {PILLARS.map((pillar) => {
        const isDisabled = (phase === "commit" || phase === "dive" || phase === "hold") && pillar.id !== selectedPillarId;
        const isDominant = pillar.id === selectedPillarId && (phase === "commit" || phase === "dive" || phase === "hold");
        const qualityProfile = getQualityProfile();
        const reducedMotion = qualityProfile === "safe";

        return (
          <PillarOrb
            key={pillar.id}
            pillar={pillar}
            isHovered={hoveredPillarId === pillar.id}
            isSelected={selectedPillarId === pillar.id}
            anyHovered={hoveredPillarId !== null}
            failureGravityActive={failureGravityActive}
            disabled={isDisabled}
            dominant={isDominant}
            phase={phase}
            isPageVisible={isPageVisible}
            reducedMotion={reducedMotion}
            onPointerOver={() => !isDisabled && onPillarHover(pillar.id)}
            onPointerOut={() => !isDisabled && onPillarHover(null)}
            onClick={(event: any) => {
              if (!isDisabled) {
                const center = event?.ndc ? { x: event.ndc.x, y: event.ndc.y } : null;
                // Check if this is a touch event
                if (event.nativeEvent?.pointerType === "touch" && onPillarTouch) {
                  onPillarTouch(pillar.id, center);
                } else {
                  onPillarClick(pillar.id, center);
                }
              }
            }}
          />
        );
      })}

      {/* Rupture overlay - render last so it's on top */}
      {selectedPillar && ruptureCenter && (
        <RuptureOverlay
          active={phase === "dive" || phase === "hold"}
          progress={(() => {
            if (phase === "dive") {
              const diveProgress = getDiveProgress();
              // Rupture starts at 0.58, peaks at 0.80 (snappy tear/snap)
              const ruptureStart = 0.58;
              const rupturePeak = 0.80;
              if (diveProgress < ruptureStart) return 0;
              if (diveProgress >= rupturePeak) return 1;
              // Map from ruptureStart..rupturePeak to 0..1 with easeOutQuad for snappy feel
              const t = (diveProgress - ruptureStart) / (rupturePeak - ruptureStart);
              const easedT = 1 - (1 - t) * (1 - t); // easeOutQuad
              return easedT;
            }
            if (phase === "hold") {
              // Decay quickly in hold
              return Math.max(0, 1.0 - getHoldProgress() * 2.0);
            }
            return 0;
          })()}
          centerNdc={ruptureCenter}
          tint={selectedPillar.primaryColor}
          isPageVisible={isPageVisible}
          reducedMotion={getQualityProfile() === "safe"}
        />
      )}
    </>
  );
}

interface SceneProps {
  phase: DescentPhase;
  hoveredPillarId: string | null;
  selectedPillarId: string | null;
  ruptureCenter: { x: number; y: number } | null;
  onPillarHover: (id: string | null) => void;
  onPillarClick: (id: string, center: { x: number; y: number } | null) => void;
  onPillarTouch?: (id: string, center: { x: number; y: number } | null) => void;
  getDiveProgress: () => number;
  getHoldProgress: () => number;
}

export default function Scene({ phase, hoveredPillarId, selectedPillarId, ruptureCenter, onPillarHover, onPillarClick, onPillarTouch, getDiveProgress, getHoldProgress }: SceneProps) {
  const qualityProfile = getQualityProfile();
  const baseDpr = getCanvasDpr(qualityProfile);
  const [adaptiveDpr, setAdaptiveDpr] = useState(baseDpr);

  // DRS update (throttled to every 1 second, reads from PerformanceMonitor via global)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Initialize global frame time history
    if (!(window as any).__rr_frameTimeHistory) {
      (window as any).__rr_frameTimeHistory = [];
    }
    
    const interval = setInterval(() => {
      const history = (window as any).__rr_frameTimeHistory;
      if (history && history.length > 0) {
        const avgFrameTime = history.reduce((a: number, b: number) => a + b, 0) / history.length;
        const newDpr = updateDRS(avgFrameTime);
        if (Math.abs(newDpr - adaptiveDpr) > 0.01) {
          setAdaptiveDpr(newDpr);
        }
        // Clear history after processing
        history.length = 0;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      // Cleanup: Clear global frame time history on unmount
      if ((window as any).__rr_frameTimeHistory) {
        (window as any).__rr_frameTimeHistory = [];
      }
    };
  }, [adaptiveDpr]);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: qualityProfile === "full", alpha: false }}
        dpr={adaptiveDpr}
        style={{ background: "#000000" }}
      >
        <SceneContent
          phase={phase}
          hoveredPillarId={hoveredPillarId}
          selectedPillarId={selectedPillarId}
          ruptureCenter={ruptureCenter}
          onPillarHover={onPillarHover}
          onPillarClick={onPillarClick}
          onPillarTouch={onPillarTouch}
          getDiveProgress={getDiveProgress}
          getHoldProgress={getHoldProgress}
        />
        <PerformanceMonitor />
      </Canvas>
    </>
  );
}
