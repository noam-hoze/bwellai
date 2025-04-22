import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Info } from "lucide-react";
import {
  type SleepSegment,
  type SleepStage,
} from "@/components/sleep/SleepCycleRing";
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

interface SleepCycleClockProps {
  sleepData: SleepSegment[];
  title?: string;
  startTime?: string;
  endTime?: string;
}

const SleepCycleClock: React.FC<SleepCycleClockProps> = ({
  sleepData,
  title = "Sleep Clock",
  startTime = "10:30 PM",
  endTime = "7:00 AM",
}) => {
  // Calculate total duration
  const totalDuration = sleepData?.reduce(
    (acc, segment) => acc + segment?.duration,
    0
  );

  // Find actual sleep start and end (excluding initial/final wake periods)
  let sleepStartPercent = 0;
  let sleepEndPercent = 100;

  // Calculate sleep start percentage
  for (let i = 0; i < sleepData?.length; i++) {
    if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
      break;
    }
    sleepStartPercent += (sleepData?.[i]?.duration / totalDuration) * 100;
  }

  // Calculate sleep end percentage
  let cumulativePercent = 100;
  // Use a manual implementation instead of findLastIndex for compatibility
  let lastNonWakeIndex = -1;
  for (let i = 0; i < sleepData?.length; i++) {
    if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
      lastNonWakeIndex = i;
    }
  }

  for (let i = sleepData?.length - 1; i > lastNonWakeIndex; i--) {
    if (sleepData?.[i]?.stage === "AWAKE" && !sleepData?.[i]?.isWakeEvent) {
      cumulativePercent -= (sleepData?.[i]?.duration / totalDuration) * 100;
    }
  }
  sleepEndPercent = cumulativePercent;

  // Map the sleep cycle to a standard 12-hour clock (11PM to 7AM)
  // Starting angle for 11 PM (330 degrees, or 11 * 30 degrees from midnight)
  const clockStartHour = 23; // 11 PM
  const clockEndHour = 7; // 7 AM

  // Convert to degrees - 11 PM is at 330 degrees on a clock face
  const clockStartDegree = (clockStartHour % 12) * 30 - 90; // -90 to start at 12 o'clock
  // 7 AM is at 210 degrees on a clock face
  const clockEndDegree = (clockEndHour % 12) * 30 - 90;

  // Map sleep start and end to clock positions
  // For a clock visualization, map our sleep data percentages to the 11PM-7AM arc
  // 11PM is at 330° and 7AM is at 210° in clock coordinates
  const totalClockArcDegrees =
    clockEndDegree > clockStartDegree
      ? clockEndDegree - clockStartDegree
      : clockEndDegree - clockStartDegree + 360;

  const sleepStartDegree =
    clockStartDegree + (sleepStartPercent / 100) * totalClockArcDegrees;
  const sleepEndDegree =
    clockStartDegree + (sleepEndPercent / 100) * totalClockArcDegrees;

  // Calculate wake time before sleep - fixed at 60 minutes (1 hour)
  const wakeBeforeSleepMinutes = 60;

  // Calculate wake time after sleep
  const wakeAfterSleepMinutes = (() => {
    let duration = 0;
    // Use a manual implementation instead of findLastIndex for compatibility
    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
        lastNonWakeIndex = i;
      }
    }

    for (let i = sleepData?.length - 1; i > lastNonWakeIndex; i--) {
      if (sleepData?.[i]?.stage === "AWAKE" && !sleepData?.[i]?.isWakeEvent) {
        duration += sleepData?.[i]?.duration;
      }
    }
    return duration;
  })();

  // Generate clock segments
  const clockSegments = sleepData?.map((segment, index) => {
    // Calculate previous segments' total duration
    const previousDuration = sleepData
      .slice(0, index)
      .reduce((acc, seg) => acc + seg.duration, 0);

    // Calculate segment position as a percentage
    const startPercent = (previousDuration / totalDuration) * 100;
    const endPercent =
      ((previousDuration + segment.duration) / totalDuration) * 100;

    // Map to the clock arc (11PM to 7AM)
    const startDegree =
      clockStartDegree + (startPercent / 100) * totalClockArcDegrees;
    const endDegree =
      clockStartDegree + (endPercent / 100) * totalClockArcDegrees;

    // Identify before/after sleep segments using the same manual approach
    // First non-wake index
    let firstNonWakeIndex = sleepData?.findIndex(
      (s) => s.stage !== "AWAKE" || s.isWakeEvent
    );
    if (firstNonWakeIndex === -1) firstNonWakeIndex = 0;

    // Last non-wake index (manual implementation)
    let lastNonWakeIndex = -1;
    for (let i = 0; i < sleepData?.length; i++) {
      if (sleepData?.[i]?.stage !== "AWAKE" || sleepData?.[i]?.isWakeEvent) {
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
      stage: segment.stage,
      startDegree,
      endDegree,
      isWakeEvent: segment.isWakeEvent,
      isBeforeSleep,
      isAfterSleep,
      duration: segment.duration,
    };
  });

  // Calculate total sleep minutes (excluding initial/final wake periods)
  const totalSleepMinutes = sleepData?.reduce((acc, segment) => {
    if (segment.stage !== "AWAKE" || segment.isWakeEvent) {
      return acc + segment.duration;
    }
    return acc;
  }, 0);

  // Calculate time in bed (total duration)
  const timeInBedMinutes = totalDuration;

  // Format hours and minutes
  const formatHoursMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  // Calculate segment arc path for the SVG arc (as a ring instead of a filled sector)
  const calculateArcPath = (
    startDegree: number,
    endDegree: number,
    innerRadius: number,
    outerRadius: number
  ) => {
    const startRadInner = (startDegree * Math.PI) / 180; // We've already adjusted for -90 in the degree calc
    const endRadInner = (endDegree * Math.PI) / 180;
    const startRadOuter = (startDegree * Math.PI) / 180;
    const endRadOuter = (endDegree * Math.PI) / 180;

    const x1 = 100 + innerRadius * Math.cos(startRadInner);
    const y1 = 100 + innerRadius * Math.sin(startRadInner);
    const x2 = 100 + innerRadius * Math.cos(endRadInner);
    const y2 = 100 + innerRadius * Math.sin(endRadInner);

    const x3 = 100 + outerRadius * Math.cos(endRadOuter);
    const y3 = 100 + outerRadius * Math.sin(endRadOuter);
    const x4 = 100 + outerRadius * Math.cos(startRadOuter);
    const y4 = 100 + outerRadius * Math.sin(startRadOuter);

    // Flag for determining which arc to draw (large or small)
    const largeArcFlagInner = Math.abs(endDegree - startDegree) > 180 ? 1 : 0;
    const largeArcFlagOuter = Math.abs(endDegree - startDegree) > 180 ? 1 : 0;

    // Path for a ring segment (outer and inner arcs connected)
    return `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArcFlagInner} 1 ${x2} ${y2} L ${x3} ${y3} A ${outerRadius} ${outerRadius} 0 ${largeArcFlagOuter} 0 ${x4} ${y4} Z`;
  };

  // Function to get segment description
  const getSegmentDescription = (segment: any) => {
    if (segment?.stage === "AWAKE") {
      if (segment?.isBeforeSleep) {
        return "Awake (Before Sleep)";
      } else if (segment?.isAfterSleep) {
        return "Awake (After Sleep)";
      } else if (segment?.isWakeEvent) {
        return "Wake Event";
      }
      return "Awake";
    }
    return `${segment?.stage?.charAt(0)}${segment?.stage
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
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">
                    Sleep Clock Visualization
                  </h4>
                  <p className="text-xs">
                    This clock visualizes your sleep cycles around a 12-hour
                    clock face, with the arc representing your total sleep
                    period from bedtime to wake-up.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>
                      • <span className="font-medium">Black hands</span> mark
                      when you fell asleep and woke up
                    </li>
                    <li>
                      • <span className="font-medium">Colored segments</span>{" "}
                      represent different sleep stages
                    </li>
                    <li>
                      • <span className="font-medium">Hover over sections</span>{" "}
                      to see details about your sleep stages
                    </li>
                    <li>
                      •{" "}
                      <span className="font-medium">Transparent segments</span>{" "}
                      show time you were awake before and after sleep
                    </li>
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Bedtime: {startTime}</span>
            <span>Wake-up: {endTime}</span>
          </div>

          <div className="aspect-square relative mb-4">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Clock Face */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />

              {/* Sleep period background - highlighting 11PM to 7AM sector */}
              <path
                d={calculateArcPath(clockStartDegree, clockEndDegree, 60, 70)}
                fill="#F3F4F6"
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />

              {/* Clock numbers */}
              {Array.from({ length: 12 })?.map((_, i) => {
                const angle = ((i * 30 - 90) * Math.PI) / 180;
                const x = 100 + 95 * Math.cos(angle);
                const y = 100 + 95 * Math.sin(angle);
                const hourNum = i === 0 ? 12 : i;
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fill="#6B7280"
                  >
                    {hourNum}
                  </text>
                );
              })}

              {/* Hour ticks */}
              {Array.from({ length: 12 })?.map((_, i) => {
                const angle = ((i * 30 - 90) * Math.PI) / 180;
                const innerX = 100 + 75 * Math.cos(angle);
                const innerY = 100 + 75 * Math.sin(angle);
                const outerX = 100 + 80 * Math.cos(angle);
                const outerY = 100 + 80 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={innerX}
                    y1={innerY}
                    x2={outerX}
                    y2={outerY}
                    stroke="#6B7280"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Sleep segments as rings/arcs */}
              {clockSegments?.map((segment, index) => {
                // For wake periods before/after sleep, use different styling
                let opacity = 1;
                const color = COLORS[segment.stage];

                if (segment.isBeforeSleep || segment.isAfterSleep) {
                  opacity = 0.4; // More transparent for wake periods
                }

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <path
                        d={calculateArcPath(
                          segment.startDegree,
                          segment.endDegree,
                          60,
                          70
                        )}
                        fill={color}
                        opacity={opacity}
                        stroke="white"
                        strokeWidth="0.5"
                        data-stage={segment.stage}
                        className="hover:opacity-80 hover:stroke-slate-300 hover:stroke-[1.5px] transition-all cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-white p-2 shadow-md rounded-md text-xs z-50"
                    >
                      <p className="font-medium">
                        {getSegmentDescription(segment)}
                      </p>
                      <p>{`Duration: ${Math.round(segment.duration)} min`}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}

              {/* Center point */}
              <circle
                cx="100"
                cy="100"
                r="55"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <circle cx="100" cy="100" r="3" fill="#6B7280" />

              {/* Clock hands to show sleep start/end */}
              <line
                x1="100"
                y1="100"
                x2={100 + 70 * Math.cos((sleepStartDegree * Math.PI) / 180)}
                y2={100 + 70 * Math.sin((sleepStartDegree * Math.PI) / 180)}
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="100"
                x2={100 + 70 * Math.cos((sleepEndDegree * Math.PI) / 180)}
                y2={100 + 70 * Math.sin((sleepEndDegree * Math.PI) / 180)}
                stroke="black"
                strokeWidth="1"
              />

              {/* PM/AM indicators */}
              <text
                x="100"
                y="40"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                AM
              </text>
              <text
                x="100"
                y="160"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                PM
              </text>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-bold">
                {formatHoursMinutes(totalSleepMinutes || 0)}
              </div>
              <div className="text-sm text-gray-500">Total Sleep</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-center text-xs mb-4">
            {/* <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {formatHoursMinutes(wakeBeforeSleepMinutes || 0)}
              </div>
              <div className="text-gray-500">Before Sleep</div>
            </div> */}
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {formatHoursMinutes(totalSleepMinutes || 0)}
              </div>
              <div className="text-gray-500">Sleep</div>
            </div>
            {/* <div className="bg-gray-50 p-2 rounded-md">
              <div className="font-medium">
                {formatHoursMinutes(wakeAfterSleepMinutes || 0)}
              </div>
              <div className="text-gray-500">After Sleep</div>
            </div> */}
          </div>

          <div className="text-xs text-center mb-2 text-gray-500">
            <span>
              Time in Bed: {formatHoursMinutes(timeInBedMinutes || 0)}
            </span>
            <div className="mt-1">
              <span>Hover over sections to see details</span>
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
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SleepCycleClock;
