<script lang="ts">
	type Props = {
		onOpenTransactions: () => void;
		onOpenCard: (id: string) => void;
	};
	let { onOpenTransactions, onOpenCard }: Props = $props();

	const cards = [
		{ id: 'sar', label: 'Everyday', currency: 'SAR', balance: '12,840.55', tone: 'gold' },
		{ id: 'usd', label: 'Travel', currency: 'USD', balance: '3,420.10', tone: 'midnight' },
		{ id: 'eur', label: 'Holiday', currency: 'EUR', balance: '1,180.00', tone: 'forest' }
	];

	const txns = [
		{ merchant: 'AlBaik', cat: 'Food', amount: '−SAR 38.50', when: 'Today · 13:42' },
		{ merchant: 'Riyadh Metro', cat: 'Transit', amount: '−SAR 6.00', when: 'Today · 09:18' },
		{ merchant: 'Salary · CME', cat: 'Income', amount: '+SAR 24,000.00', when: 'Yesterday', positive: true },
		{ merchant: 'Cinema VOX', cat: 'Lifestyle', amount: '−SAR 75.00', when: 'Wed' }
	];
</script>

<div class="screen">
	<header class="head">
		<div class="greet">
			<p class="hello">Good morning, Mostafa</p>
			<p class="sub">Your day, on track.</p>
		</div>
		<button class="avatar" type="button" aria-label="Profile">M</button>
	</header>

	<section class="cards" aria-label="Cards">
		<div class="cards-row">
			{#each cards as card (card.id)}
				<button
					type="button"
					class="card"
					data-tone={card.tone}
					onclick={() => onOpenCard(card.id)}
				>
					<span class="card-label">{card.label}</span>
					<span class="card-amount">
						<span class="card-currency">{card.currency}</span>
						<span class="card-balance">{card.balance}</span>
					</span>
					<span class="card-chip" aria-hidden="true"></span>
				</button>
			{/each}
		</div>
	</section>

	<section class="quick" aria-label="Quick actions">
		<button class="qa" type="button">
			<span class="qa-icon">↗</span><span>Send</span>
		</button>
		<button class="qa" type="button">
			<span class="qa-icon">↙</span><span>Request</span>
		</button>
		<button class="qa" type="button">
			<span class="qa-icon">▦</span><span>Cards</span>
		</button>
		<button class="qa" type="button">
			<span class="qa-icon">⋯</span><span>More</span>
		</button>
	</section>

	<section class="latest">
		<header class="latest-head">
			<h3>Latest</h3>
			<button type="button" onclick={onOpenTransactions} class="see-all">See all ›</button>
		</header>
		<ul class="txns">
			{#each txns as t (t.merchant + t.when)}
				<li class="txn">
					<span class="t-cat" data-cat={t.cat}>{t.cat[0]}</span>
					<div class="t-mid">
						<span class="t-merchant">{t.merchant}</span>
						<span class="t-when">{t.when}</span>
					</div>
					<span class="t-amount" class:pos={t.positive}>{t.amount}</span>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.screen {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 14px;
		overflow-y: auto;
		padding: 8px 14px 12px;
		font-size: 12px;
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 10px;
		margin-block-start: 4px;
	}
	.greet {
		flex: 1;
	}
	.hello {
		font-size: 15px;
		font-weight: 700;
		margin: 0;
		letter-spacing: -0.2px;
	}
	.sub {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.5);
		margin: 2px 0 0;
	}
	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, #c9a86b, #8a7344);
		color: #1a1410;
		font-weight: 700;
		font-size: 13px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.cards {
		min-height: 0;
	}
	.cards-row {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding-block: 2px;
		margin-inline: -14px;
		padding-inline: 14px;
		scrollbar-width: none;
	}
	.cards-row::-webkit-scrollbar { display: none; }
	.card {
		flex-shrink: 0;
		width: 156px;
		aspect-ratio: 1.586 / 1;
		border-radius: 14px;
		padding: 12px 13px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: start;
		scroll-snap-align: start;
		position: relative;
		color: #fff;
	}
	.card[data-tone='gold'] {
		background: linear-gradient(135deg, #c9a86b 0%, #6e5224 100%);
		color: #f4ead4;
	}
	.card[data-tone='midnight'] {
		background: linear-gradient(135deg, #0e1a2c 0%, #283a55 100%);
	}
	.card[data-tone='forest'] {
		background: linear-gradient(135deg, #1a3324 0%, #345d3f 100%);
	}
	.card-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		opacity: 0.85;
	}
	.card-amount {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.card-currency {
		font-size: 10px;
		font-weight: 600;
		opacity: 0.7;
	}
	.card-balance {
		font-size: 18px;
		font-weight: 700;
		font-feature-settings: 'tnum';
	}
	.card-chip {
		position: absolute;
		top: 12px;
		right: 13px;
		width: 22px;
		height: 16px;
		background: rgba(255, 255, 255, 0.18);
		border-radius: 3px;
	}

	.quick {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
	}
	.qa {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 8px 4px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		color: #fff;
		font-size: 10px;
		font-weight: 500;
	}
	.qa-icon {
		font-size: 16px;
		color: #c9a86b;
		font-weight: 600;
	}

	.latest-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 6px 0 4px;
	}
	.latest-head h3 {
		font-size: 13px;
		font-weight: 700;
		margin: 0;
	}
	.see-all {
		font-size: 11px;
		color: #c9a86b;
		background: transparent;
		border: 0;
		padding: 0;
	}
	.txns {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		overflow: hidden;
	}
	.txn {
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 8px 10px;
		border-block-end: 1px solid rgba(255, 255, 255, 0.05);
	}
	.txn:last-child {
		border-block-end: 0;
	}
	.t-cat {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: rgba(201, 168, 107, 0.15);
		color: #c9a86b;
		font-size: 11px;
		font-weight: 700;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.t-mid {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}
	.t-merchant {
		font-size: 12px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.t-when {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.45);
	}
	.t-amount {
		font-size: 11px;
		font-weight: 600;
		font-feature-settings: 'tnum';
	}
	.t-amount.pos {
		color: #67b7a4;
	}
</style>
