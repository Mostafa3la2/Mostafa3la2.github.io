/**
 * Mobile bottom-sheet open state. Only one sheet can be open at a time.
 * Components below 900px subscribe to this; components above don't care.
 */

import { writable } from 'svelte/store';

export type SheetId = 'files' | 'simulator' | 'inspector' | null;

export const openSheet = writable<SheetId>(null);

export function showSheet(id: Exclude<SheetId, null>) {
	openSheet.set(id);
}

export function closeSheet() {
	openSheet.set(null);
}

export function toggleSheet(id: Exclude<SheetId, null>) {
	openSheet.update((current) => (current === id ? null : id));
}
