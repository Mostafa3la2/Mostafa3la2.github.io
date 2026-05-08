export const source = `//  AboutMe.swift
//  Mostafa.xcodeproj — Sources/
//
//  The short version. There's a longer one below.

import Foundation

struct Mostafa {

    let name      = "Mostafa Alaa"
    let role      = "Senior iOS Engineer"
    let location  = "Cairo, Egypt"
    let arabic    = "مصطفى علاء"

    let lede = """
    I build iOS software for banking, fintech, ride hailing, and trip
    booking — from KYC flows that catch fraud to apps shipping at scale.
    """

    let years    = 8       // and a bit, but who's counting
    let apps     = 14      // production, shipped, in the App Store
    let markets  = 4       // Egypt, Saudi Arabia, UAE, Bahrain

    /// What I'm doing right now, in case the file dates have rotted.
    var currentlyShipping: [WIP] = [
        .neo(.engineering, market: .saudiArabia),
        .babySteps(.shipping, role: .everything),
    ]

    var availability: Availability {
        // Open to senior iOS roles + interesting indie collaborations.
        // Otherwise heads-down on the apps above.
        .selectivelyOpen
    }
}
`;
