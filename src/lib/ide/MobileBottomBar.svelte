<script lang="ts">
	import { openSheet, toggleSheet } from '$lib/stores/mobileSheet';
	import { simulator, simState } from '$lib/stores/simulator';
	import { activeScheme, schemeLabel } from '$lib/stores/scheme';

	function build() {
		const app = $activeScheme;
		simulator.build(app, schemeLabel[app]);
		// Auto-open the simulator sheet so the result is visible.
		openSheet.set('simulator');
	}

	function stop() {
		simulator.stop();
	}
</script>

<nav class="mbar" aria-label="Mobile navigation">
	<button
		class="mbtn"
		class:active={$openSheet === 'files'}
		type="button"
		onclick={() => toggleSheet('files')}
	>
		<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
			<path d="M2 4 a1.5 1.5 0 0 1 1.5 -1.5 h4 l1.5 1.5 h6 a1 1 0 0 1 1 1 v9 a1 1 0 0 1 -1 1 h-13 a1 1 0 0 1 -1 -1 z" fill="none" stroke="currentColor" stroke-width="1.2"/>
		</svg>
		<span class="lbl">Files</span>
	</button>

	<button
		class="mbtn"
		class:active={$openSheet === 'inspector'}
		type="button"
		onclick={() => toggleSheet('inspector')}
	>
		<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
			<rect x="2.5" y="2.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/>
			<line x1="9" y1="6.5" x2="13" y2="6.5" stroke="currentColor" stroke-width="1.2"/>
			<line x1="9" y1="9.5" x2="13" y2="9.5" stroke="currentColor" stroke-width="1.2"/>
			<line x1="9" y1="12.5" x2="13" y2="12.5" stroke="currentColor" stroke-width="1.2"/>
			<rect x="5" y="5.5" width="2.5" height="8" rx="0.5" fill="currentColor" opacity="0.5"/>
		</svg>
		<span class="lbl">Inspector</span>
	</button>

	<button class="mbtn run-mbtn" type="button" onclick={$simState === 'idle' ? build : stop}>
		{#if $simState === 'idle'}
			<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
				<path d="M4 3 L14 9 L4 15 Z" fill="currentColor"/>
			</svg>
			<span class="lbl">Build</span>
		{:else}
			<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
				<rect x="4" y="4" width="10" height="10" rx="1" fill="currentColor"/>
			</svg>
			<span class="lbl">Stop</span>
		{/if}
	</button>

	<button
		class="mbtn"
		class:active={$openSheet === 'simulator'}
		type="button"
		onclick={() => toggleSheet('simulator')}
	>
		<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
			<rect x="5" y="2" width="8" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/>
			<line x1="7.5" y1="13.5" x2="10.5" y2="13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
		</svg>
		<span class="lbl">Sim</span>
	</button>
</nav>

<style>
	.mbar {
		grid-area: mobilebar;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 4px;
		padding: 6px 8px calc(6px + env(safe-area-inset-bottom, 0));
		background: var(--xc-bg-titlebar);
		border-block-start: 1px solid var(--xc-border);
	}
	.mbtn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 6px 4px;
		font-size: 10px;
		font-weight: 500;
		color: var(--xc-text-secondary);
		background: transparent;
		border: 0;
		border-radius: 6px;
		min-height: 44px;
	}
	.mbtn:hover {
		background: var(--xc-border-subtle);
	}
	.mbtn.active {
		color: var(--xc-blue);
		background: var(--xc-border-subtle);
	}
	.run-mbtn {
		color: var(--xc-success);
	}
	.lbl {
		letter-spacing: 0.2px;
	}
</style>
