
import React from "react";
import { Progress } from "@/components/ui/progress";
import { SelectedExercise } from "./CreateGoalWizard";
import { useUserGoalExerciseDetails } from "@/service/hooks/goal/useGetGoal";

interface DifficultyAnalysisProps {
  exercises: SelectedExercise[];
}

const DifficultyAnalysis = ({ exercises }: DifficultyAnalysisProps) => {
  // Function to determine the color based on difficulty level
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "#22c55e"; // Green for easy
    if (difficulty <= 3.5) return "#eab308"; // Yellow for moderate
    return "#ef4444"; // Red for difficult
  };

  const {
        data: userGoalExerciseDetailsData,
        isLoading: userGoalExerciseIsLoading,
      } = useUserGoalExerciseDetails();
  
    const exerciseTypes = Object.values(userGoalExerciseDetailsData ?? {}).flat();

    type DifficultySummary = {
  category: string;
  averageDifficulty: number;
  count: number;
};

function getDifficultiesByCategory(
  exercises: SelectedExercise[],
  exerciseTypes
): DifficultySummary[] {
  const typeMap = new Map<number, string>(); // Maps id => label (category)

  exerciseTypes.forEach((type) => {
    typeMap.set(type.id, type.label);
  });

  const grouped: Record<string, { total: number; count: number }> = {};

  exercises.forEach((exercise) => {
    if (exercise.difficulty_level === 0) return;
    
    const category = typeMap.get(exercise.exercise_type_id);
    if (!category) return;

    if (!grouped[category]) {
      grouped[category] = { total: 0, count: 0 };
    }

    grouped[category].total += exercise.difficulty_level;
    grouped[category].count += 1;
  });

  return Object.entries(grouped).map(([category, { total, count }]) => ({
    category,
    averageDifficulty: total / count,
    count,
  }));
}

const difficulties = getDifficultiesByCategory(exercises, exerciseTypes);

  return (
    <div className="space-y-4">
      {difficulties.map((item, index) => {
        const difficultyPercentage = (item.averageDifficulty / 5) * 100;
        const color = getDifficultyColor(item.averageDifficulty);
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">
                {item.category} 
                <span className="text-gray-500 ml-2">({item.count} exercises)</span>
              </div>
              <div className="font-bold">{item.averageDifficulty.toFixed(1)}/5</div>
            </div>
            <Progress 
              value={difficultyPercentage} 
              className="h-2"
              indicatorColor={color}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DifficultyAnalysis;
