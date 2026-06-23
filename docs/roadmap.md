# Roadmap (draft)

## Phase 0 — Scoping (we're here)
- [x] Survey existing directories, identify the gap (this doc set)
- [ ] Lock the v1 schema (see `data-schema.md`)
- [ ] Pick the stack
- [ ] Seed list: ~15-20 well-known systems to launch with
      (Carbon, Polaris, Primer, Atlassian, Material, Spectrum, Lightning,
      Fluent UI, Ant Design, Chakra, Radix, shadcn/ui, GOV.UK, USWDS, PatternFly)

## Phase 1 — Static catalog, real data
- Hand-curate the seed list's static fields
- One-off script to pull live GitHub/npm data for the seed list
- Basic filterable grid: framework, license, theming, tags
- Each card shows: name, company, frameworks, license, and a maintenance
  health label (Active / Slowing / Stale) computed from live data

## Phase 2 — Automation
- Scheduled job to refresh live data (daily/weekly) instead of a manual script
- Submission flow so others can suggest a system to add (curated fields only;
  live fields always computed, never user-submitted, so the health signal
  stays trustworthy)

## Phase 3 — The comparison feature
- Pick 2-3 systems, see their live data side by side
- Stretch: pull a shared component (e.g. primary button) screenshot/render
  per system for visual side-by-side, similar to what component.gallery
  does per-component but framed as a comparison rather than a single gallery

## Explicitly out of scope for v1
- Figma plugin / in-Figma experience
- Live rendering of components from each design system's actual code (high
  effort — different frameworks, different build steps — revisit only if v1
  gets traction)
- User accounts / saved lists
