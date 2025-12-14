# Quick Setup Checklist

## Before First Deployment

1. **Update Contact Information**
   - Edit `content/profile.ts`
   - Update email, LinkedIn, and GitHub URLs
   - Verify all social links are correct

2. **Add Resume**
   - Replace `public/resume.pdf` with your actual resume
   - Ensure it's named exactly `resume.pdf`

3. **Create Open Graph Image**
   - Create a 1200x630px image
   - Save as `public/og.png`
   - This appears when sharing your site on social media

4. **Review Content**
   - Check all content in `content/` directory
   - Update projects, experience, and writing sections
   - Verify all links and descriptions

5. **Test Locally**
   ```bash
   npm install
   npm run dev
   ```
   - Visit http://localhost:3000
   - Test all sections and links
   - Verify dark mode toggle works
   - Check mobile responsiveness

6. **Build Test**
   ```bash
   npm run build
   ```
   - Ensure build completes without errors
   - Check `out/` directory is generated

## Deployment

Follow the deployment instructions in `README.md` for:
- Cloudflare Pages (recommended)
- GitHub Pages
- Vercel (alternative)

## Post-Deployment

1. Verify site loads correctly
2. Test all links and downloads
3. Check SEO metadata with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. Submit sitemap to Google Search Console
5. Test social media sharing (Open Graph tags)

## Custom Domain Setup

If using Cloudflare Pages:
1. Add custom domain in Cloudflare dashboard
2. Update DNS records as instructed
3. SSL will be provisioned automatically

If using GitHub Pages:
1. Add `CNAME` file in `public/` directory
2. Update DNS records to point to GitHub Pages
3. Wait for DNS propagation (can take up to 48 hours)

