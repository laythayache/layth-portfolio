"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { PillarId } from "./pillars";

interface CameraRigProps {
  hoveredPillarId: PillarId | null;
  pillars: Array<{ id: PillarId; position: [number, number, number] }>;
}

export default function CameraRig({ hoveredPillarId, pillars }: CameraRigProps) {
  const { camera } = useThree();
  const targetRef = useRef(new Vector3(0, 0, 0));
  const idleTimeRef = useRef(0);

  useFrame((state, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;

    let targetPosition = new Vector3(0, 0, 8);
    let targetLookAt = new Vector3(0, 0, 0);
    let driftSpeed = 0.3;

    if (hoveredPillarId) {
      const pillar = pillars.find((p) => p.id === hoveredPillarId);
      if (pillar) {
        // Lean camera toward hovered pillar
        const pillarPos = new Vector3(...pillar.position);
        const leanAmount = 0.3;
        targetPosition = new Vector3(
          pillarPos.x * leanAmount,
          pillarPos.y * leanAmount,
          8 - pillarPos.z * 0.2
        );
        targetLookAt = pillarPos.multiplyScalar(0.5);
        driftSpeed = 0.1; // Reduce drift when hovering
      }
    } else {
      // Idle drift
      idleTimeRef.current += delta;
      const driftRadius = 0.5;
      targetPosition = new Vector3(
        Math.sin(idleTimeRef.current * 0.2) * driftRadius,
        Math.cos(idleTimeRef.current * 0.15) * driftRadius,
        8
      );
    }

    // Smooth camera movement with damping
    const damping = 0.05;
    camera.position.lerp(targetPosition, damping);
    
    // Look at target with smooth interpolation
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    const smoothLookAt = new Vector3().lerpVectors(currentLookAt, targetLookAt, damping);
    
    camera.lookAt(smoothLookAt);
  });

  return null;
}
