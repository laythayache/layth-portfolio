"use client";

import { useReducedMotionGate } from "./useReducedMotionGate";
import ReducedMotionLanding from "./ReducedMotionLanding";
import ThreeLanding from "./ThreeLanding";

export default function LandingEntry() {
  const { reducedMotion, ready } = useReducedMotionGate();

  // Show minimal loading state until gate is ready
  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-sm uppercase">INITIALIZING…</div>
      </div>
    );
  }

  // Show reduced motion landing if gate is active
  if (reducedMotion) {
    return <ReducedMotionLanding />;
  }

  // Default: render 3D landing
  return <ThreeLanding />;
}
