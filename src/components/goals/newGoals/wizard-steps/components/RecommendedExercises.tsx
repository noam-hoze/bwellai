
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Exercise } from "../../CreateGoalWizard";

interface RecommendedExercisesProps {
  recommendedExercises: Exercise[];
  selectedExercises: Exercise[];
  onAddExercise: (exercise: Exercise) => void;
}

const RecommendedExercises: React.FC<RecommendedExercisesProps> = ({
  recommendedExercises,
  selectedExercises,
  onAddExercise
}) => {
  const isExerciseSelected = (exerciseId: number) => {
    return selectedExercises.some(exercise => exercise.id === exerciseId);
  };

  //if (recommendedExercises.length === 0) return null; // Uncomment this line after implementing the logic to fetch recommended exercises

  return (
    <Card className="border border-blue-200 relative z-10">
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-medium">Recommended Exercises</h3>
          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">Recommended</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          {recommendedExercises.map(exercise => (
            <div 
              key={exercise.id} 
              className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-100"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-xl mr-3">
                  {exercise.category === "Mobility" ? "🔄" : 
                   exercise.category === "Strengthening" ? "🏋️" : 
                   exercise.category === "Stretching" ? "🧘" : "⚖️"}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{exercise.name}</h4>
                  <p className="text-xs text-gray-500">
                    {exercise.description}
                    <span className="ml-2">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                        {exercise.category}
                      </Badge>
                    </span>
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant={isExerciseSelected(exercise.id) ? "secondary" : "default"}
                className={isExerciseSelected(exercise.id) ? "bg-blue-100 text-blue-800" : "bg-blue-500"}
                disabled={isExerciseSelected(exercise.id)}
                onClick={() => onAddExercise(exercise)}
              >
                {isExerciseSelected(exercise.id) ? (
                  <>
                    <Check className="mr-1 h-3 w-3" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="mr-1 h-3 w-3" /> Add
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedExercises;
