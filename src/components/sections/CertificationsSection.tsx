import { useMemo, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, ChevronDown, GraduationCap, ShieldCheck } from "lucide-react";
import {
  certifications,
  type CredentialGroup,
  type Certification,
} from "@/content/certifications";

const GROUP_META: Record<
  CredentialGroup,
  { label: string; icon: ComponentType<{ size?: number; className?: string }> }
> = {
  degrees: { label: "Degrees", icon: GraduationCap },
  professional: { label: "Professional Certificates", icon: ShieldCheck },
  awards: { label: "Awards and Clinical Credentials", icon: Award },
};

export default function CertificationsSection() {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const byGroup = new Map<CredentialGroup, Certification[]>();
    for (const cert of certifications) {
      const list = byGroup.get(cert.group) ?? [];
      list.push(cert);
      byGroup.set(cert.group, list);
    }
    return byGroup;
  }, []);

  return (
    <section id="certifications" className="section-glass section-shell px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.03 } },
        }}
      >
        <motion.h2
          className="type-h2 text-center"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Certifications and Education
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Grouped credentials with concise details. Expand any card for context.
        </motion.p>

        <div className="mt-10 space-y-8">
          {(Object.keys(GROUP_META) as CredentialGroup[]).map((groupKey) => {
            const groupItems = grouped.get(groupKey) ?? [];
            if (groupItems.length === 0) return null;
            const GroupIcon = GROUP_META[groupKey].icon;

            return (
              <motion.section
                key={groupKey}
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-md bg-accent/12 p-2 text-accent">
                    <GroupIcon size={16} aria-hidden />
                  </span>
                  <h3 className="type-h3 text-[1.35rem]">
                    {GROUP_META[groupKey].label}
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {groupItems.map((item) => {
                    const isOpen = expanded === item.id;
                    return (
                      <article
                        key={item.id}
                        className="rounded-xl border border-border bg-surface-raised"
                      >
                        <button
                          type="button"
                          className="flex w-full min-h-[44px] items-start justify-between gap-4 px-5 py-4 text-left"
                          onClick={() =>
                            setExpanded((prev) => (prev === item.id ? null : item.id))
                          }
                          aria-expanded={isOpen}
                          aria-controls={`certification-${item.id}`}
                        >
                          <div>
                            <h4 className="text-lg font-semibold text-text-primary">
                              {item.name}
                            </h4>
                            <p className="mt-1 text-sm text-text-secondary">
                              {item.issuer}
                            </p>
                            {item.date && (
                              <p className="mt-1 text-sm text-text-muted">{item.date}</p>
                            )}
                          </div>
                          <ChevronDown
                            size={18}
                            className={`mt-1 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`certification-${item.id}`}
                              className="overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                            >
                              <div className="px-5 pb-5">
                                <p className="text-base leading-relaxed text-text-secondary">
                                  {item.details}
                                </p>
                                {item.credentialUrl && (
                                  <a
                                    href={item.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                                    aria-label="View credential (opens in new tab)"
                                  >
                                    View credential
                                    <ArrowUpRight size={12} aria-hidden />
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
