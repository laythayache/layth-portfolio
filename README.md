# Layth Portfolio

This is a minimal Next.js App Router project configured for Cloudflare Pages static export.

## Tech Stack

- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Mode:** Static Export

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Cloudflare Pages Deployment

This project is configured for static export and can be deployed to Cloudflare Pages.

### Cloudflare Pages Settings

Configure your Cloudflare Pages project with these exact settings:

- **Framework preset:** Next.js (or "None" if Next.js preset is not available)
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 20 (if configurable in Cloudflare settings)

### Important Notes

- This is a **static export** build (`output: 'export'` in `next.config.js`)
- Server-side rendering (SSR) features are **not used** and will not work
- Images are unoptimized for static export compatibility
- The build output is in the `out/` directory, which Cloudflare Pages will serve as static assets

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. In Cloudflare Pages, connect your repository
3. Configure the build settings as specified above
4. Deploy

The site will be available at your Cloudflare Pages URL after deployment.
