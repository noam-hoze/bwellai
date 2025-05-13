import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  type SleepSegment,
  type SleepStage,
} from "@/components/sleep/SleepCycleRing";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Sleep stage colors - updated with new colors
const COLORS = {
  AWAKE: "#F97316", // Orange
  LIGHT: "#FEDF89", // Soft yellow/gold
  DEEP: "#53A15E", // Medium green
  REM: "#0EA5E9", // Bright blue
};

// Wake period colors (specifically for before/after sleep)
const WAKE_COLORS = {
  BEFORE_SLEEP: "#ea384c", // Red for before sleep
  AFTER_SLEEP: "#ea384c", // Red for after sleep
};

interface SleepCycleAnimatedProps {
  sleepData: SleepSegment[];
  title?: string;
  startTime?: string;
  endTime?: string;
  totalSleep?: string;
}

const SleepCycleAnimated: React.FC<SleepCycleAnimatedProps> = ({
  sleepData,
  title = "Sleep Cycles",
  startTime,
  endTime,
  totalSleep,
}) => {
  const [isTimelineView, setIsTimelineView] = useState(false);
  const [totalSleepMinutes, setTotalSleepMinutes] = useState(0);
  const [wakeTimeBeforeSleep, setWakeTimeBeforeSleep] = useState(0); // Changed to 60 min (one hour)
  const [wakeTimeAfterSleep, setWakeTimeAfterSleep] = useState(0); // Set to 15 min
  const [timeInBedMinutes, setTimeInBedMinutes] = useState(0);
  const [modifiedSleepData, setModifiedSleepData] = useState<SleepSegment[]>(
    []
  );

  useEffect(() => {
    const firstNonWakeIndex = sleepData?.findIndex(
      (segment) => segment.stage !== "AWAKE" || segment.isWakeEvent
    );

    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    const newSleepData = [...sleepData];

    // if (firstNonWakeIndex > 0) {
    //   const initialWake = {
    //     ...newSleepData[0],
    //     duration: 60, // Changed to 60 min (one hour)
    //   };
    //   newSleepData[0] = initialWake;
    // } else if (firstNonWakeIndex === -1 || firstNonWakeIndex > 0) {
    //   newSleepData?.unshift({
    //     stage: "AWAKE",
    //     duration: 60, // Changed to 60 min (one hour)
    //     isWakeEvent: false,
    //   });
    // }

    if (lastNonWakeIndex < newSleepData?.length - 1) {
      for (let i = newSleepData?.length - 1; i > lastNonWakeIndex; i--) {
        if (i === newSleepData?.length - 1) {
          newSleepData[i] = {
            ...newSleepData?.[i],
            duration: 15,
          };
        } else {
          newSleepData?.splice(i, 1);
        }
      }
    }

    setModifiedSleepData(newSleepData);

    const totalTime = newSleepData?.reduce(
      (acc, segment) => acc + segment.duration,
      0
    );
    setTimeInBedMinutes(totalTime);

    const totalSleep = newSleepData?.reduce(
      (acc, segment) =>
        // segment.stage !== "AWAKE" ? acc + segment.duration : acc,
        acc + segment.duration,
      0
    );
    const totalWake = newSleepData?.reduce(
      (acc, segment) =>
        segment.stage === "AWAKE" ? acc + segment.duration : acc,
      0
    );

    setTotalSleepMinutes(totalSleep - totalWake);
  }, [sleepData]);

  const chartData = modifiedSleepData?.map((segment, index) => {
    const firstNonWakeIndex = modifiedSleepData?.findIndex(
      (s) => s.stage !== "AWAKE" || s.isWakeEvent
    );
    let lastNonWakeIndex = -1;
    for (let i = 0; i < modifiedSleepData?.length; i++) {
      if (
        modifiedSleepData?.[i]?.stage !== "AWAKE" ||
        modifiedSleepData?.[i]?.isWakeEvent
      ) {
        lastNonWakeIndex = i;
      }
    }

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
      cumulativeTime: modifiedSleepData
        .slice(0, index)
        .reduce((acc, curr) => acc + curr.duration, 0),
    };
  });

  const toggleView = () => {
    setIsTimelineView(!isTimelineView);
  };

  const formatHoursMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const getSegmentColor = (segment: any) => {
    let color = COLORS[segment.name as SleepStage];
    let opacity = 1;

    if (segment.isBeforeSleep) {
      color = WAKE_COLORS.BEFORE_SLEEP;
      opacity = 0.8;
    } else if (segment.isAfterSleep) {
      color = WAKE_COLORS.AFTER_SLEEP;
      opacity = 0.8;
    } else if (segment.name === "AWAKE" && !segment.isWakeEvent) {
      opacity = 0.7;
    }

    return { color, opacity };
  };

  const getSegmentDescription = (segment: any) => {
    if (segment.name === "AWAKE") {
      if (segment.isBeforeSleep) {
        return "Awake (Before Sleep)";
      } else if (segment.isAfterSleep) {
        return "Awake (After Sleep)";
      } else if (segment.isWakeEvent) {
        return "Wake Event";
      }
      return "Awake";
    }
    return `${segment?.name?.charAt(0)}${segment?.name
      ?.slice(1)
      ?.toLowerCase()} Sleep`;
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Card className="wellness-card border-l-4 border-l-wellness-deep-orange h-full bg-white rounded-xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center flex items-center justify-between">
            {title}
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-full">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">
                    Sleep Cycle Visualization
                  </h4>
                  <p className="text-xs">
                    This chart shows your sleep cycles throughout the night,
                    with different colors representing different sleep stages.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>
                      •{" "}
                      <span className="font-medium">
                        Click the up/down arrow
                      </span>{" "}
                      to switch between ring and timeline views
                    </li>
                    <li>
                      • <span className="font-medium">Hover over sections</span>{" "}
                      to see details about each sleep stage
                    </li>
                    <li>
                      • <span className="font-medium">Red sections</span> show
                      time you were awake before or after sleep
                    </li>
                    <li>
                      • <span className="font-medium">Orange sections</span>{" "}
                      show wake events during sleep
                    </li>
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            {startTime && <span>Bedtime: {startTime}</span>}
            {endTime && <span>Wake-up: {endTime}</span>}
          </div>

          <div className="relative h-60">
            <motion.div
              className="w-full h-full"
              animate={{
                height: isTimelineView ? "100%" : "100%",
              }}
            >
              <motion.div
                className={`absolute inset-0 origin-center ${
                  isTimelineView ? "z-0" : "z-10"
                }`}
                initial={false}
                animate={{
                  borderRadius: isTimelineView ? "0%" : "50%",
                  height: isTimelineView ? "25%" : "100%",
                  top: isTimelineView ? "37.5%" : "0%",
                  scale: isTimelineView ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {chartData?.map((segment, index) => {
                    const { color, opacity } = getSegmentColor(segment);
                    const totalValue = chartData.reduce(
                      (acc, item) => acc + item.value,
                      0
                    );
                    const startAngle =
                      (chartData
                        .slice(0, index)
                        .reduce((acc, item) => acc + item.value, 0) /
                        totalValue) *
                      360;
                    const endAngle =
                      startAngle + (segment.value / totalValue) * 360;

                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                    const startRadians = ((startAngle - 90) * Math.PI) / 180;
                    const endRadians = ((endAngle - 90) * Math.PI) / 180;

                    // Adjust inner and outer radius to make the ring 30% thinner
                    // Original values: innerRadius = 60, outerRadius = 90
                    // Calculate thickness: 90 - 60 = 30
                    // Reduce thickness by 30%: 30 * 0.7 = 21
                    // New values: innerRadius = 65, outerRadius = 86
                    const innerRadius = 65;
                    const outerRadius = 86;

                    const x1 = 100 + innerRadius * Math.cos(startRadians);
                    const y1 = 100 + innerRadius * Math.sin(startRadians);
                    const x2 = 100 + innerRadius * Math.cos(endRadians);
                    const y2 = 100 + innerRadius * Math.sin(endRadians);

                    const x3 = 100 + outerRadius * Math.cos(endRadians);
                    const y3 = 100 + outerRadius * Math.sin(endRadians);
                    const x4 = 100 + outerRadius * Math.cos(startRadians);
                    const y4 = 100 + outerRadius * Math.sin(startRadians);

                    const d = `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;

                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <g>
                            <path
                              d={d}
                              fill={color}
                              opacity={isTimelineView ? 0 : opacity}
                              stroke="white"
                              strokeWidth="0.5"
                              className="hover:opacity-80 hover:stroke-slate-300 hover:stroke-[1.5px] transition-all cursor-pointer"
                            />
                          </g>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white p-2 shadow-md rounded-md text-xs"
                        >
                          <p className="font-medium">
                            {getSegmentDescription(segment)}
                          </p>
                          <p>{`Duration: ${Math.round(segment.value)} min`}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}

                  <motion.g
                    className="text-center"
                    initial={false}
                    animate={{
                      opacity: isTimelineView ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <text
                      x="100"
                      y="95"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="bold"
                    >
                      {totalSleep?.split(":")[0]} {totalSleep?.split(":")[1]}
                    </text>
                    <text
                      x="100"
                      y="115"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#6B7280"
                    >
                      Total Sleep
                    </text>
                  </motion.g>
                </svg>
              </motion.div>

              <motion.div
                className={`absolute inset-0 ${
                  isTimelineView ? "z-10" : "z-0"
                }`}
                initial={false}
                animate={{
                  opacity: isTimelineView ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: isTimelineView ? 0.2 : 0,
                }}
              >
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  {chartData?.map((segment, index) => {
                    const { color, opacity } = getSegmentColor(segment);
                    const totalValue = chartData.reduce(
                      (acc, item) => acc + item.value,
                      0
                    );
                    const startPercent =
                      (segment.cumulativeTime / totalValue) * 100;
                    const width = (segment.value / totalValue) * 100;

                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <rect
                            x={startPercent}
                            y={15}
                            width={width}
                            height={10}
                            fill={color}
                            opacity={opacity}
                            stroke="white"
                            strokeWidth="0.2"
                            className="hover:opacity-80 hover:stroke-slate-300 hover:stroke-[0.5px] transition-all cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white p-2 shadow-md rounded-md text-xs"
                        >
                          <p className="font-medium">
                            {getSegmentDescription(segment)}
                          </p>
                          <p>{`Duration: ${Math.round(segment.value)} min`}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}

                  <text
                    x="50"
                    y="35"
                    textAnchor="middle"
                    fontSize="3"
                    fill="#6B7280"
                  >
                    {formatHoursMinutes(totalSleepMinutes)} Total Sleep
                  </text>
                </svg>
              </motion.div>
            </motion.div>

            <button
              className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer bg-white/50 rounded-full p-1"
              onClick={toggleView}
              aria-label={isTimelineView ? "View as ring" : "View as timeline"}
            >
              {isTimelineView ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4 mb-4 text-center text-xs">
            {/* <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {formatHoursMinutes(wakeTimeBeforeSleep || 0)}
              </div>
              <div className="text-gray-500">Before Sleep</div>
            </div> */}
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {totalSleep?.split(":")[0]} {totalSleep?.split(":")[1]}
              </div>
              <div className="text-gray-500">Sleep</div>
            </div>
            {/* <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {formatHoursMinutes(wakeTimeAfterSleep || 0)}
              </div>
              <div className="text-gray-500">After Sleep</div>
            </div> */}
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
            <div>Time in Bed: {formatHoursMinutes(timeInBedMinutes || 0)}</div>
            <div className="mt-1">
              <span className="text-blue-500">
                {isTimelineView
                  ? "Click the icon to view as ring"
                  : "Click the icon to view as timeline"}
              </span>
              <span className="ml-1">• Hover over sections to see details</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SleepCycleAnimated;
