// Raz's shipped work, mirrored 1:1 from the portfolio site (E:/Mine/portfolio/app.js).
// Titles, URLs, and blurbs are copied verbatim so the Guide agent's links and
// descriptions never drift from the site. `tags` match the portfolio's own
// filter chips (landing / store / dashboard); `section` matches its tabs.

export type ProjectTag = 'landing' | 'store' | 'dashboard';

export type Project = {
	name: string;
	url: string;
	section: 'SaaS & AI' | 'Commerce' | 'Apps & product' | 'Brand & sites';
	tags: ProjectTag[];
	blurb: string;
};

export const PROJECTS: Project[] = [
	{ name: 'Real Estate 2', url: 'https://raz-real-estate2.vercel.app/', section: 'Brand & sites', tags: ['store', 'landing'], blurb: 'Exclusive Swiss construction projects around Zürich.' },
	{ name: 'Motherhood IVF', url: 'https://raz-motherhood-ivf.vercel.app/', section: 'Brand & sites', tags: ['landing'], blurb: 'Fertility and IVF clinic with treatments, success stories and EMI plans.' },
	{ name: 'Furniro', url: 'https://raz-furniro-landing-page.vercel.app/', section: 'Commerce', tags: ['landing', 'store'], blurb: 'Furniture store with handcrafted collections and room inspiration.' },
	{ name: 'Atelier Elysée', url: 'https://raz-atelier-elysee.vercel.app/', section: 'Commerce', tags: ['store', 'landing'], blurb: 'Interior architecture atelier for bespoke residences and estates.' },
	{ name: 'Boutique', url: 'https://raz-boutique.vercel.app/#process', section: 'Commerce', tags: ['store', 'landing'], blurb: 'Designer fashion rental house for bridal wear in Lajpat Nagar.' },
	{ name: 'NovaVoice', url: 'https://raz-novavoice-landing-page.vercel.app/', section: 'SaaS & AI', tags: ['landing'], blurb: 'Voice OS for desktop — product landing with features and pricing.' },
	{ name: 'TaxPilot', url: 'https://raz-taxpilot-landing-page.vercel.app/index.html', section: 'SaaS & AI', tags: ['landing'], blurb: 'AI tax copilot landing page.' },
	{ name: 'Glow AI', url: 'https://raz-glow-ai.vercel.app/', section: 'SaaS & AI', tags: ['landing'], blurb: 'AI product photography landing page.' },
	{ name: 'SaaS DeepSeek', url: 'https://raz-saas-landingdeepseek.vercel.app/', section: 'SaaS & AI', tags: ['landing'], blurb: 'Testimonial platform that turns customer love into growth.' },
	{ name: 'Business Copilot', url: 'https://raz-info-business-copilot.vercel.app/#', section: 'SaaS & AI', tags: ['dashboard'], blurb: 'Marketplace consultancy launching Indian brands on Amazon, Flipkart and more.' },
	{ name: 'Memory Mirror', url: 'https://raz-memory-mirror.vercel.app/', section: 'SaaS & AI', tags: ['dashboard'], blurb: 'Memory-training app with calming visual exercises for personal memories.' },
	{ name: 'PetiChat', url: 'https://raz-petichat.vercel.app/', section: 'SaaS & AI', tags: ['dashboard'], blurb: 'Pre-order page for an AI pet-translator collar with GPS tracking.' },
	{ name: 'Quick Cab', url: 'https://raz-quick-cab.vercel.app/', section: 'Apps & product', tags: ['dashboard', 'store'], blurb: 'Premium car rental and cab booking site.' },
	{ name: 'MapLink', url: 'https://raz-maplink.vercel.app/', section: 'Apps & product', tags: ['dashboard'], blurb: 'Map-based link-sharing app.' },
	{ name: 'Studio Register', url: 'https://raz-studio-register.vercel.app/', section: 'Apps & product', tags: ['dashboard'], blurb: 'Independent type and design studio — typefaces and editorial systems.' },
	{ name: 'SRC', url: 'https://raz-src.vercel.app/#', section: 'Apps & product', tags: ['dashboard', 'landing'], blurb: 'Strength-tracking wearable (Liftband) product page.' },
	{ name: 'WebGL Landing', url: 'https://raz-webgl-landing.vercel.app/', section: 'Brand & sites', tags: ['landing'], blurb: 'Landing for Orchid, an AI executive assistant for founders.' },
	{ name: 'Pocky Web', url: 'https://raz-pocky-web.vercel.app/', section: 'Brand & sites', tags: ['landing'], blurb: 'Developer portfolio for Alex — AI and software projects.' },
	{ name: 'Hero Figma', url: 'https://raz-hero-figma.vercel.app/', section: 'Brand & sites', tags: ['landing'], blurb: 'Afterglow — a keepsake-moments themed hero page.' },
	{ name: 'Clipflow', url: 'https://clipflow-app.vercel.app/', section: 'Apps & product', tags: ['dashboard'], blurb: 'Interactive video-commerce for product videos and live shopping.' },
	{ name: 'Template', url: 'https://raz-template.vercel.app/', section: 'Brand & sites', tags: ['landing'], blurb: 'Architecture-studio style template with project showcases.' },
];
