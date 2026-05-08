<script lang="ts">
	// Visual placeholder for Phase A. Phase B wires the real EN ⇄ AR toggle.
	let scheme = $state<'NEO' | 'TRU' | 'BabySteps' | 'Takhawi'>('NEO');
	const devices = ['iPhone 15 Pro', 'iPhone SE', 'iPad Pro 13"'] as const;
	let device = $state<(typeof devices)[number]>('iPhone 15 Pro');
</script>

<div class="picker">
	<button class="pill scheme" type="button" aria-label="Active scheme">
		<span class="dot" aria-hidden="true"></span>
		<span class="label">{scheme}</span>
	</button>
	<span class="sep" aria-hidden="true">›</span>
	<button class="pill device" type="button" aria-label="Active destination">
		<span class="label">{device}</span>
	</button>
</div>

<style>
	.picker {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 26px;
		padding-inline: 10px;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		border-radius: 6px;
		font-size: var(--fs-ui-tight);
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--xc-text);
		font-weight: 500;
	}
	.pill .dot {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		background: var(--syn-keyword);
	}
	.sep {
		color: var(--xc-text-tertiary);
	}
	.label {
		max-width: 18ch;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
