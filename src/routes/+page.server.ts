import { findFileByPath } from '$lib/files/tree';
import { getContent } from '$lib/files/contents';
import { highlight } from '$lib/syntax/highlight.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const file = findFileByPath('/')!;
	const source = getContent(file.contentKey);
	const html = await highlight(source, file.lang);
	return { file, html };
};
