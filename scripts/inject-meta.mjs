/**
 * Post-build script: injects per-route <title>, <meta>, and JSON-LD into
 * static HTML files so that link unfurlers (Twitter, LinkedIn, Slack, Discord)
 * and search engines see correct metadata without executing JavaScript.
 *
 * Reads the built index.html as a template and writes route-specific copies.
 * JSON-LD generators here are lean mirrors of src/content/siteSeo.ts —
 * the React Helmet versions are canonical; these serve non-JS crawlers.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
} from "node:fs";
import { dirname } from "node:path";

const OUT_DIR = "out";
const BASE_URL = "https://laythayache.com";
const OG_IMAGE = `${BASE_URL}/og-default.jpg`;
const DEFAULT_OG_ALT = "Layth Ayache AI systems portfolio preview";

const PROJECTS_SOURCE = "src/content/projects.ts";
const POSTS_DIR = "src/content/posts";
const FAQ_SOURCE = "src/content/faq.ts";

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return OG_IMAGE;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${BASE_URL}${normalized}`;
}

/* ── Shared JSON-LD fragments ─────────────────────────────────────── */

const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const ORG_ID = `${BASE_URL}/#organization`;

function personFragment() {
  const age = new Date().getFullYear() - 2003;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Layth Ayache",
    givenName: "Layth",
    familyName: "Ayache",
    url: BASE_URL,
    image: `${BASE_URL}/apple-touch-icon.png`,
    birthDate: "2003",
    gender: "Male",
    jobTitle: [
      "AI Systems Architect",
      "Infrastructure Architect",
    ],
    description:
      `Layth Ayache is a ${age}-year-old AI systems architect and technology leader from Lebanon. He leads AI systems architecture, cross-functional engineering, and technology strategy at Aligned Tech, driving end-to-end AI infrastructure and engineering operations. At ${age}, he has architected production systems processing millions of data points, deployed computer vision at 95% accuracy, built PrivacyGuard (open-source privacy pipeline), maintained 99.9% uptime at OGERO, and mentored 100+ students in AI.`,
    worksFor: {
      "@type": "Organization",
      name: "Aligned Tech",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Rafik Hariri University",
        url: "https://www.rhu.edu.lb",
      },
      {
        "@type": "EducationalOrganization",
        name: "Conservatoire de Musique du Liban",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Computer and Communication Engineering Degree",
        credentialCategory: "Bachelor's Degree",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Rafik Hariri University" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "OpenCV Bootcamp Certification",
        credentialCategory: "Professional Certification",
        recognizedBy: { "@type": "Organization", name: "OpenCV University" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Phlebotomy Technician Certification",
        credentialCategory: "Professional Certification",
        recognizedBy: { "@type": "Organization", name: "Medical Rescue Corps" },
      },
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Arabic", alternateName: "ar" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "French", alternateName: "fr" },
    ],
    memberOf: [
      { "@type": "Organization", name: "IEEE" },
      { "@type": "Organization", name: "Lebanese Civil Defense" },
    ],
    homeLocation: {
      "@type": "Place",
      name: "Lebanon",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LB",
        addressLocality: "Beirut",
      },
    },
    nationality: {
      "@type": "Country",
      name: "Lebanon",
    },
    knowsAbout: [
      "AI Systems Architecture", "Machine Learning Engineering", "Deep Learning",
      "Computer Vision", "Object Detection (YOLOv8)", "Image Classification",
      "Privacy-Preserving AI", "Real-Time Video Analytics", "Edge AI Deployment",
      "Natural Language Processing", "Sentiment Analysis", "Sign Language AI",
      "Generative AI", "Large Language Model Integration", "RAG (Retrieval-Augmented Generation)",
      "Conversational AI", "Prompt Engineering", "LLM Fine-Tuning",
      "Web Scraping Systems", "Google Search Scraping", "Automated Data Extraction",
      "Selenium Automation", "Scrapy", "SERP Scraping",
      "Medical AI Systems", "Healthcare AI", "Clinical Decision Support",
      "Medical Image Analysis", "Emergency Medical Technology",
      "Cybersecurity Engineering", "Network Security Architecture",
      "Penetration Testing", "Intrusion Detection Systems", "Zero Trust Architecture",
      "GDPR Compliance Engineering", "CCPA Privacy Engineering",
      "National Infrastructure Architecture", "Digital Transformation",
      "Smart City Infrastructure", "Telecom Infrastructure", "Fiber Optics Engineering",
      "Data Pipeline Engineering", "ETL Systems", "Real-Time Data Processing",
      "OCR Systems (Tesseract, OpenCV)", "Document Processing Automation",
      "AWS", "Docker", "Kubernetes", "CI/CD Pipeline Engineering",
      "Microservices Architecture", "Distributed Systems", "ONNX Runtime",
      "CRM Administration (HubSpot)", "Zapier Workflow Automation",
      "Python", "TypeScript", "React", "Node.js", "PostgreSQL", "MongoDB",
      "Embedded Systems Engineering", "IoT Architecture", "Raspberry Pi", "Arduino",
      "FPGA Design", "Verilog", "MATLAB",
      "Cisco Network Engineering", "Linux Systems Administration",
      "Accessibility Technology", "Open Source Software Development",
    ],
    sameAs: [
      "https://github.com/laythayache",
      "https://www.linkedin.com/in/laythayache",
      "https://medium.com/@laythayache5",
    ],
  };
}

