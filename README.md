# Layth Ayache Portfolio

A modern, production-ready portfolio website built with Next.js, TypeScript, and Tailwind CSS. Optimized for fast loading, SEO, and accessibility.

---

**Reality Resilience — Baseline Locked.**
Descent Interface will be layered on top.
Existing system pages are immutable.

---

## Features

- 🚀 **Static Site Generation** - Fast, SEO-friendly static export
- 🌓 **Dark Mode** - Automatic theme switching with manual toggle
- 📱 **Fully Responsive** - Works beautifully on all devices
- ♿ **Accessible** - WCAG-friendly design and semantic HTML
- 🔍 **SEO Optimized** - Structured data, sitemap, and Open Graph tags
- 📝 **Content-Driven** - Easy to update via content files
- 🎨 **Modern UI** - Clean, minimal, and professional design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Static export (compatible with Cloudflare Pages, GitHub Pages, etc.)

## Local Development

### Prerequisites

- **Node.js 20.9+** (required for Next.js 16)
- npm or yarn

> **Note**: If you're using an older Node.js version, you can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple Node versions:
> ```bash
> nvm install 20
> nvm use 20
> ```

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This will create a static export in the `out/` directory, ready for deployment.

## Deployment

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages offers free hosting with a global CDN, easy custom domain setup, and automatic HTTPS.

#### Steps:

1. **Push your code to GitHub** (if not already):
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Root directory**: `/` (leave as default)

3. **Custom Domain Setup**:
   - In your Cloudflare Pages project, go to **Custom domains**
   - Add `laythayache.com` and `www.laythayache.com`
   - Cloudflare will automatically provision SSL certificates
   - Update your domain's DNS records as instructed by Cloudflare

4. **Environment Variables** (if needed):
   - Add any environment variables in the Cloudflare Pages dashboard
   - For this portfolio, no environment variables are required

### Option 2: GitHub Pages

GitHub Pages is free and easy to use, but requires a few additional steps.

#### Steps:

1. **Install GitHub Pages plugin** (optional, for easier deployment):
```bash
npm install --save-dev gh-pages
```

2. **Update package.json** scripts:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to **Pages**
   - Select source: **GitHub Actions** (recommended) or **Deploy from a branch**
   - If using branch deployment, select `gh-pages` branch and `/root` folder

4. **For custom domain**:
   - Add a `CNAME` file in the `public/` directory with your domain:
     ```
     laythayache.com
     ```
   - Update your domain's DNS to point to GitHub Pages (instructions in GitHub Pages settings)

### Option 3: Vercel (Alternative)

Vercel offers excellent Next.js integration:

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

## Customization

### Updating Content

All content is stored in the `content/` directory:

- **`content/profile.ts`** - Personal information, social links, highlights
- **`content/projects.ts`** - Project listings
- **`content/experience.ts`** - Work experience and leadership
- **`content/writing.ts`** - Publications and writing samples

Simply edit these files to update your portfolio content.

### Adding a Resume

1. Place your resume PDF in the `public/` directory as `resume.pdf`
2. The download link will automatically work

### Adding an Open Graph Image

1. Create a 1200x630px image
2. Save it as `public/og.png`
3. This image will be used for social media sharing

### Styling

The site uses Tailwind CSS. Customize colors, fonts, and spacing in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and CSS variables

## Project Structure

```
layth-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── ThemeProvider.tsx # Dark mode provider
│   └── ...
├── content/              # Content data files
│   ├── profile.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── writing.ts
├── public/               # Static assets
│   ├── resume.pdf        # Resume (replace with actual)
│   └── og.png            # Open Graph image (replace)
└── out/                  # Build output (generated)
```

## SEO Features

- ✅ Structured data (JSON-LD) for Person and Website
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Sitemap.xml generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML throughout
- ✅ Accessible ARIA labels

## Performance

- Static site generation for fast loading
- Optimized images (when using Next.js Image component)
- Minimal JavaScript bundle
- CSS purging with Tailwind

## Tuning Guide

### Camera Timings

Located in `/app/(landing)/_3d/useDescentState.ts`:

- **COMMIT_DURATION**: `200ms` - Transition from hover to dive start
- **DIVE_DURATION**: `1200ms` - Camera movement toward orb
- **HOLD_FOV_SETTLE**: `300ms` - FOV adjustment after dive completes

Camera FOV range:
- **Idle/Hover**: `40` degrees
- **Dive**: Ramps from `40` → `70` degrees
- **Hold**: Settles from `70` → `50` degrees

### Rupture Constants

Located in `/app/(landing)/_3d/RuptureOverlay.tsx`:

