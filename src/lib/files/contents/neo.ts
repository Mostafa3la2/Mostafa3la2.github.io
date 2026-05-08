export const source = `//  NEO.swift
//  Mostafa.xcodeproj — Sources/
//
//  Lifestyle banking, multi-currency cards, and a few things you'd
//  not expect from a bank — cinema seats, a table for two, a flight.
//  Built on Backbase, in Riyadh's market, for a Saudi audience.

import Foundation

struct NEO: Project {

    let domain   = "Banking"
    let period   = "2024 → present"
    let market   = Region.saudiArabia
    let employer = "CME · Lebanon (Remote)"

    let stack: [Tech] = [
        .swift,
        .swiftUI,
        .backbase,
        .cocoaPods,
        .cleanArchitecture,
    ]

    let highlights = [
        "Multi-currency cards alongside the everyday account",
        "Cinema, restaurant, and travel bookings inside the bank",
        "Modular Swift atop a Backbase-driven monorepo",
        "Released for the Saudi market — bilingual, prayer-time-aware,",
        "weekend on Friday, the small things that signal you built it for here",
    ]

    /// Tap ▶ to boot the simulator and try it.
    func runtime() -> Simulator {
        .iPhone15Pro(app: .neo)
    }
}
`;
