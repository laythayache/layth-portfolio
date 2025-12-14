# Reality Map — 3D Orb System Architecture

**Generated:** Step 1 — Codebase Discovery  
**Purpose:** Grounded map of existing implementation before performance optimization

---

## 1. Rendering Entry Point (Canvas/WebGL/Three.js)

### File: `app/(landing)/_3d/Scene.tsx`

**Entry Point:**
```typescript
<Canvas
  camera={{ position: [0, 0, 8], fov: 40 }}
  gl={{ antialias: qualityProfile === "full", alpha: false }}
  dpr={canvasDpr}
  style={{ background: "#000000" }}
>
```

**Key Details:**
- React Three Fiber (`@react-three/fiber`) Canvas wrapper
- DPR controlled by `getCanvasDpr(qualityProfile)` from `quality.ts`
- Antialiasing only in "full" quality mode
- Scene renders: Environment, lights, fog, FailureGravitySystem, CameraRig, 5x PillarOrb, RuptureOverlay

**Wrapped By:** `app/(landing)/ThreeLanding.tsx` (dynamic import with `ssr: false`)

---

## 2. Animation Loop (requestAnimationFrame)

### Primary Loop: React Three Fiber `useFrame`

**Files with `useFrame` hooks:**

#### A. `app/(landing)/_3d/Scene.tsx` — `FailureGravitySystem`
```typescript
useFrame((state, delta) => {
  timeRef.current += delta;
  lastTriggerRef.current += delta;
  durationRef.current -= delta;
  // Triggers every 15s, active for 1s
});
```
**Cost:** Minimal (timer logic only)

#### B. `app/(landing)/_3d/PillarOrb.tsx` — Multiple `useFrame` hooks

**BasePremiumOrb:**
```typescript
useFrame(() => {
  baseMaterialRef.current.opacity = opacity;
  rimMeshRef.current.scale.setScalar(scale * 1.04);
  rimMaterial.opacity = opacity * 0.12;
});
```
**Cost:** Low (2 material updates, 1 scale)

**CoreOrb:**
```typescript
useFrame((state, delta) => {
  // Hover delay tracking
  // Drift motion (sin/cos calculations)
  // Failure gravity bias (Vector3 operations)
  // Rotation updates
  // Material property updates (emissiveIntensity, roughness, color)
  // Scale updates
  // Rim glow updates
});
```
**Cost:** Medium-High (multiple Vector3 ops, color lerps, material updates per frame)

**ShardsOrb:**
```typescript
useFrame((state, delta) => {
  // Similar to CoreOrb but operates on groupRef
  // 12 shard meshes, each with material updates
});
```
**Cost:** High (12 meshes × material updates)

**SwarmOrb:**
```typescript
useFrame((state, delta) => {
  // Core + 5 satellite meshes
  // Group rotation + individual rotations
});
```
**Cost:** Medium (6 meshes total)

**SingularityOrb:**
```typescript
useFrame((state, delta) => {
  // Core + shell mesh
  // Counter-rotations
});
```
**Cost:** Low-Medium (2 meshes)

**Main PillarOrb (crossfade logic):**
```typescript
useFrame((state, delta) => {
  // Crossfade opacity calculations
  // Fracture scale pulse (sin wave)
  // State updates when change > 0.01
  setBaseOpacity(...);
  setPersonalityOpacity(...);
  setFractureScale(...);
});
```
**Cost:** Medium (triggers React re-renders when threshold exceeded)

#### C. `app/(landing)/_3d/CameraRig.tsx`
```typescript
useFrame((state, delta) => {
  // Phase-based camera logic
  // Vector3 operations (lerp, normalize, multiplyScalar)
  // FOV interpolation
  // LookAt calculations
  // Auto-recentering logic
  // Math.random() for micro-shake (last 25% of dive)
});
```
**Cost:** Medium (Vector3 allocations: `new Vector3()` called multiple times per frame)

#### D. `app/(landing)/_3d/RuptureOverlay.tsx`
```typescript
useFrame((state, delta) => {
  timeRef.current += delta;
  // Recomputes quality uniforms every frame
  // Updates 6 shader uniforms
});
```
**Cost:** Low-Medium (uniform updates, but quality recalculation is redundant)

---

## 3. Orb State Machine and Transitions

### File: `app/(landing)/_3d/useDescentState.ts`

**State Machine:**
```typescript
type DescentPhase = "idle" | "hover" | "commit" | "dive" | "hold";
```

