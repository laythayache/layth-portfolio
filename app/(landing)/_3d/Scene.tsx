"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

function SceneContent() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Subtle point light */}
      <pointLight position={[0, 0, 5]} intensity={0.3} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#000000" }}
      onCreated={(state) => {
        // Handle resize safely
        const handleResize = () => {
          state.gl.setSize(window.innerWidth, window.innerHeight);
          state.camera.aspect = window.innerWidth / window.innerHeight;
          state.camera.updateProjectionMatrix();
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
