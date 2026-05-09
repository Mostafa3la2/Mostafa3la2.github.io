<script lang="ts">
	type Props = {
		open: boolean;
		title: string;
		onClose: () => void;
		children: import('svelte').Snippet;
		variant?: 'full' | 'half';
	};
	let { open, title, onClose, children, variant = 'full' }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="overlay">
		<button class="backdrop" type="button" onclick={onClose} aria-label="Close sheet"></button>
		<div
			class="sheet"
			data-variant={variant}
			role="dialog"
			aria-modal="true"
			aria-label={title}
			tabindex="-1"
		>
			<div class="grabber" aria-hidden="true"></div>
			<header class="sheet-header">
				<h2>{title}</h2>
				<button class="close" type="button" onclick={onClose} aria-label="Close">
					<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
						<path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
			</header>
			<div class="sheet-body">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		z-index: 800;
		animation: fade-in var(--dur-medium) var(--ease-out);
	}
	.backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(6px);
		border: 0;
		padding: 0;
		cursor: default;
	}
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	.sheet {
		position: relative;
		width: 100%;
		max-width: 520px;
		background: var(--xc-bg-titlebar);
		border-block-start: 1px solid var(--xc-border);
		border-radius: 16px 16px 0 0;
		display: grid;
		grid-template-rows: auto auto 1fr;
		max-height: 92dvh;
		min-height: 50dvh;
		animation: slide-up var(--dur-slow) var(--ease-out);
		overflow: hidden;
		box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.55);
	}
	.sheet[data-variant='half'] {
		max-height: 60dvh;
		min-height: 40dvh;
	}
	@keyframes slide-up {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}
	.grabber {
		width: 36px;
		height: 4px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.18);
		margin: 8px auto 0;
	}
	.sheet-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px 12px;
		border-block-end: 1px solid var(--xc-border-subtle);
	}
	.sheet-header h2 {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: var(--xc-text);
	}
	.close {
		width: 28px;
		height: 28px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--xc-text-secondary);
		background: var(--xc-bg-elevated);
		border-radius: 50%;
		border: 1px solid var(--xc-border);
	}
	.close:hover {
		background: var(--xc-border);
		color: var(--xc-text);
	}
	.sheet-body {
		overflow-y: auto;
		padding-block-end: env(safe-area-inset-bottom, 0);
	}
</style>
