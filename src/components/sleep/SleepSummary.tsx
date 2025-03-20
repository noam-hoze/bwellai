
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Bed, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface SleepSummaryProps {
  date: Date;
  viewType: "day" | "week" | "month";
}

const SleepSummary: React.FC<SleepSummaryProps> = ({ date, viewType }) => {
  const getSummaryData = () => {
    if (viewType === "day") {
      return {
        totalSleep: "7h 33m",
        lightSleep: "59.9%",
        deepSleep: "15.5%",
        remSleep: "17.8%",
        awakeTime: "6.8%",
        sleepScore: 82,
        bedtime: "11:30 PM",
        wakeup: "7:03 AM",
        respiratoryRate: "15.4 breaths/min",
        wakeupCount: 3
      };
    } else if (viewType === "week") {
      return {
        avgTotalSleep: "7 hours 15 minutes",
        avgLightSleep: "4 hours 21 minutes (60.1%)",
        avgDeepSleep: "1 hour 5 minutes (15.1%)",
        avgRemSleep: "1 hour 17 minutes (17.8%)",
        avgAwakeTime: "32 minutes (7.0%)",
        avgSleepScore: 79,
        consistentBedtime: "11:45 PM (±28 min)",
        consistentWakeup: "7:10 AM (±15 min)",
        avgWakeupCount: 2.4
      };
    } else {
      return {
        avgTotalSleep: "7 hours 22 minutes",
        avgLightSleep: "4 hours 25 minutes (59.9%)",
        avgDeepSleep: "1 hour 8 minutes (15.3%)",
        avgRemSleep: "1 hour 18 minutes (17.7%)",
        avgAwakeTime: "31 minutes (7.1%)",
        avgSleepScore: 80,
        lowestDay: "April 12 (5h 45m)",
        highestDay: "April 26 (8h 30m)",
        consistencyScore: "76%",
        avgWakeupCount: 2.8
      };
    }
  };
  
  const data = getSummaryData();
  
  const getScoreColor = (score: number): string => {
    if (score === 100) return "#53A15E"; // Excellent - Green
    if (score >= 85) return "#0EA5E9"; // Good - Blue
    if (score >= 70) return "#FEDF89"; // Moderate - Yellow
    if (score >= 50) return "#F97316"; // Poor - Orange
    return "#ef4444"; // Very Poor - Red
  };
  
  const getScoreStatus = (score: number): string => {
    if (score === 100) return "Excellent Sleep";
    if (score >= 85) return "Good Sleep";
    if (score >= 70) return "Moderate Sleep";
    if (score >= 50) return "Poor Sleep";
    return "Very Poor Sleep";
  };
  
  const isMobile = useIsMobile();
  
  const renderSleepScore = (score: number) => {
    const ringColor = getScoreColor(score);
    const scoreStatus = getScoreStatus(score);
    
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center w-full mb-4">
          <div className={`relative ${isMobile ? 'h-36 w-36' : 'h-44 w-44'} flex items-center justify-center`}>
            <svg className={`${isMobile ? 'h-36 w-36' : 'h-44 w-44'} transform -rotate-90`} viewBox="0 0 150 150">
              <circle 
                cx="75" 
                cy="75" 
                r={radius} 
                fill="#f9fafb" 
                stroke="#f6f7fc" 
                strokeWidth="12"
              />
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
      </div>
    );
  };
  
  if (viewType === "day") {
    return (
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="border-l-4 border-orange-400 pl-4 pb-2">
            <h3 className="text-xl font-bold mb-2">You didn't get enough rest!</h3>
            <p className="text-gray-700">
              You slept <span className="text-red-500 font-medium">{data.totalSleep}</span>, but optimal sleep is 8+ hours.
            </p>
            <p className="text-gray-700 mt-2">
              <span className="text-red-500 font-medium">{data.lightSleep}</span> of your sleep was light sleep. Deep sleep was <span className="text-red-500 font-medium">low</span> ({data.deepSleep}).
            </p>
            <p className="text-gray-700 mt-2">
              You had <span className="text-red-500 font-medium">{data.wakeupCount}</span> wake-up events.
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="border-l-4 border-blue-400 pl-4 pb-2">
            <h3 className="text-xl font-bold mb-2">Possible Reasons</h3>
            <p className="text-gray-700 mt-2">
              You ate at 11:00 PM – late meals can disrupt sleep.
            </p>
            <p className="text-gray-700 mt-2">
              You used your phone before bed – blue light can reduce melatonin.
            </p>
            <p className="text-gray-700 mt-2">
              Your activity level was low today – light exercise can improve deep sleep.
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="border-l-4 border-green-400 pl-4 pb-2">
            <h3 className="text-xl font-bold mb-2">Recommendations</h3>
            <p className="text-gray-700 mt-2">
              Try to get 8 hours of sleep.
            </p>
            <p className="text-gray-700 mt-2">
              Avoid heavy meals 2 hours before bed.
            </p>
            <p className="text-gray-700 mt-2">
              Reduce screen time 30 minutes before sleep.
            </p>
            <p className="text-gray-700 mt-2">
              Stay active during the day for better sleep quality.
            </p>
            
            <Button variant="outline" className="flex items-center gap-2 w-full mt-4">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Want to Improve
            </Button>
          </div>
        </div>
      </div>
    );
  } 
  
  return (
    <div className="space-y-6 bg-[#f9fafb] p-6 rounded-lg text-black">
      {renderSleepScore(viewType === "week" ? data.avgSleepScore : data.avgSleepScore)}
      
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
        {viewType === "week" && (
          <>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Avg Bedtime</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.consistentBedtime}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Avg Wake-up</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.consistentWakeup}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Avg Sleep</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.avgTotalSleep}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-black" />
                <h3 className="text-sm text-black">Avg Wake-up Times</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.avgWakeupCount} times</p>
            </div>
          </>
        )}
        
        {viewType === "month" && (
          <>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Lowest Sleep</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.lowestDay}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Best Sleep</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.highestDay}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wellness-bright-green" />
                <h3 className="text-sm text-black">Consistency</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.consistencyScore}</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-black" />
                <h3 className="text-sm text-black">Avg Wake-up Times</h3>
              </div>
              <p className="text-lg font-medium mt-1 text-black">{data.avgWakeupCount} times</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SleepSummary;
