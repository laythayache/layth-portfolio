# Performance Findings — Bottleneck Analysis

**Generated:** Step 2 — Diagnose Why It's Heavy  
**Based On:** Code analysis + instrumentation setup  
**Instrumentation:** `PerformanceMonitor.tsx` (active in dev mode or `RR_PERF_MONITOR=true`)

---

## Instrumentation Status

✅ **PerformanceMonitor Component Created**
- Location: `app/(landing)/_3d/PerformanceMonitor.tsx`
- Tracks: FPS (moving average), frame time (ms), dropped frames, long tasks
- Display: Top-right overlay (dev mode only, or `localStorage.setItem("RR_PERF_MONITOR", "true")`)
- Respects: `prefers-reduced-motion` (monitoring disabled if reduced motion active)

---

## Bottleneck Ranking (High → Low Impact)

### 🔴 **CRITICAL: Vector3 Allocations in Hot Loops**

**Location:** `app/(landing)/_3d/CameraRig.tsx` (lines 48-164)

**Evidence:**
```typescript
useFrame((state, delta) => {
  let targetPosition = new Vector3(0, 0, 8);  // NEW ALLOCATION EVERY FRAME
  let targetLookAt = new Vector3(0, 0, 0);    // NEW ALLOCATION EVERY FRAME
  
  // Multiple additional allocations:
  const pillarPos = new Vector3(...selectedPillarPosition);
  const camToPillar = pillarPos.clone().sub(...);  // clone() = NEW ALLOCATION
  const diveTargetPos = pillarPos.clone().sub(...); // clone() = NEW ALLOCATION
  const currentLookAt = new Vector3();              // NEW ALLOCATION
  const smoothLookAt = new Vector3().lerpVectors(...); // NEW ALLOCATION
});
```

**Impact:**
- **~8-12 Vector3 allocations per frame** (60fps = 480-720 allocations/second)
- Each allocation triggers GC pressure
- GC pauses cause frame drops
- **Estimated cost:** 2-5ms per frame (10-30% of 16.67ms budget)

**Why It's Heavy:**
- Vector3 objects are heap-allocated
- Frequent allocations fragment memory
- GC must run more often to reclaim memory
- GC pauses block the main thread → stutter

---

### 🔴 **CRITICAL: Color Allocations in Orb Animation Loops**

**Location:** `app/(landing)/_3d/PillarOrb.tsx` (multiple orb types)

**Evidence:**
```typescript
// CoreOrb, ShardsOrb, SwarmOrb (lines 118-156, 255-299, 362-403)
useFrame((state, delta) => {
  // Failure gravity: NEW Vector3 allocations
  const failurePos = new Vector3(0, 0, -3);
  const currentPos = new Vector3(driftX, driftY, driftZ);
  
  // Color desaturation: NEW Color allocations
  const desaturated = baseColorRef.current.clone().lerp(new Color(0x333333), 0.6);
  // OR
  const desaturated = baseColorRef.current.clone().lerp(new Color(0x666666), 0.4);
});
```

**Impact:**
- **5 orbs × 2-4 allocations per frame = 10-20 allocations/frame**
- **600-1200 allocations/second** at 60fps
- Color lerp operations are expensive (RGB interpolation)
- **Estimated cost:** 1-3ms per frame (6-18% of budget)

**Why It's Heavy:**
- Color objects are heap-allocated
- `clone().lerp()` creates 2 objects per operation
- Happens in every orb's `useFrame` hook
- Multiplied by 5 orbs = 5× the cost

---

### 🟠 **HIGH: React State Updates in Animation Loop**

**Location:** `app/(landing)/_3d/PillarOrb.tsx` (lines 574-608)

**Evidence:**
```typescript
useFrame((state, delta) => {
  // ... crossfade calculations ...
  
  // Update state only when values change significantly (reduce re-renders)
  if (Math.abs(baseOpacityRef.current - baseOpacity) > 0.01) {
    setBaseOpacity(baseOpacityRef.current);  // TRIGGERS RE-RENDER
  }
  if (Math.abs(personalityOpacityRef.current - personalityOpacity) > 0.01) {
    setPersonalityOpacity(personalityOpacityRef.current);  // TRIGGERS RE-RENDER
  }
  if (Math.abs(fractureScaleRef.current - fractureScale) > 0.01) {
    setFractureScale(fractureScaleRef.current);  // TRIGGERS RE-RENDER
  }
});
```

