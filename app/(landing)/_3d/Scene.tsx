"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { PILLARS } from "./pillars";
import PillarOrb from "./PillarOrb";
import CameraRig from "./CameraRig";

interface SceneContentProps {
  hoveredPillarId: string | null;
  selectedPillarId: string | null;
  onPillarHover: (id: string | null) => void;
  onPillarClick: (id: string) => void;
}

function SceneContent({ hoveredPillarId, selectedPillarId, onPillarHover, onPillarClick }: SceneContentProps) {
  const { camera, gl } = useThree();

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

      {/* Camera rig */}
      <CameraRig
        hoveredPillarId={hoveredPillarId as any}
        pillars={PILLARS.map((p) => ({ id: p.id, position: p.position }))}
      />

      {/* Render all pillar orbs */}
      {PILLARS.map((pillar) => (
        <PillarOrb
          key={pillar.id}
          pillar={pillar}
          isHovered={hoveredPillarId === pillar.id}
          isSelected={selectedPillarId === pillar.id}
          onPointerOver={() => onPillarHover(pillar.id)}
          onPointerOut={() => onPillarHover(null)}
          onClick={() => onPillarClick(pillar.id)}
        />
      ))}
    </>
  );
}

interface SceneProps {
  hoveredPillarId: string | null;
  selectedPillarId: string | null;
  onPillarHover: (id: string | null) => void;
  onPillarClick: (id: string) => void;
}

export default function Scene({ hoveredPillarId, selectedPillarId, onPillarHover, onPillarClick }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#000000" }}
    >
      <SceneContent
        hoveredPillarId={hoveredPillarId}
        selectedPillarId={selectedPillarId}
        onPillarHover={onPillarHover}
        onPillarClick={onPillarClick}
      />
    </Canvas>
  );
}
