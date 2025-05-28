
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  isLastStep: boolean;
  isEditMode: boolean;
  validationError: string | null;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
}

const WizardFooter = ({ 
  currentStep, 
  isLastStep, 
  isEditMode,
  validationError,
  onPrevious, 
  onNext, 
  onSave 
}: WizardFooterProps) => {
  return (
    <div className="flex flex-col p-6 border-t bg-white sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="min-w-[100px]"
          disabled={currentStep === 0}
        >
          {currentStep === 0 ? "Cancel" : (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </>
          )}
        </Button>
        
        <Button 
          onClick={isLastStep ? onSave : onNext}
          className="min-w-[100px]"
        >
          {isLastStep ? (
            isEditMode ? "Update Treatment Plan" : "Create Treatment Plan"
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {validationError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{validationError}</p>
        </div>
      )}
    </div>
  );
};

export default WizardFooter;
