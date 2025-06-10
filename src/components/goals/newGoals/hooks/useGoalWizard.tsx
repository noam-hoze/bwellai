import { useState, useEffect } from "react";
import { GoalData, Goal } from "../types/goalTypes";
import { useToast } from "@/hooks/use-toast";
import { useGetSavedUserGoal, useSaveUserGoalFetcher } from "@/service/hooks/goal/useGetGoal";


interface UseGoalWizardProps {
  onClose: () => void;
  editGoal?: Goal | null;
}

export const useGoalWizard = ({ onClose, editGoal }: UseGoalWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [goalData, setGoalData] = useState<GoalData>({
    goalId: 0,
    type: "",
    painLevel: 5,
    painPattern: "",
    painTriggers: [],
    selectedExercises: [],
    selectedTherapies: [],
    functionalLimitations: [],
    schedule: {
      morning: false,
      afternoon: false,
      evening: false,
    },
    name: "",
    duration: 28, // Default to 28 days
    planDuration: "4 weeks", // Default to 4 weeks
  });

  const [confirmConsultation, setConfirmConsultation] = useState(false);
  // When in edit mode, initialize with the provided goal data
  useEffect(() => {
    if (editGoal) {
      // In a real app, this would fetch the full goal data from an API
      // For now, we'll use a simplified version based on the passed in goal
      setGoalData(prevData => ({
        ...prevData,
        name: editGoal.title,
        bodyArea: editGoal.type.toLowerCase(),
        painLevel: editGoal.initialPainLevel,
        duration: editGoal.duration,
        // Other fields would be populated from the API in a real app
      }));
    }
  }, [editGoal]);

  const {
    refetch: savedUserGoalRefetch,
  } = useGetSavedUserGoal();

  // Create a wrapper function to correctly handle partial updates
  const updateGoalData = (newData: Partial<GoalData>) => {
    setGoalData(prevData => ({ ...prevData, ...newData }));
  };

  const handleNext = () => {
    // Clear previous validation error
    setValidationError(null);

    // Validation logic for each step
    if (currentStep === 0 && !goalData.type) {
      setValidationError("Please select a pain area to continue");
      return;
    }

    if (currentStep === 2 && goalData.selectedExercises.length === 0) {
      setValidationError("Please select at least one exercise for your treatment plan");
      return;
    }

    if (currentStep === 6 && !confirmConsultation) {
      setValidationError("Please confirm the consultation notice to proceed");
      return;
    }

    if (currentStep < 7 - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0); // Scroll to top when changing steps
    }
  };

  const handlePrevious = () => {
    // Clear validation error when going back
    setValidationError(null);

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0); // Scroll to top when changing steps
    }
  };

  const { mutate: saveUserGoalMutate } = useSaveUserGoalFetcher();

  const handleSaveGoal = () => {
    const preferredTimes = [];
    if (goalData.schedule.morning) preferredTimes.push("MORNING");
    if (goalData.schedule.afternoon) preferredTimes.push("AFTERNOON");
    if (goalData.schedule.evening) preferredTimes.push("EVENING");

    let runningId = 1;

    const scheduledExercises = goalData.selectedExercises.flatMap((exercise) => {
      const dates = generateDatesByFrequency(exercise.frequency, goalData.duration);

      return dates.map((date) => ({
        exercise_id: runningId++,
        exercise_type_id: exercise.id,
        exercise_name: exercise.name,
        entity: exercise.customReps > 0 ? "reps" : "duration",
        entity_value: exercise.customReps > 0 ? exercise.customReps : exercise.duration,
        sets: exercise.sets > 0 ? exercise.sets : exercise.timesPerDay,
        date: date,
        is_completed: false
      }));
    });


    saveUserGoalMutate(
      {
        goals_id: goalData.goalId,
        pain_assessment: {
          current_pain_level: goalData.painLevel,
          initial_pain_level: goalData.painLevel,
          pain_pattern: goalData.painPattern,
          pain_triggers: goalData.painTriggers,
          functional_limitations: goalData.functionalLimitations,
        },
        exercise_selection: scheduledExercises,
        therapy_selection: goalData.selectedTherapies,
        schedule: {
          preferred_time: preferredTimes,
          program_duration_in_days: goalData.duration,
        },
        status: "ACTIVE",
      },
      {
        onSuccess: () => {
          toast({
            title: editGoal ? "Treatment Plan Updated Successfully" : "Treatment Plan Created Successfully",
            description: `Your ${goalData.type} pain management plan has been ${editGoal ? 'updated' : 'created'}`,
          });
          savedUserGoalRefetch();
          onClose();
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  function generateDatesByFrequency(frequency: string, duration: number): string[] {
    const today = new Date();
    const result: string[] = [];

    for (let i = 0; i < duration; i++) {
      let shouldAdd = false;

      switch (frequency) {
        case "Daily":
          shouldAdd = true;
          break;
        case "Every other day":
          shouldAdd = i % 2 === 0;
          break;
        case "3x per week":
          shouldAdd = [0, 2, 4, 7, 9, 11, 13].includes(i); // You can tweak this
          break;
        case "2x per week":
          shouldAdd = [0, 3, 7, 10].includes(i);
          break;
        case "Weekly":
          shouldAdd = i % 7 === 0;
          break;
      }

      if (shouldAdd) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        result.push(date.toISOString().split("T")[0]); // Format YYYY-MM-DD
      }
    }

    return result;
  }



  return {
    currentStep,
    goalData,
    validationError,
    setValidationError,
    updateGoalData,
    handleNext,
    handlePrevious,
    handleSaveGoal
  };
};
