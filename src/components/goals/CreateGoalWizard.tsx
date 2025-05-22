import React, { useEffect, useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GoalTypeStep from "./wizard-steps/GoalTypeStep";
import PainAssessmentStep from "./wizard-steps/PainAssessmentStep";
import ExerciseSelectionStep from "./wizard-steps/ExerciseSelectionStep";
import ScheduleCustomizationStep from "./wizard-steps/ScheduleCustomizationStep";
import GoalReviewStep from "./wizard-steps/GoalReviewStep";
import { useToast } from "@/hooks/use-toast";
import {
  useSaveUserGoalFetcher,
  useUserGoalDetails,
  useUserGoalExerciseDetails,
} from "@/service/hooks/goal/useGetGoal";

export type GoalData = {
  goalId: number;
  type: string;
  painLevel: number;
  painPattern: string;
  painTriggers: string[];
  selectedExercises: Exercise[];
  schedule: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  name: string;
  duration: number; // Duration in days
};

export type Exercise = {
  id: number;
  name: string;
  category: string;
  description: string;
  recommendedReps: number;
  customReps: number;
  imageUrl: string;
  videoUrl: string;
  selected: boolean;
};

interface CreateGoalWizardProps {
  onClose: () => void;
  savedUserGoalRefetch?;
  userGoalDetails?;
}

const CreateGoalWizard = ({
  onClose,
  savedUserGoalRefetch,
  userGoalDetails,
}: CreateGoalWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [goalData, setGoalData] = useState<GoalData>({
    goalId: 0,
    type: "",
    painLevel: 5,
    painPattern: "",
    painTriggers: [],
    selectedExercises: [],
    schedule: {
      morning: false,
      afternoon: false,
      evening: false,
    },
    name: "",
    duration: 30, // Default to 30 days
  });

  const {
    data: userGoalExerciseDetailsData,
    isLoading: userGoalExerciseIsLoading,
  } = useUserGoalExerciseDetails();

  const {
    data,
    isSuccess: saveUserGoalIsSuccess,
    mutate: saveUserGoalMutate,
  } = useSaveUserGoalFetcher();

  const steps = [
    { title: "Goal Type", component: GoalTypeStep },
    { title: "Pain Assessment", component: PainAssessmentStep },
    { title: "Exercise Selection", component: ExerciseSelectionStep },
    { title: "Schedule", component: ScheduleCustomizationStep },
    { title: "Review", component: GoalReviewStep },
  ];

  const handleNext = () => {
    if (currentStep === 0 && !goalData.type) {
      toast({
        title: "Please select a goal type",
        description: "You need to select a pain management area to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && !goalData.painPattern) {
      toast({
        title: "Please describe your pain pattern",
        description: "This helps us tailor appropriate exercises for you",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && goalData.selectedExercises.length === 0) {
      toast({
        title: "Please select at least one exercise",
        description: "You need to choose exercises for your goal",
        variant: "destructive",
      });
      return;
    }

    if (
      currentStep === 3 &&
      !goalData.schedule.morning &&
      !goalData.schedule.afternoon &&
      !goalData.schedule.evening
    ) {
      toast({
        title: "Please select at least one time period",
        description: "Choose when you plan to do your exercises",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveGoal = () => {
    // In a real app, this would save the goal to a database
    console.log("Saving goal:", goalData);
    const pre_time = [];
    if (goalData.schedule.morning) {
      pre_time.push("MORNING");
    }
    if (goalData.schedule.afternoon) {
      pre_time.push("AFTERNOON");
    }
    if (goalData.schedule.evening) {
      pre_time.push("EVENING");
    }

    console.log(goalData);

    saveUserGoalMutate({
      goals_id: goalData?.goalId,
      pain_assessment: {
        current_pain_level: goalData?.painLevel,
        pain_pattern: goalData?.painPattern,
        pain_triggers: goalData?.painTriggers,
      },
      exercise_selection: goalData?.selectedExercises?.map((g) => {
        return {
          exercise_id: g?.id,
          exercise_name: g?.label,
          entity: g?.name,
          entity_value: g?.customReps,
        };
      }),
      schedule: {
        preferred_time: pre_time,
        program_duration_in_days: goalData?.duration,
      },
      status: "ACTIVE",
    });

    toast({
      title: "Goal Created Successfully",
      description: `Your ${goalData.name} has been created`,
    });
    onClose();
  };

  useEffect(() => {
    if (saveUserGoalIsSuccess) {
      savedUserGoalRefetch();
    }
  }, [saveUserGoalIsSuccess]);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-h-[80vh] overflow-auto">
      <DialogHeader className="bg-gradient-to-r from-wellness-light-green to-blue-50 p-6 sticky top-0 z-10 border-b">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-wellness-bright-green">
            Create New Goal: {steps[currentStep].title}
          </DialogTitle>
          <div className="text-sm font-medium text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="w-full mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-wellness-bright-green transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </DialogHeader>

      <div className="p-6">
        <CurrentStepComponent
          goalData={goalData}
          updateGoalData={setGoalData}
          userGoalDetails={userGoalDetails}
          userGoalExerciseDetailsData={userGoalExerciseDetailsData}
        />
      </div>

      <div className="flex justify-between p-6 border-t">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onClose : handlePrevious}
          className="min-w-[100px]"
        >
          {currentStep === 0 ? (
            "Cancel"
          ) : (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </>
          )}
        </Button>

        <Button
          onClick={
            currentStep === steps.length - 1 ? handleSaveGoal : handleNext
          }
          className="min-w-[100px]"
        >
          {currentStep === steps.length - 1 ? (
            "Create Goal"
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateGoalWizard;
