<script lang="ts">
	import EditorPane from '$lib/ide/EditorPane.svelte';
	import SiteHead from '$lib/SiteHead.svelte';
	import { getMeta } from '$lib/files/metadata';

	let { data } = $props();

	let meta = $derived(getMeta(data.file.contentKey));
	let description = $derived(
		meta?.description ??
			`${data.file.name} — Mostafa.xcodeproj. Senior iOS Engineer's portfolio.`
	);
</script>

<SiteHead
	title="{data.file.name} — Mostafa.xcodeproj"
	{description}
	path={data.file.path}
/>

<EditorPane file={data.file} html={data.html} />
