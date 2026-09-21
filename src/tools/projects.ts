import { defineTool } from '@flue/runtime';
import * as v from 'valibot';
import { PROJECTS } from '../data/projects.ts';

export const listProjects = defineTool({
	name: 'list_projects',
	description:
		"List Raz's shipped portfolio projects with live URLs. Call it whenever the user asks for examples, links, or work in a category (landing pages, dashboards, storefronts). Always link the returned URLs — never invent project links.",
	input: v.object({
		category: v.pipe(
			v.optional(v.picklist(['landing', 'dashboard', 'store'], 'Category must be landing, dashboard, or store.')),
			v.description('Filter to one category, or omit for a spread of all work.'),
		),
	}),
	async run({ data }) {
		const projects = data.category ? PROJECTS.filter((p) => p.category === data.category) : PROJECTS;
		return { output: { total: PROJECTS.length, projects: projects.map((p) => ({ name: p.name, url: p.url, blurb: p.blurb })) } };
	},
});
