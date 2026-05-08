<script lang="ts">
	type Props = { onBack: () => void };
	let { onBack }: Props = $props();

	const days = [
		{
			label: 'Today',
			items: [
				{ m: 'AlBaik', cat: 'Food', a: '−SAR 38.50' },
				{ m: 'Riyadh Metro', cat: 'Transit', a: '−SAR 6.00' },
				{ m: 'Tamimi Markets', cat: 'Groceries', a: '−SAR 142.20' }
			]
		},
		{
			label: 'Yesterday',
			items: [
				{ m: 'Salary · CME', cat: 'Income', a: '+SAR 24,000.00', positive: true },
				{ m: 'STC Pay', cat: 'Bills', a: '−SAR 320.00' }
			]
		},
		{
			label: 'Wed, May 6',
			items: [
				{ m: 'Cinema VOX', cat: 'Lifestyle', a: '−SAR 75.00' },
				{ m: 'Section B Café', cat: 'Food', a: '−SAR 28.00' },
				{ m: 'Najm — Card top-up', cat: 'Transfer', a: '+SAR 200.00', positive: true }
			]
		}
	];
</script>

<div class="screen">
	<header class="navbar">
		<button class="back" type="button" onclick={onBack} aria-label="Back">‹</button>
		<h2>Transactions</h2>
		<button class="filter" type="button" aria-label="Filter">⚲</button>
	</header>

	<div class="body">
		{#each days as d (d.label)}
			<section class="day">
				<h3 class="day-label">{d.label}</h3>
				<ul class="txns">
					{#each d.items as t (t.m)}
						<li class="txn">
							<span class="t-cat" data-cat={t.cat}>{t.cat[0]}</span>
							<div class="t-mid">
								<span class="t-merchant">{t.m}</span>
								<span class="t-cat-label">{t.cat}</span>
							</div>
							<span class="t-amount" class:pos={t.positive}>{t.a}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>

<style>
	.screen {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		min-width: 0;
	}
	.navbar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 14px 8px;
		min-height: 36px;
	}
	.navbar h2 {
		flex: 1;
		font-size: 14px;
		font-weight: 700;
		margin: 0;
		text-align: center;
	}
	.back {
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
		padding: 0;
	}
	.filter {
		width: 28px;
		height: 28px;
		font-size: 14px;
		color: #c9a86b;
		background: transparent;
		border: 0;
	}

	.body {
		flex: 1;
		overflow-y: auto;
		padding: 0 14px 14px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.day {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.day-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: rgba(255, 255, 255, 0.4);
		margin: 0;
	}
	.txns {
		list-style: none;
		margin: 0;
		padding: 0;
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
	.txn:last-child { border-block-end: 0; }
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
		min-width: 0;
	}
	.t-merchant {
		font-size: 12px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.t-cat-label {
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
