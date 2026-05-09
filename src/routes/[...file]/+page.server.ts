import { error } from '@sveltejs/kit';
import { allFiles, findFileByPath } from '$lib/files/tree';
import { getContent } from '$lib/files/contents';
import { highlight } from '$lib/syntax/highlight.server';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return allFiles()
		.filter((f) => f.path !== '/')
		.map((f) => ({ file: f.path.replace(/^\//, '') }));
};

export const load: PageServerLoad = async ({ url }) => {
	const path = url.pathname || '/';
	const file = findFileByPath(path);
	if (!file) throw error(404, `No file at ${path}`);
	const source = getContent(file.contentKey);
	const html = await highlight(source, file.lang);
	return { file, html };
};