function websiteFragment() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_URL,
    name: "Layth Ayache",
    description:
      "Senior AI systems architect and technology leader from Lebanon, building production-grade AI systems and national-scale digital infrastructure.",
  };
}

function organizationFragment() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Layth Ayache",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-mark.svg`,
    founder: { "@id": PERSON_ID },
  };
}

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/* ── JSON-LD generators per route type ────────────────────────────── */

function homeJsonLd(faqItems) {
  const graph = [
    websiteFragment(),
    organizationFragment(),
    personFragment(),
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: "Layth Ayache | AI Systems Architect & Technology Leader",
      description:
        "AI systems architect and technology leader specializing in computer vision, NLP, privacy-preserving AI, web scraping, medical AI, cybersecurity, data pipeline engineering, and national-scale digital infrastructure. Building production-grade systems and leading engineering operations at Aligned Tech.",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en",
      breadcrumb: breadcrumb([{ name: "Home", path: "/" }]),
    },
  ];

  if (faqItems && faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function projectJsonLd(project) {
  const url = `${BASE_URL}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareSourceCode", "TechArticle"],
        "@id": `${url}#project`,
        url,
        name: `${project.title} | Layth Ayache`,
        headline: project.title,
        description: project.summary,
        ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
        author: { "@id": PERSON_ID },
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${project.title} | Layth Ayache`,
        description: project.summary,
        mainEntity: { "@id": `${url}#project` },
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: breadcrumb([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/#projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]),
      },
    ],
  };
}

function blogPostJsonLd(post) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const image = post.coverImage ? absoluteUrl(post.coverImage) : OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        ...(post.date
          ? { datePublished: post.date, dateModified: post.date }
          : {}),
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image,
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${post.title} | Layth Ayache`,
        description: post.excerpt,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      },
    ],
  };
}

function genericPageJsonLd(route) {
  const url = `${BASE_URL}${route.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        breadcrumb: breadcrumb([
          { name: "Home", path: "/" },
          { name: route.title.split(" | ")[0], path: route.path },
        ]),
      },
    ],
  };
}

/* ── Parsers ──────────────────────────────────────────────────────── */

