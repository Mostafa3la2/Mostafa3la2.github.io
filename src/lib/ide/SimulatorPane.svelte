<script lang="ts">
	import { simState, simCurrentApp } from '$lib/stores/simulator';
	import { activeDevice, schemeLabel } from '$lib/stores/scheme';
	import { t } from '$lib/i18n/strings';
	import Frame from '$lib/simulator/Frame.svelte';
	import SimulatorScreenshot from '$lib/simulator/SimulatorScreenshot.svelte';

	const accents: Record<string, string> = {
		neo: '#0bb6a8',
		tru: '#5b3ec8',
		babysteps: '#a78bfa',
		takhawi: '#7d5524'
	};
</script>

<section class="sim" aria-label="Simulator" data-state={$simState}>
	<header class="sim-header">
		<span class="device">{$activeDevice}</span>
		<span class="state">
			{#if $simState === 'idle'}
				{$t('sim.idle')}
			{:else if $simState === 'compiling'}
				{$t('sim.compiling')}
			{:else if $simState === 'booting'}
				{$t('sim.booting')}
			{:else if $simState === 'running' && $simCurrentApp}
				{$t('sim.running_prefix')} {schemeLabel[$simCurrentApp]}
			{/if}
		</span>
	</header>

	<div class="sim-body">
		<Frame
			device={$activeDevice}
			accent={$simCurrentApp ? accents[$simCurrentApp] : '#5896d6'}
			bare={$simState === 'running'}
		>
			{#if $simState === 'idle'}
				<div class="centered">
					<p class="hint">{$t('sim.idle_hint')}</p>
				</div>
			{:else if $simState === 'compiling'}
				<div class="centered">
					<div class="boot-spinner" aria-hidden="true"></div>
				</div>
			{:else if $simState === 'booting'}
				<div class="centered fade-in">
					<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
						<rect x="2" y="2" width="40" height="40" rx="9" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
						<path d="M14 16 L22 12 L30 16 L30 28 L22 32 L14 28 Z" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1"/>
					</svg>
				</div>
			{:else if $simState === 'running' && $simCurrentApp}
				<SimulatorScreenshot app={$simCurrentApp} />
			{/if}
		</Frame>
	</div>
</section>

<style>
	.sim {
		grid-area: simulator;
		background: var(--xc-bg-inspector);
		border-inline-start: 1px solid var(--xc-border);
		border-block-start: 1px solid var(--xc-border);
		display: grid;
		grid-template-rows: 28px 1fr;
		min-height: 0;
		overflow: hidden;
	}
	.sim-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 12px;
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
		border-block-end: 1px solid var(--xc-border-subtle);
	}
	.sim-body {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		overflow: hidden;
	}

	.centered {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 16px;
	}
	.fade-in {
		animation: fade-in var(--dur-medium) var(--ease-out);
	}
	@keyframes fade-in {
		from { opacity: 0; transform: scale(0.96); }
		to { opacity: 1; transform: scale(1); }
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: rgba(255, 255, 255, 0.45);
		text-align: center;
		margin: 0;
	}
	.boot-spinner {
		width: 22px;
		height: 22px;
		border: 2px solid rgba(255, 255, 255, 0.18);
		border-block-start-color: rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
