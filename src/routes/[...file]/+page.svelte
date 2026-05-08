<script lang="ts">
	import EditorPane from '$lib/ide/EditorPane.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.file.name} — Mostafa.xcodeproj</title>
</svelte:head>

<EditorPane file={data.file} html={data.html} />
