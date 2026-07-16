# Data schema (draft)

Each design system entry is split into two layers: data curated once by hand,
and data refreshed automatically from live sources. This split is the core of
the product — the "live" half is what no competitor has.

## Curated (set once, edited rarely)

| Field | Type | Example |
|---|---|---|
| `id` | slug | `carbon` |
| `name` | string | "Carbon Design System" |
| `company` | string | "IBM" |
| `description` | string (1-2 sentences) | "IBM's open-source design system..." |
| `site_url` | url | https://www.carbondesignsystem.com/ |
| `github_repo` | `owner/repo` | `carbon-design-system/carbon` |
| `figma_url` | url \| null | |
| `sketch_url` | url \| null | |
| `storybook_url` | url \| null | |
| `tokens_url` | url \| null | |
| `migration_url` | url \| null | |
| `npm_package` | string \| null | `@carbon/react` |
| `frameworks` | string[] | `["React", "Angular", "Vue", "Svelte", "Web Components"]` |
| `guidance` | enum[] | `["accessibility", "forms", "dark-mode"]` |
| `best_for` | enum[] | `["enterprise", "data-heavy-products"]` |
| `recommended_rank` | positive integer | `1` |
| `license` | string | "Apache-2.0" |
| `token_format` | string \| null | "Style Dictionary" |
| `theming` | enum | `none` \| `single-brand` \| `multi-brand` |
| `tags` | string[] | Legacy discovery metadata. Keep during migration, but do not expose as a primary filter. |

### Filter vocabulary

Resources are derived from existing link fields instead of being duplicated:

- Design: `figma_url`, `sketch_url`, `tokens_url`
- Developer: `github_repo`, `storybook_url`, `npm_package`
- Guidance: `site_url`, `migration_url`

Allowed `guidance` values:

- `accessibility`
- `content`
- `motion`
- `forms`
- `data-visualization`
- `internationalization`
- `dark-mode`
- `navigation`
- `responsive-design`

Allowed `best_for` values:

- `enterprise`
- `commerce`
- `public-services`
- `consumer-products`
- `content-heavy-products`
- `developer-tools`
- `data-heavy-products`
- `multi-brand-products`

### Sorting

Sorting does not require another stored field except `recommended_rank`:

- Recommended: `recommended_rank`
- Recently updated: latest of `latest_release_at` and `last_commit_at`
- Name A–Z: `name`
- Most GitHub stars: `stars`
- Most downloaded: `npm_weekly_downloads`

The new curated fields are optional while the existing entries are researched.
Make them required after the catalog migration is complete.

## Live (fetched on a schedule, e.g. daily/weekly)

| Field | Source | Example |
|---|---|---|
| `stars` | GitHub API | 7,400 |
| `open_issues` | GitHub API | 312 |
| `last_commit_at` | GitHub API | 2026-06-20 |
| `contributors_count` | GitHub API | 480 |
| `latest_release_tag` | GitHub API | `v11.58.0` |
| `latest_release_at` | GitHub API | 2026-06-10 |
| `npm_weekly_downloads` | npm API | 185,000 |
| `npm_package_size_kb` | npm/bundlephobia | 142 |

## Derived

| Field | How it's computed |
|---|---|
| `health_score` | Composite of recency of last commit, issue close rate, release cadence. Display as a simple label (e.g. Active / Slowing / Stale) rather than a raw score — a number invites false precision. |

## Open questions

- GitHub API rate limits (60/hr unauthenticated, 5,000/hr with a token) —
  fine for a scheduled batch job, not fine for fetching on every page load.
  Cache the live data and refresh on a cron, don't fetch live per-request.
- Some systems don't publish to npm (e.g. pure Figma kits) or aren't on GitHub
  at all (e.g. some enterprise systems are public docs sites only, closed
  source) — schema needs to tolerate nulls gracefully rather than assuming
  every field is fillable for every entry.
- Multi-package systems (Carbon ships ~15 npm packages) — need a convention for
  which package represents "the" npm download/size number, or show several.
