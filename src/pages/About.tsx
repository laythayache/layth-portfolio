import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import { BRAND } from "@/content/brand";
import {
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  absoluteUrl,
} from "@/content/siteSeo";
import "./About.css";

/* The visible text is CMS-managed (/admin → About tab, stored in R2) and fetched
   from GET /api/about. The layout below is fixed; empty sections hide. */
type Fact = { label: string; value: string };
type Principle = { title: string; body: string };
type AboutContent = {
  role: string;
  intro: string;
  facts: Fact[];
  focusTitle: string;
  focus: string[];
  principlesTitle: string;
  principles: Principle[];
};

const EMPTY: AboutContent = { role: "", intro: "", facts: [], focusTitle: "", focus: [], principlesTitle: "", principles: [] };

const ABOUT_PATH = "/about";
const PAGE_TITLE = `${BRAND.name} — ${BRAND.title}`;
const PAGE_DESCRIPTION =
  "Layth Ayache — AI Systems Engineer & Technical Consultant in Lebanon. Designs production AI systems, computer vision pipelines, and infrastructure-aware deployments for environments where reliability matters.";
const PROFILE_PAGE_ID = `${SITE_URL}${ABOUT_PATH}#profilepage`;

function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      organizationJsonLd(),
      personJsonLd(),
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: absoluteUrl(ABOUT_PATH),
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        about: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl(ABOUT_PATH) },
          ],
        },
      },
    ],
  };
}

export default function About() {
  const [c, setC] = useState<AboutContent>(EMPTY);

  useEffect(() => {
    let alive = true;
    fetch("/api/about")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) setC({ ...EMPTY, ...d });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const paras = c.intro.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESCRIPTION} canonical={`${SITE_URL}${ABOUT_PATH}`} jsonLd={aboutPageJsonLd()} />

      <main className="about-page">
        <div className="ab-inner">
          <Link to="/" className="ab-back">
            <ArrowLeft size={13} aria-hidden /> Back home
          </Link>

          <p className="ab-kicker">
            <span className="ab-dash" aria-hidden="true" /> about
          </p>
          <h1 className="ab-name">Layth Ayache</h1>
          {c.role && <p className="ab-role">{c.role}</p>}

          {paras.length > 0 && (
            <div className="ab-intro">
              {paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {c.facts.length > 0 && (
            <ul className="ab-facts">
              {c.facts.map((f, i) => (
                <li className="ab-fact" key={i}>
                  <span className="ab-fact-label">{f.label}</span>
                  <span className="ab-fact-value">{f.value}</span>
                </li>
              ))}
            </ul>
          )}

          {c.focus.length > 0 && (
            <section className="ab-section">
              <div className="ab-rule" aria-hidden="true" />
              <h2 className="ab-h2">{c.focusTitle || "Focus areas"}</h2>
              <ul className="ab-focus">
                {c.focus.map((x, i) => (
                  <li className="ab-focus-item" key={i}>
                    <span className="ab-tick" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {c.principles.length > 0 && (
            <section className="ab-section">
              <div className="ab-rule" aria-hidden="true" />
              <h2 className="ab-h2">{c.principlesTitle || "How I work"}</h2>
              <div className="ab-principles">
                {c.principles.map((p, i) => (
                  <article className="ab-principle" key={i}>
                    {p.title && <h3>{p.title}</h3>}
                    {p.body && <p>{p.body}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="ab-section">
            <div className="ab-rule" aria-hidden="true" />
            <h2 className="ab-h2">Reach me</h2>
            <div className="ab-profiles">
              <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer me" className="ab-profile">
                <Linkedin size={14} aria-hidden /> LinkedIn <ArrowUpRight size={12} aria-hidden />
              </a>
              <a href={BRAND.github} target="_blank" rel="noopener noreferrer me" className="ab-profile">
                <Github size={14} aria-hidden /> GitHub <ArrowUpRight size={12} aria-hidden />
              </a>
              <a href={BRAND.medium} target="_blank" rel="noopener noreferrer me" className="ab-profile">
                Medium <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
            <p className="ab-contact">
              Email{" "}
              <a href={`mailto:${BRAND.email}`} className="ab-link">
                <Mail size={12} className="ab-mail" aria-hidden /> {BRAND.email}
              </a>{" "}
              or schedule a call via{" "}
              <a href={BRAND.calendly} target="_blank" rel="noopener noreferrer" className="ab-link">
                Calendly
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
