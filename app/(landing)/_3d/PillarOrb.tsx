"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, Vector3, Color, ShaderMaterial } from "three";
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
  isPageVisible?: boolean;
  reducedMotion?: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: (event: any) => void;
}

// Fresnel rim shader for portal boundary
const rimVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const rimFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  // Cheap hash-based noise (1-2 ops)
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel effect (rim at grazing angles)
    float fresnel = pow(1.0 - dot(normal, viewDir), 2.0);
    
    // Subtle animated field (low frequency, stable)
    vec2 fieldUV = normal.xy * 0.3 + uTime * 0.1;
    float field = noise(fieldUV) * 0.15;
    
    // Rim is dominant, interior is darker
    float rimStrength = fresnel * uIntensity;
    float interiorStrength = 0.2 + field;
    
    vec3 finalColor = uColor * (rimStrength + interiorStrength);
    float alpha = rimStrength * 0.9 + interiorStrength * 0.3;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Base premium orb (all orbs start identical)
function BasePremiumOrb({ pillar, opacity, scale, isPageVisible = true, reducedMotion = false }: { pillar: PillarDefinition; opacity: number; scale: number; isPageVisible?: boolean; reducedMotion?: boolean }) {
  const baseMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const rimMeshRef = useRef<Mesh>(null);
  const rimMaterialRef = useRef<ShaderMaterial>(null);
  const baseColorRef = useRef(new Color(pillar.primaryColor));
  const fieldTimeRef = useRef(0);
  
  // Parse color once (no allocations in useFrame)
  const parsedColorRef = useRef(new Color(pillar.primaryColor));
  
  // Rim shader uniforms (reuse refs, no allocations)
  const rimUniformsRef = useRef({
    uColor: { value: new Vector3(parsedColorRef.current.r, parsedColorRef.current.g, parsedColorRef.current.b) },
    uIntensity: { value: 1.0 },
    uTime: { value: 0 },
  });

  useFrame((state, delta) => {
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    const effectiveDelta = reducedMotion ? delta * 0.3 : delta;
    fieldTimeRef.current += effectiveDelta;
    
    if (baseMaterialRef.current) {
      baseMaterialRef.current.opacity = opacity;
    }
    if (rimMeshRef.current) {
      rimMeshRef.current.scale.setScalar(scale * 1.02); // Slightly tighter rim
    }
    if (rimMaterialRef.current) {
      rimMaterialRef.current.uniforms.uIntensity.value = opacity * 1.2; // Rim is dominant
      rimMaterialRef.current.uniforms.uTime.value = fieldTimeRef.current;
    }
  });

  return (
    <group>
      {/* Base orb - reduced gloss, portal-like */}
      <mesh scale={scale}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          ref={baseMaterialRef}
          color={baseColorRef.current}
          emissive={baseColorRef.current}
          emissiveIntensity={0.12}
          roughness={0.45}
          metalness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.12}
          thickness={0.5}
          ior={1.45}
          transparent
        />
      </mesh>
      {/* Fresnel rim shader - portal boundary */}
      <mesh ref={rimMeshRef} scale={scale * 1.02}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <shaderMaterial
          ref={rimMaterialRef}
          vertexShader={rimVertexShader}
          fragmentShader={rimFragmentShader}
          uniforms={rimUniformsRef.current}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function CoreOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale, isPageVisible = true, reducedMotion = false }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number; isPageVisible?: boolean; reducedMotion?: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const rimMeshRef = useRef<Mesh>(null);
  const rimMaterialRef = useRef<ShaderMaterial>(null);
  const timeRef = useRef(0);
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const fieldTimeRef = useRef(0);
  const baseColorRef = useRef(new Color(pillar.primaryColor));
  
  // Reusable Vector3 and Color objects (eliminate allocations)
  const failurePosRef = useRef(new Vector3(0, 0, -3));
  const currentPosRef = useRef(new Vector3());
  const desaturatedColorRef = useRef(new Color());
  const grayColor1Ref = useRef(new Color(0x333333));
  const grayColor2Ref = useRef(new Color(0x666666));
  
  // Parse color once (no allocations in useFrame)
  const parsedColorRef = useRef(new Color(pillar.primaryColor));
  
  // Rim shader uniforms (reuse refs, no allocations)
  const rimUniformsRef = useRef({
    uColor: { value: new Vector3(parsedColorRef.current.r, parsedColorRef.current.g, parsedColorRef.current.b) },
    uIntensity: { value: 1.0 },
    uTime: { value: 0 },
  });

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const effectiveDelta = reducedMotion ? delta * 0.3 : delta;
    
    // Hover delay
    if (isHovered) {
      hoverDelayRef.current += effectiveDelta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25; // 250ms
    const canReact = hoverDelayRef.current >= hoverDelay;

    // Motion slowdown when other orb is hovered or when disabled
    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;

    timeRef.current += effectiveDelta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;
    fieldTimeRef.current += effectiveDelta * 0.1; // Slow field animation

    // Drift motion (reduced amplitude)
    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    // Failure gravity bias (reuse Vector3 objects)
    if (failureGravityActive && pillar.id !== "failure") {
      currentPosRef.current.set(driftX, driftY, driftZ);
      currentPosRef.current.lerp(failurePosRef.current, 0.1);
      meshRef.current.position.copy(currentPosRef.current);
    } else {
      meshRef.current.position.set(driftX, driftY, driftZ);
    }

    // Rotation (slower when other hovered)
    meshRef.current.rotation.x += effectiveDelta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    meshRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.5 * motionMultiplier;

    // Hover effects: contrast/emissive intensity, slow pulse (no scale)
    if (isHovered && canReact) {
      pulseTimeRef.current += effectiveDelta * 0.8; // Slow pulse
      const pulse = 1.0 + Math.sin(pulseTimeRef.current) * 0.15;
      materialRef.current.emissiveIntensity = 0.25 * pillar.personality.hoverGlow * pulse;
      materialRef.current.roughness = 0.2; // More contrast
    } else {
      pulseTimeRef.current = 0;
      materialRef.current.emissiveIntensity = 0.15;
      materialRef.current.roughness = 0.25;
    }

    // Desaturate when other orb is hovered or when disabled (reuse Color object)
    if (disabled) {
      desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor1Ref.current, 0.6);
      materialRef.current.color = desaturatedColorRef.current;
      materialRef.current.emissiveIntensity = 0.05; // Much reduced emissive
    } else if (anyHovered && !isHovered) {
      desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor2Ref.current, 0.4);
      materialRef.current.color = desaturatedColorRef.current;
    } else {
      materialRef.current.color = baseColorRef.current;
    }

    // Dominant orb: keep pulse, increase contrast slightly
    if (dominant && !isHovered) {
      pulseTimeRef.current += effectiveDelta * 0.6; // Slower pulse
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

    // Update rim shader
    if (rimMeshRef.current && rimMaterialRef.current) {
      rimMeshRef.current.scale.setScalar(fractureScale * 1.02);
      // Rim intensity increases on hover/commit
      const rimIntensity = (isHovered && canReact) || dominant ? personalityOpacity * 1.5 : personalityOpacity * 1.2;
      rimMaterialRef.current.uniforms.uIntensity.value = rimIntensity;
      rimMaterialRef.current.uniforms.uTime.value = fieldTimeRef.current;
    }
  });

  return (
    <group>
      {/* Personality orb - portal-like material */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={baseColorRef.current}
          emissive={baseColorRef.current}
          emissiveIntensity={isHovered && hoverDelayRef.current >= 0.25 ? 0.25 * pillar.personality.hoverGlow : 0.12}
          roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.35 : 0.45}
          metalness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.12}
          thickness={0.5}
          ior={1.45}
          transparent
          opacity={personalityOpacity}
        />
      </mesh>
      {/* Fresnel rim shader - portal boundary */}
      <mesh ref={rimMeshRef} scale={fractureScale * 1.02}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <shaderMaterial
          ref={rimMaterialRef}
          vertexShader={rimVertexShader}
          fragmentShader={rimFragmentShader}
          uniforms={rimUniformsRef.current}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ShardsOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale, isPageVisible = true, reducedMotion = false }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number; isPageVisible?: boolean; reducedMotion?: boolean }) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const shardCount = 12;
  const baseColorRef = useRef(new Color(pillar.primaryColor));
  
  // Reusable Vector3 and Color objects
  const failurePosRef = useRef(new Vector3(0, 0, -3));
  const currentPosRef = useRef(new Vector3());
  const desaturatedColorRef = useRef(new Color());
  const grayColor1Ref = useRef(new Color(0x333333));
  const grayColor2Ref = useRef(new Color(0x666666));

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const effectiveDelta = reducedMotion ? delta * 0.3 : delta;
    
    if (isHovered) {
      hoverDelayRef.current += effectiveDelta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;
    timeRef.current += effectiveDelta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;

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

    groupRef.current.rotation.x += effectiveDelta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    groupRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.4 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += effectiveDelta * 0.8;
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

        // Reuse Color object (no allocations)
        const color = disabled
          ? desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor1Ref.current, 0.6)
          : (anyHovered && !isHovered 
            ? desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor2Ref.current, 0.4)
            : baseColorRef.current);

        return (
          <mesh key={i} position={[x, y, z]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshPhysicalMaterial
              color={color}
              emissive={pillar.accentColor}
              emissiveIntensity={disabled ? 0.05 : (0.3 * glowIntensity)}
              metalness={0.3}
              roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.4 : (dominant ? 0.45 : 0.5)}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
              transmission={0.12}
              thickness={0.5}
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

function SwarmOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale, isPageVisible = true, reducedMotion = false }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number; isPageVisible?: boolean; reducedMotion?: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const satellitesRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const satelliteCount = 5;

  const baseColorRef = useRef(new Color(pillar.primaryColor));
  const pulseTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  
  // Reusable Vector3 and Color objects
  const failurePosRef = useRef(new Vector3(0, 0, -3));
  const currentPosRef = useRef(new Vector3());
  const desaturatedColorRef = useRef(new Color());
  const grayColor1Ref = useRef(new Color(0x333333));
  const grayColor2Ref = useRef(new Color(0x666666));

  useEffect(() => {
    if (isHovered) {
      hoverDelayRef.current = 0;
    }
  }, [isHovered]);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !satellitesRef.current) return;
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const effectiveDelta = reducedMotion ? delta * 0.3 : delta;
    
    if (isHovered) {
      hoverDelayRef.current += effectiveDelta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    const driftMultiplier = failureGravityActive && pillar.id !== "failure" ? 0.7 : 1.0;
    timeRef.current += effectiveDelta * pillar.personality.driftSpeed * motionMultiplier * driftMultiplier;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    if (failureGravityActive && pillar.id !== "failure") {
      currentPosRef.current.set(driftX, driftY, driftZ);
      currentPosRef.current.lerp(failurePosRef.current, 0.1);
      groupRef.current.position.copy(currentPosRef.current);
    } else {
      groupRef.current.position.set(driftX, driftY, driftZ);
    }

    groupRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    coreRef.current.rotation.x += effectiveDelta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    coreRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.4 * motionMultiplier;
    
    satellitesRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.5 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += effectiveDelta * 0.8;
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
            ? desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor1Ref.current, 0.6)
            : (anyHovered && !isHovered ? desaturatedColorRef.current.copy(baseColorRef.current).lerp(grayColor2Ref.current, 0.4) : pillar.primaryColor)}
          emissive={pillar.primaryColor}
          emissiveIntensity={disabled ? 0.05 : (0.12 * glowIntensity)}
          roughness={isHovered && hoverDelayRef.current >= 0.25 ? 0.35 : 0.45}
          metalness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.12}
          thickness={0.5}
          ior={1.45}
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
                metalness={0.2}
                roughness={0.45}
                clearcoat={0.5}
                clearcoatRoughness={0.2}
                transmission={0.12}
                thickness={0.5}
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

