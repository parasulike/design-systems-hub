# Project brief: Design Systems Hub

## Context

I'm building a catalog of publicly available design systems for designers and
developers. There are already a few directories like this (component.gallery,
designsystem.gallery, designsystemsrepo.com), but all of them are pure
linkout directories — a logo, a card, a click-through. None of them tell you
whether a design system is actually *alive*: still maintained, active commits,
real adoption.

**The differentiator for this project:** dev-focused health & metadata, pulled
live from GitHub/npm, not just curated metadata.

## What I need from you right now

Start in plan mode. Don't write code yet. Read everything below, then propose
a concrete step-by-step build plan and confirm the stack with me before
touching any files.

## Data model

Each design system entry has two layers:

**Curated once (hand-maintained):**
`id`, `name`, `company`, `description`, `site_url`, `github_repo` (owner/repo),
`figma_url`, `storybook_url`, `npm_package`, `frameworks` (array, e.g. React/
Vue/Angular/Svelte/Web Components), `license`, `token_format` (e.g. Style
Dictionary), `theming` (none / single-brand / multi-brand), `tags` (array,
e.g. accessibility, headless, zero-runtime, RTL support, i18n, government,
design-ops, open-source).

**Live, fetched on a schedule (not per page load):**
`stars`, `open_issues`, `last_commit_at`, `contributors_count`,
`latest_release_tag`, `latest_release_at`, `npm_weekly_downloads`,
`npm_package_size_kb`.

**Derived:**
`health_label` — a simple Active / Slowing / Stale label computed from
recency of last commit + release cadence + issue close rate. Not a raw
score — that invites false precision designers/devs will over-trust.

## Seed list (v1 — ~15-20 entries to launch with)

Carbon Design System (IBM), Polaris (Shopify), Primer (GitHub), Atlassian
Design System, Material Design (Google), Spectrum (Adobe), Lightning Design
System (Salesforce), Fluent UI (Microsoft), Ant Design, Chakra UI, Radix
Primitives, shadcn/ui, GOV.UK Design System, USWDS (US gov), PatternFly (Red
Hat).

## Constraints to respect

- GitHub API: 60 req/hr unauthenticated, 5,000/hr with a token. Live data
  must be cached and refreshed on a schedule, never fetched live per request.
- Some systems won't have a public GitHub repo, npm package, or Figma file.
  The schema and UI must handle nulls gracefully ("no data available"), not
  show a misleading "Stale" label for something that's just closed-source.
- Multi-package systems (Carbon ships ~15 npm packages) need a clear
  convention for which package's download count/size represents the system,
  or show several rather than picking arbitrarily.
- No user accounts, no Figma plugin, no live component rendering in v1 —
  explicitly out of scope. Resist scope creep into these.

## Phased plan (my rough draft — refine this with me)

1. **Scoping** — lock the schema, pick the stack, confirm the seed list
2. **Static catalog, real data** — hand-curate the seed list's static fields,
   write a one-off script to pull live GitHub/npm data for them, build a
   basic filterable grid (framework, license, theming, tags), each card
   shows the health label
3. **Automation** — scheduled job to refresh live data instead of a manual
   script; a submission flow for others to suggest a system (curated fields
   only — live fields are always computed, never user-submitted, so the
   health signal stays trustworthy)
4. **Comparison feature** — pick 2-3 systems, see their live data side by
   side

## What to do now

1. Propose the stack (I'm leaning Next.js + a static JSON catalog rebuilt by
   a scheduled job — simplest option at this scale — but tell me if you'd
   do it differently and why).
2. Lay out the file/folder structure you'd create.
3. Give me a step-by-step task list for Phase 2 specifically (static catalog
   with real data), in the order you'd actually execute it.
4. Wait for my go-ahead before writing any code.
