<script lang="ts">
	// Phase A: empty device frame placeholder. Phase B wires the live mini-apps.
</script>

<section class="sim" aria-label="Simulator">
	<header class="sim-header">
		<span class="device">iPhone 15 Pro</span>
		<span class="state">No build running</span>
	</header>

	<div class="sim-body">
		<div class="phone" aria-hidden="true">
			<div class="phone-screen">
				<div class="dynamic-island"></div>
				<p class="hint">▶ Boots a live mini-app here in Phase B.</p>
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
		width: 180px;
		aspect-ratio: 9 / 19.5;
		background: #0b0b0d;
		border-radius: 32px;
		border: 4px solid #2a2a2f;
		padding: 6px;
		display: flex;
	}
	.phone-screen {
		flex: 1;
		background: #1a1a1f;
		border-radius: 24px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}
	.dynamic-island {
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 22px;
		background: #000;
		border-radius: 12px;
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
		text-align: center;
		margin: 0;
	}
</style>
