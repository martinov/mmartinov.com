# Handoff — HRANI case study

**Next session focus:** Draft / update the case study entry at https://mmartinov.com/work for HRANI — automatic take-home assignment review agent.

**Source project:** `/home/martin/Projects/hrani` · Repo: https://github.com/camplight/hrani

---

## What the project is (one-paragraph framing)

An event-driven serverless pipeline that reviews engineering candidate take-home submissions and writes structured, schema-validated reviews back into Notion. A reviewer changes a status field in Notion; minutes later a verdict with scores, strengths, weaknesses, and a hire/maybe/reject recommendation appears on the same page. Internally: a Pi coding agent runs against the candidate's cloned repository with read-only filesystem tools locally and bounded command execution inside an isolated e2b sandbox, then submits its review through a TypeBox-validated terminating tool.

## Why it makes a good case study

1. **Untrusted-code safety as a first-class design constraint.** Candidate code is treated as adversarial. Local tools are read-only (`read`/`grep`/`find`/`ls`); anything dynamic — installs, builds, test runs — is forced through a secretless e2b sandbox with bounded call counts, per-call timeouts, and output caps. Zero credentials are ever in reach of candidate code. This is a sharp, defensible story about AI-agent security that most "code-review agent" demos hand-wave.
2. **Structured output via a terminating tool, not regex.** The agent ends its run by calling `submit_review` with a TypeBox-validated payload (score categories, strengths/weaknesses bounded by count and length, enum recommendation). Zod re-validates before the Notion write. Worth showing as the right pattern for agentic systems that need to produce data, not prose.
3. **Boring-infra serverless.** Notion webhook → DigitalOcean Function (signature verification + dedup) → GitHub `repository_dispatch` → GitHub Actions runner → one-shot CLI. No always-on services, no queue infra to maintain, no extra accounts. Good "use the simplest thing that works" angle.
4. **Race-condition handling.** Reviews are keyed by the candidate's immutable default-branch commit SHA, so re-triggering a review on the same commit deduplicates rather than racing. A force flag exists for deliberate reruns. Small detail but a strong signal of production-mindedness.
5. **Model-agnostic by configuration.** `REVIEW_MODEL` lets the team swap between Pi (default), Claude, and GPT-5 codex without code changes. Useful when evaluating which model gives the best reviews for the team's hiring bar.
6. **Hiring-process leverage.** The business outcome is straightforward to explain — engineering managers get a consistent first-pass review on every submission, faster, with a hard-to-game structured output. The human reviewer's time goes to candidates that warrant a deeper look.

## Tech stack (already confirmed)

- **Runtime:** Node.js 24+, TypeScript 5.9
- **Framework:** none — custom modular services architecture (no Express / Fastify); deliberate
- **Agent:** `@earendil-works/pi-coding-agent` v0.74.0 invoked as a spawned CLI process with JSON event parsing
- **Sandbox:** e2b (secretless, time-bounded)
- **Data plane:** Notion (sole source of truth — applicant state, task specs, review output)
- **Orchestration:** GitHub Actions (`ubuntu-latest`, protected environment, 60-minute timeout per review) + DigitalOcean Functions for the webhook ingress
- **Validation:** Zod (Notion-write side) + TypeBox (Pi tool schema)
- **Build / test / logs:** tsc + tsc-alias, Vitest, Pino + Pino Pretty
- **Models supported:** OpenAI GPT-5 codex (default), Anthropic Claude, OpenAI (configurable via `REVIEW_MODEL`)

## Tools wired into the agent (for the architecture diagram)

- **Native Pi read-only**: `read`, `grep`, `find`, `ls` against the locally cloned candidate repo
- **Custom `e2b_bash`**: bounded command execution in an isolated sandbox (max 10 calls, 60s default timeout, 20KB output cap)
- **Custom `submit_review`**: terminating structured-output tool with TypeBox schema and full validation before the Notion append

## Suggested case-study structure

1. **One-line hook** — e.g. "An AI agent that reviews engineering take-homes, with the safety model that lets you actually run candidate code."
2. **The problem** — every engineering team running take-homes burns senior time on submissions that don't warrant a second look, and reviews drift in quality and consistency over time.
3. **Key constraints** — must run untrusted code safely; must produce structured, comparable verdicts; must integrate with the team's existing Notion-based pipeline; must be cheap and easy to host.
4. **Architecture sketch** — the webhook → Function → GitHub Actions → CLI flow, with the agent + e2b sandbox detail inset.
5. **Three or four "why we did it this way" decisions** — pick from the angles above; the security-by-design and structured-output ones are the strongest.
6. **Outcome** — needs numbers from the user (reviews shipped, time saved per review, hire/reject agreement rate vs. human reviewer).
7. **Open-source callout** — repo is public at github.com/camplight/hrani; encourage forks / contributions.

## What's missing — questions for Martin before writing

- How many reviews has it shipped in production so far
- Average time per review (cost and latency)
- How well its hire/maybe/reject calls correlate with the human reviewer's final decision (any anecdotal or measured data)
- Whether the case study should name Camplight as the using-team (presumably yes since the repo is under camplight/)
- Whether to write this as a Camplight case study or a personal portfolio piece (different positioning)
- Screenshots — the Notion page before/after a review is the obvious money shot

## Suggested skills for the next session

- Project-local skills under `/home/martin/Projects/hrani/.agents/skills/` — `zoom-out` for the framing pass, `to-prd` if a structured spec for the case-study page would help.
- No content-publishing skill present; the next agent should output Markdown / MDX matching the mmartinov.com/work format (confirm with Martin which it is).

## References (don't duplicate, read the source)

- Repo: https://github.com/camplight/hrani
- Local: `/home/martin/Projects/hrani`
- `package.json`, `README.md`, and the review CLI entry point for the canonical descriptions
- `.agents/` for project conventions
