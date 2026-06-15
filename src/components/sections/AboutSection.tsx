import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./AboutSection.css";

/* Condensed About band on the homepage (after Trusted-by). Shares the CMS
   content with the /about page (GET /api/about) — shows role + a short intro +
   key facts, and links to the full profile. Empty parts hide. */
type Fact = { label: string; value: string };

export default function AboutSection() {
  const reduced = useReducedMotion();
  const [c, setC] = useState<{ role: string; intro: string; facts: Fact[] }>({ role: "", intro: "", facts: [] });

  useEffect(() => {
    let alive = true;
    fetch("/api/about")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d)
          setC({ role: d.role || "", intro: d.intro || "", facts: Array.isArray(d.facts) ? d.facts : [] });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const paras = c.intro.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean).slice(0, 2);

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
            {c.facts.slice(0, 4).map((f, i) => (
              <li className="ab2-fact" key={i}>
                <span className="ab2-fk">{f.label}</span>
                <span className="ab2-fv">{f.value}</span>
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={SECTION.fadeUp} className="ab2-more">
          <Link to="/about" className="ab2-link">
            Read the full profile <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