function parseProjects() {
  const source = readFileSync(PROJECTS_SOURCE, "utf8");
  const pattern =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g;
  return [...source.matchAll(pattern)].map((m) => {
    const slug = m[1];
    const title = m[2];
    const summary = m[3].replace(/\s+/g, " ").trim();
    // Extract updated_at near this slug
    const slugIdx = source.indexOf(`slug: "${slug}"`);
    const chunk = source.substring(slugIdx, slugIdx + 1600);
    const dateMatch = chunk.match(/updated_at:\s*"([^"]+)"/);
    const thumbnailMatch = chunk.match(/thumbnail:\s*"([^"]+)"/);
    const architectureMatch = chunk.match(/architectureDiagram:\s*"([^"]+)"/);
    return {
      slug,
      title,
      summary,
      updatedAt: dateMatch ? dateMatch[1] : undefined,
      thumbnail: thumbnailMatch ? thumbnailMatch[1] : undefined,
      architectureDiagram: architectureMatch ? architectureMatch[1] : undefined,
    };
  });
}

function parseBlogPosts() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = readFileSync(`${POSTS_DIR}/${file}`, "utf8");
      const match = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!match) return null;
      const meta = match[1];
      const slug = file.replace(/\.md$/, "");
      const get = (key) => {
        const m = meta.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
        return m ? m[1].replace(/^["']|["']$/g, "").trim() : "";
      };
      return {
        slug,
        title: get("title"),
        excerpt: get("excerpt"),
        date: get("date"),
        coverImage: get("coverImage"),
        coverImageAlt: get("coverImageAlt"),
      };
    })
    .filter(Boolean);
}

function parseFaqItems() {
  if (!existsSync(FAQ_SOURCE)) return [];
  const source = readFileSync(FAQ_SOURCE, "utf8");
  const items = [];
  const qPattern = /question:\s*"([^"]+)"/g;
  let qMatch;
  while ((qMatch = qPattern.exec(source)) !== null) {
    const afterQ = source.substring(qMatch.index);
    const aMatch = afterQ.match(/answer:\s*\n?\s*"([\s\S]*?)(?:"\s*[,}])/);
    if (aMatch) {
      items.push({
        question: qMatch[1],
        answer: aMatch[1].replace(/\s+/g, " ").trim(),
      });
    }
  }
  return items;
}

/* ── Route definitions ─────────────────────────────────────────────── */

