<script lang="ts">
	type Props = { html: string; lang: string };
	let { html, lang }: Props = $props();

	// Shiki tokenizes server-side. The HTML is a flat sequence of
	// <span style="color: #..."> tokens (structure: 'inline'). We split
	// it into lines here so the gutter can render line numbers in lockstep.
	let lines = $derived(splitLines(html));

	function splitLines(input: string): string[] {
		// Shiki's inline output is one long string of <span> tokens with literal
		// newlines between them. Splitting on \n gives us the per-line HTML —
		// but we need to be careful not to split inside a span. With
		// structure: 'inline' Shiki never lets a token wrap a newline, so this
		// is safe.
		return input.split('\n');
	}
</script>

<div class="code-body" data-lang={lang}>
	<div class="gutter" aria-hidden="true">
		{#each lines as _, i (i)}
			<span class="line-no">{i + 1}</span>
		{/each}
	</div>
	<pre class="code"><code>{#each lines as line, i (i)}<span class="line">{@html line || '&#8203;'}</span>{#if i < lines.length - 1}{'\n'}{/if}{/each}</code></pre>
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
		position: sticky;
		inset-inline-start: 0;
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
		display: block;
	}
	.line {
		display: inline;
	}
</style>
