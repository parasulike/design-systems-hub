# Competitor analysis

Researched 2026-06-23.

## component.gallery/design-systems

- **Structure:** card grid with screenshot thumbnails
- **Filtering:** Platform (GitHub/Figma/Storybook), Tech (React, Vue, Sass, Web
  Components, Angular, Tailwind, etc.), Features (code examples, open source,
  usage guidelines, accessibility, tone of voice, unmaintained, research)
- **Sort:** date, name, component count
- **Per-entry data:** logo, name, company, tech tags, feature tags, links out
  to Figma/GitHub/Storybook
- **Notably:** has an "Unmaintained" tag — closest of the four to flagging
  health, but it's a manual tag, not derived from live data
- **Strength:** best filtering UX of the four
- **Gap:** no quantitative health signal (stars, last commit, issues)

## designsystem.gallery/design-systems

- **Structure:** card grid (returned mostly empty on fetch — likely JS-rendered
  client-side, so live count not confirmed)
- **Filtering:** Tech (React, Vue, Angular, Svelte, Web Components, Tailwind,
  Bootstrap, Figma, Sketch, Storybook, zeroheight, Supernova, Knapsack, React
  Native, Flutter, iOS, Android), Tags (accessibility, a11y, WCAG, inclusive
  design, design ops, style dictionary, tone of voice, content guidelines,
  motion design, micro-interactions, multi-brand, themeable, headless,
  zero-runtime, CSS-in-JS, RTL support, i18n, government), Colors
- **Sort:** newest first
- **Strength:** richest taxonomy/vocabulary — especially governance-style tags
  (multi-brand, themeable, headless, zero-runtime) that the others don't have
- **Gap:** still just a directory; same lack of health data

## designsystemsrepo.com/design-systems

- **Structure:** long single-page A-Z card list (~90+ entries), or "most recent"
- **Filtering:** none
- **Per-entry data:** logo, company, one-line description, single link out
- **Strength:** breadth — includes a lot of older/niche systems the others
  don't (Mineral UI, Predix, Rizzo, Fiori, etc.)
- **Gap:** no filtering at all; noticeably stale — several linked systems
  (Marvel Styleguide, MailChimp Pattern Library, Mineral UI) are long
  discontinued or dead links. This is the clearest evidence that a
  directory without live health data goes stale fast.

## designsystems.com/open-design-systems (Figma)

- **Structure:** grid of Figma Community files
- **Filtering:** none
- **Per-entry data:** logo, company, file name, Figma profile link, likes/downloads
- **Strength:** direct download/duplicate into Figma
- **Gap:** Figma-only, no code/GitHub angle, no filtering

## designsystems.surf

- **Structure:** gallery + database, split into Products (paid), Libraries
  (design systems/directories/components), Articles, Blueprints
- **Filtering:** category browsing (Libraries vs Articles), search box
- **Per-entry data:** company name, "D: n" (foundations count) / "C: n"
  (components count), resource links (Figma/repo/Storybook)
- **Sort:** none visible
- **Notably:** part marketplace — featured foundation kits sold for
  $149-$199; recent article dates (Feb-Jun 2026) suggest active curation,
  but that's editorial freshness, not a per-system health signal
- **Gap:** same as the others — no quantitative dev-health signal per system

## designsystems.one

- **Structure:** "curated gallery of 74 real-world design systems" plus
  Playbook/Foundations/Frameworks/Tools sections — closer to a learning site
  with a directory inside it than a pure directory
- **Filtering:** nav-level sections (Design Systems, Learn, AI-Ready, Tools);
  no visible tag/framework filtering on the catalog itself
- **Per-entry data:** specimen demos (type scale, color in OKLCH), component
  counts/types, visual token previews — richer per-entry visual detail than
  any of the link-out directories
- **Notably:** ships an **"AI-Ready Index"** — tracks 37 systems across five
  AI-readiness signals (framing unclear from the page alone: likely things
  like structured/machine-readable tokens, MCP/LLM tooling, documented
  component APIs). This is a genuinely different axis from dev-health
  (maintenance) — worth a line in `brainstorm.md` as a possible future
  signal, distinct from our health label, not a replacement for it
- **Gap:** positions itself as free/open/no-vendor-funnel, but the directory
  is secondary to its educational content; no live GitHub/npm health data

## The pattern across all six

Every one of them is fundamentally a **linkout directory**: a card, a logo, a
click-through. None of them answer the question a developer actually has —
"is this thing still maintained, and is it worth adopting?" — without making
you leave the site and check GitHub/npm yourself.

That's the wedge for this project.
