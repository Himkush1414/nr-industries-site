import type { ProductionCapacityRow, SpecRow } from "@/types/content";

export const technicalSpecs: SpecRow[] = [
  { label: "Rating", value: "Up to 12500 kVA or 12.5 MVA" },
  { label: "Phase", value: "Single & Three Phase" },
  { label: "Vector Group", value: "DYN11 or as per customer demands" },
  { label: "Cooling", value: "ONAN (Oil Natural Air Natural)" },
  { label: "Frequency", value: "50 Hz" },
  { label: "Winding Material", value: "Copper / Aluminium" },
  { label: "Tapping Range", value: "As per customer demands" },
  { label: "Temperature Rise", value: "As per Indian Standards" },
  { label: "Losses", value: "As per IS 1180 & Customer Demand" },
  { label: "Fitting & Accessories", value: "As per IS 1180 & Customer Demand" },
  { label: "Tap Changer", value: "Off Load / On Load Tap Changer" },
  { label: "Voltage Class", value: "Up to 33 kV Class" },
];

export const productionCapacity: ProductionCapacityRow[] = [
  { rating: "25 kVA", unitsPerAnnum: "11,440 units/annum" },
  { rating: "63 kVA", unitsPerAnnum: "9,500 units/annum" },
  { rating: "100 kVA", unitsPerAnnum: "7,500 units/annum" },
  { rating: "250 kVA", unitsPerAnnum: "6,000 units/annum" },
  { rating: "630 kVA", unitsPerAnnum: "5,500 units/annum" },
  { rating: "3.15 MVA", unitsPerAnnum: "100 units/annum" },
  { rating: "5 MVA", unitsPerAnnum: "70 units/annum" },
  { rating: "10 MVA", unitsPerAnnum: "50 units/annum" },
];
