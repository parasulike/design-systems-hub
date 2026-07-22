# Experimental API

This Express/PostgreSQL service is an experimental migration path. The deployed
Next.js application currently uses the versioned JSON files in `data/` through
`lib/catalog.ts` as its source of truth.

Do not update catalog content only in PostgreSQL until the application is moved
to this API.
