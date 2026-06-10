import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./AboutSection.css";

/* locked mark — duplicated from HeroSection (paths are not exported; HeroSection.tsx may not change) */
const UP =
  "M 75 -55.98 C 74.65 -55.97, 73.61 -55.97, 72.92 -55.97 C 72.22 -55.97, 71.53 -55.97, 70.83 -55.97 C 70.14 -55.96, 69.44 -55.96, 68.75 -55.96 C 68.06 -55.96, 67.36 -55.95, 66.67 -55.95 C 65.97 -55.95, 65.28 -55.94, 64.58 -55.94 C 63.89 -55.94, 63.19 -55.93, 62.5 -55.93 C 61.81 -55.92, 61.11 -55.92, 60.42 -55.91 C 59.72 -55.91, 59.03 -55.9, 58.33 -55.9 C 57.64 -55.89, 56.94 -55.88, 56.25 -55.88 C 55.56 -55.87, 54.86 -55.86, 54.17 -55.85 C 53.47 -55.84, 52.78 -55.83, 52.08 -55.82 C 51.39 -55.81, 50.69 -55.8, 50 -55.79 C 49.31 -55.77, 48.61 -55.76, 47.92 -55.74 C 47.22 -55.73, 46.53 -55.71, 45.83 -55.69 C 45.14 -55.68, 44.44 -55.66, 43.75 -55.63 C 43.06 -55.61, 42.36 -55.59, 41.67 -55.56 C 40.97 -55.53, 40.28 -55.51, 39.58 -55.47 C 38.89 -55.44, 38.19 -55.41, 37.5 -55.37 C 36.81 -55.33, 36.11 -55.29, 35.42 -55.24 C 34.72 -55.2, 34.03 -55.15, 33.33 -55.1 C 32.64 -55.04, 31.94 -54.98, 31.25 -54.92 C 30.56 -54.85, 29.86 -54.78, 29.17 -54.71 C 28.47 -54.63, 27.78 -54.55, 27.08 -54.45 C 26.39 -54.36, 25.69 -54.26, 25 -54.15 C 24.31 -54.04, 23.61 -53.92, 22.92 -53.79 C 22.22 -53.66, 21.53 -53.52, 20.83 -53.36 C 20.14 -53.21, 19.44 -53.04, 18.75 -52.85 C 18.06 -52.67, 17.36 -52.47, 16.67 -52.25 C 15.97 -52.03, 15.28 -51.79, 14.58 -51.53 C 13.89 -51.27, 13.19 -51, 12.5 -50.69 C 11.81 -50.38, 11.11 -50.05, 10.42 -49.69 C 9.72 -49.33, 9.03 -48.95, 8.33 -48.52 C 7.64 -48.1, 6.94 -47.65, 6.25 -47.16 C 5.56 -46.66, 4.86 -46.14, 4.17 -45.56 C 3.47 -44.99, 2.78 -44.38, 2.08 -43.72 C 1.39 -43.06, 0.69 -42.35, 0 -41.59 C -0.69 -40.83, -1.39 -40.03, -2.08 -39.16 C -2.78 -38.3, -3.47 -37.38, -4.17 -36.4 C -4.86 -35.42, -5.56 -34.39, -6.25 -33.3 C -6.94 -32.21, -7.64 -31.05, -8.33 -29.84 C -9.03 -28.63, -9.72 -27.36, -10.42 -26.04 C -11.11 -24.71, -11.81 -23.33, -12.5 -21.9 C -13.19 -20.47, -13.89 -18.98, -14.58 -17.46 C -15.28 -15.93, -15.97 -14.36, -16.67 -12.76 C -17.36 -11.16, -18.06 -9.51, -18.75 -7.86 C -19.44 -6.21, -20.14 -4.52, -20.83 -2.84 C -21.53 -1.16, -22.22 0.55, -22.92 2.23 C -23.61 3.91, -24.31 5.61, -25 7.26 C -25.69 8.92, -26.39 10.57, -27.08 12.18 C -27.78 13.79, -28.47 15.37, -29.17 16.91 C -29.86 18.44, -30.56 19.94, -31.25 21.38 C -31.94 22.82, -32.64 24.22, -33.33 25.56 C -34.03 26.9, -34.72 28.18, -35.42 29.4 C -36.11 30.63, -36.81 31.8, -37.5 32.9 C -38.19 34.01, -38.89 35.06, -39.58 36.05 C -40.28 37.04, -40.97 37.97, -41.67 38.85 C -42.36 39.73, -43.06 40.55, -43.75 41.32 C -44.44 42.09, -45.14 42.81, -45.83 43.48 C -46.53 44.15, -47.22 44.77, -47.92 45.36 C -48.61 45.94, -49.31 46.47, -50 46.98 C -50.69 47.48, -51.39 47.94, -52.08 48.37 C -52.78 48.8, -53.47 49.19, -54.17 49.56 C -54.86 49.93, -55.56 50.26, -56.25 50.58 C -56.94 50.89, -57.64 51.17, -58.33 51.44 C -59.03 51.7, -59.72 51.94, -60.42 52.17 C -61.11 52.39, -61.81 52.6, -62.5 52.79 C -63.19 52.97, -63.89 53.15, -64.58 53.31 C -65.28 53.46, -65.97 53.61, -66.67 53.74 C -67.36 53.88, -68.06 54, -68.75 54.11 C -69.44 54.22, -70.14 54.32, -70.83 54.42 C -71.53 54.51, -72.22 54.6, -72.92 54.68 C -73.61 54.76, -74.65 54.86, -75 54.89";
