# Deployment Guide - mmartinov.com

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Ensure Node.js 22.12+ and pnpm are installed
- [ ] Run `pnpm check` to verify formatting and types
- [ ] Run `pnpm dev` to test locally

### 2. Analytics Configuration
- [ ] Set up Plausible Analytics account at https://plausible.io
- [ ] Add mmartinov.com to your Plausible dashboard
- [ ] Verify analytics script is loading (check Network tab in browser DevTools)

### 3. Email Integration (Contact Form)
**✅ Resend is already integrated!**

The contact form uses Resend for email delivery. You just need to configure it:

**Quick Setup:**
1. Sign up at https://resend.com (free tier: 3,000 emails/month)
2. Get your API key from https://resend.com/api-keys
3. Add domain mmartinov.com and verify DNS records
4. Add `RESEND_API_KEY` to environment variables
5. Done!

**📖 Detailed Instructions:** See [RESEND_SETUP.md](./RESEND_SETUP.md) for complete setup guide

**Features Included:**
- ✅ Professional HTML email template
- ✅ Spam prevention (honeypot + timing validation)
- ✅ Reply-to sender's email for easy responses
- ✅ Error handling and fallback logging
- ✅ XSS protection and input sanitization

### 4. Content Review
- [ ] Verify all case study information is accurate
- [ ] Confirm client permissions for case studies mentioned
- [ ] Check all links (LinkedIn, GitHub, Camplight, Google Calendar)
- [ ] Review all text for typos and accuracy

### 5. Open Graph Image
- [ ] Create an Open Graph image (1200x630px)
- [ ] Save as `/public/og-image.png`
- [ ] Preview on https://www.opengraph.xyz/

## Deployment to Cloudflare Workers

The site is an Astro app using `@astrojs/cloudflare`. Pages are prerendered and served as static
assets. Only `/contact`, `/api/contact` and the Google verification file run in the Worker
(`mmartinov-com`, configured in `wrangler.jsonc`).

### Step 1: First deploy

```bash
pnpm wrangler login
pnpm deploy            # astro build && wrangler deploy
```

The site is now live at `https://mmartinov-com.<your-subdomain>.workers.dev`.

### Step 2: Secrets

Both are required. Without them, the contact page and API fail at runtime.

```bash
pnpm wrangler secret put RESEND_API_KEY
pnpm wrangler secret put ANTISPAM_SECRET_KEY
```

Re-use the current production `ANTISPAM_SECRET_KEY` value so tokens issued just before the cutover
still validate. A new value also works; it only invalidates contact forms that are open during the switch.

### Step 3: Automatic deploys from GitHub

In the Cloudflare dashboard: Workers & Pages → `mmartinov-com` → Settings → Builds → connect the
GitHub repository, branch `main`.

- Build command: `pnpm build`
- Deploy command: `pnpm wrangler deploy`

### Step 4: Verify on workers.dev before switching DNS

- All pages render; `/about` returns 200 (no redirect to `/about/`)
- `/nope` returns 404 with the custom page
- `/sitemap.xml` and `/robots.txt` load
- `/google92c10cd669f85c37.html` returns 200
- Submit the contact form once and confirm the email arrives

### Step 5: Custom domain cutover

1. The `mmartinov.com` zone must be on Cloudflare (add the site and switch nameservers at the registrar if it isn't).
2. Worker → Settings → Domains & Routes → add custom domains `mmartinov.com` and `www.mmartinov.com`.
   Cloudflare creates the DNS records and certificates.
3. Remove the old A/CNAME records that point at Deno Deploy.
4. Keep `analytics.mmartinov.com` and the Resend DNS records (`notifications.mmartinov.com`) unchanged.
5. Once traffic is confirmed on Cloudflare, delete the Deno Deploy project (Deno Deploy shuts down around April 2027).

## Post-Deployment

### Verify Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Work page case studies display properly
- [ ] About page renders correctly
- [ ] Contact form submits successfully
- [ ] Google Calendar link works
- [ ] Analytics are tracking (check Plausible dashboard)
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present (view source)
- [ ] Open Graph preview looks good (test on social media)

### Performance Check
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test page load speed on https://pagespeed.web.dev/
- [ ] Verify image optimization

### SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Add site to Bing Webmaster Tools
- [ ] Create Google My Business profile (optional)

## Monitoring

### Analytics
- Track page views, bounce rate, time on site via Plausible
- Monitor booking clicks and form submissions
- Review case study engagement

### Uptime Monitoring
Consider setting up:
- UptimeRobot (free tier available)
- Pingdom
- StatusCake

## Maintenance

### Content Updates
Content is stored in `/content` directory:
- `site.ts` - Global site config
- `home.ts` - Homepage content
- `work.ts` - Case studies
- `about.ts` - About page
- `contact.ts` - Contact page

Edit these files to update content without touching component code.

### Adding Case Studies
1. Edit `content/work.ts`
2. Add new case study to `caseStudies` array
3. Follow existing structure
4. Commit and push changes

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (22.12+)
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Run `pnpm check` for type errors

### Contact Form Not Working
- Check browser console for errors
- Verify API endpoint is accessible: `/api/contact`
- Check Worker logs: `pnpm wrangler tail`, or Observability in the Cloudflare dashboard
- Confirm both secrets are set: `pnpm wrangler secret list`

### Styles Not Loading
- Verify `src/styles/global.css` is imported in `src/layouts/BaseLayout.astro`
- Check `astro.config.ts` includes the Tailwind Vite plugin
- Clear browser cache

## Support
For issues or questions:
- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Create an issue in the repository
