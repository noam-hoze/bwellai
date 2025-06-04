
import React, { useEffect } from "react";
import { DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  isEditMode: boolean;
}

const WizardHeader = ({
  currentStep,
  totalSteps,
  title,
  isEditMode
}: WizardHeaderProps) => {
  const isMobile = useIsMobile();

  // Add effect to scroll to top when step changes on mobile
  useEffect(() => {
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, isMobile]);

  return <DialogHeader className="bg-gradient-to-r from-wellness-light-green to-blue-50 p-6 border-b relative">
      <DialogClose className="absolute right-4 top-2 p-1.5 rounded-full hover:bg-gray-200/80 transition-colors">
        <X size={18} />
      </DialogClose>
      <div className="flex justify-between items-center">
        <DialogTitle className="text-xl font-semibold text-wellness-bright-green">
          {isEditMode ? "Edit" : "Create"} Treatment Plan: {title}
        </DialogTitle>
        <div className="text-sm font-medium text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
      
      <div className="w-full mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-wellness-bright-green transition-all duration-300 ease-in-out" style={{
        width: `${(currentStep + 1) / totalSteps * 100}%`
      }}></div>
      </div>
    </DialogHeader>;
};

export default WizardHeader;
