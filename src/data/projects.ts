// Raz's shipped work, mirrored from the portfolio site (E:/Mine/portfolio).
// The Guide agent serves these through the list_projects tool so its links
// never go stale in prose — update them here and the agent follows.

export type Project = {
	name: string;
	url: string;
	category: 'landing' | 'dashboard' | 'store';
	blurb: string;
};

export const PROJECTS: Project[] = [
	{ name: 'Business Copilot', url: 'https://raz-info-business-copilot.vercel.app/', category: 'dashboard', blurb: 'AI business copilot dashboard.' },
	{ name: 'Maplink', url: 'https://raz-maplink.vercel.app/', category: 'dashboard', blurb: 'Map-based listings app.' },
	{ name: 'Memory Mirror', url: 'https://raz-memory-mirror.vercel.app/', category: 'dashboard', blurb: 'Personal memory dashboard.' },
	{ name: 'PetiChat', url: 'https://raz-petichat.vercel.app/', category: 'dashboard', blurb: 'Chat product front-end.' },
	{ name: 'Quick Cab', url: 'https://raz-quick-cab.vercel.app/', category: 'dashboard', blurb: 'Ride-booking flow.' },
	{ name: 'Studio Register', url: 'https://raz-studio-register.vercel.app/', category: 'dashboard', blurb: 'Studio registration app.' },
	{ name: 'Clipflow', url: 'https://clipflow-app.vercel.app/', category: 'dashboard', blurb: 'Video workflow app.' },
	{ name: 'NovaVoice', url: 'https://raz-novavoice-landing-page.vercel.app/', category: 'landing', blurb: 'Voice-product landing page.' },
	{ name: 'Glow AI', url: 'https://raz-glow-ai.vercel.app/', category: 'landing', blurb: 'AI product landing page.' },
	{ name: 'TaxPilot', url: 'https://raz-taxpilot-landing-page.vercel.app/index.html', category: 'landing', blurb: 'Tax-tool landing page.' },
	{ name: 'Motherhood IVF', url: 'https://raz-motherhood-ivf.vercel.app/', category: 'landing', blurb: 'Clinic landing page.' },
	{ name: 'Hero Figma', url: 'https://raz-hero-figma.vercel.app/', category: 'landing', blurb: 'Design-led hero page.' },
	{ name: 'SaaS Landing', url: 'https://raz-saas-landingdeepseek.vercel.app/', category: 'landing', blurb: 'SaaS marketing site.' },
	{ name: 'Real Estate', url: 'https://raz-real-estate2.vercel.app/', category: 'landing', blurb: 'Property listings landing.' },
	{ name: 'WebGL Landing', url: 'https://raz-webgl-landing.vercel.app/', category: 'landing', blurb: 'WebGL hero experience.' },
	{ name: 'SRC', url: 'https://raz-src.vercel.app/', category: 'landing', blurb: 'Brand landing page.' },
	{ name: 'Template', url: 'https://raz-template.vercel.app/', category: 'landing', blurb: 'Reusable site template.' },
	{ name: 'Boutique', url: 'https://raz-boutique.vercel.app/', category: 'store', blurb: 'Fashion storefront.' },
	{ name: 'Furniro', url: 'https://raz-furniro-landing-page.vercel.app/', category: 'store', blurb: 'Furniture store landing.' },
	{ name: 'Pocky Web', url: 'https://raz-pocky-web.vercel.app/', category: 'store', blurb: 'Snack-brand storefront.' },
	{ name: 'Atelier Elysee', url: 'https://raz-atelier-elysee.vercel.app/', category: 'store', blurb: 'Atelier storefront.' },
];
