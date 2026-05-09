<script lang="ts">
	type Props = { path: string };
	let { path }: Props = $props();

	let segments = $derived(
		path
			.split('/')
			.filter(Boolean)
	);
</script>

<nav class="jumpbar" aria-label="Path">
	<button class="back" type="button" aria-label="Go back">
		<span class="chev">‹</span>
	</button>
	<button class="forward" type="button" aria-label="Go forward">
		<span class="chev">›</span>
	</button>

	<div class="crumbs" role="list">
		<span class="crumb root" role="listitem">
			<svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
				<rect width="11" height="11" rx="2" fill="#5896d6" />
			</svg>
			<span>Mostafa</span>
		</span>
		{#each segments as seg, i (i)}
			<span class="sep" aria-hidden="true">›</span>
			<span class="crumb" class:active={i === segments.length - 1} role="listitem">
				{seg}
			</span>
		{/each}
		{#if segments.length === 0}
			<span class="sep" aria-hidden="true">›</span>
			<span class="crumb active" role="listitem">README.md</span>
		{/if}
	</div>
</nav>

<style>
	.jumpbar {
		grid-area: jump;
		height: var(--xc-jumpbar-height);
		display: flex;
		align-items: center;
		gap: 6px;
		padding-inline: 8px;
		background: var(--xc-bg-editor);
		border-block-end: 1px solid var(--xc-border);
		font-size: var(--fs-ui-small);
	}
	.back,
	.forward {
		width: 22px;
		height: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-tertiary);
		border-radius: 3px;
	}
	.back:hover,
	.forward:hover {
		background: var(--xc-border-subtle);
		color: var(--xc-text);
	}
	.chev {
		font-size: 14px;
		line-height: 1;
	}
	.crumbs {
		display: flex;
		align-items: center;
		gap: 4px;
		min-width: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.crumbs::-webkit-scrollbar { display: none; }
	.crumb {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: var(--xc-text-secondary);
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
	}
	.crumb.active {
		color: var(--xc-text);
	}
	.crumb:hover {
		background: var(--xc-border-subtle);
	}
	.sep {
		color: var(--xc-text-tertiary);
	}
</style>
