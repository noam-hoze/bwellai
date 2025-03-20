
import React from "react";
import { Moon, Clock, Bed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SleepScoreCardProps {
  score: number;
  className?: string;
  bedtime?: string;
  wakeup?: string;
  totalSleep?: string;
  wakeupCount?: number;
}

const SleepScoreCard = ({ 
  score, 
  className,
  bedtime = "11:30 PM",
  wakeup = "7:03 AM",
  totalSleep = "7h 33m",
  wakeupCount = 3
}: SleepScoreCardProps) => {
  // Get color based on sleep score
  const getScoreColor = (score: number): string => {
    if (score === 100) return "#53A15E"; // Excellent - Green
    if (score >= 85) return "#0EA5E9"; // Good - Blue
    if (score >= 70) return "#FEDF89"; // Moderate - Yellow
    if (score >= 50) return "#F97316"; // Poor - Orange
    return "#ef4444"; // Very Poor - Red
  };
  
  // Get text status based on sleep score
  const getScoreStatus = (score: number): string => {
    if (score === 100) return "Excellent Sleep";
    if (score >= 85) return "Good Sleep";
    if (score >= 70) return "Moderate Sleep";
    if (score >= 50) return "Poor Sleep";
    return "Very Poor Sleep";
  };
  
  const ringColor = getScoreColor(score);
  const scoreStatus = getScoreStatus(score);
  
  // Reduced size for the radius, especially impactful for mobile
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isMobile = useIsMobile();

  return (
    <Card className={`wellness-card border-l-4 border-l-wellness-deep-orange h-full bg-[#f9fafb] text-black ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-black">
          <Moon className="h-5 w-5 text-wellness-bright-green" />
          <span>Sleep Score</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-600" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Sleep Score Calculation</h4>
                  <p className="text-xs">Your Sleep Score is calculated based on five key factors:</p>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li><span className="font-medium">Total Sleep (30%)</span> – How close you are to the recommended sleep duration.</li>
                    <li><span className="font-medium">Sleep Stages (30%)</span> – The balance of Light, Deep, and REM sleep.</li>
                    <li><span className="font-medium">Wake Events (15%)</span> – How often and how long you were awake during the night.</li>
                    <li><span className="font-medium">Sleep Consistency (15%)</span> – Regularity of your sleep schedule.</li>
                    <li><span className="font-medium">Recovery (10%)</span> – Heart rate variability (HRV) and resting heart rate trends.</li>
                  </ul>
                  
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <h4 className="font-semibold mb-1">Score Ranges</h4>
                    <ul className="grid grid-cols-2 gap-1 text-xs">
                      <li className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
                        <span>Excellent: 100</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
                        <span>Good: 85-99</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#FEDF89]"></div>
                        <span>Moderate: 70-84</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                        <span>Poor: 50-69</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                        <span>Very Poor: Below 50</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-full">
        <div className="flex flex-col items-center">
          {/* Score Ring at the top */}
          <div className="flex justify-center w-full mb-4">
            <div className={`relative ${isMobile ? 'h-36 w-36' : 'h-44 w-44'} flex items-center justify-center`}>
              <svg className={`${isMobile ? 'h-36 w-36' : 'h-44 w-44'} transform -rotate-90`} viewBox="0 0 150 150">
                {/* Background circle */}
                <circle 
                  cx="75" 
                  cy="75" 
                  r={radius} 
                  fill="#f9fafb" 
                  stroke="#f6f7fc" 
                  strokeWidth="12"
                />
                {/* Colored progress circle */}
                <circle 
                  cx="75" 
                  cy="75" 
                  r={radius} 
                  fill="transparent" 
                  stroke={ringColor} 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-black`}>{score}</span>
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>{scoreStatus}</span>
              </div>
            </div>
          </div>
          
          {/* Legend in the middle - simplified to remove the ranges */}
          <div className="flex justify-center items-center gap-4 mb-6 w-full">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#53A15E]"></div>
              <span className="text-xs">Excellent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-xs">Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#FEDF89]"></div>
              <span className="text-xs">Moderate</span>
            </div>
          </div>
          
          {/* Stats at the bottom */}
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Bedtime</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{bedtime}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Wake-up</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{wakeup}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Total Sleep</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{totalSleep}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-black" />
                <h3 className="text-sm text-black">Wake-up Times</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{wakeupCount} times</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepScoreCard;
