
import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SleepPieChartProps {
  lightSleep: number;
  deepSleep: number;
  remSleep: number;
  awake: number;
}

const SleepPieChart: React.FC<SleepPieChartProps> = ({
  lightSleep,
  deepSleep,
  remSleep,
  awake
}) => {
  // Ideal percentages for comparison
  const idealLightSleep = 55; // 50-60%
  const idealDeepSleep = 20; // 15-25%
  const idealRemSleep = 20; // 20-25%
  const idealAwake = 5; // <10%
  
  // Weights for overall score calculation
  const lightSleepWeight = 0.30;
  const deepSleepWeight = 0.35;
  const remSleepWeight = 0.30;
  const awakeWeight = 0.05;
  
  // Calculate percentages relative to ideal values
  const calculatePercentage = (actual: number, ideal: number) => {
    return Math.min(Math.round((actual / ideal) * 100), 150); // Cap at 150% of ideal
  };
  
  const lightSleepPercentage = calculatePercentage(lightSleep, idealLightSleep);
  const deepSleepPercentage = calculatePercentage(deepSleep, idealDeepSleep);
  const remSleepPercentage = calculatePercentage(remSleep, idealRemSleep);
  const awakePercentage = calculatePercentage(awake, idealAwake);
  
  // Calculate overall sleep score
  const totalWeight = lightSleepWeight + deepSleepWeight + remSleepWeight + awakeWeight;
  const overallScore = Math.round(
    ((lightSleepPercentage * lightSleepWeight) +
    (deepSleepPercentage * deepSleepWeight) +
    (remSleepPercentage * remSleepWeight) +
    // Invert awake score (more awake time = lower score)
    ((100 - awakePercentage + 100) * awakeWeight)) / totalWeight
  );
  
  // Define ring properties
  const outerRadius = 85;
  const innerRadius = 65;
  const ringThickness = 12;
  const gap = 10;
  
  // Circle attributes for dual-ring design
  const calculateCircumference = (radius: number) => 2 * Math.PI * radius;
  const calculateOffset = (percentage: number, circumference: number) => 
    circumference - (percentage / 100) * circumference;
  
  // Outer ring (ideal) circumferences - fixed at 100%
  const outerCircumference = calculateCircumference(outerRadius);
  
  // Inner ring (actual) circumferences with percentage of ideal
  const innerLightCircumference = calculateCircumference(innerRadius);
  const innerDeepCircumference = calculateCircumference(innerRadius - ringThickness - gap);
  const innerRemCircumference = calculateCircumference(innerRadius - 2 * (ringThickness + gap));
  const innerAwakeCircumference = calculateCircumference(innerRadius - 3 * (ringThickness + gap));
  
  // Calculate offsets (filled portion of circle)
  const innerLightOffset = calculateOffset(lightSleepPercentage, innerLightCircumference);
  const innerDeepOffset = calculateOffset(deepSleepPercentage, innerDeepCircumference);
  const innerRemOffset = calculateOffset(remSleepPercentage, innerRemCircumference);
  const innerAwakeOffset = calculateOffset(Math.min(awakePercentage, 100), innerAwakeCircumference);
  
  // Find the sleep stage with the most significant deviation from ideal
  const sleepStages = [
    { name: "Light Sleep", actual: lightSleep, ideal: idealLightSleep, percentage: lightSleepPercentage },
    { name: "Deep Sleep", actual: deepSleep, ideal: idealDeepSleep, percentage: deepSleepPercentage },
    { name: "REM Sleep", actual: remSleep, ideal: idealRemSleep, percentage: remSleepPercentage },
    { name: "Awake", actual: awake, ideal: idealAwake, percentage: awakePercentage }
  ];
  
  // Sort by deviation from ideal (100%)
  const sortedStages = [...sleepStages].sort((a, b) => 
    Math.abs(100 - a.percentage) - Math.abs(100 - b.percentage)
  ).reverse();
  
  const mostSignificantStage = sortedStages[0];
  
  // Dynamic feedback based on most significant deviation
  const getFeedback = () => {
    const stage = mostSignificantStage;
    
    if (stage.percentage > 120) {
      return `Too much ${stage.name}`;
    } else if (stage.percentage < 80) {
      return `Not enough ${stage.name}`;
    } else {
      return `${overallScore}% of Optimal`;
    }
  };
  
  // Text for different stages
  const getStageText = (stage: string, percentage: number) => {
    if (percentage > 120) return "Too much";
    if (percentage < 80) return "Too little";
    return "Optimal";
  };
  
  // Alternate between overall score and specific feedback
  const [showOverallScore, setShowOverallScore] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowOverallScore(prev => !prev);
    }, 5000); // Toggle every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-80 w-full p-4 flex flex-col">
      <div className="relative flex-grow flex flex-col items-center justify-center pb-8">
        <svg className="h-64 w-64 transform -rotate-90" viewBox="0 0 180 180">
          {/* Light Sleep - Outermost Ring */}
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius} 
            fill="transparent" 
            stroke="#f6f7fc" 
            strokeWidth={ringThickness}
          />
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius} 
            fill="transparent" 
            stroke="#FEDF89" 
            strokeWidth={ringThickness} 
            strokeLinecap="round" 
            strokeDasharray={innerLightCircumference} 
            strokeDashoffset={innerLightOffset} 
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Deep Sleep - Second Ring */}
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - ringThickness - gap} 
            fill="transparent" 
            stroke="#f6f7fc" 
            strokeWidth={ringThickness}
          />
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - ringThickness - gap} 
            fill="transparent" 
            stroke="#53A15E" 
            strokeWidth={ringThickness} 
            strokeLinecap="round" 
            strokeDasharray={innerDeepCircumference} 
            strokeDashoffset={innerDeepOffset} 
            className="transition-all duration-1000 ease-out"
          />
          
          {/* REM Sleep - Third Ring */}
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - 2 * (ringThickness + gap)} 
            fill="transparent" 
            stroke="#f6f7fc" 
            strokeWidth={ringThickness}
          />
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - 2 * (ringThickness + gap)} 
            fill="transparent" 
            stroke="#0EA5E9" 
            strokeWidth={ringThickness} 
            strokeLinecap="round" 
            strokeDasharray={innerRemCircumference} 
            strokeDashoffset={innerRemOffset} 
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Awake - Innermost Ring */}
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - 3 * (ringThickness + gap)} 
            fill="transparent" 
            stroke="#f6f7fc" 
            strokeWidth={ringThickness}
          />
          <circle 
            cx="90" 
            cy="90" 
            r={innerRadius - 3 * (ringThickness + gap)} 
            fill="transparent" 
            stroke="#F97316" 
            strokeWidth={ringThickness} 
            strokeLinecap="round" 
            strokeDasharray={innerAwakeCircumference} 
            strokeDashoffset={innerAwakeOffset} 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center text - alternating between overall score and most significant deviation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold">
            {showOverallScore ? `${overallScore}%` : `${mostSignificantStage.percentage}%`}
          </div>
          <div className="text-sm text-gray-600">
            {showOverallScore ? 'Sleep Score' : mostSignificantStage.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {showOverallScore ? getFeedback() : getStageText(mostSignificantStage.name, mostSignificantStage.percentage)}
          </div>
        </div>
      </div>
      
      {/* Legend with tooltips */}
      <div className="flex justify-center items-center gap-4 mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1 cursor-help">
              <div className="w-3 h-3 rounded-full bg-[#FEDF89]"></div>
              <span className="text-xs">Light Sleep</span>
            </TooltipTrigger>
            <TooltipContent className="p-2 text-xs">
              <p>Your: {lightSleep}% of total sleep</p>
              <p>Ideal: {idealLightSleep}% of total sleep</p>
              <p>Completion: {lightSleepPercentage}% of target</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1 cursor-help">
              <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
              <span className="text-xs">Deep Sleep</span>
            </TooltipTrigger>
            <TooltipContent className="p-2 text-xs">
              <p>Your: {deepSleep}% of total sleep</p>
              <p>Ideal: {idealDeepSleep}% of total sleep</p>
              <p>Completion: {deepSleepPercentage}% of target</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1 cursor-help">
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-xs">REM Sleep</span>
            </TooltipTrigger>
            <TooltipContent className="p-2 text-xs">
              <p>Your: {remSleep}% of total sleep</p>
              <p>Ideal: {idealRemSleep}% of total sleep</p>
              <p>Completion: {remSleepPercentage}% of target</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1 cursor-help">
              <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
              <span className="text-xs">Awake</span>
              <Info className="w-3 h-3 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="p-2 text-xs">
              <p>Your: {awake}% of total sleep</p>
              <p>Ideal: &lt;{idealAwake}% of total sleep</p>
              <p>Status: {awakePercentage > 100 ? 'Too many disruptions' : 'Normal'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SleepPieChart;
