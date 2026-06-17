import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./AboutSection.css";

/* Homepage About band (after Trusted-by). Shows the FULL About content — same as
   the /about page — from the shared CMS document (GET /api/about). Empty parts
   hide. Also links to /about as a standalone, shareable, indexable page. */
type Fact = { label: string; value: string };
type Principle = { title: string; body: string };
type AboutContent = {
  role: string;
  intro: string;
  facts: Fact[];
  focusTitle: string;
  focus: string[];
  principlesTitle: string;
  principles: Principle[];
};
const EMPTY: AboutContent = { role: "", intro: "", facts: [], focusTitle: "", focus: [], principlesTitle: "", principles: [] };

export default function AboutSection() {
  const reduced = useReducedMotion();
  const [c, setC] = useState<AboutContent>(EMPTY);

  useEffect(() => {
    let alive = true;
    fetch("/api/about")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) setC({ ...EMPTY, ...d });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const paras = c.intro.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <section id="about" className="about-band" aria-label="About Layth Ayache">
      <motion.div
        className="ab2-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2 variants={SECTION.fadeUp} className="ab2-lead">
          About
        </motion.h2>
        {c.role && (
          <motion.p variants={SECTION.fadeUp} className="ab2-role">
            Layth Ayache · {c.role}
          </motion.p>
        )}
        <motion.div variants={SECTION.fadeUp} className="ab2-rule" aria-hidden="true" />

        {paras.length > 0 && (
          <motion.div variants={SECTION.fadeUp} className="ab2-intro">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        )}

        {c.facts.length > 0 && (
          <motion.ul variants={SECTION.fadeUp} className="ab2-facts">
            {c.facts.map((f, i) => (
              <li className="ab2-fact" key={i}>
                <span className="ab2-fk">{f.label}</span>
                <span className="ab2-fv">{f.value}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {c.focus.length > 0 && (
          <motion.div variants={SECTION.fadeUp} className="ab2-block">
            <h3 className="ab2-h3">{c.focusTitle || "What I build"}</h3>
            <ul className="ab2-focus">
              {c.focus.map((x, i) => (
                <li className="ab2-focus-item" key={i}>
                  <span className="ab2-tick" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {c.principles.length > 0 && (
          <motion.div variants={SECTION.fadeUp} className="ab2-block">
            <h3 className="ab2-h3">{c.principlesTitle || "How I work"}</h3>
            <div className="ab2-principles">
              {c.principles.map((p, i) => (
                <article className="ab2-principle" key={i}>
                  {p.title && <h4>{p.title}</h4>}
                  {p.body && <p>{p.body}</p>}
                </article>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={SECTION.fadeUp} className="ab2-more">
          <Link to="/about" className="ab2-link">
            Open the /about page <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
