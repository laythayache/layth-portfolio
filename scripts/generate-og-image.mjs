import sharp from "sharp";

const OUTPUT = "public/images/brand/og-default.jpg";
const WIDTH = 1200;
const HEIGHT = 630;

const BG = "#151618";
const TEXT_PRIMARY = "#eeece5";
const TEXT_SECONDARY = "#bec1c6";
const ACCENT = "#6e91ff";

const name = "Layth Ayache";
const title = "AI Systems Engineer";

// Read the logo SVG and resize it


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
