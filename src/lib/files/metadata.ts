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
	/** SEO description shown in og:description / twitter:description. */
	description?: string;
}

export interface InfoMeta {
	kind: 'info';
	tagline: string;
	body?: string;
	/** SEO description shown in og:description / twitter:description. */
	description?: string;
}

export type FileMeta = ProjectMeta | InfoMeta;

const m = (path: string) => `${base}${path}`;

export const metadata: Record<string, FileMeta> = {
	readme: {
		kind: 'info',
		tagline: 'Open this file first',
		body: "Landing card. Quick links to every project, the colophon, and a note about the IDE chrome you're sitting in.",
		description:
			"Mostafa Alaa — Senior iOS Engineer based in Cairo. Portfolio rendered as a pixel-accurate Xcode 26 IDE. Eight-plus years of native iOS, fourteen-plus shipped apps, four markets — banking, fintech, KYC, ride-sharing."
	},

	about: {
		kind: 'info',
		tagline: 'The short version',
		body: 'Identity card — name, role, location, lede, what I am currently shipping.',
		description:
			'Senior iOS Engineer based in Cairo. Building native iOS for banking, fintech, ride-hailing, and trip booking — from KYC flows that catch fraud to apps shipping at scale.'
	},

	neo: {
		kind: 'project',
		icon: m('/assets/neo-icon.webp'),
		domain: 'Banking',
		period: '2024 → present',
		market: 'Saudi Arabia',
		employer: 'CME · Lebanon (Remote)',
		stack: ['Swift', 'SwiftUI', 'Backbase', 'CocoaPods', 'Clean Architecture'],
		tagline: 'Lifestyle banking for the Saudi market',
		description:
			'NEO — a Saudi-market lifestyle bank built on Backbase. Multi-currency cards, lifestyle bookings (cinema, restaurants, travel) inside the bank. Modular Swift, Clean Architecture, SwiftUI on a UIKit spine.'
	},

	tru: {
		kind: 'project',
		icon: m('/assets/tru-icon.webp'),
		domain: 'Fintech · BNPL',
		period: '2022 → 2024',
		market: 'Egypt',
		employer: 'TRU · Cairo',
		stack: ['UIKit', 'Swift', 'Xcode Cloud', 'BLE', 'ML Kit'],
		tagline: 'On-device KYC fraud signal + half-the-runtime CI',
		description:
			"TRU — Egypt's leading buy-now-pay-later. On-device KYC fraud detection with ML Kit, CI/CD migrated from Bitrise to Xcode Cloud (cut runtime ~50%), authored the iOS design system."
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
		tagline: 'The thing I ship myself, end to end',
		description:
			'BabySteps — an indie iOS app for tracking the small moments parents want to remember. SwiftUI on top, SwiftData + CloudKit underneath. Five languages out of the gate.'
	},

	takhawi: {
		kind: 'project',
		icon: m('/assets/takhawi-icon.webp'),
		domain: 'Ride-sharing',
		period: 'Recent freelance',
		market: 'Saudi Arabia',
		employer: 'Freelance',
		stack: ['UIKit', 'Swift', 'CocoaPods', 'Swinject'],
		tagline: 'Inter-city ride-sharing — Riyadh ⇄ Jeddah',
		description:
			'Takhawi — inter-city ride-sharing for the Saudi market. Drivers with empty seats matched with travelers headed the same way. UIKit + Swinject DI.'
	},

	earlier: {
		kind: 'project',
		domain: 'Archive · 2018 — 2023',
		period: 'Seven apps · NDA',
		market: 'KSA · Bahrain · UAE · Egypt',
		employer: 'Multiple',
		stack: ['UIKit', 'Swift', 'Objective-C', 'Flutter', 'VIPER'],
		tagline: 'Source under NDA — see Earlier.swift for the list',
		description:
			'Earlier work — seven apps shipped 2018–2023 across KSA, Bahrain, UAE, and Egypt: government portals, BLE-bridged Quran companion, healthcare, real estate, and others. Source under client NDA.'
	},

	career: {
		kind: 'info',
		tagline: 'Timeline',
		body: 'Five entries from ASUGARDS (2017) to CME (current). Newest first. Markdown rendered as syntax-highlighted source.',
		description:
			"Career timeline — CME (NEO banking, 2024→), TRU Cairo (BNPL, 2022–24), Emircom KSA/UAE (gov portals, 2019–23), Development Possibilities (2018–19), ASUGARDS Ain Shams (3D/VR for the Khufu Pyramid, 2017–18)."
	},

	toolkit: {
		kind: 'info',
		tagline: 'JSON',
		body: 'Six grouped tiles — Languages, iOS Stack, Architecture, Tooling/CI, Cross-Platform, Domain.',
		description:
			"Mostafa's toolkit — Swift, SwiftUI, UIKit, Swift Data, Combine, Core ML, Xcode Cloud, Fastlane, Bitrise, Flutter, Backbase, Stripe, and the rest. Banking · Fintech · BNPL · KYC · Healthcare · Government · Ride-hailing."
	},

	offscreen: {
		kind: 'info',
		tagline: 'When the laptop closes',
		body: 'Games, cinema, cars, tinkering, sports, reading. JRPGs especially — long campaigns, layered systems on the second playthrough.',
		description:
			'When the laptop closes — JRPGs (long campaigns, slow burns), cinema, cars, tinkering, football/tennis/F1, and reading less than I used to.'
	},

	localization: {
		kind: 'info',
		tagline: '.strings',
		body: "Originally a bilingual easter egg. Bilingual was tried then dropped — the file remains as a curio of the format.",
		description: 'A .strings file — the format iOS apps use for localization keys.'
	},

	colophon: {
		kind: 'info',
		tagline: 'How this site was built',
		body: 'The stack, why those choices, and a Swift signature at the bottom.',
		description:
			'Colophon — how the site was built. SvelteKit, adapter-static, Shiki for build-time syntax highlighting, GitHub Pages. The Run button works.'
	},

	contact: {
		kind: 'info',
		tagline: 'How to reach me',
		body: 'Email is fastest. Phone works too. GitHub + LinkedIn for the formal channels.',
		description:
			'Get in touch — email mostafa.alternative@gmail.com, GitHub @mostafa3la2, LinkedIn, +20 114 454 0411. Open to senior iOS roles and indie collaborations.'
	}
};

export function getMeta(contentKey: string): FileMeta | null {
	return metadata[contentKey] ?? null;
}
