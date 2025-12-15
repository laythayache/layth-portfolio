# Spec Verification & Acceptance Tests

This document describes the verification system for ensuring the portfolio implementation matches the specification.

## Enabling Debug Mode

Debug mode can be enabled in two ways:

1. **URL Parameter**: Add `?debug=1` to the URL (e.g., `http://localhost:3000/?debug=1`)
2. **LocalStorage**: Set `localStorage.setItem('DEBUG_EXPERIENCE', '1')` in the browser console

**Note**: Debug overlays are automatically disabled in production builds (`NODE_ENV === "production"`).

## Debug Overlays

When debug mode is enabled, two overlays appear:

### 1. Debug Overlay (Bottom Right)
Shows live state information:
- Current `phase` (BOOT / CHOREO_* / SETTLE / TYPE / REVEAL / READY)
- Current `replayToken`
- Whether `prefers-reduced-motion` is active
- Whether `fontsReady` has resolved
- Measured rects for source/target during SETTLE (x, y, width, height)
- Computed transform values (dx, dy, scale) used for FLIP
- Emblem state (spinning / decelerating / stopped)

### 2. Spec Verification Panel (Top Right)
Shows acceptance criteria verification results:
- ✅/❌ indicators for each check
- Pass/fail counts
- Detailed messages for failures
- Auto-updates every 2 seconds

## Acceptance Criteria

### A) Colors (Exact)
- Day mode: `--bg = #ede7dd`, `--text = #2b2e34`, `--accent = #6b7280`
- Night mode: bg/text swap, accent unchanged
- No non-token colors (hex/rgb/hsl) except in debug overlays

### B) Emblem Circularity
- All emblems (loader, hero, header) must be perfectly circular
- Width and height difference must be ≤ 0.5px
- Enforced via `aspect-ratio: 1/1` and square wrappers

### C) Loader Choreography
- Emblem spins continuously through all phases (not hover-dependent)
- Names perform: OUT original → IN → OUT swapped → IN → OUT original (hold)
- Names slide from behind emblem (occluder/mask effect)
- Total duration ~6-8s (unless reduced motion)

### D) Settle-to-Hero Transition
- `document.fonts.ready` resolves before measurement
- Source and target rects measured after two RAFs
- Transform applied as `translate(dx, dy) scale(s)` with uniform scale
- Loader lockup freezes width/height before transform
- Crossfade handoff: hero opacity 0→1 during last ~250ms
- No visible jump after overlay unmount

### E) Typewriter + Sequential Reveal
- Typewriter writes: "grow to love and love to grow"
- After typing completes:
  1. Header emblem appears (200ms)
  2. Theme toggle/global UI appears (450ms)
  3. CTAs appear (750ms)
  4. Below-fold sections appear (1200ms)

### F) Header Emblem Replay
- Hidden until `READY`
- Clicking triggers:
  - `router.replace("/")`
  - Scroll to top
  - Full replay (phase resets to BOOT)
- Works from any route, always ends on `/` with READY state

### G) Mobile Responsiveness
Test at widths: 360px, 390px, 412px
- Names never clip off-screen
- Emblem never overlaps name
- Travel distance uses computed `--travel-x`
- Settle lands correctly on mobile hero lockup

### H) Reduced Motion
- Skip choreography/FLIP/typewriter
- Show final hero instantly with simple fades
- Header replay still works with reduced-motion path

## Manual Verification Steps

1. **Enable debug mode**: Visit `/?debug=1`
2. **Check debug overlays**: Verify both overlays appear
3. **Watch phase transitions**: Observe phase changes in debug overlay
4. **Verify colors**: Check spec verification panel for color checks
5. **Test emblem circularity**: Resize window, check verification panel
6. **Test choreography**: Watch loader sequence, verify emblem spins continuously
7. **Test settle**: Watch FLIP transition, verify no jump
8. **Test typewriter**: Verify text types correctly
9. **Test reveals**: Verify sequential appearance order
10. **Test replay**: Click header emblem, verify full replay
11. **Test mobile**: Resize to 360px, 390px, 412px, verify no clipping
12. **Test reduced motion**: Enable in OS settings, verify skip behavior

## Automated Testing

A simple Playwright test can be added (optional):

```typescript
// tests/experience.spec.ts
import { test, expect } from '@playwright/test';

test('experience flow', async ({ page }) => {
  await page.goto('/?debug=1');
  
  // Wait for READY
  await page.waitForSelector('.header-emblem', { state: 'visible' });
  
  // Click header emblem
  await page.click('.header-emblem__button');
  
  // Verify phase resets
  // (implementation depends on how phase is exposed)
});
```

## Fixing Issues

If verification fails:

1. **Check console**: Look for warnings/errors
2. **Check debug overlay**: Verify phase transitions
3. **Check verification panel**: Read failure messages
4. **Inspect elements**: Use browser DevTools
5. **Review code**: Check relevant component files
6. **Re-run verification**: Fix and verify again

## Known Issues & Fixes

(To be populated as issues are found and fixed)

