<script lang="ts">
	import { tree } from '$lib/files/tree';
	import FileTree from './FileTree.svelte';
</script>

<aside class="nav" aria-label="Project navigator">
	<header class="nav-header">
		<button class="nav-tab active" type="button" aria-label="Project navigator" aria-current="page">
			<svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
				<path
					d="M1 3 a1 1 0 0 1 1-1 h3 l1 1 h5 a1 1 0 0 1 1 1 v6 a1 1 0 0 1 -1 1 h-9 a1 1 0 0 1 -1 -1 z"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
				/>
			</svg>
		</button>
	</header>

	<div class="project">
		<button class="proj-row" type="button">
			<span class="caret open" aria-hidden="true">▸</span>
			<span class="proj-icon" aria-hidden="true">
				<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
					<rect width="14" height="14" rx="3" fill="#5896d6" />
					<path d="M3 4 L7 2 L11 4 L11 10 L7 12 L3 10 Z" fill="none" stroke="#fff" stroke-width="0.8" />
				</svg>
			</span>
			<span class="proj-name">Mostafa</span>
		</button>
	</div>

	<div class="tree-wrap">
		<FileTree nodes={tree} depth={1} />
	</div>

	<footer class="nav-filter">
		<input
			type="search"
			placeholder="Filter"
			aria-label="Filter files"
		/>
	</footer>
</aside>

<style>
	.nav {
		grid-area: nav;
		background: var(--xc-bg-sidebar);
		border-inline-end: 1px solid var(--xc-border);
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		min-width: 0;
		overflow: hidden;
	}

	.nav-header {
		height: 32px;
		display: flex;
		align-items: center;
		padding-inline: 8px;
		gap: 4px;
		border-block-end: 1px solid var(--xc-border-subtle);
	}
	.nav-tab {
		width: 26px;
		height: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-secondary);
		border-radius: 3px;
	}
	.nav-tab.active {
		color: var(--xc-blue);
		background: var(--xc-border-subtle);
	}

	.project {
		padding-block: 6px;
		padding-inline: 0;
	}
	.proj-row {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 6px;
		padding-block: 4px;
		padding-inline: 8px;
		font-size: var(--fs-ui);
		font-weight: 500;
		text-align: start;
	}
	.proj-row:hover {
		background: var(--xc-border-subtle);
	}
	.caret {
		display: inline-block;
		width: 10px;
		font-size: 9px;
		color: var(--xc-text-tertiary);
	}
	.caret.open {
		transform: rotate(90deg);
	}
	[dir='rtl'] .caret.open {
		transform: rotate(90deg);
	}

	.tree-wrap {
		overflow-y: auto;
		padding-block-end: 8px;
	}

	.nav-filter {
		border-block-start: 1px solid var(--xc-border-subtle);
		padding: 6px 8px;
	}
	.nav-filter input {
		width: 100%;
		height: 22px;
		padding-inline: 8px;
		background: var(--xc-bg-deeper);
		color: var(--xc-text);
		border: 1px solid var(--xc-border);
		border-radius: 4px;
		font-size: var(--fs-ui-small);
		font-family: var(--font-ui);
	}
	.nav-filter input::placeholder {
		color: var(--xc-text-tertiary);
	}
	.nav-filter input:focus {
		outline: none;
		border-color: var(--xc-focus);
	}
</style>
