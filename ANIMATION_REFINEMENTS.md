# Animation Refinements - Smooth & Pixel-Accurate

## Timeline Optimizations

### Choreography Phases
- **CHOREO_1_OUT**: 1400ms → **1200ms** (snappier initial movement)
- **CHOREO_1_IN**: 900ms → **400ms** (quicker fade)
- **CHOREO_2_OUT_SWAP**: 1400ms → **1200ms**
- **CHOREO_2_IN**: 900ms → **400ms**
- **CHOREO_3_OUT**: 1400ms → **1000ms** (shorter final phase)

### Settle Animation
- **SETTLE**: 1100ms → **900ms** (faster, punchier transition)
- **SETTLE_CROSSFADE**: New constant for last 200ms crossfade
- **SETTLE_SPIN_STOP**: New constant at 800ms (stops spinning before end)

### Reveal Cascade
- **REVEAL_HEADER**: 200ms → **150ms**
- **REVEAL_GLOBAL**: 250ms → **200ms**
- **REVEAL_CTAS**: 300ms → **250ms**
- **REVEAL_CONTENT**: 450ms → **400ms**
- Total reveal time: **1000ms** (more responsive)

---

## Easing Curve Improvements

### Choreography Movement
- **Old**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (linear feel)
- **New**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot easing - bouncier, more natural)

### Settle/FLIP Animation
- **Old**: `cubic-bezier(0.12, 0.9, 0.2, 1)` 
- **New**: `cubic-bezier(0.16, 1, 0.3, 1)` (smoother deceleration)

### Spin Deceleration
- **Old**: `cubic-bezier(0.12, 0.9, 0.2, 1)` 900ms
- **New**: `cubic-bezier(0.16, 1, 0.3, 1)` 800ms (quicker stop with natural feel)

### Reveal Animations
- **Old**: `ease-out` (basic)
- **New**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (smooth spring-like pop-in)

---

## FLIP Animation Enhancements

### Pixel-Accurate Measurement
1. **Multiple requestAnimationFrame frames** - Ensures stable layout
2. **Layout recalculation trigger** - `void element.offsetHeight` forces recalc
3. **Precise getBoundingClientRect** - Sub-pixel measurements
4. **Geometric mean scaling** - `sqrt(scaleX * scaleY)` for natural scaling

### Transform Properties
- **Origin**: Changed from `"top left"` to `"center center"` (more natural scaling)
- **willChange**: Added `will-change: transform` for GPU acceleration
- **Transform-origin**: Centered for uniform, natural growth

### Crossfade Timing
- Overlay background fades during entire 900ms settle
- Hero content fades in during last 200ms
- Smooth overlap prevents jarring transitions

---

## Spin Animation Refinements

### Rotation Speed
- **Continuous spin**: 450ms → **500ms** per revolution (slower, less jarring)
- **Stop animation**: 900ms → **800ms** (quicker stopping)
- **Stop timing**: Reduced from 100ms before settle end to 800ms (cleaner endpoint)

### Capture Logic
- Captures final rotation angle at 800ms mark
- Smooth decel to next full rotation
- Maintains visual momentum

---

## Choreography Animation Names
- **Fade in**: 0% → 15% (quicker pop-in instead of 20%)
- **Slide movement**: Linear acceleration to target
- **Fade out**: Crisp 400ms fade-out

---

## Reveal Cascade
- Each element fades in with **12px vertical movement**
- Staggered timing for waterfall effect
- Spring easing for polished feel

---

## Total Timeline
- **Choreography**: ~4.0s (down from 6.0s)
- **Settle**: 0.9s (down from 1.1s)
- **Typewriter**: 1.35s (unchanged)
- **Reveals**: 1.0s (down from 1.2s)
- **Total**: ~6.25s (down from 7-8s) - **More responsive**

---

## Performance Improvements
1. **GPU Acceleration**: `will-change: transform` on measure group
2. **Pointer Events**: Disabled during animation, enabled when visible
3. **Layout Thrashing**: Minimized with staged RAF calls
4. **Animation Quality**: Higher precision measurements = pixel-perfect alignment

---

## Visual Enhancements
✅ Smoother choreography with overshoot easing  
✅ Natural spring-like reveal cascades  
✅ Quicker overall experience  
✅ Pixel-accurate FLIP transitions  
✅ Smooth spin deceleration  
✅ Better crossfade timing  
✅ GPU-accelerated transforms  
