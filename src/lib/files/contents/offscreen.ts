export const source = `//  OffScreen.swift
//  Mostafa.xcodeproj — Resources/
//
//  What I do when the laptop's closed.

import Foundation

enum OffScreen {

    /// Long campaigns, slow burns. The kind that reveal layered systems
    /// on the second playthrough. JRPGs especially.
    case games(taste: String)

    /// Heavy character work, tight popcorn engineering. Both, often.
    case cinema(habit: Habit)

    /// Spec sheets, suspension geometry, the market.
    case cars(angle: Angle)

    /// Monitors, keyboards, the rig under the rig.
    case tinkering(scope: Scope)

    /// Football, tennis, Formula 1.
    case sports(set: [String])

    /// Less than it used to be. Working on it.
    case reading(rate: Rate)

    static let all: [OffScreen] = [
        .games(taste: "long campaigns, slow burns, layered systems on the second playthrough"),
        .cinema(habit: .weekly),
        .cars(angle: .engineering),
        .tinkering(scope: .deskRig),
        .sports(set: ["Football", "Tennis", "Formula 1"]),
        .reading(rate: .lessThanItUsedToBe),
    ]
}
`;

export const sourceAr = `//  OffScreen.swift
//  Mostafa.xcodeproj — Resources/
//
//  ما أفعله حين أُغلق الحاسوب.

import Foundation

enum OffScreen {

    /// حملات طويلة، نَفَسٌ بطيء. النوع الذي تظهر طبقاته
    /// في الجولة الثانية. خاصّةً JRPG.
    case games(taste: String)

    /// عمل شخصيّات ثقيل، هندسة "بوبكورن" مُحكَمة. كلاهما، غالبًا.
    case cinema(habit: Habit)

    /// أوراق المواصفات، هندسة التعليق، السوق.
    case cars(angle: Angle)

    /// شاشات، لوحات مفاتيح، الترتيب تحت الترتيب.
    case tinkering(scope: Scope)

    /// كرة قدم، تنس، فورمولا ١.
    case sports(set: [String])

    /// أقلّ ممّا كنت أفعل. أعمل على ذلك.
    case reading(rate: Rate)

    static let all: [OffScreen] = [
        .games(taste: "حملات طويلة، نَفَسٌ بطيء، طبقاتٌ تظهر في الجولة الثانية"),
        .cinema(habit: .weekly),
        .cars(angle: .engineering),
        .tinkering(scope: .deskRig),
        .sports(set: ["كرة قدم", "تنس", "فورمولا ١"]),
        .reading(rate: .lessThanItUsedToBe),
    ]
}
`;
