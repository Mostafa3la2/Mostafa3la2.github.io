export const source = `//  TRU.swift
//  Mostafa.xcodeproj — Sources/
//
//  Egyptian BNPL leader. Tens of thousands of KYCs a week.
//  My job was to keep them honest — on-device — and to get
//  the build pipeline out of its own way.

import Foundation

struct TRU: Project {

    let domain   = "Fintech · BNPL"
    let period   = "2022 → 2024"
    let market   = Region.egypt
    let employer = "TRU · Cairo"

    let stack: [Tech] = [
        .uiKit,
        .swift,
        .xcodeCloud,
        .bluetoothLE,
        .mlKit,
    ]

    let shipped = [
        Shipped(
            name: "On-device fraud signal in KYC",
            note: "ML Kit + custom heuristics. Zero server roundtrips on the hot path."
        ),
        Shipped(
            name: "CI/CD migration: Bitrise → Xcode Cloud",
            note: "Cut total run time roughly in half. New Macs help; cleaner caching helps more."
        ),
        Shipped(
            name: "co-authored the iOS design system",
            note: "Tokens, components, accessibility, the kind of plumbing that pays back forever."
        ),
        Shipped(
            name: "BLE-first activation for partner devices",
            note: "When you're handing out hardware, the pairing flow is the product."
        ),
    ]

    func runtime() -> Simulator {
        .iPhone15Pro(app: .tru)
    }
}
`;
