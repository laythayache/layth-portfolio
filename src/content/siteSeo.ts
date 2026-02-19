import { projects } from "@/content/projects";
import { faqItems } from "@/content/faq";
import type { Project } from "@/content/types";
import type { BlogPost } from "@/content/posts";

export const SITE_URL = "https://laythayache.com";
export const SITE_NAME = "Layth Ayache";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;
export const DEFAULT_KEYWORDS = [
  "Layth Ayache",
  "AI systems architect",
  "technical leader Lebanon",
  "machine learning systems design",
  "AI infrastructure engineer",
  "systems architect",
  "technical strategy",
  "computer vision expert",
  "NLP pipelines",
  "data pipeline architecture",
  "distributed systems engineer",
  "AI consulting",
  "production AI systems",
  "system design",
  "ML engineering",
  "Python",
  "TensorFlow",
  "PyTorch",
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
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
      "AI Systems Architect designing and deploying production-grade machine learning infrastructure at scale. Expertise in computer vision, data pipelines, NLP systems, and technical leadership across telecom, finance, and healthcare.",
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
      "AI Systems Architect",
      "Technical Leader",
      "Systems Design Expert",
      "ML Infrastructure Engineer",
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
      "Artificial Intelligence Systems",
      "Machine Learning Architecture",
      "Systems Design & Architecture",
      "Technical Leadership",
      "Computer Vision Pipelines",
      "Natural Language Processing",
      "Distributed Systems",
      "Data Pipeline Engineering",
      "AI Infrastructure Design",
      "Production ML Systems",
      "Change Detection Systems",
      "Real-time Processing",
      "OCR & Document Processing",
      "Predictive Analytics",
      "Network Engineering",
      "Python",
      "TensorFlow",
      "PyTorch",
      "TypeScript",
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "System Architecture",
      "API Design",
      "Database Design",
      "CI/CD Pipelines",
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
        name: "Layth Ayache | AI Systems Architect & Technical Leader",
        description:
          "AI Systems Architect designing production-grade machine learning infrastructure. Expert in system design, computer vision, data pipelines, and technical leadership. Deployed solutions across telecom, finance, and healthcare sectors.",
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

export function blogPostJsonLd(post: BlogPost) {
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@id": `${postUrl}#webpage` },
        image: post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE,
        keywords: post.tags.join(", "),
        wordCount: Math.round(post.readingTimeMinutes * 220),
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: `${post.title} | Layth Ayache`,
        description: post.excerpt,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}
