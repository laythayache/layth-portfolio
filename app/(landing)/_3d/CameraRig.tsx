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
  isPageVisible?: boolean;
  reducedMotion?: boolean;
}

export default function CameraRig({
  phase,
  hoveredPillarId,
  selectedPillarId,
  selectedPillarPosition,
  pillars,
  getDiveProgress,
  getHoldProgress,
  isPageVisible = true,
  reducedMotion = false,
}: CameraRigProps) {
  const { camera } = useThree();
  const idleTimeRef = useRef(0);
  const hoverDelayRef = useRef(0);
  const lastHoveredId = useRef<PillarId | null>(null);
  const initialCameraPosRef = useRef<Vector3 | null>(null);
  const initialCameraFovRef = useRef<number | null>(null);
  
  // Reusable Vector3 objects (eliminate allocations)
  const targetPositionRef = useRef(new Vector3(0, 0, 8));
  const targetLookAtRef = useRef(new Vector3(0, 0, 0));
  const pillarPosRef = useRef(new Vector3());
  const camToPillarRef = useRef(new Vector3());
  const directionRef = useRef(new Vector3());
  const diveTargetPosRef = useRef(new Vector3());
  const currentLookAtRef = useRef(new Vector3());
  const smoothLookAtRef = useRef(new Vector3());
  const centerRef = useRef(new Vector3(0, 0, 8));
  
  // Seeded PRNG for shake (replace Math.random)
  const shakeSeedRef = useRef(12345);
  const prng = () => {
    shakeSeedRef.current = (shakeSeedRef.current * 9301 + 49297) % 233280;
    return shakeSeedRef.current / 233280;
  };

  useFrame((state, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const motionDelta = reducedMotion ? delta * 0.3 : delta;

    // Store initial camera state when dive starts
    if (phase === "dive" && initialCameraPosRef.current === null) {
      initialCameraPosRef.current = camera.position.clone();
      initialCameraFovRef.current = camera.fov;
    }
    if (phase !== "dive" && phase !== "hold") {
      initialCameraPosRef.current = null;
      initialCameraFovRef.current = null;
    }
    
    // Use motionDelta for time-based calculations
    const effectiveDelta = reducedMotion ? motionDelta : delta;

    // Reuse Vector3 objects (no allocations)
    const targetPosition = targetPositionRef.current;
    const targetLookAt = targetLookAtRef.current;
    let targetFov = 40;

    if (phase === "commit" && selectedPillarPosition) {
      // Begin aligning camera target to selected pillar
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      const leanAmount = 0.2;
      targetPosition.set(
        pillarPos.x * leanAmount,
        pillarPos.y * leanAmount,
        8 - pillarPos.z * 0.15
      );
      targetLookAt.copy(pillarPos).multiplyScalar(0.4);
      targetFov = 40; // No FOV change yet
    } else if (phase === "dive" && selectedPillarPosition && initialCameraPosRef.current && initialCameraFovRef.current !== null) {
      // DIVE: animate camera position and FOV
      const progress = getDiveProgress();
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      
      // Calculate pre-portal position (slightly in front of orb)
      const camToPillar = camToPillarRef.current.copy(pillarPos).sub(initialCameraPosRef.current);
      const distance = camToPillar.length();
      const direction = directionRef.current.copy(camToPillar).normalize();
      const prePortalDistance = 2.2; // Stop distance
      const diveTargetPos = diveTargetPosRef.current.copy(pillarPos).sub(direction.multiplyScalar(prePortalDistance));
      
      // Accelerating lerp (ease-in-out)
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      targetPosition.copy(initialCameraPosRef.current).lerp(diveTargetPos, easedProgress);
      targetLookAt.copy(pillarPos);
      
      // FOV ramp from 40 -> 70
      targetFov = 40 + (70 - 40) * easedProgress;
      
      // Micro-shake in last 25% of duration (using seeded PRNG)
      if (progress > 0.75) {
        const shakeAmount = (progress - 0.75) * 0.1; // Very subtle
        targetPosition.x += (prng() - 0.5) * shakeAmount;
        targetPosition.y += (prng() - 0.5) * shakeAmount;
        targetPosition.z += (prng() - 0.5) * shakeAmount;
      }
    } else if (phase === "hold" && selectedPillarPosition) {
      // HOLD: FOV returns to 50, keep lookAt locked
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      const camToPillar = camToPillarRef.current.copy(pillarPos).sub(camera.position);
      const direction = directionRef.current.copy(camToPillar).normalize();
      const prePortalDistance = 2.2;
      targetPosition.copy(pillarPos).sub(direction.multiplyScalar(prePortalDistance));
      targetLookAt.copy(pillarPos);
      
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
      hoverDelayRef.current += effectiveDelta;
      const hoverDelay = 0.25; // 250ms
      const canReact = hoverDelayRef.current >= hoverDelay;

      if (canReact) {
        const pillar = pillars.find((p) => p.id === hoveredPillarId);
        if (pillar) {
          const pillarPos = pillarPosRef.current.set(...pillar.position);
          const leanAmount = 0.2;
          targetPosition.set(
            pillarPos.x * leanAmount,
            pillarPos.y * leanAmount,
            8 - pillarPos.z * 0.15
          );
          targetLookAt.copy(pillarPos).multiplyScalar(0.4);
        }
      }
    } else {
      // Idle drift (reduced by 30%, further reduced if reducedMotion)
      idleTimeRef.current += effectiveDelta;
      const driftRadius = 0.35;
      targetPosition.set(
        Math.sin(idleTimeRef.current * 0.14) * driftRadius,
        Math.cos(idleTimeRef.current * 0.11) * driftRadius,
        8
      );
    }

    // Auto-recentering: if camera deviates too far, slowly correct (only in idle)
    if (phase === "idle" || phase === "hover") {
      const centerDistance = camera.position.distanceTo(centerRef.current);
      const maxDeviation = 1.5;
      if (centerDistance > maxDeviation && !hoveredPillarId) {
        const correctionFactor = (centerDistance - maxDeviation) / maxDeviation;
        targetPosition.lerp(centerRef.current, correctionFactor * 0.02);
      }
    }

    // Smooth camera movement with increased damping (more resistance)
    const damping = phase === "dive" ? 0.15 : 0.03; // Faster during dive
    camera.position.lerp(targetPosition, damping);
    
    // Update FOV
    camera.fov = camera.fov + (targetFov - camera.fov) * 0.1;
    camera.updateProjectionMatrix();
    
    // Look at target with smooth interpolation
    camera.getWorldDirection(currentLookAtRef.current);
    currentLookAtRef.current.multiplyScalar(10).add(camera.position);
    smoothLookAtRef.current.lerpVectors(currentLookAtRef.current, targetLookAt, damping);
    
    camera.lookAt(smoothLookAtRef.current);
  });

  return null;
}
