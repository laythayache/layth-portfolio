import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Bot, Mic, Users } from "lucide-react";
import SEO from "@/components/SEO";
import SignalDivider from "@/components/brand/SignalDivider";
import { speakingEntries } from "@/content/speaking";
import { SITE_URL, absoluteUrl } from "@/content/siteSeo";

const SPEAKING_PATH = "/speaking";
const PAGE_TITLE = "Speaking & Community | Layth Ayache";
const PAGE_DESCRIPTION =
  "Talks, mentorship, and community engagement by Layth Ayache — focused on practical AI systems, engineering education, and community-first technology in Lebanon and beyond.";

function getEntryIcon(id: string) {
  if (id.includes("robotics")) return Bot;
  if (id.includes("ambassador")) return Users;
  return Mic;
}

function speakingPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${SPEAKING_PATH}#collectionpage`,
        url: absoluteUrl(SPEAKING_PATH),
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Speaking",
              item: absoluteUrl(SPEAKING_PATH),
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: speakingEntries.map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.title,
            description: entry.description,
            ...(entry.link ? { url: entry.link } : {}),
          })),
        },
      },
    ],
  };
}

export default function Speaking() {
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={`${SITE_URL}${SPEAKING_PATH}`}
        jsonLd={speakingPageJsonLd()}
      />

      <main className="relative px-6 pb-24 pt-12">
        <div
          className="system-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back home
          </Link>

          <p className="type-kicker">Speaking</p>
          <h1 className="type-h1 mt-2">Speaking & Community</h1>
          <p className="type-body mt-4 max-w-2xl">
            Talks, workshops, mentorship, and civic-tech work focused on
            practical AI systems, engineering education, and building
            community-first technology in resource-constrained environments.
          </p>

          <SignalDivider label="Engagements" className="my-10 px-0" />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {speakingEntries.map((entry) => {
              const Icon = getEntryIcon(entry.id);
              return (
                <li
                  key={entry.id}
                  className="card-lift rounded-md border border-border bg-surface-raised p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-accent/10 p-2 text-accent">
                      <Icon size={17} aria-hidden />
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      {entry.organization}
                    </p>
                  </div>
                  <h2 className="font-serif text-lg leading-tight text-text-primary mt-4">
                    {entry.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {entry.role}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {entry.description}
                  </p>
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                      aria-label={`${entry.ctaLabel} (opens in a new tab)`}
                    >
                      {entry.ctaLabel}
                      <ArrowUpRight size={12} aria-hidden />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
