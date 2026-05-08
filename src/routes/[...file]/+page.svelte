<script lang="ts">
	// EditorPane in the layout reads $page.url.pathname.
	// This page just resolves the route.
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.file.name} — Mostafa.xcodeproj</title>
</svelte:head>
