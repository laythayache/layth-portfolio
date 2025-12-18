# Layth Portfolio

Minimal, modern brand composition with responsive choreography built with Next.js and configured for Cloudflare Pages static deployment.

## Brand Colors

- **Primary (background)**: `#ede7dd`
- **Secondary (text)**: `#2b2e34`
- **Accent (emblem)**: `#6b7280`

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

- **Framework preset**: Next.js (or "None" if Next.js preset is not available)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node version**: 20 (if configurable in Cloudflare settings)

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

## Choreography

The brand composition features a phase-based animation system:

1. **Blank** (200ms): Initial hidden state
2. **Loading** (1100ms): Emblem spins continuously
3. **Expanding** (1400ms): Spin slows and emblem grows to final scale
4. **Reveal** (550ms): Text appears with staggered timing (LAYTH first, then AYACHE 140ms later)
5. **Idle**: Final static state

Hover over the emblem or click anywhere to restart the choreography.