function SingularityOrb({ pillar, isHovered, isSelected, anyHovered, failureGravityActive, disabled, dominant, baseOpacity, personalityOpacity, fractureScale, isPageVisible = true, reducedMotion = false }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean; anyHovered: boolean; failureGravityActive: boolean; disabled?: boolean; dominant?: boolean; baseOpacity: number; personalityOpacity: number; fractureScale: number; isPageVisible?: boolean; reducedMotion?: boolean }) {
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
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const effectiveDelta = reducedMotion ? delta * 0.3 : delta;
    
    if (isHovered) {
      hoverDelayRef.current += effectiveDelta;
    } else {
      hoverDelayRef.current = 0;
    }
    const hoverDelay = 0.25;
    const canReact = hoverDelayRef.current >= hoverDelay;

    const motionMultiplier = disabled ? 0.3 : (anyHovered && !isHovered ? 0.5 : 1.0);
    timeRef.current += effectiveDelta * pillar.personality.driftSpeed * motionMultiplier;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.08;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.08;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.08;

    groupRef.current.position.x = driftX;
    groupRef.current.position.y = driftY;
    groupRef.current.position.z = driftZ;

    coreRef.current.rotation.x += effectiveDelta * pillar.personality.rotationSpeed * 0.2 * motionMultiplier;
    coreRef.current.rotation.y += effectiveDelta * pillar.personality.rotationSpeed * 0.3 * motionMultiplier;
    shellRef.current.rotation.x -= effectiveDelta * pillar.personality.rotationSpeed * 0.15 * motionMultiplier;
    shellRef.current.rotation.y -= effectiveDelta * pillar.personality.rotationSpeed * 0.25 * motionMultiplier;

    if (isHovered && canReact) {
      pulseTimeRef.current += effectiveDelta * 0.8;
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
          metalness={0.6}
          roughness={dominant ? 0.35 : 0.4}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
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
          roughness={0.45}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
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
  isPageVisible = true,
  reducedMotion = false,
  onPointerOver,
  onPointerOut,
  onClick,
}: PillarOrbProps) {
  const groupRef = useRef<Group>(null);
  
  // Crossfade state: base orb fades out, personality fades in on hover/commit
  // Use refs only (no React state) to avoid re-renders in animation loop
  const baseOpacityRef = useRef(1);
  const personalityOpacityRef = useRef(0);
  const fractureScaleRef = useRef(1.0);
  const fractureTimeRef = useRef(0);
  const shouldReveal = isHovered || dominant;

  useFrame((state, delta) => {
    // Pause when tab is hidden (checked in child orbs, but guard here too)
    if (typeof document !== "undefined" && document.hidden) return;
    
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
  });

  const renderOrb = () => {
    switch (pillar.type) {
      case "core":
        return <CoreOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacityRef.current} personalityOpacity={personalityOpacityRef.current} fractureScale={fractureScaleRef.current} isPageVisible={isPageVisible} reducedMotion={reducedMotion} />;
      case "shards":
        return <ShardsOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacityRef.current} personalityOpacity={personalityOpacityRef.current} fractureScale={fractureScaleRef.current} isPageVisible={isPageVisible} reducedMotion={reducedMotion} />;
      case "swarm":
        return <SwarmOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacityRef.current} personalityOpacity={personalityOpacityRef.current} fractureScale={fractureScaleRef.current} isPageVisible={isPageVisible} reducedMotion={reducedMotion} />;
      case "singularity":
        return <SingularityOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} anyHovered={anyHovered} failureGravityActive={failureGravityActive} disabled={disabled} dominant={dominant} baseOpacity={baseOpacityRef.current} personalityOpacity={personalityOpacityRef.current} fractureScale={fractureScaleRef.current} isPageVisible={isPageVisible} reducedMotion={reducedMotion} />;
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
      {baseOpacityRef.current > 0 && (
        <BasePremiumOrb pillar={pillar} opacity={baseOpacityRef.current} scale={fractureScaleRef.current} isPageVisible={isPageVisible} reducedMotion={reducedMotion} />
      )}
      
      {/* Personality orb (fades in on hover/commit) */}
      {personalityOpacityRef.current > 0 && (
        <group>
          {renderOrb()}
        </group>
      )}
    </group>
  );
}
