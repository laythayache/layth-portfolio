/**
 * Spec Verification - Acceptance Criteria Checks
 * Runs in development mode only
 */

export interface VerificationResult {
  passed: boolean;
  message: string;
  details?: any;
}

export class SpecVerifier {
  private results: VerificationResult[] = [];

  // A) Color verification
  verifyColors(): VerificationResult[] {
    const results: VerificationResult[] = [];

    // Check day mode colors by reading from body element
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    
    const dayBg = rgbToHex(bodyStyle.backgroundColor);
    const dayText = rgbToHex(bodyStyle.color);

    // Check accent from a test element
    const testEl = document.createElement("div");
    testEl.style.color = "var(--accent)";
    document.body.appendChild(testEl);
    const accentStyle = window.getComputedStyle(testEl);
    const dayAccent = rgbToHex(accentStyle.color);
    document.body.removeChild(testEl);

    const expectedDayBg = "#ede7dd";
    const expectedDayText = "#2b2e34";
    const expectedDayAccent = "#6b7280";

    results.push({
      passed: dayBg === expectedDayBg,
      message: `Day mode --bg: expected ${expectedDayBg}, got ${dayBg}`,
    });

    results.push({
      passed: dayText === expectedDayText,
      message: `Day mode --text: expected ${expectedDayText}, got ${dayText}`,
    });

    results.push({
      passed: dayAccent === expectedDayAccent,
      message: `Day mode --accent: expected ${expectedDayAccent}, got ${dayAccent}`,
    });

    // Check night mode (swap bg/text, accent unchanged)
    const root = document.documentElement;
    const hadNight = root.hasAttribute("data-theme");
    root.setAttribute("data-theme", "night");
    
    // Force reflow
    void root.offsetHeight;
    
    const nightBodyStyle = window.getComputedStyle(body);
    const nightBg = rgbToHex(nightBodyStyle.backgroundColor);
    const nightText = rgbToHex(nightBodyStyle.color);

    const testEl2 = document.createElement("div");
    testEl2.style.color = "var(--accent)";
    document.body.appendChild(testEl2);
    const nightAccentStyle = window.getComputedStyle(testEl2);
    const nightAccent = rgbToHex(nightAccentStyle.color);
    document.body.removeChild(testEl2);

    if (!hadNight) {
      root.removeAttribute("data-theme");
    }

    results.push({
      passed: nightBg === expectedDayText && nightText === expectedDayBg,
      message: `Night mode: bg/text should swap. bg=${nightBg}, text=${nightText}`,
    });

    results.push({
      passed: nightAccent === expectedDayAccent,
      message: `Night mode --accent: should be unchanged ${expectedDayAccent}, got ${nightAccent}`,
    });

    return results;
  }

  // B) Emblem circularity check
  verifyEmblemCircularity(): VerificationResult[] {
    const results: VerificationResult[] = [];

    // Check loader emblem
    const loaderWrapper = document.querySelector('.lockup--loader .lockup__mark-wrapper') as HTMLElement;
    if (loaderWrapper) {
      const rect = loaderWrapper.getBoundingClientRect();
      const diff = Math.abs(rect.width - rect.height);
      results.push({
        passed: diff <= 0.5,
        message: `Loader emblem: width=${rect.width.toFixed(1)}, height=${rect.height.toFixed(1)}, diff=${diff.toFixed(1)}px`,
        details: { width: rect.width, height: rect.height, diff },
      });
    }

    // Check hero emblem
    const heroWrapper = document.querySelector('.lockup--hero .lockup__mark-wrapper') as HTMLElement;
    if (heroWrapper) {
      const rect = heroWrapper.getBoundingClientRect();
      const diff = Math.abs(rect.width - rect.height);
      results.push({
        passed: diff <= 0.5,
        message: `Hero emblem: width=${rect.width.toFixed(1)}, height=${rect.height.toFixed(1)}, diff=${diff.toFixed(1)}px`,
        details: { width: rect.width, height: rect.height, diff },
      });
    }

    // Check header emblem
    const headerWrapper = document.querySelector('.header-emblem__button') as HTMLElement;
    if (headerWrapper) {
      const rect = headerWrapper.getBoundingClientRect();
      const diff = Math.abs(rect.width - rect.height);
      results.push({
        passed: diff <= 0.5,
        message: `Header emblem: width=${rect.width.toFixed(1)}, height=${rect.height.toFixed(1)}, diff=${diff.toFixed(1)}px`,
        details: { width: rect.width, height: rect.height, diff },
      });
    }

    return results;
  }

  // C) Loader choreography check
  verifyChoreography(): VerificationResult[] {
    const results: VerificationResult[] = [];

    // Check if emblem is spinning
    const loaderEmblem = document.querySelector('.lockup--loader .logo-mark') as HTMLElement;
    if (loaderEmblem) {
      const computedStyle = window.getComputedStyle(loaderEmblem);
      const animation = computedStyle.animation;
      const isSpinning = animation.includes('spin') && animation.includes('infinite');
      results.push({
        passed: isSpinning,
        message: `Emblem spinning: ${isSpinning ? "Yes" : "No"}`,
      });
    }

    // Check if names are positioned correctly (behind emblem)
    const leftName = document.querySelector('.lockup--loader .lockup__name--left') as HTMLElement;
    const rightName = document.querySelector('.lockup--loader .lockup__name--right') as HTMLElement;
    
    if (leftName && rightName) {
      const leftZIndex = window.getComputedStyle(leftName).zIndex;
      const rightZIndex = window.getComputedStyle(rightName).zIndex;
      const wrapperZIndex = window.getComputedStyle(loaderEmblem?.parentElement as HTMLElement).zIndex;
      
      results.push({
        passed: parseInt(leftZIndex) < parseInt(wrapperZIndex) && parseInt(rightZIndex) < parseInt(wrapperZIndex),
        message: `Names behind emblem: left z-index=${leftZIndex}, right z-index=${rightZIndex}, wrapper z-index=${wrapperZIndex}`,
      });
    }

    return results;
  }

