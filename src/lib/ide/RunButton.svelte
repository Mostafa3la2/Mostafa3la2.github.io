<script lang="ts">
	import { simulator, simState } from '$lib/stores/simulator';
	import { activeScheme, schemeLabel } from '$lib/stores/scheme';
	import { t } from '$lib/i18n/strings';

	function build() {
		const app = $activeScheme;
		simulator.build(app, schemeLabel[app]);
	}

	function stop() {
		simulator.stop();
	}
</script>

<div class="run-stop">
	<button
		class="btn run"
		type="button"
		aria-label={$t('run.build')}
		disabled={$simState !== 'idle'}
		onclick={build}
	>
		<svg width="11" height="13" viewBox="0 0 11 13" aria-hidden="true">
			<path d="M0 0 L11 6.5 L0 13 Z" fill="currentColor" />
		</svg>
	</button>
	<button
		class="btn stop"
		type="button"
		aria-label={$t('run.stop')}
		disabled={$simState === 'idle'}
		onclick={stop}
	>
		<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
			<rect width="10" height="10" rx="1" fill="currentColor" />
		</svg>
	</button>
</div>

<style>
	.run-stop {
		display: inline-flex;
		gap: 2px;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		border-radius: 6px;
		overflow: hidden;
		height: 26px;
	}
	.btn {
		width: 30px;
		height: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text);
		transition: background var(--dur-fast) var(--ease-out);
	}
	.btn:hover:not(:disabled) {
		background: var(--xc-border);
	}
	.btn:disabled {
		color: var(--xc-text-disabled);
		cursor: default;
	}
	.run { color: var(--xc-success); }
	.stop { color: var(--xc-error); }
</style>
