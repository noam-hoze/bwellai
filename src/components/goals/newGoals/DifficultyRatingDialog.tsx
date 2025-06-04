
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

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
          <p className="text-center text-gray-600 mb-4">
            How difficult was "{exerciseName}"?
          </p>
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                size="icon"
                className={`h-12 w-12 ${selectedRating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setSelectedRating(rating)}
              >
                <Star className="h-8 w-8 fill-current" />
              </Button>
            ))}
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
