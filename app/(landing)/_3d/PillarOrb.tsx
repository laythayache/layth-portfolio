"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, Vector3 } from "three";
import { PillarDefinition } from "./pillars";
import * as THREE from "three";

interface PillarOrbProps {
  pillar: PillarDefinition;
  isHovered: boolean;
  isSelected: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
}

function CoreOrb({ pillar, isHovered, isSelected }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta * pillar.personality.driftSpeed;

    // Drift motion
    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.1;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.1;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.1;

    meshRef.current.position.x = driftX;
    meshRef.current.position.y = driftY;
    meshRef.current.position.z = driftZ;

    // Rotation
    meshRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.3;
    meshRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.5;
  });

  const glowIntensity = isHovered ? pillar.personality.hoverGlow : 1.0;
  const scale = isHovered ? 1.15 : isSelected ? 1.1 : 1.0;

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhysicalMaterial
        color={pillar.primaryColor}
        emissive={pillar.primaryColor}
        emissiveIntensity={0.2 * glowIntensity}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

function ShardsOrb({ pillar, isHovered, isSelected }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean }) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const shardCount = 12;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta * pillar.personality.driftSpeed;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.1;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.1;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.1;

    groupRef.current.position.x = driftX;
    groupRef.current.position.y = driftY;
    groupRef.current.position.z = driftZ;

    groupRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2;
    groupRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.4;
  });

  const radius = isHovered ? 0.6 : isSelected ? 0.7 : 0.8;
  const glowIntensity = isHovered ? pillar.personality.hoverGlow : 1.0;

  return (
    <group ref={groupRef}>
      {Array.from({ length: shardCount }).map((_, i) => {
        const angle = (i / shardCount) * Math.PI * 2;
        const elevation = (i / shardCount) * Math.PI;
        const x = Math.cos(angle) * Math.sin(elevation) * radius;
        const y = Math.sin(angle) * Math.sin(elevation) * radius;
        const z = Math.cos(elevation) * radius;

        return (
          <mesh key={i} position={[x, y, z]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshPhysicalMaterial
              color={pillar.primaryColor}
              emissive={pillar.accentColor}
              emissiveIntensity={0.3 * glowIntensity}
              metalness={0.4}
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SwarmOrb({ pillar, isHovered, isSelected }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const satellitesRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const satelliteCount = 5;

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !satellitesRef.current) return;
    timeRef.current += delta * pillar.personality.driftSpeed;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.1;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.1;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.1;

    groupRef.current.position.x = driftX;
    groupRef.current.position.y = driftY;
    groupRef.current.position.z = driftZ;

    groupRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.3;
    coreRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2;
    coreRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.4;
    
    // Rotate satellite group for orbital motion
    satellitesRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.5;
  });

  const glowIntensity = isHovered ? pillar.personality.hoverGlow : 1.0;
  const orbitRadius = isHovered ? 0.7 : 0.9;

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color={pillar.primaryColor}
          emissive={pillar.primaryColor}
          emissiveIntensity={0.15 * glowIntensity}
          metalness={0.5}
          roughness={0.4}
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

function SingularityOrb({ pillar, isHovered, isSelected }: { pillar: PillarDefinition; isHovered: boolean; isSelected: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !shellRef.current) return;
    timeRef.current += delta * pillar.personality.driftSpeed;

    const driftX = Math.sin(timeRef.current * 0.7) * pillar.personality.driftAmp * 0.1;
    const driftY = Math.cos(timeRef.current * 0.5) * pillar.personality.driftAmp * 0.1;
    const driftZ = Math.sin(timeRef.current * 0.3) * pillar.personality.driftAmp * 0.1;

    groupRef.current.position.x = driftX;
    groupRef.current.position.y = driftY;
    groupRef.current.position.z = driftZ;

    coreRef.current.rotation.x += delta * pillar.personality.rotationSpeed * 0.2;
    coreRef.current.rotation.y += delta * pillar.personality.rotationSpeed * 0.3;
    shellRef.current.rotation.x -= delta * pillar.personality.rotationSpeed * 0.15;
    shellRef.current.rotation.y -= delta * pillar.personality.rotationSpeed * 0.25;
  });

  const glowIntensity = isHovered ? pillar.personality.hoverGlow : 1.0;
  const scale = isHovered ? 1.2 : isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef}>
      {/* Dark core */}
      <mesh ref={coreRef} scale={scale}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color="#1a0000"
          emissive={pillar.primaryColor}
          emissiveIntensity={0.1 * glowIntensity}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Transparent shell for lensing effect */}
      <mesh ref={shellRef} scale={scale * 1.3}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color={pillar.accentColor}
          transparent
          opacity={0.15}
          emissive={pillar.accentColor}
          emissiveIntensity={0.05 * glowIntensity}
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
  onPointerOver,
  onPointerOut,
  onClick,
}: PillarOrbProps) {
  const groupRef = useRef<Group>(null);

  const renderOrb = () => {
    switch (pillar.type) {
      case "core":
        return <CoreOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} />;
      case "shards":
        return <ShardsOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} />;
      case "swarm":
        return <SwarmOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} />;
      case "singularity":
        return <SingularityOrb pillar={pillar} isHovered={isHovered} isSelected={isSelected} />;
    }
  };

  return (
    <group
      ref={groupRef}
      position={pillar.position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {renderOrb()}
    </group>
  );
}
