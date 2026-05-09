<script lang="ts">
	import { page } from '$app/stores';
	import { findFileByPath } from '$lib/files/tree';
	import { getMeta } from '$lib/files/metadata';

	let activeFile = $derived(findFileByPath($page.url.pathname || '/'));
	let meta = $derived(activeFile ? getMeta(activeFile.contentKey) : null);

	type Tab = 'inspector' | 'help';
	let activeTab = $state<Tab>('inspector');
</script>

<aside class="inspector" aria-label="Inspector">
	<header class="ins-header">
		<button
			class="ins-tab"
			class:active={activeTab === 'inspector'}
			type="button"
			onclick={() => (activeTab = 'inspector')}
		>
			Inspector
		</button>
		<button
			class="ins-tab"
			class:active={activeTab === 'help'}
			type="button"
			onclick={() => (activeTab = 'help')}
		>
			Quick Help
		</button>
	</header>

	<div class="ins-body">
		{#if !activeFile}
			<p class="hint">No file open.</p>
		{:else if activeTab === 'help'}
			<dl class="meta">
				<dt>Name</dt>
				<dd>{activeFile.name}</dd>
				<dt>Type</dt>
				<dd>{activeFile.lang}</dd>
				<dt>Path</dt>
				<dd class="path">{activeFile.path}</dd>
			</dl>
			{#if meta}
				<p class="hint">{meta.tagline}</p>
				{#if meta.kind === 'info' && meta.body}
					<p class="hint subtle">{meta.body}</p>
				{/if}
			{/if}
		{:else if meta?.kind === 'project'}
			<section class="project">
				<header class="proj-head">
					{#if meta.icon}
						<img class="proj-icon" src={meta.icon} alt="{meta.domain} icon" />
					{:else}
						<div class="proj-icon proj-icon-fallback" aria-hidden="true">
							<svg width="48" height="48" viewBox="0 0 48 48">
								<rect width="48" height="48" rx="11" fill="#3a3a40" />
								<path d="M12 16 L24 10 L36 16 L36 32 L24 38 L12 32 Z" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
							</svg>
						</div>
					{/if}
					<div class="proj-title">
						<span class="proj-name">{activeFile.name.replace('.swift', '')}</span>
						<span class="proj-domain">{meta.domain}</span>
						<span class="proj-period">{meta.period}</span>
					</div>
				</header>

				{#if meta.tagline}
					<p class="tagline">{meta.tagline}</p>
				{/if}

				<dl class="kv">
					{#if meta.market}
						<dt>Market</dt>
						<dd>{meta.market}</dd>
					{/if}
					{#if meta.employer}
						<dt>Employer</dt>
						<dd>{meta.employer}</dd>
					{/if}
				</dl>

				<section class="stack">
					<h4>Stack</h4>
					<div class="chips">
						{#each meta.stack as item (item)}
							<span class="chip">{item}</span>
						{/each}
					</div>
				</section>

				{#if meta.links && meta.links.length > 0}
					<section class="links">
						{#each meta.links as link (link.href)}
							<a class="link" href={link.href} target="_blank" rel="noopener noreferrer">
								{link.label}
								<span class="ext" aria-hidden="true">↗</span>
							</a>
						{/each}
					</section>
				{/if}
			</section>
		{:else if meta?.kind === 'info'}
			<section class="info">
				<header class="info-head">
					<span class="info-name">{activeFile.name}</span>
					<span class="info-tagline">{meta.tagline}</span>
				</header>
				{#if meta.body}
					<p class="info-body">{meta.body}</p>
				{/if}
				<dl class="kv subtle">
					<dt>Type</dt>
					<dd>{activeFile.lang}</dd>
					<dt>Path</dt>
					<dd class="path">{activeFile.path}</dd>
				</dl>
			</section>
		{:else}
			<dl class="meta">
				<dt>Name</dt>
				<dd>{activeFile.name}</dd>
				<dt>Type</dt>
				<dd>{activeFile.lang}</dd>
			</dl>
		{/if}
	</div>
</aside>

<style>
	.inspector {
		grid-area: inspector;
		background: var(--xc-bg-inspector);
		border-inline-start: 1px solid var(--xc-border);
		display: grid;
		grid-template-rows: 32px 1fr;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}
	.ins-header {
		display: flex;
		gap: 4px;
		border-block-end: 1px solid var(--xc-border-subtle);
		padding-inline: 8px;
		align-items: center;
	}
	.ins-tab {
		font-size: var(--fs-ui-small);
		padding: 6px 10px;
		color: var(--xc-text-tertiary);
		border-radius: 3px;
		background: transparent;
		border: 0;
	}
	.ins-tab.active {
		color: var(--xc-text);
		background: var(--xc-border-subtle);
	}
	.ins-tab:hover:not(.active) {
		background: var(--xc-border-subtle);
	}

	.ins-body {
		padding: 12px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	/* Project */
	.proj-head {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}
	.proj-icon {
		width: 56px;
		height: 56px;
		border-radius: 13px;
		flex-shrink: 0;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 10px rgba(0, 0, 0, 0.3);
	}
	.proj-icon-fallback {
		background: var(--xc-bg-elevated);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
	.proj-icon-fallback svg {
		width: 56px;
		height: 56px;
		border-radius: 13px;
		display: block;
	}
	.proj-title {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		flex: 1;
		padding-block-start: 2px;
	}
	.proj-name {
		font-size: 15px;
		font-weight: 700;
		color: var(--xc-text);
		letter-spacing: -0.2px;
	}
	.proj-domain {
		font-size: var(--fs-ui-small);
		color: var(--syn-keyword);
		font-weight: 500;
	}
	.proj-period {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-tertiary);
		font-feature-settings: 'tnum';
	}

	.tagline {
		font-size: 12px;
		line-height: 1.45;
		color: var(--xc-text-secondary);
		margin: 0;
		padding-block-end: 12px;
		border-block-end: 1px solid var(--xc-border-subtle);
	}

	.kv {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 12px;
		font-size: var(--fs-ui-small);
		margin: 0;
	}
	.kv.subtle {
		color: var(--xc-text-tertiary);
	}
	.kv dt {
		color: var(--xc-text-tertiary);
		text-align: end;
	}
	.kv dd {
		margin: 0;
		color: var(--xc-text);
	}
	.kv .path {
		font-family: var(--font-mono);
		color: var(--xc-text-secondary);
	}

	.stack h4 {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: var(--xc-text-tertiary);
		margin: 0 0 6px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}
	.chip {
		display: inline-flex;
		padding: 2px 8px;
		font-size: 10px;
		font-weight: 500;
		color: var(--syn-type-system);
		background: rgba(107, 223, 255, 0.08);
		border: 1px solid rgba(107, 223, 255, 0.18);
		border-radius: 5px;
		font-family: var(--font-mono);
		font-feature-settings: 'tnum';
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.link {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border: 1px solid var(--xc-border);
		border-radius: 6px;
		background: var(--xc-bg-elevated);
		color: var(--xc-blue);
		font-size: var(--fs-ui-small);
		text-decoration: none;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.link:hover {
		background: var(--xc-border);
	}
	.ext {
		color: var(--xc-text-tertiary);
		font-size: 12px;
	}

	/* Info */
	.info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.info-head {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.info-name {
		font-size: 14px;
		font-weight: 700;
		color: var(--xc-text);
	}
	.info-tagline {
		font-size: var(--fs-ui-small);
		color: var(--syn-keyword);
		font-weight: 500;
	}
	.info-body {
		font-size: 12px;
		line-height: 1.5;
		color: var(--xc-text-secondary);
		margin: 0;
	}

	/* Generic / placeholder */
	.meta {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 12px;
		font-size: var(--fs-ui-small);
		margin: 0;
	}
	.meta dt {
		color: var(--xc-text-tertiary);
		text-align: end;
	}
	.meta dd {
		margin: 0;
		color: var(--xc-text);
	}
	.meta .path {
		font-family: var(--font-mono);
	}
	.hint {
		font-size: var(--fs-ui-small);
		color: var(--xc-text-secondary);
		margin: 0;
		line-height: 1.5;
	}
	.hint.subtle {
		color: var(--xc-text-tertiary);
	}
</style>
