import { projects } from "@/content/projects";
import { faqItems } from "@/content/faq";
import type { Project } from "@/content/types";
import type { BlogPost } from "@/content/posts";

export const SITE_URL = "https://laythayache.com";
export const SITE_NAME = "Layth Ayache";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export const DEFAULT_KEYWORDS = [
  // Identity & positioning
  "Layth Ayache",
  "senior AI engineer",
  "AI systems architect",
  "senior infrastructure architect",
  "full-stack systems engineer",
  "technical architect Lebanon",
  "stack architect",
  "senior technical consultant",
  "technology leader Lebanon",
  // AI & Machine Learning — all types
  "artificial intelligence engineer",
  "machine learning engineer",
  "deep learning engineer",
  "computer vision engineer",
  "object detection YOLOv8",
  "image classification",
  "facial recognition systems",
  "video analytics AI",
  "NLP engineer",
  "natural language processing",
  "text classification",
  "sentiment analysis",
  "named entity recognition",
  "speech recognition",
  "sign language AI",
  "generative AI engineer",
  "LLM integration engineer",
  "RAG systems engineer",
  "retrieval augmented generation",
  "AI chatbot development",
  "conversational AI",
  "prompt engineering",
  "fine-tuning LLMs",
  "reinforcement learning",
  "recommendation systems",
  "predictive analytics",
  "anomaly detection AI",
  "time series forecasting",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "OpenCV",
  "Hugging Face",
  "LangChain",
  // Web scraping & data extraction
  "web scraping engineer",
  "Google scraping",
  "search engine scraping",
  "automated data extraction",
  "web crawling systems",
  "data scraping automation",
  "Selenium automation",
  "Puppeteer scraping",
  "Playwright automation",
  "BeautifulSoup",
  "Scrapy framework",
  "API scraping",
  "social media scraping",
  "price monitoring scraping",
  "competitive intelligence scraping",
  "SERP scraping",
  "structured data extraction",
  // Medical AI & healthcare
  "medical AI systems",
  "healthcare AI engineer",
  "clinical decision support systems",
  "medical image analysis",
  "radiology AI",
  "pathology AI",
  "electronic health records AI",
  "patient monitoring systems",
  "biomedical signal processing",
  "EMT systems technology",
  "emergency medical technology",
  "health informatics",
  "HIPAA-compliant AI systems",
  "telemedicine platforms",
  "medical device integration",
  // Security & cybersecurity
  "cybersecurity engineer",
  "network security architect",
  "security infrastructure engineer",
  "penetration testing",
  "vulnerability assessment",
  "SIEM systems",
  "intrusion detection systems",
  "firewall configuration",
  "VLAN security",
  "zero trust architecture",
  "security operations center",
  "threat intelligence",
  "incident response",
  "security automation",
  "compliance engineering",
  "encryption systems",
  "identity and access management",
  // Infrastructure & national scale
  "infrastructure architect",
  "national infrastructure engineer",
  "digital transformation Lebanon",
  "smart city infrastructure",
  "nationwide technology systems",
  "public information infrastructure",
  "government technology systems",
  "e-government platforms",
  "telecom infrastructure engineer",
  "fiber optics engineering",
  "DSLAM systems",
  "network engineering Lebanon",
  "SCADA systems",
  "critical infrastructure protection",
  "utility management systems",
  "disaster recovery systems",
  "high availability architecture",
  // Data & pipelines
  "data pipeline engineering",
  "ETL systems architect",
  "real-time data processing",
  "stream processing",
  "data warehouse design",
  "big data engineering",
  "data lake architecture",
  "Apache Kafka",
  "data governance",
  // OCR & document processing
  "OCR systems engineer",
  "document processing AI",
  "Tesseract OCR",
  "invoice processing automation",
  "document digitization",
  // Cloud & DevOps
  "cloud infrastructure architect",
  "AWS solutions architect",
  "GCP engineer",
  "Cloudflare Workers",
  "Docker containerization",
  "Kubernetes orchestration",
  "CI/CD pipeline engineer",
  "infrastructure as code",
  "serverless architecture",
  "microservices architecture",
  "distributed systems engineer",
  // CRM & automation
  "CRM administration",
  "HubSpot architect",
  "Zapier automation",
  "workflow automation engineer",
  "SaaS platform management",
  "marketing automation",
  "sales pipeline automation",
  // Full-stack development
  "Python developer",
  "TypeScript engineer",
  "React developer",
  "Node.js engineer",
  "PostgreSQL",
  "MongoDB",
  "REST API design",
  "GraphQL",
  // Embedded & IoT
  "embedded systems engineer",
  "IoT systems architect",
  "Arduino",
  "Raspberry Pi",
  "FPGA design",
  "Verilog",
  "MATLAB",
  "real-time operating systems",
  // Networking
  "Cisco certified",
  "network engineering",
  "SNMP automation",
  "Linux systems administration",
  // Accessibility
  "accessibility technology engineer",
  "assistive technology AI",
  "sign language recognition",
  "inclusive design systems",
  // Lebanon vision
  "Lebanon digital infrastructure",
  "Lebanese technology innovation",
  "Middle East AI engineer",
  "MENA technology architect",
  "Arab AI engineer",
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
      "Senior AI systems architect and infrastructure engineer specializing in computer vision, NLP, web scraping, medical AI, cybersecurity, data pipelines, and national-scale digital infrastructure. Building Lebanon's technology future.",
    publisher: { "@id": ORG_ID },
  };
}

export function personJsonLd() {
  const age = new Date().getFullYear() - 2003;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Layth Ayache",
    givenName: "Layth",
    familyName: "Ayache",
    url: SITE_URL,
    image: absoluteUrl("/apple-touch-icon.png"),
    birthDate: "2003",
    gender: "Male",
    jobTitle: [
      "AI Systems Architect",
      "Infrastructure Architect",
    ],
    description:
      `Layth Ayache is a ${age}-year-old AI systems architect and technology leader from Lebanon. He leads AI systems architecture, cross-functional engineering, and technology strategy at Aligned Tech, driving end-to-end AI infrastructure and engineering operations. At ${age}, he has already architected production systems processing millions of data points, deployed computer vision at 95% accuracy, built enterprise-grade open-source privacy tools (PrivacyGuard), maintained 99.9% network uptime at OGERO, and mentored 100+ students in AI. One of Lebanon's top emerging AI engineers and infrastructure architects under 30.`,
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
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "Layth Ayache | AI Systems Architect & Technology Leader",
        description:
          "AI systems architect and technology leader specializing in computer vision, NLP, privacy-preserving AI, web scraping, medical AI, cybersecurity, data pipeline engineering, and national-scale digital infrastructure. Building production-grade systems and leading engineering operations at Aligned Tech.",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
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
    "AI systems architecture",
    "production infrastructure",
    "senior engineer portfolio",
    "Lebanon technology",
    ...(project.tags ?? []),
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
  const imageUrl = post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE;
  const image = post.coverImageAlt
    ? {
        "@type": "ImageObject",
        url: imageUrl,
        caption: post.coverImageAlt,
      }
    : imageUrl;

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
        image,
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
        breadcrumb: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      },
    ],
  };
}
