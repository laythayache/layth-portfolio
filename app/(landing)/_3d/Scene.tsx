"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { PILLARS } from "./pillars";
import PillarOrb from "./PillarOrb";
import CameraRig from "./CameraRig";
import RuptureOverlay from "./RuptureOverlay";

import { DescentPhase } from "./useDescentState";
import { getQualityProfile, getCanvasDpr } from "./quality";

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

function FailureGravitySystem({ onGravityActive }: { onGravityActive: (active: boolean) => void }) {
  const timeRef = useRef(0);
  const lastTriggerRef = useRef(0);
  const durationRef = useRef(0);

  useFrame((state, delta) => {
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
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Subtle point light */}
      <pointLight position={[0, 0, 5]} intensity={0.3} />
      
      {/* Additional lights for better orb visibility */}
      <pointLight position={[-5, 5, 5]} intensity={0.2} />
      <pointLight position={[5, -5, 5]} intensity={0.2} />

      {/* Mild fog for depth */}
      <fog attach="fog" args={["#000000", 10, 20]} />

      {/* Failure gravity system */}
      <FailureGravitySystem onGravityActive={setFailureGravityActive} />

      {/* Camera rig */}
      <CameraRig
        phase={phase}
        hoveredPillarId={hoveredPillarId as any}
        selectedPillarId={selectedPillarId as any}
        selectedPillarPosition={selectedPillar ? selectedPillar.position : null}
        pillars={PILLARS.map((p) => ({ id: p.id, position: p.position }))}
        getDiveProgress={getDiveProgress}
        getHoldProgress={getHoldProgress}
      />

      {/* Render all pillar orbs */}
      {PILLARS.map((pillar) => {
        const isDisabled = (phase === "commit" || phase === "dive" || phase === "hold") && pillar.id !== selectedPillarId;
        const isDominant = pillar.id === selectedPillarId && (phase === "commit" || phase === "dive" || phase === "hold");

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
              // Rupture starts at 0.70, maps to 0..1
              return Math.max(0, Math.min(1, (diveProgress - 0.70) / 0.30));
            }
            if (phase === "hold") {
              // Decay quickly in hold
              return Math.max(0, 1.0 - getHoldProgress() * 2.0);
            }
            return 0;
          })()}
          centerNdc={ruptureCenter}
          tint={selectedPillar.primaryColor}
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
  const canvasDpr = getCanvasDpr(qualityProfile);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: qualityProfile === "full", alpha: false }}
      dpr={canvasDpr}
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
    </Canvas>
  );
}
