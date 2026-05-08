/**
 * Build / Simulator state machine.
 *
 *  idle → [click ▶] → compiling → booting → running
 *  running → [click ⏹] → idle
 *
 * Console pane subscribes to `logs`. Simulator pane subscribes to `state`
 * and `currentApp`. RunButton dispatches via the action methods.
 */

import { writable, derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export type SimState = 'idle' | 'compiling' | 'booting' | 'running';

export type AppId = 'neo' | 'tru' | 'babysteps' | 'takhawi';

export interface LogLine {
	t: string;
	text: string;
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
	{ t: '[ready]', text: 'Mostafa.xcodeproj loaded.' },
	{ t: '[ready]', text: 'Hit ▶ to build a project.' }
];

function timestamp(): string {
	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}

function lineFor(app: AppId, scheme: string): { delayMs: number; text: string; tone?: LogLine['tone'] }[] {
	return [
		{ delayMs: 0,    text: `Building Mostafa.xcodeproj — scheme ${scheme}…` },
		{ delayMs: 90,   text: 'Resolving package graph' },
		{ delayMs: 220,  text: `Compile ${scheme}.swift (1 of 1)` },
		{ delayMs: 380,  text: `Linking ${scheme}` },
		{ delayMs: 520,  text: 'Code-sign — well, pretend code-sign' },
		{ delayMs: 680,  text: 'Boot iPhone 15 Pro (iOS 17.4)' },
		{ delayMs: 840,  text: `Install ${appBundleName(app)}.app` },
		{ delayMs: 980,  text: `Launch ${appBundleName(app)}` },
		{ delayMs: 1140, text: 'Build succeeded', tone: 'success' }
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

		for (const { delayMs, text, tone } of lines) {
			if (reduced) {
				// no animation — just dump them with the timestamp from now
				append({ t: timestamp(), text, tone });
				continue;
			}
			const target = startedAt + delayMs;
			const remaining = target - Date.now();
			if (remaining > 0) await sleep(remaining);
			if (token !== buildToken) return; // canceled by another click
			append({ t: timestamp(), text, tone });
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
		append({ t: timestamp(), text: 'Simulator stopped.', tone: 'plain' });
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
