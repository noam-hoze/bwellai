
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DifficultyRatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRate: (rating: number) => void;
  exerciseName: string;
}

const DifficultyRatingDialog = ({ 
  isOpen, 
  onClose, 
  onRate, 
  exerciseName 
}: DifficultyRatingDialogProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRateClick = () => {
    onRate(selectedRating);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Rate Difficulty
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">
            How difficult was "{exerciseName}"?
          </p>
          
          <div className="flex justify-center items-center gap-4">
            {/* Easy label */}
            <div className="text-sm font-medium text-gray-500">
              Easy
            </div>
            
            {/* Rating buttons */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="icon"
                  className={`h-12 w-12 rounded-full border-2 transition-all ${
                    selectedRating >= rating 
                      ? 'bg-wellness-bright-green border-wellness-bright-green text-white' 
                      : 'border-gray-300 text-gray-500 hover:border-wellness-bright-green hover:text-wellness-bright-green'
                  }`}
                  onClick={() => setSelectedRating(rating)}
                >
                  <span className="text-lg font-semibold">{rating}</span>
                </Button>
              ))}
            </div>
            
            {/* Hard label */}
            <div className="text-sm font-medium text-gray-500">
              Hard
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-row gap-2 sm:justify-center">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRateClick}
            disabled={selectedRating === 0}
            className="flex-1"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultyRatingDialog;
