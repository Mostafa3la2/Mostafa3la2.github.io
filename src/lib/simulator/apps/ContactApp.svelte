<script lang="ts">
	/**
	 * ContactApp — the only "live" mini-app in the simulator (other schemes
	 * use real screenshots of shipped products). Each row is a real link
	 * that triggers native handling: mailto:, tel:, or opens GitHub /
	 * LinkedIn in a new tab.
	 *
	 * Renders inside Frame (with island + home indicator visible). The
	 * status-bar text up top flanks the dynamic island the way real iOS
	 * does — time on the left, signal/wifi/battery on the right.
	 */

	import { onMount } from 'svelte';

	type Action = {
		key: string;
		label: string;
		value: string;
		href: string;
		external?: boolean;
		tone: 'blue' | 'green' | 'gray' | 'indigo';
		icon: 'mail' | 'phone' | 'github' | 'linkedin';
	};

	const actions: Action[] = [
		{
			key: 'email',
			label: 'Email',
			value: 'mostafa.alternative@gmail.com',
			href: 'mailto:mostafa.alternative@gmail.com',
			tone: 'blue',
			icon: 'mail'
		},
		{
			key: 'phone',
			label: 'Call',
			value: '+20 114 454 0411',
			href: 'tel:+201144540411',
			tone: 'green',
			icon: 'phone'
		},
		{
			key: 'github',
			label: 'GitHub',
			value: '@mostafa3la2',
			href: 'https://github.com/mostafa3la2',
			external: true,
			tone: 'gray',
			icon: 'github'
		},
		{
			key: 'linkedin',
			label: 'LinkedIn',
			value: 'mostafa-alaa-5a2067115',
			href: 'https://www.linkedin.com/in/mostafa-alaa-5a2067115/',
			external: true,
			tone: 'indigo',
			icon: 'linkedin'
		}
	];

	let time = $state('9:41');
	function format(d: Date): string {
		const h = d.getHours();
		const m = String(d.getMinutes()).padStart(2, '0');
		const hh = h % 12 || 12;
		return `${hh}:${m}`;
	}
	onMount(() => {
		const tick = () => (time = format(new Date()));
		tick();
		const id = setInterval(tick, 30 * 1000);
		return () => clearInterval(id);
	});
</script>

