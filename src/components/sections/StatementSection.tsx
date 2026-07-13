import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./StatementSection.css";

/* Big-statement band — replaces the old homepage About section (About now lives
   only at /about). One oversized, first-person line that carries the positioning;
   the accented word ties back to the "reliability" thesis. Copy is drawn from
   BRAND.tagline — edit the two strings below to change it. */
export default function StatementSection() {
  const reduced = useReducedMotion();

  return (
    <section id="statement" className="statement-band" aria-label="What Layth Ayache does">
      <motion.div
        className="statement-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2 variants={SECTION.fadeUp} className="statement-line">
          I engineer <span className="st-accent">reliable</span> AI for environments where assumptions fail.
        </motion.h2>
        <motion.p variants={SECTION.fadeUp} className="statement-sub">
          Computer vision, data pipelines, and infrastructure-aware systems — built
          for messy data, intermittent networks, and real operational constraints.
        </motion.p>
      </motion.div>
    </section>
  );
}
