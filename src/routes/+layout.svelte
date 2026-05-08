<script lang="ts">
	import '../app.css';

	import TitleBar from '$lib/ide/TitleBar.svelte';
	import FileNavigator from '$lib/ide/FileNavigator.svelte';
	import EditorPane from '$lib/ide/EditorPane.svelte';
	import InspectorPane from '$lib/ide/InspectorPane.svelte';
	import SimulatorPane from '$lib/ide/SimulatorPane.svelte';
	import ConsolePane from '$lib/ide/ConsolePane.svelte';
	import StatusBar from '$lib/ide/StatusBar.svelte';

	let { children } = $props();
</script>

<div class="ide" data-xcode-version="26">
	<TitleBar />
	<FileNavigator />
	<EditorPane />
	<InspectorPane />
	<SimulatorPane />
	<ConsolePane />
	<StatusBar />

	{#if children}
		<div hidden>{@render children()}</div>
	{/if}
</div>

<style>
	.ide {
		height: 100dvh;
		min-height: 100dvh;
		display: grid;
		grid-template-columns: var(--xc-sidebar-width) 1fr var(--xc-inspector-width);
		grid-template-rows:
			var(--xc-titlebar-height)
			140px
			1fr
			var(--xc-console-height)
			var(--xc-statusbar-height);
		grid-template-areas:
			'titlebar  titlebar  titlebar'
			'nav       editor    inspector'
			'nav       editor    simulator'
			'nav       console   simulator'
			'statusbar statusbar statusbar';
		background: var(--xc-bg);
		color: var(--xc-text);
		overflow: hidden;
	}

	@media (max-width: 1023px) {
		.ide {
			grid-template-columns: var(--xc-sidebar-width) 1fr;
			grid-template-rows:
				var(--xc-titlebar-height)
				1fr
				var(--xc-console-height)
				var(--xc-statusbar-height);
			grid-template-areas:
				'titlebar  titlebar'
				'nav       editor'
				'nav       console'
				'statusbar statusbar';
		}
		.ide :global(.inspector),
		.ide :global(.sim) {
			display: none;
		}
	}

	@media (max-width: 899px) {
		.ide {
			grid-template-columns: 1fr;
			grid-template-rows:
				var(--xc-titlebar-height)
				1fr
				var(--xc-statusbar-height);
			grid-template-areas:
				'titlebar'
				'editor'
				'statusbar';
		}
		.ide :global(.nav),
		.ide :global(.console) {
			display: none;
		}
	}
</style>
