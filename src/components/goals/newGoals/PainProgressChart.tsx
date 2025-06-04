
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PainProgressChartProps {
  painHistory: Array<{day: number, level: number}>;
}

const PainProgressChart = ({ painHistory }: PainProgressChartProps) => {
  // Function to determine the color based on pain level
  const getBarColor = (level: number) => {
    if (level <= 3) return "#22c55e"; // Green for low pain
    if (level <= 6) return "#eab308"; // Yellow for medium pain
    return "#ef4444"; // Red for high pain
  };

  // Transform data for the chart
  const chartData = painHistory.map(item => ({
    ...item,
    color: getBarColor(item.level),
  }));

  return (
    <div className="w-full h-64 bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 15, left: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis 
            dataKey="day" 
            label={{ value: 'Day', position: 'insideBottom', offset: -5 }} 
            tickMargin={10} 
          />
          <YAxis 
            domain={[0, 10]} 
            label={{ value: 'Pain Level', angle: -90, position: 'insideLeft', offset: 15 }} 
            ticks={[0, 2, 4, 6, 8, 10]} 
          />
          <Tooltip
            formatter={(value: any) => [`Pain Level: ${value}`, 'Pain']}
            labelFormatter={(label) => `Day ${label}`}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar 
            dataKey="level" 
            fill="#8884d8" 
            radius={[4, 4, 0, 0]} 
            fillOpacity={0.9}
            animationDuration={500}
            isAnimationActive={true} 
            animationEasing="ease-in-out"
            name="Pain Level"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PainProgressChart;
