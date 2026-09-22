import fs from 'node:fs';
import path from 'node:path';

const root = 'out';
const expectedFiles = [
  'index.html',
  'about/index.html',
  'projects/hader/index.html',
  'projects/alinia/index.html',
  'projects/lancaster/index.html',
  'projects/bridge/index.html',
  'projects/omnisign/index.html',
  'projects/privacy-guard/index.html',
  'writing/index.html',
  'writing/whatsapp-coexistence/index.html',
  'writing/designing-ai-for-unstable-networks/index.html',
  'llms.txt',
  'profile.json',
  'sitemap.xml',
  '_redirects',
];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

for (const expectedFile of expectedFiles) {
  const filePath = path.join(root, expectedFile);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing build output: ${filePath}`);
  }
}

const htmlFiles = walk(root).filter((filePath) => filePath.endsWith('.html'));
let schemaCount = 0;

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');

  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    JSON.parse(match[1]);
    schemaCount += 1;
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
    let urlPath = match[1].split(/[?#]/)[0];
    if (!urlPath || urlPath === '/') {
      urlPath = '/index.html';
    } else if (urlPath.endsWith('/')) {
      urlPath += 'index.html';
    }

    const targetPath = path.join(root, ...urlPath.split('/').filter(Boolean));
    if (!fs.existsSync(targetPath)) {
      throw new Error(`${htmlFile}: ${match[1]} does not resolve to a build output`);
    }
  }
}

JSON.parse(fs.readFileSync(path.join(root, 'profile.json'), 'utf8'));

console.log(
  `Validation passed: ${htmlFiles.length} HTML files, ${schemaCount} JSON-LD blocks, internal links/assets, and profile.json.`,
);
