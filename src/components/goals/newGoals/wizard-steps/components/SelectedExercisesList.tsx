
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Video } from "lucide-react";
import { Exercise } from "../../CreateGoalWizard";

interface SelectedExercisesListProps {
  selectedExercises: Exercise[];
  onRemoveExercise: (exerciseId: number) => void;
}

const SelectedExercisesList: React.FC<SelectedExercisesListProps> = ({
  selectedExercises,
  onRemoveExercise
}) => {
  if (selectedExercises.length === 0) return null;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Selected Exercises</h3>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {selectedExercises.map(exercise => (
            <div 
              key={exercise.id} 
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-xl mr-3">
                  {exercise.category === "Mobility" ? "🔄" : 
                   exercise.category === "Strengthening" ? "🏋️" : 
                   exercise.category === "Stretching" ? "🧘" : "⚖️"}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{exercise.name}</h4>
                  <p className="text-xs text-gray-500">{exercise.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => console.log("Preview exercise", exercise.id)}
                >
                  <Video className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onRemoveExercise(exercise.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedExercisesList;
