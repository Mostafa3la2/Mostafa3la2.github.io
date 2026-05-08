/**
 * Server-only syntax highlighter. The `.server.ts` suffix tells SvelteKit
 * never to ship this (or its imports) to the client. Shiki runs at build
 * time only — every route is prerendered, so the client gets pure HTML.
 */

import { createHighlighter, type Highlighter } from 'shiki';
import xcode26Dark from './themes/xcode26-dark.json' with { type: 'json' };
import type { Lang } from '$lib/files/tree';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [xcode26Dark as unknown as Parameters<typeof createHighlighter>[0]['themes'][0]],
			langs: ['swift', 'json', 'markdown']
		});
	}
	return highlighterPromise;
}

const langMap: Record<Lang, string> = {
	swift: 'swift',
	json: 'json',
	markdown: 'markdown',
	// .strings files don't have a Shiki grammar; Swift gets us close — strings + comments
	// look right and the rest is mostly punctuation. Authentic enough for our use.
	strings: 'swift'
};

export async function highlight(source: string, lang: Lang): Promise<string> {
	const hl = await getHighlighter();
	const grammar = langMap[lang];
	return hl.codeToHtml(source, {
		lang: grammar,
		theme: 'xcode26-dark',
		// Keep the wrapper minimal — we apply our own padding/font in CodeBody.
		structure: 'inline'
	});
}
