import sharp from "sharp";
import { readFileSync } from "node:fs";

const OUTPUT = "public/og-default.jpg";
const WIDTH = 1200;
const HEIGHT = 630;

const BG = "#E7E2DB";
const TEXT_PRIMARY = "#0A1326";
const TEXT_SECONDARY = "#1F334A";
const ACCENT = "#076C64";

const name = "Layth Ayache";
const title = "AI Systems &amp; Automation Engineer | Technical Consultant";

// Read the logo SVG and resize it
const logoSvg = readFileSync("public/logo-mark.svg", "utf8");

// Create the OG image using SVG overlay
const svgOverlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}" />

  <!-- Accent bar at top -->
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="${ACCENT}" />

  <!-- Name -->
  <text x="80" y="260" font-family="sans-serif" font-size="64" font-weight="700" fill="${TEXT_PRIMARY}">
    ${name}
  </text>

  <!-- Title -->
  <text x="80" y="330" font-family="sans-serif" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">
    ${title}
  </text>

  <!-- Accent line under title -->
  <rect x="80" y="355" width="120" height="3" rx="1.5" fill="${ACCENT}" />

  <!-- Domain -->
  <text x="80" y="540" font-family="monospace" font-size="22" fill="${TEXT_SECONDARY}" opacity="0.6">
    laythayache.com
  </text>
</svg>`;

await sharp(Buffer.from(svgOverlay))
  .jpeg({ quality: 90 })
  .toFile(OUTPUT);

console.log(`Generated OG image: ${OUTPUT} (${WIDTH}x${HEIGHT})`);
