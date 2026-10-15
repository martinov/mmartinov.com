# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Martin Martinov (mmartinov.com), built with Astro 7, Preact (for the one interactive island), and Tailwind CSS 4. It runs on Cloudflare Workers via the `@astrojs/cloudflare` adapter.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server with hot reload (runs in workerd, the Workers runtime)
pnpm dev

# Production build (outputs to dist/)
pnpm build

# Serve the production build locally in workerd
pnpm preview

# Format check + type check
pnpm check

# Format all files
pnpm format

# Unit tests (Vitest)
pnpm test

# Build and deploy to Cloudflare Workers
pnpm deploy
```

## Architecture

### Astro Patterns

- **Pages**: File-based routing in `src/pages/`
  - Page routes: `index.astro`, `about.astro`, `work.astro`, `audit.astro`, `contact.astro`, `404.astro`
  - `sitemap.xml.ts`: generated at build time

- **Rendering**: Static by default. Pages are prerendered at build time and served as static assets.
  - Every page is prerendered, `contact.astro` included. The only per-request rendering is the `ContactFormIsland` server island (`server:defer`, fetched from `/_server-islands/ContactFormIsland`), which mints a fresh anti-spam token per visit, plus the contact action. Both run in the Worker.
  - The island's fallback slot is the same `ContactForm` markup, `inert`, so loading causes no layout shift. Server islands need JS, so a `<noscript>` block hides the fallback and points to booking/email instead.

- **Actions**: `src/actions/index.ts` defines the `contact` Astro Action (`accept: "form"`, Zod schema `contactInput` from `src/lib/contact.ts`). The island calls it via `actions.contact(formData)`; there is no native-form fallback, since `/contact` is static and a POST to it returns 405. A Resend failure throws `BAD_GATEWAY`, the only code that shows the "email me directly" fallback.

- **Layout**: `src/layouts/BaseLayout.astro` holds the HTML shell, SEO/OG meta tags, fonts, analytics, Schema.org data, header and footer. Every page wraps its content in it and passes `title` and `description`; canonical/OG URLs and the active nav item come from `Astro.url` and `site` in `astro.config.ts`.

- **Components**: `src/components/`
  - `.astro` components are server-only and ship no JS (`Header`, `Footer`, `Section`, `Button`)
  - `ContactForm.tsx` is the only Preact island, hydrated with `client:load` inside the `ContactFormIsland.astro` server island, which passes it the anti-spam token
  - Button styles live in `src/lib/button.ts` (`buttonClass()`), shared by `Button.astro` and the island

- **Content**: Structured content data in `src/content/`
  - TypeScript files exporting content objects (not markdown, not content collections)
  - Each page has its own content file: `home.ts`, `about.ts`, `work.ts`, etc.
  - Import and use in page components

### Workers Runtime Gotchas

- `Date` is frozen at the epoch while modules load. Never compute dates at module scope (e.g. a copyright year in a content file); compute them inside component frontmatter or request handlers.
- `astro:env/server` reads every secret when the module loads, and builds (Cloudflare Workers Builds included) have no secrets. Anything reachable from a prerendered page must import it lazily, inside a handler or component frontmatter: `const { X } = await import("astro:env/server")`. `/contact` reaches it through `ContactFormIsland` and through `ContactForm`'s `astro:actions` import of `src/actions/index.ts`. Check with a build in a checkout that has no `.env`.
- With `build.format: "file"`, Astro strips `.html` from request paths before routing, and Cloudflare's asset routing redirects `*.html` to the extensionless path.

### Styling

- Tailwind CSS 4 via the `@tailwindcss/vite` plugin
- Global CSS in `src/styles/global.css` (imported by `BaseLayout.astro`)
- Typography: Newsreader (display/headings), DM Sans (body text), self-hosted via the Astro Fonts API (`fonts` in `astro.config.ts`, `<Font>` in `BaseLayout.astro`). `--font-display` / `--font-body` are registered in `@theme` in `global.css` (pointing at the generated variables), so `font-display` / `font-body` utilities exist. Headings get `--font-display` from the base rule; use the `font-display` class elsewhere, not inline `font-family` styles.
- Design: Professional minimal aesthetic with generous whitespace

### Third-Party Services

- **Analytics**: Self-hosted Plausible at `analytics.mmartinov.com`
  - Script injected in `BaseLayout.astro` head

- **Email**: Resend API for contact form submissions
  - Direct REST API calls using native `fetch` (no SDK)
  - Uses verified domain: `contact@notifications.mmartinov.com`
  - Sent from the `contact` action in `src/actions/index.ts`; the payload is built by `buildContactEmail()` in `src/lib/contact.ts`

### Secrets

Declared with `astro:env` in `astro.config.ts` and imported lazily from `astro:env/server` (see Workers Runtime Gotchas). Both are required; there is no fallback.

- `RESEND_API_KEY` - Resend API key
- `ANTISPAM_SECRET_KEY` - HMAC key for contact-form anti-spam tokens

Locally they are read from `.env` (see `.env.example`). **`pnpm dev` and `pnpm preview` use the real keys in `.env`, so submitting the contact form locally sends a real email.** Shell env vars do not override `.env` in the worker unless `CLOUDFLARE_INCLUDE_PROCESS_ENV=true` is set, so to exercise the send-failure path run `CLOUDFLARE_INCLUDE_PROCESS_ENV=true RESEND_API_KEY=invalid pnpm dev`. In production they are Worker secrets: `pnpm wrangler secret put <NAME>`.

## Important Conventions

### Dependency Management

- **No Resend SDK**: Use Resend's REST API directly with fetch
- `@astrojs/preact` requires Preact 10.x, and `@astrojs/check` requires TypeScript ≤ 6. Check peer dependencies before bumping. `renovate.json` holds both at those majors; remove a hold once the integration's peer range allows the next major.
- Native builds are allow-listed in `pnpm-workspace.yaml` (`esbuild`, `workerd`)
- Always use latest stable versions when adding new dependencies

### Email Configuration

When modifying email functionality (`buildContactEmail()` in `src/lib/contact.ts`, sent from `src/actions/index.ts`):

- `from` field MUST use `@notifications.mmartinov.com` (verified domain in Resend)
- `to` field: `me@mmartinov.com`
- `reply_to` field: User's submitted email for direct replies
- Escape every submitted value interpolated into the HTML, the email address included

### Content Updates

To update site content, edit the TypeScript files in `src/content/`:

- Content is structured as exported objects/arrays
- Import content in page components and map to UI components
- Keep content data separate from presentation logic

## Deployment

Cloudflare Workers, Worker name `mmartinov-com` (`wrangler.jsonc`). See `docs/02-deployment.md`.

## Project Structure

```
├── src/
│   ├── pages/          # File-based routing (.astro pages, .ts endpoints)
│   ├── actions/        # Astro Actions (contact form submission)
│   ├── layouts/        # BaseLayout.astro (HTML shell, head, header/footer)
│   ├── components/     # .astro components + ContactForm.tsx island
│   ├── content/        # Structured content data (TS files)
│   ├── lib/            # antispam.ts, button.ts, contact.ts (schema + email) + tests
│   └── styles/         # global.css
├── public/             # Static assets (favicon, images, robots.txt)
├── astro.config.ts     # Astro config (adapter, integrations, env schema)
└── wrangler.jsonc      # Cloudflare Worker config
```

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
