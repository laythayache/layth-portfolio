import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./TrustedBySection.css";

/* "Sector Proof": positioning over a logo wall. Authored metrics + sector cards
   name the work; the CMS logos (R2, GET /api/clients) sit underneath as a
   collapsible "full network" wall of evidence. */
type Client = { id?: string; name?: string; href?: string; url?: string };

const METRICS: { num: string; label: string; wide?: boolean }[] = [
  { num: "31+", label: "Organisations & brands" },
  { num: "6", label: "Sectors" },
  { num: "14+", label: "Hospitality properties" },
  { num: "Public + private", label: "Institutional experience", wide: true },
];

const SECTORS = [
  {
    name: "Hospitality Systems",
    clients: "Lancaster Eden Bay · Plaza · Tamar · Suites Raouche · Raouche",
    work: "CMS, hotel platforms, infrastructure, booking systems",
  },
  {
    name: "Government / Public Sector",
    clients: "OMSAR · Ogero",
    work: "Dashboards, telecom systems, institutional workflows",
  },
  {
    name: "Holdings / Enterprise",
    clients: "Seament · MEA",
    work: "Data platforms, document intelligence, AI search",
  },
  {
    name: "Real Estate",
    clients: "Alinia · Kfoury Engineering",
    work: "Automation, mapping, property workflows",
  },
  {
    name: "Technology / AI",
    clients: "Aligned Tech · ZAKA · RHU",
    work: "AI systems, automation, technical leadership",
  },
];

function Mark({ c }: { c: Client }) {
  if (c.url) return <img className="tb-logo" src={c.url} alt={c.name ? `${c.name} logo` : "Client logo"} loading="lazy" decoding="async" />;
  if (c.name) return <span className="tb-name">{c.name}</span>;
  return <span className="tb-placeholder" aria-hidden="true">—</span>;
}

export default function TrustedBySection() {
  const reduced = useReducedMotion();
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);

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

  return (
    <section id="trusted" className="trusted-band" aria-label="Built across serious sectors">
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
          Built across serious sectors.
        </motion.h2>
        <motion.p variants={SECTION.fadeUp} className="tb-sub">
          Hotels, telecom, government, holdings, real estate, and engineering.
        </motion.p>
        <motion.div variants={SECTION.fadeUp} className="tb-rule" aria-hidden="true" />

        {/* metrics */}
        <motion.div variants={SECTION.fadeUp} className="sp-metrics">
          {METRICS.map((m) => (
            <div className="sp-metric" key={m.label}>
              <div className={`sp-metric-num${m.wide ? " is-wide" : ""}`}>{m.num}</div>
              <div className="sp-metric-label">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* sector cards */}
        <div className="sp-sectors">
          {SECTORS.map((s) => (
            <motion.article variants={SECTION.fadeUp} className="sp-card" key={s.name}>
              <h3 className="sp-card-name">{s.name}</h3>
              <p className="sp-card-clients">{s.clients}</p>
              <div className="sp-card-rule" aria-hidden="true" />
              <p className="sp-card-work">{s.work}</p>
            </motion.article>
          ))}
        </div>

        {/* full network — collapsible evidence */}
        {clients.length > 0 && (
          <motion.div variants={SECTION.fadeUp} className="sp-network">
            <div className="sp-network-bar">
              <span className="sp-network-label">
                <span className="tb-dash" aria-hidden="true" /> Full network · {clients.length} organisations
              </span>
              <button
                type="button"
                className="sp-network-toggle"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="sp-wall"
              >
                {open ? "Hide" : "Show all"} <span aria-hidden="true">{open ? "↑" : "↓"}</span>
              </button>
            </div>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="sp-wall"
                  className="sp-wall"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: SECTION.ease }}
                >
                  {clients.map((c, i) => (
                    <div className="sp-wall-slot" key={c.id ?? i}>
                      {c.href ? (
                        <a className="tb-link" href={c.href} target="_blank" rel="noopener noreferrer">
                          <Mark c={c} />
                        </a>
                      ) : (
                        <Mark c={c} />
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
