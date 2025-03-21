import React from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
} from "recharts";

interface SleepChartProps {
  date: Date;
  viewType: "day" | "week" | "month";
  apiData;
}

// Type definitions for different data structures
type DayData = {
  name: string;
  value: number;
  fill: string;
};

type WeekData = {
  date: string;
  fullDate: string;
  light: number;
  deep: number;
  rem: number;
  awake: number;
};

type MonthData = {
  name: string;
  light: number;
  deep: number;
  rem: number;
  awake: number;
};

// Mock data for demonstration purposes
const generateSleepData = (
  date: Date,
  viewType: string,
  apiData
): DayData[] | WeekData[] | MonthData[] => {
  if (viewType === "day") {
    return [
      {
        name: "Light Sleep",
        value: 55,
        fill: "#FEDF89",
      },
      {
        name: "Deep Sleep",
        value: 20,
        fill: "#53A15E",
      },
      {
        name: "REM",
        value: 20,
        fill: "#0EA5E9",
      },
      {
        name: "Awake",
        value: 5,
        fill: "#F97316",
      },
    ] as DayData[];
  } else if (viewType === "week") {
    return apiData?.map((day) => ({
      date: format(new Date(day?.bedtime_start), "EEE"), // Short weekday name (e.g., "Mon")
      fullDate: format(new Date(day?.bedtime_start), "MMM dd"), // Month + day (e.g., "Mar 14")
      light: day?.light / 3600, // Convert seconds to hours
      deep: day?.deep / 3600, // Convert seconds to hours
      rem: day?.rem / 3600, // Convert seconds to hours
      awake: day?.awake / 3600, // Convert seconds to hours
    })) as WeekData[];
  } else {
    const numWeeks = 4;
    return Array.from({ length: numWeeks }, (_, i) => ({
      name: `Week ${i + 1}`,
      light: 4 + Math.random(),
      deep: 1.5 + Math.random(),
      rem: 1.5 + Math.random(),
      awake: 0.5 + Math.random() * 0.5,
    })) as MonthData[];
  }
};

const SleepChart: React.FC<SleepChartProps> = ({ date, viewType, apiData }) => {
  const data = generateSleepData(date, viewType, apiData);

  if (viewType === "day") {
    // Type assertion to handle the day view data
    const dayData = data as DayData[];

    // Calculate the optimal representation for each sleep stage
    const totalValue = dayData.reduce((sum, item) => sum + item.value, 0);
    const lightSleepActual =
      dayData.find((item) => item.name === "Light Sleep")?.value || 0;
    const deepSleepActual =
      dayData.find((item) => item.name === "Deep Sleep")?.value || 0;
    const remSleepActual =
      dayData.find((item) => item.name === "REM")?.value || 0;

    // Ideal percentages
    const idealLightSleep = 55; // 50-60%
    const idealDeepSleep = 20; // 15-25%
    const idealRemSleep = 20; // 20-25%

    // Find the dominant sleep phase
    const sleepStages = [
      {
        name: "Light Sleep",
        value: lightSleepActual,
        ideal: idealLightSleep,
        color: "#FEDF89",
      },
      {
        name: "Deep Sleep",
        value: deepSleepActual,
        ideal: idealDeepSleep,
        color: "#53A15E",
      },
      {
        name: "REM Sleep",
        value: remSleepActual,
        ideal: idealRemSleep,
        color: "#0EA5E9",
      },
    ];

    const dominantStage = [...sleepStages].sort((a, b) => b.value - a.value)[0];
    const percentage = Math.round(
      (dominantStage.value / dominantStage.ideal) * 100
    );

    // Circle properties
    const outerRadius = 70;
    const innerRadius = 55;

    return (
      <div className="h-80">
        <div className="h-full w-full flex flex-col items-center">
          <div className="relative h-60 w-60 transform">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dayData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dayData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                  contentStyle={{ fontSize: "12px" }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold">{dominantStage.value}%</div>
              <div className="text-sm text-gray-600">{dominantStage.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {percentage}% of ideal
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#FEDF89]"></div>
              <span className="text-xs">Light Sleep</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
              <span className="text-xs">Deep Sleep</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-xs">REM Sleep</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
              <span className="text-xs">Awake</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-80">
      <div className="flex mb-6 items-center gap-2 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#FEDF89]"></div>
          <span className="text-sm">Light Sleep</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
          <span className="text-sm">Deep Sleep</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
          <span className="text-sm">REM</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
          <span className="text-sm">Awake</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          stackOffset="none"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={viewType === "week" ? "date" : "name"}
            tick={{ fontSize: 12 }}
            tickFormatter={(value, index) => {
              if (
                viewType === "week" &&
                typeof index === "number" &&
                index < data.length
              ) {
                const weekData = data as WeekData[];
                if ("fullDate" in weekData[index]) {
                  return weekData[index].fullDate;
                }
              }
              return value;
            }}
          />
          <YAxis tickFormatter={(value) => `${value}h`} domain={[0, "auto"]} />
          <Tooltip
            formatter={(value, name) => {
              return [`${value} hours`, name];
            }}
          />
          <Legend />
          <Bar dataKey="light" stackId="a" fill="#FEDF89" name="Light Sleep" />
          <Bar dataKey="deep" stackId="a" fill="#53A15E" name="Deep Sleep" />
          <Bar dataKey="rem" stackId="a" fill="#0EA5E9" name="REM Sleep" />
          <Bar dataKey="awake" stackId="a" fill="#F97316" name="Awake" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepChart;
