# mmartinov.com

Personal portfolio website for Martin Martinov - Software Architect & Automation Consultant.

## Tech Stack

- **Framework**: [Astro 7](https://astro.build/)
- **UI**: Astro components, plus one Preact island (contact form)
- **Styling**: Tailwind CSS 4
- **Hosting**: Cloudflare Workers (`@astrojs/cloudflare`)
- **Analytics**: Self-hosted Plausible (privacy-focused)
- **Email**: Resend API (contact form)

## Development

### Prerequisites

- Node.js 22.12+ and [pnpm](https://pnpm.io/)
- Copy `.env.example` to `.env` and fill in the secrets

### Commands

```bash
pnpm install   # Install dependencies
pnpm dev       # Dev server (runs in workerd)
pnpm build     # Production build (outputs to dist/)
pnpm preview   # Serve the production build locally in workerd
pnpm check     # Format check + type check
pnpm format    # Format all files
pnpm test      # Unit tests (Vitest)
pnpm test:e2e  # Playwright suite against the build (run pnpm build first)
pnpm deploy    # Build and deploy to Cloudflare Workers
```

Note: local dev and preview use the real secrets in `.env`, so submitting the contact form locally sends a real email.

### Testing

Before the first e2e run, install Chromium:

```bash
pnpm --filter mmartinov-tests exec playwright install chromium
pnpm build
pnpm test:e2e
```

The Playwright workspace in `tests/` checks routes, navigation and contact-form success/failure on desktop and mobile. It starts the built Worker on port 8781 with dummy secrets and a local Resend stub on port 8782 (`RESEND_STUB_PORT` overrides the stub port). It never reuses a running site or accepts a deployed `BASE_URL`, so contact tests cannot accidentally use a production site's email credentials.

`RESEND_API_URL` is an optional server secret used by the tests to redirect email to the stub. Leave it unset in production; the default is Resend's API. CI builds without `.env` and runs both Vitest and Playwright; neither needs repository secrets.

## Project Structure

```
├── src/
│   ├── pages/          # Routes: index, about, work, audit, contact, 404
│   ├── layouts/        # BaseLayout.astro (head, SEO, analytics, header/footer)
│   ├── components/     # Header, Footer, Section, Button, ContactForm (island)
│   ├── content/        # Structured content data (TypeScript)
│   ├── lib/            # antispam.ts, button.ts
│   └── styles/         # global.css
├── tests/              # Playwright workspace and local Resend stub
├── public/             # Static assets (favicon, images, og-image, robots.txt)
├── astro.config.ts
└── wrangler.jsonc
```

## Key Features

- **SEO Optimized**: Sitemap, robots.txt, Schema.org structured data, Open Graph tags
- **Spam Prevention**: Multi-layer protection with honeypot fields and timing validation
- **Performance**: Prerendered static pages, minimal JavaScript, optimized fonts
- **Privacy**: Self-hosted Plausible analytics (no cookies, GDPR compliant)
- **Responsive**: Mobile-first design with Tailwind CSS

## Content Management

All content is managed through TypeScript files in the `src/content/` directory:

- `src/content/home.ts` - Homepage content
- `src/content/work.ts` - Case studies and work examples
- `src/content/about.ts` - About page content
- `src/content/contact.ts` - Contact page content and form fields
- `src/content/site.ts` - Global site configuration

## Deployment

Hosted on Cloudflare Workers. See `docs/02-deployment.md` for setup, secrets and the domain cutover.

Secrets (set with `pnpm wrangler secret put <NAME>`):

- `RESEND_API_KEY` - Required for contact form email
- `ANTISPAM_SECRET_KEY` - Required for contact form anti-spam tokens

## Contact Form

Enterprise-grade spam prevention:

- Honeypot field (hidden from humans, catches bots)
- Timing validation (minimum 3 seconds to fill form)
- Server-side validation and email sanitization
- Direct REST API integration with Resend (no SDK dependencies)

## Documentation

See `CLAUDE.md` for detailed project documentation and development guidelines.

## License

© 2025 Martin Martinov. All rights reserved.
