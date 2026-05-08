/**
 * Hand-rolled i18n. Flat key-value object per locale.
 *
 * Numbers and dates stay Latin (more readable in code-adjacent contexts).
 * Code identifiers stay English (Mostafa's call — real Arabic-speaking
 * iOS devs ship Swift in English; only comments and string literals
 * translate).
 */

import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/stores/locale';

type Messages = Record<string, string>;

const en: Messages = {
	// Title bar
	'titlebar.toggle_navigator': 'Toggle Navigator',
	'titlebar.toggle_inspector': 'Toggle Inspector',
	'titlebar.project_name': 'Mostafa',
	'titlebar.locale.en': 'EN',
	'titlebar.locale.ar': 'العربية',

	// Run / build
	'run.build': 'Build and run',
	'run.stop': 'Stop',
	'scheme.label': 'Scheme',
	'scheme.device': 'Destination',

	// Navigator
	'nav.filter_placeholder': 'Filter',
	'nav.tab.project': 'Project navigator',

	// Editor
	'editor.tab.close': 'Close',
	'editor.jumpbar.back': 'Go back',
	'editor.jumpbar.forward': 'Go forward',

	// Inspector
	'inspector.quick_help': 'Quick Help',
	'inspector.file': 'File',
	'inspector.meta.name': 'Name',
	'inspector.meta.type': 'Type',
	'inspector.meta.path': 'Path',
	'inspector.no_file': 'No file open.',
	'inspector.placeholder':
		'File-aware metadata coming soon — app icon, project meta, App Store links.',

	// Simulator
	'sim.idle': 'No build running',
	'sim.compiling': 'Compiling…',
	'sim.booting': 'Booting…',
	'sim.running_prefix': 'Running ·',
	'sim.idle_hint': '▶ Boots an app here.',

	// Console
	'console.tab.console': 'Console',
	'console.tab.issues': 'Issues',
	'console.clear': 'Clear console',
	'console.cleared': 'Console cleared.',
	'console.welcome.loaded': 'Mostafa.xcodeproj loaded.',
	'console.welcome.hint': 'Hit ▶ to build a project.',
	'console.stopped': 'Simulator stopped.',
	'console.building_prefix': 'Building Mostafa.xcodeproj — scheme',
	'console.resolving': 'Resolving package graph',
	'console.compile_one': 'Compile {scheme}.swift (1 of 1)',
	'console.linking': 'Linking {scheme}',
	'console.codesign': 'Code-sign — well, pretend code-sign',
	'console.boot_device': 'Boot iPhone 15 Pro (iOS 17.4)',
	'console.install': 'Install {app}.app',
	'console.launch': 'Launch {app}',
	'console.success': 'Build succeeded',

	// Status bar
	'status.ready': 'Ready',
	'status.cairo': 'Cairo',
	'status.version': 'Mostafa.xcodeproj v3.0.0-alpha'
};

const ar: Messages = {
	// Title bar
	'titlebar.toggle_navigator': 'إظهار / إخفاء المتصفّح',
	'titlebar.toggle_inspector': 'إظهار / إخفاء المُفتّش',
	'titlebar.project_name': 'مصطفى',
	'titlebar.locale.en': 'EN',
	'titlebar.locale.ar': 'العربية',

	'run.build': 'بناء وتشغيل',
	'run.stop': 'إيقاف',
	'scheme.label': 'المخطّط',
	'scheme.device': 'الوجهة',

	'nav.filter_placeholder': 'بحث',
	'nav.tab.project': 'متصفّح المشروع',

	'editor.tab.close': 'إغلاق',
	'editor.jumpbar.back': 'رجوع',
	'editor.jumpbar.forward': 'تقدّم',

	'inspector.quick_help': 'مساعدة سريعة',
	'inspector.file': 'الملف',
	'inspector.meta.name': 'الاسم',
	'inspector.meta.type': 'النوع',
	'inspector.meta.path': 'المسار',
	'inspector.no_file': 'لا يوجد ملف مفتوح.',
	'inspector.placeholder':
		'بيانات الملف القادمة قريبًا — أيقونة التطبيق، بيانات المشروع، روابط متجر التطبيقات.',

	'sim.idle': 'لا يوجد بناء قيد التشغيل',
	'sim.compiling': 'جارٍ الترجمة…',
	'sim.booting': 'جارٍ الإقلاع…',
	'sim.running_prefix': 'يعمل ·',
	'sim.idle_hint': '▶ يُقلِع تطبيقًا هنا.',

	'console.tab.console': 'الطرفية',
	'console.tab.issues': 'المشاكل',
	'console.clear': 'مسح الطرفية',
	'console.cleared': 'تم مسح الطرفية.',
	'console.welcome.loaded': 'تم تحميل Mostafa.xcodeproj.',
	'console.welcome.hint': 'اضغط ▶ لبناء أحد المشاريع.',
	'console.stopped': 'تم إيقاف المحاكي.',
	'console.building_prefix': 'بناء Mostafa.xcodeproj — مخطّط',
	'console.resolving': 'حلّ اعتماديات الحِزَم',
	'console.compile_one': 'ترجمة {scheme}.swift (١ من ١)',
	'console.linking': 'ربط {scheme}',
	'console.codesign': 'توقيع — حسنًا، توقيع رمزي',
	'console.boot_device': 'إقلاع iPhone 15 Pro (iOS 17.4)',
	'console.install': 'تثبيت {app}.app',
	'console.launch': 'تشغيل {app}',
	'console.success': 'تم البناء بنجاح',

	'status.ready': 'جاهز',
	'status.cairo': 'القاهرة',
	'status.version': 'Mostafa.xcodeproj الإصدار v3.0.0-alpha'
};

const all: Record<Locale, Messages> = { en, ar };

export function tr(key: string, l: Locale, vars?: Record<string, string>): string {
	let s = all[l]?.[key] ?? all.en[key] ?? key;
	if (vars) {
		for (const [k, v] of Object.entries(vars)) {
			s = s.replaceAll(`{${k}}`, v);
		}
	}
	return s;
}

/** Reactive translator. Components: `<span>{$t('run.build')}</span>` */
export const t = derived(locale, ($l) => (key: string, vars?: Record<string, string>) =>
	tr(key, $l, vars)
);
