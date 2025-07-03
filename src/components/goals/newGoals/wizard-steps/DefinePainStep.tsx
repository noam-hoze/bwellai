
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

const painDescriptions = {
  1: "Minimal pain",
  2: "Slight Discomfort", 
  3: "Doesn't affect activities",
  4: "Affects Personal Activities",
  5: "Prevents Personal Activities",
  6: "Limits work Schedule",
  7: "Prevents all work",
  8: "Prevents all activities",
  9: "Bedridden",
  10: "Worst pain imaginable"
};

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

  const getPainLevelColors = (level: number) => {
    const colorMap = {
      1: { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
      2: { bg: "bg-green-400", text: "text-white", hover: "hover:bg-green-500" },
      3: { bg: "bg-lime-400", text: "text-white", hover: "hover:bg-lime-500" },
      4: { bg: "bg-yellow-400", text: "text-gray-900", hover: "hover:bg-yellow-500" },
      5: { bg: "bg-yellow-500", text: "text-gray-900", hover: "hover:bg-yellow-600" },
      6: { bg: "bg-orange-400", text: "text-white", hover: "hover:bg-orange-500" },
      7: { bg: "bg-orange-500", text: "text-white", hover: "hover:bg-orange-600" },
      8: { bg: "bg-red-400", text: "text-white", hover: "hover:bg-red-500" },
      9: { bg: "bg-red-500", text: "text-white", hover: "hover:bg-red-600" },
      10: { bg: "bg-red-600", text: "text-white", hover: "hover:bg-red-700" }
    };
    return colorMap[level as keyof typeof colorMap];
  };

  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold">Pain Level</h3>
          <div className="space-y-2">
         {/* Single row for web view (md and up) */}
            <div className="hidden md:flex gap-2 items-center justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
                const colors = getPainLevelColors(level);
                const isSelected = goalData.painLevel === level;
                
                return (
                  <button
                    key={level}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                      colors.bg,
                      colors.text,
                      colors.hover,
                      isSelected && "ring-2 ring-offset-2 ring-wellness-bright-green scale-110 shadow-lg",
                      "hover:scale-105"
                    )}
                    onClick={() => handlePainLevelChange(level)}
                  >
                    {level}
                  </button>
                );
              })}
            </div>

            {/* Two rows for mobile view */}
            <div className="md:hidden space-y-2">
              {/* First row: 1-5 */}
              <div className="flex gap-2 items-center justify-center">
                {[1, 2, 3, 4, 5].map((level) => {
                  const colors = getPainLevelColors(level);
                  const isSelected = goalData.painLevel === level;
                  
                  return (
                    <button
                      key={level}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                        colors.bg,
                        colors.text,
                        colors.hover,
                        isSelected && "ring-2 ring-offset-2 ring-wellness-bright-green scale-110 shadow-lg",
                        "hover:scale-105"
                      )}
                      onClick={() => handlePainLevelChange(level)}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
              
              {/* Second row: 6-10 */}
              <div className="flex gap-2 items-center justify-center">
                {[6, 7, 8, 9, 10].map((level) => {
                  const colors = getPainLevelColors(level);
                  const isSelected = goalData.painLevel === level;
                  
                  return (
                    <button
                      key={level}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                        colors.bg,
                        colors.text,
                        colors.hover,
                        isSelected && "ring-2 ring-offset-2 ring-wellness-bright-green scale-110 shadow-lg",
                        "hover:scale-105"
                      )}
                      onClick={() => handlePainLevelChange(level)}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Dynamic Description Display */}
          {goalData.painLevel && (
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-wellness-bright-green">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-wellness-bright-green">
                  Level {goalData.painLevel}:
                </span>
                <span className="text-gray-700">
                  {painDescriptions[goalData.painLevel as keyof typeof painDescriptions]}
                </span>
              </div>
            </div>
          )}
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