**Transitions:**
- `idle` → `hover` (via `setHovered(id)`)
- `hover` → `commit` (via `commitTo(id, center)`)
- `commit` → `dive` (auto, 200ms timeout)
- `dive` → `hold` (auto, 1200ms timeout)
- `hold` → (navigation triggers at progress >= 0.85)

**Timing Constants:**
```typescript
const COMMIT_DURATION = 200; // 200ms
const DIVE_DURATION = 1200; // 1200ms
const HOLD_FOV_SETTLE = 300; // 300ms
```

**Progress Functions:**
- `getDiveProgress()`: `(Date.now() - diveStartTimeRef.current) / DIVE_DURATION`
- `getHoldProgress()`: `(Date.now() - holdStartTimeRef.current) / HOLD_FOV_SETTLE`

**Used By:** `ThreeLanding.tsx` (wires state to Scene, handles navigation)

---

## 4. Input Handlers (Mouse/Touch/Keyboard)

### File: `app/(landing)/ThreeLanding.tsx`

#### Mouse:
- `onPillarHover(id)` → `setHovered(id)` (via Scene → PillarOrb `onPointerOver`)
- `handlePillarClick(id, center)` → `commitTo(id, center)` (via Scene → PillarOrb `onClick`)

#### Touch:
- `handlePillarTouch(id, center)` — double-tap guard:
  ```typescript
  const TOUCH_COMMIT_WINDOW = 2000; // 2 seconds
  // First tap: hover/focus
  // Second tap (same pillar, within 2s): commit
  ```
- Detected via: `event.nativeEvent?.pointerType === "touch"` in Scene.tsx

#### Keyboard:
```typescript
// Tab: cycle through pillars (250ms delay before hover)
// Enter: commit to focused pillar
// Esc: return to idle (only if idle or hover)
```
- Handled in `useEffect` with `window.addEventListener("keydown", ...)`

#### Screen Reader:
- `aria-live="polite"` region in ThreeLanding.tsx
- Announces: pillar name + subtitle + axiom on hover/focus
- Announces: "Locked. Descending." on commit
- Announces: "Transiting." on dive

---

## 5. Quality Manager / DPR Logic / Reduced Motion Logic

### File: `app/(landing)/_3d/quality.ts`

**Quality Detection:**
```typescript
export function getQualityProfile(): QualityProfile {
  // Cached after first call (qualityProfileCache)
  // Checks:
  // - prefers-reduced-motion
  // - deviceMemory < 4GB
  // - hardwareConcurrency < 4 cores
  // Returns: "full" | "safe"
}
```

**DPR Control:**
```typescript
export function getCanvasDpr(profile: QualityProfile): number {
  if (profile === "safe") return 1.0;
  return Math.min(window.devicePixelRatio || 1, 2.0); // Cap at 2x
}
```

**Rupture Effect Reduction:**
```typescript
export function applyQualityToRuptureUniforms(profile, baseUniforms) {
  const qualityMultiplier = profile === "safe" ? 0.3 : 1.0;
  // Reduces: uGrainAmount, uChromaAmount, uVignetteAmount
}
```

**Used In:**
- `Scene.tsx`: `dpr={getCanvasDpr(qualityProfile)}`, `antialias={qualityProfile === "full"}`
- `RuptureOverlay.tsx`: Applies quality multipliers to shader uniforms

**Reduced Motion Gate:**
- File: `app/(landing)/useReducedMotionGate.ts`
- Checks: `prefers-reduced-motion` media query + `localStorage.getItem("rr_reduced_motion")`
- If active: renders `ReducedMotionLanding.tsx` (DOM-only, no 3D)

---

## 6. Post-Processing / Shader Effects

### File: `app/(landing)/_3d/RuptureOverlay.tsx`

**Shader Type:** Custom `ShaderMaterial` (vertex + fragment shaders)

**Effects:**
- **Jagged tear edge:** FBM noise (5 octaves) computed per fragment
- **Radial distortion:** Distance-based warping
- **Chromatic aberration:** 3 separate noise calls (R/G/B offsets)
- **Vignette:** Distance-based darkening
- **Grain:** High-frequency noise (`noise(uv * 200.0 + uTime)`)

**Uniforms Updated Per Frame:**
- `uProgress`, `uTime`, `uAspect`, `uGrainAmount`, `uChromaAmount`, `uVignetteAmount`

**Cost:** High (FBM with 5 octaves × per-fragment, 3× noise for chroma, 200x frequency grain)

**Geometry:** Single `PlaneGeometry` covering viewport (cheap)

---

## 7. Orb Materials / Shaders

### File: `app/(landing)/_3d/PillarOrb.tsx`

