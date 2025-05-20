
import React from "react";
import { GoalData } from "../CreateGoalWizard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface PainAssessmentStepProps {
  goalData: GoalData;
  updateGoalData: (data: GoalData) => void;
}

const PainAssessmentStep = ({ goalData, updateGoalData }: PainAssessmentStepProps) => {
  const handlePainLevelUpdate = (level: number) => {
    updateGoalData({
      ...goalData,
      painLevel: level
    });
  };

  const handlePainPatternChange = (pattern: string) => {
    updateGoalData({
      ...goalData,
      painPattern: pattern
    });
  };

  const handlePainTriggerToggle = (trigger: string) => {
    const currentTriggers = [...goalData.painTriggers];
    const triggerIndex = currentTriggers.indexOf(trigger);

    if (triggerIndex === -1) {
      // Add trigger if not already selected
      updateGoalData({
        ...goalData,
        painTriggers: [...currentTriggers, trigger]
      });
    } else {
      // Remove trigger if already selected
      currentTriggers.splice(triggerIndex, 1);
      updateGoalData({
        ...goalData,
        painTriggers: currentTriggers
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Pain Level */}
      <div>
        <h3 className="text-lg font-medium mb-3">Current Pain Level (1-10)</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
            <Button
              key={level}
              variant={level === goalData.painLevel ? "default" : "outline"}
              className={`w-12 h-12 p-0 ${level > 7 ? 'bg-red-100 border-red-200 hover:bg-red-200' : ''} ${level === goalData.painLevel && level > 7 ? 'bg-red-500 hover:bg-red-600' : ''}`}
              onClick={() => handlePainLevelUpdate(level)}
            >
              {level}
            </Button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          1 = Minimal pain, 10 = Worst pain imaginable
        </p>
      </div>

      {/* Pain Pattern */}
      <div>
        <h3 className="text-lg font-medium mb-3">Pain Pattern</h3>
        <RadioGroup 
          value={goalData.painPattern} 
          onValueChange={handlePainPatternChange}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="constant" id="constant" />
              <Label htmlFor="constant">Constant (always present)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermittent" id="intermittent" />
              <Label htmlFor="intermittent">Intermittent (comes and goes)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="activity_related" id="activity_related" />
              <Label htmlFor="activity_related">Activity-related (worse with specific movements)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="time_related" id="time_related" />
              <Label htmlFor="time_related">Time-related (worse at specific times of day)</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Pain Triggers */}
      <div>
        <h3 className="text-lg font-medium mb-3">Pain Triggers (select all that apply)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Sitting for long periods",
            "Standing for long periods",
            "Bending forward",
            "Lifting objects",
            "Walking",
            "Climbing stairs",
            "Morning stiffness",
            "End of day fatigue",
            "Sudden movements",
            "Cold weather"
          ].map((trigger) => (
            <div key={trigger} className="flex items-center space-x-2">
              <Checkbox 
                id={trigger.replace(/\s+/g, '_')}
                checked={goalData.painTriggers.includes(trigger)}
                onCheckedChange={() => handlePainTriggerToggle(trigger)}
              />
              <label 
                htmlFor={trigger.replace(/\s+/g, '_')}
                className="text-sm cursor-pointer"
              >
                {trigger}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PainAssessmentStep;
