# Deployment Guide - mmartinov.com

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Ensure Deno 2.5+ is installed
- [ ] Run `deno task check` to verify code quality
- [ ] Run `deno task dev` to test locally

### 2. Analytics Configuration
- [ ] Set up Plausible Analytics account at https://plausible.io
- [ ] Add mmartinov.com to your Plausible dashboard
- [ ] Verify analytics script is loading (check Network tab in browser DevTools)

### 3. Email Integration (Contact Form)
The contact form currently logs submissions to console. To enable email notifications:

**Option A: Using Resend (Recommended)**
1. Sign up at https://resend.com
2. Install Resend: `deno add npm:resend`
3. Add RESEND_API_KEY to environment variables
4. Update `routes/api/contact.ts` to use Resend (see TODO comments in file)

**Option B: Using SendGrid**
1. Sign up at https://sendgrid.com
2. Install SendGrid SDK
3. Add SENDGRID_API_KEY to environment variables
4. Update `routes/api/contact.ts` accordingly

**Option C: Using Form Service**
- Consider using services like Formspree, Netlify Forms, or similar
- Update the contact form to POST to their endpoint

### 4. Content Review
- [ ] Verify all case study information is accurate
- [ ] Confirm client permissions for case studies mentioned
- [ ] Check all links (LinkedIn, GitHub, Camplight, Google Calendar)
- [ ] Review all text for typos and accuracy

### 5. Open Graph Image
- [ ] Create an Open Graph image (1200x630px)
- [ ] Save as `/static/og-image.png`
- [ ] Preview on https://www.opengraph.xyz/

## Deployment to Deno Deploy

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Deno Deploy
1. Go to https://dash.deno.com
2. Click "New Project"
3. Connect your GitHub repository
4. Select the branch to deploy (main)
5. Deno Deploy will auto-detect Fresh 2 configuration

### Step 3: Environment Variables
Add these in Deno Deploy dashboard:
- `RESEND_API_KEY` - Your Resend API key (if using Resend)

### Step 4: Custom Domain
1. In Deno Deploy project settings, go to "Domains"
2. Add custom domain: mmartinov.com
3. Update DNS records:
   - Add CNAME record: `www` → `your-project.deno.dev`
   - Add A record: `@` → Deno Deploy IP (provided in dashboard)
   - Or use ALIAS record if your DNS provider supports it

### Step 5: SSL Certificate
- Deno Deploy automatically provisions SSL certificates
- Wait 2-5 minutes for certificate to be active
- Verify HTTPS is working

## Alternative Deployment Options

### Cloudflare Pages
```bash
deno task build
# Deploy _fresh directory to Cloudflare Pages
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Self-Hosted (VPS)
```bash
# Build the project
deno task build

# Run in production
deno task start

# Or use PM2 for process management
pm2 start "deno task start" --name mmartinov-com
```

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
- Check Deno version: `deno --version`
- Clear lock file: `rm deno.lock`
- Reinstall dependencies: `deno cache --reload main.ts`

### Contact Form Not Working
- Check browser console for errors
- Verify API endpoint is accessible: `/api/contact`
- Check server logs for POST request errors

### Styles Not Loading
- Verify `assets/styles.css` is being imported in `client.ts`
- Check Vite config includes Tailwind plugin
- Clear browser cache

## Support
For issues or questions:
- Check Fresh docs: https://fresh.deno.dev
- Deno Deploy docs: https://docs.deno.com/deploy/
- Create an issue in the repository
