<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

**Product:** Design Atlas — a Next.js 16 catalog of public design systems. Data comes from versioned JSON in `data/`; no database is required for the web app.

**Required service:** Next.js dev server only (`http://localhost:3000`). The experimental Express/PostgreSQL API in `api/` is not consumed by the frontend and is optional.

**Start dev server:** From repo root, `npm run dev`. Use a tmux session for long-running processes.

**Checks (match CI):** See `README.md` — `npm run lint`, `npm run check:filters`, `npm run build`.

**Optional:** `npm run fetch-live-data` refreshes `data/live.json` (set `GITHUB_TOKEN` to avoid rate limits). Not needed for local UI development.
