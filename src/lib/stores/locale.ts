/**
 * Active locale + RTL plumbing.
 *
 * Persists to localStorage on the client. SSR renders in 'en' by default;
 * the client reads localStorage in hooks.client.ts before paint to avoid
 * a flash on first load.
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Locale = 'en' | 'ar';

const KEY = 'mostafa.locale';

function readPersisted(): Locale {
	if (!browser) return 'en';
	try {
		const v = localStorage.getItem(KEY);
		return v === 'ar' ? 'ar' : 'en';
	} catch {
		return 'en';
	}
}

const internal = writable<Locale>(readPersisted());

export const locale = {
	subscribe: internal.subscribe,
	set(v: Locale) {
		internal.set(v);
		if (browser) {
			try {
				localStorage.setItem(KEY, v);
			} catch {
				// quota / private mode — silent
			}
			document.documentElement.setAttribute('dir', v === 'ar' ? 'rtl' : 'ltr');
			document.documentElement.setAttribute('lang', v);
		}
	},
	toggle() {
		internal.update((v) => {
			const next: Locale = v === 'en' ? 'ar' : 'en';
			if (browser) {
				try {
					localStorage.setItem(KEY, next);
				} catch {
					// silent
				}
				document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
				document.documentElement.setAttribute('lang', next);
			}
			return next;
		});
	}
};

export const direction = derived(internal, ($l) => ($l === 'ar' ? 'rtl' : 'ltr'));
