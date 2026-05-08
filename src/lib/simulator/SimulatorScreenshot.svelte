<script lang="ts">
	import type { AppId } from '$lib/stores/simulator';
	import { base } from '$app/paths';

	type Props = { app: AppId };
	let { app }: Props = $props();

	const screens: Record<AppId, { src: string; alt: string; label: string }> = {
		neo: {
			src: `${base}/assets/screens/NEO.png`,
			alt: 'NEO banking app — Saudi Riyal account home screen with widgets and recent transactions',
			label: 'NEO'
		},
		tru: {
			src: `${base}/assets/screens/TRU.png`,
			alt: 'TRU app — Available limit EGP 66,910, exclusive finance offers, spotlight picks',
			label: 'TRU'
		},
		babysteps: {
			src: `${base}/assets/screens/babysteps.png`,
			alt: "BabySteps — Lilly's profile, last feed/sleep/diaper, today's summary, timeline",
			label: 'BabySteps'
		},
		takhawi: {
			src: `${base}/assets/screens/takhawe.png`,
			alt: 'Takhawi — Where are you headed? Saudi destinations: Hail, Medina, Al-Ula',
			label: 'Takhawi'
		}
	};

	let current = $derived(screens[app]);
</script>

<div class="shot-wrap">
	<img class="shot" src={current.src} alt={current.alt} draggable="false" />
</div>

<style>
	.shot-wrap {
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		scrollbar-width: none;
		background: #000;
	}
	.shot-wrap::-webkit-scrollbar {
		display: none;
	}
	.shot {
		display: block;
		width: 100%;
		height: auto;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
