<script lang="ts">
	import '../app.css';

	import TitleBar from '$lib/ide/TitleBar.svelte';
	import FileNavigator from '$lib/ide/FileNavigator.svelte';
	import InspectorPane from '$lib/ide/InspectorPane.svelte';
	import SimulatorPane from '$lib/ide/SimulatorPane.svelte';
	import ConsolePane from '$lib/ide/ConsolePane.svelte';
	import StatusBar from '$lib/ide/StatusBar.svelte';
	import XcodeAlert from '$lib/ide/XcodeAlert.svelte';
	import { simulator, simState } from '$lib/stores/simulator';

	let { children } = $props();

	let failureOpen = $derived($simState === 'failed');

	const failureActions = [
		{
			label: 'OK',
			primary: true,
			onclick: () => simulator.dismissFailure()
		}
	];
</script>

<div class="ide" data-xcode-version="26">
	<TitleBar />
	<FileNavigator />
	<main class="editor-slot">
		{@render children()}
	</main>
	<InspectorPane />
	<SimulatorPane />
	<ConsolePane />
	<StatusBar />
</div>

<XcodeAlert
	open={failureOpen}
	variant="error"
	title="Source Unavailable"
	message="The Earlier scheme references seven apps shipped between 2018 and 2023 under client NDAs (PTC, MGeHR, SWCC, Walto-Quran, Tadaway, Meshini/Ma'an, Kaza Shella). Compiled binaries only — no source in this project. Open Sources/Earlier.swift for the archive list."
	actions={failureActions}
/>

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

	.editor-slot {
		grid-area: editor;
		display: contents;
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
