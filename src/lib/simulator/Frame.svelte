<script lang="ts">
	type Props = {
		children?: import('svelte').Snippet;
		device?: 'iPhone 15 Pro' | 'iPhone SE' | 'iPad Pro 13"';
		accent?: string;
		/** When the content already has its own iOS chrome (e.g. a real screenshot),
		 *  set bare to skip the dynamic island and home indicator overlays. */
		bare?: boolean;
	};
	let {
		children,
		device = 'iPhone 15 Pro',
		accent = '#5896d6',
		bare = false
	}: Props = $props();

	// Each device has its own physical bezel/screen ratio.
	const dims = $derived.by(() => {
		switch (device) {
			case 'iPhone SE':
				return { width: 200, ratio: 9 / 16, radius: 24, screenRadius: 16, island: false };
			case 'iPad Pro 13"':
				return { width: 240, ratio: 13 / 18, radius: 18, screenRadius: 10, island: false };
			default:
				return { width: 220, ratio: 9 / 19.5, radius: 38, screenRadius: 30, island: true };
		}
	});
</script>

<div
	class="frame"
	style="--frame-w: {dims.width}px; --frame-r: {dims.radius}px; --screen-r: {dims.screenRadius}px; --aspect: {dims.ratio}; --accent: {accent};"
	role="presentation"
>
	<div class="screen">
		{#if dims.island && !bare}
			<div class="island" aria-hidden="true"></div>
		{/if}
		<div class="content">
			{#if children}{@render children()}{/if}
		</div>
		{#if !bare}
			<div class="indicator" aria-hidden="true"></div>
		{/if}
	</div>
</div>

<style>
	.frame {
		width: var(--frame-w);
		aspect-ratio: var(--aspect);
		background: #0b0b0d;
		border-radius: var(--frame-r);
		border: 4px solid #2a2a2f;
		padding: 6px;
		display: flex;
		box-shadow:
			0 12px 32px rgba(0, 0, 0, 0.55),
			inset 0 0 0 1px rgba(255, 255, 255, 0.04);
		position: relative;
	}
	.screen {
		flex: 1;
		background: #0a0a0c;
		border-radius: var(--screen-r);
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.island {
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 78px;
		height: 22px;
		background: #000;
		border-radius: 12px;
		z-index: 30;
		pointer-events: none;
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		min-width: 0;
	}
	.indicator {
		position: absolute;
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 4px;
		background: rgba(255, 255, 255, 0.4);
		border-radius: 2px;
		z-index: 30;
		pointer-events: none;
	}
</style>
