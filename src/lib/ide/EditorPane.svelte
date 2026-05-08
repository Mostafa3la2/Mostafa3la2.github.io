<script lang="ts">
	import { page } from '$app/stores';
	import { findFileByPath, type FileNode } from '$lib/files/tree';
	import { getContent } from '$lib/files/contents/index';
	import EditorTabs from './EditorTabs.svelte';
	import JumpBar from './JumpBar.svelte';
	import CodeBody from './CodeBody.svelte';

	let activePath = $derived($page.url.pathname || '/');
	let activeFile = $derived(findFileByPath(activePath));

	// For Phase A, pin a default tab strip — Phase C wires open-tab tracking.
	let tabs = $derived<FileNode[]>(activeFile ? [activeFile] : []);

	let source = $derived(activeFile ? getContent(activeFile.contentKey) : '');
	let lang = $derived(activeFile?.lang ?? 'swift');
</script>

<section class="editor" aria-label="Editor">
	<EditorTabs {tabs} activePath={activePath} />
	<JumpBar path={activePath} />
	{#if activeFile}
		<CodeBody {source} lang={lang} />
	{:else}
		<div class="empty">No file open.</div>
	{/if}
</section>

<style>
	.editor {
		grid-area: editor;
		display: grid;
		grid-template-rows: var(--xc-tab-height) var(--xc-jumpbar-height) 1fr;
		grid-template-areas:
			'tabs'
			'jump'
			'body';
		min-height: 0;
		min-width: 0;
	}
	.empty {
		grid-area: body;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-tertiary);
		font-size: var(--fs-ui);
	}
</style>
