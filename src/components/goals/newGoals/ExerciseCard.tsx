
import React from "react";
import { Exercise } from "./CreateGoalWizard";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, Video } from "lucide-react";
import DifficultyRating from "./DifficultyRating";

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  difficultyRating?: number;
  onMarkComplete: (exerciseId: number) => void;
  onViewExercise: (exercise: Exercise) => void;
}

const ExerciseCard = ({ 
  exercise, 
  isCompleted, 
  difficultyRating, 
  onMarkComplete, 
  onViewExercise 
}: ExerciseCardProps) => {
  return (
    <div className={`rounded-lg p-4 mb-4 last:mb-0 ${isCompleted ? "bg-green-50" : "bg-white"}`}>
      <div className="flex items-start gap-4">
        <div className="bg-gray-100 rounded-lg p-3 self-start">
          <Activity className="h-6 w-6 text-blue-500" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            {isCompleted && difficultyRating && (
              <DifficultyRating rating={difficultyRating} />
            )}
          </div>
          
          <p className="text-gray-600 text-sm">
            {exercise.customReps} repetitions • {exercise.sets} {exercise.sets === 1 ? 'set' : 'sets'} • {exercise.category}
            {exercise.duration && ` • ${exercise.duration} minutes`}
          </p>
          
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              onClick={() => onViewExercise(exercise)}
            >
              <Video className="mr-2 h-4 w-4" />
              View Exercise
            </Button>
            
            <Button 
              variant={isCompleted ? "outline" : "default"}
              className={`flex-1 ${isCompleted ? "bg-green-50 text-green-700 border-green-200" : "bg-green-600 hover:bg-green-700 text-white"}`}
              onClick={() => !isCompleted && onMarkComplete(exercise.id)}
              disabled={isCompleted}
            >
              <CheckCircle className="mr-2 h-4 w-4 text-white" />
              {isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
