# FAWN

Cloudflare-native monorepo targeting Workers, D1, R2, and Pages.

## Architecture overview

- `apps/web` — Cloudflare Pages app (static placeholder today).
  - Entry point: `apps/web/public/index.html`
- `apps/worker` — Cloudflare Worker API.
  - Entry point: `apps/worker/src/index.ts`
- `packages/ui` — Shared UI package for frontend components.
  - Entry point: `packages/ui/src/index.ts`

## Local development

1. Install dependencies from the repo root:
   ```bash
   npm install
   ```
2. Run the Worker locally:
   ```bash
   npm run --workspace @fawn/worker dev
   ```
3. Run Pages locally:
   ```bash
   npm run --workspace @fawn/web dev
   ```

## Scripts

From the repo root:

- `npm run lint` — lint all workspaces.
- `npm run format` — format with Prettier.
- `npm run format:check` — check formatting.
- `npm run typecheck` — typecheck with project references.

Per workspace:

- `npm run --workspace @fawn/worker dev` — start Worker via Wrangler.
- `npm run --workspace @fawn/worker deploy` — deploy Worker.
- `npm run --workspace @fawn/web dev` — start Pages dev server.
- `npm run --workspace @fawn/web deploy` — deploy Pages.

## Environment variables

Copy `.env.example` to `.env` and fill in Cloudflare bindings:

- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account id.
- `CLOUDFLARE_API_TOKEN` — API token with Workers/D1/R2 permissions.
- `D1_DATABASE_ID` — D1 database id for the Worker.
- `D1_DATABASE_NAME` — local D1 database name.
- `R2_BUCKET_NAME` — R2 bucket name for assets.
- `R2_BUCKET_LOCATION` — region for the bucket.
- `WORKER_ENV` — environment name (development/production).
- `PAGES_PROJECT_NAME` — Pages project name.
