import { findFileByPath } from '$lib/files/tree';
import { getContentBoth } from '$lib/files/contents';
import { highlight } from '$lib/syntax/highlight.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const file = findFileByPath('/')!;
	const both = getContentBoth(file.contentKey);
	const [htmlEn, htmlAr] = await Promise.all([
		highlight(both.en, file.lang),
		both.ar === both.en
			? highlight(both.en, file.lang).then((h) => h)
			: highlight(both.ar, file.lang)
	]);
	return { file, html: { en: htmlEn, ar: htmlAr } };
};