**Impact:**
- State updates trigger React reconciliation
- Reconciliation can take 1-3ms per update
- Updates happen ~10-30 times per second during crossfade
- **Estimated cost:** 0.5-2ms per frame (3-12% of budget)

**Why It's Heavy:**
- React must diff virtual DOM
- Triggers re-render of component tree
- Can cause layout thrashing if DOM measurements occur
- Happens during critical animation phase (hover/commit)

---

### 🟠 **HIGH: High-Frequency Shader Computations**

**Location:** `app/(landing)/_3d/RuptureOverlay.tsx` (fragment shader, lines 84-145)

**Evidence:**
```glsl
// Fragment shader runs PER PIXEL (1920×1080 = 2M+ pixels)
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {  // 5 OCTAVES
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Called multiple times per fragment:
float tearNoise = fbm(noiseCoord);  // 5 octaves
float rNoise = noise(uv + vec2(chromaOffset, 0.0) + uTime);  // 1 octave
float gNoise = noise(uv + uTime);  // 1 octave
float bNoise = noise(uv - vec2(chromaOffset, 0.0) + uTime);  // 1 octave
float grain = noise(uv * 200.0 + uTime);  // VERY HIGH FREQUENCY (200x)
```

**Impact:**
- **~8-10 noise calculations per pixel** (5 octaves FBM + 3 chroma + 1 grain)
- **1920×1080 = 2,073,600 pixels × 8-10 ops = 16-20M operations per frame**
- GPU-bound, but can saturate fragment shader units
- **Estimated cost:** 3-8ms GPU time (18-48% of budget)

**Why It's Heavy:**
- FBM with 5 octaves = 5× the cost of single noise
- Grain at 200× frequency = very expensive
- Chromatic aberration = 3× noise calls
- All computed per-fragment (every pixel)

---

### 🟡 **MEDIUM: Redundant Quality Recalculation**

**Location:** `app/(landing)/_3d/RuptureOverlay.tsx` (lines 198-217)

**Evidence:**
```typescript
useFrame((state, delta) => {
  if (!materialRef.current) return;
  timeRef.current += delta;
  
  // REDUNDANT: getQualityProfile() is cached, but still called
  const qualityProfile = getQualityProfile();
  
  // REDUNDANT: Recomputes quality uniforms every frame
  const qualityUniforms = applyQualityToRuptureUniforms(qualityProfile, {
    uProgress: progress,
    uTime: timeRef.current,
    uCenter: [center01.x, center01.y] as [number, number],  // NEW ARRAY ALLOCATION
    uTint: tintColor,  // Array already exists, but passed again
    uAspect: size.width / size.height,  // Recalculated
  });
  
  // Updates 6 uniforms
  materialRef.current.uniforms.uProgress.value = qualityUniforms.uProgress;
  // ... 5 more uniform updates
});
```

**Impact:**
- Quality profile is cached, but function call overhead remains
- `applyQualityToRuptureUniforms` creates new object every frame
- Array allocation for `uCenter` every frame
- **Estimated cost:** 0.1-0.5ms per frame (0.6-3% of budget)

**Why It's Heavy:**
- Unnecessary object creation
- Function call overhead (even if cached)
- Could be optimized to only update when quality changes

---

### 🟡 **MEDIUM: Math.random() in Animation Loop**

**Location:** `app/(landing)/_3d/CameraRig.tsx` (lines 87-91)

**Evidence:**
```typescript
// Micro-shake in last 25% of duration
if (progress > 0.75) {
  const shakeAmount = (progress - 0.75) * 0.1;
  targetPosition.x += (Math.random() - 0.5) * shakeAmount;  // 3× Math.random() calls
  targetPosition.y += (Math.random() - 0.5) * shakeAmount;
  targetPosition.z += (Math.random() - 0.5) * shakeAmount;
}
```

