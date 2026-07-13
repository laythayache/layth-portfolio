import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./StatementSection.css";

/* Big-statement band — replaces the old homepage About section (About now lives
   only at /about). One oversized line that carries the positioning; the accented
   word ties back to the "reliability" thesis. Edit the strings below to change it. */
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
          Engineer <span className="st-accent">reliability</span> and peace of mind for your future.
        </motion.h2>
        <motion.p variants={SECTION.fadeUp} className="statement-sub">
          Websites, chatbots, computer vision, embedded systems, and on-device AI —
          plus the hardware to run it, from POS setups to telephony integration.
          Designed, built, and deployed end to end.
        </motion.p>
      </motion.div>
    </section>
  );
}
