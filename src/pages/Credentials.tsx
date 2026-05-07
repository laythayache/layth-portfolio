import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Award, GraduationCap, ShieldCheck } from "lucide-react";
import { useMemo, type ComponentType } from "react";
import SEO from "@/components/SEO";
import SignalDivider from "@/components/brand/SignalDivider";
import {
  certifications,
  type CredentialGroup,
  type Certification,
} from "@/content/certifications";
import { SITE_URL, absoluteUrl } from "@/content/siteSeo";

const CREDENTIALS_PATH = "/credentials";
const PAGE_TITLE = "Credentials & Education | Layth Ayache";
const PAGE_DESCRIPTION =
  "Verified credentials, professional certificates, and education for Layth Ayache — engineering degree, networking and security certifications, computer vision, and clinical credentials.";

const GROUP_META: Record<
  CredentialGroup,
  { label: string; icon: ComponentType<{ size?: number; className?: string }> }
> = {
  degrees: { label: "Degrees", icon: GraduationCap },
  professional: { label: "Professional Certificates", icon: ShieldCheck },
  awards: { label: "Awards & Clinical Credentials", icon: Award },
};

function credentialsPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${CREDENTIALS_PATH}#collectionpage`,
        url: absoluteUrl(CREDENTIALS_PATH),
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
              name: "Credentials",
              item: absoluteUrl(CREDENTIALS_PATH),
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: certifications.map((cert, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "EducationalOccupationalCredential",
              name: cert.name,
              credentialCategory:
                cert.group === "degrees"
                  ? "degree"
                  : cert.group === "professional"
                  ? "certification"
                  : "award",
              recognizedBy: { "@type": "Organization", name: cert.issuer },
              ...(cert.date ? { dateCreated: cert.date } : {}),
              ...(cert.credentialUrl ? { url: cert.credentialUrl } : {}),
            },
          })),
        },
      },
    ],
  };
}

export default function Credentials() {
  const grouped = useMemo(() => {
    const byGroup = new Map<CredentialGroup, Certification[]>();
    for (const cert of certifications) {
      const list = byGroup.get(cert.group) ?? [];
      list.push(cert);
      byGroup.set(cert.group, list);
    }
    return byGroup;
  }, []);

  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={`${SITE_URL}${CREDENTIALS_PATH}`}
        jsonLd={credentialsPageJsonLd()}
      />

      <main className="relative px-6 pb-24 pt-12">
        <div
          className="system-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back home
          </Link>

          <p className="type-kicker">Credentials</p>
          <h1 className="type-h1 mt-2">Credentials & Education</h1>
          <p className="type-body mt-4 max-w-2xl">
            Engineering degree, networking and security certifications, applied
            computer vision, and clinical credentials. Each entry is grouped by
            type and links to the issuing organization where verifiable.
          </p>

          <SignalDivider label="Verified credentials" className="my-10 px-0" />

          <div className="space-y-12">
            {(Object.keys(GROUP_META) as CredentialGroup[]).map((groupKey) => {
              const items = grouped.get(groupKey) ?? [];
              if (items.length === 0) return null;
              const GroupIcon = GROUP_META[groupKey].icon;

              return (
                <section key={groupKey}>
                  <div className="mb-5 flex items-center gap-2">
                    <span className="rounded-md bg-accent/10 p-2 text-accent">
                      <GroupIcon size={16} aria-hidden />
                    </span>
                    <h2 className="font-serif text-2xl text-text-primary">
                      {GROUP_META[groupKey].label}
                    </h2>
                  </div>

                  <ul className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-md border border-border bg-surface-raised p-5"
                      >
                        <h3 className="font-serif text-lg text-text-primary">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-text-secondary">{item.issuer}</p>
                        {item.date && (
                          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                            {item.date}
                          </p>
                        )}
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                          {item.details}
                        </p>
                        {item.credentialUrl && (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                            aria-label="View credential (opens in new tab)"
                          >
                            View credential
                            <ArrowUpRight size={12} aria-hidden />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
