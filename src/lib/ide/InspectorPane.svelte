<script lang="ts">
	import { page } from '$app/stores';
	import { findFileByPath } from '$lib/files/tree';
	import { t } from '$lib/i18n/strings';

	let activeFile = $derived(findFileByPath($page.url.pathname || '/'));
</script>

<aside class="inspector" aria-label="Inspector">
	<header class="ins-header">
		<button class="ins-tab active" type="button" aria-current="true">{$t('inspector.quick_help')}</button>
		<button class="ins-tab" type="button">{$t('inspector.file')}</button>
	</header>

	<div class="ins-body">
		{#if activeFile}
			<dl class="meta">
				<dt>{$t('inspector.meta.name')}</dt>
				<dd>{activeFile.name}</dd>
				<dt>{$t('inspector.meta.type')}</dt>
				<dd>{activeFile.lang}</dd>
				<dt>{$t('inspector.meta.path')}</dt>
				<dd class="path" dir="ltr">{activeFile.path}</dd>
			</dl>
			<p class="hint">{$t('inspector.placeholder')}</p>
		{:else}
			<p class="hint">{$t('inspector.no_file')}</p>
		{/if}
	</div>
</aside>

<style>
	.inspector {
		grid-area: inspector;
		background: var(--xc-bg-inspector);
		border-inline-start: 1px solid var(--xc-border);
		display: grid;
		grid-template-rows: 32px 1fr;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}
	.ins-header {
		display: flex;
		gap: 0;
		border-block-end: 1px solid var(--xc-border-subtle);
		padding-inline: 8px;
		gap: 4px;
	}
	.ins-tab {
		font-size: var(--fs-ui-small);
		padding: 6px 10px;
		color: var(--xc-text-tertiary);
		border-radius: 3px;
	}
	.ins-tab.active {
		color: var(--xc-text);
	}
	.ins-tab:hover {
		background: var(--xc-border-subtle);
	}

	.ins-body {
		padding: 12px;
		overflow-y: auto;
	}
	.meta {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 12px;
		font-size: var(--fs-ui-small);
		margin: 0 0 12px;
	}
	.meta dt {
		color: var(--xc-text-tertiary);
		text-align: end;
	}
	.meta dd {
		margin: 0;
		color: var(--xc-text);
	}
	.meta .path {
		font-family: var(--font-mono);
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
		margin: 0;
		line-height: 1.5;
	}
</style>
