
import React from "react";
import { GoalData } from "../types/goalTypes";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useUserGoalDetails } from "@/service/hooks/goal/useGetGoal";

interface SelectPainAreaStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const SelectPainAreaStep: React.FC<SelectPainAreaStepProps> = ({ 
  goalData, 
  updateGoalData 
}) => {
  const { data: userGoalDetails, isLoading: userGoalDetailsIsLoading } =
      useUserGoalDetails();
  const handleSelectArea = (type: string, id: number) => {
    updateGoalData({ type: type , goalId: id });
  };
console.log("userGoalDetails", userGoalDetails);
console.log("goalData", goalData);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Your Pain Area</h2>
      <p className="text-gray-600">
        Choose the specific area where you're experiencing pain to create a targeted treatment plan.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {userGoalDetails?.map((goal) => (
          <Card 
            key={goal.type}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md border-2",
              goalData.type === goal.goalType 
                ? "border-wellness-bright-green bg-green-50" 
                : "border-transparent hover:border-gray-300"
            )}
            onClick={() => handleSelectArea(goal.goalType, goal.id)}
          >
            <CardContent className="p-3 flex items-center">
              <div className="w-12 h-12 rounded-md mr-3 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={goal.image} 
                  alt={goal.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium text-sm">{goal.name}</h3>
                <p className="text-xs text-gray-500">{goal.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectPainAreaStep;
