# Detail page data structure

## Context

Sub-project 2 of the Design Atlas platform (after visual rebrand). Adds the
data layer needed for per-system detail pages: `/design-systems/[slug]`. UI
will be designed in Figma first and implemented after; this spec covers only
the data structure (schema, seed format, API extension) and the markdown
rendering dependency.

The prototype at `app/design-systems/[slug]/page.tsx` exists as a structural
reference for Figma — it will be rebuilt from the Figma design later. The
data decisions below are what lock in now.

## Decisions

- **Content storage:** plain TEXT columns (markdown strings) for editorial
  sections, standard SQL types for quick-fact fields. No JSONB blobs, no MDX
  pipeline.
- **Markdown in TEXT:** all editorial TEXT fields store markdown. The Next.js
  page renders them via `react-markdown`. Content in seed JSON is written as
  markdown strings.
- **paras_notes:** separate table (one row per design system, five TEXT
  columns). Keeps Paras Notes editable independently of the main curated
  record, and makes it easy to query systems that have/haven't had notes
  written yet.
- **List endpoint stays lean:** `GET /design-systems` does not include the
  heavy TEXT content fields (design_philosophy, accessibility, etc.). Detail
  endpoint (`GET /design-systems/:slug`) includes everything.
- **Data source:** Next.js detail page fetches from Express API
  (`localhost:3001/design-systems/:slug`), per the existing "everything
  through API" architecture decision.

## Schema — migration 002

```sql
-- New columns on design_systems (all nullable — graceful empty state)
ALTER TABLE design_systems
  ADD COLUMN IF NOT EXISTS industry            TEXT,
  ADD COLUMN IF NOT EXISTS launch_year         INT,
  ADD COLUMN IF NOT EXISTS open_source         BOOLEAN,
  ADD COLUMN IF NOT EXISTS design_philosophy   TEXT,
  ADD COLUMN IF NOT EXISTS accessibility       TEXT,
  ADD COLUMN IF NOT EXISTS developer_experience TEXT,
  ADD COLUMN IF NOT EXISTS governance          TEXT,
  ADD COLUMN IF NOT EXISTS contribution_process TEXT;

-- New paras_notes table
CREATE TABLE IF NOT EXISTS paras_notes (
  design_system_id    INT PRIMARY KEY REFERENCES design_systems(id) ON DELETE CASCADE,
  strengths           TEXT,
  weaknesses          TEXT,
  best_suited_for     TEXT,
  ideas_worth_borrowing TEXT,
  lessons_learned     TEXT
);
```

All new columns default NULL. Empty sections on the detail page show a
"Content coming soon" placeholder rather than erroring.

## Seed JSON extension

Each `db/seed/*.json` file gains an optional `detail` object and optional
`paras_notes` object. If absent or null, the seed script skips them
gracefully.

```json
{
  "slug": "shadcn-ui",
  "...(existing fields)...",
  "detail": {
    "industry": "Developer Tooling",
    "launch_year": 2023,
    "open_source": true,
    "design_philosophy": "## Copy, don't install\n\nshadcn/ui inverts the...",
    "accessibility": "## Delegated to Radix UI\n\nAll WAI-ARIA patterns...",
    "developer_experience": "## CLI-first\n\n`npx shadcn@latest add <component>`...",
    "governance": "## Single-author\n\nMaintained by shadcn...",
    "contribution_process": "## GitHub PRs\n\nOpen PRs welcome..."
  },
  "paras_notes": {
    "strengths": "## What works well\n\n- Lowest friction...",
    "weaknesses": "## Watch out for\n\n- Not a true design system...",
    "best_suited_for": "Teams building product UIs with Tailwind already in use.",
    "ideas_worth_borrowing": "## CLI-based distribution\n\nWorth considering for...",
    "lessons_learned": "## The copy-paste tax\n\nConsumers never receive upstream fixes..."
  }
}
```

## API extension

`GET /design-systems/:slug` query adds:
- `LEFT JOIN paras_notes pn ON pn.design_system_id = ds.id`
- Selects all 8 new `ds.*` columns
- `CASE WHEN pn.design_system_id IS NULL THEN NULL ELSE row_to_json(pn.*) END AS paras_notes`

Response shape (new fields):
```json
{
  "slug": "shadcn-ui",
  "industry": "Developer Tooling",
  "launch_year": 2023,
  "open_source": true,
  "design_philosophy": "## Copy, don't install\n\n...",
  "accessibility": "...",
  "developer_experience": "...",
  "governance": "...",
  "contribution_process": "...",
  "paras_notes": {
    "strengths": "...",
    "weaknesses": "...",
    "best_suited_for": "...",
    "ideas_worth_borrowing": "...",
    "lessons_learned": "..."
  },
  "metrics": { "..." }
}
```

`GET /design-systems` (list) does NOT change — existing response shape only.

## Next.js dependency

Add `react-markdown` to `package.json` (root Next.js app). Used by the
detail page to render TEXT markdown fields. No remark/rehype plugins needed
for v1 — default rendering (paragraphs, headings, lists, bold, code) is
sufficient.

## Seed content plan

For v1 launch: write `detail` + `paras_notes` for **shadcn-ui** and
**Carbon** as the two fully-populated entries. All other 13 systems ship
with null content (empty state shown on page). Content is filled in
incrementally as Paras Notes are written.

## Verification

```bash
# In api/
npm run migrate    # applies 002_detail_fields.sql
npm run seed       # re-seeds with new detail + paras_notes fields

# Confirm
psql -d design_systems_hub -c "\d design_systems"   # shows 8 new columns
psql -d design_systems_hub -c "SELECT count(*) FROM paras_notes;"  # 2 (shadcn + carbon)

# API
cd api && npm start
curl -s http://localhost:3001/design-systems/shadcn-ui | jq '.design_philosophy,.paras_notes'
curl -s http://localhost:3001/design-systems/carbon | jq '.design_philosophy,.paras_notes'
curl -s http://localhost:3001/design-systems/polaris | jq '.design_philosophy'  # should be null
```
