<script lang="ts">
	import EditorPane from '$lib/ide/EditorPane.svelte';
	import SiteHead from '$lib/SiteHead.svelte';
	import { getMeta } from '$lib/files/metadata';

	let { data } = $props();

	let meta = $derived(getMeta(data.file.contentKey));
	let description = $derived(
		meta?.description ??
			'Mostafa Alaa — Senior iOS Engineer based in Cairo. Portfolio rendered as a pixel-accurate Xcode 26 IDE.'
	);
</script>

<SiteHead
	title="Mostafa.xcodeproj — Senior iOS Engineer"
	{description}
	path="/"
/>

<EditorPane file={data.file} html={data.html} />
