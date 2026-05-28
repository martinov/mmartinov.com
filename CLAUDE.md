# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Martin Martinov (mmartinov.com), built with Fresh 2.2 (Deno's full-stack web framework), Preact, and Tailwind CSS 4. The site is deployed on Deno Deploy with automatic deployments from the main branch.

## Development Commands

```bash
# Install dependencies
deno install

# Development server with hot reload (runs Vite)
deno task dev

# Production build (outputs to _fresh/ directory)
deno task build

# Run production server locally (serves built files)
deno task start

# Format, lint, and type check
deno task check

# Update Fresh framework
deno task update
```

## Architecture

### Fresh Framework Patterns

This project uses Fresh 2.2+ with Vite integration. Key architectural concepts:

- **Routes**: File-based routing in `routes/` directory
  - `_app.tsx`: Root layout with global HTML structure (fonts, analytics, meta tags)
  - Page routes: `index.tsx`, `about.tsx`, `work.tsx`, `contact.tsx`
  - API routes: `routes/api/contact.ts` (POST handler for contact form)

- **Islands**: Interactive client-side components in `islands/` directory
  - Use `islands/` for components requiring interactivity
  - Example: `ContactForm.tsx` handles form submission with signals
  - Islands are hydrated on the client while the rest is server-rendered

- **Components**: Reusable server-rendered components in `components/`
  - Pure presentational components (no client-side interactivity)
  - Examples: `PageLayout.tsx`, `Header.tsx`, `Footer.tsx`, `SEO.tsx`

- **Content**: Structured content data in `content/` directory
  - TypeScript files exporting content objects (not markdown)
  - Each page has its own content file: `home.ts`, `about.ts`, `work.ts`, etc.
  - Keeps content separate from presentation logic
  - Import and use in route components

- **Utils**: Shared utilities in `utils.ts`
  - `define` helper created with `createDefine<State>()` for type-safe route/handler definitions
  - Use `define.page()` for route components and `define.handlers()` for API routes

### Build System

- **Vite**: Build tool configured in `vite.config.ts`
  - Fresh plugin handles SSR and islands
  - Tailwind CSS v4 plugin for styling
- **Output**: Builds to `_fresh/` directory (excluded from git)
  - `_fresh/client/` - Client-side JavaScript and CSS bundles
  - `_fresh/server/` - Server-side rendering code
  - `_fresh/server.js` - Production server entry point

### Styling

- Tailwind CSS 4 (latest version via `@tailwindcss/vite` plugin)
- Custom CSS in `assets/styles.css`
- Typography: Newsreader (display/headings), DM Sans (body text)
- Design: Professional minimal aesthetic with generous whitespace

### Third-Party Services

- **Analytics**: Self-hosted Plausible at `analytics.mmartinov.com`
  - Script injected in `routes/_app.tsx` head
  - Custom domain configuration with hash-based script path

- **Email**: Resend API for contact form submissions
  - Direct REST API calls using native `fetch` (no SDK - avoided due to dependency issues)
  - Uses verified domain: `contact@notifications.mmartinov.com`
  - Environment variable: `RESEND_API_KEY` required in Deno Deploy
  - API endpoint: `routes/api/contact.ts`

## Important Conventions

### Dependency Management

- **No Resend SDK**: Use Resend's REST API directly with fetch to avoid svix/uuid bundling issues
- **Pruning dependencies**: When removing npm packages from `deno.json`, clean lock file:
  ```bash
  rm -rf node_modules deno.lock
  deno install
  ```
- Always use latest stable versions when adding new dependencies

### Email Configuration

When modifying email functionality in `routes/api/contact.ts`:
- `from` field MUST use `@notifications.mmartinov.com` (verified domain in Resend)
- `to` field: `me@mmartinov.com`
- `reply_to` field: User's submitted email for direct replies

### Content Updates

To update site content, edit the TypeScript files in `content/`:
- Content is structured as exported objects/arrays
- Import content in route components and map to UI components
- Keep content data separate from presentation logic

## Deployment

Deployment is automatic via Deno Deploy:
1. Push to `main` branch on GitHub
2. Deno Deploy automatically builds and deploys
3. Environment variables set in Deno Deploy dashboard:
   - `RESEND_API_KEY` - Required for contact form

## Project Structure

```
├── routes/          # File-based routing
│   ├── _app.tsx     # Root layout (global HTML/head)
│   ├── api/         # API endpoints
│   └── *.tsx        # Page routes
├── islands/         # Interactive client components
├── components/      # Server-rendered components
├── content/         # Structured content data (TS files)
├── static/          # Static assets (favicon, etc.)
├── assets/          # CSS and other build-time assets
├── utils.ts         # Shared utilities and type definitions
└── vite.config.ts   # Vite build configuration
```

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
