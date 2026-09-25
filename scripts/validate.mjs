import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = 'out';
const origin = 'https://laythayache.com';
const expectedFiles = [
  '404.html',
  '_headers',
  '_redirects',
  'feed.xml',
  'favicon.svg',
  'llms.txt',
  'profile.json',
  'robots.txt',
  'sitemap.xml',
  'styles.css',
];

function fail(message) {
  throw new Error(message);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll('\\', '/');
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
}

function getMeta(html, attribute, value) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const tag = tags.find((candidate) => getAttribute(candidate, attribute)?.toLowerCase() === value.toLowerCase());
  return tag ? getAttribute(tag, 'content') : undefined;
}

function getLink(html, rel, type) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const tag = tags.find((candidate) => {
    const relValues = (getAttribute(candidate, 'rel') ?? '').toLowerCase().split(/\s+/);
    return relValues.includes(rel.toLowerCase()) && (!type || getAttribute(candidate, 'type') === type);
  });
  return tag ? getAttribute(tag, 'href') : undefined;
}

function routeForHtml(filePath) {
  const file = relative(filePath);
  if (file === 'index.html') return '/';
  if (!file.endsWith('/index.html')) fail(`${file}: indexable HTML must use a directory index`);
  return `/${file.slice(0, -'index.html'.length)}`;
}

function fileForPathname(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }

  const clean = decoded.replace(/^\/+/, '');
  const candidates = [];
  if (!clean) {
    candidates.push(path.join(root, 'index.html'));
  } else if (clean.endsWith('/')) {
    candidates.push(path.join(root, clean, 'index.html'));
  } else {
    candidates.push(path.join(root, clean));
    candidates.push(path.join(root, clean, 'index.html'));
  }
  return candidates.find((candidate) => fs.existsSync(candidate));
}

for (const expectedFile of expectedFiles) {
  const filePath = path.join(root, expectedFile);
  if (!fs.existsSync(filePath)) fail(`Missing build output: ${filePath}`);
}

const stylesheet = fs.readFileSync(path.join(root, 'styles.css'));
const stylesheetVersion = crypto.createHash('sha256').update(stylesheet).digest('hex').slice(0, 12);
const expectedStylesheetHref = `/styles.css?v=${stylesheetVersion}`;
const propertyImageRule = stylesheet.toString('utf8').match(/\.property-grid img\s*\{([^}]*)\}/)?.[1] ?? '';
if (!/\bheight:\s*auto\s*;/i.test(propertyImageRule)) {
  fail('styles.css: property gallery images must override their intrinsic height with height: auto');
}

const allFiles = walk(root);
const htmlFiles = allFiles.filter((filePath) => filePath.endsWith('.html'));
const notFoundFile = path.join(root, '404.html');
const indexableHtmlFiles = htmlFiles.filter((filePath) => path.normalize(filePath) !== path.normalize(notFoundFile));
const titles = new Map();
const descriptions = new Map();
const canonicalToFile = new Map();
let schemaCount = 0;

