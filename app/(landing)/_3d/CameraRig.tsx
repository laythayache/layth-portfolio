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
  const commitStartTimeRef = useRef<number | null>(null);
  
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
  
  // Easing functions (pure, no deps)
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  const easeOutQuad = (t: number): number => {
    return 1 - (1 - t) * (1 - t);
  };
  
  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };
  
  // Helper: lerp between two vectors (reuse target vector, no allocation)
  const lerpVectors = (start: Vector3, end: Vector3, t: number, target: Vector3): void => {
    target.copy(start).lerp(end, t);
  };

  useFrame((state, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    
    // Pause when tab is hidden
    if (!isPageVisible) return;
    
    // Reduce motion when reduced motion is active
    const motionDelta = reducedMotion ? delta * 0.3 : delta;

    // Store initial camera state when commit/dive starts
    if (phase === "commit" && commitStartTimeRef.current === null) {
      commitStartTimeRef.current = Date.now();
    }
    if (phase === "dive" && initialCameraPosRef.current === null) {
      initialCameraPosRef.current = camera.position.clone();
      initialCameraFovRef.current = camera.fov;
    }
    if (phase !== "commit" && phase !== "dive" && phase !== "hold") {
      initialCameraPosRef.current = null;
      initialCameraFovRef.current = null;
      commitStartTimeRef.current = null;
    }
    
    // Use motionDelta for time-based calculations
    const effectiveDelta = reducedMotion ? motionDelta : delta;

    // Reuse Vector3 objects (no allocations)
    const targetPosition = targetPositionRef.current;
    const targetLookAt = targetLookAtRef.current;
    let targetFov = 40;

    if (phase === "commit" && selectedPillarPosition) {
      // COMMIT: Quick lock-in (easeOutQuad for snappy feel)
      const commitProgress = (Date.now() - (commitStartTimeRef.current || Date.now())) / 140; // 140ms duration
      const t = Math.min(1, Math.max(0, commitProgress));
      const easedT = easeOutQuad(t);
      
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      const startPos = centerRef.current.clone();
      const endPos = new Vector3(
        pillarPos.x * 0.2,
        pillarPos.y * 0.2,
        8 - pillarPos.z * 0.15
      );
      
      lerpVectors(startPos, endPos, easedT, targetPosition);
      targetLookAt.copy(pillarPos).multiplyScalar(0.4 * easedT);
      targetFov = 40; // No FOV change yet
    } else if (phase === "dive" && selectedPillarPosition && initialCameraPosRef.current && initialCameraFovRef.current !== null) {
      // DIVE: Decisive pull (easeInOutCubic for position, easeOutExpo for FOV)
      const progress = getDiveProgress();
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      
      // Calculate pre-portal position (slightly in front of orb)
      const camToPillar = camToPillarRef.current.copy(pillarPos).sub(initialCameraPosRef.current);
      const direction = directionRef.current.copy(camToPillar).normalize();
      const prePortalDistance = 2.2;
      const diveTargetPos = diveTargetPosRef.current.copy(pillarPos).sub(direction.multiplyScalar(prePortalDistance));
      
      // Position: easeInOutCubic (smooth acceleration/deceleration)
      const easedPositionT = easeInOutCubic(progress);
      lerpVectors(initialCameraPosRef.current, diveTargetPos, easedPositionT, targetPosition);
      
      // LookAt: easeOutQuad (snappy lock)
      const easedLookAtT = easeOutQuad(progress);
      targetLookAt.copy(initialCameraPosRef.current).lerp(pillarPos, easedLookAtT);
      
      // FOV: easeOutExpo (rapid expansion)
      const easedFovT = easeOutExpo(progress);
      targetFov = 40 + (70 - 40) * easedFovT;
      
      // Subtle "lock-in" overshoot at end (2-4% portal latch feel)
      if (progress > 0.92) {
        const overshootT = (progress - 0.92) / 0.08;
        const overshootAmount = Math.sin(overshootT * Math.PI) * 0.03; // 3% max
        targetPosition.lerp(diveTargetPos, overshootAmount);
      }
    } else if (phase === "hold" && selectedPillarPosition) {
      // HOLD: Quick settle (easeOutExpo for FOV)
      const holdProgress = getHoldProgress();
      const pillarPos = pillarPosRef.current.set(...selectedPillarPosition);
      const camToPillar = camToPillarRef.current.copy(pillarPos).sub(camera.position);
      const direction = directionRef.current.copy(camToPillar).normalize();
      const prePortalDistance = 2.2;
      targetPosition.copy(pillarPos).sub(direction.multiplyScalar(prePortalDistance));
      targetLookAt.copy(pillarPos);
      
      // FOV settle: easeOutExpo (quick snap back)
      const easedFovT = easeOutExpo(holdProgress);
      targetFov = 70 - (70 - 50) * easedFovT;
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

    // Direct position update (no lerp smoothing) for snappy feel during commit/dive/hold
    if (phase === "commit" || phase === "dive" || phase === "hold") {
      camera.position.copy(targetPosition);
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
      camera.lookAt(targetLookAt);
    } else {
      // Smooth interpolation only for idle/hover (preserve authority)
      const damping = 0.03;
      camera.position.lerp(targetPosition, damping);
      camera.fov = camera.fov + (targetFov - camera.fov) * 0.1;
      camera.updateProjectionMatrix();
      camera.getWorldDirection(currentLookAtRef.current);
      currentLookAtRef.current.multiplyScalar(10).add(camera.position);
      smoothLookAtRef.current.lerpVectors(currentLookAtRef.current, targetLookAt, damping);
      camera.lookAt(smoothLookAtRef.current);
    }
  });

  return null;
}
