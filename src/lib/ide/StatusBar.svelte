<script lang="ts">
	import { onMount } from 'svelte';

	let cairoTime = $state('—');

	function formatCairo(d: Date): string {
		try {
			return new Intl.DateTimeFormat('en-GB', {
				timeZone: 'Africa/Cairo',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			}).format(d);
		} catch {
			return '—';
		}
	}

	onMount(() => {
		const tick = () => (cairoTime = formatCairo(new Date()));
		tick();
		const id = setInterval(tick, 30 * 1000);
		return () => clearInterval(id);
	});
</script>

<footer class="statusbar">
	<span class="dot ready" aria-hidden="true"></span>
	<span class="ready-label">Ready</span>
	<span class="sep" aria-hidden="true">•</span>
	<span class="branch">
		<span class="branch-icon" aria-hidden="true">
			<svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
				<circle cx="2.5" cy="2.5" r="1.5" fill="none" stroke="currentColor" />
				<circle cx="2.5" cy="8.5" r="1.5" fill="none" stroke="currentColor" />
				<circle cx="8.5" cy="5.5" r="1.5" fill="none" stroke="currentColor" />
				<line x1="2.5" y1="4" x2="2.5" y2="7" stroke="currentColor" />
				<path d="M2.5 4 Q 2.5 5.5 7 5.5" fill="none" stroke="currentColor" />
			</svg>
		</span>
		v3-xcode
	</span>

	<span class="spacer"></span>

	<span class="cairo">Cairo · {cairoTime}</span>
	<span class="sep" aria-hidden="true">•</span>
	<span class="version">Mostafa.xcodeproj v3.0.0-alpha</span>
</footer>

<style>
	.statusbar {
		grid-area: statusbar;
		height: var(--xc-statusbar-height);
		display: flex;
		align-items: center;
		gap: 8px;
		padding-inline: 12px;
		background: var(--xc-bg-statusbar);
		border-block-start: 1px solid var(--xc-border);
		font-size: var(--fs-ui-small);
		color: var(--xc-text-secondary);
		font-variant-numeric: tabular-nums;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.dot.ready {
		background: var(--xc-success);
		box-shadow: 0 0 4px rgba(103, 183, 164, 0.5);
	}
	.ready-label {
		color: var(--xc-text);
	}
	.sep {
		color: var(--xc-text-tertiary);
	}
	.branch {
		display: inline-flex;
		gap: 4px;
		align-items: center;
	}
	.branch-icon {
		display: inline-flex;
		color: var(--xc-text-tertiary);
	}
	.spacer {
		flex: 1;
	}
	.cairo,
	.version {
		color: var(--xc-text-secondary);
	}
</style>
