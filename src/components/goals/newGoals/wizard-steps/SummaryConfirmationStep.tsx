
import React from "react";
import { GoalData, PainTrigger, FunctionalLimitation } from "../CreateGoalWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SummaryConfirmationStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
}

const painTriggerLabels: Record<PainTrigger, string> = {
  "sitting": "Sitting for long periods",
  "standing": "Standing for long periods", 
  "bending": "Bending forward",
  "lifting": "Lifting objects",
  "walking": "Walking",
  "lying_down": "Lying down",
  "Sitting for long periods": "Sitting for long periods",
  "Standing for long periods": "Standing for long periods",
  "Bending forward": "Bending forward",
  "Lifting objects": "Lifting objects",
  "Walking": "Walking",
  "Climbing stairs": "Climbing stairs",
  "Morning stiffness": "Morning stiffness",
  "End of day fatigue": "End of day fatigue",
  "Sudden movements": "Sudden movements",
  "Cold weather": "Cold weather"
};

const functionalLimitationLabels: Record<FunctionalLimitation, string> = {
  walking_limited: "Can't walk more than 15 minutes",
  sitting_limited: "Can't sit more than 30 minutes",
  standing_limited: "Can't stand more than 15 minutes",
  sleep_disrupted: "Sleep is disrupted by pain"
};

const painPatternLabels = {
  intermittent: "Intermittent (comes and goes)",
  constant: "Constant (always present)",
  "activity-related": "Activity-related"
};

const bodyAreaLabels: Record<string, string> = {
  neck: "Neck",
  upper_back: "Upper/Middle Back",
  lower_back: "Lower Back",
  pelvis: "Pelvis",
  hip: "Hip",
  knee: "Knee",
  ankle_foot: "Ankle & Foot",
  shoulder: "Shoulder",
  elbow: "Elbow",
  wrist: "Wrist",
  hand: "Hand"
};

const SummaryConfirmationStep: React.FC<SummaryConfirmationStepProps> = ({ 
  goalData, 
  updateGoalData 
}) => {
  const [isExercisesOpen, setIsExercisesOpen] = React.useState(true);
  const [isTherapiesOpen, setIsTherapiesOpen] = React.useState(true);

  const handleConfirmationChange = (checked: boolean) => {
    updateGoalData({ confirmConsultation: checked });
  };

  // Calculate duration string
  const getDurationString = () => {
    if (goalData.planDuration !== "custom") {
      return goalData.planDuration;
    }
    
    if (goalData.customDuration) {
      let durationStr = `${goalData.customDuration.weeks} ${goalData.customDuration.weeks === 1 ? 'week' : 'weeks'}`;
      if (goalData.customDuration.days > 0) {
        durationStr += ` and ${goalData.customDuration.days} ${goalData.customDuration.days === 1 ? 'day' : 'days'}`;
      }
      return durationStr;
    }
    
    return "Custom";
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Your Plan is Ready</h2>
          <p className="text-green-700">
            Review and confirm your complete treatment plan below.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Condition</h3>
            <p className="text-sm text-gray-700 mt-1">
              {bodyAreaLabels[goalData.bodyArea] || goalData.bodyArea} Pain
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Duration</h3>
            <p className="text-sm text-gray-700 mt-1">
              {getDurationString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Pain Level</h3>
            <div className="flex items-center mt-1">
              <div className={`
                h-6 w-6 rounded-full flex items-center justify-center text-xs
                ${goalData.painLevel <= 3 ? "bg-green-100 text-green-800" : 
                  goalData.painLevel <= 6 ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"}
              `}>
                {goalData.painLevel}
              </div>
              <span className="text-sm text-gray-500 ml-2">/ 10</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Pain Pattern</h3>
            <p className="text-sm text-gray-700 mt-1">
              {painPatternLabels[goalData.painPattern] || goalData.painPattern}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {goalData.painTriggers.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Pain Triggers</h3>
            <div className="flex flex-wrap gap-2">
              {goalData.painTriggers.map(trigger => (
                <Badge key={trigger} variant="outline" className="bg-gray-100">
                  {painTriggerLabels[trigger] || trigger}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {goalData.functionalLimitations.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Functional Limitations</h3>
            <div className="flex flex-wrap gap-2">
              {goalData.functionalLimitations.map(limitation => (
                <Badge key={limitation} variant="outline" className="bg-gray-100">
                  {functionalLimitationLabels[limitation] || limitation}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Exercises Section */}
      <Card>
        <Collapsible open={isExercisesOpen} onOpenChange={setIsExercisesOpen}>
          <div className="bg-wellness-light-green p-4 flex items-center justify-between border-b cursor-pointer">
            <h3 className="font-medium text-wellness-bright-green">Exercises ({goalData.selectedExercises.length})</h3>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer">
                {isExercisesOpen ? (
                  <ChevronUp className="h-5 w-5 text-wellness-bright-green" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-wellness-bright-green" />
                )}
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="p-4 pt-2">
              {goalData.selectedExercises.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {goalData.selectedExercises.map(exercise => (
                    <div key={exercise.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center">
                        <div className="mr-3 text-xl">
                          {exercise.category === "Mobility" ? "🔄" : 
                           exercise.category === "Strengthening" ? "🏋️" : 
                           exercise.category === "Stretching" ? "🧘" : "⚖️"}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{exercise.name}</h4>
                          <p className="text-xs text-gray-500">
                            {exercise.exerciseType === "rep-based"
                              ? `${exercise.customReps} reps`
                              : `${exercise.duration} seconds`
                            } × {exercise.sets} sets, {exercise.frequency}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {exercise.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-2">No exercises selected</p>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      
      {/* Therapies Section */}
      {goalData.selectedTherapies.length > 0 && (
        <Card>
          <Collapsible open={isTherapiesOpen} onOpenChange={setIsTherapiesOpen}>
            <div className="bg-blue-50 p-4 flex items-center justify-between border-b cursor-pointer">
              <h3 className="font-medium text-blue-700">Hot/Cold Therapy ({goalData.selectedTherapies.length})</h3>
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer">
                  {isTherapiesOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-700" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-700" />
                  )}
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <CardContent className="p-4 pt-2">
                <div className="space-y-3 mt-2">
                  {goalData.selectedTherapies.map(therapy => (
                    <div key={therapy.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center">
                        <div 
                          className={`mr-3 text-xl ${
                            therapy.type === "cold" ? "text-blue-500" : "text-red-500"
                          }`}
                        >
                          {therapy.type === "cold" ? "❄️" : "🔥"}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{therapy.name}</h4>
                          <p className="text-xs text-gray-500">
                            {therapy.duration} min, {therapy.timesPerDay}x daily,{" "} 
                            {therapy.whenToApply}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
      
      {/* Expected Outcomes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-3">Expected Outcomes</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Reduced pain intensity within the first 1-2 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Improved range of motion in affected areas</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Increased functionality in daily activities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Better understanding of pain triggers and management strategies</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Confirmation Checkbox */}
      <div className="flex items-start space-x-2 p-2 border-t">
        <Checkbox 
          id="confirmation" 
          checked={goalData.confirmConsultation}
          onCheckedChange={(checked) => handleConfirmationChange(!!checked)}
          className="mt-1"
        />
        <div>
          <Label htmlFor="confirmation" className="text-sm font-medium cursor-pointer">
            I understand this is a personalized plan based on my inputs
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            While this plan is designed to help manage your condition, please consult with a healthcare professional before starting any new treatment plan, especially for severe or persistent pain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryConfirmationStep;
