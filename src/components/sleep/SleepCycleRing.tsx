import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Sleep stage colors with updated colors
const COLORS = {
  AWAKE: "#F97316", // Orange
  LIGHT: "#FEDF89", // Soft yellow/gold
  DEEP: "#53A15E", // Medium green
  REM: "#0EA5E9", // Bright blue
};

export type SleepStage = "AWAKE" | "LIGHT" | "DEEP" | "REM";

export interface SleepSegment {
  stage: SleepStage;
  duration: number; // in minutes
  startTime?: string; // optional timestamp for tooltips
  isWakeEvent?: boolean; // whether this is a wake event during sleep
}

interface SleepCycleRingProps {
  sleepData: SleepSegment[];
  title?: string;
  startTime?: string;
  endTime?: string;
}

const SleepCycleRing: React.FC<SleepCycleRingProps> = ({
  sleepData,
  title = "Sleep Cycles",
  startTime = "10:30 PM",
  endTime = "7:00 AM",
}) => {
  const [totalSleepMinutes, setTotalSleepMinutes] = useState(0);
  const [sleepStartAngle, setSleepStartAngle] = useState(0);
  const [sleepEndAngle, setSleepEndAngle] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [timeInBedMinutes, setTimeInBedMinutes] = useState(0);
  const [wakeTimeBeforeSleep, setWakeTimeBeforeSleep] = useState(0);
  const [wakeTimeAfterSleep, setWakeTimeAfterSleep] = useState(0);

  // Calculate total sleep minutes and start/end angles
  useEffect(() => {
    // Total time in bed (all segments)
    const totalTime = sleepData?.reduce(
      (acc, segment) => acc + segment.duration,
      0
    );
    setTimeInBedMinutes(totalTime);

    // Total active sleep time (excluding initial/final wake periods)
    const totalSleep = sleepData?.reduce(
      (acc, segment) =>
        segment.stage !== "AWAKE" || segment.isWakeEvent
          ? acc + segment.duration
          : acc,
      0
    );
    setTotalSleepMinutes(totalSleep);

    // Calculate wake time before sleep
    let wakeBeforeSleep = 0;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        break;
      }
      wakeBeforeSleep += sleepData?.[i]?.duration;
    }
    setWakeTimeBeforeSleep(wakeBeforeSleep);

    // Calculate wake time after sleep
    let wakeAfterSleep = 0;
    // Find the last non-wake segment index (manual implementation instead of findLastIndex)
    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    for (let i = sleepData.length - 1; i > lastNonWakeIndex; i--) {
      if (sleepData?.[i]?.stage === "AWAKE" && !sleepData?.[i]?.isWakeEvent) {
        wakeAfterSleep += sleepData?.[i]?.duration;
      }
    }
    setWakeTimeAfterSleep(wakeAfterSleep);

    // Calculate start angle (where first non-wake segment begins)
    let startAngleIndex = 0;
    let startAngleSum = 0;
    for (let i = 0; i < sleepData.length; i++) {
      if (
        sleepData?.[i]?.stage !== "AWAKE" ||
        sleepData?.[i]?.isWakeEvent === true
      ) {
        startAngleIndex = i;
        break;
      }
      startAngleSum += sleepData?.[i]?.duration;
    }

    // Calculate end angle (where last non-wake segment ends)
    const endAngleIndex = sleepData.length - 1;
    let endAngleSum = 0;
    // Find last non-wake index (manual implementation)
    lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    for (let i = sleepData.length - 1; i > lastNonWakeIndex; i--) {
      if (sleepData?.[i]?.stage === "AWAKE" && !sleepData?.[i]?.isWakeEvent) {
        endAngleSum += sleepData?.[i]?.duration;
      }
    }

    // Convert to angles (360 degrees total)
    const startAngle = (startAngleSum / totalTime) * 360 + 90; // +90 because startAngle is at top
    const endAngle = 360 - (endAngleSum / totalTime) * 360 + 90;

    setSleepStartAngle(startAngle);
    setSleepEndAngle(endAngle);
  }, [sleepData]);

  // Format data for the PieChart
  const chartData = sleepData.map((segment, index) => {
    // Find first non-wake index
    const firstNonWakeIndex = sleepData?.findIndex(
      (s) => s?.stage !== "AWAKE" || s?.isWakeEvent
    );

    // Find last non-wake index (manual implementation)
    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    // For wake periods outside of sleep, use a more transparent styling
    const isBeforeSleep =
      segment.stage === "AWAKE" &&
      !segment.isWakeEvent &&
      index < firstNonWakeIndex;
    const isAfterSleep =
      segment.stage === "AWAKE" &&
      !segment.isWakeEvent &&
      index > lastNonWakeIndex;

    return {
      name: segment.stage,
      value: segment.duration,
      startTime: segment.startTime,
      isWakeEvent: segment.isWakeEvent,
      isBeforeSleep,
      isAfterSleep,
    };
  });

  // Format data for the timeline
  const timelineData = sleepData?.map((segment, index) => {
    const cumulativeTime = sleepData
      ?.slice(0, index)
      ?.reduce((acc, curr) => acc + curr?.duration, 0);

    // Find first non-wake index
    const firstNonWakeIndex = sleepData?.findIndex(
      (s) => s?.stage !== "AWAKE" || s?.isWakeEvent
    );

    // Find last non-wake index (manual implementation)
    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    // Same logic to identify pre/post sleep wake periods
    const isBeforeSleep =
      segment?.stage === "AWAKE" &&
      !segment?.isWakeEvent &&
      index < firstNonWakeIndex;
    const isAfterSleep =
      segment?.stage === "AWAKE" &&
      !segment?.isWakeEvent &&
      index > lastNonWakeIndex;

    return {
      name: segment?.stage,
      value: segment?.duration,
      isWakeEvent: segment?.isWakeEvent,
      cumulativeTime,
      isBeforeSleep,
      isAfterSleep,
    };
  });

  // Custom tooltip for segments
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      let stageDescription = data?.name;

      // Add more context for wake periods
      if (data?.name === "AWAKE") {
        if (data?.isBeforeSleep) {
          stageDescription = "Awake (Before Sleep)";
        } else if (data?.isAfterSleep) {
          stageDescription = "Awake (After Sleep)";
        } else if (data?.isWakeEvent) {
          stageDescription = "Wake Event";
        }
      }

      return (
        <div className="bg-white p-2 shadow-md rounded-md border text-xs">
          <p className="font-medium">{stageDescription}</p>
          <p>{`Duration: ${Math.round(data?.value)} min`}</p>
          {data?.startTime && <p>{`Time: ${data?.startTime}`}</p>}
        </div>
      );
    }
    return null;
  };

  // Format hours and minutes
  const formatHoursMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  // Toggle between ring and timeline view
  const toggleView = () => {
    setShowTimeline(!showTimeline);
  };

  // Function to get cell fill color with proper opacity
  const getCellFill = (entry: any) => {
    // Make wake periods before/after sleep more transparent
    if (entry?.isBeforeSleep || entry?.isAfterSleep) {
      // Return color with opacity
      return `${COLORS[entry?.name as SleepStage]}66`; // 66 is 40% opacity in hex
    }
    return COLORS[entry?.name as SleepStage];
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Bedtime: {startTime}</span>
          <span>Wake-up: {endTime}</span>
        </div>

        <div
          className={`${
            showTimeline ? "h-40" : "aspect-square"
          } relative mb-4 cursor-pointer transition-all duration-300`}
          onClick={toggleView}
        >
          {!showTimeline ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCellFill(entry)} />
                  ))}
                </Pie>

                {/* Sleep start divider line */}
                <Sector
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={sleepStartAngle}
                  endAngle={sleepStartAngle}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={2}
                />

                {/* Sleep end divider line */}
                <Sector
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={sleepEndAngle}
                  endAngle={sleepEndAngle}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={2}
                />

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timelineData}
                layout="vertical"
                barCategoryGap={0}
                barGap={0}
              >
                <Bar dataKey="value" stackId="a">
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCellFill(entry)} />
                  ))}
                </Bar>
                <XAxis type="number" hide />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {!showTimeline && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-bold">
                {formatHoursMinutes(totalSleepMinutes)}
              </div>
              <div className="text-sm text-gray-500">Total Sleep</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2 mb-4 text-center text-xs">
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="font-medium">
              {formatHoursMinutes(wakeTimeBeforeSleep)}
            </div>
            <div className="text-gray-500">Before Sleep</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="font-medium">
              {formatHoursMinutes(totalSleepMinutes)}
            </div>
            <div className="text-gray-500">Sleep</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="font-medium">
              {formatHoursMinutes(wakeTimeAfterSleep)}
            </div>
            <div className="text-gray-500">After Sleep</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS.AWAKE }}
            ></div>
            <span>Awake</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS.LIGHT }}
            ></div>
            <span>Light Sleep</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS.DEEP }}
            ></div>
            <span>Deep Sleep</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS.REM }}
            ></div>
            <span>REM Sleep</span>
          </div>
        </div>

        <div className="text-xs text-center mt-2 text-gray-500">
          <div>Time in Bed: {formatHoursMinutes(timeInBedMinutes)}</div>
          <div className="mt-1">
            {showTimeline
              ? "Click to view as ring"
              : "Click to view as timeline"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepCycleRing;
