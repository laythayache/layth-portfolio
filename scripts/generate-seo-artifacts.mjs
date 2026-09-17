import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const BASE = "https://laythayache.com";
const projectSource = readFileSync("src/content/projects.ts", "utf8");
const projectPattern = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"[\s\S]*?updated_at:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g;
const projects = [...projectSource.matchAll(projectPattern)].map((match) => ({ slug: match[1], title: match[2], status: match[3], updatedAt: match[4], summary: match[5].replace(/\s+/g, " ").trim() }));
if (!projects.length) throw new Error("No projects parsed from src/content/projects.ts");

const posts = readdirSync("src/content/posts").filter((name) => name.endsWith(".md")).map((name) => {
  const raw = readFileSync(`src/content/posts/${name}`, "utf8");
  const meta = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const get = (key) => meta.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].replace(/^["']|["']$/g, "").trim() ?? "";
  return { slug: name.replace(/\.md$/, ""), title: get("title"), date: get("date"), excerpt: get("excerpt") };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const escapeXml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const latest = [...projects.map((item) => item.updatedAt), ...posts.map((item) => item.date)].filter(Boolean).sort().pop();
const staticRoutes = ["/", "/about", "/projects", "/projects/omnisign", "/credentials", "/speaking", "/blog", "/faq"];
const routes = [
  ...staticRoutes.map((path) => ({ path, lastmod: latest, priority: path === "/" ? "1.0" : "0.8" })),
  ...projects.filter((project) => project.slug !== "omnisign").map((project) => ({ path: `/projects/${project.slug}`, lastmod: project.updatedAt, priority: "0.7" })),
  ...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.date, priority: "0.6" })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url>\n    <loc>${BASE}${route.path}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <priority>${route.priority}</priority>\n  </url>`).join("\n")}\n</urlset>\n`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n  <title>Layth Ayache - Technical writing</title><link>${BASE}/blog</link>\n  <description>Technical notes on AI systems, automation, data pipelines, and deployment.</description><language>en</language>\n  <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />\n${posts.map((post) => `  <item><title>${escapeXml(post.title)}</title><link>${BASE}/blog/${post.slug}</link><guid isPermaLink="true">${BASE}/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description></item>`).join("\n")}\n</channel></rss>\n`;

const projectLines = projects.map((project) => `- [${project.title}](${BASE}/projects/${project.slug}) | ${project.status}\n  ${project.summary}`).join("\n");
const articleLines = posts.map((post) => `- [${post.title}](${BASE}/blog/${post.slug}) — ${post.excerpt}`).join("\n");
const llms = `# Layth Ayache\n\n> AI Systems Engineer based in Beirut, Lebanon. I design and build AI systems, automation workflows, and web applications for real business operations.\n\n## Employment\n- Current: Senior AI Systems & Web Engineer | Technical Lead, Aachour Holding (September 2026–Present)\n- Previous: AI Systems Engineer & Technology Consultant, Aligned Tech (November 2025–August 2026)\n\n## Capabilities\n- AI systems and model integration\n- Computer vision and document processing\n- Data pipelines and workflow automation\n- APIs and systems integration\n- Web applications and operational dashboards\n- Infrastructure and deployment\n\n## Authoritative pages\n- [Professional profile](${BASE}/about)\n- [Selected work](${BASE}/projects)\n- [Credentials](${BASE}/credentials)\n- [Technical writing](${BASE}/blog)\n- [FAQ](${BASE}/faq)\n\n## Projects\n${projectLines}\n\n## Articles\n${articleLines}\n\n## Contact\n- Email: laythayache5@gmail.com\n- LinkedIn: https://www.linkedin.com/in/laythayache\n- GitHub: https://github.com/laythayache\n\nThis file is supplemental context. The linked portfolio pages are canonical.\nLast updated: ${new Date().toISOString().slice(0, 10)}\n`;

const projectKnowledge = projects.map((project) => `- ${project.title} (${BASE}/projects/${project.slug}): ${project.summary} Status: ${project.status}.`).join("\n");
const prompt = `You are the professional portfolio assistant for Layth Ayache. Help visitors understand his verified work, capabilities, experience, and contact options.\n\nSCOPE\n- Answer only from the approved professional information below.\n- If information is unavailable, say so. Do not infer or speculate.\n- Do not discuss private life, personality, motivations, relationships, compensation, religion, politics, or demographic details.\n- Do not invent qualifications, clients, results, deployments, or measurement context.\n- Keep replies concise and link to a relevant portfolio page when useful.\n- Offer contact only when it naturally helps. For hiring or project enquiries, include [ACTION:contact].\n\nPROFESSIONAL FACTS\n- Layth Ayache is an AI Systems Engineer based in Beirut, Lebanon.\n- Current: Senior AI Systems & Web Engineer | Technical Lead at Aachour Holding (September 2026–Present). Scope: AI systems engineering, web engineering, technical leadership.\n- Previous: AI Systems Engineer & Technology Consultant at Aligned Tech (November 2025–August 2026).\n- Education: B.E. Computer & Communication Engineering, Rafik Hariri University.\n- Working languages: Arabic, English, French.\n- Capabilities: AI and model integration; computer vision and document processing; data pipelines and workflow automation; APIs and systems integration; web applications and operational dashboards; infrastructure and deployment.\n- Contact: laythayache5@gmail.com; ${BASE}/#contact\n\nPROJECTS\n${projectKnowledge}\n\nARTICLES\n${posts.map((post) => `- ${post.title}: ${BASE}/blog/${post.slug}`).join("\n")}\n`;

writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/feed.xml", feed);
writeFileSync("public/llms.txt", llms);
writeFileSync("functions/api/system-prompt.ts", `export const SYSTEM_PROMPT = ${JSON.stringify(prompt)};\n`);
console.log(`Generated professional SEO artifacts (projects: ${projects.length}, posts: ${posts.length})`);
