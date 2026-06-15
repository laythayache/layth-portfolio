import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./TrustedBySection.css";

/* Clients are managed in the CMS (/admin → "Trusted by" tab) and stored in R2.
   This section fetches GET /api/clients (visible logos only) at runtime. Until any
   exist — or if the API is unavailable (e.g. plain `vite` dev without Functions) —
   it shows neutral placeholder cells so the layout stays visible.

   Layout = a uniform "register": every brand shown equally as a larger, borderless
   light mark on airy rows bracketed by hairline rules. No hierarchy, no grouping. */
type Client = { id?: string; name?: string; href?: string; url?: string };

const PLACEHOLDERS: Client[] = [{}, {}, {}, {}, {}, {}, {}, {}];

function Logo({ c }: { c: Client }) {
  if (c.url) return <img className="tb-logo" src={c.url} alt={c.name ? `${c.name} logo` : "Client logo"} loading="lazy" decoding="async" />;
  if (c.name) return <span className="tb-name">{c.name}</span>;
  return (
    <span className="tb-placeholder" aria-hidden="true">
      —
    </span>
  );
}

export default function TrustedBySection() {
  const reduced = useReducedMotion();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/clients")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.items)) setClients(d.items);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const cells = clients.length ? clients : PLACEHOLDERS;
  const total = clients.length;

  return (
    <section id="trusted" className="trusted-band" aria-label="Trusted by">
      <motion.div
        className="tb-inner"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.p variants={SECTION.fadeUp} className="tb-kicker">
          <span className="tb-dash" aria-hidden="true" /> no. 01 / trusted by
          {total ? ` · ${total} organisations` : ""}
        </motion.p>

        <motion.h2 variants={SECTION.fadeUp} className="tb-lead">
          Trusted by
        </motion.h2>
        <motion.p variants={SECTION.fadeUp} className="tb-sub">
          Across hotels, holdings, government, real estate, and engineering.
        </motion.p>
        <motion.div variants={SECTION.fadeUp} className="tb-rule" aria-hidden="true" />

        <div className="tb-register">
          {cells.map((c, i) => {
            const filled = !!(c.url || c.name);
            const mark = <Logo c={c} />;
            return (
              <motion.div key={c.id ?? i} variants={SECTION.fadeUp} className={`tb-slot${filled ? "" : " is-empty"}`}>
                {c.href ? (
                  <a className="tb-link" href={c.href} target="_blank" rel="noopener noreferrer">
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
