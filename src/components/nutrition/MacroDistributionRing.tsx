import React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface MacroDistributionRingProps {
  protein: number;
  fat: number;
  carbs: number;
  className?: string;
}

const MacroDistributionRing: React.FC<MacroDistributionRingProps> = ({
  protein,
  fat,
  carbs,
  className,
}) => {
  // Ideal percentages/ranges for comparison
  const idealProtein = { min: 15, target: 20, max: 25 }; // 15-25%
  const idealFat = { min: 20, target: 25, max: 35 }; // 20-35%
  const idealCarbs = { min: 45, target: 55, max: 65 }; // 45-65%

  // Determine if each macro is in range, too high, or too low
  const proteinStatus =
    protein < idealProtein.min
      ? "Too Low"
      : protein > idealProtein.max
      ? "Too High"
      : "In Range";
  const fatStatus =
    fat < idealFat.min
      ? "Too Low"
      : fat > idealFat.max
      ? "Too High"
      : "In Range";
  const carbsStatus =
    carbs < idealCarbs.min
      ? "Too Low"
      : carbs > idealCarbs.max
      ? "Too High"
      : "In Range";

  // Calculate balance status
  const isBalanced =
    proteinStatus === "In Range" &&
    fatStatus === "In Range" &&
    carbsStatus === "In Range";

  // Define SVG parameters
  const centerX = 100;
  const centerY = 100;
  const radius = 75;
  const strokeWidth = 20;

  // Calculate angles for each segment (in degrees)
  const proteinDegrees = protein * 3.6; // 3.6 = 360/100
  const fatDegrees = fat * 3.6;
  const carbsDegrees = carbs * 3.6;

  // Calculate target zone angles
  const proteinMinDegrees = idealProtein.min * 3.6;
  const proteinMaxDegrees = idealProtein.max * 3.6;
  const fatMinDegrees = idealFat.min * 3.6;
  const fatMaxDegrees = idealFat.max * 3.6;
  const carbsMinDegrees = idealCarbs.min * 3.6;
  const carbsMaxDegrees = idealCarbs.max * 3.6;

  // Calculate SVG arcs
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): { x: number; y: number } => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Starting angles for each segment
  const proteinStartAngle = 0;
  const fatStartAngle = proteinStartAngle + proteinDegrees;
  const carbsStartAngle = fatStartAngle + fatDegrees;

  // Starting angles for target zones (ideal ranges)
  const proteinTargetStart = 0;
  const fatTargetStart = proteinMaxDegrees;
  const carbsTargetStart = fatTargetStart + fatMaxDegrees;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-52 h-52">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Background target zones */}
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              proteinTargetStart,
              proteinTargetStart + (proteinMaxDegrees - proteinMinDegrees)
            )}
            stroke="#D3E4FD"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              fatTargetStart,
              fatTargetStart + (fatMaxDegrees - fatMinDegrees)
            )}
            stroke="#FEF7CD"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              carbsTargetStart,
              carbsTargetStart + (carbsMaxDegrees - carbsMinDegrees)
            )}
            stroke="#F2FCE2"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Actual macro values */}
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              proteinStartAngle,
              proteinStartAngle + proteinDegrees
            )}
            stroke="#0EA5E9"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              fatStartAngle,
              fatStartAngle + fatDegrees
            )}
            stroke="#F97316"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <path
            d={describeArc(
              centerX,
              centerY,
              radius,
              carbsStartAngle,
              carbsStartAngle + carbsDegrees
            )}
            stroke="#53A15E"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="white"
            stroke="#f5f5f5"
            strokeWidth="2"
          />

          {/* Center text */}
          {/* <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isBalanced ? "#53A15E" : "#ea384c"}>
            {isBalanced ? "Balanced" : "Unbalanced"}
          </text> */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            fontSize="14"
            fill={"#6B7B90"}
          >
            Macro Distribution
          </text>
          {/* <text x={centerX} y={centerY + 12} textAnchor="middle" fontSize="10" fill={isBalanced ? "#53A15E" : "#ea384c"}>
            {isBalanced ? "Good Balance" : "Needs Adjustment"}
          </text> */}
        </svg>

        {/* Status indicators */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none opacity-0">
          {/* This div is just a placeholder to maintain structure */}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-8 mt-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0EA5E9]"></div>
            <span className="text-sm text-gray-700">Protein</span>
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              proteinStatus === "In Range" ? "text-green-600" : "text-red-500"
            )}
          >
            {/* {protein}% ({proteinStatus}) */}
            {protein}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#F97316]"></div>
            <span className="text-sm text-gray-700">Fat</span>
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              fatStatus === "In Range" ? "text-green-600" : "text-red-500"
            )}
          >
            {fat}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#53A15E]"></div>
            <span className="text-sm text-gray-700">Carbs</span>
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              carbsStatus === "In Range" ? "text-green-600" : "text-red-500"
            )}
          >
            {carbs}%
          </span>
        </div>
      </div>

      {/* Recommended ranges */}
      {/* <div className="text-sm text-gray-600 mt-4 text-center">
        <Info size={16} className="inline mr-1 text-blue-500" />
        Recommended ranges: Protein {idealProtein.min}-{idealProtein.max}%, Fat{" "}
        {idealFat.min}-{idealFat.max}%, Carbs {idealCarbs.min}-{idealCarbs.max}%
      </div> */}
    </div>
  );
};

export default MacroDistributionRing;
