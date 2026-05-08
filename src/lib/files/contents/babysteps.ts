export const source = `//  BabySteps.swift
//  Mostafa.xcodeproj — Sources/
//
//  An indie iOS app I design and ship myself, end-to-end. SwiftUI on
//  top, SwiftData + CloudKit underneath. Five languages out of the gate
//  because I wanted my parents to use it.

import Foundation

struct BabySteps: Project {

    let domain   = "Indie · Family"
    let period   = "2026 → present"
    let market   = Region.global
    let employer = "Self"

    let stack: [Tech] = [
        .swiftUI,
        .swiftData,
        .cloudKit,
        .swiftTesting,
        .widgetKit,
    ]

    let elevatorPitch = """
    Every milestone, worth remembering. A small app for the small
    moments parents want to track, remember, and share. First steps,
    first words, first foods, the messy bath, the favorite blanket.
    """

    let languages: [Locale] = [.en, .ar, .es, .fr, .de]

    let appStore = URL(string:
        "https://apps.apple.com/eg/app/babysteps-log-track/id6761369475"
    )!

    /// What it actually feels like to use it.
    func runtime() -> Simulator {
        .iPhone15Pro(app: .babySteps)
    }
}
`;
