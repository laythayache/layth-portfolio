import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, HeartPulse, Music, Users } from "lucide-react";
import SEO from "@/components/SEO";
import {
  beyondTechExperience,
  type ExperienceEntry,
} from "@/content/experience";
import { speakingEntries } from "@/content/speaking";

const COMMUNITY_SPEAKING_IDS = new Set([
  "civil-defense-community",
  "zaka-ambassador",
  "jarrah-scouts",
]);

function getRoleIcon(entry: ExperienceEntry) {
  if (entry.role.toLowerCase().includes("medical")) return HeartPulse;
  return Users;
}

export default function BeyondTech() {
  const reduced = useReducedMotion();

  const communitySpeaking = speakingEntries.filter((e) =>
    COMMUNITY_SPEAKING_IDS.has(e.id)
  );

  return (
    <>
      <SEO
        title="Beyond Tech | Layth Ayache"
        description="Community leadership, emergency medical response, music, and initiatives beyond engineering. Layth Ayache's volunteer work, scouting, and outreach in Lebanon."
        canonical="https://laythayache.com/beyond-tech"
      />

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-[calc(var(--nav-height)+2rem)]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <motion.h1
          className="type-h1 mt-8"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Beyond Tech
        </motion.h1>
        <motion.p
          className="type-body mt-4 max-w-2xl"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.05,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          Engineering skills are sharpened in production — but character is built
          in the field. These are the roles that shaped how I lead, respond under
          pressure, and serve my community.
        </motion.p>

        {/* Volunteer & Ambassador Roles */}
        <section className="mt-14">
          <h2 className="type-h2">Community Roles</h2>
          <div className="mt-8 space-y-6">
            {beyondTechExperience.map((entry, i) => {
              const Icon = getRoleIcon(entry);
              return (
                <motion.article
                  key={entry.id}
                  className="rounded-xl border border-border bg-surface-raised p-6"
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : 0.1 + i * 0.06,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-accent/12 p-2 text-accent">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="type-h3 text-lg leading-snug">
                        {entry.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-text-primary">
                        {entry.company}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {entry.dateStart} - {entry.dateEnd} · {entry.location}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 list-disc space-y-1.5 pl-5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm leading-relaxed text-text-secondary"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Music */}
        <section className="mt-16">
          <h2 className="type-h2">Music</h2>
          <motion.article
            className="mt-8 rounded-xl border border-border bg-surface-raised p-6"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : 0.15,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-accent/12 p-2 text-accent">
                <Music size={18} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="type-h3 text-lg leading-snug">
                  Classical Piano & Trumpet
                </h3>
                <p className="mt-1 text-sm font-medium text-text-primary">
                  Conservatoire de Musique du Liban
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  2012 - 2018 · Beirut, Lebanon
                </p>
              </div>
            </div>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li className="text-sm leading-relaxed text-text-secondary">
                6 years of formal training in piano, trumpet, music theory,
                composition, and solfege at Lebanon's national conservatory
              </li>
              <li className="text-sm leading-relaxed text-text-secondary">
                Performed with the Lebanese national orchestra (Orchestre
                Libanais) as a trumpet player
              </li>
              <li className="text-sm leading-relaxed text-text-secondary">
                Music instilled discipline, pattern recognition, and
                collaborative performance under pressure — skills that directly
                translate to engineering leadership
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Piano", "Trumpet", "Music Theory", "Orchestra", "Composition"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.article>
        </section>

        {/* Related Speaking & Community entries */}
        {communitySpeaking.length > 0 && (
          <section className="mt-16">
            <h2 className="type-h2">Community Initiatives</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {communitySpeaking.map((entry, i) => (
                <motion.article
                  key={entry.id}
                  className="rounded-xl border border-border bg-surface-raised p-6"
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : 0.2 + i * 0.06,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <p className="type-caption">{entry.organization}</p>
                  <h3 className="type-h3 mt-3">{entry.title}</h3>
                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {entry.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {entry.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
