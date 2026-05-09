<script lang="ts">
	/**
	 * Per-page head tags. Static og:image, twitter:card, etc. live in
	 * src/app.html. This component fills in the per-page bits — title,
	 * description, og:title, og:description, og:url, canonical.
	 */

	type Props = {
		title: string;
		description: string;
		path: string; // pathname starting with '/'
	};
	let { title, description, path }: Props = $props();

	const ORIGIN = 'https://mostafa3la2.github.io';
	let url = $derived(`${ORIGIN}${path === '/' ? '' : path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
