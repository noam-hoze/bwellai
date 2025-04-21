
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onSkipToSignup: () => void;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ currentStep, totalSteps, onSkipToSignup }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png" alt="B-Well Logo" className="h-8" />
          {isMobile && currentStep < totalSteps - 1 && 
            <button 
              className="bg-green-800 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-green-700 ml-2" 
              onClick={onSkipToSignup}
            >
              Sign Up Now
            </button>
          }
        </div>
        <div className="flex flex-wrap gap-2">
          {!isMobile && currentStep < totalSteps - 1 && 
            <button 
              className="text-gray-500 hover:text-green-700 text-sm font-medium" 
              onClick={onSkipToSignup}
            >
              Skip this part
            </button>
          }
          {!isMobile && currentStep < totalSteps - 1 && 
            <button 
              className="bg-green-800 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-green-700" 
              onClick={() => onSkipToSignup()}
            >
              Sign Up Now
            </button>
          }
        </div>
      </div>
      
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-green-800 h-1 transition-all duration-300 ease-in-out" 
          style={{width: `${(currentStep + 1) / totalSteps * 100}%`}}
        ></div>
      </div>
    </>
  );
};

export default OnboardingHeader;
