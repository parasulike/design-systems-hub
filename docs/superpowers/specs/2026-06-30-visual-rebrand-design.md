# Visual rebrand: Linear-leaning restyle

## Context

The "Build Design Atlas" vision doc (shared in conversation, 2026-06-30, not
yet saved to `docs/`) sets a new product vision for this project — an
editorial, exploration-first platform (Apple/Linear/Notion/Stripe Docs
inspired) rather than a plain directory. That vision describes ~9
independent subsystems (Design System detail pages, Compare, Component
Explorer, Learn, Borrow Ideas, AI Search, CMS/Admin, plus the visual
rebrand itself). Each needs its own spec; this document covers only the
**visual rebrand** — the first slice, chosen because it's self-contained
and doesn't block on new schema or content types.

The existing frontend (`app/`, `components/`) was built earlier as a plain
Next.js + CSS Modules catalog with Geist fonts and OS-only dark mode. This
spec restyles that existing surface — it does not add new pages, new data,
or new dependencies.

## Decisions

- **No new tooling.** Stay on CSS Modules. Do not adopt Tailwind, shadcn/ui,
  or Framer Motion for this pass, even though the vision doc names them —
  that's a larger migration to consider once more pages exist to justify
  the cost. All visual changes are CSS-only.
- **Visual anchor: Linear**, not Apple/Notion/Stripe. Dark-first, sharp,
  dense-but-clean, technical. (Of the four references in the vision doc,
  this is the one explicitly chosen — the others remain reference points
  for later subsystems, not this one.)
- **Dark mode stays OS-only** (`prefers-color-scheme`). No toggle, no
  localStorage persistence, no "dark by default regardless of OS" override
  — that's deferred, not in scope here.
- **Motion: CSS-only**, no JS animation library. Hover/focus transitions,
  a card hover-lift, and a subtle load fade-in, all gated behind
  `@media (prefers-reduced-motion: no-preference)`.
- **Monochrome palette, no brand accent color.** Color is reserved
  exclusively for `HealthBadge` (Active/Slowing/Stale/Unknown), desaturated
  slightly to read correctly against the darker background. Everything
  else — borders, buttons, links — is grayscale.
- **Scope is existing pages only.** No Design System detail page, no new
  routes. Touches: `app/globals.css`, `app/layout.tsx` (no font change),
  `components/Hero.tsx` + `.module.css`, `components/CatalogView.tsx` +
  `.module.css`, `components/FilterBar.tsx` + `.module.css`,
  `components/SystemCard.tsx` + `.module.css`, `components/HealthBadge.tsx`
  + `.module.css`.

## Design

### Palette (CSS custom properties in `app/globals.css`)

Replace today's solid hex borders (`#333333` dark / `#eaeaea` light) with
low-alpha white/black borders — Linear's signature subtle-border look,
used for elevation instead of shadows.

| Token | Dark | Light |
|---|---|---|
| `--background` | `#0a0a0b` | `#ffffff` |
| `--background-elevated` | `#111113` | `#fafafa` |
| `--foreground` | `#ededed` (unchanged) | `#171717` (unchanged) |
| `--gray-muted` | `#8b8b8f` | `#6b6b70` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| `--border-hover` | `rgba(255,255,255,0.16)` | `rgba(0,0,0,0.16)` |
| `--radius` | `6px` (was `8px`) | same |

No new accent token. `HealthBadge` keeps its own four semantic colors
(green/yellow/red/gray) but desaturated ~10-15% to avoid clashing with the
darker background.

### Typography

Keep Geist Sans/Mono (`app/layout.tsx` unchanged) — already fits a
technical/editorial register, no font swap needed.

- Hero H1: `2.25rem` → `3.5rem`, weight 600, `letter-spacing: -0.02em`,
  `line-height: 1.05`.
- Hero nav logo: tighten tracking slightly, reduce to `0.85rem`.
- Hero body copy: `1.05rem` → `1.1rem`, color `var(--gray-muted)`,
  constrain `max-width` for readability.
- Stats values (already monospace): bump from `1.5rem` to `1.65rem`,
  lean further into the technical/mono feel.

### Shape & elevation

- `--radius` drops `8px` → `6px` across cards, buttons, badges, selects —
  Linear avoids soft/pill radii outside of true pills (tags).
- Remove all `box-shadow` declarations. Elevation comes from the
  `--border` / `--border-hover` tokens only.
- Tags: keep pill shape (`999px`, that's a deliberate exception, not a
  general radius), but background changes from solid light-gray
  (`#f3f4f6`) to `rgba(255,255,255,0.06)` + a `1px solid var(--border)`
  outline, so they read as outlined chips, not filled candy-pills.

### Motion (`SystemCard.module.css`, `Hero.module.css`, global)

- Card hover: `transform: translateY(-2px)` + `border-color:
  var(--border-hover)`, `transition: transform 150ms ease, border-color
  150ms ease`.
- Buttons/links hover: existing opacity/color transitions kept, timing
  normalized to `150ms ease`.
- Catalog grid: a one-time fade-in on mount (`opacity 0→1`,
  `translateY(4px)→0`, ~200ms), CSS `@keyframes`, not JS-triggered.
- All of the above wrapped in `@media (prefers-reduced-motion: no-preference)`
  — under reduced-motion, no transform/opacity animation runs (instant
  state change only).

### Out of scope (explicitly deferred, not part of this slice)

- Tailwind/shadcn/Framer Motion migration
- Dark-mode toggle + persistence
- Brand accent color
- Any new page, route, or content field
- Component restructuring (no `.tsx` logic changes, CSS/markup-level only
  unless a class needs adding for a new visual state like hover-lift)

## Verification

No build/test suite exists for this frontend beyond `next build` +
`eslint`. Verification is visual:

1. `npm run dev`, view `/` in both light and dark OS modes (toggle via
   OS settings or browser devtools rendering emulation).
2. Confirm: cards show border-based elevation (no shadow), hover lifts +
   brightens border, tags read as outlined chips, hero type is
   noticeably larger/tighter, stats are monospace and slightly bigger.
3. Confirm `prefers-reduced-motion: reduce` (devtools emulation) disables
   the card-lift transform and the catalog fade-in.
4. `npm run lint` and `npm run build` both pass (no new TS/ESLint errors
   from the CSS-module-only changes — should be a no-op check since no
   `.tsx` prop/logic changes are expected, only className/style additions
   if a hover state needs a new class hook).
