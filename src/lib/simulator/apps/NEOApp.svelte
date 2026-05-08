<script lang="ts">
	import IOSStatusBar from '../IOSStatusBar.svelte';
	import NEOHome from './neo/NEOHome.svelte';
	import NEOTransactions from './neo/NEOTransactions.svelte';
	import NEOCardDetail from './neo/NEOCardDetail.svelte';
	import NEOTabBar from './neo/NEOTabBar.svelte';

	type Screen = 'home' | 'transactions' | 'card-detail';
	type Tab = 'home' | 'lifestyle' | 'cards' | 'profile';

	let stack = $state<Screen[]>(['home']);
	let activeTab = $state<Tab>('home');
	let activeCardId = $state<string | null>(null);

	function push(screen: Screen) {
		stack = [...stack, screen];
	}

	function pop() {
		if (stack.length > 1) stack = stack.slice(0, -1);
	}

	function openCard(id: string) {
		activeCardId = id;
		push('card-detail');
	}

	let topScreen = $derived(stack[stack.length - 1]);
</script>

<div class="neo-app">
	<IOSStatusBar tone="light" />

	<div class="screens">
		{#if topScreen === 'home'}
			<NEOHome onOpenTransactions={() => push('transactions')} onOpenCard={openCard} />
		{:else if topScreen === 'transactions'}
			<NEOTransactions onBack={pop} />
		{:else if topScreen === 'card-detail'}
			<NEOCardDetail cardId={activeCardId} onBack={pop} />
		{/if}
	</div>

	<NEOTabBar bind:active={activeTab} />
</div>

<style>
	.neo-app {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: #0a0a0c;
		color: #fff;
		font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
		min-height: 0;
		min-width: 0;
	}
	.screens {
		flex: 1;
		min-height: 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
