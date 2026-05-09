<script lang="ts">
	import { activeScheme, activeDevice, schemeLabel } from '$lib/stores/scheme';
	import type { AppId } from '$lib/stores/simulator';

	const schemes: AppId[] = ['neo', 'tru', 'babysteps', 'takhawi', 'earlier'];
	const devices = ['iPhone 15 Pro', 'iPhone SE', 'iPad Pro 13"'] as const;

	let schemeOpen = $state(false);
	let deviceOpen = $state(false);

	function pickScheme(id: AppId) {
		activeScheme.set(id);
		schemeOpen = false;
	}
	function pickDevice(d: (typeof devices)[number]) {
		activeDevice.set(d);
		deviceOpen = false;
	}
</script>

<div class="picker">
	<div class="dropdown">
		<button
			class="pill scheme"
			type="button"
			aria-label="Active scheme"
			aria-haspopup="menu"
			aria-expanded={schemeOpen}
			onclick={() => (schemeOpen = !schemeOpen)}
		>
			<span class="dot" aria-hidden="true"></span>
			<span class="label">{schemeLabel[$activeScheme]}</span>
			<span class="caret" aria-hidden="true">▾</span>
		</button>
		{#if schemeOpen}
			<ul class="menu" role="menu">
				{#each schemes as id (id)}
					<li>
						<button
							class="menu-item"
							class:active={$activeScheme === id}
							type="button"
							role="menuitemradio"
							aria-checked={$activeScheme === id}
							onclick={() => pickScheme(id)}
						>
							<span class="check" aria-hidden="true">{$activeScheme === id ? '✓' : ''}</span>
							<span>{schemeLabel[id]}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<span class="sep" aria-hidden="true">›</span>

	<div class="dropdown">
		<button
			class="pill device"
			type="button"
			aria-label="Active destination"
			aria-haspopup="menu"
			aria-expanded={deviceOpen}
			onclick={() => (deviceOpen = !deviceOpen)}
		>
			<span class="label">{$activeDevice}</span>
			<span class="caret" aria-hidden="true">▾</span>
		</button>
		{#if deviceOpen}
			<ul class="menu" role="menu">
				{#each devices as d (d)}
					<li>
						<button
							class="menu-item"
							class:active={$activeDevice === d}
							type="button"
							role="menuitemradio"
							aria-checked={$activeDevice === d}
							onclick={() => pickDevice(d)}
						>
							<span class="check" aria-hidden="true">{$activeDevice === d ? '✓' : ''}</span>
							<span>{d}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
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
	.dropdown {
		position: relative;
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--xc-text);
		font-weight: 500;
		padding-block: 2px;
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
	.caret {
		font-size: 8px;
		color: var(--xc-text-tertiary);
	}

	.menu {
		position: absolute;
		inset-block-start: calc(100% + 6px);
		inset-inline-start: 0;
		min-width: 200px;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		padding: 4px;
		margin: 0;
		list-style: none;
		z-index: 100;
	}
	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding-block: 4px;
		padding-inline: 8px;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text);
		border-radius: 4px;
		text-align: start;
	}
	.menu-item:hover {
		background: var(--xc-blue);
		color: white;
	}
	.menu-item.active {
		color: var(--xc-text);
	}
	.check {
		width: 12px;
		display: inline-flex;
		justify-content: center;
		color: var(--xc-blue);
		font-size: 10px;
	}
	.menu-item:hover .check {
		color: white;
	}
</style>
