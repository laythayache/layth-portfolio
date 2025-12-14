# Reality Resilience Portfolio — Complete Project Audit

**Last Updated:** December 2024  
**Purpose:** Comprehensive documentation for AI assistants to understand the actual codebase implementation, design patterns, and functionality.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Build System](#architecture--build-system)
3. [Route Structure & Navigation](#route-structure--navigation)
4. [Landing Experience System](#landing-experience-system)
5. [3D Descent Interface](#3d-descent-interface)
6. [Arrival & Assimilation System](#arrival--assimilation-system)
7. [Legacy System Components](#legacy-system-components)
8. [State Management Patterns](#state-management-patterns)
9. [Design Philosophy & Constraints](#design-philosophy--constraints)
10. [Critical Implementation Details](#critical-implementation-details)

---

## Project Overview

### What This Project Actually Is

This is a **Next.js 15 portfolio website** that presents itself as a "Reality Resilience" system interface. The site has **two distinct user experiences**:

1. **3D Descent Landing** (`/`): An immersive 3D scene with 5 interactive orbs representing system pillars. Users hover/click orbs to trigger a "descent" animation that navigates to pillar detail pages.

2. **Legacy System Map** (preserved but not active): A 2D DOM-based system diagram showing pillars as nodes with connections, inspection mode, and failure tracking.

### Build Configuration

- **Framework:** Next.js 15.5.9 (App Router)
- **Static Export:** `output: "export"` in `next.config.js` — **entire site is pre-rendered static HTML**
- **Deployment Target:** Cloudflare Pages (static hosting)
- **React Version:** 19.2.3
- **TypeScript:** 5.9.3

**Critical Constraint:** Everything must work in a **static export** environment. No server-side features (API routes, server components that use dynamic data, etc.) can be used.

---

## Architecture & Build System

### File Structure

```
app/
├── page.tsx                    # Root route (/) - renders LandingEntry
├── layout.tsx                   # Root layout (black bg, monospace font)
├── globals.css                  # Tailwind + base styles
├── (landing)/                   # Route group (doesn't affect URL)
│   ├── LandingEntry.tsx         # Main entry point - gate logic
│   ├── useReducedMotionGate.ts  # Hook: checks media query + localStorage
│   ├── landingPrefs.ts          # localStorage wrapper for rr_reduced_motion
│   ├── ReducedMotionLanding.tsx # DOM-only fallback (5 clickable pillars)
│   ├── ThreeLanding.tsx         # 3D landing wrapper (dynamic Scene import)
│   ├── LegacyLanding.tsx        # Old system map (preserved, not used)
│   └── _3d/                     # All 3D components
│       ├── Scene.tsx            # R3F Canvas + SceneContent
│       ├── pillars.ts           # Pillar definitions (colors, positions, types)
│       ├── useDescentState.ts   # State machine (idle→hover→commit→dive→hold)
│       ├── CameraRig.tsx        # Camera movement logic
│       ├── PillarOrb.tsx        # 4 orb types (core/shards/swarm/singularity)
│       └── RuptureOverlay.tsx   # Shader-based screen tear effect
├── system/
│   └── [pillar]/
│       ├── page.tsx             # Server component (static generation)
│       ├── PillarArrivalClient.tsx # Client: reads sessionStorage, animates
│       └── ArrivalOverlay.tsx   # CSS-based arrival effects (5 styles)
└── _components/                 # Legacy system components (unused in 3D flow)
    ├── SystemMap.tsx
    ├── PillarNode.tsx
    └── ...
```

### Build Process

1. **Static Generation:** `generateStaticParams()` in `/system/[pillar]/page.tsx` pre-generates all 5 pillar routes.
2. **No SSR for 3D:** `Scene.tsx` is dynamically imported with `ssr: false` to avoid `window` errors.
3. **Client-Only Features:** All 3D code, localStorage, sessionStorage, and media queries are guarded with `typeof window !== "undefined"`.

---

## Route Structure & Navigation

### Active Routes

- **`/`** → `app/page.tsx` → `<LandingEntry />`
  - Shows either `ReducedMotionLanding` or `ThreeLanding` based on gate
  - No server logic, pure client-side routing decision

- **`/system/[pillar]`** → `app/system/[pillar]/page.tsx`
  - Server component that validates pillar ID
  - Renders `<PillarArrivalClient>` with pillar data
  - Pre-generated for: `perception`, `execution`, `representation`, `coordination`, `failure`

### Navigation Flow

1. User clicks orb in 3D scene
2. `ThreeLanding.tsx` detects `phase === "dive"` and `progress >= 0.85`
3. Writes `rr_arrival` to `sessionStorage` with metadata
4. Calls `router.push(/system/${selectedId})`
5. Destination page reads `sessionStorage`, validates, plays arrival animation
6. Clears `sessionStorage` after 100ms

**Key Point:** Navigation is **client-side only** using Next.js `useRouter`. No server round-trip.

---

## Landing Experience System

### Gate Logic (`LandingEntry.tsx`)

```typescript
const { reducedMotion, ready } = useReducedMotionGate();

if (!ready) return <div>INITIALIZING…</div>;
if (reducedMotion) return <ReducedMotionLanding />;
return <ThreeLanding />;
```

**What `useReducedMotionGate` Actually Does:**

1. **On mount:** Checks `window.matchMedia("(prefers-reduced-motion: reduce)")` AND `localStorage.getItem("rr_reduced_motion")`
2. **Reduced motion is true if EITHER condition is true** (OR logic, not AND)
3. **Returns:** `{ reducedMotion: boolean, setReducedMotion: fn, ready: boolean }`
4. **`ready` is false until client-side checks complete** (prevents hydration mismatch)

**Storage Key:** `"rr_reduced_motion"` (string "true"/"false" in localStorage)

### Reduced Motion Landing (`ReducedMotionLanding.tsx`)

**What It Actually Renders:**

- Black background, monospace font
- Grid of 5 clickable `<Link>` components (one per pillar)
- Each link has:
  - Pillar color dot (3x3px circle)
  - Uppercase label
  - "View subsystem →" text
- Toggle button at bottom that:
  - Calls `setReducedMotion(false)`
  - Reloads page with `window.location.reload()`

**No 3D, no Canvas, pure DOM/HTML.**

### Three Landing (`ThreeLanding.tsx`)

**What It Actually Does:**

1. **Dynamically imports `Scene.tsx`** with `ssr: false` (prevents SSR errors)
2. **Uses `useDescentState()` hook** to manage interaction state
3. **Renders two DOM overlays:**
   - Top-left: "REALITY RESILIENCE // DESCENT INTERFACE" (static)
   - Center-top: `<LabelWithJitter>` showing hovered/selected pillar (dynamic)
4. **Navigation logic:**
   - Watches `phase === "dive"` and `getDiveProgress() >= 0.85`
   - Writes sessionStorage **once** (gated by `hasNavigatedRef`)
   - Calls `router.push(/system/${selectedId})`

**LabelWithJitter Component:**

- Subtle vertical jitter (≤1px) using `Math.sin(time * 0.3)`
- Updates every 16ms (~60fps)
- Shows pillar label, description, "LOCKED", and phase-specific status text

---

## 3D Descent Interface

### Scene Architecture (`Scene.tsx`)

**Canvas Setup:**
```typescript
<Canvas
  camera={{ position: [0, 0, 8], fov: 40 }}
  gl={{ antialias: true, alpha: false }}
  style={{ background: "#000000" }}
>
```

- **Camera:** Perspective, starts at `[0, 0, 8]`, FOV 40
- **Background:** Black (`#000000`)
- **No alpha channel** (performance)

**SceneContent Renders:**

1. **Lights:**
   - `ambientLight` intensity 0.2
   - 3 `pointLight` sources (positions: `[0,0,5]`, `[-5,5,5]`, `[5,-5,5]`)

2. **Fog:** `fog` with color `#000000`, near 10, far 20

3. **FailureGravitySystem:** 
   - Runs in `useFrame`
   - Triggers every ~15 seconds
   - Sets `failureGravityActive` true for 1 second
   - Other orbs bias motion toward Failure position during this time

4. **CameraRig:** Controls camera movement (see below)

5. **5 PillarOrb instances:** One per pillar, positioned from `pillars.ts`

6. **RuptureOverlay:** Shader-based screen tear (only during dive/hold phases)

### Pillar Definitions (`pillars.ts`)

**Data Structure:**
```typescript
interface PillarDefinition {
  id: "perception" | "execution" | "representation" | "coordination" | "failure";
  label: string;              // "PERCEPTION", etc.
  primaryColor: string;       // Hex: "#35FFB8", etc.
  accentColor: string;        // Lighter variant
  position: [x, y, z];        // 3D coordinates
  personality: {
    driftSpeed: number;        // Motion speed multiplier
    driftAmp: number;         // Motion amplitude (reduced for authority)
    rotationSpeed: number;     // Rotation rate
    hoverGlow: number;         // Emissive intensity multiplier on hover
    mass: number;              // Not used in code, conceptual
  };
  type: "core" | "shards" | "swarm" | "singularity";
  description: string;         // Axiom: "Signal precedes truth", etc.
}
```

**Spatial Hierarchy (from Prompt 5.5):**

- **Perception:** `[0, 1.5, 1]` — Closer (+Z), above origin
- **Execution:** `[0, -1.5, 1]` — Closer (+Z), below origin
- **Representation:** `[-3, 0, -1]` — Left, deeper (-Z)
- **Coordination:** `[3, 0, -1]` — Right, deeper (-Z)
- **Failure:** `[0, 0, -3]` — Furthest back (-Z), center

**Color Palette:**
- Perception: `#35FFB8` (cyan)
- Execution: `#FFB020` (orange)
- Representation: `#7A5CFF` (purple)
- Coordination: `#2DA8FF` (blue)
- Failure: `#FF2D2D` (red)

### State Machine (`useDescentState.ts`)

**Phases:**
1. **`idle`** — No interaction
2. **`hover`** — Orb hovered (but not clicked)
3. **`commit`** — Orb clicked, 200ms transition
4. **`dive`** — Camera moves toward orb, 1200ms
5. **`hold`** — Camera settled, FOV adjusting, 300ms

**State Structure:**
```typescript
{
  phase: DescentPhase;
  hoveredId: PillarId | null;
  selectedId: PillarId | null;
  ruptureCenter: { x: number; y: number } | null; // NDC coords from click
}
```

**Key Behaviors:**

- **During `commit/dive/hold`:** `hoveredId` is **forced to equal `selectedId`** (other orbs disabled)
- **`commitTo(id, center)`:** Only works if `phase === "idle" || phase === "hover"`
- **Auto-advance:** `commit` → `dive` after 200ms, `dive` → `hold` after 1200ms (via `useEffect` + `setTimeout`)
- **Progress getters:** `getDiveProgress()` returns `[0..1]` based on elapsed time since dive started

**Rupture Center:**

- Captured from click event NDC coordinates (`event.pointer.x/y` or computed from `clientX/clientY`)
- Stored in state, passed to `RuptureOverlay` for shader center point

### Camera Rig (`CameraRig.tsx`)

**What It Actually Does:**

1. **Idle State:**
   - Slow drift in circular pattern: `Math.sin(time * 0.14) * 0.35` (reduced by 30% from original)
   - Auto-recentering: If camera deviates >1.5 units from `[0,0,8]`, slowly lerps back

2. **Hover State:**
   - **250ms reaction delay** (stored in `hoverDelayRef`)
   - After delay, camera "leans" toward hovered pillar: `pillarPos * 0.2` (20% of distance)
   - LookAt target: `pillarPos * 0.4`

3. **Commit State:**
   - Aligns camera target to selected pillar (same lean logic as hover)
   - No FOV change yet

4. **Dive State:**
   - **Pre-portal stopping distance:** `2.2` units in front of orb
   - **Accelerating lerp:** Ease-in-out curve (quadratic)
   - **FOV ramp:** `40 → 70` over dive duration
   - **Micro-shake:** In last 25% of dive, adds random offset `(progress - 0.75) * 0.1`
   - **LookAt locked:** Always points at selected pillar position

5. **Hold State:**
   - Camera position: Maintains pre-portal distance
   - **FOV settle:** `70 → 50` over 300ms (eased)
   - LookAt remains locked

**Damping Values:**
- Idle/hover: `0.03` (slow, resistant movement)
- Dive: `0.15` (faster, more responsive)

**FOV Updates:**
- Uses `lerp`: `camera.fov = camera.fov + (targetFov - camera.fov) * 0.1`
- Calls `camera.updateProjectionMatrix()` every frame

### Pillar Orbs (`PillarOrb.tsx`)

**Four Orb Types:**

1. **CoreOrb** (Perception, Execution):
   - Single `<sphereGeometry>` radius 0.8
   - `<meshPhysicalMaterial>` with emissive tint
   - Metalness 0.6, roughness 0.3

2. **ShardsOrb** (Representation):
   - 12 `<icosahedronGeometry>` meshes arranged around sphere
   - Each shard at radius 0.8, size 0.15
   - On hover: shards align tighter (not implemented in current code, just visual)

3. **SwarmOrb** (Coordination):
   - Core sphere (radius 0.5) + 5 satellite spheres (radius 0.12)
   - Satellites orbit at radius 0.9
   - All rotate independently

4. **SingularityOrb** (Failure):
   - Dark core sphere (radius 0.7, color `#1a0000`)
   - Transparent shell (radius 0.7 * 1.3, opacity 0.15)
   - Counter-rotating shells create lensing effect

**Motion System (All Orbs):**

- **Drift:** `Math.sin(time * 0.7) * driftAmp * 0.08` (reduced amplitude)
- **Rotation:** `rotation += delta * rotationSpeed * multiplier`
- **Motion Multiplier:**
  - `disabled ? 0.3` (when other orb selected)
  - `anyHovered && !isHovered ? 0.5` (when other orb hovered)
  - `1.0` (normal)

**Hover Effects:**

- **250ms delay** before visual reaction (stored in `hoverDelayRef`)
- **Pulse:** `emissiveIntensity = 0.2 * hoverGlow * (1.0 + sin(pulseTime) * 0.15)`
- **No scale change** (removed in Prompt 5.5)
- **Desaturation:** Non-hovered orbs lerp color toward gray (`0x666666`)

**Failure Gravity:**

- When `failureGravityActive === true`:
  - Other orbs: Motion vectors bias toward `[0, 0, -3]` using `lerp(currentPos, failurePos, 0.1)`
  - Failure orb: Scale compresses to `0.95`

**Click Handler:**

- Computes NDC from `event.pointer.x/y` (R3F normalized) or falls back to `clientX/clientY`
- Passes `{ ...event, ndc: { x, y } }` to parent

**Disabled State:**

- When `phase === "commit" || "dive" || "hold"` and `pillar.id !== selectedId`:
  - `disabled={true}`
  - Motion multiplier = 0.3
  - Color desaturated to `0x333333`
  - Emissive intensity = 0.05
  - Pointer events ignored

### Rupture Overlay (`RuptureOverlay.tsx`)

**What It Actually Is:**

A **full-screen shader plane** positioned at `z=0.1` (close to camera) with `renderOrder={9999}` and `depthTest={false}`.

**Shader Uniforms:**
- `uProgress`: `[0..1]` — Rupture progress (starts at 0.70 dive progress)
- `uTime`: Elapsed time (for animated noise)
- `uCenter`: `[x, y]` in screen space `[0..1]` (converted from NDC)
- `uTint`: `[r, g, b]` from pillar primary color
- `uAspect`: `width / height`

**Fragment Shader Effects:**

1. **Jagged Tear Edge:**
   - Uses FBM (Fractal Brownian Motion) noise with 5 octaves
   - Radial expansion from center
   - Edge mask: `smoothstep(0.0, 0.2, tearEdge * uProgress)`

2. **Radial Distortion:**
   - Visual only (no texture sampling)
   - `distort = dist * 0.15 * uProgress`

3. **Chromatic Aberration:**
   - Simulated with offset noise (not actual texture sampling)
   - `rNoise = noise(uv + vec2(chromaOffset, 0.0))`
   - `gNoise = noise(uv)`
   - `bNoise = noise(uv - vec2(chromaOffset, 0.0))`

4. **Vignette:**
   - `1.0 - smoothstep(0.2, 1.0, dist) * 1.2 * uProgress`

5. **Grain:**
   - `(noise(uv * 200.0 + uTime) - 0.5) * 0.08 * uProgress`

**Progress Mapping:**

- **During dive:** `ruptureProgress = clamp((diveProgress - 0.70) / 0.30, 0..1)`
  - Starts at 70% of dive, reaches 1.0 at 100% dive
- **During hold:** `ruptureProgress = max(0, 1.0 - holdProgress * 2.0)`
  - Decays quickly (usually navigation happens before hold renders)

**Tuning Constants:**
- `EDGE_SHARPNESS = 8.0`
- `DISTORT_STRENGTH = 0.15`
- `GRAIN_AMOUNT = 0.08`
- `CHROMA_AMOUNT = 0.02`
- `VIGNETTE_AMOUNT = 1.2`

---

## Arrival & Assimilation System

### SessionStorage Handoff

**Key:** `"rr_arrival"`

**Data Structure:**
```typescript
{
  pillarId: string;
  tint: string;              // Pillar primary color hex
  ts: number;                // Timestamp
  ruptureCenter: { x: number; y: number }; // NDC coords
  mode: "portal";
}
```

**Write Location:** `ThreeLanding.tsx` line 112-119
- Triggered when `phase === "dive"` and `progress >= 0.85`
- Gated by `hasNavigatedRef` to write exactly once

**Read Location:** `PillarArrivalClient.tsx` line 97
- On mount, reads `sessionStorage.getItem("rr_arrival")`
- Validates `pillarId === route param` and `mode === "portal"`
- Clears storage after 100ms delay

### Arrival Client (`PillarArrivalClient.tsx`)

**What It Actually Does:**

1. **On Mount:**
   - Reads `rr_arrival` from sessionStorage
   - If valid and matches pillar, sets `arrivalActive = true`
   - Starts animation timer (`arrivalStartTimeRef = Date.now()`)
   - Sets initial HUD text from config

2. **Animation Loop:**
   - Uses `requestAnimationFrame` (not `useFrame` from R3F)
   - Calculates progress: `(Date.now() - startTime) / duration`
   - Updates `arrivalProgress` state
   - **Content reveal:** Starts at 30% progress, fades in over 70% duration
   - **HUD text transition:** Changes at 60% progress
   - **Completion:** At 100%, sets `arrivalActive = false`, content fully visible

3. **Content Container:**
   - Starts: `opacity: 0, blur: 10px`
   - Ends: `opacity: 1, blur: 0px`
   - CSS transition with pillar-specific easing curve

4. **HUD Display:**
   - **During arrival:** Shows config HUD text (top-left, tint color)
   - **After arrival:** Shows persistent micro-HUD (pillar name, axiom, "OPERATIONAL")

### Arrival Overlay (`ArrivalOverlay.tsx`)

**What It Actually Renders:**

A **fixed full-screen div** (`position: fixed, z-index: 9999`) with CSS-based effects.

**Base Layers:**
1. **Vignette:** Radial gradient from rupture center (black overlay)
2. **Grain:** SVG noise pattern via `backgroundImage` data URI

**Style-Specific Overlays:**

1. **"scan"** (Perception):
   - Horizontal scan line that sweeps top-to-bottom
   - Position: `(time / duration) * 100%`
   - Gradient: `transparent → tint → transparent`

2. **"impact"** (Execution):
   - Single compression ring at rupture center
   - Scale: `1 - progress * 0.3`
   - Border: `2px solid tint`

3. **"reassembly"** (Representation):
   - Grid of 20x20 tiles (50px each)
   - Each tile fades out with staggered delay: `(x + y) * 0.02`
   - Border: `1px solid tint`

4. **"handshake"** (Coordination):
   - 5 concentric rings at rupture center
   - Each ring pulses: `1 + sin(pulsePhase) * 0.1 * (1 - progress)`
   - Opacity: `1 - progress - i * 0.15`

5. **"sink"** (Failure):
   - **No flashy effects** (no scan, rings, or "SYSTEM HANDOFF" label)
   - Only slow darkening vignette: `rgba(0,0,0,${0.95 * progress})`
   - Reduced grain opacity: `progress * 0.1` (vs 0.3 for others)
   - Calmer vignette: `1 - progress * 0.2` (vs 0.5 for others)

**Center Rupture Residue:**
- Radial gradient circle at rupture center
- Size: `200 * (1 - progress)px`
- **Not rendered for "sink" style**

**System Handoff Label:**
- Monospace, 10px, uppercase
- Position: center of screen
- Opacity: `max(0, 1 - progress * 2)`
- **Not rendered for "sink" style**

### Arrival Configurations

**Perception:**
- Duration: 750ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Style: "scan"
- HUD: "CALIBRATING INPUT" → "SIGNAL LOCKED"

**Execution:**
- Duration: 600ms
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Style: "impact"
- HUD: "ARMING" → "READY TO ACT"

**Representation:**
- Duration: 900ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce)
- Style: "reassembly"
- HUD: "RESOLVING STRUCTURE" → "MODEL COHERENT"

**Coordination:**
- Duration: 800ms
- Easing: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (elastic)
- Style: "handshake"
- HUD: "NEGOTIATING LINKS" → "CONSENSUS ACHIEVED"

**Failure:**
- Duration: 900ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Style: "sink"
- HUD: "ENTROPY PRESENT" → "ACCEPTED"
- **Calm, factual, no spectacle**

---

## Legacy System Components

### SystemMap (`SystemMap.tsx`)

**What It Actually Is:**

A **2D DOM-based system diagram** that renders pillars as positioned nodes with connection lines.

**Features:**
- **Inspection Mode:** Toggle with 'I' key, shows all connections between non-failure pillars
- **Hover Mode:** Shows connections from hovered pillar to others
- **Dominant Connection:** Perception ↔ Execution connection is highlighted (thicker line, labeled)
- **Grid Background:** SVG pattern (40x40px grid, opacity 0.1)
- **Blueprint Frame:** Border with corner markers

**Not Used in 3D Flow:** This component is preserved in `LegacyLanding.tsx` but is not rendered in the active landing experience.

### PillarNode (`PillarNode.tsx`)

**What It Actually Renders:**

A positioned div representing a pillar in the 2D system map.

**Hierarchy:**
- **Dominant** (Perception, Execution): `min-w-[340px] min-h-[180px]`, `border-[6px]`, `text-base`
- **Secondary** (Representation, Coordination): `min-w-[160px]`, `border-2`, `text-xs`, `opacity-70`
- **Failure:** `min-w-[200px]`, `border-2 border-dashed`, special red styling

**Status Colors:**
- `operational`: green
- `degraded`: yellow
- `failed`: red
- `maintenance`: blue

**Hover Effects:**
- Scale: `1.1` (dominant) or `1.08` (others)
- Shadow: `shadow-[0_0_30px_currentColor]` (60px for dominant)

**Not Used in 3D Flow:** Only rendered in `SystemMap`, which is not active.

---

## State Management Patterns

### Custom Hooks

1. **`useDescentState`:** State machine for 3D interaction
   - Uses `useState` + `useRef` for timestamps
   - Auto-advances phases with `useEffect` + `setTimeout`
   - Returns progress getters (computed from timestamps)

2. **`useReducedMotionGate`:** Accessibility gate
   - Checks media query + localStorage on mount
   - Listens to media query changes
   - Returns `ready` flag to prevent hydration mismatch

### State Flow

**3D Landing:**
```
LandingEntry
  → useReducedMotionGate (checks media query + localStorage)
  → ThreeLanding
    → useDescentState (manages phase/selected/hovered)
    → Scene (receives state as props)
      → PillarOrb (receives hover/selected/disabled props)
      → CameraRig (receives phase/selected props)
      → RuptureOverlay (receives phase/progress props)
```

**Arrival:**
```
PillarArrivalClient
  → useEffect (reads sessionStorage on mount)
  → useState (arrivalActive, arrivalProgress)
  → requestAnimationFrame (animation loop)
  → ArrivalOverlay (receives progress/style props)
```

### No Global State

- **No Context API**
- **No Redux/Zustand**
- **Props drilling** from `ThreeLanding` → `Scene` → `PillarOrb`/`CameraRig`/`RuptureOverlay`
- **SessionStorage** for cross-route handoff (landing → system page)

---

## Design Philosophy & Constraints

### Static Export Requirement

**Everything must work in static HTML:**
- No `getServerSideProps`
- No API routes
- No server components that use dynamic data (only static generation)
- All client-side features guarded with `typeof window !== "undefined"`

### Accessibility

**Reduced Motion Gate:**
- Respects `prefers-reduced-motion: reduce` media query
- User can override via localStorage toggle
- Fallback is DOM-only (no 3D, no Canvas)

### Performance

**3D Optimizations:**
- No postprocessing chain (no `@react-three/postprocessing`)
- Simple materials (`MeshPhysicalMaterial`, `MeshStandardMaterial`)
- Inline shader noise (no textures)
- Fixed geometry (no dynamic generation)

**CSS Animations:**
- `requestAnimationFrame` for arrival animation (60fps)
- CSS transitions for content reveal (GPU-accelerated)

### Design Language

**Typography:**
- Monospace font (`Courier New`, `Monaco`, `Menlo`)
- Uppercase labels
- Letter spacing: `0.15em` (labels), `0.1em` (descriptions)
- Font weight: 400 (regular) for labels, bold for HUD

**Colors:**
- Background: `#000000` (black)
- Text: `#ffffff` (white) with gray variants (`#999999`, `#555555`, `#333333`)
- Pillar colors: Bright, saturated (cyan, orange, purple, blue, red)

**Spacing:**
- Minimal padding/margins
- Fixed positioning for overlays
- Z-index hierarchy: Overlays (9999), HUD (10000), content (50)

---

## Critical Implementation Details

### NDC Coordinate System

**Normalized Device Coordinates (NDC):**
- Range: `[-1, 1]` for both X and Y
- Origin: Center of screen
- Y-axis: Up is positive (flipped from screen space)

**Conversions:**
- **NDC → Screen (0..1):** `screenX = (ndcX + 1) / 2`, `screenY = (1 - ndcY) / 2`
- **Screen → NDC:** `ndcX = (screenX * 2) - 1`, `ndcY = 1 - (screenY * 2)`

**Used In:**
- `PillarOrb` click handler (computes NDC from pointer event)
- `RuptureOverlay` shader (converts NDC center to screen space)
- `ArrivalOverlay` CSS (converts NDC to percentage for gradients)

### Timing Constants

**Descent State:**
- `COMMIT_DURATION = 200ms`
- `DIVE_DURATION = 1200ms`
- `HOLD_FOV_SETTLE = 300ms`

**Camera:**
- Hover delay: `250ms` (0.25 seconds)
- Idle drift speed: `0.14` (radians per second)
- Damping: `0.03` (idle), `0.15` (dive)

**Failure Gravity:**
- Trigger interval: `~15 seconds`
- Active duration: `1.0 second`

**Arrival:**
- Content reveal starts: `30%` of arrival duration
- HUD text transition: `60%` of arrival duration
- SessionStorage clear delay: `100ms`

### React Three Fiber Patterns

**useFrame Hook:**
- Runs every frame (~60fps)
- Receives `(state, delta)` where `delta` is time since last frame
- Use `delta` for time-based animations (not `Date.now()`)

**useThree Hook:**
- Provides `{ camera, gl, viewport, size }`
- `gl` is the WebGL renderer
- `viewport` is R3F's viewport (not window size)
- `size` is canvas pixel dimensions

**Dynamic Imports:**
- `Scene.tsx` imported with `dynamic(() => import(...), { ssr: false })`
- Prevents "window is not defined" errors during SSR
- Shows loading fallback during import

### SessionStorage vs LocalStorage

**SessionStorage:**
- Used for: `rr_arrival` (cross-route handoff)
- Cleared: After arrival animation starts (100ms delay)
- Scope: Single browser session

**LocalStorage:**
- Used for: `rr_reduced_motion` (user preference)
- Persists: Across browser sessions
- Scope: Per domain

### Error Handling

**Silent Failures:**
- `localStorage.getItem/setItem` wrapped in try/catch (fails silently)
- `sessionStorage.getItem/setItem` wrapped in try/catch
- Media query checks guarded with `typeof window !== "undefined"`

**Validation:**
- Pillar ID validation in `page.tsx` (returns `notFound()` if invalid)
- SessionStorage data validated (checks `pillarId === route param` and `mode === "portal"`)

---

## Common Pitfalls & Gotchas

1. **Hydration Mismatch:**
   - `useReducedMotionGate` returns `ready: false` until client-side checks complete
   - `LandingEntry` shows "INITIALIZING…" until `ready === true`

2. **Navigation Timing:**
   - `hasNavigatedRef` prevents multiple `router.push()` calls
   - SessionStorage write happens **before** navigation (not after)

3. **Shader Uniforms:**
   - Must update uniforms in `useFrame` (not in render)
   - `uAspect` recalculated every frame (handles window resize)

4. **Disabled Orbs:**
   - `disabled` prop affects motion multiplier, color, emissive, AND pointer events
   - Check `disabled` in `onPointerOver/Out/Click` handlers

5. **Failure Gravity:**
   - Only affects non-failure orbs (bias toward `[0, 0, -3]`)
   - Failure orb itself compresses scale (not biased)

6. **Arrival Progress:**
   - Starts at 0, reaches 1.0 at completion
   - Content reveal uses `(progress - 0.3) / 0.7` (starts at 30%)

7. **Static Export:**
   - All routes must be pre-generated (use `generateStaticParams`)
   - No dynamic routes that require server-side data

---

## Testing & Verification

### Build Verification

```bash
npm run build
```

**Expected Output:**
- ✓ Compiled successfully
- ✓ Generating static pages (11/11)
- ✓ Exporting (2/2)
- Routes: `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/system/[pillar]` (5 variants)

### Manual Testing Checklist

1. **Reduced Motion Gate:**
   - [ ] Media query `prefers-reduced-motion: reduce` shows DOM fallback
   - [ ] Toggle button writes to localStorage and reloads
   - [ ] Default (no reduced motion) shows 3D landing

2. **3D Landing:**
   - [ ] 5 orbs visible with distinct personalities
   - [ ] Hover shows label, camera leans (after 250ms delay)
   - [ ] Click triggers commit → dive → hold sequence
   - [ ] Rupture overlay appears at 70% dive progress
   - [ ] Navigation triggers at 85% dive progress

3. **Arrival System:**
   - [ ] SessionStorage written before navigation
   - [ ] Destination page reads and validates sessionStorage
   - [ ] Arrival animation plays (pillar-specific style)
   - [ ] Content fades in after 30% progress
   - [ ] HUD text transitions at 60% progress
   - [ ] Persistent HUD appears after completion
   - [ ] Direct visit (no sessionStorage) shows content immediately

4. **Failure Arrival:**
   - [ ] "sink" style (no flashy effects)
   - [ ] Calm, factual HUD ("ENTROPY PRESENT" → "ACCEPTED")
   - [ ] No "SYSTEM HANDOFF" label
   - [ ] Reduced grain/vignette intensity

---

## Future Considerations

### Known Limitations

1. **No Server-Side Features:** Cannot add API routes, database queries, or dynamic server components
2. **Static Content:** All pillar content is placeholder (not connected to CMS)
3. **Legacy Components:** `SystemMap`, `PillarNode`, etc. are preserved but not integrated into 3D flow
4. **No Postprocessing:** Cannot add bloom, SSAO, or other postprocessing effects without adding `@react-three/postprocessing`

### Potential Enhancements

1. **Content Integration:** Replace placeholder content in `PillarArrivalClient` with actual pillar data
2. **Animation Refinements:** Fine-tune arrival durations, easing curves, or add more style variants
3. **Accessibility:** Add keyboard navigation for 3D orbs, screen reader announcements
4. **Performance:** Add LOD (Level of Detail) for orbs, optimize shader uniforms

---

## Conclusion

This codebase is a **carefully architected static site** that uses client-side state management, 3D graphics, and CSS animations to create an immersive landing experience. The design prioritizes **static export compatibility**, **accessibility**, and **performance** while maintaining a distinct visual identity.

**Key Takeaways:**
- Everything is client-side (no server features)
- State flows through props (no global state)
- 3D uses React Three Fiber (not raw Three.js)
- Navigation uses sessionStorage handoff (not server state)
- Reduced motion gate provides accessible fallback

**When modifying this codebase:**
1. Always verify static export compatibility (`npm run build`)
2. Guard browser APIs with `typeof window !== "undefined"`
3. Use `dynamic` imports for 3D components with `ssr: false`
4. Test reduced motion path separately
5. Validate sessionStorage data before using it

---

**End of Audit**
