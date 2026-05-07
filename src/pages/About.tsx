import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import StatusChip from "@/components/brand/StatusChip";
import SignalDivider from "@/components/brand/SignalDivider";
import { BRAND } from "@/content/brand";
import {
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  absoluteUrl,
} from "@/content/siteSeo";

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
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About",
              item: absoluteUrl(ABOUT_PATH),
            },
          ],
        },
      },
    ],
  };
}

const FOCUS_AREAS = [
  "Computer Vision (YOLOv8, OpenCV, ONNX)",
  "Data Pipelines & ETL",
  "Web Scraping at Scale",
  "Edge / Local-First AI Deployment",
  "Network Engineering & Infrastructure",
  "Medical AI & Clinical Decision Support",
  "Cybersecurity Engineering",
  "RAG & LLM Integration",
];

const PRINCIPLES = [
  {
    title: "Architecture before automation",
    body: "Scope the system before writing the script. Constraints, data flow, and reliability budgets get defined upfront — not discovered in production.",
  },
  {
    title: "Data quality before model quality",
    body: "Most production AI failures are data failures. Cleaning, classifying, and observing the pipeline matters more than chasing the next model.",
  },
  {
    title: "Reliability is not a feature",
    body: "It is the system. If the network fails, the system should degrade — not disappear. Local-first, graceful fallbacks, and audit trails by design.",
  },
  {
    title: "Auditability by default",
    body: "Every meaningful event in the pipeline should be reconstructable after the fact. Logs that explain what happened, not just that something happened.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={`${SITE_URL}${ABOUT_PATH}`}
        jsonLd={aboutPageJsonLd()}
      />

      <main className="relative px-6 pb-24 pt-12">
        <div
          className="system-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-50"
          aria-hidden="true"
        />

        <article className="relative mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back home
          </Link>

          <p className="type-kicker">About</p>
          <h1 className="type-h1 mt-2">Layth Ayache</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
            AI Systems Engineer · Technical Consultant
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            I design and build computer vision, data, and AI systems for real
            operational environments — where data is messy, networks fail, users
            are impatient, and reliability matters. My work spans production AI
            at <span className="text-text-primary">Aligned Tech</span>, network
            infrastructure at <span className="text-text-primary">OGERO</span>,
            and open-source privacy tooling like{" "}
            <span className="text-text-primary">PrivacyGuard</span>.
          </p>

          {/* Visible facts strip mirroring schema */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-md border border-border bg-surface-raised p-4">
              <MapPin size={16} className="mt-0.5 text-accent" aria-hidden />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Based in
                </p>
                <p className="text-base text-text-primary">{BRAND.location}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-md border border-border bg-surface-raised p-4">
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Role
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Currently
                </p>
                <p className="text-base text-text-primary">
                  AI Systems Engineer & Technology Consultant — Aligned Tech
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-md border border-border bg-surface-raised p-4">
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Edu
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Education
                </p>
                <p className="text-base text-text-primary">
                  B.E. Computer & Communication Engineering — Rafik Hariri University
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-md border border-border bg-surface-raised p-4">
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Lang
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Languages
                </p>
                <p className="text-base text-text-primary">
                  Arabic · English · French
                </p>
              </div>
            </li>
          </ul>

          {/* Brand chip strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <StatusChip tone="production" label="Production" />
            <StatusChip tone="local-first" label="Local-first" />
            <StatusChip tone="auditable" label="Auditable" />
            <StatusChip tone="zero-cloud" label="Zero-cloud capable" />
          </div>

          <SignalDivider label="What I work on" className="my-12 px-0" />

          <h2 className="type-h2">Focus areas</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {FOCUS_AREAS.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-md border border-border bg-surface-raised px-4 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-text-secondary"
              >
                <span aria-hidden="true" className="h-px w-3 bg-accent/70" />
                {area}
              </li>
            ))}
          </ul>

          <SignalDivider label="How I work" className="my-12 px-0" />

          <h2 className="type-h2">Operating principles</h2>
          <div className="mt-6 space-y-5">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-md border border-border bg-surface-raised p-5"
              >
                <h3 className="font-serif text-lg text-text-primary">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <SignalDivider label="Reach me" className="my-12 px-0" />

          {/* sameAs section — visible counterpart to schema sameAs */}
          <h2 className="type-h2">Profiles</h2>
          <p className="type-body mt-3">
            Public profiles where my work is verifiable.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={BRAND.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={14} aria-hidden />
              LinkedIn
              <ArrowUpRight size={12} aria-hidden />
            </a>
            <a
              href={BRAND.github}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={14} aria-hidden />
              GitHub
              <ArrowUpRight size={12} aria-hidden />
            </a>
            <a
              href={BRAND.medium}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Medium
              <ArrowUpRight size={12} aria-hidden />
            </a>
            <a
              href="https://sessionize.com/layth-ayache"
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Sessionize
              <ArrowUpRight size={12} aria-hidden />
            </a>
            {/* TODO: add additional verified public profiles when available
                (e.g. Crunchbase, Dev.to, Hashnode, ResearchGate, ORCID, press
                mentions). Each must be a real, public URL — also add it to
                the `sameAs` array in src/content/siteSeo.ts and to
                scripts/inject-meta.mjs to keep schema and visible profiles
                consistent. */}
          </div>

          <p className="mt-10 text-base text-text-secondary">
            Email{" "}
            <a
              href={`mailto:${BRAND.email}`}
              className="font-mono text-sm text-accent hover:underline"
            >
              <Mail size={12} className="mb-0.5 mr-1 inline" aria-hidden />
              {BRAND.email}
            </a>{" "}
            or schedule a call via{" "}
            <a
              href={BRAND.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Calendly
            </a>
            .
          </p>
        </article>
      </main>
    </>
  );
}
