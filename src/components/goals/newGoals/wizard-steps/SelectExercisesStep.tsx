import React, { useState } from "react";
import { GoalData, Exercise } from "../CreateGoalWizard";
import { Badge } from "@/components/ui/badge";
import { useExerciseData } from "./hooks/useExerciseData";
import SearchExercises from "./components/SearchExercises";
import SelectedExercisesList from "./components/SelectedExercisesList";
import RecommendedExercises from "./components/RecommendedExercises";
import ExerciseCategories from "./components/ExerciseCategories";
import { useUserGoalExerciseDetails } from "@/service/hooks/goal/useGetGoal";

interface SelectExercisesStepProps {
  goalData: GoalData;
  updateGoalData: (newData: Partial<GoalData>) => void;
  userGoalExerciseDetailsData?: Record<string, Exercise[]>;
}

const SelectExercisesStep: React.FC<SelectExercisesStepProps> = ({
  goalData,
  updateGoalData
}) => {
  const [activeTab, setActiveTab] = useState("mobility");

  const {
      data: userGoalExerciseDetailsData,
      isLoading: userGoalExerciseIsLoading,
    } = useUserGoalExerciseDetails();

const allExercises = Object.values(userGoalExerciseDetailsData || {}).flat();
const mobilityExercises = userGoalExerciseDetailsData?.Mobility || [];
const stabilizationExercises = userGoalExerciseDetailsData?.Stabilization || [];
const strengtheningExercises = userGoalExerciseDetailsData?.Strengthening || [];
const recommendedExercises = userGoalExerciseDetailsData
  ? Object.values(userGoalExerciseDetailsData)
      .flat()
      .filter((exercise: Exercise) => exercise.goalTypeIds.includes(goalData.goalId)) as Exercise[]
  : [];



  const handleAddExercise = (exercise: Exercise) => {
    const updatedExercise = { ...exercise, selected: true };
    const updatedExercises = [...goalData.selectedExercises, updatedExercise];
    updateGoalData({ selectedExercises: updatedExercises });
  };

  const handleRemoveExercise = (exerciseId: number) => {
    const updatedExercises = goalData.selectedExercises.filter(
      exercise => exercise.id !== exerciseId
    );
    updateGoalData({ selectedExercises: updatedExercises });
  };

  
console.log("userGoalExerciseDetailsData: ", userGoalExerciseDetailsData);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exercise Selection</h2>
        <Badge variant="secondary" className="bg-wellness-light-green text-wellness-bright-green">
          Selected: {goalData.selectedExercises.length} exercises
        </Badge>
      </div>
      
      <SearchExercises
        allExercises={allExercises}
        selectedExercises={goalData.selectedExercises}
        onAddExercise={handleAddExercise}
      />
      
      <SelectedExercisesList
        selectedExercises={goalData.selectedExercises}
        onRemoveExercise={handleRemoveExercise}
      />

      <RecommendedExercises
        recommendedExercises={recommendedExercises}
        selectedExercises={goalData.selectedExercises}
        onAddExercise={handleAddExercise}
      />
      
      <ExerciseCategories
        activeTab={activeTab}
        onTabChange={setActiveTab}
        exercises={{
          mobility: mobilityExercises,
          stabilization: stabilizationExercises,
          strengthening: strengtheningExercises
        }}
        selectedExercises={goalData.selectedExercises}
        onAddExercise={handleAddExercise}
      />
    </div>
  );
};

export default SelectExercisesStep;
