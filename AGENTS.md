# AGENTS.md

This is a [Flue](https://flueframework.com) project: agents are TypeScript functions.

## Layout

- `src/agents/` — agent modules. A module whose first line is the `'use agent'` directive exports agents: every exported capitalized function is one, and the function name is its durable identity.
  - `sales.ts` — `Sales`, the Pulseboard sales assistant (tools + durable bookings).
  - `guide.ts` — `Guide`, the embeddable portfolio assistant for Raz.
- `src/tools/` — `defineTool` definitions mounted via `useTool` (`sales.ts`, `projects.ts`).
- `src/data/` — sample business data (`catalog.ts`) and portfolio data (`projects.ts`).
- `src/web/` — `demo.html` (standalone sales demo, served at `/`) and `embed.js` (portfolio widget, served at `/embed.js`), both bundled via `?raw` imports in `app.ts`.
- `src/app.ts` — the route map; every route is mounted here explicitly (agent mounts, CORS for `/agents/guide/*`, demo page, widget, health).
- `src/cloudflare.ts` — Worker-level exports and non-HTTP handlers.
- `wrangler.jsonc` — Worker config; every agent needs a Durable Object migration entry.

## Commands

- `npx flue run src/agents/sales.ts --message "Hi"` — run an agent locally, no server.
- `npx flue run src/agents/guide.ts --message "Hi"` — same for the guide.
- `npm run dev` — start the dev server (demo page at `/`).
- `npm run deploy` — build and deploy the Worker.
- `npm run check:types` — typecheck.
- `npx flue docs search <query>` — search the Flue docs from the terminal (then `flue docs read <path>`).
- `npx flue add` — list blueprints for adding channels, sandboxes, and databases.

## Notes

- `hono` is pinned to exactly `4.12.32` to match `@flue/runtime`'s own dependency (newer 4.x breaks `check:types` on `app.route(...)`).
- `GEMINI_API_KEY` must be set in `.env` for local runs; as a Worker secret (`wrangler secret put`) in production.
- If the interactive shell exports an empty `GEMINI_API_KEY`, it shadows `.env` (shell wins) and runs fail with "Provider is not configured: google" — unset it in that shell.
