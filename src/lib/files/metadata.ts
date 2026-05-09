/**
 * File metadata — what the inspector pane shows for each file.
 *
 * Project files (NEO/TRU/BabySteps/Takhawi/Earlier) get a rich card
 * with icon, domain, period, stack chips. Other files get a short
 * description. Pure data — no Svelte; can be imported anywhere.
 */

import { base } from '$app/paths';

export type StackTone = 'swift' | 'tooling' | 'platform' | 'arch' | 'data';

export interface ProjectMeta {
	kind: 'project';
	icon?: string;
	domain: string;
	period: string;
	market?: string;
	employer?: string;
	stack: string[];
	stackTone?: StackTone;
	links?: { label: string; href: string }[];
	tagline?: string;
}

export interface InfoMeta {
	kind: 'info';
	tagline: string;
	body?: string;
}

export type FileMeta = ProjectMeta | InfoMeta;

const m = (path: string) => `${base}${path}`;

export const metadata: Record<string, FileMeta> = {
	readme: {
		kind: 'info',
		tagline: 'Open this file first',
		body: "Landing card. Quick links to every project, the colophon, and a note about the IDE chrome you're sitting in."
	},

	about: {
		kind: 'info',
		tagline: 'The short version',
		body: 'Identity card — name, role, location, lede, what I am currently shipping.'
	},

	neo: {
		kind: 'project',
		icon: m('/assets/neo-icon.webp'),
		domain: 'Banking',
		period: '2024 → present',
		market: 'Saudi Arabia',
		employer: 'CME · Lebanon (Remote)',
		stack: ['Swift', 'SwiftUI', 'Backbase', 'CocoaPods', 'Clean Architecture'],
		tagline: 'Lifestyle banking for the Saudi market'
	},

	tru: {
		kind: 'project',
		icon: m('/assets/tru-icon.webp'),
		domain: 'Fintech · BNPL',
		period: '2022 → 2024',
		market: 'Egypt',
		employer: 'TRU · Cairo',
		stack: ['UIKit', 'Swift', 'Xcode Cloud', 'BLE', 'ML Kit'],
		tagline: 'On-device KYC fraud signal + half-the-runtime CI'
	},

	babysteps: {
		kind: 'project',
		icon: m('/assets/babysteps-icon.png'),
		domain: 'Indie · Family',
		period: '2026 → present',
		market: 'Global · 5 languages',
		employer: 'Self',
		stack: ['SwiftUI', 'SwiftData', 'CloudKit', 'WidgetKit', 'SwiftTesting'],
		links: [
			{
				label: 'View on the App Store',
				href: 'https://apps.apple.com/eg/app/babysteps-log-track/id6761369475'
			}
		],
		tagline: 'The thing I ship myself, end to end'
	},

	takhawi: {
		kind: 'project',
		icon: m('/assets/takhawi-icon.webp'),
		domain: 'Ride-sharing',
		period: 'Recent freelance',
		market: 'Saudi Arabia',
		employer: 'Freelance',
		stack: ['UIKit', 'Swift', 'CocoaPods', 'Swinject'],
		tagline: 'Inter-city ride-sharing — Riyadh ⇄ Jeddah'
	},

	earlier: {
		kind: 'project',
		domain: 'Archive · 2018 — 2023',
		period: 'Seven apps · NDA',
		market: 'KSA · Bahrain · UAE · Egypt',
		employer: 'Multiple',
		stack: ['UIKit', 'Swift', 'Objective-C', 'Flutter', 'VIPER'],
		tagline: 'Source under NDA — see Earlier.swift for the list'
	},

	career: {
		kind: 'info',
		tagline: 'Timeline',
		body: 'Five entries from ASUGARDS (2017) to CME (current). Newest first. Markdown rendered as syntax-highlighted source.'
	},

	toolkit: {
		kind: 'info',
		tagline: 'JSON',
		body: 'Six grouped tiles — Languages, iOS Stack, Architecture, Tooling/CI, Cross-Platform, Domain.'
	},

	offscreen: {
		kind: 'info',
		tagline: 'When the laptop closes',
		body: 'Games, cinema, cars, tinkering, sports, reading. JRPGs especially — long campaigns, layered systems on the second playthrough.'
	},

	localization: {
		kind: 'info',
		tagline: '.strings',
		body: "Originally a bilingual easter egg. Bilingual was tried then dropped — the file remains as a curio of the format."
	},

	colophon: {
		kind: 'info',
		tagline: 'How this site was built',
		body: 'The stack, why those choices, and a Swift signature at the bottom.'
	},

	contact: {
		kind: 'info',
		tagline: 'How to reach me',
		body: 'Email is fastest. Phone works too. GitHub + LinkedIn for the formal channels.'
	}
};

export function getMeta(contentKey: string): FileMeta | null {
	return metadata[contentKey] ?? null;
}
