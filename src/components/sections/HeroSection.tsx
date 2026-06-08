import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "@/motion/LenisProvider";
import "./HeroSection.css";

/* Locked hysteresis B–H mark (viewBox -100 -100 200 200). Two branches + closed fill. */
const UP =
  "M 75 -55.98 C 74.65 -55.97, 73.61 -55.97, 72.92 -55.97 C 72.22 -55.97, 71.53 -55.97, 70.83 -55.97 C 70.14 -55.96, 69.44 -55.96, 68.75 -55.96 C 68.06 -55.96, 67.36 -55.95, 66.67 -55.95 C 65.97 -55.95, 65.28 -55.94, 64.58 -55.94 C 63.89 -55.94, 63.19 -55.93, 62.5 -55.93 C 61.81 -55.92, 61.11 -55.92, 60.42 -55.91 C 59.72 -55.91, 59.03 -55.9, 58.33 -55.9 C 57.64 -55.89, 56.94 -55.88, 56.25 -55.88 C 55.56 -55.87, 54.86 -55.86, 54.17 -55.85 C 53.47 -55.84, 52.78 -55.83, 52.08 -55.82 C 51.39 -55.81, 50.69 -55.8, 50 -55.79 C 49.31 -55.77, 48.61 -55.76, 47.92 -55.74 C 47.22 -55.73, 46.53 -55.71, 45.83 -55.69 C 45.14 -55.68, 44.44 -55.66, 43.75 -55.63 C 43.06 -55.61, 42.36 -55.59, 41.67 -55.56 C 40.97 -55.53, 40.28 -55.51, 39.58 -55.47 C 38.89 -55.44, 38.19 -55.41, 37.5 -55.37 C 36.81 -55.33, 36.11 -55.29, 35.42 -55.24 C 34.72 -55.2, 34.03 -55.15, 33.33 -55.1 C 32.64 -55.04, 31.94 -54.98, 31.25 -54.92 C 30.56 -54.85, 29.86 -54.78, 29.17 -54.71 C 28.47 -54.63, 27.78 -54.55, 27.08 -54.45 C 26.39 -54.36, 25.69 -54.26, 25 -54.15 C 24.31 -54.04, 23.61 -53.92, 22.92 -53.79 C 22.22 -53.66, 21.53 -53.52, 20.83 -53.36 C 20.14 -53.21, 19.44 -53.04, 18.75 -52.85 C 18.06 -52.67, 17.36 -52.47, 16.67 -52.25 C 15.97 -52.03, 15.28 -51.79, 14.58 -51.53 C 13.89 -51.27, 13.19 -51, 12.5 -50.69 C 11.81 -50.38, 11.11 -50.05, 10.42 -49.69 C 9.72 -49.33, 9.03 -48.95, 8.33 -48.52 C 7.64 -48.1, 6.94 -47.65, 6.25 -47.16 C 5.56 -46.66, 4.86 -46.14, 4.17 -45.56 C 3.47 -44.99, 2.78 -44.38, 2.08 -43.72 C 1.39 -43.06, 0.69 -42.35, 0 -41.59 C -0.69 -40.83, -1.39 -40.03, -2.08 -39.16 C -2.78 -38.3, -3.47 -37.38, -4.17 -36.4 C -4.86 -35.42, -5.56 -34.39, -6.25 -33.3 C -6.94 -32.21, -7.64 -31.05, -8.33 -29.84 C -9.03 -28.63, -9.72 -27.36, -10.42 -26.04 C -11.11 -24.71, -11.81 -23.33, -12.5 -21.9 C -13.19 -20.47, -13.89 -18.98, -14.58 -17.46 C -15.28 -15.93, -15.97 -14.36, -16.67 -12.76 C -17.36 -11.16, -18.06 -9.51, -18.75 -7.86 C -19.44 -6.21, -20.14 -4.52, -20.83 -2.84 C -21.53 -1.16, -22.22 0.55, -22.92 2.23 C -23.61 3.91, -24.31 5.61, -25 7.26 C -25.69 8.92, -26.39 10.57, -27.08 12.18 C -27.78 13.79, -28.47 15.37, -29.17 16.91 C -29.86 18.44, -30.56 19.94, -31.25 21.38 C -31.94 22.82, -32.64 24.22, -33.33 25.56 C -34.03 26.9, -34.72 28.18, -35.42 29.4 C -36.11 30.63, -36.81 31.8, -37.5 32.9 C -38.19 34.01, -38.89 35.06, -39.58 36.05 C -40.28 37.04, -40.97 37.97, -41.67 38.85 C -42.36 39.73, -43.06 40.55, -43.75 41.32 C -44.44 42.09, -45.14 42.81, -45.83 43.48 C -46.53 44.15, -47.22 44.77, -47.92 45.36 C -48.61 45.94, -49.31 46.47, -50 46.98 C -50.69 47.48, -51.39 47.94, -52.08 48.37 C -52.78 48.8, -53.47 49.19, -54.17 49.56 C -54.86 49.93, -55.56 50.26, -56.25 50.58 C -56.94 50.89, -57.64 51.17, -58.33 51.44 C -59.03 51.7, -59.72 51.94, -60.42 52.17 C -61.11 52.39, -61.81 52.6, -62.5 52.79 C -63.19 52.97, -63.89 53.15, -64.58 53.31 C -65.28 53.46, -65.97 53.61, -66.67 53.74 C -67.36 53.88, -68.06 54, -68.75 54.11 C -69.44 54.22, -70.14 54.32, -70.83 54.42 C -71.53 54.51, -72.22 54.6, -72.92 54.68 C -73.61 54.76, -74.65 54.86, -75 54.89";
