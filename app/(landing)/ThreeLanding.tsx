"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import Scene with SSR disabled to avoid window issues
const Scene = dynamic(() => import("./_3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white font-mono text-xs uppercase">LOADING…</div>
    </div>
  ),
});

export default function ThreeLanding() {
  return (
    <div className="relative w-full h-screen">
      {/* DOM Overlay Label */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <div className="text-white font-mono text-xs uppercase text-gray-400">
          REALITY RESILIENCE // DESCENT INTERFACE
        </div>
      </div>

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-white font-mono text-xs uppercase">INITIALIZING…</div>
          </div>
        }
      >
        <Scene />
      </Suspense>
    </div>
  );
}
