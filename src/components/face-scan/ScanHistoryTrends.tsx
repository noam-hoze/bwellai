import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

interface TrendDataPoint {
  date: Date;
  value: number;
}

interface TrendProps {
  data: TrendDataPoint[];
  label: string;
  unit?: string;
  color?: string;
  threshold?: number;
}

const ScanHistoryTrends = ({
  data,
  label,
  unit = "",
  color = "#8B5CF6",
  threshold,
}: TrendProps) => {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-500">
          Not enough data to display trend
        </p>
      </div>
    );
  }

  const formattedData = data.map((point) => ({
    ...point,
    formattedDate: format(new Date(point.date), "MMM d"),
  }));

  return (
    <div className="h-full w-full">
      <div className="mb-1">
        <h4 className="text-sm font-medium text-gray-700">{label} History</h4>
      </div>
      <div className="h-[120px] min-h-[120px] w-full bg-gray-50 border border-gray-100 rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              unit={unit}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#4b5563" }}
              formatter={(value: number) => [`${value}${unit}`, label]}
              labelFormatter={(label) => format(new Date(label), "MMM d")}
            />
            {threshold && (
              <ReferenceLine
                y={threshold}
                stroke="#e0e5ec"
                strokeDasharray="3 3"
                label={{
                  value: `${threshold}${unit}`,
                  position: "insideBottomRight",
                  fontSize: 10,
                  fill: "#9ca3af",
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScanHistoryTrends;
