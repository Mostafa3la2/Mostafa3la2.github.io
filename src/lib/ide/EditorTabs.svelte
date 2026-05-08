<script lang="ts">
	import type { FileNode } from '$lib/files/tree';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n/strings';

	type Props = { tabs: FileNode[]; activePath: string };
	let { tabs, activePath }: Props = $props();
</script>

<div class="tabs" role="tablist" aria-label="Open files">
	{#each tabs as tab (tab.path)}
		<button
			class="tab"
			class:active={tab.path === activePath}
			onclick={() => goto(tab.path)}
			role="tab"
			aria-selected={tab.path === activePath}
			type="button"
		>
			<span class="name">{tab.name}</span>
			<span class="close" aria-label={$t('editor.tab.close')} tabindex="-1" role="presentation">×</span>
		</button>
	{/each}
</div>

<style>
	.tabs {
		grid-area: tabs;
		display: flex;
		gap: 0;
		height: var(--xc-tab-height);
		background: var(--xc-bg-titlebar);
		border-block-end: 1px solid var(--xc-border);
		overflow-x: auto;
		scrollbar-width: none;
	}
	.tabs::-webkit-scrollbar { display: none; }
	.tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 100%;
		padding-inline: 12px;
		min-width: 120px;
		max-width: 220px;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text-secondary);
		border-inline-end: 1px solid var(--xc-border-subtle);
		background: var(--xc-bg-titlebar);
	}
	.tab:hover {
		background: var(--xc-bg-elevated);
		color: var(--xc-text);
	}
	.tab.active {
		background: var(--xc-bg-editor);
		color: var(--xc-text);
		border-block-end: 1px solid var(--xc-bg-editor);
		margin-block-end: -1px;
	}
	.name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.close {
		opacity: 0;
		font-size: 16px;
		line-height: 1;
		color: var(--xc-text-tertiary);
		width: 14px;
		height: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		transition: opacity var(--dur-fast) var(--ease-out);
	}
	.tab:hover .close,
	.tab.active .close {
		opacity: 1;
	}
	.close:hover {
		background: var(--xc-border);
		color: var(--xc-text);
	}
</style>
