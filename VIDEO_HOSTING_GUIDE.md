# Free Video Hosting Guide for Omnisign Hero Video

The video file (37MB) exceeds Cloudflare Pages' 25MB limit, so it needs to be hosted externally. Here are free options:

## Option 1: Cloudflare R2 (Recommended - Free Tier)

**Why R2?** You're already using Cloudflare Pages, so R2 integrates seamlessly.

### Steps:

1. **Create a Cloudflare R2 Bucket:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **R2** in the sidebar
   - Click **Create bucket**
   - Name it something like `portfolio-assets` or `omnisign-videos`
   - Choose a location (closest to your users)

2. **Upload the Video:**
   - Click on your bucket
   - Click **Upload**
   - Upload `omnisign-hero.mp4` (the file in your project root)
   - Wait for upload to complete

3. **Make it Public:**
   - Click on the uploaded video file
   - Click **Make public** or set a **Public URL**
   - Copy the public URL (looks like: `https://pub-xxxxx.r2.dev/omnisign-hero.mp4`)

4. **Set Environment Variable in Cloudflare Pages:**
   - Go to your Cloudflare Pages project
   - Navigate to **Settings** → **Environment variables**
   - Add a new variable:
     - **Variable name:** `VITE_OMNISIGN_VIDEO_URL`
     - **Value:** The R2 public URL you copied
   - Save and redeploy

**Free Tier Limits:**
- 10 GB storage
- 1 million Class A operations/month
- 10 million Class B operations/month
- Perfect for a single video!

---

## Option 2: YouTube (Free, but requires embedding)

### Steps:

1. **Upload to YouTube:**
   - Go to [YouTube Studio](https://studio.youtube.com/)
   - Click **Create** → **Upload video**
   - Upload `omnisign-hero.mp4`
   - Set it to **Unlisted** (so it's not searchable but accessible via link)
   - Wait for processing

2. **Get the Video ID:**
   - After upload, the URL will be like: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Copy the `VIDEO_ID` part

3. **Update HeroSection Component:**
   - Instead of using `<video>` tag, use YouTube embed
   - Or use the direct video URL (requires some YouTube URL manipulation)

**Note:** YouTube embedding is free but adds YouTube branding. For a cleaner experience, use R2.

---

## Option 3: Vimeo (Free Tier)

### Steps:

1. **Create Vimeo Account:**
   - Sign up at [vimeo.com](https://vimeo.com) (free tier available)

2. **Upload Video:**
   - Click **Upload** → **Select files**
   - Upload `omnisign-hero.mp4`
   - Set privacy to **Unlisted** or **Anyone with link**

3. **Get Embed Code or Direct URL:**
   - Go to video settings
   - Copy the embed URL or direct video URL
   - Use in environment variable

**Free Tier Limits:**
- 500MB per week upload limit
- Your video is 37MB, so it fits!

---

## Option 4: GitHub Releases (Free, but not ideal)

### Steps:

1. **Create a Release:**
   - Go to your GitHub repository
   - Click **Releases** → **Create a new release**
   - Tag it (e.g., `v1.0.0`)
   - Upload `omnisign-hero.mp4` as a release asset

2. **Get Direct URL:**
   - After release, right-click the video file → **Copy link address**
   - URL format: `https://github.com/USERNAME/REPO/releases/download/TAG/omnisign-hero.mp4`

3. **Use in Environment Variable:**
   - Set `VITE_OMNISIGN_VIDEO_URL` to the GitHub release URL

**Note:** GitHub isn't optimized for video streaming, so loading may be slower.

---

## Option 5: Cloudflare Stream (Free Tier)

### Steps:

1. **Enable Cloudflare Stream:**
   - Go to Cloudflare Dashboard
   - Navigate to **Stream**
   - Enable the service

2. **Upload Video:**
   - Click **Upload video**
   - Upload `omnisign-hero.mp4`
   - Wait for processing

3. **Get Video URL:**
   - Copy the video URL or embed code
   - Use in environment variable

**Free Tier Limits:**
- 100 minutes of video storage
- Your video should fit if it's under 100 minutes

---

## Recommended: Cloudflare R2

**Why R2 is best:**
- ✅ Free tier is generous (10GB)
- ✅ Fast CDN delivery
- ✅ No branding
- ✅ Direct video URL (works with `<video>` tag)
- ✅ Integrates with your existing Cloudflare setup
- ✅ Easy to set up

### Quick R2 Setup Command (if you have Wrangler CLI):

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create bucket
wrangler r2 bucket create portfolio-assets

# Upload video
wrangler r2 object put portfolio-assets/omnisign-hero.mp4 --file=./omnisign-hero.mp4

# Make it public (requires R2 public access setup)
# Then get the public URL from Cloudflare dashboard
```

---

## After Hosting: Set Environment Variable

Once you have the video URL, set it in Cloudflare Pages:

1. Go to **Cloudflare Dashboard** → **Pages** → Your project
2. **Settings** → **Environment variables**
3. Add:
   - **Variable name:** `VITE_OMNISIGN_VIDEO_URL`
   - **Value:** Your video URL (e.g., `https://pub-xxxxx.r2.dev/omnisign-hero.mp4`)
4. **Save** and **Redeploy**

The video will now appear on your Omnisign microsite!

---

## For Local Development

Create a `.env.local` file in your project root:

```env
VITE_OMNISIGN_VIDEO_URL=/omnisign-hero.mp4
```

Then temporarily copy the video back to `public/` folder for local testing:

```bash
cp omnisign-hero.mp4 public/omnisign-hero.mp4
```

Remember to remove it from `public/` before committing!

