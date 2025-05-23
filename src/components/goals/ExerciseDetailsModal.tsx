import React from "react";
import { Exercise } from "./CreateGoalWizard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video, ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: any;
  onMarkComplete?: (exerciseId: number) => void;
  isCompleted?: boolean;
}

const ExerciseDetailsModal = ({
  isOpen,
  onClose,
  exercise,
  onMarkComplete,
  isCompleted = false,
}: ExerciseDetailsModalProps) => {
  if (!exercise) return null;

  const handleComplete = () => {
    if (onMarkComplete) {
      onMarkComplete(exercise?.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 bg-gradient-to-r from-wellness-light-green to-blue-50 border-b">
          <DialogTitle className="text-xl font-semibold text-wellness-bright-green">
            {exercise?.exercise_name}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Exercise Video/Image Preview */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${exercise?.imageUrl})` }}
            >
              <Video className="h-12 w-12 text-white bg-black/50 p-2 rounded-full" />
            </div>
          </div>

          {/* Exercise Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Instructions</h3>
              <p className="text-gray-600 mt-1">{exercise?.description}</p>
            </div>

            <div>
              <h3 className="font-semibold">Repetitions</h3>
              <p className="text-gray-600 mt-1">
                {exercise?.entity_value} repetitions
                {exercise?.exercise_name
                  ?.toLowerCase()
                  ?.includes("each side") &&
                  ` (${Math.floor(exercise?.entity_value / 2)} each side)`}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-gray-600 mt-1">{exercise?.entity}</p>
            </div>

            {/* Tips */}
            <div className="bg-wellness-light-green p-4 rounded-lg">
              <h3 className="font-semibold text-wellness-bright-green">
                Tips for Best Results
              </h3>
              <ul className="text-sm mt-2 space-y-1 text-gray-700">
                <li>• Focus on proper form rather than speed</li>
                <li>• Breathe naturally throughout the exercise</li>
                <li>• Stop if you feel sharp or shooting pain</li>
                <li>• Keep movements smooth and controlled</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {onMarkComplete && !isCompleted ? (
              <Button onClick={handleComplete} className="flex-1">
                <CircleCheck className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            ) : isCompleted ? (
              <Button
                disabled
                className="flex-1 bg-green-100 text-green-700 hover:bg-green-100"
              >
                <CircleCheck className="mr-2 h-4 w-4" />
                Completed
              </Button>
            ) : null}
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDetailsModal;
