# support-agent

A [Flue](https://flueframework.com) portfolio project: **two production-style AI agents** behind one Cloudflare Worker —
a sales assistant with real business tools, and an embeddable portfolio guide.

## The two demos

| Demo | Agent | URL (after deploy) | What it proves |
|---|---|---|---|
| Standalone sales app | `Sales` (`src/agents/sales.ts`) | `https://<worker>/` | Agent + tools (`get_pricing`, `get_case_studies`, `book_meeting`), durable per-conversation state, same-origin UI + API |
| Portfolio widget | `Guide` (`src/agents/guide.ts`) | `https://<worker>/embed.js` | Cross-origin agent API (CORS), tool-grounded answers (`list_projects`), per-visitor durable conversations |

## Setup

```sh
npm install
```

Then add a model provider API key to `.env` (any [provider Pi supports](https://pi.dev/docs/latest/providers#api-keys)).
This project uses the `google` provider:

```sh
GEMINI_API_KEY="..."
```

## Talk to your agents

```sh
npx flue run src/agents/sales.ts --message "How much does the Studio plan cost?"
npx flue run src/agents/guide.ts --message "Show me Raz's storefront work."
```

Conversations are durable — pass `--id <id>` to continue one. Try the durability story:
book a call with `Sales`, then in a later message ask *"what did I book?"*.

## Develop

```sh
npm run dev
```

- Sales demo page: `http://localhost:5173/` (served by the same Worker, same origin as the API)
- Widget script: `http://localhost:5173/embed.js`
- Sales API: `POST http://localhost:5173/agents/sales/:id` per message, `GET` for history
- Guide API: same shape under `/agents/guide/:id`

## Embed the widget in the portfolio site

```html
<script src="https://<your-worker>.workers.dev/embed.js"
        data-title="Ask about Raz"></script>
```

The script defaults to its own origin as the API base (`data-base` overrides it).
Cross-origin browsers must be on the `WIDGET_ORIGINS` allowlist in `src/app.ts`
(localhost entries included for dev) — add your portfolio domain there and redeploy.

## Deploy

```sh
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `npx flue docs` from the terminal.
