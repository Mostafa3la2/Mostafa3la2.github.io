export const source = `//  Earlier.swift
//  Mostafa.xcodeproj — Sources/
//
//  Seven apps between 2018 and 2023 — government portals,
//  , a healthcare client, a ride-hailing app, and the
//  things you ship when you're learning what shipping means.

import Foundation

enum Earlier: CaseIterable {

    case ptc                   // KSA · Public Transport Company
    case mgehr                 // KSA · Ministry of Health 
    case swcc                  // KSA · Saline Water Conversion Corp, internal app
    case tadaway               // KSA · A health-services pilot
    case meshini               // KSA · A ride-hailing app
    case Maaan                 // Bahrain · An app for a parliment member to communicate with his constituents

    static var stack: [Tech] {
        [.uiKit, .swift, .objectiveC, .flutter, .cocoaPods]
    }

    /// Tapping ▶ on this file presents the Xcode "Source Unavailable" alert.
    /// These apps shipped under client NDAs; binaries only, no public source.
    static var binariesOnly: Bool { true }
}
`;
