export const source = `//  Contact.swift
//  Mostafa.xcodeproj — Contact/
//
//  The fastest path to my inbox is email. The longest is the phone,
//  but it works. Pick whichever fits.

import Foundation

struct Contact {

    static let email = "mostafa.alternative@gmail.com"

    static let github = URL(string:
        "https://github.com/mostafa3la2"
    )!

    static let linkedin = URL(string:
        "https://www.linkedin.com/in/mostafa-alaa-5a2067115/"
    )!

    static let phone = "+20 114 454 0411"

    static let location = "Cairo, Egypt"

    /// What I'm interested in hearing about.
    static let openTo: [String] = [
        "Senior iOS roles, especially with strong product teams",
        "Indie collaborations, especially in family-oriented apps",
        "Anything where the iOS bar is high and the deadline is real",
        "Conference talks and meetups in Cairo, Riyadh, Dubai",
    ]

    /// What I'm not.
    static let notLookingFor: [String] = [
        "Crypto",
        "Recruiter spam — please mention something specific from this site",
    ]
}
`;

export const sourceAr = `//  Contact.swift
//  Mostafa.xcodeproj — Contact/
//
//  أسرع طريق إلى صندوق بريدي هو البريد. أبطأ طريق هو الهاتف،
//  لكنّه يعمل. اختر ما يناسبك.

import Foundation

struct Contact {

    static let email = "mostafa.alternative@gmail.com"

    static let github = URL(string:
        "https://github.com/mostafa3la2"
    )!

    static let linkedin = URL(string:
        "https://www.linkedin.com/in/mostafa-alaa-5a2067115/"
    )!

    static let phone = "+20 114 454 0411"

    static let location = "القاهرة، مصر"

    /// ما يهمّني الاستماع إليه.
    static let openTo: [String] = [
        "أدوار قياديّة في iOS، خاصّةً مع فِرَق منتج قويّة",
        "تعاونات مستقلّة، خاصّةً في تطبيقات الأسرة والأطفال",
        "أيّ مكان يكون فيه معيار iOS مرتفعًا والمواعيد جادّة",
        "محاضرات ولقاءات مجتمعيّة في القاهرة والرياض ودبي",
    ]

    /// ما لا يناسبني.
    static let notLookingFor: [String] = [
        "العملات المشفّرة",
        "رسائل التوظيف الجاهزة — أرجو ذكر شيءٍ محدّد من هذا الموقع",
    ]
}
`;
