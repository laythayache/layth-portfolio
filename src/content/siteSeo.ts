import { projects } from "@/content/projects";
import { faqItems } from "@/content/faq";
import type { Project } from "@/content/types";

export const SITE_URL = "https://laythayache.com";
export const SITE_NAME = "Layth Ayache";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;
export const DEFAULT_KEYWORDS = [
  "Layth Ayache",
  "AI systems engineer Lebanon",
  "technical consultant Lebanon",
  "AI infrastructure engineer",
  "machine learning engineer Lebanon",
  "computer vision engineer",
  "automation consultant",
  "telecom AI",
  "NLP pipelines",
  "OCR automation",
  "Python",
  "TensorFlow",
  "React",
];

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): { "@type": "BreadcrumbList"; itemListElement: unknown[] } {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en",
    description:
      "AI systems engineer and technical consultant building AI infrastructure, automating workflows, and consulting for companies across telecom, finance, and healthcare.",
    publisher: { "@id": ORG_ID },
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Layth Ayache",
    url: SITE_URL,
    image: absoluteUrl("/apple-touch-icon.png"),
    jobTitle: [
      "AI Systems Engineer",
      "Technical Consultant",
    ],
    worksFor: { "@id": ORG_ID },
    homeLocation: {
      "@type": "Place",
      name: "Lebanon",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
      },
    },
    nationality: {
      "@type": "Country",
      name: "Lebanon",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Network Engineering",
      "OCR Automation",
      "Predictive Analytics",
      "Data Pipelines",
      "AI Infrastructure",
      "TypeScript",
      "Python",
      "TensorFlow",
      "React",
      "Docker",
    ],
    sameAs: [
      "https://github.com/laythayache",
      "https://www.linkedin.com/in/laythayache",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo-mark.svg"),
    founder: { "@id": PERSON_ID },
    sameAs: [
      "https://github.com/laythayache",
      "https://www.linkedin.com/in/laythayache",
    ],
  };
}

function faqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function homePageJsonLd() {
  const latestProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 6);

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      organizationJsonLd(),
      personJsonLd(),
      faqJsonLd(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: "Layth Ayache | AI Systems Engineer & Technical Consultant",
        description:
          "AI systems engineer and technical consultant building AI infrastructure, automating workflows, and consulting for companies across telecom, finance, and healthcare.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        breadcrumb: breadcrumbJsonLd([{ name: "Home", path: "/" }]),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-projects`,
        name: "Featured Projects",
        itemListElement: latestProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/projects/${project.slug}`),
          name: project.title,
        })),
      },
    ],
  };
}

export function projectPageJsonLd(project: Project) {
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);
  const keywords = [
    project.kind,
    project.system,
    project.status,
    "AI infrastructure",
    "Lebanon",
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareSourceCode", "TechArticle"],
        "@id": `${projectUrl}#project`,
        url: projectUrl,
        name: `${project.title} | Layth Ayache`,
        headline: project.title,
        description: project.summary,
        dateModified: project.updated_at,
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        inLanguage: "en",
        keywords: keywords.join(", "),
        isPartOf: { "@id": WEBSITE_ID },
        ...(project.outcome ? { abstract: project.outcome } : {}),
        ...(project.stack ? { runtimePlatform: project.stack } : {}),
        ...(project.links?.repo ? { codeRepository: project.links.repo } : {}),
      },
      {
        "@type": "WebPage",
        "@id": `${projectUrl}#webpage`,
        url: projectUrl,
        name: `${project.title} | Layth Ayache`,
        description: project.summary,
        mainEntity: { "@id": `${projectUrl}#project` },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/#projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]),
      },
    ],
  };
}
