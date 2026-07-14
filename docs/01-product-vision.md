# Product Vision — North Star

> Design Atlas exists to become the most trusted learning resource for
> design systems—not the largest collection of them.

> Internal name: **The Operating System for Design Systems.**
> "Design Atlas" above is the mission tagline — do not use it as the
> internal product name in docs, code, or specs. Everything in this doc
> and every spec that follows from it stems from the name above.

This is the north star all sub-project specs derive from. It does not
itself contain an implementation plan. Sub-projects (visual rebrand,
Design System detail pages, Compare, Component Explorer, Learn, Borrow
Ideas, AI Search, CMS/Admin) each get their own dated spec under
`docs/superpowers/specs/`, scoped against this vision rather than against
each other.

## Vision

This is not a gallery of design systems.

It is a platform for learning how great design systems are built.

Instead of simply cataloguing design systems, it helps designers,
engineers, and product teams understand the reasoning behind them, compare
implementation approaches, borrow proven ideas, and build better systems
of their own.

The experience should feel closer to learning from experienced
practitioners than browsing documentation.

---

## Positioning

Current competitors focus primarily on documentation.

Examples: Component Gallery, Design Systems Gallery, DesignSystems.com.

They answer: **"What design systems exist?"**

This product answers: **"How should I build mine?"**

---

## Experience Principles

Every interaction should teach something.

Users should leave every page having learned a new design principle,
component pattern, implementation strategy, or accessibility insight.

The experience is editorial rather than directory-driven.

Documentation is the source. Learning is the product.

---

## Core User Journey

Instead of:

Browse → Find → Leave

This product encourages:

Discover → Learn → Compare → Borrow → Build

Every page should naturally lead users to the next stage.

---

## Primary Navigation

Navigation should reflect how designers think — organized around user
intent, not primarily by company.

Top-level navigation:

- Discover
- Components
- Foundations
- Compare
- Learn
- Resources
- AI Search

Design systems remain searchable and discoverable but are not the primary
organizational model.

---

## Homepage

The homepage should behave more like a knowledge platform than a marketing
website.

Primary focus: **Search**.

Secondary: Featured Design Systems, Popular Components, Recently Updated,
Trending Comparisons, Learning Articles, Ideas Worth Borrowing.

The search experience should feel like the starting point of the product.

---

## Search Philosophy

Search should understand intent rather than keywords.

Examples:

- "Best enterprise design systems"
- "Compare Material vs Carbon"
- "Show excellent data table patterns"
- "How should I document design tokens?"

Search should eventually evolve into an AI-assisted discovery experience.

---

## Learning First

Every page should answer one or more of these questions:

- Why does this exist?
- What problem does it solve?
- Who is it designed for?
- When should I use it?
- What trade-offs does it make?
- What ideas can I borrow?
- What would I do differently?

---

## Components Before Companies

Designers usually search for solutions rather than companies.

"I need a better table" — not "I want Carbon."

Therefore components become first-class citizens. Every component should
have its own landing page: Button, Dialog, Data Table, Wizard, Breadcrumb,
Tree View, Navigation, Charts.

Each page compares implementations across multiple design systems.

---

## Paras Notes

Every Design System and Component page should include a section called
**Paras Notes**.

These are editorial observations written from the perspective of someone
who has built enterprise design systems. They are not reviews. They
explain:

- What works well
- What could improve
- Best suited for
- Lessons learned
- Ideas worth borrowing

The goal is education rather than scoring.

---

## Compare Experience

Comparison is one of the core differentiators. Users should be able to
compare: Design Systems, Components, Accessibility, Documentation, Design
Tokens, Governance, Developer Experience.

The comparison experience should prioritize clarity over density.

---

## Borrow Ideas

Every page should surface reusable patterns: Best Empty States, Best Table
Design, Best Loading Experience, Best Navigation, Best Design Token
Structure, Best Accessibility Documentation.

The platform should encourage inspiration rather than imitation.

---

## Editorial Style

Content should feel thoughtful, practical, opinionated, educational. Never
corporate, never marketing-heavy.

Every article should teach. Every comparison should explain. Every page
should leave the reader more informed than before.

---

## Visual Direction

The experience should combine: Linear's precision, Apple's storytelling,
Notion's readability, Stripe Documentation's clarity.

Large typography. Editorial layouts. Generous whitespace. Minimal color.
Subtle motion. High-quality imagery.

The UI should disappear behind the content.

(Note: the in-progress [visual rebrand
spec](superpowers/specs/2026-06-30-visual-rebrand-design.md) narrows this
down to a Linear-leaning anchor for its specific slice — existing pages
only, no new tooling. Later subsystems may draw more from Apple/Notion/
Stripe Docs as appropriate to their content.)

---

## Success Metric

A visitor should finish using the product and think:

**"I understand why this design decision exists."**

Not: "I found another design system."

That difference defines the product.
