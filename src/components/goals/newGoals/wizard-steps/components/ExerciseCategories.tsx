
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise } from "../../CreateGoalWizard";
import ExerciseCard from "./ExerciseCard";

interface ExerciseCategoriesProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  exercises: {
    mobility: Exercise[];
    stabilization: Exercise[];
    strengthening: Exercise[];
  };
  selectedExercises: Exercise[];
  onAddExercise: (exercise: Exercise) => void;
}

const ExerciseCategories: React.FC<ExerciseCategoriesProps> = ({
  activeTab,
  onTabChange,
  exercises,
  selectedExercises,
  onAddExercise
}) => {
  const isExerciseSelected = (exerciseId: number) => {
    return selectedExercises.some(exercise => exercise.id === exerciseId);
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Exercise Categories</h3>
      <Tabs defaultValue="mobility" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="mobility">Mobility</TabsTrigger>
          <TabsTrigger value="stabilization">Stability</TabsTrigger>
          <TabsTrigger value="strengthening">Strength</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mobility" className="mt-4">
          <div className="max-h-80 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exercises.mobility.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isSelected={isExerciseSelected(exercise.id)}
                  onAddExercise={onAddExercise}
                  categoryIcon="🔄"
                  iconBgColor="bg-blue-100"
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stabilization" className="mt-4">
          <div className="max-h-80 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exercises.stabilization.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isSelected={isExerciseSelected(exercise.id)}
                  onAddExercise={onAddExercise}
                  categoryIcon="⚖️"
                  iconBgColor="bg-purple-100"
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strengthening" className="mt-4">
          <div className="max-h-80 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exercises.strengthening.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isSelected={isExerciseSelected(exercise.id)}
                  onAddExercise={onAddExercise}
                  categoryIcon="💪"
                  iconBgColor="bg-green-100"
                />
              ))}
            </div>
          </div>
        </TabsContent>
              

      </Tabs>
    </div>
  );
};

export default ExerciseCategories;
