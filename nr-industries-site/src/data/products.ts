import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    slug: "power-transformers",
    name: "Power Transformers",
    cardDescription:
      "High-efficiency power transformers for power plants, industrial facilities, and utilities.",
    tagline:
      "Highly Efficient Power Transformer for Power Plant, Industrial facilities, and Electric Utility Companies",
    intro:
      "Electrical devices designed to transfer electrical power from one circuit to another without altering frequency. They function on the electromagnetic induction principle and are essential for transmitting power between generators and primary distribution circuits — stepping voltage up or down in distribution networks and reducing energy losses (Joule's effect) during long-distance transmission. Used in power plants, industrial facilities, and electric utility companies.",
    rangeLabel: "Power Range",
    rangeValue: "Up to 12.5 MVA (12500 kVA), up to 33 kV class",
    features: [
      "Cost-efficient way to transmit and isolate voltage — dependable and budget-friendly",
      "Designed to manage high temperatures caused by energy losses",
      "Long operational lifespan with minimal maintenance required",
      "Steps up or down voltages, enabling efficient power transmission and distribution",
      "Built with high-class sturdy, robust material for better performance in harsh weather conditions",
    ],
  },
  {
    slug: "distribution-transformers",
    name: "Distribution Transformers",
    cardDescription:
      "Reliable distribution transformers stepping down power for commercial and industrial use.",
    tagline: "Highly Efficient Distribution Transformer for Commercial & Industrial use",
    intro:
      "Vital components in electrical power distribution networks, stepping down high voltage from power lines to a lower voltage suitable for residential, commercial, and industrial use. Durable and reliable, engineered for optimal energy transfer with minimal loss, available in various capacities and configurations. Robust construction, superior insulation, and enhanced thermal performance support a focus on energy efficiency and sustainability.",
    rangeLabel: "Power Range",
    rangeValue: "Available in 11 kV, 6.6 kV, 3.3 kV, 440 V, and 230 Volts",
    features: [
      "Highest dielectric insulation property to withstand Lightning Impulse",
      "Mechanical design to withstand short circuit forces arising during faults",
      "Optimum oven heating under vacuum to achieve desired compression height and maximum insulation resistance (IR) to windings",
      "Adequate ducts between layers, coils, and discs for maximum oil flow and reduced hot spot temperature",
      "Pre-compressed insulation material for minimal moisture absorption",
    ],
  },
  {
    slug: "solar-inverter-duty-transformers",
    name: "Solar Inverter Duty Transformers",
    cardDescription:
      "Grid-matching transformers engineered for solar power systems and harmonic stability.",
    tagline: "Superbly Efficient Solar Inverter Duty Transformer designed to integrate with solar system",
    intro:
      "Specialized transformers designed to integrate with solar power systems, facilitating efficient conversion of energy from solar panels into usable power by stepping up inverter output voltage to match grid requirements. Built to handle the harmonics and fluctuations inherent in solar applications, with high thermal stability, low noise, and robust insulation — ensuring grid stability and enhancing the performance and reliability of solar installations.",
    rangeLabel: "Power Range",
    rangeValue: "100 kVA to 12500 kVA (12.5 MVA)",
    features: [
      "Less voltage variation with Harmonic Content Distortion of less than 1%",
      "Primary winding ratio of 2, 3, 4, 5; oil filling through Oil Impregnation procedure for enhanced life",
      "Available in Mineral Oil or Silicone Oil, or as per requirement, with Electrolytic Grade Copper winding",
      "Low loss CRGO Silicon steel core, step-lap construction, and mitered joints designed for extreme supply variations and ambient temperature",
    ],
  },
  {
    slug: "furnace-transformers",
    name: "Furnace Transformers",
    cardDescription:
      "Heavy-duty transformers built for the extreme demands of arc and induction furnaces.",
    tagline: "Optimal Functional Furnace Transformer for Steel Industry, Foundries & Other Heavy Industries",
    intro:
      "Specialized devices designed to power electric arc and induction furnaces used in steelmaking, foundries, and other heavy industries. Engineered to handle extreme electrical and thermal stress with precise voltage regulation and high current delivery, supported by advanced cooling systems and tap changers. An energy-efficient design minimizes losses across demanding duty cycles.",
    rangeLabel: "Power Range",
    rangeValue: "Up to 8 MVA (8000 kVA), up to 33 kV class",
    features: [
      "Designed to deliver large currents required for electric arc and induction furnaces in industrial processes",
      "Engineered to withstand extreme electrical and thermal stress during heavy-duty operations",
      "Equipped with on-load or off-load tap changers for precise voltage control",
      "Efficient oil or water cooling mechanisms to maintain optimal performance under high load",
      "Minimizes power losses, ensuring reliable and cost-effective operation",
    ],
  },
  {
    slug: "servo-voltage-stabilizer",
    name: "Servo Voltage Stabilizer",
    cardDescription:
      "Oil-cooled servo stabilizers protecting equipment from input voltage fluctuation.",
    tagline: "Highly Efficient Servo Voltage Stabilizer have unlimited applications in the offices",
    intro:
      "Oil-cooled Servo Voltage Stabilizers that prevent equipment malfunction or breakdown caused by voltage fluctuation, controlling input fluctuations and providing a constant output voltage. Designed per individual customer input voltage requirements. Common applications include offices, commercial buildings, telecom, textile, IT industry, call centers, laboratories, hospitals, air-conditioning plants, hotels & restaurants, malls, and offset printing machines.",
    rangeLabel: "Power Range",
    rangeValue: "240–470 V, 270–470 V, 300–470 V, 320–470 V, 340–470 V, 360–470 V",
    features: [
      "High-low voltage cut-off to automatically switch off the unit when output voltage goes above or below the preset limit",
      "Overload protection to switch off the unit when load current exceeds the rated value",
      "Manual by-pass facility",
      "Single-phase prevention for 3-phase units",
      "Reverse phase sequence protection for 3-phase stabilizers",
      "Built-in spike suppressor with audio-visual alarm",
    ],
  },
  {
    slug: "ht-avr-transformer",
    name: "HT-AVR Transformer with Built-in AVR",
    cardDescription:
      "Precision transformer combining HT AVR and distribution transformer in a single unit.",
    tagline:
      "High Quality HT-AVR Transformer with Built-in-AVR for Hospitals, Data Centers, Manufacturing Plant & Commercial Buildings",
    intro:
      "A precision transformer with built-in AVR — a combination of an HT AVR and a standard distribution transformer. Fluctuating HT voltage from the grid supply is first controlled by the HT AVR to an accuracy of ±1%, then fed to the transformer, which transforms it to the standard LT voltage ratio. A stabilized HT voltage results in a stabilized LT voltage at ±1% accuracy — input at 11/33 kV, output as regulated LT voltage, delivered via a single product.",
    rangeLabel: "Power Range",
    rangeValue: "Up to 33 kV class",
    features: [],
  },
  {
    slug: "dry-type-transformer",
    name: "Dry Type Transformer",
    cardDescription:
      "Air-cooled transformers offering safer, low-maintenance indoor and outdoor operation.",
    tagline:
      "Ultra Efficient Dry Type Transformer for Indoor and Outdoor Application such as Commercial Buildings, Industrial Facilities & Renewable Energy System",
    intro:
      "Uses air instead of liquid for cooling — safer and more environmentally friendly. Ideal for indoor and outdoor applications including commercial buildings, industrial facilities, and renewable energy systems. Built with high-quality insulation materials for excellent fire resistance, reduced maintenance, and a long operational life. Compact design and quiet operation make it well suited for densely populated areas.",
    rangeLabel: "Power Range",
    rangeValue: "Available in 400 V, 200 V, 110 V, 11 kV, and 33 kV primary voltage range",
    features: [],
  },
  {
    slug: "compact-substation",
    name: "Compact Substation",
    cardDescription:
      "Pre-engineered, modular substation integrating transformer, switchgear and protection.",
    tagline: "Pre-engineered Modular Compact Substation",
    intro:
      "A pre-engineered, modular electrical distribution system integrating transformers, switchgear, and protection devices in a single enclosed unit. Delivers efficient space utilization, reliable power distribution, and enhanced safety — ideal for urban, industrial, and renewable energy applications, with quick installation, minimal maintenance, and high performance in demanding environments.",
    rangeLabel: "Voltage Range",
    rangeValue: "3.3 kV, 6.6 kV, 11 kV, 22 kV, 33 kV, or special class by customer requirement",
    features: [],
  },
  {
    slug: "ht-lt-panels",
    name: "HT & LT Panels",
    cardDescription:
      "High and low tension panels and RMUs for distributing and controlling power.",
    tagline: "HT & LT Panels for Power Distribution and Control",
    intro:
      "Essential for distributing and controlling power across mechanical systems, built with high-quality materials that adhere to industrial standards. Used across industries, commercial buildings, hospitals, and more. High Tension (HT) panels manage electricity flow for devices and distribution boards in indoor or outdoor installations, while Low Tension (LT) panels work with low-tension cables to distribute power. Ring Main Units (RMUs) are compact, gas-insulated switchgear units widely used in ring-type networks, with capacities up to 630 A and 24 kV.",
    rangeLabel: "Capacity",
    rangeValue: "RMUs up to 630 A and 24 kV",
    features: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
