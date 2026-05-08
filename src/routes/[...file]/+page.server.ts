import { error } from '@sveltejs/kit';
import { allFiles, findFileByPath } from '$lib/files/tree';
import { getContentBoth } from '$lib/files/contents';
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
	const both = getContentBoth(file.contentKey);
	const [htmlEn, htmlAr] = await Promise.all([
		highlight(both.en, file.lang),
		both.ar === both.en
			? highlight(both.en, file.lang).then((h) => h)
			: highlight(both.ar, file.lang)
	]);
	return { file, html: { en: htmlEn, ar: htmlAr } };
};
