import { projects } from "@/content/projects";
import { faqItems } from "@/content/faq";
import { PROFESSIONAL } from "@/content/professional";
import type { Project } from "@/content/types";
import type { BlogPost } from "@/content/posts";

export const SITE_URL = PROFESSIONAL.profiles.website;
export const SITE_NAME = PROFESSIONAL.name;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brand/og-default.jpg`;
export const DEFAULT_KEYWORDS = ["Layth Ayache", "AI Systems Engineer", "AI integration", "workflow automation", "computer vision", "data pipelines", "web applications", "Beirut Lebanon"];
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path: string): string { return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`; }

export function websiteJsonLd() {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: SITE_NAME, inLanguage: "en", description: PROFESSIONAL.summary, publisher: { "@id": ORG_ID } };
}

export function personJsonLd() {
  return {
    "@type": "Person", "@id": PERSON_ID, name: PROFESSIONAL.name, url: SITE_URL,
    image: absoluteUrl("/images/team/layth-ayache.jpeg"), jobTitle: PROFESSIONAL.primaryTitle,
    description: `${PROFESSIONAL.name} is an ${PROFESSIONAL.primaryTitle} based in ${PROFESSIONAL.location}. ${PROFESSIONAL.summary}`,
    worksFor: { "@type": "Organization", name: PROFESSIONAL.currentRole.company },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Rafik Hariri University", url: "https://www.rhu.edu.lb" },
    knowsLanguage: PROFESSIONAL.languages,
    workLocation: { "@type": "Place", name: PROFESSIONAL.location },
    knowsAbout: ["AI systems engineering", "Computer vision", "Document processing", "Data pipelines", "Workflow automation", "API integration", "Web applications", "Infrastructure and deployment"],
    sameAs: [PROFESSIONAL.profiles.github, PROFESSIONAL.profiles.linkedin, PROFESSIONAL.profiles.medium],
  };
}

export function organizationJsonLd() {
  return { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL, logo: absoluteUrl("/images/brand/logo-mark.svg"), founder: { "@id": PERSON_ID } };
}

const breadcrumb = (items: Array<{ name: string; path: string }>) => ({ "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) });

export function faqPageJsonLd() {
  return { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/faq#faq`, url: `${SITE_URL}/faq`, mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function homePageJsonLd() {
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  return { "@context": "https://schema.org", "@graph": [websiteJsonLd(), organizationJsonLd(), personJsonLd(), { "@type": "WebPage", "@id": `${SITE_URL}/#webpage`, url: SITE_URL, name: `${PROFESSIONAL.name} | ${PROFESSIONAL.primaryTitle}`, description: PROFESSIONAL.summary, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": PERSON_ID }, inLanguage: "en" }, { "@type": "ItemList", name: "Selected work", itemListElement: featured.map((project, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/projects/${project.slug}`), name: project.title })) }] };
}

export function projectPageJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return { "@context": "https://schema.org", "@graph": [{ "@type": ["SoftwareSourceCode", "TechArticle"], "@id": `${url}#project`, url, name: project.title, headline: project.title, description: project.summary, dateModified: project.updated_at, author: { "@id": PERSON_ID }, keywords: [project.kind, project.system, project.status, ...(project.tags ?? [])].join(", "), ...(project.links?.repo ? { codeRepository: project.links.repo } : {}) }, { "@type": "WebPage", "@id": `${url}#webpage`, url, name: `${project.title} | ${PROFESSIONAL.name}`, description: project.summary, mainEntity: { "@id": `${url}#project` }, isPartOf: { "@id": WEBSITE_ID }, breadcrumb: breadcrumb([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path: `/projects/${project.slug}` }]) }] };
}

export function blogPostJsonLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return { "@context": "https://schema.org", "@graph": [{ "@type": "BlogPosting", "@id": `${url}#article`, headline: post.title, description: post.excerpt, datePublished: post.date, dateModified: post.date, author: { "@id": PERSON_ID }, publisher: { "@id": ORG_ID }, image: post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE, keywords: post.tags.join(", "), inLanguage: "en" }, { "@type": "WebPage", "@id": `${url}#webpage`, url, name: `${post.title} | ${PROFESSIONAL.name}`, description: post.excerpt, isPartOf: { "@id": WEBSITE_ID }, breadcrumb: breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]) }] };
}
