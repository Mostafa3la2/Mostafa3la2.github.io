<script lang="ts">
	type Action = { label: string; onclick: () => void; primary?: boolean };
	type Props = {
		open: boolean;
		title: string;
		message: string;
		actions: Action[];
		variant?: 'info' | 'warning' | 'error';
	};
	let { open, title, message, actions, variant = 'info' }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape' && actions.length > 0) {
			e.preventDefault();
			actions[actions.length - 1].onclick();
		} else if (e.key === 'Enter') {
			const primary = actions.find((a) => a.primary) ?? actions[0];
			if (primary) {
				e.preventDefault();
				primary.onclick();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="overlay" role="presentation">
		<div
			class="alert"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="alert-title"
			aria-describedby="alert-message"
			data-variant={variant}
		>
			<div class="icon" aria-hidden="true">
				{#if variant === 'error'}
					<svg width="48" height="48" viewBox="0 0 48 48">
						<circle cx="24" cy="24" r="22" fill="#ff7a7a" />
						<rect x="22" y="12" width="4" height="18" rx="1.5" fill="#1a1410" />
						<circle cx="24" cy="35" r="2.5" fill="#1a1410" />
					</svg>
				{:else if variant === 'warning'}
					<svg width="48" height="48" viewBox="0 0 48 48">
						<path d="M24 4 L46 42 L2 42 Z" fill="#ffa14f" />
						<rect x="22" y="16" width="4" height="14" rx="1.5" fill="#1a1410" />
						<circle cx="24" cy="36" r="2.2" fill="#1a1410" />
					</svg>
				{:else}
					<svg width="48" height="48" viewBox="0 0 48 48">
						<circle cx="24" cy="24" r="22" fill="#5896d6" />
						<rect x="22" y="18" width="4" height="18" rx="1.5" fill="#fff" />
						<circle cx="24" cy="13" r="2.5" fill="#fff" />
					</svg>
				{/if}
			</div>

			<div class="text">
				<h2 id="alert-title">{title}</h2>
				<p id="alert-message">{message}</p>
			</div>

			<footer class="actions">
				{#each actions as action (action.label)}
					<button
						type="button"
						class="action"
						class:primary={action.primary}
						onclick={action.onclick}
					>
						{action.label}
					</button>
				{/each}
			</footer>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		z-index: 1000;
		animation: fade-in var(--dur-medium) var(--ease-out);
		padding: 24px;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.alert {
		width: 420px;
		max-width: 100%;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		border-radius: 14px;
		padding: 22px 22px 18px;
		display: grid;
		grid-template-columns: 48px 1fr;
		grid-template-areas:
			'icon text'
			'actions actions';
		gap: 14px 18px;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.06) inset,
			0 24px 64px rgba(0, 0, 0, 0.6);
		animation: pop-in var(--dur-medium) var(--ease-out);
	}

	@keyframes pop-in {
		from { transform: scale(0.96); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.icon {
		grid-area: icon;
		display: flex;
		align-items: flex-start;
	}

	.text {
		grid-area: text;
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}
	.text h2 {
		margin: 0;
		font-size: 14px;
		font-weight: 700;
		color: var(--xc-text);
		letter-spacing: -0.1px;
	}
	.text p {
		margin: 0;
		font-size: 12px;
		line-height: 1.5;
		color: var(--xc-text-secondary);
	}

	.actions {
		grid-area: actions;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		padding-block-start: 8px;
		border-block-start: 1px solid var(--xc-border-subtle);
		margin-block-start: 4px;
	}

	.action {
		min-width: 72px;
		padding: 6px 14px;
		font-size: 12px;
		font-weight: 500;
		border-radius: 6px;
		background: var(--xc-bg-elevated);
		border: 1px solid var(--xc-border);
		color: var(--xc-text);
		cursor: pointer;
	}
	.action:hover {
		background: var(--xc-border-subtle);
	}
	.action.primary {
		background: var(--xc-blue);
		border-color: var(--xc-blue);
		color: #fff;
	}
	.action.primary:hover {
		background: #1a91ff;
	}
	.action:focus-visible {
		outline: 2px solid var(--xc-focus);
		outline-offset: 2px;
	}
</style>
