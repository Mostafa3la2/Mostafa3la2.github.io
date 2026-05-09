<script lang="ts">
	import { simLogs, simulator } from '$lib/stores/simulator';
	import { onMount } from 'svelte';

	let scrollEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		// Scroll to bottom whenever new lines arrive.
		const _ = $simLogs.length;
		if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
	});

	function clear() {
		simulator.clearLogs();
	}
</script>

<section class="console" aria-label="Console">
	<header class="console-header">
		<button class="ctab active" type="button">Console</button>
		<button class="ctab" type="button">Issues</button>
		<span class="spacer"></span>
		<button class="iconbtn" type="button" aria-label="Clear console" onclick={clear}>
			<svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
				<path d="M2 2 h7 l-1 7 a1 1 0 0 1 -1 1 h-3 a1 1 0 0 1 -1 -1 z" fill="none" stroke="currentColor" />
				<line x1="0.5" y1="2" x2="10.5" y2="2" stroke="currentColor" />
			</svg>
		</button>
	</header>

	<div class="console-body" bind:this={scrollEl}>
		{#each $simLogs as log, i (i)}
			<div class="line" data-tone={log.tone ?? 'plain'}>
				<span class="ts">{log.t}</span>
				<span class="text" class:success={log.tone === 'success'} class:error={log.tone === 'error'}>{log.text}</span>
			</div>
		{/each}
		{#if $simLogs.length === 0}
			<div class="empty">Console cleared.</div>
		{/if}
	</div>
</section>

<style>
	.console {
		grid-area: console;
		background: var(--xc-bg-console);
		border-block-start: 1px solid var(--xc-border);
		display: grid;
		grid-template-rows: 28px 1fr;
		min-height: 0;
		overflow: hidden;
	}
	.console-header {
		display: flex;
		align-items: center;
		gap: 4px;
		padding-inline: 8px;
		border-block-end: 1px solid var(--xc-border-subtle);
	}
	.ctab {
		font-size: var(--fs-ui-small);
		padding: 4px 10px;
		color: var(--xc-text-tertiary);
		border-radius: 3px;
	}
	.ctab.active {
		color: var(--xc-text);
		background: var(--xc-border-subtle);
	}
	.ctab:hover {
		background: var(--xc-border-subtle);
		color: var(--xc-text);
	}
	.spacer { flex: 1; }
	.iconbtn {
		width: 22px;
		height: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-tertiary);
		border-radius: 3px;
	}
	.iconbtn:hover {
		background: var(--xc-border-subtle);
		color: var(--xc-text);
	}

	.console-body {
		overflow-y: auto;
		font-family: var(--font-mono);
		font-size: var(--fs-mono-tight);
		color: var(--xc-text);
		padding: 8px 12px;
	}
	.line {
		display: flex;
		gap: 10px;
		line-height: 1.5;
	}
	.ts {
		color: var(--xc-text-tertiary);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}
	.text {
		color: var(--xc-text);
	}
	.text.success {
		color: var(--xc-success);
		font-weight: 500;
	}
	.text.error {
		color: var(--xc-error);
	}
	.empty {
		color: var(--xc-text-tertiary);
		font-style: italic;
	}
</style>