const DOWN =
  "M -75 55.98 C -74.65 55.97, -73.61 55.97, -72.92 55.97 C -72.22 55.97, -71.53 55.97, -70.83 55.97 C -70.14 55.96, -69.44 55.96, -68.75 55.96 C -68.06 55.96, -67.36 55.95, -66.67 55.95 C -65.97 55.95, -65.28 55.94, -64.58 55.94 C -63.89 55.94, -63.19 55.93, -62.5 55.93 C -61.81 55.92, -61.11 55.92, -60.42 55.91 C -59.72 55.91, -59.03 55.9, -58.33 55.9 C -57.64 55.89, -56.94 55.88, -56.25 55.88 C -55.56 55.87, -54.86 55.86, -54.17 55.85 C -53.47 55.84, -52.78 55.83, -52.08 55.82 C -51.39 55.81, -50.69 55.8, -50 55.79 C -49.31 55.77, -48.61 55.76, -47.92 55.74 C -47.22 55.73, -46.53 55.71, -45.83 55.69 C -45.14 55.68, -44.44 55.66, -43.75 55.63 C -43.06 55.61, -42.36 55.59, -41.67 55.56 C -40.97 55.53, -40.28 55.51, -39.58 55.47 C -38.89 55.44, -38.19 55.41, -37.5 55.37 C -36.81 55.33, -36.11 55.29, -35.42 55.24 C -34.72 55.2, -34.03 55.15, -33.33 55.1 C -32.64 55.04, -31.94 54.98, -31.25 54.92 C -30.56 54.85, -29.86 54.78, -29.17 54.71 C -28.47 54.63, -27.78 54.55, -27.08 54.45 C -26.39 54.36, -25.69 54.26, -25 54.15 C -24.31 54.04, -23.61 53.92, -22.92 53.79 C -22.22 53.66, -21.53 53.52, -20.83 53.36 C -20.14 53.21, -19.44 53.04, -18.75 52.85 C -18.06 52.67, -17.36 52.47, -16.67 52.25 C -15.97 52.03, -15.28 51.79, -14.58 51.53 C -13.89 51.27, -13.19 51, -12.5 50.69 C -11.81 50.38, -11.11 50.05, -10.42 49.69 C -9.72 49.33, -9.03 48.95, -8.33 48.52 C -7.64 48.1, -6.94 47.65, -6.25 47.16 C -5.56 46.66, -4.86 46.14, -4.17 45.56 C -3.47 44.99, -2.78 44.38, -2.08 43.72 C -1.39 43.06, -0.69 42.35, 0 41.59 C 0.69 40.83, 1.39 40.03, 2.08 39.16 C 2.78 38.3, 3.47 37.38, 4.17 36.4 C 4.86 35.42, 5.56 34.39, 6.25 33.3 C 6.94 32.21, 7.64 31.05, 8.33 29.84 C 9.03 28.63, 9.72 27.36, 10.42 26.04 C 11.11 24.71, 11.81 23.33, 12.5 21.9 C 13.19 20.47, 13.89 18.98, 14.58 17.46 C 15.28 15.93, 15.97 14.36, 16.67 12.76 C 17.36 11.16, 18.06 9.51, 18.75 7.86 C 19.44 6.21, 20.14 4.52, 20.83 2.84 C 21.53 1.16, 22.22 -0.55, 22.92 -2.23 C 23.61 -3.91, 24.31 -5.61, 25 -7.26 C 25.69 -8.92, 26.39 -10.57, 27.08 -12.18 C 27.78 -13.79, 28.47 -15.37, 29.17 -16.91 C 29.86 -18.44, 30.56 -19.94, 31.25 -21.38 C 31.94 -22.82, 32.64 -24.22, 33.33 -25.56 C 34.03 -26.9, 34.72 -28.18, 35.42 -29.4 C 36.11 -30.63, 36.81 -31.8, 37.5 -32.9 C 38.19 -34.01, 38.89 -35.06, 39.58 -36.05 C 40.28 -37.04, 40.97 -37.97, 41.67 -38.85 C 42.36 -39.73, 43.06 -40.55, 43.75 -41.32 C 44.44 -42.09, 45.14 -42.81, 45.83 -43.48 C 46.53 -44.15, 47.22 -44.77, 47.92 -45.36 C 48.61 -45.94, 49.31 -46.47, 50 -46.98 C 50.69 -47.48, 51.39 -47.94, 52.08 -48.37 C 52.78 -48.8, 53.47 -49.19, 54.17 -49.56 C 54.86 -49.93, 55.56 -50.26, 56.25 -50.58 C 56.94 -50.89, 57.64 -51.17, 58.33 -51.44 C 59.03 -51.7, 59.72 -51.94, 60.42 -52.17 C 61.11 -52.39, 61.81 -52.6, 62.5 -52.79 C 63.19 -52.97, 63.89 -53.15, 64.58 -53.31 C 65.28 -53.46, 65.97 -53.61, 66.67 -53.74 C 67.36 -53.88, 68.06 -54, 68.75 -54.11 C 69.44 -54.22, 70.14 -54.32, 70.83 -54.42 C 71.53 -54.51, 72.22 -54.6, 72.92 -54.68 C 73.61 -54.76, 74.65 -54.86, 75 -54.89";
