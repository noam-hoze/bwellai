import React from "react";
import { Card } from "@/components/ui/card";
import ScanHistoryTrends from "@/components/face-scan/ScanHistoryTrends";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  unit: string;
  normalRange: string;
  description: string;
  data: Array<{ date: Date; value: number }>;
  color?: string;
  threshold?: number;
}

const MetricCard = ({
  icon,
  title,
  value,
  unit,
  normalRange,
  description,
  data,
  color = "#4ade80",
  threshold,
}: MetricCardProps) => {
  return (
    <Card
      className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#F1F0FB]"
      variant="perspective"
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-green-500">
              {value} {unit}
            </span>
            <span className="text-xs text-gray-400">{normalRange}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="border border-gray-100 rounded-lg p-2 bg-white mt-4">
          <ScanHistoryTrends
            data={data}
            label={title}
            unit={` ${unit}`}
            color={color}
            threshold={threshold}
          />
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
