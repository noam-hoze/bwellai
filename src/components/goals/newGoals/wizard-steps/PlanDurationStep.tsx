
import React from "react";
import { GoalData } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

interface PlanDurationStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const PlanDurationStep = ({ goalData, updateGoalData }: PlanDurationStepProps) => {
  const planOptions = [
    {
      id: "2 weeks",
      title: "2 Weeks",
      description: "Short-term relief plan",
      days: 14
    },
    {
      id: "4 weeks",
      title: "4 Weeks",
      description: "Recommended for most users",
      days: 28
    },
    {
      id: "8 weeks",
      title: "8 Weeks",
      description: "Extended recovery plan",
      days: 56
    },
    {
      id: "custom",
      title: "Custom",
      description: "Set your own duration",
      days: 0
    }
  ];

  const handlePlanDurationChange = (duration: string) => {
    // Get the corresponding duration in days
    const selectedOption = planOptions.find(option => option.id === duration);
    
    updateGoalData({
      planDuration: duration as GoalData["planDuration"],
      duration: selectedOption?.days || goalData.duration || 28
    });
  };

  const handleCustomDaysChange = (days: number) => {
    const customDays = Math.max(1, Math.min(365, days));
    updateGoalData({ 
      duration: customDays
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">How long will you follow this plan?</h3>
        <p className="text-gray-600">
          Select a duration that fits your recovery goals. You can always extend it later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {planOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all border-2 hover:border-gray-300 ${
              goalData.planDuration === option.id 
                ? 'border-wellness-bright-green bg-green-50' 
                : 'border-transparent'
            }`}
            onClick={() => handlePlanDurationChange(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Calendar className="h-5 w-5 text-wellness-bright-green" />
                </div>
                <div>
                  <h4 className="font-medium">{option.title}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  {option.id === "4 weeks" && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {goalData.planDuration === "custom" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Custom Duration</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCustomDaysChange((goalData.duration || 28) - 1)}
              >
                -
              </Button>
              <div className="w-16 text-center font-medium">
                {goalData.duration || 28}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCustomDaysChange((goalData.duration || 28) + 1)}
              >
                +
              </Button>
            </div>
            <div className="text-sm text-gray-600">days</div>
          </div>
          <div className="flex justify-between mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => handleCustomDaysChange(7)}
            >
              1 week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => handleCustomDaysChange(14)}
            >
              2 weeks
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => handleCustomDaysChange(30)}
            >
              30 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => handleCustomDaysChange(90)}
            >
              90 days
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDurationStep;
