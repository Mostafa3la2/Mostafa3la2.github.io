<script lang="ts">
	import { page } from '$app/stores';
	import { findFileByPath } from '$lib/files/tree';
	import { t } from '$lib/i18n/strings';
	import TrafficLights from './TrafficLights.svelte';
	import SchemePicker from './SchemePicker.svelte';
	import RunButton from './RunButton.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	let activeFile = $derived(findFileByPath($page.url.pathname || '/'));
</script>

<header class="titlebar">
	<TrafficLights />

	<div class="left">
		<button class="iconbtn" type="button" aria-label={$t('titlebar.toggle_navigator')}>
			<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
				<rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" />
				<line x1="5" y1="0.5" x2="5" y2="13.5" stroke="currentColor" />
			</svg>
		</button>
	</div>

	<div class="center">
		<RunButton />
		<SchemePicker />
	</div>

	<div class="title">
		<span class="proj">{$t('titlebar.project_name')}</span>
		<span class="sep" aria-hidden="true">›</span>
		<span class="active">{activeFile?.name ?? 'README.md'}</span>
	</div>

	<div class="right">
		<LocaleToggle />
		<button class="iconbtn" type="button" aria-label={$t('titlebar.toggle_inspector')}>
			<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
				<rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" />
				<line x1="9" y1="0.5" x2="9" y2="13.5" stroke="currentColor" />
			</svg>
		</button>
	</div>
</header>

<style>
	.titlebar {
		grid-area: titlebar;
		height: var(--xc-titlebar-height);
		display: grid;
		grid-template-columns: auto 1fr auto 1fr auto;
		align-items: center;
		gap: 12px;
		padding-inline-end: 12px;
		background: var(--xc-bg-titlebar);
		border-block-end: 1px solid var(--xc-border);
		user-select: none;
		-webkit-app-region: drag;
	}
	.left,
	.center,
	.right {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		-webkit-app-region: no-drag;
	}
	.center {
		justify-self: start;
	}
	.right {
		justify-self: end;
	}
	.title {
		justify-self: center;
		display: inline-flex;
		gap: 8px;
		align-items: center;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text);
		-webkit-app-region: no-drag;
	}
	.title .proj {
		color: var(--xc-text-secondary);
	}
	.title .sep {
		color: var(--xc-text-tertiary);
	}
	:global([dir='rtl']) .title .sep {
		transform: scaleX(-1);
	}
	.title .active {
		font-weight: 500;
	}
	.iconbtn {
		width: 28px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-secondary);
		border-radius: 4px;
	}
	.iconbtn:hover {
		background: var(--xc-border);
		color: var(--xc-text);
	}
</style>
