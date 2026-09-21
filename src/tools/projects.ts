import { defineTool } from '@flue/runtime';
import * as v from 'valibot';
import { PROJECTS } from '../data/projects.ts';

export const listProjects = defineTool({
	name: 'list_projects',
	description:
		"List Raz's shipped portfolio projects with live URLs and blurbs. Call it whenever the user asks for examples, links, or work of a kind (landing pages, dashboards, storefronts). A project can carry several tags; the filter matches any of them. Always link the exact URLs returned — never invent project links.",
	input: v.object({
		category: v.pipe(
			v.optional(v.picklist(['landing', 'dashboard', 'store'], 'Category must be landing, dashboard, or store.')),
			v.description('Filter to one tag, or omit for a spread of all work.'),
		),
	}),
	async run({ data }) {
		const projects = data.category ? PROJECTS.filter((p) => p.tags.includes(data.category as 'landing' | 'dashboard' | 'store')) : PROJECTS;
		return {
			output: {
				total: PROJECTS.length,
				projects: projects.map((p) => ({ name: p.name, url: p.url, section: p.section, blurb: p.blurb })),
			},
		};
	},
});
