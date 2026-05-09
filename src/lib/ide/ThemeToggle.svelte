<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<button
	class="toggle"
	type="button"
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={$theme === 'dark' ? 'Light mode' : 'Dark mode'}
	onclick={() => theme.toggle()}
>
	{#if $theme === 'dark'}
		<!-- Show sun: clicking switches to light. -->
		<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
			<circle cx="7" cy="7" r="3" fill="currentColor" />
			<g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
				<line x1="7" y1="0.7" x2="7" y2="2.4" />
				<line x1="7" y1="11.6" x2="7" y2="13.3" />
				<line x1="0.7" y1="7" x2="2.4" y2="7" />
				<line x1="11.6" y1="7" x2="13.3" y2="7" />
				<line x1="2.5" y1="2.5" x2="3.7" y2="3.7" />
				<line x1="10.3" y1="10.3" x2="11.5" y2="11.5" />
				<line x1="2.5" y1="11.5" x2="3.7" y2="10.3" />
				<line x1="10.3" y1="3.7" x2="11.5" y2="2.5" />
			</g>
		</svg>
	{:else}
		<!-- Show moon: clicking switches to dark. -->
		<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
			<path
				d="M11.6 8.4 a4.5 4.5 0 0 1 -6 -6 a5 5 0 1 0 6 6 z"
				fill="currentColor"
			/>
		</svg>
	{/if}
</button>

<style>
	.toggle {
		width: 28px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-secondary);
		border-radius: 4px;
	}
	.toggle:hover {
		background: var(--xc-border);
		color: var(--xc-text);
	}
</style>
