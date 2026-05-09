<script lang="ts">
	import '../app.css';

	import TitleBar from '$lib/ide/TitleBar.svelte';
	import FileNavigator from '$lib/ide/FileNavigator.svelte';
	import InspectorPane from '$lib/ide/InspectorPane.svelte';
	import SimulatorPane from '$lib/ide/SimulatorPane.svelte';
	import ConsolePane from '$lib/ide/ConsolePane.svelte';
	import StatusBar from '$lib/ide/StatusBar.svelte';
	import XcodeAlert from '$lib/ide/XcodeAlert.svelte';
	import MobileBottomBar from '$lib/ide/MobileBottomBar.svelte';
	import MobileFilesSheet from '$lib/ide/MobileFilesSheet.svelte';
	import MobileSimulatorSheet from '$lib/ide/MobileSimulatorSheet.svelte';
	import MobileInspectorSheet from '$lib/ide/MobileInspectorSheet.svelte';
	import { simulator, simState } from '$lib/stores/simulator';
	import { closeSheet } from '$lib/stores/mobileSheet';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	let failureOpen = $derived($simState === 'failed');

	const failureActions = [
		{
			label: 'OK',
			primary: true,
			onclick: () => simulator.dismissFailure()
		}
	];

	// Close any open mobile sheet on file navigation so the user can read.
	afterNavigate(() => {
		closeSheet();
	});
</script>

<div class="ide" data-xcode-version="26">
	<TitleBar />
	<div class="nav-host">
		<FileNavigator />
	</div>
	<main class="editor-slot">
		{@render children()}
	</main>
	<div class="inspector-host">
		<InspectorPane />
	</div>
	<div class="sim-host">
		<SimulatorPane />
	</div>
	<div class="console-host">
		<ConsolePane />
	</div>
	<StatusBar />
	<MobileBottomBar />
</div>

<MobileFilesSheet />
<MobileSimulatorSheet />
<MobileInspectorSheet />

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

	.nav-host { grid-area: nav; min-width: 0; min-height: 0; display: contents; }
	.editor-slot { grid-area: editor; display: contents; }
	.inspector-host { grid-area: inspector; min-width: 0; display: contents; }
	.sim-host { grid-area: simulator; min-width: 0; display: contents; }
	.console-host { grid-area: console; min-width: 0; display: contents; }

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
		.inspector-host,
		.sim-host {
			display: none;
		}
	}

	/* Phone-Xcode UI: editor full bleed, MobileBottomBar replaces all panes. */
	@media (max-width: 899px) {
		.ide {
			grid-template-columns: 1fr;
			grid-template-rows:
				var(--xc-titlebar-height)
				1fr
				auto
				var(--xc-statusbar-height);
			grid-template-areas:
				'titlebar'
				'editor'
				'mobilebar'
				'statusbar';
		}
		.nav-host,
		.console-host {
			display: none;
		}
	}

	/* Above 900px: hide the mobile bar. */
	@media (min-width: 900px) {
		:global(.mbar) {
			display: none !important;
		}
	}
</style>