- **EDGE_SHARPNESS**: `8.0` - Jagged tear edge intensity
- **DISTORT_STRENGTH**: `0.15` - Radial distortion amount
- **GRAIN_AMOUNT**: `0.08` - Base grain intensity (multiplied by quality profile)
- **CHROMA_AMOUNT**: `0.02` - Chromatic aberration intensity (multiplied by quality profile)
- **VIGNETTE_AMOUNT**: `1.2` - Vignette darkness (multiplied by quality profile)

Rupture progress mapping:
- Starts at `70%` of dive progress
- Maps to `0..1` over final `30%` of dive
- Decays quickly during hold phase

### Quality Profiles

Located in `/app/(landing)/_3d/quality.ts`:

**"full" profile:**
- Canvas DPR: Up to `2.0` (device pixel ratio)
- Antialiasing: Enabled
- Rupture effects: Full intensity (grain: 0.08, chroma: 0.02, vignette: 1.2)

**"safe" profile:**
- Canvas DPR: Clamped to `1.0`
- Antialiasing: Disabled
- Rupture effects: Reduced to `30%` intensity (grain: 0.024, chroma: 0.006, vignette: 0.36)

Quality detection triggers "safe" mode if ANY of:
- `prefers-reduced-motion: reduce` media query matches
- Device memory < 4GB (if available)
- Hardware concurrency < 4 cores

Quality profile is determined once per session and cached.

## Test Checklist

### Reduced Motion Gate

- [ ] Visit `/` with `prefers-reduced-motion: reduce` enabled → Shows DOM-only fallback
- [ ] Toggle "Reduced Motion" button → Writes to localStorage and reloads
- [ ] After reload with reduced motion OFF → Shows 3D landing
- [ ] Reduced motion cards show dual-name (PrimaryName + Subtitle + Classification)

### Keyboard Navigation

- [ ] Tab cycles through pillars in order: Perception → Execution → Representation → Coordination → Failure
- [ ] Enter commits to focused pillar (triggers commit → dive → navigation)
- [ ] Esc returns to idle (only when phase is idle or hover)
- [ ] Focused pillar shows label with 250ms delay (matches hover discipline)
- [ ] Screen reader announces: "PrimaryName, Subtitle. Axiom" on hover/focus

### Touch Double-Tap Commit

- [ ] First tap on orb → Shows label, camera leans (hover behavior)
- [ ] Second tap on same orb within 2 seconds → Commits and triggers dive
- [ ] Tap different orb → Resets first-tap target
- [ ] Tap after 2+ seconds → Treated as new first tap
- [ ] No accidental commits during scroll (canvas is fullscreen, but guard prevents commits)

### Static Export Build

- [ ] Run `npm run build` → Completes without errors
- [ ] Check `out/` directory → Contains all static files
- [ ] Verify routes: `/`, `/system/perception`, `/system/execution`, `/system/representation`, `/system/coordination`, `/system/failure`
- [ ] All routes are pre-generated (no runtime data fetching)

### 3D Landing Behavior

- [ ] Mouse hover on orb → Label appears, camera leans after 250ms
- [ ] Click orb → Commit → Dive → Rupture overlay at 70% progress → Navigation at 85% progress
- [ ] During dive/hold → Other orbs disabled, selected orb remains dominant
- [ ] Rupture overlay appears and covers screen during navigation transition
- [ ] SessionStorage `rr_arrival` written before navigation

### Arrival System

- [ ] Navigation from `/` → Destination page reads `rr_arrival` from sessionStorage
- [ ] Arrival animation plays (pillar-specific style: scan/impact/reassembly/handshake/sink)
- [ ] Content fades in after 30% of arrival progress
- [ ] HUD text transitions at 60% progress
- [ ] Persistent HUD shows: PrimaryName, Subtitle, Axiom, Status word
- [ ] Status words: CALIBRATED (Perception), ARMED (Execution), COHERENT (Representation), SYNCED (Coordination), ACCEPTED (Failure)
- [ ] Direct visit (no sessionStorage) → Content shows immediately, no arrival animation

### Visual Authority

- [ ] Label overlay shows: PrimaryName (colored, larger) + Subtitle (gray, smaller) + Classification (idle/hover only) + Axiom
- [ ] Classification line: "CLASS: SYSTEM PILLAR" (only visible during idle/hover)
- [ ] During commit/dive/hold: Classification removed, spacing compressed, contrast increased
- [ ] Typography consistent across: landing overlay, reduced motion cards, arrival HUD
- [ ] All labels use monospace font, uppercase, strict letter spacing

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues or questions, please open an issue on GitHub or contact [layth@laythayache.com](mailto:layth@laythayache.com).

---

Built with ❤️ by Layth Ayache

