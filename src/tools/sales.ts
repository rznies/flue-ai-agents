import { defineTool } from '@flue/runtime';
import * as v from 'valibot';
import { CASE_STUDIES, MEETING_TIMES, PRICING } from '../data/catalog.ts';

export const getPricing = defineTool({
	name: 'get_pricing',
	description:
		'Return the current Pulseboard pricing tiers. Call it whenever the user asks about plans, prices, limits, or which tier fits them. Returns all tiers unless a tier name is given.',
	input: v.object({
		tier: v.pipe(
			v.optional(v.picklist(['starter', 'studio', 'agency'], 'Tier must be starter, studio, or agency.')),
			v.description('Filter to one tier, or omit for all tiers.'),
		),
	}),
	async run({ data }) {
		const tiers = data.tier ? PRICING.filter((t) => t.tier === data.tier) : PRICING;
		return { output: { tiers } };
	},
});

export const getCaseStudies = defineTool({
	name: 'get_case_studies',
	description:
		'Return real customer results for Pulseboard. Call it when the user asks for proof, examples, reviews, or results from similar businesses.',
	input: v.object({
		industry: v.pipe(
			v.optional(v.picklist(['freelance', 'saas', 'ecommerce'], 'Industry must be freelance, saas, or ecommerce.')),
			v.description('Filter to one industry, or omit for all stories.'),
		),
	}),
	async run({ data }) {
		const studies = data.industry ? CASE_STUDIES.filter((c) => c.industry === data.industry) : CASE_STUDIES;
		return { output: { caseStudies: studies } };
	},
});

export const MEETING_TIME_OPTIONS = [...MEETING_TIMES];
