<script lang="ts">
	// No-op for Phase A. State machine wiring lands in Phase B.
	type State = 'idle' | 'compiling' | 'booting' | 'running';
	let state = $state<State>('idle');
</script>

<div class="run-stop">
	<button
		class="btn run"
		type="button"
		aria-label="Build and run"
		disabled={state !== 'idle'}
	>
		<svg width="11" height="13" viewBox="0 0 11 13" aria-hidden="true">
			<path d="M0 0 L11 6.5 L0 13 Z" fill="currentColor" />
		</svg>
	</button>
	<button
		class="btn stop"
		type="button"
		aria-label="Stop"
		disabled={state === 'idle'}
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
