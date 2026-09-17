import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import { experience } from "@/content/experience";
import { BRAND } from "@/content/brand";
import { PROFESSIONAL } from "@/content/professional";
import { SITE_URL, personJsonLd, websiteJsonLd, organizationJsonLd, absoluteUrl } from "@/content/siteSeo";
import "./About.css";

type Principle = { title: string; body: string };
type AboutContent = { focusTitle: string; focus: string[]; principlesTitle: string; principles: Principle[] };
const EMPTY: AboutContent = { focusTitle: "What I build", focus: [], principlesTitle: "How I work", principles: [] };
const DEFAULT_FOCUS = ["AI systems and model integration", "Computer vision and document processing", "Data pipelines and workflow automation", "APIs and systems integration", "Web applications and operational dashboards", "Infrastructure and deployment"];
const DEFAULT_PRINCIPLES: Principle[] = [
  { title: "Clarify the system", body: "I define the requirements, users, constraints, and failure modes before implementation." },
  { title: "Design the flow", body: "I map the data, integrations, interfaces, and operational boundaries so decisions remain explicit." },
  { title: "Build and validate", body: "I implement in testable stages, check behavior against real inputs, and document limitations." },
  { title: "Hand over maintainably", body: "I leave clear decisions, operating notes, and a codebase that another engineer can understand." },
];

function aboutPageJsonLd() {
  return { "@context": "https://schema.org", "@graph": [websiteJsonLd(), organizationJsonLd(), personJsonLd(), { "@type": "ProfilePage", "@id": `${SITE_URL}/about#profilepage`, url: absoluteUrl("/about"), name: `About ${PROFESSIONAL.name}`, description: BRAND.description, isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": `${SITE_URL}/#person` }, inLanguage: "en" }] };
}

export default function About() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const timer = window.setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 150);
    return () => window.clearTimeout(timer);
  }, [location.hash]);
  const [cms, setCms] = useState<AboutContent>(EMPTY);
  useEffect(() => {
    let active = true;
    fetch("/api/about").then((r) => r.ok ? r.json() : null).then((data) => {
      if (active && data) setCms({ focusTitle: data.focusTitle || EMPTY.focusTitle, focus: Array.isArray(data.focus) ? data.focus : [], principlesTitle: data.principlesTitle || EMPTY.principlesTitle, principles: Array.isArray(data.principles) ? data.principles : [] });
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  const focus = cms.focus.length ? cms.focus : DEFAULT_FOCUS;
  const principles = cms.principles.length ? cms.principles : DEFAULT_PRINCIPLES;

  return <>
    <SEO title={`${PROFESSIONAL.name} | ${PROFESSIONAL.primaryTitle}`} description={BRAND.description} canonical={`${SITE_URL}/about`} jsonLd={aboutPageJsonLd()} />
    <section className="about-page"><div className="ab-inner">
      <Link to="/" className="ab-back"><ArrowLeft size={13} aria-hidden /> Back home</Link>
      <p className="ab-kicker"><span className="ab-dash" aria-hidden /> professional profile</p>
      <h1 className="ab-name">{PROFESSIONAL.name}</h1><p className="ab-role">{PROFESSIONAL.primaryTitle}</p>
      <div className="ab-intro"><p>{PROFESSIONAL.summary}</p><p>My work covers the path from requirements and data flow through implementation, integration, testing, deployment, and handover. I focus on systems that are useful in day-to-day operations and clear enough to maintain.</p></div>
      <ul className="ab-facts">
        <li className="ab-fact"><span className="ab-fact-label">Current role</span><span className="ab-fact-value">{PROFESSIONAL.currentRole.title}, {PROFESSIONAL.currentRole.company} · {PROFESSIONAL.currentRole.start} – {PROFESSIONAL.currentRole.end}</span></li>
        <li className="ab-fact"><span className="ab-fact-label">Previous role</span><span className="ab-fact-value">{PROFESSIONAL.previousRole.title}, {PROFESSIONAL.previousRole.company} · {PROFESSIONAL.previousRole.start} – {PROFESSIONAL.previousRole.end}</span></li>
        <li className="ab-fact"><span className="ab-fact-label">Education</span><span className="ab-fact-value">{PROFESSIONAL.education}</span></li>
        <li className="ab-fact"><span className="ab-fact-label">Languages</span><span className="ab-fact-value">{PROFESSIONAL.languages.join(" · ")}</span></li>
      </ul>
      <section id="experience" className="ab-section"><div className="ab-rule" aria-hidden /><h2 className="ab-h2">Professional experience</h2><div className="ab-principles">{experience.map((job) => <article className="ab-principle" key={job.id}><h3>{job.company}</h3><p>{job.role}</p><p>{job.dateStart} — {job.dateEnd}</p><p>{job.bullets.slice(0, 2).join(". ")}</p></article>)}</div></section>
      <section className="ab-section"><div className="ab-rule" aria-hidden /><h2 className="ab-h2">{cms.focusTitle}</h2><ul className="ab-focus">{focus.map((item) => <li className="ab-focus-item" key={item}><span className="ab-tick" aria-hidden />{item}</li>)}</ul></section>
      <section className="ab-section"><div className="ab-rule" aria-hidden /><h2 className="ab-h2">{cms.principlesTitle}</h2><div className="ab-principles">{principles.map((item) => <article className="ab-principle" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
      <section className="ab-section"><div className="ab-rule" aria-hidden /><h2 className="ab-h2">Contact</h2><div className="ab-profiles"><a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer me" className="ab-profile"><Linkedin size={14} aria-hidden /> LinkedIn <ArrowUpRight size={12} aria-hidden /></a><a href={BRAND.github} target="_blank" rel="noopener noreferrer me" className="ab-profile"><Github size={14} aria-hidden /> GitHub <ArrowUpRight size={12} aria-hidden /></a></div><p className="ab-contact"><a href={`mailto:${BRAND.email}`} className="ab-link"><Mail size={12} className="ab-mail" aria-hidden /> {BRAND.email}</a></p></section>
    </div></section>
  </>;
}
