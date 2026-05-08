<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { FileNode } from '$lib/files/tree';
	import FileIcon from './FileIcon.svelte';

	type Props = { file: FileNode; depth: number };
	let { file, depth }: Props = $props();

	let active = $derived(($page.url.pathname || '/') === file.path);

	function open(e: MouseEvent) {
		e.preventDefault();
		if (active) return;
		goto(file.path);
	}
</script>

<a
	href={file.path}
	class="row"
	class:active
	style="--depth:{depth}"
	onclick={open}
>
	<span class="icon" aria-hidden="true">
		<FileIcon kind={file.icon ?? 'swift'} />
	</span>
	<span class="name">{file.name}</span>
</a>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: 6px;
		padding-block: 3px;
		padding-inline-start: calc(8px + var(--depth, 0) * 14px);
		padding-inline-end: 8px;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text);
		border-radius: 4px;
		margin-inline: 4px;
		text-decoration: none;
	}
	.row:hover {
		background: var(--xc-border-subtle);
	}
	.row.active {
		background: var(--xc-blue);
		color: white;
	}
	.icon {
		display: inline-flex;
		width: 14px;
		justify-content: center;
	}
	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
