
import { useGetUserActivity } from "@/service/hooks/goal/useGetGoal";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

interface PainProgressChartProps {
  userGoalId : string;
  initialPainLevel: number; 
}

const PainProgressChart = ({ userGoalId, initialPainLevel }: PainProgressChartProps) => {
  const getBarColor = (level: number) => {
    if (level <= 3) return "#86efac";
    if (level <= 6) return "#fde68a";
    return "#fca5a5";
  };

  const {
    data: userActivityData,
    refetch: userActivityDataRefetch,
  } = useGetUserActivity();

  console.log("userActivityData", userActivityData);

  // Step 1: Group by date
  const groupedByDate: Record<string, any[]> = {};
  const relevantUserActivity = userActivityData?.filter(
    (item) => item.userActivity?.user_goal_id === userGoalId
    && item.userActivity?.type === "pain_level"
  );

  (relevantUserActivity ?? []).forEach((item) => {
    const date = item.userActivity.date; // e.g., "2025-06-13"
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

const startDate = relevantUserActivity?.reduce((earliest, curr) => {
  const currDate = new Date(curr.userActivity.date);
  return currDate < earliest ? currDate : earliest;
}, new Date()) ?? null;

const groupedEntries = Object.entries(groupedByDate);

// האם יש נתון מהיום הראשון?
const hasStartDateEntry = groupedEntries.some(([date]) => {
  return startDate && new Date(date).toDateString() === startDate.toDateString();
});

// אם אין - נוסיף את ערך ההתחלה ידנית
if (!hasStartDateEntry && startDate && initialPainLevel != null) {
  groupedEntries.push([
    startDate.toISOString().split("T")[0], // YYYY-MM-DD
    [{
      userActivity: {
        current_pain_level: initialPainLevel,
        date: startDate.toISOString().split("T")[0],
      },
      created_local_time: startDate.toISOString(),
      isInitial: true,
    }],
  ]);
}


// Step 2: For each date, take the last one (by created_local_time)
const chartData = groupedEntries
  .map(([date, items]) => {
    const latest = items.sort((a, b) =>
      new Date(b.created_local_time).getTime() - new Date(a.created_local_time).getTime()
    )[0];

    const dayDiff = Math.floor(
      (new Date(date.split("T")[0]).setHours(0, 0, 0, 0) - startDate.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    ) + 1;

    return {
      dayNumber: `${dayDiff}`,
      painLevel: latest.userActivity.current_pain_level,
      originalDate: date,
    };
  })
  .sort((a, b) => new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime());


    
  return (
    <div className="w-full h-64 bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 15, left: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="dayNumber" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} tickMargin={10} />
          <YAxis domain={[0, 10]} label={{ value: 'Pain Level', angle: -90, position: 'insideLeft', offset: 15 }} ticks={[0, 2, 4, 6, 8, 10]} />
          <Tooltip formatter={(value: any) => [`Pain Level: ${value}`, 'Pain']} labelFormatter={(label, payload) => {
              const date = payload?.[0]?.payload?.originalDate;
              return `Date: ${date}`;
            }} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar dataKey="painLevel" radius={[4, 4, 0, 0]} fillOpacity={0.9} animationDuration={500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.painLevel)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PainProgressChart;