const DOWN =
  "M -75 55.98 C -74.65 55.97, -73.61 55.97, -72.92 55.97 C -72.22 55.97, -71.53 55.97, -70.83 55.97 C -70.14 55.96, -69.44 55.96, -68.75 55.96 C -68.06 55.96, -67.36 55.95, -66.67 55.95 C -65.97 55.95, -65.28 55.94, -64.58 55.94 C -63.89 55.94, -63.19 55.93, -62.5 55.93 C -61.81 55.92, -61.11 55.92, -60.42 55.91 C -59.72 55.91, -59.03 55.9, -58.33 55.9 C -57.64 55.89, -56.94 55.88, -56.25 55.88 C -55.56 55.87, -54.86 55.86, -54.17 55.85 C -53.47 55.84, -52.78 55.83, -52.08 55.82 C -51.39 55.81, -50.69 55.8, -50 55.79 C -49.31 55.77, -48.61 55.76, -47.92 55.74 C -47.22 55.73, -46.53 55.71, -45.83 55.69 C -45.14 55.68, -44.44 55.66, -43.75 55.63 C -43.06 55.61, -42.36 55.59, -41.67 55.56 C -40.97 55.53, -40.28 55.51, -39.58 55.47 C -38.89 55.44, -38.19 55.41, -37.5 55.37 C -36.81 55.33, -36.11 55.29, -35.42 55.24 C -34.72 55.2, -34.03 55.15, -33.33 55.1 C -32.64 55.04, -31.94 54.98, -31.25 54.92 C -30.56 54.85, -29.86 54.78, -29.17 54.71 C -28.47 54.63, -27.78 54.55, -27.08 54.45 C -26.39 54.36, -25.69 54.26, -25 54.15 C -24.31 54.04, -23.61 53.92, -22.92 53.79 C -22.22 53.66, -21.53 53.52, -20.83 53.36 C -20.14 53.21, -19.44 53.04, -18.75 52.85 C -18.06 52.67, -17.36 52.47, -16.67 52.25 C -15.97 52.03, -15.28 51.79, -14.58 51.53 C -13.89 51.27, -13.19 51, -12.5 50.69 C -11.81 50.38, -11.11 50.05, -10.42 49.69 C -9.72 49.33, -9.03 48.95, -8.33 48.52 C -7.64 48.1, -6.94 47.65, -6.25 47.16 C -5.56 46.66, -4.86 46.14, -4.17 45.56 C -3.47 44.99, -2.78 44.38, -2.08 43.72 C -1.39 43.06, -0.69 42.35, 0 41.59 C 0.69 40.83, 1.39 40.03, 2.08 39.16 C 2.78 38.3, 3.47 37.38, 4.17 36.4 C 4.86 35.42, 5.56 34.39, 6.25 33.3 C 6.94 32.21, 7.64 31.05, 8.33 29.84 C 9.03 28.63, 9.72 27.36, 10.42 26.04 C 11.11 24.71, 11.81 23.33, 12.5 21.9 C 13.19 20.47, 13.89 18.98, 14.58 17.46 C 15.28 15.93, 15.97 14.36, 16.67 12.76 C 17.36 11.16, 18.06 9.51, 18.75 7.86 C 19.44 6.21, 20.14 4.52, 20.83 2.84 C 21.53 1.16, 22.22 -0.55, 22.92 -2.23 C 23.61 -3.91, 24.31 -5.61, 25 -7.26 C 25.69 -8.92, 26.39 -10.57, 27.08 -12.18 C 27.78 -13.79, 28.47 -15.37, 29.17 -16.91 C 29.86 -18.44, 30.56 -19.94, 31.25 -21.38 C 31.94 -22.82, 32.64 -24.22, 33.33 -25.56 C 34.03 -26.9, 34.72 -28.18, 35.42 -29.4 C 36.11 -30.63, 36.81 -31.8, 37.5 -32.9 C 38.19 -34.01, 38.89 -35.06, 39.58 -36.05 C 40.28 -37.04, 40.97 -37.97, 41.67 -38.85 C 42.36 -39.73, 43.06 -40.55, 43.75 -41.32 C 44.44 -42.09, 45.14 -42.81, 45.83 -43.48 C 46.53 -44.15, 47.22 -44.77, 47.92 -45.36 C 48.61 -45.94, 49.31 -46.47, 50 -46.98 C 50.69 -47.48, 51.39 -47.94, 52.08 -48.37 C 52.78 -48.8, 53.47 -49.19, 54.17 -49.56 C 54.86 -49.93, 55.56 -50.26, 56.25 -50.58 C 56.94 -50.89, 57.64 -51.17, 58.33 -51.44 C 59.03 -51.7, 59.72 -51.94, 60.42 -52.17 C 61.11 -52.39, 61.81 -52.6, 62.5 -52.79 C 63.19 -52.97, 63.89 -53.15, 64.58 -53.31 C 65.28 -53.46, 65.97 -53.61, 66.67 -53.74 C 67.36 -53.88, 68.06 -54, 68.75 -54.11 C 69.44 -54.22, 70.14 -54.32, 70.83 -54.42 C 71.53 -54.51, 72.22 -54.6, 72.92 -54.68 C 73.61 -54.76, 74.65 -54.86, 75 -54.89";