<div class="contact-app">
	<!-- iOS status bar — flanks the Frame's dynamic island -->
	<div class="ios-statusbar">
		<span class="time">{time}</span>
		<span class="island-spacer" aria-hidden="true"></span>
		<span class="indicators" aria-hidden="true">
			<svg width="14" height="9" viewBox="0 0 17 11">
				<rect x="0" y="6" width="3" height="5" rx="0.5" fill="currentColor" />
				<rect x="4.5" y="4" width="3" height="7" rx="0.5" fill="currentColor" />
				<rect x="9" y="2" width="3" height="9" rx="0.5" fill="currentColor" />
				<rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
			</svg>
			<svg width="14" height="9" viewBox="0 0 15 11">
				<path d="M7.5 1 C 11 1 13.5 3 14 5.5 L 12.5 6 C 12 4 10 3 7.5 3 C 5 3 3 4 2.5 6 L 1 5.5 C 1.5 3 4 1 7.5 1 Z" fill="currentColor" />
				<circle cx="7.5" cy="9" r="1" fill="currentColor" />
			</svg>
			<svg width="22" height="9" viewBox="0 0 27 11">
				<rect x="0.5" y="0.5" width="22" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-opacity="0.6" />
				<rect x="2" y="2" width="19" height="7" rx="1.5" fill="currentColor" />
				<rect x="23.5" y="3.5" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
			</svg>
		</span>
	</div>

	<div class="body">
		<header class="hero">
			<div class="avatar" aria-hidden="true">
				<svg viewBox="0 0 64 64" width="64" height="64">
					<defs>
						<linearGradient id="avatar-bg" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stop-color="#0a84ff" />
							<stop offset="100%" stop-color="#5856d6" />
						</linearGradient>
					</defs>
					<rect width="64" height="64" rx="14" fill="url(#avatar-bg)" />
					<text
						x="32"
						y="42"
						text-anchor="middle"
						font-family="-apple-system, BlinkMacSystemFont, sans-serif"
						font-size="32"
						font-weight="700"
						fill="white">M</text>
				</svg>
			</div>
			<h1 class="name">Mostafa Alaa</h1>
			<p class="arabic">مصطفى علاء</p>
			<p class="role">Senior iOS Engineer</p>
			<p class="loc">Cairo, Egypt</p>
		</header>

		<section class="actions">
			{#each actions as a (a.key)}
				<a
					class="row"
					data-tone={a.tone}
					href={a.href}
					target={a.external ? '_blank' : undefined}
					rel={a.external ? 'noopener noreferrer' : undefined}
				>
					<span class="icon" data-icon={a.icon} aria-hidden="true">
						{#if a.icon === 'mail'}
							<svg width="14" height="14" viewBox="0 0 16 12">
								<rect x="0.5" y="0.5" width="15" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.2" />
								<path d="M0.5 1 L8 7 L15.5 1" fill="none" stroke="currentColor" stroke-width="1.2" />
							</svg>
						{:else if a.icon === 'phone'}
							<svg width="14" height="14" viewBox="0 0 14 14">
								<path
									d="M2.5 2 a1 1 0 0 1 1 -1 h2.2 a0.5 0.5 0 0 1 0.5 0.4 l0.6 2.4 a0.5 0.5 0 0 1 -0.2 0.5 l-1.4 1 a8 8 0 0 0 4 4 l1 -1.4 a0.5 0.5 0 0 1 0.5 -0.2 l2.4 0.6 a0.5 0.5 0 0 1 0.4 0.5 v2.2 a1 1 0 0 1 -1 1 c-5.5 0 -10 -4.5 -10 -10 z"
									fill="currentColor"
								/>
							</svg>
						{:else if a.icon === 'github'}
							<svg width="14" height="14" viewBox="0 0 14 14">
								<path
									d="M7 0.5 a6.5 6.5 0 0 0 -2 12.7 c0.3 0.05 0.45 -0.15 0.45 -0.3 v-1.1 c-1.8 0.4 -2.2 -0.85 -2.2 -0.85 a1.7 1.7 0 0 0 -0.7 -0.95 c-0.6 -0.4 0.05 -0.4 0.05 -0.4 a1.4 1.4 0 0 1 1 0.7 a1.4 1.4 0 0 0 1.9 0.55 a1.4 1.4 0 0 1 0.4 -0.9 c-1.4 -0.15 -2.9 -0.7 -2.9 -3.15 a2.5 2.5 0 0 1 0.65 -1.7 a2.3 2.3 0 0 1 0.05 -1.7 s0.55 -0.15 1.75 0.65 a6.1 6.1 0 0 1 3.2 0 c1.2 -0.8 1.75 -0.65 1.75 -0.65 a2.3 2.3 0 0 1 0.05 1.7 a2.5 2.5 0 0 1 0.65 1.7 c0 2.45 -1.5 3 -2.9 3.15 a1.55 1.55 0 0 1 0.45 1.2 v1.8 c0 0.15 0.15 0.35 0.45 0.3 a6.5 6.5 0 0 0 -2.05 -12.7 z"
									fill="currentColor"
								/>
							</svg>
						{:else if a.icon === 'linkedin'}
							<svg width="14" height="14" viewBox="0 0 14 14">
								<rect width="14" height="14" rx="2" fill="currentColor" />
								<rect x="2" y="5.5" width="2" height="6.5" fill="white" />
								<circle cx="3" cy="3.5" r="1" fill="white" />
								<path
									d="M5.5 5.5 h2 v0.8 a2 2 0 0 1 1.7 -0.9 c1.6 0 2.3 1 2.3 2.7 v3.9 h-2 v-3.4 c0 -0.9 -0.4 -1.4 -1.1 -1.4 c-0.7 0 -1 0.5 -1 1.4 v3.4 h-1.9 z"
									fill="white"
								/>
							</svg>
						{/if}
					</span>
					<div class="row-text">
						<span class="row-label">{a.label}</span>
						<span class="row-value">{a.value}</span>
					</div>
					<span class="chev" aria-hidden="true">›</span>
				</a>
			{/each}
		</section>

		<footer class="foot">
			<p class="open-to">
				Open to senior iOS roles + indie collaborations.<br />
				Mention something specific from this site if you write —
				it tells me you actually opened it.
			</p>
		</footer>
	</div>
</div>

<style>
	.contact-app {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: #f5f5f7;
		color: #1f1f1f;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
		min-height: 0;
		min-width: 0;
	}

	.ios-statusbar {
		height: 38px;
		padding-block-start: 8px;
		padding-inline: 18px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 600;
		font-size: 12px;
		color: #1f1f1f;
		flex-shrink: 0;
		z-index: 5;
	}
	.time {
		min-width: 28px;
	}
	.island-spacer {
		width: 80px;
	}
	.indicators {
		display: inline-flex;
		gap: 5px;
		align-items: center;
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: 8px 12px 36px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding-block: 8px 4px;
	}
	.avatar {
		margin-block-end: 8px;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
	}
	.avatar svg {
		width: 64px;
		height: 64px;
		display: block;
	}
	.name {
		font-size: 17px;
		font-weight: 700;
		margin: 0;
		letter-spacing: -0.2px;
	}
	.arabic {
		font-size: 12px;
		font-family: 'SF Arabic', 'Geeza Pro', system-ui, sans-serif;
		color: #6e6e73;
		margin: 0;
	}
	.role {
		font-size: 12px;
		color: #1f1f1f;
		margin: 4px 0 0;
		font-weight: 500;
	}
	.loc {
		font-size: 11px;
		color: #6e6e73;
		margin: 0;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.row {
		display: grid;
		grid-template-columns: 32px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: #ffffff;
		border-radius: 12px;
		text-decoration: none;
		color: inherit;
		min-height: 48px;
		transition: background 120ms ease-out, transform 120ms ease-out;
	}
	.row:hover {
		background: #fafafa;
	}
	.row:active {
		transform: scale(0.98);
		background: #ececee;
	}
	.icon {
		width: 28px;
		height: 28px;
		border-radius: 7px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.row[data-tone='blue'] .icon { background: #0a84ff; }
	.row[data-tone='green'] .icon { background: #34c759; }
	.row[data-tone='gray'] .icon { background: #1f1f1f; }
	.row[data-tone='indigo'] .icon { background: #0a66c2; }
	.row[data-tone='indigo'] .icon { color: transparent; }
	/* LinkedIn icon includes its own colored fill — keep wrapper for sizing only. */

	.row-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.row-label {
		font-size: 12px;
		font-weight: 600;
		color: #1f1f1f;
		line-height: 1.2;
	}
	.row-value {
		font-size: 11px;
		color: #6e6e73;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.chev {
		color: #c7c7cc;
		font-size: 16px;
		font-weight: 400;
	}

	.foot {
		margin-block-start: auto;
		padding-block-start: 12px;
		text-align: center;
	}
	.open-to {
		font-size: 10px;
		line-height: 1.5;
		color: #6e6e73;
		margin: 0;
	}
</style>
