
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StressLevelCardProps {
  current: string;
  score: number;
  trend: number;
}

const StressLevelCard = ({ current, score, trend }: StressLevelCardProps) => {
  // Get color based on stress level
  const getStressColor = (score: number): string => {
    if (score < 30) return "bg-green-500"; // Low stress
    if (score < 60) return "bg-amber-500"; // Moderate stress
    return "bg-red-500"; // High stress
  };

  // Get label based on stress level
  const getStressLabel = (score: number): string => {
    if (score < 30) return "Low";
    if (score < 60) return "Moderate";
    return "High";
  };

  const stressColor = getStressColor(score);
  const stressLabel = getStressLabel(score);

  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-amber-500" />
          Stress Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{stressLabel}</span>
            <div className={cn(
              "ml-auto flex items-center",
              trend > 0 ? "text-red-500" : "text-green-500"
            )}>
              {trend > 0 
                ? <TrendingUp className="h-4 w-4 mr-1" />
                : <TrendingDown className="h-4 w-4 mr-1" />
              }
              <span className="text-sm">
                {trend > 0 ? `+${trend}` : trend}%
              </span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0</span>
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>100</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full">
              <div 
                className={cn("h-3 rounded-full", stressColor)}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2 mt-2">
            <h4 className="text-sm font-medium">Contributing Factors:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <span>Heart Rate</span>
                <span className="font-medium">Elevated</span>
              </div>
              <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <span>HRV</span>
                <span className="font-medium">Low</span>
              </div>
              <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <span>Sleep</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <span>Activity</span>
                <span className="font-medium">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StressLevelCard;
