import { format, subMonths } from "date-fns";

export interface BloodTestResult {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "normal" | "warning" | "critical";
  category: string;
  description: string;
  whatIs?: string;
  whatAffects?: string;
  whatMeans?: string;
  previousValue?: number;
  changePercentage?: number;
  trendData?: number[];
  trendDates?: Date[];
}

export interface PerspectiveInsight {
  id: string;
  title: string;
  color: string;
  content: string;
}

export type BloodTestPerspective =
  | "conventional"
  | "naturopathic"
  | "dietitian"
  | "tcm"
  | "mental-health"
  | "functional";

export const generateTrendDataDates = (
  values: number[],
  startMonthsBack = 6
) => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < values.length; i++) {
    const monthsBack = startMonthsBack - (values.length - 1 - i);
    dates.push(subMonths(now, monthsBack));
  }
  return dates;
};

export const calculateHealthScore = (results: BloodTestResult[]): number => {
  let score = 100;
  results.forEach((result) => {
    if (result.status === "warning") score -= 5;
    if (result.status === "critical") score -= 10;
  });
  return Math.max(0, score);
};

export const getAbnormalResults = (
  results: BloodTestResult[]
): BloodTestResult[] => {
  return results.filter((result) => result.status !== "normal");
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "high":
      return "#ea384c";
    case "low":
      return "#F97316";
    case "normal":
      return "#22c55e";
    default:
      return "#8E9196";
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case "high":
      return "High Risk";
    case "low":
      return "Moderate Risk";
    case "normal":
      return "Normal";
    default:
      return "Unknown";
  }
};
