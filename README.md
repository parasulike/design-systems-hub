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
├── app/                 # Next.js App Router pages and global styles
├── components/          # Shared React components and CSS Modules
├── data/                # Canonical catalog and generated live metadata
├── lib/                 # Catalog assembly, filtering, health, and types
├── public/              # Logos, icons, and catalog covers
├── scripts/             # Import, refresh, and validation scripts
├── docs/                # Product research, decisions, and specifications
├── api/                 # Experimental Express/PostgreSQL migration path
└── db/                  # Experimental API migrations and seed data
```

## Architecture

The deployed application is a Next.js 16 App Router site. Catalog pages are
generated from the versioned JSON files in `data/`; `lib/catalog.ts` is the
single application entry point for that data.

The service in `api/` is experimental and is not consumed by the Next.js app.
See `api/README.md` before changing database content.

## Local development

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run check:filters
npm run build
```

## Data refresh

`npm run fetch-live-data` refreshes `data/live.json` using GitHub, npm, and
Bundlephobia. Set `GITHUB_TOKEN` to avoid GitHub's anonymous rate limit. A
scheduled GitHub Actions workflow runs the same refresh daily.
