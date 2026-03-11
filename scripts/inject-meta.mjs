/**
 * Post-build script: injects per-route <title>, <meta>, and JSON-LD into
 * static HTML files so that link unfurlers (Twitter, LinkedIn, Slack, Discord)
 * see correct metadata without executing JavaScript.
 *
 * Reads the built index.html as a template and writes route-specific copies.
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

const PROJECTS_SOURCE = "src/content/projects.ts";
const POSTS_DIR = "src/content/posts";

/* ── Parsers (duplicated from generate-seo-artifacts for independence) ── */

function parseProjects() {
  const source = readFileSync(PROJECTS_SOURCE, "utf8");
  const pattern =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g;
  return [...source.matchAll(pattern)].map((m) => ({
    slug: m[1],
    title: m[2],
    summary: m[3].replace(/\s+/g, " ").trim(),
  }));
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
      return { slug, title: get("title"), excerpt: get("excerpt") };
    })
    .filter(Boolean);
}

/* ── Route definitions ─────────────────────────────────────────────── */

function getRoutes() {
  const projects = parseProjects();
  const posts = parseBlogPosts();

  const routes = [
    {
      path: "/blog",
      title: "Writing and Insights | Layth Ayache",
      description:
        "Articles on systems engineering, workflow automation, and technical consulting.",
    },
  ];

  for (const project of projects) {
    routes.push({
      path: `/projects/${project.slug}`,
      title: `${project.title} | Layth Ayache`,
      description: project.summary,
    });
  }

  for (const post of posts) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Layth Ayache`,
      description: post.excerpt,
      ogType: "article",
    });
  }

  return routes;
}

/* ── HTML injection ────────────────────────────────────────────────── */

function injectMeta(template, route) {
  let html = template;

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
    `<meta property="og:url" content="${BASE_URL}${route.path}"`
  );

  // Replace og:type if article
  if (route.ogType) {
    html = html.replace(
      /<meta property="og:type" content="[^"]*"/,
      `<meta property="og:type" content="${route.ogType}"`
    );
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

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${BASE_URL}${route.path}"`
  );

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
  let count = 0;

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
