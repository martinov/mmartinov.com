# mmartinov.com

Personal portfolio website for Martin Martinov - Software Architect & Automation Consultant.

## Tech Stack

- **Framework**: [Fresh 2.2](https://fresh.deno.dev/) (Deno's full-stack web framework)
- **Runtime**: [Deno](https://deno.com/)
- **UI**: Preact + JSX
- **Styling**: Tailwind CSS 4
- **Build**: Vite
- **Deployment**: Deno Deploy
- **Analytics**: Self-hosted Plausible (privacy-focused)
- **Email**: Resend API (contact form)

## Development

### Prerequisites

- [Deno](https://docs.deno.com/runtime/getting_started/installation) installed

### Commands

```bash
# Install dependencies
deno install

# Development server with hot reload
deno task dev

# Production build (outputs to _fresh/)
deno task build

# Run production server locally
deno task start

# Format, lint, and type check
deno task check

# Update Fresh framework
deno task update
```

## Project Structure

```
├── routes/          # File-based routing
│   ├── _app.tsx     # Root layout (fonts, analytics, meta tags)
│   ├── _404.tsx     # Custom 404 page
│   ├── api/         # API endpoints
│   └── *.tsx        # Page routes (index, work, about, contact)
├── islands/         # Interactive client components
│   └── ContactForm.tsx
├── components/      # Server-rendered components
│   ├── PageLayout.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SEO.tsx
│   └── ...
├── content/         # Structured content data (TypeScript)
│   ├── home.ts
│   ├── work.ts
│   ├── about.ts
│   ├── contact.ts
│   └── site.ts
├── static/          # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   ├── og-image.png
│   └── robots.txt
└── assets/          # CSS and build-time assets
    └── styles.css
```

## Key Features

- **SEO Optimized**: Sitemap, robots.txt, Schema.org structured data, Open Graph tags
- **Spam Prevention**: Multi-layer protection with honeypot fields and timing validation
- **Performance**: Server-side rendering, minimal JavaScript, optimized fonts
- **Privacy**: Self-hosted Plausible analytics (no cookies, GDPR compliant)
- **Responsive**: Mobile-first design with Tailwind CSS

## Content Management

All content is managed through TypeScript files in the `content/` directory:

- `content/home.ts` - Homepage content
- `content/work.ts` - Case studies and work examples
- `content/about.ts` - About page content
- `content/contact.ts` - Contact page content and form fields
- `content/site.ts` - Global site configuration

## Deployment

Automatic deployment via Deno Deploy:
1. Push to `main` branch on GitHub
2. Deno Deploy automatically builds and deploys
3. Environment variables configured in Deno Deploy dashboard:
   - `RESEND_API_KEY` - Required for contact form

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
