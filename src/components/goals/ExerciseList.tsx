
import React, { useState } from "react";
import { Exercise } from "./CreateGoalWizard";
import { Card } from "@/components/ui/card";
import { Video, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExerciseDetailsModal from "./ExerciseDetailsModal";
import { cn } from "@/lib/utils";

interface ExerciseListProps {
  exercises: Exercise[];
  onMarkComplete?: (exerciseId: number) => void;
  completedExercises?: number[];
  showCompleteButtons?: boolean;
}

const ExerciseList = ({ 
  exercises, 
  onMarkComplete,
  completedExercises = [],
  showCompleteButtons = true
}: ExerciseListProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMarkComplete = (exerciseId: number) => {
    if (onMarkComplete) {
      onMarkComplete(exerciseId);
    }
  };

  const isExerciseCompleted = (exerciseId: number) => {
    return completedExercises.includes(exerciseId);
  };

  return (
    <>
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const isCompleted = isExerciseCompleted(exercise.id);
          
          return (
            <Card 
              key={exercise.id} 
              className={cn(
                "overflow-hidden transition-colors", 
                isCompleted ? "bg-green-50 border-green-100" : "bg-gray-50"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-3">
                <div className="flex items-start">
                  {isCompleted && (
                    <CircleCheck className="h-5 w-5 text-wellness-bright-green mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{exercise.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {exercise.customReps} repetitions • {exercise.category}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 ml-auto">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleViewExercise(exercise)}
                  >
                    <Video className="h-3 w-3 mr-1" />
                    View Exercise
                  </Button>
                  
                  {showCompleteButtons && !isCompleted && onMarkComplete && (
                    <Button 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleMarkComplete(exercise.id)}
                    >
                      <CircleCheck className="h-3 w-3 mr-1" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ExerciseDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        exercise={selectedExercise}
        onMarkComplete={showCompleteButtons ? handleMarkComplete : undefined}
        isCompleted={selectedExercise ? isExerciseCompleted(selectedExercise.id) : false}
      />
    </>
  );
};

export default ExerciseList;
