<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		tone?: 'light' | 'dark';
		carrier?: string;
	};
	let { tone = 'light', carrier = '' }: Props = $props();

	let time = $state('9:41');

	function format(d: Date): string {
		const h = d.getHours();
		const m = String(d.getMinutes()).padStart(2, '0');
		const hh = h % 12 || 12;
		return `${hh}:${m}`;
	}

	onMount(() => {
		const tick = () => (time = format(new Date()));
		tick();
		const id = setInterval(tick, 30 * 1000);
		return () => clearInterval(id);
	});
</script>

<div class="ios-statusbar" data-tone={tone}>
	<span class="time">{time}</span>
	<span class="island-spacer" aria-hidden="true"></span>
	<span class="indicators" aria-hidden="true">
		<svg width="17" height="11" viewBox="0 0 17 11">
			<rect x="0"  y="6" width="3" height="5" rx="0.5" fill="currentColor"/>
			<rect x="4.5" y="4" width="3" height="7" rx="0.5" fill="currentColor"/>
			<rect x="9" y="2" width="3" height="9" rx="0.5" fill="currentColor"/>
			<rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor"/>
		</svg>
		<svg width="15" height="11" viewBox="0 0 15 11">
			<path d="M7.5 1 C 11 1 13.5 3 14 5.5 L 12.5 6 C 12 4 10 3 7.5 3 C 5 3 3 4 2.5 6 L 1 5.5 C 1.5 3 4 1 7.5 1 Z" fill="currentColor"/>
			<path d="M7.5 5 C 9 5 10.5 6 11 7 L 9.5 7.5 C 9 7 8.5 7 7.5 7 C 6.5 7 6 7 5.5 7.5 L 4 7 C 4.5 6 6 5 7.5 5 Z" fill="currentColor"/>
			<circle cx="7.5" cy="9" r="1" fill="currentColor"/>
		</svg>
		<svg width="27" height="11" viewBox="0 0 27 11">
			<rect x="0.5" y="0.5" width="22" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
			<rect x="2" y="2" width="19" height="7" rx="1.5" fill="currentColor"/>
			<rect x="23.5" y="3.5" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6"/>
		</svg>
	</span>
</div>

<style>
	.ios-statusbar {
		height: 38px;
		padding-block-start: 8px;
		padding-inline: 22px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: 'SF Pro Text', -apple-system, system-ui, sans-serif;
		font-weight: 600;
		font-size: 13px;
		color: var(--ios-text, #fff);
		flex-shrink: 0;
		z-index: 20;
	}
	.ios-statusbar[data-tone='dark'] {
		--ios-text: #000;
	}
	.time {
		min-width: 30px;
	}
	.island-spacer {
		width: 90px;
	}
	.indicators {
		display: inline-flex;
		gap: 5px;
		align-items: center;
	}
</style>
