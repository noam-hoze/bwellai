
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Flame, Clock } from "lucide-react";

interface ActivityMovementCardProps {
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
}

const ActivityMovementCard = ({ steps, caloriesBurned, activeMinutes }: ActivityMovementCardProps) => {
  // Goals for comparison
  const stepsGoal = 10000;
  const caloriesGoal = 2500;
  const activeMinutesGoal = 60;

  return (
    <Card className="wellness-card border-l-4 border-l-wellness-deep-orange bg-[#f9fafb]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-green-500" />
          Activity & Movement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Steps */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Steps</span>
              </div>
              <span className="text-sm">{Math.round((steps / stepsGoal) * 100)}% of goal</span>
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold">{steps.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-2">/ {stepsGoal.toLocaleString()} steps</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${Math.min((steps / stepsGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Calories */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="bg-orange-100 p-1 rounded-full mr-2">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium">Calories</span>
              </div>
              <span className="text-sm">{Math.round((caloriesBurned / caloriesGoal) * 100)}% of goal</span>
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold">{caloriesBurned.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-2">/ {caloriesGoal.toLocaleString()} kcal</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-orange-500 rounded-full"
                style={{ width: `${Math.min((caloriesBurned / caloriesGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active Minutes */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Active Minutes</span>
              </div>
              <span className="text-sm">{Math.round((activeMinutes / activeMinutesGoal) * 100)}% of goal</span>
            </div>
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold">{activeMinutes}</span>
              <span className="text-sm text-gray-500 ml-2">/ {activeMinutesGoal} min</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${Math.min((activeMinutes / activeMinutesGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityMovementCard;
