import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./TrustedBySection.css";

/* Two-row logo marquee: every visible CMS logo (R2, GET /api/clients), split
   across two rows that scroll in opposite directions and loop seamlessly.
   Each row is rendered twice so the -50% translate wraps without a seam. */
type Client = { id?: string; name?: string; href?: string; url?: string };

const PLACEHOLDERS: Client[] = Array.from({ length: 12 }, () => ({}));

function Mark({ c }: { c: Client }) {
  if (c.url) return <img className="tb-logo" src={c.url} alt={c.name ? `${c.name} logo` : "Client logo"} loading="lazy" decoding="async" />;
  if (c.name) return <span className="tb-name">{c.name}</span>;
  return <span className="tb-placeholder" aria-hidden="true">—</span>;
}

function Slot({ c }: { c: Client }) {
  const mark = <Mark c={c} />;
  return (
    <div className="tb-slot">
      {c.href ? (
        <a className="tb-link" href={c.href} target="_blank" rel="noopener noreferrer">
          {mark}
        </a>
      ) : (
        mark
      )}
      {c.url && c.name && (
        <span className="tb-slot-name" aria-hidden="true">
          {c.name}
        </span>
      )}
    </div>
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

  const list = clients.length ? clients : PLACEHOLDERS;
  const rowA = list.filter((_, i) => i % 2 === 0);
  const rowB = list.filter((_, i) => i % 2 === 1);

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
        </motion.p>
        <motion.h2 variants={SECTION.fadeUp} className="tb-lead">
          Trusted by
        </motion.h2>
        <motion.p variants={SECTION.fadeUp} className="tb-sub">
          Across hotels, holdings, government, real estate, and engineering.
        </motion.p>
      </motion.div>

      <motion.div
        className="tb-marquee"
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={SECTION.viewport}
        transition={{ duration: 0.6, ease: SECTION.ease }}
      >
        <div className="tb-track tb-track--left">
          {[...rowA, ...rowA].map((c, i) => (
            <Slot c={c} key={`a${i}`} />
          ))}
        </div>
        <div className="tb-track tb-track--right">
          {[...rowB, ...rowB].map((c, i) => (
            <Slot c={c} key={`b${i}`} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
