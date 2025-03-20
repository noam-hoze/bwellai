
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartRateCardProps {
  current: number;
  average: number;
  trend: number;
}

const HeartRateCard = ({ current, average, trend }: HeartRateCardProps) => {
  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-red-500" />
          Heart Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{current}</span>
            <span className="text-sm ml-1">bpm</span>
            <div className={cn(
              "ml-auto flex items-center",
              trend > 0 ? "text-rose-500" : "text-green-500"
            )}>
              {trend > 0 
                ? <TrendingUp className="h-4 w-4 mr-1" />
                : <TrendingDown className="h-4 w-4 mr-1" />
              }
              <span className="text-sm">
                {trend > 0 ? `+${trend}` : trend} bpm
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <div className="flex justify-between mb-1">
              <span>Daily average</span>
              <span className="font-medium">{average} bpm</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: `${Math.min((current / 200) * 100, 100)}%`
                }}
              ></div>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 mt-2">
            <p className="mb-1">Resting heart rate zone:</p>
            <div className="flex items-center gap-2">
              {['50-60', '60-70', '70-80', '80-90', '90+'].map((zone, index) => (
                <div 
                  key={index}
                  className={cn(
                    "text-xs py-1 px-2 rounded-full",
                    current >= parseInt(zone.split('-')[0]) && 
                    (zone.includes('+') || current <= parseInt(zone.split('-')[1]))
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {zone}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeartRateCard;
