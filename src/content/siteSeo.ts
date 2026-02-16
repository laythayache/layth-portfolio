import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

export const SITE_URL = "https://laythayache.com";
export const SITE_NAME = "Layth Ayache";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;
export const DEFAULT_KEYWORDS = [
  "Layth Ayache",
  "AI engineer Lebanon",
  "AI infrastructure engineer Lebanon",
  "machine learning engineer Lebanon",
  "computer vision engineer Lebanon",
  "software engineer Lebanon",
  "lab notebook",
  "technical documentation",
  "distributed systems",
  "data pipelines",
  "production engineering",
  "TypeScript",
  "Python",
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
      "AI infrastructure engineer documenting the process of building serious systems from unstable ground.",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/lab?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
      "AI Infrastructure Engineer",
      "Machine Learning Engineer",
      "Software Engineer",
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
      "Distributed Systems",
      "Data Engineering",
      "AI Infrastructure",
      "Software Architecture",
      "TypeScript",
      "Python",
      "React",
      "Node.js",
      "PostgreSQL",
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
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: "Layth Ayache | AI Infrastructure Engineer",
        description:
          "AI infrastructure engineer documenting the process of building serious systems from unstable ground.",
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

export function labPageJsonLd(items: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/lab#webpage`,
        url: `${SITE_URL}/lab`,
        name: "The Lab | Layth Ayache",
        description:
          "Projects, failures, iterations. Each entry documents what was tried and what I learned.",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": `${SITE_URL}/lab#project-list` },
        breadcrumb: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Lab", path: "/lab" },
        ]),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/lab#project-list`,
        name: "Lab Projects",
        numberOfItems: items.length,
        itemListElement: items.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/projects/${project.slug}`),
          name: project.title,
        })),
      },
    ],
  };
}

export function experimentsPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/experiments#webpage`,
        url: `${SITE_URL}/experiments`,
        name: "Experiments | Layth Ayache",
        description:
          "Ongoing technical experiments in AI infrastructure, multilingual retrieval, edge inference, and data extraction.",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiments", path: "/experiments" },
        ]),
      },
    ],
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About | Layth Ayache",
        description:
          "AI infrastructure engineer documenting the process of building serious systems from unstable ground.",
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      },
      personJsonLd(),
    ],
  };
}

export function thinkingPageJsonLd(articles: Array<{
  slug: string;
  title: string;
  summary: string;
  date: string;
  draft?: boolean;
}>) {
  const published = articles.filter((article) => !article.draft);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/thinking#blog`,
        url: `${SITE_URL}/thinking`,
        name: "Thinking | Layth Ayache",
        description:
          "Technical essays on infrastructure, architecture, and building from unstable ground.",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
      },
      ...published.map((article) => ({
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/thinking/${article.slug}#article`,
        headline: article.title,
        datePublished: article.date,
        dateModified: article.date,
        description: article.summary,
        author: { "@id": PERSON_ID },
        mainEntityOfPage: `${SITE_URL}/thinking`,
        inLanguage: "en",
      })),
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
          { name: "Lab", path: "/lab" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]),
      },
    ],
  };
}
