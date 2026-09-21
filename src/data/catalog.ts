// Sample business data for the Pulseboard sales demo.
// Pulseboard is a fictional website-analytics SaaS for freelancers and studios.
// In a real deployment this module would query a database or billing API.

export type PricingTier = {
	tier: 'starter' | 'studio' | 'agency';
	pricePerMonth: number;
	sites: string;
	pageviews: string;
	highlights: string[];
};

export const PRICING: PricingTier[] = [
	{
		tier: 'starter',
		pricePerMonth: 19,
		sites: 'Up to 3 sites',
		pageviews: '10k pageviews / month',
		highlights: ['Real-time dashboard', 'Weekly email reports', '30-day data retention'],
	},
	{
		tier: 'studio',
		pricePerMonth: 49,
		sites: 'Up to 15 sites',
		pageviews: '100k pageviews / month',
		highlights: ['Everything in Starter', 'White-label client reports', 'Funnels + goals', '1-year data retention'],
	},
	{
		tier: 'agency',
		pricePerMonth: 129,
		sites: 'Unlimited sites',
		pageviews: '1M pageviews / month',
		highlights: ['Everything in Studio', 'SSO/SAML', '99.9% uptime SLA', 'Dedicated success manager'],
	},
];

export type CaseStudy = {
	customer: string;
	industry: string;
	result: string;
	quote: string;
};

export const CASE_STUDIES: CaseStudy[] = [
	{
		customer: 'Raz Studio (freelance web designer)',
		industry: 'freelance',
		result: 'Proposal win-rate up 31% after adding white-label reports to every pitch.',
		quote: 'Clients finally see the value in numbers, not adjectives.',
	},
	{
		customer: 'Northwind SaaS',
		industry: 'saas',
		result: 'Cut landing-page bounce from 58% to 34% in six weeks using funnel insights.',
		quote: 'It paid for itself before the trial ended.',
	},
	{
		customer: 'Pocky & Co. (online store)',
		industry: 'ecommerce',
		result: 'Recovered 12% of abandoned checkouts with goal alerts on the checkout flow.',
		quote: 'Setup took one afternoon; the alerts did the rest.',
	},
];

export const MEETING_DAYS = ['tue', 'wed', 'thu'] as const;
export const MEETING_TIMES = ['10:00', '15:00'] as const;

export type Meeting = {
	reference: string;
	name: string;
	email: string;
	day: string;
	time: string;
	timezoneNote: string;
};
