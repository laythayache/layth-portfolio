import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = "https://laythayache.com";
const template = readFileSync("out/index.html", "utf8").replace(/\r\n/g, "\n");
const source = readFileSync("src/content/projects.ts", "utf8");
const pattern = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"[\s\S]*?updated_at:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g;
const projects = [...source.matchAll(pattern)].map((m) => ({ slug: m[1], title: m[2], status: m[3], modified: m[4], description: m[5].replace(/\s+/g, " ").trim() }));
const posts = readdirSync("src/content/posts").filter((name) => name.endsWith(".md")).map((name) => {
  const raw = readFileSync(`src/content/posts/${name}`, "utf8");
  const meta = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const get = (key) => meta.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].replace(/^["']|["']$/g, "").trim() ?? "";
  return { slug: name.replace(/\.md$/, ""), title: get("title"), description: get("excerpt"), modified: get("date") };
});
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

const homeContent = `<main><p>Based in Beirut, Lebanon</p><h1>Layth Ayache — AI Systems Engineer</h1><p>I design and build AI systems, automation workflows, and web applications for real business operations.</p><p>Currently Senior AI Systems &amp; Web Engineer | Technical Lead at Aachour Holding (September 2026–Present).</p><h2>Selected work</h2>${list(projects.filter((project) => ["lancaster-websites", "omnisign", "privacy-guard", "daleel"].includes(project.slug)).map((project) => `${project.title}: ${project.description}`))}<h2>Capabilities</h2>${list(["AI systems and model integration", "Computer vision and document processing", "Data pipelines and workflow automation", "APIs and systems integration", "Web applications and operational dashboards", "Infrastructure and deployment"])}<h2>Experience</h2><p>Aachour Holding, September 2026–Present. Previously Aligned Tech, November 2025–August 2026.</p><p>Contact: laythayache5@gmail.com</p></main>`;
const aboutContent = `<main><h1>About Layth Ayache</h1><p>Layth is an AI Systems Engineer based in Beirut. He works from requirements and data-flow design through implementation, integration, testing, deployment, documentation, and handover.</p><h2>Current role</h2><p>Senior AI Systems &amp; Web Engineer | Technical Lead at Aachour Holding, September 2026–Present.</p><h2>Previous role</h2><p>AI Systems Engineer &amp; Technology Consultant at Aligned Tech, November 2025–August 2026.</p><h2>Education and languages</h2><p>B.E. Computer &amp; Communication Engineering, Rafik Hariri University. Working languages: Arabic, English, and French.</p></main>`;

const staticPages = [
  { path: "/", title: "Layth Ayache | AI Systems Engineer", description: "AI systems, automation workflows, data pipelines, and web applications for real business operations.", content: homeContent },
  { path: "/about", title: "About Layth Ayache | AI Systems Engineer", description: "Professional profile, experience, capabilities, education, and working approach.", content: aboutContent },
  { path: "/projects", title: "Selected Work | Layth Ayache", description: "AI systems, automation, data, web, infrastructure, and embedded engineering case studies.", content: `<main><h1>Selected work</h1>${projects.map((project) => `<article><h2><a href="/projects/${project.slug}">${esc(project.title)}</a></h2><p>Status: ${esc(project.status)}. ${esc(project.description)}</p></article>`).join("")}</main>` },
  { path: "/credentials", title: "Credentials | Layth Ayache", description: "Engineering education and relevant professional certifications.", content: "<main><h1>Credentials</h1><p>Engineering education and relevant professional certifications.</p></main>" },
  { path: "/speaking", title: "Speaking & Teaching | Layth Ayache", description: "Technical workshops, teaching, mentoring, and professional outreach.", content: "<main><h1>Speaking and teaching</h1><p>Technical workshops, teaching, mentoring, and professional outreach.</p></main>" },
  { path: "/blog", title: "Technical Writing | Layth Ayache", description: "Notes on AI systems, automation, data pipelines, and deployment.", content: `<main><h1>Technical writing</h1>${posts.map((post) => `<article><h2><a href="/blog/${post.slug}">${esc(post.title)}</a></h2><p>${esc(post.description)}</p></article>`).join("")}</main>` },
  { path: "/faq", title: "FAQ | Layth Ayache", description: "Capabilities, implementation approach, engagement scope, and contact information.", content: "<main><h1>Frequently asked questions</h1><p>Information about capabilities, implementation approach, engagement scope, and contact.</p></main>" },
];
const routes = [
  ...staticPages,
  ...projects.map((project) => ({ path: `/projects/${project.slug}`, title: `${project.title} | Layth Ayache`, description: project.description, content: `<main><p>Project case study · Status: ${esc(project.status)}</p><h1>${esc(project.title)}</h1><p>${esc(project.description)}</p><h2>Case study</h2><p>Review the browser-rendered page for the problem, contribution, architecture, implementation decisions, results, limitations, and links.</p></main>`, modified: project.modified })),
  ...posts.map((post) => ({ path: `/blog/${post.slug}`, title: `${post.title} | Layth Ayache`, description: post.description, content: `<main><p>Technical article</p><h1>${esc(post.title)}</h1><p>${esc(post.description)}</p></main>`, modified: post.modified })),
];

function jsonLd(route) {
  return { "@context": "https://schema.org", "@type": "WebPage", url: `${BASE}${route.path}`, name: route.title, description: route.description, inLanguage: "en", about: { "@type": "Person", name: "Layth Ayache", jobTitle: "AI Systems Engineer", worksFor: { "@type": "Organization", name: "Aachour Holding" }, workLocation: "Beirut, Lebanon", sameAs: ["https://github.com/laythayache", "https://www.linkedin.com/in/laythayache"] } };
}

for (const route of routes) {
  const canonical = `${BASE}${route.path === "/" ? "/" : route.path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace("<!-- jsonld -->", `<script id="static-jsonld" type="application/ld+json">${JSON.stringify(jsonLd(route)).replace(/</g, "\\u003c")}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${route.content}</div>`);
  const output = route.path === "/" ? "out/index.html" : `out${route.path}/index.html`;
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, html);
}
console.log(`Injected route metadata and crawlable content for ${routes.length} routes`);
