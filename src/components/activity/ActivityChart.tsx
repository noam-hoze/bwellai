
import React from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ActivityChartProps {
  date: Date;
  viewType: "day" | "week" | "month";
}

// Mock data generation for activity metrics
const generateActivityData = (date: Date, viewType: string) => {
  if (viewType === "day") {
    return [
      { name: "Steps", value: 8432, target: 10000, color: "#4CAF50" },
      { name: "Active Minutes", value: 45, target: 60, color: "#2196F3" },
      { name: "Calories Burned", value: 2100, target: 2500, color: "#FF9800" }
    ];
  } else if (viewType === "week") {
    return eachDayOfInterval({
      start: subDays(date, 6),
      end: date
    }).map(day => ({
      date: format(day, "EEE"),
      fullDate: format(day, "MMM dd"),
      steps: Math.floor(Math.random() * 5000) + 5000,
      activeMinutes: Math.floor(Math.random() * 30) + 30,
      caloriesBurned: Math.floor(Math.random() * 1000) + 1500
    }));
  } else {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      weeks.push({
        name: `Week ${i + 1}`,
        steps: Math.floor(Math.random() * 35000) + 35000,
        activeMinutes: Math.floor(Math.random() * 210) + 210,
        caloriesBurned: Math.floor(Math.random() * 7000) + 10500
      });
    }
    return weeks;
  }
};

const ActivityChart: React.FC<ActivityChartProps> = ({ date, viewType }) => {
  const data = generateActivityData(date, viewType);

  if (viewType === "day") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Current" fill="#82ca9d" />
            <Bar dataKey="target" name="Target" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={viewType === "week" ? "date" : "name"}
            tickFormatter={(value, index) => {
              if (viewType === "week") {
                return data[index].fullDate;
              }
              return value;
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="steps" name="Steps" fill="#4CAF50" />
          <Bar dataKey="activeMinutes" name="Active Minutes" fill="#2196F3" />
          <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#FF9800" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
