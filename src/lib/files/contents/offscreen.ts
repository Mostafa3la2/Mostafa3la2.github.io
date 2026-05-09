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
    case movies(habit: Habit)

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
        .movies(habit: .weekly),
        .cars(angle: .engineering),
        .tinkering(scope: .deskRig),
        .sports(set: ["Football", "Tennis", "Formula 1"]),
        .reading(rate: .lessThanItUsedToBe),
    ]
}
`;
