# Brainstorm — open ideas, not yet committed

Dumping ground for things worth considering later, pulled from the original
conversation plus new ideas. Nothing here is scoped or prioritized yet.

## Differentiation ideas beyond dev health

- **Token comparison view** — normalize each system's color/spacing/type
  scale so a designer can see e.g. "how does Carbon's spacing scale compare
  to Atlassian's" without opening either site.
- **Naming-convention census** — "here's what 40 design systems call their
  primary button variant" — useful trivia for anyone naming their own tokens.
- **Adoption examples** — "found in the wild": real products built on each
  system, for credibility/inspiration.
- **Migration notes** — breaking changes between major versions, useful for
  teams evaluating whether to adopt or how painful an upgrade will be.
- **AI-readiness signal** (seen on designsystems.one's "AI-Ready Index") —
  a different axis from our dev-health label: e.g. machine-readable tokens,
  documented component APIs, MCP/LLM tooling support. Worth a v2 look as a
  separate signal alongside health, not a replacement for it — health is
  about "is it maintained," this would be about "can an LLM use it well."

## Borrowed vocabulary worth reusing

From designsystem.gallery's tag taxonomy — these are good filter categories
we don't have yet in our schema: `headless`, `zero-runtime`, `RTL support`,
`i18n`, `design ops`, `multi-brand`. Component.gallery's `unmaintained` flag
is the manual version of what our live health score should make automatic.

## Stack questions (unresolved)

- Next.js + a Postgres/SQLite table for the catalog, vs. just a static
  JSON file rebuilt by a cron job (simpler, fine at our seed-list scale)
- Where does the GitHub/npm fetch script live — a GitHub Action that commits
  updated JSON, or a small serverless function with its own DB?
- Hosting: static-first if we go the JSON-file route (Vercel/Cloudflare
  Pages), since there's no real user-generated content in v1

## Risks / things that could go wrong

- GitHub API rate limiting if the seed list grows a lot — mitigated by
  caching results and only refreshing on a schedule, not per page view
- "Health score" can mislead if reduced to one number — lean on a small
  set of labeled signals (last commit, release cadence) rather than a
  single composite score the user can't interrogate
- Some company design systems gate their GitHub repo or don't have one at
  all (e.g. Spotify, internal-only systems) — those entries just won't have
  live data, and the UI needs to handle "no data available" gracefully
  instead of showing a misleading "stale" label
