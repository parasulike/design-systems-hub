# Design Atlas

A catalog of publicly available design systems — built to be actually *useful* for
designers and developers, not just a list of logos that link out.

## Why this exists

There are already a few directories of design systems:

- [component.gallery](https://component.gallery/design-systems/) — good filtering (platform/tech/features), screenshots
- [designsystem.gallery](https://designsystem.gallery/design-systems) — richest tag taxonomy (multi-brand, headless, RTL, i18n, style-dictionary, etc.)
- [designsystemsrepo.com](https://designsystemsrepo.com/design-systems/) — biggest A-Z list, but no filtering and many dead links
- [designsystems.com/open-design-systems](https://www.designsystems.com/open-design-systems/) — Figma Community embed only

**The shared gap:** none of them tell you whether a system is actually *alive*.
Is it still maintained? Last commit? Open issues piling up? Real adoption (npm downloads)?
You have to click through to GitHub yourself for every single entry.

## What we're building

A catalog where the **standout feature is dev-focused health & metadata**:

- Pulled live from GitHub/npm: stars, last commit date, open issues, contributors,
  latest release, weekly npm downloads, package size
- Curated once per system: framework(s), license, token format, theming support,
  links (site / GitHub / Figma / Storybook / npm)
- A computed "maintenance health" signal per system, instead of a logo and a vibe

Format: browser-based web catalog/directory (not a Figma plugin, at least for v1).

## Project structure

```
design-systems-hub/
├── README.md              ← you are here
└── docs/
    ├── competitor-analysis.md   ← what exists today, structured
    ├── data-schema.md           ← the data model for each design system entry
    ├── roadmap.md                ← phased build plan
    └── brainstorm.md             ← open ideas, not yet committed to
```

## Status

🟡 Brainstorming / scoping phase. No code yet — see `docs/roadmap.md` for the plan.
