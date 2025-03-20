
import { Organ } from "./OrganInterface";

export const organData: Organ[] = [
  {
    id: "heart",
    name: "Heart",
    health: 92,
    top: "32%",
    left: "50%",
    width: "15%",
    color: "rgba(167, 212, 229, 0.7)", // Light blue with transparency
    details: "Heart rate stable at 68 BPM. Good cardiovascular health."
  },
  {
    id: "lungs",
    name: "Lungs",
    health: 88,
    top: "32%",
    left: "50%",
    width: "25%",
    color: "rgba(209, 233, 200, 0.7)", // Light green with transparency
    details: "Respiration rate within normal range. Oxygen saturation at 98%."
  },
  {
    id: "liver",
    name: "Liver",
    health: 78,
    top: "45%",
    left: "42%",
    width: "15%",
    color: "rgba(249, 233, 188, 0.7)", // Light yellow with transparency
    details: "Liver enzymes slightly elevated. Consider reducing alcohol intake."
  },
  {
    id: "kidneys",
    name: "Kidneys",
    health: 85,
    top: "48%",
    left: "50%",
    width: "18%",
    color: "rgba(224, 241, 249, 0.7)", // Very light blue with transparency
    details: "Kidney function normal. Continue to stay hydrated."
  },
  {
    id: "brain",
    name: "Brain",
    health: 90,
    top: "14%",
    left: "50%",
    width: "15%",
    color: "rgba(229, 245, 222, 0.7)", // Very light green with transparency
    details: "Cognitive function optimal. Recent stress levels have decreased."
  }
];
