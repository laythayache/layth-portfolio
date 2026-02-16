import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications, education } from "@/content/certifications";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function CertificationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="certifications" className="bg-surface py-24 px-6">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={prefersReduced ? {} : containerVariants}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          variants={prefersReduced ? {} : scaleIn}
        >
          Certifications &amp; Education
        </motion.h2>

        {/* Education card */}
        <motion.div
          className="mt-12 rounded-lg border border-border bg-surface-raised p-8"
          variants={prefersReduced ? {} : scaleIn}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <GraduationCap size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {education.degree}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {education.institution} &middot; {education.location}
              </p>
              <p className="mt-1 font-mono text-xs text-text-muted">
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

        {/* Certifications grid */}
        <div
          className={cn(
            "mt-8 grid gap-6",
            "grid-cols-1 md:grid-cols-2"
          )}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="rounded-lg border border-border bg-surface-raised p-6"
              variants={prefersReduced ? {} : scaleIn}
            >
              <Award size={20} className="text-accent" />
              <h3 className="mt-3 font-semibold text-sm text-text-primary">
                {cert.name}
              </h3>
              <p className="mt-1 text-xs text-text-muted">{cert.issuer}</p>
              {cert.date && (
                <p className="mt-1 font-mono text-xs text-text-muted">
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
