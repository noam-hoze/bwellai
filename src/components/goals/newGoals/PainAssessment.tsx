
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PainAssessmentProps {
  currentPainLevel: number;
  dayNumber: number;
  isToday: boolean;
  onUpdatePain: (level: number) => void;
}

const PainAssessment = ({
  currentPainLevel,
  dayNumber,
  isToday,
  onUpdatePain
}: PainAssessmentProps) => {
  const [showPainUpdate, setShowPainUpdate] = useState<boolean>(false);
  
  const handlePainLevelChange = (level: number) => {
    onUpdatePain(level);
    setShowPainUpdate(false);
  };
  
  const getPainEmoji = (level: number) => {
    if (level <= 3) return "😀";
    if (level <= 5) return "🙂";
    if (level <= 7) return "😐";
    return "😣";
  };
  
  const getPainColor = (level: number) => {
    if (level <= 3) return "bg-green-50";
    if (level <= 5) return "bg-blue-50";
    if (level <= 7) return "bg-amber-50";
    return "bg-red-50";
  };
  
  const renderPainButton = (level: number) => {
    let bgColor = "bg-white";
    if (level <= 3) bgColor = "bg-green-100 hover:bg-green-200";
    else if (level <= 5) bgColor = "bg-blue-100 hover:bg-blue-200";
    else if (level <= 7) bgColor = "bg-amber-100 hover:bg-amber-200";
    else bgColor = "bg-red-100 hover:bg-red-200";
    
    return (
      <Button
        key={level}
        variant={level === currentPainLevel ? "default" : "outline"}
        size="sm"
        className={`w-6 h-6 p-0 text-xs ${level === currentPainLevel ? "" : bgColor}`}
        onClick={() => handlePainLevelChange(level)}
      >
        {level}
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center border-t border-b py-2">
        <div>
          <p className="text-sm font-medium">Current Pain Level: {currentPainLevel}/10</p>
        </div>
        
        {isToday && !showPainUpdate ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPainUpdate(true)}
            className="h-7"
          >
            Update
          </Button>
        ) : isToday && showPainUpdate ? (
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => renderPainButton(level))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PainAssessment;
