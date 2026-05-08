export const source = `//  Earlier.swift
//  Mostafa.xcodeproj — Sources/
//
//  Seven apps between 2018 and 2023 — government portals, BLE-bridged
//  Quran tablets, a healthcare client, a real-estate browser, and the
//  things you ship when you're learning what shipping means.

import Foundation

enum Earlier: CaseIterable {

    case ptc                   // Bahrain · Petroleum Training Center, governmental portal
    case mgehr                 // KSA · Ministry of Health staff portal
    case swcc                  // KSA · Saline Water Conversion Corp, internal app
    case waltoQuran            // KSA · BLE-bridged Quran companion for kids' tablets
    case tadaway               // Egypt · A health-services pilot
    case meshiniMaaan          // Egypt · A walking-with-friends thing, before the pandemic ate it
    case kazaShella            // UAE · A real-estate browser for a Dubai broker

    static var stack: [Tech] {
        [.uiKit, .swift, .objectiveC, .flutter, .viper, .cocoaPods]
    }

    /// Tapping ▶ on this file presents the Xcode "Source Unavailable" alert.
    /// These apps shipped under client NDAs; binaries only, no public source.
    static var binariesOnly: Bool { true }
}
`;
