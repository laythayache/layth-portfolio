export const dynamic = "force-static";

export function GET(): Response {
  const content = `User-agent: *
Allow: /
Sitemap: https://laythayache.com/sitemap.xml`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

