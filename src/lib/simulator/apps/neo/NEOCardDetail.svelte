<script lang="ts">
	type Props = {
		cardId: string | null;
		onBack: () => void;
	};
	let { cardId, onBack }: Props = $props();

	const cards = {
		sar: { label: 'Everyday', currency: 'SAR', balance: '12,840.55', last: '4451', tone: 'gold' },
		usd: { label: 'Travel', currency: 'USD', balance: '3,420.10', last: '0117', tone: 'midnight' },
		eur: { label: 'Holiday', currency: 'EUR', balance: '1,180.00', last: '8023', tone: 'forest' }
	};

	let card = $derived(cardId ? cards[cardId as keyof typeof cards] : cards.sar);
</script>

<div class="screen">
	<header class="navbar">
		<button class="back" type="button" onclick={onBack} aria-label="Back">‹</button>
		<h2>{card.label}</h2>
		<button class="more" type="button" aria-label="More">⋯</button>
	</header>

	<div class="card-big" data-tone={card.tone}>
		<span class="card-label">NEO · {card.label}</span>
		<span class="card-balance">
			<span class="ccy">{card.currency}</span>
			{card.balance}
		</span>
		<span class="card-number">•••• •••• •••• {card.last}</span>
		<span class="card-chip" aria-hidden="true"></span>
	</div>

	<div class="actions">
		<button class="action freeze" type="button">
			<span class="action-icon">❄︎</span>
			<span>Freeze</span>
		</button>
		<button class="action limit" type="button">
			<span class="action-icon">⊝</span>
			<span>Limit</span>
		</button>
		<button class="action settings" type="button">
			<span class="action-icon">⚙︎</span>
			<span>Settings</span>
		</button>
	</div>

	<section class="block">
		<h3>This month</h3>
		<div class="bar">
			<div class="fill" style="width: 64%"></div>
		</div>
		<div class="bar-meta">
			<span>SAR 6,420.20 spent</span>
			<span>of SAR 10,000</span>
		</div>
	</section>

	<section class="block">
		<h3>Recent on this card</h3>
		<ul class="mini">
			<li><span>Tamimi Markets</span><span>−SAR 142.20</span></li>
			<li><span>STC Pay</span><span>−SAR 320.00</span></li>
			<li><span>AlBaik</span><span>−SAR 38.50</span></li>
		</ul>
	</section>
</div>

<style>
	.screen {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
		overflow-y: auto;
		padding: 0 14px 14px;
		min-height: 0;
	}
	.navbar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 0 8px;
		min-height: 36px;
	}
	.navbar h2 {
		flex: 1;
		font-size: 14px;
		font-weight: 700;
		margin: 0;
		text-align: center;
	}
	.back, .more {
		width: 28px;
		height: 28px;
		font-size: 22px;
		line-height: 1;
		font-weight: 300;
		color: #c9a86b;
		background: transparent;
		border: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.more {
		font-size: 16px;
	}

	.card-big {
		aspect-ratio: 1.586 / 1;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		justify-content: space-between;
		position: relative;
		color: #fff;
	}
	.card-big[data-tone='gold'] {
		background: linear-gradient(135deg, #c9a86b 0%, #6e5224 100%);
		color: #f4ead4;
	}
	.card-big[data-tone='midnight'] {
		background: linear-gradient(135deg, #0e1a2c 0%, #283a55 100%);
	}
	.card-big[data-tone='forest'] {
		background: linear-gradient(135deg, #1a3324 0%, #345d3f 100%);
	}
	.card-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		opacity: 0.85;
	}
	.card-balance {
		font-size: 22px;
		font-weight: 700;
		font-feature-settings: 'tnum';
		display: flex;
		align-items: baseline;
		gap: 5px;
	}
	.card-balance .ccy {
		font-size: 12px;
		font-weight: 600;
		opacity: 0.75;
	}
	.card-number {
		font-size: 11px;
		font-feature-settings: 'tnum';
		letter-spacing: 0.5px;
		opacity: 0.85;
	}
	.card-chip {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 26px;
		height: 18px;
		background: rgba(255, 255, 255, 0.18);
		border-radius: 3px;
	}

	.actions {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}
	.action {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 10px 4px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		color: #fff;
		font-size: 10px;
		font-weight: 500;
	}
	.action-icon {
		font-size: 16px;
		color: #c9a86b;
	}

	.block h3 {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: rgba(255, 255, 255, 0.4);
		margin: 0 0 6px;
	}
	.bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 3px;
		overflow: hidden;
	}
	.bar .fill {
		height: 100%;
		background: linear-gradient(90deg, #c9a86b, #f0d28a);
	}
	.bar-meta {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		color: rgba(255, 255, 255, 0.5);
		margin-block-start: 4px;
	}
	.mini {
		list-style: none;
		margin: 0;
		padding: 0;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
	}
	.mini li {
		display: flex;
		justify-content: space-between;
		padding: 7px 10px;
		font-size: 11px;
		border-block-end: 1px solid rgba(255, 255, 255, 0.05);
	}
	.mini li:last-child {
		border-block-end: 0;
	}
	.mini li span:last-child {
		font-feature-settings: 'tnum';
		color: rgba(255, 255, 255, 0.65);
	}
</style>
