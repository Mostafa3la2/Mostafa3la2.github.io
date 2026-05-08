import { error } from '@sveltejs/kit';
import { allFiles, findFileByPath } from '$lib/files/tree';
import type { PageLoad } from './$types';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return allFiles()
		.filter((f) => f.path !== '/')
		.map((f) => ({ file: f.path.replace(/^\//, '') }));
};

export const load: PageLoad = ({ url }) => {
	const path = url.pathname || '/';
	const file = findFileByPath(path);
	if (!file) throw error(404, `No file at ${path}`);
	return { file };
};
