# Coding Standards

Rules the review agent checks a diff against. `pnpm check` (Prettier + `astro check`) and `pnpm test` enforce formatting, types and the tested behaviour; these are the calls tooling can't make. Facts about how the site works live in `AGENTS.md`.

## Comments

A comment says _why_: a constraint, a gotcha, a reason the obvious approach was rejected. One line where one line will do. Code that reads clearly on its own carries no comment; restating what the next line does, narrating a change ("now uses X"), or section-label comments over short blocks are violations.

## Docs follow the code

A diff that moves, renames or removes a file, route, script, env var or component updates every doc that names it: `AGENTS.md`, `README.md`, `docs/`. Grep the old name across the repo to check. A stale reference left behind is a violation, not a follow-up.

## CSS layering

Element defaults in `src/styles/global.css` (`body`, headings, `a`, …) go inside `@layer base`. Unlayered CSS beats every Tailwind utility, so an unlayered element rule silently overrides classes like `text-white` or `font-bold` on that element. `:focus-visible` is the one deliberate exception, so no utility can remove the focus outline.

## Secrets in prerendered code

A module reachable from a prerendered page imports `astro:env/server` lazily, inside a handler or component frontmatter (`const { X } = await import("astro:env/server")`). A top-level import there fails the build in Cloudflare Workers Builds, which has no secrets, while passing locally where `.env` exists. Trace the imports of every changed module back to its pages.

## Contact email

Every submitted value interpolated into the email HTML in `buildContactEmail()` (`src/lib/contact.ts`) is escaped, the email address included, and `encodeURIComponent`-ed inside the `mailto:` href. `src/lib/contact.test.ts` covers the existing fields and the `from` / `to` / `reply_to` addresses; a new field needs its own escaping test.

## Evidence for claims

A finding that asserts behaviour ("the sitemap now includes `/audit`", "this breaks the no-JS path") cites what shows it: a command and its output, or a `file:line`. A claim with no evidence is labelled as unverified.