function getRoutes() {
  const projects = parseProjects();
  const posts = parseBlogPosts();
  const latestPost = posts
    .filter((post) => post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const omnisign = projects.find((project) => project.slug === "omnisign");

  const routes = [
    {
      path: "/blog",
      title: "Writing and Insights | Layth Ayache",
      description:
        "Articles on AI systems engineering, infrastructure architecture, and applied technical strategy. Practical insights from building production systems in Lebanon.",
      ogImage: latestPost?.coverImage || OG_IMAGE,
      ogImageAlt: latestPost?.coverImageAlt || "Layth Ayache blog preview",
    },
    {
      path: "/projects",
      title: "Projects | Layth Ayache",
      description:
        "Browse all projects by Layth Ayache — production AI systems, computer vision pipelines, NLP engines, and engineering case studies with architecture deep dives.",
      ogImage: omnisign?.thumbnail || OG_IMAGE,
      ogImageAlt: "Layth Ayache projects and case studies",
    },
    {
      path: "/beyond-tech",
      title: "Beyond Tech | Layth Ayache",
      description:
        "Community leadership, emergency medical response, music, and initiatives beyond engineering. Layth Ayache's volunteer work, scouting, and outreach in Lebanon.",
      ogImage: "/landing-page-portrait.png",
      ogImageAlt: "Layth Ayache beyond technology and community work",
    },
  ];

  // Attach JSON-LD to static routes
  for (const route of routes) {
    route.jsonLd = genericPageJsonLd(route);
  }

  for (const project of projects) {
    const projectImage =
      project.thumbnail || project.architectureDiagram || OG_IMAGE;
    routes.push({
      path: `/projects/${project.slug}`,
      title: `${project.title} | Layth Ayache`,
      description: project.summary,
      ogImage: projectImage,
      ogImageAlt: `${project.title} case study preview`,
      jsonLd: projectJsonLd(project),
    });
  }

  for (const post of posts) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Layth Ayache`,
      description: post.excerpt,
      ogType: "article",
      ogImage: post.coverImage || OG_IMAGE,
      ogImageAlt: post.coverImageAlt || `${post.title} cover image`,
      jsonLd: blogPostJsonLd(post),
    });
  }

  return routes;
}

/* ── HTML injection ────────────────────────────────────────────────── */

function injectMeta(template, route) {
  let html = template;
  const routeUrl = `${BASE_URL}${route.path}`;
  const routeOgType = route.ogType || "website";
  const routeOgImage = absoluteUrl(route.ogImage || OG_IMAGE);
  const routeOgImageAlt = route.ogImageAlt || DEFAULT_OG_ALT;
  const hasImageWidth = Number.isFinite(route.ogImageWidth);
  const hasImageHeight = Number.isFinite(route.ogImageHeight);

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(route.description)}"`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(route.title)}"`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(route.description)}"`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${routeUrl}"`
  );

  // Replace og:type
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${routeOgType}"`
  );

  // Replace Open Graph image tags
  html = html.replace(
    /<meta property="og:image:url" content="[^"]*"/,
    `<meta property="og:image:url" content="${routeOgImage}"`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${routeOgImage}"`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*"/,
    `<meta property="og:image:secure_url" content="${routeOgImage}"`
  );
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${escapeAttr(routeOgImageAlt)}"`
  );
  if (hasImageWidth) {
    html = html.replace(
      /<meta property="og:image:width" content="[^"]*"\s*\/>/,
      `<meta property="og:image:width" content="${route.ogImageWidth}" />`
    );
  } else {
    html = html.replace(/^\s*<meta property="og:image:width" content="[^"]*"\s*\/>\s*\r?\n?/m, "");
  }
  if (hasImageHeight) {
    html = html.replace(
      /<meta property="og:image:height" content="[^"]*"\s*\/>/,
      `<meta property="og:image:height" content="${route.ogImageHeight}" />`
    );
  } else {
    html = html.replace(/^\s*<meta property="og:image:height" content="[^"]*"\s*\/>\s*\r?\n?/m, "");
  }

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}"`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}"`
  );

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${routeOgImage}"`
  );
  html = html.replace(
    /<meta name="twitter:image:alt" content="[^"]*"/,
    `<meta name="twitter:image:alt" content="${escapeAttr(routeOgImageAlt)}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${routeUrl}"`
  );

  // Inject JSON-LD (replace placeholder)
  if (route.jsonLd) {
    const jsonLdScript = `<script id="static-jsonld" type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n    </script>`;
    html = html.replace("<!-- jsonld -->", jsonLdScript);
  }

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/* ── Main ──────────────────────────────────────────────────────────── */

function main() {
  const templatePath = `${OUT_DIR}/index.html`;
  if (!existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}. Run vite build first.`);
    process.exit(1);
  }

  const template = readFileSync(templatePath, "utf8");
  const routes = getRoutes();
  const faqItems = parseFaqItems();
  let count = 0;

  // Patch homepage with its own JSON-LD
  const homeRoute = {
    path: "/",
    title: "Layth Ayache | AI Systems Architect & Technology Leader",
    description:
      "Senior AI systems architect and technology leader from Lebanon. Building production-grade computer vision, NLP, data pipelines, and national-scale digital infrastructure at Aligned Tech.",
    ogImage: OG_IMAGE,
    ogImageAlt: "Layth Ayache AI systems portfolio preview",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    jsonLd: homeJsonLd(faqItems),
  };
  writeFileSync(templatePath, injectMeta(template, homeRoute), "utf8");
  count++;

  // Write sub-routes
  for (const route of routes) {
    const outPath = `${OUT_DIR}${route.path}/index.html`;
    const dir = dirname(outPath);
    mkdirSync(dir, { recursive: true });
    writeFileSync(outPath, injectMeta(template, route), "utf8");
    count++;
  }

  console.log(`Injected meta tags for ${count} routes`);
}

main();
