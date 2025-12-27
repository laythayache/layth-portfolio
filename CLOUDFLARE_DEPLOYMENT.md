# Cloudflare Pages Deployment Guide

This project is configured for static deployment on Cloudflare Pages.

## Build Configuration

- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Root Directory**: `./` (project root)

## Deployment Steps

1. **Connect Repository to Cloudflare Pages**
   - Go to Cloudflare Dashboard → Pages → Create a project
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `out`
     - Root directory: `./`

2. **Environment Variables** (if needed)
   - Add any required environment variables in Cloudflare Pages dashboard
   - Access via `process.env.*` in your code

3. **Deploy**
   - Cloudflare Pages will automatically build and deploy on push to your main branch
   - Preview deployments are created for pull requests

## Static Site Configuration

- ✅ All components are client-side only
- ✅ No Node.js runtime dependencies
- ✅ SPA routing handled via `_redirects` file
- ✅ Static assets in `public/` folder
- ✅ Build output is fully static

## File Structure

- `public/_redirects` - SPA routing rules for Cloudflare Pages
- `wrangler.toml` - Cloudflare Pages configuration (optional)
- `vite.config.ts` - Build configuration optimized for static output

## Verification

After deployment, verify:
- ✅ All routes work (/, /completed, /ongoing, /friends, /projects/:slug)
- ✅ Animations function correctly
- ✅ No console errors
- ✅ Assets load properly