**Material Type:** `MeshPhysicalMaterial` (Three.js PBR material)

**Premium Properties:**
- `clearcoat={1}`, `clearcoatRoughness={0.08}`
- `transmission={0.35}`, `thickness={0.6}`, `ior={1.45}`
- `iridescence={0.6}`, `iridescenceIOR={1.3}`, `iridescenceThicknessRange={[100, 600]}`

**Geometry Detail:**
- Base orb: `sphereGeometry args={[0.8, 64, 64]}` (high detail)
- Rim glow: Additional mesh with `meshBasicMaterial` (additive)

**Per-Orb Variations:**
- **CoreOrb:** Single sphere + rim
- **ShardsOrb:** 12 icosahedrons + rim
- **SwarmOrb:** Core sphere + 5 satellite spheres
- **SingularityOrb:** Dark core + transparent shell

**Material Updates Per Frame:**
- `emissiveIntensity`, `roughness`, `color` (lerped), `opacity` (crossfade)

---

## 8. Identified Performance Hotspots

### A. Allocations in Hot Loops

**CameraRig.tsx:**
```typescript
let targetPosition = new Vector3(0, 0, 8); // NEW ALLOCATION EVERY FRAME
let targetLookAt = new Vector3(0, 0, 0);   // NEW ALLOCATION EVERY FRAME
// ... multiple new Vector3() calls
```

**PillarOrb.tsx:**
```typescript
const failurePos = new Vector3(0, 0, -3); // NEW ALLOCATION EVERY FRAME
const currentPos = new Vector3(driftX, driftY, driftZ); // NEW ALLOCATION
const desaturated = baseColorRef.current.clone().lerp(...); // NEW ALLOCATION
```

### B. React State Updates in Animation Loop

**PillarOrb.tsx (main component):**
```typescript
useFrame(() => {
  // ...
  if (Math.abs(baseOpacityRef.current - baseOpacity) > 0.01) {
    setBaseOpacity(baseOpacityRef.current); // TRIGGERS RE-RENDER
  }
});
```

### C. Redundant Quality Recalculation

**RuptureOverlay.tsx:**
```typescript
useFrame(() => {
  const qualityProfile = getQualityProfile(); // Cached, but still called
  const qualityUniforms = applyQualityToRuptureUniforms(...); // Recomputes every frame
});
```

### D. High-Frequency Shader Computations

**RuptureOverlay fragment shader:**
- FBM with 5 octaves per fragment
- 3× noise calls for chromatic aberration
- `noise(uv * 200.0 + uTime)` for grain (very high frequency)

### E. Multiple Material Updates Per Orb

**Each orb type:**
- Base material updates (emissiveIntensity, roughness, color)
- Rim glow material updates
- Scale updates
- Position updates (drift calculations)

**Total:** 5 orbs × (multiple updates) = significant per-frame work

### F. Math.random() in Animation Loop

**CameraRig.tsx:**
```typescript
if (progress > 0.75) {
  targetPosition.x += (Math.random() - 0.5) * shakeAmount; // 3× per frame during shake
}
```

---

## 9. File Structure Summary

```
app/(landing)/
├── ThreeLanding.tsx          # Main wrapper, input handlers, navigation
├── LandingEntry.tsx          # Reduced motion gate
├── useReducedMotionGate.ts  # Reduced motion detection
├── _3d/
│   ├── Scene.tsx            # Canvas setup, scene graph
│   ├── PillarOrb.tsx        # All orb rendering (BasePremiumOrb + 4 personality types)
│   ├── CameraRig.tsx        # Camera animation logic
│   ├── RuptureOverlay.tsx   # Shader-based tear effect
│   ├── useDescentState.ts   # State machine (idle → hover → commit → dive → hold)
│   ├── quality.ts           # Quality detection + DPR control
│   └── pillars.ts           # Pillar definitions (data)
```

---

## 10. Current Quality Profile Behavior

**"Full" Mode:**
- DPR: `min(devicePixelRatio, 2.0)`
- Antialiasing: Enabled
- Rupture effects: 100% intensity

**"Safe" Mode:**
- DPR: `1.0` (clamped)
- Antialiasing: Disabled
- Rupture effects: 30% intensity (grain/chroma/vignette)

**Trigger Conditions:**
- `prefers-reduced-motion: reduce`
- `deviceMemory < 4GB`
- `hardwareConcurrency < 4 cores`

**Limitation:** Quality profile is determined once per session (cached). No dynamic adaptation based on runtime performance.

---

**End of Reality Map**
