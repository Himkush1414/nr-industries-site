import type {
  AdditionalService,
  Certification,
  ClientItem,
  DifferentiatorItem,
  IndustryItem,
} from "@/types/content";

export const aboutSummary =
  "N R Industries is a manufacturer of high-performance Distribution Transformers, Power Transformers, Furnace Transformers, Dry Type Transformers, HT-AVR Transformers with Built-in AVR, Pad Mounted Transformers, Servo Voltage Stabilizers, and Inverter Duty / Solar Power Transformers.";

export const aboutFull = [
  "N R Industries is a manufacturer of high-performance Distribution Transformers, Power Transformers, Furnace Transformers, Dry Type Transformers, HT-AVR Transformers with Built-in AVR, Pad Mounted Transformers, Servo Voltage Stabilizers, and Inverter Duty / Solar Power Transformers.",
  "Built on decades of experience in power distribution, we focus on faster, on-time delivery and dependable after-sales support — with tailored solutions that scale from small installations to large industrial projects, all in compliance with international standards.",
];

export const visionStatement =
  "To be a global leader in power distribution technology, setting benchmarks in quality, innovation, and sustainability, while empowering industries and communities worldwide — backed by the best calibration and certification standards.";

export const infrastructurePoints = [
  "A world-class manufacturing facility equipped with advanced machinery and precision testing equipment",
  "Dedicated in-house testing and R&D, ensuring every product is validated before it leaves the facility",
  "ISO-certified operations upheld across every stage of manufacturing",
  "A skilled, experienced workforce supported by organized logistics for reliable, on-time delivery worldwide",
];

export const whyChooseUs: DifferentiatorItem[] = [
  {
    title: "Precision Engineering",
    description:
      "Precisely engineered products for superior performance and longevity, built to hold up under real operating conditions.",
    imageSrc: "/industries/power-plant.webp",
  },
  {
    title: "International Standards",
    description:
      "Designed and manufactured to international standards for safety, efficiency, and reliability across every product line.",
    imageSrc: "/industries/refinery.jpg",
  },
  {
    title: "Expert Engineering & After-Sales Support",
    description:
      "An expert engineering team supports customers through consultation and dependable after-sales service.",
    imageSrc: "/industries/solar-power-plants.jpg",
  },
  {
    title: "Eco-Friendly Manufacturing",
    description:
      "Manufacturing practices oriented toward sustainability, without compromising on performance or durability.",
    imageSrc: "/industries/windmill-power-projects.jpg",
  },
];

export const certifications: Certification[] = [
  { code: "ISO", label: "ISO 9001:2015", logoSrc: "/certifications/iso.png" },
  { code: "BIS", label: "BIS Certification", logoSrc: "/certifications/bis.png" },
  { code: "ERDA", label: "ERDA", logoSrc: "/certifications/erda.png" },
  { code: "NABL", label: "NABL", logoSrc: "/certifications/nabl.png" },
  { code: "UN", label: "United Nations Global Marketplace", logoSrc: "/certifications/un.png" },
  { code: "BEE", label: "BEE (Energy is Life)", logoSrc: "/certifications/bee.png" },
  { code: "CPRI", label: "CPRI Approved", logoSrc: "/certifications/cpri.png" },
  { code: "MII", label: "Make in India" },
];

export const clients: ClientItem[] = [
  { name: "Reliance Jio", logoSrc: "/clients/reliance-jio.png" },
  { name: "Mahindra Rise", logoSrc: "/clients/mahindra-rise.png" },
  { name: "Nayara Energy", logoSrc: "/clients/nayara-energy.jpg" },
  { name: "Essar", logoSrc: "/clients/essar.png" },
  { name: "HP", logoSrc: "/clients/hp.png" },
  { name: "Bharat Petroleum", logoSrc: "/clients/bharat-petroleum.png" },
  { name: "Vodafone Idea", logoSrc: "/clients/vodafone-idea.png" },
  { name: "Vishal Mega Mart", logoSrc: "/clients/vishal-mega-mart.png" },
  { name: "LG", logoSrc: "/clients/lg.webp" },
  { name: "Ford", logoSrc: "/clients/ford.png" },
  { name: "Royal Enfield", logoSrc: "/clients/royal-enfield.png" },
  { name: "PNB", logoSrc: "/clients/pnb.png" },
  { name: "HDFC Bank", logoSrc: "/clients/hdfc-bank.png" },
  { name: "Airtel", logoSrc: "/clients/airtel.png" },
  { name: "SBPCL", logoSrc: "/clients/sbpcl.png" },
];

export const industries: IndustryItem[] = [
  {
    name: "Food Industry",
    description: "Reliable power for continuous processing and cold-chain operations.",
    imageSrc: "/industries/food-industry.jpg",
  },
  {
    name: "Paper Industry",
    description: "Stable supply for high-load pulping and paper production lines.",
    imageSrc: "/industries/paper-industry.jpg",
  },
  {
    name: "Plastic Industry",
    description: "Consistent voltage for extrusion and molding equipment.",
    imageSrc: "/industries/plastic-industry.avif",
  },
  {
    name: "Foundry",
    description: "Heavy-duty transformers built for furnace and casting loads.",
    imageSrc: "/industries/foundry.jpg",
  },
  {
    name: "Solar Power Plants",
    description: "Inverter duty transformers matched to grid integration requirements.",
    imageSrc: "/industries/solar-power-plants.jpg",
  },
  {
    name: "Power Plant",
    description: "Power transformers for generation and primary distribution circuits.",
    imageSrc: "/industries/power-plant.webp",
  },
  {
    name: "Water Treatment",
    description: "Dependable supply for pumping and treatment infrastructure.",
    imageSrc: "/industries/water-treatment.jpg",
  },
  {
    name: "Refinery",
    description: "Robust equipment engineered for demanding industrial environments.",
    imageSrc: "/industries/refinery.jpg",
  },
  {
    name: "Chemical Industry",
    description: "Durable transformers suited to continuous-process facilities.",
    imageSrc: "/industries/chemical-industry.jpg",
  },
  {
    name: "Windmill Power Projects",
    description: "Transformers engineered for renewable generation applications.",
    imageSrc: "/industries/windmill-power-projects.jpg",
  },
  {
    name: "Rice Industry",
    description: "Steady power for milling and processing operations.",
    imageSrc: "/industries/rice-industry.webp",
  },
  {
    name: "Textile Industry",
    description: "Consistent supply for spinning, weaving, and finishing lines.",
    imageSrc: "/industries/textile-industry.webp",
  },
  {
    name: "Cement Industry",
    description: "Heavy industrial-grade transformers for continuous plant operation.",
    imageSrc: "/industries/cement-industry.jpg",
  },
  {
    name: "Pharma Industry",
    description: "Reliable, standards-compliant power for regulated manufacturing.",
    imageSrc: "/industries/pharma-industry.webp",
  },
  {
    name: "Hydro Projects",
    description: "Equipment suited to generation and distribution in hydro installations.",
    imageSrc: "/industries/hydro-projects.jpg",
  },
];

export const additionalServices: AdditionalService[] = [
  {
    title: "Turnkey Projects",
    description:
      "End-to-end project execution — from design and manufacturing through installation.",
  },
  {
    title: "Commissioning & AMC",
    description:
      "Commissioning support and Annual Maintenance Contracts to keep equipment running reliably.",
  },
  {
    title: "Distribution & Power Transformer Repairs",
    description:
      "Best-in-class repair service backed by expert vision, low repair costs, and proper value for money — with warranty.",
  },
];