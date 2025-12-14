# Before State — Portal Refactor

## Current Material Properties (Glossy "Clown Balls")

### BasePremiumOrb (lines 52-68)
```typescript
<meshPhysicalMaterial
  clearcoat={1}              // High gloss
  clearcoatRoughness={0.08}  // Very smooth
  transmission={0.35}        // Glass-like
  roughness={0.25}           // Low roughness = shiny
  metalness={0.25}
  iridescence={0.6}          // Rainbow effect
/>
```

### CoreOrb (lines 202-218)
```typescript
<meshPhysicalMaterial
  clearcoat={1}
  clearcoatRoughness={0.08}
  transmission={0.35}
  roughness={0.25}
  // Same glossy properties
/>
```

## Current Timing (Slow/Mushy)

### useDescentState.ts (lines 20-22)
```typescript
const COMMIT_DURATION = 200;    // 200ms
const DIVE_DURATION = 1200;     // 1200ms (slow)
const HOLD_FOV_SETTLE = 300;   // 300ms
```

## Current Camera Motion (Lerp Smoothing)

### CameraRig.tsx (lines 107-112, 185-197)
```typescript
// Accelerating lerp (ease-in-out) - but still uses lerp
const easedProgress = progress < 0.5
  ? 2 * progress * progress
  : 1 - Math.pow(-2 * progress + 2, 2) / 2;

targetPosition.copy(initialCameraPosRef.current).lerp(diveTargetPos, easedProgress);

// Smooth camera movement with damping
const damping = phase === "dive" ? 0.15 : 0.03; // Still lerp-based
camera.position.lerp(targetPosition, damping);
camera.lookAt(smoothLookAtRef.current); // lerpVectors
```

## Current Rupture Timing

### Scene.tsx (lines 152-155)
```typescript
// Rupture starts at 0.70, maps to 0..1
return Math.max(0, Math.min(1, (diveProgress - 0.70) / 0.30));
```

### ThreeLanding.tsx (line 144)
```typescript
if (progress >= 0.85) { // Navigation at 0.85
```

## Current Rim Implementation

### BasePremiumOrb (lines 70-78)
```typescript
{/* Screen-space rim glow */}
<mesh ref={rimMeshRef} scale={scale * 1.04}>
  <sphereGeometry args={[0.8, 64, 64]} />
  <meshBasicMaterial
    color={baseColorRef.current}
    transparent
    opacity={opacity * 0.12}  // Very subtle, not dominant
  />
</mesh>
```

**Issue:** Rim is too subtle (0.12 opacity), not Fresnel-based, doesn't read as portal boundary.

---

## Target State

### Part A: Portal Visuals
- Reduce clearcoat to 0.4-0.6
- Reduce transmission to 0.1-0.15
- Increase roughness to 0.4-0.5
- Add Fresnel rim shader (dominant visual)
- Add interior field animation

### Part B: Snappy Animation
- COMMIT: 140ms
- DIVE: 780ms
- HOLD: 160ms
- Easing curves (easeInOutCubic, easeOutQuad, easeOutExpo)
- Rupture: start 0.58, peak 0.80
- Navigation: 0.78