const FILL = `${UP} L -75 55.98 ${DOWN.replace("M -75 55.98", "")} Z`;

/* ── content ───────────────────────────────────────────────────── */

/** Quiet scannable index beside the prose. Plain facts only — no taglines. */
const FACTS = [
  { k: "Reach", v: "Worldwide · Remote" },
  { k: "Build", v: "Agents · Automations · Integrations · Platforms" },
  { k: "Fields", v: "Hotels · Holdings · Government · Real estate · Engineering" },
  { k: "Engagement", v: "Shaped per case · no fixed package" },
] as const;

/* ── local motion ──────────────────────────────────────────────── */

/** Hairline rules draw left→right within the section stagger. */
const ruleDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: SECTION.ease } },
};

/* Figure choreography — a quieter cousin of the hero splash (no comets, no glow). */
const figAxes = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: SECTION.ease } },
};
const figUp = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1.1, ease: SECTION.ease, delay: 0.15 } },
};
const figDown = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1.1, ease: SECTION.ease, delay: 0.33 } },
};
const figFill = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 1.2, ease: SECTION.ease } },
};
const figNote = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 1.0, ease: SECTION.ease } },
};

/* ── figure ────────────────────────────────────────────────────── */

/** "fig. i" — the locked B–H mark drawn as a measured handbook figure.
 *  Both annotations are measured from the locked path data (true, not decorative):
 *  Bᵣ = (0, −41.59), an exact anchor of the UP branch; H꜀ = (22, 0), the computed
 *  B=0 intercept of the DOWN branch. Do not round H꜀ to anything other than 22. */
