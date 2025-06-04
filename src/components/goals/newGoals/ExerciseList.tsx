
import React, { useState } from "react";
import { Exercise } from "./CreateGoalWizard";
import { Card } from "@/components/ui/card";
import { Video, CircleCheck, Dumbbell, Activity } from "lucide-react";
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
  
  const getExerciseIcon = (exercise: Exercise) => {
    // Determine icon based on category
    if (exercise.category.toLowerCase().includes('stretch') || 
        exercise.name.toLowerCase().includes('stretch')) {
      return <Activity className="h-6 w-6 text-amber-500" />;
    }
    
    return <Dumbbell className="h-6 w-6 text-blue-500" />;
  };

  return (
    <>
      <div className="space-y-3">
        {exercises.map((exercise) => {
          const isCompleted = isExerciseCompleted(exercise.id);
          
          return (
            <Card 
              key={exercise.id} 
              className={cn(
                "overflow-hidden transition-colors border", 
                isCompleted ? "bg-green-50 border-green-100" : "bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
                    {getExerciseIcon(exercise)}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800">{exercise.name}</h3>
                    <p className="text-sm text-gray-500">
                      {exercise.customReps} reps • {exercise.category}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full p-0 w-9 h-9 flex items-center justify-center"
                    onClick={() => handleViewExercise(exercise)}
                  >
                    <Video className="h-4 w-4 text-gray-500" />
                  </Button>
                  
                  {showCompleteButtons && (
                    <Button 
                      variant={isCompleted ? "secondary" : "default"}
                      size="sm"
                      className={cn(
                        "rounded-full p-0 w-9 h-9 flex items-center justify-center",
                        isCompleted ? "bg-green-100 hover:bg-green-200" : ""
                      )}
                      disabled={isCompleted}
                      onClick={() => !isCompleted && handleMarkComplete(exercise.id)}
                    >
                      <CircleCheck className={cn(
                        "h-4 w-4", 
                        isCompleted ? "text-green-600" : "text-white"
                      )} />
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
