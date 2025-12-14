"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { PillarId } from "./pillars";
import { DescentPhase } from "./useDescentState";

interface CameraRigProps {
  phase: DescentPhase;
  hoveredPillarId: PillarId | null;
  selectedPillarId: PillarId | null;
  selectedPillarPosition: [number, number, number] | null;
  pillars: Array<{ id: PillarId; position: [number, number, number] }>;
  getDiveProgress: () => number;
  getHoldProgress: () => number;
}

export default function CameraRig({
  phase,
  hoveredPillarId,
  selectedPillarId,
  selectedPillarPosition,
  pillars,
  getDiveProgress,
  getHoldProgress,
}: CameraRigProps) {
  const { camera } = useThree();
  const idleTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const lastHoveredId = useRef<PillarId | null>(null);
  const initialCameraPosRef = useRef<Vector3 | null>(null);
  const initialCameraFovRef = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;

    // Store initial camera state when dive starts
    if (phase === "dive" && initialCameraPosRef.current === null) {
      initialCameraPosRef.current = camera.position.clone();
      initialCameraFovRef.current = camera.fov;
    }
    if (phase !== "dive" && phase !== "hold") {
      initialCameraPosRef.current = null;
      initialCameraFovRef.current = null;
    }

    let targetPosition = new Vector3(0, 0, 8);
    let targetLookAt = new Vector3(0, 0, 0);
    let targetFov = 40;

    if (phase === "commit" && selectedPillarPosition) {
      // Begin aligning camera target to selected pillar
      const pillarPos = new Vector3(...selectedPillarPosition);
      const leanAmount = 0.2;
      targetPosition = new Vector3(
        pillarPos.x * leanAmount,
        pillarPos.y * leanAmount,
        8 - pillarPos.z * 0.15
      );
      targetLookAt = pillarPos.multiplyScalar(0.4);
      targetFov = 40; // No FOV change yet
    } else if (phase === "dive" && selectedPillarPosition && initialCameraPosRef.current && initialCameraFovRef.current !== null) {
      // DIVE: animate camera position and FOV
      const progress = getDiveProgress();
      const pillarPos = new Vector3(...selectedPillarPosition);
      
      // Calculate pre-portal position (slightly in front of orb)
      const camToPillar = pillarPos.clone().sub(initialCameraPosRef.current);
      const distance = camToPillar.length();
      const direction = camToPillar.normalize();
      const prePortalDistance = 2.2; // Stop distance
      const diveTargetPos = pillarPos.clone().sub(direction.multiplyScalar(prePortalDistance));
      
      // Accelerating lerp (ease-in-out)
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      targetPosition = initialCameraPosRef.current.clone().lerp(diveTargetPos, easedProgress);
      targetLookAt = pillarPos;
      
      // FOV ramp from 40 -> 70
      targetFov = 40 + (70 - 40) * easedProgress;
      
      // Micro-shake in last 25% of duration
      if (progress > 0.75) {
        const shakeAmount = (progress - 0.75) * 0.1; // Very subtle
        targetPosition.x += (Math.random() - 0.5) * shakeAmount;
        targetPosition.y += (Math.random() - 0.5) * shakeAmount;
        targetPosition.z += (Math.random() - 0.5) * shakeAmount;
      }
    } else if (phase === "hold" && selectedPillarPosition) {
      // HOLD: FOV returns to 50, keep lookAt locked
      const pillarPos = new Vector3(...selectedPillarPosition);
      const camToPillar = pillarPos.clone().sub(camera.position);
      const direction = camToPillar.normalize();
      const prePortalDistance = 2.2;
      targetPosition = pillarPos.clone().sub(direction.multiplyScalar(prePortalDistance));
      targetLookAt = pillarPos;
      
      // FOV settle to 50
      const holdProgress = getHoldProgress();
      const easedHold = holdProgress < 0.5
        ? 2 * holdProgress * holdProgress
        : 1 - Math.pow(-2 * holdProgress + 2, 2) / 2;
      targetFov = 70 - (70 - 50) * easedHold;
    } else if (hoveredPillarId && (phase === "idle" || phase === "hover")) {
      // Reaction delay for hover (200-300ms)
      if (hoveredPillarId !== lastHoveredId.current) {
        hoverDelayRef.current = 0;
        lastHoveredId.current = hoveredPillarId;
      }
      hoverDelayRef.current += delta;
      const hoverDelay = 0.25; // 250ms
      const canReact = hoverDelayRef.current >= hoverDelay;

      if (canReact) {
        const pillar = pillars.find((p) => p.id === hoveredPillarId);
        if (pillar) {
          const pillarPos = new Vector3(...pillar.position);
          const leanAmount = 0.2;
          targetPosition = new Vector3(
            pillarPos.x * leanAmount,
            pillarPos.y * leanAmount,
            8 - pillarPos.z * 0.15
          );
          targetLookAt = pillarPos.multiplyScalar(0.4);
        }
      }
    } else {
      // Idle drift (reduced by 30%)
      idleTimeRef.current += delta;
      const driftRadius = 0.35;
      targetPosition = new Vector3(
        Math.sin(idleTimeRef.current * 0.14) * driftRadius,
        Math.cos(idleTimeRef.current * 0.11) * driftRadius,
        8
      );
    }

    // Auto-recentering: if camera deviates too far, slowly correct (only in idle)
    if (phase === "idle" || phase === "hover") {
      const centerDistance = camera.position.distanceTo(new Vector3(0, 0, 8));
      const maxDeviation = 1.5;
      if (centerDistance > maxDeviation && !hoveredPillarId) {
        const correctionFactor = (centerDistance - maxDeviation) / maxDeviation;
        targetPosition.lerp(new Vector3(0, 0, 8), correctionFactor * 0.02);
      }
    }

    // Smooth camera movement with increased damping (more resistance)
    const damping = phase === "dive" ? 0.15 : 0.03; // Faster during dive
    camera.position.lerp(targetPosition, damping);
    
    // Update FOV
    camera.fov = camera.fov + (targetFov - camera.fov) * 0.1;
    camera.updateProjectionMatrix();
    
    // Look at target with smooth interpolation
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    const smoothLookAt = new Vector3().lerpVectors(currentLookAt, targetLookAt, damping);
    
    camera.lookAt(smoothLookAt);
  });

  return null;
}
