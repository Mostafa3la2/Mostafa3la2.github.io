<script lang="ts">
	import type { TreeNode } from '$lib/files/tree';
	import FileIcon from './FileIcon.svelte';
	import FileTreeRow from './FileTreeRow.svelte';
	import Self from './FileTree.svelte';

	type Props = { nodes: TreeNode[]; depth?: number };
	let { nodes, depth = 0 }: Props = $props();

	const initialExpanded: Record<string, boolean> = Object.fromEntries(
		nodes
			.filter((n) => n.type === 'folder')
			.map((n) => [n.name, (n as Extract<TreeNode, { type: 'folder' }>).expanded])
	);
	let expanded = $state<Record<string, boolean>>(initialExpanded);

	function toggle(name: string) {
		expanded[name] = !expanded[name];
	}
</script>

<ul class="tree">
	{#each nodes as node (node.name)}
		{#if node.type === 'folder'}
			<li>
				<button
					class="folder-row"
					style="--depth:{depth}"
					onclick={() => toggle(node.name)}
					aria-expanded={expanded[node.name]}
				>
					<span class="caret" class:open={expanded[node.name]} aria-hidden="true">▸</span>
					<span class="icon" aria-hidden="true">
						<FileIcon kind="folder" />
					</span>
					<span class="name">{node.name}</span>
				</button>
				{#if expanded[node.name]}
					<Self nodes={node.children} depth={depth + 1} />
				{/if}
			</li>
		{:else}
			<li>
				<FileTreeRow file={node} {depth} />
			</li>
		{/if}
	{/each}
</ul>

<style>
	.tree {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.folder-row {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 4px;
		padding-block: 3px;
		padding-inline-start: calc(4px + var(--depth, 0) * 14px);
		padding-inline-end: 8px;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text);
		border-radius: 4px;
		margin-inline: 4px;
		text-align: start;
	}
	.folder-row:hover {
		background: var(--xc-border-subtle);
	}
	.caret {
		display: inline-block;
		width: 10px;
		font-size: 9px;
		color: var(--xc-text-tertiary);
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.caret.open {
		transform: rotate(90deg);
	}
	[dir='rtl'] .caret {
		transform: rotate(180deg);
	}
	[dir='rtl'] .caret.open {
		transform: rotate(90deg);
	}
	.icon {
		width: 14px;
		display: inline-flex;
		justify-content: center;
	}
</style>
