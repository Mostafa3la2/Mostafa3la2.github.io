/**
 * Content registry. Each file in the file tree maps to one of these.
 * Server-prerendered — these strings get tokenized by Shiki at build
 * time and ship as HTML fragments to the client.
 */

import { source as readme } from './readme';
import { source as about } from './about';
import { source as neo } from './neo';
import { source as tru } from './tru';
import { source as babysteps } from './babysteps';
import { source as takhawi } from './takhawi';
import { source as earlier } from './earlier';
import { source as career } from './career';
import { source as toolkit } from './toolkit';
import { source as offscreen } from './offscreen';
import { source as localization } from './localization';
import { source as colophon } from './colophon';
import { source as contact } from './contact';

export const contents: Record<string, string> = {
	readme,
	about,
	neo,
	tru,
	babysteps,
	takhawi,
	earlier,
	career,
	toolkit,
	offscreen,
	localization,
	colophon,
	contact
};

export function getContent(key: string): string {
	return contents[key] ?? '';
}
