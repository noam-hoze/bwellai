
import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AIDisclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  useEffect(() => {
    // Check if the user has seen the disclaimer before
    const hasSeenDisclaimer = localStorage.getItem("hasSeenAIDisclaimer");
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);
  
  const handleDismiss = () => {
    // Mark that the user has seen the disclaimer
    localStorage.setItem("hasSeenAIDisclaimer", "true");
    setShowDisclaimer(false);
  };
  
  return (
    <AlertDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <AlertDialogTitle className="text-center text-xl">AI-Assisted Interpretation</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This report has been analyzed and interpreted using artificial intelligence. While we strive for accuracy, these interpretations should not replace professional medical advice. Always consult with your healthcare provider before making any health-related decisions based on this information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction onClick={handleDismiss} className="w-full">
            I understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIDisclaimer;