function HysteresisFigure({ reduced }: { reduced: boolean }) {
  const axes = (
    <>
      <line x1={-92} y1={0} x2={92} y2={0} />
      <line x1={0} y1={-92} x2={0} y2={92} />
      <text x={8} y={-84}>B</text>
      <text x={82} y={14}>H</text>
    </>
  );
  const notes = (
    <>
      <circle cx={0} cy={-41.59} r={2.5} />
      <text x={8} y={-46}>
        B
        <tspan dy={2} fontSize={6.5}>
          r
        </tspan>
      </text>
      <circle cx={22} cy={0} r={2.5} />
      <text x={30} y={12}>
        H
        <tspan dy={2} fontSize={6.5}>
          c
        </tspan>
      </text>
    </>
  );
  return (
    <svg
      className="ad-fig"
      viewBox="-100 -100 200 200"
      role="img"
      aria-label="B–H hysteresis loop — the site mark drawn as a measured figure with axes, remanence, and coercivity points"
    >
      {reduced ? (
        <>
          <g className="ad-fig-axes">{axes}</g>
          <path className="ad-fig-fill" d={FILL} />
          <path className="ad-fig-branch" d={UP} />
          <path className="ad-fig-branch" d={DOWN} />
          <g className="ad-fig-notes">{notes}</g>
        </>
      ) : (
        <>
          <motion.g className="ad-fig-axes" variants={figAxes}>
            {axes}
          </motion.g>
          <motion.path className="ad-fig-fill" d={FILL} variants={figFill} />
          <motion.path className="ad-fig-branch" d={UP} variants={figUp} />
          <motion.path className="ad-fig-branch" d={DOWN} variants={figDown} />
          <motion.g className="ad-fig-notes" variants={figNote}>
            {notes}
          </motion.g>
        </>
      )}
    </svg>
  );
}

/* ── section ───────────────────────────────────────────────────── */

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="about-dossier">
      <motion.div
        className="ad-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.p variants={SECTION.fadeUp} className="ad-kicker">
          <span className="ad-dash" aria-hidden="true" /> no. 01 / about
        </motion.p>

        <div className="ad-grid">
          {/* FUTURE PORTRAIT SWAP (frame stays 4/5 at every breakpoint — zero re-layout):
              1. Replace <HysteresisFigure/> + the chip span with
                 <img className="ad-plate-img" src="/images/brand/about-portrait.jpg"
                      alt="Layth Ayache at work in Beirut" />  (.ad-plate-img CSS already ships).
              2. Flip the caption back to: left "Layth Ayache — Beirut", meta "plate · i".
              3. The figure retires into the facts strip: append { k: "Mark", v: <mini loop> }
                 using the shipped .ad-fig-mini styles (UP/DOWN only, no axes/annotations).
              4. At ≤860px, optionally raise .ad-portrait max-width 320 → 360px. */}
          <motion.figure variants={SECTION.fadeUp} className="ad-portrait">
            <div className="ad-plate">
              <HysteresisFigure reduced={!!reduced} />
              {reduced ? (
                <span className="ad-plate-tag">fig. i · b–h hysteresis</span>
              ) : (
                <motion.span className="ad-plate-tag" variants={figNote}>
                  fig. i · b–h hysteresis
                </motion.span>
              )}
            </div>
            <figcaption className="ad-cap">
              <span>Magnetization memory — B–H</span>
              <span className="ad-cap-meta">loop area = energy lost per cycle</span>
            </figcaption>
          </motion.figure>

          {/* identity + offering — every line written by Layth */}
          <div className="ad-body">
            <motion.h2 variants={SECTION.fadeUp} className="ad-lead">
              Layth Ayache
            </motion.h2>
            <motion.p variants={SECTION.fadeUp} className="ad-role">
              AI &amp; Automation Engineer
            </motion.p>
            <motion.div variants={SECTION.fadeUp} className="ad-rule" aria-hidden="true" />

            <motion.p variants={SECTION.fadeUp} className="ad-line ad-line--lead">
              I build AI agents and chatbots, workflow automations, system integrations,
              and web platforms — and more.
            </motion.p>
            <motion.p variants={SECTION.fadeUp} className="ad-line">
              Work spans hotels, holdings, government, real estate, and engineering.
            </motion.p>
            <motion.p variants={SECTION.fadeUp} className="ad-line">
              No fixed package — every engagement is shaped around your case. Reach out and
              we'll take it from there.
            </motion.p>
          </div>
        </div>

        <motion.div variants={SECTION.fadeUp} className="ad-facts">
          <motion.span className="ad-fsep" variants={ruleDraw} aria-hidden="true" />
          <div className="ad-facts-row">
            {FACTS.map((f) => (
              <div key={f.k} className="ad-fact">
                <span className="ad-fact-k">{f.k}</span>
                <span className="ad-fact-v">{f.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
