"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, Vector3, Color } from "three";
import { PillarDefinition } from "./pillars";
import * as THREE from "three";

interface PillarOrbProps {
  pillar: PillarDefinition;
  isHovered: boolean;
  isSelected: boolean;
  anyHovered: boolean;
  failureGravityActive: boolean;
  disabled?: boolean;
  dominant?: boolean;
  phase?: string;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: (event: any) => void;
}

function CoreOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const timeRef = useRef(0);
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const baseColorRef = useRef(new Color(pillar.primaryColor));

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Hover delay
    if (isHovered) {
      hoverDelayRef.current += delta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25; // 250ms
    const canReact = hoverDelayRef.current >= hoverDelay;

    // Motion slowdown when other orb is hovered or when disabled
    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;

    timeRef.current += delta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;

    // Drift motion (reduced amplitude)
    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    // Failure gravity bias
    if (failureGravityActive && pillar.id !== "failure") {
      const failurePos = new Vector3(0, 0, -3);
      const currentPos = new Vector3(driftX, driftY, driftZ);
      const bias = currentPos.lerp(failurePos, 0.1);
      meshRef.current.position.x = bias.x;
      meshRef.current.position.y = bias.y;
      meshRef.current.position.z = bias.z;
    } else {
      meshRef.current.position.x = driftX;
      meshRef.current.position.y = driftY;
      meshRef.current.position.z = driftZ;
    }

    // Rotation (slower when other hovered)
    meshRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    meshRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.5 * motionMultiplier;

    // Hover effects: contrast/emissive intensity, slow pulse (no scale)
    if (isHovered && canReact) {
      pulseTimeRef.current += delta * 0.8; // Slow pulse
      const pulse = 1.0 + Math.sin(pulseTimeRef.current) * 0.15;
      materialRef.current.emissiveIntensity = 0.2 * pillar.personality.hoverGlow * pulse;
      materialRef.current.roughness = 0.2; // More contrast
    } else {
      pulseTimeRef.current = 0;
      materialRef.current.emissiveIntensity = 0.2;
      materialRef.current.roughness = 0.3;
    }

    // Desaturate when other orb is hovered or when disabled
    if (disabled) {
      const desaturated = baseColorRef.current.clone().lerp(new Color(0x333333), 0.6);
      materialRef.current.color = desaturated;
      materialRef.current.emissiveIntensity = 0.05; // Much reduced emissive
    } else if (anyHovered && !isHovered) {
      const desaturated = baseColorRef.current.clone().lerp(new Color(0x666666), 0.4);
      materialRef.current.color = desaturated;
    } else {
      materialRef.current.color = baseColorRef.current;
    }

    // Dominant orb: keep pulse, increase contrast slightly
    if (dominant && !isHovered) {
      pulseTimeRef.current += delta * 0.6; // Slower pulse
      const pulse = 1.0 + Math.sin(pulseTimeRef.current) * 0.1;
      materialRef.current.emissiveIntensity = 0.2 * pulse;
      materialRef.current.roughness = 0.25; // Slightly more contrast
    }

    // Failure gravity: scale compression
    if (failureGravityActive && pillar.id === "failure") {
      const compression = 0.95;
      meshRef.current.scale.setScalar(compression);
    } else {
      meshRef.current.scale.setScalar(1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color={pillar.primaryColor}
        emissive={pillar.primaryColor}
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

function ShardsOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean }) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const shardCount = 12;
  const baseColorRef = useRef(new Color(pillar.primaryColor));

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    if (isHovered) {
      hoverDelayRef.current += delta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;
    timeRef.current += delta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    if (failureGravityActive && pillar.id !== "failure") {
      const failurePos = new Vector3(0, 0, -3);
      const currentPos = new Vector3(driftX, driftY, driftZ);
      const bias = currentPos.lerp(failurePos, 0.1);
      groupRef.current.position.x = bias.x;
      groupRef.current.position.y = bias.y;
      groupRef.current.position.z = bias.z;
    } else {
      groupRef.current.position.x = driftX;
      groupRef.current.position.y = driftY;
      groupRef.current.position.z = driftZ;
    }

    groupRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    groupRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.4 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += delta * 0.8;
    } else {
      pulseTimeRef.current = 0;
    }

  });

  const radius = 0.8; // Fixed, no scale change
  const glowIntensity = isHovered && hoverDelayRef.current >= 0.25 ? pillar.personality.hoverGlow * (1.0 + Math.sin(pulseTimeRef.current) * 0.15) : 1.0;

  return (
    <group ref={groupRef}>
      {Array.from({ length: shardCount }).map((_, i) => {
        const angle = (i / shardCount) * Math.PI * 2;
        const elevation = (i / shardCount) * Math.PI;
        const x = Math.cos(angle) * Math.sin(elevation) * radius;
        const y = Math.sin(angle) * Math.sin(elevation) * radius;
        const z = Math.cos(elevation) * radius;

        const color = disabled
          ? baseColorRef.current.clone().lerp(new Color(0x333333), 0.6)
          : (anyHovered && !isHovered 
            ? baseColorRef.current.clone().lerp(new Color(0x666666), 0.4)
            : baseColorRef.current);

        return (
          <mesh key={i} position={[x, y, z]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshPhysicalMaterial
              color={color}
              emissive={pillar.accentColor}
              emissiveIntensity={disabled ? 0.05 : (0.3 * glowIntensity)}
              metalness={0.4}
              roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.3 : (dominant ? 0.4 : 0.5)}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SwarmOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const satellitesRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const satelliteCount = 5;

  const baseColorRef = useRef(new Color(pillar.primaryColor));
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !satellitesRef.current) return;
    
    if (isHovered) {
      hoverDelayRef.current += delta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;
    timeRef.current += delta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    if (failureGravityActive && pillar.id !== "failure") {
      const failurePos = new Vector3(0, 0, -3);
      const currentPos = new Vector3(driftX, driftY, driftZ);
      const bias = currentPos.lerp(failurePos, 0.1);
      groupRef.current.position.x = bias.x;
      groupRef.current.position.y = bias.y;
      groupRef.current.position.z = bias.z;
    } else {
      groupRef.current.position.x = driftX;
      groupRef.current.position.y = driftY;
      groupRef.current.position.z = driftZ;
    }

    groupRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    coreRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    coreRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.4 * motionMultiplier;
    
    satellitesRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.5 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += delta * 0.8;
    } else {
      pulseTimeRef.current = 0;
    }
  });

  const glowIntensity = isHovered && hoverDelayRef.current >= 0.25 ? pillar.personality.hoverGlow * (1.0 + Math.sin(pulseTimeRef.current) * 0.15) : 1.0;
  const orbitRadius = 0.9; // Fixed, no scale change

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color={disabled
            ? baseColorRef.current.clone().lerp(new Color(0x333333), 0.6)
            : (anyHovered && !isHovered ? baseColorRef.current.clone().lerp(new Color(0x666666), 0.4) : pillar.primaryColor)}
          emissive={pillar.primaryColor}
          emissiveIntensity={disabled ? 0.05 : (0.15 * glowIntensity)}
          metalness={0.5}
          roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.3 : (dominant ? 0.35 : 0.4)}
        />
      </mesh>

      {/* Satellites */}
      <group ref={satellitesRef}>
        {Array.from({ length: satelliteCount }).map((_, i) => {
          const angle = (i / satelliteCount) * Math.PI * 2;
          const elevation = (i / satelliteCount) * Math.PI * 0.5;
          const x = Math.cos(angle) * Math.sin(elevation) * orbitRadius;
          const y = Math.sin(angle) * Math.sin(elevation) * orbitRadius;
          const z = Math.cos(elevation) * orbitRadius;

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshPhysicalMaterial
                color={pillar.accentColor}
                emissive={pillar.accentColor}
                emissiveIntensity={0.2 * glowIntensity}
                metalness={0.3}
                roughness={0.6}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function SingularityOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const timeRef = useRef(0);
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !shellRef.current) return;
    
    if (isHovered) {
      hoverDelayRef.current += delta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    timeRef.current += delta * pillar.personality.driftSpeed * motionMultiplier;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    groupRef.current.position.x = driftX;
    groupRef.current.position.y = driftY;
    groupRef.current.position.z = driftZ;

    coreRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    coreRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    shellRef.current.rotation.x -= delta * pillar.personality.rotationSpeed * 0.15 * motionMultiplier;
    shellRef.current.rotation.y -= delta * pillar.personality.rotationSpeed * 0.25 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += delta * 0.8;
    } else {
      pulseTimeRef.current = 0;
    }

    // Failure gravity: scale compression
    const compression = failureGravityActive ? 0.95 : 1.0;
    groupRef.current.scale.setScalar(compression);
  });

  const glowIntensity = isHovered && hoverDelayRef.current >= 0.25 ? pillar.personality.hoverGlow * (1.0 + Math.sin(pulseTimeRef.current) * 0.15) : 1.0;
  const scale = 1.0; // Fixed, no scale change

  return (
    <group ref={groupRef}>
      {/* Dark core */}
      <mesh ref={coreRef} scale={scale}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color="#1a0000"
          emissive={pillar.primaryColor}
          emissiveIntensity={disabled ? 0.02 : (0.1 * glowIntensity)}
          metalness={0.8}
          roughness={dominant ? 0.15 : 0.2}
        />
      </mesh>

      {/* Transparent shell for lensing effect */}
      <mesh ref={shellRef} scale={scale * 1.3}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color={pillar.accentColor}
          transparent
          opacity={disabled ? 0.05 : 0.15}
          emissive={pillar.accentColor}
          emissiveIntensity={disabled ? 0.01 : (0.05 * glowIntensity)}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export default function PillarOrb({
  pillar,
  isHovered,
  isSelected,
  anyHovered,
  failureGravityActive,
  disabled = false,
  dominant = false,
  phase,
  onPointerOver,
  onPointerOut,
  onClick,
}: PillarOrbProps) {
  const groupRef = useRef<Group>(null);

  const renderOrb = () => {
    switch (pillar.type) {
      case "core":
        return <CoreOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} />;
      case "shards":
        return <ShardsOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} />;
      case "swarm":
        return <SwarmOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} />;
      case "singularity":
        return <SingularityOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} />;
    }
  };

  const handleClick = (event: any) => {
    if (disabled || !onClick) return;
    
    // Compute NDC from R3F pointer event
    let ndcX = 0;
    let ndcY = 0;
    
    if (event.pointer) {
      // R3F normalizes pointer coords to NDC [-1..1]
      ndcX = event.pointer.x;
      ndcY = event.pointer.y;
    } else if (event.clientX !== undefined) {
      // Fallback: compute from clientX/clientY
      const width = window.innerWidth;
      const height = window.innerHeight;
      ndcX = (event.clientX / width) * 2 - 1;
      ndcY = 1 - (event.clientY / height) * 2; // Flip Y
    }
    
    onClick({ ...event, ndc: { x: ndcX, y: ndcY } });
  };

  return (
    <group
      ref={groupRef}
      position={pillar.position}
      onPointerOver={disabled ? undefined : onPointerOver}
      onPointerOut={disabled ? undefined : onPointerOut}
      onClick={disabled ? undefined : handleClick}
    >
      {renderOrb()}
    </group>
  );
}
