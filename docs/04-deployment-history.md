# Deployment history - mmartinov.com

Historical record of the Deno Deploy to Cloudflare Workers migration (completed; the Deno Deploy
project was deleted in October 2026). **This is not a maintenance guide.** Routine operations live in
[`02-deployment.md`](02-deployment.md). Repeating any step below (DNS cutover, record deletion,
secret changes, infrastructure deletion) needs a new issue and explicit approval.

## What the first deploy looked like

- `pnpm wrangler login`, then `pnpm deploy`; the site came up on
  `https://mmartinov-com.<subdomain>.workers.dev` with `"workers_dev": true`. It is now `false`
  because the custom domain is live.
- Secrets `RESEND_API_KEY` and `ANTISPAM_SECRET_KEY` were set with `pnpm wrangler secret put`. The
  anti-spam value was reused so tokens issued just before the cutover stayed valid.
- Workers Builds was connected to `main` (build `pnpm build`, deploy `pnpm wrangler deploy`).
- Pre-cutover verification on workers.dev: pages render, `/about` is 200, `/nope` is the custom 404,
  sitemap and robots load, `/sitemap.xml` 301s to `/sitemap-index.xml`, one real contact submission
  arrived.

## Custom domain cutover (done)

1. The `mmartinov.com` zone was moved onto Cloudflare.
2. The custom domain `mmartinov.com` was added under the Worker's Domains & Routes; Cloudflare
   created the DNS record and certificate.
3. The old A/CNAME records pointing at Deno Deploy, including `www`, were removed.
4. `www` redirects to the apex at Cloudflare's edge and never reaches the Worker: a proxied `A`
   record `www` to `192.0.2.1` (a reserved dummy address that is never contacted) plus the Redirect
   Rule template "Redirect from WWW to root" (301, keeps path and query). The dashboard may warn
   that `www` is not proxied; if `dig +short www.mmartinov.com` returns Cloudflare IPs, it is.
5. The Deno Deploy project was deleted.

## Cautions worth keeping

- Leave the `www` dummy record and its Redirect Rule in place; the redirect depends on both.
- Leave `analytics.mmartinov.com` (self-hosted Plausible) and the Resend DNS records for
  `notifications.mmartinov.com` unchanged; analytics and mail delivery depend on them.
- Search Console: Domain property `mmartinov.com`, verified by the `google-site-verification` TXT
  record on the apex. Keep that record. The sitemap is submitted as `/sitemap-index.xml`.
- Plausible has `mmartinov.com` added as a site; the script loads from `BaseLayout.astro`.

## Initial launch checklist (done, kept for reference)

- Open Graph image at `public/og-image.png` (1200x630).
- Contact form on Resend with the verified sender domain; Resend free tier is 3,000 emails/month.
- Not done, optional: Bing Webmaster Tools, Google Business profile, an uptime monitor.
