<script lang="ts">
	type Tab = 'home' | 'lifestyle' | 'cards' | 'profile';
	type Props = { active: Tab };
	let { active = $bindable('home') }: Props = $props();

	const tabs: { id: Tab; label: string; icon: string }[] = [
		{ id: 'home', label: 'Home', icon: '⌂' },
		{ id: 'lifestyle', label: 'Lifestyle', icon: '✦' },
		{ id: 'cards', label: 'Cards', icon: '▦' },
		{ id: 'profile', label: 'Profile', icon: '◐' }
	];
</script>

<nav class="tabbar" aria-label="Tabs">
	{#each tabs as t (t.id)}
		<button
			type="button"
			class="tab"
			class:active={active === t.id}
			onclick={() => (active = t.id)}
		>
			<span class="t-icon">{t.icon}</span>
			<span class="t-label">{t.label}</span>
		</button>
	{/each}
</nav>

<style>
	.tabbar {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: 6px 4px 18px;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(12px);
		border-block-start: 1px solid rgba(255, 255, 255, 0.06);
		flex-shrink: 0;
		gap: 2px;
	}
	.tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 4px 0;
		background: transparent;
		border: 0;
		color: rgba(255, 255, 255, 0.4);
		font-size: 9px;
	}
	.tab.active {
		color: #c9a86b;
	}
	.t-icon {
		font-size: 16px;
	}
	.t-label {
		font-size: 9px;
		font-weight: 500;
	}
</style>
