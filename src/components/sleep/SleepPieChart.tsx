import React from "react";

interface SleepPieChartProps {
  lightSleep: number;
  deepSleep: number;
  remSleep: number;
  awake: number;
  lightHR?;
  deepHR?;
  remHR?;
  awakeHR?;
}

const SleepPieChart: React.FC<SleepPieChartProps> = ({
  lightSleep,
  deepSleep,
  remSleep,
  awake,
  lightHR,
  deepHR,
  remHR,
  awakeHR,
}) => {
  // Ideal percentages for comparison
  const idealLightSleep = 55; // 50-60%
  const idealDeepSleep = 20; // 15-25%
  const idealRemSleep = 20; // 20-25%

  // Calculate percentages relative to ideal values
  const calculatePercentage = (actual: number, ideal: number) => {
    return Math.min(Math.round((actual / ideal) * 100), 150); // Cap at 150% of ideal
  };

  // Determine status color based on percentage
  const getStatusColor = (percentage: number) => {
    if (percentage >= 95 && percentage <= 105) return "text-blue-500";
    if (percentage > 105) return "text-green-500";
    return "text-amber-500";
  };

  // Determine status text based on percentage
  const getStatusText = (percentage: number) => {
    if (percentage >= 95 && percentage <= 105) return "Within ideal";
    if (percentage > 105) return "Above ideal";
    return "Below ideal";
  };

  const lightRing = { color: "#FEDF89" }; // Light - Yellow (outer)
  const deepRing = { color: "#53A15E" }; // Deep - Green (middle)
  const remRing = { color: "#0EA5E9" }; // REM - Blue (inner)

  const lightSleepPercentage = calculatePercentage(lightSleep, idealLightSleep);
  const deepSleepPercentage = calculatePercentage(deepSleep, idealDeepSleep);
  const remSleepPercentage = calculatePercentage(remSleep, idealRemSleep);

  const lightStatusColor = getStatusColor(lightSleep);
  const deepStatusColor = getStatusColor(deepSleep);
  const remStatusColor = getStatusColor(remSleep);

  const lightStatus = getStatusText(lightSleep);
  const deepStatus = getStatusText(deepSleep);
  const remStatus = getStatusText(remSleep);

  // States to cycle through sleep stages for the center display
  const sleepStages = [
    {
      type: "Light Sleep",
      value: lightSleep,
      percentage: lightSleepPercentage,
      color: "#FEDF89",
    },
    {
      type: "Deep Sleep",
      value: deepSleep,
      percentage: deepSleepPercentage,
      color: "#53A15E",
    },
    {
      type: "REM Sleep",
      value: remSleep,
      percentage: remSleepPercentage,
      color: "#0EA5E9",
    },
  ];

  // Calculate SVG values for the multi-ring circular progress
  const baseRadius = 80;
  const strokeWidth = 14;
  const gap = 6;

  const calculateRingRadius = (index: number) => {
    return baseRadius - index * (strokeWidth + gap);
  };

  const calculateCircumference = (radius: number) => {
    return 2 * Math.PI * radius;
  };

  const calculateOffset = (value: number, circumference: number) => {
    return circumference - (value / 100) * circumference;
  };

  // Rings configuration
  const rings = [
    {
      radius: calculateRingRadius(0),
      circumference: calculateCircumference(calculateRingRadius(0)),
      offset: calculateOffset(
        lightSleep > 100 ? 100 : lightSleep,
        calculateCircumference(calculateRingRadius(0))
      ),
      color: "#FEDF89", // Light Sleep - Yellow
    },
    {
      radius: calculateRingRadius(1),
      circumference: calculateCircumference(calculateRingRadius(1)),
      offset: calculateOffset(
        deepSleep > 100 ? 100 : deepSleep,
        calculateCircumference(calculateRingRadius(1))
      ),
      color: "#53A15E", // Deep Sleep - Green
    },
    {
      radius: calculateRingRadius(2),
      circumference: calculateCircumference(calculateRingRadius(2)),
      offset: calculateOffset(
        remSleep > 100 ? 100 : remSleep,
        calculateCircumference(calculateRingRadius(2))
      ),
      color: "#0EA5E9", // REM Sleep - Blue
    },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-start py-4 space-y-4">
      <div className="flex-shrink-0 pt-4">
        {/* Multi-ring progress circles - moved upward */}
        <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circles */}
          {rings.map((ring, index) => (
            <circle
              key={`bg-${index}`}
              cx="100"
              cy="100"
              r={ring.radius}
              fill="transparent"
              stroke="#f0f0f0"
              strokeWidth={strokeWidth}
            />
          ))}

          {/* Progress circles */}
          {rings.map((ring, index) => (
            <circle
              key={`progress-${index}`}
              cx="100"
              cy="100"
              r={ring.radius}
              fill="transparent"
              stroke={ring.color}
              strokeWidth={strokeWidth}
              strokeDasharray={ring.circumference}
              strokeDashoffset={ring.offset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          ))}
        </svg>
      </div>

      {/* Legend - moved closer to rings */}
      {/* <div className="flex justify-center items-center gap-8 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#FEDF89]"></div>
          <span className="text-sm text-gray-700">
            Light
            <br />
            {lightSleep?.toFixed(0)}%<p>{lightHR} H</p>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#53A15E]"></div>
          <span className="text-sm text-gray-700">
            Deep
            <br />
            {deepSleep?.toFixed(0)}% <p>{deepHR} H</p>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#0EA5E9]"></div>
          <span className="text-sm text-gray-700">
            REM
            <br />
            {remSleep?.toFixed(0)}% <p>{remHR} H</p>
          </span>
        </div>
      </div> */}

      <div className="grid grid-cols-3 gap-2 w-full mt-2">
        {/* Light sleep */}
        <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: lightRing.color }}
            ></div>
            <span className="text-sm font-medium">Light</span>
          </div>
          <div className="text-xl font-bold mt-1">
            {/* {formatTimeValue(lightSleep)} */}
            <p>{lightHR?.split(":")?.[0]}h</p>
            <p>{lightHR?.split(":")?.[1]}m</p>
          </div>
          <div className="text-xs text-gray-500">
            {lightSleep?.toFixed(0)}% of target
          </div>
          <div className={`text-xs font-medium ${lightStatusColor}`}>
            {lightStatus}
          </div>
        </div>

        {/* Deep sleep */}
        <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: deepRing.color }}
            ></div>
            <span className="text-sm font-medium">Deep</span>
          </div>
          <div className="text-xl font-bold mt-1">
            {/* {formatTimeValue(deepSleep)} */}
            <p>{deepHR?.split(":")?.[0]}h</p>
            <p>{deepHR?.split(":")?.[1]}m</p>
          </div>
          <div className="text-xs text-gray-500">
            {deepSleep?.toFixed(0)}% of target
          </div>
          <div className={`text-xs font-medium ${deepStatusColor}`}>
            {deepStatus}
          </div>
        </div>

        {/* REM sleep */}
        <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: remRing.color }}
            ></div>
            <span className="text-sm font-medium">REM</span>
          </div>
          <div className="text-xl font-bold mt-1">
            {/* {formatTimeValue(remSleep)} */}
            <p>{remHR?.split(":")?.[0]}h</p>
            <p>{remHR?.split(":")?.[1]}m</p>
          </div>
          <div className="text-xs text-gray-500">
            {remSleep?.toFixed(0)}% of target
          </div>
          <div className={`text-xs font-medium ${remStatusColor}`}>
            {remStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepPieChart;
