import React, { useMemo } from "react";
import { Exercise, SelectedExercise } from "./CreateGoalWizard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import DifficultyRating from "./DifficultyRating";
import { useUserGoalExerciseDetails } from "@/service/hooks/goal/useGetGoal";

interface ExerciseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: SelectedExercise | null;
  onMarkComplete?: (exerciseId: number) => void;
  isCompleted?: boolean;
  difficultyRating?: number;
}

const ExerciseDetailsModal = ({ 
  isOpen, 
  onClose, 
  exercise, 
  onMarkComplete,
  isCompleted = false,
  difficultyRating
}: ExerciseDetailsModalProps) => {
  const {
        data: userGoalExerciseDetailsData,
        isLoading: userGoalExerciseIsLoading,
      } = useUserGoalExerciseDetails();

      const allExercises = Object.values(userGoalExerciseDetailsData || []).flat();
      
  const handleComplete = () => {
    if(!exercise){
      return;
    }
    if (onMarkComplete) {
      onMarkComplete(exercise.exercise_id);
      onClose();
    }
  };

  // const videoId = getYouTubeVideoId(exercise.videoUrl || "");
  const foundExercise = useMemo(() => {
  if (!exercise || !exercise.exercise_id) return undefined;
  return allExercises.find((ex: Exercise) => ex.id === exercise.exercise_type_id);
}, [allExercises, exercise]) as Exercise | undefined;

    const formatSetsAndReps = () => {
    if (exercise.entity === "duration" && exercise.entity_value) {
      const minutes = Math.floor(exercise.entity_value / 60);
      const seconds = exercise.entity_value % 60;
      const timeStr = minutes > 0 
        ? `${minutes}:${seconds.toString().padStart(2, '0')} minutes`
        : `${seconds} seconds`;
      return `${exercise.sets} ${exercise.sets === 1 ? 'set' : 'sets'} of ${timeStr}`;
    } else {
      return `${exercise.sets} ${exercise.sets === 1 ? 'set' : 'sets'} of ${exercise.entity_value} repetitions`;
    }
  };

  if (!exercise) return null;

  console.log("Exercise Details Modal", exercise);
  console.log("Found Exercise", foundExercise);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 bg-gradient-to-r from-wellness-light-green to-blue-50 border-b">
          <DialogTitle className="text-xl font-semibold text-wellness-bright-green flex items-center justify-between">
            <span>{exercise.exercise_name}</span>
            {isCompleted && difficultyRating && (
              <DifficultyRating rating={difficultyRating} size="lg" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* YouTube Video Player */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${foundExercise.videoUrl}?rel=0&modestbranding=1`}
              title={`${exercise.exercise_name} Exercise Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Exercise Details */}
          <div className="space-y-4">
           <div>
              <h3 className="font-semibold text-lg">Instructions</h3>
              <p className="text-gray-600 mt-1">{foundExercise.description}</p>
            </div>

            <div>
              <h3 className="font-semibold">Sets & {exercise.entity === "reps" ? "Repetitions" : "Duration"}</h3>
              <p className="text-gray-600 mt-1">
                {formatSetsAndReps()}
                {exercise.exercise_name.toLowerCase().includes("each side") && exercise.entity === "reps" &&
                  ` (${Math.floor(exercise.entity_value/2)} each side)`}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-gray-600 mt-1">{foundExercise.label}</p>
            </div> 

            {/* Tips */}
           {/*<div className="bg-wellness-light-green p-4 rounded-lg">
              <h3 className="font-semibold text-wellness-bright-green">Tips for Best Results</h3>
              <ul className="text-sm mt-2 space-y-1 text-gray-700">
                <li>• Focus on proper form rather than speed</li>
                <li>• Breathe naturally throughout the exercise</li>
                <li>• Stop if you feel sharp or shooting pain</li>
                <li>• Keep movements smooth and controlled</li>
              </ul>
            </div>*/}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {onMarkComplete && !isCompleted ? (
              <Button onClick={handleComplete} className="flex-1">
                <CircleCheck className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            ) : isCompleted ? (
              <Button disabled className="flex-1 bg-green-100 text-green-700 hover:bg-green-100">
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
