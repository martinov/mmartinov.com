# Deployment Guide - mmartinov.com

The site is an Astro app using `@astrojs/cloudflare`, deployed as the Cloudflare Worker
`mmartinov-com` (`wrangler.jsonc`) on the domain `mmartinov.com`. Every page is prerendered and
served as a static asset. Only the contact form server island (`/_server-islands/ContactFormIsland`)
and the `contact` Astro Action (`/_actions/contact`) run in the Worker.

This guide is the operational entry point. Its structure matches the sibling Klimsyst guide
(`martinov/klimsyst`, `docs/02-deployment.md`); site-specific values and differences are noted where
they occur.

## 1. Local development and testing

Five things are easy to confuse:

| What                      | Command                      | Runs                                             | Email                                            |
| ------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Local hot reload          | `pnpm dev`                   | Astro dev server in workerd                      | **Real**: reads `.env`                           |
| Local production build    | `pnpm build && pnpm preview` | The built output in workerd                      | **Real**: reads `.env`                           |
| Stubbed browser tests     | `pnpm build && pnpm test:e2e` | The built Worker via `wrangler dev` on port 8781 | Stubbed: dummy secrets, Resend stub on port 8782 |
| Cloudflare branch preview | push a non-`main` branch     | A Worker Preview on Cloudflare (section 2)       | **Real**: Preview secrets (section 3)            |
| Production                | merge to `main`              | Worker `mmartinov-com` on `mmartinov.com`        | Real: production Worker secrets                  |

**Real-email warning.** `pnpm dev` and `pnpm preview` read the real keys in `.env`, so submitting the
contact form locally sends a real email to `me@mmartinov.com`. To exercise the failure path, run
`CLOUDFLARE_INCLUDE_PROCESS_ENV=true RESEND_API_KEY=invalid pnpm dev`.

### Setup

- Node.js `>=22.23.4` (the `engines` range of the installed Astro; `wrangler` needs `>=22.12.0`).
  CI runs Node 26.
- pnpm: the version in the `packageManager` field of `package.json` is the single source. Corepack
  and `pnpm/action-setup` in CI read it.
- `pnpm install`, then copy `.env.example` to `.env` and fill in the secrets (section 3).

### Checks

- `pnpm check`: Prettier, `astro check` and the type check of the `tests/` workspace.
- `pnpm test`: Vitest unit tests (`src/**/*.test.ts`).
- `pnpm test:e2e`: Playwright suite in `tests/` (routes, navigation, contact-form success, failure
  and rate limiting; desktop and mobile). Run `pnpm build` first, and install the browser once with
  `pnpm --filter mmartinov-tests exec playwright install chromium`.

The e2e suite is stubbed by construction (`tests/playwright.config.ts`): it starts its own
`wrangler dev --port 8781` with `--var` dummy values for `ANTISPAM_SECRET_KEY`, `RESEND_API_KEY` and
`RESEND_API_URL`, pointing the Action at a local Resend stub (`tests/src/resend-stub.ts`). It never
reuses a running server and does not accept a `BASE_URL`, so it cannot be aimed at a deployed site.
Keep it that way: there is no supported way to run the contact tests against production or a
preview. A real-email check of a deployed site is a manual, explicitly authorised single submission.

## 2. Branch → PR → CI/preview → merge → production

1. Cut a short-lived branch from a freshly fetched `origin/main` (one branch per issue).
2. Open a PR into `main`.
3. **CI** (`.github/workflows/ci.yml`, GitHub Actions) runs on every pull request and on pushes to
   `main`: `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, `pnpm build`, then
   `pnpm test:e2e`. It builds without `.env`, as Workers Builds does, so a top-level
   `astro:env/server` import reachable from a prerendered page fails the PR check. CI needs no
   repository secrets and does not deploy.
4. Merge when CI is green. There is no release branch.
5. **Workers Builds** (Cloudflare, separate from CI) builds and deploys `main` to production on every
   push to it: build command `pnpm build`, deploy command `pnpm wrangler deploy` (dashboard: Workers
   & Pages → `mmartinov-com` → Settings → Builds; not independently verified here). A green CI does
   not mean the deploy succeeded; check the Builds tab.
6. Delete the merged branch. Renovate targets `main`.

`pnpm deploy` (`astro build && wrangler deploy`) deploys from a local machine straight to
production. It is a manual fallback, not the normal path, and needs `pnpm wrangler login`.

### Preview deployments

A push to any branch other than `main` builds a Worker Preview of that branch under the same Worker,
so a visible change can be checked before its PR is merged. A branch named `feature-example` is
served at `https://feature-example.preview.mmartinov.com`; `preview.mmartinov.com` itself serves
nothing.

In the repository, `wrangler.jsonc` sets `"preview_urls": true`. Without it Wrangler turns preview
URLs off together with `"workers_dev": false`, and the Previews lose their URL.

The rest is dashboard configuration (Workers & Pages → `mmartinov-com`), **not independently
verified** here:

- Settings → Builds → builds for non-production branches **on**, with **Set up Worker Previews**
  (one-way). Preview command `pnpm wrangler preview`; include all branches (`*`), exclude `main`.
