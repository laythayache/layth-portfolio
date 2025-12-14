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

// Base premium orb (all orbs start identical)
function BasePremiumOrb({ pillar, opacity, scale }: { pillar: PillarDefinition; opacity: number; scale: number }) {
  const baseMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const rimMeshRef = useRef<Mesh>(null);
  const baseColorRef = useRef(new Color(pillar.primaryColor));

  useFrame(() => {
    if (baseMaterialRef.current) {
      baseMaterialRef.current.opacity = opacity;
    }
    if (rimMeshRef.current) {
      rimMeshRef.current.scale.setScalar(scale * 1.04);
      const rimMaterial = rimMeshRef.current.material as THREE.MeshBasicMaterial;
      if (rimMaterial) {
        rimMaterial.opacity = opacity * 0.12;
      }
    }
  });

  return (
    <group>
      {/* Base premium orb */}
      <mesh scale={scale}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          ref={baseMaterialRef}
          color={baseColorRef.current}
          emissive={baseColorRef.current}
          emissiveIntensity={0.15}
          roughness={0.25}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transmission={0.35}
          thickness={0.6}
          ior={1.45}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 600] as any}
          transparent
        />
      </mesh>
      {/* Screen-space rim glow */}
      <mesh ref={rimMeshRef} scale={scale * 1.04}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshBasicMaterial
          color={baseColorRef.current}
          transparent
          opacity={opacity * 0.12}
        />
      </mesh>
    </group>
  );
}

function CoreOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const rimMeshRef = useRef<Mesh>(null);
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
      materialRef.current.emissiveIntensity = 0.25 * pillar.personality.hoverGlow * pulse;
      materialRef.current.roughness = 0.2; // More contrast
    } else {
      pulseTimeRef.current = 0;
      materialRef.current.emissiveIntensity = 0.15;
      materialRef.current.roughness = 0.25;
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
      materialRef.current.emissiveIntensity = 0.15 * pulse;
      materialRef.current.roughness = 0.25; // Slightly more contrast
    }

    // Failure gravity: scale compression
    if (failureGravityActive && pillar.id === "failure") {
      const compression = 0.95;
      meshRef.current.scale.setScalar(compression * fractureScale);
    } else {
      meshRef.current.scale.setScalar(fractureScale);
    }

    // Update rim glow
    if (rimMeshRef.current) {
      rimMeshRef.current.scale.setScalar(fractureScale * 1.04);
      const rimMaterial = rimMeshRef.current.material as THREE.MeshBasicMaterial;
      if (rimMaterial) {
        rimMaterial.opacity = personalityOpacity * 0.12;
      }
    }
  });

  return (
    <group>
      {/* Personality orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={baseColorRef.current}
          emissive={baseColorRef.current}
          emissiveIntensity={isHovered && hoverDelayRef.current >= 0.25 ? 0.25 * pillar.personality.hoverGlow : 0.15}
          roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.2 : 0.25}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transmission={0.35}
          thickness={0.6}
          ior={1.45}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 600] as any}
          transparent
          opacity={personalityOpacity}
        />
      </mesh>
      {/* Screen-space rim glow */}
      <mesh ref={rimMeshRef} scale={fractureScale * 1.04}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshBasicMaterial
          color={baseColorRef.current}
          transparent
          opacity={personalityOpacity * 0.12}
        />
      </mesh>
    </group>
  );
}

function ShardsOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number }) {
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

  // Apply fracture scale to group
  if (groupRef.current) {
    groupRef.current.scale.setScalar(fractureScale);
  }

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
              clearcoat={1}
              clearcoatRoughness={0.1}
              transmission={0.2}
              thickness={0.4}
              ior={1.45}
              transparent
              opacity={personalityOpacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SwarmOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number }) {
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

  // Apply fracture scale to group
  if (groupRef.current) {
    groupRef.current.scale.setScalar(fractureScale);
  }

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          color={disabled
            ? baseColorRef.current.clone().lerp(new Color(0x333333), 0.6)
            : (anyHovered && !isHovered ? baseColorRef.current.clone().lerp(new Color(0x666666), 0.4) : pillar.primaryColor)}
          emissive={pillar.primaryColor}
          emissiveIntensity={disabled ? 0.05 : (0.15 * glowIntensity)}
          roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.2 : 0.25}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transmission={0.35}
          thickness={0.6}
          ior={1.45}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 600] as any}
          transparent
          opacity={personalityOpacity}
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
                metalness={0.25}
                roughness={0.3}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transmission={0.2}
                thickness={0.4}
                ior={1.45}
                transparent
                opacity={personalityOpacity}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function SingularityOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number }) {
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
    groupRef.current.scale.setScalar(compression * fractureScale);
  });

  const glowIntensity = isHovered && hoverDelayRef.current >= 0.25 ? pillar.personality.hoverGlow * (1.0 + Math.sin(pulseTimeRef.current) * 0.15) : 1.0;

  return (
    <group ref={groupRef}>
      {/* Dark core */}
      <mesh ref={coreRef} scale={fractureScale}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a0000"
          emissive={pillar.primaryColor}
          emissiveIntensity={disabled ? 0.02 : (0.1 * glowIntensity)}
          metalness={0.8}
          roughness={dominant ? 0.15 : 0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={personalityOpacity}
        />
      </mesh>

      {/* Transparent shell for lensing effect */}
      <mesh ref={shellRef} scale={fractureScale * 1.3}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color={pillar.accentColor}
          transparent
          opacity={(disabled ? 0.05 : 0.15) * personalityOpacity}
          emissive={pillar.accentColor}
          emissiveIntensity={disabled ? 0.01 : (0.05 * glowIntensity)}
          metalness={0.6}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.1}
          thickness={0.3}
          ior={1.45}
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
  
  // Crossfade state: base orb fades out, personality fades in on hover/commit
  const baseOpacityRef = useRef(1);
  const personalityOpacityRef = useRef(0);
  const fractureScaleRef = useRef(1.0);
  const fractureTimeRef = useRef(0);
  const [baseOpacity, setBaseOpacity] = useState(1);
  const [personalityOpacity, setPersonalityOpacity] = useState(0);
  const [fractureScale, setFractureScale] = useState(1.0);
  const shouldReveal = isHovered || dominant;

  useFrame((state, delta) => {
    fractureTimeRef.current += delta;
    
    // Crossfade animation
    if (shouldReveal) {
      // Base fades out, personality fades in
      baseOpacityRef.current = Math.max(0, baseOpacityRef.current - delta * 3); // Fast fade
      personalityOpacityRef.current = Math.min(1, personalityOpacityRef.current + delta * 3);
      
      // Fracture impulse: brief scale pulse + rotation impulse
      if (personalityOpacityRef.current < 0.5) {
        const impulse = Math.sin(fractureTimeRef.current * 8) * 0.05;
        fractureScaleRef.current = 1.0 + impulse;
      } else {
        fractureScaleRef.current = 1.0;
      }
    } else {
      // Return to base state
      baseOpacityRef.current = Math.min(1, baseOpacityRef.current + delta * 2);
      personalityOpacityRef.current = Math.max(0, personalityOpacityRef.current - delta * 2);
      fractureScaleRef.current = 1.0;
      fractureTimeRef.current = 0;
    }
    
    // Update state only when values change significantly (reduce re-renders)
    if (Math.abs(baseOpacityRef.current - baseOpacity) > 0.01) {
      setBaseOpacity(baseOpacityRef.current);
    }
    if (Math.abs(personalityOpacityRef.current - personalityOpacity) > 0.01) {
      setPersonalityOpacity(personalityOpacityRef.current);
    }
    if (Math.abs(fractureScaleRef.current - fractureScale) > 0.01) {
      setFractureScale(fractureScaleRef.current);
    }
  });

  const renderOrb = () => {
    switch (pillar.type) {
      case "core":
        return <CoreOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacity} personalityOpacity={personalityOpacity} fractureScale={fractureScale} />;
      case "shards":
        return <ShardsOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacity} personalityOpacity={personalityOpacity} fractureScale={fractureScale} />;
      case "swarm":
        return <SwarmOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacity} personalityOpacity={personalityOpacity} fractureScale={fractureScale} />;
      case "singularity":
        return <SingularityOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacity} personalityOpacity={personalityOpacity} fractureScale={fractureScale} />;
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
      {/* Base premium orb (fades out on hover/commit) */}
      {baseOpacity > 0 && (
        <BasePremiumOrb pillar={pillar} opacity={baseOpacity} scale={fractureScale} />
      )}
      
      {/* Personality orb (fades in on hover/commit) */}
      {personalityOpacity > 0 && (
        <group>
          {renderOrb()}
        </group>
      )}
    </group>
  );
}
