import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./StatementSection.css";

export default function StatementSection() {
  const reduced = useReducedMotion();
  return (
    <section id="statement" className="statement-band" aria-label="Working approach">
      <motion.div className="statement-inner" initial={reduced ? undefined : "hidden"} whileInView="visible" viewport={SECTION.viewport} variants={SECTION.container}>
        <motion.h2 variants={SECTION.fadeUp} className="statement-line">From operational problem to <span className="st-accent">maintainable system</span>.</motion.h2>
        <motion.p variants={SECTION.fadeUp} className="statement-sub">I define the data flow, connect the required services, build the application, validate it against real constraints, and document the handover.</motion.p>
      </motion.div>
    </section>
  );
}
