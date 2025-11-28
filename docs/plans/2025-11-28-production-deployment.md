# Production Deployment Plan

## Overview

Deploy Amaya's portfolio site to production using Netlify with a custom domain.

**Decisions:**
- **Hosting:** Netlify (free tier)
- **Domain:** Custom domain (already owned)
- **Contact Form:** Netlify Forms with email notifications
- **Analytics:** None needed

---

## Section 1: Hosting Setup

**Platform:** Netlify (free tier)

**Steps:**
1. Create a Netlify account at netlify.com
2. Connect your GitHub repo (or drag-drop deploy)
3. Netlify auto-detects the static site and builds it
4. Get a temporary URL (something.netlify.app) to verify it works

**Custom Domain:**
1. In Netlify dashboard, go to Domain Settings → Add custom domain
2. Add your domain name
3. Update your domain's DNS settings:
   - Option A: Point nameservers to Netlify (recommended, simplest)
   - Option B: Add A record and CNAME record to your current DNS provider
4. Netlify provisions a free SSL certificate automatically (HTTPS)

**Timeline:** About 30 minutes for setup, up to 48 hours for DNS propagation (usually much faster).

---

## Section 2: Contact Form Setup

**Using Netlify Forms (free, up to 100 submissions/month):**

1. Add `netlify` attribute to your form tag:
   ```html
   <form class="contact-form" netlify name="contact">
   ```

2. Add a hidden input for the form name:
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```

3. Configure email notifications in Netlify dashboard:
   - Go to Forms → Form notifications
   - Add email notification → Enter your email address
   - You'll receive an email each time someone submits the form

**Spam Protection:** Netlify includes automatic spam filtering. Optionally add a honeypot field for extra protection:
```html
<input type="hidden" name="bot-field">
```

---

## Section 3: Content & Images

**Image Preparation:**

1. Create `assets/images/` folder structure:
   - `hero/` - main hero image (recommend 1920x1080 or larger)
   - `about/` - profile/action shots for about section
   - `gallery/` - action photos (recommend 800x600 minimum)
   - `highlights/` - video thumbnails

2. Optimize images before adding:
   - Use WebP format for best compression (JPG fallback for older browsers)
   - Compress with tools like Squoosh.app or TinyPNG
   - Keep file sizes under 200KB each when possible

3. Replace placeholder `<div>` elements with `<img>` tags:
   ```html
   <img src="assets/images/hero/main.webp" alt="Amaya Vargas in action" loading="lazy">
   ```

**Video Highlights:**
- Host on YouTube/Vimeo (free, handles streaming)
- Embed using iframe in the highlights section
- Don't self-host video files (too large, poor performance)

**Launch with what you have** - you can update images anytime by pushing to GitHub; Netlify auto-deploys changes.

---

## Section 4: Pre-Launch Checklist & Deployment

**Before Launch:**
- [ ] Run `npm run build` to compile production CSS
- [ ] Test all links work correctly
- [ ] Test contact form submission
- [ ] Check mobile responsiveness (test on real phone if possible)
- [ ] Verify all placeholder content is replaced or acceptable
- [ ] Update copyright year in footer if needed
- [ ] Add favicon if not already present

**Deployment Steps:**
1. Push final code to GitHub
2. Log into Netlify → "Add new site" → "Import an existing project"
3. Select your GitHub repo
4. Build settings: leave defaults (Netlify detects static site)
5. Click Deploy
6. Once live, add custom domain in Domain Settings
7. Set up form email notifications
8. Test everything on the live URL

**Ongoing Updates:**
- Push to GitHub → Netlify auto-deploys within ~1 minute
- No manual deployment needed after initial setup
