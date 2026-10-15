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
pnpm deploy    # Build and deploy to Cloudflare Workers
```

Note: local dev uses the real secrets in `.env`, so submitting the contact form locally sends a real email.

## Project Structure

```
├── src/
│   ├── pages/          # Routes: index, about, work, audit, contact, 404
│   ├── layouts/        # BaseLayout.astro (head, SEO, analytics, header/footer)
│   ├── components/     # Header, Footer, Section, Button, ContactForm (island)
│   ├── content/        # Structured content data (TypeScript)
│   ├── lib/            # antispam.ts, button.ts
│   └── styles/         # global.css
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
