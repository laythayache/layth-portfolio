const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo-mark.svg');
const publicDir = path.join(__dirname, '../public');

// Read the SVG
const svgBuffer = fs.readFileSync(svgPath);

async function generateFavicons() {
  try {
    // Generate 16x16 PNG with padding (logo will be ~10x10 centered in 16x16)
    await sharp(svgBuffer)
      .resize(10, 10, {
        fit: 'contain',
        background: { r: 237, g: 231, b: 221, alpha: 1 } // #ede7dd background
      })
      .extend({
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
        background: { r: 237, g: 231, b: 221, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // Generate 32x32 PNG with padding (logo will be ~20x20 centered in 32x32)
    await sharp(svgBuffer)
      .resize(20, 20, {
        fit: 'contain',
        background: { r: 237, g: 231, b: 221, alpha: 1 } // #ede7dd background
      })
      .extend({
        top: 6,
        bottom: 6,
        left: 6,
        right: 6,
        background: { r: 237, g: 231, b: 221, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // Create ICO file - use 32x32 version
    // Note: Sharp creates PNG-based ICO which modern browsers accept
    const ico32 = await sharp(svgBuffer)
      .resize(20, 20, {
        fit: 'contain',
        background: { r: 237, g: 231, b: 221, alpha: 1 }
      })
      .extend({
        top: 6,
        bottom: 6,
        left: 6,
        right: 6,
        background: { r: 237, g: 231, b: 221, alpha: 1 }
      })
      .png()
      .toBuffer();

    // Save as favicon.ico (modern browsers accept PNG-based ICO)
    await sharp(ico32)
      .toFile(path.join(publicDir, 'favicon.ico'));

    console.log('✓ Generated favicon-16x16.png');
    console.log('✓ Generated favicon-32x32.png');
    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

