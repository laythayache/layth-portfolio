import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./AboutSection.css";

/* ── content ───────────────────────────────────────────────────── */

/** Three principle blocks — direct, compressed, no fog words. Kept verbatim;
 *  they read as "under construction, not finished authority". */
const BLOCKS = [
  {
    n: "I",
    label: "Process",
    text: "I spec before I build, prototype before I commit, and test against failure before I test for success. I'd rather ship something simple that survives reality than something ambitious that doesn't.",
  },
  {
    n: "II",
    label: "Working with me",
    text: "I ask a lot of questions at the start so I don't build the wrong thing. I over-communicate during the build so there are no surprises. I document after the ship so the next person isn't guessing. That's the loop.",
  },
  {
    n: "III",
    label: "The long game",
    text: "I don't want to build the next app. I want to build the thing the next app runs on. Infrastructure that outlasts the team that built it.",
  },
] as const;

/** Hard facts — echoes the hero's field-report strip. */
const FACTS = [
  { k: "Base", v: "Beirut · 26" },
  { k: "Role", v: "AI Systems & Automation" },
  { k: "Service", v: "Civil Defense · EMT" },
  { k: "Status", v: "Building · 2026" },
] as const;

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
          {/* Portrait. Replace the <div className="ad-plate"> with
              <img className="ad-plate" src="/images/brand/about-portrait.jpg"
                   alt="Layth Ayache at work in Beirut" /> once the photo is shot. */}
          <motion.figure variants={SECTION.fadeUp} className="ad-portrait">
            <div className="ad-plate" role="img" aria-label="Portrait of Layth Ayache (pending)">
              <span className="ad-plate-tag">portrait · pending</span>
            </div>
            <figcaption className="ad-cap">
              <span>Layth Ayache — Beirut</span>
              <span className="ad-cap-meta">plate · i</span>
            </figcaption>
          </motion.figure>

          <div className="ad-body">
            <motion.h2 variants={SECTION.fadeUp} className="ad-lead">
              I come from a country where nothing works automatically —{" "}
              <em>so I learned to make things work automatically.</em>
            </motion.h2>
            <motion.div variants={SECTION.fadeUp} className="ad-rule" aria-hidden="true" />

            <div className="ad-blocks">
              {BLOCKS.map((b) => (
                <motion.article key={b.n} variants={SECTION.fadeUp} className="ad-block">
                  <h3>
                    <span className="ad-num">{b.n}</span> {b.label}
                  </h3>
                  <div className="ad-brule" aria-hidden="true" />
                  <p>{b.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <motion.div variants={SECTION.fadeUp} className="ad-facts">
          {FACTS.map((f) => (
            <div key={f.k} className="ad-fact">
              <span className="ad-fact-k">{f.k}</span>
              <span className="ad-fact-v">{f.v}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