- Domains → custom domain `preview.mmartinov.com`, **Enable for: Preview**. Cloudflare creates the
  wildcard DNS record and certificate.
- Preview builds use the same image as production builds, so `PNPM_VERSION` (below) applies to them
  too.

Previews have their own secrets (section 3), and their contact form sends real email to
`me@mmartinov.com`. Do not submit it on a Preview unless a real email is intended.

### Workers Builds `PNPM_VERSION`

The Workers Builds image defaults to pnpm 10.11.1, which fails on `pnpm-workspace.yaml` ("packages
field missing or empty") and ignores `allowBuilds`. The build variable `PNPM_VERSION` must equal the
version after `pnpm@` in `package.json`'s `packageManager`. When Renovate bumps `packageManager`,
update the variable too. It is a dashboard-only setting and **not independently verified** here;
read its current value in Settings → Builds → Build variables.

## 3. Secrets and preview configuration

Runtime secrets are declared with `astro:env` in `astro.config.ts` and read lazily from
`astro:env/server` (see `AGENTS.md`, Workers Runtime Gotchas).

| Name                  | Required | Purpose                                                                |
| --------------------- | -------- | ---------------------------------------------------------------------- |
| `RESEND_API_KEY`      | yes      | Resend API key                                                         |
| `ANTISPAM_SECRET_KEY` | yes      | HMAC key for contact-form anti-spam tokens (`openssl rand -base64 32`) |
| `RESEND_API_URL`      | no       | Email endpoint for the e2e stub. **Leave unset in production.**        |

- **Locally**: `.env` (see `.env.example`). It holds real keys; the e2e suite overrides it with
  dummy `--var` values.
- **Production runtime secrets** are Worker secrets: `pnpm wrangler secret put <NAME>`; list names
  with `pnpm wrangler secret list`. Without the two required ones the contact island and action
  fail. Do not rotate them as routine maintenance.
- **Build variables** are a separate store (Workers Builds → Settings → Builds), invisible to the
  running Worker. The only one this guide documents is `PNPM_VERSION` (section 2). No `ASTRO_KEY` is
  set; Astro generates a server-island encryption key per build.
- **Preview secrets**: Worker Previews do not inherit the production secrets. Set the two required
  ones once for every Preview with `pnpm wrangler preview base-config secret put <NAME>`, and leave
  `RESEND_API_URL` unset. The recipient is fixed in code, so a Preview with a working
  `RESEND_API_KEY` mails `me@mmartinov.com`. A Preview takes the base config secrets when it is
  created and keeps them; list them with `pnpm wrangler preview secret list --name <preview-name>`.
- **Bindings** are not secrets. The contact form's rate limiter (`CONTACT_LIMITER`) is a
  `ratelimits` binding in `wrangler.jsonc` and deploys with the Worker, with no dashboard setup. Its
  `namespace_id` must stay unique in the Cloudflare account: bindings that share one share their
  counters, across Workers too.
- Email: `from` stays on the verified sender domain `notifications.mmartinov.com`
  (`contact@notifications.mmartinov.com`), `to` is `me@mmartinov.com`, `reply_to` is the visitor.
  See `AGENTS.md`, Email Configuration.

## 4. Troubleshooting

### Build fails

- Locally: check `node --version` against section 1, reinstall with
  `rm -rf node_modules && pnpm install`, run `pnpm check`.
- In Workers Builds only: compare `PNPM_VERSION` with `packageManager` (section 2). A build with no
  `.env` that fails on `astro:env/server` means a top-level import of it; make it lazy.

### Contact form not working

- Check the browser console, and that `/_actions/contact` and `/_server-islands/ContactFormIsland`
  respond.
- Check Worker logs: `pnpm wrangler tail`, or Observability in the Cloudflare dashboard.
- Confirm both required secrets exist: `pnpm wrangler secret list` (production) or
  `pnpm wrangler preview secret list --name <preview-name>` (the branch's Preview).
- A Preview created before the base config secrets were set has none, and its island fails.
  Recreate it with `pnpm wrangler preview delete --name <preview-name>`, then retry the branch
  build.
- A Resend failure shows the "email me directly" fallback; check the sending domain
  `notifications.mmartinov.com` in Resend.

### Styles not loading

- `src/styles/global.css` must be imported by `src/layouts/BaseLayout.astro`, and `astro.config.ts`
  must include the Tailwind Vite plugin.

### Routing and sitemap

- With `build.format: "file"`, `/about` returns 200 with no redirect to `/about/`, `/nope` returns
  the custom 404, and `/sitemap.xml` 301s to `/sitemap-index.xml` (`public/_redirects`). The e2e
  routing spec covers these.

## 5. Historical migration notes

The Deno Deploy to Cloudflare Workers migration is finished. Its first-deploy and DNS cutover steps,
the initial-service checklists and the cautions worth keeping are in
[`04-deployment-history.md`](04-deployment-history.md). They are records, not maintenance
procedures: do not repeat them.

## Support

- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Create an issue in the repository
