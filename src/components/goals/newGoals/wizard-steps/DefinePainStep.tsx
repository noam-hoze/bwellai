
import React from "react";
import { GoalData, PainPattern, PainTrigger, FunctionalLimitation } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DefinePainStepProps {
  goalData: GoalData;
  updateGoalData: (data: GoalData) => void;
}

const DefinePainStep: React.FC<DefinePainStepProps> = ({ 
  goalData, 
  updateGoalData 
}) => {
  const handlePainLevelChange = (level: number) => {
    updateGoalData({ ...goalData, painLevel: level });
  };

  const handlePainPatternChange = (value: PainPattern) => {
    updateGoalData({ ...goalData, painPattern: value });
  };

  const togglePainTrigger = (trigger: PainTrigger) => {
    const currentTriggers = [...goalData.painTriggers];
    const triggerIndex = currentTriggers.indexOf(trigger);
    
    if (triggerIndex >= 0) {
      currentTriggers.splice(triggerIndex, 1);
    } else {
      currentTriggers.push(trigger);
    }

    updateGoalData({ ...goalData, painTriggers: currentTriggers });
  };

  /*const toggleFunctionalLimitation = (limitation: FunctionalLimitation) => {
    const currentLimitations = [...goalData.functionalLimitations];
    const limitationIndex = currentLimitations.indexOf(limitation);
    
    if (limitationIndex >= 0) {
      currentLimitations.splice(limitationIndex, 1);
    } else {
      currentLimitations.push(limitation);
    }
    
    updateGoalData({ functionalLimitations: currentLimitations });
  };*/

  const getPainLevelColorClass = (level: number) => {
    if (level <= 3) return "bg-green-100 text-green-800";
    if (level <= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold">Pain Level</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <button
                key={level}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  getPainLevelColorClass(level),
                  goalData.painLevel === level && "bg-wellness-bright-green text-white"
                )}
                onClick={() => handlePainLevelChange(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            1 = Minimal pain, 10 = Worst pain imaginable
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Pain Pattern</h3>
          <RadioGroup 
            value={goalData.painPattern} 
            onValueChange={(value) => handlePainPatternChange(value as PainPattern)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermittent" id="intermittent" />
              <Label htmlFor="intermittent">Intermittent (comes and goes)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="constant" id="constant" />
              <Label htmlFor="constant">Constant (always present)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="activity-related" id="activity-related" />
              <Label htmlFor="activity-related">Activity-related</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Pain Triggers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-sitting" 
                checked={goalData.painTriggers.includes("sitting")} 
                onCheckedChange={() => togglePainTrigger("sitting")}
              />
              <Label htmlFor="trigger-sitting">Sitting for long periods</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-standing" 
                checked={goalData.painTriggers.includes("standing")} 
                onCheckedChange={() => togglePainTrigger("standing")}
              />
              <Label htmlFor="trigger-standing">Standing for long periods</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-bending" 
                checked={goalData.painTriggers.includes("bending")} 
                onCheckedChange={() => togglePainTrigger("bending")}
              />
              <Label htmlFor="trigger-bending">Bending forward</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-lifting" 
                checked={goalData.painTriggers.includes("lifting")} 
                onCheckedChange={() => togglePainTrigger("lifting")}
              />
              <Label htmlFor="trigger-lifting">Lifting objects</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-walking" 
                checked={goalData.painTriggers.includes("walking")} 
                onCheckedChange={() => togglePainTrigger("walking")}
              />
              <Label htmlFor="trigger-walking">Walking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trigger-lying" 
                checked={goalData.painTriggers.includes("lying_down")} 
                onCheckedChange={() => togglePainTrigger("lying_down")}
              />
              <Label htmlFor="trigger-lying">Lying down</Label>
            </div>
          </div>
        </div>

        {/*<div className="space-y-3">
          <h3 className="font-semibold">Functional Limitations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="limit-walking" 
                checked={goalData.functionalLimitations.includes("walking_limited")} 
                onCheckedChange={() => toggleFunctionalLimitation("walking_limited")}
              />
              <Label htmlFor="limit-walking">Can't walk more than 15 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="limit-sitting" 
                checked={goalData.functionalLimitations.includes("sitting_limited")} 
                onCheckedChange={() => toggleFunctionalLimitation("sitting_limited")}
              />
              <Label htmlFor="limit-sitting">Can't sit more than 30 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="limit-standing" 
                checked={goalData.functionalLimitations.includes("standing_limited")} 
                onCheckedChange={() => toggleFunctionalLimitation("standing_limited")}
              />
              <Label htmlFor="limit-standing">Can't stand more than 15 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="limit-sleep" 
                checked={goalData.functionalLimitations.includes("sleep_disrupted")} 
                onCheckedChange={() => toggleFunctionalLimitation("sleep_disrupted")}
              />
              <Label htmlFor="limit-sleep">Sleep is disrupted by pain</Label>
            </div>
          </div>
        </div>*/}
      </CardContent>
    </Card>
  );
};

export default DefinePainStep;
