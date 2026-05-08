<script lang="ts">
	import { locale } from '$lib/stores/locale';
	import { t } from '$lib/i18n/strings';
</script>

<button
	class="toggle"
	type="button"
	aria-label="Switch language"
	onclick={() => locale.toggle()}
	title={$locale === 'en' ? 'العربية' : 'English'}
>
	<span class="globe" aria-hidden="true">
		<svg width="13" height="13" viewBox="0 0 13 13">
			<circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke="currentColor" />
			<ellipse cx="6.5" cy="6.5" rx="2.5" ry="5.5" fill="none" stroke="currentColor" />
			<line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" />
		</svg>
	</span>
	<span class="label" dir="ltr">
		{$locale === 'en' ? 'EN' : 'عر'}
	</span>
</button>

<style>
	.toggle {
		height: 26px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding-inline: 8px;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		border-radius: 6px;
		font-size: var(--fs-ui-tight);
		color: var(--xc-text);
		font-weight: 500;
	}
	.toggle:hover {
		background: var(--xc-border);
	}
	.globe {
		display: inline-flex;
		color: var(--xc-text-secondary);
	}
	.label {
		font-variant-numeric: tabular-nums;
		min-width: 18px;
		text-align: center;
	}
</style>
