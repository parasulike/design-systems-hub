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

## The pattern across all four

Every one of them is fundamentally a **linkout directory**: a card, a logo, a
click-through. None of them answer the question a developer actually has —
"is this thing still maintained, and is it worth adopting?" — without making
you leave the site and check GitHub/npm yourself.

That's the wedge for this project.