const FILL = `${UP} L -75 55.98 ${DOWN.replace("M -75 55.98", "")} Z`;

/* Fallback placeholder photos — shown until the CMS gallery (R2) has images. */
const PLACEHOLDER_EVENTS = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/layth-ev${i + 1}/440/330`);

export default function HeroSection() {
  const lenis = useLenis();

  const [splash] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return true;
    }
  });

  const [photos, setPhotos] = useState<string[]>(PLACEHOLDER_EVENTS);

  const sectionRef = useRef<HTMLElement>(null);
  const upRef = useRef<SVGPathElement>(null);
  const downRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const cometUpRef = useRef<SVGCircleElement>(null);
  const cometDnRef = useRef<SVGCircleElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(7);

  const scrollToSection = useCallback(
    (id: string) => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -84 });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis]
  );

  // Pull the live event gallery from the CMS (R2); fall back to placeholders if unavailable.
  useEffect(() => {
    let alive = true;
    fetch("/api/gallery")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.items) && d.items.length) {
          setPhotos(d.items.map((it: { url: string }) => it.url));
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const up = upRef.current;
    const down = downRef.current;
    const fill = fillRef.current;
    const cometUp = cometUpRef.current;
    const cometDn = cometDnRef.current;
    if (!section || !up || !down || !fill || !cometUp || !cometDn) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenUp = up.getTotalLength();
    const lenDn = down.getTotalLength();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const DRAW = 2400;
    const FILLMS = 1000;
    const GAP = 160;
    let raf = 0;
    let t0: number | null = null;

    // edges drawn -> fill -> THEN reveal (wall + content fade in)
    const reveal = () => section.classList.add("revealed");
    const endDraw = () => {
      [cometUp, cometDn].forEach((c) => {
        c.style.transition = "opacity .5s ease";
        c.style.opacity = "0";
      });
      fill.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], {
        duration: FILLMS,
        delay: GAP,
        easing: "ease",
        fill: "forwards",
      });
      window.setTimeout(reveal, GAP + FILLMS);
    };
    const drawFrame = (now: number) => {
      if (t0 === null) t0 = now;
      const t = Math.min(1, (now - t0) / DRAW);
      const p = ease(t);
      up.style.strokeDashoffset = String(1 - p);
      down.style.strokeDashoffset = String(1 - p);
      const a = up.getPointAtLength(p * lenUp);
      const b = down.getPointAtLength(p * lenDn);
      cometUp.setAttribute("cx", a.x.toFixed(2));
      cometUp.setAttribute("cy", a.y.toFixed(2));
      cometDn.setAttribute("cx", b.x.toFixed(2));
      cometDn.setAttribute("cy", b.y.toFixed(2));
      const r = (2.6 + p * 1.7).toFixed(2);
      cometUp.setAttribute("r", r);
      cometDn.setAttribute("r", r);
      if (t < 1) raf = requestAnimationFrame(drawFrame);
      else endDraw();
    };
    const finalize = () => {
      [up, down].forEach((s) => {
        s.style.strokeDasharray = "none";
        s.style.strokeDashoffset = "0";
      });
      fill.style.fillOpacity = "1";
      cometUp.style.opacity = "0";
      cometDn.style.opacity = "0";
      section.classList.add("revealed");
    };

    if (splash && !reduce) {
      cometUp.style.opacity = "1";
      cometDn.style.opacity = "1";
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(drawFrame);
      });
    } else {
      finalize();
    }

    // pause the wall drift when the tab is hidden
    const onVis = () => section.classList.toggle("ff-paused", document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [splash]);

  // Track the wall's live column count (responsive: 4→6→7→9) so the adjacency
  // repair below knows each tile's vertical neighbour.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const tpl = getComputedStyle(grid).gridTemplateColumns;
      const n = tpl && tpl !== "none" ? tpl.split(/\s+/).filter(Boolean).length : 0;
      if (n > 0) setCols(n);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  // Drifting wall tiles. Sequential constructive fill: each tile picks a random
  // photo that differs from its already-placed left + top neighbours (plus, on
  // the last row, the first row it loops into). With ≥3 photos a valid choice
  // always exists, so the grid never shows two adjacent duplicates — yet stays
  // random-looking. Both halves are identical so the vertical drift loops
  // seamlessly. Re-runs when the gallery or column count changes.
  const wall = useMemo(() => {
    const base = photos.length ? photos : PLACEHOLDER_EVENTS;
    const rows = Math.max(4, Math.ceil(28 / cols));
    const n = rows * cols;
    const arr: string[] = new Array(n);
    for (let idx = 0; idx < n; idx++) {
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      const avoid = new Set<string>();
      if (col > 0) avoid.add(arr[idx - 1]); // left
      if (row > 0) avoid.add(arr[idx - cols]); // top
      if (row === rows - 1) avoid.add(arr[col]); // cyclic bottom = loop seam
      let choices = base.filter((p) => !avoid.has(p));
      if (!choices.length) {
        // Too few photos to honour every edge: drop the seam first (keep
        // left+top distinct), then fall back to just a distinct left neighbour.
        const lt = new Set<string>();
        if (col > 0) lt.add(arr[idx - 1]);
        if (row > 0) lt.add(arr[idx - cols]);
        choices = base.filter((p) => !lt.has(p));
        if (!choices.length) choices = col > 0 ? base.filter((p) => p !== arr[idx - 1]) : [...base];
        if (!choices.length) choices = [...base];
      }
      arr[idx] = choices[Math.floor(Math.random() * choices.length)];
    }
    return [...arr, ...arr];
  }, [photos, cols]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`ffhero${splash ? " drawing" : " revealed"}`}
      aria-label="Layth Ayache — hero"
    >
      {/* drifting perspective wall of events (behind) */}
      <div className="ff-wall" aria-hidden="true">
        <div className="ff-persp">
          <div className="ff-tilt">
            <div className="ff-grid" ref={gridRef}>
              {wall.map((src, i) => (
                <img key={i} className="ff-tile" src={src} alt="" loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ff-scrim" aria-hidden="true" />
      <div className="ff-grain" aria-hidden="true" />

      <div className="ff-field">
        <div className="ff-kicker">
          <span className="tick" aria-hidden="true" /> AI Systems &amp; Automation Engineer — Beirut
        </div>

        <div className="ff-markwrap" role="img" aria-label="Layth Ayache — hysteresis emblem">
          <svg className="ff-mark" viewBox="-100 -100 200 200" aria-hidden="true">
            <path ref={fillRef} className="ff-fillpath" d={FILL} style={{ fillOpacity: splash ? 0 : 1 }} />
            <path
              ref={upRef}
              className="ff-branch"
              pathLength={1}
              d={UP}
              style={{ strokeDasharray: 1, strokeDashoffset: splash ? 1 : 0 }}
            />
            <path
              ref={downRef}
              className="ff-branch"
              pathLength={1}
              d={DOWN}
              style={{ strokeDasharray: 1, strokeDashoffset: splash ? 1 : 0 }}
            />
            <circle ref={cometUpRef} className="ff-comet" r={3} cx={75} cy={-55.98} />
            <circle ref={cometDnRef} className="ff-comet" r={3} cx={-75} cy={55.98} />
          </svg>
        </div>

        <div className="ff-below">
          <div className="ff-cta ff-rise" data-d="4">
            <button type="button" className="ff-btn" onClick={() => scrollToSection("projects")}>
              See the work <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="ff-ghost" onClick={() => scrollToSection("contact")}>
              Get in touch
            </button>
          </div>
        </div>
      </div>

      <div className="ff-strip">
        <div className="ff-stripline">
          <div className="ff-meta ff-rise" data-d="4">Beirut · 26</div>
          <div className="ff-status ff-rise" data-d="4">
            <span className="dot" aria-hidden="true" /> Status — Building · 2026
          </div>
        </div>
      </div>
    </section>
  );
}
