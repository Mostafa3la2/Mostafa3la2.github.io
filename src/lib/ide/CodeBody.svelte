<script lang="ts">
	type Props = { source: string; lang: string };
	let { source, lang }: Props = $props();

	// Phase A: render raw text in monospace. Shiki tokenization wires up next.
	let lines = $derived(source.split('\n'));
</script>

<div class="code-body" data-lang={lang}>
	<div class="gutter" aria-hidden="true">
		{#each lines as _, i (i)}
			<span class="line-no">{i + 1}</span>
		{/each}
	</div>
	<pre class="code"><code>{source}</code></pre>
</div>

<style>
	.code-body {
		grid-area: body;
		display: grid;
		grid-template-columns: 56px 1fr;
		background: var(--xc-bg-editor);
		font-family: var(--font-mono);
		font-size: var(--fs-mono);
		line-height: var(--lh-mono);
		overflow: auto;
		min-height: 0;
		direction: ltr;
	}
	.gutter {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-block: 12px;
		padding-inline-end: 8px;
		background: var(--xc-gutter-bg);
		color: var(--xc-gutter-fg);
		font-size: var(--fs-mono-tight);
		line-height: var(--lh-mono);
		user-select: none;
		font-variant-numeric: tabular-nums;
	}
	.line-no {
		display: block;
	}
	.code {
		margin: 0;
		padding-block: 12px;
		padding-inline-start: 16px;
		padding-inline-end: 32px;
		overflow: visible;
		color: var(--syn-plain);
		font-family: inherit;
	}
	code {
		font-family: inherit;
		white-space: pre;
	}
</style>
