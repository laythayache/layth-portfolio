import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";
import "./TrustedBySection.css";

/* Clients are managed in the CMS (/admin → "Trusted by" tab) and stored in R2.
   This section fetches GET /api/clients (visible logos only) at runtime. Until any
   exist — or if the API is unavailable (e.g. plain `vite` dev without Functions) —
   it shows neutral placeholder cells so the layout stays visible.

   Layout = "Curated Wall": a few anchor logos up top, the Lancaster hotel family
   collapsed into one medallion (it's one client — Achour Holding's chain — not 11
   near-identical logos), then the rest in a quiet hairline grid. Works at any count. */
type Client = { id?: string; name?: string; href?: string; url?: string };

const PLACEHOLDERS: Client[] = [{}, {}, {}, {}, {}, {}, {}, {}];
const ANCHOR_MAX = 5;

/* Lancaster properties — several are named by place, so list them explicitly. */
const LANCASTER = new Set([
  "lancaster", "lancaster plaza", "lancaster tamar", "lancaster suites raouche",
  "lancaster hotel raouche", "lancaster accra", "eden bay", "ouaga 2000",
  "kumasi city", "grand brazzaville", "rendama",
]);
const isLancaster = (c: Client) => {
  const n = (c.name || "").trim().toLowerCase();
  return n.includes("lancaster") || LANCASTER.has(n);
};
const friezeLabel = (name = "") => {
  const s = name.replace(/lancaster/gi, "").replace(/\bhotel\b/gi, "").trim();
  return (s || name).toUpperCase();
};

function Logo({ c, cls }: { c: Client; cls: string }) {
  if (c.url) return <img className={cls} src={c.url} alt={c.name ? `${c.name} logo` : "Client logo"} loading="lazy" decoding="async" />;
  if (c.name) return <span className="tb-name">{c.name}</span>;
  return <span className="tb-placeholder" aria-hidden="true">—</span>;
}

function Linked({ c, children }: { c: Client; children: ReactNode }) {
  return c.href ? (
    <a className="tb-link" href={c.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
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

  const { anchors, medallion, rest, total, empty } = useMemo(() => {
    if (!clients.length) {
      return { anchors: [] as Client[], medallion: null as null | ReturnType<typeof buildMedallion>, rest: PLACEHOLDERS, total: 0, empty: true };
    }
    const group = clients.filter(isLancaster);
    const flat = group.length >= 2 ? clients.filter((c) => !isLancaster(c)) : clients;
    return {
      anchors: flat.slice(0, ANCHOR_MAX),
      medallion: group.length >= 2 ? buildMedallion(group) : null,
      rest: flat.slice(ANCHOR_MAX),
      total: clients.length,
      empty: false,
    };
  }, [clients]);

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

        {empty ? (
          <div className="tb-grid">
            {PLACEHOLDERS.map((_, i) => (
              <motion.div key={i} variants={SECTION.fadeUp} className="tb-cell is-empty">
                <span className="tb-placeholder" aria-hidden="true">
                  —
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            {/* anchor row — borderless, larger marks */}
            <motion.div variants={SECTION.fadeUp} className="tb-anchors">
              {anchors.map((c, i) => (
                <div className="tb-anchor" key={c.id ?? `a${i}`}>
                  <Linked c={c}>
                    <Logo c={c} cls="tb-logo tb-logo-lg" />
                  </Linked>
                </div>
              ))}
            </motion.div>

            {/* Lancaster medallion — one chain, many properties */}
            {medallion && (
              <motion.div variants={SECTION.fadeUp} className="tb-medallion">
                {medallion.href ? (
                  <a className="tb-med-name tb-med-link" href={medallion.href} target="_blank" rel="noopener noreferrer">
                    Lancaster
                  </a>
                ) : (
                  <div className="tb-med-name">Lancaster</div>
                )}
                <div className="tb-med-frieze">{medallion.labels.join(" · ")}</div>
                <div className="tb-med-count">×{medallion.count} properties</div>
              </motion.div>
            )}

            {/* quiet grid — everything else */}
            {rest.length > 0 && (
              <>
                <motion.div variants={SECTION.fadeUp} className="tb-qlabel" aria-hidden="true">
                  <span className="tb-dash" /> and across the portfolio
                </motion.div>
                <div className="tb-grid tb-grid-quiet">
                  {rest.map((c, i) => (
                    <motion.div key={c.id ?? `g${i}`} variants={SECTION.fadeUp} className="tb-cell">
                      <Linked c={c}>
                        <Logo c={c} cls="tb-logo" />
                      </Linked>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}

function buildMedallion(group: Client[]) {
  const emblem = group.find((c) => (c.name || "").trim().toLowerCase() === "lancaster") || group[0];
  const props = group.filter((c) => (c.name || "").trim().toLowerCase() !== "lancaster");
  const friezeItems = props.length ? props : group;
  return {
    url: emblem.url,
    href: emblem.href,
    labels: friezeItems.map((c) => friezeLabel(c.name)),
    count: friezeItems.length,
  };
}
