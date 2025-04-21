
import React from "react";

interface OnboardingFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const OnboardingFooter: React.FC<OnboardingFooterProps> = ({ 
  currentStep, 
  totalSteps,
  onPrevStep,
  onNextStep
}) => {
  if (currentStep >= totalSteps - 1) {
    return null;
  }
  
  return (
    <div className="flex mt-8">
      {currentStep > 0 && currentStep < totalSteps - 1 && (
        <button 
          className="flex-1 mr-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50" 
          onClick={onPrevStep}
        >
          Back
        </button>
      )}
      
      <button 
        className="flex-1 py-3 px-4 bg-green-800 rounded-lg text-white font-medium hover:bg-green-700" 
        onClick={onNextStep}
      >
        Continue
      </button>
    </div>
  );
};

export default OnboardingFooter;
