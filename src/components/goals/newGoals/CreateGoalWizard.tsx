
import React, { useEffect, useRef }  from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useGoalWizard } from "./hooks/useGoalWizard";
import { wizardSteps } from "./config/wizardStepsConfig";
import WizardHeader from "./wizard/WizardHeader";
import WizardFooter from "./wizard/WizardFooter";
import { Goal, GoalData } from "./types/goalTypes";

// Re-export types from the types file so consumers don't need to change imports
export * from "./types/goalTypes";

interface CreateGoalWizardProps {
  onClose: () => void;
  editGoal?: Goal | null;
}

const CreateGoalWizard = ({ onClose, editGoal }: CreateGoalWizardProps) => {
  const {
    currentStep,
    goalData,
    validationError,
    updateGoalData,
    handleNext,
    handlePrevious,
    handleSaveGoal
  } = useGoalWizard({ onClose, editGoal });

  const CurrentStepComponent = wizardSteps[currentStep].component;

  const scrollRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
}, [currentStep]);

  
  return (
    <div className="flex flex-col h-[80vh] overflow-hidden">
      <WizardHeader
        currentStep={currentStep}
        totalSteps={wizardSteps.length}
        title={wizardSteps[currentStep].title}
        isEditMode={!!editGoal}
      />

      <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-4 pb-24">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            {wizardSteps[currentStep].infoText}
          </AlertDescription>
        </Alert>

        <CurrentStepComponent 
          goalData={goalData} 
          updateGoalData={updateGoalData} 
        />
      </div>

      <WizardFooter
        currentStep={currentStep}
        isLastStep={currentStep === wizardSteps.length - 1}
        isEditMode={!!editGoal}
        validationError={validationError}
        onPrevious={currentStep === 0 ? onClose : handlePrevious}
        onNext={handleNext}
        onSave={handleSaveGoal}
        confirmConsultation={goalData.confirmConsultation}
      />
    </div>
  );
};

export default CreateGoalWizard;
