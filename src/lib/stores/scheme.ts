/**
 * Active scheme + device pickers — what the title bar's scheme dropdown shows.
 * For Phase B the scheme is the project the Run button will build.
 */

import { writable } from 'svelte/store';
import type { AppId } from './simulator';

export const activeScheme = writable<AppId>('neo');

export const activeDevice = writable<'iPhone 15 Pro' | 'iPhone SE' | 'iPad Pro 13"'>(
	'iPhone 15 Pro'
);

export const schemeLabel: Record<AppId, string> = {
	neo: 'NEO',
	tru: 'TRU',
	babysteps: 'BabySteps',
	takhawi: 'Takhawi',
	earlier: 'Earlier',
	contact: 'Contact'
};
