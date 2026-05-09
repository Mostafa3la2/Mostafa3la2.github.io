<script lang="ts">
	import { tree } from '$lib/files/tree';
	import { openSheet, closeSheet } from '$lib/stores/mobileSheet';
	import FileTree from './FileTree.svelte';
	import MobileSheet from './MobileSheet.svelte';
	import FileIcon from './FileIcon.svelte';

	let open = $derived($openSheet === 'files');
</script>

<MobileSheet {open} title="Mostafa.xcodeproj" onClose={closeSheet}>
	<div class="proj-host">
		<div class="proj-row">
			<span class="caret" aria-hidden="true">▾</span>
			<span class="proj-icon" aria-hidden="true">
				<svg width="14" height="14" viewBox="0 0 14 14">
					<rect width="14" height="14" rx="3" fill="#5896d6" />
					<path d="M3 4 L7 2 L11 4 L11 10 L7 12 L3 10 Z" fill="none" stroke="#fff" stroke-width="0.8" />
				</svg>
			</span>
			<span class="proj-name">Mostafa</span>
		</div>
		<FileTree nodes={tree} depth={1} />
	</div>
</MobileSheet>

<style>
	.proj-host {
		padding: 8px 0 16px;
	}
	.proj-row {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 16px;
		font-size: var(--fs-ui);
		font-weight: 500;
		color: var(--xc-text);
	}
	.caret {
		display: inline-block;
		width: 10px;
		font-size: 9px;
		color: var(--xc-text-tertiary);
	}
	.proj-icon {
		display: inline-flex;
	}
</style>
