
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SleepCardProps {
  duration: string;
  quality: string;
  score: number;
}

const SleepCard = ({ duration, quality, score }: SleepCardProps) => {
  // Calculate quality stars
  const qualityStars = () => {
    if (score >= 90) return 5;
    if (score >= 80) return 4;
    if (score >= 70) return 3;
    if (score >= 60) return 2;
    return 1;
  };

  // Sleep score assessment
  const sleepAssessment = () => {
    if (score >= 90) return { text: "Excellent", color: "text-green-600" };
    if (score >= 80) return { text: "Good", color: "text-blue-600" };
    if (score >= 70) return { text: "Fair", color: "text-amber-600" };
    if (score >= 60) return { text: "Poor", color: "text-orange-600" };
    return { text: "Very Poor", color: "text-red-600" };
  };

  const assessment = sleepAssessment();
  const stars = qualityStars();

  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Moon className="h-5 w-5 text-purple-500" />
          Sleep
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{duration}</span>
            <span className="ml-auto flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index}
                  className={cn(
                    "h-4 w-4",
                    index < stars ? "text-amber-400 fill-amber-400" : "text-gray-300"
                  )}
                />
              ))}
            </span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sleep quality</span>
              <span className={cn("text-sm font-medium", assessment.color)}>
                {assessment.text}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={cn(
                      "h-2 rounded-full",
                      score >= 90 ? "bg-green-500" :
                      score >= 80 ? "bg-blue-500" :
                      score >= 70 ? "bg-amber-500" :
                      score >= 60 ? "bg-orange-500" : "bg-red-500"
                    )}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Exc.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-700">Deep Sleep</div>
              <div className="text-lg font-semibold">1h 45m</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-700">REM Sleep</div>
              <div className="text-lg font-semibold">2h 12m</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepCard;
