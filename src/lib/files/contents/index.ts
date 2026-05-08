/**
 * Content registry. Each file in the file tree maps to one of these.
 *
 * Most modules export a single English `source`. Modules that have
 * been translated also export `sourceAr`. The registry merges them
 * into a `{ en, ar }` shape with English fallback for untranslated
 * files — locale switch shows English where Arabic isn't authored yet.
 */

import { source as readmeEn, sourceAr as readmeAr } from './readme';
import { source as aboutEn, sourceAr as aboutAr } from './about';
import { source as neoEn } from './neo';
import { source as truEn } from './tru';
import { source as babystepsEn } from './babysteps';
import { source as takhawiEn } from './takhawi';
import { source as earlierEn } from './earlier';
import { source as careerEn, sourceAr as careerAr } from './career';
import { source as toolkitEn } from './toolkit';
import { source as offscreenEn, sourceAr as offscreenAr } from './offscreen';
import { source as localizationEn } from './localization';
import { source as colophonEn, sourceAr as colophonAr } from './colophon';
import { source as contactEn, sourceAr as contactAr } from './contact';

import type { Locale } from '$lib/stores/locale';

export interface BilingualSource {
	en: string;
	ar: string;
}

function pair(en: string, ar?: string): BilingualSource {
	return { en, ar: ar ?? en };
}

export const contents: Record<string, BilingualSource> = {
	readme: pair(readmeEn, readmeAr),
	about: pair(aboutEn, aboutAr),
	neo: pair(neoEn),
	tru: pair(truEn),
	babysteps: pair(babystepsEn),
	takhawi: pair(takhawiEn),
	earlier: pair(earlierEn),
	career: pair(careerEn, careerAr),
	toolkit: pair(toolkitEn),
	offscreen: pair(offscreenEn, offscreenAr),
	localization: pair(localizationEn),
	colophon: pair(colophonEn, colophonAr),
	contact: pair(contactEn, contactAr)
};

export function getContent(key: string, locale: Locale): string {
	const entry = contents[key];
	if (!entry) return '';
	return entry[locale] ?? entry.en;
}

export function getContentBoth(key: string): BilingualSource {
	return contents[key] ?? { en: '', ar: '' };
}
