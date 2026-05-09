/**
 * Light / dark theme. Defaults to the user's prefers-color-scheme on first
 * visit; once they click the toggle, the explicit choice persists in
 * localStorage and overrides the system setting.
 *
 * The pre-paint inline script in app.html applies the same logic before
 * any CSS so there's no flash on first load.
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

const KEY = 'mostafa.theme';

function readInitial(): Theme {
	if (!browser) return 'dark';
	try {
		const v = localStorage.getItem(KEY);
		if (v === 'light' || v === 'dark') return v;
		if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
	} catch {
		// silent
	}
	return 'dark';
}

function applyToHtml(t: Theme) {
	if (!browser) return;
	const attr = t === 'light' ? 'xcode-light' : 'xcode-dark';
	document.documentElement.setAttribute('data-theme', attr);
}

const internal = writable<Theme>(readInitial());

export const theme = {
	subscribe: internal.subscribe,
	set(t: Theme) {
		internal.set(t);
		if (browser) {
			try {
				localStorage.setItem(KEY, t);
			} catch {
				// silent
			}
			applyToHtml(t);
		}
	},
	toggle() {
		internal.update((t) => {
			const next: Theme = t === 'light' ? 'dark' : 'light';
			if (browser) {
				try {
					localStorage.setItem(KEY, next);
				} catch {
					// silent
				}
				applyToHtml(next);
			}
			return next;
		});
	}
};
