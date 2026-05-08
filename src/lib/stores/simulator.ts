/**
 * Build / Simulator state machine.
 *
 *  idle → [click ▶] → compiling → booting → running
 *  running → [click ⏹] → idle
 *
 * Console pane subscribes to `logs`. Simulator pane subscribes to `state`
 * and `currentApp`. RunButton dispatches via the action methods.
 *
 * Log lines store i18n keys (not pre-translated text) so the console
 * re-localizes when the active locale flips mid-build.
 */

import { writable, derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type SimState = 'idle' | 'compiling' | 'booting' | 'running';

export type AppId = 'neo' | 'tru' | 'babysteps' | 'takhawi';

export interface LogLine {
	t: string;
	key: string;
	vars?: Record<string, string>;
	tone?: 'plain' | 'success' | 'warn' | 'error';
}

interface SimStore {
	state: Writable<SimState>;
	logs: Writable<LogLine[]>;
	currentApp: Writable<AppId | null>;
	build(app: AppId, scheme: string): Promise<void>;
	stop(): void;
	clearLogs(): void;
	canBuild: Readable<boolean>;
	isRunning: Readable<boolean>;
}

const initialLogs: LogLine[] = [
	{ t: '[ready]', key: 'console.welcome.loaded' },
	{ t: '[ready]', key: 'console.welcome.hint' }
];

function timestamp(): string {
	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}

function lineFor(
	app: AppId,
	scheme: string
): { delayMs: number; key: string; vars?: Record<string, string>; tone?: LogLine['tone'] }[] {
	const bundle = appBundleName(app);
	return [
		{ delayMs: 0,    key: 'console.building_prefix', vars: { scheme } },
		{ delayMs: 90,   key: 'console.resolving' },
		{ delayMs: 220,  key: 'console.compile_one', vars: { scheme } },
		{ delayMs: 380,  key: 'console.linking', vars: { scheme } },
		{ delayMs: 520,  key: 'console.codesign' },
		{ delayMs: 680,  key: 'console.boot_device' },
		{ delayMs: 840,  key: 'console.install', vars: { app: bundle } },
		{ delayMs: 980,  key: 'console.launch', vars: { app: bundle } },
		{ delayMs: 1140, key: 'console.success', tone: 'success' }
	];
}

function appBundleName(app: AppId): string {
	switch (app) {
		case 'neo': return 'NEO';
		case 'tru': return 'TRU';
		case 'babysteps': return 'BabySteps';
		case 'takhawi': return 'Takhawi';
	}
}

function createSimulator(): SimStore {
	const state = writable<SimState>('idle');
	const logs = writable<LogLine[]>(initialLogs);
	const currentApp = writable<AppId | null>(null);

	let buildToken = 0;

	function append(line: LogLine) {
		logs.update((existing) => [...existing, line]);
	}

	async function build(app: AppId, scheme: string) {
		const token = ++buildToken;
		state.set('compiling');

		// Hide the welcome lines once a real build kicks off.
		logs.set([]);

		const reduced = typeof window !== 'undefined' &&
			window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const lines = lineFor(app, scheme);
		const startedAt = Date.now();

		for (const { delayMs, key, vars, tone } of lines) {
			if (reduced) {
				append({ t: timestamp(), key, vars, tone });
				continue;
			}
			const target = startedAt + delayMs;
			const remaining = target - Date.now();
			if (remaining > 0) await sleep(remaining);
			if (token !== buildToken) return; // canceled by another click
			append({ t: timestamp(), key, vars, tone });
		}

		if (token !== buildToken) return;

		state.set('booting');
		if (!reduced) await sleep(280);
		if (token !== buildToken) return;

		currentApp.set(app);
		state.set('running');
	}

	function stop() {
		buildToken++;
		state.set('idle');
		currentApp.set(null);
		append({ t: timestamp(), key: 'console.stopped' });
	}

	function clearLogs() {
		logs.set([]);
	}

	const canBuild = derived(state, ($state) => $state === 'idle');
	const isRunning = derived(state, ($state) => $state === 'running');

	return { state, logs, currentApp, build, stop, clearLogs, canBuild, isRunning };
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const simulator = createSimulator();

// Re-export named stores so components can use Svelte 5 `$store` auto-subscription.
export const simState = simulator.state;
export const simLogs = simulator.logs;
export const simCurrentApp = simulator.currentApp;
export const simCanBuild = simulator.canBuild;
export const simIsRunning = simulator.isRunning;

/** Convenience helper for components reading the current state synchronously. */
export function snapshot() {
	return {
		state: get(simulator.state),
		logs: get(simulator.logs),
		currentApp: get(simulator.currentApp)
	};
}