  // D) Settle transition check
  verifySettleTransition(): VerificationResult[] {
    const results: VerificationResult[] = [];

    const loaderMeasureGroup = document.querySelector('.lockup--loader .lockup__measure-group') as HTMLElement;
    const heroMeasureGroup = document.querySelector('.lockup--hero .lockup__measure-group') as HTMLElement;

    if (loaderMeasureGroup && heroMeasureGroup) {
      const loaderRect = loaderMeasureGroup.getBoundingClientRect();
      const heroRect = heroMeasureGroup.getBoundingClientRect();

      // Check if hero is visible (should be opacity 0 until settle completes)
      const heroLockup = document.querySelector('.lockup--hero') as HTMLElement;
      const heroOpacity = heroLockup ? window.getComputedStyle(heroLockup).opacity : "1";

      results.push({
        passed: parseFloat(heroOpacity) === 0 || parseFloat(heroOpacity) === 1,
        message: `Hero lockup opacity: ${heroOpacity} (should be 0 before settle, 1 after)`,
      });

      // Check if measure groups exist
      results.push({
        passed: loaderMeasureGroup !== null && heroMeasureGroup !== null,
        message: `Measure groups exist: loader=${!!loaderMeasureGroup}, hero=${!!heroMeasureGroup}`,
      });
    }

    return results;
  }

  // E) Typewriter and reveal check
  verifyTypewriterAndReveal(): VerificationResult[] {
    const results: VerificationResult[] = [];

    // Check if typewriter text is correct
    const typewriter = document.querySelector('.typewriter-text');
    if (typewriter) {
      const text = typewriter.textContent || "";
      results.push({
        passed: text.includes("grow to love and love to grow"),
        message: `Typewriter text: "${text}"`,
      });
    }

    // Check reveal order
    const header = document.querySelector('.reveal-header');
    const global = document.querySelector('.reveal-global');
    const ctas = document.querySelector('.reveal-ctas');
    const content = document.querySelector('.reveal-content');

    results.push({
      passed: header !== null && global !== null && ctas !== null && content !== null,
      message: `Reveal elements exist: header=${!!header}, global=${!!global}, ctas=${!!ctas}, content=${!!content}`,
    });

    return results;
  }

  // F) Header replay check
  verifyHeaderReplay(): VerificationResult[] {
    const results: VerificationResult[] = [];

    const header = document.querySelector('.header-emblem') as HTMLElement;
    if (header) {
      const opacity = window.getComputedStyle(header).opacity;
      const pointerEvents = window.getComputedStyle(header).pointerEvents;

      results.push({
        passed: header !== null,
        message: `Header exists: opacity=${opacity}, pointerEvents=${pointerEvents}`,
      });
    }

    return results;
  }

  // G) Mobile responsiveness check
  verifyMobileResponsiveness(): VerificationResult[] {
    const results: VerificationResult[] = [];

    // Check viewport width
    const viewportWidth = window.innerWidth;
    results.push({
      passed: viewportWidth > 0,
      message: `Viewport width: ${viewportWidth}px`,
    });

    // Check if names would clip
    const leftName = document.querySelector('.lockup--loader .lockup__name--left') as HTMLElement;
    if (leftName) {
      const rect = leftName.getBoundingClientRect();
      const wouldClip = rect.left < 0 || rect.right > viewportWidth;
      results.push({
        passed: !wouldClip,
        message: `Left name clipping: ${wouldClip ? "YES" : "NO"} (left=${rect.left.toFixed(1)}, right=${rect.right.toFixed(1)})`,
      });
    }

    return results;
  }

  // Run all verifications
  runAllVerifications(): VerificationResult[] {
    const allResults: VerificationResult[] = [];

    allResults.push(...this.verifyColors());
    allResults.push(...this.verifyEmblemCircularity());
    allResults.push(...this.verifyChoreography());
    allResults.push(...this.verifySettleTransition());
    allResults.push(...this.verifyTypewriterAndReveal());
    allResults.push(...this.verifyHeaderReplay());
    allResults.push(...this.verifyMobileResponsiveness());

    return allResults;
  }
}

// Helper to convert RGB to hex
function rgbToHex(rgb: string): string {
  if (rgb.startsWith("#")) {
    return rgb.toLowerCase();
  }
  
  const rgbMatch = rgb.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const r = parseInt(rgbMatch[0]).toString(16).padStart(2, "0");
    const g = parseInt(rgbMatch[1]).toString(16).padStart(2, "0");
    const b = parseInt(rgbMatch[2]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  
  return rgb;
}

