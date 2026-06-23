# Pilot: shadcn/ui — Dialog

## What a dev sees

`npx shadcn@latest add dialog` (or copy-paste from the docs) drops a `Dialog`,
`DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`,
`DialogDescription`, and `DialogFooter` into `components/ui/dialog.tsx`. It
renders, it looks styled, it works. Most devs stop there.

## What's actually underneath

shadcn/ui doesn't implement dialog behavior itself. It's a thin Tailwind
styling layer wrapped around **Radix UI's Dialog primitive** — shadcn's own
docs point straight at the Radix UI documentation for the behavioral
details. Radix's primitive in turn implements the **WAI-ARIA Dialog (Modal)
design pattern** — the W3C's accessibility specification for how a modal
should behave for keyboard and screen reader users.

So the dependency chain is:

```
shadcn/ui Dialog (Tailwind classes, your copy of the code)
        ↓ wraps
Radix UI Dialog primitive (unstyled, headless, the actual behavior)
        ↓ implements
WAI-ARIA Dialog (Modal) design pattern (the accessibility spec)
```

## Key concepts a dev should actually understand

**1. Headless/primitive pattern.** Radix ships zero visual styling — only
behavior, state, and accessibility attributes. shadcn's "component" is really
just Tailwind classes applied to Radix's parts. This is why you can restyle
a shadcn Dialog completely and never touch the part that actually matters
for correctness.

**2. Composition, not configuration.** `Dialog`, `DialogTrigger`, and
`DialogContent` are separate components you arrange yourself, not props on
one giant `<Dialog>` component. This compound-component pattern is why you
can swap in your own trigger or close button — you're rearranging parts of
a tree, not fighting a prop API.

**3. Portal rendering.** `DialogContent` renders into a portal — it gets
inserted at the end of `document.body` in the DOM, not where you wrote it in
JSX. That's a deliberate fix for z-index/overflow-clipping bugs that plague
hand-rolled modals nested inside other positioned elements.

**4. Focus trapping + Escape handling.** While open, focus is programmatically
trapped inside the dialog (Tab/Shift+Tab cycle within it, can't tab out to
the rest of the page) and Escape closes it automatically. This is the part
that's genuinely hard to get right by hand and is exactly what Radix is
doing for you under the styling.

**5. Controlled vs. uncontrolled state.** The dialog's open/closed state can
be left uncontrolled (Radix manages it internally) or controlled via an
`open` prop + `onOpenChange` callback if your app needs to drive it — e.g.
closing it after a successful form submission. Devs who only copy the basic
example often don't realize this escape hatch exists until they need it.

**6. Title is not optional, even visually.** The ARIA pattern requires an
accessible title to be announced when the dialog opens. If a design calls
for no visible title, Radix's own docs say to keep `DialogTitle` in the tree
and visually hide it — not delete it. Deleting it silently breaks the
experience for screen reader users while looking fine to everyone else.

## Gotchas worth flagging to a dev team

- **Nesting inside a DropdownMenu or ContextMenu** needs care — opening a
  Dialog from inside one of those menus can fight over focus/portal
  ownership unless the Dialog is composed correctly relative to the menu.
  This is a commonly hit issue precisely because it isn't obvious from the
  basic copy-pasted example.
- **Removing the close button** (`showCloseButton={false}`) or replacing it
  with a custom control is supported, but if you do, you're now responsible
  for providing *some* accessible way to dismiss — don't strip it without
  a replacement.
- **The component you copy-pasted won't get upstream fixes.** Because
  shadcn's distribution model is "copy the source into your repo," a future
  Radix accessibility fix doesn't reach you automatically the way it would
  with a normal npm dependency upgrade. Worth knowing before assuming it's
  "maintained" the way an installed package is.

## Why this is the right pilot format

This is a ~1-page written breakdown: concept → dependency chain → key
concepts → gotchas. It assumes the reader can already use the component;
it's teaching *what's underneath*, not how to use it (shadcn's own docs
already do that well). That's the gap from the original brainstorm — and
this format took about the same effort as a short blog post, which means
it's repeatable across components and, eventually, across design systems.
