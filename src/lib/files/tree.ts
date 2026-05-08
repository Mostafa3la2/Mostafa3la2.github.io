/**
 * The "files" model — drives the FileNavigator and the routes.
 *
 * Each node is either a folder (children) or a file (path resolves to a content
 * module under src/lib/files/). The tree is intentionally hand-authored so the
 * folder structure stays meaningful (Sources / Resources / Tests / Contact),
 * not derived from the filesystem.
 */

export type Lang = 'swift' | 'json' | 'markdown' | 'strings';

export interface FileNode {
	type: 'file';
	name: string;
	path: string; // route path, e.g. /sources/neo
	contentKey: string; // resolves to src/lib/files/contents/<key>
	lang: Lang;
	icon?: 'swift' | 'json' | 'md' | 'strings';
}

export interface FolderNode {
	type: 'folder';
	name: string;
	expanded: boolean;
	children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

/**
 * The project tree. Root is "Mostafa.xcodeproj" — that label is rendered as
 * the project root header, not as a node here.
 */
export const tree: TreeNode[] = [
	{
		type: 'file',
		name: 'README.md',
		path: '/',
		contentKey: 'readme',
		lang: 'markdown',
		icon: 'md'
	},
	{
		type: 'folder',
		name: 'Sources',
		expanded: true,
		children: [
			{
				type: 'file',
				name: 'AboutMe.swift',
				path: '/sources/about',
				contentKey: 'about',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'NEO.swift',
				path: '/sources/neo',
				contentKey: 'neo',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'TRU.swift',
				path: '/sources/tru',
				contentKey: 'tru',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'BabySteps.swift',
				path: '/sources/babysteps',
				contentKey: 'babysteps',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'Takhawi.swift',
				path: '/sources/takhawi',
				contentKey: 'takhawi',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'Earlier.swift',
				path: '/sources/earlier',
				contentKey: 'earlier',
				lang: 'swift',
				icon: 'swift'
			}
		]
	},
	{
		type: 'folder',
		name: 'Resources',
		expanded: true,
		children: [
			{
				type: 'file',
				name: 'Career.md',
				path: '/resources/career',
				contentKey: 'career',
				lang: 'markdown',
				icon: 'md'
			},
			{
				type: 'file',
				name: 'Toolkit.json',
				path: '/resources/toolkit',
				contentKey: 'toolkit',
				lang: 'json',
				icon: 'json'
			},
			{
				type: 'file',
				name: 'OffScreen.swift',
				path: '/resources/offscreen',
				contentKey: 'offscreen',
				lang: 'swift',
				icon: 'swift'
			},
			{
				type: 'file',
				name: 'Localization.strings',
				path: '/resources/localization',
				contentKey: 'localization',
				lang: 'strings',
				icon: 'strings'
			}
		]
	},
	{
		type: 'folder',
		name: 'Tests',
		expanded: true,
		children: [
			{
				type: 'file',
				name: 'Colophon.swift',
				path: '/tests/colophon',
				contentKey: 'colophon',
				lang: 'swift',
				icon: 'swift'
			}
		]
	},
	{
		type: 'folder',
		name: 'Contact',
		expanded: true,
		children: [
			{
				type: 'file',
				name: 'Contact.swift',
				path: '/contact',
				contentKey: 'contact',
				lang: 'swift',
				icon: 'swift'
			}
		]
	}
];

/** Walk the tree to find a file by route path. */
export function findFileByPath(path: string): FileNode | null {
	const normalized = path === '' ? '/' : path;
	function walk(nodes: TreeNode[]): FileNode | null {
		for (const node of nodes) {
			if (node.type === 'file' && node.path === normalized) return node;
			if (node.type === 'folder') {
				const found = walk(node.children);
				if (found) return found;
			}
		}
		return null;
	}
	return walk(tree);
}

/** Walk the tree to find a file by contentKey. */
export function findFileByKey(key: string): FileNode | null {
	function walk(nodes: TreeNode[]): FileNode | null {
		for (const node of nodes) {
			if (node.type === 'file' && node.contentKey === key) return node;
			if (node.type === 'folder') {
				const found = walk(node.children);
				if (found) return found;
			}
		}
		return null;
	}
	return walk(tree);
}

/** Flat list of all files for routing prerender. */
export function allFiles(): FileNode[] {
	const out: FileNode[] = [];
	function walk(nodes: TreeNode[]) {
		for (const node of nodes) {
			if (node.type === 'file') out.push(node);
			else walk(node.children);
		}
	}
	walk(tree);
	return out;
}
