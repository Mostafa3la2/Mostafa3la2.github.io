<script lang="ts">
	import { simState, simCurrentApp, simLogs, simulator } from '$lib/stores/simulator';
	import { activeScheme, schemeLabel } from '$lib/stores/scheme';
	import { openSheet, closeSheet } from '$lib/stores/mobileSheet';
	import Frame from '$lib/simulator/Frame.svelte';
	import SimulatorScreenshot from '$lib/simulator/SimulatorScreenshot.svelte';
	import ContactApp from '$lib/simulator/apps/ContactApp.svelte';
	import MobileSheet from './MobileSheet.svelte';

	let open = $derived($openSheet === 'simulator');

	const accents: Record<string, string> = {
		neo: '#0bb6a8',
		tru: '#5b3ec8',
		babysteps: '#a78bfa',
		takhawi: '#7d5524',
		contact: '#0a84ff'
	};

	function build() {
		const app = $activeScheme;
		simulator.build(app, schemeLabel[app]);
	}

	function stop() {
		simulator.stop();
	}

	let consoleEl: HTMLDivElement | null = $state(null);
	$effect(() => {
		const _ = $simLogs.length;
		if (consoleEl) consoleEl.scrollTop = consoleEl.scrollHeight;
	});
</script>

<MobileSheet {open} title="Simulator" onClose={closeSheet}>
	<div class="sim-sheet">
		<header class="head">
			<div class="state">
				{#if $simState === 'idle'}
					No build running
				{:else if $simState === 'compiling'}
					Compiling…
				{:else if $simState === 'booting'}
					Booting…
				{:else if $simState === 'running' && $simCurrentApp}
					Running · {schemeLabel[$simCurrentApp]}
				{:else if $simState === 'failed'}
					Build failed
				{/if}
			</div>
			<button
				class="action"
				type="button"
				onclick={$simState === 'idle' ? build : stop}
				disabled={$simState === 'compiling' || $simState === 'booting'}
			>
				{#if $simState === 'idle' || $simState === 'failed'}
					▶ Build {schemeLabel[$activeScheme]}
				{:else}
					⏹ Stop
				{/if}
			</button>
		</header>

		<div class="device-host">
			<Frame
				accent={$simCurrentApp ? accents[$simCurrentApp] : '#5896d6'}
				bare={$simState === 'running' && $simCurrentApp !== 'contact'}
			>
				{#if $simState === 'idle'}
					<div class="centered">
						<p class="hint">▶ Build to launch a project here.</p>
					</div>
				{:else if $simState === 'compiling'}
					<div class="centered">
						<div class="spinner" aria-hidden="true"></div>
					</div>
				{:else if $simState === 'booting'}
					<div class="centered fade-in">
						<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
							<rect x="2" y="2" width="40" height="40" rx="9" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
							<path d="M14 16 L22 12 L30 16 L30 28 L22 32 L14 28 Z" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1"/>
						</svg>
					</div>
				{:else if $simState === 'running' && $simCurrentApp === 'contact'}
					<ContactApp />
				{:else if $simState === 'running' && $simCurrentApp}
					<SimulatorScreenshot app={$simCurrentApp} />
				{/if}
			</Frame>
		</div>

		<details class="logs">
			<summary>Console <span class="count">({$simLogs.length})</span></summary>
			<div class="log-body" bind:this={consoleEl}>
				{#each $simLogs as log, i (i)}
					<div class="line" data-tone={log.tone ?? 'plain'}>
						<span class="ts">{log.t}</span>
						<span class="text" class:success={log.tone === 'success'} class:error={log.tone === 'error'}>{log.text}</span>
					</div>
				{/each}
			</div>
		</details>
	</div>
</MobileSheet>

<style>
	.sim-sheet {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 14px 16px 24px;
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.state {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-secondary);
	}
	.action {
		font-size: var(--fs-ui-tight);
		font-weight: 500;
		padding: 7px 12px;
		background: var(--xc-blue);
		border-radius: 6px;
		color: white;
		border: 0;
	}
	.action:disabled {
		opacity: 0.5;
	}
	.device-host {
		display: flex;
		justify-content: center;
	}
	.centered {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: rgba(255, 255, 255, 0.45);
		text-align: center;
		margin: 0;
	}
	.spinner {
		width: 22px;
		height: 22px;
		border: 2px solid rgba(255, 255, 255, 0.18);
		border-block-start-color: rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
	.fade-in { animation: fade-in var(--dur-medium) var(--ease-out); }
	@keyframes fade-in {
		from { opacity: 0; transform: scale(0.96); }
		to { opacity: 1; transform: scale(1); }
	}

	.logs {
		background: var(--xc-bg-console);
		border: 1px solid var(--xc-border);
		border-radius: 8px;
	}
	.logs summary {
		cursor: pointer;
		padding: 8px 12px;
		font-size: var(--fs-ui-small);
		color: var(--xc-text-secondary);
		font-weight: 500;
		list-style: none;
	}
	.logs summary::-webkit-details-marker { display: none; }
	.logs summary::after {
		content: '▾';
		float: inline-end;
		color: var(--xc-text-tertiary);
		font-size: 10px;
	}
	.logs[open] summary::after { content: '▴'; }
	.count { color: var(--xc-text-tertiary); }
	.log-body {
		padding: 6px 12px 10px;
		font-family: var(--font-mono);
		font-size: var(--fs-mono-tight);
		max-height: 180px;
		overflow-y: auto;
		direction: ltr;
	}
	.line { display: flex; gap: 10px; line-height: 1.5; }
	.ts { color: var(--xc-text-tertiary); flex-shrink: 0; }
	.text { color: var(--xc-text); }
	.text.success { color: var(--xc-success); font-weight: 500; }
	.text.error { color: var(--xc-error); }
</style>
