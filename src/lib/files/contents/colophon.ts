export const source = `//  Colophon.swift
//  Mostafa.xcodeproj — Tests/
//
//  How this site is built. The same way I build apps: pick a stack
//  that survives, wire the seams carefully, and don't decorate
//  what should be plain.

import Foundation

@MainActor
struct Colophon {

    /// The stack.
    static let stack = Stack(
        framework:   "SvelteKit",
        adapter:     "@sveltejs/adapter-static",
        deploy:      "GitHub Pages",
        type:        "TypeScript",
        styles:      "Plain CSS, logical properties throughout",
        highlight:   "Shiki, prerendered at build time",
        i18n:        "Paraglide-JS, en ⇄ ar with full RTL flip",
        transitions: "Native View Transitions API",
        fonts:       "Inter · JetBrains Mono · IBM Plex Sans Arabic",
    )

    /// Why these choices.
    static let why = """
    SvelteKit because it ships less JavaScript than the alternatives and
    its View Transitions story is honest. Static export so the whole site
    is a folder of HTML files — no server, no platform lock, no \"works
    on my machine\". Shiki at build because the user shouldn't pay for
    syntax highlighting they didn't ask for.

    The IDE chrome is at 1:1 Xcode 26 proportions because the conceit
    only works if the proportions are right. The traffic lights don't
    do anything. The Run button does.
    """

    /// Signature.
    static let signature = #"Hand-built in Cairo · /* — m. */"#
}
`;

export const sourceAr = `//  Colophon.swift
//  Mostafa.xcodeproj — Tests/
//
//  كيف بُنيَ هذا الموقع. بنفس الطريقة التي أبني بها التطبيقات:
//  اخترْ حُزمة تَصمد، اِربط الوصلات بعناية، ولا تُزخرف
//  ما يجب أن يبقى بسيطًا.

import Foundation

@MainActor
struct Colophon {

    /// الحُزمة.
    static let stack = Stack(
        framework:   "SvelteKit",
        adapter:     "@sveltejs/adapter-static",
        deploy:      "GitHub Pages",
        type:        "TypeScript",
        styles:      "CSS صِرف، خصائص منطقيّة في كلّ مكان",
        highlight:   "Shiki، تلوين عند البناء فقط",
        i18n:        "Paraglide-JS، عربي ⇄ إنجليزي بانعكاس RTL كامل",
        transitions: "View Transitions API الأصيل",
        fonts:       "Inter · JetBrains Mono · IBM Plex Sans Arabic",
    )

    /// لماذا اختيرت.
    static let why = """
    SvelteKit لأنّه يُرسل JavaScript أقلّ من البدائل، ولأنّ روايته في
    View Transitions صادقة. تصدير ثابت كي يكون الموقع كلّه مجلّد ملفّات
    HTML — لا خادم، لا ارتباط بمنصّة، لا "يعمل عندي". Shiki عند البناء
    لأنّ المستخدم لا يدفع ثمن تلوين شيفرة لم يطلبه.

    شريط Xcode في الأعلى بأبعاد ١:١ لأنّ الفكرة لا تنجح إلّا إذا
    كانت الأبعاد صحيحة. أزرار النّافذة الثلاثة لا تفعل شيئًا.
    زرّ التشغيل ▶ يعمل فعلًا.
    """

    /// التوقيع.
    static let signature = #"صُنِع باليد في القاهرة · /* — m. */"#
}
`;
