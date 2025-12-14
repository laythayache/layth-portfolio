"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, PlaneGeometry, Color } from "three";
import * as THREE from "three";
import { getQualityProfile, applyQualityToRuptureUniforms } from "./quality";

// Tuning constants
const EDGE_SHARPNESS = 8.0;
const DISTORT_STRENGTH = 0.15;
const GRAIN_AMOUNT = 0.08;
const CHROMA_AMOUNT = 0.02;
const VIGNETTE_AMOUNT = 1.2;

interface RuptureOverlayProps {
  active: boolean;
  progress: number; // 0..1
  centerNdc: { x: number; y: number };
  tint: string; // hex color
}

// Hash-based value noise (inline, no textures)
const hash = (n: number): number => {
  return fract(Math.sin(n) * 43758.5453);
};

const fract = (x: number): number => x - Math.floor(x);

const noise = (p: number): number => {
  const i = Math.floor(p);
  const f = fract(p);
  return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
};

const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

const fbm = (p: number, octaves: number = 5): number => {
  let value = 0.0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uCenter;
  uniform vec3 uTint;
  uniform float uAspect;
  uniform float uGrainAmount;
  uniform float uChromaAmount;
  uniform float uVignetteAmount;
  
  varying vec2 vUv;
  
  // Hash-based noise (inline)
  float hash(float n) {
    return fract(sin(n) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = i.x + i.y * 57.0;
    return mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
               mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 center = uCenter;
    
    // Distance from center
    vec2 toCenter = uv - center;
    toCenter.x *= uAspect;
    float dist = length(toCenter);
    
    // Jagged tear edge using FBM
    float angle = atan(toCenter.y, toCenter.x);
    float radius = dist * 2.0;
    vec2 noiseCoord = vec2(angle * 2.0, radius * 3.0 + uTime * 0.5);
    float tearNoise = fbm(noiseCoord);
    
    // Edge mask (tear shape) - radial expansion
    float edgeDist = dist / (0.3 + uProgress * 0.7);
    float edge = 1.0 - smoothstep(0.0, 0.4, edgeDist);
    float tearEdge = edge * (0.3 + tearNoise * 0.7);
    float tearMask = smoothstep(0.0, 0.2, tearEdge * uProgress);
    
    // Radial distortion effect (visual only, no texture sampling)
    float distort = dist * 0.15 * uProgress;
    
    // Chromatic split (simulate with offset noise) - uses quality multiplier
    float chromaOffset = dist * uChromaAmount * uProgress;
    float rNoise = noise(uv + vec2(chromaOffset, 0.0) + uTime);
    float gNoise = noise(uv + uTime);
    float bNoise = noise(uv - vec2(chromaOffset, 0.0) + uTime);
    vec3 chromaColor = vec3(rNoise, gNoise, bNoise) * 0.1;
    
    // Vignette - uses quality multiplier
    float vignette = 1.0 - smoothstep(0.2, 1.0, dist) * uVignetteAmount * uProgress;
    
    // Grain - uses quality multiplier
    float grain = (noise(uv * 200.0 + uTime) - 0.5) * uGrainAmount * uProgress;
    
    // Base tear color (tinted)
    vec3 baseColor = uTint * tearMask;
    
    // Combine with chromatic aberration
    vec3 color = baseColor + chromaColor * uProgress;
    color *= vignette;
    color += grain;
    
    // Alpha based on tear mask
    float alpha = tearMask * uProgress;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function RuptureOverlay({ active, progress, centerNdc, tint }: RuptureOverlayProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const timeRef = useRef(0);

  // Convert NDC to 0..1 screen space
  const center01 = useMemo(() => ({
    x: centerNdc.x * 0.5 + 0.5,
    y: centerNdc.y * 0.5 + 0.5,
  }), [centerNdc]);

  // Parse tint color
  const tintColor = useMemo(() => {
    const color = new Color(tint);
    return [color.r, color.g, color.b];
  }, [tint]);

  const qualityProfile = getQualityProfile();
  
  const baseUniforms = useMemo(
    () => ({
      uProgress: 0,
      uTime: 0,
      uCenter: [center01.x, center01.y] as [number, number],
      uTint: tintColor,
      uAspect: size.width / size.height,
    }),
    [center01, tintColor, size]
  );

  const qualityUniforms = useMemo(
    () => applyQualityToRuptureUniforms(qualityProfile, baseUniforms),
    [qualityProfile, baseUniforms]
  );

  const uniforms = useMemo(
    () => ({
      uProgress: { value: qualityUniforms.uProgress },
      uTime: { value: qualityUniforms.uTime },
      uCenter: { value: qualityUniforms.uCenter },
      uTint: { value: qualityUniforms.uTint },
      uAspect: { value: qualityUniforms.uAspect },
      uGrainAmount: { value: qualityUniforms.uGrainAmount },
      uChromaAmount: { value: qualityUniforms.uChromaAmount },
      uVignetteAmount: { value: qualityUniforms.uVignetteAmount },
    }),
    [qualityUniforms]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    timeRef.current += delta;
    
    const qualityProfile = getQualityProfile();
    const qualityUniforms = applyQualityToRuptureUniforms(qualityProfile, {
      uProgress: progress,
      uTime: timeRef.current,
      uCenter: [center01.x, center01.y] as [number, number],
      uTint: tintColor,
      uAspect: size.width / size.height,
    });
    
    materialRef.current.uniforms.uProgress.value = qualityUniforms.uProgress;
    materialRef.current.uniforms.uTime.value = qualityUniforms.uTime;
    materialRef.current.uniforms.uAspect.value = qualityUniforms.uAspect;
    materialRef.current.uniforms.uGrainAmount.value = qualityUniforms.uGrainAmount;
    materialRef.current.uniforms.uChromaAmount.value = qualityUniforms.uChromaAmount;
    materialRef.current.uniforms.uVignetteAmount.value = qualityUniforms.uVignetteAmount;
  });

  if (!active || progress <= 0) return null;

  // Position plane close to camera to cover viewport
  // Using viewport to calculate proper size
  const planeSize = Math.max(viewport.width, viewport.height) * 1.5;

  return (
    <mesh ref={meshRef} renderOrder={9999} position={[0, 0, 0.1]}>
      <planeGeometry args={[planeSize, planeSize]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
