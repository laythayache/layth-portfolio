export const dynamic = "force-static";

import { MetadataRoute } from 'next'

export function GET(): Response {
  const baseUrl = 'https://laythayache.com';
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((entry) => {
    const lastMod = entry.lastModified 
      ? (typeof entry.lastModified === 'string' ? entry.lastModified : entry.lastModified.toISOString())
      : new Date().toISOString();
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

