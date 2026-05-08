/**
 * Apply persisted locale before first paint so the layout doesn't flash
 * en→ar on hydration. The store reads localStorage too, but the html
 * attributes drive layout direction immediately.
 */

if (typeof window !== 'undefined') {
	try {
		const v = localStorage.getItem('mostafa.locale');
		const locale = v === 'ar' ? 'ar' : 'en';
		document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
		document.documentElement.setAttribute('lang', locale);
	} catch {
		// silent
	}
}
