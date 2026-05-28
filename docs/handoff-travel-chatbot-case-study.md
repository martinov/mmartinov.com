# Handoff — Adventour travel chatbot case study

**Next session focus:** Draft / update the case study entry at https://mmartinov.com/work for the Adventour travel chatbot (`search.pochivki-turcia.bg`).

**Source project:** `/home/martin/Projects/travel-chatbot`

---

## What the project is (one-paragraph framing)

A Bulgarian-language conversational AI for Turkish vacation discovery. Users chat in natural language; the agent extracts travel parameters (destination, dates, travellers, budget), queries real-time tour-operator APIs (Tours Club, Onex Tour via Samo Soft B2B protocol), and presents vacation offers as interactive cards. Includes lead capture and booking-intent collection, with server-side conversion tracking for Facebook Ads attribution. Deployed to production for Turkuaz Travel Agency.

## Why it makes a good case study

A few angles that are interview-worthy and portfolio-worthy:

1. **Real-time API search over RAG.** A defensible architectural decision — vacation inventory changes by the minute, so vector-indexing it would be the wrong tool. The agent uses tool calls against live provider APIs with whitelist-based ranking instead. Good story about *choosing not to use RAG* in an industry that defaults to it.
2. **Dual-prompt loop with classifier-gated mode switching.** Full search mode collects parameters; reduced post-search mode handles lead capture and clarifications. Prevents redundant parameter collection after the initial search. Cleaner than a single monolithic prompt.
3. **Bulgarian-first.** No i18n shim — the whole UX and prompt set is in Bulgarian by design (business requirement for Turkuaz). Worth calling out because most agentic chatbot case studies are English-only.
4. **Production AI plumbing done right.** Anthropic prompt caching (ephemeral 5-min TTL on system prompt + tool definitions), LangFuse-managed prompts with dev/prod labels, OpenTelemetry traces, BullMQ workers for async side-effects, SSE streaming with `TCP_NODELAY`.
5. **Measurable business outcome.** Facebook Conversions API integration (server-side SHA-256 PII hashing, deduplication, configurable test event code) — the system isn't just a chatbot, it's a lead-generation channel with attribution wired up.
6. **Quality discipline.** Stryker mutation testing with a ≥80% kill-rate gate per feature. Most AI projects skip this.

## Tech stack (already confirmed)

- **Backend:** Node.js 24.12+, TypeScript 6.0, Fastify 5.8, Vercel AI SDK 6.0, Anthropic SDK 2.0
- **Data:** PostgreSQL 18.1 (Kysely 0.28), Redis 7.4, BullMQ 5.76
- **Frontend:** Vue 3, `@ai-sdk/vue` 2.0, Pinia, Vite, Tailwind CSS 4.1
- **AI model:** Anthropic Claude Sonnet 4.5 (OpenAI as fallback via `AI_PROVIDER`)
- **Prompts / obs:** LangFuse + `@langfuse/otel` + OpenTelemetry; Pino structured logging
- **Quality:** Biome, Vitest, Stryker mutation testing
- **Deploy:** Dokploy on VPS, Docker Compose, Traefik SSL, Nginx serving Vue SPA, WebSocket + SSE chat transport

## Tools wired into the agent (for the architecture diagram)

- `searchVacations` — tour-operator API aggregation
- `getTravelOptions` — reference data lookup (cached in Redis)
- `getAvailableDates` — date-range discovery
- `captureLeadTool` / `captureReservationTool` — sales pipeline handoffs
- `enrichHotelTool` — Tavily web search (circuit-breaker protected, 5s timeout)
- `resolveHotelFromTextTool` — fuzzy hotel-name resolution against whitelist
- `presentChoicesTool` — interactive button rendering

## Suggested case-study structure

1. **One-line hook** — e.g. "A Bulgarian-language vacation-discovery agent that turns a chat into a booked holiday."
2. **The problem** — Turkuaz needs a way to convert ad traffic into qualified leads without growing the sales team.
3. **Key constraints** — Bulgarian-only UX; real-time inventory; needs to attribute conversions back to ad spend.
4. **Architecture sketch** — diagram showing chat UI → Fastify + Vercel AI SDK loop → tool calls → tour-operator APIs / Tavily / lead pipeline.
5. **Three or four "why we did it this way" decisions** — pick from the angles above.
6. **Outcome** — needs numbers from the user (lead volume, conversion rate, latency).
7. **Stack badges**.

## What's missing — questions for Martin before writing

- Production launch date / how long it's been live
- Conversation volume (per day / per month)
- Lead conversion numbers or any % uplift you can share
- Hosting cost envelope (worth mentioning if it's notably lean)
- Whether the client agrees to being named in the case study, and whether you can use logo
- Screenshots or a recorded demo for the page
- Any internal name beyond "Adventour" you want on the site

## Suggested skills for the next session

- Project-local skills under `/home/martin/Projects/travel-chatbot/.agents/skills/` — particularly `zoom-out` (for architecture framing) and `improve-codebase-architecture` (to sanity-check claims before publishing them).
- No site-publishing skill found; the next agent should output Markdown / MDX suitable for the mmartinov.com/work source format (ask Martin which it is — likely Next.js + MDX based on the rest of his stack).

## References (don't duplicate, read the source)

- Repo: `/home/martin/Projects/travel-chatbot`
- Live: https://search.pochivki-turcia.bg/
- `package.json` for stack versions
- `README.md` and `.agents/` for project conventions
