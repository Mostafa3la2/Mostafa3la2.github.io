<script lang="ts">
	// Decorative — they don't do anything. The whole shell is the window.
</script>

<div class="lights" aria-hidden="true">
	<span class="light close"></span>
	<span class="light min"></span>
	<span class="light max"></span>
</div>

<style>
	.lights {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		padding-inline: 12px;
	}
	.light {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: block;
		border: 0.5px solid rgba(0, 0, 0, 0.3);
	}
	.close { background: #ff5f57; }
	.min   { background: #febc2e; }
	.max   { background: #28c840; }

	/* Hover reveals the symbol — like macOS */
	.lights:hover .close::after,
	.lights:hover .min::after,
	.lights:hover .max::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		mask-position: center;
		mask-repeat: no-repeat;
		mask-size: 8px;
	}
</style>
