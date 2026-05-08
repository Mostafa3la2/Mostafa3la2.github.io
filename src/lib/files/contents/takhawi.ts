export const source = `//  Takhawi.swift
//  Mostafa.xcodeproj — Sources/
//
//  Inter-city ride-sharing for the Saudi market. Riyadh ⇄ Jeddah,
//  Dammam ⇄ Mecca — long road trips with a stranger and a price
//  that beats the bus.

import Foundation

struct Takhawi: Project {

    let domain   = "Ride-sharing"
    let period   = "Recent freelance"
    let market   = Region.saudiArabia
    let employer = "Freelance · KSA"

    let stack: [Tech] = [
        .uiKit,
        .swift,
        .cocoaPods,
        .swinject,
    ]

    let problemStatement = """
    Inter-city travel between Saudi cities is dominated by buses and
    full-fare cabs. A driver going Riyadh → Jeddah anyway has empty
    seats. Match them, price them, and don't get in the way.
    """

    func runtime() -> Simulator {
        .iPhone15Pro(app: .takhawi)
    }
}
`;
