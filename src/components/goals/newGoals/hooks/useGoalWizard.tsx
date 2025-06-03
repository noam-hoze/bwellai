import { useState, useEffect } from "react";
import { GoalData, Goal } from "../types/goalTypes";
import { useToast } from "@/hooks/use-toast";

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
    duration: 30, // Default to 30 days
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

  // Create a wrapper function to correctly handle partial updates
  const updateGoalData = (newData: Partial<GoalData>) => {
    setGoalData(prevData => ({...prevData, ...newData}));
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

  const handleSaveGoal = () => {
    // In a real app, this would save the goal to a database
    console.log("Saving goal:", goalData);
    toast({
      title: editGoal ? "Treatment Plan Updated Successfully" : "Treatment Plan Created Successfully",
      description: `Your ${goalData.type} pain management plan has been ${editGoal ? 'updated' : 'created'}`,
    });
    onClose();
  };

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
