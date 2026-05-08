<script lang="ts">
	type Props = { kind: 'swift' | 'json' | 'md' | 'strings' | 'folder' };
	let { kind }: Props = $props();
</script>

{#if kind === 'folder'}
	<svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true" class="folder">
		<path
			d="M0.5 2 a1.5 1.5 0 0 1 1.5 -1.5 h3.5 l1.5 1.5 h5.5 a1 1 0 0 1 1 1 v7 a1 1 0 0 1 -1 1 h-11 a1 1 0 0 1 -1 -1 z"
			fill="#5896d6"
			stroke="#3d6f9e"
			stroke-width="0.5"
		/>
	</svg>
{:else if kind === 'swift'}
	<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" class="swift">
		<rect width="14" height="14" rx="3" fill="#f05138" />
		<path
			d="M3 4.2 c2 1.4 3.4 2.6 4.2 3.6 c-0.4 -0.7 -1.4 -2 -2.5 -3.4 c1.5 0.7 2.8 1.6 3.7 2.6 c0.4 -0.5 0.6 -1.2 0.5 -2 c0.6 0.7 1 1.5 1.1 2.4 c0.6 -0.4 0.6 0 0.5 0.5 c-0.4 1.6 -2.4 2.7 -4.6 2.4 c-1.4 -0.2 -2.7 -0.9 -3.5 -1.7 c0.8 0.4 2 0.6 3 0.4 c-0.7 -0.6 -1.7 -1.6 -2.4 -2.5 z"
			fill="#fff"
		/>
	</svg>
{:else if kind === 'json'}
	<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
		<rect width="14" height="14" rx="2" fill="#3a3a40" stroke="#48484e" />
		<text x="7" y="9.5" text-anchor="middle" font-size="6" font-family="ui-monospace" fill="#d9c97c">{`{ }`}</text>
	</svg>
{:else if kind === 'md'}
	<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
		<rect width="14" height="14" rx="2" fill="#3a3a40" stroke="#48484e" />
		<text x="7" y="10" text-anchor="middle" font-size="6" font-family="ui-monospace" fill="#a1a1a6" font-weight="700">md</text>
	</svg>
{:else if kind === 'strings'}
	<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
		<rect width="14" height="14" rx="2" fill="#3a3a40" stroke="#48484e" />
		<text x="7" y="10" text-anchor="middle" font-size="5.5" font-family="ui-monospace" fill="#ff8170">"&nbsp;"</text>
	</svg>
{/if}

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}
</style>
