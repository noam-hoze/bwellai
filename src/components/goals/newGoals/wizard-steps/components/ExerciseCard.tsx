
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Exercise } from "../../CreateGoalWizard";

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onAddExercise: (exercise: Exercise) => void;
  categoryIcon: string;
  iconBgColor: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isSelected,
  onAddExercise,
  categoryIcon,
  iconBgColor
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 ${iconBgColor} rounded-md flex items-center justify-center text-xl mr-3`}>
              {categoryIcon}
            </div>
            <div>
              <h4 className="font-medium text-sm">{exercise.name}</h4>
              <p className="text-xs text-gray-500">
                {exercise.description}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={isSelected ? "secondary" : "default"}
            disabled={isSelected}
            onClick={() => onAddExercise(exercise)}
          >
            {isSelected ? (
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
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
