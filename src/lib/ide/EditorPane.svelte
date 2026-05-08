<script lang="ts">
	import type { FileNode } from '$lib/files/tree';
	import { locale } from '$lib/stores/locale';
	import EditorTabs from './EditorTabs.svelte';
	import JumpBar from './JumpBar.svelte';
	import CodeBody from './CodeBody.svelte';

	type Props = { file: FileNode; html: { en: string; ar: string } };
	let { file, html }: Props = $props();

	let activeHtml = $derived(html[$locale]);
	let tabs = $derived<FileNode[]>([file]);
</script>

<section class="editor" aria-label="Editor">
	<EditorTabs {tabs} activePath={file.path} />
	<JumpBar path={file.path} />
	<CodeBody html={activeHtml} lang={file.lang} />
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
</style>
