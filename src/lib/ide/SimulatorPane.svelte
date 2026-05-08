<script lang="ts">
	import { simState, simCurrentApp } from '$lib/stores/simulator';
	import { activeDevice, schemeLabel } from '$lib/stores/scheme';
</script>

<section class="sim" aria-label="Simulator" data-state={$simState}>
	<header class="sim-header">
		<span class="device">{$activeDevice}</span>
		<span class="state">
			{#if $simState === 'idle'}
				No build running
			{:else if $simState === 'compiling'}
				Compiling…
			{:else if $simState === 'booting'}
				Booting…
			{:else if $simState === 'running' && $simCurrentApp}
				Running · {schemeLabel[$simCurrentApp]}
			{/if}
		</span>
	</header>

	<div class="sim-body">
		<div class="phone" aria-hidden="true">
			<div class="phone-screen" data-state={$simState} data-app={$simCurrentApp}>
				<div class="dynamic-island"></div>
				{#if $simState === 'idle'}
					<p class="hint">▶ Boots a live mini-app here.</p>
				{:else if $simState === 'compiling'}
					<div class="boot-spinner" aria-hidden="true"></div>
				{:else if $simState === 'booting'}
					<div class="boot-glow" aria-hidden="true">
						<svg width="40" height="40" viewBox="0 0 40 40">
							<rect x="2" y="2" width="36" height="36" rx="8" fill="none" stroke="var(--xc-text)" stroke-width="1.5" opacity="0.6"/>
							<path d="M12 14 L20 10 L28 14 L28 26 L20 30 L12 26 Z" fill="none" stroke="var(--xc-text)" stroke-width="1" opacity="0.8"/>
						</svg>
					</div>
				{:else if $simState === 'running'}
					<div class="running-stub">
						<p class="running-app-name">{$simCurrentApp ? schemeLabel[$simCurrentApp] : ''}</p>
						<p class="running-hint">Mini-app screens coming up.</p>
					</div>
				{/if}
				<div class="home-indicator"></div>
			</div>
		</div>
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
		padding: 20px;
		overflow: hidden;
	}
	.phone {
		width: 200px;
		aspect-ratio: 9 / 19.5;
		background: #0b0b0d;
		border-radius: 36px;
		border: 4px solid #2a2a2f;
		padding: 6px;
		display: flex;
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
	}
	.phone-screen {
		flex: 1;
		background: #0a0a0c;
		border-radius: 28px;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		transition: background var(--dur-medium) var(--ease-out);
	}
	.phone-screen[data-state='running'] {
		background: #1a1a1f;
	}
	.dynamic-island {
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 78px;
		height: 22px;
		background: #000;
		border-radius: 12px;
		z-index: 10;
	}
	.home-indicator {
		position: absolute;
		bottom: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		z-index: 10;
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
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

	.boot-glow {
		opacity: 0;
		animation: fade-in var(--dur-medium) var(--ease-out) forwards;
	}
	@keyframes fade-in {
		from { opacity: 0; transform: scale(0.96); }
		to { opacity: 1; transform: scale(1); }
	}

	.running-stub {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		text-align: center;
	}
	.running-app-name {
		font-size: 18px;
		font-weight: 600;
		color: var(--xc-text);
		margin: 0;
	}
	.running-hint {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
		margin: 0;
	}
</style>
