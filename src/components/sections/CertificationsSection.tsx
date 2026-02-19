import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications, education } from "@/content/certifications";
import { SECTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

export default function CertificationsSection() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;

  const cardHover =
    reduced || mobileTuned ? undefined : SECTION.cardHover;

  return (
    <section id="certifications" className="section-glass section-shell px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary md:text-4xl"
          variants={SECTION.fadeUp}
        >
          Certifications &amp; Education
        </motion.h2>

        <motion.div
          className="mt-12 rounded-xl border border-border bg-surface-raised p-8 transition-colors"
          variants={SECTION.fadeUp}
          whileHover={cardHover}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <GraduationCap size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {education.degree}
              </h3>
              <p className="mt-1 text-base text-text-secondary">
                {education.institution} &middot; {education.location}
              </p>
              <p className="mt-1 font-mono text-sm text-text-muted">
                {education.dateRange}
              </p>
              {education.accreditation && (
                <span className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
                  {education.accreditation}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div
          className={cn(
            "mt-8 grid gap-6",
            "grid-cols-1 md:grid-cols-2"
          )}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="rounded-xl border border-border bg-surface-raised p-6 transition-colors"
              variants={SECTION.fadeUp}
              whileHover={cardHover}
            >
              <Award size={20} className="text-accent" />
              <h3 className="mt-3 text-base font-semibold text-text-primary">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{cert.issuer}</p>
              {cert.date && (
                <p className="mt-1 font-mono text-sm text-text-muted">
                  {cert.date}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
