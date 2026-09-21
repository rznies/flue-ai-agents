import { createAgentRouter } from '@flue/runtime/routing';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Guide } from './agents/guide.ts';
import { Sales } from './agents/sales.ts';
import demoHtml from './web/demo.html?raw';
import embedJs from './web/embed.js?raw';

const app = new Hono();

// Standalone sales demo: same-origin UI + API, no CORS needed.
app.route('/agents/sales', createAgentRouter(Sales));

// Embeddable portfolio guide: browsers call this cross-origin from the
// portfolio site, so it carries CORS headers. The agent router sets none
// itself. Add your portfolio's production origin below and redeploy —
// anything not on the list gets no CORS headers (browser-blocked).
const WIDGET_ORIGINS = [
	'http://localhost:5173',
	'http://localhost:3000',
	'https://portfolio-razparkr-gmailcoms-projects.vercel.app',
];
app.use(
	'/agents/guide/*',
	cors({
		origin: (origin) => (WIDGET_ORIGINS.includes(origin) ? origin : null),
		exposeHeaders: ['Stream-Next-Offset', 'Stream-Up-To-Date', 'Location'],
	}),
);
app.route('/agents/guide', createAgentRouter(Guide));

// Standalone demo page (same Worker, same origin as the sales API).
app.get('/', (c) => c.html(demoHtml));

// One-tag widget for the portfolio site: <script src="<worker>/embed.js">.
app.get('/embed.js', (c) => {
	c.header('Content-Type', 'application/javascript; charset=utf-8');
	c.header('Cache-Control', 'public, max-age=3600');
	return c.body(embedJs);
});

app.get('/health', (c) => c.json({ ok: true }));

export default app;