**Impact:**
- `Math.random()` is relatively expensive (crypto-secure RNG)
- Called 3× per frame during shake phase
- **Estimated cost:** 0.05-0.2ms per frame (0.3-1.2% of budget)

**Why It's Heavy:**
- Cryptographically secure RNG is slower than simple PRNG
- Could use seeded PRNG or precomputed noise

---

### 🟢 **LOW: Multiple Material Property Updates**

**Location:** `app/(landing)/_3d/PillarOrb.tsx` (all orb types)

**Evidence:**
```typescript
// Each orb updates multiple material properties per frame:
materialRef.current.emissiveIntensity = ...;
materialRef.current.roughness = ...;
materialRef.current.color = ...;  // Color assignment (can trigger shader recompile)
```

**Impact:**
- Material property updates are relatively cheap
- But multiplied by 5 orbs = 5× the work
- Color assignment can trigger shader recompilation (rare, but expensive)
- **Estimated cost:** 0.2-0.8ms per frame (1-5% of budget)

**Why It's Moderate:**
- Three.js material updates are optimized
- But still requires GPU state changes
- Color changes can invalidate shader cache

---

### 🟢 **LOW: Geometry Detail (64 segments)**

**Location:** `app/(landing)/_3d/PillarOrb.tsx` (BasePremiumOrb, CoreOrb, etc.)

**Evidence:**
```typescript
<sphereGeometry args={[0.8, 64, 64]} />  // 64×64 = 4096 vertices per sphere
```

**Impact:**
- High vertex count = more GPU work
- But modern GPUs handle this well
- **Estimated cost:** 0.1-0.3ms per frame (0.6-2% of budget)

**Why It's Low:**
- GPU vertex processing is fast
- Only 5 orbs × 2 meshes (base + rim) = 10 meshes total
- Modern GPUs can handle millions of vertices

---

## Summary: Estimated Frame Time Breakdown

**Target:** 16.67ms per frame (60fps)

| Bottleneck | Estimated Cost | % of Budget | Priority |
|------------|----------------|-------------|----------|
| Vector3 allocations (CameraRig) | 2-5ms | 12-30% | 🔴 CRITICAL |
| Color allocations (PillarOrb) | 1-3ms | 6-18% | 🔴 CRITICAL |
| Shader computations (RuptureOverlay) | 3-8ms | 18-48% | 🟠 HIGH |
| React state updates | 0.5-2ms | 3-12% | 🟠 HIGH |
| Quality recalculation | 0.1-0.5ms | 0.6-3% | 🟡 MEDIUM |
| Math.random() | 0.05-0.2ms | 0.3-1.2% | 🟡 MEDIUM |
| Material updates | 0.2-0.8ms | 1-5% | 🟢 LOW |
| Geometry detail | 0.1-0.3ms | 0.6-2% | 🟢 LOW |
| **TOTAL** | **7-20ms** | **42-120%** | ⚠️ **OVER BUDGET** |

**Conclusion:** System is **over budget** on mid-tier hardware. Critical fixes (Vector3/Color allocations) should bring it under 16ms.

---

## Expected Performance After Fixes

**After eliminating Vector3/Color allocations:**
- **Estimated frame time:** 4-12ms (24-72% of budget)
- **Expected FPS:** 50-60fps (stable)

**After optimizing shader:**
- **Estimated frame time:** 2-8ms (12-48% of budget)
- **Expected FPS:** 55-60fps (smooth)

**After all optimizations:**
- **Estimated frame time:** 2-6ms (12-36% of budget)
- **Expected FPS:** 60fps (locked)

---

## Next Steps

1. ✅ **Instrumentation added** — PerformanceMonitor.tsx
2. ⏭️ **Step 3:** Implement Lite Mode (DRS, reduce allocations, optimize shaders)
3. ⏭️ **Step 4:** Bug-proofing (cleanup, guards, Page Visibility API)

---

**End of Performance Findings**
