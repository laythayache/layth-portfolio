#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Image optimization configurations
const images = [
  {
    input: 'portrait.png',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
      { format: 'avif', quality: 75, suffix: '.avif' },
    ],
    sizes: [480, 800, 1200],
  },
  {
    input: 'noor-el-hariri.jpeg',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
    ],
  },
  {
    input: 'tayseer-laz.jpeg',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
    ],
  },
  {
    input: 'abubaker.jpeg',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
    ],
  },
  {
    input: 'rami-kronbi.jpeg',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
    ],
  },
  {
    input: 'oussama-mustapha.jpeg',
    outputs: [
      { format: 'webp', quality: 80, suffix: '.webp' },
    ],
  },
];

async function optimizeImage(imagePath, outputConfigs, sizes = null) {
  const fullPath = path.join(publicDir, imagePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${imagePath}`);
    return;
  }

  console.log(`Processing: ${imagePath}`);

  for (const config of outputConfigs) {
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const outputPath = path.join(publicDir, `${baseName}${config.suffix}`);

    try {
      // Optimize main image
      await sharp(fullPath)
        [config.format]({ quality: config.quality })
        .toFile(outputPath);

      const inputSize = fs.statSync(fullPath).size / 1024;
      const outputSize = fs.statSync(outputPath).size / 1024;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(
        `✅ ${path.basename(outputPath)}: ${inputSize.toFixed(0)}KB → ${outputSize.toFixed(0)}KB (-${reduction}%)`
      );

      // Generate responsive variants if sizes provided
      if (sizes && baseName === 'portrait') {
        for (const size of sizes) {
          const responsivePath = path.join(
            publicDir,
            `${baseName}-${size}w${config.suffix}`
          );

          await sharp(fullPath)
            .resize(size, null, { withoutEnlargement: true })
            [config.format]({ quality: config.quality })
            .toFile(responsivePath);

          const responsiveSize = fs.statSync(responsivePath).size / 1024;
          console.log(`   └─ ${path.basename(responsivePath)}: ${responsiveSize.toFixed(0)}KB`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${imagePath}:`, error.message);
    }
  }
}

async function main() {
  console.log('🖼️  Optimizing images...\n');

  for (const image of images) {
    await optimizeImage(image.input, image.outputs, image.sizes);
  }

  console.log('\n✨ Image optimization complete!');
  console.log('\nNote: Update your HTML/components to use the new .webp and .avif files.');
}

main().catch(console.error);
