import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SECTION } from "@/motion/tokens";
import { experience } from "@/content/experience";
import "./ExperienceSection.css";

const SPEAKING_CROSS_IDS = new Set(["rhu"]);

/* The standout figure for each role, surfaced from its own bullets. */
const HIGHLIGHT: Record<string, { value: string; label: string }> = {
  "cog-developers": { value: "95%", label: "CV detection accuracy" },
  "organizer-mea": { value: "50K+", label: "documents processed (OCR)" },
  "ogero-network": { value: "99.9%", label: "network uptime" },
  "ogero-data": { value: "18%", label: "better forecasting" },
  rhu: { value: "100+", label: "students mentored" },
};

function startYear(value: string) {
  const m = value.match(/\b(20\d{2})\b/);
  return m ? Number(m[1]) : 9999;
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();

  const { roles, orgs, since } = useMemo(
    () => ({
      roles: experience.length,
      orgs: new Set(experience.map((e) => e.company)).size,
      since: Math.min(...experience.map((e) => startYear(e.dateStart))),
    }),
    []
  );

  return (
    <section id="experience" className="exp-section" aria-label="Experience">
      <motion.div
        className="exp-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.p variants={SECTION.fadeUp} className="exp-kicker">
          <span className="exp-dash" aria-hidden="true" /> experience
        </motion.p>
        <motion.h2 variants={SECTION.fadeUp} className="exp-lead">
          Experience
        </motion.h2>
        <motion.div variants={SECTION.fadeUp} className="exp-rule" aria-hidden="true" />
        <motion.p variants={SECTION.fadeUp} className="exp-sub">
          AI engineering · data science · telecom infrastructure · technical consulting.
        </motion.p>
        <motion.p variants={SECTION.fadeUp} className="exp-stats">
          {roles} roles · {orgs} organisations · since {since}
        </motion.p>

        <ol className="exp-list">
          <span className="exp-spine" aria-hidden="true" />
          {experience.map((e) => {
            const h = HIGHLIGHT[e.id];
            const current = /present/i.test(e.dateEnd);
            return (
              <motion.li variants={SECTION.fadeUp} className="exp-row" key={e.id}>
                <span className={`exp-node${current ? " is-now" : ""}`} aria-hidden="true" />
                <div className="exp-dates">
                  {e.dateStart} — {e.dateEnd}
                </div>

                <div className="exp-card">
                  <div className="exp-card-head">
                    <div>
                      <h3 className="exp-co">{e.company}</h3>
                      <p className="exp-role">{e.role}</p>
                    </div>
                    <span className={`exp-type${current ? " is-now" : ""}`}>{current ? "● Now" : e.type}</span>
                  </div>

                  {h && (
                    <div className="exp-metric">
                      <b>{h.value}</b>
                      <i>{h.label}</i>
                    </div>
                  )}

                  <p className="exp-loc">{e.location}</p>

                  <ul className="exp-bullets">
                    {e.bullets.slice(0, 3).map((b) => (
                      <li key={b}>
                        <span className="exp-tick" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="exp-skills">
                    {e.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>

                  {SPEAKING_CROSS_IDS.has(e.id) && (
                    <a href="#speaking" className="exp-xlink">
                      Also in Speaking &amp; Community <ArrowRight size={11} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <motion.div variants={SECTION.fadeUp} className="exp-more">
          <Link to="/beyond-tech" className="exp-beyond">
            Beyond tech — community &amp; volunteer roles <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