for (const htmlFile of htmlFiles) {
  const file = relative(htmlFile);
  const html = fs.readFileSync(htmlFile, 'utf8');
  const isNotFound = path.normalize(htmlFile) === path.normalize(notFoundFile);

  if (!/^<!doctype html>/i.test(html)) fail(`${file}: missing HTML doctype`);
  if (!/<html\b[^>]*\blang="en"/i.test(html)) fail(`${file}: missing English language declaration`);
  if (!getMeta(html, 'name', 'viewport')) fail(`${file}: missing viewport metadata`);
  if (!getMeta(html, 'name', 'description')) fail(`${file}: missing meta description`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) fail(`${file}: expected exactly one h1`);
  if (getLink(html, 'stylesheet') !== expectedStylesheetHref) {
    fail(`${file}: stylesheet must use the current content version ${expectedStylesheetHref}`);
  }

  for (const timeTag of html.matchAll(/<time\b[^>]*>/gi)) {
    if (!getAttribute(timeTag[0], 'datetime')) fail(`${file}: every time element needs a machine-readable datetime`);
  }

  for (const divTag of html.matchAll(/<div\b[^>]*\baria-label="[^"]+"[^>]*>/gi)) {
    if (!getAttribute(divTag[0], 'role')) fail(`${file}: a labeled div needs an explicit semantic role`);
  }

  for (const imageTag of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = imageTag[0];
    if (getAttribute(tag, 'alt') === undefined) fail(`${file}: image is missing alt text`);
    if (!getAttribute(tag, 'width') || !getAttribute(tag, 'height')) fail(`${file}: image is missing intrinsic dimensions`);
  }

  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    JSON.parse(match[1]);
    schemaCount += 1;
  }

  if (isNotFound) {
    const robots = getMeta(html, 'name', 'robots') ?? '';
    if (!robots.toLowerCase().split(/\s*,\s*/).includes('noindex')) fail('404.html: missing noindex directive');
    if (getLink(html, 'canonical')) fail('404.html: must not declare a canonical URL');
  } else {
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
    const description = getMeta(html, 'name', 'description');
    const canonical = getLink(html, 'canonical');
    const expectedCanonical = `${origin}${routeForHtml(htmlFile)}`;

    if (!title) fail(`${file}: missing title`);
    if (titles.has(title)) fail(`${file}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, file);
    if (descriptions.has(description)) fail(`${file}: duplicate description also used by ${descriptions.get(description)}`);
    descriptions.set(description, file);
    if (canonical !== expectedCanonical) fail(`${file}: canonical must be ${expectedCanonical}, received ${canonical ?? 'none'}`);
    if (canonicalToFile.has(canonical)) fail(`${file}: duplicate canonical also used by ${canonicalToFile.get(canonical)}`);
    canonicalToFile.set(canonical, file);
    if (getMeta(html, 'property', 'og:url') !== canonical) fail(`${file}: og:url must match the canonical URL`);
    if (!getMeta(html, 'property', 'og:title')) fail(`${file}: missing og:title`);
    if (!getMeta(html, 'property', 'og:description')) fail(`${file}: missing og:description`);
    if (!getMeta(html, 'property', 'og:type')) fail(`${file}: missing og:type`);
    if (!getLink(html, 'author')) fail(`${file}: missing author link`);
    if (!(html.match(/type="application\/ld\+json"/gi) ?? []).length) fail(`${file}: missing JSON-LD`);
    if (/name="robots"[^>]*content="[^"]*noindex/i.test(html)) fail(`${file}: indexable page contains noindex`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:mailto:|tel:|data:|javascript:)/i.test(value)) continue;

    let url;
    try {
      url = new URL(value, `${origin}${isNotFound ? '/' : routeForHtml(htmlFile)}`);
    } catch {
      fail(`${file}: invalid URL ${value}`);
    }
    if (url.origin !== origin) continue;

    const targetPath = fileForPathname(url.pathname);
    if (!targetPath) fail(`${file}: ${value} does not resolve to a build output`);
    if (url.hash && targetPath.endsWith('.html')) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      const targetHtml = fs.readFileSync(targetPath, 'utf8');
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\bid="${escaped}"`, 'i').test(targetHtml)) fail(`${file}: ${value} points to a missing fragment`);
    }
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = new Set(sitemapUrls);
if (uniqueSitemapUrls.size !== sitemapUrls.length) fail('sitemap.xml: duplicate URL');
for (const canonical of canonicalToFile.keys()) {
  if (!uniqueSitemapUrls.has(canonical)) fail(`sitemap.xml: missing ${canonical}`);
}
for (const url of uniqueSitemapUrls) {
  if (!canonicalToFile.has(url)) fail(`sitemap.xml: ${url} is not an indexable canonical page`);
}
for (const match of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  const date = new Date(`${match[1]}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) fail(`sitemap.xml: invalid lastmod ${match[1]}`);
  if (date > new Date()) fail(`sitemap.xml: future lastmod ${match[1]}`);
}

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!/^User-agent:\s*\*/im.test(robots) || !/^Allow:\s*\/$/im.test(robots)) fail('robots.txt: expected public crawl policy');
if (!/^Sitemap:\s*https:\/\/laythayache\.com\/sitemap\.xml$/im.test(robots)) fail('robots.txt: missing canonical sitemap declaration');

const profile = JSON.parse(fs.readFileSync(path.join(root, 'profile.json'), 'utf8'));
if ('$schema' in profile) fail('profile.json: instance data must not claim to be a JSON Schema');
if (profile.name !== 'Layth Ayache' || profile.canonical !== `${origin}/`) fail('profile.json: canonical identity fields are invalid');

const feed = fs.readFileSync(path.join(root, 'feed.xml'), 'utf8');
if (!feed.includes(`<atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />`)) fail('feed.xml: missing canonical self link');
const feedItems = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
if (feedItems.length !== 4) fail(`feed.xml: expected 4 items, received ${feedItems.length}`);
let previousPublication = Infinity;
for (const item of feedItems) {
  const link = item.match(/<link>([^<]+)<\/link>/)?.[1];
  const guid = item.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1];
  const publication = Date.parse(item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1] ?? '');
  if (!link || link !== guid || !canonicalToFile.has(link)) fail(`feed.xml: invalid item URL ${link ?? 'none'}`);
  if (Number.isNaN(publication) || publication > previousPublication) fail('feed.xml: items must be reverse chronological');
  previousPublication = publication;
}

const redirects = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
const redirectLines = redirects.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
const redirectSources = new Set();
for (const line of redirectLines) {
  const [source, destination, status] = line.split(/\s+/);
  if (!source || !destination || status !== '301') fail(`_redirects: malformed permanent redirect ${line}`);
  if (redirectSources.has(source)) fail(`_redirects: duplicate source ${source}`);
  redirectSources.add(source);
  if (destination.startsWith('/')) {
    const destinationUrl = new URL(destination, origin);
    if (!fileForPathname(destinationUrl.pathname)) fail(`_redirects: ${destination} does not resolve to build output`);
  }
}
for (const requiredRedirect of ['/projects/lancaster-websites', '/blog/real-time-privacy-pipeline-on-raspberry-pi']) {
  if (!redirectSources.has(requiredRedirect)) fail(`_redirects: missing legacy route ${requiredRedirect}`);
}

console.log(
  `Validation passed: ${indexableHtmlFiles.length} canonical pages, one noindex 404, ${schemaCount} JSON-LD blocks, ${sitemapUrls.length} sitemap URLs, ${feedItems.length} feed items, and internal links/assets/fragments.`,
);
