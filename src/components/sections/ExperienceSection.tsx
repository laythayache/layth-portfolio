import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { experience, type ExperienceEntry } from "@/content/experience";

const SPEAKING_CROSS_IDS = new Set(["rhu"]);

function startYear(value: string) {
  const m = value.match(/\b(20\d{2})\b/);
  return m ? Number(m[1]) : 9999;
}

interface CompanyGroup {
  company: string;
  logo?: string;
  roles: ExperienceEntry[];
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();

  const { groups, roles, orgs, since } = useMemo(() => {
    // Group consecutive roles at the same company (e.g. OGERO's two stints).
    const grouped: CompanyGroup[] = [];
    for (const entry of experience) {
      const last = grouped[grouped.length - 1];
      if (last && last.company === entry.company) last.roles.push(entry);
      else grouped.push({ company: entry.company, logo: entry.logo, roles: [entry] });
    }
    return {
      groups: grouped,
      roles: experience.length,
      orgs: new Set(experience.map((e) => e.company)).size,
      since: Math.min(...experience.map((e) => startYear(e.dateStart))),
    };
  }, []);

  return (
    <section id="experience" className="section-glass section-shell px-6">
      <div className="mx-auto max-w-3xl">
        {/* chapter header */}
        <motion.div
          className="mb-10"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
            <span className="text-leather">—</span> no. 03 / experience
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary">
            A track record of systems shipped.
          </h2>
          <div aria-hidden="true" className="mt-4 h-[2px] w-14 bg-leather" />
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-text-secondary">
            Built across AI engineering, data science, telecom infrastructure,
            and technical consulting.
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            {roles} roles · {orgs} organizations · since {since}
          </p>
        </motion.div>

        {/* left-anchored record rail */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-1 bottom-1 w-px bg-border-strong/60"
          />
          <ol className="space-y-10">
            {groups.map((group, gi) => (
              <motion.li
                key={group.company + gi}
                className="relative pl-7 sm:pl-8"
                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduced ? 0 : gi * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-2 border-accent bg-surface"
                />

                {/* company */}
                <div className="flex items-center gap-3">
                  {group.logo ? (
                    <img
                      src={group.logo}
                      alt={`${group.company} logo`}
                      className="h-8 w-8 shrink-0 rounded-md border border-border bg-surface-overlay object-contain p-1"
                    />
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface-overlay text-[11px] font-bold text-accent">
                      {group.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-semibold text-text-primary">
                    {group.company}
                  </h3>
                </div>

                {/* roles at this company */}
                <div className="mt-4 space-y-6">
                  {group.roles.map((entry) => (
                    <div key={entry.id}>
                      <p className="text-[0.95rem] font-semibold text-text-primary">
                        {entry.role}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                        {entry.dateStart} – {entry.dateEnd} · {entry.type} · {entry.location}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {entry.bullets.slice(0, 3).map((bullet) => (
                          <li
                            key={bullet}
                            className="relative pl-4 text-sm leading-relaxed text-text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-accent/70"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded border border-accent/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {SPEAKING_CROSS_IDS.has(entry.id) && (
                        <a
                          href="#speaking"
                          className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-text-muted transition-colors hover:text-accent"
                        >
                          Also in Speaking &amp; Community <ArrowRight size={11} aria-hidden />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Beyond Tech link */}
        <div className="mt-12">
          <Link
            to="/beyond-tech"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-accent"
          >
            Beyond tech — community &amp; volunteer roles
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
